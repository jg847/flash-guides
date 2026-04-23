import { describe, it, expect, beforeEach } from 'vitest'
import { MCPClientFactory } from '@/lib/mcp/factory'
import { MCPError } from '@/lib/mcp/types'
import type { IMCPClient } from '@/lib/mcp/types'

function makeMockClient(toolName: string): IMCPClient<unknown, unknown> {
  return {
    toolName,
    execute: async () => ({ result: 'ok' }),
  }
}

beforeEach(() => {
  MCPClientFactory._clearForTesting()
})

describe('MCPClientFactory', () => {
  it('T-12: register and get returns the same instance', () => {
    const client = makeMockClient('test-tool')
    MCPClientFactory.register(client)
    const retrieved = MCPClientFactory.get('test-tool')
    expect(retrieved).toBe(client)
  })

  it('T-13: get throws MCPError for unknown tool', () => {
    expect(() => MCPClientFactory.get('unknown-tool')).toThrowError(MCPError)
  })

  it('get throws with the tool name in the message', () => {
    expect(() => MCPClientFactory.get('missing')).toThrow(/missing/)
  })

  it('register overwrites existing tool with same name', () => {
    const client1 = makeMockClient('tool-a')
    const client2 = makeMockClient('tool-a')
    MCPClientFactory.register(client1)
    MCPClientFactory.register(client2)
    expect(MCPClientFactory.get('tool-a')).toBe(client2)
  })

  it('supports multiple different tools in the registry', () => {
    const clientA = makeMockClient('tool-a')
    const clientB = makeMockClient('tool-b')
    MCPClientFactory.register(clientA)
    MCPClientFactory.register(clientB)
    expect(MCPClientFactory.get('tool-a')).toBe(clientA)
    expect(MCPClientFactory.get('tool-b')).toBe(clientB)
  })
})
