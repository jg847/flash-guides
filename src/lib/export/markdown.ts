import type { GuideExportRecord } from './guide-types'

function escapeFrontmatter(value: string): string {
  return value.replace(/"/g, '\\"')
}

export function buildMarkdownExport(guide: GuideExportRecord): string {
  const frontmatter = [
    '---',
    `title: "${escapeFrontmatter(guide.title)}"`,
    `slug: "${guide.slug}"`,
    `studyMode: "${guide.studyMode}"`,
    `inputType: "${guide.inputType}"`,
    `inputValue: "${escapeFrontmatter(guide.inputValue)}"`,
    '---',
  ].join('\n')

  return `${frontmatter}\n\n${guide.content.trim()}\n`
}
