/**
 * Composition root — registers all MCP adapters at startup.
 * Import this file once in the app entry point (e.g. layout.tsx or instrumentation.ts).
 */
import { MCPClientFactory } from './mcp/factory'
import { RetryDecorator } from './mcp/retry-decorator'
import { WebFetchAdapter } from './mcp/adapters/web-fetch'

MCPClientFactory.register(new RetryDecorator(new WebFetchAdapter()))
