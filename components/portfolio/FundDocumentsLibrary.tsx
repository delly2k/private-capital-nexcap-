'use client';

import { apiErrorDisplay, bannerVariantFromDisplay, type ApiErrorBody } from '@/lib/api/client-error';

import { useCallback, useEffect, useState } from 'react';

import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { ApiErrorBanner } from '@/components/ui/ApiErrorBanner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  PORTFOLIO_FUND_DOCUMENT_ALLOWED_EXTENSIONS,
  PORTFOLIO_FUND_DOCUMENT_CATEGORY_LABELS,
  PORTFOLIO_FUND_DOCUMENT_CATEGORIES,
  PORTFOLIO_FUND_DOCUMENT_MAX_BYTES,
  type PortfolioFundDocumentCategory,
  type PortfolioFundDocumentListItem,
} from '@/lib/portfolio/fund-documents';
import { titleFromFilename } from '@/lib/portfolio/title-from-filename';
import { cn } from '@/lib/utils';

function formatBytes(n: number | null): string {
  if (n == null || !Number.isFinite(n)) return '—';
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso.length === 10 ? `${iso}T12:00:00` : iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

type Props = {
  fundId: string;
  canManage: boolean;
};

export function FundDocumentsLibrary({ fundId, canManage }: Props) {
  const [rows, setRows] = useState<PortfolioFundDocumentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [category, setCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [searchDebounced, setSearchDebounced] = useState('');

  const [showUpload, setShowUpload] = useState(false);
  const [uploadBusy, setUploadBusy] = useState(false);
  const [uploadErr, setUploadErr] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [upCategory, setUpCategory] = useState<PortfolioFundDocumentCategory>('legal_agreement');
  const [notes, setNotes] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');

  const [editRow, setEditRow] = useState<PortfolioFundDocumentListItem | null>(null);
  const [editBusy, setEditBusy] = useState(false);
  const [editErr, setEditErr] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState<PortfolioFundDocumentCategory>('other');
  const [editNotes, setEditNotes] = useState('');
  const [editEffective, setEditEffective] = useState('');

  const [replaceRow, setReplaceRow] = useState<PortfolioFundDocumentListItem | null>(null);
  const [replaceFile, setReplaceFile] = useState<File | null>(null);
  const [replaceBusy, setReplaceBusy] = useState(false);
  const [replaceErr, setReplaceErr] = useState<string | null>(null);

  const [deleteRow, setDeleteRow] = useState<PortfolioFundDocumentListItem | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSearchDebounced(search.trim()), 250);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (searchDebounced) params.set('search', searchDebounced);
    params.set('sort', 'newest');
    const res = await fetch(`/api/portfolio/funds/${fundId}/documents?${params.toString()}`);
    const j = (await res.json()) as {
      documents?: PortfolioFundDocumentListItem[];
      error?: string;
    };
    if (!res.ok) {
      setErr(apiErrorDisplay(j, 'Failed to load fund documents'));
      setRows([]);
    } else {
      setRows(j.documents ?? []);
    }
    setLoading(false);
  }, [fundId, category, searchDebounced]);

  useEffect(() => {
    void load();
  }, [load]);

  const openUpload = () => {
    setShowUpload(true);
    setUploadErr(null);
    setFile(null);
    setGeneratedTitle('');
    setUpCategory('legal_agreement');
    setNotes('');
    setEffectiveDate('');
  };

  const onPickFile = (f: File | null) => {
    setFile(f);
    setGeneratedTitle(f ? titleFromFilename(f.name) : '');
  };

  const submitUpload = async () => {
    if (!file) {
      setUploadErr('Select a file');
      return;
    }
    if (!titleFromFilename(file.name)) {
      setUploadErr('Could not derive a document title from the filename');
      return;
    }
    setUploadBusy(true);
    setUploadErr(null);
    const fd = new FormData();
    fd.set('file', file);
    fd.set('category', upCategory);
    if (notes.trim()) fd.set('notes', notes.trim());
    if (effectiveDate) fd.set('effective_date', effectiveDate);
    const res = await fetch(`/api/portfolio/funds/${fundId}/documents`, { method: 'POST', body: fd });
    const j = (await res.json()) as { error?: string };
    setUploadBusy(false);
    if (!res.ok) {
      setUploadErr(apiErrorDisplay(j, 'Upload failed'));
      return;
    }
    setShowUpload(false);
    setOkMsg('Document uploaded.');
    await load();
  };

  const openEdit = (r: PortfolioFundDocumentListItem) => {
    setEditRow(r);
    setEditErr(null);
    setEditTitle(r.title);
    setEditCategory(r.category);
    setEditNotes(r.notes ?? '');
    setEditEffective(r.effective_date ?? '');
  };

  const submitEdit = async () => {
    if (!editRow) return;
    setEditBusy(true);
    setEditErr(null);
    const res = await fetch(`/api/portfolio/funds/${fundId}/documents/${editRow.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editTitle.trim(),
        category: editCategory,
        notes: editNotes.trim() || null,
        effective_date: editEffective || null,
      }),
    });
    const j = (await res.json()) as { error?: string };
    setEditBusy(false);
    if (!res.ok) {
      setEditErr(apiErrorDisplay(j, 'Update failed'));
      return;
    }
    setEditRow(null);
    setOkMsg('Document details updated.');
    await load();
  };

  const submitReplace = async () => {
    if (!replaceRow || !replaceFile) {
      setReplaceErr('Select a replacement file');
      return;
    }
    setReplaceBusy(true);
    setReplaceErr(null);
    const fd = new FormData();
    fd.set('file', replaceFile);
    const res = await fetch(`/api/portfolio/funds/${fundId}/documents/${replaceRow.id}/replace`, {
      method: 'POST',
      body: fd,
    });
    const j = (await res.json()) as { error?: string };
    setReplaceBusy(false);
    if (!res.ok) {
      setReplaceErr(apiErrorDisplay(j, 'Replace failed'));
      return;
    }
    setReplaceRow(null);
    setReplaceFile(null);
    setOkMsg('File replaced.');
    await load();
  };

  const confirmDelete = async () => {
    if (!deleteRow) return;
    setDeleteBusy(true);
    const res = await fetch(`/api/portfolio/funds/${fundId}/documents/${deleteRow.id}`, {
      method: 'DELETE',
    });
    const j = (await res.json()) as { error?: string };
    setDeleteBusy(false);
    if (!res.ok) {
      setErr(apiErrorDisplay(j, 'Delete failed'));
      setDeleteRow(null);
      return;
    }
    setDeleteRow(null);
    setOkMsg('Document deleted.');
    await load();
  };

  const download = async (r: PortfolioFundDocumentListItem) => {
    setErr(null);
    const res = await fetch(`/api/portfolio/funds/${fundId}/documents/${r.id}/download`);
    const j = (await res.json()) as { url?: string; error?: string };
    if (!res.ok || !j.url) {
      setErr(apiErrorDisplay(j, 'Download failed'));
      return;
    }
    window.open(j.url, '_blank', 'noopener,noreferrer');
  };

  const maxMb = Math.round(PORTFOLIO_FUND_DOCUMENT_MAX_BYTES / (1024 * 1024));

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#0B1F45]">Fund documents</h3>
          <p className="text-xs text-gray-500">
            LPAs, side letters, amendments, and other portfolio records (separate from reporting uploads).
          </p>
        </div>
        {canManage ? (
          <Button type="button" size="sm" className="bg-[#0F8A6E] hover:bg-[#0d7a61]" onClick={openUpload}>
            Upload document
          </Button>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        <Input
          className="h-9 max-w-xs text-sm"
          placeholder="Search title or filename…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All categories</option>
          {PORTFOLIO_FUND_DOCUMENT_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {PORTFOLIO_FUND_DOCUMENT_CATEGORY_LABELS[c]}
            </option>
          ))}
        </select>
      </div>

      {okMsg ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          {okMsg}
          <button type="button" className="ml-2 text-xs underline" onClick={() => setOkMsg(null)}>
            Dismiss
          </button>
        </div>
      ) : null}
      {err ? <ApiErrorBanner message={err} variant={bannerVariantFromDisplay(err)} /> : null}

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-left text-xs uppercase text-gray-500">
            <tr>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">File</th>
              <th className="px-3 py-2">Effective</th>
              <th className="px-3 py-2">Uploaded</th>
              <th className="px-3 py-2">By</th>
              <th className="px-3 py-2">Size</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-gray-500">
                  Loading…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-gray-500">
                  No fund documents yet.
                  {canManage ? ' Upload LPAs, side letters, and other records here.' : ''}
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-3 py-2">
                    <div className="font-medium text-[#0B1F45]">{r.title}</div>
                    {r.notes ? (
                      <div className="mt-0.5 max-w-xs truncate text-[11px] text-gray-400" title={r.notes}>
                        Notes
                      </div>
                    ) : null}
                  </td>
                  <td className="px-3 py-2">
                    <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[11px] text-gray-700">
                      {PORTFOLIO_FUND_DOCUMENT_CATEGORY_LABELS[r.category] ?? r.category}
                    </span>
                  </td>
                  <td className="max-w-[140px] truncate px-3 py-2 text-gray-600" title={r.document_name}>
                    {r.document_name}
                  </td>
                  <td className="px-3 py-2 text-gray-600">{formatDate(r.effective_date)}</td>
                  <td className="px-3 py-2 text-gray-600">{formatDate(r.uploaded_at)}</td>
                  <td className="px-3 py-2 text-gray-600">{r.uploaded_by_name ?? '—'}</td>
                  <td className="px-3 py-2 tabular-nums text-gray-600">{formatBytes(r.file_size)}</td>
                  <td className="px-3 py-2 text-right">
                    <div className="flex flex-wrap justify-end gap-1">
                      <Button size="sm" variant="outline" type="button" onClick={() => void download(r)}>
                        Download
                      </Button>
                      {canManage ? (
                        <>
                          <Button size="sm" variant="ghost" type="button" onClick={() => openEdit(r)}>
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            type="button"
                            onClick={() => {
                              setReplaceRow(r);
                              setReplaceFile(null);
                              setReplaceErr(null);
                            }}
                          >
                            Replace
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            type="button"
                            className="text-red-700"
                            onClick={() => setDeleteRow(r)}
                          >
                            Delete
                          </Button>
                        </>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showUpload ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-lg">
            <h2 className="text-lg font-semibold text-[#0B1F45]">Upload document</h2>
            <p className="mt-1 text-xs text-gray-500">
              Allowed: {PORTFOLIO_FUND_DOCUMENT_ALLOWED_EXTENSIONS.join(', ')}. Max {maxMb}MB.
            </p>
            <div className="mt-4 space-y-3">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-gray-700">File</span>
                <input
                  type="file"
                  accept={PORTFOLIO_FUND_DOCUMENT_ALLOWED_EXTENSIONS.join(',')}
                  className="block w-full text-sm"
                  onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
                />
                {file ? (
                  <div className="mt-2 space-y-0.5">
                    <span className="block text-xs text-gray-500">{file.name}</span>
                    {generatedTitle ? (
                      <span className="block text-xs text-gray-700">
                        Document title: <span className="font-medium">{generatedTitle}</span>
                      </span>
                    ) : null}
                  </div>
                ) : null}
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-gray-700">Category</span>
                <select
                  className={cn('flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm')}
                  value={upCategory}
                  onChange={(e) => setUpCategory(e.target.value as PortfolioFundDocumentCategory)}
                >
                  {PORTFOLIO_FUND_DOCUMENT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {PORTFOLIO_FUND_DOCUMENT_CATEGORY_LABELS[c]}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-gray-700">Effective date (optional)</span>
                <Input type="date" value={effectiveDate} onChange={(e) => setEffectiveDate(e.target.value)} />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-gray-700">Notes (optional)</span>
                <textarea
                  className="min-h-[72px] w-full rounded-md border border-input px-3 py-2 text-sm"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </label>
              {uploadErr ? <ApiErrorBanner message={uploadErr} variant={bannerVariantFromDisplay(uploadErr)} /> : null}
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button type="button" variant="outline" disabled={uploadBusy} onClick={() => setShowUpload(false)}>
                Cancel
              </Button>
              <Button
                type="button"
                className="bg-[#0F8A6E] hover:bg-[#0d7a61]"
                disabled={uploadBusy}
                onClick={() => void submitUpload()}
              >
                {uploadBusy ? 'Uploading…' : 'Upload'}
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {editRow ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-lg">
            <h2 className="text-lg font-semibold text-[#0B1F45]">Edit document details</h2>
            <p className="mt-1 text-xs text-gray-500">File is unchanged. Use Replace to change the file.</p>
            <div className="mt-4 space-y-3">
              <div>
                <Label>Title</Label>
                <Input className="mt-1" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
              </div>
              <div>
                <Label>Category</Label>
                <select
                  className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value as PortfolioFundDocumentCategory)}
                >
                  {PORTFOLIO_FUND_DOCUMENT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {PORTFOLIO_FUND_DOCUMENT_CATEGORY_LABELS[c]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Effective date</Label>
                <Input
                  className="mt-1"
                  type="date"
                  value={editEffective}
                  onChange={(e) => setEditEffective(e.target.value)}
                />
              </div>
              <div>
                <Label>Notes</Label>
                <textarea
                  className="mt-1 min-h-[72px] w-full rounded-md border border-input px-3 py-2 text-sm"
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                />
              </div>
              {editErr ? <ApiErrorBanner message={editErr} variant={bannerVariantFromDisplay(editErr)} /> : null}
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button type="button" variant="outline" disabled={editBusy} onClick={() => setEditRow(null)}>
                Cancel
              </Button>
              <Button type="button" disabled={editBusy} onClick={() => void submitEdit()}>
                {editBusy ? 'Saving…' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {replaceRow ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-lg">
            <h2 className="text-lg font-semibold text-[#0B1F45]">Replace file</h2>
            <p className="mt-1 text-sm text-gray-600">
              Replace the file for <span className="font-medium">{replaceRow.title}</span>. Title, category, and
              notes stay the same; only the stored file changes.
            </p>
            <div className="mt-4">
              <input
                type="file"
                accept={PORTFOLIO_FUND_DOCUMENT_ALLOWED_EXTENSIONS.join(',')}
                className="block w-full text-sm"
                onChange={(e) => setReplaceFile(e.target.files?.[0] ?? null)}
              />
              {replaceFile ? <p className="mt-1 text-xs text-gray-500">{replaceFile.name}</p> : null}
              {replaceErr ? <ApiErrorBanner message={replaceErr} variant={bannerVariantFromDisplay(replaceErr)} className="mt-2" /> : null}
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={replaceBusy}
                onClick={() => {
                  setReplaceRow(null);
                  setReplaceFile(null);
                }}
              >
                Cancel
              </Button>
              <Button type="button" disabled={replaceBusy} onClick={() => void submitReplace()}>
                {replaceBusy ? 'Replacing…' : 'Replace file'}
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <ConfirmModal
        isOpen={!!deleteRow}
        title="Delete document?"
        message={
          deleteRow
            ? `Delete “${deleteRow.title}” and remove the stored file? This cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        confirmVariant="danger"
        isLoading={deleteBusy}
        onCancel={() => setDeleteRow(null)}
        onConfirm={() => void confirmDelete()}
      />
    </div>
  );
}
