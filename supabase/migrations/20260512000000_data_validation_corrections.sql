-- ============================================
-- DATA VALIDATION CORRECTIONS
-- Source: DBJ_PC_Platform_Data_Validation.xlsx
-- Validated by: PCTU Officer + Finance Officer
-- Applied by: MIS Team
-- Date: 2026-05-12
-- ============================================
--
-- Schema notes (from types/database.ts + supabase/migrations):
--   vc_portfolio_funds.currency        text CHECK ('USD','JMD')
--   vc_portfolio_funds.fund_category   text CHECK (snake_case codes)
--   vc_reporting_obligations.status    text CHECK (pending,due,...,accepted,...)
--   vc_capital_calls.status            text CHECK (unpaid,paid,partial,overdue,cancelled)
--   vc_distributions.return_type       text CHECK (dividend,return_of_capital,...)
--   uq_capital_call_notice             UNIQUE (fund_id, notice_number)
--   uq_distribution_number             UNIQUE (fund_id, distribution_number)
--
-- Fund UUIDs: production IDs supplied by PCTU (not fixed in local seeds).
-- Tenant: 12ed8a76-bca0-4f93-8aba-7c0d425d6bb1

BEGIN;

-- ============================================
-- SECTION A — FUND MASTER RECORDS
-- ============================================

-- --------------------------------------------
-- A1 — Caribbean Mezzanine Fund II
-- --------------------------------------------

-- Source: Fund agreement / DBJ records
-- Validated: manager_name was wrong — correct value confirmed as Eppley Limited
UPDATE public.vc_portfolio_funds
SET manager_name = 'Eppley Limited'
WHERE id = 'c08980e1-3851-411c-b4cb-a837e9d3570a'::uuid
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- fund_representative marked WRONG
-- but no correct value provided by validator
-- FLAGGED FOR FOLLOW-UP — not updated
-- Current value: 'Samantha Summerbell'

-- --------------------------------------------
-- A2 — Caribbean Venture Capital Fund
-- --------------------------------------------

-- fund_representative: marked wrong,
-- correct value confirmed as 'Ugo Ikemba'
-- Source: Fund agreement / contact list
UPDATE public.vc_portfolio_funds
SET fund_representative = 'Ugo Ikemba'
WHERE id = '55f28a13-6922-49a2-b57c-b5e21d13d543'::uuid
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- fund_category: validators confirmed "Venture Capital Fund"
-- Schema stores snake_case codes (CHECK constraint).
-- Was bigge_fund (displays as "Bigge Fund"); reclassify to venture_capital_fund.
ALTER TABLE public.vc_portfolio_funds
  DROP CONSTRAINT IF EXISTS vc_portfolio_funds_fund_category_check;

ALTER TABLE public.vc_portfolio_funds
  ADD CONSTRAINT vc_portfolio_funds_fund_category_check
  CHECK (
    fund_category IS NULL
    OR fund_category IN (
      'sme_fund',
      'growth_equity',
      'private_credit',
      'infrastructure',
      'special_situation',
      'angel',
      'bigge_fund',
      'venture_capital_fund'
    )
  );

UPDATE public.vc_portfolio_funds
SET fund_category = 'venture_capital_fund'
WHERE id = '55f28a13-6922-49a2-b57c-b5e21d13d543'::uuid
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- audit_report_due_days: fund agreement
-- specifies 90 days not 120
-- Source: Reporting Obligations sheet
UPDATE public.vc_portfolio_funds
SET audit_report_due_days = 90
WHERE id = '55f28a13-6922-49a2-b57c-b5e21d13d543'::uuid
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- --------------------------------------------
-- A3 — JASMEF 1
-- --------------------------------------------

-- manager_name: current value is incorrect
-- Source: Fund agreement / DBJ records
UPDATE public.vc_portfolio_funds
SET manager_name = 'VMIL Actus Caribbean PE Limited (VACPE)'
WHERE id = 'e52823bc-dd7e-4688-b2e5-3d8147efc1b2'::uuid
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- commitment_date: correct date from
-- signed commitment letter is 2022-06-09
-- not 2022-10-01 as currently stored
UPDATE public.vc_portfolio_funds
SET commitment_date = '2022-06-09'::date
WHERE id = 'e52823bc-dd7e-4688-b2e5-3d8147efc1b2'::uuid
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- quarterly_report_due_days: fund agreement
-- specifies 60 days not the standard 45
UPDATE public.vc_portfolio_funds
SET quarterly_report_due_days = 60
WHERE id = 'e52823bc-dd7e-4688-b2e5-3d8147efc1b2'::uuid
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- --------------------------------------------
-- A4 — JMMB-Vertex SME Holdings
-- --------------------------------------------

