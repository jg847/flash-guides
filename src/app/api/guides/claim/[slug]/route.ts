import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { prisma } from '@/lib/db/client'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

interface RouteContext {
  params: Promise<{ slug: string }>
}

export async function POST(request: Request, context: RouteContext) {
  try {
    const session = await auth()
    const userId = await getSessionUserId(session)

    if (!userId) {
      return createApiErrorResponse(request, {
        status: 401,
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
      })
    }

    const { slug } = await context.params

    const guide = await prisma.guide.findUnique({
      where: { slug },
      select: {
        id: true,
        userId: true,
        isWatermark: true,
      },
    })

    if (!guide) {
      return createApiErrorResponse(request, {
        status: 404,
        code: 'GUIDE_NOT_FOUND',
        message: 'Guide not found',
      })
    }

    if (guide.userId && guide.userId !== userId) {
      return createApiErrorResponse(request, {
        status: 409,
        code: 'GUIDE_ALREADY_OWNED',
        message: 'Guide already belongs to another account',
      })
    }

    if (!guide.userId) {
      await prisma.guide.update({
        where: { id: guide.id },
        data: {
          userId,
          isWatermark: false,
        },
      })
    }

    return Response.json({ ok: true })
  } catch (error) {
    return handleApiError(error, request)
  }
}
