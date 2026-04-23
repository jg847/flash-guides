import type { IMCPClient } from '../types'
import { MCPFetchError, MCPServiceError, MCPTimeoutError } from '../types'

export interface WebFetchInput {
  url: string
  timeoutMs?: number
}

export interface WebFetchOutput {
  text: string
  title?: string
}

const DEFAULT_TIMEOUT_MS = 10_000
const MAX_TEXT_CHARS = 100_000

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function extractTitle(html: string): string | undefined {
  const match = /<title[^>]*>([^<]*)<\/title>/i.exec(html)
  return match?.[1]?.trim() || undefined
}

/**
 * WebFetchAdapter — fetches an HTTPS URL and returns stripped text.
 * Throws `MCPFetchError` on 4xx, `MCPServiceError` on 5xx, `MCPTimeoutError` on abort.
 */
export class WebFetchAdapter implements IMCPClient<WebFetchInput, WebFetchOutput> {
  readonly toolName = 'web-fetch'

  async execute({ url, timeoutMs = DEFAULT_TIMEOUT_MS }: WebFetchInput): Promise<WebFetchOutput> {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)

    let res: Response
    try {
      res = await fetch(url, { signal: controller.signal })
    } catch (err) {
      clearTimeout(timer)
      if (err instanceof Error && err.name === 'AbortError') {
        throw new MCPTimeoutError(`Request to ${url} timed out after ${timeoutMs}ms`)
      }
      throw new MCPServiceError(
        `Network error fetching ${url}: ${err instanceof Error ? err.message : String(err)}`,
      )
    }
    clearTimeout(timer)

    if (res.status >= 400 && res.status < 500) {
      throw new MCPFetchError(`HTTP ${res.status} from ${url}`, res.status)
    }
    if (res.status >= 500) {
      throw new MCPServiceError(`HTTP ${res.status} from ${url}`)
    }

    const html = await res.text()
    const title = extractTitle(html)
    const text = stripHtml(html).slice(0, MAX_TEXT_CHARS)

    return { text, title }
  }
}
