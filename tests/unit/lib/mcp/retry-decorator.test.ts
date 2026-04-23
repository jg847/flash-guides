import { describe, it, expect, vi, beforeEach } from 'vitest'
import { RetryDecorator } from '@/lib/mcp/retry-decorator'
import { MCPServiceError, MCPTimeoutError, MCPFetchError, MCPRateLimitError } from '@/lib/mcp/types'
import type { IMCPClient } from '@/lib/mcp/types'

function makeMockClient(
  toolName: string,
  executeImpl: () => Promise<string>,
): IMCPClient<string, string> {
  return { toolName, execute: vi.fn(executeImpl) }
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('RetryDecorator', () => {
  it('forwards toolName from wrapped client', () => {
    const inner = makeMockClient('my-tool', async () => 'ok')
    const decorator = new RetryDecorator(inner)
    expect(decorator.toolName).toBe('my-tool')
  })

  it('returns result immediately on first success', async () => {
    const inner = makeMockClient('tool', async () => 'success')
    const decorator = new RetryDecorator(inner, 3, 0)
    const result = await decorator.execute('input')
    expect(result).toBe('success')
    expect(inner.execute).toHaveBeenCalledTimes(1)
  })

  it('T-10: retries on MCPServiceError and succeeds on 3rd attempt', async () => {
    let calls = 0
    const inner = makeMockClient('tool', async () => {
      calls++
      if (calls < 3) throw new MCPServiceError('service down')
      return 'recovered'
    })
    // baseDelayMs=0 → 0ms delays, no fake timers needed
    const decorator = new RetryDecorator(inner, 3, 0)
    const result = await decorator.execute('input')
    expect(result).toBe('recovered')
    expect(calls).toBe(3)
  })

  it('retries on MCPTimeoutError', async () => {
    let calls = 0
    const inner = makeMockClient('tool', async () => {
      calls++
      if (calls < 2) throw new MCPTimeoutError('timed out')
      return 'ok'
    })
    const decorator = new RetryDecorator(inner, 3, 0)
    const result = await decorator.execute('input')
    expect(result).toBe('ok')
    expect(calls).toBe(2)
  })

  it('T-11: throws after max retries when always failing', async () => {
    const inner = makeMockClient('tool', async () => {
      throw new MCPServiceError('always fails')
    })
    const decorator = new RetryDecorator(inner, 3, 0)
    await expect(decorator.execute('input')).rejects.toBeInstanceOf(MCPServiceError)
    expect(inner.execute).toHaveBeenCalledTimes(3)
  })

  it('does NOT retry on MCPFetchError (4xx)', async () => {
    const inner = makeMockClient('tool', async () => {
      throw new MCPFetchError('not found', 404)
    })
    const decorator = new RetryDecorator(inner, 3, 0)
    await expect(decorator.execute('input')).rejects.toBeInstanceOf(MCPFetchError)
    expect(inner.execute).toHaveBeenCalledTimes(1)
  })

  it('does NOT retry on MCPRateLimitError', async () => {
    const inner = makeMockClient('tool', async () => {
      throw new MCPRateLimitError('rate limited')
    })
    const decorator = new RetryDecorator(inner, 3, 0)
    await expect(decorator.execute('input')).rejects.toBeInstanceOf(MCPRateLimitError)
    expect(inner.execute).toHaveBeenCalledTimes(1)
  })
})
