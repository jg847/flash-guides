# Spec 04 — Chat Homepage & Generation Orchestrator

> **Status:** 📝 Spec ready — not yet implemented  
> **Sprint file:** [sprints.md](./sprints.md)

---

## 1. Feature Summary

The Chat Homepage is the primary entry point of FlashGuides. It presents a chat-style prompt interface supporting three input modes: free-text topic, pasted text, and URL/YouTube link. Users select a study mode (Overview, Deep-dive, Exam-prep, ELI5), submit their prompt, and receive a streaming response that culminates in a fully-rendered interactive study guide. The `GenerationOrchestrator` coordinates the entire pipeline: auth/quota checks → MCP tool calls → Claude streaming → MDX assembly → DB persistence. The UI shows a live streaming progress indicator while generation is in flight.

---

## 2. User Stories

1. As a **user** (guest or registered), I want to type a topic into a chat box and receive a study guide so that I can learn about anything on demand.
2. As a **user**, I want to paste a large block of text and have it turned into a structured study guide so that I can digest dense material quickly.
3. As a **user**, I want to submit a URL or YouTube link and receive a study guide based on that content so that I don't have to manually extract and paste text.
4. As a **user**, I want to choose a study mode (Overview / Deep-dive / Exam-prep / ELI5) before generating so that the output matches my learning goal.
5. As a **user**, I want to see a live streaming progress indicator while my guide is being generated so that I know the app is working.
6. As a **registered user**, I want my completed guide automatically saved to my account so that I can find it later in my dashboard.
7. As a **developer**, I want the generation pipeline composed of clean, testable, swappable components so that study modes can be added without modifying existing code.

---

## 3. Acceptance Criteria

| #     | Story | Given                                | When                                     | Then                                                                                              |
| ----- | ----- | ------------------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------- |
| AC-01 | US-1  | Any user on homepage                 | Types a topic and submits                | Streaming starts within 3s; guide page rendered on completion                                     |
| AC-02 | US-2  | Any user                             | Pastes ≤50,000 chars of text and submits | Guide generated from the pasted content                                                           |
| AC-03 | US-2  | Any user                             | Pastes text > 50,000 chars               | 422 with "Text too long (max 50,000 characters)"                                                  |
| AC-04 | US-3  | Any user                             | Submits a valid HTTPS URL                | Web Fetch MCP fetches page; guide generated                                                       |
| AC-05 | US-3  | Any user                             | Submits a YouTube URL                    | YouTube transcript fetched; guide generated                                                       |
| AC-06 | US-3  | Any user                             | Submits a malformed or unreachable URL   | 422 with clear error message; no generation                                                       |
| AC-07 | US-3  | Any user                             | Submits a paywalled or bot-blocked URL   | Graceful degradation: error message + suggestion to paste text                                    |
| AC-08 | US-4  | User opens homepage                  | Study mode selector rendered             | Four modes visible; Overview selected by default                                                  |
| AC-09 | US-5  | Generation in progress               | User watches the UI                      | Streaming token chunks rendered live; progress steps shown (Fetching → Planning → Writing → Done) |
| AC-10 | US-6  | Registered user completes generation | Guide fully streamed                     | Guide saved to DB with correct `userId`, `studyMode`, `inputType`, `slug`                         |
| AC-11 | US-6  | Registered user                      | Guide saved                              | Redirect to `/guide/<slug>` after completion                                                      |
| AC-12 | US-1  | Guest                                | Guide generated                          | Guide rendered at temporary URL (not persisted); watermarked                                      |
| AC-13 | US-7  | Claude API is down                   | User submits prompt                      | 503 with "AI service unavailable, please try again" — no crash                                    |
| AC-14 | —     | Stream dropped mid-generation        | Connection interrupted                   | UI shows "Generation interrupted" with retry button                                               |

---

## 4. UX Notes

### Homepage layout (`/`)

