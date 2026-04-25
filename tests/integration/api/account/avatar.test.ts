import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('@/lib/db/repositories/users', () => ({
  userRepository: {
    updateProfile: vi.fn(),
  },
}))

vi.mock('@/lib/storage/minio', () => ({
  getAvatarValidationMessage: vi.fn(() => 'Please upload a valid avatar image'),
  uploadAvatar: vi.fn(),
  validateAvatarFile: vi.fn(),
}))

import { auth } from '@/lib/auth'
import { userRepository } from '@/lib/db/repositories/users'
import { getAvatarValidationMessage, uploadAvatar, validateAvatarFile } from '@/lib/storage/minio'
import { POST } from '@/app/api/account/avatar/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockUpdateProfile = userRepository.updateProfile as ReturnType<typeof vi.fn>
const mockUploadAvatar = uploadAvatar as ReturnType<typeof vi.fn>
const mockValidateAvatarFile = validateAvatarFile as ReturnType<typeof vi.fn>

function makeFormRequest(file?: File) {
  const formData = new FormData()
  if (file) {
    formData.set('avatar', file)
  }

  const request = new Request('http://localhost:3000/api/account/avatar', {
    method: 'POST',
  })

  Object.defineProperty(request, 'formData', {
    value: vi.fn().mockResolvedValue(formData),
  })

  return request
}

beforeEach(() => {
  vi.clearAllMocks()
  mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  mockValidateAvatarFile.mockResolvedValue({
    buffer: Buffer.from('image-bytes'),
    mimeType: 'image/png',
  })
  mockUploadAvatar.mockResolvedValue('http://localhost:9000/flashguides/avatars/user-1/avatar.png')
  mockUpdateProfile.mockResolvedValue({ id: 'user-1' })
})

describe('POST /api/account/avatar', () => {
  it('uploads an avatar for the authenticated user', async () => {
    const file = new File(['image'], 'avatar.png', { type: 'image/png' })

    const res = await POST(makeFormRequest(file))

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      imageUrl: 'http://localhost:9000/flashguides/avatars/user-1/avatar.png',
    })
  })

  it('returns requestId-aware auth errors', async () => {
    mockAuth.mockResolvedValueOnce(null)

    const res = await POST(makeFormRequest())

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AUTHENTICATION_REQUIRED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)
  })

  it('returns requestId-aware avatar validation errors when no file is provided', async () => {
    const res = await POST(makeFormRequest())

    expect(res.status).toBe(422)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AVATAR_VALIDATION_ERROR')
    expect(body.error.message).toBe(getAvatarValidationMessage())
    expect(body.error.requestId).toBeTruthy()
  })

  it('returns requestId-aware upload failures', async () => {
    const file = new File(['image'], 'avatar.png', { type: 'image/png' })
    mockUploadAvatar.mockRejectedValueOnce(new Error('minio down'))

    const res = await POST(makeFormRequest(file))

    expect(res.status).toBe(500)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AVATAR_UPLOAD_FAILED')
    expect(body.error.message).toBe('Avatar upload failed')
    expect(body.error.requestId).toBeTruthy()
  })
})
