import { describe, expect, it } from 'vitest'
import { buildPdfExport } from '@/lib/export/pdf'

describe('buildPdfExport', () => {
  it('renders a PDF buffer for the guide', async () => {
    const buffer = await buildPdfExport({
      id: 'guide-1',
      slug: 'react-basics',
      title: 'React Basics',
      studyMode: 'OVERVIEW',
      inputType: 'TOPIC',
      inputValue: 'React basics',
      content: '# React Basics\n\n## Hooks\n\nHooks are useful.',
    })

    expect(buffer).toBeInstanceOf(Buffer)
    expect(buffer.subarray(0, 4).toString()).toBe('%PDF')
  })
})
