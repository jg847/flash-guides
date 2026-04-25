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
import { GET } from '@/app/api/health/route'

const UUID_V4_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

describe('request IDs', () => {
  it('adds x-request-id to proxy passthrough responses', async () => {
    const response = (await proxy(
      new NextRequest('http://localhost:3000/'),
      {} as Parameters<typeof proxy>[1],
    )) as Response
    const requestId = response.headers.get('x-request-id')

    expect(requestId).toMatch(UUID_V4_PATTERN)
  })

  it('adds x-request-id to the health endpoint response', async () => {
    const response = await GET(new Request('http://localhost:3000/api/health'))
    const requestId = response.headers.get('x-request-id')

    expect(response.status).toBe(200)
    expect(requestId).toMatch(UUID_V4_PATTERN)
  })
})
