-- Remove inhouse_quarterly report type from the entire platform

-- 1. Delete all obligations of this type (all tenants — CHECK cannot drop while rows remain)
DELETE FROM public.vc_reporting_obligations
WHERE report_type = 'inhouse_quarterly';

-- 2. Clear fund settings flag before dropping the column
UPDATE public.vc_portfolio_funds
SET requires_inhouse_quarterly = false
WHERE requires_inhouse_quarterly IS DISTINCT FROM false;

-- 3. Recreate report_type CHECK without inhouse_quarterly
ALTER TABLE public.vc_reporting_obligations
  DROP CONSTRAINT IF EXISTS vc_reporting_obligations_report_type_check;

ALTER TABLE public.vc_reporting_obligations
  ADD CONSTRAINT vc_reporting_obligations_report_type_check
  CHECK (
    report_type = ANY (
      ARRAY[
        'quarterly_financial'::text,
        'quarterly_investment_mgmt'::text,
        'audited_annual'::text
      ]
    )
  );

-- 4. Drop the fund settings column so the type cannot be re-enabled
ALTER TABLE public.vc_portfolio_funds
  DROP COLUMN IF EXISTS requires_inhouse_quarterly;
