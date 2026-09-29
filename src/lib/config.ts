/** A config value still holding an unresolved `[ADD ...]` marker from the template. */
export function isPlaceholder(value: string): boolean {
  return /^\s*\[[^\]]+\]\s*$/.test(value);
}

/** Returns the trimmed value, or null when it is blank or an unresolved placeholder. */
export function resolveText(value: string): string | null {
  if (isPlaceholder(value)) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}
