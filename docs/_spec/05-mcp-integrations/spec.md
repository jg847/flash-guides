# Spec 05 — MCP Tool Integrations

> **Status:** 📝 Spec ready — not yet implemented  
> **Sprint file:** [sprints.md](./sprints.md)

---

## 1. Feature Summary

The MCP Tool Integrations spec covers the client factory and four adapter implementations that give the generation pipeline access to external data sources: Web Fetch (direct HTTP), Web Search (Tavily API), Image Generation (fal.ai FLUX), and YouTube Transcripts (`youtube-transcript` npm package). All adapters implement a common `IMCPClient` interface, are instantiated via `MCPClientFactory`, and wrap their respective SDKs behind internal interfaces for easy mocking and swapping. Unified error handling, configurable timeouts, and exponential-backoff retries are applied consistently across all adapters via a `RetryDecorator`.

---

## 2. User Stories

1. As the **generation pipeline**, I want to fetch the text content of any HTTPS URL so that URL inputs can be turned into study guides.
2. As the **generation pipeline**, I want to search the web for relevant facts and images when enriching a guide so that content is accurate and visually rich.
3. As the **generation pipeline**, I want to generate contextually relevant images for guide sections so that guides are visually engaging.
4. As the **generation pipeline**, I want to fetch the transcript of a YouTube video so that YouTube URLs can be turned into study guides.
5. As a **developer**, I want to add a new MCP tool by implementing one interface and registering it, without modifying existing code.
6. As a **developer**, I want all MCP calls mocked in unit/integration tests so that CI never hits live third-party APIs.

---

## 3. Acceptance Criteria

| #     | Story | Given                     | When                                                     | Then                                                                                   |
| ----- | ----- | ------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| AC-01 | US-1  | Valid HTTPS URL           | `WebFetchAdapter.fetch(url)` called                      | Returns page text (≤100k chars, trimmed); no HTML tags                                 |
| AC-02 | US-1  | URL returns 404           | `WebFetchAdapter.fetch(url)` called                      | Throws `MCPFetchError` with status code                                                |
| AC-03 | US-1  | URL times out             | `WebFetchAdapter.fetch(url)` called                      | Retries up to 3 times then throws `MCPTimeoutError`                                    |
| AC-04 | US-2  | Valid query               | `TavilySearchAdapter.search(query)` called               | Returns array of `{title, url, snippet}` (up to 5 results)                             |
| AC-05 | US-2  | Tavily API returns 5xx    | `TavilySearchAdapter.search(query)` called               | Retries 3× then throws `MCPServiceError`                                               |
| AC-06 | US-3  | Valid image prompt        | `FalImageGenAdapter.generate(prompt)` called             | Returns `{url: string, alt: string}` for generated image                               |
| AC-07 | US-3  | fal.ai rate-limited       | `FalImageGenAdapter.generate(prompt)` called             | Throws `MCPRateLimitError`; generation pipeline degrades gracefully (no image)         |
| AC-08 | US-4  | Valid YouTube URL         | `YouTubeTranscriptAdapter.getTranscript(videoId)` called | Returns full transcript as plain text string                                           |
| AC-09 | US-4  | Video has no transcript   | `YouTubeTranscriptAdapter.getTranscript(videoId)` called | Throws `MCPTranscriptUnavailableError`                                                 |
| AC-10 | US-5  | New adapter class created | Registered with `MCPClientFactory`                       | `factory.get('new-tool')` returns correct instance without modifying factory internals |
| AC-11 | US-6  | Integration test runs     | Any MCP adapter test                                     | MSW intercepts all external HTTP; no live network calls made                           |

---

## 4. UX Notes

No direct user-facing UI — these are internal infrastructure services. Error states surface through the `GenerationOrchestrator`:

- Fetch error → SSE error event with "Could not fetch that URL" message.
- YouTube transcript unavailable → SSE error with "No captions available for that video".
- Image generation failure → guide proceeds without image (graceful degradation, no error shown to user).

---

## 5. Data Model

No new Prisma models. MCP calls are ephemeral.

---

## 6. API Contracts

### `IMCPClient` interface

```ts
// src/lib/mcp/types.ts
interface IMCPClient<TInput, TOutput> {
  readonly toolName: string
  execute(input: TInput): Promise<TOutput>
}
```

### `MCPClientFactory`

```ts
// src/lib/mcp/factory.ts
class MCPClientFactory {
  private static registry = new Map<string, IMCPClient<unknown, unknown>>()

  static register<T, R>(client: IMCPClient<T, R>): void
  static get<T, R>(toolName: string): IMCPClient<T, R>
}
```

(Factory + Registry pattern — adding a new tool = one `register()` call at the composition root.)

### Adapter signatures

