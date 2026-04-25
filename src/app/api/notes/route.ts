import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { prisma } from '@/lib/db/client'
import { noteRepository } from '@/lib/db/repositories/notes'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { sanitizeObjectStrings } from '@/lib/security/sanitize'

const createNoteSchema = z.object({
  guideId: z.string().cuid(),
  selectedText: z.string().min(1).max(2000),
  content: z.string().max(5000).optional().default(''),
})

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

    const sanitizedBody =
      body && typeof body === 'object' && !Array.isArray(body)
        ? sanitizeObjectStrings(body as Record<string, unknown>)
        : body

    const parsed = createNoteSchema.safeParse(sanitizedBody)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const guide = await prisma.guide.findUnique({
      where: { id: parsed.data.guideId },
      select: {
        id: true,
        userId: true,
        isPublic: true,
      },
    })

    if (!guide) {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'GUIDE_NOT_FOUND',
        message: 'Guide not found',
      })
    }

    if (!guide.isPublic && guide.userId !== sessionUserId) {
      return createApiErrorResponse(req, {
        status: 403,
        code: 'FORBIDDEN',
        message: 'Forbidden',
      })
    }

    const note = await noteRepository.create({
      userId: sessionUserId,
      guideId: parsed.data.guideId,
      selectedText: parsed.data.selectedText,
      content: parsed.data.content,
    })

    return NextResponse.json(note, { status: 201 })
  } catch (error) {
    return handleApiError(error, req)
  }
}
