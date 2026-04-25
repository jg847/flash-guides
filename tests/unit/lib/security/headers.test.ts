import { describe, expect, it } from 'vitest'
import { buildSecurityHeaders } from '@/lib/security/headers'

describe('buildSecurityHeaders', () => {
  it('returns the required baseline security headers', () => {
    const headers = buildSecurityHeaders({ isProduction: false })

    expect(headers['Content-Security-Policy']).toContain("default-src 'self'")
    expect(headers['X-Content-Type-Options']).toBe('nosniff')
    expect(headers['X-Frame-Options']).toBe('DENY')
    expect(headers['Referrer-Policy']).toBe('strict-origin-when-cross-origin')
    expect(headers['Strict-Transport-Security']).toBeUndefined()
  })

  it('adds hsts in production', () => {
    const headers = buildSecurityHeaders({ isProduction: true })

    expect(headers['Strict-Transport-Security']).toContain('max-age=63072000')
  })
})
