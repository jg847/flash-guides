import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/db/client', () => ({
  prisma: {
    guestQuota: {
      deleteMany: vi.fn(),
    },
  },
}))

import { prisma } from '@/lib/db/client'
import { POST } from '@/app/api/test/reset-quota/route'

const mockDeleteMany = prisma.guestQuota.deleteMany as ReturnType<typeof vi.fn>

function makeRequest(body: unknown) {
  return new Request('http://localhost:3000/api/test/reset-quota', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/test/reset-quota', () => {
  const originalNodeEnv = process.env['NODE_ENV']
  const originalPlaywright = process.env['PLAYWRIGHT_TEST']

  beforeEach(() => {
    vi.clearAllMocks()
    vi.unstubAllEnvs()
    vi.stubEnv('NODE_ENV', 'test')
    mockDeleteMany.mockResolvedValue({ count: 1 })
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    if (originalNodeEnv !== undefined) vi.stubEnv('NODE_ENV', originalNodeEnv)
    if (originalPlaywright !== undefined) vi.stubEnv('PLAYWRIGHT_TEST', originalPlaywright)
  })

  it('resets guest quota for the provided ip', async () => {
    const res = await POST(makeRequest({ ip: '1.2.3.4' }))

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(mockDeleteMany).toHaveBeenCalledWith({ where: { ip: '1.2.3.4' } })
  })

  it('returns requestId-aware ip required errors', async () => {
    const res = await POST(makeRequest({}))

    expect(res.status).toBe(400)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('IP_REQUIRED')
    expect(body.error.message).toBe('ip required')
    expect(body.error.requestId).toBeTruthy()
  })

  it('returns requestId-aware not found errors when test mode is disabled', async () => {
    vi.unstubAllEnvs()
    vi.stubEnv('NODE_ENV', 'development')

    const res = await POST(makeRequest({ ip: '1.2.3.4' }))

    expect(res.status).toBe(404)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('NOT_FOUND')
    expect(body.error.message).toBe('Not found')
    expect(body.error.requestId).toBeTruthy()
  })
})
