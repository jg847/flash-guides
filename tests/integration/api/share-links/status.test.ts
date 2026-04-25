import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/db/repositories/share-links', () => ({
  shareLinkRepository: {
    getStatusByToken: vi.fn(),
  },
}))

import { shareLinkRepository } from '@/lib/db/repositories/share-links'
import { GET } from '@/app/api/share-links/[token]/status/route'

const mockGetStatusByToken = shareLinkRepository.getStatusByToken as ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.clearAllMocks()
})

describe('GET /api/share-links/[token]/status', () => {
  it('returns 200 for an active token', async () => {
    mockGetStatusByToken.mockResolvedValue('active')

    const response = await GET(
      new Request('http://localhost:3000/api/share-links/token-1/status'),
      {
        params: Promise.resolve({ token: 'token-1' }),
      },
    )

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ status: 'active' })
  })

  it('returns 410 for an expired token', async () => {
    mockGetStatusByToken.mockResolvedValue('expired')

    const response = await GET(
      new Request('http://localhost:3000/api/share-links/token-1/status'),
      {
        params: Promise.resolve({ token: 'token-1' }),
      },
    )

    expect(response.status).toBe(410)
    expect(await response.json()).toEqual({ status: 'expired' })
  })
})
