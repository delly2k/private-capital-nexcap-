-- Portfolio fund document library (general/legal docs — separate from reporting obligations)

BEGIN;

CREATE TABLE IF NOT EXISTS public.vc_portfolio_fund_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
  tenant_id uuid NOT NULL REFERENCES public.vc_tenants (id) ON DELETE CASCADE,
  fund_id uuid NOT NULL REFERENCES public.vc_portfolio_funds (id) ON DELETE CASCADE,
  title text NOT NULL,
  category text NOT NULL,
  document_path text NOT NULL,
  document_name text NOT NULL,
  mime_type text,
  file_size bigint,
  notes text,
  effective_date date,
  uploaded_by uuid NOT NULL REFERENCES public.vc_profiles (id) ON DELETE RESTRICT,
  uploaded_at timestamptz NOT NULL DEFAULT now (),
  updated_by uuid REFERENCES public.vc_profiles (id) ON DELETE SET NULL,
  updated_at timestamptz NOT NULL DEFAULT now (),
  CONSTRAINT vc_portfolio_fund_documents_category_check CHECK (
    category IN (
      'legal_agreement',
      'side_letter',
      'amendment',
      'governance',
      'notice',
      'financial',
      'other'
    )
  ),
  CONSTRAINT vc_portfolio_fund_documents_title_nonempty CHECK (length(trim(title)) > 0),
  CONSTRAINT vc_portfolio_fund_documents_name_nonempty CHECK (length(trim(document_name)) > 0)
);

CREATE INDEX IF NOT EXISTS idx_vc_portfolio_fund_documents_tenant
  ON public.vc_portfolio_fund_documents (tenant_id);

CREATE INDEX IF NOT EXISTS idx_vc_portfolio_fund_documents_fund
  ON public.vc_portfolio_fund_documents (fund_id);

CREATE INDEX IF NOT EXISTS idx_vc_portfolio_fund_documents_tenant_fund
  ON public.vc_portfolio_fund_documents (tenant_id, fund_id);

CREATE INDEX IF NOT EXISTS idx_vc_portfolio_fund_documents_category
  ON public.vc_portfolio_fund_documents (category);

CREATE INDEX IF NOT EXISTS idx_vc_portfolio_fund_documents_uploaded_at
  ON public.vc_portfolio_fund_documents (uploaded_at DESC);

DROP TRIGGER IF EXISTS trg_vc_portfolio_fund_documents_updated_at ON public.vc_portfolio_fund_documents;
CREATE TRIGGER trg_vc_portfolio_fund_documents_updated_at
  BEFORE UPDATE ON public.vc_portfolio_fund_documents
  FOR EACH ROW EXECUTE PROCEDURE public.vc_set_updated_at ();

ALTER TABLE public.vc_portfolio_fund_documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS vc_portfolio_fund_documents_select ON public.vc_portfolio_fund_documents;
CREATE POLICY vc_portfolio_fund_documents_select ON public.vc_portfolio_fund_documents
  FOR SELECT TO authenticated
  USING (tenant_id = public.get_my_tenant_id ());

DROP POLICY IF EXISTS vc_portfolio_fund_documents_insert ON public.vc_portfolio_fund_documents;
CREATE POLICY vc_portfolio_fund_documents_insert ON public.vc_portfolio_fund_documents
  FOR INSERT TO authenticated
  WITH CHECK (
    tenant_id = public.get_my_tenant_id ()
    AND public.vc_can_write_standard ()
  );

DROP POLICY IF EXISTS vc_portfolio_fund_documents_update ON public.vc_portfolio_fund_documents;
CREATE POLICY vc_portfolio_fund_documents_update ON public.vc_portfolio_fund_documents
  FOR UPDATE TO authenticated
  USING (
    tenant_id = public.get_my_tenant_id ()
    AND public.vc_can_write_standard ()
  )
  WITH CHECK (
    tenant_id = public.get_my_tenant_id ()
    AND public.vc_can_write_standard ()
  );

DROP POLICY IF EXISTS vc_portfolio_fund_documents_delete ON public.vc_portfolio_fund_documents;
CREATE POLICY vc_portfolio_fund_documents_delete ON public.vc_portfolio_fund_documents
  FOR DELETE TO authenticated
  USING (
    tenant_id = public.get_my_tenant_id ()
    AND (public.vc_can_write_standard () OR public.vc_is_admin ())
  );

-- Dedicated private bucket for general fund documents (not reporting obligations)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-documents',
  'portfolio-documents',
  false,
  20971520,
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv',
    'image/png',
    'image/jpeg'
  ]::text[]
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS portfolio_documents_storage_select ON storage.objects;
CREATE POLICY portfolio_documents_storage_select ON storage.objects
  FOR SELECT TO authenticated
  USING (
    bucket_id = 'portfolio-documents'
    AND split_part(name, '/', 1) = public.get_my_tenant_id ()::text
  );

DROP POLICY IF EXISTS portfolio_documents_storage_insert ON storage.objects;
CREATE POLICY portfolio_documents_storage_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'portfolio-documents'
    AND split_part(name, '/', 1) = public.get_my_tenant_id ()::text
  );

DROP POLICY IF EXISTS portfolio_documents_storage_update ON storage.objects;
CREATE POLICY portfolio_documents_storage_update ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'portfolio-documents'
    AND split_part(name, '/', 1) = public.get_my_tenant_id ()::text
  );

DROP POLICY IF EXISTS portfolio_documents_storage_delete ON storage.objects;
CREATE POLICY portfolio_documents_storage_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'portfolio-documents'
    AND split_part(name, '/', 1) = public.get_my_tenant_id ()::text
  );

COMMIT;
