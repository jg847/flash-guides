import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('@/lib/db/repositories/guides', () => ({
  guideRepository: {
    setTags: vi.fn(),
  },
}))

import { auth } from '@/lib/auth'
import { guideRepository } from '@/lib/db/repositories/guides'
import { PATCH } from '@/app/api/guides/[id]/tags/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockSetTags = guideRepository.setTags as ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.clearAllMocks()
  mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  mockSetTags.mockResolvedValue({
    id: 'cmguidetest0000000000000001',
    tags: [
      { id: 'cmtag00000000000000000001', name: 'react' },
      { id: 'cmtag00000000000000000002', name: 'hooks' },
    ],
  })
})

describe('PATCH /api/guides/[id]/tags', () => {
  it('replaces guide tags for the owner', async () => {
    const res = await PATCH(
      new Request('http://localhost:3000/api/guides/cmguidetest0000000000000001/tags', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags: ['react', 'hooks'] }),
      }),
      { params: Promise.resolve({ id: 'cmguidetest0000000000000001' }) },
    )

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      tags: [
        { id: 'cmtag00000000000000000001', name: 'react' },
        { id: 'cmtag00000000000000000002', name: 'hooks' },
      ],
    })
    expect(mockSetTags).toHaveBeenCalledWith({
      guideId: 'cmguidetest0000000000000001',
      userId: 'user-1',
      tags: ['react', 'hooks'],
    })
  })

  it('returns 403 when the guide is not owned by the user', async () => {
    mockSetTags.mockResolvedValueOnce(null)

    const res = await PATCH(
      new Request('http://localhost:3000/api/guides/cmguidetest0000000000000001/tags', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags: ['react'] }),
      }),
      { params: Promise.resolve({ id: 'cmguidetest0000000000000001' }) },
    )

    expect(res.status).toBe(403)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('FORBIDDEN')
    expect(body.error.message).toBe('Forbidden')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)
  })

  it('returns requestId-aware auth errors', async () => {
    mockAuth.mockResolvedValueOnce(null)

    const res = await PATCH(
      new Request('http://localhost:3000/api/guides/cmguidetest0000000000000001/tags', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags: ['react'] }),
      }),
      { params: Promise.resolve({ id: 'cmguidetest0000000000000001' }) },
    )

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AUTHENTICATION_REQUIRED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()
  })
})
