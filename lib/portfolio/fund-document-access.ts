/**
 * Auth helpers for portfolio fund document library APIs.
 * Portal fund managers are excluded in this phase.
 */

import { can } from '@/lib/auth/permissions';
import type { Profile } from '@/types/auth';

export function canReadFundDocuments(profile: Profile | null | undefined): boolean {
  if (!profile || !profile.is_active) return false;
  if (profile.role === 'fund_manager') return false;
  return can(profile, 'read:tenant');
}

export function canManageFundDocuments(profile: Profile | null | undefined): boolean {
  if (!profile || !profile.is_active) return false;
  if (profile.role === 'fund_manager') return false;
  return can(profile, 'write:applications') || can(profile, 'delete:records');
}
