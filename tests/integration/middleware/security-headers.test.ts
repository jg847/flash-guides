import { describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

vi.mock('@/lib/sharing/proxy', () => ({
  maybeRewriteUnavailableShare: vi.fn().mockResolvedValue(null),
}))

vi.mock('@/lib/db/client', () => ({
  prisma: {
    $queryRaw: vi.fn().mockResolvedValue(1),
  },
}))

import proxy from '@/proxy'
import { GET as getHealth } from '@/app/api/health/route'

describe('security headers and csrf', () => {
  it('applies security headers to proxy passthrough responses', async () => {
    const response = (await proxy(
      new NextRequest('http://localhost:3000/'),
      {} as Parameters<typeof proxy>[1],
    )) as Response

    expect(response.headers.get('content-security-policy')).toContain("default-src 'self'")
    expect(response.headers.get('x-content-type-options')).toBe('nosniff')
    expect(response.headers.get('x-frame-options')).toBe('DENY')
    expect(response.headers.get('referrer-policy')).toBe('strict-origin-when-cross-origin')
  })

  it('rejects mutating api requests with a mismatched origin', async () => {
    const response = (await proxy(
      new NextRequest('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: { origin: 'https://attacker.example' },
      }),
      {} as Parameters<typeof proxy>[1],
    )) as Response

    expect(response.status).toBe(403)
    await expect(response.json()).resolves.toEqual({ error: 'Forbidden' })
  })

  it('applies security headers to the health endpoint response', async () => {
    const response = await getHealth(new Request('http://localhost:3000/api/health'))

    expect(response.headers.get('content-security-policy')).toContain("default-src 'self'")
    expect(response.headers.get('x-content-type-options')).toBe('nosniff')
  })
})
