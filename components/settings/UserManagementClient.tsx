'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle, Mail, Users, X } from 'lucide-react';

import type { PendingInviteVm, UserManagementSnapshot, UserRowVm } from '@/lib/settings/user-management-snapshot';
import { roleAvatarClass, roleBadgeClass, roleDisplayLabel } from '@/lib/settings/role-visual';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AddInternalUserModal } from '@/components/settings/AddInternalUserModal';

type Props = {
  initial: UserManagementSnapshot;
  currentProfileId: string;
};

const ASSIGNABLE_ROLES = [
  'pctu_officer',
  'portfolio_manager',
  'investment_officer',
  'panel_member',
  'it_admin',
  'senior_management',
  'analyst',
  'officer',
  'viewer',
  'fund_manager',
] as const;

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');
}

function formatAssigned(at: string, by: string | null) {
  const d = new Date(at);
  // Use fixed locale/time zone to avoid SSR/client hydration mismatch.
  const date = Number.isFinite(d.getTime()) ? new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC' }).format(d) : '—';
  return by ? `${date} · by ${by}` : date;
}

function apiErrorMessage(body: { message?: string; error?: unknown }, fallback: string): string {
  if (body.message && typeof body.message === 'string') return body.message;
  if (typeof body.error === 'string') return body.error;
  return fallback;
}

