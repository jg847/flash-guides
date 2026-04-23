import { createFalClient, ApiError } from '@fal-ai/client'
import type { IMCPClient } from '../types'
import { MCPRateLimitError, MCPServiceError } from '../types'

export interface FalImageGenInput {
  prompt: string
  width?: number
  height?: number
}

export interface FalImageGenOutput {
  url: string
  alt: string
}

const MODEL_ID = 'fal-ai/flux/schnell'
const DEFAULT_WIDTH = 512
const DEFAULT_HEIGHT = 512

interface FalImageResult {
  data?: {
    images?: Array<{ url: string; width?: number; height?: number }>
  }
  images?: Array<{ url: string; width?: number; height?: number }>
}

/**
 * FalImageGenAdapter — wraps fal.ai FLUX schnell for fast image generation.
 * Throws `MCPRateLimitError` on 429, `MCPServiceError` on other failures.
 * Intended as best-effort: the orchestrator should catch errors and degrade gracefully.
 */
export class FalImageGenAdapter implements IMCPClient<FalImageGenInput, FalImageGenOutput> {
  readonly toolName = 'fal-image-gen'

  private readonly client = createFalClient({
    credentials: () => process.env['FAL_API_KEY'] ?? '',
  })

  async execute({
    prompt,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
  }: FalImageGenInput): Promise<FalImageGenOutput> {
    let result: FalImageResult
    try {
      result = (await this.client.run(MODEL_ID, {
        input: { prompt, image_size: { width, height } },
      })) as FalImageResult
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 429) {
          throw new MCPRateLimitError('fal.ai rate limit exceeded')
        }
        throw new MCPServiceError(`fal.ai error: HTTP ${err.status}`)
      }
      throw new MCPServiceError(
        `fal.ai image generation failed: ${err instanceof Error ? err.message : String(err)}`,
      )
    }

    // run() returns { data: {...}, requestId: '' } via resultResponseHandler
    const images = result.data?.images ?? result.images
    const image = images?.[0]
    if (!image?.url) {
      throw new MCPServiceError('fal.ai returned no image')
    }

    return { url: image.url, alt: prompt }
  }
}
