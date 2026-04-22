# FlashGuides — Spec Overview

**Project:** FlashGuides  
**Owner:** Jeanpaul (jg847@njit.edu)  
**Date:** 2026-04-22  
**Status:** Phase 0 complete — Phase 1 (specs) in progress

---

## What is FlashGuides?

FlashGuides is a web application whose homepage is an AI chatbot that generates interactive study-guide webpages on demand. A user submits a topic, pastes text, or provides a URL / YouTube link; the app returns a fully-formed, aesthetically pleasing, interactive study-guide page with flashcards, quizzes, follow-up chat, and more.

---

## Spec index

| #                                       | Feature                                 | Status            | Dependencies |
| --------------------------------------- | --------------------------------------- | ----------------- | ------------ |
| [01](./01-infrastructure/spec.md)       | Infrastructure & Project Setup          | ✅ Done (Phase 0) | —            |
| [02](./02-authentication/spec.md)       | Authentication & Session Management     | 📝 Spec ready     | 01           |
| [03](./03-guest-experience/spec.md)     | Guest vs. Registered Experience         | 📝 Spec ready     | 02           |
| [04](./04-chat-homepage/spec.md)        | Chat Homepage & Generation Orchestrator | 📝 Spec ready     | 02, 03, 05   |
| [05](./05-mcp-integrations/spec.md)     | MCP Tool Integrations                   | 📝 Spec ready     | 01           |
| [06](./06-study-guide-renderer/spec.md) | Study Guide Renderer                    | 📝 Spec ready     | 04           |
| [07](./07-user-dashboard/spec.md)       | User Dashboard                          | 📝 Spec ready     | 04, 06       |
| [08](./08-account-management/spec.md)   | Account Management                      | 📝 Spec ready     | 02           |
| [09](./09-sharing-export/spec.md)       | Sharing & Export                        | 📝 Spec ready     | 06           |
| [10](./10-cli-export/spec.md)           | CLI: Source Export Tool                 | 📝 Spec ready     | 01           |
| [11](./11-observability/spec.md)        | Observability & Hardening               | 📝 Spec ready     | 04           |

---

## Milestone sequencing

Per the brief (Section 10), ship in this order:

1. **Sprint 01** — Spec 01 (Phase 0 infra) ✅ — green CI from day one
2. **Sprint 02** — Spec 02 Auth — users can sign up and log in
3. **Sprint 03** — Spec 03 Guest gating — quota enforcement in place
4. **Sprint 04** — Spec 04 Chat + Spec 05 MCP (web fetch only) — end-to-end generation
5. **Sprint 05** — Spec 06 Renderer — pages are beautiful and interactive
6. **Sprint 06** — Spec 07 Dashboard + Spec 08 Account — users manage their work
7. **Sprint 07** — Spec 05 extensions: Web Search, Image Gen, YouTube
8. **Sprint 08** — Spec 09 Sharing & Export
9. **Sprint 09** — Spec 10 CLI export tool
10. **Sprint 10** — Spec 11 Observability & Hardening

---

## Definition of Done (global)

A feature is only "done" when **all** of the following are true:

1. Spec exists in `docs/_spec/` and is up to date with what shipped.
2. All user stories have passing acceptance tests.
3. Positive, negative, and edge cases from the spec's test plan are implemented and passing.
4. Unit + integration + E2E coverage meets thresholds (≥85% lines, ≥80% branches, ≥90% on `src/lib/**`).
5. `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` all pass locally and in CI.
6. Manual smoke test of the happy path in Docker Compose succeeds.
7. No `TODO`, `FIXME`, or `@ts-ignore` in the shipped code without a linked issue.
8. `docs/architecture.md` updated if new patterns or modules were introduced.
9. PR reviewed and squash-merged to `main`.
