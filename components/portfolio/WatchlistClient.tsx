'use client';

import Link from 'next/link';
import { Pencil } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';
import { apiErrorDisplay, bannerVariantFromDisplay, type ApiErrorBody } from '@/lib/api/client-error';
import { ApiErrorBanner } from '@/components/ui/ApiErrorBanner';
import type { PortfolioFundRow, WatchlistFundRow } from '@/lib/portfolio/types';

type FilterTab = 'all' | 'stale' | 'escalated';

type FundsApiRow = { fund: PortfolioFundRow };

function rowTone(r: WatchlistFundRow): string {
  if (r.watchlist.escalated) return 'bg-red-50/90';
  const rec = (r.last_divestment_recommendation ?? '').toLowerCase();
  if (rec === 'divest') return 'bg-red-50/50';
  if (rec === 'freeze') return 'bg-orange-50/80';
  if (rec === 'watchlist') return 'bg-amber-50/70';
  return 'bg-white';
}

function formatDistanceToNow(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (!Number.isFinite(seconds) || seconds < 0) return 'just now';
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'}`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'}`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? '' : 's'}`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months === 1 ? '' : 's'}`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? '' : 's'}`;
}

function NotesCell({ notes }: { notes: string | null }) {
  const [expanded, setExpanded] = useState(false);
  if (!notes?.trim()) return <span className="text-gray-400">—</span>;
  const text = notes.trim();
  const short = text.length > 100;
  const shown = expanded || !short ? text : `${text.slice(0, 100)}…`;
  return (
    <div className="max-w-xs whitespace-pre-wrap text-xs text-gray-700">
      {shown}
      {short ? (
        <button
          type="button"
          className="ml-1 font-medium text-[#0F8A6E] hover:underline"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      ) : null}
    </div>
  );
}

