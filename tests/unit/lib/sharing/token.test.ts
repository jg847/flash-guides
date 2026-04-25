import { describe, expect, it } from 'vitest'
import { generateShareToken } from '@/lib/sharing/token'

describe('generateShareToken', () => {
  it('returns a url-safe token with at least 32 characters', () => {
    const token = generateShareToken()

    expect(token.length).toBeGreaterThanOrEqual(32)
    expect(token).toMatch(/^[A-Za-z0-9_-]+$/)
  })
})
