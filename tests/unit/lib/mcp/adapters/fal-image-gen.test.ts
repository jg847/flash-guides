import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ApiError } from '@fal-ai/client'
import { FalImageGenAdapter } from '@/lib/mcp/adapters/fal-image-gen'
import { MCPRateLimitError, MCPServiceError } from '@/lib/mcp/types'

// Mock the fal client module to avoid real network calls in jsdom
const mockRun = vi.fn()
vi.mock('@fal-ai/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@fal-ai/client')>()
  return {
    ...actual,
    createFalClient: () => ({ run: mockRun }),
  }
})

const MOCK_IMAGE_URL = 'https://fal.run/files/mock-image-abc123.jpg'

beforeEach(() => {
  vi.clearAllMocks()
  mockRun.mockResolvedValue({
    data: { images: [{ url: MOCK_IMAGE_URL, width: 512, height: 512 }] },
    requestId: 'test-request-id',
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

const adapter = new FalImageGenAdapter()

describe('FalImageGenAdapter', () => {
  it('has toolName "fal-image-gen"', () => {
    expect(adapter.toolName).toBe('fal-image-gen')
  })

  it('T-06: returns image url and alt on success', async () => {
    const result = await adapter.execute({ prompt: 'A scenic mountain' })
    expect(result).toMatchObject({
      url: MOCK_IMAGE_URL,
      alt: 'A scenic mountain',
    })
  })

  it('T-07: throws MCPRateLimitError on 429', async () => {
    mockRun.mockRejectedValue(
      new ApiError({ message: 'Rate limited', status: 429, body: null, requestId: '' }),
    )
    await expect(adapter.execute({ prompt: 'test' })).rejects.toBeInstanceOf(MCPRateLimitError)
  })

  it('throws MCPServiceError on 500', async () => {
    mockRun.mockRejectedValue(
      new ApiError({ message: 'Server error', status: 500, body: null, requestId: '' }),
    )
    await expect(adapter.execute({ prompt: 'test' })).rejects.toBeInstanceOf(MCPServiceError)
  })

  it('throws MCPServiceError when no images returned', async () => {
    mockRun.mockResolvedValue({ data: { images: [] }, requestId: '' })
    await expect(adapter.execute({ prompt: 'test' })).rejects.toBeInstanceOf(MCPServiceError)
  })

  it('uses prompt as alt text', async () => {
    const result = await adapter.execute({ prompt: 'A purple sunset over the ocean' })
    expect(result.alt).toBe('A purple sunset over the ocean')
  })
})
