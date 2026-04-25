# FlashGuides — Architecture

> **Revision:** Phase 1 baseline (prior to any feature implementation)  
> **Update policy:** Update this document whenever new patterns or modules are introduced (Definition of Done item 8).

---

## 1. Composition Root

All concrete dependencies are wired in one place and one place only:

```
src/lib/container.ts
```

Nothing in `src/app/`, `src/server/`, or business logic (`src/lib/ai/`, `src/lib/mcp/`, etc.) calls `new ConcreteClass()` directly. They import from `container.ts` or receive dependencies via function parameters (for testability).

The container is a simple module-scope singleton map:

```ts
// src/lib/container.ts (sketch)
import { PrismaClient } from '@/generated/prisma'
import { GuideRepository } from '@/lib/db/repositories/guides'
import { UserRepository } from '@/lib/db/repositories/users'
import { ClaudeClient } from '@/lib/ai/claude-client'
import { MCPClientFactory } from '@/lib/mcp/factory'
import { GenerationOrchestrator } from '@/lib/generation/orchestrator'

const prisma = new PrismaClient()
const guideRepo = new GuideRepository(prisma)
const userRepo = new UserRepository(prisma)
const claude = new ClaudeClient(process.env['ANTHROPIC_API_KEY']!)
const mcpFactory = new MCPClientFactory()
export const orchestrator = new GenerationOrchestrator(claude, mcpFactory, guideRepo)
export { guideRepo, userRepo, prisma }
```

Tests replace these with in-memory fakes or MSW-mocked network without touching any business logic.

---

## 2. Folder → Concern Mapping

| Folder                     | Concern                            | SOLID principle enforced                                                      |
| -------------------------- | ---------------------------------- | ----------------------------------------------------------------------------- |
| `src/lib/ai/`              | Claude client + streaming          | **SRP**: one file, one external vendor                                        |
| `src/lib/mcp/`             | MCP client factory + adapters      | **OCP + LSP**: new tool = new file, no changes to factory logic               |
| `src/lib/auth/`            | Auth.js configuration              | **SRP**: auth config isolated from session helpers                            |
| `src/lib/db/`              | Prisma client + repositories       | **ISP**: `IGuideReader` ≠ `IGuideWriter`; **DIP**: repos depend on interfaces |
| `src/lib/study-modes/`     | Strategy implementations           | **OCP**: new mode = new strategy, no changes to orchestrator                  |
| `src/lib/generation/`      | Guide builder + orchestrator       | **SRP + DIP**: wires strategies and repos together                            |
| `src/lib/security/`        | Headers, CSRF, sanitize            | **SRP**: isolated from route handlers                                         |
| `src/lib/rate-limit/`      | Rate-limit logic                   | **SRP**: keeps quota rules out of route handlers                              |
| `src/lib/guides/`          | Guide content parsing              | **SRP**: markdown/MDX parsing kept out of route files and UI components       |
| `src/lib/db/repositories/` | Persistence helpers for aggregates | **SRP**: route handlers stay thin while repositories own write operations     |
| `src/lib/logger/`          | Pino wrapper                       | **DIP**: callers depend on `ILogger` interface                                |
| `src/lib/errors/`          | Error handler + Sentry hook        | **DIP**: error sinks behind interface                                         |
| `src/lib/export/`          | Markdown / HTML / PDF builders     | **SRP**: one file per format                                                  |
| `src/lib/sharing/`         | Share link + fork logic            | **SRP**                                                                       |
| `src/lib/cli/`             | CLI helpers (for export-source.ts) | **SRP**                                                                       |
| `src/lib/container.ts`     | **Composition root**               | **DIP**: sole place where `new` is called on concrete classes                 |
| `src/server/`              | Route handlers, middleware         | **SRP**: thin handlers only; business logic in `src/lib/`                     |
| `src/components/`          | React UI components                | **ISP**: props interfaces are narrow                                          |

The study-guide renderer follows the same split: route/data access in `src/app/guide/[slug]/page.tsx`, markdown parsing in `src/lib/guides/content.ts`, client-side interactivity in `src/components/guide/`, and note persistence behind `src/lib/db/repositories/notes.ts`.

---

## 3. SOLID Principles in Practice

### Single Responsibility

Every module has exactly one reason to change. Examples:

- `ClaudeClient` changes only when the Anthropic SDK API changes.
- `GuideRepository` changes only when the Guide data model changes.
- `RateLimitMiddleware` changes only when quota rules change.

Violations to avoid: God objects, "utils.ts" files that grow without bound, route handlers that contain business logic.

### Open / Closed

The system is open to extension, closed to modification.

- **Study modes:** To add a `FlashcardsOnly` mode, add `src/lib/study-modes/flashcards-only.strategy.ts` implementing `IStudyModeStrategy` and register it in the factory map. Zero changes to `GenerationOrchestrator`.
- **MCP tools:** To add a new tool, add `src/lib/mcp/adapters/new-tool.adapter.ts` implementing `IMCPClient` and register a key in `MCPClientFactory`. Zero changes to callers.

### Liskov Substitution

