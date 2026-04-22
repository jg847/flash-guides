# Spec 06 — Study Guide Renderer

> **Status:** 📝 Spec ready — not yet implemented  
> **Sprint file:** [sprints.md](./sprints.md)

---

## 1. Feature Summary

The Study Guide Renderer displays the MDX content produced by the generation pipeline as a rich, interactive study-guide page. Each guide page features a hero section with optional media, an auto-generated table of contents, collapsible sections, inline images and embedded YouTube players, flashcard decks, inline quizzes, a highlight-to-note system, a reading progress bar, dark/light mode support, and a follow-up chat anchored to the guide's content. The page is accessible, responsive, and aesthetically polished.

---

## 2. User Stories

1. As a **user**, I want to read a generated guide as a well-structured page with a table of contents so that I can navigate large guides easily.
2. As a **user**, I want guide sections to be collapsible so that I can focus on what I need.
3. As a **user**, I want inline flashcard decks I can flip through so that I can test my memory as I read.
4. As a **user**, I want inline quizzes with immediate feedback so that I can check my understanding.
5. As a **user**, I want to highlight text and save it as a note so that I can capture key points.
6. As a **user**, I want a follow-up chat anchored to the guide so that I can ask deeper questions without starting over.
7. As a **user**, I want a reading progress bar so that I know how far through the guide I am.
8. As a **user**, I want the guide to respect my system dark/light mode preference and let me toggle it.
9. As a **user**, I want embedded YouTube videos inline where relevant so that I can watch supporting content without leaving the page.

---

## 3. Acceptance Criteria

| #     | Story | Given                                | When                                | Then                                                                         |
| ----- | ----- | ------------------------------------ | ----------------------------------- | ---------------------------------------------------------------------------- |
| AC-01 | US-1  | Guide with ≥2 sections               | Page loads                          | Auto-generated TOC renders with clickable links that scroll to each section  |
| AC-02 | US-2  | Any guide section                    | User clicks section header          | Section content collapses/expands with smooth animation                      |
| AC-03 | US-3  | Guide with flashcards                | Page loads                          | Flashcard deck visible; clicking a card flips it to show the answer          |
| AC-04 | US-3  | Flashcard deck                       | User clicks "Next"                  | Next flashcard shown; deck loops back after last card                        |
| AC-05 | US-4  | Guide with inline quiz               | Page loads                          | Quiz questions visible; selecting an answer shows correct/incorrect feedback |
| AC-06 | US-4  | User answers a quiz correctly        | First try                           | Green highlight + explanation shown                                          |
| AC-07 | US-5  | Registered user selects text         | Mouseup event fires                 | Tooltip "Save note" appears; clicking it saves note to DB                    |
| AC-08 | US-5  | Guest selects text                   | Mouseup event fires                 | Tooltip "Sign up to save notes" appears                                      |
| AC-09 | US-6  | Registered user                      | Types in follow-up chat and submits | Claude responds with context from the guide; response streams inline         |
| AC-10 | US-7  | User scrolls                         | Scroll progress changes             | Progress bar at top of page updates in real time                             |
| AC-11 | US-8  | Page loads                           | No user preference set              | Respects prefers-color-scheme; manual toggle persisted to localStorage       |
| AC-12 | US-9  | Guide section contains YouTube embed | Page renders                        | YouTube iframe displayed with proper aspect ratio                            |
| AC-13 | —     | Keyboard-only navigation             | Tab through flashcards / quiz       | All interactive elements reachable and operable via keyboard                 |
| AC-14 | —     | Screen reader                        | Guide content read                  | ARIA labels present on all interactive components; heading hierarchy correct |

---

## 4. UX Notes

### Page layout

```
┌─────────────────────────────────────┐
│  [← Back]  FlashGuides    [☀/☾] [Share]│
├──────────┬──────────────────────────┤
│          │  # Hero Title            │
│   TOC    │  [Hero image / video]    │
│          │                          │
│  § Intro │  ## Section 1            │
│  § Sec 1 │  [Collapsible ▾]         │
│  § Sec 2 │    Content...            │
│  § Quiz  │                          │
│  § Flash │  ## Flashcards           │
│          │  ┌───────────────────┐   │
│          │  │  Front of card    │   │
│          │  └───────────────────┘   │
│          │  [< Prev] [Flip] [Next>] │
│          │                          │
│          │  ## Quiz                 │
│          │  Q: What is ...?         │
│          │  ○ A  ● B  ○ C           │
│          │  [Check]                 │
├──────────┴──────────────────────────┤
│  Follow-up chat (sticky footer)     │
│  [Ask a follow-up question…] [Send] │
└─────────────────────────────────────┘
```

### Dark mode

Tailwind `dark:` classes; `class="dark"` toggled on `<html>` via JS; persisted to `localStorage`.

### Flashcard flip animation

CSS `transform: rotateY(180deg)` with `transition: 0.4s`.

### Highlight-to-note

On `mouseup`, check `window.getSelection()` for non-empty selection. Show floating bubble. On save: `POST /api/notes`.

### Reading progress

`IntersectionObserver` or scroll event listener updates a `<progress>` element width.

---

## 5. Data Model

Uses existing models:

- `Guide` — read for rendering.
- `Note` — created when user highlights and saves.

```prisma
// Already in schema:
model Note {
  id           String
  userId       String
  guideId      String
  selectedText String
  content      String   // user's annotation
  createdAt    DateTime
  updatedAt    DateTime
}
```

