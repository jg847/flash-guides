import { prisma } from '@/lib/db/client'
import { claudeClient } from '@/lib/ai/claude'
import { StudyModeStrategyFactory } from '@/lib/study-modes/factory'
import { GuideBuilder } from './builder'
import { generateSlug } from './slug'
import { normalizeInput } from './input-normalizer'
import { sanitizeGuideContentForMdx } from '@/lib/guides/content'
import { checkAndIncrementQuota, extractIp } from '@/lib/guest/quota'
import type { InputType as PrismaInputType } from '@/generated/prisma'
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
  skipGuestQuotaCheck?: boolean
}

function getPersistedInputType(request: GenerationRequest): PrismaInputType {
  return request.inputType === 'FILE' ? 'TEXT' : request.inputType
}

function isGuideContentComplete(
  content: string,
  title: string,
  sections: Array<{ heading: string }>,
  quizCount: number,
): boolean {
  const trimmed = content.trim()
  if (!trimmed.startsWith('# ')) {
    return false
  }

  if (!trimmed.includes(`# ${title}`)) {
    return false
  }

  if (sections.some((section) => !trimmed.includes(`## ${section.heading}`))) {
    return false
  }

  if (quizCount > 0) {
    const renderedQuizCount = (trimmed.match(/<Quiz\s/g) ?? []).length
    if (!trimmed.includes('## Practice Questions') || renderedQuizCount < quizCount) {
      return false
    }
  }

  if ((trimmed.match(/```/g) ?? []).length % 2 !== 0) {
    return false
  }

  return true
}

function getAssembleTokenBudget(request: GenerationRequest, isRegistered: boolean): number {
  if (request.studyMode === 'EXAM_PREP') {
    return request.inputType === 'FILE'
      ? isRegistered
        ? 12288
        : 10240
      : isRegistered
        ? 10240
        : 8192
  }

  return isRegistered ? 8192 : 6144
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
    if (!isRegistered && !ctx.skipGuestQuotaCheck) {
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
    let normalizedInput: NormalizedInput
    try {
      if (request.inputType === 'URL') {
        yield { type: 'step', step: 'fetching' }
        await import('@/lib/container')
      }
      normalizedInput = await normalizeInput(request)
    } catch {
      yield {
        type: 'error',
        message: 'Unable to fetch source content. Check the URL or paste the text instead.',
      }
      return
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
    Registered user: ${isRegistered ? 'yes' : 'no'}

    Requirements:
    - Expand every section into a complete, study-ready treatment.
    - Use all important information from the original source and preserve specifics.
    - Do not compress the guide into brief summaries; prefer depth, examples, mechanisms, comparisons, and concrete detail.
    - For EXAM_PREP, make the guide especially thorough, with strong conceptual explanations, likely exam traps, rapid-review style reinforcement, and enough detail to study from directly.
    - For DEEP_DIVE, include advanced nuances, edge cases, tradeoffs, and worked examples where relevant.
    - Ensure every planned section listed above appears in the final guide with a complete body.
    - Finish the output cleanly. Do not stop mid-section, mid-list, mid-table, or mid-component.
    - Do not leave placeholder boxes, incomplete quiz blocks, or unfinished headings.
    - Output MDX only.

${builder.build()}`

      const stream = await claudeClient.streamGenerate(
        assemblePrompt,
        undefined,
        getAssembleTokenBudget(request, isRegistered),
      )
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
    const fallbackContent = builder.build()
    const candidateContent = streamedContent.trim()
    const finalContent = sanitizeGuideContentForMdx(
      candidateContent &&
        isGuideContentComplete(candidateContent, title, enrichedSections, quizzes.length)
        ? candidateContent
        : fallbackContent,
    )

    // ── Step 8: Persist ──────────────────────────────────────────────────────
    const slug = generateSlug(title)
    const persistedInputType = getPersistedInputType(request)
    const guideData: GeneratedGuide = {
      title,
      slug,
      studyMode: request.studyMode,
      inputType: persistedInputType,
      inputValue:
        request.inputType === 'FILE' ? (request.sourceName ?? 'Uploaded file') : request.inputValue,
      content: finalContent,
      isWatermark: !isRegistered,
      userId: session?.user?.id ?? null,
    }

    await prisma.guide.create({
      data: {
        ...guideData,
        inputType: persistedInputType,
        isPublic: false,
      },
    })

    yield { type: 'done', guideSlug: slug, isGuestGuide: !isRegistered }
  }
}

export const generationOrchestrator = new GenerationOrchestrator()
