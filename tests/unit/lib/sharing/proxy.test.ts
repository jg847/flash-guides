import { describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { maybeRewriteUnavailableShare } from '@/lib/sharing/proxy'

describe('maybeRewriteUnavailableShare', () => {
  it('returns null for non-share routes', async () => {
    const response = await maybeRewriteUnavailableShare(
      new NextRequest('http://localhost:3000/dashboard'),
    )

    expect(response).toBeNull()
  })

  it('rewrites revoked or expired share links to the unavailable page with 410', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ status: 'expired' }), { status: 410 }))

    const response = await maybeRewriteUnavailableShare(
      new NextRequest('http://localhost:3000/share/token-1'),
      fetchImpl,
    )

    expect(fetchImpl).toHaveBeenCalledOnce()
    expect(response?.status).toBe(410)
    expect(response?.headers.get('x-middleware-rewrite')).toContain('/share/unavailable')
  })
})
