import { NextResponse } from 'next/server';
import { z } from 'zod';

import { getProfile, requireAuth } from '@/lib/auth/session';
import { can } from '@/lib/auth/permissions';
import { createServerClient } from '@/lib/supabase/server';
import type { VcQuarterlyAssessment, VcWatchlistEntry } from '@/types/database';
import type { WatchlistFundRow } from '@/lib/portfolio/types';
import type { Profile } from '@/types/auth';

export const dynamic = 'force-dynamic';

const STALE_DAYS = 90;

const postSchema = z.object({
  fund_id: z.string().uuid(),
  reason: z.string().trim().min(1),
  notes: z.string().optional().nullable(),
});

const patchSchema = z.object({
  fund_id: z.string().uuid(),
  notes: z.string().optional().nullable(),
  mark_reviewed: z.boolean().optional(),
});

const deleteSchema = z.object({
  fund_id: z.string().uuid(),
  reason: z.string().trim().min(1),
});

function canManageWatchlist(profile: Profile): boolean {
  return (
    profile.role === 'admin' ||
    profile.role === 'pctu_officer' ||
    profile.role === 'investment_officer'
  );
}

function daysBetween(from: Date, to: Date): number {
  const ms = to.getTime() - from.getTime();
  return Math.floor(ms / (86400000));
}

function isStaleEntry(row: VcWatchlistEntry, now: Date): boolean {
  if (!row.last_assessed_at) return true;
  const assessed = new Date(row.last_assessed_at);
  if (Number.isNaN(assessed.getTime())) return true;
  return daysBetween(assessed, now) > STALE_DAYS;
}

