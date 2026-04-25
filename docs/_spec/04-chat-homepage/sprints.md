# Sprints — Spec 04: Chat Homepage & Generation Orchestrator

> **Status:** 🚧 In progress — Sprint 04-A and Sprint 04-B complete; Sprint 04-C ready to start

---

## Sprint 04-A — Generation Orchestrator + Study Mode strategies

**Status:** ✅ Complete  
**Scope:** Core generation pipeline: `GenerationOrchestrator`, all four study-mode strategies, `GuideBuilder`, `BaseGuideGenerator` template.

**Files touched:**

- `src/lib/generation/orchestrator.ts` — Facade
- `src/lib/generation/base-generator.ts` — Template Method (abstract `planSections`, `enrichWithMedia`, `buildQuizzes`)
- `src/lib/generation/builder.ts` — `GuideBuilder` (Builder pattern)
- `src/lib/generation/slug.ts` — `generateSlug(title: string): string`
- `src/lib/study-modes/overview.ts`
- `src/lib/study-modes/deep-dive.ts`
- `src/lib/study-modes/exam-prep.ts`
- `src/lib/study-modes/eli5.ts`
- `src/lib/study-modes/factory.ts` — `StudyModeStrategyFactory`
- `src/lib/study-modes/types.ts` — `IStudyModeStrategy` interface
- `src/lib/ai/claude.ts` — `ClaudeClient` wrapping `@anthropic-ai/sdk` + Vercel AI SDK

**Implementation notes:**

- `BaseGuideGenerator` extends to each strategy. `planSections`, `enrichWithMedia`, `buildQuizzes` are `abstract`.
- `GuideBuilder` uses a fluent interface: `.setHero(...).addSection(...).addQuiz(...).build() → string (MDX)`.
- `ClaudeClient` is an Adapter over Anthropic SDK; exposes `streamText(prompt)` → `ReadableStream`.
- All LLM calls use `ai` SDK's `streamText`; model = `claude-sonnet-4-5`.
- System prompts live in `src/lib/ai/prompts/` as `.ts` files (not template strings in logic files).

**Tests added:**

- `tests/unit/lib/generation/orchestrator.test.ts`
- `tests/unit/lib/generation/builder.test.ts`
- `tests/unit/lib/generation/slug.test.ts`
- `tests/unit/lib/study-modes/overview.test.ts`
- `tests/unit/lib/study-modes/exam-prep.test.ts`
- `tests/unit/lib/study-modes/eli5.test.ts`
- `tests/unit/lib/ai/claude.test.ts`

**Entry criteria:** Spec 03 complete.  
**Exit criteria:** `StudyModeStrategyFactory.create('OVERVIEW')` returns correct strategy; `GuideBuilder.build()` returns valid MDX string; all unit tests pass.

---

## Sprint 04-B — Generation API route + streaming UI

**Status:** ✅ Complete  
**Scope:** `POST /api/generate` SSE endpoint, homepage UI with prompt box and streaming progress.

**Files touched:**

- `src/app/api/generate/route.ts`
- `src/app/page.tsx` — homepage (Server Component shell)
- `src/components/chat/PromptBox.tsx` — input tabs + study mode selector
- `src/components/chat/StreamingProgress.tsx` — step indicator + token preview
- `src/components/chat/StudyModeSelector.tsx`
- `src/types/generation.ts` — shared SSE event types

**Implementation notes:**

- Use Vercel AI SDK `StreamingTextResponse` + custom SSE envelope for progress events.
- Client uses `EventSource` or `fetch` with `getReader()` to consume the stream.
- Generation state machine: `idle` → `fetching` → `planning` → `writing` → `done` | `error`.
- On `{type:"done", guideSlug}` event, client calls `router.push('/guide/' + guideSlug)`.

**Tests added:**

- `tests/integration/api/generate/generate.test.ts`
- `tests/unit/components/chat/PromptBox.test.tsx`
- `tests/unit/components/chat/StreamingProgress.test.tsx`

**Entry criteria:** Sprint 04-A complete.  
**Exit criteria:** TOPIC input mode works end-to-end; stream renders in UI; registered user guide saved + redirect.

---

## Sprint 04-C — URL & YouTube input modes

**Status:** 🔜 Not started  
**Scope:** Wire URL input to Web Fetch MCP; YouTube URL detection to Transcript MCP.

**Files touched:**

- `src/lib/generation/orchestrator.ts` — `inputNormalize` step
- `src/lib/generation/input-normalizer.ts` — `normalizeInput(input): Promise<NormalizedInput>`
- `src/lib/generation/url-detector.ts` — `isYouTubeUrl(url): boolean`

**Implementation notes:**

- YouTube URL patterns: `youtube.com/watch?v=`, `youtu.be/`, `youtube.com/shorts/`.
- URL inputs: call `WebFetchMCPAdapter.fetch(url)` → extract text.
- YouTube inputs: call `YouTubeTranscriptMCPAdapter.getTranscript(videoId)` → transcript string.
- Malformed URLs: validate with `z.string().url()` before attempting fetch.
- If fetch errors (network, 4xx/5xx, blocked): emit SSE error event, do not fall through to generation.

**Tests added:**

- `tests/unit/lib/generation/input-normalizer.test.ts`
- `tests/unit/lib/generation/url-detector.test.ts`
- `tests/e2e/generation/topic-flow.spec.ts`
- `tests/e2e/generation/url-flow.spec.ts`

**Entry criteria:** Sprint 04-B complete.  
**Exit criteria:** All three input modes work E2E; all T-01 through T-26 pass; Definition of Done checklist satisfied.