-- fund_name: legal name correction
-- Source: Fund agreements / commitment letter
UPDATE public.vc_portfolio_funds
SET fund_name = 'Vertex SME Holdings Limited'
WHERE id = '8c061a29-dc1b-4bc3-8a26-87f850a9e962'::uuid
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- manager_name: source confirmed as
-- JMMB Securities Limited not Vertex Holdings
UPDATE public.vc_portfolio_funds
SET manager_name = 'JMMB Securities Limited'
WHERE id = '8c061a29-dc1b-4bc3-8a26-87f850a9e962'::uuid
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- fund_representative: correct name confirmed
UPDATE public.vc_portfolio_funds
SET fund_representative = 'Jonathan Bair'
WHERE id = '8c061a29-dc1b-4bc3-8a26-87f850a9e962'::uuid
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- commitment_date: correct date from
-- signed commitment letter is 2022-07-01
UPDATE public.vc_portfolio_funds
SET commitment_date = '2022-07-01'::date
WHERE id = '8c061a29-dc1b-4bc3-8a26-87f850a9e962'::uuid
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- performance_fee_pct: validator entered 0.2
-- which means 20% (as a decimal)
-- Store as 20.0 to match existing convention
-- Source: Fund agreement
UPDATE public.vc_portfolio_funds
SET performance_fee_pct = 20.0
WHERE id = '8c061a29-dc1b-4bc3-8a26-87f850a9e962'::uuid
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- --------------------------------------------
-- A5 — NCBCM Stratus Private Equity
-- --------------------------------------------

-- fund_name: legal name correction
-- Source: Fund agreements / commitment letter
UPDATE public.vc_portfolio_funds
SET fund_name = 'Stratus Private Equity & SME Fund'
WHERE id = '88d28a62-8346-496f-aecb-dfc822008d3f'::uuid
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- manager_name: NCB Capital Markets confirmed
-- Validator noted Simone is no longer
-- with the fund, Kerine is current rep
UPDATE public.vc_portfolio_funds
SET manager_name = 'NCB Capital Markets'
WHERE id = '88d28a62-8346-496f-aecb-dfc822008d3f'::uuid
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- fund_representative: spelling corrected
-- from 'Goldson-Wright' to 'Golding-Wright'
UPDATE public.vc_portfolio_funds
SET fund_representative = 'Kerine Golding-Wright'
WHERE id = '88d28a62-8346-496f-aecb-dfc822008d3f'::uuid
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- --------------------------------------------
-- A6 — Quantas Advantage Inc.
-- --------------------------------------------

-- currency: we committed USD 1,000,000
-- not JMD — validator confirmed
-- Source: Fund agreement
UPDATE public.vc_portfolio_funds
SET currency = 'USD'
WHERE id = '35fd2ba0-6a29-4cb3-9596-3546062e68b9'::uuid
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- quarterly_report_due_days: 60 not 45
-- Source: Fund agreement
UPDATE public.vc_portfolio_funds
SET quarterly_report_due_days = 60
WHERE id = '35fd2ba0-6a29-4cb3-9596-3546062e68b9'::uuid
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- is_pvc: marked wrong — currently true
-- fund structure docs confirm NOT a PCV
UPDATE public.vc_portfolio_funds
SET is_pvc = false
WHERE id = '35fd2ba0-6a29-4cb3-9596-3546062e68b9'::uuid
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- --------------------------------------------
-- A7 — Portland JSX
-- --------------------------------------------

-- year_end_month: February (2) not standard
-- report_months: Feb/May/Aug/Nov not standard
-- audit_month: February
-- Source: Fund agreement
UPDATE public.vc_portfolio_funds
SET year_end_month = 2,
    report_months = ARRAY[2, 5, 8, 11]::integer[],
    audit_month = 2,
    audit_report_due_days = 90
WHERE id = '567c25dd-ba96-4d26-b54a-c9c75c0dd43e'::uuid
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- --------------------------------------------
-- A8 — SEAF Global SME Growth Investments
-- --------------------------------------------

