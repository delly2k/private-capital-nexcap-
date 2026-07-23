import 'server-only';

import { createServerClient } from '@/lib/supabase/server';
import type { VcAssessmentConfig, VcWatchlistEntry } from '@/types/database';

type Client = ReturnType<typeof createServerClient>;

type WatchlistHistoryAction = 'placed' | 'removed' | 'escalated' | 'updated';

type AssessmentSnapshot = {
  assessment_period?: string | null;
  weighted_total_score?: number | string | null;
  category?: string | null;
  ai_summary?: string | null;
};

function buildAutoNotes(assessment: AssessmentSnapshot, recommendation: string): string {
  const scoreRaw = assessment.weighted_total_score;
  const scoreNum = scoreRaw != null && scoreRaw !== '' ? Number(scoreRaw) : null;
  const scoreLabel =
    scoreNum != null && Number.isFinite(scoreNum) ? `${scoreNum.toFixed(1)}/100` : 'N/A';
  const period = (assessment.assessment_period ?? '').trim() || 'Unknown period';
  const category = (assessment.category ?? '').trim() || 'uncategorised';
  const summary = assessment.ai_summary?.trim();
  const parts = [
    `${period} assessment approved.`,
    `Score: ${scoreLabel}.`,
    `Category: ${category}.`,
    `Recommendation: ${recommendation}.`,
    summary ? `AI summary: ${summary.slice(0, 200)}${summary.length > 200 ? '...' : ''}` : null,
  ];
  return parts.filter(Boolean).join(' ');
}

