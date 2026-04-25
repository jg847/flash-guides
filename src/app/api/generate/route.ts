import { z } from 'zod'
import { auth } from '@/lib/auth'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { generationOrchestrator } from '@/lib/generation/orchestrator'
import { enforceGuestGenerationRateLimit } from '@/lib/rate-limit/middleware'
import { sanitizeObjectStrings } from '@/lib/security/sanitize'
import type { SSEEvent } from '@/types/generation'

const generateSchema = z.object({
  inputType: z.enum(['TOPIC', 'TEXT', 'URL']),
  inputValue: z.string().min(1).max(50000),
  studyMode: z.enum(['OVERVIEW', 'DEEP_DIVE', 'EXAM_PREP', 'ELI5']),
})

function encodeSSE(event: SSEEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`
}

export async function POST(req: Request): Promise<Response> {
  try {
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

    const parsed = generateSchema.safeParse(sanitizedBody)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const session = await auth()

    if (!session?.user?.id) {
      const rateLimitResponse = await enforceGuestGenerationRateLimit(req)
      if (rateLimitResponse) {
        return rateLimitResponse
      }
    }

    const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>()
    const writer = writable.getWriter()
    const encoder = new TextEncoder()

    ;(async () => {
      try {
        const gen = generationOrchestrator.orchestrate({
          request: parsed.data,
          session,
          req,
          skipGuestQuotaCheck: true,
        })

        for await (const event of gen) {
          await writer.write(encoder.encode(encodeSSE(event)))

          if (event.type === 'done' || event.type === 'error') {
            break
          }
        }
      } catch {
        const errEvent: SSEEvent = {
          type: 'error',
          message: 'AI service unavailable, please try again',
        }
        try {
          await writer.write(encoder.encode(encodeSSE(errEvent)))
        } catch {
          // writer already closed
        }
      } finally {
        await writer.close().catch(() => {
          // ignore close errors
        })
      }
    })()

    return new Response(readable, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    return handleApiError(error, req)
  }
}
