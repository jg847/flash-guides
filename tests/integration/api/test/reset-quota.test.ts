import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/db/client', () => ({
  prisma: {
    guestQuota: {
      deleteMany: vi.fn(),
      upsert: vi.fn(),
    },
  },
}))

import { prisma } from '@/lib/db/client'
import { POST } from '@/app/api/test/reset-quota/route'

const mockDeleteMany = prisma.guestQuota.deleteMany as ReturnType<typeof vi.fn>
const mockUpsert = prisma.guestQuota.upsert as ReturnType<typeof vi.fn>

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
    mockUpsert.mockResolvedValue({ ip: '1.2.3.4', count: 3 })
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    if (originalNodeEnv !== undefined) vi.stubEnv('NODE_ENV', originalNodeEnv)
    if (originalPlaywright !== undefined) vi.stubEnv('PLAYWRIGHT_TEST', originalPlaywright)
  })

  it('resets guest quota for the provided ip', async () => {
    const res = await POST(makeRequest({ ip: '1.2.3.4' }))

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true, used: 0 })
    expect(mockDeleteMany).toHaveBeenCalledWith({ where: { ip: '1.2.3.4' } })
  })

  it('seeds guest quota usage when used is provided', async () => {
    const res = await POST(makeRequest({ ip: '1.2.3.4', used: 3 }))

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true, used: 3 })
    expect(mockUpsert).toHaveBeenCalledOnce()
    expect(mockUpsert.mock.calls[0]?.[0]).toMatchObject({
      where: { ip: '1.2.3.4' },
      create: {
        ip: '1.2.3.4',
        count: 3,
      },
      update: {
        count: 3,
      },
    })
  })

  it('returns requestId-aware validation errors for invalid used counts', async () => {
    const res = await POST(makeRequest({ ip: '1.2.3.4', used: 99 }))

    expect(res.status).toBe(400)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('INVALID_USED_COUNT')
    expect(body.error.message).toBe('used must be an integer between 0 and 3')
    expect(body.error.requestId).toBeTruthy()
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
