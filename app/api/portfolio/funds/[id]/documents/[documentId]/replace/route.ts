import { NextResponse } from 'next/server';
import { forbidden } from '@/lib/api/error-responses';

import { clientIpFromRequest, scheduleAuditLog } from '@/lib/audit/log';
import { canManageFundDocuments } from '@/lib/portfolio/fund-document-access';
import {
  portfolioFundDocumentObjectPath,
  validateFundDocumentFile,
} from '@/lib/portfolio/fund-document-storage';
import { PORTFOLIO_FUND_DOCUMENT_BUCKET } from '@/lib/portfolio/fund-documents';
import { getProfile, requireAuth } from '@/lib/auth/session';
import { createServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string; documentId: string }> };

/**
 * Replace the stored file for an existing fund library document.
 * Metadata (title, category, notes, effective_date) is preserved unless also sent.
 */
export async function POST(req: Request, ctx: Ctx) {
  await requireAuth();
  const profile = await getProfile();
  if (!canManageFundDocuments(profile)) {
    return forbidden("You do not have permission to perform this action. Contact your administrator if you believe this is incorrect.");
  }

  const { id: fundId, documentId } = await ctx.params;
  const supabase = createServerClient();

  const { data: fund } = await supabase
    .from('vc_portfolio_funds')
    .select('id')
    .eq('tenant_id', profile!.tenant_id)
    .eq('id', fundId)
    .maybeSingle();
  if (!fund) return NextResponse.json({ error: 'Fund not found' }, { status: 404 });

  const { data: existing, error: loadErr } = await supabase
    .from('vc_portfolio_fund_documents')
    .select('*')
    .eq('tenant_id', profile!.tenant_id)
    .eq('fund_id', fundId)
    .eq('id', documentId)
    .maybeSingle();
  if (loadErr) {
    console.error('[fund-documents] replace load failed', loadErr.message);
    return NextResponse.json({ error: 'Failed to load document' }, { status: 500 });
  }
  if (!existing) return NextResponse.json({ error: 'Document not found' }, { status: 404 });

  const row = existing as {
    document_path: string;
    title: string;
    category: string;
    notes: string | null;
    effective_date: string | null;
  };

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Expected multipart form-data' }, { status: 400 });
  }

  const file = form.get('file');
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'A file is required' }, { status: 400 });
  }

  const fileCheck = validateFundDocumentFile(file);
  if (!fileCheck.ok) {
    return NextResponse.json({ error: fileCheck.error }, { status: 400 });
  }

  const newPath = portfolioFundDocumentObjectPath(
    profile!.tenant_id,
    fundId,
    documentId,
    file.name,
  );
  const buf = Buffer.from(await file.arrayBuffer());

  const { error: upErr } = await supabase.storage.from(PORTFOLIO_FUND_DOCUMENT_BUCKET).upload(newPath, buf, {
    contentType: fileCheck.contentType,
    upsert: true,
  });
  if (upErr) {
    console.error('[fund-documents] replace upload failed', upErr.message);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }

  const { data: updated, error: updErr } = await supabase
    .from('vc_portfolio_fund_documents')
    .update({
      document_path: newPath,
      document_name: file.name,
      mime_type: fileCheck.contentType,
      file_size: file.size,
      updated_by: profile!.profile_id,
    })
    .eq('id', documentId)
    .eq('tenant_id', profile!.tenant_id)
    .eq('fund_id', fundId)
    .select(
      'id, title, category, document_name, mime_type, file_size, notes, effective_date, uploaded_at, updated_at, uploaded_by',
    )
    .single();

  if (updErr || !updated) {
    console.error('[fund-documents] replace DB update failed', updErr?.message);
    // Keep old path valid: remove the new object if DB failed
    if (newPath !== row.document_path) {
      await supabase.storage.from(PORTFOLIO_FUND_DOCUMENT_BUCKET).remove([newPath]);
    }
    return NextResponse.json({ error: 'Failed to update document record' }, { status: 500 });
  }

  if (row.document_path && row.document_path !== newPath) {
    const { error: rmErr } = await supabase.storage
      .from(PORTFOLIO_FUND_DOCUMENT_BUCKET)
      .remove([row.document_path]);
    if (rmErr) {
      console.error('[fund-documents] old file cleanup failed', rmErr.message);
    }
  }

  scheduleAuditLog({
    tenantId: profile!.tenant_id,
    actorId: profile!.user_id,
    entityType: 'portfolio_fund_document',
    entityId: documentId,
    action: 'document_file_replaced',
    beforeState: { document_name: (existing as { document_name: string }).document_name },
    afterState: { document_name: file.name, file_size: file.size },
    metadata: { fund_id: fundId },
    ipAddress: clientIpFromRequest(req),
  });

  return NextResponse.json({ document: updated });
}
