import { WatchlistClient } from '@/components/portfolio/WatchlistClient';
import { getProfile, requireAuth } from '@/lib/auth/session';
import { can } from '@/lib/auth/permissions';

export const dynamic = 'force-dynamic';

export default async function WatchlistPage() {
  await requireAuth();
  const profile = await getProfile();
  if (!profile || !can(profile, 'read:tenant')) {
    return <p className="text-sm text-red-700">You do not have permission to view this page. Contact your administrator if you believe this is incorrect.</p>
  }

  return (
    <div className="space-y-6">
      <WatchlistClient />
    </div>
  );
}
