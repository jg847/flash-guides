import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/db/client', () => ({
  prisma: {},
}))

vi.mock('@/lib/db/seed', () => ({
  reseedDatabase: vi.fn(),
}))

import { reseedDatabase } from '@/lib/db/seed'
import { POST } from '@/app/api/test/seed/route'

const mockReseedDatabase = reseedDatabase as ReturnType<typeof vi.fn>

describe('POST /api/test/seed', () => {
  const originalNodeEnv = process.env['NODE_ENV']
  const originalPlaywright = process.env['PLAYWRIGHT_TEST']

  beforeEach(() => {
    vi.clearAllMocks()
    vi.unstubAllEnvs()
    vi.stubEnv('NODE_ENV', 'test')
    mockReseedDatabase.mockResolvedValue(undefined)
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    if (originalNodeEnv !== undefined) vi.stubEnv('NODE_ENV', originalNodeEnv)
    if (originalPlaywright !== undefined) vi.stubEnv('PLAYWRIGHT_TEST', originalPlaywright)
  })

  it('reseeds the database in test mode', async () => {
    const res = await POST(new Request('http://localhost:3000/api/test/seed', { method: 'POST' }))

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(mockReseedDatabase).toHaveBeenCalled()
  })

  it('returns requestId-aware not found errors when test mode is disabled', async () => {
    vi.unstubAllEnvs()
    vi.stubEnv('NODE_ENV', 'development')

    const res = await POST(new Request('http://localhost:3000/api/test/seed', { method: 'POST' }))

    expect(res.status).toBe(404)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('NOT_FOUND')
    expect(body.error.message).toBe('Not found')
    expect(body.error.requestId).toBeTruthy()
  })
})
