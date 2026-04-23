# Sprints — Spec 05: MCP Tool Integrations

> **Status:** 🔜 Not started — can begin in parallel with Spec 03 (no dependency on auth/guest features)

---

## Sprint 05-A — Core infrastructure: types, factory, retry decorator, Web Fetch

**Status:** ✅ Complete  
**Scope:** `IMCPClient` interface, `MCPClientFactory`, `RetryDecorator`, typed error classes, `WebFetchAdapter`.

**Files touched:**

- `src/lib/mcp/types.ts` — `IMCPClient`, `MCPError`, `MCPFetchError`, `MCPTimeoutError`, `MCPServiceError`, `MCPRateLimitError`, `MCPTranscriptUnavailableError`
- `src/lib/mcp/factory.ts` — `MCPClientFactory`
- `src/lib/mcp/retry-decorator.ts` — `RetryDecorator`
- `src/lib/mcp/adapters/web-fetch.ts` — `WebFetchAdapter`
- `src/lib/mcp/index.ts` — re-exports
- `src/lib/container.ts` — composition root; registers all adapters

**Implementation notes:**

- `WebFetchAdapter` uses global `fetch` with `AbortController` for timeout.
- HTML stripping: use `node-html-parser` or regex to strip tags; limit to 100k chars.
- `RetryDecorator` only retries on `MCPServiceError` and network errors (not 4xx).
- Exponential backoff: `baseDelay * 2^attempt` + jitter.

**Tests added:**

- `tests/unit/lib/mcp/factory.test.ts`
- `tests/unit/lib/mcp/retry-decorator.test.ts`
- `tests/unit/lib/mcp/adapters/web-fetch.test.ts`
- `tests/mocks/handlers/web-fetch.ts` — MSW handler

**Entry criteria:** Spec 01 complete.  
**Exit criteria:** `WebFetchAdapter` working with retries; factory registers + retrieves it.

---

## Sprint 05-B — Tavily Search + fal.ai Image Generation adapters

**Status:** 🔜 Not started  
**Scope:** `TavilySearchAdapter` and `FalImageGenAdapter` implementations.

**Files touched:**

- `src/lib/mcp/adapters/tavily-search.ts`
- `src/lib/mcp/adapters/fal-image-gen.ts`
- `src/lib/container.ts` — register new adapters

**Implementation notes:**

- Tavily: use `@tavily/core` `TavilyClient`. API key from `TAVILY_API_KEY` env. Max results = 5.
- fal.ai: use `@fal-ai/client`. Model = `fal-ai/flux/schnell` (fast, lower cost). Return first image URL.
- Both wrapped in `RetryDecorator`.
- Image gen is best-effort: if it fails, `GenerationOrchestrator` logs and continues without image (graceful degradation).

**Tests added:**

- `tests/unit/lib/mcp/adapters/tavily-search.test.ts`
- `tests/unit/lib/mcp/adapters/fal-image-gen.test.ts`
- `tests/mocks/handlers/tavily.ts`
- `tests/mocks/handlers/fal.ts`

**Entry criteria:** Sprint 05-A complete.  
**Exit criteria:** Both adapters pass unit tests; MSW handlers prevent live API calls in CI.

---

## Sprint 05-C — YouTube Transcript adapter + interface compliance tests

**Status:** 🔜 Not started  
**Scope:** `YouTubeTranscriptAdapter`, interface compliance test suite run against all four adapters.

**Files touched:**

- `src/lib/mcp/adapters/youtube-transcript.ts`
- `tests/unit/lib/mcp/adapters/youtube-transcript.test.ts`
- `tests/integration/lib/mcp/adapter-compliance.test.ts` — LSP compliance test, run against all adapters

**Implementation notes:**

- `youtube-transcript` package: `YoutubeTranscript.fetchTranscript(videoId)` returns transcript parts.
- Join parts into a single string with space separator.
- No API key needed — uses YouTube's public captions endpoint.
- If captions disabled: package throws; catch and re-throw as `MCPTranscriptUnavailableError`.

**Tests added:**

- `tests/unit/lib/mcp/adapters/youtube-transcript.test.ts`
- `tests/integration/lib/mcp/adapter-compliance.test.ts`

**Entry criteria:** Sprint 05-B complete.  
**Exit criteria:** All T-01 through T-19 pass; interface compliance test confirms all adapters satisfy `IMCPClient` contract.
