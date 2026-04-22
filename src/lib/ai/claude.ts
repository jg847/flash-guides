import { createAnthropic } from '@ai-sdk/anthropic'
import { streamText, generateText } from 'ai'
import { BASE_SYSTEM_PROMPT } from './prompts/index'

const MODEL_ID = 'claude-sonnet-4-5'

/**
 * ClaudeClient — Adapter over the Vercel AI SDK + Anthropic provider.
 * Exposes `streamText` and `generateText` with the configured model.
 */
export class ClaudeClient {
  private readonly anthropic = createAnthropic({
    apiKey: process.env['ANTHROPIC_API_KEY'],
  })

  /**
   * Stream a text generation response.
   * Returns a ReadableStream of token chunks.
   */
  async streamGenerate(prompt: string, systemSuffix?: string): Promise<ReadableStream<string>> {
    const system = systemSuffix ? `${BASE_SYSTEM_PROMPT}\n\n${systemSuffix}` : BASE_SYSTEM_PROMPT

    const result = streamText({
      model: this.anthropic(MODEL_ID),
      system,
      prompt,
      maxOutputTokens: 4096,
    })

    return result.textStream
  }

  /**
   * Generate full text (non-streaming) — used for planning/structuring steps.
   */
  async generate(prompt: string, systemSuffix?: string): Promise<string> {
    const system = systemSuffix ? `${BASE_SYSTEM_PROMPT}\n\n${systemSuffix}` : BASE_SYSTEM_PROMPT

    const result = await generateText({
      model: this.anthropic(MODEL_ID),
      system,
      prompt,
      maxOutputTokens: 2048,
    })

    return result.text
  }
}

export const claudeClient = new ClaudeClient()
