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

vi.mock('@/lib/db/repositories/notes', () => ({
  noteRepository: {
    create: vi.fn(),
  },
}))

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/client'
import { noteRepository } from '@/lib/db/repositories/notes'
import { POST } from '@/app/api/notes/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockFindUnique = (prisma.guide as unknown as { findUnique: ReturnType<typeof vi.fn> })
  .findUnique
const mockCreate = noteRepository.create as ReturnType<typeof vi.fn>

function makeRequest(body: unknown) {
  return new Request('http://localhost:3000/api/notes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  mockFindUnique.mockResolvedValue({
    id: 'cm1234567890abcdef123456',
    userId: 'owner-1',
    isPublic: true,
  })
  mockCreate.mockResolvedValue({
    id: 'note-1',
    guideId: 'cm1234567890abcdef123456',
    selectedText: 'React components',
    content: '',
    createdAt: '2026-04-23T00:00:00.000Z',
  })
})

describe('POST /api/notes', () => {
  it('saves a note for an authenticated user', async () => {
    const res = await POST(
      makeRequest({
        guideId: 'cm1234567890abcdef123456',
        selectedText: 'React components',
        content: '',
      }),
    )

    expect(res.status).toBe(201)
    expect(await res.json()).toEqual({
      id: 'note-1',
      guideId: 'cm1234567890abcdef123456',
      selectedText: 'React components',
      content: '',
      createdAt: '2026-04-23T00:00:00.000Z',
    })
    expect(mockCreate).toHaveBeenCalledWith({
      userId: 'user-1',
      guideId: 'cm1234567890abcdef123456',
      selectedText: 'React components',
      content: '',
    })
  })

  it('rejects notes for another user private guide', async () => {
    mockFindUnique.mockResolvedValueOnce({
      id: 'cm1234567890abcdef123456',
      userId: 'owner-2',
      isPublic: false,
    })

    const res = await POST(
      makeRequest({
        guideId: 'cm1234567890abcdef123456',
        selectedText: 'Private text',
      }),
    )

    expect(res.status).toBe(403)
    expect(mockCreate).not.toHaveBeenCalled()
  })

  it('returns requestId-aware auth errors', async () => {
    mockAuth.mockResolvedValueOnce(null)

    const res = await POST(
      makeRequest({
        guideId: 'cm1234567890abcdef123456',
        selectedText: 'React components',
      }),
    )

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AUTHENTICATION_REQUIRED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)
  })

  it('returns requestId-aware guide lookup errors', async () => {
    mockFindUnique.mockResolvedValueOnce(null)

    const res = await POST(
      makeRequest({
        guideId: 'cm1234567890abcdef123456',
        selectedText: 'Missing guide',
      }),
    )

    expect(res.status).toBe(404)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('GUIDE_NOT_FOUND')
    expect(body.error.message).toBe('Guide not found')
    expect(body.error.requestId).toBeTruthy()
  })

  it('sanitizes selected text and note content before persisting', async () => {
    await POST(
      makeRequest({
        guideId: 'cm1234567890abcdef123456',
        selectedText: '  <b>React components</b>\u0000 ',
        content: ' <script>alert(1)</script>Remember props\u0000 ',
      }),
    )

    expect(mockCreate).toHaveBeenCalledWith({
      userId: 'user-1',
      guideId: 'cm1234567890abcdef123456',
      selectedText: 'React components',
      content: 'alert(1)Remember props',
    })
  })
})
