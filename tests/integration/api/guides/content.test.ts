import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('@/lib/db/client', () => ({
  prisma: {
    guide: {
      findUnique: vi.fn(),
    },
  },
}))

vi.mock('@/lib/db/repositories/guides', () => ({
  guideRepository: {
    update: vi.fn(),
  },
}))

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/client'
import { guideRepository } from '@/lib/db/repositories/guides'
import { POST } from '@/app/api/guides/[id]/content/route'
import { resetUserWindowRateLimitStoreForTests } from '@/lib/rate-limit/user-window'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockFindUnique = (prisma.guide as unknown as { findUnique: ReturnType<typeof vi.fn> })
  .findUnique
const mockUpdate = guideRepository.update as ReturnType<typeof vi.fn>

function makeRequest(body: unknown) {
  return new Request('http://localhost:3000/api/guides/cmguide1/content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  resetUserWindowRateLimitStoreForTests()
  mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  mockFindUnique
    .mockResolvedValueOnce({
      id: 'cmguide1',
      userId: 'user-1',
      content: '# Guide\n\n## Components\n\nOriginal body\n',
    })
    .mockResolvedValueOnce({
      content: '# Guide\n\n## Components\n\nOriginal body\n\n## Hooks\n\nHook body',
    })
  mockUpdate.mockResolvedValue({ id: 'cmguide1', slug: 'guide', title: 'Guide' })
})

describe('POST /api/guides/[id]/content', () => {
  it('lets the owner append a section', async () => {
    const res = await POST(
      makeRequest({
        op: 'append_section',
        heading: 'Hooks',
        body_markdown: 'Hook body',
      }),
      { params: Promise.resolve({ id: 'cmguide1' }) },
    )

    expect(res.status).toBe(200)
    expect(mockUpdate).toHaveBeenCalledWith({
      id: 'cmguide1',
      userId: 'user-1',
      content: expect.stringContaining('## Hooks'),
    })
  })

  it('returns 403 for a non-owner', async () => {
    mockFindUnique.mockReset()
    mockFindUnique.mockResolvedValueOnce({
      id: 'cmguide1',
      userId: 'owner-2',
      content: '# Guide',
    })

    const res = await POST(
      makeRequest({
        op: 'append_section',
        heading: 'Hooks',
        body_markdown: 'Hook body',
      }),
      { params: Promise.resolve({ id: 'cmguide1' }) },
    )

    expect(res.status).toBe(403)
  })

  it('returns 422 when heading is missing', async () => {
    const res = await POST(
      makeRequest({
        op: 'append_section',
        body_markdown: 'Hook body',
      }),
      { params: Promise.resolve({ id: 'cmguide1' }) },
    )

    expect(res.status).toBe(422)
  })

  it('returns 404 when after_heading cannot be found', async () => {
    const res = await POST(
      makeRequest({
        op: 'insert_section_after',
        heading: 'Hooks',
        body_markdown: 'Hook body',
        after_heading: 'Missing heading',
      }),
      { params: Promise.resolve({ id: 'cmguide1' }) },
    )

    expect(res.status).toBe(404)
    const body = (await res.json()) as { error: { code: string } }
    expect(body.error.code).toBe('AFTER_HEADING_NOT_FOUND')
  })

  it('returns 429 after 10 apply requests in a minute', async () => {
    let finalResponse: Response | null = null

    for (let index = 0; index < 11; index += 1) {
      mockFindUnique.mockReset()
      mockFindUnique
        .mockResolvedValueOnce({
          id: 'cmguide1',
          userId: 'user-1',
          content: '# Guide\n\n## Components\n\nOriginal body\n',
        })
        .mockResolvedValueOnce({
          content: '# Guide\n\n## Components\n\nOriginal body\n\n## Hooks\n\nHook body',
        })

      finalResponse = await POST(
        makeRequest({
          op: 'append_section',
          heading: `Hooks ${index}`,
          body_markdown: 'Hook body',
        }),
        { params: Promise.resolve({ id: 'cmguide1' }) },
      )
    }

    expect(finalResponse?.status).toBe(429)
    const body = (await finalResponse?.json()) as { error: { code: string } }
    expect(body.error.code).toBe('RATE_LIMIT_EXCEEDED')
  })
})
