import { prisma } from '@/lib/db/client'
import { claudeClient } from '@/lib/ai/claude'
import { StudyModeStrategyFactory } from '@/lib/study-modes/factory'
import { GuideBuilder } from './builder'
import { generateSlug } from './slug'
import { checkAndIncrementQuota, extractIp } from '@/lib/guest/quota'
import type {
  GenerationRequest,
  GeneratedGuide,
  SSEEvent,
  NormalizedInput,
} from '@/types/generation'
import type { Session } from 'next-auth'

export interface OrchestratorContext {
  request: GenerationRequest
  session: Session | null
  req: Request
}

/**
 * GenerationOrchestrator — Facade over the full generation pipeline.
 *
 * Steps:
 *  1. Auth check (guest vs. registered)
 *  2. Quota check (guests only)
 *  3. Input normalisation
 *  4. Build strategy
 *  5. Plan sections
 *  6. Enrich with media
 *  7. Build quizzes
 *  8. Assemble MDX
 *  9. Persist to DB
 * 10. Emit done event
 */
export class GenerationOrchestrator {
  /**
   * Run the pipeline and yield SSE events.
   * Yields `{ type: 'step' }`, `{ type: 'token' }`, `{ type: 'done' }`, or `{ type: 'error' }`.
   */
  async *orchestrate(ctx: OrchestratorContext): AsyncGenerator<SSEEvent> {
    const { request, session, req } = ctx
    const isRegistered = Boolean(session?.user?.id)

    // ── Step 1: Quota check (guests only) ───────────────────────────────────
    if (!isRegistered) {
      const ip = extractIp(req)
      const quota = await checkAndIncrementQuota(ip)
      if (!quota.allowed) {
        yield {
          type: 'error',
          message: JSON.stringify({
            code: 'QUOTA_EXCEEDED',
            resetsAt: quota.resetsAt.toISOString(),
            signupUrl: '/register',
          }),
        }
        return
      }
    }

    // ── Step 2: Normalise input ──────────────────────────────────────────────
    // URL/YouTube normalisation handled by Sprint 04-C input-normalizer.
    // For 04-A/04-B, TEXT and TOPIC inputs are passed through directly.
    const normalizedInput: NormalizedInput = {
      type: request.inputType,
      text: request.inputValue,
      originalValue: request.inputValue,
    }

    // ── Step 3: Build strategy ───────────────────────────────────────────────
    yield { type: 'step', step: 'planning' }
    const strategy = StudyModeStrategyFactory.create(request.studyMode, claudeClient)

    // ── Step 4: Plan sections ────────────────────────────────────────────────
    let title: string
    let sections: ReturnType<typeof strategy.planSections> extends Promise<{
      title: string
      sections: infer S
    }>
      ? S
      : never

    try {
      const plan = await strategy.planSections(normalizedInput)
      title = plan.title
      sections = plan.sections as typeof sections
    } catch {
      yield { type: 'error', message: 'AI service unavailable, please try again' }
      return
    }

    // ── Step 5: Enrich with media ────────────────────────────────────────────
    const enrichedSections = await strategy.enrichWithMedia(sections)

    // ── Step 6: Build quizzes ────────────────────────────────────────────────
    const quizzes = await strategy.buildQuizzes(enrichedSections)

    // ── Step 7: Assemble MDX (streaming) ────────────────────────────────────
    yield { type: 'step', step: 'writing' }

    const builder = new GuideBuilder().setTitle(title)
    for (const section of enrichedSections) {
      builder.addSection(section)
    }
    for (const quiz of quizzes) {
      builder.addQuiz(quiz)
    }

    // Stream the final MDX using Claude
    let streamedContent = ''
    try {
      const assemblePrompt = `Write the full MDX content for the following study guide plan.
Title: ${title}
Sections: ${enrichedSections.map((s) => s.heading).join(', ')}
Study mode: ${request.studyMode}

${builder.build()}`

      const stream = await claudeClient.streamGenerate(assemblePrompt)
      const reader = stream.getReader()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        streamedContent += value
        yield { type: 'token', text: value }
      }
    } catch {
      yield { type: 'error', message: 'AI service unavailable, please try again' }
      return
    }

    // Use streamed content if it's more complete than the assembled MDX
    const finalContent = streamedContent.trim() || builder.build()

    // ── Step 8: Persist ──────────────────────────────────────────────────────
    const slug = generateSlug(title)
    const guideData: GeneratedGuide = {
      title,
      slug,
      studyMode: request.studyMode,
      inputType: request.inputType,
      inputValue: request.inputValue,
      content: finalContent,
      isWatermark: !isRegistered,
      userId: session?.user?.id ?? null,
    }

    await prisma.guide.create({
      data: {
        ...guideData,
        isPublic: false,
      },
    })

    yield { type: 'done', guideSlug: slug }
  }
}

export const generationOrchestrator = new GenerationOrchestrator()
