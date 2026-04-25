import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({ auth: vi.fn() }))
vi.mock('@/lib/db/repositories/share-links', () => ({
  shareLinkRepository: {
    createOwnedShareLink: vi.fn(),
    deleteOwnedShareLink: vi.fn(),
  },
}))

import { auth } from '@/lib/auth'
import { shareLinkRepository } from '@/lib/db/repositories/share-links'
import { DELETE, POST } from '@/app/api/guides/[id]/share/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockCreate = shareLinkRepository.createOwnedShareLink as ReturnType<typeof vi.fn>
const mockDelete = shareLinkRepository.deleteOwnedShareLink as ReturnType<typeof vi.fn>

function makePostRequest(body: unknown) {
  return new Request('http://localhost:3000/api/guides/cmguidetest0000000000000001/share', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  mockCreate.mockResolvedValue({
    status: 'created',
    shareLink: {
      token: 'abc123_share_token_abc123_share',
      expiresAt: null,
    },
  })
  mockDelete.mockResolvedValue(true)
})

describe('guide share routes', () => {
  it('creates a share link for an owned guide', async () => {
    const response = await POST(makePostRequest({ expiresIn: '7d' }), {
      params: Promise.resolve({ id: 'cmguidetest0000000000000001' }),
    })

    expect(response.status).toBe(201)
    expect(await response.json()).toEqual({
      token: 'abc123_share_token_abc123_share',
      url: 'http://localhost:3000/share/abc123_share_token_abc123_share',
      expiresAt: null,
    })
  })

  it('returns 409 with the current share link when one already exists', async () => {
    mockCreate.mockResolvedValueOnce({
      status: 'existing',
      shareLink: {
        token: 'existing_share_token_abc123_share',
        expiresAt: null,
      },
    })

    const response = await POST(makePostRequest({ expiresIn: null }), {
      params: Promise.resolve({ id: 'cmguidetest0000000000000001' }),
    })

    expect(response.status).toBe(409)
  })

  it('returns requestId-aware auth errors when creating a share link', async () => {
    mockAuth.mockResolvedValueOnce(null)

    const response = await POST(makePostRequest({ expiresIn: '7d' }), {
      params: Promise.resolve({ id: 'cmguidetest0000000000000001' }),
    })

    expect(response.status).toBe(401)
    const body = (await response.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AUTHENTICATION_REQUIRED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()
    expect(response.headers.get('x-request-id')).toBe(body.error.requestId)
  })

  it('returns requestId-aware forbidden errors when creating a share link', async () => {
    mockCreate.mockResolvedValueOnce({ status: 'forbidden' })

    const response = await POST(makePostRequest({ expiresIn: '7d' }), {
      params: Promise.resolve({ id: 'cmguidetest0000000000000001' }),
    })

    expect(response.status).toBe(403)
    const body = (await response.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('FORBIDDEN')
    expect(body.error.message).toBe('Forbidden')
    expect(body.error.requestId).toBeTruthy()
  })

  it('revokes a share link for an owned guide', async () => {
    const response = await DELETE(
      new Request('http://localhost:3000/api/guides/cmguidetest0000000000000001/share', {
        method: 'DELETE',
      }),
      {
        params: Promise.resolve({ id: 'cmguidetest0000000000000001' }),
      },
    )

    expect(response.status).toBe(204)
    expect(mockDelete).toHaveBeenCalledWith('cmguidetest0000000000000001', 'user-1')
  })

  it('returns requestId-aware forbidden errors when revoking another users share link', async () => {
    mockDelete.mockResolvedValueOnce(false)

    const response = await DELETE(
      new Request('http://localhost:3000/api/guides/cmguidetest0000000000000001/share', {
        method: 'DELETE',
      }),
      {
        params: Promise.resolve({ id: 'cmguidetest0000000000000001' }),
      },
    )

    expect(response.status).toBe(403)
    const body = (await response.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('FORBIDDEN')
    expect(body.error.message).toBe('Forbidden')
    expect(body.error.requestId).toBeTruthy()
  })
})
