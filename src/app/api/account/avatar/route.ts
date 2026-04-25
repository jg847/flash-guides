import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { userRepository } from '@/lib/db/repositories/users'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { getAvatarValidationMessage, uploadAvatar, validateAvatarFile } from '@/lib/storage/minio'

export async function POST(req: Request) {
  try {
    const session = await auth()
    const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    let formData: FormData
    try {
      formData = await req.formData()
    } catch {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_FORM_DATA',
        message: 'Invalid form data',
      })
    }

    const avatar = formData.get('avatar')
    if (!(avatar instanceof File)) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'AVATAR_VALIDATION_ERROR',
        message: getAvatarValidationMessage(),
      })
    }

    try {
      const { buffer, mimeType } = await validateAvatarFile(avatar)
      const imageUrl = await uploadAvatar(buffer, mimeType, sessionUserId)
      await userRepository.updateProfile(sessionUserId, { image: imageUrl })
      return NextResponse.json({ imageUrl })
    } catch (error) {
      if (error instanceof Error && error.message === getAvatarValidationMessage()) {
        return createApiErrorResponse(req, {
          status: 422,
          code: 'AVATAR_VALIDATION_ERROR',
          message: error.message,
        })
      }

      return createApiErrorResponse(req, {
        status: 500,
        code: 'AVATAR_UPLOAD_FAILED',
        message: 'Avatar upload failed',
      })
    }
  } catch (error) {
    return handleApiError(error, req)
  }
}
