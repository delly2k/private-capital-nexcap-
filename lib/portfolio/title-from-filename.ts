/**
 * Derive a display title from an uploaded filename (client + server).
 * Preserves existing capitalization; does not force title case.
 */

export function titleFromFilename(filename: string): string {
  const raw = (filename ?? '').trim();
  if (!raw) return '';

  // Strip a trailing extension using the last dot, but keep leading-dot names (e.g. ".gitignore")
  let base = raw;
  const lastDot = raw.lastIndexOf('.');
  if (lastDot > 0) {
    base = raw.slice(0, lastDot);
  }

  return base
    .replace(/[_]+/g, ' ')
    .replace(/[-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
