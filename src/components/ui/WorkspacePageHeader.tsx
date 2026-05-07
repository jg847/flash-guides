'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

interface WorkspacePageHeaderProps {
  title: string
  description: string
  actions?: ReactNode
}

const WORKSPACE_TABS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/account', label: 'Account Settings' },
]

export default function WorkspacePageHeader({
  title,
  description,
  actions,
}: WorkspacePageHeaderProps) {
  const pathname = usePathname()

  return (
    <header className="rounded-[2rem] border border-stone-200 bg-white/90 p-6 shadow-sm backdrop-blur sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">
            FlashGuides
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-stone-500">{description}</p>
        </div>

        <nav
          aria-label="Workspace pages"
          className="flex w-full rounded-2xl bg-stone-100 p-1 lg:w-auto"
        >
          {WORKSPACE_TABS.map((tab) => {
            const isActive = pathname === tab.href

            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'flex-1 rounded-xl px-4 py-2.5 text-center text-sm font-medium transition-colors lg:flex-none',
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:bg-white hover:text-stone-950',
                ].join(' ')}
              >
                {tab.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {actions ? (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">{actions}</div>
      ) : null}
    </header>
  )
}
