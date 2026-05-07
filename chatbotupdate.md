# FlashGuides — Follow-Up Chat Upgrade

You are working in the FlashGuides repository. The follow-up chat (the bot anchored to each study guide page) needs three rounds of upgrades. Implement them in the order below as **three separate commits / PRs**, each independently shippable. Run the relevant tests after each phase before moving on.

The main files you'll be touching:

- `src/components/guide/FollowUpChat.tsx` — the chat panel UI
- `src/app/api/chat/[guideSlug]/route.ts` — the SSE chat endpoint
- `src/lib/ai/claude.ts` — the `ClaudeClient` adapter (currently exposes `streamGenerate`, `generate`, `extractTextFromPdf`)
- `src/lib/db/repositories/guides.ts` — `guideRepository` and `UpdateGuideInput`
- `src/app/api/guides/[id]/route.ts` — guide PATCH route
- `tests/unit/components/guide/FollowUpChat.test.tsx`
- `tests/integration/api/chat/follow-up-chat.test.ts`

Read each of these before writing any code so you understand the current shapes, error-handling conventions (`createApiErrorResponse`, `handleApiError`), and the existing SSE event format (`{ type: 'token' | 'done' | 'error', ... }`). Match those conventions.

---

## Phase 1 — Memory, reset, and prettier rendering

**Goal:** the bot remembers prior turns, the user can reset the conversation, and assistant messages render as proper Markdown.

### Backend

1. In `src/app/api/chat/[guideSlug]/route.ts`, change `followUpChatSchema` from `{ message: string }` to:

   ```ts
   const followUpChatSchema = z.object({
     messages: z
       .array(
         z.object({
           role: z.enum(['user', 'assistant']),
           content: z.string().min(1).max(8000),
         }),
       )
       .min(1)
       .max(40),
   })
   ```

   Reject if the last message isn't `role: 'user'`. Strip any empty assistant placeholders before forwarding.

2. In `src/lib/ai/claude.ts`, add a new method to `ClaudeClient`:

   ```ts
   async streamChat(
     messages: Array<{ role: 'user' | 'assistant'; content: string }>,
     systemSuffix?: string,
     maxOutputTokens = 4096,
   ): Promise<ReadableStream<string>>
   ```

   Implement it with the Vercel AI SDK's `streamText` using the `messages` parameter (not `prompt`). Honor the `isPlaywrightTestEnabled()` stub the way `streamGenerate` does. Keep `streamGenerate` intact — guide generation still uses it.

3. Update the chat route to call `claudeClient.streamChat(parsed.data.messages, guideContext)` instead of `streamGenerate`. SSE event shape stays the same.

4. Add a soft cap: if `messages.length > 20`, keep the first user turn plus the last 19 turns and drop the middle. Don't summarize yet — that's a later improvement.

### Frontend

5. In `FollowUpChat.tsx`, change the submit handler so the request body is `{ messages: [...messages, { role: 'user', content: trimmed }] }` — send the full visible history, not just the new message. Don't include the empty assistant placeholder you push for streaming.

6. Render assistant messages as Markdown. Use `react-markdown` with `remark-gfm`. If `@tailwindcss/typography` is already a dependency, wrap the assistant bubble in `prose prose-sm dark:prose-invert max-w-none`; otherwise install the plugin and add it to `tailwind.config.ts`. User messages stay plain text. Code blocks, lists, headings, tables should all render correctly.

7. Add a "New chat" button in the panel header next to "Close". Clicking it calls `setMessages([])`, `setError('')`, and aborts any in-flight request via an `AbortController` you thread through the fetch call. Use a small trash or refresh icon plus visually-hidden text for accessibility.

8. UI polish in the same panel:
   - Bump the panel size to `w-[min(28rem,calc(100vw-1.5rem))]` and the message area to `max-h-[60vh]`.
   - Auto-scroll the message list to the bottom whenever a new token arrives (a `useEffect` keyed on the last assistant message length, scrolling a `ref` into view with `behavior: 'smooth'`).
   - Replace the inline "Thinking…" placeholder with a separate typing indicator row (three pulsing dots) that shows while `loading` is true and the assistant message is still empty. Don't stuff placeholder text into the bubble.
   - Add Enter-to-send / Shift+Enter-for-newline handling on the textarea (`onKeyDown`).
   - While streaming, swap the Send button for a "Stop" button that calls `abortController.abort()`.
   - Add a small "Copy" icon button on each assistant message (uses `navigator.clipboard.writeText`).

