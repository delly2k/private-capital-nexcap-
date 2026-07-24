# NexCap / DBJ VC Platform — Application Context

Living summary for developers and agents. Updated when major features ship.

## Purpose

Multi-tenant venture capital / private equity **pipeline and portfolio monitoring** for DBJ PCTU staff, plus an external **fund-manager portal**.

## Stack

- Next.js 16 App Router, React 18, TypeScript
- Supabase (Postgres + Storage); server uses **service role** (`lib/supabase/server.ts`) — enforce `tenant_id` in app code
- NextAuth (Azure AD staff + credentials portal)
- Anthropic Claude for AI assists
- Nodemailer/SMTP for invites

## Roles

`admin`, `it_admin`, `pctu_officer`, `investment_officer`, `portfolio_manager`, `panel_member`, `senior_management`, legacy `analyst`/`officer`, `viewer`, `fund_manager` (portal only).

Edge gate: `proxy.ts`. APIs self-authenticate via `requireAuth` / `getProfile` / `can()`.

## Core features

- CFP → applications → DD questionnaire → assessments → site visit / contract / commitment
- Portfolio funds: reporting obligations, compliance, capital calls, distributions, quarterly assessments, watchlist
- Fund managers + relationship intelligence
- In-app assistant
- **Portfolio Fund Document Library** (general/legal documents on a fund — separate from reporting obligation uploads)

## Portfolio Fund Document Library

### Purpose

Store LPAs, side letters, amendments, governance docs, notices, and other ongoing portfolio records on a fund. **Not** tied to `vc_reporting_obligations`.

### Data

- Table: `vc_portfolio_fund_documents`
- Migration: `supabase/migrations/20260723140000_portfolio_fund_document_library.sql`
- Categories: `legal_agreement`, `side_letter`, `amendment`, `governance`, `notice`, `financial`, `other`

### Storage

- Bucket: `portfolio-documents` (private)
- Path: `{tenant_id}/{fund_id}/{document_id}/{sanitized_filename}`
- Max size: 20MB (`PORTFOLIO_FUND_DOCUMENT_MAX_BYTES`)
- Types: PDF, DOC, DOCX, XLS, XLSX, CSV, PNG, JPG/JPEG
- Downloads: signed URLs via authenticated API (no public URLs)

### Authorization

- List / download: internal users with `read:tenant` (not `fund_manager`)
- Upload / edit / replace / delete: `write:applications` or `delete:records` (not portal)
- Helpers: `lib/portfolio/fund-document-access.ts`
- Every route validates fund + document belong to the authenticated profile’s `tenant_id`

### API

| Method | Path | Notes |
|--------|------|--------|
| GET | `/api/portfolio/funds/[id]/documents` | List library docs (`category`, `search`, `sort`) |
| POST | `/api/portfolio/funds/[id]/documents` | Library upload **or** legacy obligation upload if `obligation_id` present. Library title is derived server-side from the filename. |
| PATCH | `/api/portfolio/funds/[id]/documents/[documentId]` | Metadata only |
| POST | `.../documents/[documentId]/replace` | Replace file |
| GET | `.../documents/[documentId]/download` | Signed URL |
| DELETE | `.../documents/[documentId]` | DB + storage |

### UI

Fund detail **Documents** tab:

1. **Fund documents** — `components/portfolio/FundDocumentsLibrary.tsx`
2. **Reporting documents** — existing obligation-linked files (unchanged upload path on Reporting tab)

### Audit

Entity type `portfolio_fund_document` actions: `document_uploaded`, `document_metadata_updated`, `document_file_replaced`, `document_deleted` via `scheduleAuditLog`.

### Setup

Apply migration `20260723140000_portfolio_fund_document_library.sql` (creates table, RLS, and `portfolio-documents` bucket). No new env vars.

## Reporting documents (unchanged)

- Bucket: `portfolio-reports`
- Upload: Reporting tab / Mark received / `uploadReportingObligationDocument`
- Listed under Documents → Reporting documents

## Known gaps

- No automated tests / CI in-repo
- `.env.example` incomplete (SMTP only)
- Portal has no access to fund document library (intentional for this phase)
- General document library does not replace application DD uploads (`dd-documents`)
