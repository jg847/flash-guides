import { describe, expect, it } from 'vitest'
import { validateOrigin } from '@/lib/security/csrf'

describe('validateOrigin', () => {
  it('allows same-origin mutation requests', () => {
    const request = new Request('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })

    expect(validateOrigin(request)).toBe(true)
  })

  it('rejects mismatched origins for mutation requests', () => {
    const request = new Request('http://localhost:3000/api/generate', {
      method: 'POST',
      headers: { origin: 'https://attacker.example' },
    })

    expect(validateOrigin(request)).toBe(false)
  })

  it('allows safe methods without origin headers', () => {
    const request = new Request('http://localhost:3000/api/generate')

    expect(validateOrigin(request)).toBe(true)
  })
})
