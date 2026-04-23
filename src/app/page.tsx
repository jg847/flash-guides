import Link from 'next/link'
import PromptBox from '@/components/chat/PromptBox'

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-start px-4 py-16 sm:px-8">
      {/* Hero */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
          FlashGuides
        </h1>
        <p className="mt-3 max-w-md text-lg text-zinc-500 dark:text-zinc-400">
          Turn any topic, text, or URL into a structured study guide — instantly.
        </p>
      </div>

      {/* Prompt box */}
      <div className="w-full max-w-2xl">
        <PromptBox />
      </div>

      {/* Gallery teaser */}
      <p className="mt-10 text-sm text-zinc-400 dark:text-zinc-500">
        Looking for inspiration?{' '}
        <Link
          href="/gallery"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Browse public guides →
        </Link>
      </p>
    </main>
  )
}