-- quarterly_report_due_days: 60 not 45
-- Source: Fund agreement
UPDATE public.vc_portfolio_funds
SET quarterly_report_due_days = 60
WHERE id = '8d22fe16-e484-432c-9c29-647f67e9757d'::uuid
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- ============================================
-- SECTION B — REPORTING OBLIGATIONS
-- ============================================

-- B1 — JMMB-Vertex FY2023 Annual Audit
-- FY2023 annual audit was submitted
-- on December 11, 2026 — validator confirmed
-- System shows OVERDUE — update to accepted
-- Source: PCTU compliance report
UPDATE public.vc_reporting_obligations
SET status = 'accepted',
    submitted_date = '2026-12-11'::date,
    reviewed_date = '2026-12-11'::date
WHERE fund_id = '8c061a29-dc1b-4bc3-8a26-87f850a9e962'::uuid
  AND report_type = 'audited_annual'
  AND period_year = 2023
  AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid;

-- ============================================
-- SECTION C — CAPITAL CALLS (NEW RECORDS)
-- ============================================

-- --------------------------------------------
-- C1 — JASMEF 1: notices 10, 11, 12
-- System had 9; validation confirms 12 total.
-- Existing notices 1–9 are NOT modified.
-- --------------------------------------------

INSERT INTO public.vc_capital_calls (
  id,
  tenant_id,
  fund_id,
  notice_number,
  date_of_notice,
  date_paid,
  call_amount,
  currency,
  status,
  notes
)
SELECT
  gen_random_uuid(),
  '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid,
  'e52823bc-dd7e-4688-b2e5-3d8147efc1b2'::uuid,
  v.notice_number,
  v.date_of_notice::date,
  v.date_of_notice::date,
  v.call_amount,
  'USD',
  'paid',
  v.notes
FROM (
  VALUES
    (10, '2025-06-03', 250696::numeric, 'BabyLove C-G Foods Investment'),
    (11, '2025-06-04', 22002::numeric, 'Management fee + IC Fees + Fund exp.'),
    (12, '2026-03-13', 15757::numeric, 'Management fee + IC Fees + Fund exp.')
) AS v(notice_number, date_of_notice, call_amount, notes)
WHERE NOT EXISTS (
  SELECT 1
  FROM public.vc_capital_calls cc
  WHERE cc.fund_id = 'e52823bc-dd7e-4688-b2e5-3d8147efc1b2'::uuid
    AND cc.notice_number = v.notice_number
    AND cc.tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid
);

-- --------------------------------------------
-- C2 — Caribbean Venture Capital Fund: notices 9 and 10
-- System had 8; validation shows 10 total.
-- Skips if notice_number already exists (idempotent).
-- --------------------------------------------

INSERT INTO public.vc_capital_calls (
  id,
  tenant_id,
  fund_id,
  notice_number,
  date_of_notice,
  date_paid,
  call_amount,
  currency,
  status,
  notes
)
SELECT
  gen_random_uuid(),
  '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid,
  '55f28a13-6922-49a2-b57c-b5e21d13d543'::uuid,
  v.notice_number,
  v.date_of_notice::date,
  v.date_of_notice::date,
  v.call_amount,
  'USD',
  'paid',
  v.notes
FROM (
  VALUES
    (9, '2026-03-10', 35375::numeric, 'Management fee + fund exp.'),
    (10, '2026-05-25', 30625::numeric, 'Management fee')
) AS v(notice_number, date_of_notice, call_amount, notes)
WHERE NOT EXISTS (
  SELECT 1
  FROM public.vc_capital_calls cc
  WHERE cc.fund_id = '55f28a13-6922-49a2-b57c-b5e21d13d543'::uuid
    AND cc.notice_number = v.notice_number
    AND cc.tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid
);

-- --------------------------------------------
-- C3 — SEAF Global: all 32 calls
-- System has 0. Validator confirmed all should be recorded.
-- --------------------------------------------

INSERT INTO public.vc_capital_calls (
  id,
  tenant_id,
  fund_id,
  notice_number,
  date_of_notice,
  date_paid,
  call_amount,
  currency,
  status,
  notes
)
SELECT
  gen_random_uuid(),
  '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid,
  '8d22fe16-e484-432c-9c29-647f67e9757d'::uuid,
  v.notice_number,
  v.date_of_notice::date,
  v.date_of_notice::date,
  v.call_amount,
  'USD',
  'paid',
  v.notes
