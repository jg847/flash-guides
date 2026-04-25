export function sanitizeInput(value: string): string {
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/\0/g, '')
    .trim()
}

export function sanitizeObjectStrings<T extends Record<string, unknown>>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).map(([key, entryValue]) => [
      key,
      typeof entryValue === 'string' ? sanitizeInput(entryValue) : entryValue,
    ]),
  ) as T
}
