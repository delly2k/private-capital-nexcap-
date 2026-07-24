/**
 * Storage path helpers and file validation for the fund document library.
 */

import 'server-only';

import {
  PORTFOLIO_FUND_DOCUMENT_ALLOWED_EXTENSIONS,
  PORTFOLIO_FUND_DOCUMENT_ALLOWED_MIME_TYPES,
  PORTFOLIO_FUND_DOCUMENT_MAX_BYTES,
} from '@/lib/portfolio/fund-documents';

export function sanitizeDocumentFilename(name: string): string {
  const base = name.trim().replace(/[/\\?%*:|"<>]/g, '-').replace(/\s+/g, '_');
  const cleaned = base.replace(/[^a-zA-Z0-9._-]/g, '').slice(0, 120);
  return cleaned.length > 0 ? cleaned : 'document';
}

/**
 * `{tenant_id}/{fund_id}/{document_id}/{sanitized_filename}`
 */
export function portfolioFundDocumentObjectPath(
  tenantId: string,
  fundId: string,
  documentId: string,
  originalFilename: string,
): string {
  return `${tenantId}/${fundId}/${documentId}/${sanitizeDocumentFilename(originalFilename)}`;
}

export type FundDocumentFileValidation =
  | { ok: true; contentType: string; extension: string }
  | { ok: false; error: string };

export function validateFundDocumentFile(file: File): FundDocumentFileValidation {
  if (!file || !(file instanceof File) || file.size <= 0) {
    return { ok: false, error: 'A file is required' };
  }
  if (file.size > PORTFOLIO_FUND_DOCUMENT_MAX_BYTES) {
    return { ok: false, error: 'File must be 20MB or smaller' };
  }

  const lower = file.name.toLowerCase();
  const hasExt = PORTFOLIO_FUND_DOCUMENT_ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext));
  const mimeOk = file.type ? PORTFOLIO_FUND_DOCUMENT_ALLOWED_MIME_TYPES.has(file.type) : false;
  if (!hasExt && !mimeOk) {
    return {
      ok: false,
      error: 'File type not allowed. Use PDF, DOC, DOCX, XLS, XLSX, CSV, PNG, or JPG.',
    };
  }

  let contentType = file.type;
  if (!contentType || !PORTFOLIO_FUND_DOCUMENT_ALLOWED_MIME_TYPES.has(contentType)) {
    if (lower.endsWith('.pdf')) contentType = 'application/pdf';
    else if (lower.endsWith('.doc')) contentType = 'application/msword';
    else if (lower.endsWith('.docx')) {
      contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (lower.endsWith('.xls')) contentType = 'application/vnd.ms-excel';
    else if (lower.endsWith('.xlsx')) {
      contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    } else if (lower.endsWith('.csv')) contentType = 'text/csv';
    else if (lower.endsWith('.png')) contentType = 'image/png';
    else if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) contentType = 'image/jpeg';
    else contentType = 'application/octet-stream';
  }

  const extMatch = lower.match(/(\.[a-z0-9]+)$/);
  const extension = extMatch?.[1] ?? '';

  return { ok: true, contentType, extension };
}
