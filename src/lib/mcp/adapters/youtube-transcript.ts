import { YoutubeTranscript } from 'youtube-transcript'
import type { IMCPClient } from '../types'
import { MCPTranscriptUnavailableError } from '../types'

export interface YouTubeTranscriptInput {
  videoId: string
  lang?: string
}

export interface YouTubeTranscriptOutput {
  text: string
  language?: string
}

/**
 * YouTubeTranscriptAdapter — fetches public YouTube captions and joins them into plain text.
 * Throws `MCPTranscriptUnavailableError` when captions are disabled or otherwise unavailable.
 */
export class YouTubeTranscriptAdapter implements IMCPClient<
  YouTubeTranscriptInput,
  YouTubeTranscriptOutput
> {
  readonly toolName = 'youtube-transcript'

  async execute({ videoId, lang }: YouTubeTranscriptInput): Promise<YouTubeTranscriptOutput> {
    try {
      const transcript = await YoutubeTranscript.fetchTranscript(videoId, { lang })
      const text = transcript
        .map((part) => part.text.trim())
        .filter(Boolean)
        .join(' ')
        .trim()

      if (!text) {
        throw new MCPTranscriptUnavailableError(`Transcript unavailable for video: ${videoId}`)
      }

      return {
        text,
        language: transcript[0]?.lang ?? lang,
      }
    } catch (err) {
      if (err instanceof MCPTranscriptUnavailableError) {
        throw err
      }

      throw new MCPTranscriptUnavailableError(
        `Transcript unavailable for video: ${videoId}${err instanceof Error ? ` (${err.message})` : ''}`,
      )
    }
  }
}