FROM (
  VALUES
    (1, '2019-10-19', 20805::numeric, 'Management fee & Organizational expenses'),
    (2, '2020-03-17', 5015::numeric, 'Management fee'),
    (3, '2020-07-16', 6923::numeric, 'Management fee & Organizational expenses'),
    (4, '2020-09-14', 216423::numeric, 'Investment, management fee & fund exp.'),
    (5, '2021-01-05', 5775::numeric, 'Management fee & Organizational expenses'),
    (6, '2021-03-23', 6162::numeric, 'Management fee & Organizational expenses'),
    (7, '2021-05-06', -44102::numeric, 'Return of Capital'),
    (8, '2021-06-22', 5969::numeric, 'Management fee & Organizational expenses'),
    (9, '2021-07-16', 23130::numeric, 'Investment'),
    (10, '2021-09-17', 21057::numeric, 'Investment, management fee & fund exp.'),
    (11, '2021-12-17', 5592::numeric, 'Management fee & Organizational expenses'),
    (12, '2022-03-16', -50257::numeric, 'Return of Capital'),
    (13, '2022-03-28', 7366::numeric, 'Management fee & Organizational expenses'),
    (14, '2022-06-16', 5591::numeric, 'Management fee & Organizational expenses'),
    (15, '2022-09-16', 5444::numeric, 'Management fee & Organizational expenses'),
    (16, '2022-09-30', 47446::numeric, 'Investment and fund expenses'),
    (17, '2022-12-23', -45232::numeric, 'Return of Capital'),
    (18, '2022-12-27', 61209::numeric, 'Investment, management fee & fund exp.'),
    (19, '2023-03-22', 54061::numeric, 'Investment, management fee & fund exp.'),
    (20, '2023-06-16', 14221::numeric, 'Investment & management fees'),
    (21, '2023-09-15', 5739::numeric, 'Management & fund expenses'),
    (22, '2023-11-15', 135362::numeric, 'Investment'),
    (23, '2023-12-13', 5000::numeric, 'Management fee'),
    (24, '2024-03-15', 15699::numeric, 'Investment, management fee & fund exp.'),
    (25, '2024-06-14', 59098::numeric, 'Investment, management fees & fund exp.'),
    (26, '2024-09-10', 28608::numeric, 'Investment, management fee & fund exp.'),
    (27, '2024-12-31', 102102::numeric, 'Investment and fund expenses'),
    (28, '2025-03-20', 3650::numeric, 'Management fee & fund expenses'),
    (29, '2025-04-30', 89811::numeric, 'Investment'),
    (30, '2025-06-17', 2912::numeric, 'Management fee'),
    (31, '2025-09-19', 5264::numeric, 'Management & fund expenses'),
    (32, '2025-12-24', 6539::numeric, 'Management & fund expenses')
) AS v(notice_number, date_of_notice, call_amount, notes)
WHERE NOT EXISTS (
  SELECT 1
  FROM public.vc_capital_calls cc
  WHERE cc.fund_id = '8d22fe16-e484-432c-9c29-647f67e9757d'::uuid
    AND cc.notice_number = v.notice_number
    AND cc.tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid
);

-- ============================================
-- SECTION D — DISTRIBUTIONS (NEW RECORDS)
-- ============================================
-- CMF II, Sygnus, Quantas, Vertex already seeded — not re-inserted.

-- --------------------------------------------
-- D1 — MPC Caribbean Clean Energy Fund
-- 1 distribution not currently in system
-- --------------------------------------------

INSERT INTO public.vc_distributions (
  id,
  tenant_id,
  fund_id,
  distribution_number,
  distribution_date,
  return_type,
  amount,
  currency,
  source_company,
  notes
)
SELECT
  gen_random_uuid(),
  '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid,
  '42cce4d5-081c-48d3-b5c7-6f0b6b34d819'::uuid,
  v.distribution_number,
  v.distribution_date::date,
  v.return_type,
  v.amount,
  'USD',
  v.source_company,
  v.notes
FROM (
  VALUES
    (1, '2019-09-27', 'dividend', 89000::numeric, 'Portfolio', 'Dividend')
) AS v(distribution_number, distribution_date, return_type, amount, source_company, notes)
WHERE NOT EXISTS (
  SELECT 1
  FROM public.vc_distributions d
  WHERE d.fund_id = '42cce4d5-081c-48d3-b5c7-6f0b6b34d819'::uuid
    AND d.distribution_number = v.distribution_number
    AND d.tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid
);

