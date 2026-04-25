import { marked } from 'marked'
import type { GuideExportRecord } from './guide-types'

const REMOTE_IMAGE_REGEX = /!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g

async function fetchAsDataUri(url: string, fetchImpl: typeof fetch): Promise<string> {
  const response = await fetchImpl(url)
  if (!response.ok) {
    throw new Error(`Unable to fetch image: ${url}`)
  }

  const contentType = response.headers.get('content-type') ?? 'application/octet-stream'
  const buffer = Buffer.from(await response.arrayBuffer())
  return `data:${contentType};base64,${buffer.toString('base64')}`
}

async function inlineRemoteImages(content: string, fetchImpl: typeof fetch): Promise<string> {
  let result = content
  const matches = [...content.matchAll(REMOTE_IMAGE_REGEX)]

  for (const match of matches) {
    const alt = match[1] ?? ''
    const url = match[2]
    if (!url || !match[0]) {
      continue
    }

    try {
      const dataUri = await fetchAsDataUri(url, fetchImpl)
      result = result.replace(match[0], `![${alt}](${dataUri})`)
    } catch {
      // Leave the original URL in place when inlining fails.
    }
  }

  return result
}

export async function buildHtmlExport(
  guide: GuideExportRecord,
  fetchImpl: typeof fetch = fetch,
): Promise<string> {
  const inlinedContent = await inlineRemoteImages(guide.content, fetchImpl)
  const bodyHtml = await marked.parse(inlinedContent)

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${guide.title}</title>
    <style>
      :root { color-scheme: light; }
      body {
        margin: 0;
        font-family: Georgia, "Times New Roman", serif;
        background: linear-gradient(180deg, #f8fafc 0%, #ffffff 40%);
        color: #1f2937;
      }
      main {
        max-width: 56rem;
        margin: 0 auto;
        padding: 3rem 1.5rem 4rem;
      }
      header {
        margin-bottom: 2rem;
        padding: 2rem;
        border: 1px solid #dbe4f0;
        border-radius: 1.5rem;
        background: white;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      }
      .eyebrow {
        font: 600 0.75rem/1.2 ui-sans-serif, system-ui, sans-serif;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #64748b;
      }
      h1 { font-size: 2.75rem; line-height: 1.1; margin: 0.75rem 0; }
      .meta { color: #475569; font: 500 0.95rem/1.7 ui-sans-serif, system-ui, sans-serif; }
      article {
        padding: 2rem;
        border: 1px solid #dbe4f0;
        border-radius: 1.5rem;
        background: white;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
      }
      article h1, article h2, article h3 { color: #0f172a; }
      article p, article li, article blockquote { font-size: 1rem; line-height: 1.9; }
      article pre {
        overflow-x: auto;
        border-radius: 1rem;
        padding: 1rem;
        background: #0f172a;
        color: #f8fafc;
      }
      article code {
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      }
      article img {
        width: 100%;
        height: auto;
        margin: 1.5rem 0;
        border-radius: 1rem;
      }
      article blockquote {
        margin-left: 0;
        padding-left: 1rem;
        border-left: 4px solid #f59e0b;
        color: #475569;
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <div class="eyebrow">FlashGuides export</div>
        <h1>${guide.title}</h1>
        <p class="meta">${guide.studyMode} · ${guide.inputType} · ${guide.inputValue}</p>
      </header>
      <article>${bodyHtml}</article>
    </main>
  </body>
</html>`
}
