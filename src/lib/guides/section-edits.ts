import remarkParse from 'remark-parse'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'

type SectionEditOperation =
  | {
      op: 'append_section'
      heading: string
      body_markdown: string
    }
  | {
      op: 'replace_section'
      heading: string
      body_markdown: string
    }
  | {
      op: 'insert_section_after'
      heading: string
      body_markdown: string
      after_heading: string
    }
  | {
      op: 'remove_section'
      heading: string
    }

type MarkdownNode = {
  type: string
  depth?: number
  value?: string
  children?: MarkdownNode[]
}

type RootNode = {
  type: 'root'
  children: MarkdownNode[]
}

type SectionRange = {
  start: number
  endExclusive: number
}

export class GuideSectionEditError extends Error {
  code: 'SECTION_NOT_FOUND' | 'AFTER_HEADING_NOT_FOUND'

  constructor(code: 'SECTION_NOT_FOUND' | 'AFTER_HEADING_NOT_FOUND', message: string) {
    super(message)
    this.name = 'GuideSectionEditError'
    this.code = code
  }
}

const processor = unified().use(remarkParse).use(remarkStringify)

function parseMarkdown(markdown: string): RootNode {
  return processor.parse(markdown) as RootNode
}

function stringifyMarkdown(root: RootNode): string {
  return String(processor.stringify(root as never)).trimEnd()
}

function normalizeHeading(heading: string): string {
  return heading.trim().replace(/\s+/g, ' ')
}

function extractText(node: MarkdownNode): string {
  if (node.value) {
    return node.value
  }

  return (node.children ?? []).map(extractText).join('')
}

function getHeadingText(node: MarkdownNode): string {
  return normalizeHeading(extractText(node))
}

function findLevelTwoSectionRange(root: RootNode, heading: string): SectionRange | null {
  const target = normalizeHeading(heading)

  for (let index = 0; index < root.children.length; index += 1) {
    const node = root.children[index]
    if (node?.type !== 'heading' || node.depth !== 2 || getHeadingText(node) !== target) {
      continue
    }

    let endExclusive = root.children.length
    for (let candidate = index + 1; candidate < root.children.length; candidate += 1) {
      const nextNode = root.children[candidate]
      if (nextNode?.type === 'heading' && (nextNode.depth ?? Number.MAX_SAFE_INTEGER) <= 2) {
        endExclusive = candidate
        break
      }
    }

    return { start: index, endExclusive }
  }

  return null
}

function createSectionNodes(heading: string, bodyMarkdown: string): MarkdownNode[] {
  const sectionRoot = parseMarkdown(`## ${heading.trim()}\n\n${bodyMarkdown.trim()}\n`)
  return sectionRoot.children
}

export function getSectionBodyMarkdown(markdown: string, heading: string): string | null {
  const root = parseMarkdown(markdown)
  const range = findLevelTwoSectionRange(root, heading)

  if (!range) {
    return null
  }

  return stringifyMarkdown({
    type: 'root',
    children: root.children.slice(range.start + 1, range.endExclusive),
  }).trim()
}

export function applySectionEdit(markdown: string, operation: SectionEditOperation): string {
  const root = parseMarkdown(markdown)

  if (operation.op === 'append_section') {
    root.children.push(...createSectionNodes(operation.heading, operation.body_markdown))
    return stringifyMarkdown(root)
  }

  if (operation.op === 'insert_section_after') {
    const targetRange = findLevelTwoSectionRange(root, operation.after_heading)
    if (!targetRange) {
      throw new GuideSectionEditError(
        'AFTER_HEADING_NOT_FOUND',
        `Heading not found: ${operation.after_heading}`,
      )
    }

    root.children.splice(
      targetRange.endExclusive,
      0,
      ...createSectionNodes(operation.heading, operation.body_markdown),
    )
    return stringifyMarkdown(root)
  }

  const targetRange = findLevelTwoSectionRange(root, operation.heading)
  if (!targetRange) {
    throw new GuideSectionEditError('SECTION_NOT_FOUND', `Heading not found: ${operation.heading}`)
  }

  if (operation.op === 'replace_section') {
    root.children.splice(
      targetRange.start,
      targetRange.endExclusive - targetRange.start,
      ...createSectionNodes(operation.heading, operation.body_markdown),
    )
    return stringifyMarkdown(root)
  }

  root.children.splice(targetRange.start, targetRange.endExclusive - targetRange.start)
  return stringifyMarkdown(root)
}
