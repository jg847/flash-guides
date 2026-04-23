/**
 * Composition root — registers all MCP adapters at startup.
 * Import this file once in the app entry point (e.g. layout.tsx or instrumentation.ts).
 */
import { MCPClientFactory } from './mcp/factory'
import { RetryDecorator } from './mcp/retry-decorator'
import { WebFetchAdapter } from './mcp/adapters/web-fetch'
import { TavilySearchAdapter } from './mcp/adapters/tavily-search'
import { FalImageGenAdapter } from './mcp/adapters/fal-image-gen'

MCPClientFactory.register(new RetryDecorator(new WebFetchAdapter()))
MCPClientFactory.register(new RetryDecorator(new TavilySearchAdapter()))
MCPClientFactory.register(new RetryDecorator(new FalImageGenAdapter()))
