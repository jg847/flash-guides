import { tavily } from '@tavily/core'
import type { IMCPClient } from '../types'
import { MCPRateLimitError, MCPServiceError } from '../types'

export interface TavilySearchInput {
  query: string
  maxResults?: number
}

export interface TavilySearchResult {
  title: string
  url: string
  snippet: string
}

const DEFAULT_MAX_RESULTS = 5

/**
 * TavilySearchAdapter — wraps the Tavily search API.
 * Throws `MCPRateLimitError` on 429, `MCPServiceError` on 5xx / unexpected errors.
 */
export class TavilySearchAdapter implements IMCPClient<TavilySearchInput, TavilySearchResult[]> {
  readonly toolName = 'tavily-search'

  private readonly client = tavily({
    apiKey: process.env['TAVILY_API_KEY'] ?? '',
  })

  async execute({
    query,
    maxResults = DEFAULT_MAX_RESULTS,
  }: TavilySearchInput): Promise<TavilySearchResult[]> {
    let response: Awaited<ReturnType<typeof this.client.search>>
    try {
      response = await this.client.search(query, {
        maxResults,
        searchDepth: 'basic',
      })
    } catch (err) {
      // Tavily uses axios; HTTP errors come as AxiosError with err.response.status
      // The SDK also re-throws with a plain message string for some error cases
      const status =
        (err as { response?: { status?: number } }).response?.status ??
        (err as { status?: number }).status
      if (status === 429) {
        throw new MCPRateLimitError('Tavily rate limit exceeded')
      }
      if (status && status >= 500) {
        throw new MCPServiceError(`Tavily service error: HTTP ${status}`)
      }
      // Check message for rate limit / service error patterns from Tavily SDK
      const message = err instanceof Error ? err.message : String(err)
      if (message.includes('429')) {
        throw new MCPRateLimitError('Tavily rate limit exceeded')
      }
      throw new MCPServiceError(`Tavily search failed: ${message}`)
    }

    return (response.results ?? []).slice(0, maxResults).map((r) => ({
      title: r.title ?? '',
      url: r.url ?? '',
      snippet: r.content ?? '',
    }))
  }
}
