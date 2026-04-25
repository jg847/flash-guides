import ReadingProgressBar from './ReadingProgressBar'

interface GuideLayoutProps {
  toc: React.ReactNode
  hero: React.ReactNode
  children: React.ReactNode
}

export default function GuideLayout({ toc, hero, children }: GuideLayoutProps) {
  return (
    <>
      <ReadingProgressBar />
      <main className="min-h-screen bg-zinc-100 px-4 py-8 dark:bg-zinc-950 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {hero}
          <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start">
            <aside>{toc}</aside>
            <div>{children}</div>
          </div>
        </div>
      </main>
    </>
  )
}
