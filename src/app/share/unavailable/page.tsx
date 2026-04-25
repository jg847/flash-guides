import Link from 'next/link'

export default function ShareUnavailablePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fef3c7_0%,#fffaf0_40%,#ffffff_100%)] px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-amber-200 bg-white p-10 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
          Shared guide unavailable
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-stone-900">
          This share link has expired or was revoked.
        </h1>
        <p className="mt-4 text-base leading-8 text-stone-600">
          Ask the guide owner for a new share link if you still need access.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white"
        >
          Back to FlashGuides
        </Link>
      </div>
    </main>
  )
}
