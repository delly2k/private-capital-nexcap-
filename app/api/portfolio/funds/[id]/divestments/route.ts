import { NextResponse } from 'next/server';
import { forbidden } from '@/lib/api/error-responses';

import { can } from '@/lib/auth/permissions';
import { getProfile, requireAuth } from '@/lib/auth/session';
import { DIVESTMENT_SELECT, type DivestmentRow, summarizeDivestments } from '@/lib/portfolio/divestments';
import { createServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  await requireAuth();
  const profile = await getProfile();
  if (!profile || !can(profile, 'read:tenant')) {
    return forbidden("Your role does not have permission to manage divestments. Contact your administrator.");
  }

  const { id: fundId } = await ctx.params;
  const supabase = createServerClient();

  const { data: fund, error: fErr } = await supabase
    .from('vc_portfolio_funds')
    .select('id, fund_name, exchange_rate_jmd_usd')
    .eq('tenant_id', profile.tenant_id)
    .eq('id', fundId)
    .maybeSingle();
  if (fErr) return NextResponse.json({ error: fErr.message }, { status: 500 });
  if (!fund) return NextResponse.json({ error: 'Fund not found' }, { status: 404 });

  const { data, error } = await supabase
    .from('vc_divestments')
    .select(DIVESTMENT_SELECT)
    .eq('tenant_id', profile.tenant_id)
    .eq('fund_id', fundId)
    .order('completion_date', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const divestments = (data ?? []) as DivestmentRow[];
  const fundById = new Map([
    [
      fundId,
      {
        fund_name: String((fund as { fund_name: string }).fund_name),
        exchange_rate_jmd_usd: (fund as { exchange_rate_jmd_usd?: number | null }).exchange_rate_jmd_usd ?? null,
      },
    ],
  ]);
  return NextResponse.json({
    divestments,
    summary: summarizeDivestments(divestments, fundById),
  });
}
