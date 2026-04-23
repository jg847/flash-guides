import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { server } from '../../../../mocks/server'
import {
  webFetchHandlers,
  WEB_FETCH_BASE_URL,
  MOCK_HTML,
} from '../../../../mocks/handlers/web-fetch'
import { WebFetchAdapter } from '@/lib/mcp/adapters/web-fetch'
import { MCPFetchError, MCPServiceError, MCPTimeoutError } from '@/lib/mcp/types'

beforeEach(() => {
  server.use(...webFetchHandlers)
})

afterEach(() => {
  server.resetHandlers()
})

const adapter = new WebFetchAdapter()

describe('WebFetchAdapter', () => {
  it('has toolName "web-fetch"', () => {
    expect(adapter.toolName).toBe('web-fetch')
  })

  it('T-01: returns stripped text and title on 200', async () => {
    const result = await adapter.execute({ url: `${WEB_FETCH_BASE_URL}/ok` })
    expect(result.title).toBe('Test Page')
    // HTML tags should be stripped
    expect(result.text).not.toContain('<')
    expect(result.text).not.toContain('>')
    // Script/style content should be removed
    expect(result.text).not.toContain('alert')
    expect(result.text).not.toContain('color: red')
    // Actual content preserved
    expect(result.text).toContain('Hello World')
    expect(result.text).toContain('This is test content.')
  })

  it('T-02: throws MCPFetchError with status code on 404', async () => {
    await expect(adapter.execute({ url: `${WEB_FETCH_BASE_URL}/not-found` })).rejects.toSatisfy(
      (err: unknown) => err instanceof MCPFetchError && err.statusCode === 404,
    )
  })

  it('throws MCPServiceError on 500', async () => {
    await expect(
      adapter.execute({ url: `${WEB_FETCH_BASE_URL}/server-error` }),
    ).rejects.toBeInstanceOf(MCPServiceError)
  })

  it('T-03: throws MCPTimeoutError when request times out', async () => {
    await expect(
      adapter.execute({ url: `${WEB_FETCH_BASE_URL}/timeout`, timeoutMs: 50 }),
    ).rejects.toBeInstanceOf(MCPTimeoutError)
  }, 5000)

  it('T-16: truncates text to 100k characters', async () => {
    const result = await adapter.execute({ url: `${WEB_FETCH_BASE_URL}/large` })
    expect(result.text.length).toBeLessThanOrEqual(100_000)
  })

  it('T-18: returns empty text gracefully for empty body', async () => {
    const result = await adapter.execute({ url: `${WEB_FETCH_BASE_URL}/empty` })
    expect(result.text).toBe('')
  })

  it('T-17: preserves non-English (Japanese) text', async () => {
    const result = await adapter.execute({ url: `${WEB_FETCH_BASE_URL}/japanese` })
    expect(result.text).toContain('日本語のテキスト')
    expect(result.title).toBe('テスト')
  })

  it('strips <script> tags and their content', async () => {
    // Verified via MOCK_HTML which includes an alert script
    const result = await adapter.execute({ url: `${WEB_FETCH_BASE_URL}/ok` })
    expect(result.text).not.toContain('alert')
  })

  it('returns text without HTML tags', async () => {
    const result = await adapter.execute({ url: `${WEB_FETCH_BASE_URL}/ok` })
    const hasHtmlTag = /<[a-z][\s\S]*>/i.test(result.text)
    expect(hasHtmlTag).toBe(false)
  })
})

// Sanity check: MOCK_HTML contains expected elements for test reference
describe('MOCK_HTML fixture', () => {
  it('contains expected structure', () => {
    expect(MOCK_HTML).toContain('<title>Test Page</title>')
    expect(MOCK_HTML).toContain('Hello World')
  })
})
