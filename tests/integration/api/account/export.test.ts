import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('@/lib/export/data-exporter', () => ({
  generateUserDataExport: vi.fn(),
}))

vi.mock('@/lib/storage/minio', () => ({
  uploadExportArchive: vi.fn(),
}))

import { auth } from '@/lib/auth'
import { generateUserDataExport } from '@/lib/export/data-exporter'
import { uploadExportArchive } from '@/lib/storage/minio'
import { POST } from '@/app/api/account/export/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockGenerateUserDataExport = generateUserDataExport as ReturnType<typeof vi.fn>
const mockUploadExportArchive = uploadExportArchive as ReturnType<typeof vi.fn>

function makeRequest() {
  return new Request('http://localhost:3000/api/account/export', {
    method: 'POST',
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  mockGenerateUserDataExport.mockResolvedValue(Buffer.from('zip-data'))
  mockUploadExportArchive.mockResolvedValue({
    downloadUrl: 'http://localhost:9000/flashguides/exports/user-1/archive.zip?signature=1',
    expiresAt: '2026-04-23T00:01:00.000Z',
    objectKey: 'exports/user-1/archive.zip',
  })
})

describe('POST /api/account/export', () => {
  it('returns a download url for the authenticated user export', async () => {
    const res = await POST(makeRequest())

    expect(res.status).toBe(202)
    expect(await res.json()).toEqual({
      downloadUrl: 'http://localhost:9000/flashguides/exports/user-1/archive.zip?signature=1',
      expiresAt: '2026-04-23T00:01:00.000Z',
    })
    expect(mockGenerateUserDataExport).toHaveBeenCalledWith('user-1')
    expect(mockUploadExportArchive).toHaveBeenCalled()
  })

  it('returns requestId-aware auth errors', async () => {
    mockAuth.mockResolvedValueOnce(null)

    const res = await POST(makeRequest())

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AUTHENTICATION_REQUIRED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()
  })

  it('returns requestId-aware export failures', async () => {
    mockGenerateUserDataExport.mockRejectedValueOnce(new Error('minio down'))

    const res = await POST(makeRequest())

    expect(res.status).toBe(500)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('ACCOUNT_EXPORT_FAILED')
    expect(body.error.message).toBe('Unable to export account data')
    expect(body.error.requestId).toBeTruthy()
  })
})
