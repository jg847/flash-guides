import { prisma } from '@/lib/db/client'
import GuideCard from '@/components/guides/GuideCard'

export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  const guides = await prisma.guide.findMany({
    where: { isPublic: true, isWatermark: false },
    orderBy: { createdAt: 'desc' },
    take: 24,
    select: {
      id: true,
      slug: true,
      title: true,
      studyMode: true,
      content: true,
      createdAt: true,
    },
  })

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Featured Guides</h1>
        <p className="mt-2 text-gray-500">Curated study guides — no account required to browse.</p>
      </header>

      {guides.length === 0 ? (
        <p data-testid="gallery-empty" className="text-center text-gray-400 py-20 text-lg">
          Check back soon — featured guides are curated weekly.
        </p>
      ) : (
        <div
          data-testid="gallery-grid"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {guides.map((guide) => (
            <GuideCard key={guide.id} {...guide} />
          ))}
        </div>
      )}
    </main>
  )
}
