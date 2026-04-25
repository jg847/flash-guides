import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { prisma } from '@/lib/db/client'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { buildHtmlExport } from '@/lib/export/html'
import { buildMarkdownExport } from '@/lib/export/markdown'
import { buildPdfExport } from '@/lib/export/pdf'
import type { GuideExportRecord } from '@/lib/export/guide-types'

const exportQuerySchema = z.object({
  format: z.enum(['md', 'html', 'pdf']),
})

async function getOwnedGuideForExport(
  id: string,
  userId: string,
): Promise<GuideExportRecord | null> {
  return prisma.guide.findFirst({
    where: {
      id,
      userId,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      studyMode: true,
      inputType: true,
      inputValue: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  })
}

function attachmentHeaders(filename: string, contentType: string): HeadersInit {
  return {
    'Content-Type': contentType,
    'Content-Disposition': `attachment; filename="${filename}"`,
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
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
    const parsed = exportQuerySchema.safeParse({ format: url.searchParams.get('format') })
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const { id } = await params
    const guide = await getOwnedGuideForExport(id, sessionUserId)

    if (!guide) {
      return createApiErrorResponse(req, {
        status: 403,
        code: 'FORBIDDEN',
        message: 'Forbidden',
      })
    }

    if (parsed.data.format === 'md') {
      return new Response(buildMarkdownExport(guide), {
        status: 200,
        headers: attachmentHeaders(`${guide.slug}.md`, 'text/markdown; charset=utf-8'),
      })
    }

    if (parsed.data.format === 'html') {
      return new Response(await buildHtmlExport(guide), {
        status: 200,
        headers: attachmentHeaders(`${guide.slug}.html`, 'text/html; charset=utf-8'),
      })
    }

    const pdfBuffer = await buildPdfExport(guide)

    return new Response(Uint8Array.from(pdfBuffer), {
      status: 200,
      headers: attachmentHeaders(`${guide.slug}.pdf`, 'application/pdf'),
    })
  } catch (error) {
    return handleApiError(error, req)
  }
}
