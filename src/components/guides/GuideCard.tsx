import Link from 'next/link'

type StudyMode = 'OVERVIEW' | 'DEEP_DIVE' | 'EXAM_PREP' | 'ELI5'

interface GuideCardProps {
  id: string
  slug: string
  title: string
  studyMode: StudyMode
  content: string
  createdAt: Date
}

const BADGE_STYLES: Record<StudyMode, string> = {
  OVERVIEW: 'bg-blue-100 text-blue-800',
  DEEP_DIVE: 'bg-purple-100 text-purple-800',
  EXAM_PREP: 'bg-red-100 text-red-800',
  ELI5: 'bg-green-100 text-green-800',
}

const BADGE_LABELS: Record<StudyMode, string> = {
  OVERVIEW: 'Overview',
  DEEP_DIVE: 'Deep Dive',
  EXAM_PREP: 'Exam Prep',
  ELI5: 'ELI5',
}

/**
 * GuideCard — displays a guide summary in the public gallery grid.
 * Shows title, study mode badge, 2-line content preview, and links to the guide.
 */
export default function GuideCard({ slug, title, studyMode, content }: GuideCardProps) {
  // Strip MDX/Markdown syntax for the preview: remove headings, bold, code fences, etc.
  const preview = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/#{1,6}\s+/g, '')
    .replace(/[*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180)

  const badgeClass = BADGE_STYLES[studyMode] ?? 'bg-gray-100 text-gray-800'
  const badgeLabel = BADGE_LABELS[studyMode] ?? studyMode

  return (
    <Link
      href={`/guide/${slug}`}
      data-testid="guide-card"
      className="group flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
    >
      <div className="flex items-start justify-between gap-2">
        <h2 className="text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {title}
        </h2>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}
          aria-label={`Study mode: ${badgeLabel}`}
        >
          {badgeLabel}
        </span>
      </div>
      <p className="text-sm text-gray-500 line-clamp-2">{preview}</p>
    </Link>
  )
}
