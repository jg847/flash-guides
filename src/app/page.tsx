import Link from 'next/link'
import PromptBox from '@/components/chat/PromptBox'
import { auth, signOut } from '@/lib/auth'
import { prisma } from '@/lib/db/client'

async function getHomePageState() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return {
      session,
      savedGuideCount: null,
    }
  }

  const savedGuideCount = await prisma.guide.count({ where: { userId } })

  return {
    session,
    savedGuideCount,
  }
}

export default async function HomePage() {
  const { session, savedGuideCount } = await getHomePageState()

  return (
    <main className="relative flex flex-1 flex-col items-center justify-start overflow-hidden bg-[radial-gradient(circle_at_top,_#fff4db_0,_#fffaf1_28%,_#ffffff_58%,_#f4f4f5_100%)] px-4 py-16 text-zinc-950 transition-colors dark:bg-[radial-gradient(circle_at_top,_#27272a_0,_#09090b_42%,_#000000_100%)] dark:text-zinc-50 sm:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(161,161,170,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(161,161,170,0.08)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,white,transparent_75%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]"
      />

      <div className="relative mb-10 flex w-full max-w-5xl flex-col items-center text-center">
        <span className="rounded-full border border-amber-300/70 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-amber-900 shadow-sm backdrop-blur dark:border-zinc-700 dark:bg-white/5 dark:text-amber-200">
          Study Guides On Demand
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
          FlashGuides
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">
          Turn any topic, text, or URL into a structured study guide — instantly.
        </p>
        <p className="mt-2 max-w-xl text-sm leading-7 text-zinc-600 dark:text-zinc-400">
          Generate organized notes, revision-ready guides, and deeper explanations without fighting
          formatting or losing your place.
        </p>
      </div>

      <section className="relative mb-10 w-full max-w-5xl rounded-[2rem] border border-zinc-300/80 bg-white/88 p-6 shadow-[0_24px_80px_rgba(24,24,27,0.08)] backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/88 dark:shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        {session?.user?.id ? (
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Signed in as</p>
              <h2 className="mt-1 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                {session.user.name || session.user.email || 'FlashGuides user'}
              </h2>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                You have {savedGuideCount ?? 0} saved {savedGuideCount === 1 ? 'guide' : 'guides'}.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300"
              >
                View dashboard
              </Link>
              <Link
                href="/account"
                className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-100"
              >
                Account settings
              </Link>
              <form
                action={async () => {
                  'use server'
                  await signOut({ redirectTo: '/' })
                }}
              >
                <button
                  type="submit"
                  className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-100"
                >
                  Log out
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Save your guides across devices
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
                Sign in to manage your study library
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-700 dark:text-zinc-300">
                Access your dashboard, organize saved guides, and continue where you left off.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/login?callbackUrl=/dashboard"
                className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-100"
              >
                Create account
              </Link>
            </div>
          </div>
        )}
      </section>

      <div className="relative w-full max-w-2xl rounded-[2rem] border border-white/70 bg-white/72 p-4 shadow-[0_24px_80px_rgba(24,24,27,0.08)] backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/72 dark:shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-5">
        <PromptBox isAuthenticated={Boolean(session?.user?.id)} />
      </div>

      <p className="relative mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        Looking for inspiration?{' '}
        <Link
          href="/gallery"
          className="font-medium text-indigo-700 hover:underline dark:text-indigo-300"
        >
          Browse public guides →
        </Link>
      </p>
    </main>
  )
}
