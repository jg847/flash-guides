'use client'

import './globals.css'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  unstable_retry: () => void
}

export default function GlobalError({ error, unstable_retry }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <title>Something went wrong</title>
        <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-6 py-16">
          <section className="w-full rounded-3xl border border-black/10 bg-white/80 p-8 shadow-sm dark:border-white/10 dark:bg-black/30">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
              Application Error
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Something went wrong</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              The app hit an unexpected error while rendering this page. You can retry the request
              now, and if the problem continues, use the error digest below to match it against
              server logs.
            </p>
            {error.digest ? (
              <p className="mt-4 font-mono text-xs text-zinc-500">Digest: {error.digest}</p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => unstable_retry()}
                className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                Try again
              </button>
            </div>
          </section>
        </main>
      </body>
    </html>
  )
}
