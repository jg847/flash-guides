import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({ auth: vi.fn() }))
vi.mock('@/lib/guides/fork', () => ({ forkGuide: vi.fn() }))

import { auth } from '@/lib/auth'
import { forkGuide } from '@/lib/guides/fork'
import { POST } from '@/app/api/guides/[id]/fork/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockForkGuide = forkGuide as ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.clearAllMocks()
  mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  mockForkGuide.mockResolvedValue({
    status: 'created',
    guide: {
      id: 'guide-2',
      slug: 'fork-react-basics-abc123xyz',
      title: '[Fork] React Basics',
    },
  })
})

describe('POST /api/guides/[id]/fork', () => {
  it('forks a shared guide for the authenticated user', async () => {
    const response = await POST(
      new Request('http://localhost:3000/api/guides/guide-1/fork', {
        method: 'POST',
      }),
      {
        params: Promise.resolve({ id: 'guide-1' }),
      },
    )

    expect(response.status).toBe(201)
    expect(await response.json()).toEqual({
      guideId: 'guide-2',
      guideSlug: 'fork-react-basics-abc123xyz',
      title: '[Fork] React Basics',
    })
    expect(mockForkGuide).toHaveBeenCalledWith('guide-1', 'user-1')
  })

  it('returns 404 when the shared guide cannot be forked', async () => {
    mockForkGuide.mockResolvedValueOnce({ status: 'not-found' })

    const response = await POST(
      new Request('http://localhost:3000/api/guides/guide-404/fork', {
        method: 'POST',
      }),
      {
        params: Promise.resolve({ id: 'guide-404' }),
      },
    )

    expect(response.status).toBe(404)
    const body = (await response.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('SHAREABLE_GUIDE_NOT_FOUND')
    expect(body.error.message).toBe('Shareable guide not found')
    expect(body.error.requestId).toBeTruthy()
    expect(response.headers.get('x-request-id')).toBe(body.error.requestId)
  })

  it('returns 401 when unauthenticated', async () => {
    mockAuth.mockResolvedValueOnce(null)

    const response = await POST(
      new Request('http://localhost:3000/api/guides/guide-1/fork', {
        method: 'POST',
      }),
      {
        params: Promise.resolve({ id: 'guide-1' }),
      },
    )

    expect(response.status).toBe(401)
    const body = (await response.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AUTHENTICATION_REQUIRED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()
  })
})
