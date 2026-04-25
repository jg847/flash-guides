import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('@/lib/db/repositories/guides', () => ({
  guideRepository: {
    list: vi.fn(),
    update: vi.fn(),
    deleteManyOwned: vi.fn(),
  },
}))

import { auth } from '@/lib/auth'
import { guideRepository } from '@/lib/db/repositories/guides'
import { DELETE, GET } from '@/app/api/guides/route'
import { PATCH } from '@/app/api/guides/[id]/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockList = guideRepository.list as ReturnType<typeof vi.fn>
const mockUpdate = guideRepository.update as ReturnType<typeof vi.fn>
const mockDeleteManyOwned = guideRepository.deleteManyOwned as ReturnType<typeof vi.fn>

const GUIDE = {
  id: 'cmguidetest0000000000000001',
  slug: 'react-basics',
  title: 'React Basics',
  studyMode: 'OVERVIEW',
  inputType: 'TOPIC',
  createdAt: '2026-04-23T00:00:00.000Z',
  updatedAt: '2026-04-23T00:00:00.000Z',
  isFavorite: false,
  tags: [{ id: 'cmtag00000000000000000001', name: 'react' }],
  folder: null,
}

beforeEach(() => {
  vi.clearAllMocks()
  mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  mockList.mockResolvedValue({ guides: [GUIDE], total: 1, page: 1 })
  mockUpdate.mockResolvedValue({ ...GUIDE, isFavorite: true })
  mockDeleteManyOwned.mockResolvedValue({ authorized: true, deleted: 2 })
})

function makeDeleteRequest(body: unknown) {
  return new Request('http://localhost:3000/api/guides', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

function makePatchRequest(body: unknown) {
  return new Request('http://localhost:3000/api/guides/cmguidetest0000000000000001', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('GET /api/guides', () => {
  it('returns guides for the authenticated user', async () => {
    const res = await GET(
      new Request('http://localhost:3000/api/guides?q=react&view=favorites&page=2&limit=10'),
    )

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ guides: [GUIDE], total: 1, page: 1 })
    expect(mockList).toHaveBeenCalledWith({
      userId: 'user-1',
      q: 'react',
      tag: undefined,
      folderId: undefined,
      view: 'favorites',
      page: 2,
      limit: 10,
    })
  })

  it('returns 422 for invalid query params', async () => {
    const res = await GET(new Request('http://localhost:3000/api/guides?page=0'))

    expect(res.status).toBe(422)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string; issues: unknown[] }
    }
    expect(body.error.code).toBe('VALIDATION_ERROR')
    expect(body.error.message).toBe('Validation failed')
    expect(body.error.requestId).toBeTruthy()
    expect(Array.isArray(body.error.issues)).toBe(true)
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)
    expect(mockList).not.toHaveBeenCalled()
  })

  it('returns requestId-aware auth errors', async () => {
    mockAuth.mockResolvedValueOnce(null)

    const res = await GET(new Request('http://localhost:3000/api/guides'))

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AUTHENTICATION_REQUIRED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)
  })
})

describe('PATCH /api/guides/[id]', () => {
  it('updates an owned guide', async () => {
    const res = await PATCH(makePatchRequest({ isFavorite: true }), {
      params: Promise.resolve({ id: 'cmguidetest0000000000000001' }),
    })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ...GUIDE, isFavorite: true })
    expect(mockUpdate).toHaveBeenCalledWith({
      id: 'cmguidetest0000000000000001',
      userId: 'user-1',
      isFavorite: true,
    })
  })

  it('returns 403 for a guide the user does not own', async () => {
    mockUpdate.mockResolvedValueOnce(null)

    const res = await PATCH(makePatchRequest({ isFavorite: true }), {
      params: Promise.resolve({ id: 'cmguidetest0000000000000001' }),
    })

    expect(res.status).toBe(403)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('FORBIDDEN')
    expect(body.error.message).toBe('Forbidden')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)
  })
})

describe('DELETE /api/guides', () => {
  it('deletes multiple owned guides', async () => {
    const res = await DELETE(
      makeDeleteRequest({
        ids: ['cmguidetest0000000000000001', 'cmguidetest0000000000000002'],
      }),
    )

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ deleted: 2 })
    expect(mockDeleteManyOwned).toHaveBeenCalledWith('user-1', [
      'cmguidetest0000000000000001',
      'cmguidetest0000000000000002',
    ])
  })

  it('returns 403 when any guide is not owned by the user', async () => {
    mockDeleteManyOwned.mockResolvedValueOnce({ authorized: false, deleted: 0 })

    const res = await DELETE(
      makeDeleteRequest({
        ids: ['cmguidetest0000000000000001'],
      }),
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
})
