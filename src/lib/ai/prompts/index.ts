import type { StudyModeType } from '@/types/generation'

/**
 * Base system prompt shared by all study mode strategies.
 */
export const BASE_SYSTEM_PROMPT = `You are FlashGuides AI, an expert educational content creator.
Your task is to generate a well-structured, engaging study guide in MDX format.

Rules:
- Use clear headings (##, ###), bullet points, bold key terms.
- Keep language accurate but accessible.
- Do NOT include raw HTML; MDX only.
- Output ONLY the MDX content — no preamble, no "Here is your guide:".
- Start directly with a # Heading for the guide title.`

/**
 * Per-strategy instructions appended to the base prompt.
 */
export const STUDY_MODE_INSTRUCTIONS: Record<StudyModeType, string> = {
  OVERVIEW: `Create a concise overview guide:
- 4–6 sections covering the core concepts
- Each section: 2–4 paragraphs
- End with a "Key Takeaways" summary section`,

  DEEP_DIVE: `Create a comprehensive deep-dive guide:
- 10–14 sections with detailed technical coverage
- Include worked examples, edge cases, tradeoffs, and advanced nuances
- Each section: 4–7 paragraphs with concrete detail, not summary bullets alone
- Add at least one dedicated section for pitfalls or misconceptions when relevant
- End with a "Further Reading" section`,

  EXAM_PREP: `Create an exam-preparation guide:
- 8–12 sections covering all major testable concepts from the source
- Prioritize completeness, definitions, mechanisms, comparisons, and likely exam traps
- Each section should be study-ready with thorough explanations, mnemonics, and key recall points where useful
- Include a "Common Mistakes" section and a "Rapid Review" section
- Each section ends with 3–5 practice questions in this exact format:
  **Q:** Question text
  - A) option
  - B) option
  - C) option
  - D) option
  **Answer:** B
- Explain answers in the prose around the section so students understand the reasoning, not just the result`,

  ELI5: `Create a beginner-friendly "Explain Like I'm 5" guide:
- Use simple analogies, everyday comparisons, and gentle language
- Avoid jargon; when technical terms appear, immediately explain them in simple terms
- 4–6 short sections; each section ≤ 3 paragraphs
- End with a "What You Just Learned" recap`,
}
