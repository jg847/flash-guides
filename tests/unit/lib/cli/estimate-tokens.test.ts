import { describe, expect, it } from 'vitest'
import { estimateTokens } from '@/lib/cli/estimate-tokens'

describe('estimateTokens', () => {
  it('returns the ceiling of characters divided by four', () => {
    expect(estimateTokens('')).toBe(0)
    expect(estimateTokens('1234')).toBe(1)
    expect(estimateTokens('12345')).toBe(2)
  })
})
