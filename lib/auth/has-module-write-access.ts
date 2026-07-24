import 'server-only';

import { ALL_MODULE_IDS } from '@/lib/auth/module-access';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * Second-gate write check for portfolio modules configured in Settings → Roles.
 * Reads `vc_role_permissions` (service role). Admin always allowed.
 * Missing row or access_level !== 'full' → false.
 */
export async function hasModuleWriteAccess(
  tenantId: string,
  role: string,
  moduleId: string,
): Promise<boolean> {
  if (role === 'admin') return true;
  if (!tenantId || !role || !ALL_MODULE_IDS.includes(moduleId)) return false;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('vc_role_permissions')
    .select('access_level')
    .eq('tenant_id', tenantId)
    .eq('role', role)
    .eq('module_id', moduleId)
    .maybeSingle();

  if (error || !data) return false;
  return String((data as { access_level?: string | null }).access_level) === 'full';
}
