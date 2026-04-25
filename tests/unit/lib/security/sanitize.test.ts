import { describe, expect, it } from 'vitest'
import { sanitizeInput, sanitizeObjectStrings } from '@/lib/security/sanitize'

describe('sanitizeInput', () => {
  it('strips html tags, null bytes, and surrounding whitespace', () => {
    expect(sanitizeInput('  <script>alert(1)</script>Hello\u0000 ')).toBe('alert(1)Hello')
  })
})

describe('sanitizeObjectStrings', () => {
  it('sanitizes only string properties', () => {
    expect(
      sanitizeObjectStrings({
        inputValue: ' <b>Topic</b>\u0000 ',
        limit: 3,
      }),
    ).toEqual({
      inputValue: 'Topic',
      limit: 3,
    })
  })
})