```ts
// WebFetchAdapter
execute(input: { url: string; timeoutMs?: number }): Promise<{ text: string; title?: string }>

// TavilySearchAdapter
execute(input: { query: string; maxResults?: number }): Promise<Array<{ title: string; url: string; snippet: string }>>

// FalImageGenAdapter
execute(input: { prompt: string; width?: number; height?: number }): Promise<{ url: string; alt: string }>

// YouTubeTranscriptAdapter
execute(input: { videoId: string }): Promise<{ transcript: string; title?: string }>
```

### `RetryDecorator`

```ts
// src/lib/mcp/retry-decorator.ts
class RetryDecorator<T, R> implements IMCPClient<T, R> {
  constructor(
    private readonly client: IMCPClient<T, R>,
    private readonly maxRetries = 3,
    private readonly baseDelayMs = 300,
  ) {}
  async execute(input: T): Promise<R> {
    /* exponential backoff */
  }
}
```

---

## 7. Dependencies

- Spec 01 — Environment variables (`TAVILY_API_KEY`, `FAL_API_KEY`).

---

## 8. Out of Scope

- MCP server hosting / `@modelcontextprotocol/sdk` server-mode (only client mode used here).
- PDF parsing.
- Audio/video transcription beyond YouTube auto-captions.
- Caching of MCP results (future optimization).

---

## 9. Test Plan

| #    | Type        | Category | Description                                                     | Given / When / Then                                                      |
| ---- | ----------- | -------- | --------------------------------------------------------------- | ------------------------------------------------------------------------ |
| T-01 | Unit        | Positive | `WebFetchAdapter` returns stripped text                         | MSW 200 with HTML / execute / plain text returned                        |
| T-02 | Unit        | Negative | `WebFetchAdapter` throws on 404                                 | MSW 404 / execute / `MCPFetchError` thrown                               |
| T-03 | Unit        | Negative | `WebFetchAdapter` throws on timeout                             | MSW delays indefinitely / execute with 200ms timeout / `MCPTimeoutError` |
| T-04 | Unit        | Positive | `TavilySearchAdapter` parses response correctly                 | MSW mock Tavily response / execute / array of result objects             |
| T-05 | Unit        | Negative | `TavilySearchAdapter` throws on 5xx                             | MSW 500 / execute (1 retry) / `MCPServiceError` after retries            |
| T-06 | Unit        | Positive | `FalImageGenAdapter` returns image URL                          | MSW mock fal response / execute / `{url, alt}` returned                  |
| T-07 | Unit        | Negative | `FalImageGenAdapter` throws `MCPRateLimitError` on 429          | MSW 429 / execute / specific error type                                  |
| T-08 | Unit        | Positive | `YouTubeTranscriptAdapter` returns transcript                   | Mock `youtube-transcript` / execute / transcript string                  |
| T-09 | Unit        | Negative | `YouTubeTranscriptAdapter` throws on disabled captions          | Mock throws / execute / `MCPTranscriptUnavailableError`                  |
| T-10 | Unit        | Positive | `RetryDecorator` retries on transient errors                    | Mock fails 2× then succeeds / execute / success after retries            |
| T-11 | Unit        | Negative | `RetryDecorator` throws after max retries                       | Mock always fails / execute / throws after 3 retries                     |
| T-12 | Unit        | Positive | `MCPClientFactory.register` + `get` returns correct adapter     | Register mock adapter / get / same instance                              |
| T-13 | Unit        | Negative | `MCPClientFactory.get` throws for unknown tool                  | Unknown key / get / throws                                               |
| T-14 | Integration | Positive | Interface tests: all adapters satisfy `IMCPClient`              | Each adapter / `instanceof` check + execute signature / pass             |
| T-15 | Integration | Positive | `WebFetchAdapter` wrapped in `RetryDecorator` retries correctly | MSW drops first 2 requests / execute / succeeds on 3rd                   |
| T-16 | Integration | Edge     | 50k+ char webpage gets truncated cleanly                        | MSW returns 200k char HTML / execute / output ≤ 100k chars               |
| T-17 | Integration | Edge     | Non-English page text preserved                                 | MSW returns UTF-8 Japanese HTML / execute / Japanese text in result      |

---

## 10. Definition of Done

- [ ] All four adapters implemented behind `IMCPClient`.
- [ ] `MCPClientFactory` registered with all adapters at composition root (`src/lib/container.ts`).
- [ ] `RetryDecorator` wraps all adapters.
- [ ] All MCP errors use typed error classes extending `MCPError`.
- [ ] All T-01 through T-17 tests passing.
- [ ] MSW handlers added to `tests/mocks/` for all four external APIs.
- [ ] Coverage ≥ 90% on `src/lib/mcp/**`.
- [ ] `docs/architecture.md` updated with Factory, Adapter, Decorator entries.
- [ ] `pnpm build` and CI green.
- [ ] PR squash-merged to `main`.