-- --------------------------------------------
-- D2 — SEAF Global SME Growth Investments
-- 5 distributions not currently in system
-- --------------------------------------------

INSERT INTO public.vc_distributions (
  id,
  tenant_id,
  fund_id,
  distribution_number,
  distribution_date,
  return_type,
  amount,
  currency,
  notes
)
SELECT
  gen_random_uuid(),
  '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid,
  '8d22fe16-e484-432c-9c29-647f67e9757d'::uuid,
  v.distribution_number,
  v.distribution_date::date,
  'dividend',
  v.amount,
  'USD',
  'Dividend'
FROM (
  VALUES
    (1, '2022-12-23', 4217::numeric),
    (2, '2024-01-03', 4085::numeric),
    (3, '2024-10-25', 6908::numeric),
    (4, '2025-08-25', 1382::numeric),
    (5, '2026-06-11', 1741::numeric)
) AS v(distribution_number, distribution_date, amount)
WHERE NOT EXISTS (
  SELECT 1
  FROM public.vc_distributions d
  WHERE d.fund_id = '8d22fe16-e484-432c-9c29-647f67e9757d'::uuid
    AND d.distribution_number = v.distribution_number
    AND d.tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'::uuid
);

-- ============================================
-- SECTION E — ITEMS NOT UPDATED
-- ============================================

-- ============================================
-- ITEMS FLAGGED FOR FOLLOW-UP
-- These were marked WRONG in the validation
-- but no correct value was provided.
-- Do NOT update until confirmed by PCTU.
-- ============================================

-- 1. Caribbean Mezzanine Fund II
--    fund_representative: current = 'Samantha Summerbell'
--    validator marked WRONG but no correct
--    value entered — needs follow-up

-- 2. Caribbean Mezzanine Fund II
--    dbj_pro_rata_pct: current = 33.33%
--    validator marked WRONG, no correct
--    value given — needs follow-up

-- 3. Quantas Advantage Inc.
--    dbj_pro_rata_pct: marked WRONG,
--    no correct value — needs follow-up

-- 4. Sygnus Credit Investments
--    dbj_pro_rata_pct: marked WRONG,
--    no correct value — needs follow-up

-- 5. JASMEF 1 — capital call amounts/dates
--    Validator noted: "Each of the JASMEF
--    capital calls needs adjustment to date,
--    amounts and purpose. Further explanation
--    required."
--    DO NOT update JASMEF capital calls
--    until further clarification received.
-- ============================================

-- ============================================
-- SECTION F — VERIFICATION QUERIES
-- ============================================

-- Run these after applying migration
-- to verify all corrections were applied:

-- 1. Fund master records summary
-- SELECT id, fund_name, manager_name,
--   fund_representative, commitment_date,
--   performance_fee_pct, currency,
--   quarterly_report_due_days,
--   audit_report_due_days, year_end_month,
--   report_months, is_pvc, fund_category
-- FROM vc_portfolio_funds
-- WHERE tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'
-- ORDER BY fund_name;

-- 2. JMMB-Vertex FY2023 audit status
-- SELECT status, submitted_date, period_year
-- FROM vc_reporting_obligations
-- WHERE fund_id = '8c061a29-dc1b-4bc3-8a26-87f850a9e962'
--   AND report_type = 'audited_annual'
-- ORDER BY period_year;

-- 3. SEAF capital calls (should be 32)
-- SELECT notice_number, date_of_notice,
--   call_amount, status
-- FROM vc_capital_calls
-- WHERE fund_id = '8d22fe16-e484-432c-9c29-647f67e9757d'
--   AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'
-- ORDER BY notice_number;

-- 4. SEAF distributions (should be 5)
-- SELECT distribution_number, distribution_date,
--   amount, currency
-- FROM vc_distributions
-- WHERE fund_id = '8d22fe16-e484-432c-9c29-647f67e9757d'
--   AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'
-- ORDER BY distribution_number;

-- 5. MPC distributions (should be at least 1)
-- SELECT distribution_number, distribution_date,
--   amount
-- FROM vc_distributions
-- WHERE fund_id = '42cce4d5-081c-48d3-b5c7-6f0b6b34d819'
--   AND tenant_id = '12ed8a76-bca0-4f93-8aba-7c0d425d6bb1'
-- ORDER BY distribution_number;

COMMIT;
