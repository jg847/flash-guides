import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockSend = vi.fn()

vi.mock('@aws-sdk/client-s3', () => ({
  S3Client: class {
    send = mockSend
  },
  PutObjectCommand: class {
    input: unknown
    constructor(input: unknown) {
      this.input = input
    }
  },
}))

import { getAvatarValidationMessage, uploadAvatar, validateAvatarFile } from '@/lib/storage/minio'

function makeFile(buffer: Uint8Array, type: string, name = 'avatar.png') {
  return new File([Buffer.from(buffer)], name, { type })
}

beforeEach(() => {
  vi.clearAllMocks()
  process.env['S3_ENDPOINT'] = 'http://localhost:9000'
  process.env['S3_BUCKET'] = 'flashguides'
  process.env['S3_ACCESS_KEY'] = 'minioadmin'
  process.env['S3_SECRET_KEY'] = 'minioadmin'
})

describe('minio avatar helpers', () => {
  it('validates a PNG avatar payload', async () => {
    const pngBytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
    const result = await validateAvatarFile(makeFile(pngBytes, 'image/png'))

    expect(result.mimeType).toBe('image/png')
    expect(result.buffer).toBeInstanceOf(Buffer)
  })

  it('rejects oversized files', async () => {
    const file = makeFile(new Uint8Array(2 * 1024 * 1024 + 1), 'image/png')

    await expect(validateAvatarFile(file)).rejects.toThrow(getAvatarValidationMessage())
  })

  it('rejects files with mismatched magic bytes', async () => {
    const fakeJpg = makeFile(
      new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      'image/jpeg',
      'avatar.jpg',
    )

    await expect(validateAvatarFile(fakeJpg)).rejects.toThrow(getAvatarValidationMessage())
  })

  it('uploads a validated avatar to the configured bucket', async () => {
    mockSend.mockResolvedValue({})

    const url = await uploadAvatar(Buffer.from([0xff, 0xd8, 0xff]), 'image/jpeg', 'user-1')

    expect(mockSend).toHaveBeenCalledTimes(1)
    expect(url).toMatch(/^http:\/\/localhost:9000\/flashguides\/avatars\/user-1\//)
  })
})
