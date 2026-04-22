import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@ai-sdk/anthropic', () => ({
  createAnthropic: vi.fn().mockReturnValue(vi.fn().mockReturnValue('mock-model')),
}))

vi.mock('ai', () => ({
  streamText: vi.fn(),
  generateText: vi.fn(),
}))

import { streamText, generateText } from 'ai'
import { ClaudeClient } from '@/lib/ai/claude'

const mockStreamText = streamText as ReturnType<typeof vi.fn>
const mockGenerateText = generateText as ReturnType<typeof vi.fn>

function makeTextStream(chunks: string[]): ReadableStream<string> {
  let idx = 0
  return new ReadableStream({
    pull(controller) {
      if (idx < chunks.length) {
        controller.enqueue(chunks[idx++]!)
      } else {
        controller.close()
      }
    },
  })
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('ClaudeClient', () => {
  it('streamGenerate returns a ReadableStream', async () => {
    mockStreamText.mockReturnValue({
      textStream: makeTextStream(['Hello', ' World']),
    })

    const client = new ClaudeClient()
    const stream = await client.streamGenerate('test prompt')

    expect(stream).toBeInstanceOf(ReadableStream)
  })

  it('generate returns the full text string', async () => {
    mockGenerateText.mockResolvedValue({ text: 'Generated content here.' })

    const client = new ClaudeClient()
    const result = await client.generate('test prompt')

    expect(result).toBe('Generated content here.')
  })

  it('passes system suffix to the generate call', async () => {
    mockGenerateText.mockResolvedValue({ text: 'ok' })

    const client = new ClaudeClient()
    await client.generate('prompt', 'extra instructions')

    const callArgs = mockGenerateText.mock.calls[0]?.[0] as { system: string }
    expect(callArgs.system).toContain('extra instructions')
    expect(callArgs.system).toContain('FlashGuides AI')
  })
})