export function UserManagementClient({ initial, currentProfileId }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const invited = searchParams.get('invited');

  const [tab, setTab] = useState<'users' | 'invites' | 'inactive'>('users');
  const [users, setUsers] = useState(initial.users);
  const [invites, setInvites] = useState(initial.pending_invitations);
  const [stats, setStats] = useState(initial.stats);
  const [editingRoleForId, setEditingRoleForId] = useState<string | null>(null);
  const [pendingRole, setPendingRole] = useState('');
  const [isSavingRole, setIsSavingRole] = useState(false);
  const [deactivatingId, setDeactivatingId] = useState<string | null>(null);
  const [reactivateUser, setReactivateUser] = useState<UserRowVm | null>(null);
  const [showAddInternalModal, setShowAddInternalModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const res = await fetch('/api/settings/users');
    if (!res.ok) return;
    const j = (await res.json()) as UserManagementSnapshot;
    setUsers(j.users);
    setInvites(j.pending_invitations);
    setStats(j.stats);
  }, []);

  const handleRoleChange = async (profileId: string, newRole: string) => {
    setIsSavingRole(true);
    setError(null);
    try {
      const res = await fetch(`/api/settings/users/${profileId}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string; error?: unknown };
        setError(apiErrorMessage(body, 'Failed to update role'));
        return;
      }
      setEditingRoleForId(null);
      setPendingRole('');
      setNotice(`Role updated to ${roleDisplayLabel(newRole)}.`);
      await refresh();
      router.refresh();
    } catch {
      setError('Failed to update role');
    } finally {
      setIsSavingRole(false);
    }
  };

  const handleDeactivate = async (profileId: string) => {
    const confirmed = window.confirm(
      'Deactivate this user? They will lose access to the platform immediately.',
    );
    if (!confirmed) return;

    setDeactivatingId(profileId);
    setError(null);
    try {
      const res = await fetch(`/api/settings/users/${profileId}/deactivate`, { method: 'PATCH' });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string; error?: unknown };
        setError(apiErrorMessage(body, 'Failed to deactivate user'));
        return;
      }
      setNotice('User has been deactivated.');
      setEditingRoleForId(null);
      await refresh();
      router.refresh();
    } catch {
      setError('Failed to deactivate user');
    } finally {
      setDeactivatingId(null);
    }
  };

  const onReactivate = async () => {
    if (!reactivateUser) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/settings/users/${reactivateUser.profile_id}/reactivate`, {
        method: 'PATCH',
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string; error?: unknown };
        setError(apiErrorMessage(body, 'Failed to reactivate user'));
        return;
      }
      setNotice(`${reactivateUser.full_name} has been reactivated.`);
      setReactivateUser(null);
      await refresh();
      router.refresh();
    } catch {
      setError('Failed to reactivate user');
    } finally {
      setBusy(false);
    }
  };

  const onResend = async (id: string) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/settings/users/invitations/${id}/resend`, { method: 'PATCH' });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string; error?: unknown };
        setError(apiErrorMessage(body, 'Failed to resend invitation'));
        return;
      }
      setNotice('Invitation resent.');
      await refresh();
    } catch {
      setError('Failed to resend invitation');
    } finally {
      setBusy(false);
    }
  };

  const onRevoke = async (id: string) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/settings/users/invitations/${id}/revoke`, { method: 'PATCH' });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { message?: string; error?: unknown };
        setError(apiErrorMessage(body, 'Failed to revoke invitation'));
        return;
      }
      setNotice('Invitation revoked.');
      await refresh();
    } catch {
      setError('Failed to revoke invitation');
    } finally {
      setBusy(false);
    }
  };

  const inviteExpiresLabel = useMemo(() => {
    return (iso: string) => {
      const t = new Date(iso).getTime();
      if (!Number.isFinite(t)) return { text: '—', expired: false };
      const expired = t < Date.now();
      if (expired) return { text: 'Expired', expired: true };
      const days = Math.ceil((t - Date.now()) / (24 * 60 * 60 * 1000));
      return {
        text: `${days} day${days === 1 ? '' : 's'} remaining`,
        expired: false,
      };
    };
  }, []);

  const activeUsers = users.filter((u) => u.is_active && u.profile_active);
  const inactiveUsers = users.filter((u) => !u.is_active || !u.profile_active);

  return (
    <div className="w-full max-w-none space-y-6 pb-10">
      {error ? (
        <div
          style={{
            background: '#FEE2E2',
            border: '0.5px solid #FCA5A5',
            borderRadius: 8,
            padding: '10px 14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <div style={{ fontSize: 13, color: '#991B1B' }}>{error}</div>
          <button
            type="button"
            onClick={() => setError(null)}
            style={{
              background: 'none',
              border: 'none',
              color: '#991B1B',
              cursor: 'pointer',
              fontSize: 16,
              padding: 0,
            }}
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      ) : null}
      {notice ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {notice}
        </div>
      ) : null}
      {invited ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Invitation sent to {decodeURIComponent(invited)}.
        </div>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1F45]">User Management</h1>
          <p className="mt-1 text-sm text-gray-400">Manage platform access and roles</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button className="bg-[#0B1F45] text-white hover:bg-[#0B1F45]/90" onClick={() => setShowAddInternalModal(true)}>
            + Add Internal User
          </Button>
          <Button asChild variant="outline" className="border-gray-300 text-gray-700">
            <Link href="/settings/users/invite">+ Invite External User</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="border-t-4 border-blue-500 pt-1" />
          <div className="mt-2 flex items-center gap-2 text-blue-600">
            <Users className="h-5 w-5" />
            <span className="text-2xl font-bold text-[#0B1F45]">{stats.activeUsers}</span>
          </div>
          <p className="mt-1 text-sm font-medium text-gray-600">Active Users</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="border-t-4 border-amber-500 pt-1" />
          <div className="mt-2 flex items-center gap-2 text-amber-600">
            <Mail className="h-5 w-5" />
            <span className="text-2xl font-bold text-[#0B1F45]">{stats.pendingInvites}</span>
          </div>
          <p className="mt-1 text-sm font-medium text-gray-600">Pending Invites</p>
          {stats.pendingInvites > 0 ? (
            <p className="mt-0.5 text-xs text-amber-600">Awaiting acceptance</p>
          ) : null}
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="border-t-4 border-[#0B1F45] pt-1" />
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-gray-400">By Role</p>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li className="flex justify-between">
              <span>PCTU Officers</span>
              <span className="font-medium text-[#0B1F45]">{stats.roleCounts.pctu_officer}</span>
            </li>
            <li className="flex justify-between">
              <span>Investment Officers</span>
              <span className="font-medium text-[#0B1F45]">{stats.roleCounts.investment_officer}</span>
            </li>
            <li className="flex justify-between">
              <span>Portfolio Managers</span>
              <span className="font-medium text-[#0B1F45]">{stats.roleCounts.portfolio_manager}</span>
            </li>
            <li className="flex justify-between">
              <span>Panel Members</span>
              <span className="font-medium text-[#0B1F45]">{stats.roleCounts.panel_member}</span>
            </li>
            <li className="flex justify-between">
              <span>IT Admins</span>
              <span className="font-medium text-[#0B1F45]">{stats.roleCounts.it_admin}</span>
            </li>
            <li className="flex justify-between">
              <span>Senior Management</span>
              <span className="font-medium text-[#0B1F45]">{stats.roleCounts.senior_management}</span>
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="border-t-4 border-[#0F8A6E] pt-1" />
          <p className="mt-2 text-2xl font-bold text-[#0B1F45]">{stats.lastActivityLabel}</p>
          <p className="mt-1 text-sm font-medium text-gray-600">Recently Added</p>
          <p className="mt-0.5 text-xs text-gray-500">Based on invites & assignments</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex gap-2 border-b border-gray-100 px-4 pt-3">
          <button
            type="button"
            className={cn(
              'border-b-2 px-3 pb-2 text-sm font-medium',
              tab === 'users' ? 'border-[#0B1F45] text-[#0B1F45]' : 'border-transparent text-gray-500',
            )}
            onClick={() => setTab('users')}
          >
            Active Users
          </button>
          <button
            type="button"
            className={cn(
              'border-b-2 px-3 pb-2 text-sm font-medium',
              tab === 'invites' ? 'border-[#0B1F45] text-[#0B1F45]' : 'border-transparent text-gray-500',
            )}
            onClick={() => setTab('invites')}
          >
            Pending Invitations
          </button>
          <button
            type="button"
            className={cn(
              'border-b-2 px-3 pb-2 text-sm font-medium',
              tab === 'inactive' ? 'border-[#0B1F45] text-[#0B1F45]' : 'border-transparent text-gray-500',
            )}
            onClick={() => setTab('inactive')}
          >
            Inactive Users
          </button>
        </div>

        {tab === 'users' ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Assigned</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeUsers.map((row) => {
                  const isActualAdmin = row.role === 'admin';
                  const isSelf = row.profile_id === currentProfileId;
                  const noActions = isActualAdmin || isSelf;
                  return (
                    <tr key={row.user_role_id} className="border-b border-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={cn(
                              'inline-flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold',
                              roleAvatarClass(row.role),
                            )}
                          >
                            {initials(row.full_name)}
                          </span>
                          <div>
                            <p className="font-semibold text-[#0B1F45]">{row.full_name}</p>
                            <p className="text-xs text-gray-400">{row.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {editingRoleForId === row.profile_id ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <select
                              value={pendingRole}
                              onChange={(e) => setPendingRole(e.target.value)}
                              style={{
                                fontSize: 12,
                                padding: '4px 8px',
                                borderRadius: 6,
                                border: '0.5px solid var(--color-border-secondary, #D1D5DB)',
                                background: 'var(--color-background-primary, #fff)',
                                color: 'var(--color-text-primary, #0B1F45)',
                              }}
                            >
                              {ASSIGNABLE_ROLES.map((r) => (
                                <option key={r} value={r}>
                                  {roleDisplayLabel(r)}
                                </option>
                              ))}
                            </select>
                            <button
                              type="button"
                              onClick={() => void handleRoleChange(row.profile_id, pendingRole)}
                              disabled={isSavingRole || !pendingRole || pendingRole === row.role}
                              style={{
                                fontSize: 11,
                                color: 'white',
                                background: '#0B1F45',
                                border: 'none',
                                borderRadius: 6,
                                padding: '4px 10px',
                                cursor: 'pointer',
                              }}
                            >
                              {isSavingRole ? 'Saving...' : 'Save'}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingRoleForId(null);
                                setPendingRole('');
                              }}
                              style={{
                                fontSize: 11,
                                color: 'var(--color-text-secondary, #6B7280)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <span
                            className={cn(
                              'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
                              roleBadgeClass(row.role),
                            )}
                          >
                            {roleDisplayLabel(row.role)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{formatAssigned(row.assigned_at, row.assigned_by_name)}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                          <span className={cn('h-2 w-2 rounded-full bg-[#0F8A6E]')} />
                          Active
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {noActions ? (
                          <span
                            style={{
                              fontSize: 12,
                              color: 'var(--color-text-tertiary, #9CA3AF)',
                              fontStyle: 'italic',
                            }}
                          >
                            {isSelf ? 'You' : 'Admin'}
                          </span>
                        ) : (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                              gap: 12,
                            }}
                          >
                            {editingRoleForId !== row.profile_id ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingRoleForId(row.profile_id);
                                    setPendingRole(row.role);
                                    setError(null);
                                  }}
                                  style={{
                                    fontSize: 12,
                                    color: '#0066CC',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    fontWeight: 500,
                                  }}
                                >
                                  Edit role
                                </button>
                                <button
                                  type="button"
                                  onClick={() => void handleDeactivate(row.profile_id)}
                                  disabled={deactivatingId === row.profile_id}
                                  style={{
                                    fontSize: 12,
                                    color: '#991B1B',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    fontWeight: 500,
                                  }}
                                >
                                  {deactivatingId === row.profile_id ? 'Deactivating...' : 'Deactivate'}
                                </button>
                              </>
                            ) : null}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {activeUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      No active users.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        ) : tab === 'invites' ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">Invited User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Invited By</th>
                  <th className="px-4 py-3">Expires</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invites.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      No pending invitations.
                    </td>
                  </tr>
                ) : (
                  invites.map((inv: PendingInviteVm) => {
                    const exp = inviteExpiresLabel(inv.token_expires_at);
                    return (
                      <tr key={inv.id} className="border-b border-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600">
                              {initials(inv.full_name)}
                            </span>
                            <div>
                              <p className="font-semibold text-[#0B1F45]">{inv.full_name}</p>
                              <p className="text-xs text-gray-400">{inv.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={cn(
                              'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
                              roleBadgeClass(inv.role),
                            )}
                          >
                            {roleDisplayLabel(inv.role)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{inv.invited_by_name ?? '—'}</td>
                        <td className="px-4 py-3">
                          {exp.expired ? (
                            <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
                              Expired
                            </span>
                          ) : (
                            <span className="text-sm text-gray-500">{exp.text}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => void onResend(inv.id)}>
                              Resend
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="text-red-600"
                              disabled={busy}
                              onClick={() => void onRevoke(inv.id)}
                            >
                              Revoke
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Deactivated</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inactiveUsers.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                      No inactive users.
                    </td>
                  </tr>
                ) : (
                  inactiveUsers.map((row) => (
                    <tr key={row.user_role_id} className="border-b border-gray-50 text-gray-500">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3 opacity-50">
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-500">
                            {initials(row.full_name)}
                          </span>
                          <div>
                            <p className="font-semibold text-gray-400">{row.full_name}</p>
                            <p className="text-xs text-gray-400">{row.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium opacity-50',
                            roleBadgeClass(row.role),
                          )}
                        >
                          {roleDisplayLabel(row.role)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        Deactivated:{' '}
                        {row.deactivated_at
                          ? `${Math.max(
                              0,
                              Math.floor((Date.now() - new Date(row.deactivated_at).getTime()) / (24 * 60 * 60 * 1000)),
                            )} days ago`
                          : '—'}
                        {row.deactivated_by_name ? ` by ${row.deactivated_by_name}` : ''}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          className="rounded-lg border border-teal-200 px-3 py-1.5 text-xs font-medium text-teal-600 transition-colors hover:border-teal-300 hover:bg-teal-50"
                          onClick={() => setReactivateUser(row)}
                        >
                          Reactivate
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ActionConfirmModal
        open={!!reactivateUser}
        busy={busy}
        title={reactivateUser ? `Reactivate ${reactivateUser.full_name}?` : ''}
        description={
          reactivateUser
            ? `They will regain access with their previous role: ${roleDisplayLabel(reactivateUser.role)}.`
            : ''
        }
        confirmLabel="Yes, Reactivate"
        kind="reactivate"
        confirmClassName="bg-[#0F8A6E] hover:bg-[#0a6e58]"
        onCancel={() => setReactivateUser(null)}
        onConfirm={() => void onReactivate()}
      />

      <AddInternalUserModal
        open={showAddInternalModal}
        onClose={() => setShowAddInternalModal(false)}
        onAdded={(msg) => {
          setNotice(msg);
          setError(null);
          void refresh();
          router.refresh();
        }}
      />
    </div>
  );
}

function ActionConfirmModal({
  open,
  busy,
  title,
  description,
  confirmLabel,
  confirmClassName = 'bg-red-600 hover:bg-red-700',
  kind,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  busy: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  confirmClassName?: string;
  kind: 'deactivate' | 'reactivate';
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          <div
            className={cn(
              'mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full',
              kind === 'reactivate' ? 'bg-teal-100' : 'bg-red-100',
            )}
          >
            {kind === 'reactivate' ? (
              <CheckCircle className="h-7 w-7 text-teal-600" />
            ) : (
              <AlertTriangle className="h-7 w-7 text-red-600" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-[#0B1F45]">{title}</h3>
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        </div>
        <div className="mt-6 flex justify-center gap-3">
          <Button type="button" variant="outline" onClick={onCancel} disabled={busy} className="flex-1">
            Cancel
          </Button>
          <Button
            type="button"
            className={cn('flex-1 text-white', confirmClassName)}
            onClick={onConfirm}
            disabled={busy}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
