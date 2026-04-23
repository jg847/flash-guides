import { z } from 'zod'
import { auth } from '@/lib/auth'
import { generationOrchestrator } from '@/lib/generation/orchestrator'
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
  // Parse + validate body
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const parsed = generateSchema.safeParse(body)
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: 'Validation failed', issues: parsed.error.issues }),
      {
        status: 422,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  }

  const session = await auth()

  const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>()
  const writer = writable.getWriter()
  const encoder = new TextEncoder()

  // Run orchestrator in background, piping events into the stream
  ;(async () => {
    try {
      const gen = generationOrchestrator.orchestrate({
        request: parsed.data,
        session,
        req,
      })

      for await (const event of gen) {
        // Surface quota errors as 429 is impossible after headers sent; encode in SSE
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
}
