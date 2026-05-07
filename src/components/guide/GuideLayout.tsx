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
      <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#fef3c7_0,_#fff7ed_26%,_#ffffff_58%,_#f4f4f5_100%)] px-4 py-8 text-black transition-colors dark:bg-[radial-gradient(circle_at_top,_#27272a_0,_#09090b_42%,_#000000_100%)] dark:text-white sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(161,161,170,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(161,161,170,0.08)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,white,transparent_85%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]"
        />
        <div className="relative mx-auto max-w-7xl space-y-8">
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
