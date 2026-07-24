import { NextResponse } from 'next/server';
import { forbidden } from '@/lib/api/error-responses';

import { canReadFundDocuments } from '@/lib/portfolio/fund-document-access';
import { PORTFOLIO_FUND_DOCUMENT_BUCKET } from '@/lib/portfolio/fund-documents';
import { getProfile, requireAuth } from '@/lib/auth/session';
import { createServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string; documentId: string }> };

/** Short-lived signed URL for a fund library document. */
export async function GET(_req: Request, ctx: Ctx) {
  await requireAuth();
  const profile = await getProfile();
  if (!canReadFundDocuments(profile)) {
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

  const { data: doc, error } = await supabase
    .from('vc_portfolio_fund_documents')
    .select('document_path, document_name')
    .eq('tenant_id', profile!.tenant_id)
    .eq('fund_id', fundId)
    .eq('id', documentId)
    .maybeSingle();

  if (error) {
    console.error('[fund-documents] download lookup failed', error.message);
    return NextResponse.json({ error: 'Failed to load document' }, { status: 500 });
  }
  if (!doc) return NextResponse.json({ error: 'Document not found' }, { status: 404 });

  const path = (doc as { document_path: string }).document_path;
  const { data: signed, error: sErr } = await supabase.storage
    .from(PORTFOLIO_FUND_DOCUMENT_BUCKET)
    .createSignedUrl(path, 3600);

  if (sErr || !signed?.signedUrl) {
    console.error('[fund-documents] sign failed', sErr?.message);
    return NextResponse.json({ error: 'Could not create download link' }, { status: 500 });
  }

  return NextResponse.json({
    url: signed.signedUrl,
    document_name: (doc as { document_name: string }).document_name,
  });
}
