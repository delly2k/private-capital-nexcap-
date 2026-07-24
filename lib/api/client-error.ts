export type ApiErrorBody = {
  error?: string;
  message?: string;
};

export function apiErrorDisplay(
  body: ApiErrorBody | null | undefined,
  fallback = 'Something went wrong. Please try again.',
): string {
  if (body?.message && body.message.trim()) return body.message;
  if (body?.error && body.error.trim()) return body.error;
  return fallback;
}

export function isPermissionDeniedError(
  body: ApiErrorBody | null | undefined,
  status?: number,
): boolean {
  if (status === 403) return true;
  const err = (body?.error ?? '').toLowerCase();
  const msg = (body?.message ?? '').toLowerCase();
  return (
    err === 'access denied' ||
    err === 'forbidden' ||
    msg.includes('does not have permission') ||
    msg.includes('permission denied')
  );
}

export type ApiErrorBannerVariant = 'permission' | 'not_found' | 'generic';

export function apiErrorBannerVariant(
  body: ApiErrorBody | null | undefined,
  status?: number,
): ApiErrorBannerVariant {
  if (isPermissionDeniedError(body, status)) return 'permission';
  if (status === 404 || (body?.error ?? '').toLowerCase() === 'not found') return 'not_found';
  return 'generic';
}

/** Infer banner style when only the display string is available (e.g. after throw). */
export function bannerVariantFromDisplay(message: string): ApiErrorBannerVariant {
  const m = message.toLowerCase();
  if (
    m.includes('does not have permission') ||
    m.includes('permission denied') ||
    m.includes('access denied') ||
    m === 'forbidden'
  ) {
    return 'permission';
  }
  if (m.includes('not found')) return 'not_found';
  return 'generic';
}
