# NexCap UI Audit

**Role:** UI inventory and pattern catalog only.  
**Scope:** Visual surface of the Next.js App Router UI. No functionality, data, routing, state, or business-logic changes.  
**Date:** 2026-07-17  
**Codebase:** NexCap / DBJ VC Management Platform  

No application files were modified during this audit. This document is the only deliverable.

---

## Task 1 — UI inventory

### 1.1 Routes and pages (`app/**/page.tsx`)

76 pages. Route groups `(auth)`, `(portal)`, `(authenticated)`, `(public)`, `(print)` do not appear in URLs.

#### Standalone / root (5)

| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Redirects to internal dashboard |
| `/login` | `app/login/page.tsx` | Staff sign-in with rotating artwork, credentials, Microsoft SSO |
| `/invite/[token]` | `app/invite/[token]/page.tsx` | Invitation acceptance / invalid / revoked / expired states |
| `/invite/[token]/post-auth` | `app/invite/[token]/post-auth/page.tsx` | Post-auth invite acceptance callback (transient) |
| `/unauthorized` | `app/unauthorized/page.tsx` | Access-restricted error with recovery links |

#### Internal authenticated — onboarding / pipeline (16)

| Route | File | Purpose |
|-------|------|---------|
| `/dashboard` | `app/(auth)/dashboard/page.tsx` | Pipeline KPIs, recent applications, funnel |
| `/onboarding` | `app/(auth)/onboarding/page.tsx` | Fund-manager onboarding chat + preview |
| `/application-status` | `app/(auth)/application-status/page.tsx` | Fund-manager application progress |
| `/cfp` | `app/(auth)/cfp/page.tsx` | Calls for proposals list |
| `/cfp/[id]` | `app/(auth)/cfp/[id]/page.tsx` | CFP detail, criteria, related applications |
| `/fund-applications` | `app/(auth)/fund-applications/page.tsx` | Application list / filters |
| `/fund-applications/[id]` | `app/(auth)/fund-applications/[id]/page.tsx` | Full application pipeline workspace |
| `/applications/[id]/pre-screening` | `app/(auth)/applications/[id]/pre-screening/page.tsx` | Legacy redirect to prequalification |
| `/applications/[id]/prequalification` | `app/(auth)/applications/[id]/prequalification/page.tsx` | Prequalification checklist workspace |
| `/questionnaires` | `app/(auth)/questionnaires/page.tsx` | DD questionnaire list |
| `/questionnaires/[id]` | `app/(auth)/questionnaires/[id]/page.tsx` | Internal questionnaire workspace |
| `/questionnaires/[id]/sections/[sectionKey]` | `app/(auth)/questionnaires/[id]/sections/[sectionKey]/page.tsx` | Legacy section URL redirect |
| `/questionnaires/[id]/complete` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | Questionnaire submission confirmation |
| `/assessments` | `app/(auth)/assessments/page.tsx` | Assessment / scoring queue |
| `/assessments/new` | `app/(auth)/assessments/new/page.tsx` | Manual assessment create form |
| `/assessments/[id]` | `app/(auth)/assessments/[id]/page.tsx` | Criterion assessment editor |

#### Internal authenticated — portfolio (14)

| Route | File | Purpose |
|-------|------|---------|
| `/portfolio` | `app/(auth)/portfolio/page.tsx` | Portfolio dashboard KPIs, charts, intelligence |
| `/portfolio/funds` | `app/(auth)/portfolio/funds/page.tsx` | Fund monitoring table |
| `/portfolio/funds/[id]` | `app/(auth)/portfolio/funds/[id]/page.tsx` | Fund detail tabs (performance, capital, settings, etc.) |
| `/portfolio/funds/[id]/assessments/new` | `app/(auth)/portfolio/funds/[id]/assessments/new/page.tsx` | Start fund monitoring assessment |
| `/portfolio/funds/[id]/assessments/[assessmentId]` | `app/(auth)/portfolio/funds/[id]/assessments/[assessmentId]/page.tsx` | Fund assessment review |
| `/portfolio/calendar` | `app/(auth)/portfolio/calendar/page.tsx` | Reporting calendar |
| `/portfolio/compliance` | `app/(auth)/portfolio/compliance/page.tsx` | Cross-portfolio compliance dashboard |
| `/portfolio/capital-calls` | `app/(auth)/portfolio/capital-calls/page.tsx` | Portfolio capital-calls overview |
| `/portfolio/distributions` | `app/(auth)/portfolio/distributions/page.tsx` | Portfolio distributions overview |
| `/portfolio/watchlist` | `app/(auth)/portfolio/watchlist/page.tsx` | Fund watchlist |
| `/portfolio/divestment` | `app/(auth)/portfolio/divestment/page.tsx` | Divestment tracking |
| `/portfolio/divestment-summary` | `app/(auth)/portfolio/divestment-summary/page.tsx` | Consolidated divestment summary |
| `/portfolio/executive` | `app/(auth)/portfolio/executive/page.tsx` | Executive portfolio view |

#### Internal authenticated — operations / secondary (18)

| Route | File | Purpose |
|-------|------|---------|
| `/tasks` | `app/(auth)/tasks/page.tsx` | Task queue |
| `/approvals` | `app/(auth)/approvals/page.tsx` | Approval queue |
| `/reports` | `app/(auth)/reports/page.tsx` | Executive reporting dashboard |
| `/settings` | `app/(auth)/settings/page.tsx` | Audit / assessment settings |
| `/settings/roles` | `app/(auth)/settings/roles/page.tsx` | Role matrix |
| `/settings/users` | `app/(auth)/settings/users/page.tsx` | User management |
| `/settings/users/invite` | `app/(auth)/settings/users/invite/page.tsx` | External invite form |
| `/settings/users/[id]` | `app/(auth)/settings/users/[id]/page.tsx` | User edit |
| `/profile` | `app/(auth)/profile/page.tsx` | Current user profile |
| `/deals` | `app/(auth)/deals/page.tsx` | Deal list / kanban |
| `/deals/[id]` | `app/(auth)/deals/[id]/page.tsx` | Deal detail |
| `/investors` | `app/(auth)/investors/page.tsx` | Investor list |
| `/investors/[id]` | `app/(auth)/investors/[id]/page.tsx` | Investor detail |
| `/investments` | `app/(auth)/investments/page.tsx` | Coming-soon placeholder |
| `/investments/[id]` | `app/(auth)/investments/[id]/page.tsx` | Investment detail |
| `/commitments` | `app/(auth)/commitments/page.tsx` | Coming-soon placeholder |
| `/disbursements` | `app/(auth)/disbursements/page.tsx` | Coming-soon placeholder |
| `/monitoring-reports` | `app/(auth)/monitoring-reports/page.tsx` | Coming-soon placeholder |
| `/portfolio-companies` | `app/(auth)/portfolio-companies/page.tsx` | Coming-soon placeholder |

#### Public portal (4)

| Route | File | Purpose |
|-------|------|---------|
| `/portal/login` | `app/(portal)/(public)/portal/login/page.tsx` | Fund Manager Portal sign-in |
| `/portal/register` | `app/(portal)/(public)/portal/register/page.tsx` | Invited registration |
| `/portal/forgot-password` | `app/(portal)/(public)/portal/forgot-password/page.tsx` | Reset request |
| `/portal/reset-password` | `app/(portal)/(public)/portal/reset-password/page.tsx` | New password form |

#### Authenticated portal (18)

| Route | File | Purpose |
|-------|------|---------|
| `/portal` | `app/(portal)/(authenticated)/portal/page.tsx` | Fund selector (PortalShell) |
| `/portal/profile` | `app/(portal)/(authenticated)/portal/profile/page.tsx` | Portal profile |
| `/portal/questionnaire` | `app/(portal)/(authenticated)/portal/questionnaire/page.tsx` | Resolves fund/questionnaire; redirects |
| `/portal/questionnaire/[id]` | `app/(portal)/(authenticated)/portal/questionnaire/[id]/page.tsx` | Direct questionnaire workspace |
| `/portal/questionnaire/[id]/complete` | `app/(portal)/(authenticated)/portal/questionnaire/[id]/complete/page.tsx` | Completion screen |
| `/portal/reports` | `app/(portal)/(authenticated)/portal/reports/page.tsx` | Alias → `/portal` |
| `/portal/documents` | `app/(portal)/(authenticated)/portal/documents/page.tsx` | Alias → `/portal` |
| `/portal/compliance` | `app/(portal)/(authenticated)/portal/compliance/page.tsx` | Alias → `/portal` |
| `/portal/capital-calls` | `app/(portal)/(authenticated)/portal/capital-calls/page.tsx` | Alias → `/portal` |
| `/portal/funds/[id]` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | Fund overview |
| `/portal/funds/[id]/status` | `app/(portal)/(authenticated)/portal/funds/[id]/status/page.tsx` | Legacy redirect to overview |
| `/portal/funds/[id]/questionnaire` | `app/(portal)/(authenticated)/portal/funds/[id]/questionnaire/page.tsx` | Assigned questionnaire loader |
| `/portal/funds/[id]/questionnaire/[qid]` | `app/(portal)/(authenticated)/portal/funds/[id]/questionnaire/[qid]/page.tsx` | Fund-scoped questionnaire |
| `/portal/funds/[id]/questionnaire/[qid]/complete` | `app/(portal)/(authenticated)/portal/funds/[id]/questionnaire/[qid]/complete/page.tsx` | Fund-scoped completion |
| `/portal/funds/[id]/reports` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | Reporting obligations / upload |
| `/portal/funds/[id]/capital-calls` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | Capital calls list |
| `/portal/funds/[id]/documents` | `app/(portal)/(authenticated)/portal/funds/[id]/documents/page.tsx` | Document library |
| `/portal/funds/[id]/compliance` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | Compliance obligations |

#### Print (1)

| Route | File | Purpose |
|-------|------|---------|
| `/portfolio/funds/[id]/assessments/[assessmentId]/pctu-preview` | `app/(print)/portfolio/funds/[id]/assessments/[assessmentId]/pctu-preview/page.tsx` | PCTU print/PDF preview (no app chrome) |

---

### 1.2 Shared layout chain

| Layer | Path | Role |
|-------|------|------|
| Root layout | `app/layout.tsx` | Inter font, `globals.css`, Auth + Assistant providers |
| Staff auth layout | `app/(auth)/layout.tsx` | Auth gate → `AssistantLayoutRoot` → `AuthenticatedShell` |
| Staff shell | `components/layout/AuthenticatedShell.tsx` | Sidebar + TopBar + scrollable main |
| Staff sidebar | `components/layout/Sidebar.tsx` | Fixed left nav (Portfolio / onboarding / Operations) |
| Shared header | `components/layout/TopBar.tsx` | Breadcrumbs, optional title, notifications, account menu |
| Portal root layout | `app/(portal)/layout.tsx` | Pass-through |
| Portal auth gate | `app/(portal)/(authenticated)/layout.tsx` | Session/role gate only (no chrome) |
| Portal shell | `components/portal/PortalShell.tsx` | Used by `/portal`, `/portal/profile` |
| Fund portal layout | `app/(portal)/(authenticated)/portal/funds/[id]/layout.tsx` | Wraps fund routes in `FundPortalShell` |
| Fund portal shell | `components/portal/FundPortalShell.tsx` | Fund sidebar + TopBar |
| Portal auth chrome | `components/portal/PortalAuthLayout.tsx` | Public portal login/register/reset |
| Print layout | `app/(print)/layout.tsx` | No sidebar/header; Georgia serif |
| Nested pass-through | `app/(auth)/onboarding/layout.tsx`, `app/(auth)/questionnaires/[id]/layout.tsx` | Metadata / pass-through |

**Shell offset note:** Sidebar width is `240px` (`Sidebar.tsx`); `AuthenticatedShell` content margin uses `220px` when expanded.

---

### 1.3 Reusable UI components and consumers

#### Design-system primitives (`components/ui/`)

| Component | Path | Consumers (routes / parents) |
|-----------|------|------------------------------|
| `StatCard` | `components/ui/StatCard.tsx` | `/dashboard`, `/cfp` (`CfpListClient`) |
| `StatusBadge` | `components/ui/StatusBadge.tsx` | `/dashboard`, `/assessments`, `/application-status`, `/questionnaires`, fund applications, deals, approvals, assessment editor, CFP detail, prequalification/prescreening, questionnaire section panel |
| `SectionHeader` | `components/ui/SectionHeader.tsx` | `/dashboard`, `/questionnaires`, `/fund-applications`, deals detail, investments detail, approvals, tasks |
| `EmptyState` | `components/ui/EmptyState.tsx` | `/questionnaires`, `/fund-applications`, `/cfp`, `/deals`, `/approvals`, `/tasks` |
| `PageHeader` | `components/ui/PageHeader.tsx` | **No consumers (dormant)** |
| `FieldGroup` | `components/ui/FieldGroup.tsx` | Questionnaire structured lists / sponsor groups |
| `ActionButton` | `components/ui/ActionButton.tsx` | `/dashboard`, `/assessments`, `/questionnaires`, deals, fund applications |
| `AvatarInitials` | `components/ui/AvatarInitials.tsx` | CFP detail, fund applications list |
| `ConfirmModal` | `components/ui/ConfirmModal.tsx` | DD decision, AI insights, CFP, prequalification, questionnaire modals, user edit |
| `Button` / `Input` / `Textarea` / `Label` / Select / Dropdown / Tooltip / Avatar | `components/ui/*` | Broad usage across staff + portal forms |
| `Separator` | `components/ui/separator.tsx` | **No consumers (dormant)** |
| Token maps | `components/ui/design-system.ts` | Status pills, cards, tables, icon badges, buttons, fields |

#### Shells

| Component | Path | Consumers |
|-----------|------|-----------|
| `AuthenticatedShell` | `components/layout/AuthenticatedShell.tsx` | All `(auth)` pages |
| `Sidebar` | `components/layout/Sidebar.tsx` | AuthenticatedShell |
| `TopBar` | `components/layout/TopBar.tsx` | AuthenticatedShell, PortalShell, FundPortalShell |
| `PortalShell` | `components/portal/PortalShell.tsx` | `/portal`, `/portal/profile` |
| `FundPortalShell` | `components/portal/FundPortalShell.tsx` | `/portal/funds/[id]/**` |
| `FundSettingsShell` | `components/portfolio/FundSettingsShell.tsx` | Fund detail settings tab |
| `DataShellSkeleton` | `components/loading/DataShellSkeleton.tsx` | Multiple loading.tsx routes |

#### Cards / KPIs / badges / tables (selected reusable)

| Component | Path | Consumers |
|-----------|------|-----------|
| `KPICard` | `components/reports/KPICard.tsx` | `/reports` |
| `PortfolioSummaryCards` | `components/portfolio/PortfolioSummaryCards.tsx` | Via `PortfolioDashboard` (currently unused by a route) |
| Fund detail cards | `components/portfolio/fund-detail/*` | `/portfolio/funds/[id]` via `FundDetailClient` |
| `PerformanceBadge` | `components/portfolio/PerformanceBadge.tsx` | `PortfolioTable` |
| `CfpStatusBadge` | `components/cfp/CfpStatusBadge.tsx` | `/cfp`, `/cfp/[id]` |
| `PortfolioTable` | `components/portfolio/PortfolioTable.tsx` | Unused route parent |
| `DealCard` / `InvestorCard` / `TaskCard` | respective feature folders | `/deals`, `/investors`, `/tasks` |

Many portfolio/portal screens also define **page-local** KPI strips, badges, and empty states (not exported from `components/ui`).

---

### 1.4 Design tokens

#### `app/globals.css` CSS variables

| Variable | Value | Role |
|----------|-------|------|
| `--navy` | `#0b1f45` | Brand / primary text |
| `--gold` | `#c8973a` | Accent |
| `--teal` | `#0f8a6e` | Success / action |
| `--shell-bg` | `#f3f4f6` | Page background |
| `--shell-card` | `#ffffff` | Card surface |
| `--shell-border` | `#e5e7eb` | Borders |
| `--color-background-primary` | `var(--shell-card)` | Alias |
| `--color-background-secondary` | `#f9fafb` | Secondary surface |
| `--color-border-tertiary` | `var(--shell-border)` | Alias |
| `--border-radius-lg` | `12px` | Large radius |
| `--border-radius-md` | `8px` | Medium radius |
| `--color-text-primary` | `var(--navy)` | Primary text |
| `--color-text-secondary` | `#6b7280` | Secondary text |
| `--color-text-tertiary` | `#9ca3af` | Muted text |

Also defines utility classes: `.app-table`, `.app-card`, `.app-section-label`, `.app-metric-value`.

#### `tailwind.config.ts`

- **content:** `./pages/**/*`, `./components/**/*`, `./app/**/*` (js/ts/jsx/tsx/mdx)
- **theme.extend.colors:** `navy` (`#0B1F45`), `gold` (`#C8973A` / muted `#A67C2E`), `teal` (`#0F8A6E`), `shell` bg/card/border
- **fontFamily.sans:** `var(--font-inter)`, system stack
- **animation:** `fadeIn`
- No custom green/orange/red scales (status colors use Tailwind defaults or arbitrary hex)

#### Shared TS tokens

`components/ui/design-system.ts` — `DS_COLORS`, `dsLayout`, `dsCard`, `dsType`, `dsTable`, `dsStat`, `STATUS_BADGE_MAP`, `iconBadgeVariant`, button/field recipes.

#### Hardcoded hex

**2,136** occurrences across **172** UI-facing files under `app/`, `components/`, `tailwind.config.ts`, and `globals.css` (**144** unique hex literals). Full line-level inventory is in [Appendix A](#appendix-a--hardcoded-hex-inventory).

Highest-density files include `CapitalStructureCard.tsx`, `FundManagerRelationshipCard.tsx`, `login/page.tsx`, `design-system.ts`, portal auth/profile pages, and several portfolio dashboards.

**Consistency issues:** two primary teals (`#0F8A6E` design system vs `#00A99D` portal/assistant), multiple gold variants, and a separate portal green/amber/red palette (e.g. `#1D9E75`, `#E24B4A`) used alongside Tailwind `teal-*` / `amber-*` / `red-*`.

---

### 1.5 Fonts

| Source | Family | How loaded | Weights / notes |
|--------|--------|------------|-----------------|
| `app/layout.tsx` | **Inter** | `next/font/google` → `--font-inter` on `<html>`; `font-sans` on `<body>` | Variable face; UI uses 400 / 500 / 600 / 700 (and occasional 900) |
| `tailwind.config.ts` | Inter + system fallbacks | `fontFamily.sans` | system-ui, -apple-system, Segoe UI, Roboto |
| `app/globals.css` | Inter via `font-sans` | body `@apply` | Antialiased |
| `app/(print)/layout.tsx` + `PctuReportTemplate.tsx` | **Georgia** | Class / print CSS | Print/PDF only |
| `FundPortalShell.tsx` | Tabler Icons webfont | Dynamically injected stylesheet | Icon font, not body text |
| Misc | `font-mono` | Tailwind default mono stack | IDs, scores, technical values |
| Assistant | `ui-monospace` | Inline in assistant panel | Code snippets |

No Inter italic face is explicitly requested; italic text relies on browser synthesis.

---

## Task 2 — Pattern catalog

### 2.1 KPI / stat cards with colored top or left border + rounded corners

| Location | Component / context | Classes |
|----------|---------------------|---------|
| `components/ui/StatCard.tsx` | `StatCard` | `rounded-xl … border-t-4` accents: navy `#0B1F45`, teal `#0F8A6E`, gold `#C8973A`, blue, amber, gray |
| `app/(auth)/dashboard/page.tsx` | Uses `StatCard` | Via accent prop |
| `app/(auth)/portfolio/page.tsx` | Inline KPI strip | `border-t-4` blue / navy / red / teal (Active Funds, DBJ Committed, Overdue Reports, Fully Compliant) |
| `components/portfolio/CapitalCallsOverviewClient.tsx` | Inline KPIs | navy / amber / red-or-gray / teal |
| `components/portfolio/FundCapitalCallsTab.tsx` | Inline KPIs | navy / amber / blue / red-or-gray |
| `components/portfolio/DistributionsOverviewClient.tsx` | Inline KPIs | teal / gold / blue / gray |
| `components/portfolio/FundDistributionsTab.tsx` | Inline KPIs | teal / gold / blue / purple |
| `components/portfolio/DivestmentTrackingClient.tsx` | Inline KPIs | `p-4` + navy / teal / gold / amber-or-gray |
| `components/settings/UserManagementClient.tsx` | Stat strip | Outer `rounded-xl` cards with inner `border-t-4` rules (blue / amber / navy / teal) |
| `app/(auth)/portfolio/PortfolioIntelligenceCard.client.tsx` | AI headline tiles | `border-t-2 border-t-[#00A99D]` (dynamic labels); callout `border-l-4 border-teal-500` |

**Not counted as KPI/stat cards (related accents only):**
- `CfpListClient` result cards and `AssessmentWorkspace` header use top accents but are content/navigation, not statistics.
- `ComplianceDashboardClient` / `CriteriaNav` use `border-l-4` row/nav accents, not rounded KPI shells.

**Related but different pattern (gold underline, not colored border):** `KPICard`, `PortfolioSummaryCards` use `rounded-xl` cards with a gold hairline accent (`h-1 … bg-gold/*`), no top border stripe.

---

### 2.2 Status badges — visual treatments and mapped values

#### A. Filled / soft-fill pills (shared `StatusBadge`)

Base: `STATUS_BADGE_BASE` = `inline-flex … rounded-full px-2.5 py-0.5 text-xs font-medium` (`design-system.ts`).

| Treatment | Example classes | Status keys |
|-----------|-----------------|-------------|
| Soft fill (no border) | `bg-gray-100 text-gray-*`, `bg-teal-50 text-[#0F8A6E]`, `bg-amber-50 …`, `bg-blue-100 …`, `bg-purple-50 …` | `draft`, `not_started`, `pending`, `pre_screening`, `pre_screened`, `preliminary_screening`, `presentation_*`, `panel_evaluation`, `full_dd`, `conditional_dd`, `no_dd`, `dd_complete`, `site_visit`, `negotiation`, `contract_*`, `due_diligence`, `in_progress`, `completed`, `active`, `on_hold`, `cancelled`, `denied`, `declined`, `scoring`, `in_scoring`, `accepted`, `none`, `pre_qualified`, `dd_recommended`, `clarification_requested` |
| Outline soft fill | `border border-*-200 bg-*-50 text-*` | `submitted`, `shortlisted`, `approved`, `rejected`, `archived` |
| Solid dark fill | `bg-[#0B1F45] text-white` | `committed`, `funded`, `closed` |

Component: `StatusBadge` → consumers listed in §1.3. Unknown keys fall back to `pending` styling.

#### B. Domain-specific filled pills

| Component | Path | Values → treatment |
|-----------|------|--------------------|
| `CfpStatusBadge` | `components/cfp/CfpStatusBadge.tsx` | `draft` gray fill; `active` teal soft; `closed` navy solid; `archived` gray outline |
| `PerformanceBadge` | `components/portfolio/PerformanceBadge.tsx` | `performing` emerald ring-fill; `watch` amber; `underperforming` orange; `critical` red |
| Capital-call local `statusBadge` | `FundCapitalCallsTab.tsx` | `paid` teal; `unpaid` amber; `overdue` red; `partial` blue; `cancelled` gray |
| Distribution type badges | `lib/portfolio/distributions.ts` `RETURN_TYPE_BADGES` | `dividend` teal; `return_of_capital` blue; `capital_gain` purple; `interest` amber; `other` gray |
| `COMPLIANCE_BADGE` | `lib/portfolio/compliance-badges.ts` | `fully_compliant` teal outline; `audits_outstanding` / `reports_outstanding` amber outline; `non_compliant` red outline; `partially_compliant` blue outline; `no_data` gray fill |
| Role badges | `lib/auth/role-labels.ts` `ROLE_COLORS` | admin navy solid; it_admin purple outline; pctu teal outline; investment blue; portfolio indigo; panel amber; senior gray |
| Fund category pills | `lib/portfolio/fund-category.ts` | Soft fills per category; unknown → gray “Uncategorised” |

#### C. Outline / inline-style pills

| Component | Path | Notes |
|-----------|------|-------|
| `OverallBadge` in `ComplianceScorecardCard` | `fund-detail/ComplianceScorecardCard.tsx` | Inline styles: compliant / non-compliant / partial with green/red/amber palette (`#E1F5EE`, `#FCEBEB`, `#FAEEDA`, …) |
| Portal history / obligation pills | portal reports/compliance pages | Page-local filled/outline pills (green/amber/red) |
| `HeaderStatusPill` | `applications/AssessmentTab.tsx` | Local draft/progress/done tones |

#### D. Bare colored text (not pill)

| Location | Usage |
|----------|-------|
| Compliance tables | Outstanding/overdue counts as `text-amber-600` / `text-red-600` / `text-teal-600` without pill chrome |
| Score helpers | `scoreValueClass()` → teal / gold / red monospace text |
| Calendar / list accents | Colored text labels for due state |

---

### 2.3 Section headers with icon in rounded colored square

Canonical pattern: `SectionHeader` + `iconBadgeVariant` (`h-8 w-8 rounded-lg` navy/teal/gold/amber).

| Consumer | Path | Variants used |
|----------|------|---------------|
| Dashboard | `app/(auth)/dashboard/page.tsx` | navy, teal, gold |
| Questionnaires list | `app/(auth)/questionnaires/page.tsx` | navy |
| Fund applications | `app/(auth)/fund-applications/page.tsx` | navy |
| Deal detail | `components/deals/DealDetail.tsx` | gold, navy, teal, amber |
| Investment detail | `components/investments/InvestmentDetailClient.tsx` | navy |
| Approvals | `components/workflow/ApprovalQueue.tsx` | navy |
| Tasks | `components/workflow/TasksPageClient.tsx` | navy (×2) |

**Near-matches (icon square without `SectionHeader`):** executive “DBJ” tile (`executive/page.tsx` `h-14 w-14 rounded-lg bg-[#0B1F45]`); coming-soon / empty large icons; portal auth brand marks.

---

### 2.4 Accent color usage (teal / gold / navy / green / orange / red)

| Color family | Primary literals / tokens | Semantic? | Decorative? | Representative surfaces |
|--------------|---------------------------|-----------|-------------|-------------------------|
| **Navy** | `#0B1F45`, `#162d5e`, Tailwind `navy` | Yes — brand primary, headings, primary buttons, nav active, solid status | Mild — panel backgrounds | Sidebar, buttons, titles, KPI accents |
| **Gold** | `#C8973A`, `#A67C2E`, `#C9A227`, `#D4A43C`, `gold` | Mixed — required markers, mid-range scores, commitment emphasis | Yes — KPI hairlines, section underlines, FieldGroup title rule | `dsField.required`, KPICard underline, questionnaire group titles |
| **Teal (DS)** | `#0F8A6E`, `teal-*` | Yes — success, paid, accepted, completed, positive money | Sometimes — hover/focus | Status badges, paid dates, distribution amounts |
| **Teal (Portal)** | `#00A99D` | Branding for portal/assistant | Yes — gradients, focus rings, intelligence card tops | Portal auth, FundSelector, Assistant, PortfolioIntelligenceCard |
| **Green** | `#1D9E75`, `#085041`, `#E1F5EE`, `emerald-*` | Yes — compliant / positive scorebars | Rare | ComplianceScorecard, portal compliance |
| **Orange / amber** | `#F59E0B`, `#EF9F27`, `amber-*`, `orange-*` | Yes — warning, unpaid, outstanding, watch | Login artwork gradients | KPI accents, badges, calendar |
| **Red** | `#EF4444`, `#E24B4A`, `#DC2626`, `red-*` | Yes — error, overdue, rejected, critical | Login theme only | Badges, validation, overdue KPIs |

---

### 2.5 Table columns rendering em dash / empty for missing data

(UI rendering only — data layer not investigated.)

| Component | Columns / fields showing `—` (or blank) |
|-----------|-----------------------------------------|
| `FundMonitoringClient` | Various metric cells when null |
| `FundCapitalCallsTab` | Due date, date paid, line description, investee |
| `FundDistributionsTab` / `DistributionsOverviewClient` | Cumulative, source company, most-active fund name |
| `FundDetailClient` | Representative; obligation submitted/reviewed; document name/dates; escalation |
| `FundAssessmentsTab` | Weighted score, category, recommendation; score spark when empty |
| `WatchlistClient` | Last period, score, category, recommendation |
| `ComplianceDashboardClient` | Manager; outstanding/overdue when 0; escalation blank |
| `FundPerformanceTab` | DPI/RVPI/TVPI/MOIC; chart tooltip; IRR cells |
| `EconomicsCard` / `TermsCard` / `ClassificationCard` / `StrategyCard` / `CapitalStructureCard` | Fees, IRR, dates, FX, LP count, periods, strategy blanks |
| `PortfolioTable` | Performance score, last snapshot date |
| `DealsListClient` | Assigned officer, deal value |
| `UserManagementClient` | Invited-by, dates |
| `AssessmentReviewClient` / `AssessmentReviewPage` | Scores, assessor/approver, DD reference, AI summary |
| `PersonnelStructuredList` | Title/position/numeric blanks |
| `LegalDocumentsListField` | Document name |
| Portal profile / overview | Firm, invited, submitted timestamps |
| `CriteriaRadar` / assessment insights tables | Avg score / totals |
| Print PCTU | Hyphen used for true zero-divestment case (exception); app tables standardize on em dash |

**Blank editable cells (intentional `''`, not em dash):** `LegalDocumentsTable` (name/purpose/status/file id); `StaffBioForm` / `StaffBioDetailFields` education Year/Institution/Degree.

**Hyphen exception:** printable `PctuReportTemplate` uses `-` for true zero-divestment counts/values; other missing print fields may show `Unknown`.

---

### 2.6 Spacing density

#### Global table recipe (`.app-table` in `globals.css`)

| Element | Classes / size |
|---------|----------------|
| Table text | `text-[13px]`, body `#374151` |
| Header cell | `px-4 py-3`, `text-[11px] font-semibold uppercase tracking-[0.06em]` |
| Body cell | `h-12`, `px-4`, `align-middle`, bottom border `#f1f3f5` |
| Header bg | `#f8f9fa` sticky |
| Row hover | `#F8F9FF` |

#### Design-system table (`dsTable`)

| Element | Classes |
|---------|---------|
| `th` | `px-4 py-3 text-xs … uppercase … text-gray-500` |
| `td` | `px-4 py-3.5 text-sm text-[#111827]` |
| Container | `rounded-xl border …` |

#### Feature-table variants observed

| Family | Typical cell padding | Body text |
|--------|----------------------|-----------|
| Portfolio fund monitoring / capital calls / assessments | `px-4 py-3` | `text-sm` / default |
| Compliance / distributions overview | `px-5 py-3` | `text-sm` |
| Nested line-item tables | `py-1.5 pr-4` | smaller |
| Dashboard `app-table` consumers | global `h-12` / `13px` | denser |

#### Card padding

| Recipe | Padding |
|--------|---------|
| `dsCard.base` / `padded` | `p-6`, `rounded-xl` |
| `StatCard` | `p-5` |
| `KPICard` | `p-4 sm:p-5` |
| `PortfolioSummaryCards` | `p-5` |
| Inline portfolio KPI strips | `p-5` (sometimes `p-4`) |
| Shell content | `dsLayout.contentMax` = `px-6 py-6`; page stack `space-y-6` |
| `.app-card-header` | `px-4 py-4` |

#### Common typography sizes

| Role | Typical classes |
|------|-----------------|
| Page title | `text-2xl font-bold text-[#0B1F45]` (`dsType.pageTitle`) |
| Section title | `text-[13px] font-semibold uppercase …` |
| KPI value | `text-3xl font-bold` / `.app-metric-value` `28px` / KPICard `text-2xl` |
| Body | `text-sm` / `text-[13px]` |
| Muted | `text-xs` / `text-[13px] text-[#6B7280]` |
| Table header | `text-xs` or `text-[11px]` uppercase |

---

## Task 3 — Proposed UI-only change list

Every in-scope item below is limited to **className strings, CSS/token values, or purely presentational JSX wrappers**. No props, handlers, hooks, fetching, or conditional logic changes.

| # | File(s) | Exact visual change | UI-only confirmation |
|---|---------|---------------------|----------------------|
| 1 | `components/ui/StatCard.tsx` | Remove `border-t-4` accent map; keep `rounded-xl border border-gray-200 bg-white p-5`. Optionally replace with subtle neutral top hairline (`border-t border-gray-100`) shared by all accents. | className only; accent prop may remain unused visually |
| 2 | `CapitalCallsOverviewClient.tsx`, `FundCapitalCallsTab.tsx`, `DistributionsOverviewClient.tsx`, `FundDistributionsTab.tsx`, `DivestmentTrackingClient.tsx`, `app/(auth)/portfolio/page.tsx`, `UserManagementClient.tsx`, `PortfolioIntelligenceCard.client.tsx` | Replace duplicated colored top-border KPI chrome with the same neutral card shell as #1 | className-only swaps on existing markup |
| 3 | `components/ui/SectionHeader.tsx` + `iconBadgeVariant` in `design-system.ts` | Soften icon square: e.g. light gray/navy-tint background + navy icon instead of solid navy/teal/gold fills | CSS/class strings only |
| 4 | `components/reports/KPICard.tsx`, `PortfolioSummaryCards.tsx` | Remove gold underline bar (`h-1 … bg-gold/*`) or replace with neutral spacer | Delete/replace decorative element; no logic |
| 5 | `components/ui/FieldGroup.tsx` / `dsField.groupTitle` | Replace `border-b-2 border-[#C8973A]` title rule with neutral `border-gray-200` | Token/class only |
| 6 | `components/ui/EmptyState.tsx` / `dsEmpty` | Reduce oversized gray icon prominence (`h-12` → `h-8`, softer opacity) | className only |
| 7 | `app/globals.css` `.app-table tbody tr:hover` | Soften `#F8F9FF` hover to neutral gray (`#F9FAFB`) to reduce “AI purple wash” | CSS only |
| 8 | `components/ui/design-system.ts` `dsTable.rowHover` | Align hover with #7 | class string only |
| 9 | `tailwind.config.ts` + `globals.css` + `DS_COLORS` | Document/standardize **one** teal (`#0F8A6E`) and **one** gold (`#C8973A`); leave portal `#00A99D` mapped explicitly as `portal-accent` token | Token/CSS only; no behavior |
| 10 | Portal auth + assistant files using `#00A99D` | Swap arbitrary hex classes to a single named token/class once added in #9 | className/token substitution |
| 11 | `ComplianceScorecardCard.tsx` badge/bar colors | Re-express inline hex via CSS variables already in `:root` (or new semantic tokens) without changing thresholds | style value substitution only; **do not** edit `scoreColor`/`barColor` branching |
| 12 | `AuthenticatedShell.tsx` + `Sidebar.tsx` | Align expanded content offset with actual sidebar width (`240px`) for layout polish | className width/margin only |
| 13 | Coming-soon placeholders (`investments`, `commitments`, `disbursements`, `monitoring-reports`, `portfolio-companies`) | Unify icon circle treatment (remove competing `#00A99D` vs navy) | className only |
| 14 | Table density pass on `globals.css` `.app-table` + `dsTable` | Optionally tighten to one density scale (e.g. keep `px-4 py-3` / `text-sm`) applied consistently | CSS/class only |
| 15 | Status pill consolidation (visual) | Restyle `STATUS_BADGE_MAP` / domain badge class maps toward fewer fill styles (prefer outline-soft or neutral + semantic text) | class strings in maps only; **keys and labels unchanged** |

### OUT OF SCOPE (would require logic / props / data changes)

| Desired improvement | Why out of scope |
|---------------------|------------------|
| Stop showing `—` and show “Not reported” / hide column | Requires conditional copy or column visibility logic |
| Auto-regenerate badges when new statuses appear | Requires mapping/logic updates beyond class strings |
| Merge portal `#00A99D` into staff teal in running code paths that branch on color meaning | Some branches encode meaning; changing meaning needs product/logic review |
| Fix fund category `venture_capital_fund` label/filter | Needs type union + filter options (logic/data contract) |
| Make KPI accent color reflect live threshold state where currently static | Would alter conditional class selection logic |
| Collapse duplicate badge systems into one React API | Component API / import graph change beyond className |
| Sidebar collapse behavior / nav filtering | State and auth logic |
| Replace em dash fallbacks driven by null checks with different data defaults | Data/presentation contract |

---

## Cross-cutting conclusions

1. **Chrome is coherent at the shell layer** (AuthenticatedShell / PortalShell / FundPortalShell / TopBar) but **KPI and badge systems proliferate** page-locally with the same “colored top border + rounded card” motif.
2. **Tokens exist but are bypassed** — 2,100+ raw hex uses; two teals and multiple golds undermine brand consistency.
3. **`SectionHeader` icon squares and `StatCard` top borders** are the strongest “generic AI dashboard” tells and are safe className-first cleanup targets.
4. **Em dash is the standard empty-cell glyph** across portfolio tables; changing copy is out of scope for a pure visual pass.
5. **Dormant primitives** (`PageHeader`, `Separator`, `PortfolioDashboard`) show incomplete adoption of the design system.

---

## Appendix A — Hardcoded hex inventory

Complete scan of `app/**`, `components/**`, `tailwind.config.ts`, and `app/globals.css` (excluding `node_modules` / `.next`).

**Totals:** 2,136 occurrences · 172 files · 144 unique hex values.

| Hex | File | Line | Context |
|-----|------|------|---------|
| `#0F8A6E` | `app/(auth)/application-status/page.tsx` | 60 | `<p className="mt-4 rounded-lg bg-teal-50 p-3 text-sm text-[#0F8A6E]">` |
| `#0F8A6E` | `app/(auth)/application-status/page.tsx` | 65 | `<p className="mt-4 rounded-lg bg-teal-50 p-3 text-sm text-[#0F8A6E]">` |
| `#0B1F45` | `app/(auth)/assessments/page.tsx` | 40 | `<h1 className="text-2xl font-bold text-[#0B1F45]">Assessments & Scoring</h1>` |
| `#0B1F45` | `app/(auth)/assessments/page.tsx` | 73 | `<p className="font-medium text-[#0B1F45]">{apps.get(r.application_id) ?? 'Application'}</p>` |
| `#00A99D` | `app/(auth)/commitments/page.tsx` | 19 | `<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00A99D]/15 text-[#00A99D]">` |
| `#00A99D` | `app/(auth)/commitments/page.tsx` | 19 | `<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00A99D]/15 text-[#00A99D]">` |
| `#0B1F45` | `app/(auth)/commitments/page.tsx` | 25 | `<h1 className="text-2xl font-bold text-[#0B1F45]">Commitments</h1>` |
| `#0B1F45` | `app/(auth)/commitments/page.tsx` | 29 | `className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#0B1F45] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bgâ€¦` |
| `#0a1938` | `app/(auth)/commitments/page.tsx` | 29 | `className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#0B1F45] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bgâ€¦` |
| `#0B1F45` | `app/(auth)/dashboard/page.tsx` | 34 | `<h1 className="text-2xl font-bold text-[#0B1F45]">Dashboard</h1>` |
| `#0B1F45` | `app/(auth)/dashboard/page.tsx` | 107 | `<span className="font-mono text-sm font-semibold tabular-nums text-[#0B1F45]">{s.count}</span>` |
| `#00A99D` | `app/(auth)/disbursements/page.tsx` | 19 | `<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00A99D]/15 text-[#00A99D]">` |
| `#00A99D` | `app/(auth)/disbursements/page.tsx` | 19 | `<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00A99D]/15 text-[#00A99D]">` |
| `#0B1F45` | `app/(auth)/disbursements/page.tsx` | 25 | `<h1 className="text-2xl font-bold text-[#0B1F45]">Disbursements</h1>` |
| `#0B1F45` | `app/(auth)/disbursements/page.tsx` | 29 | `className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#0B1F45] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bgâ€¦` |
| `#0a1938` | `app/(auth)/disbursements/page.tsx` | 29 | `className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#0B1F45] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bgâ€¦` |
| `#0B1F45` | `app/(auth)/fund-applications/page.tsx` | 98 | `<h1 className="text-2xl font-bold text-[#0B1F45]">Fund applications</h1>` |
| `#00A99D` | `app/(auth)/investments/page.tsx` | 19 | `<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00A99D]/15 text-[#00A99D]">` |
| `#00A99D` | `app/(auth)/investments/page.tsx` | 19 | `<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00A99D]/15 text-[#00A99D]">` |
| `#0B1F45` | `app/(auth)/investments/page.tsx` | 25 | `<h1 className="text-2xl font-bold text-[#0B1F45]">Investments</h1>` |
| `#0B1F45` | `app/(auth)/investments/page.tsx` | 29 | `className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#0B1F45] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bgâ€¦` |
| `#0a1938` | `app/(auth)/investments/page.tsx` | 29 | `className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#0B1F45] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bgâ€¦` |
| `#00A99D` | `app/(auth)/monitoring-reports/page.tsx` | 19 | `<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00A99D]/15 text-[#00A99D]">` |
| `#00A99D` | `app/(auth)/monitoring-reports/page.tsx` | 19 | `<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00A99D]/15 text-[#00A99D]">` |
| `#0B1F45` | `app/(auth)/monitoring-reports/page.tsx` | 25 | `<h1 className="text-2xl font-bold text-[#0B1F45]">Monitoring Reports</h1>` |
| `#0B1F45` | `app/(auth)/monitoring-reports/page.tsx` | 29 | `className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#0B1F45] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bgâ€¦` |
| `#0a1938` | `app/(auth)/monitoring-reports/page.tsx` | 29 | `className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#0B1F45] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bgâ€¦` |
| `#0B1F45` | `app/(auth)/onboarding/OnboardingHub.tsx` | 188 | `<p className="font-semibold text-[#0B1F45]">No open calls for proposals</p>` |
| `#0B1F45` | `app/(auth)/onboarding/OnboardingHub.tsx` | 205 | `<ClipboardList className="mt-0.5 h-5 w-5 shrink-0 text-[#0B1F45]" aria-hidden />` |
| `#0B1F45` | `app/(auth)/onboarding/OnboardingHub.tsx` | 207 | `<p className="font-semibold text-[#0B1F45]">{c.title}</p>` |
| `#0B1F45` | `app/(auth)/onboarding/OnboardingHub.tsx` | 249 | `<p className="font-semibold text-[#0B1F45]">{c.title}</p>` |
| `#0B1F45` | `app/(auth)/onboarding/OnboardingHub.tsx` | 280 | `<p className="font-medium text-[#0B1F45]">` |
| `#374151` | `app/(auth)/onboarding/OnboardingHub.tsx` | 290 | `<p className="text-[13px] text-[#374151]">` |
| `#F3F4F6` | `app/(auth)/portfolio/capital-calls/page.tsx` | 16 | `<div className="min-h-[50vh] w-full bg-[#F3F4F6]">` |
| `#F3F4F6` | `app/(auth)/portfolio/distributions/page.tsx` | 16 | `<div className="min-h-[50vh] w-full bg-[#F3F4F6]">` |
| `#F3F4F6` | `app/(auth)/portfolio/executive/page.tsx` | 245 | `<div className="w-full space-y-10 bg-[#F3F4F6] pb-16 pt-2 print:bg-white print:pb-8">` |
| `#0B1F45` | `app/(auth)/portfolio/executive/page.tsx` | 248 | `<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#0B1F45] text-sm font-bold text-white">DBJ</div>` |
| `#0B1F45` | `app/(auth)/portfolio/executive/page.tsx` | 250 | `<h1 className="text-2xl font-bold text-[#0B1F45]">Portfolio Executive Summary</h1>` |
| `#0B1F45` | `app/(auth)/portfolio/executive/page.tsx` | 267 | `icon={<Building2 className="mb-2 h-6 w-6 text-[#0B1F45]" aria-hidden />}` |
| `#0B1F45` | `app/(auth)/portfolio/executive/page.tsx` | 273 | `icon={<DollarSign className="mb-2 h-6 w-6 text-[#0B1F45]" aria-hidden />}` |
| `#0B1F45` | `app/(auth)/portfolio/executive/page.tsx` | 279 | `icon={<TrendingUp className="mb-2 h-6 w-6 text-[#0B1F45]" aria-hidden />}` |
| `#0F8A6E` | `app/(auth)/portfolio/executive/page.tsx` | 285 | `icon={<ArrowDownLeft className="mb-2 h-6 w-6 text-[#0F8A6E]" aria-hidden />}` |
| `#0B1F45` | `app/(auth)/portfolio/executive/page.tsx` | 303 | `<thead className="bg-[#0B1F45] text-left text-white">` |
| `#0B1F45` | `app/(auth)/portfolio/executive/page.tsx` | 335 | `<p className="font-medium text-[#0B1F45]">{r.fund_name}</p>` |
| `#0B1F45` | `app/(auth)/portfolio/executive/page.tsx` | 364 | `className="h-full rounded-full bg-[#0B1F45]"` |
| `#0F8A6E` | `app/(auth)/portfolio/executive/page.tsx` | 371 | `<td className="px-4 py-3 text-sm font-medium text-[#0F8A6E]">{r.returned_display}</td>` |
| `#0F8A6E` | `app/(auth)/portfolio/executive/page.tsx` | 396 | `<td className="px-4 py-3 text-[#0F8A6E]">{fmtUsdShort(totals.returned_usd)}</td>` |
| `#0B1F45` | `app/(auth)/portfolio/executive/page.tsx` | 416 | `<thead className="bg-[#0B1F45] text-left text-white">` |
| `#0B1F45` | `app/(auth)/portfolio/executive/page.tsx` | 435 | `<td className="px-4 py-3 font-medium text-[#0B1F45]">{r.fund_name}</td>` |
| `#0B1F45` | `app/(auth)/portfolio/executive/page.tsx` | 496 | `<h3 className="text-sm font-semibold text-[#0B1F45]">Top Overdue Items</h3>` |
| `#0B1F45` | `app/(auth)/portfolio/executive/page.tsx` | 520 | `<td className="px-4 py-2 font-medium text-[#0B1F45]">{o.fund_name}</td>` |
| `#0B1F45` | `app/(auth)/portfolio/executive/page.tsx` | 545 | `<h3 className="text-sm font-semibold text-[#0B1F45]">Portfolio Companies</h3>` |
| `#0B1F45` | `app/(auth)/portfolio/executive/page.tsx` | 568 | `<td className="px-4 py-2 font-medium text-[#0B1F45]">{inv.company}</td>` |
| `#0B1F45` | `app/(auth)/portfolio/executive/page.tsx` | 603 | `<span className="font-medium text-[#0B1F45]">{fmtUsdShort(investments_usd)}</span>` |
| `#0B1F45` | `app/(auth)/portfolio/executive/page.tsx` | 617 | `<h3 className="text-sm font-semibold text-[#0B1F45]">{fn.fund_name}</h3>` |
| `#0B1F45` | `app/(auth)/portfolio/executive/page.tsx` | 643 | `<p className="text-4xl font-bold text-[#0B1F45]">{value}</p>` |
| `#0F8A6E` | `app/(auth)/portfolio/page.tsx` | 28 | `fully_compliant: '#0F8A6E',` |
| `#F59E0B` | `app/(auth)/portfolio/page.tsx` | 29 | `audits_outstanding: '#F59E0B',` |
| `#C8973A` | `app/(auth)/portfolio/page.tsx` | 30 | `reports_outstanding: '#C8973A',` |
| `#EF4444` | `app/(auth)/portfolio/page.tsx` | 31 | `non_compliant: '#EF4444',` |
| `#3B82F6` | `app/(auth)/portfolio/page.tsx` | 32 | `partially_compliant: '#3B82F6',` |
| `#9CA3AF` | `app/(auth)/portfolio/page.tsx` | 33 | `no_data: '#9CA3AF',` |
| `#0F8A6E` | `app/(auth)/portfolio/page.tsx` | 226 | `{ status: 'Accepted', count: statusCounts.accepted, fill: '#0F8A6E' },` |
| `#9CA3AF` | `app/(auth)/portfolio/page.tsx` | 227 | `{ status: 'Pending', count: statusCounts.pending, fill: '#9CA3AF' },` |
| `#EF4444` | `app/(auth)/portfolio/page.tsx` | 228 | `{ status: 'Overdue', count: statusCounts.overdue, fill: '#EF4444' },` |
| `#F59E0B` | `app/(auth)/portfolio/page.tsx` | 229 | `{ status: 'Outstanding', count: statusCounts.outstanding, fill: '#F59E0B' },` |
| `#C8973A` | `app/(auth)/portfolio/page.tsx` | 230 | `{ status: 'Due Soon', count: statusCounts.due_soon, fill: '#C8973A' },` |
| `#3B82F6` | `app/(auth)/portfolio/page.tsx` | 231 | `{ status: 'Submitted', count: statusCounts.submitted, fill: '#3B82F6' },` |
| `#0B1F45` | `app/(auth)/portfolio/page.tsx` | 330 | `<h1 className="text-2xl font-bold text-[#0B1F45]">Portfolio Dashboard</h1>` |
| `#0B1F45` | `app/(auth)/portfolio/page.tsx` | 339 | `<p className="text-3xl font-bold text-[#0B1F45]">{activeFunds}</p>` |
| `#0B1F45` | `app/(auth)/portfolio/page.tsx` | 344 | `<div className="relative overflow-hidden rounded-xl border border-gray-200 border-t-4 border-t-[#0B1F45] bg-white p-5">` |
| `#0B1F45` | `app/(auth)/portfolio/page.tsx` | 345 | `<DollarSign className="absolute right-5 top-5 h-5 w-5 text-[#0B1F45]" aria-hidden />` |
| `#0B1F45` | `app/(auth)/portfolio/page.tsx` | 346 | `<p className="text-3xl font-bold text-[#0B1F45]">{fmtCompactUsd(totalUsdCommitted)}</p>` |
| `#0F8A6E` | `app/(auth)/portfolio/page.tsx` | 358 | `<p className="mt-2 text-xs font-medium text-[#0F8A6E]">None due soon</p>` |
| `#0F8A6E` | `app/(auth)/portfolio/page.tsx` | 362 | `<div className="relative overflow-hidden rounded-xl border border-gray-200 border-t-4 border-t-[#0F8A6E] bg-white p-5">` |
| `#0F8A6E` | `app/(auth)/portfolio/page.tsx` | 363 | `<ShieldCheck className="absolute right-5 top-5 h-5 w-5 text-[#0F8A6E]" aria-hidden />` |
| `#0B1F45` | `app/(auth)/portfolio/page.tsx` | 364 | `<p className="text-3xl font-bold text-[#0B1F45]">` |
| `#0B1F45` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 63 | `<h2 className="font-semibold text-[#0B1F45]">Fund Compliance Status</h2>` |
| `#f3f4f6` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 78 | `<CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />` |
| `#9ca3af` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 79 | `<XAxis type="number" tick={{ fontSize: 11 }} allowDecimals={false} stroke="#9ca3af" />` |
| `#6b7280` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 85 | `stroke="#6b7280"` |
| `#0B1F45` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 95 | `<p className="font-medium text-[#0B1F45]">{row.fullName}</p>` |
| `#0F8A6E` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 117 | `{ c: '#0F8A6E', l: 'Fully Compliant' },` |
| `#F59E0B` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 118 | `{ c: '#F59E0B', l: 'Audits Outstanding' },` |
| `#C8973A` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 119 | `{ c: '#C8973A', l: 'Reports Outstanding' },` |
| `#EF4444` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 120 | `{ c: '#EF4444', l: 'Non-Compliant' },` |
| `#0B1F45` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 131 | `<h2 className="font-semibold text-[#0B1F45]">Compliance Breakdown</h2>` |
| `#0B1F45` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 166 | `<span className="text-2xl font-bold text-[#0B1F45]">{activeFunds}</span>` |
| `#0B1F45` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 194 | `<h2 className="font-semibold text-[#0B1F45]">Reporting Obligations by Status</h2>` |
| `#f3f4f6` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 202 | `<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />` |
| `#9ca3af` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 210 | `stroke="#9ca3af"` |
| `#9ca3af` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 212 | `<YAxis allowDecimals={false} tick={{ fontSize: 11 }} width={36} stroke="#9ca3af" />` |
| `#0B1F45` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 232 | `<h2 className="font-semibold text-[#0B1F45]">Due in Next 90 Days</h2>` |
| `#f3f4f6` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 240 | `<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />` |
| `#9ca3af` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 241 | `<XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9ca3af" />` |
| `#9ca3af` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 242 | `<YAxis allowDecimals={false} tick={{ fontSize: 11 }} width={32} stroke="#9ca3af" />` |
| `#0B1F45` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 257 | `stroke="#0B1F45"` |
| `#0B1F45` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 259 | `fill="#0B1F45"` |
| `#0B1F45` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 261 | `dot={{ fill: '#0B1F45', r: 5 }}` |
| `#0B1F45` | `app/(auth)/portfolio/PortfolioDashboardCharts.client.tsx` | 272 | `<p className="text-lg font-bold text-[#0B1F45]">{m.count}</p>` |
| `#00A99D` | `app/(auth)/portfolio/PortfolioIntelligenceCard.client.tsx` | 70 | `<BrainCircuit className="h-4 w-4 text-[#00A99D]" />` |
| `#0B1F45` | `app/(auth)/portfolio/PortfolioIntelligenceCard.client.tsx` | 71 | `<h2 className="text-lg font-semibold text-[#0B1F45]">Portfolio Intelligence</h2>` |
| `#E6F7F6` | `app/(auth)/portfolio/PortfolioIntelligenceCard.client.tsx` | 72 | `<span className="inline-flex items-center gap-1 rounded-full bg-[#E6F7F6] px-2 py-0.5 text-xs font-medium text-[#00A99D]">` |
| `#00A99D` | `app/(auth)/portfolio/PortfolioIntelligenceCard.client.tsx` | 72 | `<span className="inline-flex items-center gap-1 rounded-full bg-[#E6F7F6] px-2 py-0.5 text-xs font-medium text-[#00A99D]">` |
| `#0B1F45` | `app/(auth)/portfolio/PortfolioIntelligenceCard.client.tsx` | 83 | `<Button size="sm" className="bg-[#0B1F45] text-white hover:bg-[#162d5e]" disabled={!hasData} onClick={exportPdf}>` |
| `#162d5e` | `app/(auth)/portfolio/PortfolioIntelligenceCard.client.tsx` | 83 | `<Button size="sm" className="bg-[#0B1F45] text-white hover:bg-[#162d5e]" disabled={!hasData} onClick={exportPdf}>` |
| `#00A99D` | `app/(auth)/portfolio/PortfolioIntelligenceCard.client.tsx` | 112 | `<div key={${s.label}-${idx}} className="rounded-lg border border-gray-200 border-t-2 border-t-[#00A99D] bg-gray-50 p-4">` |
| `#DC2626` | `app/(auth)/portfolio/PortfolioIntelligenceCard.client.tsx` | 114 | `<p className={mt-1 text-2xl font-bold ${isNegative ? 'text-[#DC2626]' : 'text-[#00A99D]'}}>{s.value}</p>` |
| `#00A99D` | `app/(auth)/portfolio/PortfolioIntelligenceCard.client.tsx` | 114 | `<p className={mt-1 text-2xl font-bold ${isNegative ? 'text-[#DC2626]' : 'text-[#00A99D]'}}>{s.value}</p>` |
| `#0B1F45` | `app/(auth)/portfolio/watchlist/page.tsx` | 17 | `<h1 className="text-2xl font-bold text-[#0B1F45]">Watchlist</h1>` |
| `#00A99D` | `app/(auth)/portfolio-companies/page.tsx` | 19 | `<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00A99D]/15 text-[#00A99D]">` |
| `#00A99D` | `app/(auth)/portfolio-companies/page.tsx` | 19 | `<div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#00A99D]/15 text-[#00A99D]">` |
| `#0B1F45` | `app/(auth)/portfolio-companies/page.tsx` | 25 | `<h1 className="text-2xl font-bold text-[#0B1F45]">Portfolio Companies</h1>` |
| `#0B1F45` | `app/(auth)/portfolio-companies/page.tsx` | 29 | `className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#0B1F45] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bgâ€¦` |
| `#0a1938` | `app/(auth)/portfolio-companies/page.tsx` | 29 | `className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#0B1F45] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bgâ€¦` |
| `#f25022` | `app/(auth)/profile/page.tsx` | 127 | `<rect x="1" y="1" width="10" height="10" fill="#f25022" />` |
| `#7fba00` | `app/(auth)/profile/page.tsx` | 128 | `<rect x="13" y="1" width="10" height="10" fill="#7fba00" />` |
| `#00a4ef` | `app/(auth)/profile/page.tsx` | 129 | `<rect x="1" y="13" width="10" height="10" fill="#00a4ef" />` |
| `#ffb900` | `app/(auth)/profile/page.tsx` | 130 | `<rect x="13" y="13" width="10" height="10" fill="#ffb900" />` |
| `#F3F4F6` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | 49 | `<div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-[#F3F4F6] px-4 py-12">` |
| `#e5e7eb` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | 50 | `<div className="w-full max-w-lg rounded-2xl border border-[#e5e7eb] bg-white p-10 shadow-sm">` |
| `#0B1F45` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | 53 | `className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#0B1F45]"` |
| `#C9A227` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | 56 | `<CheckCircle2 className="h-11 w-11 text-[#C9A227]" strokeWidth={2} />` |
| `#0B1F45` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | 58 | `<h2 className="text-2xl font-semibold tracking-tight text-[#0B1F45]">Questionnaire Submitted</h2>` |
| `#374151` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | 59 | `<p className="mt-2 text-sm font-medium text-[#374151]">{fundName}</p>` |
| `#6b7280` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | 60 | `<p className="mt-4 text-sm text-[#6b7280]">All 9 sections are complete.</p>` |
| `#9ca3af` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | 61 | `<p className="mt-1 text-xs text-[#9ca3af]">Completed {completedLabel}</p>` |
| `#e5e7eb` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | 63 | `<div className="mt-8 w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-5 text-left">` |
| `#f9fafb` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | 63 | `<div className="mt-8 w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-5 text-left">` |
| `#0B1F45` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | 64 | `<p className="text-xs font-semibold uppercase tracking-wide text-[#0B1F45]">What happens next</p>` |
| `#4b5563` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | 65 | `<ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#4b5563]">` |
| `#C9A227` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | 67 | `<span className="text-[#C9A227]" aria-hidden>` |
| `#C9A227` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | 73 | `<span className="text-[#C9A227]" aria-hidden>` |
| `#C9A227` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | 79 | `<span className="text-[#C9A227]" aria-hidden>` |
| `#0B1F45` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | 88 | `<Button asChild className="bg-[#0B1F45] text-white hover:bg-[#162d5e]">` |
| `#162d5e` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | 88 | `<Button asChild className="bg-[#0B1F45] text-white hover:bg-[#162d5e]">` |
| `#0B1F45` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | 91 | `<Button asChild variant="outline" className="border-[#0B1F45] text-[#0B1F45] hover:bg-[#0B1F45]/5">` |
| `#0B1F45` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | 91 | `<Button asChild variant="outline" className="border-[#0B1F45] text-[#0B1F45] hover:bg-[#0B1F45]/5">` |
| `#0B1F45` | `app/(auth)/questionnaires/[id]/complete/page.tsx` | 91 | `<Button asChild variant="outline" className="border-[#0B1F45] text-[#0B1F45] hover:bg-[#0B1F45]/5">` |
| `#0B1F45` | `app/(auth)/questionnaires/page.tsx` | 45 | `<h1 className="text-2xl font-bold text-[#0B1F45]">DD Questionnaires</h1>` |
| `#0B1F45` | `app/(auth)/settings/roles/page.tsx` | 43 | `{ id: 'admin', label: 'Admin', color: '#0B1F45', description: 'Full access â€” cannot be modified' },` |
| `#0F8A6E` | `app/(auth)/settings/roles/page.tsx` | 44 | `{ id: 'pctu_officer', label: 'PCTU Officer', color: '#0F8A6E', description: 'Portfolio monitoring team' },` |
| `#4F46E5` | `app/(auth)/settings/roles/page.tsx` | 45 | `{ id: 'portfolio_manager', label: 'Portfolio Manager', color: '#4F46E5', description: 'Portfolio + pipeline access' },` |
| `#2563EB` | `app/(auth)/settings/roles/page.tsx` | 46 | `{ id: 'investment_officer', label: 'Investment Officer', color: '#2563EB', description: 'Pipeline management' },` |
| `#D97706` | `app/(auth)/settings/roles/page.tsx` | 47 | `{ id: 'panel_member', label: 'Panel Member', color: '#D97706', description: 'Assessment scoring only' },` |
| `#7C3AED` | `app/(auth)/settings/roles/page.tsx` | 48 | `{ id: 'it_admin', label: 'IT Admin', color: '#7C3AED', description: 'User management only' },` |
| `#6B7280` | `app/(auth)/settings/roles/page.tsx` | 49 | `{ id: 'senior_management', label: 'Senior Management', color: '#6B7280', description: 'Executive view read-only' },` |
| `#0F8A6E` | `app/(auth)/settings/roles/page.tsx` | 163 | `const saveClass = saveState === 'saved' ? 'bg-[#0F8A6E] hover:bg-[#0F8A6E]' : 'bg-[#0B1F45] hover:bg-[#0B1F45]/90';` |
| `#0F8A6E` | `app/(auth)/settings/roles/page.tsx` | 163 | `const saveClass = saveState === 'saved' ? 'bg-[#0F8A6E] hover:bg-[#0F8A6E]' : 'bg-[#0B1F45] hover:bg-[#0B1F45]/90';` |
| `#0B1F45` | `app/(auth)/settings/roles/page.tsx` | 163 | `const saveClass = saveState === 'saved' ? 'bg-[#0F8A6E] hover:bg-[#0F8A6E]' : 'bg-[#0B1F45] hover:bg-[#0B1F45]/90';` |
| `#0B1F45` | `app/(auth)/settings/roles/page.tsx` | 163 | `const saveClass = saveState === 'saved' ? 'bg-[#0F8A6E] hover:bg-[#0F8A6E]' : 'bg-[#0B1F45] hover:bg-[#0B1F45]/90';` |
| `#0B1F45` | `app/(auth)/settings/roles/page.tsx` | 224 | `<p className="text-sm font-semibold text-[#0B1F45]">Roles</p>` |
| `#F3F4F6` | `app/(auth)/settings/roles/page.tsx` | 236 | `active ? 'border-gray-200 bg-[#F3F4F6]' : 'border-transparent hover:bg-gray-50',` |
| `#0B1F45` | `app/(auth)/settings/roles/page.tsx` | 245 | `<p className="truncate text-sm font-medium text-[#0B1F45]">{role.label}</p>` |
| `#0B1F45` | `app/(auth)/settings/roles/page.tsx` | 259 | `<h1 className="text-lg font-semibold text-[#0B1F45]">{selectedMeta.label}</h1>` |
| `#0B1F45` | `app/(auth)/settings/roles/page.tsx` | 301 | `!selectedIsAdmin && enabled && 'border-[#0B1F45] bg-[rgba(11,31,69,0.03)]',` |
| `#0B1F45` | `app/(auth)/settings/roles/page.tsx` | 306 | `<Icon className={cn('mt-0.5 h-4 w-4', enabled ? 'text-[#0B1F45]' : 'text-gray-300')} />` |
| `#0B1F45` | `app/(auth)/settings/roles/page.tsx` | 308 | `<p className={cn('text-sm font-medium', enabled ? 'text-[#0B1F45]' : 'text-gray-400')}>{mod.label}</p>` |
| `#0B1F45` | `app/(auth)/settings/roles/page.tsx` | 316 | `enabled ? 'bg-[#0B1F45]' : 'bg-[#D1D5DB]',` |
| `#D1D5DB` | `app/(auth)/settings/roles/page.tsx` | 316 | `enabled ? 'bg-[#0B1F45]' : 'bg-[#D1D5DB]',` |
| `#0B1F45` | `app/(auth)/settings/roles/page.tsx` | 349 | `<span className="text-sm font-medium text-[#0B1F45]">{u.full_name}</span>` |
| `#0B1F45` | `app/(auth)/settings/roles/page.tsx` | 379 | `<h3 className="text-base font-semibold text-[#0B1F45]">Unsaved changes</h3>` |
| `#0B1F45` | `app/(auth)/settings/roles/page.tsx` | 385 | `<Button className="bg-[#0B1F45] text-white hover:bg-[#0B1F45]/90" onClick={() => void confirmSaveFirst()}>` |
| `#0B1F45` | `app/(auth)/settings/roles/page.tsx` | 385 | `<Button className="bg-[#0B1F45] text-white hover:bg-[#0B1F45]/90" onClick={() => void confirmSaveFirst()}>` |
| `#0B1F45` | `app/(auth)/settings/users/invite/page.tsx` | 62 | `className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#0B1F45]"` |
| `#0B1F45` | `app/(auth)/settings/users/invite/page.tsx` | 68 | `<h1 className="text-2xl font-bold text-[#0B1F45]">Invite External User</h1>` |
| `#0B1F45` | `app/(auth)/settings/users/invite/page.tsx` | 136 | `className="bg-[#0B1F45] text-white hover:bg-[#0B1F45]/90"` |
| `#0B1F45` | `app/(auth)/settings/users/invite/page.tsx` | 136 | `className="bg-[#0B1F45] text-white hover:bg-[#0B1F45]/90"` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 13 | `const TEXT_PRIMARY = '#111827';` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 14 | `const TEXT_SECONDARY = '#6B7280';` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 15 | `const TEXT_TERTIARY = '#9CA3AF';` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 47 | `return { bg: '#E1F5EE', color: '#0F6E56' };` |
| `#0F6E56` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 47 | `return { bg: '#E1F5EE', color: '#0F6E56' };` |
| `#FAEEDA` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 50 | `return { bg: '#FAEEDA', color: '#633806' };` |
| `#633806` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 50 | `return { bg: '#FAEEDA', color: '#633806' };` |
| `#FCEBEB` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 52 | `return { bg: '#FCEBEB', color: '#A32D2D' };` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 52 | `return { bg: '#FCEBEB', color: '#A32D2D' };` |
| `#F1EFE8` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 54 | `return { bg: '#F1EFE8', color: '#5F5E5A' };` |
| `#5F5E5A` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 54 | `return { bg: '#F1EFE8', color: '#5F5E5A' };` |
| `#F1EFE8` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 56 | `return { bg: '#F1EFE8', color: '#5F5E5A' };` |
| `#5F5E5A` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 56 | `return { bg: '#F1EFE8', color: '#5F5E5A' };` |
| `#FFFFFF` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 63 | `return '#FFFFFF';` |
| `#FAEEDA` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 65 | `return '#FAEEDA';` |
| `#FCEBEB` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 67 | `return '#FCEBEB';` |
| `#E6F1FB` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 69 | `return '#E6F1FB';` |
| `#FFFFFF` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 71 | `return '#FFFFFF';` |
| `#FFFFFF` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 73 | `return '#FFFFFF';` |
| `#412402` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 87 | `return { line1: '#412402', line2: '#854F0B' };` |
| `#854F0B` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 87 | `return { line1: '#412402', line2: '#854F0B' };` |
| `#501313` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 89 | `return { line1: '#501313', line2: '#A32D2D' };` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 89 | `return { line1: '#501313', line2: '#A32D2D' };` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 100 | `return { bg: '#E1F5EE', color: '#085041', border: '0.5px solid #5DCAA5', label: 'Paid' };` |
| `#085041` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 100 | `return { bg: '#E1F5EE', color: '#085041', border: '0.5px solid #5DCAA5', label: 'Paid' };` |
| `#5DCAA5` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 100 | `return { bg: '#E1F5EE', color: '#085041', border: '0.5px solid #5DCAA5', label: 'Paid' };` |
| `#FAEEDA` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 102 | `return { bg: '#FAEEDA', color: '#633806', border: '0.5px solid #EF9F27', label: 'Payment due' };` |
| `#633806` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 102 | `return { bg: '#FAEEDA', color: '#633806', border: '0.5px solid #EF9F27', label: 'Payment due' };` |
| `#EF9F27` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 102 | `return { bg: '#FAEEDA', color: '#633806', border: '0.5px solid #EF9F27', label: 'Payment due' };` |
| `#E6F1FB` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 104 | `return { bg: '#E6F1FB', color: '#0C447C', border: '0.5px solid #85B7EB', label: 'Partial' };` |
| `#0C447C` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 104 | `return { bg: '#E6F1FB', color: '#0C447C', border: '0.5px solid #85B7EB', label: 'Partial' };` |
| `#85B7EB` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 104 | `return { bg: '#E6F1FB', color: '#0C447C', border: '0.5px solid #85B7EB', label: 'Partial' };` |
| `#FCEBEB` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 106 | `return { bg: '#FCEBEB', color: '#791F1F', border: '0.5px solid #F09595', label: 'Overdue' };` |
| `#791F1F` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 106 | `return { bg: '#FCEBEB', color: '#791F1F', border: '0.5px solid #F09595', label: 'Overdue' };` |
| `#F09595` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 106 | `return { bg: '#FCEBEB', color: '#791F1F', border: '0.5px solid #F09595', label: 'Overdue' };` |
| `#F1EFE8` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 108 | `return { bg: '#F1EFE8', color: '#5F5E5A', border: '0.5px solid #D3D1C7', label: 'Cancelled' };` |
| `#5F5E5A` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 108 | `return { bg: '#F1EFE8', color: '#5F5E5A', border: '0.5px solid #D3D1C7', label: 'Cancelled' };` |
| `#D3D1C7` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 108 | `return { bg: '#F1EFE8', color: '#5F5E5A', border: '0.5px solid #D3D1C7', label: 'Cancelled' };` |
| `#F3F4F6` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 110 | `return { bg: '#F3F4F6', color: TEXT_SECONDARY, border: '0.5px solid #EBEAE6', label: status };` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 110 | `return { bg: '#F3F4F6', color: TEXT_SECONDARY, border: '0.5px solid #EBEAE6', label: status };` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 116 | `return { text: Paid ${formatPortalDate(call.date_paid)}, color: '#1D9E75' };` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 121 | `if (call.status === 'overdue') return { text: Due ${d}, color: '#A32D2D' };` |
| `#854F0B` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 122 | `if (call.status === 'unpaid' \|\| call.status === 'partial') return { text: Due ${d}, color: '#854F0B' };` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 200 | `<Link href={/portal/funds/${appId}} style={{ fontSize: 14, fontWeight: 500, color: '#1D9E75' }} className="hover:underline">` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 214 | `style={{ borderWidth: '0.5px', borderColor: '#EBEAE6', padding: 48 }}` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 225 | `<div className="overflow-hidden bg-white shadow-sm" style={{ borderRadius: 12, border: '0.5px solid #EBEAE6' }}>` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 229 | `borderBottom: '0.5px solid #EBEAE6',` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 255 | `background: '#E1F5EE',` |
| `#0F6E56` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 256 | `color: '#0F6E56',` |
| `#5DCAA5` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 261 | `border: '0.5px solid #5DCAA5',` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 272 | `className="flex-1 border-b-[0.5px] border-b-[#EBEAE6] px-5 py-4 sm:border-b-0 sm:border-r-[0.5px] sm:border-r-[#EBEAE6]"` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 272 | `className="flex-1 border-b-[0.5px] border-b-[#EBEAE6] px-5 py-4 sm:border-b-0 sm:border-r-[0.5px] sm:border-r-[#EBEAE6]"` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 292 | `className="flex-1 border-b-[0.5px] border-b-[#EBEAE6] px-5 py-4 sm:border-b-0 sm:border-r-[0.5px] sm:border-r-[#EBEAE6]"` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 292 | `className="flex-1 border-b-[0.5px] border-b-[#EBEAE6] px-5 py-4 sm:border-b-0 sm:border-r-[0.5px] sm:border-r-[#EBEAE6]"` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 311 | `<div className="flex-1 px-5 py-4" style={{ background: '#E1F5EE', flex: '1 1 0' }}>` |
| `#0F6E56` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 318 | `color: '#0F6E56',` |
| `#085041` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 324 | `<div style={{ fontSize: 22, fontWeight: 500, color: '#085041' }}>` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 332 | `<div style={{ padding: '0 24px', borderBottom: '0.5px solid #EBEAE6', display: 'flex', flexWrap: 'wrap' }}>` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 346 | `? '#E1F5EE'` |
| `#FAEEDA` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 348 | `? '#FAEEDA'` |
| `#FCEBEB` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 349 | `: '#FCEBEB';` |
| `#0F6E56` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 350 | `const badgeColor = tone === 'green' ? '#0F6E56' : tone === 'amber' ? '#854F0B' : '#A32D2D';` |
| `#854F0B` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 350 | `const badgeColor = tone === 'green' ? '#0F6E56' : tone === 'amber' ? '#854F0B' : '#A32D2D';` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 350 | `const badgeColor = tone === 'green' ? '#0F6E56' : tone === 'amber' ? '#854F0B' : '#A32D2D';` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 361 | `borderBottom: active ? '2px solid #1D9E75' : '2px solid transparent',` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 362 | `color: active ? '#1D9E75' : TEXT_SECONDARY,` |
| `#E6F1FB` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 422 | `background: '#E6F1FB',` |
| `#85B7EB` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 423 | `border: '0.5px solid #85B7EB',` |
| `#185FA5` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 432 | `<i className="ti ti-info-circle" style={{ fontSize: 15, color: '#185FA5', flexShrink: 0 }} aria-hidden />` |
| `#0C447C` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 433 | `<p style={{ fontSize: 12, color: '#0C447C', lineHeight: 1.5, margin: 0 }}>` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 446 | `<i className="ti ti-check" style={{ fontSize: 32, color: '#1D9E75' }} aria-hidden />` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 484 | `borderBottom: isLast ? undefined : '0.5px solid #EBEAE6',` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 538 | `color: '#1D9E75',` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 550 | `<div style={{ paddingLeft: 52, borderTop: '0.5px solid #EBEAE6', marginTop: 8, paddingTop: 8 }}>` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 560 | `borderBottom: j < call.items.length - 1 ? '0.5px solid #EBEAE6' : undefined,` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/capital-calls/page.tsx` | 577 | `borderTop: '0.5px solid #EBEAE6',` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 13 | `const TEXT_PRIMARY = '#111827';` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 14 | `const TEXT_SECONDARY = '#6B7280';` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 15 | `const TEXT_TERTIARY = '#9CA3AF';` |
| `#FFFFFF` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 16 | `const BG_PRIMARY = '#FFFFFF';` |
| `#F3F4F6` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 17 | `const BG_SECONDARY = '#F3F4F6';` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 18 | `const BORDER_SECONDARY = '#EBEAE6';` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 224 | `<Link href={/portal/funds/${appId}} style={{ fontSize: 14, fontWeight: 500, color: '#1D9E75' }} className="hover:underline">` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 255 | `color: '#111827',` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 264 | `color: '#6B7280',` |
| `#FCEBEB` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 302 | `background: '#FCEBEB',` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 303 | `color: '#A32D2D',` |
| `#F09595` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 308 | `border: '0.5px solid #F09595',` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 317 | `background: '#E1F5EE',` |
| `#0F6E56` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 318 | `color: '#0F6E56',` |
| `#5DCAA5` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 323 | `border: '0.5px solid #5DCAA5',` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 339 | `borderRight: '0.5px solid #EBEAE6',` |
| `#FCEBEB` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 340 | `backgroundColor: overdueCount > 0 ? '#FCEBEB' : '#FFFFFF',` |
| `#FFFFFF` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 340 | `backgroundColor: overdueCount > 0 ? '#FCEBEB' : '#FFFFFF',` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 346 | `className="border-b border-[#EBEAE6] sm:border-b-0 sm:border-r sm:border-r-[#EBEAE6]"` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 346 | `className="border-b border-[#EBEAE6] sm:border-b-0 sm:border-r sm:border-r-[#EBEAE6]"` |
| `#F7C1C1` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 353 | `backgroundColor: overdueCount > 0 ? '#F7C1C1' : '#F1EFE8',` |
| `#F1EFE8` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 353 | `backgroundColor: overdueCount > 0 ? '#F7C1C1' : '#F1EFE8',` |
| `#791F1F` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 364 | `color: overdueCount > 0 ? '#791F1F' : '#9CA3AF',` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 364 | `color: overdueCount > 0 ? '#791F1F' : '#9CA3AF',` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 376 | `color: overdueCount > 0 ? '#A32D2D' : '#9CA3AF',` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 376 | `color: overdueCount > 0 ? '#A32D2D' : '#9CA3AF',` |
| `#791F1F` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 386 | `color: overdueCount > 0 ? '#791F1F' : '#111827',` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 386 | `color: overdueCount > 0 ? '#791F1F' : '#111827',` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 395 | `color: overdueCount > 0 ? '#A32D2D' : '#9CA3AF',` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 395 | `color: overdueCount > 0 ? '#A32D2D' : '#9CA3AF',` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 406 | `borderRight: '0.5px solid #EBEAE6',` |
| `#FAEEDA` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 407 | `backgroundColor: dueSoonCount > 0 ? '#FAEEDA' : '#FFFFFF',` |
| `#FFFFFF` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 407 | `backgroundColor: dueSoonCount > 0 ? '#FAEEDA' : '#FFFFFF',` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 413 | `className="border-b border-[#EBEAE6] sm:border-b-0 sm:border-r sm:border-r-[#EBEAE6]"` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 413 | `className="border-b border-[#EBEAE6] sm:border-b-0 sm:border-r sm:border-r-[#EBEAE6]"` |
| `#FAC775` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 420 | `backgroundColor: dueSoonCount > 0 ? '#FAC775' : '#F1EFE8',` |
| `#F1EFE8` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 420 | `backgroundColor: dueSoonCount > 0 ? '#FAC775' : '#F1EFE8',` |
| `#633806` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 431 | `color: dueSoonCount > 0 ? '#633806' : '#9CA3AF',` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 431 | `color: dueSoonCount > 0 ? '#633806' : '#9CA3AF',` |
| `#854F0B` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 443 | `color: dueSoonCount > 0 ? '#854F0B' : '#9CA3AF',` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 443 | `color: dueSoonCount > 0 ? '#854F0B' : '#9CA3AF',` |
| `#633806` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 453 | `color: dueSoonCount > 0 ? '#633806' : '#111827',` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 453 | `color: dueSoonCount > 0 ? '#633806' : '#111827',` |
| `#854F0B` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 462 | `color: dueSoonCount > 0 ? '#854F0B' : '#9CA3AF',` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 462 | `color: dueSoonCount > 0 ? '#854F0B' : '#9CA3AF',` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 473 | `borderRight: '0.5px solid #EBEAE6',` |
| `#FFFFFF` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 474 | `backgroundColor: '#FFFFFF',` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 480 | `className="border-b border-[#EBEAE6] sm:border-b-0 sm:border-r sm:border-r-[#EBEAE6]"` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 480 | `className="border-b border-[#EBEAE6] sm:border-b-0 sm:border-r sm:border-r-[#EBEAE6]"` |
| `#E6F1FB` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 487 | `backgroundColor: '#E6F1FB',` |
| `#185FA5` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 494 | `<i className="ti ti-clock" style={{ fontSize: 18, color: '#185FA5' }} aria-hidden="true" />` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 503 | `color: '#9CA3AF',` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 509 | `<div style={{ fontSize: 20, fontWeight: 600, color: '#111827', lineHeight: 1 }}>{summary.submitted}</div>` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 510 | `<div style={{ fontSize: 11, color: '#6B7280', marginTop: 3 }}>Submitted to DBJ</div>` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 516 | `backgroundColor: acceptedCount > 0 ? '#E1F5EE' : '#FFFFFF',` |
| `#FFFFFF` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 516 | `backgroundColor: acceptedCount > 0 ? '#E1F5EE' : '#FFFFFF',` |
| `#9FE1CB` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 529 | `backgroundColor: acceptedCount > 0 ? '#9FE1CB' : '#F1EFE8',` |
| `#F1EFE8` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 529 | `backgroundColor: acceptedCount > 0 ? '#9FE1CB' : '#F1EFE8',` |
| `#085041` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 540 | `color: acceptedCount > 0 ? '#085041' : '#9CA3AF',` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 540 | `color: acceptedCount > 0 ? '#085041' : '#9CA3AF',` |
| `#0F6E56` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 552 | `color: acceptedCount > 0 ? '#0F6E56' : '#9CA3AF',` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 552 | `color: acceptedCount > 0 ? '#0F6E56' : '#9CA3AF',` |
| `#085041` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 562 | `color: acceptedCount > 0 ? '#085041' : '#111827',` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 562 | `color: acceptedCount > 0 ? '#085041' : '#111827',` |
| `#0F6E56` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 571 | `color: acceptedCount > 0 ? '#0F6E56' : '#9CA3AF',` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 571 | `color: acceptedCount > 0 ? '#0F6E56' : '#9CA3AF',` |
| `#FCEBEB` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 593 | `? '#FCEBEB'` |
| `#FAEEDA` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 595 | `? '#FAEEDA'` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 598 | `tone === 'red' && count > 0 ? '#A32D2D' : tone === 'amber' && count > 0 ? '#854F0B' : TEXT_SECONDARY;` |
| `#854F0B` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 598 | `tone === 'red' && count > 0 ? '#A32D2D' : tone === 'amber' && count > 0 ? '#854F0B' : TEXT_SECONDARY;` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 609 | `borderBottom: active ? '2px solid #1D9E75' : '2px solid transparent',` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 610 | `color: active ? '#1D9E75' : TEXT_SECONDARY,` |
| `#FAFAF9` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 644 | `backgroundColor: '#FAFAF9',` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 649 | `<span style={{ fontSize: 12, color: '#6B7280' }}>` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 653 | `<span style={{ fontSize: 12, color: '#9CA3AF' }}>Sort</span>` |
| `#374151` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 659 | `color: '#374151',` |
| `#D3D1C7` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 660 | `border: '0.5px solid #D3D1C7',` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 760 | `<i className="ti ti-check" style={{ fontSize: 32, color: '#1D9E75' }} aria-hidden />` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 795 | `background: '#E1F5EE',` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 802 | `<i className="ti ti-check" style={{ fontSize: 24, color: '#1D9E75' }} aria-hidden />` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 804 | `<div style={{ fontSize: 15, fontWeight: 500, color: '#111827', marginBottom: 6 }}>No action required</div>` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 805 | `<div style={{ fontSize: 13, color: '#6B7280', maxWidth: 280 }}>` |
| `#9FE1CB` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 841 | `if (visual === 'accepted') return { bg: '#9FE1CB', color: '#085041' };` |
| `#085041` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 841 | `if (visual === 'accepted') return { bg: '#9FE1CB', color: '#085041' };` |
| `#F7C1C1` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 842 | `if (visual === 'overdue') return { bg: '#F7C1C1', color: '#791F1F' };` |
| `#791F1F` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 842 | `if (visual === 'overdue') return { bg: '#F7C1C1', color: '#791F1F' };` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 846 | `return { bg: '#E1F5EE', color: '#0F6E56' };` |
| `#0F6E56` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 846 | `return { bg: '#E1F5EE', color: '#0F6E56' };` |
| `#E6F1FB` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 848 | `return { bg: '#E6F1FB', color: '#185FA5' };` |
| `#185FA5` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 848 | `return { bg: '#E6F1FB', color: '#185FA5' };` |
| `#EEEDFE` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 850 | `return { bg: '#EEEDFE', color: '#534AB7' };` |
| `#534AB7` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 850 | `return { bg: '#EEEDFE', color: '#534AB7' };` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 852 | `return { bg: '#E1F5EE', color: '#0F6E56' };` |
| `#0F6E56` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 852 | `return { bg: '#E1F5EE', color: '#0F6E56' };` |
| `#FCEBEB` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 859 | `return { bg: '#FCEBEB', color: '#791F1F', border: '0.5px solid #F09595', label: 'Overdue' };` |
| `#791F1F` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 859 | `return { bg: '#FCEBEB', color: '#791F1F', border: '0.5px solid #F09595', label: 'Overdue' };` |
| `#F09595` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 859 | `return { bg: '#FCEBEB', color: '#791F1F', border: '0.5px solid #F09595', label: 'Overdue' };` |
| `#FAEEDA` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 861 | `return { bg: '#FAEEDA', color: '#633806', border: '0.5px solid #EF9F27', label: 'Due soon' };` |
| `#633806` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 861 | `return { bg: '#FAEEDA', color: '#633806', border: '0.5px solid #EF9F27', label: 'Due soon' };` |
| `#EF9F27` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 861 | `return { bg: '#FAEEDA', color: '#633806', border: '0.5px solid #EF9F27', label: 'Due soon' };` |
| `#E6F1FB` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 863 | `return { bg: '#E6F1FB', color: '#0C447C', border: '0.5px solid #85B7EB', label: 'Submitted' };` |
| `#0C447C` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 863 | `return { bg: '#E6F1FB', color: '#0C447C', border: '0.5px solid #85B7EB', label: 'Submitted' };` |
| `#85B7EB` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 863 | `return { bg: '#E6F1FB', color: '#0C447C', border: '0.5px solid #85B7EB', label: 'Submitted' };` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 865 | `return { bg: '#E1F5EE', color: '#085041', border: '0.5px solid #5DCAA5', label: 'Accepted' };` |
| `#085041` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 865 | `return { bg: '#E1F5EE', color: '#085041', border: '0.5px solid #5DCAA5', label: 'Accepted' };` |
| `#5DCAA5` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 865 | `return { bg: '#E1F5EE', color: '#085041', border: '0.5px solid #5DCAA5', label: 'Accepted' };` |
| `#F1EFE8` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 867 | `return { bg: '#F1EFE8', color: '#5F5E5A', border: '0.5px solid #D3D1C7', label: 'Waived' };` |
| `#5F5E5A` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 867 | `return { bg: '#F1EFE8', color: '#5F5E5A', border: '0.5px solid #D3D1C7', label: 'Waived' };` |
| `#D3D1C7` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 867 | `return { bg: '#F1EFE8', color: '#5F5E5A', border: '0.5px solid #D3D1C7', label: 'Waived' };` |
| `#FCEBEB` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 911 | `if (visual === 'overdue') rowBg = '#FCEBEB';` |
| `#FAEEDA` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 912 | `else if (visual === 'due_soon') rowBg = '#FAEEDA';` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 913 | `else if (visual === 'accepted') rowBg = '#E1F5EE';` |
| `#501313` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 921 | `line1 = '#501313';` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 922 | `line2 = '#A32D2D';` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 923 | `dateColor = '#A32D2D';` |
| `#412402` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 926 | `line1 = '#412402';` |
| `#854F0B` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 927 | `line2 = '#854F0B';` |
| `#854F0B` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 928 | `dateColor = '#854F0B';` |
| `#085041` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 931 | `line1 = '#085041';` |
| `#0F6E56` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 932 | `line2 = '#0F6E56';` |
| `#0F6E56` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 933 | `dateColor = '#0F6E56';` |
| `#E6F1FB` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 960 | `background: '#E6F1FB',` |
| `#185FA5` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 961 | `color: '#185FA5',` |
| `#E6F1FB` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 1008 | `background: '#E6F1FB',` |
| `#85B7EB` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 1010 | `border: '0.5px solid #85B7EB',` |
| `#0C447C` | `app/(portal)/(authenticated)/portal/funds/[id]/compliance/page.tsx` | 1012 | `color: '#0C447C',` |
| `#0B1F45` | `app/(portal)/(authenticated)/portal/funds/[id]/documents/page.tsx` | 8 | `<h1 className="text-xl font-semibold text-[#0B1F45]">Documents</h1>` |
| `#00A99D` | `app/(portal)/(authenticated)/portal/funds/[id]/documents/page.tsx` | 15 | `<Link href={/portal/funds/${id}} className="text-sm font-medium text-[#00A99D] hover:underline">` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 67 | `if (status === 'paid') return '#1D9E75';` |
| `#E24B4A` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 68 | `if (status === 'overdue') return '#E24B4A';` |
| `#EF9F27` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 69 | `if (status === 'partial') return '#EF9F27';` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 70 | `return '#9CA3AF';` |
| `#00A99D` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 111 | `<div className="h-full rounded-full bg-[#00A99D]" style={{ width: ${progressPct}% }} />` |
| `#00A99D` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 120 | `<Link href={/portal/funds/${id}/questionnaire} className="mt-4 inline-flex rounded-lg bg-[#00A99D] px-4 py-2 text-sm font-semibold text-whâ€¦` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 129 | `border: '0.5px solid #EBEAE6',` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 139 | `borderBottom: '0.5px solid #EBEAE6',` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 151 | `color: '#9CA3AF',` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 160 | `color: '#1D9E75',` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 188 | `background: '#E1F5EE',` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 195 | `<i className="ti ti-check" style={{ fontSize: 16, color: '#1D9E75' }} aria-hidden />` |
| `#085041` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 198 | `<div style={{ fontSize: 13, fontWeight: 500, color: '#085041' }}>Fully compliant</div>` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 199 | `<div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>No overdue or upcoming obligations</div>` |
| `#FCEBEB` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 212 | `background: '#FCEBEB',` |
| `#F09595` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 213 | `borderBottom: '0.5px solid #F09595',` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 220 | `<i className="ti ti-alert-circle" style={{ fontSize: 16, color: '#A32D2D', flexShrink: 0 }} aria-hidden />` |
| `#501313` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 222 | `<div style={{ fontSize: 13, fontWeight: 500, color: '#501313' }}>` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 225 | `<div style={{ fontSize: 11, color: '#A32D2D', marginTop: 1 }}>Immediate action required</div>` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 233 | `color: '#A32D2D',` |
| `#F09595` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 236 | `border: '0.5px solid #F09595',` |
| `#FAEEDA` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 261 | `background: '#FAEEDA',` |
| `#633806` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 268 | `<i className="ti ti-calendar-due" style={{ fontSize: 14, color: '#633806' }} aria-hidden />` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 271 | `<div style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>{formatReportType(nextDue.report_type)}</div>` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 272 | `<div style={{ fontSize: 11, color: '#6B7280', marginTop: 1 }}>` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 281 | `color: diff < 0 ? '#A32D2D' : diff <= 7 ? '#854F0B' : '#6B7280',` |
| `#854F0B` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 281 | `color: diff < 0 ? '#A32D2D' : diff <= 7 ? '#854F0B' : '#6B7280',` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 281 | `color: diff < 0 ? '#A32D2D' : diff <= 7 ? '#854F0B' : '#6B7280',` |
| `#E24B4A` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 416 | `{ name: 'Overdue', value: overdueCount, color: '#E24B4A' },` |
| `#EF9F27` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 417 | `{ name: 'Pending', value: pendingCount, color: '#EF9F27' },` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 418 | `{ name: 'Accepted', value: acceptedComplianceCount, color: '#1D9E75' },` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 428 | `<h1 style={{ fontSize: 22, fontWeight: 600, color: '#111827', margin: 0 }}>Overview</h1>` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 429 | `<p style={{ fontSize: 13, color: '#6B7280', margin: '4px 0 0' }}>` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 437 | `border: '0.5px solid #EBEAE6',` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 447 | `borderBottom: '0.5px solid #EBEAE6',` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 453 | `<span style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9CA3AF' }}>Fund Status</span>` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 460 | `background: '#E1F5EE',` |
| `#085041` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 461 | `color: '#085041',` |
| `#5DCAA5` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 462 | `border: '0.5px solid #5DCAA5',` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 473 | `<div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9CA3AF', marginBottom: 6 }}>Fund<â€¦` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 474 | `<div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{portfolioFund?.fund_name ?? fundTitle}</div>` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 475 | `<div style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>{managerDisplay}</div>` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 478 | `<div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9CA3AF', marginBottom: 6 }}>Commiâ€¦` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 479 | `<div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 482 | `<div style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>{formatDaysAgo(committedSource)}</div>` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 485 | `<div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9CA3AF', marginBottom: 6 }}>DBJ Câ€¦` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 486 | `<div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 491 | `<div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9CA3AF', marginBottom: 6 }}>Remaiâ€¦` |
| `#085041` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 492 | `<div style={{ fontSize: 14, fontWeight: 600, color: '#085041' }}>` |
| `#0F6E56` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 495 | `<div style={{ fontSize: 11, color: '#0F6E56', marginTop: 4 }}>` |
| `#FAFAF9` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 502 | `background: '#FAFAF9',` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 503 | `borderTop: '0.5px solid #EBEAE6',` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 508 | `<span style={{ fontSize: 11, color: '#6B7280' }}>Capital deployment</span>` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 509 | `<span style={{ fontSize: 11, fontWeight: 500, color: '#111827' }}>{calledPct.toFixed(0)}% called</span>` |
| `#E5E7EB` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 511 | `<div style={{ background: '#E5E7EB', height: 6, borderRadius: 4, overflow: 'hidden' }}>` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 517 | `background: 'linear-gradient(90deg, #1D9E75, #00A99D)',` |
| `#00A99D` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 517 | `background: 'linear-gradient(90deg, #1D9E75, #00A99D)',` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 528 | `border: '0.5px solid #EBEAE6',` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 537 | `borderBottom: '0.5px solid #EBEAE6',` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 543 | `<span style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9CA3AF' }}>Capital Calls</span>` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 544 | `<Link href={/portal/funds/${id}/capital-calls} style={{ fontSize: 12, color: '#1D9E75', fontWeight: 500, textDecoration: 'none' }}>` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 555 | `<div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9CA3AF' }}>Total called to date</â€¦` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 556 | `<div style={{ fontSize: 18, fontWeight: 600, color: '#111827', marginTop: 4 }}>{formatPortalCurrency(totalCalled, currency)}</div>` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 566 | `background: '#E1F5EE',` |
| `#085041` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 567 | `color: '#085041',` |
| `#085041` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 572 | `<div style={{ fontSize: 12, fontWeight: 600, color: allPaid ? '#085041' : '#854F0B', marginTop: 6 }}>` |
| `#854F0B` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 572 | `<div style={{ fontSize: 12, fontWeight: 600, color: allPaid ? '#085041' : '#854F0B', marginTop: 6 }}>` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 579 | `<XAxis dataKey="name" tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 581 | `tick={{ fontSize: 9, fill: '#9CA3AF' }}` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 595 | `contentStyle={{ fontSize: 11, borderRadius: 8, border: '0.5px solid #EBEAE6' }}` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 612 | `border: '0.5px solid #EBEAE6',` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 621 | `borderBottom: '0.5px solid #EBEAE6',` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 627 | `<span style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9CA3AF' }}>Compliance</span>` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 628 | `<Link href={/portal/funds/${id}/compliance} style={{ fontSize: 12, color: '#1D9E75', fontWeight: 500, textDecoration: 'none' }}>` |
| `#FCEBEB` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 636 | `background: '#FCEBEB',` |
| `#F09595` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 637 | `borderBottom: '0.5px solid #F09595',` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 644 | `<i className="ti ti-alert-circle" style={{ fontSize: 18, color: '#A32D2D' }} aria-hidden />` |
| `#501313` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 646 | `<div style={{ fontSize: 13, fontWeight: 600, color: '#501313' }}>{overdueCount} overdue</div>` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 647 | `<div style={{ fontSize: 11, color: '#A32D2D', marginTop: 2 }}>Immediate action required</div>` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 655 | `color: '#A32D2D',` |
| `#F09595` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 658 | `border: '0.5px solid #F09595',` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 670 | `background: '#E1F5EE',` |
| `#5DCAA5` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 671 | `borderBottom: '0.5px solid #5DCAA5',` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 677 | `<i className="ti ti-circle-check" style={{ fontSize: 16, color: '#1D9E75' }} aria-hidden="true" />` |
| `#085041` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 679 | `<div style={{ fontSize: 13, fontWeight: 500, color: '#085041' }}>Fully compliant</div>` |
| `#0F6E56` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 680 | `<div style={{ fontSize: 11, color: '#0F6E56', marginTop: 1 }}>No overdue obligations</div>` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 692 | `background: '#E1F5EE',` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 699 | `<i className="ti ti-check" style={{ fontSize: 22, color: '#1D9E75' }} aria-hidden="true" />` |
| `#085041` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 701 | `<div style={{ fontSize: 13, fontWeight: 500, color: '#085041' }}>All clear</div>` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 702 | `<div style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>No obligations to display in the chart.</div>` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 729 | `<span style={{ fontSize: 10, color: '#6B7280' }}>` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 743 | `border: '0.5px solid #EBEAE6',` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 752 | `borderBottom: '0.5px solid #EBEAE6',` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 758 | `<span style={{ fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#9CA3AF' }}>Reports</span>` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 759 | `<Link href={/portal/funds/${id}/reports} style={{ fontSize: 12, color: '#1D9E75', fontWeight: 500, textDecoration: 'none' }}>` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 766 | `<div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9CA3AF' }}>Next due</div>` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 769 | `<div style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginTop: 4 }}>{formatPortalDate(nextDue.due_date.slice(0, 10))}</div>` |
| `#854F0B` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 774 | `color: nextDueDiff != null && nextDueDiff >= 0 && nextDueDiff < 30 ? '#854F0B' : '#6B7280',` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 774 | `color: nextDueDiff != null && nextDueDiff >= 0 && nextDueDiff < 30 ? '#854F0B' : '#6B7280',` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 781 | `<div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>â€”</div>` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 785 | `<div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9CA3AF' }}>Accepted</div>` |
| `#085041` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 786 | `<div style={{ fontSize: 20, fontWeight: 600, color: '#085041', marginTop: 4 }}>{reportsAccepted}</div>` |
| `#E5E7EB` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 792 | `<div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', background: '#E5E7EB' }}>` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 797 | `background: '#1D9E75',` |
| `#E24B4A` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 802 | `{overduePct > 0 ? <div style={{ width: ${overduePct}%, background: '#E24B4A' }} /> : null}` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 806 | `<div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1D9E75' }} />` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 807 | `<span style={{ fontSize: 10, color: '#6B7280' }}>Accepted ({reportsAccepted})</span>` |
| `#E24B4A` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 811 | `<div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E24B4A' }} />` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 812 | `<span style={{ fontSize: 10, color: '#6B7280' }}>Overdue ({reportsOverdue})</span>` |
| `#0F6E56` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 815 | `<span style={{ fontSize: 10, color: '#0F6E56', fontWeight: 500 }}>âœ“ All up to date</span>` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 820 | `<p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 16, textAlign: 'center' }}>No obligation breakdown for this chart.</p>` |
| `#00A99D` | `app/(portal)/(authenticated)/portal/funds/[id]/page.tsx` | 826 | `style={{ marginTop: 16, background: '#00A99D', padding: '10px 16px', fontSize: 13, textDecoration: 'none' }}` |
| `#00A99D` | `app/(portal)/(authenticated)/portal/funds/[id]/questionnaire/[qid]/complete/page.tsx` | 74 | `<svg width={64} height={64} viewBox="0 0 24 24" fill="none" aria-hidden className="text-[#00A99D]">` |
| `#00A99D` | `app/(portal)/(authenticated)/portal/funds/[id]/questionnaire/[qid]/complete/page.tsx` | 85 | `className="mt-8 inline-flex rounded-lg bg-[#00A99D] px-5 py-3 text-sm font-semibold text-white hover:bg-[#008f85]"` |
| `#008f85` | `app/(portal)/(authenticated)/portal/funds/[id]/questionnaire/[qid]/complete/page.tsx` | 85 | `className="mt-8 inline-flex rounded-lg bg-[#00A99D] px-5 py-3 text-sm font-semibold text-white hover:bg-[#008f85]"` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 14 | `const TEXT_SECONDARY = '#6B7280';` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 15 | `const TEXT_TERTIARY = '#9CA3AF';` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 16 | `const TEXT_PRIMARY = '#111827';` |
| `#00A99D` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 77 | `<svg width={32} height={32} viewBox="0 0 24 24" fill="none" aria-hidden className="mx-auto text-[#00A99D]">` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 125 | `return { icon: 'ti ti-chart-bar', bg: '#E1F5EE', color: '#0F6E56' };` |
| `#0F6E56` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 125 | `return { icon: 'ti ti-chart-bar', bg: '#E1F5EE', color: '#0F6E56' };` |
| `#E6F1FB` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 127 | `return { icon: 'ti ti-file-analytics', bg: '#E6F1FB', color: '#185FA5' };` |
| `#185FA5` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 127 | `return { icon: 'ti ti-file-analytics', bg: '#E6F1FB', color: '#185FA5' };` |
| `#EEEDFE` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 129 | `return { icon: 'ti ti-building-bank', bg: '#EEEDFE', color: '#534AB7' };` |
| `#534AB7` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 129 | `return { icon: 'ti ti-building-bank', bg: '#EEEDFE', color: '#534AB7' };` |
| `#FAEEDA` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 131 | `return { icon: 'ti ti-file-description', bg: '#FAEEDA', color: '#633806' };` |
| `#633806` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 131 | `return { icon: 'ti ti-file-description', bg: '#FAEEDA', color: '#633806' };` |
| `#F3F4F6` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 133 | `return { icon: 'ti ti-file-text', bg: '#F3F4F6', color: '#4B5563' };` |
| `#4B5563` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 133 | `return { icon: 'ti ti-file-text', bg: '#F3F4F6', color: '#4B5563' };` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 301 | `<Link href={/portal/funds/${appId}} className="text-sm font-medium text-[#1D9E75] hover:underline">` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 307 | `<h1 style={{ fontSize: 22, fontWeight: 600, color: '#111827', margin: 0 }}>Reports</h1>` |
| `#6B7280` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 308 | `<p style={{ fontSize: 13, color: '#6B7280', margin: '4px 0 0' }}>` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 329 | `style={{ borderWidth: '0.5px', borderColor: '#EBEAE6', padding: 48 }}` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 344 | `style={{ borderRadius: 12, border: '0.5px solid #EBEAE6' }}` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 349 | `borderBottom: '0.5px solid #EBEAE6',` |
| `#FCEBEB` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 376 | `background: '#FCEBEB',` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 377 | `color: '#A32D2D',` |
| `#F09595` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 382 | `border: '0.5px solid #F09595',` |
| `#FAEEDA` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 391 | `background: '#FAEEDA',` |
| `#854F0B` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 392 | `color: '#854F0B',` |
| `#EF9F27` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 397 | `border: '0.5px solid #EF9F27',` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 406 | `<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '0.5px solid #EBEAE6' }}>` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 407 | `<div style={{ padding: '16px 20px', borderRight: '0.5px solid #EBEAE6', backgroundColor: 'white' }}>` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 414 | `color: '#9CA3AF',` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 420 | `<div style={{ fontSize: 22, fontWeight: 500, color: '#111827' }}>{totalCount}</div>` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 426 | `borderRight: '0.5px solid #EBEAE6',` |
| `#FCEBEB` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 427 | `backgroundColor: overdueStatCount > 0 ? '#FCEBEB' : 'white',` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 436 | `color: overdueStatCount > 0 ? '#A32D2D' : '#9CA3AF',` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 436 | `color: overdueStatCount > 0 ? '#A32D2D' : '#9CA3AF',` |
| `#791F1F` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 442 | `<div style={{ fontSize: 22, fontWeight: 500, color: overdueStatCount > 0 ? '#791F1F' : '#111827' }}>{overdueStatCount}</div>` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 442 | `<div style={{ fontSize: 22, fontWeight: 500, color: overdueStatCount > 0 ? '#791F1F' : '#111827' }}>{overdueStatCount}</div>` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 448 | `borderRight: '0.5px solid #EBEAE6',` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 449 | `backgroundColor: acceptedCount > 0 ? '#E1F5EE' : 'white',` |
| `#0F6E56` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 458 | `color: acceptedCount > 0 ? '#0F6E56' : '#9CA3AF',` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 458 | `color: acceptedCount > 0 ? '#0F6E56' : '#9CA3AF',` |
| `#085041` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 464 | `<div style={{ fontSize: 22, fontWeight: 500, color: acceptedCount > 0 ? '#085041' : '#111827' }}>{acceptedCount}</div>` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 464 | `<div style={{ fontSize: 22, fontWeight: 500, color: acceptedCount > 0 ? '#085041' : '#111827' }}>{acceptedCount}</div>` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 474 | `color: '#9CA3AF',` |
| `#111827` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 480 | `<div style={{ fontSize: 22, fontWeight: 500, color: '#111827' }}>{pendingCount}</div>` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 484 | `<div style={{ padding: '0 24px', borderBottom: '0.5px solid #EBEAE6', display: 'flex', flexWrap: 'wrap' }}>` |
| `#FCEBEB` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 497 | `? { background: '#FCEBEB', color: '#A32D2D' }` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 497 | `? { background: '#FCEBEB', color: '#A32D2D' }` |
| `#F3F4F6` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 499 | `? { background: '#F3F4F6', color: TEXT_SECONDARY }` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 501 | `? { background: '#E1F5EE', color: '#0F6E56' }` |
| `#0F6E56` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 501 | `? { background: '#E1F5EE', color: '#0F6E56' }` |
| `#F3F4F6` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 502 | `: { background: '#F3F4F6', color: TEXT_TERTIARY };` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 513 | `borderBottom: active ? '2px solid #1D9E75' : '2px solid transparent',` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 514 | `color: active ? '#1D9E75' : TEXT_SECONDARY,` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 546 | `borderBottom: '0.5px solid #EBEAE6',` |
| `#FAFAF9` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 547 | `backgroundColor: '#FAFAF9',` |
| `#374151` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 558 | `color: '#374151',` |
| `#D3D1C7` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 559 | `border: '0.5px solid #D3D1C7',` |
| `#9CA3AF` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 576 | `<span style={{ fontSize: 12, color: '#9CA3AF' }}>Sort by</span>` |
| `#374151` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 582 | `color: '#374151',` |
| `#D3D1C7` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 583 | `border: '0.5px solid #D3D1C7',` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 618 | `style={{ borderColor: '#EBEAE6', paddingBottom: 8 }}` |
| `#F3F4F6` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 627 | `background: '#F3F4F6',` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 654 | `borderBottom: '0.5px solid #EBEAE6',` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 668 | `borderBottom: i < historyRows.length - 1 ? '0.5px solid #EBEAE6' : undefined,` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 682 | `<i className="ti ti-download" style={{ fontSize: 16, color: '#1D9E75', cursor: 'pointer' }} />` |
| `#F3F4F6` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 715 | `let bg = '#F3F4F6';` |
| `#9FE1CB` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 718 | `bg = '#9FE1CB';` |
| `#085041` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 719 | `color = '#085041';` |
| `#F3F4F6` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 721 | `bg = '#F3F4F6';` |
| `#D1FAE5` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 724 | `bg = '#D1FAE5';` |
| `#065F46` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 725 | `color = '#065F46';` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 750 | `<i className="ti ti-check" style={{ fontSize: 32, color: '#1D9E75' }} aria-hidden />` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 770 | `<i className="ti ti-check" style={{ fontSize: 32, color: '#1D9E75' }} aria-hidden />` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 797 | `border: '0.5px solid #EBEAE6',` |
| `#FFFFFF` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 800 | `background: '#FFFFFF',` |
| `#FCEBEB` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 811 | `background: '#FCEBEB',` |
| `#F09595` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 812 | `borderColor: '#F09595',` |
| `#501313` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 814 | `nameColor = '#501313';` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 815 | `periodColor = '#A32D2D';` |
| `#A32D2D` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 817 | `dateStyle = { fontSize: 13, color: '#A32D2D', fontWeight: 500 };` |
| `#FAEEDA` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 821 | `background: '#FAEEDA',` |
| `#EF9F27` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 822 | `borderColor: '#EF9F27',` |
| `#412402` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 824 | `nameColor = '#412402';` |
| `#854F0B` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 825 | `periodColor = '#854F0B';` |
| `#854F0B` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 827 | `dateStyle = { fontSize: 13, color: '#854F0B', fontWeight: 500 };` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 832 | `dateStyle = { fontSize: 12, color: '#1D9E75', fontWeight: 400 };` |
| `#E1F5EE` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 836 | `background: '#E1F5EE',` |
| `#5DCAA5` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 837 | `borderColor: '#5DCAA5',` |
| `#085041` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 839 | `nameColor = '#085041';` |
| `#0F6E56` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 840 | `periodColor = '#0F6E56';` |
| `#2563EB` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 865 | `style={{ fontSize: 11, color: '#2563EB', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}` |
| `#F9FAFB` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 872 | `style={{ background: '#F9FAFB', color: TEXT_SECONDARY, border: '0.5px solid #EBEAE6' }}` |
| `#EBEAE6` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 872 | `style={{ background: '#F9FAFB', color: TEXT_SECONDARY, border: '0.5px solid #EBEAE6' }}` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 886 | `<a href={o.document_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#1D9E75', fontWeight: 500 }}>` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 891 | `<a href={o.document_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#1D9E75', fontWeight: 500 }}>` |
| `#9FE1CB` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 903 | `background: '#9FE1CB',` |
| `#085041` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 904 | `color: '#085041',` |
| `#E24B4A` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 918 | `background: '#E24B4A',` |
| `#fff` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 919 | `color: '#fff',` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 929 | `background: '#1D9E75',` |
| `#fff` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 930 | `color: '#fff',` |
| `#FFFFFF` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 939 | `background: '#FFFFFF',` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 940 | `color: '#1D9E75',` |
| `#1D9E75` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 941 | `border: '0.5px solid #1D9E75',` |
| `#00A99D` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 1087 | `className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#00A99D] text-sm font-semibold text-white hover:bg-[#00948â€¦` |
| `#009488` | `app/(portal)/(authenticated)/portal/funds/[id]/reports/page.tsx` | 1087 | `className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#00A99D] text-sm font-semibold text-white hover:bg-[#00948â€¦` |
| `#00A99D` | `app/(portal)/(authenticated)/portal/questionnaire/[id]/complete/page.tsx` | 38 | `<svg width={64} height={64} viewBox="0 0 24 24" fill="none" aria-hidden className="text-[#00A99D]">` |
| `#00A99D` | `app/(portal)/(authenticated)/portal/questionnaire/[id]/complete/page.tsx` | 93 | `<Link href="/portal" className="mt-4 inline-block font-medium text-[#00A99D] hover:underline">` |
| `#00A99D` | `app/(portal)/(authenticated)/portal/questionnaire/[id]/complete/page.tsx` | 126 | `className="mt-10 inline-flex w-full max-w-xs items-center justify-center rounded-lg bg-[#00A99D] px-5 py-3 text-sm font-semibold text-white â€¦` |
| `#008f85` | `app/(portal)/(authenticated)/portal/questionnaire/[id]/complete/page.tsx` | 126 | `className="mt-10 inline-flex w-full max-w-xs items-center justify-center rounded-lg bg-[#00A99D] px-5 py-3 text-sm font-semibold text-white â€¦` |
| `#0f1c3a` | `app/(portal)/(public)/portal/forgot-password/page.tsx` | 10 | `'h-11 w-full rounded-[10px] border border-[rgba(180,186,210,0.6)] bg-white/70 pl-10 pr-3 text-[14px] text-[#0f1c3a] outline-none transition-â€¦` |
| `#9aa3b8` | `app/(portal)/(public)/portal/forgot-password/page.tsx` | 10 | `'h-11 w-full rounded-[10px] border border-[rgba(180,186,210,0.6)] bg-white/70 pl-10 pr-3 text-[14px] text-[#0f1c3a] outline-none transition-â€¦` |
| `#00A99D` | `app/(portal)/(public)/portal/forgot-password/page.tsx` | 10 | `'h-11 w-full rounded-[10px] border border-[rgba(180,186,210,0.6)] bg-white/70 pl-10 pr-3 text-[14px] text-[#0f1c3a] outline-none transition-â€¦` |
| `#00A99D` | `app/(portal)/(public)/portal/forgot-password/page.tsx` | 14 | `<span className="mb-3 inline-flex rounded-full border border-[#00A99D]/20 bg-[#00A99D]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#00A99â€¦` |
| `#00A99D` | `app/(portal)/(public)/portal/forgot-password/page.tsx` | 14 | `<span className="mb-3 inline-flex rounded-full border border-[#00A99D]/20 bg-[#00A99D]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#00A99â€¦` |
| `#00A99D` | `app/(portal)/(public)/portal/forgot-password/page.tsx` | 14 | `<span className="mb-3 inline-flex rounded-full border border-[#00A99D]/20 bg-[#00A99D]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#00A99â€¦` |
| `#00A99D` | `app/(portal)/(public)/portal/forgot-password/page.tsx` | 22 | `<svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden className="text-[#00A99D]">` |
| `#0f1c3a` | `app/(portal)/(public)/portal/forgot-password/page.tsx` | 66 | `<h2 className="text-[22px] font-bold leading-tight text-[#0f1c3a]">Reset your password</h2>` |
| `#6b7494` | `app/(portal)/(public)/portal/forgot-password/page.tsx` | 67 | `<p className="mt-1.5 text-[13px] text-[#6b7494]">Enter your email to receive a reset link</p>` |
| `#0f1c3a` | `app/(portal)/(public)/portal/forgot-password/page.tsx` | 72 | `<p className="mt-4 text-[16px] font-semibold text-[#0f1c3a]">Check your inbox</p>` |
| `#6b7494` | `app/(portal)/(public)/portal/forgot-password/page.tsx` | 73 | `<p className="mt-2 text-[13px] leading-relaxed text-[#6b7494]">` |
| `#00A99D` | `app/(portal)/(public)/portal/forgot-password/page.tsx` | 76 | `<Link href="/portal/login" className="mt-6 text-[14px] font-medium text-[#00A99D] hover:underline">` |
| `#8690a8` | `app/(portal)/(public)/portal/forgot-password/page.tsx` | 88 | `<label htmlFor="portal-forgot-email" className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wide text-[#8690a8]">` |
| `#9aa3b8` | `app/(portal)/(public)/portal/forgot-password/page.tsx` | 116 | `<p className="mt-8 text-center text-[11.5px] leading-relaxed text-[#9aa3b8]">` |
| `#0B1F45` | `app/(portal)/(public)/portal/forgot-password/page.tsx` | 126 | `<Suspense fallback={<div className="h-screen w-screen bg-[#0B1F45]" aria-hidden />}>` |
| `#0f1c3a` | `app/(portal)/(public)/portal/login/page.tsx` | 12 | `'h-11 w-full rounded-[10px] border border-[rgba(180,186,210,0.6)] bg-white/70 pl-10 pr-3 text-[14px] text-[#0f1c3a] outline-none transition-â€¦` |
| `#9aa3b8` | `app/(portal)/(public)/portal/login/page.tsx` | 12 | `'h-11 w-full rounded-[10px] border border-[rgba(180,186,210,0.6)] bg-white/70 pl-10 pr-3 text-[14px] text-[#0f1c3a] outline-none transition-â€¦` |
| `#00A99D` | `app/(portal)/(public)/portal/login/page.tsx` | 12 | `'h-11 w-full rounded-[10px] border border-[rgba(180,186,210,0.6)] bg-white/70 pl-10 pr-3 text-[14px] text-[#0f1c3a] outline-none transition-â€¦` |
| `#00A99D` | `app/(portal)/(public)/portal/login/page.tsx` | 16 | `<span className="mb-3 inline-flex rounded-full border border-[#00A99D]/20 bg-[#00A99D]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#00A99â€¦` |
| `#00A99D` | `app/(portal)/(public)/portal/login/page.tsx` | 16 | `<span className="mb-3 inline-flex rounded-full border border-[#00A99D]/20 bg-[#00A99D]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#00A99â€¦` |
| `#00A99D` | `app/(portal)/(public)/portal/login/page.tsx` | 16 | `<span className="mb-3 inline-flex rounded-full border border-[#00A99D]/20 bg-[#00A99D]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#00A99â€¦` |
| `#0f1c3a` | `app/(portal)/(public)/portal/login/page.tsx` | 74 | `<h2 className="text-[22px] font-bold leading-tight text-[#0f1c3a]">Fund Manager Portal</h2>` |
| `#6b7494` | `app/(portal)/(public)/portal/login/page.tsx` | 75 | `<p className="mt-1.5 text-[13px] text-[#6b7494]">Sign in to your NexCap account</p>` |
| `#8690a8` | `app/(portal)/(public)/portal/login/page.tsx` | 88 | `<label htmlFor="portal-login-email" className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wide text-[#8690a8]">` |
| `#8690a8` | `app/(portal)/(public)/portal/login/page.tsx` | 107 | `<label htmlFor="portal-login-password" className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wide text-[#8690a8]">` |
| `#00A99D` | `app/(portal)/(public)/portal/login/page.tsx` | 127 | `<Link href="/portal/forgot-password" className="text-[12.5px] font-medium hover:underline" style={{ color: '#00A99D' }}>` |
| `#6b7494` | `app/(portal)/(public)/portal/login/page.tsx` | 142 | `<p className="mt-4 text-center text-[12.5px] text-[#6b7494]">Don&apos;t have an account?</p>` |
| `#9aa3b8` | `app/(portal)/(public)/portal/login/page.tsx` | 143 | `<p className="mt-1 text-center text-[12.5px] text-[#9aa3b8]">Contact DBJ to request access</p>` |
| `#9aa3b8` | `app/(portal)/(public)/portal/login/page.tsx` | 145 | `<p className="mt-8 text-center text-[11.5px] leading-relaxed text-[#9aa3b8]">` |
| `#0B1F45` | `app/(portal)/(public)/portal/login/page.tsx` | 155 | `<Suspense fallback={<div className="h-screen w-screen bg-[#0B1F45]" aria-hidden />}>` |
| `#0f1c3a` | `app/(portal)/(public)/portal/register/page.tsx` | 12 | `'h-11 w-full rounded-[10px] border border-[rgba(180,186,210,0.6)] bg-white/70 pl-10 pr-3 text-[14px] text-[#0f1c3a] outline-none transition-â€¦` |
| `#9aa3b8` | `app/(portal)/(public)/portal/register/page.tsx` | 12 | `'h-11 w-full rounded-[10px] border border-[rgba(180,186,210,0.6)] bg-white/70 pl-10 pr-3 text-[14px] text-[#0f1c3a] outline-none transition-â€¦` |
| `#00A99D` | `app/(portal)/(public)/portal/register/page.tsx` | 12 | `'h-11 w-full rounded-[10px] border border-[rgba(180,186,210,0.6)] bg-white/70 pl-10 pr-3 text-[14px] text-[#0f1c3a] outline-none transition-â€¦` |
| `#f8f9fc` | `app/(portal)/(public)/portal/register/page.tsx` | 15 | `'h-11 w-full cursor-not-allowed rounded-[10px] border border-[rgba(180,186,210,0.6)] bg-[#f8f9fc] pl-10 pr-3 text-[14px] text-[#0f1c3a] outlâ€¦` |
| `#0f1c3a` | `app/(portal)/(public)/portal/register/page.tsx` | 15 | `'h-11 w-full cursor-not-allowed rounded-[10px] border border-[rgba(180,186,210,0.6)] bg-[#f8f9fc] pl-10 pr-3 text-[14px] text-[#0f1c3a] outlâ€¦` |
| `#00A99D` | `app/(portal)/(public)/portal/register/page.tsx` | 19 | `<span className="mb-3 inline-flex rounded-full border border-[#00A99D]/20 bg-[#00A99D]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#00A99â€¦` |
| `#00A99D` | `app/(portal)/(public)/portal/register/page.tsx` | 19 | `<span className="mb-3 inline-flex rounded-full border border-[#00A99D]/20 bg-[#00A99D]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#00A99â€¦` |
| `#00A99D` | `app/(portal)/(public)/portal/register/page.tsx` | 19 | `<span className="mb-3 inline-flex rounded-full border border-[#00A99D]/20 bg-[#00A99D]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#00A99â€¦` |
| `#6b7494` | `app/(portal)/(public)/portal/register/page.tsx` | 161 | `{loading ? <p className="text-[13px] text-[#6b7494]">Validating invitationâ€¦</p> : null}` |
| `#0f1c3a` | `app/(portal)/(public)/portal/register/page.tsx` | 165 | `<h2 className="text-[22px] font-bold leading-tight text-[#0f1c3a]">Create your account</h2>` |
| `#6b7494` | `app/(portal)/(public)/portal/register/page.tsx` | 166 | `<p className="mt-1.5 text-[13px] text-[#6b7494]">{subtitle}</p>` |
| `#00A99D` | `app/(portal)/(public)/portal/register/page.tsx` | 171 | `className="inline-flex h-[46px] w-full items-center justify-center rounded-[11px] bg-[#00A99D] px-4 text-[14.5px] font-semibold text-white sâ€¦` |
| `#9aa3b8` | `app/(portal)/(public)/portal/register/page.tsx` | 176 | `<p className="mt-8 text-center text-[11.5px] leading-relaxed text-[#9aa3b8]">` |
| `#0f1c3a` | `app/(portal)/(public)/portal/register/page.tsx` | 184 | `<h2 className="text-[22px] font-bold leading-tight text-[#0f1c3a]">Create your account</h2>` |
| `#6b7494` | `app/(portal)/(public)/portal/register/page.tsx` | 185 | `<p className="mt-1.5 text-[13px] text-[#6b7494]">{subtitle}</p>` |
| `#00A99D` | `app/(portal)/(public)/portal/register/page.tsx` | 188 | `<Link href="/portal/login" className="text-[12.5px] font-medium text-[#00A99D] hover:underline">` |
| `#9aa3b8` | `app/(portal)/(public)/portal/register/page.tsx` | 192 | `<p className="mt-8 text-center text-[11.5px] leading-relaxed text-[#9aa3b8]">` |
| `#0f1c3a` | `app/(portal)/(public)/portal/register/page.tsx` | 200 | `<h2 className="text-[22px] font-bold leading-tight text-[#0f1c3a]">Create your account</h2>` |
| `#6b7494` | `app/(portal)/(public)/portal/register/page.tsx` | 201 | `<p className="mt-1.5 text-[13px] text-[#6b7494]">{subtitle}</p>` |
| `#8690a8` | `app/(portal)/(public)/portal/register/page.tsx` | 206 | `<p className="text-[11.5px] font-medium uppercase tracking-wide text-[#8690a8]">Invited to join</p>` |
| `#0f1c3a` | `app/(portal)/(public)/portal/register/page.tsx` | 207 | `<p className="mt-1 text-[14px] font-medium text-[#0f1c3a]">{prefillFund.trim()}</p>` |
| `#8690a8` | `app/(portal)/(public)/portal/register/page.tsx` | 221 | `<label htmlFor="portal-reg-name" className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wide text-[#8690a8]">` |
| `#8690a8` | `app/(portal)/(public)/portal/register/page.tsx` | 238 | `<label htmlFor="portal-reg-email" className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wide text-[#8690a8]">` |
| `#8690a8` | `app/(portal)/(public)/portal/register/page.tsx` | 255 | `<label htmlFor="portal-reg-password" className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wide text-[#8690a8]">` |
| `#00A99D` | `app/(portal)/(public)/portal/register/page.tsx` | 273 | `<div key={i} className={h-1 flex-1 rounded-full ${strengthBars > i ? 'bg-[#00A99D]' : 'bg-[rgba(180,186,210,0.5)]'}} />` |
| `#8690a8` | `app/(portal)/(public)/portal/register/page.tsx` | 276 | `<p className="text-[11px] text-[#8690a8]">{strengthLabel(strengthBars)}</p>` |
| `#8690a8` | `app/(portal)/(public)/portal/register/page.tsx` | 280 | `<label htmlFor="portal-reg-confirm" className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wide text-[#8690a8]">` |
| `#6b7494` | `app/(portal)/(public)/portal/register/page.tsx` | 305 | `<p className="mt-6 text-center text-[12.5px] text-[#6b7494]">` |
| `#00A99D` | `app/(portal)/(public)/portal/register/page.tsx` | 307 | `<Link href="/portal/login" className="font-medium text-[#00A99D] hover:underline">` |
| `#9aa3b8` | `app/(portal)/(public)/portal/register/page.tsx` | 311 | `<p className="mt-8 text-center text-[11.5px] leading-relaxed text-[#9aa3b8]">` |
| `#0B1F45` | `app/(portal)/(public)/portal/register/page.tsx` | 323 | `<Suspense fallback={<div className="h-screen w-screen bg-[#0B1F45]" aria-hidden />}>` |
| `#0f1c3a` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 12 | `'h-11 w-full rounded-[10px] border border-[rgba(180,186,210,0.6)] bg-white/70 pl-10 pr-3 text-[14px] text-[#0f1c3a] outline-none transition-â€¦` |
| `#9aa3b8` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 12 | `'h-11 w-full rounded-[10px] border border-[rgba(180,186,210,0.6)] bg-white/70 pl-10 pr-3 text-[14px] text-[#0f1c3a] outline-none transition-â€¦` |
| `#00A99D` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 12 | `'h-11 w-full rounded-[10px] border border-[rgba(180,186,210,0.6)] bg-white/70 pl-10 pr-3 text-[14px] text-[#0f1c3a] outline-none transition-â€¦` |
| `#00A99D` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 16 | `<span className="mb-3 inline-flex rounded-full border border-[#00A99D]/20 bg-[#00A99D]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#00A99â€¦` |
| `#00A99D` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 16 | `<span className="mb-3 inline-flex rounded-full border border-[#00A99D]/20 bg-[#00A99D]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#00A99â€¦` |
| `#00A99D` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 16 | `<span className="mb-3 inline-flex rounded-full border border-[#00A99D]/20 bg-[#00A99D]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#00A99â€¦` |
| `#00A99D` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 40 | `<svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden className="text-[#00A99D]">` |
| `#0f1c3a` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 100 | `<h2 className="text-[22px] font-bold leading-tight text-[#0f1c3a]">Set new password</h2>` |
| `#6b7494` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 101 | `<p className="mt-1.5 text-[13px] text-[#6b7494]">Choose a strong password for your account</p>` |
| `#00A99D` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 103 | `<Link href="/portal/login" className="mt-6 inline-block text-[14px] font-medium text-[#00A99D] hover:underline">` |
| `#9aa3b8` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 106 | `<p className="mt-8 text-center text-[11.5px] leading-relaxed text-[#9aa3b8]">` |
| `#0f1c3a` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 118 | `<h2 className="text-[22px] font-bold leading-tight text-[#0f1c3a]">Set new password</h2>` |
| `#6b7494` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 119 | `<p className="mt-1.5 text-[13px] text-[#6b7494]">Choose a strong password for your account</p>` |
| `#0f1c3a` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 124 | `<p className="mt-4 text-[16px] font-semibold text-[#0f1c3a]">Password updated</p>` |
| `#6b7494` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 125 | `<p className="mt-2 text-[13px] leading-relaxed text-[#6b7494]">You can now sign in with your new password.</p>` |
| `#8690a8` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 140 | `<label htmlFor="portal-reset-password" className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wide text-[#8690a8]">` |
| `#00A99D` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 158 | `<div key={i} className={h-1 flex-1 rounded-full ${bars > i ? 'bg-[#00A99D]' : 'bg-[rgba(180,186,210,0.5)]'}} />` |
| `#8690a8` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 161 | `<p className="text-[11px] text-[#8690a8]">{strengthLabel(bars)}</p>` |
| `#8690a8` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 165 | `<label htmlFor="portal-reset-confirm" className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wide text-[#8690a8]">` |
| `#9aa3b8` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 192 | `<p className="mt-8 text-center text-[11.5px] leading-relaxed text-[#9aa3b8]">` |
| `#0B1F45` | `app/(portal)/(public)/portal/reset-password/page.tsx` | 202 | `<Suspense fallback={<div className="h-screen w-screen bg-[#0B1F45]" aria-hidden />}>` |
| `#444` | `app/api/portfolio/funds/[id]/assessments/[assessmentId]/pctu-report/route.ts` | 69 | `const footerTemplate = <div style="width:100%;font-size:9px;color:#444;text-align:center;font-family:Georgia,serif;padding:0 12px;"><span câ€¦` |
| `#0b1f45` | `app/globals.css` | 7 | `--navy: #0b1f45;` |
| `#c8973a` | `app/globals.css` | 8 | `--gold: #c8973a;` |
| `#0f8a6e` | `app/globals.css` | 9 | `--teal: #0f8a6e;` |
| `#f3f4f6` | `app/globals.css` | 10 | `--shell-bg: #f3f4f6;` |
| `#ffffff` | `app/globals.css` | 11 | `--shell-card: #ffffff;` |
| `#e5e7eb` | `app/globals.css` | 12 | `--shell-border: #e5e7eb;` |
| `#f9fafb` | `app/globals.css` | 14 | `--color-background-secondary: #f9fafb;` |
| `#6b7280` | `app/globals.css` | 19 | `--color-text-secondary: #6b7280;` |
| `#9ca3af` | `app/globals.css` | 20 | `--color-text-tertiary: #9ca3af;` |
| `#111827` | `app/globals.css` | 24 | `@apply bg-shell-bg font-sans text-[#111827] antialiased;` |
| `#374151` | `app/globals.css` | 34 | `@apply w-full border-collapse text-left text-[13px] font-normal text-[#374151];` |
| `#f8f9fa` | `app/globals.css` | 38 | `@apply sticky top-0 z-10 bg-[#f8f9fa];` |
| `#e5e7eb` | `app/globals.css` | 42 | `@apply border-b border-[#e5e7eb];` |
| `#6b7280` | `app/globals.css` | 46 | `@apply px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6b7280];` |
| `#f1f3f5` | `app/globals.css` | 50 | `@apply h-12 border-b border-[#f1f3f5] px-4 align-middle;` |
| `#F8F9FF` | `app/globals.css` | 58 | `@apply cursor-pointer bg-[#F8F9FF] transition-colors;` |
| `#e5e7eb` | `app/globals.css` | 67 | `@apply w-full rounded-lg border border-[#e5e7eb] bg-white;` |
| `#e5e7eb` | `app/globals.css` | 71 | `@apply border-b border-[#e5e7eb] px-4 py-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6b7280];` |
| `#6b7280` | `app/globals.css` | 71 | `@apply border-b border-[#e5e7eb] px-4 py-4 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#6b7280];` |
| `#6b7280` | `app/globals.css` | 75 | `@apply text-[11px] font-semibold uppercase tracking-[0.08em] text-[#6b7280];` |
| `#F3F4F6` | `app/invite/[token]/page.tsx` | 24 | `<div className="flex min-h-screen flex-col items-center justify-center bg-[#F3F4F6] px-6">` |
| `#0B1F45` | `app/invite/[token]/page.tsx` | 25 | `<p className="text-lg font-medium text-[#0B1F45]">Invalid invitation link</p>` |
| `#0F8A6E` | `app/invite/[token]/page.tsx` | 26 | `<Link href="/login" className="mt-4 text-sm text-[#0F8A6E] underline">` |
| `#F3F4F6` | `app/invite/[token]/page.tsx` | 47 | `<div className="flex min-h-screen flex-col items-center justify-center bg-[#F3F4F6] px-6 text-center">` |
| `#0B1F45` | `app/invite/[token]/page.tsx` | 48 | `<p className="text-lg font-medium text-[#0B1F45]">This invitation has been revoked</p>` |
| `#0F8A6E` | `app/invite/[token]/page.tsx` | 50 | `<Link href="/login" className="mt-6 text-sm text-[#0F8A6E] underline">` |
| `#F3F4F6` | `app/invite/[token]/page.tsx` | 60 | `<div className="flex min-h-screen flex-col items-center justify-center bg-[#F3F4F6] px-6 text-center">` |
| `#0B1F45` | `app/invite/[token]/page.tsx` | 61 | `<p className="text-lg font-medium text-[#0B1F45]">This invitation has expired</p>` |
| `#0F8A6E` | `app/invite/[token]/page.tsx` | 63 | `<Link href="/login" className="mt-6 text-sm text-[#0F8A6E] underline">` |
| `#d4620a` | `app/login/page.tsx` | 13 | `accent: '#d4620a',` |
| `#7a2e06` | `app/login/page.tsx` | 14 | `btn: 'linear-gradient(135deg, #7a2e06, #c45417)',` |
| `#c45417` | `app/login/page.tsx` | 14 | `btn: 'linear-gradient(135deg, #7a2e06, #c45417)',` |
| `#d4a882` | `app/login/page.tsx` | 15 | `fallback: '#d4a882',` |
| `#2a7a4a` | `app/login/page.tsx` | 19 | `accent: '#2a7a4a',` |
| `#0f4a2a` | `app/login/page.tsx` | 20 | `btn: 'linear-gradient(135deg, #0f4a2a, #1e7a44)',` |
| `#1e7a44` | `app/login/page.tsx` | 20 | `btn: 'linear-gradient(135deg, #0f4a2a, #1e7a44)',` |
| `#9bbfb0` | `app/login/page.tsx` | 21 | `fallback: '#9bbfb0',` |
| `#5b3fa8` | `app/login/page.tsx` | 25 | `accent: '#5b3fa8',` |
| `#2a1560` | `app/login/page.tsx` | 26 | `btn: 'linear-gradient(135deg, #2a1560, #5b3fa8)',` |
| `#5b3fa8` | `app/login/page.tsx` | 26 | `btn: 'linear-gradient(135deg, #2a1560, #5b3fa8)',` |
| `#a89cc8` | `app/login/page.tsx` | 27 | `fallback: '#a89cc8',` |
| `#c4365a` | `app/login/page.tsx` | 31 | `accent: '#c4365a',` |
| `#7a1830` | `app/login/page.tsx` | 32 | `btn: 'linear-gradient(135deg, #7a1830, #c4365a)',` |
| `#c4365a` | `app/login/page.tsx` | 32 | `btn: 'linear-gradient(135deg, #7a1830, #c4365a)',` |
| `#d4a0a8` | `app/login/page.tsx` | 33 | `fallback: '#d4a0a8',` |
| `#2e5ec4` | `app/login/page.tsx` | 37 | `accent: '#2e5ec4',` |
| `#0f2a7a` | `app/login/page.tsx` | 38 | `btn: 'linear-gradient(135deg, #0f2a7a, #2e5ec4)',` |
| `#2e5ec4` | `app/login/page.tsx` | 38 | `btn: 'linear-gradient(135deg, #0f2a7a, #2e5ec4)',` |
| `#9aaed4` | `app/login/page.tsx` | 39 | `fallback: '#9aaed4',` |
| `#b57a10` | `app/login/page.tsx` | 43 | `accent: '#b57a10',` |
| `#6a4206` | `app/login/page.tsx` | 44 | `btn: 'linear-gradient(135deg, #6a4206, #b57a10)',` |
| `#b57a10` | `app/login/page.tsx` | 44 | `btn: 'linear-gradient(135deg, #6a4206, #b57a10)',` |
| `#d4c090` | `app/login/page.tsx` | 45 | `fallback: '#d4c090',` |
| `#0f1c3a` | `app/login/page.tsx` | 237 | `<h2 className="text-[22px] font-bold leading-tight text-[#0f1c3a]">Welcome back</h2>` |
| `#6b7494` | `app/login/page.tsx` | 238 | `<p className="mt-1.5 text-[13px] text-[#6b7494]">Sign in to your DBJ account</p>` |
| `#8690a8` | `app/login/page.tsx` | 271 | `className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wide text-[#8690a8]"` |
| `#9aa3b8` | `app/login/page.tsx` | 277 | `className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa3b8]"` |
| `#0f1c3a` | `app/login/page.tsx` | 287 | `className="h-11 w-full rounded-[10px] border border-[rgba(180,186,210,0.6)] bg-white/70 pl-10 pr-3 text-[14px] text-[#0f1c3a] outline-none tâ€¦` |
| `#9aa3b8` | `app/login/page.tsx` | 287 | `className="h-11 w-full rounded-[10px] border border-[rgba(180,186,210,0.6)] bg-white/70 pl-10 pr-3 text-[14px] text-[#0f1c3a] outline-none tâ€¦` |
| `#8690a8` | `app/login/page.tsx` | 301 | `className="mb-1.5 block text-[11.5px] font-medium uppercase tracking-wide text-[#8690a8]"` |
| `#9aa3b8` | `app/login/page.tsx` | 307 | `className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa3b8]"` |
| `#0f1c3a` | `app/login/page.tsx` | 317 | `className="h-11 w-full rounded-[10px] border border-[rgba(180,186,210,0.6)] bg-white/70 pl-10 pr-3 text-[14px] text-[#0f1c3a] outline-none tâ€¦` |
| `#9aa3b8` | `app/login/page.tsx` | 317 | `className="h-11 w-full rounded-[10px] border border-[rgba(180,186,210,0.6)] bg-white/70 pl-10 pr-3 text-[14px] text-[#0f1c3a] outline-none tâ€¦` |
| `#6b7494` | `app/login/page.tsx` | 329 | `<label className="flex cursor-pointer select-none items-center gap-2 text-[12.5px] text-[#6b7494]">` |
| `#0B1F45` | `app/login/page.tsx` | 334 | `className="h-3.5 w-3.5 rounded border-[rgba(180,186,210,0.8)] text-[#0B1F45] focus:ring-[color:var(--login-accent)]"` |
| `#9aa3b8` | `app/login/page.tsx` | 364 | `<span className="whitespace-nowrap text-[11.5px] font-medium uppercase tracking-wide text-[#9aa3b8]">` |
| `#0f1c3a` | `app/login/page.tsx` | 373 | `className="flex h-[42px] w-full items-center justify-center gap-2.5 rounded-[10px] border border-[rgba(180,186,210,0.5)] bg-white/65 text-[1â€¦` |
| `#f25022` | `app/login/page.tsx` | 376 | `<rect x="1" y="1" width="9" height="9" fill="#f25022" />` |
| `#7fba00` | `app/login/page.tsx` | 377 | `<rect x="11" y="1" width="9" height="9" fill="#7fba00" />` |
| `#00a4ef` | `app/login/page.tsx` | 378 | `<rect x="1" y="11" width="9" height="9" fill="#00a4ef" />` |
| `#ffb900` | `app/login/page.tsx` | 379 | `<rect x="11" y="11" width="9" height="9" fill="#ffb900" />` |
| `#9aa3b8` | `app/login/page.tsx` | 384 | `<p className="mt-8 text-center text-[11.5px] leading-relaxed text-[#9aa3b8]">` |
| `#0B1F45` | `app/login/page.tsx` | 395 | `<Suspense fallback={<div className="h-screen w-screen bg-[#0B1F45]" aria-hidden />}>` |
| `#F3F4F6` | `app/unauthorized/page.tsx` | 9 | `<div className="flex min-h-screen flex-col items-center justify-center bg-[#F3F4F6] px-6 py-16">` |
| `#0B1F45` | `app/unauthorized/page.tsx` | 11 | `<h1 className="mt-6 text-2xl font-bold text-[#0B1F45]">Access Restricted</h1>` |
| `#0B1F45` | `app/unauthorized/page.tsx` | 17 | `<Button asChild className="bg-[#0B1F45] text-white hover:bg-[#0B1F45]/90">` |
| `#0B1F45` | `app/unauthorized/page.tsx` | 17 | `<Button asChild className="bg-[#0B1F45] text-white hover:bg-[#0B1F45]/90">` |
| `#0B1F45` | `components/applications/ApplicationPipelineHeader.tsx` | 35 | `<h2 className="text-[28px] font-bold leading-tight text-[#0B1F45]">{fundName}</h2>` |
| `#0B1F45` | `components/applications/ApplicationPipelineHeader.tsx` | 58 | `current && 'border-[#0B1F45] bg-[#0B1F45] text-white',` |
| `#0B1F45` | `components/applications/ApplicationPipelineHeader.tsx` | 58 | `current && 'border-[#0B1F45] bg-[#0B1F45] text-white',` |
| `#C8973A` | `components/applications/ApplicationPipelineHeader.tsx` | 97 | `? 'border-[#C8973A] font-semibold text-[#0B1F45]'` |
| `#0B1F45` | `components/applications/ApplicationPipelineHeader.tsx` | 97 | `? 'border-[#C8973A] font-semibold text-[#0B1F45]'` |
| `#0F8A6E` | `components/applications/ApplicationPipelineWorkspace.tsx` | 299 | `className="mt-1 inline-block text-[#0F8A6E] font-medium hover:underline"` |
| `#0F8A6E` | `components/applications/AssessmentTab.tsx` | 25 | `if (score >= 85) return { color: 'text-[#0F8A6E]', label: 'Strong â€” Recommend Approve' };` |
| `#0B1F45` | `components/applications/AssessmentTab.tsx` | 70 | `<div className="bg-[#0B1F45] px-6 py-5">` |
| `#0B1F45` | `components/applications/AssessmentTab.tsx` | 259 | `<span className="w-12 shrink-0 rounded-md bg-[#0B1F45]/8 py-1 text-center text-xs font-bold text-[#0B1F45]">` |
| `#0B1F45` | `components/applications/AssessmentTab.tsx` | 259 | `<span className="w-12 shrink-0 rounded-md bg-[#0B1F45]/8 py-1 text-center text-xs font-bold text-[#0B1F45]">` |
| `#0B1F45` | `components/applications/AssessmentTab.tsx` | 285 | `className="inline-flex items-center gap-2 rounded-xl bg-[#0B1F45] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#â€¦` |
| `#162d5e` | `components/applications/AssessmentTab.tsx` | 285 | `className="inline-flex items-center gap-2 rounded-xl bg-[#0B1F45] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#â€¦` |
| `#0F8A6E` | `components/applications/AssessmentTab.tsx` | 323 | `!scored \|\| max === 0 ? 'bg-gray-200' : raw / max < 0.6 ? 'bg-amber-400' : 'bg-[#0F8A6E]';` |
| `#0B1F45` | `components/applications/AssessmentTab.tsx` | 326 | `<span className="w-12 shrink-0 rounded-md bg-[#0B1F45]/8 py-1 text-center text-xs font-bold text-[#0B1F45]">` |
| `#0B1F45` | `components/applications/AssessmentTab.tsx` | 326 | `<span className="w-12 shrink-0 rounded-md bg-[#0B1F45]/8 py-1 text-center text-xs font-bold text-[#0B1F45]">` |
| `#0F8A6E` | `components/applications/AssessmentTab.tsx` | 347 | `!scoreValid ? 'bg-gray-200' : scoreNum >= PASS_THRESHOLD ? 'bg-[#0F8A6E]' : 'bg-red-400';` |
| `#0B1F45` | `components/applications/AssessmentTab.tsx` | 358 | `<p className={cn('text-4xl font-bold tabular-nums', completed && band ? band.color : 'text-[#0B1F45]')}>` |
| `#0F8A6E` | `components/applications/AssessmentTab.tsx` | 416 | `className="inline-flex items-center gap-2 rounded-xl bg-[#0F8A6E] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#â€¦` |
| `#0c755d` | `components/applications/AssessmentTab.tsx` | 416 | `className="inline-flex items-center gap-2 rounded-xl bg-[#0F8A6E] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#â€¦` |
| `#0B1F45` | `components/applications/AssessmentTab.tsx` | 431 | `<h4 className="text-sm font-semibold text-[#0B1F45]">Final Decision</h4>` |
| `#0F8A6E` | `components/applications/AssessmentTab.tsx` | 434 | `{success ? <p className="mb-3 text-sm text-[#0F8A6E]">{success}</p> : null}` |
| `#0F8A6E` | `components/applications/AssessmentTab.tsx` | 511 | `className="w-full rounded-xl bg-[#0F8A6E] text-white hover:bg-[#0c755d] sm:w-auto"` |
| `#0c755d` | `components/applications/AssessmentTab.tsx` | 511 | `className="w-full rounded-xl bg-[#0F8A6E] text-white hover:bg-[#0c755d] sm:w-auto"` |
| `#0F8A6E` | `components/applications/AssessmentTab.tsx` | 531 | `className="rounded-xl bg-[#0F8A6E] text-white hover:bg-[#0c755d]"` |
| `#0c755d` | `components/applications/AssessmentTab.tsx` | 531 | `className="rounded-xl bg-[#0F8A6E] text-white hover:bg-[#0c755d]"` |
| `#0F8A6E` | `components/applications/AssessmentTab.tsx` | 622 | `<CheckCircle2 className="h-6 w-6 shrink-0 text-[#0F8A6E]" aria-hidden />` |
| `#0B1F45` | `components/applications/AssessmentTab.tsx` | 624 | `<p className="font-semibold text-[#0B1F45]">Application Approved</p>` |
| `#0B1F45` | `components/applications/DdDecisionTab.tsx` | 313 | `<Loader2 className="h-5 w-5 animate-spin text-[#0B1F45]" aria-hidden />` |
| `#0B1F45` | `components/applications/DdDecisionTab.tsx` | 326 | `<p className="mt-1 text-base font-semibold text-[#0B1F45]">{decisionDisplayLabel(existing.decision)}</p>` |
| `#0B1F45` | `components/applications/DdDecisionTab.tsx` | 338 | `className="mt-2 inline-flex text-sm font-semibold text-[#0B1F45] underline decoration-teal-600 underline-offset-2 hover:text-teal-800"` |
| `#0B1F45` | `components/applications/DueDiligenceTab.tsx` | 87 | `className="mt-4 bg-[#0B1F45] text-white hover:bg-[#162d5e]"` |
| `#162d5e` | `components/applications/DueDiligenceTab.tsx` | 87 | `className="mt-4 bg-[#0B1F45] text-white hover:bg-[#162d5e]"` |
| `#0B1F45` | `components/applications/DueDiligenceTab.tsx` | 115 | `<h3 className="text-base font-semibold text-[#0B1F45]">DD Questionnaire</h3>` |
| `#0F8A6E` | `components/applications/DueDiligenceTab.tsx` | 137 | `<div className="h-2 rounded-full bg-[#0F8A6E] transition-all" style={{ width: ${pct}% }} />` |
| `#0B1F45` | `components/applications/DueDiligenceTab.tsx` | 143 | `<Button asChild className="rounded-xl bg-[#0B1F45] px-6 py-3 text-sm font-semibold text-white hover:bg-[#162d5e]">` |
| `#162d5e` | `components/applications/DueDiligenceTab.tsx` | 143 | `<Button asChild className="rounded-xl bg-[#0B1F45] px-6 py-3 text-sm font-semibold text-white hover:bg-[#162d5e]">` |
| `#0F8A6E` | `components/applications/NegotiationTab.tsx` | 33 | `if (s === 'executed' \|\| s === 'signed') return 'bg-teal-50 text-[#0F8A6E] border border-teal-200';` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 295 | `<div className="rounded-xl bg-[#0B1F45] p-6 text-center text-white">` |
| `#C8973A` | `components/applications/NegotiationTab.tsx` | 296 | `<CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-[#C8973A]" aria-hidden />` |
| `#C8973A` | `components/applications/NegotiationTab.tsx` | 299 | `<p className="mt-3 text-lg font-semibold text-[#C8973A]">` |
| `#C8973A` | `components/applications/NegotiationTab.tsx` | 303 | `<Button asChild className="mt-6 rounded-xl bg-[#C8973A] px-5 py-2.5 text-white hover:bg-[#b5852f]">` |
| `#b5852f` | `components/applications/NegotiationTab.tsx` | 303 | `<Button asChild className="mt-6 rounded-xl bg-[#C8973A] px-5 py-2.5 text-white hover:bg-[#b5852f]">` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 316 | `<h3 className="text-base font-semibold text-[#0B1F45]">Contract &amp; Negotiation</h3>` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 322 | `<Button className="mt-6 bg-[#0B1F45] hover:bg-[#162d5e]" onClick={beginContract} disabled={loading}>` |
| `#162d5e` | `components/applications/NegotiationTab.tsx` | 322 | `<Button className="mt-6 bg-[#0B1F45] hover:bg-[#162d5e]" onClick={beginContract} disabled={loading}>` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 338 | `<div className="rounded-xl bg-[#0B1F45] p-5">` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 359 | `<span className="font-medium text-[#0B1F45]">Commitment amount *</span>` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 363 | `<span className="font-medium text-[#0B1F45]">Currency</span>` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 376 | `<span className="font-medium text-[#0B1F45]">DBJ pro-rata %</span>` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 380 | `<span className="font-medium text-[#0B1F45]">Management fee %</span>` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 384 | `<span className="font-medium text-[#0B1F45]">Carried interest %</span>` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 388 | `<span className="font-medium text-[#0B1F45]">Hurdle rate %</span>` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 392 | `<span className="font-medium text-[#0B1F45]">Fund life (years)</span>` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 396 | `<span className="font-medium text-[#0B1F45]">Investment period (years)</span>` |
| `#0F8A6E` | `components/applications/NegotiationTab.tsx` | 401 | `<Button className="mt-4 bg-[#0F8A6E] hover:bg-[#0c6e57]" onClick={() => void saveTerms()} disabled={loading}>` |
| `#0c6e57` | `components/applications/NegotiationTab.tsx` | 401 | `<Button className="mt-4 bg-[#0F8A6E] hover:bg-[#0c6e57]" onClick={() => void saveTerms()} disabled={loading}>` |
| `#0F8A6E` | `components/applications/NegotiationTab.tsx` | 425 | `<button type="button" className="text-[#0F8A6E] text-xs font-medium hover:underline" onClick={() => setEditingIdx(idx)}>` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 470 | `<span className="font-medium text-[#0B1F45]">Legal reviewer notes</span>` |
| `#0F8A6E` | `components/applications/NegotiationTab.tsx` | 479 | `<Button className="mt-3 bg-[#0F8A6E] hover:bg-[#0c6e57]" onClick={() => void completeLegalReview()} disabled={loading}>` |
| `#0c6e57` | `components/applications/NegotiationTab.tsx` | 479 | `<Button className="mt-3 bg-[#0F8A6E] hover:bg-[#0c6e57]" onClick={() => void completeLegalReview()} disabled={loading}>` |
| `#0F8A6E` | `components/applications/NegotiationTab.tsx` | 490 | `{uploading ? <Loader2 className="h-6 w-6 animate-spin text-[#0F8A6E]" /> : 'Choose PDF'}` |
| `#0F8A6E` | `components/applications/NegotiationTab.tsx` | 496 | `<a href={contractDownloadUrl} className="text-[#0F8A6E] underline-offset-2 hover:underline" target="_blank" rel="noreferrer">` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 503 | `<p className="text-sm font-medium text-[#0B1F45]">Or use Adobe Sign</p>` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 514 | `<Button className="bg-[#0B1F45]" onClick={() => void patchContract({ status: 'under_negotiation' })} disabled={loading}>` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 519 | `<Button className="bg-[#0B1F45]" onClick={() => void startLegalReview()} disabled={loading}>` |
| `#0F8A6E` | `components/applications/NegotiationTab.tsx` | 524 | `<Button className="bg-[#0F8A6E]" onClick={() => void completeLegalReview()} disabled={loading}>` |
| `#0F8A6E` | `components/applications/NegotiationTab.tsx` | 542 | `<Button className="bg-[#0F8A6E]" onClick={() => void markSigned()} disabled={loading}>` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 548 | `<Button className="bg-[#0B1F45]" onClick={() => void executeContract()} disabled={loading}>` |
| `#0F8A6E` | `components/applications/NegotiationTab.tsx` | 558 | `<CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#0F8A6E]" aria-hidden />` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 569 | `<span className="font-medium text-[#0B1F45]">Fund year end month *</span>` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 596 | `<legend className="font-medium text-[#0B1F45]">Listed on stock exchange?</legend>` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 609 | `<span className="font-medium text-[#0B1F45]">Quarterly report due (days after quarter end)</span>` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 613 | `<span className="font-medium text-[#0B1F45]">Audit report due (days after year end)</span>` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 617 | `<span className="font-medium text-[#0B1F45]">Fund representative name</span>` |
| `#0B1F45` | `components/applications/NegotiationTab.tsx` | 622 | `<Button className="mt-5 rounded-xl bg-[#0B1F45] px-6 py-3 text-sm font-semibold text-white hover:bg-[#162d5e]" onClick={issueCommitment} disâ€¦` |
| `#162d5e` | `components/applications/NegotiationTab.tsx` | 622 | `<Button className="mt-5 rounded-xl bg-[#0B1F45] px-6 py-3 text-sm font-semibold text-white hover:bg-[#162d5e]" onClick={issueCommitment} disâ€¦` |
| `#0F8A6E` | `components/applications/NegotiationTab.tsx` | 648 | `<Button size="sm" className="bg-[#0F8A6E]" type="button" onClick={() => onSave({ ...initial, round, date, notes })}>` |
| `#0B1F45` | `components/applications/OverviewTab.tsx` | 55 | `row.state === 'current' && 'animate-pulse bg-[#0B1F45] text-white',` |
| `#0B1F45` | `components/applications/OverviewTab.tsx` | 62 | `<p className="text-sm font-medium text-[#0B1F45]">{row.label}</p>` |
| `#0B1F45` | `components/applications/OverviewTab.tsx` | 77 | `<dd className="text-right font-medium text-[#0B1F45]">{value}</dd>` |
| `#0B1F45` | `components/applications/PanelScoringTab.tsx` | 442 | `<h3 className="text-base font-semibold text-[#0B1F45]">Panel Evaluation Scoring</h3>` |
| `#0F8A6E` | `components/applications/PanelScoringTab.tsx` | 447 | `<div className="h-full rounded-full bg-[#0F8A6E] transition-all" style={{ width: ${progressPct}% }} />` |
| `#0B1F45` | `components/applications/PanelScoringTab.tsx` | 463 | `className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0B1F45] text-sm font-semibold text-white"` |
| `#0B1F45` | `components/applications/PanelScoringTab.tsx` | 471 | `<p className="truncate text-sm font-semibold text-[#0B1F45]">{titleCaseMemberName(m.member_name)}</p>` |
| `#0B1F45` | `components/applications/PanelScoringTab.tsx` | 478 | `m.member_type === 'voting' ? 'bg-[#0B1F45]/10 text-[#0B1F45]' : 'bg-gray-100 text-gray-500',` |
| `#0B1F45` | `components/applications/PanelScoringTab.tsx` | 478 | `m.member_type === 'voting' ? 'bg-[#0B1F45]/10 text-[#0B1F45]' : 'bg-gray-100 text-gray-500',` |
| `#0B1F45` | `components/applications/PanelScoringTab.tsx` | 492 | `: 'bg-[#0B1F45] text-white hover:bg-[#162d5e]',` |
| `#162d5e` | `components/applications/PanelScoringTab.tsx` | 492 | `: 'bg-[#0B1F45] text-white hover:bg-[#162d5e]',` |
| `#0B1F45` | `components/applications/PanelScoringTab.tsx` | 513 | `<h3 className="font-semibold text-[#0B1F45]">Evaluation Summary</h3>` |
| `#0B1F45` | `components/applications/PanelScoringTab.tsx` | 534 | `<td className="px-4 py-2 text-[#0B1F45]">{row.label}</td>` |
| `#0B1F45` | `components/applications/PanelScoringTab.tsx` | 543 | `<td className="px-4 py-2 font-semibold text-[#0B1F45]">DD Vote</td>` |
| `#0B1F45` | `components/applications/PanelScoringTab.tsx` | 559 | `<span className="font-bold text-[#0B1F45]">{voteTotals.full_dd}</span>` |
| `#0B1F45` | `components/applications/PanelScoringTab.tsx` | 563 | `<span className="font-bold text-[#0B1F45]">{voteTotals.conditional_dd}</span>` |
| `#0B1F45` | `components/applications/PanelScoringTab.tsx` | 567 | `<span className="font-bold text-[#0B1F45]">{voteTotals.no_dd}</span>` |
| `#0B1F45` | `components/applications/PanelScoringTab.tsx` | 579 | `<h3 className="text-lg font-semibold text-[#0B1F45]">Scoring â€” {openMember.member_name}</h3>` |
| `#0F8A6E` | `components/applications/PanelScoringTab.tsx` | 582 | `<Legend tone="bg-[#0F8A6E] text-white" label="S Â· Strong" />` |
| `#0F8A6E` | `components/applications/PanelScoringTab.tsx` | 605 | `? 'bg-[#0F8A6E] text-white'` |
| `#0B1F45` | `components/applications/PanelScoringTab.tsx` | 774 | `<p className="text-sm font-semibold text-[#0B1F45]">Conclusive Opinion</p>` |
| `#0B1F45` | `components/applications/PanelScoringTab.tsx` | 829 | `<Button type="button" className="bg-[#0B1F45] text-white hover:bg-[#162d5e]" disabled={busy} onClick={() => void save()}>` |
| `#162d5e` | `components/applications/PanelScoringTab.tsx` | 829 | `<Button type="button" className="bg-[#0B1F45] text-white hover:bg-[#162d5e]" disabled={busy} onClick={() => void save()}>` |
| `#0B1F45` | `components/applications/PrequalificationSummaryTab.tsx` | 50 | `<Button asChild className="mt-4 bg-[#0B1F45] text-white hover:bg-[#162d5e]">` |
| `#162d5e` | `components/applications/PrequalificationSummaryTab.tsx` | 50 | `<Button asChild className="mt-4 bg-[#0B1F45] text-white hover:bg-[#162d5e]">` |
| `#0B1F45` | `components/applications/PrequalificationSummaryTab.tsx` | 91 | `<p className="font-semibold text-[#0B1F45]">AI Summary</p>` |
| `#0B1F45` | `components/applications/PrequalificationSummaryTab.tsx` | 112 | `<p className="font-medium text-[#0B1F45]">{value}</p>` |
| `#0B1F45` | `components/applications/PrequalificationSummaryTab.tsx` | 128 | `<div className="border-b border-gray-100 px-4 py-3 text-sm font-semibold text-[#0B1F45]">{title}</div>` |
| `#C8973A` | `components/applications/PresentationTab.tsx` | 290 | `<span className="ml-1 inline-flex shrink-0 items-center rounded-full bg-[#C8973A]/15 px-1.5 py-0.5 text-[10px] font-medium text-[#C8973A]">` |
| `#C8973A` | `components/applications/PresentationTab.tsx` | 290 | `<span className="ml-1 inline-flex shrink-0 items-center rounded-full bg-[#C8973A]/15 px-1.5 py-0.5 text-[10px] font-medium text-[#C8973A]">` |
| `#0B1F45` | `components/applications/PresentationTab.tsx` | 303 | `? 'border border-gray-200 bg-white font-semibold text-[#0B1F45] shadow-sm'` |
| `#0B1F45` | `components/applications/PresentationTab.tsx` | 308 | `className={cn('h-4 w-4 shrink-0', presentationType === 'in_person' ? 'text-[#0B1F45]' : 'text-gray-400')}` |
| `#0F8A6E` | `components/applications/PresentationTab.tsx` | 313 | `<CheckCircle2 className="h-4 w-4 shrink-0 text-[#0F8A6E]" aria-hidden />` |
| `#0B1F45` | `components/applications/PresentationTab.tsx` | 429 | `<h3 className="text-sm font-semibold text-[#0B1F45]">Schedule Presentation</h3>` |
| `#0B1F45` | `components/applications/PresentationTab.tsx` | 432 | `<Button type="button" className="bg-[#0B1F45] text-white hover:bg-[#162d5e]" disabled={!scheduledDate \|\| busy} onClick={submitSchedule}>` |
| `#162d5e` | `components/applications/PresentationTab.tsx` | 432 | `<Button type="button" className="bg-[#0B1F45] text-white hover:bg-[#162d5e]" disabled={!scheduledDate \|\| busy} onClick={submitSchedule}>` |
| `#0F8A6E` | `components/applications/PresentationTab.tsx` | 442 | `<p className="text-sm font-semibold text-[#0F8A6E]">âœ“ Presentation Completed</p>` |
| `#0F8A6E` | `components/applications/PresentationTab.tsx` | 457 | `className="inline-flex w-fit rounded-lg bg-[#0F8A6E] px-3 py-2 text-sm font-medium text-white hover:bg-[#0c735d]"` |
| `#0c735d` | `components/applications/PresentationTab.tsx` | 457 | `className="inline-flex w-fit rounded-lg bg-[#0F8A6E] px-3 py-2 text-sm font-medium text-white hover:bg-[#0c735d]"` |
| `#0B1F45` | `components/applications/PresentationTab.tsx` | 464 | `<a href={row.teams_recording_url} className="font-medium text-[#0B1F45] underline" target="_blank" rel="noreferrer">` |
| `#0B1F45` | `components/applications/PresentationTab.tsx` | 479 | `<a className="font-medium text-[#0B1F45] underline" href={row.recording_url} target="_blank" rel="noreferrer">` |
| `#0B1F45` | `components/applications/PresentationTab.tsx` | 517 | `<p className="mb-3 text-sm font-semibold text-[#0B1F45]">Presentation Scheduled</p>` |
| `#0B1F45` | `components/applications/PresentationTab.tsx` | 538 | `className="bg-[#0B1F45] text-xs text-white hover:bg-[#162d5e]"` |
| `#162d5e` | `components/applications/PresentationTab.tsx` | 538 | `className="bg-[#0B1F45] text-xs text-white hover:bg-[#162d5e]"` |
| `#0B1F45` | `components/applications/PresentationTab.tsx` | 550 | `<p className="text-sm font-semibold text-[#0B1F45]">Presentation Scheduled</p>` |
| `#0F8A6E` | `components/applications/PresentationTab.tsx` | 574 | `className="inline-flex w-fit rounded-lg bg-[#0F8A6E] px-3 py-2 text-sm font-medium text-white hover:bg-[#0c735d]"` |
| `#0c735d` | `components/applications/PresentationTab.tsx` | 574 | `className="inline-flex w-fit rounded-lg bg-[#0F8A6E] px-3 py-2 text-sm font-medium text-white hover:bg-[#0c735d]"` |
| `#0B1F45` | `components/applications/PresentationTab.tsx` | 581 | `<a href={row.teams_recording_url} className="font-medium text-[#0B1F45] underline" target="_blank" rel="noreferrer">` |
| `#0F8A6E` | `components/applications/PresentationTab.tsx` | 608 | `className="mt-4 bg-[#0F8A6E] text-white hover:bg-[#0c735d]"` |
| `#0c735d` | `components/applications/PresentationTab.tsx` | 608 | `className="mt-4 bg-[#0F8A6E] text-white hover:bg-[#0c735d]"` |
| `#0B1F45` | `components/applications/PresentationTab.tsx` | 627 | `<h3 className="text-lg font-semibold text-[#0B1F45]">Complete Presentation</h3>` |
| `#0F8A6E` | `components/applications/PresentationTab.tsx` | 662 | `<Button type="button" className="bg-[#0F8A6E] text-white hover:bg-[#0c735d]" disabled={busy} onClick={() => void saveCompletion(true)}>` |
| `#0c735d` | `components/applications/PresentationTab.tsx` | 662 | `<Button type="button" className="bg-[#0F8A6E] text-white hover:bg-[#0c735d]" disabled={busy} onClick={() => void saveCompletion(true)}>` |
| `#0B1F45` | `components/applications/ShortlistingSection.tsx` | 67 | `<p className="text-xs font-semibold uppercase tracking-wide text-[#0B1F45]">Shortlisting</p>` |
| `#0B1F45` | `components/applications/ShortlistingSection.tsx` | 83 | `<p className="text-xs font-semibold uppercase tracking-wide text-[#0B1F45]">Next step: Shortlisting</p>` |
| `#0F8A6E` | `components/applications/ShortlistingSection.tsx` | 102 | `className="bg-[#0F8A6E] text-white hover:bg-[#0c755d]"` |
| `#0c755d` | `components/applications/ShortlistingSection.tsx` | 102 | `className="bg-[#0F8A6E] text-white hover:bg-[#0c755d]"` |
| `#0F8A6E` | `components/applications/SiteVisitTab.tsx` | 32 | `if (o === 'satisfactory') return 'bg-[#0F8A6E]/15 text-[#0F8A6E] border border-[#0F8A6E]/30';` |
| `#0F8A6E` | `components/applications/SiteVisitTab.tsx` | 32 | `if (o === 'satisfactory') return 'bg-[#0F8A6E]/15 text-[#0F8A6E] border border-[#0F8A6E]/30';` |
| `#0F8A6E` | `components/applications/SiteVisitTab.tsx` | 32 | `if (o === 'satisfactory') return 'bg-[#0F8A6E]/15 text-[#0F8A6E] border border-[#0F8A6E]/30';` |
| `#0B1F45` | `components/applications/SiteVisitTab.tsx` | 292 | `<div className="mb-4 rounded-xl bg-[#0B1F45] p-5">` |
| `#0B1F45` | `components/applications/SiteVisitTab.tsx` | 320 | `<Button className="mt-6 rounded-xl bg-[#0B1F45] px-6 hover:bg-[#162d5e]" onClick={() => setScheduleOpen(true)}>` |
| `#162d5e` | `components/applications/SiteVisitTab.tsx` | 320 | `<Button className="mt-6 rounded-xl bg-[#0B1F45] px-6 hover:bg-[#162d5e]" onClick={() => setScheduleOpen(true)}>` |
| `#0B1F45` | `components/applications/SiteVisitTab.tsx` | 337 | `<span className="font-medium text-[#0B1F45]">Scheduled date *</span>` |
| `#0B1F45` | `components/applications/SiteVisitTab.tsx` | 341 | `<span className="font-medium text-[#0B1F45]">Location</span>` |
| `#0B1F45` | `components/applications/SiteVisitTab.tsx` | 346 | `<p className="text-sm font-medium text-[#0B1F45]">DBJ attendees (add team members)</p>` |
| `#0B1F45` | `components/applications/SiteVisitTab.tsx` | 377 | `<Button className="bg-[#0B1F45] hover:bg-[#162d5e]" onClick={scheduleVisit} disabled={loading \|\| !canWrite}>` |
| `#162d5e` | `components/applications/SiteVisitTab.tsx` | 377 | `<Button className="bg-[#0B1F45] hover:bg-[#162d5e]" onClick={scheduleVisit} disabled={loading \|\| !canWrite}>` |
| `#0B1F45` | `components/applications/SiteVisitTab.tsx` | 391 | `<p className="text-sm font-semibold text-[#0B1F45]">Visit scheduled</p>` |
| `#0F8A6E` | `components/applications/SiteVisitTab.tsx` | 414 | `<Button className="rounded-xl bg-[#0F8A6E] hover:bg-[#0c6e57]" onClick={() => setCompleteOpen(true)} disabled={loading}>` |
| `#0c6e57` | `components/applications/SiteVisitTab.tsx` | 414 | `<Button className="rounded-xl bg-[#0F8A6E] hover:bg-[#0c6e57]" onClick={() => setCompleteOpen(true)} disabled={loading}>` |
| `#0B1F45` | `components/applications/SiteVisitTab.tsx` | 433 | `<span className="font-medium text-[#0B1F45]">Actual visit date *</span>` |
| `#0B1F45` | `components/applications/SiteVisitTab.tsx` | 437 | `<legend className="text-sm font-medium text-[#0B1F45]">Outcome *</legend>` |
| `#0B1F45` | `components/applications/SiteVisitTab.tsx` | 448 | `<span className="font-medium text-[#0B1F45]">Outcome notes</span>` |
| `#0B1F45` | `components/applications/SiteVisitTab.tsx` | 457 | `<legend className="text-sm font-medium text-[#0B1F45]">Legal documents reviewed?</legend>` |
| `#0B1F45` | `components/applications/SiteVisitTab.tsx` | 471 | `<span className="font-medium text-[#0B1F45]">Legal documents notes</span>` |
| `#0B1F45` | `components/applications/SiteVisitTab.tsx` | 481 | `<p className="text-sm font-medium text-[#0B1F45]">Upload site visit report (optional)</p>` |
| `#0F8A6E` | `components/applications/SiteVisitTab.tsx` | 489 | `{uploading ? <Loader2 className="h-6 w-6 animate-spin text-[#0F8A6E]" /> : 'PDF / DOCX Â· max 20MB'}` |
| `#0F8A6E` | `components/applications/SiteVisitTab.tsx` | 499 | `<Button className="rounded-xl bg-[#0F8A6E] hover:bg-[#0c6e57]" onClick={saveVisitRecord} disabled={loading \|\| !canWrite}>` |
| `#0c6e57` | `components/applications/SiteVisitTab.tsx` | 499 | `<Button className="rounded-xl bg-[#0F8A6E] hover:bg-[#0c6e57]" onClick={saveVisitRecord} disabled={loading \|\| !canWrite}>` |
| `#0B1F45` | `components/applications/SiteVisitTab.tsx` | 521 | `<div className="flex flex-wrap items-center justify-between gap-3 bg-[#0B1F45] px-5 py-4">` |
| `#0F8A6E` | `components/applications/SiteVisitTab.tsx` | 575 | `<a href={dl} className="text-[#0F8A6E] underline-offset-2 hover:underline" target="_blank" rel="noreferrer">` |
| `#0B1F45` | `components/applications/SiteVisitTab.tsx` | 585 | `<Button className="mt-3 rounded-xl bg-[#0B1F45] hover:bg-[#162d5e]" onClick={beginNegotiation} disabled={loading}>` |
| `#162d5e` | `components/applications/SiteVisitTab.tsx` | 585 | `<Button className="mt-3 rounded-xl bg-[#0B1F45] hover:bg-[#162d5e]" onClick={beginNegotiation} disabled={loading}>` |
| `#0B1F45` | `components/applications/SiteVisitTab.tsx` | 620 | `<p className="font-semibold text-[#0B1F45]">Reject application</p>` |
| `#0B1F45` | `components/assessment/AssessmentEditor.tsx` | 311 | `<div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-[#0B1F45]">` |
| `#0B1F45` | `components/assessment/AssessmentEditor.tsx` | 346 | `<header className="bg-[#0B1F45] px-6 py-4 text-white">` |
| `#0B1F45` | `components/assessment/AssessmentEditor.tsx` | 408 | `mainTab === 'scoring' ? 'bg-white text-[#0B1F45]' : 'text-white/80 hover:bg-white/5',` |
| `#0B1F45` | `components/assessment/AssessmentEditor.tsx` | 418 | `mainTab === 'ai_insights' ? 'bg-white text-[#0B1F45]' : 'text-white/80 hover:bg-white/5',` |
| `#0B1F45` | `components/assessment/AssessmentEditor.tsx` | 469 | `className="rounded-lg bg-[#0B1F45] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#162d5e] disabled:cursor-not-allowed disabled:opacitâ€¦` |
| `#162d5e` | `components/assessment/AssessmentEditor.tsx` | 469 | `className="rounded-lg bg-[#0B1F45] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#162d5e] disabled:cursor-not-allowed disabled:opacitâ€¦` |
| `#F3F4F6` | `components/assessment/AssessmentEditor.tsx` | 500 | `<div className="border-t border-gray-200 bg-[#F3F4F6] px-6 py-6">` |
| `#0F8A6E` | `components/assessment/AssessmentInsightsDashboard.tsx` | 13 | `if (band === 'strong' \|\| band === 'adequate') return 'text-[#0F8A6E]';` |
| `#0F8A6E` | `components/assessment/AssessmentInsightsDashboard.tsx` | 60 | `className={cn('h-full rounded-full transition-all', displayScore >= PASS_THRESHOLD ? 'bg-[#0F8A6E]' : 'bg-amber-500')}` |
| `#0B1F45` | `components/assessment/AssessmentSettingsClient.tsx` | 109 | `<h2 className="text-lg font-semibold text-[#0B1F45]">Quarterly assessment framework</h2>` |
| `#0B1F45` | `components/assessment/AssessmentSettingsClient.tsx` | 142 | `<h3 className="mt-8 text-sm font-semibold text-[#0B1F45]">Lifecycle adjustments (percentage points)</h3>` |
| `#0B1F45` | `components/assessment/AssessmentSettingsClient.tsx` | 166 | `<h3 className="mt-8 text-sm font-semibold text-[#0B1F45]">Score thresholds (0â€“100)</h3>` |
| `#0F8A6E` | `components/assessment/AssessmentSettingsClient.tsx` | 201 | `<Button type="button" className="bg-[#0F8A6E] hover:bg-[#0c6f58]" disabled={busy \|\| Math.abs(wsum - 100) > 0.01} onClick={() => void save()}â€¦` |
| `#0c6f58` | `components/assessment/AssessmentSettingsClient.tsx` | 201 | `<Button type="button" className="bg-[#0F8A6E] hover:bg-[#0c6f58]" disabled={busy \|\| Math.abs(wsum - 100) > 0.01} onClick={() => void save()}â€¦` |
| `#0F8A6E` | `components/assessment/AssessmentWorkspace.tsx` | 73 | `scoredInSection === 0 ? 'text-gray-300' : sectionRatio >= 0.8 ? 'text-[#0F8A6E]' : sectionRatio >= 0.6 ? 'text-amber-600' : 'text-red-500';` |
| `#F3F4F6` | `components/assessment/AssessmentWorkspace.tsx` | 84 | `<div className="relative flex min-w-0 flex-col bg-[#F3F4F6]">` |
| `#0B1F45` | `components/assessment/AssessmentWorkspace.tsx` | 99 | `<div className="flex flex-wrap items-center justify-between gap-3 overflow-hidden rounded-xl border border-gray-200 border-t-4 border-t-[#0Bâ€¦` |
| `#0B1F45` | `components/assessment/AssessmentWorkspace.tsx` | 101 | `<h2 className="text-lg font-bold text-[#0B1F45]">{def.title}</h2>` |
| `#0B1F45` | `components/assessment/AssessmentWorkspace.tsx` | 172 | `<span className="text-sm font-semibold text-[#0B1F45]">Activity</span>` |
| `#F3F4F6` | `components/assessment/AssessmentWorkspace.tsx` | 179 | `<div className="max-h-[min(28rem,50vh)] overflow-y-auto border-t border-gray-100 bg-[#F3F4F6] px-4 py-4">` |
| `#0F8A6E` | `components/assessment/CriteriaNav.tsx` | 11 | `if (ratio >= 0.8) return 'text-[#0F8A6E]';` |
| `#F8F9FF` | `components/assessment/CriteriaNav.tsx` | 50 | `'flex w-full items-center justify-between border-b border-gray-100 py-3 pl-4 pr-3 text-left transition-colors hover:bg-[#F8F9FF]',` |
| `#0B1F45` | `components/assessment/CriteriaNav.tsx` | 51 | `isActive ? 'border-l-4 border-l-[#0B1F45] bg-[#F8F9FF]' : 'border-l-4 border-l-transparent',` |
| `#F8F9FF` | `components/assessment/CriteriaNav.tsx` | 51 | `isActive ? 'border-l-4 border-l-[#0B1F45] bg-[#F8F9FF]' : 'border-l-4 border-l-transparent',` |
| `#0B1F45` | `components/assessment/CriteriaNav.tsx` | 58 | `isActive ? 'text-[#0B1F45]' : 'text-gray-700',` |
| `#0B1F45` | `components/assessment/EvidenceDrawer.tsx` | 71 | `<h2 id={titleId} className="text-sm font-semibold text-[#0B1F45]">` |
| `#0B1F45` | `components/assessment/EvidencePanel.tsx` | 339 | `<span className="text-[20px] font-semibold tracking-tight text-[#0B1F45]">` |
| `#0F8A6E` | `components/assessment/EvidencePanel.tsx` | 537 | `<Link href={/questionnaires/${questionnaireId}} className="text-[#0F8A6E] underline">` |
| `#0F8A6E` | `components/assessment/EvidencePanel.tsx` | 605 | `<Link href={/questionnaires/${questionnaireId}} className="text-[#0F8A6E] underline">` |
| `#0B1F45` | `components/assessment/SubcriteriaRow.tsx` | 46 | `<p className="text-sm font-semibold text-[#0B1F45]">{label}</p>` |
| `#0B1F45` | `components/assessment/SubcriteriaRow.tsx` | 113 | `className="h-9 w-16 border border-gray-300 text-center text-sm font-semibold focus:border-transparent focus:ring-2 focus:ring-[#0B1F45]"` |
| `#0B1F45` | `components/assessment/SubcriteriaRow.tsx` | 122 | `className="ml-auto min-w-[8rem] flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-600 placeholder:text-gray-400 focus:bâ€¦` |
| `#00A99D` | `components/assessments/AIFollowupQuestionsCard.tsx` | 236 | `<Sparkles className="h-4 w-4 shrink-0 text-[#00A99D]" aria-hidden />` |
| `#00A99D` | `components/assessments/AIFollowupQuestionsCard.tsx` | 240 | `{generating ? <Loader2 className="h-4 w-4 animate-spin text-[#00A99D]" aria-hidden /> : null}` |
| `#00A99D` | `components/assessments/AIFollowupQuestionsCard.tsx` | 242 | `<Sparkles className="h-2.5 w-2.5 text-[#00A99D]" aria-hidden />` |
| `#00A99D` | `components/assessments/AIFollowupQuestionsCard.tsx` | 255 | `className="inline-flex items-center gap-1.5 rounded-md border border-[#00A99D] bg-white px-2.5 py-1 text-xs font-medium text-[#00A99D] hoverâ€¦` |
| `#00A99D` | `components/assessments/AIFollowupQuestionsCard.tsx` | 255 | `className="inline-flex items-center gap-1.5 rounded-md border border-[#00A99D] bg-white px-2.5 py-1 text-xs font-medium text-[#00A99D] hoverâ€¦` |
| `#00A99D` | `components/assessments/AIFollowupQuestionsCard.tsx` | 296 | `<CheckCircle className="mx-auto h-10 w-10 text-[#00A99D]" aria-hidden />` |
| `#0B1F45` | `components/assessments/AIFollowupQuestionsCard.tsx` | 297 | `<p className="mt-3 text-sm font-semibold text-[#0B1F45]">Strong submission â€” no critical gaps identified</p>` |
| `#00A99D` | `components/assessments/AIFollowupQuestionsCard.tsx` | 335 | `className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#00A99D]/40 bg-teal-50 text-xs font-semibold text-[â€¦` |
| `#00A99D` | `components/assessments/AIFollowupQuestionsCard.tsx` | 335 | `className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#00A99D]/40 bg-teal-50 text-xs font-semibold text-[â€¦` |
| `#00A99D` | `components/assessments/AIFollowupQuestionsCard.tsx` | 347 | `className="text-xs font-medium text-[#00A99D] underline-offset-2 hover:underline"` |
| `#00A99D` | `components/assessments/AIFollowupQuestionsCard.tsx` | 363 | `? 'bg-[#00A99D] text-white'` |
| `#00A99D` | `components/assistant/AssistantButton.tsx` | 16 | `className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#00A99D] shadow-lg transition-colors duraâ€¦` |
| `#009488` | `components/assistant/AssistantButton.tsx` | 16 | `className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#00A99D] shadow-lg transition-colors duraâ€¦` |
| `#00A99D` | `components/assistant/AssistantPanel.tsx` | 27 | `background: '#00A99D',` |
| `#5eead4` | `components/assistant/AssistantPanel.tsx` | 171 | `style={{ color: '#5eead4', textDecoration: 'underline' }}` |
| `#5eead4` | `components/assistant/AssistantPanel.tsx` | 269 | `<SvgSearch10 stroke="#5eead4" />` |
| `#5eead4` | `components/assistant/AssistantPanel.tsx` | 270 | `<span style={{ fontSize: 10, color: '#5eead4' }}>Live data</span>` |
| `#93c5fd` | `components/assistant/AssistantPanel.tsx` | 277 | `<SvgBookOpen10 stroke="#93c5fd" />` |
| `#93c5fd` | `components/assistant/AssistantPanel.tsx` | 278 | `<span style={{ fontSize: 10, color: '#93c5fd' }}>General knowledge</span>` |
| `#fbbf24` | `components/assistant/AssistantPanel.tsx` | 284 | `<SvgLightbulb10 stroke="#fbbf24" />` |
| `#fbbf24` | `components/assistant/AssistantPanel.tsx` | 285 | `<span style={{ fontSize: 10, color: '#fbbf24' }}>Analysis</span>` |
| `#00A99D` | `components/assistant/AssistantPanel.tsx` | 365 | `background: '#00A99D',` |
| `#0B1F45` | `components/assistant/AssistantPanel.tsx` | 510 | `className={fixed right-0 top-0 z-50 flex h-screen w-[380px] flex-col border-l border-white/[0.08] bg-[#0B1F45] shadow-[-8px_0_32px_rgba(0,0â€¦` |
| `#0B1F45` | `components/assistant/AssistantPanel.tsx` | 515 | `className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#0B1F45]"` |
| `#00A99D` | `components/assistant/AssistantPanel.tsx` | 523 | `<SvgSparkles size={14} stroke="#00A99D" />` |
| `#00A99D` | `components/assistant/AssistantPanel.tsx` | 599 | `<SvgArrowPrompt stroke="#00A99D" />` |
| `#00A99D` | `components/assistant/AssistantPanel.tsx` | 620 | `<SvgSparkles size={20} stroke="#00A99D" />` |
| `#00A99D` | `components/assistant/AssistantPanel.tsx` | 673 | `<SvgArrowPrompt stroke="#00A99D" />` |
| `#00A99D` | `components/assistant/AssistantPanel.tsx` | 703 | `<SvgArrowPrompt stroke="#00A99D" />` |
| `#0B1F45` | `components/assistant/AssistantPanel.tsx` | 716 | `className="shrink-0 border-t border-white/10 bg-[#0B1F45]"` |
| `#00A99D` | `components/assistant/AssistantPanel.tsx` | 751 | `style={{ width: 30, height: 30, background: '#00A99D' }}` |
| `#0F8A6E` | `components/cfp/CfpDetailView.tsx` | 98 | `if (score >= 70) return 'text-[#0F8A6E]';` |
| `#C8973A` | `components/cfp/CfpDetailView.tsx` | 99 | `if (score >= 40) return 'text-[#C8973A]';` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 100 | `return 'text-[#0B1F45]';` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 237 | `<h1 className="text-2xl font-bold leading-snug text-[#0B1F45]">{cfp.title}</h1>` |
| `#0F8A6E` | `components/cfp/CfpDetailView.tsx` | 250 | `className="bg-[#0F8A6E] text-white hover:bg-[#0c735d]"` |
| `#0c735d` | `components/cfp/CfpDetailView.tsx` | 250 | `className="bg-[#0F8A6E] text-white hover:bg-[#0c735d]"` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 295 | `<p className="text-2xl font-bold leading-none text-[#0B1F45]">{s.value}</p>` |
| `#C8973A` | `components/cfp/CfpDetailView.tsx` | 316 | `tab === key ? 'border-[#C8973A] text-[#0B1F45]' : 'border-transparent text-gray-500 hover:text-[#0B1F45]',` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 316 | `tab === key ? 'border-[#C8973A] text-[#0B1F45]' : 'border-transparent text-gray-500 hover:text-[#0B1F45]',` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 316 | `tab === key ? 'border-[#C8973A] text-[#0B1F45]' : 'border-transparent text-gray-500 hover:text-[#0B1F45]',` |
| `#0F8A6E` | `components/cfp/CfpDetailView.tsx` | 344 | `className="text-xs font-semibold text-[#0F8A6E] hover:underline"` |
| `#FAFAFA` | `components/cfp/CfpDetailView.tsx` | 360 | `<div className="rounded-xl border border-gray-100 bg-[#FAFAFA] p-5">` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 364 | `<p className="mt-1 font-semibold text-[#0B1F45]">{formatCfpDate(cfp.opening_date)}</p>` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 368 | `<p className="mt-1 font-semibold text-[#0B1F45]">{formatCfpDate(cfp.closing_date)}</p>` |
| `#C8973A` | `components/cfp/CfpDetailView.tsx` | 374 | `className="h-full rounded-full bg-[#C8973A] transition-all"` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 380 | `className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#0B1F45] shadow"` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 392 | `<span className="font-medium text-[#0B1F45]">{m.label \|\| 'â€”'}</span>` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 482 | `<h2 className="text-sm font-semibold text-[#0B1F45]">` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 493 | `appsSubView === 'list' ? 'bg-white text-[#0B1F45] shadow-sm' : 'text-gray-500 hover:text-gray-700',` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 503 | `appsSubView === 'matrix' ? 'bg-white text-[#0B1F45] shadow-sm' : 'text-gray-500 hover:text-gray-700',` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 537 | `<p className="mt-4 text-base font-semibold text-[#0B1F45]">No applications received yet</p>` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 561 | `<span className="font-medium text-[#0B1F45]">{a.fund_name}</span>` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 581 | `<Link href={/fund-applications/${a.id}} className="text-[#0B1F45] hover:underline">` |
| `#0F8A6E` | `components/cfp/CfpDetailView.tsx` | 585 | `<Link href={/applications/${a.id}/prequalification} className="text-[#0F8A6E] hover:underline">` |
| `#C8973A` | `components/cfp/CfpDetailView.tsx` | 590 | `<Link href={/questionnaires/${a.questionnaire_id}} className="text-[#C8973A] hover:underline">` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 610 | `<h2 className="text-sm font-semibold text-[#0B1F45]">Panel Members ({panelRows.length})</h2>` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 614 | `className="bg-[#0B1F45] text-white hover:bg-[#162d5e]"` |
| `#162d5e` | `components/cfp/CfpDetailView.tsx` | 614 | `className="bg-[#0B1F45] text-white hover:bg-[#162d5e]"` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 625 | `<p className="mt-4 text-base font-semibold text-[#0B1F45]">No panel members added</p>` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 630 | `className="mt-6 bg-[#0B1F45] text-white hover:bg-[#162d5e]"` |
| `#162d5e` | `components/cfp/CfpDetailView.tsx` | 630 | `className="mt-6 bg-[#0B1F45] text-white hover:bg-[#162d5e]"` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 645 | `<AvatarInitials name={m.member_name} className="!h-11 !w-11 !bg-[#0B1F45] !text-white" />` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 648 | `<p className="text-base font-semibold text-[#0B1F45]">{m.member_name}</p>` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 652 | `m.member_type === 'observer' ? 'bg-gray-100 text-gray-600' : 'bg-[#0B1F45] text-white',` |
| `#0B1F45` | `components/cfp/CfpDetailView.tsx` | 771 | `<p className="mt-1 text-sm font-semibold text-[#0B1F45]">{value}</p>` |
| `#0B1F45` | `components/cfp/CfpInfoStrip.tsx` | 30 | `<ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-[#0B1F45]" aria-hidden />` |
| `#0B1F45` | `components/cfp/CfpInfoStrip.tsx` | 32 | `<p className="font-semibold text-[#0B1F45]">{cfp.title}</p>` |
| `#0B1F45` | `components/cfp/CfpInfoStrip.tsx` | 40 | `<Link href={/cfp/${cfp.id}} className="shrink-0 font-medium text-[#0B1F45] hover:underline">` |
| `#0B1F45` | `components/cfp/CfpListClient.tsx` | 48 | `<h1 className="text-2xl font-bold text-[#0B1F45]">Calls for proposals</h1>` |
| `#0B1F45` | `components/cfp/CfpListClient.tsx` | 56 | `className="rounded-lg bg-[#0B1F45] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#162d5e]"` |
| `#162d5e` | `components/cfp/CfpListClient.tsx` | 56 | `className="rounded-lg bg-[#0B1F45] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#162d5e]"` |
| `#0B1F45` | `components/cfp/CfpListClient.tsx` | 82 | `className="rounded-lg bg-[#0B1F45] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#162d5e]"` |
| `#162d5e` | `components/cfp/CfpListClient.tsx` | 82 | `className="rounded-lg bg-[#0B1F45] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#162d5e]"` |
| `#0B1F45` | `components/cfp/CfpListClient.tsx` | 97 | `'block overflow-hidden rounded-xl border border-gray-200 border-t-4 border-t-[#0B1F45] bg-white p-6 transition-shadow hover:shadow-md',` |
| `#6B7280` | `components/cfp/CfpListClient.tsx` | 102 | `<span className="shrink-0 text-right text-xs text-[#6B7280]">` |
| `#0B1F45` | `components/cfp/CfpListClient.tsx` | 106 | `<h3 className="mt-3 text-lg font-bold leading-snug text-[#0B1F45]">{c.title}</h3>` |
| `#6B7280` | `components/cfp/CfpListClient.tsx` | 107 | `<p className="mt-2 line-clamp-2 text-sm text-[#6B7280]">{c.description?.trim() \|\| 'â€”'}</p>` |
| `#6B7280` | `components/cfp/CfpListClient.tsx` | 109 | `<div className="flex flex-wrap items-center justify-between gap-2 text-sm text-[#6B7280]">` |
| `#0B1F45` | `components/cfp/CfpListClient.tsx` | 111 | `<ClipboardList className="h-4 w-4 text-[#0B1F45]" aria-hidden />` |
| `#0B1F45` | `components/cfp/CfpListClient.tsx` | 115 | `<Users className="h-4 w-4 text-[#0B1F45]" aria-hidden />` |
| `#0B1F45` | `components/cfp/CfpListClient.tsx` | 118 | `<span className={cn(dsType.muted, 'text-[#0B1F45]')}>Open â†’</span>` |
| `#0F8A6E` | `components/cfp/CfpStatusBadge.tsx` | 6 | `active: 'bg-teal-50 text-[#0F8A6E]',` |
| `#0B1F45` | `components/cfp/CfpStatusBadge.tsx` | 7 | `closed: 'bg-[#0B1F45] text-white',` |
| `#0B1F45` | `components/cfp/CreateCfpModal.tsx` | 120 | `<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1F45]/40 p-4">` |
| `#0B1F45` | `components/cfp/CreateCfpModal.tsx` | 130 | `<h2 className="pr-10 text-lg font-semibold text-[#0B1F45]">New Call for Proposals</h2>` |
| `#6B7280` | `components/cfp/CreateCfpModal.tsx` | 131 | `<p className="mt-1 text-sm text-[#6B7280]">Create a draft CFP. You can activate it when ready to accept applications.</p>` |
| `#F3F4F6` | `components/cfp/CreateCfpModal.tsx` | 190 | `<div className="rounded-xl border border-gray-200 bg-[#F3F4F6] p-4">` |
| `#0B1F45` | `components/cfp/CreateCfpModal.tsx` | 196 | `<span className="text-sm font-semibold text-[#0B1F45]">DBJ Investment Criteria</span>` |
| `#C8973A` | `components/cfp/CreateCfpModal.tsx` | 197 | `<span className="text-xs font-medium text-[#C8973A]">{criteriaExpanded ? 'Hide editor' : 'Edit criteria'}</span>` |
| `#6B7280` | `components/cfp/CreateCfpModal.tsx` | 200 | `<ul className="mt-3 space-y-1.5 text-sm text-[#6B7280]">` |
| `#0B1F45` | `components/cfp/EditCfpModal.tsx` | 119 | `<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1F45]/40 p-4">` |
| `#0B1F45` | `components/cfp/EditCfpModal.tsx` | 129 | `<h2 className="pr-10 text-lg font-semibold text-[#0B1F45]">Edit CFP</h2>` |
| `#6B7280` | `components/cfp/EditCfpModal.tsx` | 130 | `{readOnly && <p className="mt-2 text-sm text-[#6B7280]">This CFP is read-only.</p>}` |
| `#0B1F45` | `components/cfp/EvaluationMatrix.tsx` | 146 | `<p className="text-base font-semibold text-[#0B1F45]">No panel evaluations submitted yet</p>` |
| `#0B1F45` | `components/cfp/EvaluationMatrix.tsx` | 164 | `<th key={a.id} className="min-w-[120px] px-2 py-3 text-center text-xs font-semibold text-[#0B1F45]">` |
| `#0B1F45` | `components/cfp/EvaluationMatrix.tsx` | 177 | `<span className="text-sm font-medium text-[#0B1F45]">{m.member_name}</span>` |
| `#0B1F45` | `components/cfp/EvaluationMatrix.tsx` | 181 | `m.member_type === 'observer' ? 'bg-gray-100 text-gray-600' : 'bg-[#0B1F45] text-white',` |
| `#0B1F45` | `components/cfp/EvaluationMatrix.tsx` | 211 | `<td className="sticky left-0 z-10 border-r border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-[#0B1F45]">` |
| `#0B1F45` | `components/cfp/PanelMemberModal.tsx` | 125 | `<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1F45]/40 p-4">` |
| `#0B1F45` | `components/cfp/PanelMemberModal.tsx` | 130 | `<h2 className="pr-10 text-lg font-semibold text-[#0B1F45]">{mode === 'create' ? 'Add panel member' : 'Edit panel member'}</h2>` |
| `#F3F4F6` | `components/cfp/PanelMemberModal.tsx` | 161 | `<div className="flex items-center justify-between rounded-lg border border-gray-200 bg-[#F3F4F6] px-3 py-2">` |
| `#0F8A6E` | `components/cfp/PanelMemberModal.tsx` | 169 | `isFm ? 'bg-[#0F8A6E]' : 'bg-gray-300',` |
| `#0B1F45` | `components/cfp/PanelMemberModal.tsx` | 197 | `<span className="font-medium text-[#0B1F45]">{a.fund_name}</span>` |
| `#F3F4F6` | `components/cfp/PanelMemberModal.tsx` | 206 | `<div className="flex items-center justify-between rounded-lg border border-gray-200 bg-[#F3F4F6] px-3 py-2">` |
| `#0F8A6E` | `components/cfp/PanelMemberModal.tsx` | 212 | `className={cn('relative h-7 w-12 rounded-full transition-colors', nda ? 'bg-[#0F8A6E]' : 'bg-gray-300')}` |
| `#0B1F45` | `components/deals/DealDetail.tsx` | 203 | `<h2 className="text-2xl font-semibold tracking-tight text-[#0B1F45]">{app?.fund_name ?? deal.title}</h2>` |
| `#C8973A` | `components/deals/DealDetail.tsx` | 217 | `<Link href={/fund-applications/${deal.application_id}} className="font-medium text-[#C8973A] hover:underline">` |
| `#0B1F45` | `components/deals/DealsListClient.tsx` | 94 | `<td className={cn(dsTable.td, 'font-medium text-[#0B1F45]')}>{d.application?.fund_name ?? d.title}</td>` |
| `#9ca3af` | `components/evaluation/EvaluationReviewPage.tsx` | 106 | `<p className="mt-1 text-[12px] text-[#9ca3af]">` |
| `#e5e7eb` | `components/evaluation/EvaluationReviewPage.tsx` | 171 | `<div className="w-full max-w-md rounded-lg border border-[#e5e7eb] bg-white p-6">` |
| `#e5e7eb` | `components/evaluation/EvaluationReviewPage.tsx` | 174 | `className="mt-3 w-full rounded-md border border-[#e5e7eb] p-2 text-[13px] text-[#374151] placeholder:text-[#9ca3af] focus:border-teal focus:â€¦` |
| `#374151` | `components/evaluation/EvaluationReviewPage.tsx` | 174 | `className="mt-3 w-full rounded-md border border-[#e5e7eb] p-2 text-[13px] text-[#374151] placeholder:text-[#9ca3af] focus:border-teal focus:â€¦` |
| `#9ca3af` | `components/evaluation/EvaluationReviewPage.tsx` | 174 | `className="mt-3 w-full rounded-md border border-[#e5e7eb] p-2 text-[13px] text-[#374151] placeholder:text-[#9ca3af] focus:border-teal focus:â€¦` |
| `#9ca3af` | `components/evaluation/EvaluationReviewPage.tsx` | 256 | `<span className="text-[12px] text-[#9ca3af]">{open ? 'Hide' : 'Show'}</span>` |
| `#9ca3af` | `components/evaluation/EvaluationReviewPage.tsx` | 287 | `<span className="text-[12px] text-[#9ca3af]">{open ? 'Hide' : 'Show'}</span>` |
| `#0B1F45` | `components/fund-applications/FundApplicationsListClient.tsx` | 73 | `<Link href={/fund-applications/${r.id}} className="font-medium text-[#0B1F45] hover:underline">` |
| `#0B1F45` | `components/fund-applications/FundApplicationsListClient.tsx` | 80 | `<Link href={/cfp/${r.cfp_id}} className="text-sm font-medium text-[#0B1F45] hover:underline">` |
| `#00A99D` | `components/fund-applications/InviteToPortalButton.tsx` | 34 | `className="h-8 w-full border-[#00A99D] text-xs text-[#00A99D] hover:bg-[#E6F7F6] sm:w-auto"` |
| `#00A99D` | `components/fund-applications/InviteToPortalButton.tsx` | 34 | `className="h-8 w-full border-[#00A99D] text-xs text-[#00A99D] hover:bg-[#E6F7F6] sm:w-auto"` |
| `#E6F7F6` | `components/fund-applications/InviteToPortalButton.tsx` | 34 | `className="h-8 w-full border-[#00A99D] text-xs text-[#00A99D] hover:bg-[#E6F7F6] sm:w-auto"` |
| `#0B1F45` | `components/fund-applications/InviteToPortalButton.tsx` | 78 | `<h2 id="portal-access-title" className="text-lg font-semibold text-[#0B1F45]">` |
| `#00A99D` | `components/fund-managers/ContactManagementPanel.tsx` | 261 | `'h-8 border-[#00A99D] px-3 text-xs text-[#00A99D] hover:bg-[#E6F7F6] shrink-0';` |
| `#00A99D` | `components/fund-managers/ContactManagementPanel.tsx` | 261 | `'h-8 border-[#00A99D] px-3 text-xs text-[#00A99D] hover:bg-[#E6F7F6] shrink-0';` |
| `#E6F7F6` | `components/fund-managers/ContactManagementPanel.tsx` | 261 | `'h-8 border-[#00A99D] px-3 text-xs text-[#00A99D] hover:bg-[#E6F7F6] shrink-0';` |
| `#00A99D` | `components/fund-managers/ContactManagementPanel.tsx` | 423 | `'mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none ring-[#00A99D]/30 focus-visible:ring-2',` |
| `#00A99D` | `components/fund-managers/ContactManagementPanel.tsx` | 435 | `className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none ring-[#00A99D]/30 focus-visible:ring-2"` |
| `#00A99D` | `components/fund-managers/ContactManagementPanel.tsx` | 445 | `className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none ring-[#00A99D]/30 focus-visible:ring-2"` |
| `#00A99D` | `components/fund-managers/ContactManagementPanel.tsx` | 456 | `className="h-8 bg-[#00A99D] text-white hover:bg-[#008f85]"` |
| `#008f85` | `components/fund-managers/ContactManagementPanel.tsx` | 456 | `className="h-8 bg-[#00A99D] text-white hover:bg-[#008f85]"` |
| `#F3F4F6` | `components/invite/InviteTokenClient.tsx` | 34 | `<div className="flex min-h-screen flex-col items-center justify-center bg-[#F3F4F6] px-6 py-12">` |
| `#0B1F45` | `components/invite/InviteTokenClient.tsx` | 50 | `<h1 className="text-center text-xl font-bold text-[#0B1F45]">You&apos;ve been invited</h1>` |
| `#0B1F45` | `components/invite/InviteTokenClient.tsx` | 52 | `Welcome, <span className="font-semibold text-[#0B1F45]">{fullName}</span>` |
| `#0B1F45` | `components/invite/InviteTokenClient.tsx` | 56 | `<span className="font-semibold text-[#0B1F45]">{roleDisplayLabel(role)}</span>.` |
| `#0B1F45` | `components/invite/InviteTokenClient.tsx` | 61 | `className="mt-6 w-full bg-[#0B1F45] text-white hover:bg-[#0B1F45]/90"` |
| `#0B1F45` | `components/invite/InviteTokenClient.tsx` | 61 | `className="mt-6 w-full bg-[#0B1F45] text-white hover:bg-[#0B1F45]/90"` |
| `#F3F4F6` | `components/layout/AuthenticatedShell.tsx` | 63 | `<main className={cn('min-h-0 flex-1 overflow-y-auto', 'bg-[#F3F4F6]')}>` |
| `#0B1F45` | `components/layout/NavItem.tsx` | 25 | `? 'bg-[#0B1F45] text-white'` |
| `#E5E9F2` | `components/layout/Sidebar.tsx` | 232 | `<aside className="fixed left-0 top-0 z-40 flex h-full w-[240px] flex-col border-r border-[#E5E9F2] bg-[#FFFFFF]">` |
| `#FFFFFF` | `components/layout/Sidebar.tsx` | 232 | `<aside className="fixed left-0 top-0 z-40 flex h-full w-[240px] flex-col border-r border-[#E5E9F2] bg-[#FFFFFF]">` |
| `#E5E9F2` | `components/layout/Sidebar.tsx` | 233 | `<div className="border-b border-[#E5E9F2] px-4 py-3">` |
| `#E5E9F2` | `components/layout/Sidebar.tsx` | 262 | `<div className="my-1 h-px bg-[#E5E9F2]" />` |
| `#E5E9F2` | `components/layout/Sidebar.tsx` | 278 | `{visiblePipelineItems.length > 0 && visibleOperationsItems.length > 0 ? <div className="my-1 h-px bg-[#E5E9F2]" /> : null}` |
| `#8896B0` | `components/layout/Sidebar.tsx` | 313 | `<span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8896B0] transition-colors group-hover:text-[#6f7e9b]">` |
| `#6f7e9b` | `components/layout/Sidebar.tsx` | 313 | `<span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8896B0] transition-colors group-hover:text-[#6f7e9b]">` |
| `#A7B3C8` | `components/layout/Sidebar.tsx` | 318 | `'h-3 w-3 flex-shrink-0 text-[#A7B3C8] transition-all duration-200 group-hover:text-[#6f7e9b]',` |
| `#6f7e9b` | `components/layout/Sidebar.tsx` | 318 | `'h-3 w-3 flex-shrink-0 text-[#A7B3C8] transition-all duration-200 group-hover:text-[#6f7e9b]',` |
| `#0B1F45` | `components/layout/Sidebar.tsx` | 343 | `? 'border-[#0B1F45] bg-[#EEF1F8] text-[#0B1F45]'` |
| `#EEF1F8` | `components/layout/Sidebar.tsx` | 343 | `? 'border-[#0B1F45] bg-[#EEF1F8] text-[#0B1F45]'` |
| `#0B1F45` | `components/layout/Sidebar.tsx` | 343 | `? 'border-[#0B1F45] bg-[#EEF1F8] text-[#0B1F45]'` |
| `#0B1F45` | `components/layout/Sidebar.tsx` | 344 | `: 'border-transparent text-[#0B1F45] hover:bg-[#F5F7FA] hover:text-[#0B1F45]',` |
| `#F5F7FA` | `components/layout/Sidebar.tsx` | 344 | `: 'border-transparent text-[#0B1F45] hover:bg-[#F5F7FA] hover:text-[#0B1F45]',` |
| `#0B1F45` | `components/layout/Sidebar.tsx` | 344 | `: 'border-transparent text-[#0B1F45] hover:bg-[#F5F7FA] hover:text-[#0B1F45]',` |
| `#0B1F45` | `components/layout/Sidebar.tsx` | 347 | `<Icon className={cn('h-[14px] w-[14px] flex-shrink-0', active ? 'text-[#0B1F45]' : 'text-[#8896B0]')} />` |
| `#8896B0` | `components/layout/Sidebar.tsx` | 347 | `<Icon className={cn('h-[14px] w-[14px] flex-shrink-0', active ? 'text-[#0B1F45]' : 'text-[#8896B0]')} />` |
| `#EEF1F8` | `components/layout/Sidebar.tsx` | 350 | `<span className="flex-shrink-0 rounded-[3px] bg-[#EEF1F8] px-[5px] py-[1px] text-[9px] text-[#8896B0]">Soon</span>` |
| `#8896B0` | `components/layout/Sidebar.tsx` | 350 | `<span className="flex-shrink-0 rounded-[3px] bg-[#EEF1F8] px-[5px] py-[1px] text-[9px] text-[#8896B0]">Soon</span>` |
| `#0F8A6E` | `components/layout/TopBar.tsx` | 84 | `<Link href={c.href} className="text-gray-400 hover:text-[#0F8A6E] hover:underline">` |
| `#0B1F45` | `components/layout/TopBar.tsx` | 101 | `className="text-gray-600 hover:bg-gray-100 hover:text-[#0B1F45]"` |
| `#E5E7EB` | `components/portal/FundPortalShell.tsx` | 52 | `borderTop: '0.5px solid #E5E7EB',` |
| `#111827` | `components/portal/FundPortalShell.tsx` | 60 | `color: '#111827',` |
| `#9CA3AF` | `components/portal/FundPortalShell.tsx` | 70 | `color: '#9CA3AF',` |
| `#6B7280` | `components/portal/FundPortalShell.tsx` | 85 | `color: '#6B7280',` |
| `#F9FAFB` | `components/portal/FundPortalShell.tsx` | 312 | `<main className="min-h-0 flex-1 overflow-y-auto bg-[#F9FAFB]">` |
| `#0B1F45` | `components/portal/FundSelectorClient.tsx` | 15 | `className="mb-6 rounded-xl bg-gradient-to-r from-[#0B1F45] to-[#00A99D] p-5 text-white"` |
| `#00A99D` | `components/portal/FundSelectorClient.tsx` | 15 | `className="mb-6 rounded-xl bg-gradient-to-r from-[#0B1F45] to-[#00A99D] p-5 text-white"` |
| `#00A99D` | `components/portal/FundSelectorClient.tsx` | 60 | `<svg width={48} height={48} viewBox="0 0 24 24" fill="none" aria-hidden className="text-[#00A99D]">` |
| `#00A99D` | `components/portal/FundSelectorClient.tsx` | 186 | `className="mt-6 inline-flex w-full items-center justify-center rounded-lg border-2 border-[#00A99D] px-4 py-2.5 text-sm font-semibold text-[â€¦` |
| `#00A99D` | `components/portal/FundSelectorClient.tsx` | 186 | `className="mt-6 inline-flex w-full items-center justify-center rounded-lg border-2 border-[#00A99D] px-4 py-2.5 text-sm font-semibold text-[â€¦` |
| `#00A99D` | `components/portal/FundSelectorClient.tsx` | 186 | `className="mt-6 inline-flex w-full items-center justify-center rounded-lg border-2 border-[#00A99D] px-4 py-2.5 text-sm font-semibold text-[â€¦` |
| `#EBEAE6` | `components/portal/PortalApplicationOverviewCard.tsx` | 28 | `const BORDER_TERTIARY = '#EBEAE6';` |
| `#111827` | `components/portal/PortalApplicationOverviewCard.tsx` | 29 | `const TEXT_PRIMARY = '#111827';` |
| `#6B7280` | `components/portal/PortalApplicationOverviewCard.tsx` | 30 | `const TEXT_SECONDARY = '#6B7280';` |
| `#9CA3AF` | `components/portal/PortalApplicationOverviewCard.tsx` | 31 | `const TEXT_TERTIARY = '#9CA3AF';` |
| `#F3F4F6` | `components/portal/PortalApplicationOverviewCard.tsx` | 32 | `const BG_SECONDARY = '#F3F4F6';` |
| `#E5E7EB` | `components/portal/PortalApplicationOverviewCard.tsx` | 33 | `const BORDER_SECONDARY = '#E5E7EB';` |
| `#E1F5EE` | `components/portal/PortalApplicationOverviewCard.tsx` | 60 | `background: '#E1F5EE',` |
| `#5DCAA5` | `components/portal/PortalApplicationOverviewCard.tsx` | 61 | `border: '#5DCAA5',` |
| `#0F6E56` | `components/portal/PortalApplicationOverviewCard.tsx` | 62 | `color: '#0F6E56',` |
| `#E6F1FB` | `components/portal/PortalApplicationOverviewCard.tsx` | 70 | `background: '#E6F1FB',` |
| `#85B7EB` | `components/portal/PortalApplicationOverviewCard.tsx` | 71 | `border: '#85B7EB',` |
| `#185FA5` | `components/portal/PortalApplicationOverviewCard.tsx` | 72 | `color: '#185FA5',` |
| `#FAEEDA` | `components/portal/PortalApplicationOverviewCard.tsx` | 82 | `background: '#FAEEDA',` |
| `#EF9F27` | `components/portal/PortalApplicationOverviewCard.tsx` | 83 | `border: '#EF9F27',` |
| `#854F0B` | `components/portal/PortalApplicationOverviewCard.tsx` | 84 | `color: '#854F0B',` |
| `#FCEBEB` | `components/portal/PortalApplicationOverviewCard.tsx` | 90 | `background: '#FCEBEB',` |
| `#F09595` | `components/portal/PortalApplicationOverviewCard.tsx` | 91 | `border: '#F09595',` |
| `#A32D2D` | `components/portal/PortalApplicationOverviewCard.tsx` | 92 | `color: '#A32D2D',` |
| `#9FE1CB` | `components/portal/PortalApplicationOverviewCard.tsx` | 192 | `const lineHex = lineBelowColor === 'teal' ? '#9FE1CB' : '#D3D1C7';` |
| `#D3D1C7` | `components/portal/PortalApplicationOverviewCard.tsx` | 192 | `const lineHex = lineBelowColor === 'teal' ? '#9FE1CB' : '#D3D1C7';` |
| `#1D9E75` | `components/portal/PortalApplicationOverviewCard.tsx` | 197 | `<div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#1D9E75' }}>` |
| `#1D9E75` | `components/portal/PortalApplicationOverviewCard.tsx` | 204 | `style={{ backgroundColor: '#1D9E75', boxShadow: '0 0 0 4px #9FE1CB' }}` |
| `#9FE1CB` | `components/portal/PortalApplicationOverviewCard.tsx` | 204 | `style={{ backgroundColor: '#1D9E75', boxShadow: '0 0 0 4px #9FE1CB' }}` |
| `#D3D1C7` | `components/portal/PortalApplicationOverviewCard.tsx` | 210 | `<div className="box-border h-[22px] w-[22px] shrink-0 rounded-full bg-white" style={{ border: '2px solid #D3D1C7' }} />` |
| `#9FE1CB` | `components/portal/PortalApplicationOverviewCard.tsx` | 218 | `const lineHex = lineAbove === 'teal' ? '#9FE1CB' : '#D3D1C7';` |
| `#D3D1C7` | `components/portal/PortalApplicationOverviewCard.tsx` | 218 | `const lineHex = lineAbove === 'teal' ? '#9FE1CB' : '#D3D1C7';` |
| `#E24B4A` | `components/portal/PortalApplicationOverviewCard.tsx` | 223 | `<div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: '#E24B4A' }}>` |
| `#E1F5EE` | `components/portal/PortalApplicationOverviewCard.tsx` | 319 | `backgroundColor: '#E1F5EE',` |
| `#5DCAA5` | `components/portal/PortalApplicationOverviewCard.tsx` | 321 | `borderRight: '0.5px solid #5DCAA5',` |
| `#0F6E56` | `components/portal/PortalApplicationOverviewCard.tsx` | 324 | `<p className="text-[10px] font-medium uppercase tracking-wide leading-none" style={{ color: '#0F6E56' }}>` |
| `#085041` | `components/portal/PortalApplicationOverviewCard.tsx` | 327 | `<p className="mt-3 text-[15px] font-medium leading-snug" style={{ color: '#085041' }}>` |
| `#0F6E56` | `components/portal/PortalApplicationOverviewCard.tsx` | 395 | `<p className="mt-px text-[12px] leading-snug" style={{ color: '#0F6E56' }}>` |
| `#FAEEDA` | `components/portal/PortalApplicationOverviewCard.tsx` | 433 | `<div className="mt-4 rounded-[8px] px-4 py-3 text-[13px]" style={{ backgroundColor: '#FAEEDA', border: 0.5px solid #EF9F27, color: '#63380â€¦` |
| `#EF9F27` | `components/portal/PortalApplicationOverviewCard.tsx` | 433 | `<div className="mt-4 rounded-[8px] px-4 py-3 text-[13px]" style={{ backgroundColor: '#FAEEDA', border: 0.5px solid #EF9F27, color: '#63380â€¦` |
| `#633806` | `components/portal/PortalApplicationOverviewCard.tsx` | 433 | `<div className="mt-4 rounded-[8px] px-4 py-3 text-[13px]" style={{ backgroundColor: '#FAEEDA', border: 0.5px solid #EF9F27, color: '#63380â€¦` |
| `#9aa3b8` | `components/portal/PortalAuthIcons.tsx` | 15 | `className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa3b8]"` |
| `#9aa3b8` | `components/portal/PortalAuthIcons.tsx` | 35 | `className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa3b8]"` |
| `#9aa3b8` | `components/portal/PortalAuthIcons.tsx` | 55 | `className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa3b8]"` |
| `#007a72` | `components/portal/PortalAuthLayout.tsx` | 7 | `'linear-gradient(135deg, #007a72, #00A99D)' as const;` |
| `#00A99D` | `components/portal/PortalAuthLayout.tsx` | 7 | `'linear-gradient(135deg, #007a72, #00A99D)' as const;` |
| `#d4620a` | `components/portal/PortalAuthLayout.tsx` | 12 | `accent: '#d4620a',` |
| `#7a2e06` | `components/portal/PortalAuthLayout.tsx` | 13 | `btn: 'linear-gradient(135deg, #7a2e06, #c45417)',` |
| `#c45417` | `components/portal/PortalAuthLayout.tsx` | 13 | `btn: 'linear-gradient(135deg, #7a2e06, #c45417)',` |
| `#d4a882` | `components/portal/PortalAuthLayout.tsx` | 14 | `fallback: '#d4a882',` |
| `#2a7a4a` | `components/portal/PortalAuthLayout.tsx` | 18 | `accent: '#2a7a4a',` |
| `#0f4a2a` | `components/portal/PortalAuthLayout.tsx` | 19 | `btn: 'linear-gradient(135deg, #0f4a2a, #1e7a44)',` |
| `#1e7a44` | `components/portal/PortalAuthLayout.tsx` | 19 | `btn: 'linear-gradient(135deg, #0f4a2a, #1e7a44)',` |
| `#9bbfb0` | `components/portal/PortalAuthLayout.tsx` | 20 | `fallback: '#9bbfb0',` |
| `#5b3fa8` | `components/portal/PortalAuthLayout.tsx` | 24 | `accent: '#5b3fa8',` |
| `#2a1560` | `components/portal/PortalAuthLayout.tsx` | 25 | `btn: 'linear-gradient(135deg, #2a1560, #5b3fa8)',` |
| `#5b3fa8` | `components/portal/PortalAuthLayout.tsx` | 25 | `btn: 'linear-gradient(135deg, #2a1560, #5b3fa8)',` |
| `#a89cc8` | `components/portal/PortalAuthLayout.tsx` | 26 | `fallback: '#a89cc8',` |
| `#c4365a` | `components/portal/PortalAuthLayout.tsx` | 30 | `accent: '#c4365a',` |
| `#7a1830` | `components/portal/PortalAuthLayout.tsx` | 31 | `btn: 'linear-gradient(135deg, #7a1830, #c4365a)',` |
| `#c4365a` | `components/portal/PortalAuthLayout.tsx` | 31 | `btn: 'linear-gradient(135deg, #7a1830, #c4365a)',` |
| `#d4a0a8` | `components/portal/PortalAuthLayout.tsx` | 32 | `fallback: '#d4a0a8',` |
| `#2e5ec4` | `components/portal/PortalAuthLayout.tsx` | 36 | `accent: '#2e5ec4',` |
| `#0f2a7a` | `components/portal/PortalAuthLayout.tsx` | 37 | `btn: 'linear-gradient(135deg, #0f2a7a, #2e5ec4)',` |
| `#2e5ec4` | `components/portal/PortalAuthLayout.tsx` | 37 | `btn: 'linear-gradient(135deg, #0f2a7a, #2e5ec4)',` |
| `#9aaed4` | `components/portal/PortalAuthLayout.tsx` | 38 | `fallback: '#9aaed4',` |
| `#b57a10` | `components/portal/PortalAuthLayout.tsx` | 42 | `accent: '#b57a10',` |
| `#6a4206` | `components/portal/PortalAuthLayout.tsx` | 43 | `btn: 'linear-gradient(135deg, #6a4206, #b57a10)',` |
| `#b57a10` | `components/portal/PortalAuthLayout.tsx` | 43 | `btn: 'linear-gradient(135deg, #6a4206, #b57a10)',` |
| `#d4c090` | `components/portal/PortalAuthLayout.tsx` | 44 | `fallback: '#d4c090',` |
| `#00A99D` | `components/portal/PortalAuthLayout.tsx` | 86 | `['--portal-focus-accent' as string]: '#00A99D',` |
| `#00A99D` | `components/portal/PortalComingSoon.tsx` | 16 | `<div className="mb-4 text-[#00A99D]" aria-hidden>` |
| `#0B1F45` | `components/portal/PortalComingSoon.tsx` | 19 | `<h1 className="text-xl font-semibold text-[#0B1F45]">{title}</h1>` |
| `#00A99D` | `components/portal/PortalComingSoon.tsx` | 27 | `<Link href="/portal" className="text-sm font-medium text-[#00A99D] hover:underline">` |
| `#E1F5EE` | `components/portal/PortalProfilePageClient.tsx` | 33 | `return { backgroundColor: '#E1F5EE', color: '#085041' };` |
| `#085041` | `components/portal/PortalProfilePageClient.tsx` | 33 | `return { backgroundColor: '#E1F5EE', color: '#085041' };` |
| `#FCEBEB` | `components/portal/PortalProfilePageClient.tsx` | 36 | `return { backgroundColor: '#FCEBEB', color: '#791F1F' };` |
| `#791F1F` | `components/portal/PortalProfilePageClient.tsx` | 36 | `return { backgroundColor: '#FCEBEB', color: '#791F1F' };` |
| `#F1EFE8` | `components/portal/PortalProfilePageClient.tsx` | 38 | `return { backgroundColor: '#F1EFE8', color: '#5F5E5A' };` |
| `#5F5E5A` | `components/portal/PortalProfilePageClient.tsx` | 38 | `return { backgroundColor: '#F1EFE8', color: '#5F5E5A' };` |
| `#9CA3AF` | `components/portal/PortalProfilePageClient.tsx` | 56 | `<i className={iconClass} style={{ fontSize: 14, color: '#9CA3AF', marginTop: 2 }} aria-hidden />` |
| `#0B1F45` | `components/portal/PortalProfilePageClient.tsx` | 104 | `background: 'linear-gradient(135deg, #0B1F45, #1D9E75)',` |
| `#1D9E75` | `components/portal/PortalProfilePageClient.tsx` | 104 | `background: 'linear-gradient(135deg, #0B1F45, #1D9E75)',` |
| `#111827` | `components/portal/PortalProfilePageClient.tsx` | 113 | `<h2 className="text-xl font-semibold" style={{ color: '#111827' }}>` |
| `#6B7280` | `components/portal/PortalProfilePageClient.tsx` | 116 | `<p className="mt-1 text-sm" style={{ color: '#6B7280' }}>` |
| `#E6F1FB` | `components/portal/PortalProfilePageClient.tsx` | 123 | `backgroundColor: '#E6F1FB',` |
| `#185FA5` | `components/portal/PortalProfilePageClient.tsx` | 124 | `color: '#185FA5',` |
| `#85B7EB` | `components/portal/PortalProfilePageClient.tsx` | 125 | `borderColor: '#85B7EB',` |
| `#E1F5EE` | `components/portal/PortalProfilePageClient.tsx` | 135 | `backgroundColor: '#E1F5EE',` |
| `#085041` | `components/portal/PortalProfilePageClient.tsx` | 136 | `color: '#085041',` |
| `#5DCAA5` | `components/portal/PortalProfilePageClient.tsx` | 137 | `borderColor: '#5DCAA5',` |
| `#F1EFE8` | `components/portal/PortalProfilePageClient.tsx` | 148 | `backgroundColor: '#F1EFE8',` |
| `#5F5E5A` | `components/portal/PortalProfilePageClient.tsx` | 149 | `color: '#5F5E5A',` |
| `#D3D1C7` | `components/portal/PortalProfilePageClient.tsx` | 150 | `borderColor: '#D3D1C7',` |
| `#1D9E75` | `components/portal/PortalProfilePageClient.tsx` | 165 | `borderColor: '#1D9E75',` |
| `#1D9E75` | `components/portal/PortalProfilePageClient.tsx` | 166 | `color: '#1D9E75',` |
| `#E1F5EE` | `components/portal/PortalProfilePageClient.tsx` | 220 | `style={{ backgroundColor: '#E1F5EE', color: '#0F6E56', fontSize: 11 }}` |
| `#0F6E56` | `components/portal/PortalProfilePageClient.tsx` | 220 | `style={{ backgroundColor: '#E1F5EE', color: '#0F6E56', fontSize: 11 }}` |
| `#111827` | `components/portal/PortalProfilePageClient.tsx` | 233 | `<span className="text-sm font-medium" style={{ color: '#111827' }}>` |
| `#9CA3AF` | `components/portal/PortalProfilePageClient.tsx` | 243 | `<p className="mt-0.5 text-xs" style={{ color: '#9CA3AF' }}>` |
| `#1D9E75` | `components/portal/PortalProfilePageClient.tsx` | 250 | `style={{ color: '#1D9E75' }}` |
| `#F9FAFB` | `components/portal/PortalProfilePageClient.tsx` | 271 | `background: '#F9FAFB',` |
| `#E5E7EB` | `components/portal/PortalProfilePageClient.tsx` | 272 | `border: '0.5px solid #E5E7EB',` |
| `#6B7280` | `components/portal/PortalProfilePageClient.tsx` | 277 | `<i className="ti ti-lock" style={{ fontSize: 16, color: '#6B7280' }} aria-hidden />` |
| `#111827` | `components/portal/PortalProfilePageClient.tsx` | 279 | `<div style={{ fontSize: 13, fontWeight: 500, color: '#111827' }}>Email and password</div>` |
| `#6B7280` | `components/portal/PortalProfilePageClient.tsx` | 280 | `<div style={{ fontSize: 11, color: '#6B7280', marginTop: 1 }}>` |
| `#374151` | `components/portal/PortalProfilePageClient.tsx` | 286 | `<div style={{ fontSize: 12, color: '#374151', marginBottom: 8, fontWeight: 500 }}>Password</div>` |
| `#D3D1C7` | `components/portal/PortalProfilePageClient.tsx` | 296 | `border: '0.5px solid #D3D1C7',` |
| `#374151` | `components/portal/PortalProfilePageClient.tsx` | 300 | `color: '#374151',` |
| `#9CA3AF` | `components/portal/PortalProfilePageClient.tsx` | 308 | `<div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 6, textAlign: 'center' }}>` |
| `#F9FAFB` | `components/portal/PortalShell.tsx` | 178 | `<main className="min-h-0 flex-1 overflow-y-auto bg-[#F9FAFB]">` |
| `#0B1F45` | `components/portfolio/AddFundManuallyButton.tsx` | 81 | `<Button type="button" className="rounded-xl bg-[#0B1F45] hover:bg-[#162d5e]" onClick={() => setOpen(true)}>` |
| `#162d5e` | `components/portfolio/AddFundManuallyButton.tsx` | 81 | `<Button type="button" className="rounded-xl bg-[#0B1F45] hover:bg-[#162d5e]" onClick={() => setOpen(true)}>` |
| `#0B1F45` | `components/portfolio/AddFundManuallyButton.tsx` | 103 | `<h2 id="add-fund-title" className="text-lg font-semibold text-[#0B1F45]">` |
| `#0F8A6E` | `components/portfolio/AddFundManuallyButton.tsx` | 165 | `className="mt-6 w-full bg-[#0F8A6E] hover:bg-[#0c6f58]"` |
| `#0c6f58` | `components/portfolio/AddFundManuallyButton.tsx` | 165 | `className="mt-6 w-full bg-[#0F8A6E] hover:bg-[#0c6f58]"` |
| `#0F8A6E` | `components/portfolio/AssessmentPeriodStartClient.tsx` | 122 | `<Link href={/portfolio/funds/${fundId}} className="text-[#0F8A6E] hover:underline">` |
| `#0B1F45` | `components/portfolio/AssessmentPeriodStartClient.tsx` | 129 | `<h1 className="text-xl font-bold text-[#0B1F45]">{fundName}</h1>` |
| `#0F8A6E` | `components/portfolio/AssessmentPeriodStartClient.tsx` | 133 | `<Link href={/portfolio/funds/${fundId}?tab=assessments} className="mt-3 inline-block text-sm font-medium text-[#0F8A6E] underline">` |
| `#0F8A6E` | `components/portfolio/AssessmentPeriodStartClient.tsx` | 147 | `<Link href={/portfolio/funds/${fundId}} className="text-[#0F8A6E] hover:underline">` |
| `#0B1F45` | `components/portfolio/AssessmentPeriodStartClient.tsx` | 153 | `<div className="rounded-xl bg-[#0B1F45] px-6 py-5 text-white">` |
| `#0B1F45` | `components/portfolio/AssessmentPeriodStartClient.tsx` | 159 | `<h2 className="text-base font-semibold text-[#0B1F45]">Select period</h2>` |
| `#0B1F45` | `components/portfolio/AssessmentPeriodStartClient.tsx` | 205 | `<Button type="button" className="bg-[#0B1F45] hover:bg-[#162d5e]" disabled={busy \|\| disabledStart} onClick={() => void startAssessment()}>` |
| `#162d5e` | `components/portfolio/AssessmentPeriodStartClient.tsx` | 205 | `<Button type="button" className="bg-[#0B1F45] hover:bg-[#162d5e]" disabled={busy \|\| disabledStart} onClick={() => void startAssessment()}>` |
| `#0F8A6E` | `components/portfolio/AssessmentReviewClient.tsx` | 153 | `<Link href={/portfolio/funds/${fundId}?tab=assessments} className="text-[#0F8A6E] hover:underline">` |
| `#0B1F45` | `components/portfolio/AssessmentReviewClient.tsx` | 162 | `<div className="rounded-xl bg-[#0B1F45] px-6 py-5 text-white">` |
| `#0B1F45` | `components/portfolio/AssessmentReviewClient.tsx` | 204 | `<h2 className="text-sm font-semibold text-[#0B1F45]">Administrator review</h2>` |
| `#0B1F45` | `components/portfolio/AssessmentReviewClient.tsx` | 210 | `className="mt-1 h-4 w-4 rounded border-gray-300 text-[#0B1F45] focus:ring-[#0B1F45]"` |
| `#0B1F45` | `components/portfolio/AssessmentReviewClient.tsx` | 210 | `className="mt-1 h-4 w-4 rounded border-gray-300 text-[#0B1F45] focus:ring-[#0B1F45]"` |
| `#0B1F45` | `components/portfolio/AssessmentReviewClient.tsx` | 215 | `<Label htmlFor="co" className="text-sm font-medium text-[#0B1F45]">` |
| `#0F8A6E` | `components/portfolio/AssessmentReviewClient.tsx` | 235 | `<Button type="button" className="bg-[#0F8A6E] hover:bg-[#0c6f58]" disabled={busy} onClick={onApprove}>` |
| `#0c6f58` | `components/portfolio/AssessmentReviewClient.tsx` | 235 | `<Button type="button" className="bg-[#0F8A6E] hover:bg-[#0c6f58]" disabled={busy} onClick={onApprove}>` |
| `#0B1F45` | `components/portfolio/AssessmentReviewClient.tsx` | 253 | `<h2 className="text-base font-semibold text-[#0B1F45]">Original Due Diligence Outcome</h2>` |
| `#0F8A6E` | `components/portfolio/AssessmentReviewClient.tsx` | 278 | `<Link href={/assessments/${row.dd_reference.id}} className="font-medium text-[#0F8A6E] underline">` |
| `#0B1F45` | `components/portfolio/AssessmentReviewClient.tsx` | 289 | `<h2 className="text-base font-semibold text-[#0B1F45]">Dimension scores</h2>` |
| `#0B1F45` | `components/portfolio/AssessmentReviewClient.tsx` | 365 | `<h2 className="text-base font-semibold text-[#0B1F45]">AI summary</h2>` |
| `#0F8A6E` | `components/portfolio/AssessmentReviewClient.tsx` | 370 | `className="text-sm text-[#0F8A6E] underline disabled:opacity-50"` |
| `#0B1F45` | `components/portfolio/AssessmentReviewClient.tsx` | 407 | `className="inline-flex items-center gap-1.5 rounded-md bg-[#0B1F45] px-3 py-1.5 text-sm text-white hover:bg-[#0B1F45]/90"` |
| `#0B1F45` | `components/portfolio/AssessmentReviewClient.tsx` | 407 | `className="inline-flex items-center gap-1.5 rounded-md bg-[#0B1F45] px-3 py-1.5 text-sm text-white hover:bg-[#0B1F45]/90"` |
| `#0B1F45` | `components/portfolio/AssessmentReviewPage.tsx` | 220 | `<div className="rounded-xl bg-[#0B1F45] px-6 py-5 text-white">` |
| `#0F8A6E` | `components/portfolio/AssessmentReviewPage.tsx` | 238 | `<Button type="button" className="bg-[#0F8A6E] hover:bg-[#0c6f58]" disabled={busy \|\| !canSubmit} onClick={() => void submit()}>` |
| `#0c6f58` | `components/portfolio/AssessmentReviewPage.tsx` | 238 | `<Button type="button" className="bg-[#0F8A6E] hover:bg-[#0c6f58]" disabled={busy \|\| !canSubmit} onClick={() => void submit()}>` |
| `#0F8A6E` | `components/portfolio/AssessmentReviewPage.tsx` | 317 | `<button type="button" className="text-sm text-[#0F8A6E] underline" onClick={() => setOverrideOpen((s) => ({ ...s, [key]: true }))}>` |
| `#0B1F45` | `components/portfolio/AssessmentReviewPage.tsx` | 353 | `<h2 className="text-base font-semibold text-[#0B1F45]">Original Due Diligence Outcome</h2>` |
| `#0F8A6E` | `components/portfolio/AssessmentReviewPage.tsx` | 378 | `<Link href={/assessments/${assessment.dd_reference.id}} className="font-medium text-[#0F8A6E] underline">` |
| `#0B1F45` | `components/portfolio/AssessmentReviewPage.tsx` | 390 | `<h2 className="text-base font-semibold text-[#0B1F45]">AI summary</h2>` |
| `#0F8A6E` | `components/portfolio/AssessmentReviewPage.tsx` | 394 | `className="text-sm text-[#0F8A6E] underline disabled:opacity-50"` |
| `#0F8A6E` | `components/portfolio/CapitalCallsOverviewClient.tsx` | 80 | `if (pct >= 80) return 'bg-[#0F8A6E]';` |
| `#0B1F45` | `components/portfolio/CapitalCallsOverviewClient.tsx` | 82 | `return 'bg-[#0B1F45]';` |
| `#0B1F45` | `components/portfolio/CapitalCallsOverviewClient.tsx` | 258 | `<h1 className="text-2xl font-bold text-[#0B1F45]">Capital Calls</h1>` |
| `#0B1F45` | `components/portfolio/CapitalCallsOverviewClient.tsx` | 263 | `<div className="relative overflow-hidden rounded-xl border border-gray-200 border-t-4 border-t-[#0B1F45] bg-white p-5">` |
| `#0B1F45` | `components/portfolio/CapitalCallsOverviewClient.tsx` | 264 | `<p className="text-2xl font-bold text-[#0B1F45]">{fmtUsd(kpi.total_called_usd_equiv)}</p>` |
| `#0B1F45` | `components/portfolio/CapitalCallsOverviewClient.tsx` | 269 | `<p className="text-2xl font-bold text-[#0B1F45]">{fmtUsd(kpi.total_remaining_usd_equiv)}</p>` |
| `#0B1F45` | `components/portfolio/CapitalCallsOverviewClient.tsx` | 279 | `<p className="text-2xl font-bold text-[#0B1F45]">{kpi.unpaid_calls_count}</p>` |
| `#0F8A6E` | `components/portfolio/CapitalCallsOverviewClient.tsx` | 282 | `<div className="relative overflow-hidden rounded-xl border border-gray-200 border-t-4 border-t-[#0F8A6E] bg-white p-5">` |
| `#0B1F45` | `components/portfolio/CapitalCallsOverviewClient.tsx` | 283 | `<p className="text-2xl font-bold text-[#0B1F45]">{fmtUsd(kpi.investments_usd_equiv)}</p>` |
| `#0B1F45` | `components/portfolio/CapitalCallsOverviewClient.tsx` | 290 | `<h2 className="border-b border-gray-200 px-5 py-4 text-base font-semibold text-[#0B1F45]">Per-Fund Summary</h2>` |
| `#0B1F45` | `components/portfolio/CapitalCallsOverviewClient.tsx` | 330 | `<span className="font-medium text-[#0B1F45]">{f.fund_name}</span>` |
| `#0B1F45` | `components/portfolio/CapitalCallsOverviewClient.tsx` | 370 | `<h2 className="border-b border-gray-200 px-5 py-4 text-base font-semibold text-[#0B1F45]">Recent Capital Calls</h2>` |
| `#0B1F45` | `components/portfolio/CapitalCallsOverviewClient.tsx` | 396 | `<td className="py-2.5 pr-3 align-middle font-medium text-[#0B1F45]">Notice {c.notice_number}</td>` |
| `#0B1F45` | `components/portfolio/CapitalCallsOverviewClient.tsx` | 424 | `<h2 className="border-b border-gray-200 px-5 py-4 text-base font-semibold text-[#0B1F45]">Portfolio Investments</h2>` |
| `#0B1F45` | `components/portfolio/CapitalCallsOverviewClient.tsx` | 441 | `<p className="text-sm font-medium text-[#0B1F45]">{inv.investee_company ?? 'â€”'}</p>` |
| `#0B1F45` | `components/portfolio/CapitalCallsOverviewClient.tsx` | 467 | `<h2 className="border-b border-gray-200 px-5 py-4 text-base font-semibold text-[#0B1F45]">Call Activity Summary</h2>` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 381 | `<h1 className="text-2xl font-bold text-[#0B1F45] sm:text-3xl">Compliance Dashboard</h1>` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 384 | `<Button type="button" variant="outline" className="shrink-0 border-gray-300 text-[#0B1F45]" disabled>` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 403 | `tab === k ? 'border-[#0B1F45] font-medium text-[#0B1F45]' : 'border-transparent text-gray-500 hover:text-gray-700',` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 403 | `tab === k ? 'border-[#0B1F45] font-medium text-[#0B1F45]' : 'border-transparent text-gray-500 hover:text-gray-700',` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 429 | `<p className="text-3xl font-bold text-[#0B1F45]">{fully.length}</p>` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 448 | `<p className="text-3xl font-bold text-[#0B1F45]">{auditsOut.length}</p>` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 467 | `<p className="text-3xl font-bold text-[#0B1F45]">{reportsOut.length}</p>` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 484 | `<p className="text-3xl font-bold text-[#0B1F45]">{totalOverdue}</p>` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 492 | `<h2 className="text-lg font-semibold text-[#0B1F45]">Compliance Overview</h2>` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 497 | `className="text-xs text-gray-400 hover:text-[#0B1F45] underline underline-offset-2 ml-2 transition-colors"` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 532 | `className="mt-2 text-xs text-[#0B1F45] underline underline-offset-2"` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 545 | `<p className="font-medium text-[#0B1F45]">{r.fund_name}</p>` |
| `#e0e2ea` | `components/portfolio/ComplianceDashboardClient.tsx` | 581 | `'inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[7px] border-[0.5px] border-[#e0e2ea] bg-transparent text-gray-6â€¦` |
| `#f0f4ff` | `components/portfolio/ComplianceDashboardClient.tsx` | 583 | `'hover:bg-[#f0f4ff] hover:border-[#3A6FD8] hover:text-[#3A6FD8]',` |
| `#3A6FD8` | `components/portfolio/ComplianceDashboardClient.tsx` | 583 | `'hover:bg-[#f0f4ff] hover:border-[#3A6FD8] hover:text-[#3A6FD8]',` |
| `#3A6FD8` | `components/portfolio/ComplianceDashboardClient.tsx` | 583 | `'hover:bg-[#f0f4ff] hover:border-[#3A6FD8] hover:text-[#3A6FD8]',` |
| `#e0e2ea` | `components/portfolio/ComplianceDashboardClient.tsx` | 599 | `'inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[7px] border-[0.5px] border-[#e0e2ea] bg-transparent text-gray-6â€¦` |
| `#FEF0EE` | `components/portfolio/ComplianceDashboardClient.tsx` | 601 | `'hover:bg-[#FEF0EE] hover:border-[#D85A30] hover:text-[#D85A30]',` |
| `#D85A30` | `components/portfolio/ComplianceDashboardClient.tsx` | 601 | `'hover:bg-[#FEF0EE] hover:border-[#D85A30] hover:text-[#D85A30]',` |
| `#D85A30` | `components/portfolio/ComplianceDashboardClient.tsx` | 601 | `'hover:bg-[#FEF0EE] hover:border-[#D85A30] hover:text-[#D85A30]',` |
| `#e0e2ea` | `components/portfolio/ComplianceDashboardClient.tsx` | 611 | `<span className="inline-block h-[18px] w-[0.5px] shrink-0 bg-[#e0e2ea]" aria-hidden />` |
| `#3A6FD8` | `components/portfolio/ComplianceDashboardClient.tsx` | 614 | `className="shrink-0 text-[12px] leading-none text-[#3A6FD8] hover:underline"` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 634 | `<h2 className="text-lg font-semibold text-[#0B1F45]">Overdue Reporting Obligations</h2>` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 714 | `<p className="font-medium text-[#0B1F45]">{o.fund_name}</p>` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 739 | `className="bg-[#0B1F45] hover:bg-[#162d5e]"` |
| `#162d5e` | `components/portfolio/ComplianceDashboardClient.tsx` | 739 | `className="bg-[#0B1F45] hover:bg-[#162d5e]"` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 825 | `<h2 className="text-lg font-semibold text-[#0B1F45]">Compliance Activity</h2>` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 890 | `<p className="text-sm font-medium text-[#0B1F45]">{actionDescription(a)}</p>` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 920 | `<h3 className="text-lg font-semibold text-[#0B1F45]">Send Reminder â€” {reminderFund.fund_name}</h3>` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 955 | `<Button type="button" className="bg-[#0B1F45]" disabled={busy \|\| !reminderName.trim() \|\| !reminderEmail.trim()} onClick={() => void saveRemiâ€¦` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 974 | `<h3 className="text-lg font-semibold text-[#0B1F45]">Escalate â€” {escalateFund.fund_name}</h3>` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 1008 | `<Button type="button" className="bg-[#0B1F45]" disabled={busy \|\| !escName.trim() \|\| !escEmail.trim()} onClick={() => void saveEscalation()}>` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 1026 | `<h3 className="text-lg font-semibold text-[#0B1F45]">Mark as Received</h3>` |
| `#0B1F45` | `components/portfolio/ComplianceDashboardClient.tsx` | 1044 | `<Button type="button" className="bg-[#0B1F45]" disabled={busy \|\| !recvDate \|\| !recvBy.trim()} onClick={() => void saveMarkReceived()}>` |
| `#0B1F45` | `components/portfolio/DistributionsOverviewClient.tsx` | 37 | `const SLICE_COLORS = ['#0B1F45', '#C8973A', '#0F8A6E', '#3B82F6', '#6366f1', '#14b8a6'];` |
| `#C8973A` | `components/portfolio/DistributionsOverviewClient.tsx` | 37 | `const SLICE_COLORS = ['#0B1F45', '#C8973A', '#0F8A6E', '#3B82F6', '#6366f1', '#14b8a6'];` |
| `#0F8A6E` | `components/portfolio/DistributionsOverviewClient.tsx` | 37 | `const SLICE_COLORS = ['#0B1F45', '#C8973A', '#0F8A6E', '#3B82F6', '#6366f1', '#14b8a6'];` |
| `#3B82F6` | `components/portfolio/DistributionsOverviewClient.tsx` | 37 | `const SLICE_COLORS = ['#0B1F45', '#C8973A', '#0F8A6E', '#3B82F6', '#6366f1', '#14b8a6'];` |
| `#6366f1` | `components/portfolio/DistributionsOverviewClient.tsx` | 37 | `const SLICE_COLORS = ['#0B1F45', '#C8973A', '#0F8A6E', '#3B82F6', '#6366f1', '#14b8a6'];` |
| `#14b8a6` | `components/portfolio/DistributionsOverviewClient.tsx` | 37 | `const SLICE_COLORS = ['#0B1F45', '#C8973A', '#0F8A6E', '#3B82F6', '#6366f1', '#14b8a6'];` |
| `#0B1F45` | `components/portfolio/DistributionsOverviewClient.tsx` | 185 | `<h1 className="text-2xl font-bold text-[#0B1F45]">Distributions & Dividends</h1>` |
| `#0F8A6E` | `components/portfolio/DistributionsOverviewClient.tsx` | 190 | `<div className="relative overflow-hidden rounded-xl border border-gray-200 border-t-4 border-t-[#0F8A6E] bg-white p-5">` |
| `#0B1F45` | `components/portfolio/DistributionsOverviewClient.tsx` | 191 | `<p className="text-2xl font-bold text-[#0B1F45]">{fmtUsd(kpi?.total_returned_usd_equiv ?? 0)}</p>` |
| `#C8973A` | `components/portfolio/DistributionsOverviewClient.tsx` | 195 | `<div className="relative overflow-hidden rounded-xl border border-gray-200 border-t-4 border-t-[#C8973A] bg-white p-5">` |
| `#0B1F45` | `components/portfolio/DistributionsOverviewClient.tsx` | 196 | `<p className="text-2xl font-bold text-[#0B1F45]">{(kpi?.avg_yield_pct ?? 0).toFixed(1)}%</p>` |
| `#0B1F45` | `components/portfolio/DistributionsOverviewClient.tsx` | 201 | `<p className="text-lg font-bold leading-snug text-[#0B1F45]">{kpi?.most_active_fund?.fund_name ?? 'â€”'}</p>` |
| `#0B1F45` | `components/portfolio/DistributionsOverviewClient.tsx` | 208 | `<p className="text-2xl font-bold text-[#0B1F45]">{kpi?.funds_with_no_returns_count ?? 0}</p>` |
| `#0B1F45` | `components/portfolio/DistributionsOverviewClient.tsx` | 216 | `<h2 className="text-base font-semibold text-[#0B1F45]">Distribution History</h2>` |
| `#0F8A6E` | `components/portfolio/DistributionsOverviewClient.tsx` | 239 | `<Bar dataKey="total_usd" fill="#0F8A6E" radius={[4, 4, 0, 0]} />` |
| `#0B1F45` | `components/portfolio/DistributionsOverviewClient.tsx` | 247 | `<h2 className="text-base font-semibold text-[#0B1F45]">Returns by Fund</h2>` |
| `#0B1F45` | `components/portfolio/DistributionsOverviewClient.tsx` | 281 | `<span className="truncate text-[#0B1F45]">{p.name}</span>` |
| `#0B1F45` | `components/portfolio/DistributionsOverviewClient.tsx` | 283 | `<span className="shrink-0 font-semibold text-[#0B1F45]">{fmtUsd(p.value)}</span>` |
| `#0B1F45` | `components/portfolio/DistributionsOverviewClient.tsx` | 291 | `<h2 className="border-b border-gray-200 px-5 py-4 text-base font-semibold text-[#0B1F45]">All Distributions</h2>` |
| `#0B1F45` | `components/portfolio/DistributionsOverviewClient.tsx` | 366 | `<span className="font-medium text-[#0B1F45]">{row.fund_name}</span>` |
| `#0F8A6E` | `components/portfolio/DistributionsOverviewClient.tsx` | 375 | `<td className="px-5 py-3 font-semibold text-[#0F8A6E]">{fmtNative(row.currency, num(row.amount))}</td>` |
| `#0B1F45` | `components/portfolio/DivestmentSummaryClient.tsx` | 137 | `<h1 className="text-2xl font-bold text-[#0B1F45]">Divestment Assessment Summary</h1>` |
| `#0B1F45` | `components/portfolio/DivestmentSummaryClient.tsx` | 179 | `trigger === f.key ? 'border-[#0B1F45] bg-[#EEF1F8] text-[#0B1F45]' : 'border-gray-200 text-gray-600',` |
| `#EEF1F8` | `components/portfolio/DivestmentSummaryClient.tsx` | 179 | `trigger === f.key ? 'border-[#0B1F45] bg-[#EEF1F8] text-[#0B1F45]' : 'border-gray-200 text-gray-600',` |
| `#0B1F45` | `components/portfolio/DivestmentSummaryClient.tsx` | 179 | `trigger === f.key ? 'border-[#0B1F45] bg-[#EEF1F8] text-[#0B1F45]' : 'border-gray-200 text-gray-600',` |
| `#0B1F45` | `components/portfolio/DivestmentSummaryClient.tsx` | 204 | `<thead className="bg-[#0B1F45] text-left text-white">` |
| `#0B1F45` | `components/portfolio/DivestmentSummaryClient.tsx` | 236 | `<td className="px-3 py-2 font-medium text-[#0B1F45]">{r.fund_name}</td>` |
| `#0B1F45` | `components/portfolio/DivestmentSummaryClient.tsx` | 259 | `<h2 className="text-lg font-semibold text-[#0B1F45]">{active.fund_name}</h2>` |
| `#0B1F45` | `components/portfolio/DivestmentSummaryClient.tsx` | 274 | `<h3 className="text-sm font-semibold text-[#0B1F45]">AI summary</h3>` |
| `#0F8A6E` | `components/portfolio/DivestmentSummaryClient.tsx` | 278 | `<Link href={/portfolio/funds/${active.fund_id}/assessments/${active.assessment_id}} className="text-sm font-medium text-[#0F8A6E] underlinâ€¦` |
| `#0B1F45` | `components/portfolio/DivestmentTrackingClient.tsx` | 52 | `full_exit: '#0B1F45',` |
| `#C8973A` | `components/portfolio/DivestmentTrackingClient.tsx` | 53 | `partial_exit: '#C8973A',` |
| `#0F8A6E` | `components/portfolio/DivestmentTrackingClient.tsx` | 54 | `ipo: '#0F8A6E',` |
| `#EF4444` | `components/portfolio/DivestmentTrackingClient.tsx` | 55 | `write_off: '#EF4444',` |
| `#3B82F6` | `components/portfolio/DivestmentTrackingClient.tsx` | 56 | `return_of_capital: '#3B82F6',` |
| `#8B5CF6` | `components/portfolio/DivestmentTrackingClient.tsx` | 57 | `management_buyout: '#8B5CF6',` |
| `#F59E0B` | `components/portfolio/DivestmentTrackingClient.tsx` | 58 | `secondary_sale: '#F59E0B',` |
| `#0B1F45` | `components/portfolio/DivestmentTrackingClient.tsx` | 86 | `if (type === 'full_exit') return 'bg-[#0B1F45] text-white';` |
| `#0B1F45` | `components/portfolio/DivestmentTrackingClient.tsx` | 253 | `<h1 className="text-2xl font-bold text-[#0B1F45]">Divestment Summary</h1>` |
| `#0B1F45` | `components/portfolio/DivestmentTrackingClient.tsx` | 257 | `className="bg-[#0B1F45] text-white hover:bg-[#162d5e]"` |
| `#162d5e` | `components/portfolio/DivestmentTrackingClient.tsx` | 257 | `className="bg-[#0B1F45] text-white hover:bg-[#162d5e]"` |
| `#0B1F45` | `components/portfolio/DivestmentTrackingClient.tsx` | 271 | `<div className="rounded-xl border border-gray-200 border-t-4 border-t-[#0B1F45] bg-white p-4">` |
| `#0B1F45` | `components/portfolio/DivestmentTrackingClient.tsx` | 272 | `<ArrowRightLeft className="h-5 w-5 text-[#0B1F45]" />` |
| `#0B1F45` | `components/portfolio/DivestmentTrackingClient.tsx` | 273 | `<p className="mt-3 text-2xl font-bold text-[#0B1F45]">{data.summary.total_exits}</p>` |
| `#0F8A6E` | `components/portfolio/DivestmentTrackingClient.tsx` | 277 | `<div className="rounded-xl border border-gray-200 border-t-4 border-t-[#0F8A6E] bg-white p-4">` |
| `#0F8A6E` | `components/portfolio/DivestmentTrackingClient.tsx` | 278 | `<TrendingUp className="h-5 w-5 text-[#0F8A6E]" />` |
| `#0B1F45` | `components/portfolio/DivestmentTrackingClient.tsx` | 279 | `<p className="mt-3 text-2xl font-bold text-[#0B1F45]">USD {data.summary.total_proceeds_usd.toLocaleString(undefined, { maximumFractionDigitsâ€¦` |
| `#C8973A` | `components/portfolio/DivestmentTrackingClient.tsx` | 283 | `<div className="rounded-xl border border-gray-200 border-t-4 border-t-[#C8973A] bg-white p-4">` |
| `#C8973A` | `components/portfolio/DivestmentTrackingClient.tsx` | 284 | `<BarChart2 className="h-5 w-5 text-[#C8973A]" />` |
| `#0B1F45` | `components/portfolio/DivestmentTrackingClient.tsx` | 285 | `<p className="mt-3 text-2xl font-bold text-[#0B1F45]">{weightedMoic}</p>` |
| `#0B1F45` | `components/portfolio/DivestmentTrackingClient.tsx` | 291 | `<p className="mt-3 text-2xl font-bold text-[#0B1F45]">{pending}</p>` |
| `#0B1F45` | `components/portfolio/DivestmentTrackingClient.tsx` | 299 | `<p className="text-sm font-semibold text-[#0B1F45]">Proceeds by Fund</p>` |
| `#0F8A6E` | `components/portfolio/DivestmentTrackingClient.tsx` | 312 | `<Bar dataKey="value" fill="#0F8A6E" radius={[6, 6, 0, 0]} />` |
| `#0B1F45` | `components/portfolio/DivestmentTrackingClient.tsx` | 320 | `<p className="text-sm font-semibold text-[#0B1F45]">By Exit Type</p>` |
| `#9CA3AF` | `components/portfolio/DivestmentTrackingClient.tsx` | 330 | `<Cell key={entry.type} fill={TYPE_COLORS[entry.type] ?? '#9CA3AF'} />` |
| `#0B1F45` | `components/portfolio/DivestmentTrackingClient.tsx` | 340 | `<span className="font-semibold text-[#0B1F45]">{t.value}</span>` |
| `#0B1F45` | `components/portfolio/DivestmentTrackingClient.tsx` | 392 | `className="mt-4 bg-[#0B1F45] text-white hover:bg-[#162d5e]"` |
| `#162d5e` | `components/portfolio/DivestmentTrackingClient.tsx` | 392 | `className="mt-4 bg-[#0B1F45] text-white hover:bg-[#162d5e]"` |
| `#0B1F45` | `components/portfolio/DivestmentTrackingClient.tsx` | 424 | `<p className="font-medium text-[#0B1F45]">{r.company_name}</p>` |
| `#0F8A6E` | `components/portfolio/DivestmentTrackingClient.tsx` | 440 | `<td className="px-3 py-2 font-semibold text-[#0F8A6E]">{money(r.currency, Number(r.proceeds_received))}</td>` |
| `#0B1F45` | `components/portfolio/DivestmentTrackingClient.tsx` | 441 | `<td className={cn('px-3 py-2', moic > 2 ? 'font-bold text-teal-600' : moic >= 1 ? 'font-semibold text-[#0B1F45]' : 'text-red-600')}>` |
| `#0B1F45` | `components/portfolio/DivestmentTrackingClient.tsx` | 476 | `<h3 className="text-lg font-semibold text-[#0B1F45]">{editingId ? 'Edit Divestment' : 'Record Divestment'}</h3>` |
| `#0B1F45` | `components/portfolio/DivestmentTrackingClient.tsx` | 526 | `<p className={cn('text-2xl font-bold', calcMoic == null ? 'text-gray-400' : calcMoic < 1 ? 'text-red-600' : calcMoic > 2 ? 'text-teal-600' :â€¦` |
| `#0B1F45` | `components/portfolio/DivestmentTrackingClient.tsx` | 560 | `<Button disabled={!canSubmit \|\| busy} className="bg-[#0B1F45] text-white hover:bg-[#162d5e]" onClick={() => void onSave()}>` |
| `#162d5e` | `components/portfolio/DivestmentTrackingClient.tsx` | 560 | `<Button disabled={!canSubmit \|\| busy} className="bg-[#0B1F45] text-white hover:bg-[#162d5e]" onClick={() => void onSave()}>` |
| `#0B1F45` | `components/portfolio/ExecutiveExportPdfButton.tsx` | 11 | `className="no-print bg-[#0B1F45] text-white hover:bg-[#162d5e]"` |
| `#162d5e` | `components/portfolio/ExecutiveExportPdfButton.tsx` | 11 | `className="no-print bg-[#0B1F45] text-white hover:bg-[#162d5e]"` |
| `#0B1F45` | `components/portfolio/ExecutiveViewCharts.tsx` | 39 | `<h3 className="text-sm font-semibold text-[#0B1F45]">Commitment vs deployment</h3>` |
| `#f3f4f6` | `components/portfolio/ExecutiveViewCharts.tsx` | 47 | `<CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />` |
| `#6b7280` | `components/portfolio/ExecutiveViewCharts.tsx` | 48 | `<XAxis dataKey="abbr" tick={{ fontSize: 11 }} stroke="#6b7280" />` |
| `#6b7280` | `components/portfolio/ExecutiveViewCharts.tsx` | 49 | `<YAxis tick={{ fontSize: 11 }} stroke="#6b7280" tickFormatter={yAxisUsd} />` |
| `#0B1F45` | `components/portfolio/ExecutiveViewCharts.tsx` | 57 | `<p className="font-medium text-[#0B1F45]">{row.fullName}</p>` |
| `#0B1F45` | `components/portfolio/ExecutiveViewCharts.tsx` | 65 | `<Bar dataKey="committed" name="Committed" fill="#0B1F45" radius={[4, 4, 0, 0]} />` |
| `#0F8A6E` | `components/portfolio/ExecutiveViewCharts.tsx` | 66 | `<Bar dataKey="called" name="Called" fill="#0F8A6E" radius={[4, 4, 0, 0]} />` |
| `#0B1F45` | `components/portfolio/ExecutiveViewCharts.tsx` | 74 | `<h3 className="text-sm font-semibold text-[#0B1F45]">Distribution history</h3>` |
| `#f3f4f6` | `components/portfolio/ExecutiveViewCharts.tsx` | 82 | `<CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />` |
| `#6b7280` | `components/portfolio/ExecutiveViewCharts.tsx` | 83 | `<XAxis dataKey="year" tick={{ fontSize: 11 }} stroke="#6b7280" />` |
| `#6b7280` | `components/portfolio/ExecutiveViewCharts.tsx` | 84 | `<YAxis tick={{ fontSize: 11 }} stroke="#6b7280" tickFormatter={yAxisUsd} />` |
| `#0B1F45` | `components/portfolio/ExecutiveViewCharts.tsx` | 131 | `<h3 className="text-sm font-semibold text-[#0B1F45]">Compliance mix</h3>` |
| `#fff` | `components/portfolio/ExecutiveViewCharts.tsx` | 150 | `<Cell key={${e.name}-${i}} fill={e.fill} stroke="#fff" strokeWidth={1} />` |
| `#0B1F45` | `components/portfolio/ExecutiveViewCharts.tsx` | 169 | `<p className="text-2xl font-bold text-[#0B1F45]">{fundCount}</p>` |
| `#0B1F45` | `components/portfolio/ExecutiveViewCharts.tsx` | 190 | `<h3 className="text-sm font-semibold text-[#0B1F45]">Capital allocation</h3>` |
| `#fff` | `components/portfolio/ExecutiveViewCharts.tsx` | 210 | `<Cell key={${e.name}-${i}} fill={e.fill} stroke="#fff" strokeWidth={1} />` |
| `#0B1F45` | `components/portfolio/ExecutiveViewCharts.tsx` | 229 | `<p className="text-xl font-bold text-[#0B1F45]">{allocationCenterPctOfCalled}%</p>` |
| `#EEF3FB` | `components/portfolio/FundAssessmentsTab.tsx` | 22 | `return 'bg-[#EEF3FB] text-gray-700 border border-[#D0DBED]';` |
| `#D0DBED` | `components/portfolio/FundAssessmentsTab.tsx` | 22 | `return 'bg-[#EEF3FB] text-gray-700 border border-[#D0DBED]';` |
| `#0B1F45` | `components/portfolio/FundAssessmentsTab.tsx` | 54 | `<path d={pts.d} fill="none" stroke="#0B1F45" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />` |
| `#0B1F45` | `components/portfolio/FundAssessmentsTab.tsx` | 100 | `<h2 className="text-base font-semibold text-[#0B1F45]">Quarterly assessments</h2>` |
| `#0F8A6E` | `components/portfolio/FundAssessmentsTab.tsx` | 104 | `<Button asChild className="bg-[#0F8A6E] hover:bg-[#0c6f58]">` |
| `#0c6f58` | `components/portfolio/FundAssessmentsTab.tsx` | 104 | `<Button asChild className="bg-[#0F8A6E] hover:bg-[#0c6f58]">` |
| `#0F8A6E` | `components/portfolio/FundAssessmentsTab.tsx` | 147 | `<Link href={/portfolio/funds/${fundId}/assessments/new} className="font-medium text-[#0F8A6E] underline">` |
| `#0B1F45` | `components/portfolio/FundAssessmentsTab.tsx` | 158 | `<td className="px-4 py-3 font-medium text-[#0B1F45]">{r.assessment_period}</td>` |
| `#0F8A6E` | `components/portfolio/FundAssessmentsTab.tsx` | 170 | `<Link href={/portfolio/funds/${fundId}/assessments/${r.id}} className="text-sm font-medium text-[#0F8A6E] hover:underline">` |
| `#0B1F45` | `components/portfolio/FundAssessmentsTab.tsx` | 179 | `className="inline-flex text-[#0B1F45] hover:text-[#0F8A6E]"` |
| `#0F8A6E` | `components/portfolio/FundAssessmentsTab.tsx` | 179 | `className="inline-flex text-[#0B1F45] hover:text-[#0F8A6E]"` |
| `#0F8A6E` | `components/portfolio/FundCapitalCallsTab.tsx` | 140 | `const barColor = pct >= 80 ? 'bg-[#0F8A6E]' : pct >= 50 ? 'bg-amber-500' : 'bg-[#0B1F45]';` |
| `#0B1F45` | `components/portfolio/FundCapitalCallsTab.tsx` | 140 | `const barColor = pct >= 80 ? 'bg-[#0F8A6E]' : pct >= 50 ? 'bg-amber-500' : 'bg-[#0B1F45]';` |
| `#0B1F45` | `components/portfolio/FundCapitalCallsTab.tsx` | 288 | `<div className="relative overflow-hidden rounded-xl border border-gray-200 border-t-4 border-t-[#0B1F45] bg-white p-5">` |
| `#0B1F45` | `components/portfolio/FundCapitalCallsTab.tsx` | 289 | `<p className="text-2xl font-bold text-[#0B1F45]">{fmtMoney(summary.currency, summary.total_called)}</p>` |
| `#0B1F45` | `components/portfolio/FundCapitalCallsTab.tsx` | 294 | `<p className="text-2xl font-bold text-[#0B1F45]">{fmtMoney(summary.currency, summary.remaining_commitment)}</p>` |
| `#0B1F45` | `components/portfolio/FundCapitalCallsTab.tsx` | 303 | `<p className="text-lg font-semibold text-[#0B1F45]">{fmtMoney(summary.currency, summary.fees_total)}</p>` |
| `#0B1F45` | `components/portfolio/FundCapitalCallsTab.tsx` | 307 | `<p className="text-lg font-semibold text-[#0B1F45]">{fmtMoney(summary.currency, summary.investments_total)}</p>` |
| `#0B1F45` | `components/portfolio/FundCapitalCallsTab.tsx` | 317 | `<p className="text-2xl font-bold text-[#0B1F45]">{unpaidCount}</p>` |
| `#0F8A6E` | `components/portfolio/FundCapitalCallsTab.tsx` | 320 | `<p className="mt-2 text-xs font-medium text-[#0F8A6E]">All settled</p>` |
| `#0B1F45` | `components/portfolio/FundCapitalCallsTab.tsx` | 329 | `<p className="text-sm font-medium text-[#0B1F45]">Commitment Deployed</p>` |
| `#0B1F45` | `components/portfolio/FundCapitalCallsTab.tsx` | 343 | `<Button type="button" className="bg-[#0B1F45] hover:bg-[#162d5e]" onClick={() => setAddOpen(true)}>` |
| `#162d5e` | `components/portfolio/FundCapitalCallsTab.tsx` | 343 | `<Button type="button" className="bg-[#0B1F45] hover:bg-[#162d5e]" onClick={() => setAddOpen(true)}>` |
| `#0B1F45` | `components/portfolio/FundCapitalCallsTab.tsx` | 379 | `<p className="font-semibold text-[#0B1F45]">Notice {c.notice_number}</p>` |
| `#0F8A6E` | `components/portfolio/FundCapitalCallsTab.tsx` | 395 | `<td className="px-4 py-3">{c.date_paid ? <span className="font-medium text-[#0F8A6E]">{fmtDate(c.date_paid)}</span> : <span className="text-â€¦` |
| `#0B1F45` | `components/portfolio/FundCapitalCallsTab.tsx` | 396 | `<td className="px-4 py-3 font-semibold text-[#0B1F45]">{fmtMoney(c.currency, num(c.call_amount))}</td>` |
| `#0B1F45` | `components/portfolio/FundCapitalCallsTab.tsx` | 403 | `<Button size="sm" type="button" className="bg-[#0B1F45] hover:bg-[#162d5e]" onClick={() => setPayOpen(c)}>` |
| `#162d5e` | `components/portfolio/FundCapitalCallsTab.tsx` | 403 | `<Button size="sm" type="button" className="bg-[#0B1F45] hover:bg-[#162d5e]" onClick={() => setPayOpen(c)}>` |
| `#0B1F45` | `components/portfolio/FundCapitalCallsTab.tsx` | 466 | `<td className="py-1.5 font-semibold text-[#0B1F45]">{fmtMoney(it.currency, num(it.amount))}</td>` |
| `#0B1F45` | `components/portfolio/FundCapitalCallsTab.tsx` | 491 | `<h2 className="text-lg font-semibold text-[#0B1F45]">New Capital Call</h2>` |
| `#0B1F45` | `components/portfolio/FundCapitalCallsTab.tsx` | 513 | `<h3 className="text-sm font-semibold text-[#0B1F45]">Call Breakdown</h3>` |
| `#0B1F45` | `components/portfolio/FundCapitalCallsTab.tsx` | 631 | `className="bg-[#0B1F45] hover:bg-[#162d5e]"` |
| `#162d5e` | `components/portfolio/FundCapitalCallsTab.tsx` | 631 | `className="bg-[#0B1F45] hover:bg-[#162d5e]"` |
| `#0B1F45` | `components/portfolio/FundCapitalCallsTab.tsx` | 652 | `<h2 className="text-lg font-semibold text-[#0B1F45]">Mark as Paid</h2>` |
| `#0B1F45` | `components/portfolio/FundCapitalCallsTab.tsx` | 665 | `<Button type="button" className="bg-[#0B1F45]" disabled={busy \|\| !payDate} onClick={() => void savePaid()}>` |
| `#0B1F45` | `components/portfolio/FundCapitalCallsTab.tsx` | 682 | `<h2 className="text-lg font-semibold text-[#0B1F45]">Edit Capital Call</h2>` |
| `#0B1F45` | `components/portfolio/FundCapitalCallsTab.tsx` | 695 | `<Button type="button" className="bg-[#0B1F45]" disabled={busy} onClick={() => void saveEdit()}>` |
| `#E1F5EE` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 64 | `bg: '#E1F5EE',` |
| `#085041` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 65 | `color: '#085041',` |
| `#5DCAA5` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 66 | `border: '#5DCAA5',` |
| `#FAEEDA` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 71 | `bg: '#FAEEDA',` |
| `#633806` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 72 | `color: '#633806',` |
| `#EF9F27` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 73 | `border: '#EF9F27',` |
| `#E6F1FB` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 78 | `bg: '#E6F1FB',` |
| `#0C447C` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 79 | `color: '#0C447C',` |
| `#85B7EB` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 80 | `border: '#85B7EB',` |
| `#F1EFE8` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 85 | `bg: '#F1EFE8',` |
| `#5F5E5A` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 86 | `color: '#5F5E5A',` |
| `#D3D1C7` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 87 | `border: '#D3D1C7',` |
| `#FCEBEB` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 92 | `bg: '#FCEBEB',` |
| `#791F1F` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 93 | `color: '#791F1F',` |
| `#F09595` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 94 | `border: '#F09595',` |
| `#E6F1FB` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 141 | `DFI: { bg: '#E6F1FB', color: '#185FA5' },` |
| `#185FA5` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 141 | `DFI: { bg: '#E6F1FB', color: '#185FA5' },` |
| `#FAEEDA` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 142 | `'Commercial Bank': { bg: '#FAEEDA', color: '#633806' },` |
| `#633806` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 142 | `'Commercial Bank': { bg: '#FAEEDA', color: '#633806' },` |
| `#EEEDFE` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 143 | `'Pension Fund': { bg: '#EEEDFE', color: '#534AB7' },` |
| `#534AB7` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 143 | `'Pension Fund': { bg: '#EEEDFE', color: '#534AB7' },` |
| `#E1F5EE` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 144 | `'Insurance Company': { bg: '#E1F5EE', color: '#085041' },` |
| `#085041` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 144 | `'Insurance Company': { bg: '#E1F5EE', color: '#085041' },` |
| `#FCEBEB` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 145 | `'Family Office': { bg: '#FCEBEB', color: '#791F1F' },` |
| `#791F1F` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 145 | `'Family Office': { bg: '#FCEBEB', color: '#791F1F' },` |
| `#F1EFE8` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 146 | `'Private Equity': { bg: '#F1EFE8', color: '#5F5E5A' },` |
| `#5F5E5A` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 146 | `'Private Equity': { bg: '#F1EFE8', color: '#5F5E5A' },` |
| `#FAEEDA` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 147 | `Government: { bg: '#FAEEDA', color: '#633806' },` |
| `#633806` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 147 | `Government: { bg: '#FAEEDA', color: '#633806' },` |
| `#F1EFE8` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 151 | `? (avatarColors[coinvestor.investor_type] ?? { bg: '#F1EFE8', color: '#5F5E5A' })` |
| `#5F5E5A` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 151 | `? (avatarColors[coinvestor.investor_type] ?? { bg: '#F1EFE8', color: '#5F5E5A' })` |
| `#F1EFE8` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 152 | `: { bg: '#F1EFE8', color: '#5F5E5A' };` |
| `#5F5E5A` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 152 | `: { bg: '#F1EFE8', color: '#5F5E5A' };` |
| `#0b1f45` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 192 | `color: '#0b1f45',` |
| `#9ca3af` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 200 | `<div style={{ fontSize: 10, color: '#9ca3af' }}>` |
| `#0b1f45` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 215 | `<div style={{ fontSize: 12, fontWeight: 500, color: '#0b1f45' }}>` |
| `#9ca3af` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 229 | `color: '#9ca3af',` |
| `#9ca3af` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 243 | `color: '#9ca3af',` |
| `#6b7280` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 503 | `color: '#6b7280',` |
| `#e5e7eb` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 523 | `border: '0.5px solid #e5e7eb',` |
| `#6b7280` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 533 | `color: '#6b7280',` |
| `#e5e7eb` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 552 | `border: '0.5px solid #e5e7eb',` |
| `#6b7280` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 569 | `color: '#6b7280',` |
| `#e5e7eb` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 590 | `border: '0.5px solid #e5e7eb',` |
| `#1D9E75` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 605 | `background: '#1D9E75',` |
| `#6b7280` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 629 | `color: '#6b7280',` |
| `#e5e7eb` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 630 | `border: '0.5px solid #e5e7eb',` |
| `#9ca3af` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 655 | `color: '#9ca3af',` |
| `#1D9E75` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 673 | `color: '#1D9E75',` |
| `#9ca3af` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 695 | `<div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 2 }}>Fund size</div>` |
| `#0b1f45` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 696 | `<div style={{ fontSize: 13, fontWeight: 500, color: '#0b1f45' }}>` |
| `#9ca3af` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 701 | `<div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 2 }}>DBJ stake</div>` |
| `#0b1f45` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 702 | `<div style={{ fontSize: 13, fontWeight: 500, color: '#0b1f45' }}>` |
| `#9ca3af` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 707 | `<div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 2 }}>LPs</div>` |
| `#0b1f45` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 708 | `<div style={{ fontSize: 13, fontWeight: 500, color: '#0b1f45' }}>` |
| `#E1F5EE` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 717 | `background: '#E1F5EE',` |
| `#0F6E56` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 730 | `<div style={{ fontSize: 12, color: '#0F6E56' }}>Leverage ratio</div>` |
| `#085041` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 731 | `<div style={{ fontSize: 17, fontWeight: 500, color: '#085041' }}>{data.leverage_ratio!.toFixed(1)}x</div>` |
| `#9FE1CB` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 737 | `background: '#9FE1CB',` |
| `#0F6E56` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 745 | `background: '#0F6E56',` |
| `#0F6E56` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 752 | `<div style={{ fontSize: 10, color: '#0F6E56', marginTop: 4 }}>` |
| `#f3f4f6` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 759 | `background: '#f3f4f6',` |
| `#9CA3AF` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 768 | `<i className="ti ti-alert-circle" style={{ fontSize: 14, color: '#9CA3AF' }} aria-hidden="true" />` |
| `#9ca3af` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 769 | `<div style={{ fontSize: 12, color: '#9ca3af' }}>` |
| `#e5e7eb` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 785 | `borderTop: '0.5px solid #e5e7eb',` |
| `#6b7280` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 797 | `<div style={{ fontSize: 12, color: '#6b7280' }}>Co-investors</div>` |
| `#1D9E75` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 804 | `color: '#1D9E75',` |
| `#9ca3af` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 825 | `color: '#9ca3af',` |
| `#6b7280` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 838 | `<span style={{ color: '#6b7280' }}>` |
| `#1D9E75` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 848 | `background: '#1D9E75',` |
| `#e5e7eb` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 864 | `border: '0.5px solid #e5e7eb',` |
| `#e5e7eb` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 886 | `borderTop: '0.5px solid #e5e7eb',` |
| `#9ca3af` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 892 | `<div style={{ fontSize: 11, color: '#9ca3af' }}>` |
| `#1D9E75` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 897 | `<div style={{ fontSize: 11, color: '#1D9E75', fontWeight: 500 }}>` |
| `#0B1F45` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 921 | `background: '#0B1F45',` |
| `#ffffff` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 936 | `background: '#ffffff',` |
| `#1D9E75` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 937 | `border: '0.5px solid #1D9E75',` |
| `#0B1F45` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 955 | `<h2 className="text-lg font-semibold text-[#0B1F45]">` |
| `#1D9E75` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 1015 | `<Button type="button" disabled={modalBusy} className="bg-[#1D9E75] hover:bg-[#178863]" onClick={() => void submitCoinvestor()}>` |
| `#178863` | `components/portfolio/fund-detail/CapitalStructureCard.tsx` | 1015 | `<Button type="button" disabled={modalBusy} className="bg-[#1D9E75] hover:bg-[#178863]" onClick={() => void submitCoinvestor()}>` |
| `#F1EFE8` | `components/portfolio/fund-detail/ClassificationCard.tsx` | 34 | `return { bg: '#F1EFE8', color: '#5F5E5A', border: '#D3D1C7', label: fundStatus.replace(/_/g, ' ') };` |
| `#5F5E5A` | `components/portfolio/fund-detail/ClassificationCard.tsx` | 34 | `return { bg: '#F1EFE8', color: '#5F5E5A', border: '#D3D1C7', label: fundStatus.replace(/_/g, ' ') };` |
| `#D3D1C7` | `components/portfolio/fund-detail/ClassificationCard.tsx` | 34 | `return { bg: '#F1EFE8', color: '#5F5E5A', border: '#D3D1C7', label: fundStatus.replace(/_/g, ' ') };` |
| `#E1F5EE` | `components/portfolio/fund-detail/ClassificationCard.tsx` | 37 | `return { bg: '#E1F5EE', color: '#085041', border: '#5DCAA5', label: fundStatus.replace(/_/g, ' ') };` |
| `#085041` | `components/portfolio/fund-detail/ClassificationCard.tsx` | 37 | `return { bg: '#E1F5EE', color: '#085041', border: '#5DCAA5', label: fundStatus.replace(/_/g, ' ') };` |
| `#5DCAA5` | `components/portfolio/fund-detail/ClassificationCard.tsx` | 37 | `return { bg: '#E1F5EE', color: '#085041', border: '#5DCAA5', label: fundStatus.replace(/_/g, ' ') };` |
| `#F1EFE8` | `components/portfolio/fund-detail/ClassificationCard.tsx` | 39 | `return { bg: '#F1EFE8', color: '#5F5E5A', border: '#D3D1C7', label: fundStatus.replace(/_/g, ' ') };` |
| `#5F5E5A` | `components/portfolio/fund-detail/ClassificationCard.tsx` | 39 | `return { bg: '#F1EFE8', color: '#5F5E5A', border: '#D3D1C7', label: fundStatus.replace(/_/g, ' ') };` |
| `#D3D1C7` | `components/portfolio/fund-detail/ClassificationCard.tsx` | 39 | `return { bg: '#F1EFE8', color: '#5F5E5A', border: '#D3D1C7', label: fundStatus.replace(/_/g, ' ') };` |
| `#E6F1FB` | `components/portfolio/fund-detail/ClassificationCard.tsx` | 59 | `background: '#E6F1FB',` |
| `#185FA5` | `components/portfolio/fund-detail/ClassificationCard.tsx` | 60 | `color: '#185FA5',` |
| `#85B7EB` | `components/portfolio/fund-detail/ClassificationCard.tsx` | 61 | `border: '0.5px solid #85B7EB',` |
| `#A32D2D` | `components/portfolio/fund-detail/ComplianceScorecardCard.tsx` | 13 | `if (pct === 0) return '#A32D2D';` |
| `#854F0B` | `components/portfolio/fund-detail/ComplianceScorecardCard.tsx` | 14 | `if (pct < 50) return '#854F0B';` |
| `#E24B4A` | `components/portfolio/fund-detail/ComplianceScorecardCard.tsx` | 19 | `if (pct === 0) return '#E24B4A';` |
| `#EF9F27` | `components/portfolio/fund-detail/ComplianceScorecardCard.tsx` | 20 | `if (pct < 50) return '#EF9F27';` |
| `#1D9E75` | `components/portfolio/fund-detail/ComplianceScorecardCard.tsx` | 21 | `return '#1D9E75';` |
| `#E1F5EE` | `components/portfolio/fund-detail/ComplianceScorecardCard.tsx` | 28 | `compliant: { bg: '#E1F5EE', color: '#085041', border: '#5DCAA5', label: 'Compliant' },` |
| `#085041` | `components/portfolio/fund-detail/ComplianceScorecardCard.tsx` | 28 | `compliant: { bg: '#E1F5EE', color: '#085041', border: '#5DCAA5', label: 'Compliant' },` |
| `#5DCAA5` | `components/portfolio/fund-detail/ComplianceScorecardCard.tsx` | 28 | `compliant: { bg: '#E1F5EE', color: '#085041', border: '#5DCAA5', label: 'Compliant' },` |
| `#FCEBEB` | `components/portfolio/fund-detail/ComplianceScorecardCard.tsx` | 29 | `'non-compliant': { bg: '#FCEBEB', color: '#791F1F', border: '#F09595', label: 'Non-compliant' },` |
| `#791F1F` | `components/portfolio/fund-detail/ComplianceScorecardCard.tsx` | 29 | `'non-compliant': { bg: '#FCEBEB', color: '#791F1F', border: '#F09595', label: 'Non-compliant' },` |
| `#F09595` | `components/portfolio/fund-detail/ComplianceScorecardCard.tsx` | 29 | `'non-compliant': { bg: '#FCEBEB', color: '#791F1F', border: '#F09595', label: 'Non-compliant' },` |
| `#FAEEDA` | `components/portfolio/fund-detail/ComplianceScorecardCard.tsx` | 30 | `partial: { bg: '#FAEEDA', color: '#633806', border: '#EF9F27', label: 'Partial' },` |
| `#633806` | `components/portfolio/fund-detail/ComplianceScorecardCard.tsx` | 30 | `partial: { bg: '#FAEEDA', color: '#633806', border: '#EF9F27', label: 'Partial' },` |
| `#EF9F27` | `components/portfolio/fund-detail/ComplianceScorecardCard.tsx` | 30 | `partial: { bg: '#FAEEDA', color: '#633806', border: '#EF9F27', label: 'Partial' },` |
| `#f3f4f6` | `components/portfolio/fund-detail/FundManagerCard.tsx` | 46 | `<div style={{ height: 12, background: '#f3f4f6', borderRadius: 4, marginBottom: 6 }} />` |
| `#f9fafb` | `components/portfolio/fund-detail/FundManagerCard.tsx` | 47 | `<div style={{ height: 10, width: '60%', background: '#f9fafb', borderRadius: 4 }} />` |
| `#b91c1c` | `components/portfolio/fund-detail/FundManagerCard.tsx` | 53 | `<div style={{ fontSize: 12, color: '#b91c1c' }}>` |
| `#1D9E75` | `components/portfolio/fund-detail/FundManagerCard.tsx` | 95 | `color: '#1D9E75',` |
| `#1D9E75` | `components/portfolio/fund-detail/FundManagerCard.tsx` | 97 | `border: '0.5px solid #1D9E75',` |
| `#E6F1FB` | `components/portfolio/fund-detail/FundManagerCard.tsx` | 118 | `background: '#E6F1FB',` |
| `#185FA5` | `components/portfolio/fund-detail/FundManagerCard.tsx` | 124 | `color: '#185FA5',` |
| `#1D9E75` | `components/portfolio/fund-detail/FundManagerCard.tsx` | 152 | `color: '#1D9E75',` |
| `#1D9E75` | `components/portfolio/fund-detail/FundManagerCard.tsx` | 155 | `border: '0.5px solid #1D9E75',` |
| `#1D9E75` | `components/portfolio/fund-detail/ReportingCard.tsx` | 30 | `color: '#1D9E75',` |
| `#E1F5EE` | `components/portfolio/fund-detail/StrategyCard.tsx` | 26 | `background: '#E1F5EE',` |
| `#0F6E56` | `components/portfolio/fund-detail/StrategyCard.tsx` | 27 | `color: '#0F6E56',` |
| `#5DCAA5` | `components/portfolio/fund-detail/StrategyCard.tsx` | 28 | `border: '0.5px solid #5DCAA5',` |
| `#E6F1FB` | `components/portfolio/fund-detail/StrategyCard.tsx` | 36 | `background: '#E6F1FB',` |
| `#185FA5` | `components/portfolio/fund-detail/StrategyCard.tsx` | 37 | `color: '#185FA5',` |
| `#85B7EB` | `components/portfolio/fund-detail/StrategyCard.tsx` | 38 | `border: '0.5px solid #85B7EB',` |
| `#FAEEDA` | `components/portfolio/fund-detail/StrategyCard.tsx` | 46 | `background: '#FAEEDA',` |
| `#633806` | `components/portfolio/fund-detail/StrategyCard.tsx` | 47 | `color: '#633806',` |
| `#EF9F27` | `components/portfolio/fund-detail/StrategyCard.tsx` | 48 | `border: '0.5px solid #EF9F27',` |
| `#EEF3FB` | `components/portfolio/FundDetailClient.tsx` | 85 | `pending: 'bg-[#EEF3FB] text-gray-700 border border-[#D0DBED]',` |
| `#D0DBED` | `components/portfolio/FundDetailClient.tsx` | 85 | `pending: 'bg-[#EEF3FB] text-gray-700 border border-[#D0DBED]',` |
| `#0F8A6E` | `components/portfolio/FundDetailClient.tsx` | 89 | `accepted: 'bg-emerald-50 text-[#0F8A6E] border border-emerald-200',` |
| `#EEF3FB` | `components/portfolio/FundDetailClient.tsx` | 92 | `waived: 'bg-[#EEF3FB] text-gray-600 border border-[#D0DBED]',` |
| `#D0DBED` | `components/portfolio/FundDetailClient.tsx` | 92 | `waived: 'bg-[#EEF3FB] text-gray-600 border border-[#D0DBED]',` |
| `#0B1F45` | `components/portfolio/FundDetailClient.tsx` | 566 | `className="mb-4 flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-[#0B1F45]"` |
| `#0B1F45` | `components/portfolio/FundDetailClient.tsx` | 573 | `<div className="grid gap-4 rounded-xl bg-[#0B1F45] p-6 text-white md:grid-cols-2">` |
| `#C8973A` | `components/portfolio/FundDetailClient.tsx` | 582 | `<p className="text-xl font-bold text-[#C8973A]">{fmtMoney(fund.currency, Number(fund.dbj_commitment))}</p>` |
| `#0B1F45` | `components/portfolio/FundDetailClient.tsx` | 609 | `tab === t.k ? 'bg-[#0B1F45] text-white' : 'text-gray-600 hover:bg-gray-100',` |
| `#0B1F45` | `components/portfolio/FundDetailClient.tsx` | 643 | `<h2 className="text-sm font-semibold text-[#0B1F45]">Reporting Status</h2>` |
| `#0B1F45` | `components/portfolio/FundDetailClient.tsx` | 661 | `<p className="text-2xl font-bold text-[#0B1F45]">{c.value}</p>` |
| `#0F8A6E` | `components/portfolio/FundDetailClient.tsx` | 698 | `<button type="button" className="text-sm text-[#0F8A6E] hover:underline" onClick={() => void downloadDoc(r.id)}>` |
| `#0F8A6E` | `components/portfolio/FundDetailClient.tsx` | 711 | `<Link href="#reporting" onClick={() => setTabNav('reporting')} className="mt-3 inline-block text-sm font-medium text-[#0F8A6E] hover:underliâ€¦` |
| `#F4F7FE` | `components/portfolio/FundDetailClient.tsx` | 860 | `<tr className="bg-[#F4F7FE]">` |
| `#0B1F45` | `components/portfolio/FundDetailClient.tsx` | 861 | `<td colSpan={8} className="px-3 py-3 text-sm text-[#0B1F45]">` |
| `#0B1F45` | `components/portfolio/FundDetailClient.tsx` | 870 | `className="bg-[#0B1F45] hover:bg-[#162d5e]"` |
| `#162d5e` | `components/portfolio/FundDetailClient.tsx` | 870 | `className="bg-[#0B1F45] hover:bg-[#162d5e]"` |
| `#0B1F45` | `components/portfolio/FundDetailClient.tsx` | 1012 | `<h3 className="text-lg font-semibold text-[#0B1F45]">Review submission</h3>` |
| `#0F8A6E` | `components/portfolio/FundDetailClient.tsx` | 1026 | `<Button type="button" className="bg-[#0F8A6E]" disabled={busy} onClick={() => void saveReview('accept')}>` |
| `#0B1F45` | `components/portfolio/FundDistributionsTab.tsx` | 235 | `<h2 className="text-lg font-semibold text-[#0B1F45]">{mode === 'add' ? 'New Distribution' : 'Edit Distribution'}</h2>` |
| `#0B1F45` | `components/portfolio/FundDistributionsTab.tsx` | 258 | `returnType === t ? 'border-2 border-[#0B1F45] bg-[#0B1F45]/5 text-[#0B1F45]' : 'border border-gray-200 text-gray-700 hover:bg-gray-50',` |
| `#0B1F45` | `components/portfolio/FundDistributionsTab.tsx` | 258 | `returnType === t ? 'border-2 border-[#0B1F45] bg-[#0B1F45]/5 text-[#0B1F45]' : 'border border-gray-200 text-gray-700 hover:bg-gray-50',` |
| `#0B1F45` | `components/portfolio/FundDistributionsTab.tsx` | 258 | `returnType === t ? 'border-2 border-[#0B1F45] bg-[#0B1F45]/5 text-[#0B1F45]' : 'border border-gray-200 text-gray-700 hover:bg-gray-50',` |
| `#0B1F45` | `components/portfolio/FundDistributionsTab.tsx` | 276 | `<span className="inline-flex rounded-full border border-gray-200 px-3 py-1 text-sm font-medium text-[#0B1F45]">` |
| `#0F8A6E` | `components/portfolio/FundDistributionsTab.tsx` | 280 | `<span className="inline-flex items-center gap-1 text-sm font-medium text-[#0F8A6E]">` |
| `#0B1F45` | `components/portfolio/FundDistributionsTab.tsx` | 328 | `className="bg-[#0B1F45] hover:bg-[#162d5e]"` |
| `#162d5e` | `components/portfolio/FundDistributionsTab.tsx` | 328 | `className="bg-[#0B1F45] hover:bg-[#162d5e]"` |
| `#0F8A6E` | `components/portfolio/FundDistributionsTab.tsx` | 356 | `<div className="relative overflow-hidden rounded-xl border border-gray-200 border-t-4 border-t-[#0F8A6E] bg-white p-5">` |
| `#0B1F45` | `components/portfolio/FundDistributionsTab.tsx` | 357 | `<p className="text-2xl font-bold text-[#0B1F45]">{fmtMoney(summary.currency, summary.total_amount)}</p>` |
| `#C8973A` | `components/portfolio/FundDistributionsTab.tsx` | 361 | `<div className="relative overflow-hidden rounded-xl border border-gray-200 border-t-4 border-t-[#C8973A] bg-white p-5">` |
| `#0B1F45` | `components/portfolio/FundDistributionsTab.tsx` | 362 | `<p className="text-2xl font-bold text-[#0B1F45]">{yieldPct.toFixed(1)}%</p>` |
| `#0B1F45` | `components/portfolio/FundDistributionsTab.tsx` | 367 | `<p className="text-2xl font-bold text-[#0B1F45]">` |
| `#0B1F45` | `components/portfolio/FundDistributionsTab.tsx` | 378 | `<span className="font-semibold text-[#0B1F45]">{fmtMoney(summary.currency, dividendTotal)}</span>` |
| `#0B1F45` | `components/portfolio/FundDistributionsTab.tsx` | 382 | `<span className="font-semibold text-[#0B1F45]">{fmtMoney(summary.currency, capGainTotal)}</span>` |
| `#0B1F45` | `components/portfolio/FundDistributionsTab.tsx` | 390 | `<p className="text-sm font-medium text-[#0B1F45]">Yield on Commitment</p>` |
| `#0F8A6E` | `components/portfolio/FundDistributionsTab.tsx` | 394 | `<div className="h-3 rounded-full bg-[#0F8A6E] transition-all" style={{ width: ${Math.min(100, yieldPct)}% }} />` |
| `#0B1F45` | `components/portfolio/FundDistributionsTab.tsx` | 402 | `<Button type="button" className="bg-[#0B1F45] hover:bg-[#162d5e]" onClick={() => openAdd()}>` |
| `#162d5e` | `components/portfolio/FundDistributionsTab.tsx` | 402 | `<Button type="button" className="bg-[#0B1F45] hover:bg-[#162d5e]" onClick={() => openAdd()}>` |
| `#0B1F45` | `components/portfolio/FundDistributionsTab.tsx` | 436 | `<p className="text-sm font-semibold text-[#0B1F45]">Distribution {d.distribution_number}</p>` |
| `#0F8A6E` | `components/portfolio/FundDistributionsTab.tsx` | 442 | `<td className="px-4 py-3 font-semibold text-[#0F8A6E]">{fmtMoney(d.currency, num(d.amount))}</td>` |
| `#0B1F45` | `components/portfolio/FundDivestmentsTab.tsx` | 99 | `<p className="text-2xl font-bold text-[#0B1F45]">{summary.total}</p>` |
| `#0B1F45` | `components/portfolio/FundDivestmentsTab.tsx` | 103 | `<p className="text-2xl font-bold text-[#0B1F45]">{money(fund.currency, summary.proceedsSum)}</p>` |
| `#0B1F45` | `components/portfolio/FundDivestmentsTab.tsx` | 107 | `<p className="text-2xl font-bold text-[#0B1F45]">{summary.moic == null ? 'â€”' : ${summary.moic.toFixed(2)}x}</p>` |
| `#0B1F45` | `components/portfolio/FundDivestmentsTab.tsx` | 114 | `<h3 className="text-sm font-semibold text-[#0B1F45]">Divestments</h3>` |
| `#0B1F45` | `components/portfolio/FundDivestmentsTab.tsx` | 116 | `<Button size="sm" className="bg-[#0B1F45] text-white hover:bg-[#162d5e]" onClick={() => setOpen(true)}>` |
| `#162d5e` | `components/portfolio/FundDivestmentsTab.tsx` | 116 | `<Button size="sm" className="bg-[#0B1F45] text-white hover:bg-[#162d5e]" onClick={() => setOpen(true)}>` |
| `#0B1F45` | `components/portfolio/FundDivestmentsTab.tsx` | 138 | `<td className="px-3 py-2 font-medium text-[#0B1F45]">{r.company_name}</td>` |
| `#0F8A6E` | `components/portfolio/FundDivestmentsTab.tsx` | 141 | `<td className="px-3 py-2 font-semibold text-[#0F8A6E]">{money(r.currency, Number(r.proceeds_received))}</td>` |
| `#0B1F45` | `components/portfolio/FundDivestmentsTab.tsx` | 154 | `<h3 className="text-lg font-semibold text-[#0B1F45]">Record Divestment</h3>` |
| `#0B1F45` | `components/portfolio/FundDivestmentsTab.tsx` | 189 | `<Button className="bg-[#0B1F45] text-white hover:bg-[#162d5e]" onClick={() => void create()} disabled={!company \|\| !date \|\| !original \|\| !prâ€¦` |
| `#162d5e` | `components/portfolio/FundDivestmentsTab.tsx` | 189 | `<Button className="bg-[#0B1F45] text-white hover:bg-[#162d5e]" onClick={() => void create()} disabled={!company \|\| !date \|\| !original \|\| !prâ€¦` |
| `#0B1F45` | `components/portfolio/FundManagerAssociateModal.tsx` | 144 | `<h2 className="text-sm font-semibold text-[#0B1F45]">Associate fund manager</h2>` |
| `#0B1F45` | `components/portfolio/FundManagerAssociateModal.tsx` | 152 | `className={cn('rounded-lg px-3 py-1.5 text-xs font-medium', tab === 'search' ? 'bg-[#0B1F45] text-white' : 'bg-gray-100 text-gray-600')}` |
| `#0B1F45` | `components/portfolio/FundManagerAssociateModal.tsx` | 159 | `className={cn('rounded-lg px-3 py-1.5 text-xs font-medium', tab === 'create' ? 'bg-[#0B1F45] text-white' : 'bg-gray-100 text-gray-600')}` |
| `#E6F7F6` | `components/portfolio/FundManagerAssociateModal.tsx` | 183 | `selectedId === h.id && 'bg-[#E6F7F6]',` |
| `#00A99D` | `components/portfolio/FundManagerAssociateModal.tsx` | 198 | `className="h-8 w-full border-[#00A99D] text-xs text-[#00A99D] hover:bg-[#E6F7F6]"` |
| `#00A99D` | `components/portfolio/FundManagerAssociateModal.tsx` | 198 | `className="h-8 w-full border-[#00A99D] text-xs text-[#00A99D] hover:bg-[#E6F7F6]"` |
| `#E6F7F6` | `components/portfolio/FundManagerAssociateModal.tsx` | 198 | `className="h-8 w-full border-[#00A99D] text-xs text-[#00A99D] hover:bg-[#E6F7F6]"` |
| `#00A99D` | `components/portfolio/FundManagerAssociateModal.tsx` | 231 | `className="h-8 w-full border-[#00A99D] text-xs text-[#00A99D] hover:bg-[#E6F7F6]"` |
| `#00A99D` | `components/portfolio/FundManagerAssociateModal.tsx` | 231 | `className="h-8 w-full border-[#00A99D] text-xs text-[#00A99D] hover:bg-[#E6F7F6]"` |
| `#E6F7F6` | `components/portfolio/FundManagerAssociateModal.tsx` | 231 | `className="h-8 w-full border-[#00A99D] text-xs text-[#00A99D] hover:bg-[#E6F7F6]"` |
| `#f3f4f6` | `components/portfolio/FundManagerRelationshipCard.tsx` | 202 | `background: '#f3f4f6',` |
| `#9ca3af` | `components/portfolio/FundManagerRelationshipCard.tsx` | 208 | `<i className="ti ti-user-plus" style={{ fontSize: 16, color: '#9ca3af' }} aria-hidden />` |
| `#0b1f45` | `components/portfolio/FundManagerRelationshipCard.tsx` | 211 | `<div style={{ fontSize: 13, fontWeight: 500, color: '#0b1f45', marginBottom: 2 }}>No manager linked</div>` |
| `#9ca3af` | `components/portfolio/FundManagerRelationshipCard.tsx` | 212 | `<div style={{ fontSize: 11, color: '#9ca3af', lineHeight: 1.5 }}>` |
| `#1D9E75` | `components/portfolio/FundManagerRelationshipCard.tsx` | 222 | `color: '#1D9E75',` |
| `#1D9E75` | `components/portfolio/FundManagerRelationshipCard.tsx` | 224 | `border: '0.5px solid #1D9E75',` |
| `#b91c1c` | `components/portfolio/FundManagerRelationshipCard.tsx` | 235 | `{error ? <p style={{ marginTop: 8, fontSize: 12, color: '#b91c1c' }}>{error}</p> : null}` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 239 | `<UserPlus className="mx-auto h-8 w-8 text-[#00A99D]" />` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 247 | `className="mt-3 h-8 border-[#00A99D] text-xs text-[#00A99D] hover:bg-[#E6F7F6]"` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 247 | `className="mt-3 h-8 border-[#00A99D] text-xs text-[#00A99D] hover:bg-[#E6F7F6]"` |
| `#E6F7F6` | `components/portfolio/FundManagerRelationshipCard.tsx` | 247 | `className="mt-3 h-8 border-[#00A99D] text-xs text-[#00A99D] hover:bg-[#E6F7F6]"` |
| `#E6F1FB` | `components/portfolio/FundManagerRelationshipCard.tsx` | 276 | `background: '#E6F1FB',` |
| `#185FA5` | `components/portfolio/FundManagerRelationshipCard.tsx` | 282 | `color: '#185FA5',` |
| `#0b1f45` | `components/portfolio/FundManagerRelationshipCard.tsx` | 293 | `color: '#0b1f45',` |
| `#6b7280` | `components/portfolio/FundManagerRelationshipCard.tsx` | 301 | `<div style={{ fontSize: 11, color: '#6b7280' }}>{manager.firm_name}</div>` |
| `#1D9E75` | `components/portfolio/FundManagerRelationshipCard.tsx` | 307 | `color: '#1D9E75',` |
| `#9ca3af` | `components/portfolio/FundManagerRelationshipCard.tsx` | 319 | `style={{ display: 'block', marginTop: 6, fontSize: 11, color: '#9ca3af' }}` |
| `#9ca3af` | `components/portfolio/FundManagerRelationshipCard.tsx` | 324 | `<p style={{ marginTop: 4, fontSize: 11, color: '#9ca3af' }}>` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 332 | `<Users className="h-4 w-4 shrink-0 text-[#00A99D]" />` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 344 | `<a href={mailto:${manager.email}} className="block text-xs text-gray-400 hover:text-[#00A99D]">` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 356 | `<Sparkles className="h-3 w-3 shrink-0 text-[#00A99D]" aria-hidden />` |
| `#E6F7F6` | `components/portfolio/FundManagerRelationshipCard.tsx` | 358 | `<span className="inline-flex items-center gap-1 rounded-full bg-[#E6F7F6] px-2 py-0.5 text-[10px] font-medium text-[#00A99D]">` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 358 | `<span className="inline-flex items-center gap-1 rounded-full bg-[#E6F7F6] px-2 py-0.5 text-[10px] font-medium text-[#00A99D]">` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 382 | `className="h-7 border-[#00A99D] px-2 text-xs text-[#00A99D] hover:bg-[#E6F7F6]"` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 382 | `className="h-7 border-[#00A99D] px-2 text-xs text-[#00A99D] hover:bg-[#E6F7F6]"` |
| `#E6F7F6` | `components/portfolio/FundManagerRelationshipCard.tsx` | 382 | `className="h-7 border-[#00A99D] px-2 text-xs text-[#00A99D] hover:bg-[#E6F7F6]"` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 401 | `className="mt-4 flex w-full items-center justify-center gap-1 text-xs font-medium text-[#00A99D] hover:text-[#008c82]"` |
| `#008c82` | `components/portfolio/FundManagerRelationshipCard.tsx` | 401 | `className="mt-4 flex w-full items-center justify-center gap-1 text-xs font-medium text-[#00A99D] hover:text-[#008c82]"` |
| `#e5e7eb` | `components/portfolio/FundManagerRelationshipCard.tsx` | 425 | `borderTop: '0.5px solid #e5e7eb',` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 431 | `<Sparkles className="h-3 w-3 shrink-0 text-[#00A99D]" aria-hidden />` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 438 | `<div className="flex items-center gap-1 text-xs font-semibold text-[#00A99D]">` |
| `#E6F7F6` | `components/portfolio/FundManagerRelationshipCard.tsx` | 469 | `<span className="inline-flex items-center gap-0.5 rounded-full bg-[#E6F7F6] px-1.5 py-0.5 text-[9px] font-medium text-[#00A99D]">` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 469 | `<span className="inline-flex items-center gap-0.5 rounded-full bg-[#E6F7F6] px-1.5 py-0.5 text-[9px] font-medium text-[#00A99D]">` |
| `#E6F7F6` | `components/portfolio/FundManagerRelationshipCard.tsx` | 484 | `<span className="inline-flex items-center gap-0.5 rounded-full bg-[#E6F7F6] px-1.5 py-0.5 text-[9px] font-medium text-[#00A99D]">` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 484 | `<span className="inline-flex items-center gap-0.5 rounded-full bg-[#E6F7F6] px-1.5 py-0.5 text-[9px] font-medium text-[#00A99D]">` |
| `#fafafa` | `components/portfolio/FundManagerRelationshipCard.tsx` | 489 | `<div className="flex divide-x divide-gray-100 overflow-hidden rounded-lg border border-gray-100 bg-[#fafafa]">` |
| `#E6F7F6` | `components/portfolio/FundManagerRelationshipCard.tsx` | 508 | `<span className="inline-flex items-center gap-0.5 rounded-full bg-[#E6F7F6] px-1.5 py-0.5 text-[9px] font-medium text-[#00A99D]">` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 508 | `<span className="inline-flex items-center gap-0.5 rounded-full bg-[#E6F7F6] px-1.5 py-0.5 text-[9px] font-medium text-[#00A99D]">` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 515 | `<div key={${e.date}-${i}} className="flex gap-2 border-l-2 border-[#00A99D] pl-3">` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 527 | `className="mt-2 text-xs font-medium text-[#00A99D] hover:underline"` |
| `#E6F7F6` | `components/portfolio/FundManagerRelationshipCard.tsx` | 541 | `<span className="inline-flex items-center gap-0.5 rounded-full bg-[#E6F7F6] px-1.5 py-0.5 text-[9px] font-medium text-[#00A99D]">` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 541 | `<span className="inline-flex items-center gap-0.5 rounded-full bg-[#E6F7F6] px-1.5 py-0.5 text-[9px] font-medium text-[#00A99D]">` |
| `#0B1F45` | `components/portfolio/FundManagerRelationshipCard.tsx` | 580 | `className="h-9 shrink-0 gap-2 bg-[#0B1F45] text-white hover:bg-[#162d5e]"` |
| `#162d5e` | `components/portfolio/FundManagerRelationshipCard.tsx` | 580 | `className="h-9 shrink-0 gap-2 bg-[#0B1F45] text-white hover:bg-[#162d5e]"` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 600 | `className="shrink-0 text-[#00A99D]"` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 620 | `className="mt-4 h-10 w-full gap-2 border-[#00A99D] text-sm text-[#00A99D] hover:bg-[#E6F7F6]"` |
| `#00A99D` | `components/portfolio/FundManagerRelationshipCard.tsx` | 620 | `className="mt-4 h-10 w-full gap-2 border-[#00A99D] text-sm text-[#00A99D] hover:bg-[#E6F7F6]"` |
| `#E6F7F6` | `components/portfolio/FundManagerRelationshipCard.tsx` | 620 | `className="mt-4 h-10 w-full gap-2 border-[#00A99D] text-sm text-[#00A99D] hover:bg-[#E6F7F6]"` |
| `#0F8A6E` | `components/portfolio/FundMonitoringClient.tsx` | 46 | `if (tone === 'teal') return 'bg-emerald-50 text-[#0F8A6E] border border-emerald-200';` |
| `#EEF3FB` | `components/portfolio/FundMonitoringClient.tsx` | 49 | `return 'bg-[#EEF3FB] text-gray-600 border border-[#D0DBED]';` |
| `#D0DBED` | `components/portfolio/FundMonitoringClient.tsx` | 49 | `return 'bg-[#EEF3FB] text-gray-600 border border-[#D0DBED]';` |
| `#0B1F45` | `components/portfolio/FundMonitoringClient.tsx` | 154 | `<h1 className="text-2xl font-bold text-[#0B1F45] sm:text-3xl">Fund Monitoring</h1>` |
| `#0B1F45` | `components/portfolio/FundMonitoringClient.tsx` | 168 | `<p className="text-3xl font-bold text-[#0B1F45]">{funds.length}</p>` |
| `#0B1F45` | `components/portfolio/FundMonitoringClient.tsx` | 173 | `<div className="absolute left-0 right-0 top-0 h-1 bg-[#0B1F45]" />` |
| `#0B1F45` | `components/portfolio/FundMonitoringClient.tsx` | 174 | `<div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1F45]/10 text-[#0B1F45]/70">` |
| `#0B1F45` | `components/portfolio/FundMonitoringClient.tsx` | 174 | `<div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1F45]/10 text-[#0B1F45]/70">` |
| `#0B1F45` | `components/portfolio/FundMonitoringClient.tsx` | 177 | `<p className="text-3xl font-bold text-[#0B1F45]">USD {Math.round(totalUsd).toLocaleString()}</p>` |
| `#C8973A` | `components/portfolio/FundMonitoringClient.tsx` | 182 | `<div className="absolute left-0 right-0 top-0 h-1 bg-[#C8973A]" />` |
| `#0B1F45` | `components/portfolio/FundMonitoringClient.tsx` | 186 | `<p className="text-3xl font-bold text-[#0B1F45]">{jmdCount}</p>` |
| `#0B1F45` | `components/portfolio/FundMonitoringClient.tsx` | 195 | `<p className="text-3xl font-bold text-[#0B1F45]">{attentionCount}</p>` |
| `#0B1F45` | `components/portfolio/FundMonitoringClient.tsx` | 203 | `<Building2 className="h-12 w-12 text-[#0B1F45]/25" />` |
| `#0B1F45` | `components/portfolio/FundMonitoringClient.tsx` | 204 | `<h2 className="mt-4 text-lg font-semibold text-[#0B1F45]">No active funds yet</h2>` |
| `#0F8A6E` | `components/portfolio/FundMonitoringClient.tsx` | 210 | `className="mt-6 text-sm font-semibold text-[#0F8A6E] underline-offset-2 hover:underline"` |
| `#0B1F45` | `components/portfolio/FundMonitoringClient.tsx` | 223 | `className="h-10 w-full max-w-md rounded-lg border border-gray-200 bg-white px-3 text-sm text-[#0B1F45] placeholder:text-gray-400 focus:bordeâ€¦` |
| `#0B1F45` | `components/portfolio/FundMonitoringClient.tsx` | 223 | `className="h-10 w-full max-w-md rounded-lg border border-gray-200 bg-white px-3 text-sm text-[#0B1F45] placeholder:text-gray-400 focus:bordeâ€¦` |
| `#0B1F45` | `components/portfolio/FundMonitoringClient.tsx` | 223 | `className="h-10 w-full max-w-md rounded-lg border border-gray-200 bg-white px-3 text-sm text-[#0B1F45] placeholder:text-gray-400 focus:bordeâ€¦` |
| `#F8F9FF` | `components/portfolio/FundMonitoringClient.tsx` | 310 | `<tr key={f.id} className="hover:bg-[#F8F9FF]">` |
| `#0B1F45` | `components/portfolio/FundMonitoringClient.tsx` | 313 | `<p className="font-semibold text-[#0B1F45]">{f.fund_name}</p>` |
| `#0B1F45` | `components/portfolio/FundMonitoringClient.tsx` | 315 | `<span className="inline-flex shrink-0 rounded-full bg-[#0B1F45] px-2 py-0.5 text-[10px] font-medium text-white">` |
| `#0B1F45` | `components/portfolio/FundMonitoringClient.tsx` | 359 | `className="inline-flex items-center rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-500 transition-colors hover:border-[#0B1â€¦` |
| `#0B1F45` | `components/portfolio/FundMonitoringClient.tsx` | 359 | `className="inline-flex items-center rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-500 transition-colors hover:border-[#0B1â€¦` |
| `#0B1F45` | `components/portfolio/FundPctuProfileEditor.tsx` | 59 | `<div className="text-sm font-semibold text-[#0B1F45]">{title}</div>` |
| `#0B1F45` | `components/portfolio/FundPctuProfileEditor.tsx` | 263 | `<input type="checkbox" checked={profile.investment_committee.has_ic} onChange={(e) => setIc({ has_ic: e.target.checked })} className="accentâ€¦` |
| `#0B1F45` | `components/portfolio/FundPctuProfileEditor.tsx` | 353 | `<Button type="button" disabled={busy} className="bg-[#0B1F45] hover:bg-[#162d5e]" onClick={() => void save()}>` |
| `#162d5e` | `components/portfolio/FundPctuProfileEditor.tsx` | 353 | `<Button type="button" disabled={busy} className="bg-[#0B1F45] hover:bg-[#162d5e]" onClick={() => void save()}>` |
| `#F8F9FF` | `components/portfolio/FundPerformanceSnapshotModal.tsx` | 39 | `<div className="mt-3 rounded-lg border border-gray-200 bg-[#F8F9FF] px-3 py-2 text-xs">` |
| `#0B1F45` | `components/portfolio/FundPerformanceSnapshotModal.tsx` | 40 | `<p className="font-medium text-[#0B1F45]">Extraction confidence</p>` |
| `#0B1F45` | `components/portfolio/FundPerformanceSnapshotModal.tsx` | 188 | `<h2 className="text-lg font-semibold text-[#0B1F45]">{mode === 'add' ? 'Add performance snapshot' : 'Edit snapshot'}</h2>` |
| `#0B1F45` | `components/portfolio/FundPerformanceTab.tsx` | 152 | `<h2 className="text-sm font-semibold text-[#0B1F45]">Performance metrics</h2>` |
| `#0B1F45` | `components/portfolio/FundPerformanceTab.tsx` | 176 | `<p className="mt-2 text-xl font-bold text-[#0B1F45]">{t.value}</p>` |
| `#0F8A6E` | `components/portfolio/FundPerformanceTab.tsx` | 190 | `<p className="mt-1 text-lg font-semibold text-[#0F8A6E]">` |
| `#0B1F45` | `components/portfolio/FundPerformanceTab.tsx` | 210 | `<h3 className="text-sm font-semibold text-[#0B1F45]">Cash flows &amp; NAV</h3>` |
| `#e5e7eb` | `components/portfolio/FundPerformanceTab.tsx` | 218 | `<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />` |
| `#C8973A` | `components/portfolio/FundPerformanceTab.tsx` | 230 | `<Bar dataKey="callOut" name="Capital calls" stackId="flows" fill="#C8973A" />` |
| `#0F8A6E` | `components/portfolio/FundPerformanceTab.tsx` | 231 | `<Bar dataKey="distIn" name="Distributions" stackId="flows" fill="#0F8A6E" />` |
| `#0B1F45` | `components/portfolio/FundPerformanceTab.tsx` | 233 | `<Area type="stepAfter" dataKey="nav" name="NAV" stroke="#0B1F45" fill="#0B1F45" fillOpacity={0.08} connectNulls />` |
| `#0B1F45` | `components/portfolio/FundPerformanceTab.tsx` | 233 | `<Area type="stepAfter" dataKey="nav" name="NAV" stroke="#0B1F45" fill="#0B1F45" fillOpacity={0.08} connectNulls />` |
| `#0B1F45` | `components/portfolio/FundPerformanceTab.tsx` | 243 | `<h3 className="text-sm font-semibold text-[#0B1F45]">Snapshot history</h3>` |
| `#F8F9FF` | `components/portfolio/FundPerformanceTab.tsx` | 267 | `<tr key={r.id} className="hover:bg-[#F8F9FF]">` |
| `#0B1F45` | `components/portfolio/FundPerformanceTab.tsx` | 268 | `<td className="px-4 py-2 font-medium text-[#0B1F45]">` |
| `#0B1F45` | `components/portfolio/FundSettingsShell.tsx` | 68 | `'w-full border-l-2 py-2 pl-3 text-left text-sm text-gray-500 transition-colors hover:text-[#0B1F45]',` |
| `#0B1F45` | `components/portfolio/FundSettingsShell.tsx` | 70 | `? 'border-[#0B1F45] bg-[#EEF2F7] font-medium text-[#0B1F45] rounded-r-md'` |
| `#EEF2F7` | `components/portfolio/FundSettingsShell.tsx` | 70 | `? 'border-[#0B1F45] bg-[#EEF2F7] font-medium text-[#0B1F45] rounded-r-md'` |
| `#0B1F45` | `components/portfolio/FundSettingsShell.tsx` | 70 | `? 'border-[#0B1F45] bg-[#EEF2F7] font-medium text-[#0B1F45] rounded-r-md'` |
| `#0B1F45` | `components/portfolio/FundSettingsTab.tsx` | 13 | `'w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-[#0B1F45] focus:ring-2 focus:ring-[#0B1F45â€¦` |
| `#0B1F45` | `components/portfolio/FundSettingsTab.tsx` | 13 | `'w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 focus:border-[#0B1F45] focus:ring-2 focus:ring-[#0B1F45â€¦` |
| `#0B1F45` | `components/portfolio/FundSettingsTab.tsx` | 185 | `<p className="text-sm font-medium text-[#0B1F45]">Fund Settings</p>` |
| `#0B1F45` | `components/portfolio/FundSettingsTab.tsx` | 192 | `<Button type="submit" disabled={busy} className="bg-[#0B1F45] hover:bg-[#162d5e]">` |
| `#162d5e` | `components/portfolio/FundSettingsTab.tsx` | 192 | `<Button type="submit" disabled={busy} className="bg-[#0B1F45] hover:bg-[#162d5e]">` |
| `#0B1F45` | `components/portfolio/FundSettingsTab.tsx` | 205 | `<h2 className="text-sm font-semibold text-[#0B1F45]">Fund Identity</h2>` |
| `#0B1F45` | `components/portfolio/FundSettingsTab.tsx` | 250 | `<input id="listed" name="listed" type="checkbox" defaultChecked={fund.listed} className="accent-[#0B1F45]" />` |
| `#0B1F45` | `components/portfolio/FundSettingsTab.tsx` | 281 | `<h2 className="text-sm font-semibold text-[#0B1F45]">Commitment</h2>` |
| `#0B1F45` | `components/portfolio/FundSettingsTab.tsx` | 387 | `className="mt-0.5 accent-[#0B1F45]"` |
| `#0B1F45` | `components/portfolio/FundSettingsTab.tsx` | 406 | `<h2 className="text-sm font-semibold text-[#0B1F45]">Reporting Cadence</h2>` |
| `#0B1F45` | `components/portfolio/FundSettingsTab.tsx` | 471 | `'flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors hover:border-[#0B1F45]/30',` |
| `#0B1F45` | `components/portfolio/FundSettingsTab.tsx` | 472 | `'has-[:checked]:border-[#0B1F45] has-[:checked]:bg-[#0B1F45]/5',` |
| `#0B1F45` | `components/portfolio/FundSettingsTab.tsx` | 472 | `'has-[:checked]:border-[#0B1F45] has-[:checked]:bg-[#0B1F45]/5',` |
| `#0B1F45` | `components/portfolio/FundSettingsTab.tsx` | 487 | `className="mt-0.5 accent-[#0B1F45]"` |
| `#0B1F45` | `components/portfolio/FundSettingsTab.tsx` | 506 | `<h2 className="text-sm font-semibold text-[#0B1F45]">Contacts & Notes</h2>` |
| `#0B1F45` | `components/portfolio/FundSettingsTab.tsx` | 515 | `className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-600 transition-colors hover:border-[#0B1F45] hover:text-[#0B1F45]â€¦` |
| `#0B1F45` | `components/portfolio/FundSettingsTab.tsx` | 515 | `className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-600 transition-colors hover:border-[#0B1F45] hover:text-[#0B1F45]â€¦` |
| `#EEF3FB` | `components/portfolio/MarkReceivedSlideOver.tsx` | 36 | `pending: 'bg-[#EEF3FB] text-gray-700 border border-[#D0DBED]',` |
| `#D0DBED` | `components/portfolio/MarkReceivedSlideOver.tsx` | 36 | `pending: 'bg-[#EEF3FB] text-gray-700 border border-[#D0DBED]',` |
| `#0F8A6E` | `components/portfolio/MarkReceivedSlideOver.tsx` | 40 | `accepted: 'bg-emerald-50 text-[#0F8A6E] border border-emerald-200',` |
| `#EEF3FB` | `components/portfolio/MarkReceivedSlideOver.tsx` | 43 | `waived: 'bg-[#EEF3FB] text-gray-600 border border-[#D0DBED]',` |
| `#D0DBED` | `components/portfolio/MarkReceivedSlideOver.tsx` | 43 | `waived: 'bg-[#EEF3FB] text-gray-600 border border-[#D0DBED]',` |
| `#0B1F45` | `components/portfolio/MarkReceivedSlideOver.tsx` | 227 | `<h3 className="text-lg font-semibold text-[#0B1F45]">Mark as Received</h3>` |
| `#0B1F45` | `components/portfolio/MarkReceivedSlideOver.tsx` | 247 | `<Button type="button" size="sm" className="bg-[#0B1F45] hover:bg-[#162d5e]" disabled={extractAllBusy} onClick={() => void runExtractAll()}>` |
| `#162d5e` | `components/portfolio/MarkReceivedSlideOver.tsx` | 247 | `<Button type="button" size="sm" className="bg-[#0B1F45] hover:bg-[#162d5e]" disabled={extractAllBusy} onClick={() => void runExtractAll()}>` |
| `#0B1F45` | `components/portfolio/MarkReceivedSlideOver.tsx` | 262 | `<span className="font-medium text-[#0B1F45]">{REPORT_LABELS[obligation.report_type] ?? obligation.report_type}</span>` |
| `#0F8A6E` | `components/portfolio/MarkReceivedSlideOver.tsx` | 289 | `{file ? <span className="mt-2 text-xs font-medium text-[#0F8A6E]">{file.name}</span> : null}` |
| `#0F8A6E` | `components/portfolio/MarkReceivedSlideOver.tsx` | 314 | `<span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0F8A6E]" />` |
| `#0B1F45` | `components/portfolio/MarkReceivedSlideOver.tsx` | 316 | `<p className="font-medium text-[#0B1F45]">{a.action_type.replace(/_/g, ' ')}</p>` |
| `#0B1F45` | `components/portfolio/MarkReceivedSlideOver.tsx` | 333 | `<Button type="button" className="bg-[#0B1F45] hover:bg-[#162d5e]" disabled={busy \|\| !recvDate \|\| !recvBy.trim()} onClick={() => void save()}â€¦` |
| `#162d5e` | `components/portfolio/MarkReceivedSlideOver.tsx` | 333 | `<Button type="button" className="bg-[#0B1F45] hover:bg-[#162d5e]" disabled={busy \|\| !recvDate \|\| !recvBy.trim()} onClick={() => void save()}â€¦` |
| `#0B1F45` | `components/portfolio/NarrativeExtractFormBody.tsx` | 153 | `<h3 className="text-sm font-semibold text-[#0B1F45]">Narrative sections</h3>` |
| `#0B1F45` | `components/portfolio/NarrativeExtractFormBody.tsx` | 172 | `<h3 className="text-sm font-semibold text-[#0B1F45]">Fund profile (from report)</h3>` |
| `#0B1F45` | `components/portfolio/NarrativeExtractFormBody.tsx` | 268 | `<h3 className="text-sm font-semibold text-[#0B1F45]">Indicators</h3>` |
| `#0B1F45` | `components/portfolio/NarrativeExtractFormBody.tsx` | 311 | `<h3 className="text-sm font-semibold text-[#0B1F45]">Sector allocation %</h3>` |
| `#0B1F45` | `components/portfolio/NarrativeExtractFormBody.tsx` | 363 | `<h3 className="text-sm font-semibold text-[#0B1F45]">Geographic allocation %</h3>` |
| `#0B1F45` | `components/portfolio/NarrativeExtractFormBody.tsx` | 414 | `<h3 className="text-sm font-semibold text-[#0B1F45]">Fund LPs</h3>` |
| `#0B1F45` | `components/portfolio/NarrativeExtractFormBody.tsx` | 489 | `<h3 className="text-sm font-semibold text-[#0B1F45]">Pipeline stats</h3>` |
| `#0B1F45` | `components/portfolio/NarrativeExtractFormBody.tsx` | 604 | `<h3 className="text-sm font-semibold text-[#0B1F45]">Capital account (from report)</h3>` |
| `#0B1F45` | `components/portfolio/NarrativeExtractReviewModal.tsx` | 72 | `<h2 className="text-lg font-semibold text-[#0B1F45]">Review narrative extraction</h2>` |
| `#0B1F45` | `components/portfolio/NarrativeExtractReviewModal.tsx` | 87 | `<Button type="button" className="bg-[#0B1F45] hover:bg-[#162d5e]" disabled={busy} onClick={() => void save()}>` |
| `#162d5e` | `components/portfolio/NarrativeExtractReviewModal.tsx` | 87 | `<Button type="button" className="bg-[#0B1F45] hover:bg-[#162d5e]" disabled={busy} onClick={() => void save()}>` |
| `#F8F9FF` | `components/portfolio/NavTableRow.tsx` | 21 | `className={cn('cursor-pointer transition-colors hover:bg-[#F8F9FF]', className)}` |
| `#0B1F45` | `components/portfolio/PctuReportTemplate.tsx` | 25 | `const NAVY = '#0B1F45';` |
| `#FFD700` | `components/portfolio/PctuReportTemplate.tsx` | 26 | `const YELLOW = '#FFD700';` |
| `#2E8B8B` | `components/portfolio/PctuReportTemplate.tsx` | 27 | `const TEAL = '#2E8B8B';` |
| `#D4A43C` | `components/portfolio/PctuReportTemplate.tsx` | 28 | `const AMBER = '#D4A43C';` |
| `#5B7C99` | `components/portfolio/PctuReportTemplate.tsx` | 29 | `const CHART_COLORS = [NAVY, TEAL, AMBER, '#5B7C99', '#1a4d7a', '#4a6fa5', '#0d3d66'];` |
| `#1a4d7a` | `components/portfolio/PctuReportTemplate.tsx` | 29 | `const CHART_COLORS = [NAVY, TEAL, AMBER, '#5B7C99', '#1a4d7a', '#4a6fa5', '#0d3d66'];` |
| `#4a6fa5` | `components/portfolio/PctuReportTemplate.tsx` | 29 | `const CHART_COLORS = [NAVY, TEAL, AMBER, '#5B7C99', '#1a4d7a', '#4a6fa5', '#0d3d66'];` |
| `#0d3d66` | `components/portfolio/PctuReportTemplate.tsx` | 29 | `const CHART_COLORS = [NAVY, TEAL, AMBER, '#5B7C99', '#1a4d7a', '#4a6fa5', '#0d3d66'];` |
| `#111` | `components/portfolio/PctuReportTemplate.tsx` | 35 | `color: '#111',` |
| `#0B1F45` | `components/portfolio/PctuReportTemplate.tsx` | 160 | `<div className="flex h-[180px] items-center justify-center border border-[#0B1F45] text-sm" style={{ borderWidth: '0.5px' }}>` |
| `#F8F8F8` | `components/portfolio/PctuReportTemplate.tsx` | 402 | `<tr key={${p.name}-${i}} style={{ backgroundColor: i % 2 === 1 ? '#F8F8F8' : '#fff' }}>` |
| `#fff` | `components/portfolio/PctuReportTemplate.tsx` | 402 | `<tr key={${p.name}-${i}} style={{ backgroundColor: i % 2 === 1 ? '#F8F8F8' : '#fff' }}>` |
| `#F8F8F8` | `components/portfolio/PctuReportTemplate.tsx` | 471 | `<tr key={label} style={{ backgroundColor: i % 2 === 1 ? '#F8F8F8' : '#fff' }}>` |
| `#fff` | `components/portfolio/PctuReportTemplate.tsx` | 471 | `<tr key={label} style={{ backgroundColor: i % 2 === 1 ? '#F8F8F8' : '#fff' }}>` |
| `#fff` | `components/portfolio/PctuReportTemplate.tsx` | 476 | `<tr style={{ backgroundColor: '#fff' }}>` |
| `#F8F8F8` | `components/portfolio/PctuReportTemplate.tsx` | 480 | `<tr style={{ backgroundColor: '#F8F8F8' }}>` |
| `#fff` | `components/portfolio/PctuReportTemplate.tsx` | 484 | `<tr style={{ backgroundColor: '#fff' }}>` |
| `#F8F8F8` | `components/portfolio/PctuReportTemplate.tsx` | 494 | `<tr key={label} style={{ backgroundColor: i % 2 === 0 ? '#F8F8F8' : '#fff' }}>` |
| `#fff` | `components/portfolio/PctuReportTemplate.tsx` | 494 | `<tr key={label} style={{ backgroundColor: i % 2 === 0 ? '#F8F8F8' : '#fff' }}>` |
| `#F8F8F8` | `components/portfolio/PctuReportTemplate.tsx` | 516 | `<tr className="bg-[#F8F8F8]">` |
| `#F8F8F8` | `components/portfolio/PctuReportTemplate.tsx` | 524 | `<tr key={${lp.name}-${i}} style={{ backgroundColor: i % 2 === 1 ? '#F8F8F8' : '#fff' }}>` |
| `#fff` | `components/portfolio/PctuReportTemplate.tsx` | 524 | `<tr key={${lp.name}-${i}} style={{ backgroundColor: i % 2 === 1 ? '#F8F8F8' : '#fff' }}>` |
| `#0B1F45` | `components/portfolio/PctuReportTemplate.tsx` | 750 | `<p className="m-0 font-bold text-[#0B1F45]">Assessment summary (screen only)</p>` |
| `#16a34a` | `components/portfolio/PortfolioCharts.tsx` | 22 | `performing: '#16a34a',` |
| `#eab308` | `components/portfolio/PortfolioCharts.tsx` | 23 | `watch: '#eab308',` |
| `#ea580c` | `components/portfolio/PortfolioCharts.tsx` | 24 | `underperforming: '#ea580c',` |
| `#dc2626` | `components/portfolio/PortfolioCharts.tsx` | 25 | `critical: '#dc2626',` |
| `#16a34a` | `components/portfolio/PortfolioCharts.tsx` | 29 | `current: '#16a34a',` |
| `#eab308` | `components/portfolio/PortfolioCharts.tsx` | 30 | `delinquent: '#eab308',` |
| `#dc2626` | `components/portfolio/PortfolioCharts.tsx` | 31 | `default: '#dc2626',` |
| `#0f766e` | `components/portfolio/PortfolioCharts.tsx` | 133 | `<Line type="monotone" dataKey="amount_usd" name="Deployed" stroke="#0f766e" strokeWidth={2} dot />` |
| `#0d9488` | `components/portfolio/PortfolioCharts.tsx` | 166 | `<Bar dataKey="amount_usd" name="Approved" fill="#0d9488" radius={[0, 4, 4, 0]} />` |
| `#0B1F45` | `components/portfolio/PortfolioComingSoon.tsx` | 22 | `<Icon className="h-12 w-12 text-[#0B1F45]/30" aria-hidden />` |
| `#0B1F45` | `components/portfolio/PortfolioComingSoon.tsx` | 23 | `<h2 className="mt-4 text-lg font-semibold text-[#0B1F45]">{title}</h2>` |
| `#C8973A` | `components/portfolio/PortfolioComingSoon.tsx` | 25 | `<p className="mt-4 text-xs font-medium uppercase tracking-wide text-[#C8973A]">{footnote}</p>` |
| `#0B1F45` | `components/portfolio/PortfolioEpic4Strip.tsx` | 60 | `<h2 className="text-lg font-semibold text-[#0B1F45]">Fund commitments &amp; reporting</h2>` |
| `#0B1F45` | `components/portfolio/PortfolioEpic4Strip.tsx` | 66 | `className="rounded-lg bg-[#0B1F45] px-4 py-2 text-sm font-medium text-white hover:bg-[#162d5e]"` |
| `#162d5e` | `components/portfolio/PortfolioEpic4Strip.tsx` | 66 | `className="rounded-lg bg-[#0B1F45] px-4 py-2 text-sm font-medium text-white hover:bg-[#162d5e]"` |
| `#0B1F45` | `components/portfolio/PortfolioEpic4Strip.tsx` | 72 | `className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-[#0B1F45] hover:bg-gray-50"` |
| `#EEF3FB` | `components/portfolio/PortfolioEpic4Strip.tsx` | 84 | `'flex items-center gap-3 rounded-lg border border-gray-100 bg-[#EEF3FB] px-4 py-3 transition hover:border-[#C8973A]/40',` |
| `#C8973A` | `components/portfolio/PortfolioEpic4Strip.tsx` | 84 | `'flex items-center gap-3 rounded-lg border border-gray-100 bg-[#EEF3FB] px-4 py-3 transition hover:border-[#C8973A]/40',` |
| `#C8973A` | `components/portfolio/PortfolioEpic4Strip.tsx` | 87 | `<c.icon className="h-8 w-8 shrink-0 text-[#C8973A]" aria-hidden />` |
| `#0B1F45` | `components/portfolio/PortfolioEpic4Strip.tsx` | 89 | `<p className="text-2xl font-bold text-[#0B1F45]">{c.value}</p>` |
| `#0B1F45` | `components/portfolio/PortfolioReportingCalendar.tsx` | 399 | `<h3 className="mt-1 truncate text-lg font-semibold text-[#0B1F45]">{slide.fund_name}</h3>` |
| `#0B1F45` | `components/portfolio/PortfolioReportingCalendar.tsx` | 403 | `className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-[#0B1F45]"` |
| `#0B1F45` | `components/portfolio/PortfolioReportingCalendar.tsx` | 431 | `className="w-full bg-[#0B1F45] hover:bg-[#162d5e]"` |
| `#162d5e` | `components/portfolio/PortfolioReportingCalendar.tsx` | 431 | `className="w-full bg-[#0B1F45] hover:bg-[#162d5e]"` |
| `#0F8A6E` | `components/portfolio/PortfolioReportingCalendar.tsx` | 442 | `className="w-full bg-[#0F8A6E] hover:bg-[#0c6f58]"` |
| `#0c6f58` | `components/portfolio/PortfolioReportingCalendar.tsx` | 442 | `className="w-full bg-[#0F8A6E] hover:bg-[#0c6f58]"` |
| `#0B1F45` | `components/portfolio/PortfolioReportingCalendar.tsx` | 499 | `<Button type="button" size="sm" className="bg-[#0B1F45] hover:bg-[#162d5e]" disabled={snapExtractBusy} onClick={() => void runReportExtractAâ€¦` |
| `#162d5e` | `components/portfolio/PortfolioReportingCalendar.tsx` | 499 | `<Button type="button" size="sm" className="bg-[#0B1F45] hover:bg-[#162d5e]" disabled={snapExtractBusy} onClick={() => void runReportExtractAâ€¦` |
| `#0B1F45` | `components/portfolio/PortfolioReportingCalendar.tsx` | 527 | `<h1 className="text-2xl font-bold text-[#0B1F45] sm:text-3xl">Reporting Calendar</h1>` |
| `#0B1F45` | `components/portfolio/PortfolioReportingCalendar.tsx` | 539 | `<span className="min-w-[10rem] text-center text-lg font-semibold text-[#0B1F45]">{monthLabel}</span>` |
| `#0B1F45` | `components/portfolio/PortfolioReportingCalendar.tsx` | 557 | `<p className="text-3xl font-bold text-[#0B1F45]">{stats.dueMonth}</p>` |
| `#0B1F45` | `components/portfolio/PortfolioReportingCalendar.tsx` | 565 | `<p className="text-3xl font-bold text-[#0B1F45]">{stats.overdue}</p>` |
| `#0B1F45` | `components/portfolio/PortfolioReportingCalendar.tsx` | 574 | `<p className="text-3xl font-bold text-[#0B1F45]">{stats.pendingReview}</p>` |
| `#0F8A6E` | `components/portfolio/PortfolioReportingCalendar.tsx` | 578 | `<div className="absolute left-0 right-0 top-0 h-1 bg-[#0F8A6E]" />` |
| `#0F8A6E` | `components/portfolio/PortfolioReportingCalendar.tsx` | 579 | `<div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/15 text-[#0F8A6E]">` |
| `#0B1F45` | `components/portfolio/PortfolioReportingCalendar.tsx` | 582 | `<p className="text-3xl font-bold text-[#0B1F45]">{stats.acceptedThisMonth}</p>` |
| `#0B1F45` | `components/portfolio/PortfolioReportingCalendar.tsx` | 639 | `<span className="text-sm font-semibold text-[#0B1F45]">Schedule</span>` |
| `#0B1F45` | `components/portfolio/PortfolioReportingCalendar.tsx` | 646 | `view === 'month' ? 'bg-[#0B1F45] text-white' : 'text-gray-500 hover:bg-gray-50',` |
| `#0B1F45` | `components/portfolio/PortfolioReportingCalendar.tsx` | 656 | `view === 'list' ? 'bg-[#0B1F45] text-white' : 'text-gray-500 hover:bg-gray-50',` |
| `#0B1F45` | `components/portfolio/PortfolioReportingCalendar.tsx` | 694 | `<span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0B1F45] text-sm font-medium text-white">` |
| `#0B1F45` | `components/portfolio/PortfolioReportingCalendar.tsx` | 740 | `<h3 className="mb-4 border-l-4 border-amber-400 pl-4 text-sm font-semibold text-[#0B1F45]">` |
| `#F8F9FF` | `components/portfolio/PortfolioReportingCalendar.tsx` | 751 | `<tr key={o.id} className="hover:bg-[#F8F9FF]">` |
| `#0B1F45` | `components/portfolio/PortfolioReportingCalendar.tsx` | 752 | `<td className="px-3 py-2 font-medium text-[#0B1F45]">{o.fund_name}</td>` |
| `#0F8A6E` | `components/portfolio/PortfolioReportingCalendar.tsx` | 759 | `<button type="button" className="text-xs font-medium text-[#0F8A6E] hover:underline" onClick={() => setSlide(o)}>` |
| `#0B1F45` | `components/portfolio/PortfolioReportingCalendar.tsx` | 797 | `<h2 className="font-semibold text-[#0B1F45]">This Month</h2>` |
| `#F8F9FF` | `components/portfolio/PortfolioReportingCalendar.tsx` | 812 | `className="flex w-full items-start justify-between gap-2 px-5 py-3 text-left hover:bg-[#F8F9FF]"` |
| `#0B1F45` | `components/portfolio/PortfolioReportingCalendar.tsx` | 816 | `<p className="truncate text-sm font-medium text-[#0B1F45]">{o.fund_name}</p>` |
| `#6b7280` | `components/portfolio/PortfolioTable.tsx` | 74 | `'h-8 px-2 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#6b7280] hover:bg-transparent hover:text-navy',` |
| `#9ca3af` | `components/portfolio/PortfolioTable.tsx` | 81 | `{sortKey === key && <span className="ml-1 text-[10px] font-normal normal-case text-[#9ca3af]">{sortDir === 'asc' ? 'â†‘' : 'â†“'}</span>}` |
| `#9ca3af` | `components/portfolio/PortfolioTable.tsx` | 103 | `<td colSpan={7} className="h-auto py-8 text-center text-[13px] text-[#9ca3af]">` |
| `#374151` | `components/portfolio/PortfolioTable.tsx` | 111 | `<td className="text-[#374151]">{r.sector}</td>` |
| `#374151` | `components/portfolio/PortfolioTable.tsx` | 112 | `<td className="text-right font-mono tabular-nums text-[#374151]">` |
| `#374151` | `components/portfolio/PortfolioTable.tsx` | 117 | `<td className="text-right font-mono tabular-nums text-[#374151]">` |
| `#374151` | `components/portfolio/PortfolioTable.tsx` | 120 | `<td className="text-[#374151]">` |
| `#F8F9FF` | `components/portfolio/UnifiedExtractionReviewModal.tsx` | 67 | `<div className="mt-3 rounded-lg border border-gray-200 bg-[#F8F9FF] px-3 py-2 text-xs">` |
| `#0B1F45` | `components/portfolio/UnifiedExtractionReviewModal.tsx` | 68 | `<p className="font-medium text-[#0B1F45]">Extraction confidence</p>` |
| `#0B1F45` | `components/portfolio/UnifiedExtractionReviewModal.tsx` | 331 | `<h2 className="text-lg font-semibold text-[#0B1F45]">Review extracted report data</h2>` |
| `#0B1F45` | `components/portfolio/UnifiedExtractionReviewModal.tsx` | 340 | `tab === 'snapshot' ? 'border-[#0B1F45] text-[#0B1F45]' : 'border-transparent text-gray-500 hover:text-gray-800',` |
| `#0B1F45` | `components/portfolio/UnifiedExtractionReviewModal.tsx` | 340 | `tab === 'snapshot' ? 'border-[#0B1F45] text-[#0B1F45]' : 'border-transparent text-gray-500 hover:text-gray-800',` |
| `#0B1F45` | `components/portfolio/UnifiedExtractionReviewModal.tsx` | 352 | `tab === 'narrative' ? 'border-[#0B1F45] text-[#0B1F45]' : 'border-transparent text-gray-500 hover:text-gray-800',` |
| `#0B1F45` | `components/portfolio/UnifiedExtractionReviewModal.tsx` | 352 | `tab === 'narrative' ? 'border-[#0B1F45] text-[#0B1F45]' : 'border-transparent text-gray-500 hover:text-gray-800',` |
| `#0B1F45` | `components/portfolio/UnifiedExtractionReviewModal.tsx` | 439 | `<Button type="button" className="bg-[#0B1F45] hover:bg-[#162d5e]" disabled={busy} onClick={() => void saveAll()}>` |
| `#162d5e` | `components/portfolio/UnifiedExtractionReviewModal.tsx` | 439 | `<Button type="button" className="bg-[#0B1F45] hover:bg-[#162d5e]" disabled={busy} onClick={() => void saveAll()}>` |
| `#0B1F45` | `components/portfolio/WatchlistClient.tsx` | 76 | `<td className="px-4 py-3 font-medium text-[#0B1F45]">{r.fund_name}</td>` |
| `#0F8A6E` | `components/portfolio/WatchlistClient.tsx` | 87 | `<Link href={/portfolio/funds/${r.watchlist.fund_id}} className="text-sm font-medium text-[#0F8A6E] hover:underline">` |
| `#0B1F45` | `components/prequalification/PrequalificationWorkspace.tsx` | 60 | `'flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-3 text-left text-sm font-medium text-[#0B1F45] transition-colors',` |
| `#0B1F45` | `components/prequalification/PrequalificationWorkspace.tsx` | 451 | `<Link href="/fund-applications" className="font-medium hover:text-[#0B1F45]">` |
| `#0B1F45` | `components/prequalification/PrequalificationWorkspace.tsx` | 461 | `<h2 className="text-2xl font-bold text-[#0B1F45]">{application.fund_name}</h2>` |
| `#0B1F45` | `components/prequalification/PrequalificationWorkspace.tsx` | 477 | `<h3 className="text-base font-semibold text-[#0B1F45]">Submission Details</h3>` |
| `#0B1F45` | `components/prequalification/PrequalificationWorkspace.tsx` | 487 | `className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B1F45]"` |
| `#0B1F45` | `components/prequalification/PrequalificationWorkspace.tsx` | 497 | `className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B1F45]"` |
| `#0B1F45` | `components/prequalification/PrequalificationWorkspace.tsx` | 537 | `<p className="truncate text-sm font-semibold text-[#0B1F45]">{uploadMeta?.name ?? uploadedFileName ?? 'proposal.pdf'}</p>` |
| `#0B1F45` | `components/prequalification/PrequalificationWorkspace.tsx` | 545 | `<div className="h-full w-1/2 animate-pulse rounded-full bg-[#0B1F45]" />` |
| `#0B1F45` | `components/prequalification/PrequalificationWorkspace.tsx` | 589 | `'hover:border-[#0B1F45]',` |
| `#0B1F45` | `components/prequalification/PrequalificationWorkspace.tsx` | 601 | `<p className="text-sm font-medium text-[#0B1F45]">Upload proposal document</p>` |
| `#0B1F45` | `components/prequalification/PrequalificationWorkspace.tsx` | 628 | `<Loader2 className="mx-auto h-6 w-6 animate-spin text-[#0B1F45]" />` |
| `#0B1F45` | `components/prequalification/PrequalificationWorkspace.tsx` | 629 | `<p className="mt-2 text-sm font-medium text-[#0B1F45]">AI is analysing your document...</p>` |
| `#0B1F45` | `components/prequalification/PrequalificationWorkspace.tsx` | 690 | `className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B1F45]"` |
| `#0B1F45` | `components/prequalification/PrequalificationWorkspace.tsx` | 745 | `className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B1F45]"` |
| `#0B1F45` | `components/prequalification/PrequalificationWorkspace.tsx` | 761 | `<p className="text-[32px] font-bold leading-none text-[#0B1F45]">{reviewedTotal} of 9</p>` |
| `#0B1F45` | `components/prequalification/PrequalificationWorkspace.tsx` | 764 | `<div className="h-full rounded-full bg-[#0B1F45] transition-all" style={{ width: ${progressPct}% }} />` |
| `#0F8A6E` | `components/prequalification/PrequalificationWorkspace.tsx` | 774 | `<span key={s21-dot-${idx}} className={cn('h-3 w-3 rounded-full', idx < reviewed21 ? 'bg-[#0F8A6E]' : 'bg-gray-200')} />` |
| `#0F8A6E` | `components/prequalification/PrequalificationWorkspace.tsx` | 783 | `<span key={s22-dot-${idx}} className={cn('h-3 w-3 rounded-full', idx < reviewed22 ? 'bg-[#0F8A6E]' : 'bg-gray-200')} />` |
| `#0F8A6E` | `components/prequalification/PrequalificationWorkspace.tsx` | 791 | `{draft.date_received ? <CheckCircle2 className="h-4 w-4 text-[#0F8A6E]" /> : <XCircle className="h-4 w-4 text-red-500" />}` |
| `#0F8A6E` | `components/prequalification/PrequalificationWorkspace.tsx` | 796 | `<CheckCircle2 className="h-4 w-4 text-[#0F8A6E]" />` |
| `#0B1F45` | `components/prequalification/PrequalificationWorkspace.tsx` | 1018 | `<div className="flex items-center justify-between gap-3 bg-[#0B1F45] px-6 py-4">` |
| `#C8973A` | `components/prequalification/PrequalificationWorkspace.tsx` | 1020 | `<span className="rounded bg-[#C8973A] px-2 py-0.5 text-xs font-semibold text-white">{badge}</span>` |
| `#0F8A6E` | `components/pre-screening/PreScreeningWorkspace.tsx` | 84 | `ok: 'border border-[#0F8A6E]/30 bg-teal-50 text-[#0B1F45]',` |
| `#0B1F45` | `components/pre-screening/PreScreeningWorkspace.tsx` | 84 | `ok: 'border border-[#0F8A6E]/30 bg-teal-50 text-[#0B1F45]',` |
| `#0B1F45` | `components/pre-screening/PreScreeningWorkspace.tsx` | 85 | `warn: 'border border-amber-200 bg-amber-50 text-[#0B1F45]',` |
| `#0B1F45` | `components/pre-screening/PreScreeningWorkspace.tsx` | 87 | `neutral: 'border border-gray-200 bg-white text-[#0B1F45]',` |
| `#0B1F45` | `components/pre-screening/PreScreeningWorkspace.tsx` | 204 | `<h2 className="text-2xl font-semibold tracking-tight text-[#0B1F45]">{data.application.fund_name}</h2>` |
| `#0B1F45` | `components/pre-screening/PreScreeningWorkspace.tsx` | 221 | `<p className="mt-1 text-lg font-semibold text-[#0B1F45]">{summary.headline}</p>` |
| `#0B1F45` | `components/questionnaire/ContactPersonsCard.tsx` | 109 | `className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-2 text-sm text-gray-500 transitiâ€¦` |
| `#0B1F45` | `components/questionnaire/ContactPersonsCard.tsx` | 109 | `className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-2 text-sm text-gray-500 transitiâ€¦` |
| `#0F8A6E` | `components/questionnaire/ContactPersonsCard.tsx` | 118 | `nameEmailOk ? 'font-medium text-[#0F8A6E]' : 'text-gray-400',` |
| `#6b7280` | `components/questionnaire/CountryMultiSelect.tsx` | 141 | `{helper && <p className="mb-2 text-[12px] leading-snug text-[#6b7280]">{helper}</p>}` |
| `#0B1F45` | `components/questionnaire/CountryMultiSelect.tsx` | 156 | `className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none focus:ring-1 focus:ring-[#0B1F45]/20 disabled:cursorâ€¦` |
| `#0B1F45` | `components/questionnaire/CountryMultiSelect.tsx` | 165 | `className="inline-flex items-center rounded-full bg-[#0B1F45] px-3 py-1 text-xs text-white"` |
| `#162d5e` | `components/questionnaire/CountryMultiSelect.tsx` | 170 | `className="ml-1 flex h-4 w-4 items-center justify-center rounded-full hover:bg-[#162d5e]"` |
| `#0F8A6E` | `components/questionnaire/CountryMultiSelect.tsx` | 198 | `checked && 'bg-teal-50 font-medium text-[#0F8A6E]',` |
| `#0F8A6E` | `components/questionnaire/CountryMultiSelect.tsx` | 216 | `checked && 'bg-teal-50 font-medium text-[#0F8A6E]',` |
| `#0B1F45` | `components/questionnaire/CountryNameSingleSelect.tsx` | 100 | `className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#0B1F45] px-3 py-1 text-xs text-white"` |
| `#0B1F45` | `components/questionnaire/CountryNameSingleSelect.tsx` | 132 | `sel ? 'bg-[#0B1F45]/5 font-medium text-[#0B1F45]' : 'text-gray-700 hover:bg-gray-50',` |
| `#0B1F45` | `components/questionnaire/CountryNameSingleSelect.tsx` | 132 | `sel ? 'bg-[#0B1F45]/5 font-medium text-[#0B1F45]' : 'text-gray-700 hover:bg-gray-50',` |
| `#6b7280` | `components/questionnaire/DocumentUpload.tsx` | 110 | `{label && <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">{label}</p>}` |
| `#e5e7eb` | `components/questionnaire/DocumentUpload.tsx` | 112 | `<div className="rounded-md border border-[#e5e7eb] bg-white p-3">` |
| `#e5e7eb` | `components/questionnaire/DocumentUpload.tsx` | 144 | `dragOver ? 'border-teal bg-teal/[0.06]' : 'border-[#e5e7eb] bg-[#fafafa]',` |
| `#fafafa` | `components/questionnaire/DocumentUpload.tsx` | 144 | `dragOver ? 'border-teal bg-teal/[0.06]' : 'border-[#e5e7eb] bg-[#fafafa]',` |
| `#6b7280` | `components/questionnaire/DocumentUpload.tsx` | 148 | `<p className="mb-2 text-center text-[13px] text-[#6b7280]">Drag and drop a file here, or choose a file</p>` |
| `#0B1F45` | `components/questionnaire/InvestmentSectorCombobox.tsx` | 96 | `sel ? 'bg-[#0B1F45]/5 font-medium text-[#0B1F45]' : 'text-gray-700 hover:bg-gray-50',` |
| `#0B1F45` | `components/questionnaire/InvestmentSectorCombobox.tsx` | 96 | `sel ? 'bg-[#0B1F45]/5 font-medium text-[#0B1F45]' : 'text-gray-700 hover:bg-gray-50',` |
| `#0B1F45` | `components/questionnaire/LegalDocumentModal.tsx` | 73 | `<h3 className="text-lg font-semibold text-[#0B1F45]">` |
| `#0B1F45` | `components/questionnaire/LegalDocumentModal.tsx` | 131 | `className="bg-[#0B1F45] text-white"` |
| `#0B1F45` | `components/questionnaire/LegalDocumentsListField.tsx` | 44 | `return 'bg-[#0B1F45] text-white';` |
| `#6b7280` | `components/questionnaire/LegalDocumentsListField.tsx` | 110 | `{question.helper ? <p className="mb-3 text-[12px] leading-snug text-[#6b7280]">{question.helper}</p> : null}` |
| `#0B1F45` | `components/questionnaire/LegalDocumentsListField.tsx` | 123 | `className="mt-4 rounded-lg bg-[#0B1F45] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"` |
| `#0B1F45` | `components/questionnaire/LegalDocumentsListField.tsx` | 135 | `<span className="min-w-0 flex-1 font-medium text-[#0B1F45]">{r.document_name \|\| 'â€”'}</span>` |
| `#0B1F45` | `components/questionnaire/LegalDocumentsListField.tsx` | 163 | `className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-2 text-sm text-gray-400 traâ€¦` |
| `#0B1F45` | `components/questionnaire/LegalDocumentsListField.tsx` | 163 | `className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-2 text-sm text-gray-400 traâ€¦` |
| `#0B1F45` | `components/questionnaire/PersonnelStructuredList.tsx` | 246 | `className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#0B1F45] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opaâ€¦` |
| `#0B1F45` | `components/questionnaire/PersonnelStructuredList.tsx` | 330 | `className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-2 text-sm text-gray-400 traâ€¦` |
| `#0B1F45` | `components/questionnaire/PersonnelStructuredList.tsx` | 330 | `className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-2 text-sm text-gray-400 traâ€¦` |
| `#6b7280` | `components/questionnaire/PipelineCompaniesField.tsx` | 131 | `{question.helper ? <p className="mb-2 text-[12px] leading-snug text-[#6b7280]">{question.helper}</p> : null}` |
| `#0B1F45` | `components/questionnaire/PipelineCompaniesField.tsx` | 149 | `className="mt-4 rounded-lg bg-[#0B1F45] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"` |
| `#0B1F45` | `components/questionnaire/PipelineCompaniesField.tsx` | 207 | `'w-full border-dashed border-gray-300 text-[#0B1F45] hover:bg-gray-50',` |
| `#0B1F45` | `components/questionnaire/PipelineCompanyModal.tsx` | 173 | `<Building2 className="h-5 w-5 shrink-0 text-[#0B1F45]" aria-hidden />` |
| `#0B1F45` | `components/questionnaire/PipelineCompanyModal.tsx` | 290 | `? 'border border-[#0B1F45] bg-[#0B1F45]/5 font-medium text-[#0B1F45]'` |
| `#0B1F45` | `components/questionnaire/PipelineCompanyModal.tsx` | 290 | `? 'border border-[#0B1F45] bg-[#0B1F45]/5 font-medium text-[#0B1F45]'` |
| `#0B1F45` | `components/questionnaire/PipelineCompanyModal.tsx` | 290 | `? 'border border-[#0B1F45] bg-[#0B1F45]/5 font-medium text-[#0B1F45]'` |
| `#0B1F45` | `components/questionnaire/PipelineCompanyModal.tsx` | 297 | `selected ? 'border-[#0B1F45] bg-[#0B1F45]' : 'border-gray-300',` |
| `#0B1F45` | `components/questionnaire/PipelineCompanyModal.tsx` | 297 | `selected ? 'border-[#0B1F45] bg-[#0B1F45]' : 'border-gray-300',` |
| `#0B1F45` | `components/questionnaire/PipelineCompanyModal.tsx` | 327 | `? 'border-[#0B1F45] bg-[#0B1F45]/5 text-[#0B1F45]'` |
| `#0B1F45` | `components/questionnaire/PipelineCompanyModal.tsx` | 327 | `? 'border-[#0B1F45] bg-[#0B1F45]/5 text-[#0B1F45]'` |
| `#0B1F45` | `components/questionnaire/PipelineCompanyModal.tsx` | 327 | `? 'border-[#0B1F45] bg-[#0B1F45]/5 text-[#0B1F45]'` |
| `#0B1F45` | `components/questionnaire/PipelineSectorCombobox.tsx` | 80 | `sel ? 'bg-[#0B1F45]/5 font-medium text-[#0B1F45]' : 'text-gray-700 hover:bg-gray-50',` |
| `#0B1F45` | `components/questionnaire/PipelineSectorCombobox.tsx` | 80 | `sel ? 'bg-[#0B1F45]/5 font-medium text-[#0B1F45]' : 'text-gray-700 hover:bg-gray-50',` |
| `#0B1F45` | `components/questionnaire/ProfessionalModal.tsx` | 363 | `tab === 'details' ? 'border-[#0B1F45] text-[#0B1F45]' : 'border-transparent text-gray-400 hover:text-gray-600',` |
| `#0B1F45` | `components/questionnaire/ProfessionalModal.tsx` | 363 | `tab === 'details' ? 'border-[#0B1F45] text-[#0B1F45]' : 'border-transparent text-gray-400 hover:text-gray-600',` |
| `#0B1F45` | `components/questionnaire/ProfessionalModal.tsx` | 373 | `tab === 'bio' ? 'border-[#0B1F45] text-[#0B1F45]' : 'border-transparent text-gray-400 hover:text-gray-600',` |
| `#0B1F45` | `components/questionnaire/ProfessionalModal.tsx` | 373 | `tab === 'bio' ? 'border-[#0B1F45] text-[#0B1F45]' : 'border-transparent text-gray-400 hover:text-gray-600',` |
| `#0B1F45` | `components/questionnaire/ProfessionalModal.tsx` | 427 | `if (selected && val === 'full_time') sel = 'border-[#0B1F45] bg-[#0B1F45]/5 text-[#0B1F45]';` |
| `#0B1F45` | `components/questionnaire/ProfessionalModal.tsx` | 427 | `if (selected && val === 'full_time') sel = 'border-[#0B1F45] bg-[#0B1F45]/5 text-[#0B1F45]';` |
| `#0B1F45` | `components/questionnaire/ProfessionalModal.tsx` | 427 | `if (selected && val === 'full_time') sel = 'border-[#0B1F45] bg-[#0B1F45]/5 text-[#0B1F45]';` |
| `#C8973A` | `components/questionnaire/ProfessionalModal.tsx` | 428 | `if (selected && val === 'part_time') sel = 'border-[#C8973A] bg-[#C8973A]/5 text-[#C8973A]';` |
| `#C8973A` | `components/questionnaire/ProfessionalModal.tsx` | 428 | `if (selected && val === 'part_time') sel = 'border-[#C8973A] bg-[#C8973A]/5 text-[#C8973A]';` |
| `#C8973A` | `components/questionnaire/ProfessionalModal.tsx` | 428 | `if (selected && val === 'part_time') sel = 'border-[#C8973A] bg-[#C8973A]/5 text-[#C8973A]';` |
| `#0B1F45` | `components/questionnaire/ProfessionalModal.tsx` | 484 | `? 'border-[#0B1F45] bg-[#0B1F45]/5 text-[#0B1F45]'` |
| `#0B1F45` | `components/questionnaire/ProfessionalModal.tsx` | 484 | `? 'border-[#0B1F45] bg-[#0B1F45]/5 text-[#0B1F45]'` |
| `#0B1F45` | `components/questionnaire/ProfessionalModal.tsx` | 484 | `? 'border-[#0B1F45] bg-[#0B1F45]/5 text-[#0B1F45]'` |
| `#0B1F45` | `components/questionnaire/ProfessionalModal.tsx` | 555 | `? 'border-[#0B1F45] bg-[#0B1F45]/5 text-[#0B1F45]'` |
| `#0B1F45` | `components/questionnaire/ProfessionalModal.tsx` | 555 | `? 'border-[#0B1F45] bg-[#0B1F45]/5 text-[#0B1F45]'` |
| `#0B1F45` | `components/questionnaire/ProfessionalModal.tsx` | 555 | `? 'border-[#0B1F45] bg-[#0B1F45]/5 text-[#0B1F45]'` |
| `#6b7280` | `components/questionnaire/QuestionField.tsx` | 71 | `return <p className="mb-2 text-[12px] leading-snug text-[#6b7280]">{children}</p>;` |
| `#6b7280` | `components/questionnaire/QuestionField.tsx` | 136 | `<span className="text-[13px] text-[#6b7280]">%</span>` |
| `#6b7280` | `components/questionnaire/QuestionField.tsx` | 141 | `<p className={mt-2 text-[12px] ${Math.abs(sum - 100) < 0.02 ? 'text-[#6b7280]' : 'text-amber-700'}}>` |
| `#6b7280` | `components/questionnaire/QuestionField.tsx` | 181 | `<span className="shrink-0 text-[12px] font-medium text-[#6b7280]" aria-hidden>` |
| `#9ca3af` | `components/questionnaire/QuestionField.tsx` | 449 | `<span className="text-[12px] text-[#9ca3af]">` |
| `#9ca3af` | `components/questionnaire/QuestionField.tsx` | 484 | `<span className="text-[12px] text-[#9ca3af]">` |
| `#0B1F45` | `components/questionnaire/QuestionField.tsx` | 502 | `? 'w-48 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B1F45]'` |
| `#6b7280` | `components/questionnaire/QuestionField.tsx` | 547 | `<span className="shrink-0 text-[13px] font-medium text-[#6b7280]" aria-hidden>` |
| `#0B1F45` | `components/questionnaire/QuestionField.tsx` | 567 | `isNumClosings ? 'w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-[#0B1F45]' : 'flex-1',` |
| `#9ca3af` | `components/questionnaire/QuestionField.tsx` | 592 | `<p className="mb-2 text-[12px] text-[#9ca3af]">` |
| `#0B1F45` | `components/questionnaire/QuestionnaireGroupCard.tsx` | 9 | `<div className="space-y-5 border-l-2 border-[#0B1F45] pl-4 md:space-y-8">{children}</div>` |
| `#0B1F45` | `components/questionnaire/QuestionnaireGroupCard.tsx` | 17 | `<h3 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#0B1F45]">{title}</h3>` |
| `#C8973A` | `components/questionnaire/QuestionnaireGroupCard.tsx` | 18 | `<div className="mt-2 h-0.5 w-full bg-[#C8973A]" aria-hidden />` |
| `#0B1F45` | `components/questionnaire/QuestionnaireGroupCard.tsx` | 20 | `<div className="space-y-5 border-l-2 border-[#0B1F45] pl-4 md:space-y-8">{children}</div>` |
| `#0B1F45` | `components/questionnaire/QuestionnaireSectionPanel.tsx` | 446 | `<div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-[#0B1F45]">` |
| `#F3F4F6` | `components/questionnaire/QuestionnaireSectionPanel.tsx` | 455 | `<div className="flex min-h-0 flex-1 flex-col bg-[#F3F4F6]">` |
| `#0B1F45` | `components/questionnaire/QuestionnaireSectionPanel.tsx` | 460 | `<h2 className="text-2xl font-bold tracking-tight text-[#0B1F45]">{payload.config.title}</h2>` |
| `#6b7280` | `components/questionnaire/QuestionnaireSectionPanel.tsx` | 462 | `<p className="mt-3 line-clamp-2 text-[13px] leading-snug text-[#6b7280]">{helper}</p>` |
| `#6b7280` | `components/questionnaire/QuestionnaireSectionPanel.tsx` | 573 | `<div className="order-last w-full text-center text-[12px] text-[#6b7280] sm:order-none sm:w-auto">` |
| `#6b7280` | `components/questionnaire/QuestionnaireSectionPanel.tsx` | 575 | `<span className="font-medium text-[#6b7280]">Read-only â€” changes are not saved.</span>` |
| `#374151` | `components/questionnaire/QuestionnaireSectionPanel.tsx` | 577 | `<span className="font-medium text-[#374151]">Savingâ€¦</span>` |
| `#0F8A6E` | `components/questionnaire/QuestionnaireSectionPanel.tsx` | 581 | `<span className="font-medium text-[#0F8A6E]">Saved âœ“</span>` |
| `#0B1F45` | `components/questionnaire/QuestionnaireSectionPanel.tsx` | 588 | `className="min-w-[10rem] bg-[#0B1F45] text-white hover:bg-[#0B1F45]/90"` |
| `#0B1F45` | `components/questionnaire/QuestionnaireSectionPanel.tsx` | 588 | `className="min-w-[10rem] bg-[#0B1F45] text-white hover:bg-[#0B1F45]/90"` |
| `#0B1F45` | `components/questionnaire/QuestionnaireStepperHeader.tsx` | 22 | `<p className="min-w-0 truncate text-sm font-semibold leading-tight text-[#0B1F45]">` |
| `#0B1F45` | `components/questionnaire/QuestionnaireStepperHeader.tsx` | 32 | `className="inline-flex items-center gap-1 text-gray-400 transition-colors hover:text-[#0B1F45]"` |
| `#0B1F45` | `components/questionnaire/QuestionnaireWorkspace.tsx` | 144 | `<div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-[#0B1F45]">` |
| `#F3F4F6` | `components/questionnaire/QuestionnaireWorkspace.tsx` | 177 | `<div className="flex min-h-[calc(100vh-3.5rem)] min-w-0 flex-1 flex-col bg-[#F3F4F6]">` |
| `#0B1F45` | `components/questionnaire/QuestionnaireWorkspace.tsx` | 180 | `<h1 className="text-2xl font-bold text-[#0B1F45]">Questionnaire</h1>` |
| `#0B1F45` | `components/questionnaire/QuestionnaireWorkspace.tsx` | 187 | `<p className="w-full text-center text-[13px] leading-snug text-[#0B1F45]">` |
| `#0F8A6E` | `components/questionnaire/SectionRequirementsBar.tsx` | 122 | `'inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-medium text-[#0F8A6E]',` |
| `#0B1F45` | `components/questionnaire/SectionRequirementsBar.tsx` | 155 | `<h3 className="mb-3 text-sm font-semibold text-[#0B1F45]">Section requirements</h3>` |
| `#0F8A6E` | `components/questionnaire/SectionRequirementsBar.tsx` | 158 | `className="h-full rounded-full bg-[#0F8A6E] transition-[width]"` |
| `#0F8A6E` | `components/questionnaire/SectionRequirementsBar.tsx` | 170 | `<CheckCircle2 className="h-4 w-4 shrink-0 text-[#0F8A6E]" aria-hidden />` |
| `#E5E7EB` | `components/questionnaire/SectionStepper.tsx` | 37 | `<div className="w-full border-b border-[#E5E7EB] bg-white px-8 py-4">` |
| `#0F8A6E` | `components/questionnaire/SectionStepper.tsx` | 56 | `prevCompleted ? 'bg-[#0F8A6E]' : 'bg-gray-200',` |
| `#0F8A6E` | `components/questionnaire/SectionStepper.tsx` | 65 | `thisCompleted ? 'bg-[#0F8A6E]' : 'bg-gray-200',` |
| `#0B1F45` | `components/questionnaire/SectionStepper.tsx` | 76 | `'relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold leading-none transition-colors focus:outâ€¦` |
| `#0B1F45` | `components/questionnaire/SectionStepper.tsx` | 77 | `active && 'bg-[#0B1F45] text-white',` |
| `#0F8A6E` | `components/questionnaire/SectionStepper.tsx` | 78 | `completed && !active && 'bg-[#0F8A6E] text-white',` |
| `#C8973A` | `components/questionnaire/SectionStepper.tsx` | 79 | `inProgress && 'border-2 border-[#C8973A] bg-white text-[#C8973A]',` |
| `#C8973A` | `components/questionnaire/SectionStepper.tsx` | 79 | `inProgress && 'border-2 border-[#C8973A] bg-white text-[#C8973A]',` |
| `#0B1F45` | `components/questionnaire/SectionStepper.tsx` | 93 | `active ? 'font-semibold text-[#0B1F45]' : 'text-gray-400',` |
| `#0F8A6E` | `components/questionnaire/SponsorAlignmentCompensationGroup.tsx` | 54 | `? 'border-transparent bg-[#0F8A6E] text-white'` |
| `#0B1F45` | `components/questionnaire/SponsorAlignmentCompensationGroup.tsx` | 55 | `: 'border-transparent bg-[#0B1F45] text-white';` |
| `#6b7280` | `components/questionnaire/SponsorAlignmentCompensationGroup.tsx` | 143 | `<span className="shrink-0 text-[13px] font-medium text-[#6b7280]" aria-hidden>` |
| `#6b7280` | `components/questionnaire/SponsorAlignmentCompensationGroup.tsx` | 179 | `<span className="shrink-0 text-[13px] text-[#6b7280]">%</span>` |
| `#6b7280` | `components/questionnaire/SponsorAlignmentCompensationGroup.tsx` | 199 | `<p className="mb-2 text-[12px] leading-snug text-[#6b7280]">` |
| `#0F8A6E` | `components/questionnaire/SponsorConflictsLegalGroup.tsx` | 39 | `? 'border-transparent bg-[#0F8A6E] text-white'` |
| `#0B1F45` | `components/questionnaire/SponsorConflictsLegalGroup.tsx` | 40 | `: 'border-transparent bg-[#0B1F45] text-white';` |
| `#374151` | `components/questionnaire/SponsorConflictsLegalGroup.tsx` | 177 | `<p className="mb-2 text-[12px] font-medium text-[#374151]">Compliance status</p>` |
| `#374151` | `components/questionnaire/SponsorConflictsLegalGroup.tsx` | 186 | `<label key={opt.value} className="flex cursor-pointer items-center gap-2 text-sm text-[#374151]">` |
| `#374151` | `components/questionnaire/SponsorConflictsLegalGroup.tsx` | 223 | `<p className="mb-2 text-[12px] font-medium text-[#374151]">Status</p>` |
| `#374151` | `components/questionnaire/SponsorConflictsLegalGroup.tsx` | 231 | `<label key={opt.value} className="flex cursor-pointer items-center gap-2 text-sm text-[#374151]">` |
| `#E5E7EB` | `components/questionnaire/StaffBioForm.tsx` | 110 | `<div key={bio.id ?? new-${i}} className="rounded-xl border border-[#E5E7EB] bg-white shadow-none">` |
| `#f9fafb` | `components/questionnaire/StaffBioForm.tsx` | 114 | `className="flex min-w-0 flex-1 items-center gap-2 rounded-md px-3 py-2 text-left transition-colors hover:bg-[#f9fafb]"` |
| `#f1f3f5` | `components/questionnaire/StaffBioForm.tsx` | 134 | `<div className="border-t border-[#f1f3f5] px-5 pb-5 pt-4">` |
| `#9ca3af` | `components/questionnaire/StaffBioForm.tsx` | 253 | `<span className="text-[12px] text-[#9ca3af]">{countWords(bio.work_experience)} / 400</span>` |
| `#9ca3af` | `components/questionnaire/StaffBioForm.tsx` | 268 | `<span className="text-[12px] text-[#9ca3af]">{countWords(bio.fund_responsibilities)} / 300</span>` |
| `#0F8A6E` | `components/questionnaire/StructuredListField.tsx` | 99 | `<div className="mt-2 flex justify-end text-xs font-medium text-[#0F8A6E]">` |
| `#6b7280` | `components/questionnaire/StructuredListField.tsx` | 243 | `<span className="mb-2 text-[13px] font-medium text-[#6b7280]" aria-hidden>` |
| `#0B1F45` | `components/questionnaire/StructuredListField.tsx` | 298 | `className="min-h-[60px] resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-[#0B1F45]/20"` |
| `#6b7280` | `components/questionnaire/StructuredListField.tsx` | 485 | `<span className="text-[13px] text-[#6b7280]" aria-hidden>` |
| `#6b7280` | `components/questionnaire/StructuredListField.tsx` | 523 | `<span className="text-[13px] text-[#6b7280]" aria-hidden>` |
| `#6b7280` | `components/questionnaire/StructuredListField.tsx` | 677 | `{question.helper ? <p className="mb-3 text-[12px] leading-snug text-[#6b7280]">{question.helper}</p> : null}` |
| `#0B1F45` | `components/questionnaire/StructuredListField.tsx` | 693 | `className="mt-4 rounded-lg bg-[#0B1F45] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"` |
| `#0B1F45` | `components/questionnaire/StructuredListField.tsx` | 719 | `className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-2 text-sm text-gray-400 traâ€¦` |
| `#0B1F45` | `components/questionnaire/StructuredListField.tsx` | 719 | `className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 py-2 text-sm text-gray-400 traâ€¦` |
| `#c8973a` | `components/reports/CapitalTimeline.tsx` | 45 | `<Bar yAxisId="left" dataKey="deployedUsd" name="Monthly disbursements" fill="#c8973a" radius={[4, 4, 0, 0]} />` |
| `#0f8a6e` | `components/reports/CapitalTimeline.tsx` | 51 | `stroke="#0f8a6e"` |
| `#0b1f45` | `components/reports/CriteriaRadar.tsx` | 34 | `<PolarAngleAxis dataKey="criteria" tick={{ fontSize: 10, fill: '#0b1f45' }} />` |
| `#0f8a6e` | `components/reports/CriteriaRadar.tsx` | 36 | `<Radar name="Avg score" dataKey="avg" stroke="#0f8a6e" fill="rgba(15, 138, 110, 0.35)" />` |
| `#c8973a` | `components/reports/ExecutiveReportsDashboard.tsx` | 27 | `const GOLD = '#c8973a';` |
| `#0f8a6e` | `components/reports/ExecutiveReportsDashboard.tsx` | 28 | `const TEAL = '#0f8a6e';` |
| `#16a34a` | `components/reports/ExecutiveReportsDashboard.tsx` | 30 | `performing: '#16a34a',` |
| `#eab308` | `components/reports/ExecutiveReportsDashboard.tsx` | 31 | `watch: '#eab308',` |
| `#ea580c` | `components/reports/ExecutiveReportsDashboard.tsx` | 32 | `underperforming: '#ea580c',` |
| `#dc2626` | `components/reports/ExecutiveReportsDashboard.tsx` | 33 | `critical: '#dc2626',` |
| `#dc2626` | `components/reports/ExecutiveReportsDashboard.tsx` | 193 | `<ReferenceLine x={70} stroke="#dc2626" strokeDasharray="4 4" label={{ value: '70 pass', fill: '#991b1b', fontSize: 11 }} />` |
| `#991b1b` | `components/reports/ExecutiveReportsDashboard.tsx` | 193 | `<ReferenceLine x={70} stroke="#dc2626" strokeDasharray="4 4" label={{ value: '70 pass', fill: '#991b1b', fontSize: 11 }} />` |
| `#c8973a` | `components/reports/PipelineFunnel.tsx` | 48 | `<Bar dataKey="count" name="Applications" fill="#c8973a" radius={[0, 4, 4, 0]}>` |
| `#0B1F45` | `components/settings/AddInternalUserModal.tsx` | 151 | `<h2 className="text-lg font-semibold text-[#0B1F45]">Add Internal User</h2>` |
| `#0B1F45` | `components/settings/AddInternalUserModal.tsx` | 185 | `<span className="block truncate text-sm font-medium text-[#0B1F45]">{u.name}</span>` |
| `#0B1F45` | `components/settings/AddInternalUserModal.tsx` | 209 | `<p className="truncate text-sm font-medium text-[#0B1F45]">{selected.name}</p>` |
| `#0B1F45` | `components/settings/AddInternalUserModal.tsx` | 231 | `className="bg-[#0B1F45] text-white hover:bg-[#0B1F45]/90"` |
| `#0B1F45` | `components/settings/AddInternalUserModal.tsx` | 231 | `className="bg-[#0B1F45] text-white hover:bg-[#0B1F45]/90"` |
| `#0F8A6E` | `components/settings/RoleAccessBlocks.tsx` | 67 | `<Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0F8A6E]" aria-hidden />` |
| `#0B1F45` | `components/settings/RoleAccessBlocks.tsx` | 100 | `? cn('border-2 border-[#0B1F45] bg-[#0B1F45]/5', activeClass)` |
| `#0B1F45` | `components/settings/RoleAccessBlocks.tsx` | 100 | `? cn('border-2 border-[#0B1F45] bg-[#0B1F45]/5', activeClass)` |
| `#0B1F45` | `components/settings/RoleAccessBlocks.tsx` | 104 | `<Icon className="h-8 w-8 text-[#0B1F45]" aria-hidden />` |
| `#0B1F45` | `components/settings/RoleAccessBlocks.tsx` | 105 | `<p className="mt-2 text-sm font-semibold text-[#0B1F45]">{title}</p>` |
| `#0B1F45` | `components/settings/UserEditForm.tsx` | 93 | `className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#0B1F45]"` |
| `#0B1F45` | `components/settings/UserEditForm.tsx` | 99 | `<h1 className="text-2xl font-bold text-[#0B1F45]">{profile.full_name}</h1>` |
| `#0B1F45` | `components/settings/UserEditForm.tsx` | 125 | `<p className="font-semibold text-[#0B1F45]">{profile.full_name}</p>` |
| `#0F8A6E` | `components/settings/UserEditForm.tsx` | 137 | `<span className={active ? 'font-medium text-[#0F8A6E]' : 'font-medium text-gray-500'}>` |
| `#0B1F45` | `components/settings/UserEditForm.tsx` | 146 | `<h2 className="text-sm font-semibold text-[#0B1F45]">Change role</h2>` |
| `#0B1F45` | `components/settings/UserEditForm.tsx` | 157 | `className="bg-[#0B1F45] text-white hover:bg-[#0B1F45]/90"` |
| `#0B1F45` | `components/settings/UserEditForm.tsx` | 157 | `className="bg-[#0B1F45] text-white hover:bg-[#0B1F45]/90"` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 173 | `<h1 className="text-2xl font-bold text-[#0B1F45]">User Management</h1>` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 177 | `<Button className="bg-[#0B1F45] text-white hover:bg-[#0B1F45]/90" onClick={() => setShowAddInternalModal(true)}>` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 177 | `<Button className="bg-[#0B1F45] text-white hover:bg-[#0B1F45]/90" onClick={() => setShowAddInternalModal(true)}>` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 191 | `<span className="text-2xl font-bold text-[#0B1F45]">{stats.activeUsers}</span>` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 199 | `<span className="text-2xl font-bold text-[#0B1F45]">{stats.pendingInvites}</span>` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 207 | `<div className="border-t-4 border-[#0B1F45] pt-1" />` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 212 | `<span className="font-medium text-[#0B1F45]">{stats.roleCounts.pctu_officer}</span>` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 216 | `<span className="font-medium text-[#0B1F45]">{stats.roleCounts.investment_officer}</span>` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 220 | `<span className="font-medium text-[#0B1F45]">{stats.roleCounts.portfolio_manager}</span>` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 224 | `<span className="font-medium text-[#0B1F45]">{stats.roleCounts.panel_member}</span>` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 228 | `<span className="font-medium text-[#0B1F45]">{stats.roleCounts.it_admin}</span>` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 232 | `<span className="font-medium text-[#0B1F45]">{stats.roleCounts.senior_management}</span>` |
| `#0F8A6E` | `components/settings/UserManagementClient.tsx` | 237 | `<div className="border-t-4 border-[#0F8A6E] pt-1" />` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 238 | `<p className="mt-2 text-2xl font-bold text-[#0B1F45]">{stats.lastActivityLabel}</p>` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 250 | `tab === 'users' ? 'border-[#0B1F45] text-[#0B1F45]' : 'border-transparent text-gray-500',` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 250 | `tab === 'users' ? 'border-[#0B1F45] text-[#0B1F45]' : 'border-transparent text-gray-500',` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 260 | `tab === 'invites' ? 'border-[#0B1F45] text-[#0B1F45]' : 'border-transparent text-gray-500',` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 260 | `tab === 'invites' ? 'border-[#0B1F45] text-[#0B1F45]' : 'border-transparent text-gray-500',` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 270 | `tab === 'inactive' ? 'border-[#0B1F45] text-[#0B1F45]' : 'border-transparent text-gray-500',` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 270 | `tab === 'inactive' ? 'border-[#0B1F45] text-[#0B1F45]' : 'border-transparent text-gray-500',` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 306 | `<p className="font-semibold text-[#0B1F45]">{row.full_name}</p>` |
| `#0F8A6E` | `components/settings/UserManagementClient.tsx` | 324 | `<span className={cn('h-2 w-2 rounded-full bg-[#0F8A6E]')} />` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 335 | `className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-[#0B1F45] hover:bgâ€¦` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 335 | `className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-[#0B1F45] hover:bgâ€¦` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 335 | `className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-[#0B1F45] hover:bgâ€¦` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 396 | `<p className="font-semibold text-[#0B1F45]">{inv.full_name}</p>` |
| `#0F8A6E` | `components/settings/UserManagementClient.tsx` | 537 | `confirmClassName="bg-[#0F8A6E] hover:bg-[#0a6e58]"` |
| `#0a6e58` | `components/settings/UserManagementClient.tsx` | 537 | `confirmClassName="bg-[#0F8A6E] hover:bg-[#0a6e58]"` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 617 | `<h3 className="text-lg font-semibold text-[#0B1F45]">{title}</h3>` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 679 | `<h3 className="text-lg font-semibold text-[#0B1F45]">Edit Role</h3>` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 699 | `<p className="truncate font-semibold text-[#0B1F45]">{user.full_name}</p>` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 712 | `className="flex cursor-pointer items-center gap-3 rounded-lg border border-transparent p-3 transition-colors hover:bg-gray-50 has-[:checked]â€¦` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 712 | `className="flex cursor-pointer items-center gap-3 rounded-lg border border-transparent p-3 transition-colors hover:bg-gray-50 has-[:checked]â€¦` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 720 | `className="accent-[#0B1F45]"` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 723 | `<div className="text-sm font-medium text-[#0B1F45]">{roleDisplayLabel(role)}</div>` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 736 | `className="bg-[#0B1F45] text-white hover:bg-[#0B1F45]/90"` |
| `#0B1F45` | `components/settings/UserManagementClient.tsx` | 736 | `className="bg-[#0B1F45] text-white hover:bg-[#0B1F45]/90"` |
| `#0B1F45` | `components/ui/AvatarInitials.tsx` | 4 | `'bg-[#0B1F45] text-white',` |
| `#0F8A6E` | `components/ui/AvatarInitials.tsx` | 5 | `'bg-[#0F8A6E] text-white',` |
| `#C8973A` | `components/ui/AvatarInitials.tsx` | 6 | `'bg-[#C8973A] text-white',` |
| `#0B1F45` | `components/ui/button.tsx` | 8 | `'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-noneâ€¦` |
| `#0B1F45` | `components/ui/button.tsx` | 12 | `default: 'bg-[#0B1F45] text-white shadow-none hover:bg-[#162d5e]',` |
| `#162d5e` | `components/ui/button.tsx` | 12 | `default: 'bg-[#0B1F45] text-white shadow-none hover:bg-[#162d5e]',` |
| `#0F8A6E` | `components/ui/button.tsx` | 17 | `link: 'text-[#0F8A6E] underline-offset-4 hover:underline',` |
| `#0B1F45` | `components/ui/design-system.ts` | 8 | `navy: '#0B1F45',` |
| `#C8973A` | `components/ui/design-system.ts` | 9 | `gold: '#C8973A',` |
| `#0F8A6E` | `components/ui/design-system.ts` | 10 | `teal: '#0F8A6E',` |
| `#F59E0B` | `components/ui/design-system.ts` | 11 | `amber: '#F59E0B',` |
| `#EF4444` | `components/ui/design-system.ts` | 12 | `red: '#EF4444',` |
| `#3B82F6` | `components/ui/design-system.ts` | 13 | `blue: '#3B82F6',` |
| `#F3F4F6` | `components/ui/design-system.ts` | 14 | `pageBg: '#F3F4F6',` |
| `#FFFFFF` | `components/ui/design-system.ts` | 15 | `cardBg: '#FFFFFF',` |
| `#E5E7EB` | `components/ui/design-system.ts` | 16 | `border: '#E5E7EB',` |
| `#111827` | `components/ui/design-system.ts` | 17 | `textPrimary: '#111827',` |
| `#6B7280` | `components/ui/design-system.ts` | 18 | `textSecondary: '#6B7280',` |
| `#9CA3AF` | `components/ui/design-system.ts` | 19 | `textMuted: '#9CA3AF',` |
| `#374151` | `components/ui/design-system.ts` | 20 | `label: '#374151',` |
| `#F3F4F6` | `components/ui/design-system.ts` | 25 | `pageBg: 'bg-[#F3F4F6]',` |
| `#0B1F45` | `components/ui/design-system.ts` | 41 | `pageTitle: 'text-2xl font-bold text-[#0B1F45]',` |
| `#0B1F45` | `components/ui/design-system.ts` | 42 | `sectionTitle: 'text-[13px] font-semibold uppercase tracking-wide text-[#0B1F45]',` |
| `#111827` | `components/ui/design-system.ts` | 44 | `body: 'text-sm text-[#111827]',` |
| `#6B7280` | `components/ui/design-system.ts` | 45 | `muted: 'text-[13px] text-[#6B7280]',` |
| `#0B1F45` | `components/ui/design-system.ts` | 81 | `committed: 'bg-[#0B1F45] text-white',` |
| `#0F8A6E` | `components/ui/design-system.ts` | 83 | `approved: 'border border-teal-200 bg-teal-50 text-[#0F8A6E]',` |
| `#0B1F45` | `components/ui/design-system.ts` | 85 | `funded: 'bg-[#0B1F45] text-white',` |
| `#0F8A6E` | `components/ui/design-system.ts` | 87 | `completed: 'bg-teal-50 text-[#0F8A6E]',` |
| `#0F8A6E` | `components/ui/design-system.ts` | 89 | `active: 'bg-teal-50 text-[#0F8A6E]',` |
| `#0F8A6E` | `components/ui/design-system.ts` | 96 | `accepted: 'bg-teal-50 text-[#0F8A6E]',` |
| `#0B1F45` | `components/ui/design-system.ts` | 99 | `closed: 'bg-[#0B1F45] text-white',` |
| `#0B1F45` | `components/ui/design-system.ts` | 161 | `navy: ${ICON_BADGE_BASE} bg-[#0B1F45] text-white,` |
| `#0F8A6E` | `components/ui/design-system.ts` | 162 | `teal: ${ICON_BADGE_BASE} bg-[#0F8A6E] text-white,` |
| `#C8973A` | `components/ui/design-system.ts` | 163 | `gold: ${ICON_BADGE_BASE} bg-[#C8973A] text-white,` |
| `#0B1F45` | `components/ui/design-system.ts` | 172 | `'inline-flex items-center justify-center rounded-lg bg-[#0B1F45] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#162d5â€¦` |
| `#162d5e` | `components/ui/design-system.ts` | 172 | `'inline-flex items-center justify-center rounded-lg bg-[#0B1F45] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#162d5â€¦` |
| `#0B1F45` | `components/ui/design-system.ts` | 172 | `'inline-flex items-center justify-center rounded-lg bg-[#0B1F45] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#162d5â€¦` |
| `#0B1F45` | `components/ui/design-system.ts` | 174 | `'inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-câ€¦` |
| `#0B1F45` | `components/ui/design-system.ts` | 182 | `'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-transparent focus:outline-nâ€¦` |
| `#0B1F45` | `components/ui/design-system.ts` | 184 | `'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-transparent focus:outline-nâ€¦` |
| `#C8973A` | `components/ui/design-system.ts` | 185 | `required: 'text-[#C8973A]',` |
| `#C8973A` | `components/ui/design-system.ts` | 188 | `'mb-4 inline-block border-b-2 border-[#C8973A] pb-2 text-xs font-semibold uppercase tracking-wide text-[#0B1F45]',` |
| `#0B1F45` | `components/ui/design-system.ts` | 188 | `'mb-4 inline-block border-b-2 border-[#C8973A] pb-2 text-xs font-semibold uppercase tracking-wide text-[#0B1F45]',` |
| `#111827` | `components/ui/design-system.ts` | 197 | `td: 'px-4 py-3.5 text-sm text-[#111827]',` |
| `#F8F9FF` | `components/ui/design-system.ts` | 198 | `rowHover: 'cursor-pointer transition-colors hover:bg-[#F8F9FF]',` |
| `#0B1F45` | `components/ui/design-system.ts` | 204 | `number: 'text-3xl font-bold text-[#0B1F45]',` |
| `#0F8A6E` | `components/ui/design-system.ts` | 219 | `if (score >= 70) return 'font-mono text-sm font-semibold tabular-nums text-[#0F8A6E]';` |
| `#C8973A` | `components/ui/design-system.ts` | 220 | `if (score >= 50) return 'font-mono text-sm font-semibold tabular-nums text-[#C8973A]';` |
| `#0B1F45` | `components/ui/design-system.ts` | 226 | `'inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:border-[#0B1F45]â€¦` |
| `#0B1F45` | `components/ui/design-system.ts` | 226 | `'inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:border-[#0B1F45]â€¦` |
| `#6b7280` | `components/ui/label.tsx` | 11 | `'mb-1.5 block text-[11px] font-semibold uppercase leading-none tracking-wide text-[#6b7280] peer-disabled:cursor-not-allowed peer-disabled:oâ€¦` |
| `#e5e7eb` | `components/ui/select.tsx` | 20 | `'flex h-10 w-full items-center justify-between rounded-md border border-[#e5e7eb] bg-white px-3 py-2 text-[13px] text-[#374151] ring-offset-â€¦` |
| `#374151` | `components/ui/select.tsx` | 20 | `'flex h-10 w-full items-center justify-between rounded-md border border-[#e5e7eb] bg-white px-3 py-2 text-[13px] text-[#374151] ring-offset-â€¦` |
| `#9ca3af` | `components/ui/select.tsx` | 20 | `'flex h-10 w-full items-center justify-between rounded-md border border-[#e5e7eb] bg-white px-3 py-2 text-[13px] text-[#374151] ring-offset-â€¦` |
| `#0B1F45` | `components/ui/StatCard.tsx` | 8 | `navy: 'border-t-4 border-[#0B1F45]',` |
| `#0F8A6E` | `components/ui/StatCard.tsx` | 9 | `teal: 'border-t-4 border-[#0F8A6E]',` |
| `#C8973A` | `components/ui/StatCard.tsx` | 10 | `gold: 'border-t-4 border-[#C8973A]',` |
| `#0B1F45` | `components/UserAvatar.tsx` | 53 | `<AvatarFallback className={cn('bg-[#0B1F45] text-white', TEXT_CLASS[size])}>{initials}</AvatarFallback>` |
| `#0B1F45` | `components/workflow/ApprovalQueue.tsx` | 76 | `<p className="font-medium capitalize text-[#0B1F45]">{a.approval_type.replace(/_/g, ' ')}</p>` |
| `#0B1F45` | `tailwind.config.ts` | 23 | `DEFAULT: '#0B1F45',` |
| `#F4F6F9` | `tailwind.config.ts` | 24 | `foreground: '#F4F6F9',` |
| `#C8973A` | `tailwind.config.ts` | 27 | `DEFAULT: '#C8973A',` |
| `#A67C2E` | `tailwind.config.ts` | 28 | `muted: '#A67C2E',` |
| `#0F8A6E` | `tailwind.config.ts` | 31 | `DEFAULT: '#0F8A6E',` |
| `#F0FDF9` | `tailwind.config.ts` | 32 | `foreground: '#F0FDF9',` |
| `#F3F4F6` | `tailwind.config.ts` | 35 | `bg: '#F3F4F6',` |
| `#FFFFFF` | `tailwind.config.ts` | 36 | `card: '#FFFFFF',` |
| `#E5E7EB` | `tailwind.config.ts` | 37 | `border: '#E5E7EB',` |