Every `IMCPClient` implementation must satisfy: given any valid call to `execute(tool, params)`, the adapter returns the same shape regardless of which external service backs it. This is verified by a shared contract test suite run against every adapter.

### Interface Segregation

Repositories are split:

```ts
interface IGuideReader {
  findById
  findBySlug
  findByUser
  search
}
interface IGuideWriter {
  create
  update
  delete
  archive
}
interface IGuideRepository extends IGuideReader, IGuideWriter {}
```

Code that only reads guides depends only on `IGuideReader`, so it cannot accidentally call write operations.

### Dependency Inversion

High-level modules (`GenerationOrchestrator`, route handlers) depend on:

- `IGuideRepository` — not `GuideRepository`
- `IClaudeClient` — not `ClaudeClient`
- `IMCPClient` — not any concrete adapter

Concrete implementations are bound at `container.ts` and injected via constructor parameters.

---

## 4. Gang of Four Patterns

### Strategy — Study Modes

**Location:** `src/lib/study-modes/`  
**Why:** Each study mode (Overview, Deep-Dive, Exam-Prep, ELI5) changes the system prompt shape, section count, and media richness without touching the generation pipeline.

```
IStudyModeStrategy
├── OverviewStrategy
├── DeepDiveStrategy
├── ExamPrepStrategy
└── ELI5Strategy
```

`GenerationOrchestrator` holds a reference to `IStudyModeStrategy` and calls `strategy.buildSystemPrompt(topic)`.

---

### Factory — MCP Client Factory

**Location:** `src/lib/mcp/factory.ts`  
**Why:** The orchestrator requests a tool by name (`'web-search'`, `'image-gen'`, etc.) without knowing which SDK backs it.

```
MCPClientFactory.getClient(toolName: string): IMCPClient
```

Registry (internal map):

```
'web-fetch'        → WebFetchAdapter
'web-search'       → TavilyAdapter
'image-gen'        → FalAIAdapter
'youtube'          → YouTubeTranscriptAdapter
```

---

### Adapter — External SDK Wrappers

**Location:** `src/lib/mcp/adapters/`  
**Why:** External SDKs (`@tavily/core`, `@fal-ai/client`, `youtube-transcript`) have incompatible APIs. Adapters normalize them behind `IMCPClient`.

Each adapter:

1. Implements `execute(params): Promise<MCPResult>`
2. Throws `MCPToolError` on failure (not SDK-specific error shapes)
3. Is independently mockable and testable

```
IMCPClient
├── WebFetchAdapter         (uses global fetch)
├── TavilyAdapter           (@tavily/core)
├── FalAIAdapter            (@fal-ai/client)
└── YouTubeTranscriptAdapter (youtube-transcript)
```

The same pattern applies to the Auth.js Google provider, Nodemailer SMTP, and MinIO S3 client.

---

### Repository — Data Access

**Location:** `src/lib/db/repositories/`  
**Why:** Keeps Prisma calls out of business logic and route handlers; makes it trivial to test with an in-memory fake.

```
GuideRepository     implements IGuideRepository
UserRepository      implements IUserRepository
ShareLinkRepository implements IShareLinkRepository
RateLimitRepository implements IRateLimitRepository
```

---

### Template Method — Guide Generator

**Location:** `src/lib/generation/base-guide-generator.ts`  
**Why:** All study modes follow the same generation pipeline; only specific steps differ.

```
BaseGuideGenerator (abstract)
  └── generateGuide(input): Promise<Guide>
        ├── planSections(input)    ← abstract
        ├── enrichWithMedia()      ← abstract
        ├── buildQuizzes()         ← abstract
        └── buildFlashcards()      ← abstract
```

Each strategy implementation extends `BaseGuideGenerator` and overrides the abstract hooks.

---

### Builder — Guide Output Assembly

**Location:** `src/lib/generation/guide-builder.ts`  
**Why:** The final guide document is assembled from many optional parts (hero, TOC, sections, quizzes, flashcards). Builder lets the orchestrator compose these incrementally without nested constructors.

```ts
new GuideBuilder()
  .setHero(hero)
  .addSection(section)
  .addQuiz(quiz)
  .addFlashcard(card)
  .build(): StructuredGuide
```

---

### Facade — Generation Orchestrator

**Location:** `src/lib/generation/orchestrator.ts`  
**Why:** Route handlers must not know about quota checks, MCP orchestration, Claude streaming, or DB persistence. The Facade hides all of that behind a single call.

```ts
orchestrator.generate(userId | null, input: GenerationInput): AsyncIterable<StreamChunk>
```

Internally: `authCheck → quotaCheck → studyModeSelection → mcpSetup → stream → guideBuilder → persist → return`.

---

### Command — CLI Source Export

**Location:** `scripts/export-source.ts` with helpers in `src/lib/cli/`  
**Why:** The source-export tool packages a filesystem operation behind a single command-style entrypoint with parsed options and one `main()` execution path.

```ts
main(argv)
  -> parseCliOptions(argv)
  -> buildExportDocument(options)
  -> writeOutput(output, options)
```

The command object boundary keeps CLI concerns out of library code:

