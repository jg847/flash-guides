import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { server } from '../../../../mocks/server'
import {
  tavilyHandlers,
  tavilyErrorHandlers,
  MOCK_TAVILY_RESPONSE,
} from '../../../../mocks/handlers/tavily'
import { TavilySearchAdapter } from '@/lib/mcp/adapters/tavily-search'
import { MCPRateLimitError, MCPServiceError } from '@/lib/mcp/types'

// Mock the tavily module to control the client's HTTP calls
// The tavily client internally uses fetch; MSW intercepts it.
// We also need to ensure the env var is set
vi.stubEnv('TAVILY_API_KEY', 'test-key')

beforeEach(() => {
  server.use(...tavilyHandlers)
})

afterEach(() => {
  server.resetHandlers()
  vi.unstubAllEnvs()
})

const adapter = new TavilySearchAdapter()

describe('TavilySearchAdapter', () => {
  it('has toolName "tavily-search"', () => {
    expect(adapter.toolName).toBe('tavily-search')
  })

  it('T-04: parses search results correctly', async () => {
    const results = await adapter.execute({ query: 'test query' })
    expect(results).toHaveLength(MOCK_TAVILY_RESPONSE.results.length)
    expect(results[0]).toMatchObject({
      title: 'Result One',
      url: 'https://example.com/1',
      snippet: 'Snippet for result one.',
    })
    expect(results[1]).toMatchObject({
      title: 'Result Two',
      url: 'https://example.com/2',
      snippet: 'Snippet for result two.',
    })
  })

  it('respects maxResults limit', async () => {
    const results = await adapter.execute({ query: 'test', maxResults: 1 })
    expect(results).toHaveLength(1)
  })

  it('T-05: throws MCPServiceError on 500', async () => {
    server.use(tavilyErrorHandlers.serverError)
    await expect(adapter.execute({ query: 'test' })).rejects.toBeInstanceOf(MCPServiceError)
  })

  it('throws MCPRateLimitError on 429', async () => {
    server.use(tavilyErrorHandlers.rateLimited)
    await expect(adapter.execute({ query: 'test' })).rejects.toBeInstanceOf(MCPRateLimitError)
  })

  it('T-19: returns empty array when search yields zero results', async () => {
    server.use(tavilyErrorHandlers.emptyResults)
    const results = await adapter.execute({ query: 'obscure query' })
    expect(results).toEqual([])
  })
})