export function WatchlistClient() {
  const [rows, setRows] = useState<WatchlistFundRow[]>([]);
  const [canManage, setCanManage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterTab>('all');

  const [showAddModal, setShowAddModal] = useState(false);
  const [fundOptions, setFundOptions] = useState<{ id: string; fund_name: string }[]>([]);
  const [addFundId, setAddFundId] = useState('');
  const [addReason, setAddReason] = useState('');
  const [addNotes, setAddNotes] = useState('');
  const [addBusy, setAddBusy] = useState(false);
  const [addErr, setAddErr] = useState<string | null>(null);

  const [removeTarget, setRemoveTarget] = useState<WatchlistFundRow | null>(null);
  const [removeReason, setRemoveReason] = useState('');
  const [removeBusy, setRemoveBusy] = useState(false);
  const [removeErr, setRemoveErr] = useState<string | null>(null);

  const [editingFundId, setEditingFundId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [notesBusy, setNotesBusy] = useState(false);

  const [actionBusyId, setActionBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setErr(null);
    setLoading(true);
    const res = await fetch('/api/portfolio/watchlist');
    const j = (await res.json()) as {
      rows?: WatchlistFundRow[];
      can_manage?: boolean;
      error?: string;
    };
    if (!res.ok) {
      setErr(apiErrorDisplay(j, 'Failed to load watchlist'));
      setRows([]);
      setCanManage(false);
    } else {
      setRows(j.rows ?? []);
      setCanManage(!!j.can_manage);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    if (filter === 'stale') return rows.filter((r) => r.is_stale);
    if (filter === 'escalated') return rows.filter((r) => r.watchlist.escalated);
    return rows;
  }, [rows, filter]);

  const openAddModal = async () => {
    setShowAddModal(true);
    setAddErr(null);
    setAddFundId('');
    setAddReason('');
    setAddNotes('');
    const res = await fetch('/api/portfolio/funds?status=active');
    const j = (await res.json()) as { funds?: FundsApiRow[]; error?: string };
    if (!res.ok) {
      setAddErr(apiErrorDisplay(j, 'Failed to load funds'));
      setFundOptions([]);
      return;
    }
    const onList = new Set(rows.map((r) => r.watchlist.fund_id));
    setFundOptions(
      (j.funds ?? [])
        .map((x) => x.fund)
        .filter((f) => !onList.has(f.id))
        .map((f) => ({ id: f.id, fund_name: f.fund_name })),
    );
  };

  const submitAdd = async () => {
    if (!addFundId || !addReason.trim()) {
      setAddErr('Fund and reason are required');
      return;
    }
    setAddBusy(true);
    setAddErr(null);
    const res = await fetch('/api/portfolio/watchlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fund_id: addFundId,
        reason: addReason.trim(),
        notes: addNotes.trim() || null,
      }),
    });
    const j = (await res.json().catch(() => ({}))) as ApiErrorBody;
    setAddBusy(false);
    if (!res.ok) {
      setAddErr(apiErrorDisplay(j, 'Failed to add'));
      return;
    }
    setShowAddModal(false);
    await load();
  };

  const submitRemove = async () => {
    if (!removeTarget || !removeReason.trim()) {
      setRemoveErr('Removal reason is required');
      return;
    }
    setRemoveBusy(true);
    setRemoveErr(null);
    const res = await fetch('/api/portfolio/watchlist', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fund_id: removeTarget.watchlist.fund_id,
        reason: removeReason.trim(),
      }),
    });
    const j = (await res.json().catch(() => ({}))) as ApiErrorBody;
    setRemoveBusy(false);
    if (!res.ok) {
      setRemoveErr(apiErrorDisplay(j, 'Failed to remove'));
      return;
    }
    setRemoveTarget(null);
    setRemoveReason('');
    await load();
  };

  const saveNotes = async (fundId: string) => {
    setNotesBusy(true);
    setErr(null);
    const res = await fetch('/api/portfolio/watchlist', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fund_id: fundId, notes: editNotes }),
    });
    const j = (await res.json().catch(() => ({}))) as ApiErrorBody;
    setNotesBusy(false);
    if (!res.ok) {
      setErr(apiErrorDisplay(j, 'Failed to update notes'));
      return;
    }
    setEditingFundId(null);
    await load();
  };

  const markReviewed = async (fundId: string) => {
    setActionBusyId(fundId);
    setErr(null);
    const res = await fetch('/api/portfolio/watchlist', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fund_id: fundId, mark_reviewed: true }),
    });
    const j = (await res.json().catch(() => ({}))) as ApiErrorBody;
    setActionBusyId(null);
    if (!res.ok) {
      setErr(apiErrorDisplay(j, 'Failed to mark reviewed'));
      return;
    }
    await load();
  };

  const tabClass = (t: FilterTab) =>
    cn(
      'rounded-md px-3 py-1.5 text-sm font-medium',
      filter === t ? 'bg-[#0B1F45] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    );

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F45]">Watchlist</h1>
          <p className="mt-1 text-sm text-gray-600">Funds requiring elevated monitoring</p>
        </div>
        {canManage ? (
          <button
            type="button"
            onClick={() => void openAddModal()}
            className="rounded-lg bg-[#0F8A6E] px-4 py-2 text-sm font-medium text-white hover:bg-[#0d7a61]"
          >
            + Add to watchlist
          </button>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" className={tabClass('all')} onClick={() => setFilter('all')}>
          All
        </button>
        <button type="button" className={tabClass('stale')} onClick={() => setFilter('stale')}>
          Stale
        </button>
        <button type="button" className={tabClass('escalated')} onClick={() => setFilter('escalated')}>
          Escalated
        </button>
      </div>

      {err ? <ApiErrorBanner message={err} variant={bannerVariantFromDisplay(err)} /> : null}

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-xs font-semibold uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Fund</th>
              <th className="px-4 py-3">On watchlist since</th>
              <th className="px-4 py-3">Consecutive Q</th>
              <th className="px-4 py-3">Escalated</th>
              <th className="px-4 py-3">Last period</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Recommendation</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3">Review</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={11} className="px-4 py-10 text-center text-gray-500">
                  Loading…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-4 py-10 text-center text-gray-500">
                  {rows.length === 0
                    ? 'No funds on the watchlist. Funds appear here after an approved assessment with a watchlist-level recommendation, or via manual placement.'
                    : 'No funds match this filter.'}
                </td>
              </tr>
            ) : (
              filtered.map((r) => {
                const placement = r.watchlist.placement_type === 'manual' ? 'manual' : 'automatic';
                const reviewedAt = r.watchlist.last_reviewed_at
                  ? new Date(r.watchlist.last_reviewed_at)
                  : null;
                return (
                  <tr key={r.watchlist.id} className={cn('border-b border-gray-100', rowTone(r))}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-[#0B1F45]">{r.fund_name}</div>
                      <div className="mt-1 flex flex-wrap items-center gap-1.5">
                        <span
                          className={cn(
                            'inline-flex rounded-full border px-2 py-0.5 text-[11px] font-medium',
                            placement === 'manual'
                              ? 'border-amber-300 bg-amber-50 text-amber-800'
                              : 'border-teal-300 bg-teal-50 text-teal-800',
                          )}
                        >
                          {placement === 'manual' ? 'Manual' : 'Auto'}
                        </span>
                        {r.is_stale ? (
                          <span className="inline-flex rounded-full border border-amber-400 bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-900">
                            No assessment in 90+ days
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{r.watchlist.placed_on_watchlist}</td>
                    <td className="px-4 py-3 tabular-nums">{r.watchlist.consecutive_quarters}</td>
                    <td className="px-4 py-3">
                      {r.watchlist.escalated ? <span className="font-medium text-red-800">Yes</span> : 'No'}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{r.last_assessment_period ?? '—'}</td>
                    <td className="px-4 py-3 tabular-nums">
                      {r.last_weighted_total_score != null ? r.last_weighted_total_score.toFixed(1) : '—'}
                    </td>
                    <td className="px-4 py-3 capitalize text-gray-800">{r.last_category ?? '—'}</td>
                    <td className="px-4 py-3 capitalize text-gray-800">
                      {r.last_divestment_recommendation?.replace(/_/g, ' ') ?? '—'}
                    </td>
                    <td className="px-4 py-3">
                      {editingFundId === r.watchlist.fund_id ? (
                        <div className="space-y-2">
                          <textarea
                            className="w-full min-w-[180px] rounded border border-gray-300 px-2 py-1 text-xs"
                            rows={3}
                            value={editNotes}
                            onChange={(e) => setEditNotes(e.target.value)}
                          />
                          <div className="flex gap-2">
                            <button
                              type="button"
                              disabled={notesBusy}
                              className="text-xs font-medium text-[#0F8A6E] hover:underline disabled:opacity-50"
                              onClick={() => void saveNotes(r.watchlist.fund_id)}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="text-xs text-gray-500 hover:underline"
                              onClick={() => setEditingFundId(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-1">
                          <NotesCell notes={r.watchlist.notes} />
                          {canManage ? (
                            <button
                              type="button"
                              className="shrink-0 rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                              title="Edit notes"
                              onClick={() => {
                                setEditingFundId(r.watchlist.fund_id);
                                setEditNotes(r.watchlist.notes ?? '');
                              }}
                            >
                              <Pencil className="h-3.5 w-3.5" aria-hidden />
                            </button>
                          ) : null}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-[11px] text-gray-500">
                        {reviewedAt && !Number.isNaN(reviewedAt.getTime())
                          ? `Reviewed ${formatDistanceToNow(reviewedAt)} ago`
                          : 'Never reviewed'}
                      </div>
                      {canManage ? (
                        <button
                          type="button"
                          disabled={actionBusyId === r.watchlist.fund_id}
                          className="mt-1 text-[11px] font-medium text-[#1D9E75] hover:underline disabled:opacity-50"
                          onClick={() => void markReviewed(r.watchlist.fund_id)}
                        >
                          Mark reviewed
                        </button>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex flex-col items-end gap-1">
                        <Link
                          href={`/portfolio/funds/${r.watchlist.fund_id}`}
                          className="text-sm font-medium text-[#0F8A6E] hover:underline"
                        >
                          Open fund
                        </Link>
                        {canManage ? (
                          <button
                            type="button"
                            className="text-xs font-medium text-red-700 hover:underline"
                            onClick={() => {
                              setRemoveTarget(r);
                              setRemoveReason('');
                              setRemoveErr(null);
                            }}
                          >
                            Remove
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {showAddModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-lg">
            <h2 className="text-lg font-semibold text-[#0B1F45]">Add to watchlist</h2>
            <p className="mt-1 text-sm text-gray-600">Place an active portfolio fund on the watchlist manually.</p>
            <div className="mt-4 space-y-3">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-gray-700">Fund</span>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  value={addFundId}
                  onChange={(e) => setAddFundId(e.target.value)}
                >
                  <option value="">Select a fund…</option>
                  {fundOptions.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.fund_name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-gray-700">Reason (required)</span>
                <input
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  value={addReason}
                  onChange={(e) => setAddReason(e.target.value)}
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-gray-700">Notes (optional)</span>
                <textarea
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  rows={3}
                  value={addNotes}
                  onChange={(e) => setAddNotes(e.target.value)}
                />
              </label>
              {addErr ? <ApiErrorBanner message={addErr} variant={bannerVariantFromDisplay(addErr)} /> : null}
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
                onClick={() => setShowAddModal(false)}
                disabled={addBusy}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={addBusy}
                className="rounded-lg bg-[#0F8A6E] px-4 py-2 text-sm font-medium text-white hover:bg-[#0d7a61] disabled:opacity-50"
                onClick={() => void submitAdd()}
              >
                {addBusy ? 'Adding…' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {removeTarget ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-lg">
            <h2 className="text-lg font-semibold text-[#0B1F45]">Remove from watchlist</h2>
            <p className="mt-1 text-sm text-gray-600">
              Remove <span className="font-medium">{removeTarget.fund_name}</span> and record a reason.
            </p>
            <label className="mt-4 block text-sm">
              <span className="mb-1 block font-medium text-gray-700">Removal reason</span>
              <textarea
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                rows={3}
                value={removeReason}
                onChange={(e) => setRemoveReason(e.target.value)}
              />
            </label>
            {removeErr ? <ApiErrorBanner message={removeErr} variant={bannerVariantFromDisplay(removeErr)} /> : null}
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
                onClick={() => setRemoveTarget(null)}
                disabled={removeBusy}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={removeBusy}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                onClick={() => void submitRemove()}
              >
                {removeBusy ? 'Removing…' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
