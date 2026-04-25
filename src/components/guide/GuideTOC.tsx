import Link from 'next/link'
import type { GuideTocItem } from '@/lib/guides/content'

interface GuideTOCProps {
  items: GuideTocItem[]
}

export default function GuideTOC({ items }: GuideTOCProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      data-testid="guide-toc"
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
        On this page
      </p>
      <ol className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              className="text-sm text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-100"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
