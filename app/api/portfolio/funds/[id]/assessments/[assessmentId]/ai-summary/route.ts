import { NextResponse } from 'next/server';
import { forbidden } from '@/lib/api/error-responses';

import { getProfile, requireAuth } from '@/lib/auth/session';
import { can } from '@/lib/auth/permissions';
import { generateAndPersistQuarterlyAiSummary } from '@/lib/portfolio/assessment-ai-summary';
import { createServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string; assessmentId: string }> };

export async function POST(_req: Request, ctx: Ctx) {
  await requireAuth();
  const profile = await getProfile();
  if (!profile || !can(profile, 'write:applications')) {
    return forbidden("Your role does not have permission to manage assessments. Contact your administrator.");
  }

  const { id: fundId, assessmentId } = await ctx.params;
  const supabase = createServerClient();

  const result = await generateAndPersistQuarterlyAiSummary(supabase, {
    tenantId: profile.tenant_id,
    fundId,
    assessmentId,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ summary: result.summary });
}
