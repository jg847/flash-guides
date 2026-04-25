import Link from 'next/link'
import type { GuideHeroMedia } from '@/lib/guides/content'
import type { InputType, StudyModeType } from '@/types/generation'
import ThemeToggle from '@/components/ThemeToggle'

interface GuideHeroProps {
  title: string
  studyMode: StudyModeType
  inputType: InputType
  inputValue: string
  media?: GuideHeroMedia
}

const STUDY_MODE_LABELS: Record<StudyModeType, string> = {
  OVERVIEW: 'Overview',
  DEEP_DIVE: 'Deep Dive',
  EXAM_PREP: 'Exam Prep',
  ELI5: 'ELI5',
}

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.toLowerCase()

    if (host === 'youtu.be' || host === 'www.youtu.be') {
      const id = parsed.pathname.split('/').filter(Boolean)[0]
      return id ? `https://www.youtube.com/embed/${id}` : null
    }

    if (host.includes('youtube.com')) {
      if (parsed.pathname === '/watch') {
        const id = parsed.searchParams.get('v')
        return id ? `https://www.youtube.com/embed/${id}` : null
      }

      const segments = parsed.pathname.split('/').filter(Boolean)
      if (segments[0] === 'shorts' || segments[0] === 'embed') {
        return segments[1] ? `https://www.youtube.com/embed/${segments[1]}` : null
      }
    }

    return null
  } catch {
    return null
  }
}

export default function GuideHero({
  title,
  studyMode,
  inputType,
  inputValue,
  media,
}: GuideHeroProps) {
  const embedUrl = media?.type === 'youtube' ? getYouTubeEmbedUrl(media.src) : null

  return (
    <header className="space-y-6 rounded-[2rem] border border-zinc-200 bg-linear-to-br from-white via-zinc-50 to-amber-50 p-8 shadow-sm dark:border-zinc-800 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-900">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          ← Back to home
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {STUDY_MODE_LABELS[studyMode]}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500 dark:text-zinc-400">
          Study Guide
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
          {title}
        </h1>
        <p className="max-w-3xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
          Source type: {inputType}. Original input: {inputValue}
        </p>
      </div>

      {media ? (
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-950/5 dark:border-zinc-800 dark:bg-zinc-950/40">
          {media.type === 'image' ? (
            // User-authored guide media can point at arbitrary remote hosts with unknown dimensions.
            // Keeping a plain img here avoids requiring a broad next/image allowlist for untrusted content.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={media.src} alt={media.alt ?? title} className="h-auto w-full object-cover" />
          ) : embedUrl ? (
            <div className="aspect-video w-full">
              <iframe
                src={embedUrl}
                title={media.alt ?? title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