```
┌─────────────────────────────────────┐
│  FlashGuides                [Log in]│
├─────────────────────────────────────┤
│  Hero: "Turn anything into a study  │
│  guide in seconds."                 │
├─────────────────────────────────────┤
│  [○ Topic] [○ Paste text] [○ URL]   │  ← Input mode tabs
│  ┌───────────────────────────────┐  │
│  │  Ask about anything…          │  │  ← Textarea
│  └───────────────────────────────┘  │
│  Study mode: [Overview▾]            │
│                      [Generate →]   │
├─────────────────────────────────────┤
│  Featured guides (gallery teaser)   │
└─────────────────────────────────────┘
```

### Streaming progress steps

When generation starts, the textarea collapses and a step indicator replaces it:

1. ⏳ Fetching source (URL/YouTube mode only)
2. ⏳ Planning sections
3. ⏳ Writing guide
4. ✅ Done! — auto-redirects

Live token stream rendered in a preview pane below the steps.

### Error states

- API error → inline alert with retry button.
- Quota exceeded → `QuotaExhaustedModal` (from Spec 03).
- URL fetch failure → inline error with suggestion to paste text instead.

### Empty/initial state

Clean prompt box with placeholder; no guide results visible.

---

## 5. Data Model

Uses existing `Guide` model. Generation flow writes:

- `Guide.inputType` (TOPIC / TEXT / URL)
- `Guide.studyMode`
- `Guide.inputValue` (original prompt)
- `Guide.content` (MDX string)
- `Guide.slug` (generated from title, cuid suffix)
- `Guide.isWatermark` (true for guest)
- `Guide.userId` (null for guest)

No new models required.

---

## 6. API Contracts

### `POST /api/generate`

Auth: optional (session checked internally; guest quota enforced).

**Request body (Zod):**

```ts
z.object({
  inputType: z.enum(['TOPIC', 'TEXT', 'URL']),
  inputValue: z.string().min(1).max(50000),
  studyMode: z.enum(['OVERVIEW', 'DEEP_DIVE', 'EXAM_PREP', 'ELI5']),
})
```

**Response:** `text/event-stream` (Vercel AI SDK `StreamingTextResponse`)

Each SSE event is one of:

- `data: {"type":"step","step":"planning"}` — progress update
- `data: {"type":"token","text":"..."}` — token chunk
- `data: {"type":"done","guideSlug":"abc123"}` — generation complete
- `data: {"type":"error","message":"..."}` — generation failed

**Response 422:** Zod validation error.  
**Response 429:** Guest quota exceeded.  
**Response 503:** Claude API unavailable.

---

### `GenerationOrchestrator` (internal)

`src/lib/generation/orchestrator.ts`

Pipeline steps (Facade pattern):

1. `authCheck` — resolve session; identify guest vs. registered.
2. `quotaCheck` — `enforceGuestQuota` for guests.
3. `inputNormalize` — for URL: call Web Fetch MCP; for YouTube: call Transcript MCP.
4. `buildStrategy` — `StudyModeStrategyFactory.create(studyMode)`.
5. `planSections` — strategy's `planSections(input)`.
6. `enrichWithMedia` — strategy's `enrichWithMedia(sections)` → image gen + web search.
7. `buildQuizzes` — strategy's `buildQuizzes(sections)`.
8. `assembleMDX` — `GuideBuilder.build(...)`.
9. `persist` — save to DB (registered only); set `isWatermark` for guests.
10. `emit done` — send `{type:"done", guideSlug}` over stream.

Each step emits a progress SSE event before executing.

---

## 7. Dependencies

- Spec 01 — Infrastructure.
- Spec 02 — Auth (session resolution).
- Spec 03 — Guest quota enforcement.
- Spec 05 — MCP adapters (Web Fetch, YouTube Transcript required for Sprint 04-C).

---

## 8. Out of Scope

- Multi-turn conversational memory across guides.
- Collaborative / shared edit sessions.
- Scheduled/background generation jobs.
- PDF input (file upload).

---

## 9. Test Plan

