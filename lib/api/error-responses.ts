import { NextResponse } from 'next/server';

export function forbidden(message: string) {
  return NextResponse.json({ error: 'Access denied', message }, { status: 403 });
}

export function notFound(message = 'Resource not found') {
  return NextResponse.json({ error: 'Not found', message }, { status: 404 });
}

export function badRequest(message: string) {
  return NextResponse.json({ error: 'Bad request', message }, { status: 400 });
}

export function serverError(message = 'An unexpected error occurred') {
  return NextResponse.json({ error: 'Server error', message }, { status: 500 });
}

/** Action-specific messages for portfolio 403 responses. */
export const FORBIDDEN_MSG = {
  capitalCalls:
    'Your role does not have permission to manage capital calls. Configure this in Settings → Roles.',
  distributions:
    'Your role does not have permission to manage distributions. Configure this in Settings → Roles.',
  assessments:
    'Your role does not have permission to manage assessments. Contact your administrator.',
  snapshots:
    'Your role does not have permission to manage fund snapshots. Contact your administrator.',
  reporting:
    'Your role does not have permission to manage reporting obligations. Configure this in Settings → Roles.',
  watchlist:
    'Your role does not have permission to manage the watchlist. Configure this in Settings → Roles.',
  divestments:
    'Your role does not have permission to manage divestments. Contact your administrator.',
  fundEdit:
    'Your role does not have permission to edit fund details. Contact your administrator.',
  fundMonitoring:
    'Your role does not have permission to manage fund details. Configure this in Settings → Roles.',
  generic:
    'You do not have permission to perform this action. Contact your administrator if you believe this is incorrect.',
} as const;

export function forbiddenMessageForPortfolioPath(filePath: string): string {
  const p = filePath.replace(/\\/g, '/');
  if (p.includes('/capital-calls')) return FORBIDDEN_MSG.capitalCalls;
  if (p.includes('/distributions')) return FORBIDDEN_MSG.distributions;
  if (p.includes('/assessments')) return FORBIDDEN_MSG.assessments;
  if (p.includes('/performance') || p.includes('/snapshots')) return FORBIDDEN_MSG.snapshots;
  if (p.includes('/reporting') || p.includes('/obligations')) return FORBIDDEN_MSG.reporting;
  if (p.includes('/watchlist')) return FORBIDDEN_MSG.watchlist;
  if (p.includes('/divestments')) return FORBIDDEN_MSG.divestments;
  if (/\/funds\/\[id\]\/route\.ts$/.test(p) || /\/funds\/\[id\]\\route\.ts$/.test(p)) {
    return FORBIDDEN_MSG.fundEdit;
  }
  return FORBIDDEN_MSG.generic;
}
