import { NextResponse } from 'next/server';
import { forbidden } from '@/lib/api/error-responses';
import { z } from 'zod';

import { clientIpFromRequest, scheduleAuditLog } from '@/lib/audit/log';
import { canManageFundDocuments, canReadFundDocuments } from '@/lib/portfolio/fund-document-access';
import {
  portfolioFundDocumentObjectPath,
  validateFundDocumentFile,
} from '@/lib/portfolio/fund-document-storage';
import {
  PORTFOLIO_FUND_DOCUMENT_BUCKET,
  PORTFOLIO_FUND_DOCUMENT_CATEGORIES,
  type PortfolioFundDocumentListItem,
  type PortfolioFundDocumentRecord,
  isPortfolioFundDocumentCategory,
} from '@/lib/portfolio/fund-documents';
import { titleFromFilename } from '@/lib/portfolio/title-from-filename';
import { getProfile, requireAuth } from '@/lib/auth/session';
import { createServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

const listSortSchema = z.enum(['newest', 'oldest', 'title', 'category']).default('newest');

const uploadMetadataSchema = z.object({
  category: z.enum(PORTFOLIO_FUND_DOCUMENT_CATEGORIES),
  notes: z.string().trim().max(4000).optional().nullable(),
  effective_date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Effective date must be YYYY-MM-DD')
    .optional()
    .nullable()
    .or(z.literal('')),
});

async function assertFundInTenant(fundId: string, tenantId: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('vc_portfolio_funds')
    .select('id')
    .eq('tenant_id', tenantId)
    .eq('id', fundId)
    .maybeSingle();
  if (error) return { ok: false as const, status: 500 as const, error: 'Could not verify fund' };
  if (!data) return { ok: false as const, status: 404 as const, error: 'Fund not found' };
  return { ok: true as const, supabase };
}

/**
 * GET — list fund library documents (not reporting-obligation files).
 * POST — if `obligation_id` is present, preserve existing reporting-obligation upload;
 *        otherwise upload a fund library document (category + file; title derived from filename).
 */
export async function GET(req: Request, ctx: Ctx) {
  await requireAuth();
  const profile = await getProfile();
  if (!canReadFundDocuments(profile)) {
    return forbidden("You do not have permission to perform this action. Contact your administrator if you believe this is incorrect.");
  }

  const { id: fundId } = await ctx.params;
  const fundCheck = await assertFundInTenant(fundId, profile!.tenant_id);
  if (!fundCheck.ok) {
    return NextResponse.json({ error: fundCheck.error }, { status: fundCheck.status });
  }

  const url = new URL(req.url);
  const categoryRaw = url.searchParams.get('category')?.trim() || '';
  const search = url.searchParams.get('search')?.trim() || '';
  const sortParsed = listSortSchema.safeParse(url.searchParams.get('sort') ?? 'newest');
  const sort = sortParsed.success ? sortParsed.data : 'newest';

  if (categoryRaw && categoryRaw !== 'all' && !isPortfolioFundDocumentCategory(categoryRaw)) {
    return NextResponse.json({ error: 'Invalid category filter' }, { status: 400 });
  }

  let q = fundCheck.supabase
    .from('vc_portfolio_fund_documents')
    .select(
      'id, title, category, document_name, mime_type, file_size, notes, effective_date, uploaded_at, updated_at, uploaded_by',
    )
    .eq('tenant_id', profile!.tenant_id)
    .eq('fund_id', fundId);

  if (categoryRaw && categoryRaw !== 'all') {
    q = q.eq('category', categoryRaw);
  }
  if (search) {
    const safe = search.replace(/[%_,]/g, ' ').trim();
    if (safe) {
      q = q.or(`title.ilike.%${safe}%,document_name.ilike.%${safe}%,notes.ilike.%${safe}%`);
    }
  }

  if (sort === 'oldest') q = q.order('uploaded_at', { ascending: true });
  else if (sort === 'title') q = q.order('title', { ascending: true });
  else if (sort === 'category') q = q.order('category', { ascending: true }).order('uploaded_at', { ascending: false });
  else q = q.order('uploaded_at', { ascending: false });

  const { data: rows, error } = await q;
  if (error) {
    console.error('[fund-documents] list failed', error.message);
    return NextResponse.json({ error: 'Failed to load documents' }, { status: 500 });
  }

  const list = (rows ?? []) as Array<{
    id: string;
    title: string;
    category: PortfolioFundDocumentListItem['category'];
    document_name: string;
    mime_type: string | null;
    file_size: number | null;
    notes: string | null;
    effective_date: string | null;
    uploaded_at: string;
    updated_at: string;
    uploaded_by: string;
  }>;

  const uploaderIds = [...new Set(list.map((r) => r.uploaded_by))];
  const nameById = new Map<string, string>();
  if (uploaderIds.length > 0) {
    const { data: profiles } = await fundCheck.supabase
      .from('vc_profiles')
      .select('id, full_name, email')
      .eq('tenant_id', profile!.tenant_id)
      .in('id', uploaderIds);
    for (const p of profiles ?? []) {
      const row = p as { id: string; full_name: string | null; email: string | null };
      nameById.set(row.id, (row.full_name?.trim() || row.email || 'User').trim());
    }
  }

  const documents: PortfolioFundDocumentListItem[] = list.map((r) => ({
    id: r.id,
    title: r.title,
    category: r.category,
    document_name: r.document_name,
    mime_type: r.mime_type,
    file_size: r.file_size,
    notes: r.notes,
    effective_date: r.effective_date,
    uploaded_at: r.uploaded_at,
    updated_at: r.updated_at,
    uploaded_by: r.uploaded_by,
    uploaded_by_name: nameById.get(r.uploaded_by) ?? null,
  }));

  return NextResponse.json({
    documents,
    can_manage: canManageFundDocuments(profile),
  });
}

export async function POST(req: Request, ctx: Ctx) {
  await requireAuth();
  const profile = await getProfile();

  const { id: fundId } = await ctx.params;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Expected multipart form-data' }, { status: 400 });
  }

  // Preserve existing reporting-obligation upload when obligation_id is supplied.
  const obligationId = String(form.get('obligation_id') ?? '').trim();
  if (obligationId) {
    const { can } = await import('@/lib/auth/permissions');
    const { uploadReportingObligationDocument } = await import(
      '@/lib/portfolio/reporting-obligation-document-upload'
    );
    if (!profile || !can(profile, 'write:applications')) {
      return forbidden("You do not have permission to perform this action. Contact your administrator if you believe this is incorrect.");
    }
    const supabase = createServerClient();
    const { data: fund, error: fErr } = await supabase
      .from('vc_portfolio_funds')
      .select('id')
      .eq('tenant_id', profile.tenant_id)
      .eq('id', fundId)
      .maybeSingle();
    if (fErr || !fund) {
      return NextResponse.json({ error: 'Fund not found' }, { status: 404 });
    }
    const file = form.get('file');
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'file is required' }, { status: 400 });
    }
    const result = await uploadReportingObligationDocument(
      supabase,
      profile,
      obligationId,
      file,
      form.get('submitted_date'),
      fundId,
    );
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    return NextResponse.json({
      document_path: result.document_path,
      document_name: result.document_name,
      obligation: result.obligation,
      suggest_extraction: result.suggest_extraction,
    });
  }

  // Fund library upload
  if (!canManageFundDocuments(profile)) {
    return forbidden("You do not have permission to perform this action. Contact your administrator if you believe this is incorrect.");
  }

  const fundCheck = await assertFundInTenant(fundId, profile!.tenant_id);
  if (!fundCheck.ok) {
    return NextResponse.json({ error: fundCheck.error }, { status: fundCheck.status });
  }

  const file = form.get('file');
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'A file is required' }, { status: 400 });
  }

  const parsed = uploadMetadataSchema.safeParse({
    category: String(form.get('category') ?? ''),
    notes: form.get('notes') == null ? null : String(form.get('notes')),
    effective_date: form.get('effective_date') == null ? null : String(form.get('effective_date')),
  });
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? 'Validation failed';
    return NextResponse.json({ error: msg }, { status: 400 });
  }

  const fileCheck = validateFundDocumentFile(file);
  if (!fileCheck.ok) {
    return NextResponse.json({ error: fileCheck.error }, { status: 400 });
  }

  const derivedTitle = titleFromFilename(file.name).slice(0, 300);
  if (!derivedTitle) {
    return NextResponse.json(
      { error: 'Could not derive a document title from the filename' },
      { status: 400 },
    );
  }

  const documentId = crypto.randomUUID();
  const objectPath = portfolioFundDocumentObjectPath(
    profile!.tenant_id,
    fundId,
    documentId,
    file.name,
  );
  const buf = Buffer.from(await file.arrayBuffer());
  const effectiveDate =
    parsed.data.effective_date && parsed.data.effective_date.length > 0
      ? parsed.data.effective_date
      : null;
  const notes = parsed.data.notes?.trim() ? parsed.data.notes.trim() : null;

  const { error: upErr } = await fundCheck.supabase.storage
    .from(PORTFOLIO_FUND_DOCUMENT_BUCKET)
    .upload(objectPath, buf, {
      contentType: fileCheck.contentType,
      upsert: false,
    });
  if (upErr) {
    console.error('[fund-documents] storage upload failed', upErr.message);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }

  const insertRow = {
    id: documentId,
    tenant_id: profile!.tenant_id,
    fund_id: fundId,
    title: derivedTitle,
    category: parsed.data.category,
    document_path: objectPath,
    document_name: file.name,
    mime_type: fileCheck.contentType,
    file_size: file.size,
    notes,
    effective_date: effectiveDate,
    uploaded_by: profile!.profile_id,
    updated_by: profile!.profile_id,
  };

  const { data: inserted, error: insErr } = await fundCheck.supabase
    .from('vc_portfolio_fund_documents')
    .insert(insertRow)
    .select(
      'id, title, category, document_name, mime_type, file_size, notes, effective_date, uploaded_at, updated_at, uploaded_by',
    )
    .single();

  if (insErr || !inserted) {
    console.error('[fund-documents] insert failed', insErr?.message);
    await fundCheck.supabase.storage.from(PORTFOLIO_FUND_DOCUMENT_BUCKET).remove([objectPath]);
    return NextResponse.json({ error: 'Failed to save document record' }, { status: 500 });
  }

  scheduleAuditLog({
    tenantId: profile!.tenant_id,
    actorId: profile!.user_id,
    entityType: 'portfolio_fund_document',
    entityId: documentId,
    action: 'document_uploaded',
    afterState: {
      fund_id: fundId,
      title: derivedTitle,
      category: parsed.data.category,
      document_name: file.name,
    },
    metadata: { fund_id: fundId, file_size: file.size },
    ipAddress: clientIpFromRequest(req),
  });

  const row = inserted as PortfolioFundDocumentRecord;
  return NextResponse.json({
    document: {
      id: row.id,
      title: row.title,
      category: row.category,
      document_name: row.document_name,
      mime_type: row.mime_type,
      file_size: row.file_size,
      notes: row.notes,
      effective_date: row.effective_date,
      uploaded_at: row.uploaded_at,
      updated_at: row.updated_at,
      uploaded_by: row.uploaded_by,
      uploaded_by_name: profile!.full_name || profile!.name || profile!.email,
    } satisfies PortfolioFundDocumentListItem,
  });
}