export async function GET() {
  await requireAuth();
  const profile = await getProfile();
  if (!profile || !can(profile, 'read:tenant')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const supabase = createServerClient();
  const { data: wlRows, error } = await supabase
    .from('vc_watchlist')
    .select('*')
    .eq('tenant_id', profile.tenant_id)
    .order('escalated', { ascending: false })
    .order('consecutive_quarters', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const list = (wlRows ?? []) as VcWatchlistEntry[];
  const now = new Date();
  if (list.length === 0) {
    return NextResponse.json({
      rows: [] as WatchlistFundRow[],
      can_manage: canManageWatchlist(profile),
      stale_count: 0,
    });
  }

  const fundIds = [...new Set(list.map((w) => w.fund_id))];
  const { data: funds } = await supabase
    .from('vc_portfolio_funds')
    .select('id, fund_name, currency, is_pvc')
    .eq('tenant_id', profile.tenant_id)
    .in('id', fundIds);
  const fundMap = new Map(
    (funds ?? []).map((f) => [
      (f as { id: string }).id,
      f as { fund_name: string; currency: string; is_pvc: boolean | null },
    ]),
  );

  const assessIds = list.map((w) => w.last_assessment_id).filter((x): x is string => !!x);
  const { data: assess } = assessIds.length
    ? await supabase
        .from('vc_quarterly_assessments')
        .select('id, weighted_total_score, category, divestment_recommendation, assessment_period')
        .eq('tenant_id', profile.tenant_id)
        .in('id', assessIds)
    : { data: [] as VcQuarterlyAssessment[] };
  const assessMap = new Map((assess ?? []).map((r) => [(r as { id: string }).id, r as VcQuarterlyAssessment]));

  const rows: WatchlistFundRow[] = list.map((w) => {
    const f = fundMap.get(w.fund_id);
    const la = w.last_assessment_id ? assessMap.get(w.last_assessment_id) : undefined;
    return {
      watchlist: w,
      fund_name: f?.fund_name ?? '—',
      currency: f?.currency ?? 'USD',
      is_pvc: f?.is_pvc ?? null,
      last_weighted_total_score: la?.weighted_total_score != null ? Number(la.weighted_total_score) : null,
      last_category: la?.category ?? null,
      last_divestment_recommendation: la?.divestment_recommendation ?? null,
      last_assessment_period: la?.assessment_period ?? null,
      is_stale: isStaleEntry(w, now),
    };
  });

  return NextResponse.json({
    rows,
    can_manage: canManageWatchlist(profile),
    stale_count: rows.filter((r) => r.is_stale).length,
  });
}

export async function POST(req: Request) {
  await requireAuth();
  const profile = await getProfile();
  if (!profile || !can(profile, 'write:applications') || !canManageWatchlist(profile)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: z.infer<typeof postSchema>;
  try {
    body = postSchema.parse(await req.json());
  } catch (e) {
    const msg = e instanceof z.ZodError ? e.flatten().fieldErrors : 'Invalid body';
    return NextResponse.json({ error: 'Validation failed', details: msg }, { status: 400 });
  }

  const supabase = createServerClient();
  const { data: fund, error: fundErr } = await supabase
    .from('vc_portfolio_funds')
    .select('id')
    .eq('tenant_id', profile.tenant_id)
    .eq('id', body.fund_id)
    .maybeSingle();
  if (fundErr) return NextResponse.json({ error: fundErr.message }, { status: 500 });
  if (!fund) return NextResponse.json({ error: 'Fund not found' }, { status: 404 });

  const today = new Date().toISOString().slice(0, 10);
  const notes = body.notes?.trim() || body.reason.trim();

  const { data: existing, error: selErr } = await supabase
    .from('vc_watchlist')
    .select('id, placed_on_watchlist, consecutive_quarters, escalated, escalated_at, notes')
    .eq('tenant_id', profile.tenant_id)
    .eq('fund_id', body.fund_id)
    .maybeSingle();
  if (selErr) return NextResponse.json({ error: selErr.message }, { status: 500 });

  if (existing) {
    const { data: updated, error: upErr } = await supabase
      .from('vc_watchlist')
      .update({
        placement_type: 'manual',
        placed_by: profile.profile_id,
        notes,
      })
      .eq('id', (existing as { id: string }).id)
      .eq('tenant_id', profile.tenant_id)
      .select('*')
      .single();
    if (upErr || !updated) {
      return NextResponse.json({ error: upErr?.message ?? 'Update failed' }, { status: 500 });
    }

    const { error: histErr } = await supabase.from('vc_watchlist_history').insert({
      tenant_id: profile.tenant_id,
      fund_id: body.fund_id,
      action: 'updated',
      placement_type: 'manual',
      reason: body.reason.trim(),
      performed_by: profile.profile_id,
      consecutive_quarters: (existing as { consecutive_quarters: number }).consecutive_quarters,
    });
    if (histErr) return NextResponse.json({ error: histErr.message }, { status: 500 });

    return NextResponse.json({ watchlist: updated });
  }

  const { data: inserted, error: insErr } = await supabase
    .from('vc_watchlist')
    .insert({
      tenant_id: profile.tenant_id,
      fund_id: body.fund_id,
      placed_on_watchlist: today,
      consecutive_quarters: 1,
      escalated: false,
      escalated_at: null,
      notes,
      placement_type: 'manual',
      placed_by: profile.profile_id,
      last_assessment_id: null,
      last_assessed_at: null,
    })
    .select('*')
    .single();
  if (insErr || !inserted) {
    return NextResponse.json({ error: insErr?.message ?? 'Insert failed' }, { status: 500 });
  }

  const { error: histErr } = await supabase.from('vc_watchlist_history').insert({
    tenant_id: profile.tenant_id,
    fund_id: body.fund_id,
    action: 'placed',
    placement_type: 'manual',
    reason: body.reason.trim(),
    performed_by: profile.profile_id,
    consecutive_quarters: 1,
  });
  if (histErr) return NextResponse.json({ error: histErr.message }, { status: 500 });

  return NextResponse.json({ watchlist: inserted });
}

export async function PATCH(req: Request) {
  await requireAuth();
  const profile = await getProfile();
  if (!profile || !can(profile, 'write:applications') || !canManageWatchlist(profile)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: z.infer<typeof patchSchema>;
  try {
    body = patchSchema.parse(await req.json());
  } catch (e) {
    const msg = e instanceof z.ZodError ? e.flatten().fieldErrors : 'Invalid body';
    return NextResponse.json({ error: 'Validation failed', details: msg }, { status: 400 });
  }

  if (body.notes === undefined && !body.mark_reviewed) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
  }

  const supabase = createServerClient();
  const { data: existing, error: selErr } = await supabase
    .from('vc_watchlist')
    .select('*')
    .eq('tenant_id', profile.tenant_id)
    .eq('fund_id', body.fund_id)
    .maybeSingle();
  if (selErr) return NextResponse.json({ error: selErr.message }, { status: 500 });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const patch: Record<string, unknown> = {};
  let historyReason: string | null = null;

  if (body.notes !== undefined) {
    patch.notes = body.notes?.trim() || null;
    historyReason = body.notes?.trim() || 'Notes cleared';
  }

  if (body.mark_reviewed) {
    const now = new Date();
    const due = new Date(now);
    due.setDate(due.getDate() + 90);
    patch.last_reviewed_at = now.toISOString();
    patch.last_reviewed_by = profile.profile_id;
    patch.next_review_due = due.toISOString().slice(0, 10);
    historyReason = historyReason ?? 'Marked as reviewed';
  }

  const { data: updated, error: upErr } = await supabase
    .from('vc_watchlist')
    .update(patch)
    .eq('id', (existing as VcWatchlistEntry).id)
    .eq('tenant_id', profile.tenant_id)
    .select('*')
    .single();
  if (upErr || !updated) {
    return NextResponse.json({ error: upErr?.message ?? 'Update failed' }, { status: 500 });
  }

  const { error: histErr } = await supabase.from('vc_watchlist_history').insert({
    tenant_id: profile.tenant_id,
    fund_id: body.fund_id,
    action: 'updated',
    placement_type: (existing as VcWatchlistEntry).placement_type === 'manual' ? 'manual' : 'automatic',
    reason: historyReason,
    performed_by: profile.profile_id,
    consecutive_quarters: (existing as VcWatchlistEntry).consecutive_quarters,
  });
  if (histErr) return NextResponse.json({ error: histErr.message }, { status: 500 });

  return NextResponse.json({ watchlist: updated });
}

export async function DELETE(req: Request) {
  await requireAuth();
  const profile = await getProfile();
  if (!profile || !can(profile, 'write:applications') || !canManageWatchlist(profile)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  let body: z.infer<typeof deleteSchema>;
  try {
    body = deleteSchema.parse(await req.json());
  } catch (e) {
    const msg = e instanceof z.ZodError ? e.flatten().fieldErrors : 'Invalid body';
    return NextResponse.json({ error: 'Validation failed', details: msg }, { status: 400 });
  }

  const supabase = createServerClient();
  const { data: existing, error: selErr } = await supabase
    .from('vc_watchlist')
    .select('*')
    .eq('tenant_id', profile.tenant_id)
    .eq('fund_id', body.fund_id)
    .maybeSingle();
  if (selErr) return NextResponse.json({ error: selErr.message }, { status: 500 });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const row = existing as VcWatchlistEntry;
  const { error: histErr } = await supabase.from('vc_watchlist_history').insert({
    tenant_id: profile.tenant_id,
    fund_id: body.fund_id,
    action: 'removed',
    placement_type: row.placement_type === 'manual' ? 'manual' : 'automatic',
    reason: body.reason.trim(),
    performed_by: profile.profile_id,
    consecutive_quarters: row.consecutive_quarters,
    assessment_id: row.last_assessment_id,
  });
  if (histErr) return NextResponse.json({ error: histErr.message }, { status: 500 });

  const { error: delErr } = await supabase
    .from('vc_watchlist')
    .delete()
    .eq('id', row.id)
    .eq('tenant_id', profile.tenant_id);
  if (delErr) return NextResponse.json({ error: delErr.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
