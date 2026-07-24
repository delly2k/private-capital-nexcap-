/**
 * Portfolio fund document library types and constants.
 * Separate from reporting-obligation documents.
 */

export const PORTFOLIO_FUND_DOCUMENT_CATEGORIES = [
  'legal_agreement',
  'side_letter',
  'amendment',
  'governance',
  'notice',
  'financial',
  'other',
] as const;

export type PortfolioFundDocumentCategory = (typeof PORTFOLIO_FUND_DOCUMENT_CATEGORIES)[number];

export const PORTFOLIO_FUND_DOCUMENT_CATEGORY_LABELS: Record<PortfolioFundDocumentCategory, string> = {
  legal_agreement: 'Legal agreement',
  side_letter: 'Side letter',
  amendment: 'Amendment',
  governance: 'Governance',
  notice: 'Notice',
  financial: 'Financial',
  other: 'Other',
};

/** Max upload size for fund library documents (20 MiB). */
export const PORTFOLIO_FUND_DOCUMENT_MAX_BYTES = 20 * 1024 * 1024;

export const PORTFOLIO_FUND_DOCUMENT_BUCKET = 'portfolio-documents';

export const PORTFOLIO_FUND_DOCUMENT_ALLOWED_EXTENSIONS = [
  '.pdf',
  '.doc',
  '.docx',
  '.xls',
  '.xlsx',
  '.csv',
  '.png',
  '.jpg',
  '.jpeg',
] as const;

export const PORTFOLIO_FUND_DOCUMENT_ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'image/png',
  'image/jpeg',
]);

export type PortfolioFundDocumentRecord = {
  id: string;
  tenant_id: string;
  fund_id: string;
  title: string;
  category: PortfolioFundDocumentCategory;
  document_path: string;
  document_name: string;
  mime_type: string | null;
  file_size: number | null;
  notes: string | null;
  effective_date: string | null;
  uploaded_by: string;
  uploaded_at: string;
  updated_by: string | null;
  updated_at: string;
};

export type PortfolioFundDocumentListItem = {
  id: string;
  title: string;
  category: PortfolioFundDocumentCategory;
  document_name: string;
  mime_type: string | null;
  file_size: number | null;
  notes: string | null;
  effective_date: string | null;
  uploaded_at: string;
  updated_at: string;
  uploaded_by: string;
  uploaded_by_name: string | null;
};

export type PortfolioFundDocumentListResponse = {
  documents: PortfolioFundDocumentListItem[];
  can_manage: boolean;
};

export type PortfolioFundDocumentUploadFields = {
  category: PortfolioFundDocumentCategory;
  notes?: string | null;
  effective_date?: string | null;
};

export type PortfolioFundDocumentMetadataUpdate = {
  title?: string;
  category?: PortfolioFundDocumentCategory;
  notes?: string | null;
  effective_date?: string | null;
};

export function isPortfolioFundDocumentCategory(value: string): value is PortfolioFundDocumentCategory {
  return (PORTFOLIO_FUND_DOCUMENT_CATEGORIES as readonly string[]).includes(value);
}
