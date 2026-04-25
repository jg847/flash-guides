import { z } from 'zod'
import { MCPClientFactory } from '@/lib/mcp/factory'
import type { WebFetchInput, WebFetchOutput } from '@/lib/mcp/adapters/web-fetch'
import type {
  YouTubeTranscriptInput,
  YouTubeTranscriptOutput,
} from '@/lib/mcp/adapters/youtube-transcript'
import type { GenerationRequest, NormalizedInput } from '@/types/generation'
import { extractYouTubeVideoId, isYouTubeUrl } from './url-detector'

const urlSchema = z.string().url()

export async function normalizeInput(request: GenerationRequest): Promise<NormalizedInput> {
  if (request.inputType === 'TOPIC' || request.inputType === 'TEXT') {
    return {
      type: request.inputType,
      text: request.inputValue,
      originalValue: request.inputValue,
    }
  }

  const validatedUrl = urlSchema.parse(request.inputValue)

  if (isYouTubeUrl(validatedUrl)) {
    const videoId = extractYouTubeVideoId(validatedUrl)
    if (!videoId) {
      throw new Error('Invalid YouTube URL')
    }

    const transcriptClient = MCPClientFactory.get<YouTubeTranscriptInput, YouTubeTranscriptOutput>(
      'youtube-transcript',
    )
    const transcript = await transcriptClient.execute({ videoId })

    return {
      type: request.inputType,
      text: transcript.text,
      originalValue: request.inputValue,
    }
  }

  const webFetchClient = MCPClientFactory.get<WebFetchInput, WebFetchOutput>('web-fetch')
  const result = await webFetchClient.execute({ url: validatedUrl })

  return {
    type: request.inputType,
    text: result.text,
    originalValue: request.inputValue,
  }
}
