import Link from 'next/link'

export default function GuideNotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-zinc-100 px-6 py-12">
      <div className="max-w-lg rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">
          Guide not found
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950">
          This study guide is unavailable.
        </h1>
        <p className="mt-3 text-base leading-7 text-zinc-600">
          The guide may have been removed, never existed, or you may not have access to it.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
        >
          Return home
        </Link>
      </div>
    </main>
  )
}