| #    | Type        | Category | Description                                                         | Given / When / Then                                                 |
| ---- | ----------- | -------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| T-01 | Unit        | Positive | `GenerationOrchestrator` calls steps in correct order               | Mock all deps / `orchestrate()` / steps called in sequence          |
| T-02 | Unit        | Positive | `OverviewStrategy.planSections` returns correct section schema      | Mock Claude / call / returns structured sections                    |
| T-03 | Unit        | Positive | `DeepDiveStrategy.planSections` returns more sections than Overview | Mock Claude / call / section count > Overview                       |
| T-04 | Unit        | Positive | `ExamPrepStrategy.buildQuizzes` returns quiz items                  | Mock Claude / call / array of quiz objects returned                 |
| T-05 | Unit        | Positive | `ELI5Strategy` simplifies language in prompt                        | Mock Claude / call / prompt contains "explain like I'm 5"           |
| T-06 | Unit        | Positive | `GuideBuilder.build` assembles valid MDX string                     | Valid sections input / build / MDX parses without error             |
| T-07 | Unit        | Negative | Input validation rejects text > 50,000 chars                        | 50001-char string / Zod parse / ZodError                            |
| T-08 | Unit        | Negative | Input validation rejects empty inputValue                           | Empty string / Zod parse / ZodError                                 |
| T-09 | Unit        | Edge     | Slug generation produces unique URL-safe slugs                      | Same title x2 / `generateSlug()` / different cuid suffixes          |
| T-10 | Integration | Positive | `POST /api/generate` streams tokens for topic input                 | MSW mocks Claude / valid TOPIC request / SSE stream received        |
| T-11 | Integration | Positive | Registered user guide saved to DB after stream                      | Authenticated session + mock Claude / complete / guide row in DB    |
| T-12 | Integration | Negative | Guest guide NOT saved to DB                                         | No session + mock Claude / complete / no DB row; `isWatermark=true` |
| T-13 | Integration | Negative | `POST /api/generate` returns 429 at quota                           | IP at count=3 / request / 429                                       |
| T-14 | Integration | Negative | `POST /api/generate` returns 503 on Claude failure                  | MSW returns 500 for Claude / request / 503                          |
| T-15 | Integration | Edge     | Stream interrupted mid-way                                          | MSW drops connection / request / SSE `{type:"error"}` emitted       |
| T-16 | E2E         | Positive | Full topic → guide flow for registered user                         | Login + submit topic / complete / redirected to /guide/slug         |
| T-17 | E2E         | Positive | URL input mode fetches and generates guide                          | Login + submit URL / guide rendered / content matches URL           |
| T-18 | E2E         | Positive | Study mode selector changes visible in output                       | Login + select "Exam-prep" / generate / guide has quiz sections     |
| T-19 | E2E         | Edge     | Very large pasted text (50k chars)                                  | Login + paste 50k chars / generate / completes successfully         |
| T-20 | Component   | Positive | PromptBox renders all three input mode tabs                         | Mount / render / three tab buttons visible                          |
| T-21 | Component   | Positive | StreamingProgress shows correct step sequence                       | Mount with `step="writing"` / render / steps 1+2 complete, 3 active |

---

## 10. Definition of Done

- [ ] Homepage renders with all three input modes functional.
- [ ] Study mode selector wired to generation API.
- [ ] Streaming SSE response visible in UI with progress steps.
- [ ] Registered users' guides persisted to DB and redirected to `/guide/<slug>`.
- [ ] Guest guides rendered with watermark (not persisted).
- [ ] Claude API failure returns 503 gracefully.
- [ ] URL + YouTube inputs work end-to-end (requires Spec 05 Sprint 05-A).
- [ ] All T-01 through T-21 tests passing.
- [ ] Coverage ≥ 90% on `src/lib/generation/**`.
- [ ] `pnpm build` and CI green.
- [ ] `docs/architecture.md` updated with Strategy, Facade, Builder, Template Method entries.
- [ ] PR squash-merged to `main`.
