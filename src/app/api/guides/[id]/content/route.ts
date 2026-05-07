import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { prisma } from '@/lib/db/client'
import { guideRepository } from '@/lib/db/repositories/guides'
import { ApiRouteError, createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import {
  applySectionEdit,
  getSectionBodyMarkdown,
  GuideSectionEditError,
} from '@/lib/guides/section-edits'
import { checkUserWindowRateLimit } from '@/lib/rate-limit/user-window'

const headingSchema = z.string().trim().min(1).max(200)
const bodySchema = z.string().trim().min(1).max(20000)

const contentEditSchema = z.discriminatedUnion('op', [
  z.object({
    op: z.literal('append_section'),
    heading: headingSchema,
    body_markdown: bodySchema,
  }),
  z.object({
    op: z.literal('replace_section'),
    heading: headingSchema,
    body_markdown: bodySchema,
  }),
  z.object({
    op: z.literal('insert_section_after'),
    heading: headingSchema,
    body_markdown: bodySchema,
    after_heading: headingSchema,
  }),
  z.object({
    op: z.literal('remove_section'),
    heading: headingSchema,
  }),
])

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

    const rateLimit = checkUserWindowRateLimit('guide-content-apply', sessionUserId, 10, 60_000)
    if (!rateLimit.allowed) {
      return createApiErrorResponse(req, {
        status: 429,
        code: 'RATE_LIMIT_EXCEEDED',
        message: 'Too many guide edits. Please wait a minute and try again.',
        details: {
          retryAfter: rateLimit.retryAfter,
          resetsAt: rateLimit.resetsAt.toISOString(),
        },
        headers: {
          'Retry-After': String(rateLimit.retryAfter),
        },
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

    const parsed = contentEditSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const { id } = await params
    const guide = await prisma.guide.findUnique({
      where: { id },
      select: {
        id: true,
        userId: true,
        content: true,
      },
    })

    if (!guide) {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'GUIDE_NOT_FOUND',
        message: 'Guide not found',
      })
    }

    if (guide.userId !== sessionUserId) {
      return createApiErrorResponse(req, {
        status: 403,
        code: 'FORBIDDEN',
        message: 'Forbidden',
      })
    }

    const previousBodyMarkdown =
      parsed.data.op === 'replace_section' || parsed.data.op === 'remove_section'
        ? getSectionBodyMarkdown(guide.content, parsed.data.heading)
        : null

    const updatedContent = applySectionEdit(guide.content, parsed.data)
    const updated = await guideRepository.update({
      id,
      userId: sessionUserId,
      content: updatedContent,
    })

    if (!updated) {
      return createApiErrorResponse(req, {
        status: 403,
        code: 'FORBIDDEN',
        message: 'Forbidden',
      })
    }

    const refreshedGuide = await prisma.guide.findUnique({
      where: { id },
      select: { content: true },
    })

    return NextResponse.json({
      content: refreshedGuide?.content ?? updatedContent,
      previousBodyMarkdown,
    })
  } catch (error) {
    if (error instanceof GuideSectionEditError) {
      return handleApiError(
        new ApiRouteError({
          status: 404,
          code:
            error.code === 'AFTER_HEADING_NOT_FOUND'
              ? 'AFTER_HEADING_NOT_FOUND'
              : 'GUIDE_SECTION_NOT_FOUND',
          message: error.message,
        }),
        req,
      )
    }

    return handleApiError(error, req)
  }
}
