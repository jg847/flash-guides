export interface GuideTocItem {
  id: string
  title: string
}

export interface GuideSectionBlock {
  id: string
  heading: string
  body: string
}

export interface GuideHeroMedia {
  type: 'image' | 'youtube'
  src: string
  alt?: string
}

export interface ParsedGuideContent {
  intro: string
  sections: GuideSectionBlock[]
  toc: GuideTocItem[]
  heroMedia?: GuideHeroMedia
}

function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function extractHeroMedia(content: string): GuideHeroMedia | undefined {
  const imageMatch = /!\[([^\]]*)\]\(([^)]+)\)/.exec(content)
  if (imageMatch?.[2]) {
    return {
      type: 'image',
      src: imageMatch[2],
      alt: imageMatch[1] || 'Guide illustration',
    }
  }

  const youtubeMatch =
    /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)[^\s)]+)/.exec(
      content,
    )

  if (youtubeMatch?.[1]) {
    return {
      type: 'youtube',
      src: youtubeMatch[1],
      alt: 'Guide video',
    }
  }

  return undefined
}

export function parseGuideContent(content: string): ParsedGuideContent {
  const withoutTitle = content.replace(/^#\s+.+?(?:\n|$)/, '').trim()
  const lines = withoutTitle.split('\n')

  const introLines: string[] = []
  const sections: GuideSectionBlock[] = []

  let currentHeading: string | null = null
  let currentBody: string[] = []

  const flushSection = () => {
    if (!currentHeading) {
      return
    }

    const body = currentBody.join('\n').trim()
    sections.push({
      id: slugifyHeading(currentHeading),
      heading: currentHeading,
      body,
    })
  }

  for (const line of lines) {
    const headingMatch = /^##\s+(.+)$/.exec(line)

    if (headingMatch) {
      flushSection()
      currentHeading = headingMatch[1]!.trim()
      currentBody = []
      continue
    }

    if (currentHeading) {
      currentBody.push(line)
    } else {
      introLines.push(line)
    }
  }

  flushSection()

  return {
    intro: introLines.join('\n').trim(),
    sections,
    toc: sections.map((section) => ({ id: section.id, title: section.heading })),
    heroMedia: extractHeroMedia(withoutTitle),
  }
}
