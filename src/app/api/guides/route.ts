import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { guideRepository } from '@/lib/db/repositories/guides'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const guidesQuerySchema = z.object({
  q: z.string().trim().min(1).optional(),
  tag: z.string().trim().min(1).optional(),
  folderId: z.string().cuid().optional(),
  view: z.enum(['recent', 'favorites', 'all']).default('all'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(24),
})

const deleteGuidesSchema = z.object({
  ids: z.array(z.string().cuid()).min(1).max(50),
})

export async function GET(req: Request) {
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

    const url = new URL(req.url)
    const parsed = guidesQuerySchema.safeParse({
      q: url.searchParams.get('q') ?? undefined,
      tag: url.searchParams.get('tag') ?? undefined,
      folderId: url.searchParams.get('folderId') ?? undefined,
      view: url.searchParams.get('view') ?? undefined,
      page: url.searchParams.get('page') ?? undefined,
      limit: url.searchParams.get('limit') ?? undefined,
    })

    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const result = await guideRepository.list({
      userId: sessionUserId,
      ...parsed.data,
    })

    return NextResponse.json(result)
  } catch (error) {
    return handleApiError(error, req)
  }
}

export async function DELETE(req: Request) {
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

    const parsed = deleteGuidesSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const result = await guideRepository.deleteManyOwned(sessionUserId, parsed.data.ids)
    if (!result.authorized) {
      return createApiErrorResponse(req, {
        status: 403,
        code: 'FORBIDDEN',
        message: 'Forbidden',
      })
    }

    return NextResponse.json({ deleted: result.deleted })
  } catch (error) {
    return handleApiError(error, req)
  }
}
