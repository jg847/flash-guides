import { describe, expect, it } from 'vitest'
import { buildMarkdownExport } from '@/lib/export/markdown'

describe('buildMarkdownExport', () => {
  it('prepends frontmatter to the guide markdown', () => {
    const markdown = buildMarkdownExport({
      id: 'guide-1',
      slug: 'react-basics',
      title: 'React Basics',
      studyMode: 'OVERVIEW',
      inputType: 'TOPIC',
      inputValue: 'React basics',
      content: '# React Basics\n\n## Hooks\n\nHooks are useful.',
    })

    expect(markdown).toContain('title: "React Basics"')
    expect(markdown).toContain('slug: "react-basics"')
    expect(markdown).toContain('# React Basics')
  })
})