async function insertHistory(
  supabase: Client,
  row: {
    tenant_id: string;
    fund_id: string;
    action: WatchlistHistoryAction;
    placement_type: 'automatic' | 'manual';
    reason?: string | null;
    assessment_id?: string | null;
    performed_by?: string | null;
    consecutive_quarters?: number | null;
    score?: number | null;
    category?: string | null;
  },
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { error } = await supabase.from('vc_watchlist_history').insert({
    tenant_id: row.tenant_id,
    fund_id: row.fund_id,
    action: row.action,
    placement_type: row.placement_type,
    reason: row.reason ?? null,
    assessment_id: row.assessment_id ?? null,
    performed_by: row.performed_by ?? null,
    consecutive_quarters: row.consecutive_quarters ?? null,
    score: row.score ?? null,
    category: row.category ?? null,
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function updateWatchlistAfterApproval(
  supabase: Client,
  params: {
    fundId: string;
    tenantId: string;
    recommendation: string;
    assessmentId: string;
    config: VcAssessmentConfig;
    performedBy?: string | null;
    assessment?: AssessmentSnapshot | null;
  },
): Promise<{ ok: true } | { ok: false; error: string }> {
  const { fundId, tenantId, recommendation, assessmentId, config, performedBy = null } = params;
  const watchRecs = new Set(['watchlist', 'freeze', 'divest']);
  const clearRecs = new Set(['hold', 'monitor']);

  const today = new Date().toISOString().slice(0, 10);
  const nowIso = new Date().toISOString();

  let assessment = params.assessment ?? null;
  if (!assessment) {
    const { data: assessRow } = await supabase
      .from('vc_quarterly_assessments')
      .select('assessment_period, weighted_total_score, category, ai_summary')
      .eq('tenant_id', tenantId)
      .eq('id', assessmentId)
      .maybeSingle();
    assessment = (assessRow as AssessmentSnapshot | null) ?? null;
  }

  const scoreRaw = assessment?.weighted_total_score;
  const scoreNum = scoreRaw != null && scoreRaw !== '' ? Number(scoreRaw) : null;
  const score = scoreNum != null && Number.isFinite(scoreNum) ? scoreNum : null;
  const category = assessment?.category ?? null;
  const autoNotes = buildAutoNotes(assessment ?? {}, recommendation);

  const { data: existingRaw, error: selErr } = await supabase
    .from('vc_watchlist')
    .select(
      'id, consecutive_quarters, placed_on_watchlist, escalated, escalated_at, notes, placement_type',
    )
    .eq('tenant_id', tenantId)
    .eq('fund_id', fundId)
    .maybeSingle();

  if (selErr) return { ok: false, error: selErr.message };

  const existing = existingRaw as Pick<
    VcWatchlistEntry,
    | 'id'
    | 'consecutive_quarters'
    | 'placed_on_watchlist'
    | 'escalated'
    | 'escalated_at'
    | 'notes'
    | 'placement_type'
  > | null;

  if (clearRecs.has(recommendation)) {
    if (existing) {
      const hist = await insertHistory(supabase, {
        tenant_id: tenantId,
        fund_id: fundId,
        action: 'removed',
        placement_type: existing.placement_type === 'manual' ? 'manual' : 'automatic',
        reason: `Cleared by approved recommendation: ${recommendation}`,
        assessment_id: assessmentId,
        performed_by: performedBy,
        consecutive_quarters: existing.consecutive_quarters,
        score,
        category,
      });
      if (!hist.ok) return hist;
    }
    const { error } = await supabase.from('vc_watchlist').delete().eq('tenant_id', tenantId).eq('fund_id', fundId);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  }

  if (!watchRecs.has(recommendation)) {
    return { ok: true };
  }

  const threshold = config.watchlist_escalation_quarters;
  const nextQuarters = existing ? existing.consecutive_quarters + 1 : 1;
  const escalated = nextQuarters >= threshold;
  const placed = existing ? existing.placed_on_watchlist : today;
  const prevEsc = existing ? !!existing.escalated : false;
  const prevAt = existing?.escalated_at ?? null;
  const escalated_at = escalated ? (prevEsc ? prevAt : nowIso) : null;
  const notes = existing?.notes?.trim() ? `${existing.notes.trim()}\n\n${autoNotes}` : autoNotes;

  const row = {
    tenant_id: tenantId,
    fund_id: fundId,
    placed_on_watchlist: placed,
    consecutive_quarters: nextQuarters,
    last_assessment_id: assessmentId,
    escalated,
    escalated_at,
    notes,
    placement_type: 'automatic' as const,
    placed_by: null as string | null,
    last_assessed_at: nowIso,
  };

  if (existing) {
    const { error } = await supabase
      .from('vc_watchlist')
      .update(row)
      .eq('id', existing.id)
      .eq('tenant_id', tenantId);
    if (error) return { ok: false, error: error.message };

    const updatedHist = await insertHistory(supabase, {
      tenant_id: tenantId,
      fund_id: fundId,
      action: 'updated',
      placement_type: 'automatic',
      reason: autoNotes,
      assessment_id: assessmentId,
      performed_by: performedBy,
      consecutive_quarters: nextQuarters,
      score,
      category,
    });
    if (!updatedHist.ok) return updatedHist;

    if (escalated && !prevEsc) {
      const escHist = await insertHistory(supabase, {
        tenant_id: tenantId,
        fund_id: fundId,
        action: 'escalated',
        placement_type: 'automatic',
        reason: `Escalated after ${nextQuarters} consecutive quarter(s) (threshold ${threshold}).`,
        assessment_id: assessmentId,
        performed_by: performedBy,
        consecutive_quarters: nextQuarters,
        score,
        category,
      });
      if (!escHist.ok) return escHist;
    }
  } else {
    const { error } = await supabase.from('vc_watchlist').insert(row);
    if (error) return { ok: false, error: error.message };

    const placedHist = await insertHistory(supabase, {
      tenant_id: tenantId,
      fund_id: fundId,
      action: 'placed',
      placement_type: 'automatic',
      reason: autoNotes,
      assessment_id: assessmentId,
      performed_by: performedBy,
      consecutive_quarters: nextQuarters,
      score,
      category,
    });
    if (!placedHist.ok) return placedHist;

    if (escalated) {
      const escHist = await insertHistory(supabase, {
        tenant_id: tenantId,
        fund_id: fundId,
        action: 'escalated',
        placement_type: 'automatic',
        reason: `Escalated after ${nextQuarters} consecutive quarter(s) (threshold ${threshold}).`,
        assessment_id: assessmentId,
        performed_by: performedBy,
        consecutive_quarters: nextQuarters,
        score,
        category,
      });
      if (!escHist.ok) return escHist;
    }
  }

  return { ok: true };
}
