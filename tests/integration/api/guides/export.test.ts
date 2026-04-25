import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({ auth: vi.fn() }))
vi.mock('@/lib/db/client', () => ({
  prisma: {
    guide: {
      findFirst: vi.fn(),
    },
  },
}))
vi.mock('@/lib/export/markdown', () => ({ buildMarkdownExport: vi.fn() }))
vi.mock('@/lib/export/html', () => ({ buildHtmlExport: vi.fn() }))
vi.mock('@/lib/export/pdf', () => ({ buildPdfExport: vi.fn() }))

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/client'
import { buildMarkdownExport } from '@/lib/export/markdown'
import { buildHtmlExport } from '@/lib/export/html'
import { buildPdfExport } from '@/lib/export/pdf'
import { GET } from '@/app/api/guides/[id]/export/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockFindFirst = prisma.guide.findFirst as ReturnType<typeof vi.fn>
const mockBuildMarkdownExport = buildMarkdownExport as ReturnType<typeof vi.fn>
const mockBuildHtmlExport = buildHtmlExport as ReturnType<typeof vi.fn>
const mockBuildPdfExport = buildPdfExport as ReturnType<typeof vi.fn>

beforeEach(() => {
  vi.clearAllMocks()
  mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  mockFindFirst.mockResolvedValue({
    id: 'guide-1',
    slug: 'react-basics',
    title: 'React Basics',
    studyMode: 'OVERVIEW',
    inputType: 'TOPIC',
    inputValue: 'React basics',
    content: '# React Basics',
    createdAt: new Date('2026-04-24T00:00:00.000Z'),
    updatedAt: new Date('2026-04-24T00:00:00.000Z'),
  })
  mockBuildMarkdownExport.mockReturnValue('markdown export')
  mockBuildHtmlExport.mockResolvedValue('<html></html>')
  mockBuildPdfExport.mockResolvedValue(Buffer.from('%PDF-export'))
})

describe('GET /api/guides/[id]/export', () => {
  it('returns a markdown attachment for an owned guide', async () => {
    const response = await GET(
      new Request('http://localhost:3000/api/guides/guide-1/export?format=md'),
      {
        params: Promise.resolve({ id: 'guide-1' }),
      },
    )

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('text/markdown')
    expect(response.headers.get('content-disposition')).toContain('react-basics.md')
    expect(await response.text()).toBe('markdown export')
  })

  it('returns an html attachment for an owned guide', async () => {
    const response = await GET(
      new Request('http://localhost:3000/api/guides/guide-1/export?format=html'),
      {
        params: Promise.resolve({ id: 'guide-1' }),
      },
    )

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('text/html')
    expect(await response.text()).toBe('<html></html>')
  })

  it('returns a pdf attachment for an owned guide', async () => {
    const response = await GET(
      new Request('http://localhost:3000/api/guides/guide-1/export?format=pdf'),
      {
        params: Promise.resolve({ id: 'guide-1' }),
      },
    )

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('application/pdf')
    expect(
      Buffer.from(await response.arrayBuffer())
        .subarray(0, 4)
        .toString(),
    ).toBe('%PDF')
  })

  it('returns 403 for a guide the user does not own', async () => {
    mockFindFirst.mockResolvedValueOnce(null)

    const response = await GET(
      new Request('http://localhost:3000/api/guides/guide-2/export?format=md'),
      {
        params: Promise.resolve({ id: 'guide-2' }),
      },
    )

    expect(response.status).toBe(403)
    const body = (await response.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('FORBIDDEN')
    expect(body.error.message).toBe('Forbidden')
    expect(body.error.requestId).toBeTruthy()
    expect(response.headers.get('x-request-id')).toBe(body.error.requestId)
  })

  it('returns requestId-aware validation errors for unsupported formats', async () => {
    const response = await GET(
      new Request('http://localhost:3000/api/guides/guide-1/export?format=txt'),
      {
        params: Promise.resolve({ id: 'guide-1' }),
      },
    )

    expect(response.status).toBe(422)
    const body = (await response.json()) as {
      error: { code: string; message: string; requestId: string; issues: unknown[] }
    }
    expect(body.error.code).toBe('VALIDATION_ERROR')
    expect(body.error.message).toBe('Validation failed')
    expect(body.error.requestId).toBeTruthy()
    expect(Array.isArray(body.error.issues)).toBe(true)
  })
})
