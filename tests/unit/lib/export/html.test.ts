import { afterEach, describe, expect, it, vi } from 'vitest'
import { buildHtmlExport } from '@/lib/export/html'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('buildHtmlExport', () => {
  it('renders a self-contained HTML document and inlines remote images', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(Uint8Array.from([0x89, 0x50, 0x4e, 0x47]), {
          status: 200,
          headers: { 'Content-Type': 'image/png' },
        }),
      ),
    )

    const html = await buildHtmlExport({
      id: 'guide-1',
      slug: 'react-basics',
      title: 'React Basics',
      studyMode: 'OVERVIEW',
      inputType: 'TOPIC',
      inputValue: 'React basics',
      content: '# React Basics\n\n![Diagram](https://example.com/react.png)',
    })

    expect(html).toContain('<!doctype html>')
    expect(html).toContain('FlashGuides export')
    expect(html).toContain('data:image/png;base64,')
  })
})