- `src/lib/cli/collect-files.ts` handles discovery and filtering.
- `src/lib/cli/always-exclude.ts` owns filename and content-based secret exclusion.
- `src/lib/cli/format-section.ts` owns presentation formatting.
- `src/lib/cli/estimate-tokens.ts` owns prompt-size estimation.

This keeps the command invoker thin while the reusable operations remain isolated and independently testable.

---

### Observer / Pub-Sub — Token Streaming

**Location:** `src/lib/generation/stream-emitter.ts`  
**Why:** Claude's token stream fans out to: (a) the HTTP response via `ReadableStream`, (b) a telemetry subscriber that logs tokens-per-second, (c) an abort listener for early disconnect.

```
StreamEmitter (EventEmitter)
├── HttpResponseSubscriber    → writes to SSE/ReadableStream
├── TelemetrySubscriber       → logs generation metrics
└── AbortSubscriber           → stops generation on client disconnect
```

---

### Chain of Responsibility — Middleware

**Location:** `src/middleware.ts` + `src/server/middleware/`  
**Why:** Each request passes through: `requestId → securityHeaders → rateLimitCheck → authSession → validation → handler`. Each link in the chain can short-circuit or pass control forward.

```
requestIdMiddleware
  → securityHeadersMiddleware
    → rateLimitMiddleware (guest routes)
      → authMiddleware (protected routes)
        → validationMiddleware
          → routeHandler
```

---

### Command — CLI Export Tool

**Location:** `scripts/export-source.ts` + `src/lib/cli/`  
**Why:** The export operation is encapsulated as a discrete command with `execute()` semantics, making it testable in isolation regardless of how it is invoked (CLI, future API endpoint, etc.).

```ts
class ExportSourceCommand {
  constructor(private opts: ExportOptions) {}
  async execute(): Promise<void>
}
```

---

### Decorator — MCP Client Wrapping

**Location:** `src/lib/mcp/decorators/`  
**Why:** Retry logic, timing instrumentation, and request logging should not bloat the adapters. Decorators wrap an `IMCPClient` and add cross-cutting behavior.

```
RetryDecorator     implements IMCPClient (wraps any IMCPClient, retries on 5xx)
LoggingDecorator   implements IMCPClient (logs request + response + duration)
```

Composed at `MCPClientFactory`: `new LoggingDecorator(new RetryDecorator(new TavilyAdapter()))`.

---

## 5. Dependency Injection Flow (full example)

```
container.ts
│
├── new PrismaClient()                              ← concrete
├── new GuideRepository(prisma)                    ← concrete, given IGuideRepository type
├── new ClaudeClient(apiKey)                       ← concrete, given IClaudeClient type
├── new MCPClientFactory()                         ← concrete, returns IMCPClient
│     └── new LoggingDecorator(
│           new RetryDecorator(
│             new TavilyAdapter(tavilyApiKey)))
│
└── new GenerationOrchestrator(
      claude: IClaudeClient,
      mcpFactory: IMCPClientFactory,
      guideRepo: IGuideRepository,
      studyModeFactory: IStudyModeFactory,
      rateLimitRepo: IRateLimitRepository)
```

Route handler at `src/app/api/generate/route.ts` only imports `orchestrator` from `container.ts` and calls `orchestrator.generate(...)`.

---

## 6. Data Flow — Guide Generation (end-to-end)

```
Browser
  ↓ POST /api/generate { input, studyMode }
src/app/api/generate/route.ts
  ↓ validates body with Zod
  ↓ calls orchestrator.generate(userId, input)
GenerationOrchestrator
  ↓ quota check via RateLimitRepository
  ↓ resolves IStudyModeStrategy from factory
  ↓ creates GuideBuilder
  ↓ calls BaseGuideGenerator.generateGuide()
      ↓ planSections() → Claude API call (structured output)
      ↓ enrichWithMedia() → MCPClientFactory → adapters (Tavily, fal.ai, YouTube)
      ↓ buildQuizzes() → Claude API call
      ↓ buildFlashcards() → Claude API call
  ↓ assembles output via GuideBuilder.build()
  ↓ persists Guide via GuideRepository
  ↓ emits tokens to StreamEmitter
StreamEmitter
  ↓ HttpResponseSubscriber → ReadableStream → SSE to browser
  ↓ TelemetrySubscriber → pino log entry
```

---

## 7. Testing Architecture

```
tests/
├── unit/          # pure functions, strategies, builders, repositories (in-memory DB)
├── integration/   # API routes + real SQLite test DB + MSW for network
└── e2e/           # full browser flows (Playwright) against built Next.js app
```

Interfaces make every layer swappable:

- `container.ts` is NOT imported in tests — callers receive fakes via constructor injection.
- MSW intercepts all external HTTP in unit/integration layers.
- Playwright tests run against a real Docker image (or `pnpm build && pnpm start`).

---

## 8. Change Log

| Date    | Version | Change                                                      |
| ------- | ------- | ----------------------------------------------------------- |
| Phase 1 | 1.0.0   | Initial architecture document — pre-implementation baseline |