---

## 6. API Contracts

### `GET /guide/[slug]`

Server Component page. Fetches `Guide` by slug from DB. Returns 404 if not found. If `isPublic = false` and user is not the owner → 403 redirect to `/login`.

### `POST /api/notes`

Auth: required.

**Request body:**

```ts
z.object({
  guideId: z.string().cuid(),
  selectedText: z.string().min(1).max(2000),
  content: z.string().max(5000).optional().default(''),
})
```

**Response 201:** `{ id, guideId, selectedText, content, createdAt }`  
**Response 403:** Guide not owned by user.

### `POST /api/chat/[guideSlug]`

Auth: required.

**Request body:**

```ts
z.object({
  message: z.string().min(1).max(2000),
})
```

**Response:** `text/event-stream` — streamed Claude response with guide content as system context.

---

## 7. Dependencies

- Spec 04 — Guide generation produces the MDX content rendered here.
- Spec 02 — Auth for note saving and follow-up chat.

---

## 8. Out of Scope

- Collaborative annotation (multi-user notes on the same guide).
- Note export (covered in Spec 09).
- Audio text-to-speech reading.
- Guide editing by the user after generation.

---

## 9. Test Plan

| #    | Type        | Category      | Description                                                         | Given / When / Then                                                                          |
| ---- | ----------- | ------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| T-01 | Component   | Positive      | `GuideRenderer` renders TOC from MDX headings                       | MDX with 3 H2s / render / 3 TOC links                                                        |
| T-02 | Component   | Positive      | `CollapsibleSection` opens/closes on click                          | Mount closed / click header / content visible                                                |
| T-03 | Component   | Positive      | `FlashcardDeck` flips card on click                                 | Mount / click card / back face visible                                                       |
| T-04 | Component   | Positive      | `FlashcardDeck` navigates forward and wraps                         | Mount with 3 cards / click Next x3 / back to card 1                                          |
| T-05 | Component   | Positive      | `InlineQuiz` shows correct feedback on right answer                 | Mount / select correct answer + click check / green feedback                                 |
| T-06 | Component   | Negative      | `InlineQuiz` shows incorrect feedback on wrong answer               | Mount / select wrong answer / red feedback                                                   |
| T-07 | Component   | Positive      | Reading progress bar updates on scroll                              | Simulate scroll 50% / `ProgressBar.value` = ~50                                              |
| T-08 | Component   | Positive      | Dark mode toggle updates `<html>` class                             | Click toggle / `document.documentElement.classList` contains "dark"                          |
| T-09 | Component   | Positive      | Highlight-to-note tooltip shown on text selection                   | Simulate mouseup with selection / tooltip visible                                            |
| T-10 | Component   | Positive      | Guest sees signup tooltip on text selection                         | Mount unauthenticated / select text / "Sign up to save" message                              |
| T-11 | Component   | Accessibility | All interactive elements reachable via Tab                          | Render full guide / tabIndex / no focus traps                                                |
| T-12 | Integration | Positive      | `POST /api/notes` saves note to DB                                  | Authenticated user + valid body / request / 201 + row in DB                                  |
| T-13 | Integration | Negative      | `POST /api/notes` rejects note for another user's guide             | User A tries to note User B's private guide / request / 403                                  |
| T-14 | Integration | Positive      | Follow-up chat streams response with guide context                  | Mock Claude / message sent / SSE stream received                                             |
| T-15 | Integration | Negative      | Follow-up chat requires auth                                        | No session / request / 401                                                                   |
| T-16 | E2E         | Positive      | Full guide page renders all sections and TOC                        | Load /guide/slug / all headings visible in TOC                                               |
| T-17 | E2E         | Positive      | Flashcard interaction works                                         | Load guide / flip 3 cards / all flip correctly                                               |
| T-18 | E2E         | Positive      | Quiz answer flow                                                    | Load guide / answer quiz / feedback shown                                                    |
| T-19 | E2E         | Positive      | Highlight + save note                                               | Load guide / select text / click save / note saved                                           |
| T-20 | E2E         | Positive      | Dark mode persists across page reload                               | Toggle dark / reload / still dark                                                            |
| T-21 | Component   | Edge          | Guide with no flashcards renders without the flashcard deck section | Mount `GuideRenderer` with guide lacking flashcards / render / no flashcard component in DOM |
| T-22 | Component   | Edge          | RTL/non-English text content renders without layout overflow        | Mount guide with Arabic body text / render / text visible; no CSS overflow or clipping       |

---

## 10. Definition of Done

- [ ] Guide page renders all MDX-produced components correctly.
- [ ] TOC auto-generated and scroll-links working.
- [ ] Flashcard, quiz, collapsible section, and highlight-note all functional.
- [ ] Dark/light mode toggle with persistence.
- [ ] Follow-up chat streaming operational.
- [ ] Reading progress bar live.
- [ ] ARIA labels and keyboard nav verified.
- [ ] All T-01 through T-22 tests passing.
- [ ] Coverage ≥ 85% on `src/components/guide/**`.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` all pass locally and in CI.
- [ ] Manual smoke test of the full guide render flow in Docker Compose succeeds.
- [ ] No `TODO`, `FIXME`, or `@ts-ignore` in shipped code without a linked issue.
- [ ] `docs/architecture.md` updated if new patterns or modules were introduced.
- [ ] PR squash-merged to `main`.
