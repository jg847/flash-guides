import { beforeEach, describe, expect, it, vi } from 'vitest'

const { mockTavilySearch, mockFalRun, mockFetchTranscript } = vi.hoisted(() => ({
  mockTavilySearch: vi.fn(),
  mockFalRun: vi.fn(),
  mockFetchTranscript: vi.fn(),
}))

vi.mock('@tavily/core', () => ({
  tavily: () => ({
    search: mockTavilySearch,
  }),
}))

vi.mock('@fal-ai/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@fal-ai/client')>()
  return {
    ...actual,
    createFalClient: () => ({ run: mockFalRun }),
  }
})

vi.mock('youtube-transcript', () => ({
  YoutubeTranscript: {
    fetchTranscript: mockFetchTranscript,
  },
}))

import { FalImageGenAdapter } from '@/lib/mcp/adapters/fal-image-gen'
import { TavilySearchAdapter } from '@/lib/mcp/adapters/tavily-search'
import { WebFetchAdapter } from '@/lib/mcp/adapters/web-fetch'
import { YouTubeTranscriptAdapter } from '@/lib/mcp/adapters/youtube-transcript'

describe('MCP adapter compliance', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response('<html><title>Example</title><body>Hello world</body></html>', {
          status: 200,
          headers: { 'content-type': 'text/html' },
        }),
      ),
    )

    mockTavilySearch.mockResolvedValue({
      results: [
        {
          title: 'Example result',
          url: 'https://example.com',
          content: 'Example snippet',
        },
      ],
    })

    mockFalRun.mockResolvedValue({
      data: { images: [{ url: 'https://example.com/image.jpg', width: 512, height: 512 }] },
      requestId: 'request-id',
    })

    mockFetchTranscript.mockResolvedValue([
      { text: 'Hello', duration: 1, offset: 0, lang: 'en' },
      { text: 'world', duration: 1, offset: 1000, lang: 'en' },
    ])
  })

  it('all adapters expose a unique non-empty toolName', () => {
    const adapters = [
      new WebFetchAdapter(),
      new TavilySearchAdapter(),
      new FalImageGenAdapter(),
      new YouTubeTranscriptAdapter(),
    ]

    const toolNames = adapters.map((adapter) => adapter.toolName)

    expect(toolNames.every((toolName) => toolName.length > 0)).toBe(true)
    expect(new Set(toolNames).size).toBe(toolNames.length)
  })

  it('all adapters satisfy the IMCPClient execute contract', async () => {
    const webFetch = new WebFetchAdapter()
    const tavilySearch = new TavilySearchAdapter()
    const falImageGen = new FalImageGenAdapter()
    const youtubeTranscript = new YouTubeTranscriptAdapter()

    await expect(webFetch.execute({ url: 'https://example.com' })).resolves.toEqual({
      text: 'Example Hello world',
      title: 'Example',
    })

    await expect(tavilySearch.execute({ query: 'example query' })).resolves.toEqual([
      {
        title: 'Example result',
        url: 'https://example.com',
        snippet: 'Example snippet',
      },
    ])

    await expect(falImageGen.execute({ prompt: 'test prompt' })).resolves.toEqual({
      url: 'https://example.com/image.jpg',
      alt: 'test prompt',
    })

    await expect(youtubeTranscript.execute({ videoId: 'abc123' })).resolves.toEqual({
      text: 'Hello world',
      language: 'en',
    })
  })
})
