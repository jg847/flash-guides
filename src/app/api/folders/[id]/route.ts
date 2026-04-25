import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { folderRepository } from '@/lib/db/repositories/folders'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const patchFolderSchema = z.object({
  name: z.string().trim().min(1).max(100),
})

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
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

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_JSON',
        message: 'Invalid JSON',
      })
    }

    const parsed = patchFolderSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const { id } = await params
    const folder = await folderRepository.rename({
      id,
      userId: sessionUserId,
      name: parsed.data.name,
    })

    if (!folder) {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'FOLDER_NOT_FOUND',
        message: 'Folder not found',
      })
    }

    return NextResponse.json(folder)
  } catch (error) {
    return handleApiError(error, req)
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
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

    const { id } = await params
    const result = await folderRepository.deleteOwned(sessionUserId, id)

    if (!result.deleted) {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'FOLDER_NOT_FOUND',
        message: 'Folder not found',
      })
    }

    return NextResponse.json({ deleted: true })
  } catch (error) {
    return handleApiError(error, req)
  }
}
