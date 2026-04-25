import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { guideRepository } from '@/lib/db/repositories/guides'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const patchGuideTagsSchema = z.object({
  tags: z.array(z.string().trim().min(1).max(50)).max(10),
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

    const parsed = patchGuideTagsSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const { id } = await params
    const updated = await guideRepository.setTags({
      guideId: id,
      userId: sessionUserId,
      tags: parsed.data.tags,
    })

    if (!updated) {
      return createApiErrorResponse(req, {
        status: 403,
        code: 'FORBIDDEN',
        message: 'Forbidden',
      })
    }

    return NextResponse.json({ tags: updated.tags })
  } catch (error) {
    return handleApiError(error, req)
  }
}
