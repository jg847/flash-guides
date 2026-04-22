import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/ai/claude', () => ({
  claudeClient: { generate: vi.fn(), streamGenerate: vi.fn() },
  ClaudeClient: vi.fn(),
}))

vi.mock('@/lib/db/client', () => ({
  prisma: {
    guide: { create: vi.fn() },
  },
}))

vi.mock('@/lib/guest/quota', () => ({
  checkAndIncrementQuota: vi.fn(),
  extractIp: vi.fn().mockReturnValue('1.2.3.4'),
}))

import { claudeClient } from '@/lib/ai/claude'
import { prisma } from '@/lib/db/client'
import { checkAndIncrementQuota } from '@/lib/guest/quota'
import { GenerationOrchestrator } from '@/lib/generation/orchestrator'
import type { GenerationRequest, SSEEvent } from '@/types/generation'

const mockClient = claudeClient as unknown as {
  generate: ReturnType<typeof vi.fn>
  streamGenerate: ReturnType<typeof vi.fn>
}
const mockCreate = (prisma.guide as unknown as { create: ReturnType<typeof vi.fn> }).create
const mockQuota = checkAndIncrementQuota as ReturnType<typeof vi.fn>

const MOCK_PLAN = `TITLE: Test Guide
## Section One
First section content.
## Section Two
Second section content.`

async function collectEvents(gen: AsyncGenerator<SSEEvent>): Promise<SSEEvent[]> {
  const events: SSEEvent[] = []
  for await (const event of gen) {
    events.push(event)
  }
  return events
}

// Create a minimal ReadableStream of strings
function makeTextStream(text: string): ReadableStream<string> {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(text)
      controller.close()
    },
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  mockClient.generate.mockResolvedValue(MOCK_PLAN)
  mockClient.streamGenerate.mockResolvedValue(makeTextStream('# Test Guide\n\nContent.'))
  mockCreate.mockResolvedValue({ id: 'g1', slug: 'test-guide-abc123' })
  mockQuota.mockResolvedValue({ allowed: true, used: 1, limit: 3, resetsAt: new Date() })
})

const baseRequest: GenerationRequest = {
  inputType: 'TOPIC',
  inputValue: 'React Hooks',
  studyMode: 'OVERVIEW',
}

const guestReq = new Request('http://localhost/', {
  headers: { 'x-forwarded-for': '1.2.3.4' },
})

describe('GenerationOrchestrator', () => {
  it('T-01: emits step events in planning → writing → done order', async () => {
    const orch = new GenerationOrchestrator()
    const events = await collectEvents(
      orch.orchestrate({ request: baseRequest, session: null, req: guestReq }),
    )

    const types = events.map((e) => e.type)
    expect(types).toContain('step')
    expect(types).toContain('done')
  })

  it('emits a done event with a guideSlug on success', async () => {
    const orch = new GenerationOrchestrator()
    const events = await collectEvents(
      orch.orchestrate({ request: baseRequest, session: null, req: guestReq }),
    )

    const done = events.find((e) => e.type === 'done')
    expect(done).toBeDefined()
    expect((done as { type: 'done'; guideSlug: string }).guideSlug).toBeTruthy()
  })

  it('persists guide to DB with isWatermark=true for guests', async () => {
    const orch = new GenerationOrchestrator()
    await collectEvents(orch.orchestrate({ request: baseRequest, session: null, req: guestReq }))

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ isWatermark: true, userId: null }),
      }),
    )
  })

  it('persists guide with userId for registered users', async () => {
    const orch = new GenerationOrchestrator()
    const session = { user: { id: 'user-1', email: 'a@b.com' } } as never
    await collectEvents(orch.orchestrate({ request: baseRequest, session, req: guestReq }))

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ isWatermark: false, userId: 'user-1' }),
      }),
    )
  })

  it('emits error event and stops when quota is exceeded (guest)', async () => {
    mockQuota.mockResolvedValueOnce({
      allowed: false,
      used: 3,
      limit: 3,
      resetsAt: new Date(),
    })

    const orch = new GenerationOrchestrator()
    const events = await collectEvents(
      orch.orchestrate({ request: baseRequest, session: null, req: guestReq }),
    )

    expect(events[0]?.type).toBe('error')
    const errMsg = (events[0] as { type: 'error'; message: string }).message
    expect(errMsg).toContain('QUOTA_EXCEEDED')
    expect(mockCreate).not.toHaveBeenCalled()
  })

  it('skips quota check for registered users', async () => {
    const orch = new GenerationOrchestrator()
    const session = { user: { id: 'user-1', email: 'a@b.com' } } as never
    await collectEvents(orch.orchestrate({ request: baseRequest, session, req: guestReq }))

    expect(mockQuota).not.toHaveBeenCalled()
  })

  it('emits error event when Claude generate throws', async () => {
    mockClient.generate.mockRejectedValueOnce(new Error('API down'))

    const orch = new GenerationOrchestrator()
    const events = await collectEvents(
      orch.orchestrate({ request: baseRequest, session: null, req: guestReq }),
    )

    const errorEvent = events.find((e) => e.type === 'error')
    expect(errorEvent).toBeDefined()
    expect((errorEvent as { type: 'error'; message: string }).message).toContain('unavailable')
  })
})
