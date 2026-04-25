import { beforeEach, describe, expect, it, vi } from 'vitest'
import { YouTubeTranscriptAdapter } from '@/lib/mcp/adapters/youtube-transcript'
import { MCPTranscriptUnavailableError } from '@/lib/mcp/types'

const { mockFetchTranscript } = vi.hoisted(() => ({
  mockFetchTranscript: vi.fn(),
}))

vi.mock('youtube-transcript', () => ({
  YoutubeTranscript: {
    fetchTranscript: mockFetchTranscript,
  },
}))

const adapter = new YouTubeTranscriptAdapter()

describe('YouTubeTranscriptAdapter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockFetchTranscript.mockResolvedValue([
      { text: 'Hello', duration: 1.2, offset: 0, lang: 'en' },
      { text: 'world', duration: 1.3, offset: 1200, lang: 'en' },
    ])
  })

  it('has toolName "youtube-transcript"', () => {
    expect(adapter.toolName).toBe('youtube-transcript')
  })

  it('returns joined transcript text', async () => {
    const result = await adapter.execute({ videoId: 'abc123' })

    expect(mockFetchTranscript).toHaveBeenCalledWith('abc123', { lang: undefined })
    expect(result).toEqual({
      text: 'Hello world',
      language: 'en',
    })
  })

  it('passes through the requested language', async () => {
    await adapter.execute({ videoId: 'abc123', lang: 'es' })

    expect(mockFetchTranscript).toHaveBeenCalledWith('abc123', { lang: 'es' })
  })

  it('throws MCPTranscriptUnavailableError when the package throws', async () => {
    mockFetchTranscript.mockRejectedValue(new Error('Subtitles are disabled'))

    await expect(adapter.execute({ videoId: 'abc123' })).rejects.toBeInstanceOf(
      MCPTranscriptUnavailableError,
    )
  })

  it('throws MCPTranscriptUnavailableError when transcript text is empty', async () => {
    mockFetchTranscript.mockResolvedValue([{ text: '   ', duration: 1, offset: 0, lang: 'en' }])

    await expect(adapter.execute({ videoId: 'abc123' })).rejects.toBeInstanceOf(
      MCPTranscriptUnavailableError,
    )
  })
})
