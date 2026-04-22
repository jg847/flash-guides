import { describe, it, expect } from 'vitest'
import { generateSlug } from '@/lib/generation/slug'

describe('generateSlug', () => {
  it('produces a URL-safe lowercase slug from a title', () => {
    const slug = generateSlug('Introduction to React')
    expect(slug).toMatch(/^introduction-to-react-[a-f0-9]+$/)
  })

  it('replaces spaces and special chars with hyphens', () => {
    const slug = generateSlug('Hello, World! & More')
    expect(slug).toMatch(/^hello-world-more-[a-f0-9]+$/)
  })

  it('produces different slugs for the same title (unique suffix)', () => {
    const a = generateSlug('Same Title')
    const b = generateSlug('Same Title')
    expect(a).not.toBe(b)
  })

  it('truncates long titles to max 60 chars for the base portion', () => {
    const longTitle = 'A'.repeat(80)
    const slug = generateSlug(longTitle)
    const base = slug.split('-').slice(0, -1).join('-')
    expect(base.length).toBeLessThanOrEqual(60)
  })

  it('strips leading and trailing hyphens', () => {
    const slug = generateSlug('  --My Guide--  ')
    expect(slug).not.toMatch(/^-/)
    expect(slug).not.toMatch(/-[a-f0-9]+-$/)
  })
})
