import { randomUUID } from 'crypto'

/**
 * Convert a guide title into a URL-safe slug with a unique suffix.
 * Example: "Intro to React" → "intro-to-react-abc123def"
 */
export function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)

  // Use first 9 chars of a UUID (without dashes) as the unique suffix
  const suffix = randomUUID().replace(/-/g, '').slice(0, 9)
  return `${base}-${suffix}`
}
