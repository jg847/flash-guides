import { createAnthropic } from '@ai-sdk/anthropic'
import Anthropic from '@anthropic-ai/sdk'
import { streamText, generateText } from 'ai'
import { BASE_SYSTEM_PROMPT } from './prompts/index'

const MODEL_ID = 'claude-sonnet-4-5'

function isPlaywrightTestEnabled(): boolean {
  return process.env['PLAYWRIGHT_TEST'] === '1'
}

function createTextStream(chunks: string[]): ReadableStream<string> {
  return new ReadableStream<string>({
    start(controller) {
      chunks.forEach((chunk) => controller.enqueue(chunk))
      controller.close()
    },
  })
}

/**
 * ClaudeClient — Adapter over the Vercel AI SDK + Anthropic provider.
 * Exposes `streamText` and `generateText` with the configured model.
 */
export class ClaudeClient {
  private readonly anthropic = createAnthropic({
    apiKey: process.env['ANTHROPIC_API_KEY'],
  })

  private anthropicSdk: Anthropic | null = null

  getAnthropicSdk(): Anthropic {
    if (!this.anthropicSdk) {
      this.anthropicSdk = new Anthropic({
        apiKey: process.env['ANTHROPIC_API_KEY'],
      })
    }

    return this.anthropicSdk
  }

  /**
   * Stream a text generation response.
   * Returns a ReadableStream of token chunks.
   */
  async streamGenerate(
    prompt: string,
    systemSuffix?: string,
    maxOutputTokens = 4096,
  ): Promise<ReadableStream<string>> {
    if (isPlaywrightTestEnabled()) {
      return createTextStream([
        `Stubbed response for: ${prompt}. `,
        systemSuffix
          ? 'Guide context loaded successfully.'
          : 'No additional guide context provided.',
      ])
    }

    const system = systemSuffix ? `${BASE_SYSTEM_PROMPT}\n\n${systemSuffix}` : BASE_SYSTEM_PROMPT

    const result = streamText({
      model: this.anthropic(MODEL_ID),
      system,
      prompt,
      maxOutputTokens,
    })

    return result.textStream
  }

  async streamChat(
    messages: Array<{ role: 'user' | 'assistant'; content: string }>,
    systemSuffix?: string,
    maxOutputTokens = 4096,
  ): Promise<ReadableStream<string>> {
    if (isPlaywrightTestEnabled()) {
      const lastUserMessage = [...messages].reverse().find((message) => message.role === 'user')

      return createTextStream([
        `Stubbed response for: ${lastUserMessage?.content ?? 'follow-up chat'}. `,
        systemSuffix
          ? 'Guide context loaded successfully.'
          : 'No additional guide context provided.',
      ])
    }

    const system = systemSuffix ? `${BASE_SYSTEM_PROMPT}\n\n${systemSuffix}` : BASE_SYSTEM_PROMPT

    const result = streamText({
      model: this.anthropic(MODEL_ID),
      system,
      messages,
      maxOutputTokens,
    })

    return result.textStream
  }

  /**
   * Generate full text (non-streaming) — used for planning/structuring steps.
   */
  async generate(prompt: string, systemSuffix?: string, maxOutputTokens = 2048): Promise<string> {
    if (isPlaywrightTestEnabled()) {
      return `Stubbed generation for: ${prompt}${systemSuffix ? ' with context' : ''}`
    }

    const system = systemSuffix ? `${BASE_SYSTEM_PROMPT}\n\n${systemSuffix}` : BASE_SYSTEM_PROMPT

    const result = await generateText({
      model: this.anthropic(MODEL_ID),
      system,
      prompt,
      maxOutputTokens,
    })

    return result.text
  }

  async extractTextFromPdf(buffer: Buffer, filename?: string): Promise<string> {
    if (isPlaywrightTestEnabled()) {
      return `Stubbed OCR text extracted from ${filename ?? 'uploaded.pdf'}`
    }

    const message = await this.getAnthropicSdk().messages.create({
      model: MODEL_ID,
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'document',
              source: {
                type: 'base64',
                media_type: 'application/pdf',
                data: buffer.toString('base64'),
              },
            },
            {
              type: 'text',
              text:
                `Extract the readable text from this PDF in plain text. ` +
                `Preserve the document's actual subject matter and section order. ` +
                `Do not summarize, explain, or infer from the file type or filename. ` +
                `If some pages are scanned images, OCR them. ` +
                `Return only the document text for ${filename ?? 'the uploaded PDF'}.`,
            },
          ],
        },
      ],
    })

    return message.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim()
  }
}

export const claudeClient = new ClaudeClient()
