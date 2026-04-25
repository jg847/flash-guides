import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('next-auth/jwt', () => ({
  encode: vi.fn().mockResolvedValue('session-token'),
}))

vi.mock('@/lib/db/client', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}))

import { prisma } from '@/lib/db/client'
import { POST } from '@/app/api/test/session/route'

const mockFindUnique = prisma.user.findUnique as ReturnType<typeof vi.fn>

function makeRequest(body: unknown) {
  return new Request('http://localhost:3000/api/test/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/test/session', () => {
  const originalNodeEnv = process.env['NODE_ENV']
  const originalPlaywright = process.env['PLAYWRIGHT_TEST']
  const originalAuthSecret = process.env['AUTH_SECRET']
  const originalNextAuthSecret = process.env['NEXTAUTH_SECRET']

  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubEnv('NODE_ENV', 'test')
    vi.unstubAllEnvs()
    vi.stubEnv('NODE_ENV', 'test')
    vi.stubEnv('AUTH_SECRET', 'test-secret')
    mockFindUnique.mockResolvedValue({
      id: 'user-1',
      email: 'user@example.com',
      name: 'User',
      image: null,
    })
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    if (originalNodeEnv !== undefined) vi.stubEnv('NODE_ENV', originalNodeEnv)
    if (originalPlaywright !== undefined) vi.stubEnv('PLAYWRIGHT_TEST', originalPlaywright)
    if (originalAuthSecret !== undefined) vi.stubEnv('AUTH_SECRET', originalAuthSecret)
    if (originalNextAuthSecret !== undefined) vi.stubEnv('NEXTAUTH_SECRET', originalNextAuthSecret)
  })

  it('creates a seeded session cookie for a test user', async () => {
    const res = await POST(makeRequest({ email: 'user@example.com' }))

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(res.headers.get('set-cookie')).toContain('authjs.session-token=session-token')
  })

  it('returns requestId-aware validation errors', async () => {
    const res = await POST(makeRequest({ email: 'bad-email' }))

    expect(res.status).toBe(422)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string; issues: unknown[] }
    }
    expect(body.error.code).toBe('VALIDATION_ERROR')
    expect(body.error.message).toBe('Validation failed')
    expect(body.error.requestId).toBeTruthy()
    expect(Array.isArray(body.error.issues)).toBe(true)
  })

  it('returns requestId-aware user not found errors', async () => {
    mockFindUnique.mockResolvedValueOnce(null)

    const res = await POST(makeRequest({ email: 'missing@example.com' }))

    expect(res.status).toBe(404)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('USER_NOT_FOUND')
    expect(body.error.message).toBe('User not found')
    expect(body.error.requestId).toBeTruthy()
  })

  it('returns requestId-aware missing secret errors', async () => {
    vi.unstubAllEnvs()
    vi.stubEnv('NODE_ENV', 'test')
    delete process.env['AUTH_SECRET']
    delete process.env['NEXTAUTH_SECRET']

    const res = await POST(makeRequest({ email: 'user@example.com' }))

    expect(res.status).toBe(500)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('MISSING_AUTH_SECRET')
    expect(body.error.message).toBe('Missing auth secret')
    expect(body.error.requestId).toBeTruthy()
  })
})