### Tests

9. Update `tests/integration/api/chat/follow-up-chat.test.ts` for the new `{ messages }` payload, including: rejects empty array, rejects when last message isn't `user`, accepts a multi-turn array, trims to last 20 turns. Add a test asserting `claudeClient.streamChat` is called with the full message array.

10. Update `tests/unit/components/guide/FollowUpChat.test.tsx`: assert that the second user message is sent with the prior turn included in the request body, that "New chat" clears the message list, and that markdown like `**bold**` renders as a `<strong>` element.

---

## Phase 2 — Let the bot edit the guide (propose-then-apply)

**Goal:** when the user says something like "add this as a section on the page," the bot proposes a structured edit; the user reviews and clicks "Apply" before anything is persisted. No silent writes.

### Data layer

1. Extend `UpdateGuideInput` in `src/lib/db/repositories/guides.ts` with an optional `content?: string`. Update `guideRepository.update` so when `content` is provided it goes into the Prisma update payload. Keep the ownership check (`where: { id, userId }`) — non-owners must never be able to mutate content.

2. **Do not** add `content` to the public `patchGuideSchema` in `src/app/api/guides/[id]/route.ts`. Instead create a new internal route `src/app/api/guides/[id]/content/route.ts` that accepts:

   ```ts
   z.object({
     op: z.enum(['append_section', 'replace_section', 'insert_section_after']),
     heading: z.string().trim().min(1).max(200),
     body_markdown: z.string().trim().min(1).max(20000),
     after_heading: z.string().trim().min(1).max(200).optional(), // only for insert_section_after
   })
   ```

   Auth-gate it to the guide's owner. Apply the operation to `guide.content` server-side using a Markdown AST. Use `remark` / `unified` if it's already in the dependency tree (the renderer likely uses it); otherwise add `unified` + `remark-parse` + `remark-stringify`. Match by `heading` text on level-2 headings (`##`) — that's the section granularity. On `replace_section`, replace everything from that heading up to (but not including) the next same-or-higher-level heading. On `append_section`, add at the end. On `insert_section_after`, find `after_heading` and insert right after that section's body. Persist via the extended `guideRepository.update`.

3. Return the updated `content` in the response so the client can refresh without an extra fetch.

### Chat endpoint

4. Define a tool schema for Claude in `src/app/api/chat/[guideSlug]/route.ts`:

   ```ts
   const tools = [
     {
       name: 'propose_section_edit',
       description:
         'Propose adding, replacing, or inserting a section in the guide. Does not apply the change — the user must approve.',
       input_schema: {
         type: 'object',
         properties: {
           op: {
             type: 'string',
             enum: ['append_section', 'replace_section', 'insert_section_after'],
           },
           heading: { type: 'string' },
           body_markdown: { type: 'string' },
           after_heading: { type: 'string' },
           rationale: { type: 'string', description: 'One short sentence shown to the user.' },
         },
         required: ['op', 'heading', 'body_markdown', 'rationale'],
       },
     },
   ]
   ```

   Update the system prompt to tell Claude: "If the user asks to add, edit, insert, or remove a section/part of the guide, call `propose_section_edit` instead of writing the section inline. Otherwise answer normally."

5. Switch the streaming call to use the Anthropic SDK directly (not the AI SDK wrapper) so you can stream tool-use blocks. Use `claudeClient.getAnthropicSdk()` — expose a getter if needed — and `messages.stream({ model, system, messages, tools, max_tokens })`. Translate stream events into your existing SSE shape, plus a new event type:

   ```ts
   | { type: 'proposal'; id: string; op: ...; heading: string; body_markdown: string; after_heading?: string; rationale: string }
   ```

   Generate `id` server-side (e.g. `crypto.randomUUID()`) so the client can reference the proposal when applying.

6. Do **not** apply the edit on the chat endpoint. The chat endpoint only emits proposals. Application happens when the user clicks Apply, which fires a separate POST to the new `/api/guides/[id]/content` route.

### Frontend

