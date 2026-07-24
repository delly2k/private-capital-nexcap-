import { NextResponse } from 'next/server';
import { forbidden } from '@/lib/api/error-responses';

import { createServerClient } from '@/lib/supabase/server';
import { getProfile, requireAuth } from '@/lib/auth/session';
import { can } from '@/lib/auth/permissions';
import { uploadReportingObligationDocument } from '@/lib/portfolio/reporting-obligation-document-upload';

export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export async function POST(req: Request, ctx: Ctx) {
  await requireAuth();
  const profile = await getProfile();
  if (!profile || !can(profile, 'write:applications')) {
    return forbidden("Your role does not have permission to manage reporting obligations. Contact your administrator.");
  }
  const { id } = await ctx.params;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Expected multipart form-data' }, { status: 400 });
  }

  const file = form.get('file');
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'file is required' }, { status: 400 });
  }

  const supabase = createServerClient();
  const result = await uploadReportingObligationDocument(
    supabase,
    profile,
    id,
    file,
    form.get('submitted_date'),
    undefined,
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
