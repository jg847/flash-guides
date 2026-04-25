import { describe, expect, it } from 'vitest'
import { extractYouTubeVideoId, isYouTubeUrl } from '@/lib/generation/url-detector'

describe('url-detector', () => {
  it('detects standard youtube watch URLs', () => {
    expect(isYouTubeUrl('https://www.youtube.com/watch?v=abc123XYZ')).toBe(true)
    expect(extractYouTubeVideoId('https://www.youtube.com/watch?v=abc123XYZ')).toBe('abc123XYZ')
  })

  it('detects youtu.be short URLs', () => {
    expect(isYouTubeUrl('https://youtu.be/abc123XYZ')).toBe(true)
    expect(extractYouTubeVideoId('https://youtu.be/abc123XYZ')).toBe('abc123XYZ')
  })

  it('detects youtube shorts URLs', () => {
    expect(isYouTubeUrl('https://youtube.com/shorts/abc123XYZ')).toBe(true)
    expect(extractYouTubeVideoId('https://youtube.com/shorts/abc123XYZ')).toBe('abc123XYZ')
  })

  it('returns false for non-youtube URLs', () => {
    expect(isYouTubeUrl('https://example.com/article')).toBe(false)
    expect(extractYouTubeVideoId('https://example.com/article')).toBeNull()
  })

  it('returns false for invalid URLs', () => {
    expect(isYouTubeUrl('not-a-url')).toBe(false)
    expect(extractYouTubeVideoId('not-a-url')).toBeNull()
  })
})
