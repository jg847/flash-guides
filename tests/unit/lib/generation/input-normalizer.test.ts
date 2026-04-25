import { beforeEach, describe, expect, it, vi } from 'vitest'

const { mockGet } = vi.hoisted(() => ({
  mockGet: vi.fn(),
}))

vi.mock('@/lib/mcp/factory', () => ({
  MCPClientFactory: {
    get: mockGet,
  },
}))

import { normalizeInput } from '@/lib/generation/input-normalizer'

describe('normalizeInput', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('passes TOPIC input through unchanged', async () => {
    await expect(
      normalizeInput({ inputType: 'TOPIC', inputValue: 'Photosynthesis', studyMode: 'OVERVIEW' }),
    ).resolves.toEqual({
      type: 'TOPIC',
      text: 'Photosynthesis',
      originalValue: 'Photosynthesis',
    })

    expect(mockGet).not.toHaveBeenCalled()
  })

  it('passes TEXT input through unchanged', async () => {
    await expect(
      normalizeInput({ inputType: 'TEXT', inputValue: 'Raw text', studyMode: 'OVERVIEW' }),
    ).resolves.toEqual({
      type: 'TEXT',
      text: 'Raw text',
      originalValue: 'Raw text',
    })

    expect(mockGet).not.toHaveBeenCalled()
  })

  it('uses web-fetch for non-youtube URLs', async () => {
    const execute = vi.fn().mockResolvedValue({ text: 'Fetched article text', title: 'Article' })
    mockGet.mockReturnValue({ execute })

    await expect(
      normalizeInput({
        inputType: 'URL',
        inputValue: 'https://example.com/article',
        studyMode: 'OVERVIEW',
      }),
    ).resolves.toEqual({
      type: 'URL',
      text: 'Fetched article text',
      originalValue: 'https://example.com/article',
    })

    expect(mockGet).toHaveBeenCalledWith('web-fetch')
    expect(execute).toHaveBeenCalledWith({ url: 'https://example.com/article' })
  })

  it('uses youtube-transcript for youtube URLs', async () => {
    const execute = vi.fn().mockResolvedValue({ text: 'Transcript text', language: 'en' })
    mockGet.mockReturnValue({ execute })

    await expect(
      normalizeInput({
        inputType: 'URL',
        inputValue: 'https://youtu.be/abc123XYZ',
        studyMode: 'OVERVIEW',
      }),
    ).resolves.toEqual({
      type: 'URL',
      text: 'Transcript text',
      originalValue: 'https://youtu.be/abc123XYZ',
    })

    expect(mockGet).toHaveBeenCalledWith('youtube-transcript')
    expect(execute).toHaveBeenCalledWith({ videoId: 'abc123XYZ' })
  })

  it('rejects malformed URLs', async () => {
    await expect(
      normalizeInput({ inputType: 'URL', inputValue: 'not-a-url', studyMode: 'OVERVIEW' }),
    ).rejects.toThrow()
  })
})
