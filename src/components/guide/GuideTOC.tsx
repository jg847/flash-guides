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
      className="sticky top-6 rounded-2xl border border-zinc-300 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-black"
      data-testid="guide-toc"
    >
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-300">
        On this page
      </p>
      <ol className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              className="text-sm text-zinc-800 transition-colors hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-zinc-100"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
