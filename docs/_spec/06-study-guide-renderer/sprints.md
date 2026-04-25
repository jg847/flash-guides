# Sprints — Spec 06: Study Guide Renderer

> **Status:** ✅ Complete — Sprints 06-A, 06-B, and 06-C implemented

---

## Sprint 06-A — MDX rendering + guide page shell

**Status:** ✅ Complete  
**Scope:** Guide page route, MDX rendering via `next-mdx-remote`, hero section, TOC generation, collapsible sections.

**Files touched:**

- `src/app/guide/[slug]/page.tsx` — Server Component
- `src/app/guide/[slug]/not-found.tsx`
- `src/components/guide/GuideRenderer.tsx` — MDX renderer with custom components
- `src/components/guide/GuideTOC.tsx` — auto-generated TOC
- `src/components/guide/GuideHero.tsx` — hero image/video
- `src/components/guide/CollapsibleSection.tsx`
- `src/components/guide/GuideLayout.tsx` — page layout split

**Implementation notes:**

- Use `next-mdx-remote/rsc` for React Server Component rendering.
- Extract headings from MDX for TOC using rehype plugin (`rehype-slug` + `rehype-autolink-headings`).
- `CollapsibleSection` is a Client Component (needs `useState`).
- Guide page is a Server Component by default; interactive parts are Client Component islands.
- 404 if `Guide` slug not found. 403 redirect if private and not owner.

**Tests added:**

- `tests/unit/components/guide/GuideRenderer.test.tsx`
- `tests/unit/components/guide/GuideTOC.test.tsx`
- `tests/unit/components/guide/CollapsibleSection.test.tsx`
- `tests/unit/components/guide/GuideHero.test.tsx`
- `tests/unit/pages/guide-page.test.tsx`

**Entry criteria:** Spec 04 Sprint 04-B complete (MDX content being generated).  
**Exit criteria:** A guide page at `/guide/[slug]` renders MDX content with working TOC and collapsible sections.

---

## Sprint 06-B — Flashcards, inline quizzes, reading progress

**Status:** ✅ Complete  
**Scope:** `FlashcardDeck` component, `InlineQuiz` component, `ReadingProgressBar`.

**Files touched:**

- `src/components/guide/FlashcardDeck.tsx`
- `src/components/guide/FlashcardCard.tsx`
- `src/components/guide/InlineQuiz.tsx`
- `src/components/guide/ReadingProgressBar.tsx`
- `src/lib/generation/builder.ts` — ensure flashcard/quiz MDX syntax is produced correctly

**Implementation notes:**

- MDX custom component: `<Flashcards>` maps to `FlashcardDeck`. Props: `cards: Array<{front, back}>`.
- `<Quiz>` MDX component maps to `InlineQuiz`. Props: `question, options: string[], correct: number, explanation: string`.
- Answers stored in Client Component state only (no persistence).
- `ReadingProgressBar` uses `useEffect` + scroll listener + `document.documentElement.scrollTop`.

**Tests added:**

- `tests/unit/components/guide/FlashcardDeck.test.tsx`
- `tests/unit/components/guide/InlineQuiz.test.tsx`
- `tests/unit/components/guide/ReadingProgressBar.test.tsx`
- `tests/unit/lib/generation/builder.test.ts`

**Entry criteria:** Sprint 06-A complete.  
**Exit criteria:** Flashcards flip, quiz gives feedback, progress bar updates on scroll.

---

## Sprint 06-C — Highlight-to-note, follow-up chat, dark mode, E2E

**Status:** ✅ Complete  
**Scope:** Highlight-to-note system, follow-up chat, dark/light mode toggle, full E2E tests.

**Files touched:**

- `src/components/guide/HighlightNote.tsx` — Client Component using `window.getSelection()`
- `src/app/api/notes/route.ts` — `POST /api/notes`
- `src/lib/db/repositories/notes.ts` — `NoteRepository`
- `src/components/guide/FollowUpChat.tsx` — streaming chat anchored to guide
- `src/app/api/chat/[guideSlug]/route.ts`
- `src/components/ThemeToggle.tsx`
- `tests/e2e/guide/guide-renderer.spec.ts`

**Implementation notes:**

- `HighlightNote`: listen to `mouseup` on the guide content area; read `window.getSelection()`. Show a floating tooltip using `position: fixed` near the selection end-rect.
- Follow-up chat: passes guide MDX content as system context to Claude. Use same streaming approach as generation (SSE).
- Dark mode: `useTheme` hook from a custom `ThemeProvider`. Persist to `localStorage('theme')`. Sync with `prefers-color-scheme` on first load.

**Tests added:**

- `tests/unit/components/guide/HighlightNote.test.tsx`
- `tests/integration/api/notes/notes.test.ts`
- `tests/integration/api/chat/follow-up-chat.test.ts`
- `tests/e2e/guide/guide-renderer.spec.ts`

**Entry criteria:** Sprint 06-B complete.  
**Exit criteria:** All T-01 through T-22 pass; Definition of Done checklist satisfied.
