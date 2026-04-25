import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { shareLinkRepository } from '@/lib/db/repositories/share-links'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const shareRequestSchema = z.object({
  expiresIn: z.enum(['7d', '30d']).nullable().optional(),
})

function resolveExpiresAt(expiresIn: '7d' | '30d' | null | undefined): Date | null {
  if (!expiresIn) {
    return null
  }

  const days = expiresIn === '7d' ? 7 : 30
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000)
}

function buildShareUrl(request: Request, token: string): string {
  return new URL(`/share/${token}`, request.url).toString()
}

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

    let body: unknown = {}
    try {
      body = await req.json()
    } catch {
      body = {}
    }

    const parsed = shareRequestSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const { id } = await params
    const result = await shareLinkRepository.createOwnedShareLink({
      guideId: id,
      userId: sessionUserId,
      expiresAt: resolveExpiresAt(parsed.data.expiresIn),
    })

    if (result.status === 'forbidden') {
      return createApiErrorResponse(req, {
        status: 403,
        code: 'FORBIDDEN',
        message: 'Forbidden',
      })
    }

    const payload = {
      token: result.shareLink.token,
      url: buildShareUrl(req, result.shareLink.token),
      expiresAt: result.shareLink.expiresAt?.toISOString() ?? null,
    }

    return NextResponse.json(payload, { status: result.status === 'created' ? 201 : 409 })
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
    const deleted = await shareLinkRepository.deleteOwnedShareLink(id, sessionUserId)

    if (!deleted) {
      return createApiErrorResponse(req, {
        status: 403,
        code: 'FORBIDDEN',
        message: 'Forbidden',
      })
    }

    return new Response(null, { status: 204 })
  } catch (error) {
    return handleApiError(error, req)
  }
}