7. In `FollowUpChat.tsx`, handle the new `proposal` SSE event by rendering a distinct "proposal card" message in the thread:
   - Title: e.g. "Proposed: append section _Temperatures at each latitude_"
   - Body: collapsed Markdown preview of `body_markdown` (expandable)
   - One-line rationale
   - Two buttons: **Apply to guide** and **Dismiss**
8. Apply-to-guide POSTs to `/api/guides/[id]/content` with the proposal payload. On success, call `router.refresh()` from `next/navigation` so the server component re-renders with the updated `content`. Replace the proposal card with a small "Applied ✓ — [Undo]" confirmation. Undo issues the inverse operation (`replace_section` back to the previous body, which the client cached when it first applied; for `append_section` the undo is to remove the appended section — implement this server-side as a separate `op: 'remove_section'` for cleanliness).
9. The component needs the `guideId` (not just `guideSlug`) to call the content route. Thread it through from `GuideClientShell` like `isAuthenticated` is threaded today.

### Tests

10. Unit-test the Markdown AST helpers (append/replace/insert/remove by heading) — these are pure functions and easy to cover.
11. Integration-test `/api/guides/[id]/content`: owner can apply each op, non-owner gets 403, missing heading gets 422, unknown `after_heading` returns 404 with a clear code.
12. Component test: a `proposal` SSE event renders an Apply button; clicking it posts to the content route (mocked) and replaces the card with the applied state.

---

## Phase 3 — Persistence and quality of life

**Goal:** conversations survive reload, the bot suggests follow-ups, highlight-to-note can pipe quotes into the chat, and there's basic abuse protection.

1. **localStorage persistence.** Key by `flashguides.chat.{guideSlug}`. On mount, hydrate `messages` from storage. On every change, debounce-write the array. The "New chat" button clears the key.

2. **Suggested follow-ups.** After each assistant turn finishes, fire a non-streaming call to `claudeClient.generate` asking for 3 short follow-up questions as a JSON array (cap output at ~200 tokens). Render them as clickable chips below the last assistant message. Clicking a chip submits it as the next user message. Cache per-turn so re-renders don't re-fetch.

3. **Quote-to-ask integration.** `HighlightNote` already exists. Add an "Ask about this" action to its toolbar. On click, open the chat panel (lift `isOpen` to `GuideClientShell` or a tiny context) and prefill the textarea with `> {quoted text}\n\n` followed by a focus on the input.

4. **Rate limiting.** Add a per-user limit of 30 chat requests per minute on `/api/chat/[guideSlug]` and 10 applies per minute on `/api/guides/[id]/content`. Use whatever rate-limit primitive the codebase already has; if none, a simple in-memory `Map<userId, { count, windowStart }>` is fine for now — leave a TODO to swap in Redis.

5. **History summarization.** When `messages.length > 20`, before trimming, ask `claudeClient.generate` for a one-paragraph summary of the dropped turns and prepend it as a synthetic `{ role: 'system-note', content: '...' }` entry that the server formats into the system prompt (don't send it in the `messages` array to Claude — keep `messages` strictly user/assistant).

6. **Tests.** Cover: localStorage round trip, rate-limit returns 429, suggested follow-ups parse correctly when the model returns malformed JSON (fall back to none), quote-to-ask prefill.

---

## General requirements across all phases

- Keep the existing `data-testid` hooks (`follow-up-chat`, `follow-up-chat-toggle`, `follow-up-messages`) working, and add new ones for the new buttons (`new-chat`, `stop`, `apply-proposal`, `dismiss-proposal`).
- All new server routes use `createApiErrorResponse` / `handleApiError` with the same code conventions used elsewhere (`AUTHENTICATION_REQUIRED`, `FORBIDDEN`, `VALIDATION_ERROR`, etc.).
- Don't regress the Playwright stub path (`isPlaywrightTestEnabled()`) — both `streamChat` and the new content route need stubbed-deterministic behavior so existing E2E tests still pass.
- Run `npm test` (or whatever the project script is — check `package.json`) and the linter after each phase. Don't move to the next phase with failing tests.
- Match the existing Tailwind styling vocabulary in `FollowUpChat.tsx` — same border radii, same zinc palette, same dark-mode pairings. Don't introduce a new design system.
- Keep commits small and well-described per phase. One PR per phase.

When you're done with each phase, summarize what changed, list any TODOs you left, and confirm tests are green before starting the next phase.
