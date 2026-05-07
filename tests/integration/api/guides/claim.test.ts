import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('@/lib/auth/session', () => ({
  getSessionUserId: vi.fn(),
}))

vi.mock('@/lib/db/client', () => ({
  prisma: {
    guide: {
      findUnique: vi.fn(),
      update: vi.fn(),
    },
  },
}))

import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { prisma } from '@/lib/db/client'
import { POST } from '@/app/api/guides/claim/[slug]/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockGetSessionUserId = getSessionUserId as ReturnType<typeof vi.fn>
const mockFindUnique = (prisma.guide as unknown as { findUnique: ReturnType<typeof vi.fn> })
  .findUnique
const mockUpdate = (prisma.guide as unknown as { update: ReturnType<typeof vi.fn> }).update

function makeRequest() {
  return new Request('http://localhost:3000/api/guides/claim/react-basics', {
    method: 'POST',
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  mockGetSessionUserId.mockResolvedValue('user-1')
  mockFindUnique.mockResolvedValue({
    id: 'guide-1',
    userId: null,
    isWatermark: true,
  })
  mockUpdate.mockResolvedValue({
    id: 'guide-1',
    userId: 'user-1',
    isWatermark: false,
  })
})

describe('POST /api/guides/claim/[slug]', () => {
  it('returns a requestId-aware auth error when no authenticated user is available', async () => {
    mockAuth.mockResolvedValueOnce(null)
    mockGetSessionUserId.mockResolvedValueOnce(null)

    const res = await POST(makeRequest(), {
      params: Promise.resolve({ slug: 'react-basics' }),
    })

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('UNAUTHORIZED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)
    expect(mockFindUnique).not.toHaveBeenCalled()
  })

  it('returns a requestId-aware not found error when the guide does not exist', async () => {
    mockFindUnique.mockResolvedValueOnce(null)

    const res = await POST(makeRequest(), {
      params: Promise.resolve({ slug: 'react-basics' }),
    })

    expect(res.status).toBe(404)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('GUIDE_NOT_FOUND')
    expect(body.error.message).toBe('Guide not found')
    expect(body.error.requestId).toBeTruthy()
    expect(mockUpdate).not.toHaveBeenCalled()
  })

  it('returns 409 when the guide already belongs to another user', async () => {
    mockFindUnique.mockResolvedValueOnce({
      id: 'guide-1',
      userId: 'other-user',
      isWatermark: false,
    })

    const res = await POST(makeRequest(), {
      params: Promise.resolve({ slug: 'react-basics' }),
    })

    expect(res.status).toBe(409)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('GUIDE_ALREADY_OWNED')
    expect(body.error.message).toBe('Guide already belongs to another account')
    expect(body.error.requestId).toBeTruthy()
    expect(mockUpdate).not.toHaveBeenCalled()
  })

  it('claims a guest guide for the authenticated user', async () => {
    const res = await POST(makeRequest(), {
      params: Promise.resolve({ slug: 'react-basics' }),
    })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { slug: 'react-basics' },
      select: {
        id: true,
        userId: true,
        isWatermark: true,
      },
    })
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: 'guide-1' },
      data: {
        userId: 'user-1',
        isWatermark: false,
      },
    })
  })

  it('returns ok without updating when the guide already belongs to the same user', async () => {
    mockFindUnique.mockResolvedValueOnce({
      id: 'guide-1',
      userId: 'user-1',
      isWatermark: false,
    })

    const res = await POST(makeRequest(), {
      params: Promise.resolve({ slug: 'react-basics' }),
    })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(mockUpdate).not.toHaveBeenCalled()
  })
})
