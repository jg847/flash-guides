import type { IMCPClient } from './types'
import { MCPError } from './types'

/**
 * MCPClientFactory — Registry pattern.
 * Adapters call `MCPClientFactory.register(instance)` at the composition root.
 * The orchestrator retrieves them via `MCPClientFactory.get(toolName)`.
 */
export class MCPClientFactory {
  private static registry = new Map<string, IMCPClient<unknown, unknown>>()

  static register<T, R>(client: IMCPClient<T, R>): void {
    MCPClientFactory.registry.set(client.toolName, client as IMCPClient<unknown, unknown>)
  }

  static get<T, R>(toolName: string): IMCPClient<T, R> {
    const client = MCPClientFactory.registry.get(toolName)
    if (!client) {
      throw new MCPError(`No MCP client registered for tool: ${toolName}`)
    }
    return client as IMCPClient<T, R>
  }

  /** Exposed for test isolation only — do not call in production code. */
  static _clearForTesting(): void {
    MCPClientFactory.registry.clear()
  }
}
