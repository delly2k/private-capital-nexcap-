import type { ApiErrorBannerVariant } from '@/lib/api/client-error';

type Props = {
  message: string;
  variant?: ApiErrorBannerVariant;
  className?: string;
};

const STYLES: Record<
  ApiErrorBannerVariant,
  { bg: string; border: string; icon: string; iconColor: string; title: string; titleColor: string; textColor: string }
> = {
  permission: {
    bg: '#FEE2E2',
    border: '#FCA5A5',
    icon: 'ti ti-lock',
    iconColor: '#991B1B',
    title: 'Permission denied',
    titleColor: '#991B1B',
    textColor: '#B91C1C',
  },
  not_found: {
    bg: '#F3F4F6',
    border: '#D1D5DB',
    icon: 'ti ti-alert-circle',
    iconColor: '#4B5563',
    title: 'Not found',
    titleColor: '#374151',
    textColor: '#4B5563',
  },
  generic: {
    bg: '#FEF3C7',
    border: '#FCD34D',
    icon: 'ti ti-alert-circle',
    iconColor: '#92400E',
    title: 'Something went wrong',
    titleColor: '#92400E',
    textColor: '#B45309',
  },
};

export function ApiErrorBanner({ message, variant = 'generic', className }: Props) {
  if (!message) return null;
  const s = STYLES[variant];
  return (
    <div
      className={className}
      role="alert"
      style={{
        background: s.bg,
        border: `0.5px solid ${s.border}`,
        borderRadius: 8,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
        marginBottom: 16,
      }}
    >
      <i
        className={s.icon}
        style={{ color: s.iconColor, fontSize: 16, flexShrink: 0, marginTop: 1 }}
        aria-hidden="true"
      />
      <div>
        <div style={{ fontSize: 13, fontWeight: 500, color: s.titleColor, marginBottom: 2 }}>{s.title}</div>
        <div style={{ fontSize: 12, color: s.textColor, lineHeight: 1.5 }}>{message}</div>
      </div>
    </div>
  );
}
