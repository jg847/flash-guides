import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { forkGuide } from '@/lib/guides/fork'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
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
    const result = await forkGuide(id, sessionUserId)

    if (result.status === 'not-found') {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'SHAREABLE_GUIDE_NOT_FOUND',
        message: 'Shareable guide not found',
      })
    }

    return NextResponse.json(
      {
        guideId: result.guide.id,
        guideSlug: result.guide.slug,
        title: result.guide.title,
      },
      { status: 201 },
    )
  } catch (error) {
    return handleApiError(error, req)
  }
}
