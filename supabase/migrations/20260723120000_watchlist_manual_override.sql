-- Watchlist: manual placement, history, stale/review fields
BEGIN;

ALTER TABLE public.vc_watchlist
  ADD COLUMN IF NOT EXISTS placement_type text NOT NULL DEFAULT 'automatic',
  ADD COLUMN IF NOT EXISTS placed_by uuid REFERENCES public.vc_profiles (id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS removal_reason text,
  ADD COLUMN IF NOT EXISTS removed_by uuid REFERENCES public.vc_profiles (id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS removed_at timestamptz,
  ADD COLUMN IF NOT EXISTS last_assessed_at timestamptz,
  ADD COLUMN IF NOT EXISTS last_reviewed_at timestamptz,
  ADD COLUMN IF NOT EXISTS last_reviewed_by uuid REFERENCES public.vc_profiles (id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS next_review_due date;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'vc_watchlist_placement_type_check'
      AND conrelid = 'public.vc_watchlist'::regclass
  ) THEN
    ALTER TABLE public.vc_watchlist
      ADD CONSTRAINT vc_watchlist_placement_type_check
      CHECK (placement_type IN ('automatic', 'manual'));
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.vc_watchlist_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
  tenant_id uuid NOT NULL REFERENCES public.vc_tenants (id) ON DELETE CASCADE,
  fund_id uuid NOT NULL REFERENCES public.vc_portfolio_funds (id) ON DELETE CASCADE,
  action text NOT NULL,
  placement_type text NOT NULL,
  reason text,
  assessment_id uuid REFERENCES public.vc_quarterly_assessments (id) ON DELETE SET NULL,
  performed_by uuid REFERENCES public.vc_profiles (id) ON DELETE SET NULL,
  consecutive_quarters integer,
  score numeric,
  category text,
  created_at timestamptz NOT NULL DEFAULT now (),
  CONSTRAINT vc_watchlist_history_action_check CHECK (
    action IN ('placed', 'removed', 'escalated', 'updated')
  ),
  CONSTRAINT vc_watchlist_history_placement_type_check CHECK (
    placement_type IN ('automatic', 'manual')
  )
);

CREATE INDEX IF NOT EXISTS idx_vc_watchlist_history_tenant_fund_created
  ON public.vc_watchlist_history (tenant_id, fund_id, created_at DESC);

ALTER TABLE public.vc_watchlist_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS vc_watchlist_history_select ON public.vc_watchlist_history;
CREATE POLICY vc_watchlist_history_select ON public.vc_watchlist_history
  FOR SELECT TO authenticated
  USING (tenant_id = public.get_my_tenant_id ());

DROP POLICY IF EXISTS vc_watchlist_history_insert ON public.vc_watchlist_history;
CREATE POLICY vc_watchlist_history_insert ON public.vc_watchlist_history
  FOR INSERT TO authenticated
  WITH CHECK (
    tenant_id = public.get_my_tenant_id ()
    AND public.vc_can_write_standard ()
  );

COMMIT;
