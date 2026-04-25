import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { guideRepository } from '@/lib/db/repositories/guides'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const patchGuideSchema = z
  .object({
    isFavorite: z.boolean().optional(),
    folderId: z.string().cuid().nullable().optional(),
    title: z.string().trim().min(1).max(200).optional(),
  })
  .refine(
    (value) =>
      value.isFavorite !== undefined || value.folderId !== undefined || value.title !== undefined,
    {
      message: 'At least one field must be provided',
    },
  )

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

    const parsed = patchGuideSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const { id } = await params
    const updated = await guideRepository.update({
      id,
      userId: sessionUserId,
      ...parsed.data,
    })

    if (!updated) {
      return createApiErrorResponse(req, {
        status: 403,
        code: 'FORBIDDEN',
        message: 'Forbidden',
      })
    }

    return NextResponse.json(updated)
  } catch (error) {
    return handleApiError(error, req)
  }
}
