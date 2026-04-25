import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Guide } from '@/generated/prisma'
import { parseGuideContent } from '@/lib/guides/content'
import CollapsibleSection from './CollapsibleSection'
import FlashcardDeck from './FlashcardDeck'
import GuideClientShell from './GuideClientShell'
import GuideHero from './GuideHero'
import GuideLayout from './GuideLayout'
import GuideTOC from './GuideTOC'
import InlineQuiz from './InlineQuiz'
import ShareButton from '@/components/sharing/ShareButton'
import ExportDropdown from '@/components/sharing/ExportDropdown'

const mdxComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      className="font-medium text-indigo-700 underline underline-offset-4 dark:text-indigo-300"
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className="mb-4 text-base leading-8 text-zinc-700 dark:text-zinc-300" />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className="mb-4 list-disc space-y-2 pl-6 text-zinc-700 dark:text-zinc-300" />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className="mb-4 list-decimal space-y-2 pl-6 text-zinc-700 dark:text-zinc-300" />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li {...props} className="pl-1" />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="mb-3 mt-8 text-xl font-semibold text-zinc-900 dark:text-zinc-100" />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      {...props}
      className="mb-4 border-l-4 border-amber-400 pl-4 italic text-zinc-600 dark:text-zinc-400"
    />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="mb-4 overflow-x-auto rounded-2xl bg-zinc-950 p-4 text-sm text-zinc-100"
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      {...props}
      className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
    />
  ),
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // Guide body images come from user-generated markdown and may use arbitrary remote URLs.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      className="my-6 h-auto w-full rounded-2xl border border-zinc-200 dark:border-zinc-800"
      alt={props.alt ?? ''}
    />
  ),
  Flashcards: FlashcardDeck,
  Quiz: InlineQuiz,
}

interface GuideRendererProps {
  guide: Pick<Guide, 'id' | 'slug' | 'title' | 'studyMode' | 'inputType' | 'inputValue' | 'content'>
  isAuthenticated: boolean
  isReadOnly?: boolean
  canShare?: boolean
}

export default async function GuideRenderer({
  guide,
  isAuthenticated,
  isReadOnly = false,
  canShare = false,
}: GuideRendererProps) {
  const parsed = parseGuideContent(guide.content)

  return (
    <GuideLayout
      toc={<GuideTOC items={parsed.toc} />}
      hero={
        <GuideHero
          title={guide.title}
          studyMode={guide.studyMode}
          inputType={guide.inputType}
          inputValue={guide.inputValue}
          media={parsed.heroMedia}
        />
      }
    >
      {canShare && !isReadOnly ? (
        <div className="mb-6 flex justify-end gap-3">
          <ExportDropdown guideId={guide.id} />
          <ShareButton guideId={guide.id} />
        </div>
      ) : null}
      <GuideClientShell
        guideId={guide.id}
        guideSlug={guide.slug}
        isAuthenticated={isAuthenticated}
        isReadOnly={isReadOnly}
      >
        <article className="space-y-6" data-testid="guide-renderer">
          {parsed.intro ? (
            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <MDXRemote source={parsed.intro} components={mdxComponents} />
            </section>
          ) : null}

          {parsed.sections.map((section) => (
            <CollapsibleSection key={section.id} id={section.id} heading={section.heading}>
              <MDXRemote source={section.body} components={mdxComponents} />
            </CollapsibleSection>
          ))}
        </article>
      </GuideClientShell>
    </GuideLayout>
  )
}
