import { NextResponse } from 'next/server';
import { forbidden } from '@/lib/api/error-responses';
import { z } from 'zod';

import { clientIpFromRequest, scheduleAuditLog } from '@/lib/audit/log';
import { canManageFundDocuments } from '@/lib/portfolio/fund-document-access';
import { PORTFOLIO_FUND_DOCUMENT_BUCKET, PORTFOLIO_FUND_DOCUMENT_CATEGORIES } from '@/lib/portfolio/fund-documents';
import { getProfile, requireAuth } from '@/lib/auth/session';
import { createServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string; documentId: string }> };

const patchSchema = z
  .object({
    title: z.string().trim().min(1).max(300).optional(),
    category: z.enum(PORTFOLIO_FUND_DOCUMENT_CATEGORIES).optional(),
    notes: z.string().trim().max(4000).nullable().optional(),
    effective_date: z
      .union([
        z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
        z.literal(''),
        z.null(),
      ])
      .optional(),
  })
  .refine((v) => v.title !== undefined || v.category !== undefined || v.notes !== undefined || v.effective_date !== undefined, {
    message: 'No fields to update',
  });

async function loadDocument(fundId: string, documentId: string, tenantId: string) {
  const supabase = createServerClient();
  const { data: fund } = await supabase
    .from('vc_portfolio_funds')
    .select('id')
    .eq('tenant_id', tenantId)
    .eq('id', fundId)
    .maybeSingle();
  if (!fund) return { ok: false as const, status: 404 as const, error: 'Fund not found', supabase };

  const { data: doc, error } = await supabase
    .from('vc_portfolio_fund_documents')
    .select('*')
    .eq('tenant_id', tenantId)
    .eq('fund_id', fundId)
    .eq('id', documentId)
    .maybeSingle();
  if (error) {
    console.error('[fund-documents] load failed', error.message);
    return { ok: false as const, status: 500 as const, error: 'Failed to load document', supabase };
  }
  if (!doc) return { ok: false as const, status: 404 as const, error: 'Document not found', supabase };
  return { ok: true as const, supabase, doc };
}

export async function PATCH(req: Request, ctx: Ctx) {
  await requireAuth();
  const profile = await getProfile();
  if (!canManageFundDocuments(profile)) {
    return forbidden("You do not have permission to perform this action. Contact your administrator if you believe this is incorrect.");
  }

  const { id: fundId, documentId } = await ctx.params;
  const loaded = await loadDocument(fundId, documentId, profile!.tenant_id);
  if (!loaded.ok) {
    return NextResponse.json({ error: loaded.error }, { status: loaded.status });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Validation failed' },
      { status: 400 },
    );
  }

  const patch: Record<string, unknown> = {
    updated_by: profile!.profile_id,
  };
  if (parsed.data.title !== undefined) patch.title = parsed.data.title;
  if (parsed.data.category !== undefined) patch.category = parsed.data.category;
  if (parsed.data.notes !== undefined) {
    patch.notes = parsed.data.notes?.trim() ? parsed.data.notes.trim() : null;
  }
  if (parsed.data.effective_date !== undefined) {
    patch.effective_date =
      parsed.data.effective_date && parsed.data.effective_date.length > 0
        ? parsed.data.effective_date
        : null;
  }

  const before = loaded.doc as Record<string, unknown>;
  const { data: updated, error } = await loaded.supabase
    .from('vc_portfolio_fund_documents')
    .update(patch)
    .eq('id', documentId)
    .eq('tenant_id', profile!.tenant_id)
    .eq('fund_id', fundId)
    .select(
      'id, title, category, document_name, mime_type, file_size, notes, effective_date, uploaded_at, updated_at, uploaded_by',
    )
    .single();

  if (error || !updated) {
    console.error('[fund-documents] patch failed', error?.message);
    return NextResponse.json({ error: 'Failed to update document' }, { status: 500 });
  }

  scheduleAuditLog({
    tenantId: profile!.tenant_id,
    actorId: profile!.user_id,
    entityType: 'portfolio_fund_document',
    entityId: documentId,
    action: 'document_metadata_updated',
    beforeState: {
      title: before.title,
      category: before.category,
      notes: before.notes,
      effective_date: before.effective_date,
    },
    afterState: updated as Record<string, unknown>,
    metadata: { fund_id: fundId },
    ipAddress: clientIpFromRequest(req),
  });

  return NextResponse.json({ document: updated });
}

export async function DELETE(req: Request, ctx: Ctx) {
  await requireAuth();
  const profile = await getProfile();
  if (!canManageFundDocuments(profile)) {
    return forbidden("You do not have permission to perform this action. Contact your administrator if you believe this is incorrect.");
  }

  const { id: fundId, documentId } = await ctx.params;
  const loaded = await loadDocument(fundId, documentId, profile!.tenant_id);
  if (!loaded.ok) {
    return NextResponse.json({ error: loaded.error }, { status: loaded.status });
  }

  const doc = loaded.doc as { document_path: string; title: string; category: string };
  const { error: delErr } = await loaded.supabase
    .from('vc_portfolio_fund_documents')
    .delete()
    .eq('id', documentId)
    .eq('tenant_id', profile!.tenant_id)
    .eq('fund_id', fundId);

  if (delErr) {
    console.error('[fund-documents] delete row failed', delErr.message);
    return NextResponse.json({ error: 'Failed to delete document' }, { status: 500 });
  }

  const { error: stErr } = await loaded.supabase.storage
    .from(PORTFOLIO_FUND_DOCUMENT_BUCKET)
    .remove([doc.document_path]);
  if (stErr) {
    console.error('[fund-documents] storage delete failed after DB delete', stErr.message, doc.document_path);
  }

  scheduleAuditLog({
    tenantId: profile!.tenant_id,
    actorId: profile!.user_id,
    entityType: 'portfolio_fund_document',
    entityId: documentId,
    action: 'document_deleted',
    beforeState: { title: doc.title, category: doc.category, fund_id: fundId },
    metadata: { fund_id: fundId, storage_removed: !stErr },
    ipAddress: clientIpFromRequest(req),
  });

  return NextResponse.json({ ok: true });
}
