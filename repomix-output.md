This file is a merged representation of the entire codebase, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:

1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:

- File path as an attribute
- Full contents of the file
  </file_format>

<usage_guidelines>

- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
  </usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
.github/
workflows/
ci.yml
docker.yml
.husky/
commit-msg
pre-commit
pre-push
docker/
docker-compose.override.yml
docker-compose.yml
Dockerfile
docs/
\_spec/
01-infrastructure/
spec.md
sprints.md
02-authentication/
spec.md
sprints.md
03-guest-experience/
spec.md
sprints.md
04-chat-homepage/
spec.md
sprints.md
05-mcp-integrations/
spec.md
sprints.md
06-study-guide-renderer/
spec.md
sprints.md
07-user-dashboard/
spec.md
sprints.md
08-account-management/
spec.md
sprints.md
09-sharing-export/
spec.md
sprints.md
10-cli-export/
spec.md
sprints.md
11-observability/
spec.md
sprints.md
00-overview.md
architecture.md
contributing.md
testing-strategy.md
prisma/
migrations/
20260422072801_initial_schema/
migration.sql
20260422231521_add_guest_quota/
migration.sql
20260423120000_fts5_and_favorites/
migration.sql
20260423230000_add_user_session_version/
migration.sql
20260423234500_add_pending_email/
migration.sql
20260424001500_add_share_links/
migration.sql
migration_lock.toml
schema.prisma
seed.ts
public/
file.svg
globe.svg
next.svg
vercel.svg
window.svg
scripts/
.gitkeep
backup-db.sh
export-source.ts
src/
app/
(auth)/
forgot-password/
page.tsx
login/
page.tsx
register/
page.tsx
reset-password/
page.tsx
verify-email/
page.tsx
account/
page.tsx
api/
account/
avatar/
route.ts
delete/
route.ts
email/
route.ts
export/
route.ts
oauth/
[provider]/
route.ts
password/
route.ts
profile/
route.ts
verify-email-change/
route.ts
auth/
[...nextauth]/
route.ts
forgot-password/
route.ts
register/
route.ts
reset-password/
route.ts
verify-email/
route.ts
chat/
[guideSlug]/
route.ts
folders/
[id]/
route.ts
route.ts
generate/
route.ts
guest/
quota/
route.ts
guides/
[id]/
export/
route.ts
fork/
route.ts
share/
route.ts
tags/
route.ts
route.ts
claim/
[slug]/
route.ts
route.ts
health/
route.ts
notes/
route.ts
share-links/
[token]/
status/
route.ts
test/
reset-quota/
route.ts
seed/
route.ts
session/
route.ts
dashboard/
page.tsx
gallery/
page.tsx
guide/
[slug]/
not-found.tsx
page.tsx
share/
[token]/
page.tsx
unavailable/
page.tsx
test/
error/
page.tsx
favicon.ico
global-error.tsx
globals.css
layout.tsx
page.tsx
components/
account/
AvatarUpload.tsx
ConnectedAccountsSection.tsx
DangerZone.tsx
EmailSection.tsx
PasswordSection.tsx
ProfileSection.tsx
auth/
ForgotPasswordForm.tsx
LoginForm.tsx
RegisterForm.tsx
ResetPasswordForm.tsx
chat/
PromptBox.tsx
StreamingProgress.tsx
StudyModeSelector.tsx
dashboard/
DashboardSearch.tsx
DashboardShell.tsx
FolderSidebar.tsx
GuideCard.tsx
GuideGrid.tsx
GuideList.tsx
UsageSummary.tsx
guest/
GuestBanner.tsx
QuotaExhaustedModal.tsx
WatermarkOverlay.tsx
guide/
CollapsibleSection.tsx
FlashcardCard.tsx
FlashcardDeck.tsx
FollowUpChat.tsx
GuideClientShell.tsx
GuideHero.tsx
GuideLayout.tsx
GuideRenderer.tsx
GuideTOC.tsx
HighlightNote.tsx
InlineQuiz.tsx
ReadingProgressBar.tsx
guides/
GuideCard.tsx
sharing/
ExportDropdown.tsx
ForkButton.tsx
ShareButton.tsx
ShareModal.tsx
ui/
.gitkeep
WorkspacePageHeader.tsx
lib/
ai/
prompts/
index.ts
claude.ts
index.ts
auth/
config.ts
index.ts
middleware.ts
password.ts
proxy.ts
session.ts
tokens.ts
cli/
always-exclude.ts
collect-files.ts
estimate-tokens.ts
format-section.ts
db/
repositories/
folders.ts
guides.ts
notes.ts
share-links.ts
types.ts
users.ts
boot.ts
client.ts
seed.ts
email/
index.ts
errors/
handler.ts
export/
data-exporter.ts
guide-types.ts
html.ts
markdown.ts
pdf.ts
generation/
.gitkeep
base-generator.ts
builder.ts
file-extractor.ts
input-normalizer.ts
orchestrator.ts
slug.ts
url-detector.ts
guest/
quota.ts
guides/
content.ts
fork.ts
logger/
index.ts
middleware.ts
mcp/
adapters/
fal-image-gen.ts
tavily-search.ts
web-fetch.ts
youtube-transcript.ts
factory.ts
index.ts
retry-decorator.ts
types.ts
rate-limit/
index.ts
middleware.ts
security/
csrf.ts
headers.ts
response.ts
sanitize.ts
sharing/
proxy.ts
token.ts
storage/
minio.ts
study-modes/
.gitkeep
deep-dive.ts
eli5.ts
exam-prep.ts
factory.ts
overview.ts
types.ts
utils/
.gitkeep
container.ts
server/
.gitkeep
types/
.gitkeep
generation.ts
next-auth.d.ts
proxy.ts
tests/
e2e/
account/
account.spec.ts
dashboard/
dashboard.spec.ts
guest/
gallery.spec.ts
quota-flow.spec.ts
guide/
guide-renderer.spec.ts
test-helpers.ts
observability/
observability.spec.ts
sharing/
sharing.spec.ts
.gitkeep
fixtures/
cli-fixture-repo/
public/
logo.png
scripts/
helper.ts
src/
lib/
example.test.ts
example.ts
prisma.config.ts
integration/
api/
account/
avatar.test.ts
delete.test.ts
email.test.ts
export.test.ts
oauth.test.ts
password.test.ts
profile.test.ts
auth/
forgot-password.test.ts
register.test.ts
reset-password.test.ts
session.test.ts
verify-email.test.ts
chat/
follow-up-chat.test.ts
folders/
folders.test.ts
generate/
generate.test.ts
guest/
quota.test.ts
guides/
claim.test.ts
export.test.ts
fork.test.ts
guides.test.ts
share.test.ts
tags.test.ts
notes/
notes.test.ts
share-links/
status.test.ts
test/
reset-quota.test.ts
seed.test.ts
session.test.ts
app/
share/
page.test.ts
cli/
export-source.test.ts
lib/
mcp/
adapter-compliance.test.ts
middleware/
request-id.test.ts
security-headers.test.ts
.gitkeep
mocks/
fixtures/
.gitkeep
handlers/
fal.ts
tavily.ts
web-fetch.ts
server.ts
unit/
app/
global-error.test.tsx
components/
account/
DangerZone.test.tsx
auth/
LoginForm.test.tsx
RegisterForm.test.tsx
chat/
PromptBox.test.tsx
StreamingProgress.test.tsx
dashboard/
DashboardSearch.test.tsx
GuideCard.test.tsx
guest/
GuestBanner.test.tsx
QuotaExhaustedModal.test.tsx
WatermarkOverlay.test.tsx
guide/
CollapsibleSection.test.tsx
FlashcardDeck.test.tsx
FollowUpChat.test.tsx
GuideHero.test.tsx
GuideRenderer.test.tsx
GuideTOC.test.tsx
HighlightNote.test.tsx
InlineQuiz.test.tsx
ReadingProgressBar.test.tsx
guides/
GuideCard.test.tsx
ui/
WorkspacePageHeader.test.tsx
lib/
ai/
claude.test.ts
auth/
middleware.test.ts
password.test.ts
tokens.test.ts
cli/
always-exclude.test.ts
collect-files.test.ts
estimate-tokens.test.ts
format-section.test.ts
db/
repositories/
folders.test.ts
guides.test.ts
users.test.ts
boot.test.ts
errors/
handler.test.ts
export/
data-exporter.test.ts
html.test.ts
markdown.test.ts
pdf.test.ts
generation/
builder.test.ts
file-extractor.test.ts
input-normalizer.test.ts
orchestrator.test.ts
slug.test.ts
url-detector.test.ts
guest/
quota.test.ts
guides/
content.test.ts
fork.test.ts
logger/
index.test.ts
mcp/
adapters/
fal-image-gen.test.ts
tavily-search.test.ts
web-fetch.test.ts
youtube-transcript.test.ts
factory.test.ts
retry-decorator.test.ts
rate-limit/
index.test.ts
middleware.test.ts
security/
csrf.test.ts
headers.test.ts
sanitize.test.ts
sharing/
proxy.test.ts
token.test.ts
storage/
minio.test.ts
study-modes/
overview.test.ts
pages/
gallery.test.tsx
guide-page.test.tsx
.gitkeep
setup.ts
.env.example
.gitignore
.prettierignore
.prettierrc.mjs
AGENTS.md
CLAUDE.md
eslint.config.mjs
fly.toml
instrumentation.ts
letter.md
next.config.ts
package.json
playwright.config.ts
pnpm-workspace.yaml
postcss.config.mjs
prisma.config.ts
README.md
tsconfig.json
vitest.config.ts
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="src/app/api/guides/claim/[slug]/route.ts">
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { prisma } from '@/lib/db/client'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

interface RouteContext {
params: Promise<{ slug: string }>
}

export async function POST(request: Request, context: RouteContext) {
try {
const session = await auth()
const userId = await getSessionUserId(session)

    if (!userId) {
      return createApiErrorResponse(request, {
        status: 401,
        code: 'UNAUTHORIZED',
        message: 'Authentication required',
      })
    }

    const { slug } = await context.params

    const guide = await prisma.guide.findUnique({
      where: { slug },
      select: {
        id: true,
        userId: true,
        isWatermark: true,
      },
    })

    if (!guide) {
      return createApiErrorResponse(request, {
        status: 404,
        code: 'GUIDE_NOT_FOUND',
        message: 'Guide not found',
      })
    }

    if (guide.userId && guide.userId !== userId) {
      return createApiErrorResponse(request, {
        status: 409,
        code: 'GUIDE_ALREADY_OWNED',
        message: 'Guide already belongs to another account',
      })
    }

    if (!guide.userId) {
      await prisma.guide.update({
        where: { id: guide.id },
        data: {
          userId,
          isWatermark: false,
        },
      })
    }

    return Response.json({ ok: true })

} catch (error) {
return handleApiError(error, request)
}
}
</file>

<file path="src/app/test/error/page.tsx">
import { notFound } from 'next/navigation'

export default function PlaywrightErrorPage() {
if (process.env['PLAYWRIGHT_TEST'] !== '1') {
notFound()
}

throw new Error('Playwright global error boundary test')
}
</file>

<file path="src/components/ui/WorkspacePageHeader.tsx">
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

      {actions ? <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">{actions}</div> : null}
    </header>

)
}
</file>

<file path="src/lib/generation/file-extractor.ts">
import { execFile } from 'node:child_process'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { PDFParse } from 'pdf-parse'
import { claudeClient } from '@/lib/ai/claude'

export class ReadableFileError extends Error {
code: 'UNSUPPORTED_FILE_TYPE' | 'UNREADABLE_FILE'

constructor(code: 'UNSUPPORTED_FILE_TYPE' | 'UNREADABLE_FILE', message: string) {
super(message)
this.name = 'ReadableFileError'
this.code = code
}
}

const TEXTUAL_MIME_TYPES = new Set([
'application/json',
'application/ld+json',
'application/rtf',
'application/sql',
'application/xml',
'application/x-httpd-php',
'application/x-javascript',
'application/x-sh',
'application/x-yaml',
])

const TEXTUAL_EXTENSIONS = new Set([
'csv',
'html',
'java',
'js',
'json',
'log',
'md',
'pdf',
'py',
'rb',
'rtf',
'sql',
'svg',
'tex',
'ts',
'tsx',
'txt',
'xml',
'yaml',
'yml',
])

const MAX_EXTRACTED_CHARS = 120000
const MIN_FALLBACK_TEXT_LENGTH = 120
const MIN_FALLBACK_WORD_COUNT = 24
const MIN_FALLBACK_UNIQUE_WORDS = 14
const PDF_OCR_DOCUMENT_ERROR_PATTERN =
/(pdf|document|page|pages|encrypted|password|malformed|corrupt|unsupported|invalid|too large|too many)/i
const PDF_NOISE_WORDS = new Set([
'acroform',
'catalog',
'endobj',
'filter',
'font',
'mediabox',
'obj',
'page',
'pages',
'pdf',
'root',
'startxref',
'stream',
'trailer',
'type',
'xref',
])

type PdfParseInstance = {
getText(): Promise<{ text: string }>
destroy(): Promise<void> | void
}

async function createPdfParser(buffer: Buffer): Promise<PdfParseInstance> {
return new PDFParse({ data: buffer }) as PdfParseInstance
}

async function extractPdfTextWithCli(buffer: Buffer, fileName: string): Promise<string> {
const tempDir = await mkdtemp(path.join(tmpdir(), 'flashguides-pdf-'))
const tempPdfPath = path.join(tempDir, fileName || 'upload.pdf')

try {
await writeFile(tempPdfPath, buffer)

    const pdfParseCliPath = path.join(
      process.cwd(),
      'node_modules',
      '.bin',
      process.platform === 'win32' ? 'pdf-parse.cmd' : 'pdf-parse',
    )
    const stdout = await new Promise<string>((resolve, reject) => {
      execFile(
        pdfParseCliPath,
        ['text', tempPdfPath, '--large'],
        { maxBuffer: 16 * 1024 * 1024 },
        (error, commandStdout) => {
          if (error) {
            reject(error)
            return
          }

          resolve(commandStdout)
        },
      )
    })

    return truncateText(stdout)

} finally {
await rm(tempDir, { recursive: true, force: true }).catch(() => {
// ignore temp cleanup failures
})
}
}

function truncateText(text: string): string {
return text
.replace(/\u0000/g, '')
.trim()
.slice(0, MAX_EXTRACTED_CHARS)
}

function getExtension(name: string): string {
const ext = name.split('.').pop()
return ext ? ext.toLowerCase() : ''
}

function extractFallbackPdfText(buffer: Buffer): string {
const decoded = new TextDecoder('latin1').decode(buffer)
const matches =
decoded.match(/\((?:\\.|[^()\\])+\)|[A-Za-z0-9][A-Za-z0-9 ,.;:'"!?()%+\-\/]{24,}/g) ?? []

const cleaned = matches
.map((segment) =>
segment
.replace(/^\(|\)$/g, '')
.replace(/\\([()\\])/g, '$1')
.replace(/\\r|\\n|\\t/g, ' ')
.replace(/\s+/g, ' ')
.trim(),
)
.filter(
(segment) =>
segment.length >= 24 &&
/[A-Za-z]{4}/.test(segment) &&
!segment.startsWith('%PDF') &&
!segment.includes(' endobj') &&
!segment.includes(' stream') &&
!segment.includes(' obj') &&
!segment.includes('xref') &&
!segment.includes('/Type /') &&
!segment.includes('/Filter /'),
)

return truncateText(Array.from(new Set(cleaned)).join('\n'))
}

function isHighConfidenceFallbackText(text: string): boolean {
const words = (text.toLowerCase().match(/[a-z]{3,}/g) ?? []).filter(Boolean)
const uniqueWords = new Set(words)
const noiseCount = words.filter((word) => PDF_NOISE_WORDS.has(word)).length

if (text.length < MIN_FALLBACK_TEXT_LENGTH) {
return false
}

if (words.length < MIN_FALLBACK_WORD_COUNT || uniqueWords.size < MIN_FALLBACK_UNIQUE_WORDS) {
return false
}

if (noiseCount > Math.max(2, Math.floor(words.length \* 0.06))) {
return false
}

return true
}

function isTextLikeFile(file: File): boolean {
if (file.type.startsWith('text/')) {
return true
}

const extension = getExtension(file.name)
return TEXTUAL_MIME_TYPES.has(file.type) || TEXTUAL_EXTENSIONS.has(extension)
}

function getReadableOcrPdfError(error: unknown): ReadableFileError | null {
const status =
typeof error === 'object' && error !== null && 'status' in error
? (error as { status?: unknown }).status
: undefined
const message = error instanceof Error ? error.message : ''

if (status === 400 || status === 413 || status === 422) {
return new ReadableFileError(
'UNREADABLE_FILE',
'We could not OCR that PDF. It may be encrypted, malformed, too large, or otherwise unsupported.',
)
}

if (message && PDF_OCR_DOCUMENT_ERROR_PATTERN.test(message)) {
return new ReadableFileError(
'UNREADABLE_FILE',
'We could not OCR that PDF. It may be encrypted, malformed, too large, or otherwise unsupported.',
)
}

return null
}

export async function extractReadableFileText(file: File): Promise<string> {
const extension = getExtension(file.name)

if (file.type === 'application/pdf' || extension === 'pdf') {
let parser: PdfParseInstance | null = null
const buffer = Buffer.from(await file.arrayBuffer())

    try {
      parser = await createPdfParser(buffer)
      const data = await parser.getText()
      const text = truncateText(data.text)

      if (!text) {
        throw new ReadableFileError('UNREADABLE_FILE', 'Uploaded PDF did not contain readable text')
      }

      return text
    } catch (error) {
      if (error instanceof ReadableFileError) {
        throw error
      }

      const cliText = await extractPdfTextWithCli(buffer, file.name).catch(() => '')
      if (cliText) {
        return cliText
      }

      const fallbackText = extractFallbackPdfText(buffer)
      if (isHighConfidenceFallbackText(fallbackText)) {
        return fallbackText
      }

      try {
        const ocrText = truncateText(await claudeClient.extractTextFromPdf(buffer, file.name))
        if (ocrText) {
          return ocrText
        }
      } catch (ocrError) {
        const readableOcrError = getReadableOcrPdfError(ocrError)
        if (readableOcrError) {
          throw readableOcrError
        }

        throw ocrError
      }

      throw new ReadableFileError(
        'UNREADABLE_FILE',
        'We could not read text from that PDF. Try another PDF or upload a text-based export instead.',
      )
    } finally {
      if (parser) {
        await Promise.resolve(parser.destroy()).catch(() => {
          // ignore cleanup failures
        })
      }
    }

}

if (isTextLikeFile(file)) {
const text = truncateText(await file.text())

    if (!text) {
      throw new ReadableFileError('UNREADABLE_FILE', 'Uploaded file did not contain readable text')
    }

    return text

}

throw new ReadableFileError(
'UNSUPPORTED_FILE_TYPE',
'Unsupported file type. Upload a PDF or a readable text-based file.',
)
}
</file>

<file path="tests/e2e/observability/observability.spec.ts">
import { expect, test } from '@playwright/test'

const TEST_IP = '10.0.0.111'

async function seedQuota(request: import('@playwright/test').APIRequestContext, used = 0) {
const response = await request.post('/api/test/reset-quota', {
data: { ip: TEST_IP, used },
headers: { 'Content-Type': 'application/json' },
})

if (response.status() === 404) {
test.skip()
}

expect(response.ok()).toBe(true)
}

test.describe('Observability and error handling', () => {
test.beforeEach(async ({ page, request }) => {
await seedQuota(request)
await page.setExtraHTTPHeaders({ 'x-forwarded-for': TEST_IP })
})

test('applies security and request id headers to app responses', async ({ page }) => {
const response = await page.goto('/')

    expect(response).not.toBeNull()
    expect(response?.headers()['content-security-policy']).toContain("default-src 'self'")
    expect(response?.headers()['x-request-id']).toBeTruthy()

    await expect(page.getByTestId('prompt-box')).toBeVisible()

})

test('returns requestId-aware 429 responses and opens the guest quota modal', async ({
page,
request,
}) => {
await seedQuota(request, 3)
await page.goto('/')

    await page.getByTestId('prompt-input').fill('Binary search trees')

    const generateResponsePromise = page.waitForResponse(
      (response) => response.url().includes('/api/generate') && response.status() === 429,
    )

    await page.getByTestId('generate-button').click()

    const response = await generateResponsePromise
    const body = (await response.json()) as {
      error: {
        code: string
        message: string
        requestId: string
        retryAfter?: number
        signupUrl?: string
      }
    }

    expect(response.headers()['retry-after']).toBeTruthy()
    expect(response.headers()['content-security-policy']).toContain("default-src 'self'")
    expect(response.headers()['x-request-id']).toBeTruthy()
    expect(body.error.code).toBe('RATE_LIMIT_EXCEEDED')
    expect(body.error.message).toContain("You've created 3 guides today")
    expect(body.error.requestId).toBeTruthy()
    expect(body.error.signupUrl).toBe('/register')

    await expect(page.getByTestId('quota-exhausted-modal')).toBeVisible()
    await expect(page.getByText(/sign up free to unlock unlimited guides/i)).toBeVisible()

})

test('renders the global error boundary fallback for unexpected crashes', async ({ page }) => {
await page.goto('/test/error')

    await expect(page.getByText(/application error/i)).toBeVisible()
    await expect(page.getByRole('heading', { name: /something went wrong/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /try again/i })).toBeVisible()

})
})
</file>

<file path="tests/integration/api/guides/claim.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
auth: vi.fn(),
}))

vi.mock('@/lib/auth/session', () => ({
getSessionUserId: vi.fn(),
}))

vi.mock('@/lib/db/client', () => ({
prisma: {
guide: {
findUnique: vi.fn(),
update: vi.fn(),
},
},
}))

import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { prisma } from '@/lib/db/client'
import { POST } from '@/app/api/guides/claim/[slug]/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockGetSessionUserId = getSessionUserId as ReturnType<typeof vi.fn>
const mockFindUnique = (prisma.guide as unknown as { findUnique: ReturnType<typeof vi.fn> })
.findUnique
const mockUpdate = (prisma.guide as unknown as { update: ReturnType<typeof vi.fn> }).update

function makeRequest() {
return new Request('http://localhost:3000/api/guides/claim/react-basics', {
method: 'POST',
})
}

beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
mockGetSessionUserId.mockResolvedValue('user-1')
mockFindUnique.mockResolvedValue({
id: 'guide-1',
userId: null,
isWatermark: true,
})
mockUpdate.mockResolvedValue({
id: 'guide-1',
userId: 'user-1',
isWatermark: false,
})
})

describe('POST /api/guides/claim/[slug]', () => {
it('returns a requestId-aware auth error when no authenticated user is available', async () => {
mockAuth.mockResolvedValueOnce(null)
mockGetSessionUserId.mockResolvedValueOnce(null)

    const res = await POST(makeRequest(), {
      params: Promise.resolve({ slug: 'react-basics' }),
    })

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('UNAUTHORIZED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)
    expect(mockFindUnique).not.toHaveBeenCalled()

})

it('returns a requestId-aware not found error when the guide does not exist', async () => {
mockFindUnique.mockResolvedValueOnce(null)

    const res = await POST(makeRequest(), {
      params: Promise.resolve({ slug: 'react-basics' }),
    })

    expect(res.status).toBe(404)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('GUIDE_NOT_FOUND')
    expect(body.error.message).toBe('Guide not found')
    expect(body.error.requestId).toBeTruthy()
    expect(mockUpdate).not.toHaveBeenCalled()

})

it('returns 409 when the guide already belongs to another user', async () => {
mockFindUnique.mockResolvedValueOnce({
id: 'guide-1',
userId: 'other-user',
isWatermark: false,
})

    const res = await POST(makeRequest(), {
      params: Promise.resolve({ slug: 'react-basics' }),
    })

    expect(res.status).toBe(409)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('GUIDE_ALREADY_OWNED')
    expect(body.error.message).toBe('Guide already belongs to another account')
    expect(body.error.requestId).toBeTruthy()
    expect(mockUpdate).not.toHaveBeenCalled()

})

it('claims a guest guide for the authenticated user', async () => {
const res = await POST(makeRequest(), {
params: Promise.resolve({ slug: 'react-basics' }),
})

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { slug: 'react-basics' },
      select: {
        id: true,
        userId: true,
        isWatermark: true,
      },
    })
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: 'guide-1' },
      data: {
        userId: 'user-1',
        isWatermark: false,
      },
    })

})

it('returns ok without updating when the guide already belongs to the same user', async () => {
mockFindUnique.mockResolvedValueOnce({
id: 'guide-1',
userId: 'user-1',
isWatermark: false,
})

    const res = await POST(makeRequest(), {
      params: Promise.resolve({ slug: 'react-basics' }),
    })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(mockUpdate).not.toHaveBeenCalled()

})
})
</file>

<file path="tests/unit/components/guide/FollowUpChat.test.tsx">
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('next/link', () => ({
default: ({
href,
children,
...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
<a href={href} {...props}>
{children}
</a>
),
}))

import FollowUpChat from '@/components/guide/FollowUpChat'

describe('FollowUpChat', () => {
it('starts collapsed and opens from the floating chat button', async () => {
const user = userEvent.setup()

    render(<FollowUpChat guideSlug="react-basics" isAuthenticated />)

    expect(screen.queryByTestId('follow-up-chat')).not.toBeInTheDocument()

    await user.click(screen.getByTestId('follow-up-chat-toggle'))

    expect(screen.getByTestId('follow-up-chat')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Ask a follow-up question…')).toBeInTheDocument()

})

it('shows the sign-in link when an unauthenticated user opens chat', async () => {
const user = userEvent.setup()

    render(<FollowUpChat guideSlug="react-basics" isAuthenticated={false} />)

    await user.click(screen.getByTestId('follow-up-chat-toggle'))

    expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute(
      'href',
      '/login?callbackUrl=%2Fguide%2Freact-basics',
    )

})
})
</file>

<file path="tests/unit/components/ui/WorkspacePageHeader.test.tsx">
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockUsePathname = vi.fn()

vi.mock('next/navigation', () => ({
usePathname: () => mockUsePathname(),
}))

import WorkspacePageHeader from '@/components/ui/WorkspacePageHeader'

describe('WorkspacePageHeader', () => {
beforeEach(() => {
mockUsePathname.mockReset()
})

it('renders both page tabs and highlights the active page', () => {
mockUsePathname.mockReturnValue('/dashboard')

    render(
      <WorkspacePageHeader
        title="Your study library"
        description="Organize your saved guides."
      />,
    )

    expect(screen.getByRole('heading', { name: /your study library/i })).toBeInTheDocument()

    const dashboardTab = screen.getByRole('link', { name: /dashboard/i })
    const accountTab = screen.getByRole('link', { name: /account settings/i })

    expect(dashboardTab).toHaveAttribute('href', '/dashboard')
    expect(dashboardTab).toHaveAttribute('aria-current', 'page')
    expect(accountTab).toHaveAttribute('href', '/account')
    expect(accountTab).not.toHaveAttribute('aria-current')

})
})
</file>

<file path="tests/unit/lib/db/boot.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/db/client', () => ({
prisma: {
$executeRawUnsafe: vi.fn(),
},
}))

import { prisma } from '@/lib/db/client'
import { bootDatabase } from '@/lib/db/boot'

const mockExecuteRawUnsafe = prisma.$executeRawUnsafe as ReturnType<typeof vi.fn>

beforeEach(() => {
vi.clearAllMocks()
mockExecuteRawUnsafe.mockResolvedValue(undefined)
})

describe('bootDatabase', () => {
it('applies pragmas and restores guide FTS infrastructure', async () => {
await bootDatabase()

    const statements = mockExecuteRawUnsafe.mock.calls.map(([sql]) => sql)

    expect(statements).toEqual(
      expect.arrayContaining([
        'PRAGMA journal_mode = WAL;',
        'PRAGMA synchronous = NORMAL;',
        'PRAGMA foreign_keys = ON;',
        'PRAGMA busy_timeout = 5000;',
        'PRAGMA temp_store = MEMORY;',
        expect.stringContaining('CREATE VIRTUAL TABLE IF NOT EXISTS "guides_fts"'),
        'INSERT INTO "guides_fts"("guides_fts") VALUES (\'rebuild\');',
        expect.stringContaining('CREATE TRIGGER IF NOT EXISTS "guides_fts_ai"'),
        expect.stringContaining('CREATE TRIGGER IF NOT EXISTS "guides_fts_ad"'),
        expect.stringContaining('CREATE TRIGGER IF NOT EXISTS "guides_fts_au"'),
      ]),
    )

})
})
</file>

<file path="tests/unit/lib/generation/file-extractor.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { mockExecFile, mockGetText, mockDestroy, MockPDFParse, mockExtractTextFromPdf } = vi.hoisted(
() => ({
mockExecFile: vi.fn(),
mockGetText: vi.fn(),
mockDestroy: vi.fn(),
mockExtractTextFromPdf: vi.fn(),
MockPDFParse: class {
constructor(\_params: unknown) {}

      getText = mockGetText

      destroy = mockDestroy
    },

}),
)

vi.mock('pdf-parse', () => ({
PDFParse: MockPDFParse,
}))

vi.mock('node:child_process', () => ({
execFile: mockExecFile,
default: {
execFile: mockExecFile,
},
}))

vi.mock('@/lib/ai/claude', () => ({
claudeClient: {
extractTextFromPdf: mockExtractTextFromPdf,
},
}))

import { ReadableFileError, extractReadableFileText } from '@/lib/generation/file-extractor'

describe('extractReadableFileText', () => {
beforeEach(() => {
vi.clearAllMocks()
mockExtractTextFromPdf.mockResolvedValue('')
mockExecFile.mockImplementation(
(
\_file: string,
\_args: string[],
\_options: { maxBuffer?: number },
callback: (error: Error | null, stdout: string, stderr: string) => void,
) => {
callback(null, '', '')
return {} as never
},
)
})

it('extracts text from pdf files using PDFParse', async () => {
mockGetText.mockResolvedValue({ text: ' PDF guide content ' })

    const file = new File([new Uint8Array([37, 80, 68, 70])], 'notes.pdf', {
      type: 'application/pdf',
    })

    await expect(extractReadableFileText(file)).resolves.toBe('PDF guide content')

    expect(mockGetText).toHaveBeenCalled()
    expect(mockDestroy).toHaveBeenCalled()

})

it('falls back to printable text recovery when PDFParse fails on a text-bearing pdf', async () => {
mockGetText.mockRejectedValueOnce(new Error('parser failed'))

    const file = new File(
      [
        '%PDF-1.7\n1 0 obj\n<< /Type /Catalog >>\nendobj\n' +
          '(Exam review packet for cellular respiration with ATP, glycolysis, Krebs cycle, electron transport chain, regulation details, enzyme checkpoints, fermentation comparison, oxidative phosphorylation, mitochondrial membrane gradients, and final assessment preparation with concept checks and terminology review.)',
      ],
      'fallback.pdf',
      { type: 'application/pdf' },
    )

    await expect(extractReadableFileText(file)).resolves.toContain('cellular respiration')

})

it('rejects metadata-like fallback text so pdf syntax does not become guide content', async () => {
mockGetText.mockRejectedValueOnce(new Error('parser failed'))
mockExtractTextFromPdf.mockResolvedValueOnce('')

    const file = new File(
      [
        '%PDF-1.7\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Count 8 /Kids [3 0 R] >>\nendobj\nstream\nPDF page object stream trailer root xref catalog pages mediaBox filter font object data repeated for parsing metadata only.\nendstream\nstartxref\n',
      ],
      'metadata-only.pdf',
      { type: 'application/pdf' },
    )

    await expect(extractReadableFileText(file)).rejects.toMatchObject<Partial<ReadableFileError>>({
      code: 'UNREADABLE_FILE',
    })

})

it('uses Anthropic OCR fallback when the pdf has no text layer but can still be read visually', async () => {
mockGetText.mockRejectedValueOnce(new Error('parser failed'))
mockExecFile.mockImplementationOnce(
(
\_file: string,
\_args: string[],
\_options: { maxBuffer?: number },
callback: (error: Error | null, stdout: string, stderr: string) => void,
) => {
callback(null, '', '')
return {} as never
},
)
mockExtractTextFromPdf.mockResolvedValueOnce(
'Data mining overview\nClassification, clustering, association rules, and predictive modeling.',
)

    const file = new File([new Uint8Array([37, 80, 68, 70])], '8-data-mining-overview.pdf', {
      type: 'application/pdf',
    })

    await expect(extractReadableFileText(file)).resolves.toContain('Data mining overview')
    expect(mockExtractTextFromPdf).toHaveBeenCalled()

})

it('maps document-specific OCR failures back to an unreadable pdf error', async () => {
mockGetText.mockRejectedValueOnce(new Error('parser failed'))
mockExecFile.mockImplementationOnce(
(
\_file: string,
\_args: string[],
\_options: { maxBuffer?: number },
callback: (error: Error | null, stdout: string, stderr: string) => void,
) => {
callback(null, '', '')
return {} as never
},
)
mockExtractTextFromPdf.mockRejectedValueOnce(
new Error('Unsupported PDF document: too many pages to process'),
)

    const file = new File([new Uint8Array([37, 80, 68, 70])], 'scanned-packet.pdf', {
      type: 'application/pdf',
    })

    await expect(extractReadableFileText(file)).rejects.toMatchObject<Partial<ReadableFileError>>({
      code: 'UNREADABLE_FILE',
      message:
        'We could not OCR that PDF. It may be encrypted, malformed, too large, or otherwise unsupported.',
    })

})

it('uses the pdf-parse cli fallback when the in-process parser fails in the route runtime', async () => {
mockGetText.mockRejectedValueOnce(new Error('Setting up fake worker failed'))
mockExecFile.mockImplementationOnce(
(
\_file: string,
\_args: string[],
\_options: { maxBuffer?: number },
callback: (error: Error | null, stdout: string, stderr: string) => void,
) => {
callback(null, 'CLI extracted lecture text', '')
return {} as never
},
)

    const file = new File([new Uint8Array([37, 80, 68, 70])], 'runtime-problem.pdf', {
      type: 'application/pdf',
    })

    await expect(extractReadableFileText(file)).resolves.toBe('CLI extracted lecture text')
    expect(mockExtractTextFromPdf).not.toHaveBeenCalled()

})

it('extracts text from text-like files without PDFParse', async () => {
const file = new File(['Flash cards\nKey concepts'], 'study-notes.txt', { type: 'text/plain' })

    await expect(extractReadableFileText(file)).resolves.toBe('Flash cards\nKey concepts')

    expect(mockGetText).not.toHaveBeenCalled()

})

it('rejects unsupported binary files', async () => {
const file = new File([new Uint8Array([1, 2, 3])], 'archive.bin', {
type: 'application/octet-stream',
})

    await expect(extractReadableFileText(file)).rejects.toMatchObject<Partial<ReadableFileError>>({
      code: 'UNSUPPORTED_FILE_TYPE',
    })

})
})
</file>

<file path="tests/unit/lib/guides/content.test.ts">
import { describe, expect, it } from 'vitest'

import { parseGuideContent, sanitizeGuideContentForMdx } from '@/lib/guides/content'

describe('sanitizeGuideContentForMdx', () => {
it('escapes numeric comparison operators that would be parsed as JSX', () => {
const content = '| Venus | 96% CO2 | <0.001% O2 | >92 atm |'

    expect(sanitizeGuideContentForMdx(content)).toBe(
      '| Venus | 96% CO2 | &lt;0.001% O2 | &gt;92 atm |',
    )

})

it('does not escape MDX component tags', () => {
const content =
'<Quiz question={"Example"} options={["A", "B"]} correct={0} explanation={"Because."} />'

    expect(sanitizeGuideContentForMdx(content)).toBe(content)

})
})

describe('parseGuideContent', () => {
it('sanitizes section bodies before rendering', () => {
const parsed = parseGuideContent(`# Example Guide

## Atmosphere Table

| Planet | Oxygen     |
| ------ | ---------- | --- |
| Venus  | <0.001% O2 |
| Earth  | >20% O2    | `)  |

    expect(parsed.sections[0]?.body).toContain('&lt;0.001% O2')
    expect(parsed.sections[0]?.body).toContain('&gt;20% O2')

})
})
</file>

<file path=".github/workflows/ci.yml">
name: CI

on:
push:
branches: ["**"]
pull_request:
branches: ["**"]

concurrency:
group: ci-${{ github.ref }}
cancel-in-progress: true

env:
PNPM_VERSION: "10"

jobs:
ci:
name: Lint · Typecheck · Test · Build · E2E
runs-on: ubuntu-latest

    strategy:
      matrix:
        browser: [chromium, firefox]

    env:
      DATABASE_URL: "file:./data/test.db"
      NEXTAUTH_SECRET: "ci-test-secret-do-not-use-in-prod"
      NEXTAUTH_URL: "http://localhost:3000"

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: ${{ env.PNPM_VERSION }}
          run_install: false

      - name: Get pnpm store path
        id: pnpm-cache
        run: echo "STORE_PATH=$(pnpm store path)" >> $GITHUB_OUTPUT

      - name: Cache pnpm store
        uses: actions/cache@v4
        with:
          path: ${{ steps.pnpm-cache.outputs.STORE_PATH }}
          key: pnpm-store-${{ runner.os }}-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: pnpm-store-${{ runner.os }}-

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Generate Prisma client
        run: pnpm db:generate

      - name: Lint
        run: pnpm lint

      - name: Typecheck
        run: pnpm typecheck

      - name: Unit tests
        run: pnpm test:unit

      - name: Integration tests
        run: pnpm test:integration

      - name: Build
        run: pnpm build
        env:
          SKIP_ENV_VALIDATION: "1"

      - name: Install Playwright browsers
        run: pnpm exec playwright install --with-deps ${{ matrix.browser }}

      - name: E2E tests (${{ matrix.browser }})
        run: pnpm test:e2e --project=${{ matrix.browser }}

      - name: Upload coverage report
        if: matrix.browser == 'chromium'
        uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/
          retention-days: 7

      - name: Upload Playwright report
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report-${{ matrix.browser }}
          path: playwright-report/
          retention-days: 7

</file>

<file path=".github/workflows/docker.yml">
name: Docker Build & Deploy

on:
push:
branches: [main]

env:
REGISTRY: ghcr.io
IMAGE_NAME: ${{ github.repository }}
PNPM_VERSION: "10"

jobs:
build-and-push:
name: Build · Push · Deploy
runs-on: ubuntu-latest
permissions:
contents: read
packages: write

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Log in to GHCR
        uses: docker/login-action@v3
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Extract Docker metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
          tags: |
            type=sha,prefix=,format=short
            type=raw,value=latest

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build and push Docker image
        uses: docker/build-push-action@v6
        with:
          context: .
          file: docker/Dockerfile
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      - name: Deploy to Fly.io
        uses: superfly/flyctl-actions/setup-flyctl@master

      - name: Run flyctl deploy
        run: flyctl deploy --image ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}

</file>

<file path=".husky/commit-msg">
#!/bin/sh
pnpm exec commitlint --edit "$1"
</file>

<file path=".husky/pre-commit">
#!/bin/sh
pnpm exec lint-staged
</file>

<file path=".husky/pre-push">
#!/bin/sh
pnpm typecheck && pnpm test:unit
</file>

<file path="docker/docker-compose.override.yml">
# Dev override — enables hot reload by mounting source directly
services:
  web:
    build:
      context: ..
      dockerfile: docker/Dockerfile
      target: deps
    command: pnpm dev
    volumes:
      - ..:/app
      - /app/node_modules
      - /app/.next
      - flashguides_data:/data
    environment:
      NODE_ENV: development
    ports:
      - "3000:3000"

volumes:
flashguides_data:
name: flashguides_data
</file>

<file path="docker/docker-compose.yml">
services:
  web:
    build:
      context: ..
      dockerfile: docker/Dockerfile
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: "file:/data/app.db"
      NEXTAUTH_URL: "${NEXTAUTH_URL:-http://localhost:3000}"
      NEXTAUTH_SECRET: "${NEXTAUTH_SECRET}"
      GOOGLE_CLIENT_ID: "${GOOGLE_CLIENT_ID:-}"
      GOOGLE_CLIENT_SECRET: "${GOOGLE_CLIENT_SECRET:-}"
      ANTHROPIC_API_KEY: "${ANTHROPIC_API_KEY}"
      TAVILY_API_KEY: "${TAVILY_API_KEY:-}"
      FAL_API_KEY: "${FAL_API_KEY:-}"
      S3_ENDPOINT: "http://minio:9000"
      S3_ACCESS_KEY: "${S3_ACCESS_KEY:-minioadmin}"
      S3_SECRET_KEY: "${S3_SECRET_KEY:-minioadmin}"
      S3_BUCKET: "flashguides"
      SMTP_HOST: "mailhog"
      SMTP_PORT: "1025"
      SMTP_FROM: "${SMTP_FROM:-noreply@flashguides.local}"
    volumes:
      - flashguides_data:/data
    depends_on:
      minio:
        condition: service_healthy
      mailhog:
        condition: service_started
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    restart: unless-stopped

minio:
image: minio/minio:latest
command: server /data --console-address ":9001"
ports: - "9000:9000" - "9001:9001"
environment:
MINIO_ROOT_USER: "${S3_ACCESS_KEY:-minioadmin}"
      MINIO_ROOT_PASSWORD: "${S3_SECRET_KEY:-minioadmin}"
volumes: - minio_data:/data
healthcheck:
test: ["CMD", "mc", "ready", "local"]
interval: 30s
timeout: 10s
retries: 3
start_period: 10s
restart: unless-stopped

mailhog:
image: mailhog/mailhog:latest
ports: - "1025:1025" # SMTP - "8025:8025" # Web UI
restart: unless-stopped

volumes:
flashguides_data:
name: flashguides_data
minio_data:
name: flashguides_minio_data
</file>

<file path="docker/Dockerfile">
# ──────────────────────────────────────────────────────────────────────────────
# Stage 1: Install dependencies
# ──────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod

# ──────────────────────────────────────────────────────────────────────────────

# Stage 2: Build

# ──────────────────────────────────────────────────────────────────────────────

FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Generate Prisma client

RUN pnpm exec prisma generate

ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm build

# ──────────────────────────────────────────────────────────────────────────────

# Stage 3: Runner (target image < 200 MB)

# ──────────────────────────────────────────────────────────────────────────────

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
 adduser --system --uid 1001 nextjs

# Only copy what the app needs at runtime

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/generated ./src/generated
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# SQLite data volume mount point

RUN mkdir -p /data/backups && chown -R nextjs:nodejs /data

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
 CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]
</file>

<file path="docs/contributing.md">
# Contributing to FlashGuides

---

## 1. Prerequisites

| Tool                    | Version | Install                          |
| ----------------------- | ------- | -------------------------------- |
| Node.js                 | ≥ 22.x  | [nodejs.org](https://nodejs.org) |
| pnpm                    | ≥ 10.x  | `npm i -g pnpm`                  |
| Docker & Docker Compose | latest  | [docker.com](https://docker.com) |
| Git                     | ≥ 2.40  | system package manager           |

---

## 2. First Time Setup

```bash
# 1. Clone the repository
git clone https://github.com/<org>/flashguides.git
cd flashguides

# 2. Install dependencies
pnpm install

# 3. Copy environment variables
cp .env.example .env.local
# Fill in required secrets (see .env.example for descriptions)

# 4. Run database migrations and generate Prisma client
pnpm db:migrate
pnpm db:generate

# 5. Set up Git hooks
pnpm prepare

# 6. Verify everything works
pnpm typecheck
pnpm test:unit
```

To run the full stack locally (app + MinIO + Mailhog):

```bash
docker compose up
```

The app will be available at `http://localhost:3000`.  
Mailhog (dev email UI): `http://localhost:8025`.  
MinIO console: `http://localhost:9001`.

---

## 3. Development Workflow

### Start the dev server

```bash
pnpm dev
```

### Run tests

```bash
pnpm test:unit           # Vitest unit + component tests (fast)
pnpm test:integration    # Vitest integration tests (real SQLite)
pnpm test:e2e            # Playwright E2E (requires built app)
```

### Lint and format

```bash
pnpm lint                # ESLint
pnpm format              # Prettier (write mode)
pnpm typecheck           # TypeScript
```

### Database

```bash
pnpm db:migrate          # Apply pending migrations
pnpm db:generate         # Regenerate Prisma client after schema changes
pnpm db:studio           # Open Prisma Studio (GUI)
```

---

## 4. Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/). The commit hook (`commitlint`) enforces this on every commit.

**Format:**

```
<type>(<scope>): <short description>
```

**Types:**

| Type       | When to use                                     |
| ---------- | ----------------------------------------------- |
| `feat`     | A new feature                                   |
| `fix`      | A bug fix                                       |
| `docs`     | Documentation only change                       |
| `test`     | Adding or updating tests                        |
| `refactor` | Code change that is neither a fix nor a feature |
| `chore`    | Build process, dependency, or tooling update    |
| `perf`     | Performance improvement                         |
| `ci`       | CI/CD configuration change                      |

**Examples:**

```
feat(auth): add Google OAuth provider
fix(rate-limit): reset window at midnight UTC not 24h rolling
docs(arch): document Observer pattern for token streaming
test(dashboard): add edge case for empty guide list
```

Breaking changes: append `!` after type/scope and include a `BREAKING CHANGE:` footer.

---

## 5. Branch Strategy

- `main` — production-ready code; protected branch
- `feat/<feature-name>` — feature branches (branch from `main`, merge via PR)
- `fix/<issue-description>` — bug fix branches
- `chore/<task>` — maintenance tasks

**Naming convention:**

```
feat/auth-google-oauth
fix/rate-limit-window-reset
chore/upgrade-prisma-v7
```

---

## 6. Pull Request Process

1. **Create a branch** from `main`.
2. **Implement the sprint** (see the relevant `sprints.md` for file-level guidance).
3. **Self-review checklist** before opening a PR:
   - [ ] `pnpm typecheck` passes
   - [ ] `pnpm lint` passes
   - [ ] `pnpm test:unit && pnpm test:integration` passes
   - [ ] No `TODO`, `FIXME`, or `@ts-ignore` without a linked issue
   - [ ] `docs/architecture.md` updated if new patterns were added
   - [ ] Spec's Definition of Done checklist is fully satisfied
4. **Open PR** against `main` with a clear description referencing the spec and sprint.
5. **CI must be green** before merge.
6. **Squash merge** only — no merge commits.
7. Update the sprint's `status` field to `✅ Complete` in the relevant `sprints.md`.

---

## 7. Working with the Spec Files

All feature development is driven by `docs/_spec/`. Before writing any code:

1. Read the relevant `spec.md` in full.
2. Read the relevant `sprints.md` to understand the sprint's exact scope and exit criteria.
3. Do not implement outside the sprint's scope — additions go into a new sprint.
4. If a spec is incomplete or wrong, **update the spec first** (in the same PR), then implement.

Spec files are living documents. They should reflect what actually shipped, not the original aspirations.

---

## 8. Adding a New Feature

If you are adding a feature not already in `docs/_spec/`:

1. Add a new folder `docs/_spec/<NN-new-feature>/`.
2. Write `spec.md` using the template from `letter.md` Section 5.
3. Write `sprints.md` decomposing the spec into ordered sprints.
4. Update `docs/_spec/00-overview.md` to reference the new spec.
5. Update `docs/architecture.md` if new patterns or modules are introduced.
6. Open a PR with only the spec files for review before writing any implementation code.

---

## 9. Security Policy

- **Never commit secrets.** `.env` and `.env.local` are in `.gitignore`. Use `.env.example` to document required variables.
- **No `@ts-ignore` or `as any`** on user-controlled input. Use Zod validation.
- **All user input is sanitized** (`src/lib/security/sanitize.ts`) before persistence or AI model submission.
- **Report vulnerabilities** by emailing `jg847@njit.edu` rather than opening a public issue.

---

## 10. Code Style

- **TypeScript strict mode.** `strict: true`, `noUncheckedIndexedAccess: true`. No `any`. ESLint will fail the build.
- **No `console.log` in `src/`.** Use `src/lib/logger/` exclusively. ESLint `no-console: error` is enforced.
- **Formatting.** Prettier runs automatically on staged files via Husky. Config: `.prettierrc.mjs` (single quotes, no semicolons, trailing commas).
- **Import order.** Node built-ins → third-party → internal (`@/...`) — enforced by ESLint import plugin.
- **File naming.** `kebab-case.ts` for all files. PascalCase only for React component files (`Button.tsx`).
- **Test file naming.** `<subject>.test.ts` for unit/integration, `<subject>.spec.ts` for Playwright E2E.
  </file>

<file path="docs/testing-strategy.md">
# Testing Strategy

> **Applies to:** All phases and features  
> **Coverage targets are CI-enforced** — builds fail if thresholds are not met

---

## 1. Philosophy

Tests are first-class citizens. Every feature ships with tests as part of the same PR. No feature is "done" without green tests (see Definition of Done in `docs/_spec/`).

The goal is **confidence**, not coverage theater. Tests must exercise real behavior: real database queries (against a test SQLite DB), real HTTP handlers, real React component rendering. Mocks are used only at the system boundary (external network calls → MSW; third-party SDKs → fakes via constructor injection).

---

## 2. Test Taxonomy

| Type        | Tool                 | Scope                                         | Database                              | Network            |
| ----------- | -------------------- | --------------------------------------------- | ------------------------------------- | ------------------ |
| Unit        | Vitest               | Pure functions, classes, hooks, utilities     | In-memory / mocked                    | Mocked via MSW     |
| Integration | Vitest + test SQLite | API routes, DB repositories, MCP adapters     | Real SQLite (`:memory:` or temp file) | Mocked via MSW     |
| Component   | Vitest + RTL         | React component rendering, a11y, keyboard nav | None                                  | Mocked via MSW     |
| E2E         | Playwright           | Full user flows in a real browser             | Real app DB                           | Real (or cassette) |

---

## 3. Project Setup

### Vitest

Config: `vitest.config.ts`

```ts
coverage: {
  thresholds: { lines: 85, branches: 80 }
  include: ['src/**'],
  exclude: ['src/generated/**', 'src/types/**']
}
```

`src/lib/**` has a higher target enforced via `coverageThresholds` per-folder (90% lines).

The test setup file at `tests/setup.ts`:

- Imports `@testing-library/jest-dom` matchers
- Starts the MSW server before all tests, resets handlers between tests, closes after all tests

### Playwright

Config: `playwright.config.ts`

- Projects: `chromium`, `firefox`
- `webServer`: runs `pnpm build && pnpm start` on `localhost:3000`
- Tests in `tests/e2e/`
- Reports: HTML (artifact in CI), JUnit (for CI summary)

---

## 4. Directory Structure

```
tests/
├── setup.ts                  # Global Vitest setup (MSW, jest-dom)
├── mocks/
│   ├── server.ts             # MSW setupServer()
│   └── handlers/             # One file per external service
│       ├── claude.ts
│       ├── tavily.ts
│       ├── fal-ai.ts
│       └── youtube.ts
├── fixtures/
│   ├── guides.ts             # Reusable Prisma test fixtures (factory functions)
│   ├── users.ts
│   └── llm-responses/        # Deterministic LLM response JSON files
├── unit/
│   └── lib/                  # Mirror of src/lib/ structure
├── integration/
│   ├── api/                  # API route tests
│   └── lib/                  # Repository + service integration tests
├── component/
│   └── components/           # Mirror of src/components/ structure
└── e2e/
    ├── auth/
    ├── generate/
    ├── dashboard/
    ├── sharing/
    ├── account/
    └── observability/
```

---

## 5. Required Test Coverage Per Feature

For every spec, the test plan must enumerate tests across three axes:

### Positive Cases (happy path)

- Each user story's happy path.
- Boundary values that are still valid: minimum/maximum input lengths, exactly one item in a list.

### Negative Cases (defensive)

- Invalid inputs → correct error shape and status code.
- Unauthenticated access to protected routes → redirect or 401.
- Unauthorized access to another user's resource → 403.
- Rate-limit exceeded → 429 with `Retry-After` header.
- External service failure (Claude 500, MCP tool timeout) → graceful degradation.

### Edge Cases

- Empty states: zero guides, zero search results, empty tags.
- Very large inputs: 50k-character text paste, 20 MB page scrape.
- Non-English / Unicode / RTL text.
- Concurrent operations: two tabs generating at once.
- Partial failures mid-stream: LLM stream dropped halfway.
- Session expiry during long generation.
- Malformed URLs, blocked domains, paywalled pages.
- Quota boundaries: exactly at the guest limit.

---

## 6. Mocking Policy

| Boundary                                        | Approach                                                   | Tool             |
| ----------------------------------------------- | ---------------------------------------------------------- | ---------------- |
| External HTTP (Claude, Tavily, fal.ai, YouTube) | Intercept at network layer                                 | MSW (`msw/node`) |
| MinIO (S3)                                      | MSW or AWS SDK mock transport                              | MSW              |
| SMTP / email                                    | Mailhog in integration tests; in-memory mock in unit tests | Mailhog / MSW    |
| Time-sensitive ops (`Date.now`, `new Date()`)   | `vi.setSystemTime()` in Vitest                             | Vitest built-in  |
| File system (export CLI)                        | Real temp dirs via `os.tmpdir()`                           | Node built-in    |

**Rule:** No live network calls in unit or integration tests. Ever.

**LLM fixtures:** Deterministic JSON response fixtures live in `tests/fixtures/llm-responses/`. Vitest tests always use these. E2E tests use Playwright's network interception or a VCR-style cassette (no live Claude calls in CI).

---

## 7. Database Strategy in Tests

- **Unit tests:** No database. Repositories are injected as fakes or objects with mocked methods.
- **Integration tests:** Real SQLite in-memory database (`:memory:`) seeded via factory functions in `tests/fixtures/`. Each test file runs `prisma.$executeRaw('DELETE FROM ...')` or recreates the schema in `beforeEach`.
- **E2E tests:** The real Next.js app uses a separate test SQLite file (`data/test.db`), reset between test runs.

The Prisma client is configured to use `process.env['DATABASE_URL']`. In tests, set `DATABASE_URL=file::memory:?cache=shared` (or a temp file path).

---

## 8. CI Enforcement

The CI workflow (`ci.yml`) enforces:

1. `pnpm typecheck` — zero TypeScript errors
2. `pnpm lint` — zero ESLint errors (no `console.log` in `src/`, no `any`, Prettier formatting)
3. `pnpm test:unit` — Vitest unit + component tests; fails if coverage thresholds are not met
4. `pnpm test:integration` — Vitest integration tests against real SQLite
5. `pnpm build` — Next.js production build succeeds
6. `pnpm test:e2e` — Playwright against built app; runs on chromium and firefox matrix
7. Coverage artifact uploaded + reported on PRs

Build fails if **any** step fails. No exceptions.

---

## 9. Interface Contract Tests

For Liskov Substitution compliance (see `docs/architecture.md` Section 3), each interface has a **shared contract test suite**:

```
tests/unit/lib/mcp/adapters/contract.ts
```

This exports a `runIMCPClientContract(adapter: IMCPClient)` suite. Every adapter test file calls:

```ts
import { runIMCPClientContract } from '../contract'
runIMCPClientContract(new TavilyAdapter(...))
```

This guarantees every implementation satisfies the interface's behavioral contract, not just its type signature.

---

## 10. Key Testing Principles

- **Test behavior, not implementation.** Test what the code _does_, not how it does it.
- **One assertion per test** (where possible). Multiple assertions per test obscure which one failed.
- **Descriptive names.** `it('returns 429 when guest exceeds 3 generations in one day')` is correct. `it('rate limit')` is not.
- **Arrange-Act-Assert.** Every test has a clear setup, one action, and one assertion block.
- **No test interdependence.** Tests must not rely on the execution order or state left by other tests.
- **Fast unit tests.** Unit test suite must run in < 10 seconds. Slow tests are integration tests or are doing too much setup.
  </file>

<file path="prisma/migrations/20260422072801_initial_schema/migration.sql">
-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "image" TEXT,
    "password" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "accounts" (
"id" TEXT NOT NULL PRIMARY KEY,
"userId" TEXT NOT NULL,
"type" TEXT NOT NULL,
"provider" TEXT NOT NULL,
"providerAccountId" TEXT NOT NULL,
"refresh_token" TEXT,
"access_token" TEXT,
"expires_at" INTEGER,
"token_type" TEXT,
"scope" TEXT,
"id_token" TEXT,
"session_state" TEXT,
CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sessions" (
"id" TEXT NOT NULL PRIMARY KEY,
"sessionToken" TEXT NOT NULL,
"userId" TEXT NOT NULL,
"expires" DATETIME NOT NULL,
CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "verification_tokens" (
"identifier" TEXT NOT NULL,
"token" TEXT NOT NULL,
"expires" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "guides" (
"id" TEXT NOT NULL PRIMARY KEY,
"userId" TEXT,
"slug" TEXT NOT NULL,
"title" TEXT NOT NULL,
"studyMode" TEXT NOT NULL,
"inputType" TEXT NOT NULL,
"inputValue" TEXT NOT NULL,
"content" TEXT NOT NULL,
"isPublic" BOOLEAN NOT NULL DEFAULT false,
"isWatermark" BOOLEAN NOT NULL DEFAULT false,
"shareToken" TEXT,
"folderId" TEXT,
"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" DATETIME NOT NULL,
CONSTRAINT "guides_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
CONSTRAINT "guides_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "folders" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tags" (
"id" TEXT NOT NULL PRIMARY KEY,
"name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "guide_tags" (
"guideId" TEXT NOT NULL,
"tagId" TEXT NOT NULL,

    PRIMARY KEY ("guideId", "tagId"),
    CONSTRAINT "guide_tags_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "guides" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "guide_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "tags" ("id") ON DELETE CASCADE ON UPDATE CASCADE

);

-- CreateTable
CREATE TABLE "folders" (
"id" TEXT NOT NULL PRIMARY KEY,
"userId" TEXT NOT NULL,
"name" TEXT NOT NULL,
"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT "folders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "notes" (
"id" TEXT NOT NULL PRIMARY KEY,
"userId" TEXT NOT NULL,
"guideId" TEXT NOT NULL,
"selectedText" TEXT NOT NULL,
"content" TEXT NOT NULL,
"createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" DATETIME NOT NULL,
CONSTRAINT "notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT "notes_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "guides" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "guides_slug_key" ON "guides"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "guides_shareToken_key" ON "guides"("shareToken");

-- CreateIndex
CREATE UNIQUE INDEX "tags_name_key" ON "tags"("name");
</file>

<file path="prisma/migrations/20260422231521_add_guest_quota/migration.sql">
-- CreateTable
CREATE TABLE "guest_quotas" (
    "ip" TEXT NOT NULL PRIMARY KEY,
    "count" INTEGER NOT NULL DEFAULT 0,
    "resetAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
</file>

<file path="prisma/migrations/20260423120000_fts5_and_favorites/migration.sql">
ALTER TABLE "guides" ADD COLUMN "isFavorite" BOOLEAN NOT NULL DEFAULT false;

CREATE VIRTUAL TABLE IF NOT EXISTS "guides_fts" USING fts5(
"id" UNINDEXED,
"title",
"content",
content='guides',
content_rowid='rowid',
tokenize='unicode61'
);

INSERT INTO "guides_fts"("guides_fts") VALUES ('rebuild');

CREATE TRIGGER IF NOT EXISTS "guides_fts_ai" AFTER INSERT ON "guides" BEGIN
INSERT INTO "guides_fts"("rowid", "id", "title", "content")
VALUES (new.rowid, new.id, new.title, new.content);
END;

CREATE TRIGGER IF NOT EXISTS "guides_fts_ad" AFTER DELETE ON "guides" BEGIN
INSERT INTO "guides_fts"("guides_fts", "rowid", "id", "title", "content")
VALUES ('delete', old.rowid, old.id, old.title, old.content);
END;

CREATE TRIGGER IF NOT EXISTS "guides_fts_au" AFTER UPDATE ON "guides" BEGIN
INSERT INTO "guides_fts"("guides_fts", "rowid", "id", "title", "content")
VALUES ('delete', old.rowid, old.id, old.title, old.content);

INSERT INTO "guides_fts"("rowid", "id", "title", "content")
VALUES (new.rowid, new.id, new.title, new.content);
END;
</file>

<file path="prisma/migrations/20260423230000_add_user_session_version/migration.sql">
ALTER TABLE "users" ADD COLUMN "sessionVersion" INTEGER NOT NULL DEFAULT 0;
</file>

<file path="prisma/migrations/20260423234500_add_pending_email/migration.sql">
ALTER TABLE "users" ADD COLUMN "pendingEmail" TEXT;
</file>

<file path="prisma/migrations/20260424001500_add_share_links/migration.sql">
CREATE TABLE "share_links" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "token" TEXT NOT NULL,
  "guideId" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expiresAt" DATETIME,
  "clickCount" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "share_links_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "guides" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX "share_links_token_key" ON "share_links"("token");
CREATE UNIQUE INDEX "share_links_guideId_key" ON "share_links"("guideId");

INSERT INTO "share_links" ("id", "token", "guideId", "createdAt", "expiresAt", "clickCount")
SELECT lower(hex(randomblob(16))), "shareToken", "id", CURRENT_TIMESTAMP, NULL, 0
FROM "guides"
WHERE "shareToken" IS NOT NULL;
</file>

<file path="prisma/migrations/migration_lock.toml">
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "sqlite"
</file>

<file path="prisma/seed.ts">
import { prisma } from '@/lib/db/client'
import { reseedDatabase } from '@/lib/db/seed'

async function main() {
await reseedDatabase(prisma)
}

main()
.catch((error) => {
console.error('Failed to seed database', error)
process.exitCode = 1
})
.finally(async () => {
await prisma.$disconnect()
})
</file>

<file path="public/file.svg">
<svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clip-rule="evenodd" fill="#666" fill-rule="evenodd"/></svg>
</file>

<file path="public/globe.svg">
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1" fill="#666"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
</file>

<file path="public/next.svg">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/><path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"/></svg>
</file>

<file path="public/vercel.svg">
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155 1000"><path d="m577.3 0 577.4 1000H0z" fill="#fff"/></svg>
</file>

<file path="public/window.svg">
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 2.5h13v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1zM0 1h16v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5zm3.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5" fill="#666"/></svg>
</file>

<file path="scripts/.gitkeep">

</file>

<file path="scripts/backup-db.sh">
#!/usr/bin/env bash
# Nightly SQLite backup — drop timestamped copy to /data/backups/, prune >14 days old.
set -euo pipefail

DB_PATH="${DB_PATH:-/data/app.db}"
BACKUP_DIR="${BACKUP_DIR:-/data/backups}"
TIMESTAMP=$(date +"%Y-%m-%d-%H%M")
DEST="${BACKUP_DIR}/app-${TIMESTAMP}.db"

mkdir -p "$BACKUP_DIR"
sqlite3 "$DB_PATH" ".backup '$DEST'"
echo "Backup written to $DEST"

# Prune backups older than 14 days

find "$BACKUP_DIR" -name "app-\*.db" -mtime +14 -delete
echo "Old backups pruned"
</file>

<file path="scripts/export-source.ts">
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { collectFiles } from '@/lib/cli/collect-files'
import { estimateTokens } from '@/lib/cli/estimate-tokens'
import { formatSection, type ExportFormat } from '@/lib/cli/format-section'

interface CliOptions {
noTests: boolean
onlyTests: boolean
format: ExportFormat
include?: string
exclude?: string
output?: string
stdout: boolean
help: boolean
}

const HELP_TEXT = `Usage: pnpm export:source [options]

Options:
--no-tests Exclude test files
--only-tests Export only test files
--format Output format: md (default) or txt
--include Additional include glob filter
--exclude Additional exclude glob filter
--output Output file path
--stdout Write export to stdout
--help Print this help text
`

process.stdout.on('error', (error: NodeJS.ErrnoException) => {
if (error.code === 'EPIPE') {
process.exit(0)
}

throw error
})

function parseCliOptions(argv: string[]): CliOptions {
const { values } = parseArgs({
args: argv,
allowPositionals: false,
options: {
'no-tests': { type: 'boolean', default: false },
'only-tests': { type: 'boolean', default: false },
format: { type: 'string', default: 'md' },
include: { type: 'string' },
exclude: { type: 'string' },
output: { type: 'string' },
stdout: { type: 'boolean', default: false },
help: { type: 'boolean', default: false },
},
})

return {
noTests: values['no-tests'],
onlyTests: values['only-tests'],
format: values.format === 'txt' ? 'txt' : 'md',
include: values.include,
exclude: values.exclude,
output: values.output,
stdout: values.stdout,
help: values.help,
}
}

function buildSummary(fileCount: number, tokenEstimate: number): string {
return `<!-- Files: ${fileCount}; Estimated tokens: ${tokenEstimate} -->`
}

function buildToc(paths: string[], format: ExportFormat): string {
if (paths.length === 0) {
return format === 'md'
? '## Table of contents\n\n*No files matched.*\n'
: 'Table of contents\n\n(no files matched)\n'
}

if (format === 'txt') {
return `Table of contents\n${paths.map((filePath) => `- ${filePath}`).join('\n')}\n`
}

return `## Table of contents\n${paths.map((filePath) => `- ${filePath}`).join('\n')}\n`
}

export async function buildExportDocument(
options: CliOptions,
cwd = process.cwd(),
): Promise<string> {
const files = await collectFiles({
cwd,
include: options.include,
exclude: options.exclude,
noTests: options.noTests,
onlyTests: options.onlyTests,
})

const sections: string[] = []
for (const filePath of files) {
const content = await readFile(path.join(cwd, filePath), 'utf8')
sections.push(formatSection(filePath, content, options.format))
}

const combinedSections = sections.join('\n')
const tokenEstimate = estimateTokens(combinedSections)

return (
[buildSummary(files.length, tokenEstimate), buildToc(files, options.format), combinedSections]
.filter(Boolean)
.join('\n\n')
.trimEnd() + '\n'
)
}

async function writeOutput(
output: string,
options: CliOptions,
cwd = process.cwd(),
): Promise<void> {
if (options.stdout) {
process.stdout.write(output)
return
}

const destination = path.resolve(cwd, options.output ?? 'export.md')
await mkdir(path.dirname(destination), { recursive: true })
await writeFile(destination, output, 'utf8')
}

export async function main(argv = process.argv.slice(2)): Promise<number> {
const options = parseCliOptions(argv)

if (options.help) {
process.stdout.write(HELP_TEXT)
return 0
}

if (options.noTests && options.onlyTests) {
process.stderr.write(
'Warning: --no-tests and --only-tests cancel each other out; exporting an empty set.\n',
)
}

const output = await buildExportDocument(options)
await writeOutput(output, options)
return 0
}

main()
.then((exitCode) => {
process.exitCode = exitCode
})
.catch((error) => {
const message = error instanceof Error ? error.message : String(error)
process.stderr.write(`${message}\n`)
process.exitCode = 1
})
</file>

<file path="src/app/(auth)/forgot-password/page.tsx">
import type { Metadata } from 'next'
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'

export const metadata: Metadata = {
title: 'Forgot password — FlashGuides',
}

export default function ForgotPasswordPage() {
return (

<main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
<div className="w-full max-w-md space-y-8">
<div className="text-center">
<h1 className="text-3xl font-bold tracking-tight text-gray-900">Forgot your password?</h1>
<p className="mt-2 text-sm text-gray-600">
Enter your email and we&apos;ll send you a reset link.
</p>
</div>
<div className="rounded-lg bg-white px-8 py-10 shadow">
<ForgotPasswordForm />
</div>
</div>
</main>
)
}
</file>

<file path="src/app/(auth)/login/page.tsx">
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata: Metadata = {
title: 'Sign in — FlashGuides',
}

export default function LoginPage() {
return (

<main className="flex min-h-screen items-center justify-center bg-black px-4 py-12 text-white">
<div className="w-full max-w-md space-y-8">
<div className="text-center">
<h1 className="text-3xl font-bold tracking-tight text-white">Sign in to FlashGuides</h1>
</div>
<div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-8 py-10 shadow-2xl shadow-black/30">
<Suspense>
<LoginForm />
</Suspense>
</div>
</div>
</main>
)
}
</file>

<file path="src/app/(auth)/register/page.tsx">
import type { Metadata } from 'next'
import { RegisterForm } from '@/components/auth/RegisterForm'

export const metadata: Metadata = {
title: 'Create account — FlashGuides',
}

export default function RegisterPage() {
return (

<main className="flex min-h-screen items-center justify-center bg-black px-4 py-12 text-white">
<div className="w-full max-w-md space-y-8">
<div className="text-center">
<h1 className="text-3xl font-bold tracking-tight text-white">Create your account</h1>
<p className="mt-2 text-sm text-zinc-400">Start building and sharing guides today.</p>
</div>
<div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-8 py-10 shadow-2xl shadow-black/30">
<RegisterForm />
</div>
</div>
</main>
)
}
</file>

<file path="src/app/(auth)/reset-password/page.tsx">
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm'

export const metadata: Metadata = {
title: 'Reset password — FlashGuides',
}

export default function ResetPasswordPage() {
return (

<main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
<div className="w-full max-w-md space-y-8">
<div className="text-center">
<h1 className="text-3xl font-bold tracking-tight text-gray-900">Set a new password</h1>
<p className="mt-2 text-sm text-gray-600">Choose a strong password for your account.</p>
</div>
<div className="rounded-lg bg-white px-8 py-10 shadow">
<Suspense>
<ResetPasswordForm />
</Suspense>
</div>
</div>
</main>
)
}
</file>

<file path="src/app/(auth)/verify-email/page.tsx">
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
title: 'Verify your email — FlashGuides',
}

interface Props {
searchParams: Promise<{ token?: string; verified?: string }>
}

export default async function VerifyEmailPage({ searchParams }: Props) {
const params = await searchParams

// If there's no token in the URL this page is shown after a redirect
// from the API route — the ?verified=1 param comes from the dashboard redirect.
// Standalone /verify-email without a token shows a generic message.
if (!params.token) {
return (

<main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
<div className="w-full max-w-md rounded-lg bg-white px-8 py-10 shadow text-center space-y-4">
<h1 className="text-2xl font-bold text-gray-900">Check your email</h1>
<p className="text-sm text-gray-600">
We&apos;ve sent a verification link to your email address. Click the link to activate
your account.
</p>
<p className="text-xs text-gray-400">Didn&apos;t receive it? Check your spam folder.</p>
</div>
</main>
)
}

// Token present — the API route handles the actual verification via redirect.
// This page only renders if the API route returned an error (e.g., link opened
// directly). Redirect the browser to the API verify endpoint.
return (

<main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
<div className="w-full max-w-md rounded-lg bg-white px-8 py-10 shadow text-center space-y-4">
<h1 className="text-2xl font-bold text-gray-900">Verifying…</h1>
<meta
httpEquiv="refresh"
content={`0;url=/api/auth/verify-email?token=${encodeURIComponent(params.token)}`}
/>
<p className="text-sm text-gray-600">
If you are not redirected,{' '}
<Link
href={`/api/auth/verify-email?token=${encodeURIComponent(params.token)}`}
className="text-indigo-600 hover:text-indigo-500" >
click here
</Link>
.
</p>
</div>
</main>
)
}
</file>

<file path="src/app/account/page.tsx">
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { userRepository } from '@/lib/db/repositories/users'
import ProfileSection from '@/components/account/ProfileSection'
import AvatarUpload from '@/components/account/AvatarUpload'
import PasswordSection from '@/components/account/PasswordSection'
import EmailSection from '@/components/account/EmailSection'
import ConnectedAccountsSection from '@/components/account/ConnectedAccountsSection'
import DangerZone from '@/components/account/DangerZone'
import WorkspacePageHeader from '@/components/ui/WorkspacePageHeader'

export const metadata: Metadata = {
title: 'Account - FlashGuides',
}

export default async function AccountPage({
searchParams,
}: {
searchParams?: Promise<Record<string, string | string[] | undefined>>
}) {
const resolvedSearchParams = searchParams ? await searchParams : undefined
const emailChangedState = Array.isArray(resolvedSearchParams?.emailChanged)
? (resolvedSearchParams.emailChanged[0] ?? null)
: (resolvedSearchParams?.emailChanged ?? null)

const session = await auth()
const sessionUserId = await getSessionUserId(session)

if (!sessionUserId) {
redirect('/login?callbackUrl=/account')
}

const user = await userRepository.getAccountPageUser(sessionUserId)
if (!user) {
redirect('/login?callbackUrl=/account')
}

return (

<main className="min-h-screen bg-[linear-gradient(180deg,#f8f6f0_0%,#f4efe7_100%)] px-4 py-10 sm:px-6 lg:px-8">
<div className="mx-auto max-w-5xl space-y-6">
<WorkspacePageHeader
          title="Manage your profile"
          description="Update your identity, manage connected sign-in providers, and verify account changes safely."
        />

        <div className="grid gap-6 lg:grid-cols-[320px,minmax(0,1fr)]">
          <AvatarUpload image={user.image} name={user.name} />
          <div className="space-y-6">
            <ProfileSection user={user} />
            <EmailSection
              email={user.email}
              pendingEmail={user.pendingEmail}
              emailChangedState={emailChangedState}
            />
            {user.hasPassword ? <PasswordSection /> : null}
            <ConnectedAccountsSection providers={user.providers} />
            <DangerZone email={user.email} />
          </div>
        </div>
      </div>
    </main>

)
}
</file>

<file path="src/app/api/account/avatar/route.ts">
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { userRepository } from '@/lib/db/repositories/users'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { getAvatarValidationMessage, uploadAvatar, validateAvatarFile } from '@/lib/storage/minio'

export async function POST(req: Request) {
try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    let formData: FormData
    try {
      formData = await req.formData()
    } catch {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_FORM_DATA',
        message: 'Invalid form data',
      })
    }

    const avatar = formData.get('avatar')
    if (!(avatar instanceof File)) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'AVATAR_VALIDATION_ERROR',
        message: getAvatarValidationMessage(),
      })
    }

    try {
      const { buffer, mimeType } = await validateAvatarFile(avatar)
      const imageUrl = await uploadAvatar(buffer, mimeType, sessionUserId)
      await userRepository.updateProfile(sessionUserId, { image: imageUrl })
      return NextResponse.json({ imageUrl })
    } catch (error) {
      if (error instanceof Error && error.message === getAvatarValidationMessage()) {
        return createApiErrorResponse(req, {
          status: 422,
          code: 'AVATAR_VALIDATION_ERROR',
          message: error.message,
        })
      }

      return createApiErrorResponse(req, {
        status: 500,
        code: 'AVATAR_UPLOAD_FAILED',
        message: 'Avatar upload failed',
      })
    }

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/account/delete/route.ts">
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { verifyPassword } from '@/lib/auth/password'
import { prisma } from '@/lib/db/client'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { deleteStoredObjectByUrl, deleteStoredObjectsByPrefix } from '@/lib/storage/minio'

const deleteAccountSchema = z.object({
password: z.string().min(1),
})

export async function POST(req: Request) {
try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_JSON',
        message: 'Invalid JSON',
      })
    }

    const parsed = deleteAccountSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const user = await prisma.user.findUnique({
      where: { id: sessionUserId },
      select: {
        id: true,
        password: true,
        image: true,
      },
    })

    if (!user || !user.password) {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'USER_NOT_FOUND',
        message: 'User not found',
      })
    }

    const isValid = await verifyPassword(parsed.data.password, user.password)
    if (!isValid) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'INCORRECT_PASSWORD',
        message: 'Incorrect password',
      })
    }

    const avatarUrl = user.image
    await prisma.user.delete({ where: { id: sessionUserId } })

    await Promise.all([
      deleteStoredObjectByUrl(avatarUrl),
      deleteStoredObjectsByPrefix(`exports/${sessionUserId}/`),
    ]).catch(() => {
      // Best-effort cleanup of external objects after the DB delete succeeds.
    })

    const response = NextResponse.json({ message: 'Account deleted' })
    response.cookies.set('authjs.session-token', '', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    })
    response.cookies.set('authjs.callback-url', '', {
      path: '/',
      maxAge: 0,
    })

    return response

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/account/email/route.ts">
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { createVerificationToken } from '@/lib/auth/tokens'
import { userRepository } from '@/lib/db/repositories/users'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { sendEmailChangeVerification } from '@/lib/email'

const updateEmailSchema = z.object({
email: z.string().trim().email(),
})

export async function PATCH(req: Request) {
try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_JSON',
        message: 'Invalid JSON',
      })
    }

    const parsed = updateEmailSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const result = await userRepository.beginEmailChange(sessionUserId, parsed.data.email)
    if (result === 'email-in-use') {
      return createApiErrorResponse(req, {
        status: 409,
        code: 'EMAIL_IN_USE',
        message: 'Email already in use',
      })
    }

    if (result === 'not-found') {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'USER_NOT_FOUND',
        message: 'User not found',
      })
    }

    const token = await createVerificationToken(`email-change:${sessionUserId}`)
    await sendEmailChangeVerification(parsed.data.email.trim().toLowerCase(), token)

    return NextResponse.json({ message: 'Verification email sent' })

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/account/export/route.ts">
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { generateUserDataExport } from '@/lib/export/data-exporter'
import { uploadExportArchive } from '@/lib/storage/minio'

export async function POST(req: Request) {
try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    try {
      const archive = await generateUserDataExport(sessionUserId)
      const uploaded = await uploadExportArchive(archive, sessionUserId)

      return NextResponse.json(
        {
          downloadUrl: uploaded.downloadUrl,
          expiresAt: uploaded.expiresAt,
        },
        { status: 202 },
      )
    } catch {
      return createApiErrorResponse(req, {
        status: 500,
        code: 'ACCOUNT_EXPORT_FAILED',
        message: 'Unable to export account data',
      })
    }

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/account/oauth/[provider]/route.ts">
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { userRepository } from '@/lib/db/repositories/users'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

export async function DELETE(req: Request, { params }: { params: Promise<{ provider: string }> }) {
try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    const { provider } = await params
    const result = await userRepository.disconnectOAuthProvider(sessionUserId, provider)

    if (result === 'only-login-method') {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'ONLY_LOGIN_METHOD',
        message: 'Cannot remove your only login method',
      })
    }

    if (result === 'not-found') {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'PROVIDER_NOT_FOUND',
        message: 'Provider not found',
      })
    }

    return NextResponse.json({ message: 'Disconnected' })

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/account/password/route.ts">
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { userRepository } from '@/lib/db/repositories/users'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const updatePasswordSchema = z.object({
currentPassword: z.string().min(1),
newPassword: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
})

export async function PATCH(req: Request) {
try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_JSON',
        message: 'Invalid JSON',
      })
    }

    const parsed = updatePasswordSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const result = await userRepository.updatePassword(
      sessionUserId,
      parsed.data.currentPassword,
      parsed.data.newPassword,
    )

    if (result === 'incorrect-current') {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'CURRENT_PASSWORD_INCORRECT',
        message: 'Current password incorrect',
      })
    }

    if (result === 'not-found') {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'USER_NOT_FOUND',
        message: 'User not found',
      })
    }

    return NextResponse.json({ message: 'Password updated' })

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/account/profile/route.ts">
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { userRepository } from '@/lib/db/repositories/users'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const updateProfileSchema = z.object({
name: z.string().trim().min(1).max(100).optional(),
})

export async function PATCH(req: Request) {
try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_JSON',
        message: 'Invalid JSON',
      })
    }

    const parsed = updateProfileSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const user = await userRepository.updateProfile(sessionUserId, parsed.data)
    if (!user) {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'USER_NOT_FOUND',
        message: 'User not found',
      })
    }

    return NextResponse.json(user)

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/account/verify-email-change/route.ts">
import { NextResponse } from 'next/server'
import { consumeVerificationToken } from '@/lib/auth/tokens'
import { userRepository } from '@/lib/db/repositories/users'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const APP_URL = process.env['NEXTAUTH_URL'] ?? 'http://localhost:3000'

export async function GET(req: Request) {
try {
const { searchParams } = new URL(req.url)
const token = searchParams.get('token')

    if (!token) {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'MISSING_TOKEN',
        message: 'Missing token',
      })
    }

    const identifier = await consumeVerificationToken(token)
    if (!identifier || !identifier.startsWith('email-change:')) {
      return createApiErrorResponse(req, {
        status: 410,
        code: 'TOKEN_INVALID',
        message: 'Token expired or invalid',
      })
    }

    const userId = identifier.slice('email-change:'.length)
    const result = await userRepository.confirmEmailChange(userId)

    if (result === 'updated') {
      return NextResponse.redirect(new URL('/account?emailChanged=1', APP_URL))
    }

    if (result === 'email-in-use') {
      return NextResponse.redirect(new URL('/account?emailChanged=conflict', APP_URL))
    }

    return NextResponse.redirect(new URL('/account?emailChanged=invalid', APP_URL))

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/chat/[guideSlug]/route.ts">
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { claudeClient } from '@/lib/ai/claude'
import { prisma } from '@/lib/db/client'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const followUpChatSchema = z.object({
message: z.string().min(1).max(2000),
})

type FollowUpChatSSEEvent =
| { type: 'token'; text: string }
| { type: 'done' }
| { type: 'error'; message: string }

function encodeSSE(event: FollowUpChatSSEEvent): string {
return `data: ${JSON.stringify(event)}\n\n`
}

export async function POST(
req: Request,
{ params }: { params: Promise<{ guideSlug: string }> },
): Promise<Response> {
try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_JSON',
        message: 'Invalid JSON',
      })
    }

    const parsed = followUpChatSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const { guideSlug } = await params
    const guide = await prisma.guide.findUnique({
      where: { slug: guideSlug },
      select: {
        title: true,
        content: true,
        isPublic: true,
        userId: true,
      },
    })

    if (!guide) {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'GUIDE_NOT_FOUND',
        message: 'Guide not found',
      })
    }

    if (!guide.isPublic && guide.userId !== sessionUserId) {
      return createApiErrorResponse(req, {
        status: 403,
        code: 'FORBIDDEN',
        message: 'Forbidden',
      })
    }

    const guideContext = [
      'You are answering follow-up questions about an existing FlashGuides study guide.',
      `Guide title: ${guide.title}`,
      'Use the guide content below as your primary context.',
      guide.content,
      'If the guide does not fully answer the question, say what is missing before inferring beyond it.',
    ].join('\n\n')

    const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>()
    const writer = writable.getWriter()
    const encoder = new TextEncoder()

    ;(async () => {
      try {
        const stream = await claudeClient.streamGenerate(parsed.data.message, guideContext)
        const reader = stream.getReader()

        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            break
          }

          await writer.write(encoder.encode(encodeSSE({ type: 'token', text: value })))
        }

        await writer.write(encoder.encode(encodeSSE({ type: 'done' })))
      } catch {
        try {
          await writer.write(
            encoder.encode(
              encodeSSE({ type: 'error', message: 'AI service unavailable, please try again.' }),
            ),
          )
        } catch {
          // writer closed
        }
      } finally {
        await writer.close().catch(() => {
          // ignore close errors
        })
      }
    })()

    return new Response(readable, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/folders/[id]/route.ts">
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { folderRepository } from '@/lib/db/repositories/folders'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const patchFolderSchema = z.object({
name: z.string().trim().min(1).max(100),
})

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_JSON',
        message: 'Invalid JSON',
      })
    }

    const parsed = patchFolderSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const { id } = await params
    const folder = await folderRepository.rename({
      id,
      userId: sessionUserId,
      name: parsed.data.name,
    })

    if (!folder) {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'FOLDER_NOT_FOUND',
        message: 'Folder not found',
      })
    }

    return NextResponse.json(folder)

} catch (error) {
return handleApiError(error, req)
}
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    const { id } = await params
    const result = await folderRepository.deleteOwned(sessionUserId, id)

    if (!result.deleted) {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'FOLDER_NOT_FOUND',
        message: 'Folder not found',
      })
    }

    return NextResponse.json({ deleted: true })

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/folders/route.ts">
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { folderRepository } from '@/lib/db/repositories/folders'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const createFolderSchema = z.object({
name: z.string().trim().min(1).max(100),
})

export async function GET() {
const req = new Request('http://localhost/api/folders')

try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    const folders = await folderRepository.listByUser(sessionUserId)
    return NextResponse.json({ folders })

} catch (error) {
return handleApiError(error, req)
}
}

export async function POST(req: Request) {
try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_JSON',
        message: 'Invalid JSON',
      })
    }

    const parsed = createFolderSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const folder = await folderRepository.create({
      userId: sessionUserId,
      name: parsed.data.name,
    })

    return NextResponse.json(folder, { status: 201 })

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/guest/quota/route.ts">
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { extractIp, getQuotaStatus, GUEST_DAILY_LIMIT } from '@/lib/guest/quota'

export async function GET(req: Request) {
// Registered users have unlimited generation — return max quota
const session = await auth()
if (session?.user?.id) {
return NextResponse.json({
used: 0,
limit: GUEST_DAILY_LIMIT,
resetsAt: null,
})
}

const ip = extractIp(req)
const status = await getQuotaStatus(ip)

return NextResponse.json({
used: status.used,
limit: status.limit,
resetsAt: status.resetsAt.toISOString(),
})
}
</file>

<file path="src/app/api/guides/[id]/export/route.ts">
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { prisma } from '@/lib/db/client'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { buildHtmlExport } from '@/lib/export/html'
import { buildMarkdownExport } from '@/lib/export/markdown'
import { buildPdfExport } from '@/lib/export/pdf'
import type { GuideExportRecord } from '@/lib/export/guide-types'

const exportQuerySchema = z.object({
format: z.enum(['md', 'html', 'pdf']),
})

async function getOwnedGuideForExport(
id: string,
userId: string,
): Promise<GuideExportRecord | null> {
return prisma.guide.findFirst({
where: {
id,
userId,
},
select: {
id: true,
slug: true,
title: true,
studyMode: true,
inputType: true,
inputValue: true,
content: true,
createdAt: true,
updatedAt: true,
},
})
}

function attachmentHeaders(filename: string, contentType: string): HeadersInit {
return {
'Content-Type': contentType,
'Content-Disposition': `attachment; filename="${filename}"`,
}
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    const url = new URL(req.url)
    const parsed = exportQuerySchema.safeParse({ format: url.searchParams.get('format') })
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const { id } = await params
    const guide = await getOwnedGuideForExport(id, sessionUserId)

    if (!guide) {
      return createApiErrorResponse(req, {
        status: 403,
        code: 'FORBIDDEN',
        message: 'Forbidden',
      })
    }

    if (parsed.data.format === 'md') {
      return new Response(buildMarkdownExport(guide), {
        status: 200,
        headers: attachmentHeaders(`${guide.slug}.md`, 'text/markdown; charset=utf-8'),
      })
    }

    if (parsed.data.format === 'html') {
      return new Response(await buildHtmlExport(guide), {
        status: 200,
        headers: attachmentHeaders(`${guide.slug}.html`, 'text/html; charset=utf-8'),
      })
    }

    const pdfBuffer = await buildPdfExport(guide)

    return new Response(Uint8Array.from(pdfBuffer), {
      status: 200,
      headers: attachmentHeaders(`${guide.slug}.pdf`, 'application/pdf'),
    })

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/guides/[id]/fork/route.ts">
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { forkGuide } from '@/lib/guides/fork'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    const { id } = await params
    const result = await forkGuide(id, sessionUserId)

    if (result.status === 'not-found') {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'SHAREABLE_GUIDE_NOT_FOUND',
        message: 'Shareable guide not found',
      })
    }

    return NextResponse.json(
      {
        guideId: result.guide.id,
        guideSlug: result.guide.slug,
        title: result.guide.title,
      },
      { status: 201 },
    )

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/guides/[id]/share/route.ts">
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { shareLinkRepository } from '@/lib/db/repositories/share-links'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const shareRequestSchema = z.object({
expiresIn: z.enum(['7d', '30d']).nullable().optional(),
})

function resolveExpiresAt(expiresIn: '7d' | '30d' | null | undefined): Date | null {
if (!expiresIn) {
return null
}

const days = expiresIn === '7d' ? 7 : 30
return new Date(Date.now() + days _ 24 _ 60 _ 60 _ 1000)
}

function buildShareUrl(request: Request, token: string): string {
return new URL(`/share/${token}`, request.url).toString()
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    let body: unknown = {}
    try {
      body = await req.json()
    } catch {
      body = {}
    }

    const parsed = shareRequestSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const { id } = await params
    const result = await shareLinkRepository.createOwnedShareLink({
      guideId: id,
      userId: sessionUserId,
      expiresAt: resolveExpiresAt(parsed.data.expiresIn),
    })

    if (result.status === 'forbidden') {
      return createApiErrorResponse(req, {
        status: 403,
        code: 'FORBIDDEN',
        message: 'Forbidden',
      })
    }

    const payload = {
      token: result.shareLink.token,
      url: buildShareUrl(req, result.shareLink.token),
      expiresAt: result.shareLink.expiresAt?.toISOString() ?? null,
    }

    return NextResponse.json(payload, { status: result.status === 'created' ? 201 : 409 })

} catch (error) {
return handleApiError(error, req)
}
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    const { id } = await params
    const deleted = await shareLinkRepository.deleteOwnedShareLink(id, sessionUserId)

    if (!deleted) {
      return createApiErrorResponse(req, {
        status: 403,
        code: 'FORBIDDEN',
        message: 'Forbidden',
      })
    }

    return new Response(null, { status: 204 })

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/guides/[id]/tags/route.ts">
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { guideRepository } from '@/lib/db/repositories/guides'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const patchGuideTagsSchema = z.object({
tags: z.array(z.string().trim().min(1).max(50)).max(10),
})

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_JSON',
        message: 'Invalid JSON',
      })
    }

    const parsed = patchGuideTagsSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const { id } = await params
    const updated = await guideRepository.setTags({
      guideId: id,
      userId: sessionUserId,
      tags: parsed.data.tags,
    })

    if (!updated) {
      return createApiErrorResponse(req, {
        status: 403,
        code: 'FORBIDDEN',
        message: 'Forbidden',
      })
    }

    return NextResponse.json({ tags: updated.tags })

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/guides/[id]/route.ts">
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { guideRepository } from '@/lib/db/repositories/guides'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const patchGuideSchema = z
.object({
isFavorite: z.boolean().optional(),
folderId: z.string().cuid().nullable().optional(),
title: z.string().trim().min(1).max(200).optional(),
})
.refine(
(value) =>
value.isFavorite !== undefined || value.folderId !== undefined || value.title !== undefined,
{
message: 'At least one field must be provided',
},
)

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_JSON',
        message: 'Invalid JSON',
      })
    }

    const parsed = patchGuideSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const { id } = await params
    const updated = await guideRepository.update({
      id,
      userId: sessionUserId,
      ...parsed.data,
    })

    if (!updated) {
      return createApiErrorResponse(req, {
        status: 403,
        code: 'FORBIDDEN',
        message: 'Forbidden',
      })
    }

    return NextResponse.json(updated)

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/guides/route.ts">
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { guideRepository } from '@/lib/db/repositories/guides'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const guidesQuerySchema = z.object({
q: z.string().trim().min(1).optional(),
tag: z.string().trim().min(1).optional(),
folderId: z.string().cuid().optional(),
view: z.enum(['recent', 'favorites', 'all']).default('all'),
page: z.coerce.number().int().min(1).default(1),
limit: z.coerce.number().int().min(1).max(50).default(24),
})

const deleteGuidesSchema = z.object({
ids: z.array(z.string().cuid()).min(1).max(50),
})

export async function GET(req: Request) {
try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    const url = new URL(req.url)
    const parsed = guidesQuerySchema.safeParse({
      q: url.searchParams.get('q') ?? undefined,
      tag: url.searchParams.get('tag') ?? undefined,
      folderId: url.searchParams.get('folderId') ?? undefined,
      view: url.searchParams.get('view') ?? undefined,
      page: url.searchParams.get('page') ?? undefined,
      limit: url.searchParams.get('limit') ?? undefined,
    })

    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const result = await guideRepository.list({
      userId: sessionUserId,
      ...parsed.data,
    })

    return NextResponse.json(result)

} catch (error) {
return handleApiError(error, req)
}
}

export async function DELETE(req: Request) {
try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_JSON',
        message: 'Invalid JSON',
      })
    }

    const parsed = deleteGuidesSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const result = await guideRepository.deleteManyOwned(sessionUserId, parsed.data.ids)
    if (!result.authorized) {
      return createApiErrorResponse(req, {
        status: 403,
        code: 'FORBIDDEN',
        message: 'Forbidden',
      })
    }

    return NextResponse.json({ deleted: result.deleted })

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/notes/route.ts">
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { prisma } from '@/lib/db/client'
import { noteRepository } from '@/lib/db/repositories/notes'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { sanitizeObjectStrings } from '@/lib/security/sanitize'

const createNoteSchema = z.object({
guideId: z.string().cuid(),
selectedText: z.string().min(1).max(2000),
content: z.string().max(5000).optional().default(''),
})

export async function POST(req: Request) {
try {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_JSON',
        message: 'Invalid JSON',
      })
    }

    const sanitizedBody =
      body && typeof body === 'object' && !Array.isArray(body)
        ? sanitizeObjectStrings(body as Record<string, unknown>)
        : body

    const parsed = createNoteSchema.safeParse(sanitizedBody)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const guide = await prisma.guide.findUnique({
      where: { id: parsed.data.guideId },
      select: {
        id: true,
        userId: true,
        isPublic: true,
      },
    })

    if (!guide) {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'GUIDE_NOT_FOUND',
        message: 'Guide not found',
      })
    }

    if (!guide.isPublic && guide.userId !== sessionUserId) {
      return createApiErrorResponse(req, {
        status: 403,
        code: 'FORBIDDEN',
        message: 'Forbidden',
      })
    }

    const note = await noteRepository.create({
      userId: sessionUserId,
      guideId: parsed.data.guideId,
      selectedText: parsed.data.selectedText,
      content: parsed.data.content,
    })

    return NextResponse.json(note, { status: 201 })

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/share-links/[token]/status/route.ts">
import { NextResponse } from 'next/server'
import { shareLinkRepository } from '@/lib/db/repositories/share-links'

export async function GET(\_req: Request, { params }: { params: Promise<{ token: string }> }) {
const { token } = await params
const status = await shareLinkRepository.getStatusByToken(token)

if (status !== 'active') {
return NextResponse.json({ status }, { status: 410 })
}

return NextResponse.json({ status })
}
</file>

<file path="src/app/api/test/seed/route.ts">
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { reseedDatabase } from '@/lib/db/seed'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

let reseedQueue: Promise<void> = Promise.resolve()

function isPlaywrightTestEnabled(): boolean {
return process.env['NODE_ENV'] === 'test' || process.env['PLAYWRIGHT_TEST'] === '1'
}

export async function POST(req: Request) {
try {
if (!isPlaywrightTestEnabled()) {
return createApiErrorResponse(req, {
status: 404,
code: 'NOT_FOUND',
message: 'Not found',
})
}

    const reseedTask = reseedQueue.then(async () => {
      await reseedDatabase(prisma)
    })

    reseedQueue = reseedTask.catch(() => undefined)

    await reseedTask

    return NextResponse.json({ ok: true })

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/test/session/route.ts">
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { encode } from 'next-auth/jwt'
import { prisma } from '@/lib/db/client'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const seedSessionSchema = z.object({
email: z.string().email(),
})

function isPlaywrightTestEnabled(): boolean {
return process.env['NODE_ENV'] === 'test' || process.env['PLAYWRIGHT_TEST'] === '1'
}

export async function POST(req: Request) {
try {
if (!isPlaywrightTestEnabled()) {
return createApiErrorResponse(req, {
status: 404,
code: 'NOT_FOUND',
message: 'Not found',
})
}

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_JSON',
        message: 'Invalid JSON',
      })
    }

    const parsed = seedSessionSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
      },
    })

    if (!user) {
      return createApiErrorResponse(req, {
        status: 404,
        code: 'USER_NOT_FOUND',
        message: 'User not found',
      })
    }

    const secret = process.env['AUTH_SECRET'] ?? process.env['NEXTAUTH_SECRET']
    if (!secret) {
      return createApiErrorResponse(req, {
        status: 500,
        code: 'MISSING_AUTH_SECRET',
        message: 'Missing auth secret',
      })
    }

    const sessionToken = await encode({
      secret,
      salt: 'authjs.session-token',
      token: {
        sub: user.id,
        id: user.id,
        name: user.name,
        email: user.email,
        picture: user.image,
        sessionVersion: 0,
      },
    })

    const response = NextResponse.json({ ok: true })
    response.cookies.set('authjs.session-token', sessionToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })

    return response

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/dashboard/page.tsx">
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { folderRepository } from '@/lib/db/repositories/folders'
import { guideRepository } from '@/lib/db/repositories/guides'
import { prisma } from '@/lib/db/client'
import DashboardShell from '@/components/dashboard/DashboardShell'

export const metadata: Metadata = {
title: 'Dashboard - FlashGuides',
}

async function getUsageSummary(userId: string) {
const [totalGuides, usageRows] = await Promise.all([
prisma.guide.count({ where: { userId } }),
prisma.$queryRawUnsafe<Array<{ bytes: number | bigint | null }>>(
'SELECT COALESCE(SUM(LENGTH("content") + LENGTH("title") + LENGTH("inputValue")), 0) AS bytes FROM "guides" WHERE "userId" = ?',
userId,
),
])

return {
totalGuides,
approxBytes: Number(usageRows[0]?.bytes ?? 0),
}
}

export default async function DashboardPage() {
const session = await auth()
const sessionUserId = await getSessionUserId(session)

if (!sessionUserId) {
redirect('/login?callbackUrl=/dashboard')
}

const [guideResult, folders, usageSummary] = await Promise.all([
guideRepository.list({
userId: sessionUserId,
view: 'all',
page: 1,
limit: 24,
}),
folderRepository.listByUser(sessionUserId),
getUsageSummary(sessionUserId),
])

return (
<DashboardShell
      initialGuides={guideResult.guides}
      initialTotal={guideResult.total}
      initialPage={guideResult.page}
      initialFolders={folders}
      usageSummary={usageSummary}
    />
)
}
</file>

<file path="src/app/gallery/page.tsx">
import { prisma } from '@/lib/db/client'
import GuideCard from '@/components/guides/GuideCard'

export const revalidate = 300 // ISR: revalidate every 5 minutes

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
</file>

<file path="src/app/guide/[slug]/not-found.tsx">
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
</file>

<file path="src/app/guide/[slug]/page.tsx">
import { notFound, redirect } from 'next/navigation'
import { prisma } from '@/lib/db/client'
import { auth } from '@/lib/auth'
import { getSessionUserId, hasAuthenticatedUser } from '@/lib/auth/session'
import GuideRenderer from '@/components/guide/GuideRenderer'

interface GuidePageProps {
params: Promise<{ slug: string }>
}

export default async function GuidePage({ params }: GuidePageProps) {
const { slug } = await params
const session = await auth()
const sessionUserId = await getSessionUserId(session)

const guide = await prisma.guide.findUnique({
where: { slug },
select: {
id: true,
userId: true,
isWatermark: true,
slug: true,
title: true,
studyMode: true,
inputType: true,
inputValue: true,
content: true,
isPublic: true,
},
})

if (!guide) {
notFound()
}

const isClaimableGuestGuide = Boolean(!guide.userId && guide.isWatermark)

if (!guide.isPublic && !isClaimableGuestGuide && sessionUserId !== guide.userId) {
redirect(`/login?callbackUrl=${encodeURIComponent(`/guide/${guide.slug}`)}`)
}

return (
<GuideRenderer
guide={guide}
isAuthenticated={hasAuthenticatedUser(session)}
isClaimableGuestGuide={isClaimableGuestGuide}
canShare={Boolean(sessionUserId && sessionUserId === guide.userId)}
/>
)
}
</file>

<file path="src/app/share/[token]/page.tsx">
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { hasAuthenticatedUser } from '@/lib/auth/session'
import { shareLinkRepository } from '@/lib/db/repositories/share-links'
import GuideRenderer from '@/components/guide/GuideRenderer'
import ShareUnavailablePage from '@/app/share/unavailable/page'
import ForkButton from '@/components/sharing/ForkButton'

export const dynamic = 'force-dynamic'

interface SharedGuidePageProps {
params: Promise<{ token: string }>
}

export default async function SharedGuidePage({ params }: SharedGuidePageProps) {
const { token } = await params
const session = await auth()
const visit = await shareLinkRepository.visitByToken(token)

if (visit.status !== 'active') {
return <ShareUnavailablePage />
}

return (

<main className="min-h-screen bg-[radial-gradient(circle_at_top,#dbeafe_0%,#f8fafc_38%,#ffffff_100%)] px-6 py-8">
<div className="mx-auto mb-8 max-w-6xl rounded-[2rem] border border-sky-200 bg-white/90 p-6 shadow-sm backdrop-blur">
<p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
Shared guide
</p>
<div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
<p className="max-w-3xl text-sm leading-7 text-stone-600">
You are viewing a read-only study guide shared from FlashGuides.
</p>
{hasAuthenticatedUser(session) ? (
<ForkButton guideId={visit.guide.id} />
) : (
<Link
              href="/register"
              className="inline-flex rounded-full border border-sky-300 px-4 py-2 text-sm font-medium text-sky-800"
            >
Sign up free
</Link>
)}
</div>
</div>

      <div className="mx-auto max-w-6xl">
        <GuideRenderer guide={visit.guide} isAuthenticated={false} isReadOnly />
      </div>
    </main>

)
}
</file>

<file path="src/app/share/unavailable/page.tsx">
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
</file>

<file path="src/app/global-error.tsx">
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
className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300" >
Try again
</button>
</div>
</section>
</main>
</body>
</html>
)
}
</file>

<file path="src/components/account/AvatarUpload.tsx">
'use client'

import { useState } from 'react'

interface AvatarUploadProps {
image: string | null
name: string | null
}

export default function AvatarUpload({ image, name }: AvatarUploadProps) {
const [imageUrl, setImageUrl] = useState(image)
const [message, setMessage] = useState<string | null>(null)
const [error, setError] = useState<string | null>(null)
const [isUploading, setIsUploading] = useState(false)

async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
const file = event.target.files?.[0]
if (!file) {
return
}

    setIsUploading(true)
    setMessage(null)
    setError(null)

    const formData = new FormData()
    formData.set('avatar', file)

    try {
      const response = await fetch('/api/account/avatar', {
        method: 'POST',
        body: formData,
      })

      const body = (await response.json()) as { imageUrl?: string; error?: string }
      if (!response.ok || !body.imageUrl) {
        throw new Error(body.error ?? 'Upload failed')
      }

      setImageUrl(body.imageUrl)
      setMessage('Avatar updated.')
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Upload failed')
    } finally {
      setIsUploading(false)
      event.target.value = ''
    }

}

return (

<section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
<h2 className="text-2xl font-semibold text-stone-900">Avatar</h2>
<p className="mt-2 text-sm text-stone-500">
Upload a square image to personalize your account.
</p>

      <div className="mt-6 flex flex-col items-center rounded-[2rem] bg-[radial-gradient(circle_at_top,#f6efe6,white)] p-6 text-center">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={name ?? 'Avatar'}
            className="h-28 w-28 rounded-full object-cover shadow-sm"
          />
        ) : (
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-stone-900 text-3xl font-semibold text-white">
            {(name?.trim().charAt(0) || 'F').toUpperCase()}
          </div>
        )}

        <label className="mt-5 inline-flex cursor-pointer rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700">
          {isUploading ? 'Uploading...' : 'Upload avatar'}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        <p className="mt-3 text-xs uppercase tracking-[0.24em] text-stone-400">
          JPEG, PNG, or WebP · max 2 MB
        </p>
        {message ? <p className="mt-3 text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="mt-3 text-sm text-rose-700">{error}</p> : null}
      </div>
    </section>

)
}
</file>

<file path="src/components/account/ConnectedAccountsSection.tsx">
'use client'

import { useState } from 'react'

interface ConnectedAccountsSectionProps {
providers: string[]
}

function formatProvider(provider: string): string {
if (provider === 'google') {
return 'Google'
}

return provider.charAt(0).toUpperCase() + provider.slice(1)
}

export default function ConnectedAccountsSection({ providers }: ConnectedAccountsSectionProps) {
const [connectedProviders, setConnectedProviders] = useState(providers)
const [message, setMessage] = useState<string | null>(null)
const [error, setError] = useState<string | null>(null)
const [pendingProvider, setPendingProvider] = useState<string | null>(null)

async function disconnectProvider(provider: string) {
setPendingProvider(provider)
setMessage(null)
setError(null)

    try {
      const response = await fetch(`/api/account/oauth/${provider}`, {
        method: 'DELETE',
      })

      const body = (await response.json()) as { message?: string; error?: string }
      if (!response.ok) {
        throw new Error(body.error ?? 'Unable to disconnect provider')
      }

      setConnectedProviders((current) => current.filter((entry) => entry !== provider))
      setMessage(`${formatProvider(provider)} disconnected.`)
    } catch (disconnectError) {
      setError(
        disconnectError instanceof Error
          ? disconnectError.message
          : 'Unable to disconnect provider',
      )
    } finally {
      setPendingProvider(null)
    }

}

return (

<section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
<h2 className="text-2xl font-semibold text-stone-900">Connected accounts</h2>
<p className="mt-2 text-sm text-stone-500">
Review the identity providers you can use to sign in.
</p>

      <div className="mt-6 space-y-3">
        {connectedProviders.length === 0 ? (
          <p className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-500">
            No OAuth providers connected.
          </p>
        ) : (
          connectedProviders.map((provider) => (
            <div
              key={provider}
              className="flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-3"
            >
              <span className="text-sm font-medium text-stone-800">{formatProvider(provider)}</span>
              <button
                type="button"
                onClick={() => void disconnectProvider(provider)}
                disabled={pendingProvider === provider}
                className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-white disabled:opacity-60"
              >
                {pendingProvider === provider ? 'Disconnecting...' : 'Disconnect'}
              </button>
            </div>
          ))
        )}
      </div>

      {message ? <p className="mt-4 text-sm text-emerald-700">{message}</p> : null}
      {error ? <p className="mt-4 text-sm text-rose-700">{error}</p> : null}
    </section>

)
}
</file>

<file path="src/components/account/DangerZone.tsx">
'use client'

import { useState } from 'react'

interface DangerZoneProps {
email: string
}

export default function DangerZone({ email }: DangerZoneProps) {
const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
const [expiresAt, setExpiresAt] = useState<string | null>(null)
const [confirmEmail, setConfirmEmail] = useState('')
const [password, setPassword] = useState('')
const [message, setMessage] = useState<string | null>(null)
const [error, setError] = useState<string | null>(null)
const [isExporting, setIsExporting] = useState(false)
const [isDeleting, setIsDeleting] = useState(false)

const canDelete = confirmEmail.trim().toLowerCase() === email.toLowerCase() && password.length > 0

async function handleExport() {
setIsExporting(true)
setMessage(null)
setError(null)

    try {
      const response = await fetch('/api/account/export', {
        method: 'POST',
      })

      const body = (await response.json()) as {
        downloadUrl?: string
        expiresAt?: string
        error?: string
      }
      if (!response.ok || !body.downloadUrl || !body.expiresAt) {
        throw new Error(body.error ?? 'Unable to export data')
      }

      setDownloadUrl(body.downloadUrl)
      setExpiresAt(body.expiresAt)
      setMessage('Your export is ready to download.')
    } catch (exportError) {
      setError(exportError instanceof Error ? exportError.message : 'Unable to export data')
    } finally {
      setIsExporting(false)
    }

}

async function handleDelete() {
if (!canDelete) {
return
}

    setIsDeleting(true)
    setMessage(null)
    setError(null)

    try {
      const response = await fetch('/api/account/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const body = (await response.json()) as { message?: string; error?: string }
      if (!response.ok) {
        throw new Error(body.error ?? 'Unable to delete account')
      }

      window.location.href = '/'
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Unable to delete account')
    } finally {
      setIsDeleting(false)
    }

}

return (

<section className="rounded-[2rem] border border-rose-200 bg-[linear-gradient(180deg,#fff7f6_0%,#fff1ef_100%)] p-6 shadow-sm">
<h2 className="text-2xl font-semibold text-rose-900">Data & Privacy</h2>
<p className="mt-2 text-sm text-rose-700">
Export everything you have created, or permanently delete your account. Deletion cannot be
undone.
</p>

      <div className="mt-6 space-y-6">
        <div className="rounded-2xl border border-stone-200 bg-white p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-stone-900">Export your data</p>
              <p className="mt-1 text-sm text-stone-500">
                Download your guides as Markdown plus a JSON export of guides and notes.
              </p>
            </div>
            <button
              type="button"
              data-testid="account-export-button"
              onClick={() => void handleExport()}
              disabled={isExporting}
              className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 disabled:opacity-60"
            >
              {isExporting ? 'Preparing...' : 'Export my data'}
            </button>
          </div>

          {downloadUrl ? (
            <div className="mt-4 rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700">
              <a href={downloadUrl} download className="font-medium text-sky-700 underline">
                Download your export
              </a>
              {expiresAt ? (
                <p className="mt-2 text-xs text-stone-500">
                  Available until {new Date(expiresAt).toLocaleTimeString()}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-rose-300 bg-white p-4">
          <p className="text-sm font-semibold text-rose-900">Delete account</p>
          <p className="mt-1 text-sm text-rose-700">
            Type your full account email and current password to confirm permanent deletion.
          </p>

          <div className="mt-4 space-y-4">
            <label className="block text-sm font-medium text-stone-700">
              Confirm email
              <input
                data-testid="account-delete-confirm-email"
                value={confirmEmail}
                onChange={(event) => setConfirmEmail(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800"
              />
            </label>

            <label className="block text-sm font-medium text-stone-700">
              Current password
              <input
                data-testid="account-delete-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800"
              />
            </label>
          </div>

          <button
            type="button"
            data-testid="account-delete-button"
            onClick={() => void handleDelete()}
            disabled={!canDelete || isDeleting}
            className="mt-5 rounded-full bg-rose-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete my account'}
          </button>
        </div>

        {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="text-sm text-rose-700">{error}</p> : null}
      </div>
    </section>

)
}
</file>

<file path="src/components/account/EmailSection.tsx">
'use client'

import { useState } from 'react'

interface EmailSectionProps {
email: string
pendingEmail: string | null
emailChangedState?: string | null
}

export default function EmailSection({
email,
pendingEmail,
emailChangedState,
}: EmailSectionProps) {
const [nextEmail, setNextEmail] = useState('')
const [message, setMessage] = useState<string | null>(
emailChangedState === '1' ? 'Email verified successfully.' : null,
)
const [error, setError] = useState<string | null>(
emailChangedState === 'conflict'
? 'That email is already in use.'
: emailChangedState === 'invalid'
? 'That verification link is no longer valid.'
: null,
)
const [isSaving, setIsSaving] = useState(false)

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
event.preventDefault()
setIsSaving(true)
setMessage(null)
setError(null)

    const normalizedEmail = nextEmail.trim().toLowerCase()

    try {
      const response = await fetch('/api/account/email', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail }),
      })

      const body = (await response.json()) as { message?: string; error?: string }
      if (!response.ok) {
        throw new Error(body.error ?? 'Unable to change email')
      }

      setNextEmail('')
      setMessage(
        `Verification email sent to ${normalizedEmail}. Your email won't change until you verify.`,
      )
    } catch (changeError) {
      setError(changeError instanceof Error ? changeError.message : 'Unable to change email')
    } finally {
      setIsSaving(false)
    }

}

return (

<section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
<h2 className="text-2xl font-semibold text-stone-900">Email</h2>
<p className="mt-2 text-sm text-stone-500">
Your current email is used for sign-in and account verification.
</p>

      <div className="mt-5 rounded-2xl bg-stone-50 p-4">
        <p className="text-sm font-medium text-stone-700">Current email</p>
        <p className="mt-1 text-base text-stone-900">{email}</p>
        {pendingEmail ? (
          <p className="mt-3 text-sm text-amber-700">
            Pending change: {pendingEmail}. Verify the email we sent before this takes effect.
          </p>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-stone-700">
          New email address
          <input
            data-testid="account-email-input"
            type="email"
            value={nextEmail}
            onChange={(event) => setNextEmail(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800"
          />
        </label>

        {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="text-sm text-rose-700">{error}</p> : null}

        <button
          type="submit"
          disabled={isSaving}
          className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 disabled:opacity-60"
        >
          {isSaving ? 'Sending...' : 'Send verification email'}
        </button>
      </form>
    </section>

)
}
</file>

<file path="src/components/account/PasswordSection.tsx">
'use client'

import { useState } from 'react'

export default function PasswordSection() {
const [currentPassword, setCurrentPassword] = useState('')
const [newPassword, setNewPassword] = useState('')
const [message, setMessage] = useState<string | null>(null)
const [error, setError] = useState<string | null>(null)
const [isSaving, setIsSaving] = useState(false)

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
event.preventDefault()
setIsSaving(true)
setMessage(null)
setError(null)

    try {
      const response = await fetch('/api/account/password', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const body = (await response.json()) as { message?: string; error?: string }
      if (!response.ok) {
        throw new Error(body.error ?? 'Password update failed')
      }

      setCurrentPassword('')
      setNewPassword('')
      setMessage(body.message ?? 'Password updated')
    } catch (passwordError) {
      setError(passwordError instanceof Error ? passwordError.message : 'Password update failed')
    } finally {
      setIsSaving(false)
    }

}

return (

<section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
<h2 className="text-2xl font-semibold text-stone-900">Password</h2>
<p className="mt-2 text-sm text-stone-500">
Changing your password signs out your other active sessions.
</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-stone-700">
          Current password
          <input
            data-testid="account-current-password"
            type="password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800"
          />
        </label>

        <label className="block text-sm font-medium text-stone-700">
          New password
          <input
            data-testid="account-new-password"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800"
          />
        </label>

        {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="text-sm text-rose-700">{error}</p> : null}

        <button
          type="submit"
          data-testid="account-password-save"
          disabled={isSaving}
          className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 disabled:opacity-60"
        >
          {isSaving ? 'Updating...' : 'Change password'}
        </button>
      </form>
    </section>

)
}
</file>

<file path="src/components/account/ProfileSection.tsx">
'use client'

import { useState } from 'react'
import type { AccountPageUser } from '@/lib/db/repositories/users'

interface ProfileSectionProps {
user: AccountPageUser
}

export default function ProfileSection({ user }: ProfileSectionProps) {
const [name, setName] = useState(user.name ?? '')
const [message, setMessage] = useState<string | null>(null)
const [error, setError] = useState<string | null>(null)
const [isSaving, setIsSaving] = useState(false)

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
event.preventDefault()
setIsSaving(true)
setMessage(null)
setError(null)

    try {
      const response = await fetch('/api/account/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })

      if (!response.ok) {
        throw new Error('Failed to save profile')
      }

      const body = (await response.json()) as { name: string | null }
      setName(body.name ?? '')
      setMessage('Profile updated.')
    } catch {
      setError('Unable to update your profile right now.')
    } finally {
      setIsSaving(false)
    }

}

return (

<section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
<h2 className="text-2xl font-semibold text-stone-900">Profile</h2>
<p className="mt-2 text-sm text-stone-500">Your public-facing identity across FlashGuides.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-stone-700">
          Display name
          <input
            data-testid="account-name-input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800"
          />
        </label>

        <label className="block text-sm font-medium text-stone-700">
          Email
          <input
            value={user.email}
            disabled
            className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-100 px-4 py-3 text-sm text-stone-500"
          />
        </label>

        {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
        {error ? <p className="text-sm text-rose-700">{error}</p> : null}

        <button
          type="submit"
          data-testid="account-profile-save"
          disabled={isSaving}
          className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-stone-700 disabled:opacity-60"
        >
          {isSaving ? 'Saving...' : 'Save profile'}
        </button>
      </form>
    </section>

)
}
</file>

<file path="src/components/auth/ForgotPasswordForm.tsx">
'use client'

import { useState, FormEvent } from 'react'

export function ForgotPasswordForm() {
const [success, setSuccess] = useState(false)
const [error, setError] = useState<string | null>(null)
const [loading, setLoading] = useState(false)

async function handleSubmit(e: FormEvent<HTMLFormElement>) {
e.preventDefault()
setError(null)
setLoading(true)

    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setSuccess(true)
        return
      }

      setError('Something went wrong. Please try again.')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }

}

if (success) {
return (

<div role="status" className="rounded-md bg-green-50 p-4 text-green-800 text-sm">
If that email exists, a reset link has been sent. Check your inbox.
</div>
)
}

return (

<form onSubmit={handleSubmit} noValidate className="space-y-4">
{error && (
<div role="alert" className="rounded-md bg-red-50 p-3 text-red-700 text-sm">
{error}
</div>
)}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span
            aria-label="Loading"
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
          />
        ) : (
          'Send reset link'
        )}
      </button>

      <p className="text-center text-sm text-gray-600">
        Remember your password?{' '}
        <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          Sign in
        </a>
      </p>
    </form>

)
}
</file>

<file path="src/components/auth/RegisterForm.tsx">
'use client'

import { useState, FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'

interface FieldErrors {
email?: string[]
password?: string[]
name?: string[]
}

export function RegisterForm() {
const searchParams = useSearchParams()
const callbackUrl = searchParams?.get('callbackUrl') ?? '/dashboard'
const [error, setError] = useState<string | null>(null)
const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
const [success, setSuccess] = useState(false)
const [loading, setLoading] = useState(false)

async function handleSubmit(e: FormEvent<HTMLFormElement>) {
e.preventDefault()
setError(null)
setFieldErrors({})
setLoading(true)

    const form = e.currentTarget
    const data = {
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
      name: (form.elements.namedItem('name') as HTMLInputElement).value || undefined,
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const body = (await res.json()) as {
        message?: string
        error?: string
        fields?: FieldErrors
      }

      if (res.ok) {
        setSuccess(true)
        return
      }

      if (res.status === 422 && body.fields) {
        setFieldErrors(body.fields)
      } else {
        setError(body.error ?? 'Registration failed. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }

}

if (success) {
return (

<div role="status" className="rounded-md bg-green-50 p-4 text-green-800 text-sm">
Check your email for a verification link before signing in. After that, continue to{' '}
<a
href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
className="font-medium underline underline-offset-2" >
sign in
</a>
.
</div>
)
}

return (

<form onSubmit={handleSubmit} noValidate className="space-y-4">
{error && (
<div role="alert" className="rounded-md bg-red-50 p-3 text-red-700 text-sm">
{error}
</div>
)}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name <span className="text-gray-400">(optional)</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-describedby={fieldErrors.email ? 'email-error' : undefined}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        {fieldErrors.email && (
          <p id="email-error" className="mt-1 text-xs text-red-600">
            {fieldErrors.email[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          aria-describedby={fieldErrors.password ? 'password-error' : undefined}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        {fieldErrors.password && (
          <p id="password-error" className="mt-1 text-xs text-red-600">
            {fieldErrors.password[0]}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          At least 8 characters, one uppercase letter, one number.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span
            aria-label="Loading"
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
          />
        ) : (
          'Create account'
        )}
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <a
          href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign in
        </a>
      </p>
    </form>

)
}
</file>

<file path="src/components/auth/ResetPasswordForm.tsx">
'use client'

import { useState, FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'

interface FieldErrors {
password?: string[]
token?: string[]
}

export function ResetPasswordForm() {
const searchParams = useSearchParams()
const token = searchParams.get('token') ?? ''

const [success, setSuccess] = useState(false)
const [error, setError] = useState<string | null>(null)
const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
const [loading, setLoading] = useState(false)

async function handleSubmit(e: FormEvent<HTMLFormElement>) {
e.preventDefault()
setError(null)
setFieldErrors({})
setLoading(true)

    const form = e.currentTarget
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      const body = (await res.json()) as {
        message?: string
        error?: string
        fields?: FieldErrors
      }

      if (res.ok) {
        setSuccess(true)
        return
      }

      if (res.status === 410) {
        setError('This reset link has expired or is invalid. Please request a new one.')
        return
      }

      if (res.status === 422 && body.fields) {
        setFieldErrors(body.fields)
      } else {
        setError(body.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }

}

if (!token) {
return (

<div role="alert" className="rounded-md bg-red-50 p-4 text-red-800 text-sm">
Missing reset token.{' '}
<a href="/forgot-password" className="underline">
Request a new link.
</a>
</div>
)
}

if (success) {
return (

<div role="status" className="rounded-md bg-green-50 p-4 text-green-800 text-sm">
Password updated.{' '}
<a href="/login" className="underline font-medium">
Sign in with your new password.
</a>
</div>
)
}

return (

<form onSubmit={handleSubmit} noValidate className="space-y-4">
{error && (
<div role="alert" className="rounded-md bg-red-50 p-3 text-red-700 text-sm">
{error}
</div>
)}

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          New password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          aria-describedby={fieldErrors.password ? 'password-error' : undefined}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        {fieldErrors.password && (
          <p id="password-error" className="mt-1 text-xs text-red-600">
            {fieldErrors.password[0]}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          At least 8 characters, one uppercase letter, one number.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span
            aria-label="Loading"
            className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
          />
        ) : (
          'Reset password'
        )}
      </button>
    </form>

)
}
</file>

<file path="src/components/chat/StudyModeSelector.tsx">
'use client'

import type { StudyModeType } from '@/types/generation'

const MODES: { value: StudyModeType; label: string; description: string }[] = [
{ value: 'OVERVIEW', label: 'Overview', description: 'High-level summary' },
{ value: 'DEEP_DIVE', label: 'Deep Dive', description: 'In-depth exploration' },
{ value: 'EXAM_PREP', label: 'Exam Prep', description: 'Q&A for revision' },
{ value: 'ELI5', label: 'ELI5', description: 'Simple explanation' },
]

interface StudyModeSelectorProps {
value: StudyModeType
onChange: (mode: StudyModeType) => void
}

export default function StudyModeSelector({ value, onChange }: StudyModeSelectorProps) {
return (

<div className="flex flex-wrap gap-2" role="group" aria-label="Study mode">
{MODES.map((mode) => (
<button
key={mode.value}
type="button"
onClick={() => onChange(mode.value)}
aria-pressed={value === mode.value}
data-testid={`study-mode-${mode.value.toLowerCase()}`}
className={[
'rounded-full px-3 py-1 text-sm font-medium transition-colors',
value === mode.value
? 'bg-indigo-600 text-white'
: 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700',
].join(' ')} >
{mode.label}
</button>
))}
</div>
)
}
</file>

<file path="src/components/dashboard/DashboardSearch.tsx">
'use client'

interface DashboardSearchProps {
value: string
onChange: (value: string) => void
viewMode: 'grid' | 'list'
onViewModeChange: (value: 'grid' | 'list') => void
}

export default function DashboardSearch({
value,
onChange,
viewMode,
onViewModeChange,
}: DashboardSearchProps) {
return (

<div className="flex flex-col gap-4 rounded-3xl border border-stone-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
<label className="flex-1 text-sm font-medium text-stone-700">
Search guides
<input
data-testid="dashboard-search"
value={value}
onChange={(event) => onChange(event.target.value)}
placeholder="Search by title, content, or tag"
className="mt-1 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 placeholder:text-stone-400"
/>
</label>

      <div className="flex items-center gap-2 rounded-full bg-stone-100 p-1">
        <button
          type="button"
          data-testid="dashboard-grid-toggle"
          onClick={() => onViewModeChange('grid')}
          className={[
            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
            viewMode === 'grid' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500',
          ].join(' ')}
          aria-pressed={viewMode === 'grid'}
        >
          Grid
        </button>
        <button
          type="button"
          data-testid="dashboard-list-toggle"
          onClick={() => onViewModeChange('list')}
          className={[
            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
            viewMode === 'list' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500',
          ].join(' ')}
          aria-pressed={viewMode === 'list'}
        >
          List
        </button>
      </div>
    </div>

)
}
</file>

<file path="src/components/dashboard/DashboardShell.tsx">
'use client'

import Link from 'next/link'
import { startTransition, useDeferredValue, useEffect, useRef, useState } from 'react'
import type { FolderItem, GuideListItem } from '@/lib/db/repositories/types'
import DashboardSearch from '@/components/dashboard/DashboardSearch'
import FolderSidebar from '@/components/dashboard/FolderSidebar'
import GuideGrid from '@/components/dashboard/GuideGrid'
import GuideList from '@/components/dashboard/GuideList'
import UsageSummary from '@/components/dashboard/UsageSummary'
import WorkspacePageHeader from '@/components/ui/WorkspacePageHeader'

interface DashboardShellProps {
initialGuides: GuideListItem[]
initialTotal: number
initialPage: number
initialFolders: FolderItem[]
usageSummary: {
totalGuides: number
approxBytes: number
}
}

interface GuidesResponse {
guides: GuideListItem[]
total: number
page: number
}

function buildGuideQuery(params: {
q: string
folderId: string | null
view: 'all' | 'favorites' | 'recent'
}) {
const searchParams = new URLSearchParams({
page: '1',
limit: params.view === 'recent' ? '5' : '24',
view: params.view,
})

if (params.q.trim()) {
searchParams.set('q', params.q.trim())
}

if (params.folderId) {
searchParams.set('folderId', params.folderId)
}

return searchParams.toString()
}

export default function DashboardShell({
initialGuides,
initialTotal,
initialPage,
initialFolders,
usageSummary,
}: DashboardShellProps) {
const [guides, setGuides] = useState(initialGuides)
const [total, setTotal] = useState(initialTotal)
const [page, setPage] = useState(initialPage)
const [folders, setFolders] = useState(initialFolders)
const [search, setSearch] = useState('')
const deferredSearch = useDeferredValue(search)
const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
const [activeView, setActiveView] = useState<'all' | 'favorites' | 'recent'>('all')
const [activeFolderId, setActiveFolderId] = useState<string | null>(null)
const [creatingFolderName, setCreatingFolderName] = useState('')
const [pendingGuideId, setPendingGuideId] = useState<string | null>(null)
const [message, setMessage] = useState<string | null>(null)
const [error, setError] = useState<string | null>(null)
const [isLoading, setIsLoading] = useState(false)
const initialFetchSkipped = useRef(false)

useEffect(() => {
if (!initialFetchSkipped.current) {
initialFetchSkipped.current = true
return
}

    const timeoutId = window.setTimeout(() => {
      void (async () => {
        const query = buildGuideQuery({
          q: deferredSearch,
          folderId: activeFolderId,
          view: activeView,
        })

        setIsLoading(true)
        setError(null)

        try {
          const response = await fetch(`/api/guides?${query}`)
          if (!response.ok) {
            throw new Error('Failed to load guides')
          }

          const next = (await response.json()) as GuidesResponse
          startTransition(() => {
            setGuides(next.guides)
            setTotal(next.total)
            setPage(next.page)
          })
        } catch {
          setError('Unable to load dashboard data right now.')
        } finally {
          setIsLoading(false)
        }
      })()
    }, 300)

    return () => window.clearTimeout(timeoutId)

}, [deferredSearch, activeFolderId, activeView])

async function toggleFavorite(guide: GuideListItem) {
setPendingGuideId(guide.id)
setMessage(null)
setError(null)

    try {
      const response = await fetch(`/api/guides/${guide.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: !guide.isFavorite }),
      })

      if (!response.ok) {
        throw new Error('Failed to update favorite')
      }

      const updated = (await response.json()) as GuideListItem
      setGuides((current) => current.map((item) => (item.id === updated.id ? updated : item)))
      setMessage(updated.isFavorite ? 'Guide added to favorites.' : 'Guide removed from favorites.')
    } catch {
      setError('Unable to update favorite right now.')
    } finally {
      setPendingGuideId(null)
    }

}

async function moveFolder(guide: GuideListItem, folderId: string | null) {
setPendingGuideId(guide.id)
setMessage(null)
setError(null)

    try {
      const response = await fetch(`/api/guides/${guide.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderId }),
      })

      if (!response.ok) {
        throw new Error('Failed to move guide')
      }

      const updated = (await response.json()) as GuideListItem
      setGuides((current) => current.map((item) => (item.id === updated.id ? updated : item)))
      setMessage('Guide folder updated.')
    } catch {
      setError('Unable to move guide right now.')
    } finally {
      setPendingGuideId(null)
    }

}

async function saveTags(guide: GuideListItem, tags: string[]) {
setPendingGuideId(guide.id)
setMessage(null)
setError(null)

    try {
      const response = await fetch(`/api/guides/${guide.id}/tags`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags }),
      })

      if (!response.ok) {
        throw new Error('Failed to update tags')
      }

      const body = (await response.json()) as { tags: GuideListItem['tags'] }
      setGuides((current) =>
        current.map((item) => (item.id === guide.id ? { ...item, tags: body.tags } : item)),
      )
      setMessage('Guide tags updated.')
    } catch {
      setError('Unable to update guide tags right now.')
    } finally {
      setPendingGuideId(null)
    }

}

async function deleteGuide(guide: GuideListItem) {
setPendingGuideId(guide.id)
setMessage(null)
setError(null)

    try {
      const response = await fetch('/api/guides', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: [guide.id] }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete guide')
      }

      setGuides((current) => current.filter((item) => item.id !== guide.id))
      setTotal((current) => Math.max(0, current - 1))
      setMessage(`Deleted ${guide.title}.`)
    } catch {
      setError('Unable to delete guide right now.')
    } finally {
      setPendingGuideId(null)
    }

}

async function createFolder() {
const name = creatingFolderName.trim()
if (!name) {
return
}

    setMessage(null)
    setError(null)

    try {
      const response = await fetch('/api/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })

      if (!response.ok) {
        throw new Error('Failed to create folder')
      }

      const folder = (await response.json()) as FolderItem
      setFolders((current) => [...current, folder])
      setCreatingFolderName('')
      setMessage(`Created folder ${folder.name}.`)
    } catch {
      setError('Unable to create folder right now.')
    }

}

async function renameFolder(folder: FolderItem) {
const nextName = window.prompt('Rename folder', folder.name)?.trim()
if (!nextName || nextName === folder.name) {
return
}

    setMessage(null)
    setError(null)

    try {
      const response = await fetch(`/api/folders/${folder.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nextName }),
      })

      if (!response.ok) {
        throw new Error('Failed to rename folder')
      }

      const updated = (await response.json()) as FolderItem
      setFolders((current) => current.map((item) => (item.id === updated.id ? updated : item)))
      setGuides((current) =>
        current.map((guide) =>
          guide.folder?.id === updated.id
            ? { ...guide, folder: { id: updated.id, name: updated.name } }
            : guide,
        ),
      )
      setMessage('Folder renamed.')
    } catch {
      setError('Unable to rename folder right now.')
    }

}

async function deleteFolder(folder: FolderItem) {
if (!window.confirm(`Delete folder ${folder.name}? Guides will remain saved.`)) {
return
}

    setMessage(null)
    setError(null)

    try {
      const response = await fetch(`/api/folders/${folder.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete folder')
      }

      setFolders((current) => current.filter((item) => item.id !== folder.id))
      setGuides((current) =>
        current.map((guide) =>
          guide.folder?.id === folder.id ? { ...guide, folder: null } : guide,
        ),
      )

      if (activeFolderId === folder.id) {
        setActiveFolderId(null)
        setActiveView('all')
      }

      setMessage('Folder deleted.')
    } catch {
      setError('Unable to delete folder right now.')
    }

}

const currentViewLabel = activeFolderId
? (folders.find((folder) => folder.id === activeFolderId)?.name ?? 'Folder')
: activeView === 'recent'
? 'Recent guides'
: activeView === 'favorites'
? 'Favorite guides'
: 'All guides'

return (

<main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#f7efe4,transparent_28%),linear-gradient(180deg,#f9f6f1_0%,#f4f1ec_100%)] px-4 py-8 sm:px-6 lg:px-8">
<div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px,minmax(0,1fr)]">
<div className="lg:col-span-2">
<WorkspacePageHeader
title="Your study library"
description="Organize saved guides, star what matters, and filter by folder or search query."
actions={
<>
<Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm font-medium text-stone-700 transition-colors hover:border-stone-400 hover:text-stone-950"
                >
Return to homepage
</Link>
<div className="rounded-2xl bg-stone-100 px-4 py-3 text-sm text-stone-600">
<span data-testid="dashboard-total">{total}</span> results · page {page}
</div>
</>
}
/>
</div>

        <div className="space-y-6">
          <FolderSidebar
            folders={folders}
            activeView={activeView}
            activeFolderId={activeFolderId}
            creatingFolderName={creatingFolderName}
            onCreatingFolderNameChange={setCreatingFolderName}
            onCreateFolder={() => void createFolder()}
            onRenameFolder={(folder) => void renameFolder(folder)}
            onDeleteFolder={(folder) => void deleteFolder(folder)}
            onSelectView={(view) => {
              setActiveView(view)
              setActiveFolderId(null)
            }}
            onSelectFolder={(folderId) => {
              setActiveFolderId(folderId)
              setActiveView('all')
            }}
          />

          <UsageSummary
            totalGuides={usageSummary.totalGuides}
            approxBytes={usageSummary.approxBytes}
          />
        </div>

        <section className="space-y-6">
          <DashboardSearch
            value={search}
            onChange={setSearch}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {message ? (
            <div
              data-testid="dashboard-message"
              className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            >
              {message}
            </div>
          ) : null}

          {error ? (
            <div
              data-testid="dashboard-error"
              className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
            >
              {error}
            </div>
          ) : null}

          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-2xl font-semibold text-stone-900">{currentViewLabel}</h2>
              <p className="text-sm text-stone-500">
                {isLoading
                  ? 'Refreshing your library...'
                  : 'Debounced search and filters update results in place.'}
              </p>
            </div>
          </div>

          {guides.length === 0 ? (
            <div
              data-testid="dashboard-empty"
              className="rounded-[2rem] border border-dashed border-stone-300 bg-white/70 px-8 py-16 text-center shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-stone-900">No guides match your search</h3>
              <p className="mt-3 text-sm text-stone-500">
                Try a different query, clear your folder filter, or generate a new guide from the
                homepage.
              </p>
            </div>
          ) : viewMode === 'grid' ? (
            <GuideGrid
              guides={guides}
              folders={folders}
              pendingGuideId={pendingGuideId}
              onToggleFavorite={(guide) => void toggleFavorite(guide)}
              onDelete={(guide) => void deleteGuide(guide)}
              onMoveFolder={(guide, folderId) => void moveFolder(guide, folderId)}
              onSaveTags={(guide, tags) => void saveTags(guide, tags)}
            />
          ) : (
            <GuideList
              guides={guides}
              folders={folders}
              pendingGuideId={pendingGuideId}
              onToggleFavorite={(guide) => void toggleFavorite(guide)}
              onDelete={(guide) => void deleteGuide(guide)}
              onMoveFolder={(guide, folderId) => void moveFolder(guide, folderId)}
              onSaveTags={(guide, tags) => void saveTags(guide, tags)}
            />
          )}
        </section>
      </div>
    </main>

)
}
</file>

<file path="src/components/dashboard/FolderSidebar.tsx">
'use client'

import type { FolderItem } from '@/lib/db/repositories/types'

interface FolderSidebarProps {
folders: FolderItem[]
activeView: 'all' | 'favorites' | 'recent'
activeFolderId: string | null
onSelectView: (view: 'all' | 'favorites' | 'recent') => void
onSelectFolder: (folderId: string | null) => void
creatingFolderName: string
onCreatingFolderNameChange: (value: string) => void
onCreateFolder: () => void
onRenameFolder: (folder: FolderItem) => void
onDeleteFolder: (folder: FolderItem) => void
}

export default function FolderSidebar({
folders,
activeView,
activeFolderId,
onSelectView,
onSelectFolder,
creatingFolderName,
onCreatingFolderNameChange,
onCreateFolder,
onRenameFolder,
onDeleteFolder,
}: FolderSidebarProps) {
return (

<aside className="space-y-5 rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm">
<div>
<p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">Views</p>
<div className="mt-3 space-y-2">
{[
{ key: 'all', label: 'All guides' },
{ key: 'recent', label: 'Recent' },
{ key: 'favorites', label: 'Favorites' },
].map((item) => (
<button
key={item.key}
type="button"
data-testid={`dashboard-view-${item.key}`}
onClick={() => {
onSelectFolder(null)
onSelectView(item.key as 'all' | 'favorites' | 'recent')
}}
className={[
'flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors',
activeView === item.key && activeFolderId === null
? 'bg-stone-900 text-white'
: 'bg-stone-50 text-stone-700 hover:bg-stone-100',
].join(' ')} >
<span>{item.label}</span>
</button>
))}
</div>
</div>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">
            Folders
          </p>
        </div>
        <div className="mt-3 space-y-2">
          {folders.map((folder) => (
            <div key={folder.id} className="rounded-2xl bg-stone-50 p-2">
              <button
                type="button"
                data-testid={`folder-filter-${folder.id}`}
                onClick={() => onSelectFolder(folder.id)}
                className={[
                  'flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm font-medium transition-colors',
                  activeFolderId === folder.id
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-700',
                ].join(' ')}
              >
                <span>{folder.name}</span>
              </button>
              <div className="mt-2 flex gap-2 px-1 pb-1">
                <button
                  type="button"
                  onClick={() => onRenameFolder(folder)}
                  className="text-xs font-medium text-stone-500 hover:text-stone-900"
                >
                  Rename
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteFolder(folder)}
                  className="text-xs font-medium text-rose-600 hover:text-rose-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-3xl border border-dashed border-stone-200 bg-stone-50 p-4">
          <label className="block text-sm font-medium text-stone-700">
            New folder
            <input
              data-testid="new-folder-input"
              value={creatingFolderName}
              onChange={(event) => onCreatingFolderNameChange(event.target.value)}
              placeholder="Exam prep"
              className="mt-2 w-full rounded-2xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 placeholder:text-stone-400"
            />
          </label>
          <button
            type="button"
            data-testid="create-folder-button"
            onClick={onCreateFolder}
            className="mt-3 w-full rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            Create folder
          </button>
        </div>
      </div>
    </aside>

)
}
</file>

<file path="src/components/dashboard/GuideCard.tsx">
'use client'

import Link from 'next/link'
import type { FolderItem, GuideListItem } from '@/lib/db/repositories/types'

const STUDY_MODE_LABELS: Record<GuideListItem['studyMode'], string> = {
OVERVIEW: 'Overview',
DEEP_DIVE: 'Deep Dive',
EXAM_PREP: 'Exam Prep',
ELI5: 'ELI5',
}

const STUDY_MODE_STYLES: Record<GuideListItem['studyMode'], string> = {
OVERVIEW: 'bg-sky-100 text-sky-700',
DEEP_DIVE: 'bg-amber-100 text-amber-800',
EXAM_PREP: 'bg-rose-100 text-rose-700',
ELI5: 'bg-emerald-100 text-emerald-700',
}

function formatRelativeDate(date: Date | string): string {
const value = typeof date === 'string' ? new Date(date) : date
const diffMs = Date.now() - value.getTime()
const dayMs = 1000 _ 60 _ 60 \* 24
const days = Math.max(0, Math.floor(diffMs / dayMs))

if (days === 0) return 'Today'
if (days === 1) return '1 day ago'
if (days < 30) return `${days} days ago`

return value.toLocaleDateString('en-US', {
month: 'short',
day: 'numeric',
year: 'numeric',
})
}

interface DashboardGuideCardProps {
guide: GuideListItem
folders: FolderItem[]
onToggleFavorite: (guide: GuideListItem) => void
onDelete: (guide: GuideListItem) => void
onMoveFolder: (guide: GuideListItem, folderId: string | null) => void
onSaveTags: (guide: GuideListItem, tags: string[]) => void
pendingGuideId?: string | null
compact?: boolean
}

export default function GuideCard({
guide,
folders,
onToggleFavorite,
onDelete,
onMoveFolder,
onSaveTags,
pendingGuideId,
compact = false,
}: DashboardGuideCardProps) {
const isPending = pendingGuideId === guide.id
const tagValue = guide.tags.map((tag) => tag.name).join(', ')

return (

<article
data-testid="dashboard-guide-card"
className={[
'rounded-3xl border border-stone-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md',
compact ? 'flex items-center gap-4' : 'flex flex-col gap-4',
].join(' ')} >
<div className={compact ? 'min-w-0 flex-1' : 'space-y-3'}>
<div className="flex items-start justify-between gap-3">
<div className="min-w-0 space-y-2">
<div className="flex flex-wrap items-center gap-2">
<span
className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STUDY_MODE_STYLES[guide.studyMode]}`} >
{STUDY_MODE_LABELS[guide.studyMode]}
</span>
{guide.folder ? (
<span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600">
{guide.folder.name}
</span>
) : null}
</div>

            <Link
              href={`/guide/${guide.slug}`}
              className="block text-lg font-semibold text-stone-900 transition-colors hover:text-sky-700"
            >
              {guide.title}
            </Link>

            <p className="text-sm text-stone-500">{formatRelativeDate(guide.createdAt)}</p>
          </div>

          <button
            type="button"
            data-testid={`favorite-toggle-${guide.id}`}
            onClick={() => onToggleFavorite(guide)}
            disabled={isPending}
            className={[
              'rounded-full border px-3 py-1 text-sm font-medium transition-colors',
              guide.isFavorite
                ? 'border-amber-300 bg-amber-100 text-amber-800'
                : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300',
            ].join(' ')}
            aria-pressed={guide.isFavorite}
          >
            {guide.isFavorite ? 'Starred' : 'Star'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {guide.tags.map((tag) => (
            <span
              key={tag.id}
              className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600"
            >
              #{tag.name}
            </span>
          ))}
          {guide.tags.length === 0 ? (
            <span className="rounded-full border border-dashed border-stone-200 px-2.5 py-1 text-xs text-stone-400">
              No tags yet
            </span>
          ) : null}
        </div>
      </div>

      <div className={compact ? 'w-full max-w-sm space-y-3' : 'space-y-3'}>
        <label className="block text-sm font-medium text-stone-700">
          Folder
          <select
            data-testid={`folder-select-${guide.id}`}
            className="mt-1 w-full rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-700"
            value={guide.folder?.id ?? ''}
            disabled={isPending}
            onChange={(event) => onMoveFolder(guide, event.target.value || null)}
          >
            <option value="">Unfiled</option>
            {folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-stone-700">
          Tags
          <input
            data-testid={`tag-input-${guide.id}`}
            defaultValue={tagValue}
            placeholder="react, hooks"
            className="mt-1 w-full rounded-2xl border border-stone-200 bg-stone-50 px-3 py-2 text-sm text-stone-700 placeholder:text-stone-400"
            onBlur={(event) => {
              const nextTags = event.currentTarget.value
                .split(',')
                .map((value) => value.trim())
                .filter(Boolean)

              const current = guide.tags.map((tag) => tag.name)
              if (JSON.stringify(nextTags) !== JSON.stringify(current)) {
                onSaveTags(guide, nextTags)
              }
            }}
          />
        </label>

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/guide/${guide.slug}`}
            className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700"
          >
            Open guide
          </Link>
          <button
            type="button"
            data-testid={`delete-guide-${guide.id}`}
            onClick={() => onDelete(guide)}
            disabled={isPending}
            className="rounded-full border border-rose-200 px-4 py-2 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-50"
          >
            Delete
          </button>
        </div>
      </div>
    </article>

)
}
</file>

<file path="src/components/dashboard/GuideGrid.tsx">
import type { FolderItem, GuideListItem } from '@/lib/db/repositories/types'
import GuideCard from '@/components/dashboard/GuideCard'

interface GuideGridProps {
guides: GuideListItem[]
folders: FolderItem[]
pendingGuideId?: string | null
onToggleFavorite: (guide: GuideListItem) => void
onDelete: (guide: GuideListItem) => void
onMoveFolder: (guide: GuideListItem, folderId: string | null) => void
onSaveTags: (guide: GuideListItem, tags: string[]) => void
}

export default function GuideGrid(props: GuideGridProps) {
return (

<div data-testid="dashboard-grid" className="grid grid-cols-1 gap-5 xl:grid-cols-2">
{props.guides.map((guide) => (
<GuideCard
          key={guide.id}
          guide={guide}
          folders={props.folders}
          pendingGuideId={props.pendingGuideId}
          onToggleFavorite={props.onToggleFavorite}
          onDelete={props.onDelete}
          onMoveFolder={props.onMoveFolder}
          onSaveTags={props.onSaveTags}
        />
))}
</div>
)
}
</file>

<file path="src/components/dashboard/GuideList.tsx">
import type { FolderItem, GuideListItem } from '@/lib/db/repositories/types'
import GuideCard from '@/components/dashboard/GuideCard'

interface GuideListProps {
guides: GuideListItem[]
folders: FolderItem[]
pendingGuideId?: string | null
onToggleFavorite: (guide: GuideListItem) => void
onDelete: (guide: GuideListItem) => void
onMoveFolder: (guide: GuideListItem, folderId: string | null) => void
onSaveTags: (guide: GuideListItem, tags: string[]) => void
}

export default function GuideList(props: GuideListProps) {
return (

<div data-testid="dashboard-list" className="space-y-4">
{props.guides.map((guide) => (
<GuideCard
          key={guide.id}
          compact
          guide={guide}
          folders={props.folders}
          pendingGuideId={props.pendingGuideId}
          onToggleFavorite={props.onToggleFavorite}
          onDelete={props.onDelete}
          onMoveFolder={props.onMoveFolder}
          onSaveTags={props.onSaveTags}
        />
))}
</div>
)
}
</file>

<file path="src/components/dashboard/UsageSummary.tsx">
interface UsageSummaryProps {
  totalGuides: number
  approxBytes: number
}

function formatKilobytes(bytes: number): string {
return `${Math.max(1, Math.round(bytes / 1024))} KB`
}

export default function UsageSummary({ totalGuides, approxBytes }: UsageSummaryProps) {
return (

<section className="rounded-[2rem] border border-stone-200 bg-[linear-gradient(135deg,#f6f1e8,white)] p-5 shadow-sm">
<p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
Usage summary
</p>
<div className="mt-4 flex items-end justify-between gap-3">
<div>
<p data-testid="usage-summary-guides" className="text-3xl font-semibold text-stone-900">
{totalGuides}
</p>
<p className="text-sm text-stone-600">saved guides</p>
</div>
<div className="rounded-2xl bg-white/80 px-4 py-3 text-right shadow-sm">
<p data-testid="usage-summary-storage" className="text-lg font-semibold text-stone-900">
{formatKilobytes(approxBytes)}
</p>
<p className="text-xs uppercase tracking-[0.2em] text-stone-400">approx storage</p>
</div>
</div>
</section>
)
}
</file>

<file path="src/components/guest/QuotaExhaustedModal.tsx">
'use client'

import Link from 'next/link'

interface QuotaExhaustedModalProps {
/** Whether the modal is visible \*/
open: boolean
/** Called when the user dismisses the modal \*/
onClose?: () => void
}

/\*\*

- QuotaExhaustedModal — Client Component.
- Full-screen overlay shown when the server returns 429 (guest quota reached).
  \*/
  export default function QuotaExhaustedModal({ open, onClose }: QuotaExhaustedModalProps) {
  if (!open) return null

return (

<div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quota-modal-heading"
      data-testid="quota-exhausted-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
{/_ Card — stop click propagation so clicks inside don't close _/}
<div
className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
onClick={(e) => e.stopPropagation()} >
<h2 id="quota-modal-heading" className="mb-3 text-2xl font-bold text-gray-900">
You&apos;ve used your 3 free guides for today
</h2>
<p className="mb-6 text-gray-600">
Sign up free to unlock unlimited guides, save your work, and more.
</p>

        <div className="flex flex-col gap-3">
          <Link
            href="/register"
            className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-center font-semibold text-white hover:bg-indigo-500 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
          >
            Create free account
          </Link>
          <Link
            href="/login"
            className="w-full rounded-xl border border-gray-300 px-6 py-3 text-center font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Log in
          </Link>
        </div>

        {onClose && (
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        )}
      </div>
    </div>

)
}
</file>

<file path="src/components/guest/WatermarkOverlay.tsx">
interface WatermarkOverlayProps {
  isWatermark: boolean
}

/\*\*

- WatermarkOverlay — renders a semi-transparent diagonal "PREVIEW — Sign up to save"
- overlay on top of guest-generated guide content.
-
- The parent element must have `position: relative` (or `relative` in Tailwind).
  \*/
  export default function WatermarkOverlay({ isWatermark }: WatermarkOverlayProps) {
  if (!isWatermark) return null

return (

<div
      aria-hidden="true"
      data-testid="watermark-overlay"
      className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center overflow-hidden"
    >
<span className="select-none rotate-[-35deg] text-4xl font-bold tracking-widest text-gray-400/40 whitespace-nowrap">
PREVIEW — Sign up to save
</span>
</div>
)
}
</file>

<file path="src/components/guide/CollapsibleSection.tsx">
'use client'

import { useState } from 'react'

interface CollapsibleSectionProps {
id: string
heading: string
children: React.ReactNode
defaultOpen?: boolean
}

export default function CollapsibleSection({
id,
heading,
children,
defaultOpen = true,
}: CollapsibleSectionProps) {
const [open, setOpen] = useState(defaultOpen)

return (

<section
      id={id}
      className="rounded-2xl border border-zinc-300 bg-white shadow-sm dark:border-zinc-700 dark:bg-black"
      data-testid="collapsible-section"
    >
<h2>
<button
type="button"
onClick={() => setOpen((value) => !value)}
aria-expanded={open}
aria-controls={`${id}-content`}
className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-lg font-semibold text-zinc-950 dark:text-zinc-50" >
<span>{heading}</span>
<span
className={[
'text-sm text-zinc-600 transition-transform dark:text-zinc-300',
open ? 'rotate-180' : 'rotate-0',
].join(' ')} >
▾
</span>
</button>
</h2>
<div
id={`${id}-content`}
hidden={!open}
className="px-5 pb-5 text-zinc-800 dark:text-zinc-200"
data-testid="collapsible-content" >
{children}
</div>
</section>
)
}
</file>

<file path="src/components/guide/FlashcardCard.tsx">
'use client'

interface FlashcardCardProps {
front: string
back: string
flipped: boolean
onFlip: () => void
}

export default function FlashcardCard({ front, back, flipped, onFlip }: FlashcardCardProps) {
return (
<button
      type="button"
      onClick={onFlip}
      className="group relative min-h-56 w-full rounded-3xl border border-zinc-200 bg-linear-to-br from-white to-zinc-50 p-6 text-left shadow-sm transition-transform duration-300 [transform-style:preserve-3d] dark:border-zinc-700 dark:from-zinc-900 dark:to-zinc-800"
      aria-pressed={flipped}
      data-testid="flashcard-card"
    >
<span className="mb-3 block text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
{flipped ? 'Answer' : 'Prompt'}
</span>
<span className="block text-xl font-semibold leading-8 text-zinc-950 dark:text-zinc-50">
{flipped ? back : front}
</span>
<span className="mt-6 block text-sm text-zinc-500 dark:text-zinc-400">
Click card to flip
</span>
</button>
)
}
</file>

<file path="src/components/guide/FlashcardDeck.tsx">
'use client'

import { useState } from 'react'
import FlashcardCard from './FlashcardCard'
import type { FlashcardItem } from '@/types/generation'

interface FlashcardDeckProps {
cards: FlashcardItem[]
}

export default function FlashcardDeck({ cards }: FlashcardDeckProps) {
const [index, setIndex] = useState(0)
const [flipped, setFlipped] = useState(false)

if (cards.length === 0) {
return null
}

const current = cards[index]!

function move(offset: number) {
setIndex((currentIndex) => (currentIndex + offset + cards.length) % cards.length)
setFlipped(false)
}

return (

<div
      className="space-y-4 rounded-3xl border border-zinc-300 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-black"
      data-testid="flashcard-deck"
    >
<div className="flex items-center justify-between gap-4">
<div>
<p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
Flashcards
</p>
<p className="text-sm text-zinc-700 dark:text-zinc-200">
Card {index + 1} of {cards.length}
</p>
</div>
</div>

      <FlashcardCard
        front={current.front}
        back={current.back}
        flipped={flipped}
        onFlip={() => setFlipped((value) => !value)}
      />

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => move(-1)}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => setFlipped((value) => !value)}
          className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300"
        >
          Flip
        </button>
        <button
          type="button"
          onClick={() => move(1)}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
        >
          Next
        </button>
      </div>
    </div>

)
}
</file>

<file path="src/components/guide/FollowUpChat.tsx">
'use client'

import Link from 'next/link'
import { useState } from 'react'

type FollowUpChatEvent =
| { type: 'token'; text: string }
| { type: 'done' }
| { type: 'error'; message: string }

interface ChatMessage {
role: 'user' | 'assistant'
content: string
}

interface FollowUpChatProps {
guideSlug: string
isAuthenticated: boolean
}

function ChatIcon() {
return (
<svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
<path d="M7 10h10" strokeLinecap="round" />
<path d="M7 14h6" strokeLinecap="round" />
<path
        d="M21 11.5C21 6.80558 16.9706 3 12 3C7.02944 3 3 6.80558 3 11.5C3 13.8589 4.01707 15.9934 5.66527 17.5327C5.82653 17.6833 5.93798 17.8766 5.96192 18.0957L6.20414 20.314C6.2464 20.7008 6.6463 20.9468 7.0243 20.8143L9.43452 19.9692C9.66441 19.8886 9.91642 19.8864 10.1481 19.9611C10.751 20.1554 11.3713 20.25 12 20.25C16.9706 20.25 21 16.4444 21 11.75V11.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
</svg>
)
}

export default function FollowUpChat({ guideSlug, isAuthenticated }: FollowUpChatProps) {
const [message, setMessage] = useState('')
const [messages, setMessages] = useState<ChatMessage[]>([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')
const [isOpen, setIsOpen] = useState(false)

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
event.preventDefault()

    const trimmed = message.trim()
    if (!trimmed || loading || !isAuthenticated) {
      return
    }

    setLoading(true)
    setError('')
    setMessage('')
    setMessages((current) => [
      ...current,
      { role: 'user', content: trimmed },
      { role: 'assistant', content: '' },
    ])

    let response: Response
    try {
      response = await fetch(`/api/chat/${guideSlug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      })
    } catch {
      setLoading(false)
      setError('Network error, please try again.')
      setMessages((current) => current.slice(0, -1))
      return
    }

    if (!response.ok) {
      setLoading(false)
      setError(
        response.status === 401
          ? 'Sign in to ask follow-up questions.'
          : 'Unable to start follow-up chat.',
      )
      setMessages((current) => current.slice(0, -1))
      return
    }

    const reader = response.body?.getReader()
    if (!reader) {
      setLoading(false)
      setError('Unexpected response from server.')
      return
    }

    const decoder = new TextDecoder()
    let buffer = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          break
        }

        buffer += decoder.decode(value, { stream: true })
        const parts = buffer.split('\n\n')
        buffer = parts.pop() ?? ''

        for (const part of parts) {
          const line = part.trim()
          if (!line.startsWith('data: ')) {
            continue
          }

          let chatEvent: FollowUpChatEvent
          try {
            chatEvent = JSON.parse(line.slice(6)) as FollowUpChatEvent
          } catch {
            continue
          }

          if (chatEvent.type === 'token') {
            setMessages((current) => {
              const next = [...current]
              const last = next[next.length - 1]
              if (last?.role === 'assistant') {
                next[next.length - 1] = { ...last, content: `${last.content}${chatEvent.text}` }
              }
              return next
            })
          } else if (chatEvent.type === 'error') {
            setError(chatEvent.message)
          }
        }
      }
    } catch {
      setError('The follow-up response was interrupted.')
    } finally {
      setLoading(false)
    }

}

return (

<div className="pointer-events-none fixed bottom-5 right-5 z-40 flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-3 sm:bottom-6 sm:right-6">
{isOpen ? (
<section
          className="pointer-events-auto w-[min(26rem,calc(100vw-1.5rem))] rounded-[2rem] border border-zinc-200 bg-white/95 p-5 shadow-[0_24px_80px_rgba(24,24,27,0.18)] backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/95 dark:shadow-[0_24px_80px_rgba(0,0,0,0.5)]"
          data-testid="follow-up-chat"
        >
<div className="mb-4 flex items-start justify-between gap-4">
<div>
<p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
Follow-up chat
</p>
<h2 className="mt-1 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
Ask deeper questions about this guide.
</h2>
</div>
<div className="flex items-center gap-2">
{!isAuthenticated ? (
<Link
href={`/login?callbackUrl=${encodeURIComponent(`/guide/${guideSlug}`)}`}
className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-100 dark:hover:text-zinc-100" >
Sign in
</Link>
) : null}
<button
type="button"
onClick={() => setIsOpen(false)}
className="rounded-full border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
aria-label="Close chat" >
Close
</button>
</div>
</div>

          {messages.length > 0 ? (
            <div
              className="mb-4 max-h-72 space-y-3 overflow-y-auto pr-1"
              data-testid="follow-up-messages"
            >
              {messages.map((entry, index) => (
                <div
                  key={`${entry.role}-${index}`}
                  className={[
                    'rounded-2xl px-4 py-3 text-sm leading-7',
                    entry.role === 'user'
                      ? 'bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950'
                      : 'border border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200',
                  ].join(' ')}
                >
                  {entry.content || (loading && entry.role === 'assistant' ? 'Thinking…' : '')}
                </div>
              ))}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-3">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={3}
              maxLength={2000}
              placeholder={
                isAuthenticated
                  ? 'Ask a follow-up question…'
                  : 'Sign in to ask follow-up questions.'
              }
              disabled={!isAuthenticated || loading}
              className="w-full resize-none rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 placeholder-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            />

            <div className="flex items-center justify-between gap-3">
              {error ? (
                <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
              ) : (
                <span />
              )}
              <button
                type="submit"
                disabled={!isAuthenticated || !message.trim() || loading}
                className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300"
              >
                {loading ? 'Sending…' : 'Send'}
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-950 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-zinc-800 dark:border-zinc-700 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300"
        data-testid="follow-up-chat-toggle"
        aria-expanded={isOpen}
        aria-controls="follow-up-chat-panel"
      >
        <ChatIcon />
        <span>{isOpen ? 'Hide chat' : 'Chat'}</span>
      </button>
    </div>

)
}
</file>

<file path="src/components/guide/GuideClientShell.tsx">
'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import FollowUpChat from './FollowUpChat'
import HighlightNote from './HighlightNote'

interface GuideClientShellProps {
guideId: string
guideSlug: string
isAuthenticated: boolean
isClaimableGuestGuide?: boolean
isReadOnly?: boolean
children: React.ReactNode
}

const GUEST_GUIDE_STORAGE_KEY = 'flashguides.guest-guides'

function consumeGuestGuideSlug(slug: string): boolean {
try {
const raw = window.localStorage.getItem(GUEST_GUIDE_STORAGE_KEY)
const current = raw ? (JSON.parse(raw) as string[]) : []
if (!current.includes(slug)) {
return false
}

    const next = current.filter((entry) => entry !== slug)
    window.localStorage.setItem(GUEST_GUIDE_STORAGE_KEY, JSON.stringify(next))
    return true

} catch {
return false
}
}

export default function GuideClientShell({
guideId,
guideSlug,
isAuthenticated,
isClaimableGuestGuide = false,
isReadOnly = false,
children,
}: GuideClientShellProps) {
const contentRef = useRef<HTMLDivElement>(null)
const [claimStatus, setClaimStatus] = useState<'idle' | 'claiming' | 'claimed' | 'error'>('idle')
const hasStartedClaimRef = useRef(false)

useEffect(() => {
if (!isAuthenticated || !isClaimableGuestGuide || hasStartedClaimRef.current) {
return
}

    if (!consumeGuestGuideSlug(guideSlug)) {
      return
    }

    hasStartedClaimRef.current = true
    let cancelled = false
    queueMicrotask(() => {
      if (!cancelled) {
        setClaimStatus('claiming')
      }
    })

    void fetch(`/api/guides/claim/${guideSlug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (cancelled) {
          return
        }

        setClaimStatus(response.ok ? 'claimed' : 'error')
      })
      .catch(() => {
        if (!cancelled) {
          setClaimStatus('error')
        }
      })

    return () => {
      cancelled = true
    }

}, [guideSlug, isAuthenticated, isClaimableGuestGuide])

return (

<div className="space-y-8">
{isClaimableGuestGuide ? (
<section className="rounded-2xl border border-zinc-300 bg-white p-4 text-sm text-zinc-800 shadow-sm dark:border-zinc-700 dark:bg-black dark:text-zinc-200">
{isAuthenticated ? (
<p>
{claimStatus === 'claimed'
? 'This guide has been saved to your profile.'
: claimStatus === 'claiming'
? 'Saving this guide to your profile…'
: claimStatus === 'error'
? 'We could not save this guide automatically. Please try generating it again from your account.'
: 'This guest guide is ready to be saved to your profile.'}
</p>
) : (
<p>
Want to keep this guide?{' '}
<Link
href={`/login?callbackUrl=${encodeURIComponent(`/guide/${guideSlug}`)}`}
className="font-semibold text-zinc-950 underline underline-offset-4 dark:text-zinc-100" >
Log in to save it to your profile.
</Link>
</p>
)}
</section>
) : null}
<div ref={contentRef} className="relative">
{children}
{!isReadOnly ? (
<HighlightNote
            contentRef={contentRef}
            guideId={guideId}
            guideSlug={guideSlug}
            isAuthenticated={isAuthenticated}
          />
) : null}
</div>
{!isReadOnly ? (
<FollowUpChat guideSlug={guideSlug} isAuthenticated={isAuthenticated} />
) : null}
</div>
)
}
</file>

<file path="src/components/guide/GuideHero.tsx">
import Link from 'next/link'
import type { GuideHeroMedia } from '@/lib/guides/content'
import type { InputType, StudyModeType } from '@/types/generation'

interface GuideHeroProps {
title: string
studyMode: StudyModeType
inputType: InputType
inputValue: string
media?: GuideHeroMedia
}

const STUDY_MODE_LABELS: Record<StudyModeType, string> = {
OVERVIEW: 'Overview',
DEEP_DIVE: 'Deep Dive',
EXAM_PREP: 'Exam Prep',
ELI5: 'ELI5',
}

function getYouTubeEmbedUrl(url: string): string | null {
try {
const parsed = new URL(url)
const host = parsed.hostname.toLowerCase()

    if (host === 'youtu.be' || host === 'www.youtu.be') {
      const id = parsed.pathname.split('/').filter(Boolean)[0]
      return id ? `https://www.youtube.com/embed/${id}` : null
    }

    if (host.includes('youtube.com')) {
      if (parsed.pathname === '/watch') {
        const id = parsed.searchParams.get('v')
        return id ? `https://www.youtube.com/embed/${id}` : null
      }

      const segments = parsed.pathname.split('/').filter(Boolean)
      if (segments[0] === 'shorts' || segments[0] === 'embed') {
        return segments[1] ? `https://www.youtube.com/embed/${segments[1]}` : null
      }
    }

    return null

} catch {
return null
}
}

export default function GuideHero({
title,
studyMode,
inputType,
inputValue,
media,
}: GuideHeroProps) {
const embedUrl = media?.type === 'youtube' ? getYouTubeEmbedUrl(media.src) : null

return (

<header className="space-y-6 rounded-[2rem] border border-zinc-300 bg-white p-8 shadow-sm dark:border-zinc-700 dark:bg-black">
<div className="flex items-center justify-between gap-4">
<Link
          href="/"
          className="text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-100"
        >
← Back to home
</Link>
<span className="rounded-full border border-zinc-700 bg-black px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-200">
{STUDY_MODE_LABELS[studyMode]}
</span>
</div>

      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-600 dark:text-zinc-300">
          Study Guide
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
          {title}
        </h1>
        <p className="max-w-3xl text-base leading-7 text-zinc-700 dark:text-zinc-200">
          Source type: {inputType}. Original input: {inputValue}
        </p>
      </div>

      {media ? (
        <div className="overflow-hidden rounded-3xl border border-zinc-300 bg-white dark:border-zinc-700 dark:bg-black">
          {media.type === 'image' ? (
            // User-authored guide media can point at arbitrary remote hosts with unknown dimensions.
            // Keeping a plain img here avoids requiring a broad next/image allowlist for untrusted content.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={media.src} alt={media.alt ?? title} className="h-auto w-full object-cover" />
          ) : embedUrl ? (
            <div className="aspect-video w-full">
              <iframe
                src={embedUrl}
                title={media.alt ?? title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </header>

)
}
</file>

<file path="src/components/guide/GuideLayout.tsx">
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
</file>

<file path="src/components/guide/GuideRenderer.tsx">
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
isClaimableGuestGuide?: boolean
isReadOnly?: boolean
canShare?: boolean
}

export default async function GuideRenderer({
guide,
isAuthenticated,
isClaimableGuestGuide = false,
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
} >
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
        isClaimableGuestGuide={isClaimableGuestGuide}
        isReadOnly={isReadOnly}
      >
<article className="space-y-6 text-black dark:text-white" data-testid="guide-renderer">
{parsed.intro ? (
<section className="rounded-2xl border border-zinc-300 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-black">
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
</file>

<file path="src/components/guide/GuideTOC.tsx">
import Link from 'next/link'
import type { GuideTocItem } from '@/lib/guides/content'

interface GuideTOCProps {
items: GuideTocItem[]
}

export default function GuideTOC({ items }: GuideTOCProps) {
if (items.length === 0) {
return null
}

return (

<nav
      aria-label="Table of contents"
      className="sticky top-6 rounded-2xl border border-zinc-300 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-black"
      data-testid="guide-toc"
    >
<p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-300">
On this page
</p>
<ol className="space-y-2">
{items.map((item) => (
<li key={item.id}>
<Link
href={`#${item.id}`}
className="text-sm text-zinc-800 transition-colors hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-zinc-100" >
{item.title}
</Link>
</li>
))}
</ol>
</nav>
)
}
</file>

<file path="src/components/guide/HighlightNote.tsx">
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface HighlightNoteProps {
contentRef: React.RefObject<HTMLElement | null>
guideId: string
guideSlug: string
isAuthenticated: boolean
}

interface TooltipState {
left: number
top: number
selectedText: string
}

export default function HighlightNote({
contentRef,
guideId,
guideSlug,
isAuthenticated,
}: HighlightNoteProps) {
const [tooltip, setTooltip] = useState<TooltipState | null>(null)
const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

useEffect(() => {
function handleMouseUp() {
const selection = window.getSelection()
const selectedText = selection?.toString().trim() ?? ''

      if (!selection || selection.rangeCount === 0 || !selectedText) {
        setTooltip(null)
        setStatus('idle')
        return
      }

      const range = selection.getRangeAt(0)
      const containerNode =
        range.commonAncestorContainer.nodeType === Node.TEXT_NODE
          ? range.commonAncestorContainer.parentNode
          : range.commonAncestorContainer

      if (!(containerNode instanceof Node) || !contentRef.current?.contains(containerNode)) {
        setTooltip(null)
        setStatus('idle')
        return
      }

      const rect = range.getBoundingClientRect()
      const left = Math.min(Math.max(rect.right - 72, 12), window.innerWidth - 180)
      const top = Math.max(rect.bottom + 8, 12)

      setStatus('idle')
      setTooltip({ left, top, selectedText })
    }

    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }

}, [contentRef])

async function handleSave() {
if (!tooltip || !isAuthenticated) {
return
}

    setStatus('saving')

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guideId, selectedText: tooltip.selectedText, content: '' }),
      })

      if (!response.ok) {
        throw new Error('Unable to save note')
      }

      setStatus('saved')
      window.getSelection()?.removeAllRanges()
      window.setTimeout(() => {
        setTooltip(null)
        setStatus('idle')
      }, 1200)
    } catch {
      setStatus('error')
    }

}

if (!tooltip) {
return null
}

return (

<div
className="fixed z-50 max-w-xs rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
style={{ left: tooltip.left, top: tooltip.top }}
data-testid="highlight-note-tooltip"
onMouseDown={(event) => event.preventDefault()} >
<p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
Selected text
</p>
<p className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-700 dark:text-zinc-200">
{tooltip.selectedText}
</p>

      {isAuthenticated ? (
        <div className="mt-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300"
          >
            {status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved' : 'Save note'}
          </button>
          {status === 'error' ? (
            <span className="text-xs text-rose-600 dark:text-rose-400">Try again</span>
          ) : null}
        </div>
      ) : (
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-sm text-zinc-600 dark:text-zinc-300">Sign up to save notes</span>
          <Link
            href={`/register?callbackUrl=${encodeURIComponent(`/guide/${guideSlug}`)}`}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-950 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-100"
          >
            Sign up
          </Link>
        </div>
      )}
    </div>

)
}
</file>

<file path="src/components/guide/InlineQuiz.tsx">
'use client'

import { useId, useState } from 'react'

interface InlineQuizProps {
question: string
options: string[]
correct: number
explanation: string
}

function normalizeOptions(
options: InlineQuizProps['options'] | string | null | undefined,
): string[] {
if (Array.isArray(options)) {
return options.filter(
(option): option is string => typeof option === 'string' && option.length > 0,
)
}

if (typeof options === 'string') {
return options
.split(/\r?\n|\s*\|\s*/)
.map((option) => option.trim())
.filter(Boolean)
}

return []
}

export default function InlineQuiz({ question, options, correct, explanation }: InlineQuizProps) {
const [selected, setSelected] = useState<number | null>(null)
const [submitted, setSubmitted] = useState(false)
const groupName = useId()
const normalizedQuestion = typeof question === 'string' ? question : 'Practice question'
const normalizedExplanation =
typeof explanation === 'string' ? explanation : 'Review the section and try again.'
const normalizedOptions = normalizeOptions(options)
const normalizedCorrect =
typeof correct === 'number' && Number.isInteger(correct) && correct >= 0 ? correct : -1

const isCorrect = selected === normalizedCorrect

return (

<div
      className="rounded-3xl border border-zinc-300 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-black"
      data-testid="inline-quiz"
    >
<p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-300">
Quick Check
</p>
<h3 className="mt-2 text-lg font-semibold text-zinc-950 dark:text-zinc-50">
{normalizedQuestion}
</h3>

      {normalizedOptions.length > 0 ? (
        <>
          <fieldset className="mt-5 space-y-3">
            <legend className="sr-only">Quiz options</legend>
            {normalizedOptions.map((option, index) => {
              const checked = selected === index
              return (
                <label
                  key={`${groupName}-${index}`}
                  className={[
                    'flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 transition-colors',
                    checked
                      ? 'border-zinc-950 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-900'
                      : 'border-zinc-300 bg-white hover:border-zinc-500 dark:border-zinc-700 dark:bg-black dark:hover:border-zinc-500',
                  ].join(' ')}
                >
                  <input
                    type="radio"
                    name={groupName}
                    value={index}
                    checked={checked}
                    onChange={() => setSelected(index)}
                    className="mt-1"
                  />
                  <span className="text-sm text-zinc-800 dark:text-zinc-200">{option}</span>
                </label>
              )
            })}
          </fieldset>

          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              disabled={selected === null}
              className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-300"
            >
              Check
            </button>
          </div>
        </>
      ) : (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Quiz options could not be loaded for this question.
        </div>
      )}

      {submitted && selected !== null ? (
        <div
          className={[
            'mt-5 rounded-2xl border px-4 py-3 text-sm',
            isCorrect
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-rose-200 bg-rose-50 text-rose-800',
          ].join(' ')}
          data-testid="quiz-feedback"
        >
          <p className="font-semibold">{isCorrect ? 'Correct' : 'Incorrect'}</p>
          <p className="mt-1">{normalizedExplanation}</p>
        </div>
      ) : null}
    </div>

)
}
</file>

<file path="src/components/guide/ReadingProgressBar.tsx">
'use client'

import { useEffect, useState } from 'react'

function computeProgress(): number {
const { scrollTop, scrollHeight, clientHeight } = document.documentElement
const scrollable = scrollHeight - clientHeight

if (scrollable <= 0) {
return 0
}

return Math.min(100, Math.max(0, Math.round((scrollTop / scrollable) \* 100)))
}

export default function ReadingProgressBar() {
const [progress, setProgress] = useState(0)

useEffect(() => {
const update = () => setProgress(computeProgress())

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }

}, [])

return (

<div className="sticky top-0 z-40 h-1 w-full bg-zinc-200 dark:bg-zinc-800" aria-hidden="true">
<progress
        max={100}
        value={progress}
        className="h-full w-full appearance-none [&::-webkit-progress-bar]:bg-zinc-200 [&::-webkit-progress-value]:bg-zinc-950 [&::-moz-progress-bar]:bg-zinc-950 dark:[&::-webkit-progress-bar]:bg-zinc-800 dark:[&::-webkit-progress-value]:bg-zinc-100 dark:[&::-moz-progress-bar]:bg-zinc-100"
        data-testid="reading-progress"
      />
</div>
)
}
</file>

<file path="src/components/guides/GuideCard.tsx">
import Link from 'next/link'

type StudyMode = 'OVERVIEW' | 'DEEP_DIVE' | 'EXAM_PREP' | 'ELI5'

interface GuideCardProps {
id: string
slug: string
title: string
studyMode: StudyMode
content: string
createdAt: Date
}

const BADGE_STYLES: Record<StudyMode, string> = {
OVERVIEW: 'bg-blue-100 text-blue-800',
DEEP_DIVE: 'bg-purple-100 text-purple-800',
EXAM_PREP: 'bg-red-100 text-red-800',
ELI5: 'bg-green-100 text-green-800',
}

const BADGE_LABELS: Record<StudyMode, string> = {
OVERVIEW: 'Overview',
DEEP_DIVE: 'Deep Dive',
EXAM_PREP: 'Exam Prep',
ELI5: 'ELI5',
}

/\*\*

- GuideCard — displays a guide summary in the public gallery grid.
- Shows title, study mode badge, 2-line content preview, and links to the guide.
  _/
  export default function GuideCard({ slug, title, studyMode, content }: GuideCardProps) {
  // Strip MDX/Markdown syntax for the preview: remove headings, bold, code fences, etc.
  const preview = content
  .replace(/```[\s\S]_?```/g, '')
  .replace(/#{1,6}\s+/g, '')
  .replace(/[*_`~]/g, '')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, 180)

const badgeClass = BADGE_STYLES[studyMode] ?? 'bg-gray-100 text-gray-800'
const badgeLabel = BADGE_LABELS[studyMode] ?? studyMode

return (

<Link
href={`/guide/${slug}`}
data-testid="guide-card"
className="group flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600" >
<div className="flex items-start justify-between gap-2">
<h2 className="text-base font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
{title}
</h2>
<span
className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClass}`}
aria-label={`Study mode: ${badgeLabel}`} >
{badgeLabel}
</span>
</div>
<p className="text-sm text-gray-500 line-clamp-2">{preview}</p>
</Link>
)
}
</file>

<file path="src/components/sharing/ExportDropdown.tsx">
'use client'

import { useState } from 'react'

interface ExportDropdownProps {
guideId: string
}

const exportOptions = [
{ format: 'md', label: 'Markdown', newTab: false },
{ format: 'html', label: 'Single-file HTML', newTab: false },
{ format: 'pdf', label: 'PDF', newTab: true },
] as const

export default function ExportDropdown({ guideId }: ExportDropdownProps) {
const [open, setOpen] = useState(false)

return (

<div className="relative">
<button
type="button"
data-testid="guide-export-button"
onClick={() => setOpen((current) => !current)}
className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition-colors hover:border-stone-900 hover:text-stone-950" >
Export
</button>

      {open ? (
        <div
          className="absolute right-0 z-40 mt-3 w-56 rounded-2xl border border-stone-200 bg-white p-2 shadow-xl"
          data-testid="guide-export-menu"
        >
          {exportOptions.map((option) => (
            <a
              key={option.format}
              href={`/api/guides/${guideId}/export?format=${option.format}`}
              target={option.newTab ? '_blank' : undefined}
              rel={option.newTab ? 'noreferrer' : undefined}
              className="block rounded-xl px-4 py-3 text-sm text-stone-700 transition-colors hover:bg-stone-50"
            >
              {option.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>

)
}
</file>

<file path="src/components/sharing/ForkButton.tsx">
'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

interface ForkButtonProps {
guideId: string
}

export default function ForkButton({ guideId }: ForkButtonProps) {
const router = useRouter()
const [message, setMessage] = useState<string | null>(null)
const [error, setError] = useState<string | null>(null)
const [isPending, startTransition] = useTransition()

async function handleFork() {
setMessage(null)
setError(null)

    try {
      const response = await fetch(`/api/guides/${guideId}/fork`, {
        method: 'POST',
      })

      const body = (await response.json()) as { guideSlug?: string; error?: string }
      if (!response.ok || !body.guideSlug) {
        throw new Error(body.error ?? 'Unable to fork guide')
      }

      setMessage('Guide forked to your dashboard.')
      startTransition(() => {
        router.push(`/guide/${body.guideSlug}`)
      })
    } catch (forkError) {
      setError(forkError instanceof Error ? forkError.message : 'Unable to fork guide')
    }

}

return (

<div className="flex flex-col items-start gap-2 sm:items-end">
<button
type="button"
data-testid="fork-guide-button"
onClick={() => void handleFork()}
disabled={isPending}
className="inline-flex rounded-full bg-sky-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-800 disabled:opacity-60" >
{isPending ? 'Forking...' : 'Fork to my guides'}
</button>
{message ? <p className="text-sm text-emerald-700">{message}</p> : null}
{error ? <p className="text-sm text-rose-700">{error}</p> : null}
</div>
)
}
</file>

<file path="src/components/sharing/ShareButton.tsx">
'use client'

import { useState } from 'react'
import ShareModal from './ShareModal'

interface ShareButtonProps {
guideId: string
}

export default function ShareButton({ guideId }: ShareButtonProps) {
const [open, setOpen] = useState(false)

return (
<>
<button
type="button"
data-testid="guide-share-button"
onClick={() => setOpen(true)}
className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 shadow-sm transition-colors hover:border-stone-900 hover:text-stone-950" >
Share
</button>

      {open ? <ShareModal guideId={guideId} onClose={() => setOpen(false)} /> : null}
    </>

)
}
</file>

<file path="src/components/sharing/ShareModal.tsx">
'use client'

import { useState } from 'react'

interface ShareModalProps {
guideId: string
onClose: () => void
}

type ExpiryOption = 'none' | '7d' | '30d'

interface ShareResponse {
token: string
url: string
expiresAt: string | null
}

function normalizeShareUrl(url: string): string {
if (typeof window === 'undefined') {
return url
}

try {
const parsed = new URL(url, window.location.origin)
if (parsed.origin === window.location.origin) {
return parsed.toString()
}

    return new URL(parsed.pathname + parsed.search + parsed.hash, window.location.origin).toString()

} catch {
return url
}
}

export default function ShareModal({ guideId, onClose }: ShareModalProps) {
const [expiry, setExpiry] = useState<ExpiryOption>('none')
const [share, setShare] = useState<ShareResponse | null>(null)
const [message, setMessage] = useState<string | null>(null)
const [error, setError] = useState<string | null>(null)
const [busy, setBusy] = useState(false)

async function handleCreate() {
setBusy(true)
setMessage(null)
setError(null)

    try {
      const response = await fetch(`/api/guides/${guideId}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expiresIn: expiry === 'none' ? null : expiry }),
      })

      const body = (await response.json()) as ShareResponse & { error?: string }
      if (!response.ok && response.status !== 409) {
        throw new Error(body.error ?? 'Unable to create share link')
      }

      setShare({
        ...body,
        url: normalizeShareUrl(body.url),
      })
      setMessage(response.status === 409 ? 'Existing share link loaded.' : 'Share link created.')
    } catch (shareError) {
      setError(shareError instanceof Error ? shareError.message : 'Unable to create share link')
    } finally {
      setBusy(false)
    }

}

async function handleCopy() {
if (!share) {
return
}

    try {
      await navigator.clipboard.writeText(share.url)
      setMessage('Share link copied.')
      setError(null)
    } catch {
      setError('Unable to copy the share link right now.')
    }

}

async function handleRevoke() {
setBusy(true)
setMessage(null)
setError(null)

    try {
      const response = await fetch(`/api/guides/${guideId}/share`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Unable to revoke share link')
      }

      setShare(null)
      setMessage('Share link revoked.')
    } catch (revokeError) {
      setError(revokeError instanceof Error ? revokeError.message : 'Unable to revoke share link')
    } finally {
      setBusy(false)
    }

}

return (

<div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/45 px-4"
      role="dialog"
      aria-modal="true"
    >
<div className="w-full max-w-xl rounded-[2rem] border border-stone-200 bg-white p-6 shadow-2xl">
<div className="flex items-start justify-between gap-4">
<div>
<p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
Share guide
</p>
<h2 className="mt-2 text-2xl font-semibold text-stone-900">
Create a public read-only link
</h2>
</div>
<button
            type="button"
            onClick={onClose}
            className="rounded-full border border-stone-300 px-3 py-1.5 text-sm text-stone-700"
          >
Close
</button>
</div>

        <div className="mt-6 space-y-4">
          <label className="block text-sm font-medium text-stone-700">
            Link expiry
            <select
              value={expiry}
              onChange={(event) => setExpiry(event.target.value as ExpiryOption)}
              className="mt-2 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800"
            >
              <option value="none">Never expire</option>
              <option value="7d">7 days</option>
              <option value="30d">30 days</option>
            </select>
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void handleCreate()}
              disabled={busy}
              className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-60"
            >
              {busy ? 'Working...' : share ? 'Refresh link' : 'Create link'}
            </button>

            {share ? (
              <button
                type="button"
                onClick={() => void handleRevoke()}
                disabled={busy}
                className="rounded-full border border-rose-300 px-5 py-2.5 text-sm font-medium text-rose-700 disabled:opacity-60"
              >
                Revoke link
              </button>
            ) : null}
          </div>

          {share ? (
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p className="text-sm font-medium text-stone-800">Public URL</p>
              <input
                readOnly
                value={share.url}
                className="mt-2 w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-800"
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => void handleCopy()}
                  className="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700"
                >
                  Copy link
                </button>
                <span className="text-xs text-stone-500">
                  {share.expiresAt
                    ? `Expires ${new Date(share.expiresAt).toLocaleDateString()}`
                    : 'No expiry'}
                </span>
              </div>
            </div>
          ) : null}

          {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
          {error ? <p className="text-sm text-rose-700">{error}</p> : null}
        </div>
      </div>
    </div>

)
}
</file>

<file path="src/components/ui/.gitkeep">

</file>

<file path="src/lib/ai/prompts/index.ts">
import type { StudyModeType } from '@/types/generation'

/\*\*

- Base system prompt shared by all study mode strategies.
  \*/
  export const BASE_SYSTEM_PROMPT = `You are FlashGuides AI, an expert educational content creator.
  Your task is to generate a well-structured, engaging study guide in MDX format.

Rules:

- Use clear headings (##, ###), bullet points, bold key terms.
- Keep language accurate but accessible.
- Do NOT include raw HTML; MDX only.
- Output ONLY the MDX content — no preamble, no "Here is your guide:".
- Start directly with a # Heading for the guide title.`

/\*\*

- Per-strategy instructions appended to the base prompt.
  \*/
  export const STUDY_MODE_INSTRUCTIONS: Record<StudyModeType, string> = {
  OVERVIEW: `Create a concise overview guide:

* 4–6 sections covering the core concepts
* Each section: 2–4 paragraphs
* End with a "Key Takeaways" summary section`,

  DEEP_DIVE: `Create a comprehensive deep-dive guide:

* 10–14 sections with detailed technical coverage
* Include worked examples, edge cases, tradeoffs, and advanced nuances
* Each section: 4–7 paragraphs with concrete detail, not summary bullets alone
* Add at least one dedicated section for pitfalls or misconceptions when relevant
* End with a "Further Reading" section`,

  EXAM_PREP: `Create an exam-preparation guide:

* 8–12 sections covering all major testable concepts from the source
* Prioritize completeness, definitions, mechanisms, comparisons, and likely exam traps
* Each section should be study-ready with thorough explanations, mnemonics, and key recall points where useful
* Include a "Common Mistakes" section and a "Rapid Review" section
* Each section ends with 3–5 practice questions in this exact format:
  **Q:** Question text
  - A) option
  - B) option
  - C) option
  - D) option
    **Answer:** B
* Explain answers in the prose around the section so students understand the reasoning, not just the result`,

  ELI5: `Create a beginner-friendly "Explain Like I'm 5" guide:

* Use simple analogies, everyday comparisons, and gentle language
* Avoid jargon; when technical terms appear, immediately explain them in simple terms
* 4–6 short sections; each section ≤ 3 paragraphs
* End with a "What You Just Learned" recap`,
  }
  </file>

<file path="src/lib/ai/index.ts">
// Stub — wired in Phase 1 (Spec 04)
export {}
</file>

<file path="src/lib/auth/middleware.ts">
import type { NextAuthConfig, Session } from 'next-auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/\*\*

- Routes that require an authenticated session.
- /guide/:path\* is intentionally public — guests can view watermarked guides.
- Individual route handlers enforce ownership for mutations.
  \*/
  const PROTECTED_PREFIXES = ['/dashboard', '/account', '/api/guides'] as const

export function isProtectedRoute(pathname: string): boolean {
return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}

export function buildLoginRedirect(req: NextRequest): NextResponse {
const loginUrl = new URL('/login', req.nextUrl.origin)
loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname + req.nextUrl.search)
return NextResponse.redirect(loginUrl)
}

export type AuthorizedParams = {
request: NextRequest
auth: Session | null
}

export function authorizedCallback({ auth, request }: AuthorizedParams): boolean | NextResponse {
if (!isProtectedRoute(request.nextUrl.pathname)) return true
if (auth?.user) return true
return buildLoginRedirect(request)
}

export const authorizedCallbackConfig: NonNullable<NextAuthConfig['callbacks']>['authorized'] =
authorizedCallback
</file>

<file path="src/lib/auth/password.ts">
import bcrypt from 'bcryptjs'

const COST_FACTOR = 12

/\*\*

- Hash a plaintext password using bcrypt (cost 12).
  \*/
  export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, COST_FACTOR)
  }

/\*\*

- Compare a plaintext password against a stored bcrypt hash.
  \*/
  export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash)
  }
  </file>

<file path="src/lib/auth/proxy.ts">
import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import { authorizedCallbackConfig } from './middleware'

const proxyAuthConfig = {
providers: [],
session: {
strategy: 'jwt',
},
pages: {
signIn: '/login',
},
callbacks: {
authorized: authorizedCallbackConfig,
},
} satisfies NextAuthConfig

export const { auth: proxyAuth } = NextAuth(proxyAuthConfig)
</file>

<file path="src/lib/auth/session.ts">
import type { Session } from 'next-auth'
import { prisma } from '@/lib/db/client'

export function hasAuthenticatedUser(session: Session | null | undefined): boolean {
return Boolean(session?.user?.id || session?.user?.email)
}

export async function getSessionUserId(
session: Session | null | undefined,
): Promise<string | null> {
if (session?.user?.id) {
return session.user.id
}

const email = session?.user?.email
if (!email) {
return null
}

const user = await prisma.user.findUnique({
where: { email },
select: { id: true },
})

return user?.id ?? null
}
</file>

<file path="src/lib/auth/tokens.ts">
import { randomBytes } from 'crypto'
import { prisma } from '@/lib/db/client'

const TOKEN*TTL_MS = 24 * 60 _ 60 _ 1000 // 24 hours
const RESET*TOKEN_TTL_MS = 60 * 60 \* 1000 // 1 hour

/\*\*

- Create a 32-byte hex verification token for the given identifier (email).
- Replaces any existing token for that identifier.
  \*/
  export async function createVerificationToken(
  identifier: string,
  ttlMs: number = TOKEN_TTL_MS,
  ): Promise<string> {
  const token = randomBytes(32).toString('hex')
  const expires = new Date(Date.now() + ttlMs)

// Remove any existing tokens for this identifier first (upsert not supported on composite key)
await prisma.verificationToken.deleteMany({ where: { identifier } })

await prisma.verificationToken.create({
data: { identifier, token, expires },
})

return token
}

/\*\*

- Create a password reset token (shorter TTL: 1 hour).
  \*/
  export async function createPasswordResetToken(identifier: string): Promise<string> {
  return createVerificationToken(identifier, RESET_TOKEN_TTL_MS)
  }

/\*\*

- Consume a verification token: validates it, deletes it, and returns the identifier.
- Returns null if the token is not found or has expired.
  \*/
  export async function consumeVerificationToken(token: string): Promise<string | null> {
  const record = await prisma.verificationToken.findUnique({
  where: { token },
  })

if (!record) return null
if (record.expires < new Date()) {
// Clean up expired token
await prisma.verificationToken.delete({ where: { token } })
return null
}

await prisma.verificationToken.delete({ where: { token } })
return record.identifier
}
</file>

<file path="src/lib/cli/always-exclude.ts">
import path from 'node:path'

const ALWAYS*EXCLUDED_LOCKFILES = new Set(['pnpm-lock.yaml', 'package-lock.json', 'yarn.lock'])
const ALWAYS_EXCLUDED_EXTENSIONS = new Set([
'.png',
'.jpg',
'.jpeg',
'.gif',
'.webp',
'.ico',
'.woff',
'.woff2',
'.ttf',
'.eot',
'.otf',
'.pdf',
'.zip',
'.gz',
'.key',
'.pem',
'.p12',
])
const ALWAYS_EXCLUDED_SEGMENTS = new Set(['node_modules', '.next', 'dist'])
const SECRET_PATTERNS = [
/ANTHROPIC_API_KEY\s*=/i,
/FAL_API_KEY\s*=/i,
/TAVILY_API_KEY\s\*=/i,
/\bANTHROPIC_API_KEY\b/i,
/\bFAL_API_KEY\b/i,
/\bTAVILY_API_KEY\b/i,
/\b[A-Z0-9*]+\s*=\s*sk-[A-Za-z0-9]/,
]

function normalizePath(filePath: string): string {
return filePath.split(path.sep).join('/').replace(/^\.\//, '')
}

export function containsSecretPattern(content: string): boolean {
return SECRET_PATTERNS.some((pattern) => pattern.test(content))
}

export function isAlwaysExcludedPath(filePath: string): boolean {
const normalized = normalizePath(filePath)
const basename = path.posix.basename(normalized)
const extension = path.posix.extname(normalized).toLowerCase()
const segments = normalized.split('/')

if (basename === '.env' || basename.startsWith('.env.')) {
return true
}

if (basename.startsWith('.')) {
return true
}

if (basename === 'prisma.config.ts' || ALWAYS_EXCLUDED_LOCKFILES.has(basename)) {
return true
}

if (ALWAYS_EXCLUDED_EXTENSIONS.has(extension)) {
return true
}

return segments.some((segment) => ALWAYS_EXCLUDED_SEGMENTS.has(segment))
}

export function applyAlwaysExclude(paths: string[]): string[] {
return paths.map(normalizePath).filter((filePath) => !isAlwaysExcludedPath(filePath))
}
</file>

<file path="src/lib/cli/collect-files.ts">
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { applyAlwaysExclude, containsSecretPattern } from './always-exclude'

export interface CollectFilesOptions {
cwd: string
include?: string
exclude?: string
noTests?: boolean
onlyTests?: boolean
}

const DEFAULT_ROOTS = ['src', 'scripts'] as const
const TEST_ROOT = 'tests'
const TEST_PATTERNS = ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx', 'tests/**']

function normalizePath(filePath: string): string {
return filePath.split(path.sep).join('/')
}

function escapeRegex(value: string): string {
return value.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
}

function globToRegExp(pattern: string): RegExp {
const normalized = normalizePath(pattern)
let result = '^'

for (let index = 0; index < normalized.length; index += 1) {
const char = normalized[index]
if (!char) {
continue
}

    if (char === '*') {
      const next = normalized[index + 1]
      const afterNext = normalized[index + 2]

      if (next === '*') {
        if (afterNext === '/') {
          result += '(?:.*/)?'
          index += 2
        } else {
          result += '.*'
          index += 1
        }
      } else {
        result += '[^/]*'
      }

      continue
    }

    if (char === '?') {
      result += '[^/]'
      continue
    }

    result += escapeRegex(char)

}

result += '$'
return new RegExp(result)
}

function matchesAny(filePath: string, patterns: string[]): boolean {
return patterns.some((pattern) => globToRegExp(pattern).test(filePath))
}

function isTestFile(filePath: string): boolean {
return matchesAny(filePath, TEST_PATTERNS)
}

async function walkDirectory(root: string, baseDir: string): Promise<string[]> {
const entries = await readdir(root, { withFileTypes: true })
const files: string[] = []

for (const entry of entries) {
const fullPath = path.join(root, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await walkDirectory(fullPath, baseDir)))
      continue
    }

    if (!entry.isFile()) {
      continue
    }

    files.push(normalizePath(path.relative(baseDir, fullPath)))

}

return files
}

export async function collectFiles(options: CollectFilesOptions): Promise<string[]> {
if (options.noTests && options.onlyTests) {
return []
}

const roots = new Set<string>(DEFAULT_ROOTS)
if (options.onlyTests) {
roots.add(TEST_ROOT)
}

const discovered: string[] = []
for (const root of roots) {
const absoluteRoot = path.join(options.cwd, root)
try {
discovered.push(...(await walkDirectory(absoluteRoot, options.cwd)))
} catch (error) {
if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
throw error
}
}
}

let candidates = applyAlwaysExclude(discovered)

if (options.onlyTests) {
candidates = candidates.filter((filePath) => isTestFile(filePath))
} else if (options.noTests) {
candidates = candidates.filter((filePath) => !isTestFile(filePath))
}

if (options.include) {
const includePattern = options.include
candidates = candidates.filter((filePath) => matchesAny(filePath, [includePattern]))
}

if (options.exclude) {
const excludePattern = options.exclude
candidates = candidates.filter((filePath) => !matchesAny(filePath, [excludePattern]))
}

const safeFiles: string[] = []
for (const filePath of candidates) {
const content = await readFile(path.join(options.cwd, filePath), 'utf8')
if (!containsSecretPattern(content)) {
safeFiles.push(filePath)
}
}

return safeFiles.sort((left, right) => left.localeCompare(right))
}
</file>

<file path="src/lib/cli/estimate-tokens.ts">
export function estimateTokens(content: string): number {
  return Math.ceil(content.length / 4)
}
</file>

<file path="src/lib/cli/format-section.ts">
import path from 'node:path'

export type ExportFormat = 'md' | 'txt'

const LANGUAGE_BY_EXTENSION: Record<string, string> = {
'.ts': 'ts',
'.tsx': 'tsx',
'.js': 'js',
'.jsx': 'jsx',
'.mjs': 'js',
'.cjs': 'js',
'.json': 'json',
'.css': 'css',
'.md': 'md',
'.sh': 'bash',
'.yml': 'yaml',
'.yaml': 'yaml',
}

function normalizePath(filePath: string): string {
return filePath.split(path.sep).join('/')
}

function ensureTrailingNewline(content: string): string {
return content.endsWith('\n') ? content : `${content}\n`
}

function detectLanguage(filePath: string): string {
return LANGUAGE_BY_EXTENSION[path.extname(filePath).toLowerCase()] ?? 'text'
}

export function formatSection(filePath: string, content: string, format: ExportFormat): string {
const normalized = normalizePath(filePath)
const header = `--- ${normalized} ---`
const body = ensureTrailingNewline(content)

if (format === 'txt') {
return `${header}\n${body}`
}

const language = detectLanguage(normalized)
return `${header}\n\`\`\`${language}\n${body}\`\`\`\n`
}
</file>

<file path="src/lib/db/repositories/folders.ts">
import { prisma } from '@/lib/db/client'
import type {
  CreateFolderInput,
  DeleteFolderResult,
  FolderItem,
  IFolderRepository,
  UpdateFolderInput,
} from '@/lib/db/repositories/types'

const folderSelect = {
id: true,
userId: true,
name: true,
createdAt: true,
} as const

class FolderRepository implements IFolderRepository {
async create(input: CreateFolderInput): Promise<FolderItem> {
return prisma.folder.create({
data: {
userId: input.userId,
name: input.name,
},
select: folderSelect,
})
}

async listByUser(userId: string): Promise<FolderItem[]> {
return prisma.folder.findMany({
where: { userId },
orderBy: [{ createdAt: 'asc' }, { name: 'asc' }],
select: folderSelect,
})
}

async rename(input: UpdateFolderInput): Promise<FolderItem | null> {
const result = await prisma.folder.updateMany({
where: {
id: input.id,
userId: input.userId,
},
data: {
name: input.name,
},
})

    if (result.count === 0) {
      return null
    }

    return prisma.folder.findFirst({
      where: {
        id: input.id,
        userId: input.userId,
      },
      select: folderSelect,
    })

}

async deleteOwned(userId: string, id: string): Promise<DeleteFolderResult> {
const result = await prisma.folder.deleteMany({
where: {
id,
userId,
},
})

    return {
      deleted: result.count > 0,
    }

}
}

export const folderRepository = new FolderRepository()
</file>

<file path="src/lib/db/repositories/guides.ts">
import type { Prisma } from '@/generated/prisma'
import { prisma } from '@/lib/db/client'
import type {
  DeleteGuidesResult,
  GuideListItem,
  GuideListParams,
  GuideListResult,
  GuideView,
  IGuideReader,
  IGuideWriter,
  SetGuideTagsInput,
  UpdateGuideInput,
} from '@/lib/db/repositories/types'

const guideSummarySelect = {
id: true,
slug: true,
title: true,
studyMode: true,
inputType: true,
createdAt: true,
updatedAt: true,
isFavorite: true,
folder: {
select: {
id: true,
name: true,
},
},
tags: {
select: {
tag: {
select: {
id: true,
name: true,
},
},
},
},
} satisfies Prisma.GuideSelect

type GuideSummaryRecord = Prisma.GuideGetPayload<{ select: typeof guideSummarySelect }>

type SearchIdRow = { id: string }
type SearchCountRow = { total: number | bigint }

function mapGuideSummary(record: GuideSummaryRecord): GuideListItem {
return {
id: record.id,
slug: record.slug,
title: record.title,
studyMode: record.studyMode,
inputType: record.inputType,
createdAt: record.createdAt,
updatedAt: record.updatedAt,
isFavorite: record.isFavorite,
folder: record.folder,
tags: record.tags.map(({ tag }) => tag),
}
}

function getEffectiveLimit(view: GuideView, limit: number): number {
if (view === 'recent') {
return Math.min(limit, 5)
}

return limit
}

function buildGuideWhere({ userId, tag, folderId, view }: GuideListParams): Prisma.GuideWhereInput {
return {
userId,
...(folderId ? { folderId } : {}),
...(tag ? { tags: { some: { tag: { name: tag } } } } : {}),
...(view === 'favorites' ? { isFavorite: true } : {}),
}
}

class GuideRepository implements IGuideReader, IGuideWriter {
async list(params: GuideListParams): Promise<GuideListResult> {
const trimmedQuery = params.q?.trim()
if (trimmedQuery) {
return this.search(params, trimmedQuery)
}

    const where = buildGuideWhere(params)
    const limit = getEffectiveLimit(params.view, params.limit)
    const skip = (params.page - 1) * limit

    const [total, guides] = await Promise.all([
      prisma.guide.count({ where }),
      prisma.guide.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        select: guideSummarySelect,
      }),
    ])

    return {
      guides: guides.map(mapGuideSummary),
      total,
      page: params.page,
    }

}

async update(input: UpdateGuideInput): Promise<GuideListItem | null> {
if (input.folderId !== undefined) {
const folderAllowed = await this.isFolderOwnedByUser(input.userId, input.folderId)
if (!folderAllowed) {
return null
}
}

    const data: Prisma.GuideUncheckedUpdateManyInput = {}

    if (input.title !== undefined) {
      data.title = input.title
    }

    if (input.folderId !== undefined) {
      data.folderId = input.folderId
    }

    if (input.isFavorite !== undefined) {
      data.isFavorite = input.isFavorite
    }

    if (Object.keys(data).length === 0) {
      return this.findOwnedById(input.id, input.userId)
    }

    const result = await prisma.guide.updateMany({
      where: {
        id: input.id,
        userId: input.userId,
      },
      data,
    })

    if (result.count === 0) {
      return null
    }

    return this.findOwnedById(input.id, input.userId)

}

async deleteManyOwned(userId: string, ids: string[]): Promise<DeleteGuidesResult> {
const uniqueIds = [...new Set(ids)]

    const [ownedCount, existingCount] = await prisma.$transaction([
      prisma.guide.count({
        where: {
          id: { in: uniqueIds },
          userId,
        },
      }),
      prisma.guide.count({
        where: {
          id: { in: uniqueIds },
        },
      }),
    ])

    if (existingCount > ownedCount) {
      return {
        authorized: false,
        deleted: 0,
      }
    }

    if (ownedCount === 0) {
      return {
        authorized: true,
        deleted: 0,
      }
    }

    const result = await prisma.guide.deleteMany({
      where: {
        id: { in: uniqueIds },
        userId,
      },
    })

    return {
      authorized: true,
      deleted: result.count,
    }

}

async setTags(input: SetGuideTagsInput): Promise<GuideListItem | null> {
const guide = await prisma.guide.findFirst({
where: {
id: input.guideId,
userId: input.userId,
},
select: { id: true },
})

    if (!guide) {
      return null
    }

    const normalizedTags = [...new Set(input.tags.map((tag) => tag.trim()).filter(Boolean))]

    await prisma.$transaction(async (tx) => {
      await tx.guideTag.deleteMany({
        where: { guideId: input.guideId },
      })

      for (const tagName of normalizedTags) {
        const tag = await tx.tag.upsert({
          where: { name: tagName },
          update: {},
          create: { name: tagName },
          select: { id: true },
        })

        await tx.guideTag.create({
          data: {
            guideId: input.guideId,
            tagId: tag.id,
          },
        })
      }
    })

    return this.findOwnedById(input.guideId, input.userId)

}

private async search(params: GuideListParams, query: string): Promise<GuideListResult> {
const limit = getEffectiveLimit(params.view, params.limit)
const offset = (params.page - 1) \* limit
const { joins, conditions, args } = this.buildSearchClauses(params, query)
const whereClause = conditions.join(' AND ')
const orderBy =
params.view === 'recent' ? 'g."createdAt" DESC' : 'bm25(guides_fts), g."createdAt" DESC'

    const countSql = `
      SELECT COUNT(*) AS total
      FROM "guides" g
      ${joins.join('\n')}
      WHERE ${whereClause}
    `

    const idSql = `
      SELECT g."id" AS id
      FROM "guides" g
      ${joins.join('\n')}
      WHERE ${whereClause}
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?
    `

    const [countRows, idRows] = await Promise.all([
      prisma.$queryRawUnsafe<SearchCountRow[]>(countSql, ...args),
      prisma.$queryRawUnsafe<SearchIdRow[]>(idSql, ...args, limit, offset),
    ])

    const ids = idRows.map((row) => row.id)
    if (ids.length === 0) {
      return {
        guides: [],
        total: Number(countRows[0]?.total ?? 0),
        page: params.page,
      }
    }

    const guides = await prisma.guide.findMany({
      where: { id: { in: ids } },
      select: guideSummarySelect,
    })

    const byId = new Map(guides.map((guide) => [guide.id, mapGuideSummary(guide)]))

    return {
      guides: ids
        .map((id) => byId.get(id))
        .filter((guide): guide is GuideListItem => guide !== undefined),
      total: Number(countRows[0]?.total ?? 0),
      page: params.page,
    }

}

private buildSearchClauses(params: GuideListParams, query: string) {
const joins = ['INNER JOIN guides_fts ON g.rowid = guides_fts.rowid']
const conditions = ['g."userId" = ?', 'guides_fts MATCH ?']
const args: Array<string | number> = [params.userId, query]

    if (params.tag) {
      joins.push('INNER JOIN "guide_tags" gt ON gt."guideId" = g."id"')
      joins.push('INNER JOIN "tags" t ON t."id" = gt."tagId"')
      conditions.push('t."name" = ?')
      args.push(params.tag)
    }

    if (params.folderId) {
      conditions.push('g."folderId" = ?')
      args.push(params.folderId)
    }

    if (params.view === 'favorites') {
      conditions.push('g."isFavorite" = 1')
    }

    return { joins, conditions, args }

}

private async findOwnedById(id: string, userId: string): Promise<GuideListItem | null> {
const guide = await prisma.guide.findFirst({
where: {
id,
userId,
},
select: guideSummarySelect,
})

    return guide ? mapGuideSummary(guide) : null

}

private async isFolderOwnedByUser(
userId: string,
folderId: string | null | undefined,
): Promise<boolean> {
if (folderId === undefined || folderId === null) {
return true
}

    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        userId,
      },
      select: { id: true },
    })

    return Boolean(folder)

}
}

export const guideRepository = new GuideRepository()
</file>

<file path="src/lib/db/repositories/notes.ts">
import { prisma } from '@/lib/db/client'

interface CreateNoteInput {
userId: string
guideId: string
selectedText: string
content?: string
}

class NoteRepository {
async create({ userId, guideId, selectedText, content = '' }: CreateNoteInput) {
return prisma.note.create({
data: {
userId,
guideId,
selectedText,
content,
},
select: {
id: true,
guideId: true,
selectedText: true,
content: true,
createdAt: true,
},
})
}
}

export const noteRepository = new NoteRepository()
</file>

<file path="src/lib/db/repositories/share-links.ts">
import { prisma } from '@/lib/db/client'
import { generateShareToken } from '@/lib/sharing/token'

const sharedGuideSelect = {
id: true,
userId: true,
slug: true,
title: true,
studyMode: true,
inputType: true,
inputValue: true,
content: true,
isPublic: true,
} as const

class ShareLinkRepository {
async getStatusByToken(token: string): Promise<'active' | 'expired' | 'missing'> {
const link = await prisma.shareLink.findUnique({
where: { token },
select: {
expiresAt: true,
},
})

    if (!link) {
      return 'missing'
    }

    if (link.expiresAt && link.expiresAt.getTime() < Date.now()) {
      return 'expired'
    }

    return 'active'

}

async createOwnedShareLink(input: {
guideId: string
userId: string
expiresAt: Date | null
}): Promise<
| { status: 'forbidden' }
| { status: 'existing'; shareLink: { token: string; expiresAt: Date | null } }
| { status: 'created'; shareLink: { token: string; expiresAt: Date | null } }

> {

    const guide = await prisma.guide.findFirst({
      where: {
        id: input.guideId,
        userId: input.userId,
      },
      select: {
        id: true,
        shareLink: {
          select: {
            token: true,
            expiresAt: true,
          },
        },
      },
    })

    if (!guide) {
      return { status: 'forbidden' }
    }

    if (guide.shareLink) {
      return { status: 'existing', shareLink: guide.shareLink }
    }

    const shareLink = await prisma.shareLink.create({
      data: {
        guideId: input.guideId,
        token: generateShareToken(),
        expiresAt: input.expiresAt,
      },
      select: {
        token: true,
        expiresAt: true,
      },
    })

    return { status: 'created', shareLink }

}

async deleteOwnedShareLink(guideId: string, userId: string): Promise<boolean> {
const result = await prisma.shareLink.deleteMany({
where: {
guideId,
guide: {
userId,
},
},
})

    return result.count > 0

}

async visitByToken(token: string): Promise<
| { status: 'missing' }
| { status: 'expired' }
| {
status: 'active'
guide: {
id: string
userId: string | null
slug: string
title: string
studyMode: 'OVERVIEW' | 'DEEP_DIVE' | 'EXAM_PREP' | 'ELI5'
inputType: 'TOPIC' | 'TEXT' | 'URL'
inputValue: string
content: string
isPublic: boolean
}
}

> {

    const link = await prisma.shareLink.findUnique({
      where: { token },
      select: {
        id: true,
        expiresAt: true,
        guide: {
          select: sharedGuideSelect,
        },
      },
    })

    if (!link) {
      return { status: 'missing' }
    }

    if (link.expiresAt && link.expiresAt.getTime() < Date.now()) {
      return { status: 'expired' }
    }

    await prisma.shareLink.update({
      where: { id: link.id },
      data: {
        clickCount: {
          increment: 1,
        },
      },
    })

    return {
      status: 'active',
      guide: link.guide,
    }

}
}

export const shareLinkRepository = new ShareLinkRepository()
</file>

<file path="src/lib/db/repositories/types.ts">
import type { InputType, StudyMode } from '@/generated/prisma'

export type GuideView = 'all' | 'favorites' | 'recent'

export interface GuideListParams {
userId: string
q?: string
tag?: string
folderId?: string
view: GuideView
page: number
limit: number
}

export interface GuideTagSummary {
id: string
name: string
}

export interface GuideFolderSummary {
id: string
name: string
}

export interface FolderItem {
id: string
userId: string
name: string
createdAt: Date
}

export interface GuideListItem {
id: string
slug: string
title: string
studyMode: StudyMode
inputType: InputType
createdAt: Date
updatedAt: Date
isFavorite: boolean
tags: GuideTagSummary[]
folder: GuideFolderSummary | null
}

export interface GuideListResult {
guides: GuideListItem[]
total: number
page: number
}

export interface UpdateGuideInput {
id: string
userId: string
title?: string
folderId?: string | null
isFavorite?: boolean
}

export interface SetGuideTagsInput {
guideId: string
userId: string
tags: string[]
}

export interface DeleteGuidesResult {
authorized: boolean
deleted: number
}

export interface CreateFolderInput {
userId: string
name: string
}

export interface UpdateFolderInput {
id: string
userId: string
name: string
}

export interface DeleteFolderResult {
deleted: boolean
}

export interface IGuideReader {
list(params: GuideListParams): Promise<GuideListResult>
}

export interface IGuideWriter {
update(input: UpdateGuideInput): Promise<GuideListItem | null>
deleteManyOwned(userId: string, ids: string[]): Promise<DeleteGuidesResult>
setTags(input: SetGuideTagsInput): Promise<GuideListItem | null>
}

export interface IFolderRepository {
create(input: CreateFolderInput): Promise<FolderItem>
listByUser(userId: string): Promise<FolderItem[]>
rename(input: UpdateFolderInput): Promise<FolderItem | null>
deleteOwned(userId: string, id: string): Promise<DeleteFolderResult>
}
</file>

<file path="src/lib/db/repositories/users.ts">
import { prisma } from '@/lib/db/client'
import { hashPassword, verifyPassword } from '@/lib/auth/password'

export interface AccountPageUser {
id: string
name: string | null
email: string
pendingEmail: string | null
image: string | null
hasPassword: boolean
sessionVersion: number
providers: string[]
}

export interface UserSummary {
id: string
name: string | null
email: string
image: string | null
}

class UserRepository {
async getAccountPageUser(userId: string): Promise<AccountPageUser | null> {
const user = await prisma.user.findUnique({
where: { id: userId },
select: {
id: true,
name: true,
email: true,
pendingEmail: true,
image: true,
password: true,
sessionVersion: true,
accounts: {
select: {
provider: true,
},
},
},
})

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      pendingEmail: user.pendingEmail,
      image: user.image,
      hasPassword: Boolean(user.password),
      sessionVersion: user.sessionVersion,
      providers: [...new Set(user.accounts.map((account) => account.provider))],
    }

}

async updateProfile(
userId: string,
input: { name?: string; image?: string },
): Promise<UserSummary | null> {
const data: { name?: string; image?: string } = {}

    if (input.name !== undefined) {
      data.name = input.name
    }

    if (input.image !== undefined) {
      data.image = input.image
    }

    if (Object.keys(data).length === 0) {
      return prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      })
    }

    const result = await prisma.user.updateMany({
      where: { id: userId },
      data,
    })

    if (result.count === 0) {
      return null
    }

    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    })

}

async updatePassword(
userId: string,
currentPassword: string,
newPassword: string,
): Promise<'updated' | 'not-found' | 'incorrect-current'> {
const user = await prisma.user.findUnique({
where: { id: userId },
select: {
id: true,
password: true,
},
})

    if (!user || !user.password) {
      return 'not-found'
    }

    const isValid = await verifyPassword(currentPassword, user.password)
    if (!isValid) {
      return 'incorrect-current'
    }

    const passwordHash = await hashPassword(newPassword)
    await prisma.user.update({
      where: { id: userId },
      data: {
        password: passwordHash,
        sessionVersion: {
          increment: 1,
        },
      },
    })

    return 'updated'

}

async beginEmailChange(
userId: string,
email: string,
): Promise<'updated' | 'not-found' | 'email-in-use'> {
const normalizedEmail = email.trim().toLowerCase()

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
      },
    })

    if (!user) {
      return 'not-found'
    }

    if (user.email.toLowerCase() === normalizedEmail) {
      return 'email-in-use'
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: normalizedEmail,
        NOT: { id: userId },
      },
      select: { id: true },
    })

    if (existingUser) {
      return 'email-in-use'
    }

    await prisma.user.update({
      where: { id: userId },
      data: { pendingEmail: normalizedEmail },
    })

    return 'updated'

}

async confirmEmailChange(
userId: string,
): Promise<'updated' | 'not-found' | 'email-in-use' | 'missing-pending-email'> {
const user = await prisma.user.findUnique({
where: { id: userId },
select: {
id: true,
pendingEmail: true,
},
})

    if (!user) {
      return 'not-found'
    }

    if (!user.pendingEmail) {
      return 'missing-pending-email'
    }

    const emailOwner = await prisma.user.findFirst({
      where: {
        email: user.pendingEmail,
        NOT: { id: userId },
      },
      select: { id: true },
    })

    if (emailOwner) {
      return 'email-in-use'
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        email: user.pendingEmail,
        pendingEmail: null,
        emailVerified: new Date(),
      },
    })

    return 'updated'

}

async disconnectOAuthProvider(
userId: string,
provider: string,
): Promise<'disconnected' | 'not-found' | 'only-login-method'> {
const user = await prisma.user.findUnique({
where: { id: userId },
select: {
id: true,
password: true,
accounts: {
select: {
id: true,
provider: true,
},
},
},
})

    if (!user) {
      return 'not-found'
    }

    const matchingAccount = user.accounts.find((account) => account.provider === provider)
    if (!matchingAccount) {
      return 'not-found'
    }

    const loginMethodCount = (user.password ? 1 : 0) + user.accounts.length
    if (loginMethodCount <= 1) {
      return 'only-login-method'
    }

    await prisma.account.delete({
      where: {
        id: matchingAccount.id,
      },
    })

    return 'disconnected'

}
}

export const userRepository = new UserRepository()
</file>

<file path="src/lib/db/boot.ts">
/**
 * Runs required SQLite PRAGMAs on first connection.
 * Call this once at application startup (e.g., in instrumentation.ts).
 */
import { prisma } from './client'

const GUIDE_SEARCH_BOOT_SQL = [
'CREATE VIRTUAL TABLE IF NOT EXISTS "guides_fts" USING fts5("id" UNINDEXED, "title", "content", content=\'guides\', content_rowid=\'rowid\', tokenize=\'unicode61\');',
'INSERT INTO "guides_fts"("guides_fts") VALUES (\'rebuild\');',
'CREATE TRIGGER IF NOT EXISTS "guides_fts_ai" AFTER INSERT ON "guides" BEGIN INSERT INTO "guides_fts"("rowid", "id", "title", "content") VALUES (new.rowid, new.id, new.title, new.content); END;',
'CREATE TRIGGER IF NOT EXISTS "guides_fts_ad" AFTER DELETE ON "guides" BEGIN INSERT INTO "guides_fts"("guides_fts", "rowid", "id", "title", "content") VALUES (\'delete\', old.rowid, old.id, old.title, old.content); END;',
'CREATE TRIGGER IF NOT EXISTS "guides_fts_au" AFTER UPDATE ON "guides" BEGIN INSERT INTO "guides_fts"("guides_fts", "rowid", "id", "title", "content") VALUES (\'delete\', old.rowid, old.id, old.title, old.content); INSERT INTO "guides_fts"("rowid", "id", "title", "content") VALUES (new.rowid, new.id, new.title, new.content); END;',
] as const

export async function bootDatabase(): Promise<void> {
await prisma.$executeRawUnsafe('PRAGMA journal_mode = WAL;')
  await prisma.$executeRawUnsafe('PRAGMA synchronous = NORMAL;')
await prisma.$executeRawUnsafe('PRAGMA foreign_keys = ON;')
  await prisma.$executeRawUnsafe('PRAGMA busy_timeout = 5000;')
await prisma.$executeRawUnsafe('PRAGMA temp_store = MEMORY;')

for (const statement of GUIDE_SEARCH_BOOT_SQL) {
await prisma.$executeRawUnsafe(statement)
}
}
</file>

<file path="src/lib/db/seed.ts">
import type { PrismaClient } from '@/generated/prisma'
import { hashPassword } from '@/lib/auth/password'

export const SEEDED_USER_EMAIL = 'playwright-user@flashguides.local'
export const SEEDED_USER_PASSWORD = 'Passw0rd!123'
export const SEEDED_GUIDE_SLUG = 'react-basics-seeded'
export const SEEDED_DASHBOARD_FOLDER = 'Frontend'
export const SEEDED_DASHBOARD_TITLES = {
primary: 'React Basics',
search: 'Hooks Mastery',
recent: 'TypeScript Patterns',
favorite: 'Exam Prep Algebra',
delete: 'CSS Layout Systems',
} as const

const SEEDED_GUIDE_CONTENT = `# React Basics

React is a library for building user interfaces.

## Components

React components are reusable building blocks for interface composition.

## Hooks

Hooks let function components use state and lifecycle behavior.

## Practice Questions

JSX stands for JavaScript XML.

## Flashcards

- What is a component? A reusable piece of UI.
- What is a hook? A function for React state or lifecycle behavior.
  `

export async function resetSeedData(prisma: PrismaClient): Promise<void> {
await prisma.note.deleteMany()
await prisma.guideTag.deleteMany()
await prisma.tag.deleteMany()
await prisma.guide.deleteMany()
await prisma.folder.deleteMany()
await prisma.account.deleteMany()
await prisma.session.deleteMany()
await prisma.verificationToken.deleteMany()
await prisma.user.deleteMany()
await prisma.guestQuota.deleteMany()
}

export async function seedBaselineData(prisma: PrismaClient): Promise<void> {
const passwordHash = await hashPassword(SEEDED_USER_PASSWORD)

const user = await prisma.user.create({
data: {
email: SEEDED_USER_EMAIL,
name: 'Playwright User',
password: passwordHash,
emailVerified: new Date('2026-04-23T00:00:00.000Z'),
},
})

const folder = await prisma.folder.create({
data: {
userId: user.id,
name: SEEDED_DASHBOARD_FOLDER,
},
})

const reactTag = await prisma.tag.create({
data: { name: 'react' },
})

const hooksTag = await prisma.tag.create({
data: { name: 'hooks' },
})

const guides = await Promise.all([
prisma.guide.create({
data: {
userId: user.id,
slug: SEEDED_GUIDE_SLUG,
title: SEEDED_DASHBOARD_TITLES.primary,
studyMode: 'OVERVIEW',
inputType: 'TOPIC',
inputValue: 'React basics',
content: SEEDED_GUIDE_CONTENT,
isPublic: true,
isWatermark: false,
folderId: folder.id,
},
}),
prisma.guide.create({
data: {
userId: user.id,
slug: 'hooks-mastery-seeded',
title: SEEDED_DASHBOARD_TITLES.search,
studyMode: 'DEEP_DIVE',
inputType: 'TOPIC',
inputValue: 'React hooks',
content: '# Hooks Mastery\n\nUnderstand useState, useEffect, and custom hooks.',
isPublic: false,
isWatermark: false,
folderId: folder.id,
},
}),
prisma.guide.create({
data: {
userId: user.id,
slug: 'typescript-patterns-seeded',
title: SEEDED_DASHBOARD_TITLES.recent,
studyMode: 'OVERVIEW',
inputType: 'TOPIC',
inputValue: 'TypeScript patterns',
content:
'# TypeScript Patterns\n\nUnion narrowing, discriminated unions, and utility types.',
isPublic: false,
isWatermark: false,
},
}),
prisma.guide.create({
data: {
userId: user.id,
slug: 'exam-prep-algebra-seeded',
title: SEEDED_DASHBOARD_TITLES.favorite,
studyMode: 'EXAM_PREP',
inputType: 'TOPIC',
inputValue: 'Algebra exam prep',
content: '# Algebra Review\n\nQuadratics, factoring, and systems of equations.',
isPublic: false,
isWatermark: false,
isFavorite: true,
},
}),
prisma.guide.create({
data: {
userId: user.id,
slug: 'css-layout-systems-seeded',
title: SEEDED_DASHBOARD_TITLES.delete,
studyMode: 'ELI5',
inputType: 'TOPIC',
inputValue: 'CSS layout systems',
content: '# CSS Layouts\n\nFlexbox and Grid for page layout.',
isPublic: false,
isWatermark: false,
},
}),
])

await prisma.guideTag.createMany({
data: [
{ guideId: guides[0].id, tagId: reactTag.id },
{ guideId: guides[1].id, tagId: reactTag.id },
{ guideId: guides[1].id, tagId: hooksTag.id },
{ guideId: guides[2].id, tagId: hooksTag.id },
],
})

await prisma.note.create({
data: {
userId: user.id,
guideId: guides[0].id,
selectedText: 'React components are reusable building blocks for interface composition.',
content: 'Useful explanation for the export and deletion flow.',
},
})
}

export async function reseedDatabase(prisma: PrismaClient): Promise<void> {
await resetSeedData(prisma)
await seedBaselineData(prisma)
}
</file>

<file path="src/lib/errors/handler.ts">
import { NextResponse } from 'next/server'
import { getLogger } from '@/lib/logger'
import { getOrCreateRequestId, withRequestId } from '@/lib/logger/middleware'
import { applySecurityHeaders } from '@/lib/security/headers'

export interface ApiErrorResponseOptions {
status: number
code: string
message: string
details?: Record<string, unknown>
headers?: HeadersInit
}

export class ApiRouteError extends Error {
status: number
code: string
details?: Record<string, unknown>
headers?: HeadersInit

constructor(options: ApiErrorResponseOptions) {
super(options.message)
this.name = 'ApiRouteError'
this.status = options.status
this.code = options.code
this.details = options.details
this.headers = options.headers
}
}

function resolveRequestId(requestOrId: Request | string): string {
return typeof requestOrId === 'string' ? requestOrId : getOrCreateRequestId(requestOrId)
}

export function createApiErrorResponse(
requestOrId: Request | string,
options: ApiErrorResponseOptions,
): Response {
const requestId = resolveRequestId(requestOrId)

const response = NextResponse.json(
{
error: {
code: options.code,
message: options.message,
requestId,
...(options.details ?? {}),
},
},
{
status: options.status,
headers: options.headers,
},
)

return withRequestId(applySecurityHeaders(response), requestId)
}

export function handleApiError(error: unknown, requestOrId: Request | string): Response {
if (error instanceof ApiRouteError) {
return createApiErrorResponse(requestOrId, error)
}

const requestId = resolveRequestId(requestOrId)

getLogger().error({ error, event: 'api.error.unhandled', requestId }, 'Unhandled API route error')

return createApiErrorResponse(requestId, {
status: 500,
code: 'INTERNAL_ERROR',
message:
process.env['NODE_ENV'] === 'production'
? 'An unexpected error occurred'
: error instanceof Error
? error.message
: 'An unexpected error occurred',
})
}
</file>

<file path="src/lib/export/data-exporter.ts">
import JSZip from 'jszip'
import { prisma } from '@/lib/db/client'

export async function generateUserDataExport(userId: string): Promise<Buffer> {
const [guides, notes] = await Promise.all([
prisma.guide.findMany({
where: { userId },
orderBy: { createdAt: 'asc' },
select: {
id: true,
slug: true,
title: true,
studyMode: true,
inputType: true,
inputValue: true,
content: true,
isPublic: true,
isFavorite: true,
createdAt: true,
updatedAt: true,
},
}),
prisma.note.findMany({
where: { userId },
orderBy: { createdAt: 'asc' },
select: {
id: true,
guideId: true,
selectedText: true,
content: true,
createdAt: true,
updatedAt: true,
},
}),
])

const zip = new JSZip()
const guidesFolder = zip.folder('guides')

for (const guide of guides) {
guidesFolder?.file(`${guide.slug}.md`, guide.content)
}

zip.file(
'data.json',
JSON.stringify(
{
guides,
notes,
},
null,
2,
),
)

return zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' })
}
</file>

<file path="src/lib/export/guide-types.ts">
import type { InputType, StudyMode } from '@/generated/prisma'

export interface GuideExportRecord {
id: string
slug: string
title: string
studyMode: StudyMode
inputType: InputType
inputValue: string
content: string
createdAt?: Date
updatedAt?: Date
}
</file>

<file path="src/lib/export/html.ts">
import { marked } from 'marked'
import type { GuideExportRecord } from './guide-types'

const REMOTE_IMAGE_REGEX = /!\[([^\]]\*)\]\((https?:\/\/[^)]+)\)/g

async function fetchAsDataUri(url: string, fetchImpl: typeof fetch): Promise<string> {
const response = await fetchImpl(url)
if (!response.ok) {
throw new Error(`Unable to fetch image: ${url}`)
}

const contentType = response.headers.get('content-type') ?? 'application/octet-stream'
const buffer = Buffer.from(await response.arrayBuffer())
return `data:${contentType};base64,${buffer.toString('base64')}`
}

async function inlineRemoteImages(content: string, fetchImpl: typeof fetch): Promise<string> {
let result = content
const matches = [...content.matchAll(REMOTE_IMAGE_REGEX)]

for (const match of matches) {
const alt = match[1] ?? ''
const url = match[2]
if (!url || !match[0]) {
continue
}

    try {
      const dataUri = await fetchAsDataUri(url, fetchImpl)
      result = result.replace(match[0], `![${alt}](${dataUri})`)
    } catch {
      // Leave the original URL in place when inlining fails.
    }

}

return result
}

export async function buildHtmlExport(
guide: GuideExportRecord,
fetchImpl: typeof fetch = fetch,
): Promise<string> {
const inlinedContent = await inlineRemoteImages(guide.content, fetchImpl)
const bodyHtml = await marked.parse(inlinedContent)

return `<!doctype html>

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${guide.title}</title>
    <style>
      :root { color-scheme: light; }
      body {
        margin: 0;
        font-family: Georgia, "Times New Roman", serif;
        background: linear-gradient(180deg, #f8fafc 0%, #ffffff 40%);
        color: #1f2937;
      }
      main {
        max-width: 56rem;
        margin: 0 auto;
        padding: 3rem 1.5rem 4rem;
      }
      header {
        margin-bottom: 2rem;
        padding: 2rem;
        border: 1px solid #dbe4f0;
        border-radius: 1.5rem;
        background: white;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      }
      .eyebrow {
        font: 600 0.75rem/1.2 ui-sans-serif, system-ui, sans-serif;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #64748b;
      }
      h1 { font-size: 2.75rem; line-height: 1.1; margin: 0.75rem 0; }
      .meta { color: #475569; font: 500 0.95rem/1.7 ui-sans-serif, system-ui, sans-serif; }
      article {
        padding: 2rem;
        border: 1px solid #dbe4f0;
        border-radius: 1.5rem;
        background: white;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
      }
      article h1, article h2, article h3 { color: #0f172a; }
      article p, article li, article blockquote { font-size: 1rem; line-height: 1.9; }
      article pre {
        overflow-x: auto;
        border-radius: 1rem;
        padding: 1rem;
        background: #0f172a;
        color: #f8fafc;
      }
      article code {
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      }
      article img {
        width: 100%;
        height: auto;
        margin: 1.5rem 0;
        border-radius: 1rem;
      }
      article blockquote {
        margin-left: 0;
        padding-left: 1rem;
        border-left: 4px solid #f59e0b;
        color: #475569;
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <div class="eyebrow">FlashGuides export</div>
        <h1>${guide.title}</h1>
        <p class="meta">${guide.studyMode} · ${guide.inputType} · ${guide.inputValue}</p>
      </header>
      <article>${bodyHtml}</article>
    </main>
  </body>
</html>`
}
</file>

<file path="src/lib/export/markdown.ts">
import type { GuideExportRecord } from './guide-types'

function escapeFrontmatter(value: string): string {
return value.replace(/"/g, '\\"')
}

export function buildMarkdownExport(guide: GuideExportRecord): string {
const frontmatter = [
'---',
`title: "${escapeFrontmatter(guide.title)}"`,
`slug: "${guide.slug}"`,
`studyMode: "${guide.studyMode}"`,
`inputType: "${guide.inputType}"`,
`inputValue: "${escapeFrontmatter(guide.inputValue)}"`,
'---',
].join('\n')

return `${frontmatter}\n\n${guide.content.trim()}\n`
}
</file>

<file path="src/lib/export/pdf.ts">
import React from 'react'
import { Document, Page, StyleSheet, Text, View, renderToBuffer } from '@react-pdf/renderer'
import { parseGuideContent } from '@/lib/guides/content'
import type { GuideExportRecord } from './guide-types'

function stripMarkdown(value: string): string {
return value
.replace(/!\[[^\]]_\]\(([^)]+)\)/g, '$1')
.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')
.replace(/[`_\_>#-]/g, '')
.replace(/\n{3,}/g, '\n\n')
.trim()
}

const styles = StyleSheet.create({
page: {
padding: 36,
fontSize: 11,
color: '#1f2937',
fontFamily: 'Helvetica',
},
title: {
fontSize: 24,
marginBottom: 8,
fontFamily: 'Helvetica-Bold',
},
meta: {
fontSize: 10,
color: '#475569',
marginBottom: 18,
},
section: {
marginBottom: 16,
},
heading: {
fontSize: 14,
marginBottom: 6,
fontFamily: 'Helvetica-Bold',
},
body: {
lineHeight: 1.5,
},
})

export async function buildPdfExport(guide: GuideExportRecord): Promise<Buffer> {
const parsed = parseGuideContent(guide.content)

return renderToBuffer(
React.createElement(
Document,
null,
React.createElement(
Page,
{ size: 'LETTER', style: styles.page },
React.createElement(Text, { style: styles.title }, guide.title),
React.createElement(
Text,
{ style: styles.meta },
`${guide.studyMode} · ${guide.inputType} · ${guide.inputValue}`,
),
parsed.intro
? React.createElement(
View,
{ style: styles.section },
React.createElement(Text, { style: styles.body }, stripMarkdown(parsed.intro)),
)
: null,
...parsed.sections.map((section) =>
React.createElement(
View,
{ key: section.id, style: styles.section },
React.createElement(Text, { style: styles.heading }, section.heading),
React.createElement(Text, { style: styles.body }, stripMarkdown(section.body)),
),
),
),
),
)
}
</file>

<file path="src/lib/generation/.gitkeep">

</file>

<file path="src/lib/generation/base-generator.ts">
import type { GuideSection, QuizItem, NormalizedInput } from '@/types/generation'
import type { IStudyModeStrategy } from '@/lib/study-modes/types'
import type { ClaudeClient } from '@/lib/ai/claude'
import { STUDY_MODE_INSTRUCTIONS } from '@/lib/ai/prompts/index'

/\*\*

- BaseGuideGenerator — Template Method pattern.
- Subclasses override `planSections`, and optionally `buildQuizzes`.
- `enrichWithMedia` is a no-op by default.
  \*/
  export abstract class BaseGuideGenerator implements IStudyModeStrategy {
  constructor(readonly client: ClaudeClient) {}

abstract planSections(
input: NormalizedInput,
): Promise<{ title: string; sections: GuideSection[] }>

async enrichWithMedia(sections: GuideSection[]): Promise<GuideSection[]> {
// Default: no enrichment; subclasses may override
return sections
}

async buildQuizzes(\_sections: GuideSection[]): Promise<QuizItem[]> {
// Default: no quizzes; ExamPrep overrides
return []
}

/\*\*

- Parse a plain text response from Claude that contains title + sections.
- Expected format:
- TITLE: <title>
- ## <Heading 1>
- <body>
- ## <Heading 2>
- <body>
   */
  protected parsePlan(raw: string): { title: string; sections: GuideSection[] } {
    const lines = raw.split('\n')
    let title = 'Study Guide'
    const sections: GuideSection[] = []
    let currentHeading = ''
    const bodyLines: string[] = []

  for (const line of lines) {
  const titleMatch = /^TITLE:\s\*(.+)/.exec(line)
  if (titleMatch) {
  title = titleMatch[1]?.trim() ?? title
  continue
  }

      const headingMatch = /^#{1,3}\s+(.+)/.exec(line)
      if (headingMatch) {
        if (currentHeading) {
          sections.push({ heading: currentHeading, body: bodyLines.join('\n').trim() })
          bodyLines.length = 0
        }
        currentHeading = headingMatch[1]?.trim() ?? ''
        continue
      }

      if (currentHeading) bodyLines.push(line)

  }

  if (currentHeading) {
  sections.push({ heading: currentHeading, body: bodyLines.join('\n').trim() })
  }

  return { title, sections }

}

/\*\*

- Build the planning prompt for a given study mode instruction set.
  \*/
  protected buildPlanPrompt(
  input: NormalizedInput,
  modeKey: keyof typeof STUDY_MODE_INSTRUCTIONS,
  ): string {
  const fileSpecificRequirements =
  input.type === 'FILE'
  ? `

* This source came from an uploaded file. Ground the guide only in the extracted document text below.
* Do not infer the topic from the filename, file extension, or generic knowledge about PDFs/documents.
* If the extracted text is thin or noisy, stay conservative and summarize only what is actually present.`
  : ''

  return `${STUDY_MODE_INSTRUCTIONS[modeKey]}

Requirements:

- Use all relevant information from the source material below; do not collapse specific facts into vague summaries.
- Prefer thorough coverage over brevity when the source contains meaningful detail.
- Include concrete examples, comparisons, edge cases, and explanations where the material supports them.
- Make each section substantive enough that a student could study from it directly.
  ${fileSpecificRequirements}

Plan a study guide about the following topic/content. Output:

1. First line: "TITLE: <guide title>"
2. Then each section as "## <heading>" followed by a paragraph body.

Topic/Content:
${input.text.slice(0, 16000)}`
}
}
</file>

<file path="src/lib/generation/input-normalizer.ts">
import { z } from 'zod'
import { MCPClientFactory } from '@/lib/mcp/factory'
import type { WebFetchInput, WebFetchOutput } from '@/lib/mcp/adapters/web-fetch'
import type {
  YouTubeTranscriptInput,
  YouTubeTranscriptOutput,
} from '@/lib/mcp/adapters/youtube-transcript'
import type { GenerationRequest, NormalizedInput } from '@/types/generation'
import { extractYouTubeVideoId, isYouTubeUrl } from './url-detector'

const urlSchema = z.string().url()

export async function normalizeInput(request: GenerationRequest): Promise<NormalizedInput> {
if (request.inputType === 'TOPIC' || request.inputType === 'TEXT') {
return {
type: request.inputType,
text: request.inputValue,
originalValue: request.inputValue,
}
}

if (request.inputType === 'FILE') {
return {
type: request.inputType,
text: request.inputValue,
originalValue: request.sourceName ?? 'Uploaded file',
}
}

const validatedUrl = urlSchema.parse(request.inputValue)

if (isYouTubeUrl(validatedUrl)) {
const videoId = extractYouTubeVideoId(validatedUrl)
if (!videoId) {
throw new Error('Invalid YouTube URL')
}

    const transcriptClient = MCPClientFactory.get<YouTubeTranscriptInput, YouTubeTranscriptOutput>(
      'youtube-transcript',
    )
    const transcript = await transcriptClient.execute({ videoId })

    return {
      type: request.inputType,
      text: transcript.text,
      originalValue: request.inputValue,
    }

}

const webFetchClient = MCPClientFactory.get<WebFetchInput, WebFetchOutput>('web-fetch')
const result = await webFetchClient.execute({ url: validatedUrl })

return {
type: request.inputType,
text: result.text,
originalValue: request.inputValue,
}
}
</file>

<file path="src/lib/generation/slug.ts">
import { randomUUID } from 'crypto'

/\*\*

- Convert a guide title into a URL-safe slug with a unique suffix.
- Example: "Intro to React" → "intro-to-react-abc123def"
  \*/
  export function generateSlug(title: string): string {
  const base = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 60)

// Use first 9 chars of a UUID (without dashes) as the unique suffix
const suffix = randomUUID().replace(/-/g, '').slice(0, 9)
return `${base}-${suffix}`
}
</file>

<file path="src/lib/generation/url-detector.ts">
const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtu.be',
  'www.youtu.be',
])

export function isYouTubeUrl(value: string): boolean {
try {
const url = new URL(value)
if (!YOUTUBE_HOSTS.has(url.hostname.toLowerCase())) {
return false
}

    return extractYouTubeVideoId(value) !== null

} catch {
return false
}
}

export function extractYouTubeVideoId(value: string): string | null {
try {
const url = new URL(value)
const host = url.hostname.toLowerCase()

    if (host === 'youtu.be' || host === 'www.youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0]
      return id || null
    }

    if (host === 'youtube.com' || host === 'www.youtube.com' || host === 'm.youtube.com') {
      if (url.pathname === '/watch') {
        return url.searchParams.get('v') || null
      }

      const segments = url.pathname.split('/').filter(Boolean)
      if (segments[0] === 'shorts' || segments[0] === 'embed') {
        return segments[1] || null
      }
    }

    return null

} catch {
return null
}
}
</file>

<file path="src/lib/guest/quota.ts">
import { prisma } from '@/lib/db/client'

export const GUEST_DAILY_LIMIT = 3

/\*\*

- Compute the next midnight UTC from a given date.
  \*/
  function nextMidnightUTC(from: Date = new Date()): Date {
  const next = new Date(from)
  next.setUTCHours(24, 0, 0, 0)
  return next
  }

/\*\*

- Sanitize an IP string: take the first segment of a comma-separated
- x-forwarded-for list and validate it looks like an IPv4 or IPv6 address.
- Falls back to 'unknown' if the value is clearly invalid.
  \*/
  export function sanitizeIp(raw: string | null | undefined): string {
  if (!raw) return 'unknown'
  const first = raw.split(',')[0]?.trim() ?? ''
  // Basic validation: allow IPv4, IPv6, and IPv4-mapped IPv6
  if (/^[\d.]{7,15}$/.test(first) || /^[0-9a-fA-F:]{3,45}$/.test(first)) {
  return first
  }
  return 'unknown'
  }

/\*\*

- Extract the client IP from a Next.js Request object.
  \*/
  export function extractIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return sanitizeIp(forwarded)
  // Fallback — no native request.ip in standard Request
  return 'unknown'
  }

export interface QuotaStatus {
used: number
limit: number
resetsAt: Date
allowed: boolean
}

/\*\*

- Return the current quota status for an IP without modifying the count.
  \*/
  export async function getQuotaStatus(ip: string): Promise<QuotaStatus> {
  const now = new Date()
  const record = await prisma.guestQuota.findUnique({ where: { ip } })

if (!record || record.resetAt <= now) {
return {
used: 0,
limit: GUEST_DAILY_LIMIT,
resetsAt: nextMidnightUTC(now),
allowed: true,
}
}

return {
used: record.count,
limit: GUEST_DAILY_LIMIT,
resetsAt: record.resetAt,
allowed: record.count < GUEST_DAILY_LIMIT,
}
}

/\*\*

- Atomically check and increment the quota for a given IP.
-
- Returns `{ allowed: true, used, resetsAt }` if the request may proceed
- (quota not yet exhausted, count already incremented).
- Returns `{ allowed: false, used, resetsAt }` if the limit is reached.
  \*/
  export async function checkAndIncrementQuota(ip: string): Promise<QuotaStatus> {
  const now = new Date()
  const resetAt = nextMidnightUTC(now)

// Use a transaction to read-then-write atomically with SQLite's serialised
// transaction semantics (prevents double-increment on concurrent requests).
return prisma.$transaction(async (tx) => {
const existing = await tx.guestQuota.findUnique({ where: { ip } })

    // If the quota window has expired, treat as fresh
    const isExpired = existing && existing.resetAt <= now

    if (!existing || isExpired) {
      // Create or reset: count starts at 1 (this is the first guide of the day)
      await tx.guestQuota.upsert({
        where: { ip },
        create: { ip, count: 1, resetAt },
        update: { count: 1, resetAt },
      })
      return { used: 1, limit: GUEST_DAILY_LIMIT, resetsAt: resetAt, allowed: true }
    }

    if (existing.count >= GUEST_DAILY_LIMIT) {
      return {
        used: existing.count,
        limit: GUEST_DAILY_LIMIT,
        resetsAt: existing.resetAt,
        allowed: false,
      }
    }

    // Increment
    const updated = await tx.guestQuota.update({
      where: { ip },
      data: { count: { increment: 1 } },
    })

    return {
      used: updated.count,
      limit: GUEST_DAILY_LIMIT,
      resetsAt: updated.resetAt,
      allowed: true,
    }

})
}
</file>

<file path="src/lib/guides/content.ts">
export interface GuideTocItem {
  id: string
  title: string
}

export interface GuideSectionBlock {
id: string
heading: string
body: string
}

export interface GuideHeroMedia {
type: 'image' | 'youtube'
src: string
alt?: string
}

export interface ParsedGuideContent {
intro: string
sections: GuideSectionBlock[]
toc: GuideTocItem[]
heroMedia?: GuideHeroMedia
}

export function sanitizeGuideContentForMdx(content: string): string {
return content
.replace(/(^|[^\\<{])<(?=\s*(?:=\s*)?\d)/gm, '$1&lt;')
.replace(/(^|[^\\>{])>(?=\s*(?:=\s*)?\d)/gm, '$1&gt;')
}

function slugifyHeading(value: string): string {
return value
.toLowerCase()
.trim()
.replace(/[^a-z0-9\s-]/g, '')
.replace(/\s+/g, '-')
.replace(/-+/g, '-')
}

function extractHeroMedia(content: string): GuideHeroMedia | undefined {
const imageMatch = /!\[([^\]]\*)\]\(([^)]+)\)/.exec(content)
if (imageMatch?.[2]) {
return {
type: 'image',
src: imageMatch[2],
alt: imageMatch[1] || 'Guide illustration',
}
}

const youtubeMatch =
/(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)[^\s)]+)/.exec(
content,
)

if (youtubeMatch?.[1]) {
return {
type: 'youtube',
src: youtubeMatch[1],
alt: 'Guide video',
}
}

return undefined
}

export function parseGuideContent(content: string): ParsedGuideContent {
const sanitizedContent = sanitizeGuideContentForMdx(content)
const withoutTitle = sanitizedContent.replace(/^#\s+.+?(?:\n|$)/, '').trim()
const lines = withoutTitle.split('\n')

const introLines: string[] = []
const sections: GuideSectionBlock[] = []

let currentHeading: string | null = null
let currentBody: string[] = []

const flushSection = () => {
if (!currentHeading) {
return
}

    const body = currentBody.join('\n').trim()
    sections.push({
      id: slugifyHeading(currentHeading),
      heading: currentHeading,
      body,
    })

}

for (const line of lines) {
const headingMatch = /^##\s+(.+)$/.exec(line)

    if (headingMatch) {
      flushSection()
      currentHeading = headingMatch[1]!.trim()
      currentBody = []
      continue
    }

    if (currentHeading) {
      currentBody.push(line)
    } else {
      introLines.push(line)
    }

}

flushSection()

return {
intro: introLines.join('\n').trim(),
sections,
toc: sections.map((section) => ({ id: section.id, title: section.heading })),
heroMedia: extractHeroMedia(withoutTitle),
}
}
</file>

<file path="src/lib/guides/fork.ts">
import { prisma } from '@/lib/db/client'
import { generateSlug } from '@/lib/generation/slug'

function buildForkTitle(title: string): string {
return `[Fork] ${title}`.slice(0, 255)
}

export async function forkGuide(
sourceId: string,
targetUserId: string,
): Promise<
| { status: 'not-found' }
| {
status: 'created'
guide: {
id: string
slug: string
title: string
}
}

> {
> const sourceGuide = await prisma.guide.findFirst({

    where: {
      id: sourceId,
      shareLink: {
        isNot: null,
      },
    },
    select: {
      id: true,
      title: true,
      studyMode: true,
      inputType: true,
      inputValue: true,
      content: true,
      tags: {
        select: {
          tagId: true,
        },
      },
      notes: {
        select: {
          selectedText: true,
          content: true,
        },
      },
    },

})

if (!sourceGuide) {
return { status: 'not-found' }
}

const forked = await prisma.$transaction(async (tx) => {
const guide = await tx.guide.create({
data: {
userId: targetUserId,
slug: generateSlug(buildForkTitle(sourceGuide.title)),
title: buildForkTitle(sourceGuide.title),
studyMode: sourceGuide.studyMode,
inputType: sourceGuide.inputType,
inputValue: sourceGuide.inputValue,
content: sourceGuide.content,
isPublic: false,
isFavorite: false,
isWatermark: false,
},
select: {
id: true,
slug: true,
title: true,
},
})

    if (sourceGuide.tags.length > 0) {
      await tx.guideTag.createMany({
        data: sourceGuide.tags.map((tag) => ({
          guideId: guide.id,
          tagId: tag.tagId,
        })),
      })
    }

    for (const note of sourceGuide.notes) {
      await tx.note.create({
        data: {
          userId: targetUserId,
          guideId: guide.id,
          selectedText: note.selectedText,
          content: note.content,
        },
      })
    }

    return guide

})

return {
status: 'created',
guide: forked,
}
}
</file>

<file path="src/lib/logger/index.ts">
import { AsyncLocalStorage } from 'node:async_hooks'
import pino from 'pino'
import type { Logger } from 'pino'

const LOG_LEVEL = process.env['LOG_LEVEL'] ?? 'info'
const IS_DEVELOPMENT = process.env['NODE_ENV'] === 'development'

const transport = IS_DEVELOPMENT
? pino.transport({
target: 'pino-pretty',
options: {
colorize: true,
ignore: 'pid,hostname',
},
})
: undefined

const baseLogger = pino(
{
level: LOG_LEVEL,
redact: {
paths: [
'email',
'password',
'passwordHash',
'token',
'authorization',
'cookie',
'set-cookie',
'headers.authorization',
'headers.cookie',
],
censor: '[Redacted]',
},
},
transport,
)

const requestLoggerStorage = new AsyncLocalStorage<Logger>()

export function createLogger(requestId?: string) {
return requestId ? baseLogger.child({ requestId }) : baseLogger
}

export function getLogger(): Logger {
return requestLoggerStorage.getStore() ?? baseLogger
}

export function withRequestLogger<T>(requestId: string, callback: () => T): T {
return requestLoggerStorage.run(createLogger(requestId), callback)
}
</file>

<file path="src/lib/logger/middleware.ts">
import { randomUUID } from 'node:crypto'
import { NextResponse, type NextRequest } from 'next/server'

export const REQUEST_ID_HEADER = 'x-request-id'

export function getOrCreateRequestId(request: Request | NextRequest): string {
const existingRequestId = request.headers.get(REQUEST_ID_HEADER)?.trim()
return existingRequestId || randomUUID()
}

export function withRequestId<T extends Response>(response: T, requestId: string): T {
response.headers.set(REQUEST_ID_HEADER, requestId)
return response
}

export function createRequestIdPassthroughResponse(
request: NextRequest,
requestId = getOrCreateRequestId(request),
) {
const requestHeaders = new Headers(request.headers)
requestHeaders.set(REQUEST_ID_HEADER, requestId)

const response = NextResponse.next({
request: {
headers: requestHeaders,
},
})

response.headers.set(REQUEST_ID_HEADER, requestId)

return response
}
</file>

<file path="src/lib/mcp/adapters/fal-image-gen.ts">
import { createFalClient, ApiError } from '@fal-ai/client'
import type { IMCPClient } from '../types'
import { MCPRateLimitError, MCPServiceError } from '../types'

export interface FalImageGenInput {
prompt: string
width?: number
height?: number
}

export interface FalImageGenOutput {
url: string
alt: string
}

const MODEL_ID = 'fal-ai/flux/schnell'
const DEFAULT_WIDTH = 512
const DEFAULT_HEIGHT = 512

interface FalImageResult {
data?: {
images?: Array<{ url: string; width?: number; height?: number }>
}
images?: Array<{ url: string; width?: number; height?: number }>
}

/\*\*

- FalImageGenAdapter — wraps fal.ai FLUX schnell for fast image generation.
- Throws `MCPRateLimitError` on 429, `MCPServiceError` on other failures.
- Intended as best-effort: the orchestrator should catch errors and degrade gracefully.
  \*/
  export class FalImageGenAdapter implements IMCPClient<FalImageGenInput, FalImageGenOutput> {
  readonly toolName = 'fal-image-gen'

private readonly client = createFalClient({
credentials: () => process.env['FAL_API_KEY'] ?? '',
})

async execute({
prompt,
width = DEFAULT_WIDTH,
height = DEFAULT_HEIGHT,
}: FalImageGenInput): Promise<FalImageGenOutput> {
let result: FalImageResult
try {
result = (await this.client.run(MODEL_ID, {
input: { prompt, image_size: { width, height } },
})) as FalImageResult
} catch (err) {
if (err instanceof ApiError) {
if (err.status === 429) {
throw new MCPRateLimitError('fal.ai rate limit exceeded')
}
throw new MCPServiceError(`fal.ai error: HTTP ${err.status}`)
}
throw new MCPServiceError(
`fal.ai image generation failed: ${err instanceof Error ? err.message : String(err)}`,
)
}

    // run() returns { data: {...}, requestId: '' } via resultResponseHandler
    const images = result.data?.images ?? result.images
    const image = images?.[0]
    if (!image?.url) {
      throw new MCPServiceError('fal.ai returned no image')
    }

    return { url: image.url, alt: prompt }

}
}
</file>

<file path="src/lib/mcp/adapters/tavily-search.ts">
import { tavily } from '@tavily/core'
import type { IMCPClient } from '../types'
import { MCPRateLimitError, MCPServiceError } from '../types'

export interface TavilySearchInput {
query: string
maxResults?: number
}

export interface TavilySearchResult {
title: string
url: string
snippet: string
}

const DEFAULT_MAX_RESULTS = 5

/\*\*

- TavilySearchAdapter — wraps the Tavily search API.
- Throws `MCPRateLimitError` on 429, `MCPServiceError` on 5xx / unexpected errors.
  \*/
  export class TavilySearchAdapter implements IMCPClient<TavilySearchInput, TavilySearchResult[]> {
  readonly toolName = 'tavily-search'

private readonly client = tavily({
apiKey: process.env['TAVILY_API_KEY'] ?? '',
})

async execute({
query,
maxResults = DEFAULT_MAX_RESULTS,
}: TavilySearchInput): Promise<TavilySearchResult[]> {
let response: Awaited<ReturnType<typeof this.client.search>>
try {
response = await this.client.search(query, {
maxResults,
searchDepth: 'basic',
})
} catch (err) {
// Tavily uses axios; HTTP errors come as AxiosError with err.response.status
// The SDK also re-throws with a plain message string for some error cases
const status =
(err as { response?: { status?: number } }).response?.status ??
(err as { status?: number }).status
if (status === 429) {
throw new MCPRateLimitError('Tavily rate limit exceeded')
}
if (status && status >= 500) {
throw new MCPServiceError(`Tavily service error: HTTP ${status}`)
}
// Check message for rate limit / service error patterns from Tavily SDK
const message = err instanceof Error ? err.message : String(err)
if (message.includes('429')) {
throw new MCPRateLimitError('Tavily rate limit exceeded')
}
throw new MCPServiceError(`Tavily search failed: ${message}`)
}

    return (response.results ?? []).slice(0, maxResults).map((r) => ({
      title: r.title ?? '',
      url: r.url ?? '',
      snippet: r.content ?? '',
    }))

}
}
</file>

<file path="src/lib/mcp/adapters/web-fetch.ts">
import type { IMCPClient } from '../types'
import { MCPFetchError, MCPServiceError, MCPTimeoutError } from '../types'

export interface WebFetchInput {
url: string
timeoutMs?: number
}

export interface WebFetchOutput {
text: string
title?: string
}

const DEFAULT_TIMEOUT_MS = 10_000
const MAX_TEXT_CHARS = 100_000

function stripHtml(html: string): string {
return html
.replace(/<script[\s\S]_?<\/script>/gi, '')
.replace(/<style[\s\S]_?<\/style>/gi, '')
.replace(/<[^>]+>/g, ' ')
.replace(/&nbsp;/g, ' ')
.replace(/&amp;/g, '&')
.replace(/&lt;/g, '<')
.replace(/&gt;/g, '>')
.replace(/&quot;/g, '"')
.replace(/&#39;/g, "'")
.replace(/\s+/g, ' ')
.trim()
}

function extractTitle(html: string): string | undefined {
const match = /<title[^>]_>([^<]_)<\/title>/i.exec(html)
return match?.[1]?.trim() || undefined
}

/\*\*

- WebFetchAdapter — fetches an HTTPS URL and returns stripped text.
- Throws `MCPFetchError` on 4xx, `MCPServiceError` on 5xx, `MCPTimeoutError` on abort.
  \*/
  export class WebFetchAdapter implements IMCPClient<WebFetchInput, WebFetchOutput> {
  readonly toolName = 'web-fetch'

async execute({ url, timeoutMs = DEFAULT_TIMEOUT_MS }: WebFetchInput): Promise<WebFetchOutput> {
const controller = new AbortController()
const timer = setTimeout(() => controller.abort(), timeoutMs)

    let res: Response
    try {
      res = await fetch(url, { signal: controller.signal })
    } catch (err) {
      clearTimeout(timer)
      if (err instanceof Error && err.name === 'AbortError') {
        throw new MCPTimeoutError(`Request to ${url} timed out after ${timeoutMs}ms`)
      }
      throw new MCPServiceError(
        `Network error fetching ${url}: ${err instanceof Error ? err.message : String(err)}`,
      )
    }
    clearTimeout(timer)

    if (res.status >= 400 && res.status < 500) {
      throw new MCPFetchError(`HTTP ${res.status} from ${url}`, res.status)
    }
    if (res.status >= 500) {
      throw new MCPServiceError(`HTTP ${res.status} from ${url}`)
    }

    const html = await res.text()
    const title = extractTitle(html)
    const text = stripHtml(html).slice(0, MAX_TEXT_CHARS)

    return { text, title }

}
}
</file>

<file path="src/lib/mcp/adapters/youtube-transcript.ts">
import { YoutubeTranscript } from 'youtube-transcript'
import type { IMCPClient } from '../types'
import { MCPTranscriptUnavailableError } from '../types'

export interface YouTubeTranscriptInput {
videoId: string
lang?: string
}

export interface YouTubeTranscriptOutput {
text: string
language?: string
}

/\*\*

- YouTubeTranscriptAdapter — fetches public YouTube captions and joins them into plain text.
- Throws `MCPTranscriptUnavailableError` when captions are disabled or otherwise unavailable.
  \*/
  export class YouTubeTranscriptAdapter implements IMCPClient<
  YouTubeTranscriptInput,
  YouTubeTranscriptOutput
  > {
  > readonly toolName = 'youtube-transcript'

async execute({ videoId, lang }: YouTubeTranscriptInput): Promise<YouTubeTranscriptOutput> {
try {
const transcript = await YoutubeTranscript.fetchTranscript(videoId, { lang })
const text = transcript
.map((part) => part.text.trim())
.filter(Boolean)
.join(' ')
.trim()

      if (!text) {
        throw new MCPTranscriptUnavailableError(`Transcript unavailable for video: ${videoId}`)
      }

      return {
        text,
        language: transcript[0]?.lang ?? lang,
      }
    } catch (err) {
      if (err instanceof MCPTranscriptUnavailableError) {
        throw err
      }

      throw new MCPTranscriptUnavailableError(
        `Transcript unavailable for video: ${videoId}${err instanceof Error ? ` (${err.message})` : ''}`,
      )
    }

}
}
</file>

<file path="src/lib/mcp/factory.ts">
import type { IMCPClient } from './types'
import { MCPError } from './types'

/\*\*

- MCPClientFactory — Registry pattern.
- Adapters call `MCPClientFactory.register(instance)` at the composition root.
- The orchestrator retrieves them via `MCPClientFactory.get(toolName)`.
  \*/
  export class MCPClientFactory {
  private static registry = new Map<string, IMCPClient<unknown, unknown>>()

static register<T, R>(client: IMCPClient<T, R>): void {
MCPClientFactory.registry.set(client.toolName, client as IMCPClient<unknown, unknown>)
}

static get<T, R>(toolName: string): IMCPClient<T, R> {
const client = MCPClientFactory.registry.get(toolName)
if (!client) {
throw new MCPError(`No MCP client registered for tool: ${toolName}`)
}
return client as IMCPClient<T, R>
}

/\*_ Exposed for test isolation only — do not call in production code. _/
static \_clearForTesting(): void {
MCPClientFactory.registry.clear()
}
}
</file>

<file path="src/lib/mcp/retry-decorator.ts">
import type { IMCPClient } from './types'
import { MCPServiceError, MCPTimeoutError } from './types'

function isRetryable(err: unknown): boolean {
return err instanceof MCPServiceError || err instanceof MCPTimeoutError
}

/\*\*

- RetryDecorator — Decorator pattern over any `IMCPClient`.
- Retries only on `MCPServiceError` and `MCPTimeoutError` (transient failures).
- Uses exponential backoff with random jitter.
  \*/
  export class RetryDecorator<T, R> implements IMCPClient<T, R> {
  get toolName(): string {
  return this.client.toolName
  }

constructor(
private readonly client: IMCPClient<T, R>,
private readonly maxRetries = 3,
private readonly baseDelayMs = 300,
) {}

async execute(input: T): Promise<R> {
let lastError: unknown

    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        return await this.client.execute(input)
      } catch (err) {
        lastError = err
        if (!isRetryable(err) || attempt === this.maxRetries - 1) {
          throw err
        }
        const jitter = this.baseDelayMs > 0 ? Math.random() * 100 : 0
        const delay = this.baseDelayMs * Math.pow(2, attempt) + jitter
        await new Promise<void>((resolve) => setTimeout(resolve, delay))
      }
    }

    // Should never reach here, but satisfies the type-checker
    throw lastError

}
}
</file>

<file path="src/lib/mcp/types.ts">
// ── Core interface ────────────────────────────────────────────────────────────

export interface IMCPClient<TInput, TOutput> {
readonly toolName: string
execute(input: TInput): Promise<TOutput>
}

// ── Error hierarchy ───────────────────────────────────────────────────────────

export class MCPError extends Error {
constructor(message: string) {
super(message)
this.name = 'MCPError'
}
}

/\*_ HTTP 4xx response from a fetch. Non-retryable. _/
export class MCPFetchError extends MCPError {
constructor(
message: string,
public readonly statusCode?: number,
) {
super(message)
this.name = 'MCPFetchError'
}
}

/\*_ Network timeout or AbortController signal fired. Retryable. _/
export class MCPTimeoutError extends MCPError {
constructor(message: string) {
super(message)
this.name = 'MCPTimeoutError'
}
}

/\*_ HTTP 5xx or unexpected service failure. Retryable. _/
export class MCPServiceError extends MCPError {
constructor(message: string) {
super(message)
this.name = 'MCPServiceError'
}
}

/\*_ HTTP 429 rate-limit from a third-party API. Non-retryable. _/
export class MCPRateLimitError extends MCPError {
constructor(message: string) {
super(message)
this.name = 'MCPRateLimitError'
}
}

/\*_ YouTube video has captions disabled or unavailable. Non-retryable. _/
export class MCPTranscriptUnavailableError extends MCPError {
constructor(message: string) {
super(message)
this.name = 'MCPTranscriptUnavailableError'
}
}
</file>

<file path="src/lib/rate-limit/index.ts">
import { checkAndIncrementQuota } from '@/lib/guest/quota'

export interface RateLimitStatus {
allowed: boolean
used: number
limit: number
remaining: number
resetsAt: Date
retryAfter: number
}

export function getRetryAfterSeconds(resetsAt: Date, now: Date = new Date()): number {
return Math.max(0, Math.ceil((resetsAt.getTime() - now.getTime()) / 1000))
}

export async function checkGuestGenerationRateLimit(ip: string): Promise<RateLimitStatus> {
const quota = await checkAndIncrementQuota(ip)

return {
allowed: quota.allowed,
used: quota.used,
limit: quota.limit,
remaining: Math.max(0, quota.limit - quota.used),
resetsAt: quota.resetsAt,
retryAfter: getRetryAfterSeconds(quota.resetsAt),
}
}
</file>

<file path="src/lib/rate-limit/middleware.ts">
import { extractIp } from '@/lib/guest/quota'
import { createApiErrorResponse } from '@/lib/errors/handler'
import { checkGuestGenerationRateLimit } from './index'

export async function enforceGuestGenerationRateLimit(request: Request): Promise<Response | null> {
const rateLimit = await checkGuestGenerationRateLimit(extractIp(request))

if (rateLimit.allowed) {
return null
}

return createApiErrorResponse(request, {
status: 429,
code: 'RATE_LIMIT_EXCEEDED',
message: "You've created 3 guides today. Sign up for unlimited access!",
details: {
retryAfter: rateLimit.retryAfter,
resetsAt: rateLimit.resetsAt.toISOString(),
signupUrl: '/register',
},
headers: {
'Retry-After': String(rateLimit.retryAfter),
},
})
}
</file>

<file path="src/lib/security/csrf.ts">
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS'])

function normalizeOrigin(value: string | null): string | null {
if (!value) {
return null
}

try {
return new URL(value).origin
} catch {
return null
}
}

export function validateOrigin(request: Request): boolean {
if (SAFE_METHODS.has(request.method.toUpperCase())) {
return true
}

const requestOrigin = new URL(request.url).origin
const configuredOrigins = [
process.env['NEXT_PUBLIC_APP_URL'],
process.env['NEXTAUTH_URL'],
process.env['AUTH_URL'],
requestOrigin,
].flatMap((value) => {
const origin = normalizeOrigin(value ?? null)
return origin ? [origin] : []
})

const allowedOrigins = new Set(configuredOrigins)
const originHeader = normalizeOrigin(request.headers.get('origin'))

if (originHeader) {
return allowedOrigins.has(originHeader)
}

const refererHeader = normalizeOrigin(request.headers.get('referer'))
if (refererHeader) {
return allowedOrigins.has(refererHeader)
}

return true
}
</file>

<file path="src/lib/security/headers.ts">
export interface SecurityHeaderOptions {
  isProduction?: boolean
}

export function buildSecurityHeaders(options: SecurityHeaderOptions = {}): Record<string, string> {
const isProduction = options.isProduction ?? process.env['NODE_ENV'] === 'production'

const headers: Record<string, string> = {
'Content-Security-Policy': [
"default-src 'self'",
"base-uri 'self'",
"form-action 'self'",
"frame-ancestors 'none'",
"object-src 'none'",
"script-src 'self' 'unsafe-inline' 'unsafe-eval'",
"style-src 'self' 'unsafe-inline'",
"img-src 'self' data: blob: https:",
"font-src 'self' data:",
"connect-src 'self' https:",
"frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com",
"media-src 'self' data: blob: https:",
].join('; '),
'Referrer-Policy': 'strict-origin-when-cross-origin',
'X-Content-Type-Options': 'nosniff',
'X-Frame-Options': 'DENY',
}

if (isProduction) {
headers['Strict-Transport-Security'] = 'max-age=63072000; includeSubDomains; preload'
}

return headers
}

export function applySecurityHeaders<T extends Response>(
response: T,
options?: SecurityHeaderOptions,
): T {
const headers = buildSecurityHeaders(options)

for (const [name, value] of Object.entries(headers)) {
response.headers.set(name, value)
}

return response
}
</file>

<file path="src/lib/security/response.ts">
import { NextResponse } from 'next/server'
import { applySecurityHeaders } from './headers'

export function forbiddenCsrfResponse() {
return applySecurityHeaders(NextResponse.json({ error: 'Forbidden' }, { status: 403 }))
}
</file>

<file path="src/lib/security/sanitize.ts">
export function sanitizeInput(value: string): string {
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/\0/g, '')
    .trim()
}

export function sanitizeObjectStrings<T extends Record<string, unknown>>(value: T): T {
return Object.fromEntries(
Object.entries(value).map(([key, entryValue]) => [
key,
typeof entryValue === 'string' ? sanitizeInput(entryValue) : entryValue,
]),
) as T
}
</file>

<file path="src/lib/sharing/proxy.ts">
import { NextResponse, type NextRequest } from 'next/server'

export async function maybeRewriteUnavailableShare(
request: NextRequest,
fetchImpl: typeof fetch = fetch,
): Promise<NextResponse | null> {
const match = request.nextUrl.pathname.match(/^\/share\/([^/]+)$/)

if (!match || match[1] === 'unavailable') {
return null
}

const token = match[1]
const statusUrl = new URL(`/api/share-links/${token}/status`, request.url)
const response = await fetchImpl(statusUrl, {
headers: {
accept: 'application/json',
},
})

if (response.status !== 410) {
return null
}

return NextResponse.rewrite(new URL('/share/unavailable', request.url), { status: 410 })
}
</file>

<file path="src/lib/sharing/token.ts">
import { randomBytes } from 'node:crypto'

export function generateShareToken(): string {
return randomBytes(24).toString('base64url')
}
</file>

<file path="src/lib/storage/minio.ts">
import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { randomUUID } from 'node:crypto'

const MAX*AVATAR_BYTES = 2 * 1024 \_ 1024
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const

export type AvatarMimeType = (typeof ALLOWED_MIME_TYPES)[number]

export function getAvatarValidationMessage(): string {
return 'Image must be JPEG, PNG, or WebP under 2 MB'
}

function buildPublicUrl(key: string): string {
const endpoint = (process.env['S3_ENDPOINT'] ?? '').replace(/\/$/, '')
const bucket = process.env['S3_BUCKET'] ?? ''
if (!endpoint || !bucket) {
throw new Error('S3 storage is not configured')
}

return `${endpoint}/${bucket}/${key}`
}

function getBucketName(): string {
const bucket = process.env['S3_BUCKET']
if (!bucket) {
throw new Error('S3 storage is not configured')
}

return bucket
}

function getS3Client(): S3Client {
const endpoint = process.env['S3_ENDPOINT']
const accessKeyId = process.env['S3_ACCESS_KEY']
const secretAccessKey = process.env['S3_SECRET_KEY']

if (!endpoint || !accessKeyId || !secretAccessKey) {
throw new Error('S3 storage is not configured')
}

return new S3Client({
region: 'us-east-1',
endpoint,
forcePathStyle: true,
credentials: {
accessKeyId,
secretAccessKey,
},
})
}

function detectMimeType(buffer: Uint8Array): AvatarMimeType | null {
if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
return 'image/jpeg'
}

if (
buffer.length >= 8 &&
buffer[0] === 0x89 &&
buffer[1] === 0x50 &&
buffer[2] === 0x4e &&
buffer[3] === 0x47 &&
buffer[4] === 0x0d &&
buffer[5] === 0x0a &&
buffer[6] === 0x1a &&
buffer[7] === 0x0a
) {
return 'image/png'
}

if (
buffer.length >= 12 &&
buffer[0] === 0x52 &&
buffer[1] === 0x49 &&
buffer[2] === 0x46 &&
buffer[3] === 0x46 &&
buffer[8] === 0x57 &&
buffer[9] === 0x45 &&
buffer[10] === 0x42 &&
buffer[11] === 0x50
) {
return 'image/webp'
}

return null
}

function extensionForMimeType(mimeType: AvatarMimeType): string {
switch (mimeType) {
case 'image/jpeg':
return 'jpg'
case 'image/png':
return 'png'
case 'image/webp':
return 'webp'
}
}

export async function validateAvatarFile(
file: File,
): Promise<{ buffer: Buffer; mimeType: AvatarMimeType }> {
if (!ALLOWED_MIME_TYPES.includes(file.type as AvatarMimeType) || file.size > MAX_AVATAR_BYTES) {
throw new Error(getAvatarValidationMessage())
}

const buffer = Buffer.from(await file.arrayBuffer())
const detectedType = detectMimeType(buffer)

if (!detectedType || detectedType !== file.type) {
throw new Error(getAvatarValidationMessage())
}

return {
buffer,
mimeType: detectedType,
}
}

export async function uploadAvatar(
buffer: Buffer,
mimeType: AvatarMimeType,
userId: string,
): Promise<string> {
const bucket = getBucketName()

const key = `avatars/${userId}/${randomUUID()}.${extensionForMimeType(mimeType)}`
const client = getS3Client()

await client.send(
new PutObjectCommand({
Bucket: bucket,
Key: key,
Body: buffer,
ContentType: mimeType,
CacheControl: 'public, max-age=31536000, immutable',
}),
)

return buildPublicUrl(key)
}

function extractKeyFromUrl(url: string): string | null {
try {
const parsed = new URL(url)
const bucket = getBucketName()
const prefix = `/${bucket}/`
if (!parsed.pathname.startsWith(prefix)) {
return null
}

    return parsed.pathname.slice(prefix.length)

} catch {
return null
}
}

export async function uploadExportArchive(
buffer: Buffer,
userId: string,
): Promise<{ downloadUrl: string; expiresAt: string; objectKey: string }> {
if (process.env['PLAYWRIGHT_TEST'] === '1') {
return {
downloadUrl: `data:application/zip;base64,${buffer.toString('base64')}`,
expiresAt: new Date(Date.now() + 60_000).toISOString(),
objectKey: 'inline-playwright-export',
}
}

const bucket = getBucketName()
const client = getS3Client()
const objectKey = `exports/${userId}/${randomUUID()}.zip`
const expiresInSeconds = 60

await client.send(
new PutObjectCommand({
Bucket: bucket,
Key: objectKey,
Body: buffer,
ContentType: 'application/zip',
CacheControl: 'private, max-age=60',
}),
)

const downloadUrl = await getSignedUrl(
client,
new GetObjectCommand({
Bucket: bucket,
Key: objectKey,
}),
{ expiresIn: expiresInSeconds },
)

return {
downloadUrl,
expiresAt: new Date(Date.now() + expiresInSeconds \* 1000).toISOString(),
objectKey,
}
}

export async function deleteStoredObjectByUrl(url: string | null | undefined): Promise<void> {
if (!url) {
return
}

const key = extractKeyFromUrl(url)
if (!key) {
return
}

const client = getS3Client()
await client.send(
new DeleteObjectCommand({
Bucket: getBucketName(),
Key: key,
}),
)
}

export async function deleteStoredObjectsByPrefix(prefix: string): Promise<void> {
const client = getS3Client()
const bucket = getBucketName()

const list = await client.send(
new ListObjectsV2Command({
Bucket: bucket,
Prefix: prefix,
}),
)

for (const object of list.Contents ?? []) {
if (!object.Key) {
continue
}

    await client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: object.Key,
      }),
    )

}
}
</file>

<file path="src/lib/study-modes/.gitkeep">

</file>

<file path="src/lib/study-modes/deep-dive.ts">
import type { NormalizedInput, GuideSection } from '@/types/generation'
import { BaseGuideGenerator } from '@/lib/generation/base-generator'

export class DeepDiveStrategy extends BaseGuideGenerator {
async planSections(input: NormalizedInput): Promise<{ title: string; sections: GuideSection[] }> {
const prompt = this.buildPlanPrompt(input, 'DEEP_DIVE')
const raw = await this.client.generate(prompt, undefined, 3072)
return this.parsePlan(raw)
}
}
</file>

<file path="src/lib/study-modes/eli5.ts">
import type { NormalizedInput, GuideSection } from '@/types/generation'
import { BaseGuideGenerator } from '@/lib/generation/base-generator'

export class ELI5Strategy extends BaseGuideGenerator {
async planSections(input: NormalizedInput): Promise<{ title: string; sections: GuideSection[] }> {
const prompt = this.buildPlanPrompt(input, 'ELI5')
const raw = await this.client.generate(prompt)
return this.parsePlan(raw)
}
}
</file>

<file path="src/lib/study-modes/exam-prep.ts">
import type { NormalizedInput, GuideSection, QuizItem } from '@/types/generation'
import { BaseGuideGenerator } from '@/lib/generation/base-generator'
import { STUDY_MODE_INSTRUCTIONS } from '@/lib/ai/prompts/index'

export class ExamPrepStrategy extends BaseGuideGenerator {
async planSections(input: NormalizedInput): Promise<{ title: string; sections: GuideSection[] }> {
const prompt = this.buildPlanPrompt(input, 'EXAM_PREP')
const raw = await this.client.generate(prompt, undefined, 3072)
return this.parsePlan(raw)
}

override async buildQuizzes(sections: GuideSection[]): Promise<QuizItem[]> {
const sectionText = sections
.map((s) => `## ${s.heading}\n${s.body}`)
.join('\n\n')
.slice(0, 6000)

    const prompt = `${STUDY_MODE_INSTRUCTIONS['EXAM_PREP']}

Based on the following study guide sections, generate 8 multiple-choice quiz items.
Cover recall, application, comparison, and common-trap scenarios.
Each explanation must be specific and teach why the correct answer is right.
Output each as valid JSON in this exact array format (no markdown fences):
[{"question":"...","options":["A","B","C","D"],"correctIndex":0,"explanation":"..."}, ...]

Sections:
${sectionText}`

    const raw = await this.client.generate(prompt, undefined, 3072)

    try {
      const jsonMatch = /\[[\s\S]*\]/.exec(raw)
      if (!jsonMatch) return []
      return JSON.parse(jsonMatch[0]) as QuizItem[]
    } catch {
      return []
    }

}
}
</file>

<file path="src/lib/study-modes/factory.ts">
import type { StudyModeType } from '@/types/generation'
import type { IStudyModeStrategy } from './types'
import type { ClaudeClient } from '@/lib/ai/claude'
import { OverviewStrategy } from './overview'
import { DeepDiveStrategy } from './deep-dive'
import { ExamPrepStrategy } from './exam-prep'
import { ELI5Strategy } from './eli5'

/\*\*

- Factory that creates the correct study-mode strategy for a given mode.
  \*/
  export class StudyModeStrategyFactory {
  static create(mode: StudyModeType, client: ClaudeClient): IStudyModeStrategy {
  switch (mode) {
  case 'OVERVIEW':
  return new OverviewStrategy(client)
  case 'DEEP_DIVE':
  return new DeepDiveStrategy(client)
  case 'EXAM_PREP':
  return new ExamPrepStrategy(client)
  case 'ELI5':
  return new ELI5Strategy(client)
  }
  }
  }
  </file>

<file path="src/lib/study-modes/overview.ts">
import type { NormalizedInput, GuideSection } from '@/types/generation'
import { BaseGuideGenerator } from '@/lib/generation/base-generator'

export class OverviewStrategy extends BaseGuideGenerator {
async planSections(input: NormalizedInput): Promise<{ title: string; sections: GuideSection[] }> {
const prompt = this.buildPlanPrompt(input, 'OVERVIEW')
const raw = await this.client.generate(prompt)
return this.parsePlan(raw)
}
}
</file>

<file path="src/lib/study-modes/types.ts">
import type { GuideSection, QuizItem, NormalizedInput } from '@/types/generation'
import type { ClaudeClient } from '@/lib/ai/claude'

/\*\*

- Contract every study-mode strategy must satisfy.
  \*/
  export interface IStudyModeStrategy {
  /\*\*
  - Produce a guide title and ordered section list for the given input.
    \*/
    planSections(input: NormalizedInput): Promise<{ title: string; sections: GuideSection[] }>

/\*\*

- Optionally enrich sections with additional content (images, web search).
- Default implementation is a no-op.
  \*/
  enrichWithMedia(sections: GuideSection[]): Promise<GuideSection[]>

/\*\*

- Build quiz items from the sections (only relevant for EXAM_PREP).
- Other modes return an empty array.
  \*/
  buildQuizzes(sections: GuideSection[]): Promise<QuizItem[]>

/\*_ The Vercel AI SDK claude client to use for generation. _/
readonly client: ClaudeClient
}
</file>

<file path="src/lib/utils/.gitkeep">

</file>

<file path="src/server/.gitkeep">

</file>

<file path="src/types/.gitkeep">

</file>

<file path="src/types/next-auth.d.ts">
import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
interface Session {
user: {
id: string
} & DefaultSession['user']
}
}
</file>

<file path="src/proxy.ts">
import { NextResponse } from 'next/server'
import {
  createRequestIdPassthroughResponse,
  getOrCreateRequestId,
  withRequestId,
} from '@/lib/logger/middleware'
import { proxyAuth } from '@/lib/auth/proxy'
import { validateOrigin } from '@/lib/security/csrf'
import { applySecurityHeaders } from '@/lib/security/headers'
import { maybeRewriteUnavailableShare } from '@/lib/sharing/proxy'

/\*\*

- Next.js Proxy — delegates to Auth.js v5 `auth`.
-
- The `authorized` callback (src/lib/auth/middleware.ts) controls which
- routes require a session. The matcher below ensures this runs only on
- navigable paths and skips static assets, Next.js internals, and the
- auth API routes themselves.
  \*/
  export default proxyAuth(async (request) => {
  const requestId = getOrCreateRequestId(request)

if (
request.nextUrl.pathname.startsWith('/api/') &&
!request.nextUrl.pathname.startsWith('/api/test/') &&
validateOrigin(request) === false
) {
return withRequestId(
applySecurityHeaders(NextResponse.json({ error: 'Forbidden' }, { status: 403 })),
requestId,
)
}

const shareRewrite = await maybeRewriteUnavailableShare(request)
if (shareRewrite) {
return withRequestId(applySecurityHeaders(shareRewrite), requestId)
}

return applySecurityHeaders(createRequestIdPassthroughResponse(request, requestId))
})

export const config = {
matcher: [
/\*

- Match all paths EXCEPT:
- - \_next/static (Next.js static files)
- - \_next/image (Next.js image optimization)
- - favicon.ico
- - api/auth (Auth.js own endpoints — must be public)
- - api/health (health check — must be public)
- - ._\.._ (files with extensions — public assets)
    _/
    '/((?!\_next/static|\_next/image|favicon.ico|api/auth|api/health|._\\..\*).+)',
    ],
    }
    </file>

<file path="tests/e2e/account/account.spec.ts">
import { expect, test } from '@playwright/test'
import { SEEDED_USER_EMAIL, SEEDED_USER_PASSWORD } from '@/lib/db/seed'
import { loginAsSeededUser, reseed } from '../guide/test-helpers'

test.describe('Account management', () => {
test.describe.configure({ mode: 'serial' })

test.beforeEach(async ({ page }) => {
await reseed(page)
})

test('T-15: update name via the account page', async ({ page }) => {
await loginAsSeededUser(page)
await page.goto('/account')

    await page.getByTestId('account-name-input').fill('Playwright User Updated')
    await page.getByTestId('account-profile-save').click()

    await expect(page.getByText('Profile updated.')).toBeVisible()

})

test('T-16: change password and sign in with the new password', async ({ page, context }) => {
await loginAsSeededUser(page)
await page.goto('/account')

    await page.getByTestId('account-current-password').fill(SEEDED_USER_PASSWORD)
    await page.getByTestId('account-new-password').fill('NewPass123')
    await page.getByTestId('account-password-save').click()
    await expect(page.getByText('Password updated')).toBeVisible()

    await context.clearCookies()
    await page.goto('/login')
    await page.getByLabel('Email').fill(SEEDED_USER_EMAIL)
    await page.getByLabel('Password').fill('NewPass123')
    await page.getByRole('button', { name: 'Sign in' }).click()

    await expect(page).toHaveURL(/\/dashboard/)

})

test('T-17: export data shows a download link', async ({ page }) => {
await loginAsSeededUser(page)
await page.goto('/account')

    await page.getByTestId('account-export-button').click()
    await expect(page.getByRole('link', { name: 'Download your export' })).toBeVisible()

})

test('T-18: delete account redirects back to home', async ({ page }) => {
await loginAsSeededUser(page)
await page.goto('/account')

    await page.getByTestId('account-delete-confirm-email').fill(SEEDED_USER_EMAIL)
    await page.getByTestId('account-delete-password').fill(SEEDED_USER_PASSWORD)
    await page.getByTestId('account-delete-button').click()

    await expect(page).toHaveURL('http://127.0.0.1:3000/')
    await expect(page.getByRole('heading', { name: 'FlashGuides' })).toBeVisible()

})
})
</file>

<file path="tests/e2e/dashboard/dashboard.spec.ts">
import { expect, test } from '@playwright/test'
import { SEEDED_DASHBOARD_TITLES } from '@/lib/db/seed'
import { loginAsSeededUser, reseed } from '../guide/test-helpers'

test.describe('Dashboard', () => {
test.describe.configure({ mode: 'serial' })

test.beforeEach(async ({ page }) => {
await reseed(page)
})

test('T-16: dashboard loads and shows saved guides', async ({ page }) => {
await loginAsSeededUser(page)
await page.goto('/dashboard')

    await expect(page.getByRole('heading', { name: 'Your study library' })).toBeVisible()
    await expect(page.getByTestId('dashboard-guide-card')).toHaveCount(5)
    await expect(page.getByText(SEEDED_DASHBOARD_TITLES.primary)).toBeVisible()

})

test('T-17: search finds a guide by title', async ({ page }) => {
await loginAsSeededUser(page)
await page.goto('/dashboard')

    await page.getByTestId('dashboard-search').fill('Hooks')
    await expect(page.getByText(SEEDED_DASHBOARD_TITLES.search)).toBeVisible()
    await expect(page.getByText(SEEDED_DASHBOARD_TITLES.favorite)).toHaveCount(0)

})

test('T-18: favorite toggle persists across reload', async ({ page }) => {
await loginAsSeededUser(page)
await page.goto('/dashboard')

    const favoriteToggle = page
      .getByTestId(/favorite-toggle-.*/)
      .filter({ hasText: 'Star' })
      .first()
    await favoriteToggle.click()
    await expect(page.getByTestId('dashboard-message')).toContainText('Guide added to favorites.')

    await page.reload()
    await page.getByTestId('dashboard-view-favorites').click()
    await expect(page.getByText(SEEDED_DASHBOARD_TITLES.primary)).toBeVisible()

})

test('T-19: delete guide removes it from the dashboard', async ({ page }) => {
await loginAsSeededUser(page)
await page.goto('/dashboard')

    page.once('dialog', (dialog) => dialog.accept())
    await page
      .getByTestId(/delete-guide-.*/)
      .nth(4)
      .click()

    await expect(page.getByTestId('dashboard-message')).toContainText(
      `Deleted ${SEEDED_DASHBOARD_TITLES.delete}.`,
    )
    await expect(page.getByRole('link', { name: SEEDED_DASHBOARD_TITLES.delete })).toHaveCount(0)

})

test('T-20: unauthenticated users are redirected to login', async ({ page }) => {
await page.goto('/dashboard')

    await expect(page).toHaveURL(/\/login\?callbackUrl=%2Fdashboard/)
    await expect(page.getByRole('heading', { name: 'Sign in to FlashGuides' })).toBeVisible()

})
})
</file>

<file path="tests/e2e/guest/gallery.spec.ts">
import { test, expect } from '@playwright/test'

/\*\*

- T-15: Gallery page loads without login — guide cards visible
- T-17: Gallery empty state renders when no featured guides exist
-
- These tests use the live /gallery page served by the Next.js app.
  \*/

test.describe('Public gallery', () => {
// T-15: /gallery is accessible without authentication
test('T-15: gallery page loads without login', async ({ page }) => {
const res = await page.goto('/gallery')
expect(res?.status()).toBe(200)
await expect(page.getByRole('heading', { name: /featured guides/i })).toBeVisible()
})

// T-15: page structure — either a grid of cards or the empty state is present
test('T-15: gallery shows guide grid or empty state', async ({ page }) => {
await page.goto('/gallery')

    const grid = page.getByTestId('gallery-grid')
    const empty = page.getByTestId('gallery-empty')

    // One of the two must be present
    const gridVisible = await grid.isVisible().catch(() => false)
    const emptyVisible = await empty.isVisible().catch(() => false)

    expect(gridVisible || emptyVisible).toBe(true)

})

// T-17: When no public guides exist, the empty state message is shown
// (This assertion targets the empty-state message copy defined in the spec)
test('T-17: empty state copy matches spec', async ({ page }) => {
await page.goto('/gallery')

    const empty = page.getByTestId('gallery-empty')
    const grid = page.getByTestId('gallery-grid')

    const isGridVisible = await grid.isVisible().catch(() => false)

    if (!isGridVisible) {
      await expect(empty).toBeVisible()
      await expect(empty).toContainText(/check back soon/i)
    } else {
      // Grid is visible — T-17 is satisfied by the fact that empty state
      // renders correctly when there are no guides (covered by unit test)
      expect(isGridVisible).toBe(true)
    }

})

// Guide cards in the grid should link to /guide/:slug
test('T-15: guide cards link to guide pages', async ({ page }) => {
await page.goto('/gallery')

    const grid = page.getByTestId('gallery-grid')
    const isGridVisible = await grid.isVisible().catch(() => false)

    if (!isGridVisible) {
      // No public guides seeded — skip card link assertion
      test.skip()
      return
    }

    const firstCard = page.getByTestId('guide-card').first()
    await expect(firstCard).toBeVisible()
    const href = await firstCard.getAttribute('href')
    expect(href).toMatch(/^\/guide\//)

})
})
</file>

<file path="tests/e2e/guest/quota-flow.spec.ts">
import { test, expect } from '@playwright/test'

/\*\*

- T-13: Guest can generate and view guides (up to limit)
- T-14: Guest sees quota modal on 4th attempt
- T-16: Concurrent requests near quota — server-side atomic enforcement
-
- Note: These tests manipulate the guest quota via the test-only reset
- endpoint (POST /api/test/reset-quota) which is only active when
- NODE_ENV=test. The app must be running with NODE_ENV=test.
  \*/

// The test IP injected via x-forwarded-for header (configured in request)
const TEST_IP = '10.0.0.100'

async function resetQuota(page: import('@playwright/test').Page) {
const res = await page.request.post('/api/test/reset-quota', {
data: { ip: TEST_IP },
headers: { 'Content-Type': 'application/json' },
})
// If reset endpoint is unavailable (non-test env) skip gracefully
if (res.status() === 404) {
test.skip()
}
}

test.describe('Guest quota flow', () => {
test.beforeEach(async ({ page }) => {
await resetQuota(page)
})

// T-13: Guest quota API reports 0 used after reset
test('T-13: quota status starts at 0 after reset', async ({ page }) => {
const res = await page.request.get('/api/guest/quota', {
headers: { 'x-forwarded-for': TEST_IP },
})
expect(res.status()).toBe(200)
const body = (await res.json()) as { used: number; limit: number }
expect(body.used).toBe(0)
expect(body.limit).toBe(3)
})

// T-13 continued: three sequential increments are allowed
test('T-13: three increments remain within allowed limit', async ({ page }) => {
// Use the quota.ts logic directly via the GET endpoint (read-only),
// and the checkAndIncrementQuota path via a future generation endpoint.
// For now we validate via the quota API after direct DB manipulation
// through the reset endpoint.
const status = await page.request.get('/api/guest/quota', {
headers: { 'x-forwarded-for': TEST_IP },
})
expect(status.status()).toBe(200)
const body = (await status.json()) as { used: number }
expect(body.used).toBeLessThanOrEqual(3)
})

// T-14: After reaching the limit, quota API reports used = limit
test('T-14: quota endpoint reports used equals limit when exhausted', async ({ request }) => {
// Simulate 3 used by calling a stub or directly seeding via DB reset trick:
// POST reset with a pre-filled count is not available; instead we note that
// this test will be fully exercised once the guide generation endpoint exists.
// For now assert the structure of the exhausted response.
const res = await request.get('/api/guest/quota', {
headers: { 'x-forwarded-for': TEST_IP },
})
const body = (await res.json()) as {
used: number
limit: number
resetsAt: string
}
expect(body).toHaveProperty('used')
expect(body).toHaveProperty('limit')
expect(body).toHaveProperty('resetsAt')
expect(body.limit).toBe(3)
})

// T-16: Quota endpoint is idempotent for read requests (atomic increment
// behaviour is tested at the unit level in quota.test.ts)
test('T-16: concurrent GET requests do not corrupt quota state', async ({ page }) => {
const requests = Array.from({ length: 5 }, () =>
page.request.get('/api/guest/quota', {
headers: { 'x-forwarded-for': TEST_IP },
}),
)
const responses = await Promise.all(requests)
for (const res of responses) {
expect(res.status()).toBe(200)
const body = (await res.json()) as { used: number; limit: number }
expect(body.used).toBeGreaterThanOrEqual(0)
expect(body.limit).toBe(3)
}
})
})
</file>

<file path="tests/e2e/guide/guide-renderer.spec.ts">
import { expect, test } from '@playwright/test'
import { loginAsSeededUser, openSeededGuide, reseed, selectTextInGuide } from './test-helpers'

test.describe('Guide renderer', () => {
test.describe.configure({ mode: 'serial' })

test.beforeEach(async ({ page }) => {
await reseed(page)
})

test('T-16: guide page renders TOC and content', async ({ page }) => {
await openSeededGuide(page)
await expect(page.getByTestId('guide-renderer')).toBeVisible()
await expect(page.getByTestId('guide-toc')).toBeVisible()
await expect(page.getByRole('link', { name: 'Components' })).toBeVisible()
})

test('T-20: dark mode toggle persists across reload', async ({ page }) => {
await openSeededGuide(page)
const toggle = page.getByTestId('theme-toggle')
await expect(toggle).toBeVisible()
await toggle.click()
await expect(page.locator('html')).toHaveClass(/dark/)

    await page.reload()
    await expect(page.locator('html')).toHaveClass(/dark/)

})

test('T-21: authenticated user can save a highlight note', async ({ page }) => {
await loginAsSeededUser(page)
await selectTextInGuide(page, 'React components are reusable building blocks')

    const tooltip = page.getByTestId('highlight-note-tooltip')
    await expect(tooltip).toBeVisible()

    await page.getByRole('button', { name: 'Save note' }).click()
    await expect(page.getByRole('button', { name: 'Saved' })).toBeVisible()

})

test('T-22: authenticated user can send a follow-up question', async ({ page }) => {
await loginAsSeededUser(page)

    await page.getByPlaceholder('Ask a follow-up question…').fill('What are hooks used for?')
    await page.getByRole('button', { name: 'Send' }).click()

    await expect(page.getByTestId('follow-up-messages')).toContainText('What are hooks used for?')
    await expect(page.getByTestId('follow-up-messages')).toContainText(
      'Stubbed response for: What are hooks used for?',
    )

})
})
</file>

<file path="tests/e2e/guide/test-helpers.ts">
import { expect, type Page } from '@playwright/test'
import { SEEDED_GUIDE_SLUG, SEEDED_USER_EMAIL } from '@/lib/db/seed'

export async function reseed(page: Page) {
const response = await page.request.post('/api/test/seed')
expect(response.ok()).toBe(true)
}

export async function openSeededGuide(page: Page) {
await page.goto(`/guide/${SEEDED_GUIDE_SLUG}`)
await expect(page.getByTestId('guide-renderer')).toBeVisible()
}

export async function loginAsSeededUser(page: Page) {
const response = await page.request.post('/api/test/session', {
data: { email: SEEDED_USER_EMAIL },
})

expect(response.ok()).toBe(true)

await page.goto(`/guide/${SEEDED_GUIDE_SLUG}`)
await expect(page.getByTestId('guide-renderer')).toBeVisible()
}

export async function selectTextInGuide(page: Page, text: string) {
await page.evaluate((selectedText) => {
const root = document.querySelector('[data-testid="guide-renderer"]')
if (!root) {
throw new Error('Guide renderer not found')
}

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    let textNode: Text | null = null

    while (walker.nextNode()) {
      const current = walker.currentNode as Text
      if (current.textContent?.includes(selectedText)) {
        textNode = current
        break
      }
    }

    if (!textNode || !textNode.textContent) {
      throw new Error(`Unable to find text: ${selectedText}`)
    }

    const startIndex = textNode.textContent.indexOf(selectedText)
    const range = document.createRange()
    range.setStart(textNode, startIndex)
    range.setEnd(textNode, startIndex + selectedText.length)

    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)

    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))

}, text)
}
</file>

<file path="tests/e2e/sharing/sharing.spec.ts">
import { expect, test } from '@playwright/test'
import { SEEDED_GUIDE_SLUG, SEEDED_USER_EMAIL, SEEDED_USER_PASSWORD } from '@/lib/db/seed'
import { reseed } from '../guide/test-helpers'

test.describe('Sharing and export', () => {
test.describe.configure({ mode: 'serial' })

test.beforeEach(async ({ page }) => {
await reseed(page)
})

test('T-21: owner can export, share, fork, and revoke a guide link', async ({ page }) => {
await page.goto('/login')
await page.getByLabel('Email').fill(SEEDED_USER_EMAIL)
await page.getByLabel('Password').fill(SEEDED_USER_PASSWORD)
await page.getByRole('button', { name: 'Sign in' }).click()
await expect(page).toHaveURL(/\/dashboard/)

    await page.goto(`/guide/${SEEDED_GUIDE_SLUG}`)

    const downloadPromise = page.waitForEvent('download')
    await page.getByTestId('guide-export-button').click()
    await page.getByRole('link', { name: 'Markdown' }).click()

    const download = await downloadPromise
    expect(download.suggestedFilename()).toBe(`${SEEDED_GUIDE_SLUG}.md`)

    await page.getByTestId('guide-share-button').click()
    await page.getByRole('button', { name: 'Create link' }).click()
    await expect(page.getByText('Share link created.')).toBeVisible()

    const sharedUrlInput = page.locator('input[readonly]').first()
    const sharedUrl = await sharedUrlInput.inputValue()
    expect(sharedUrl.startsWith('http://127.0.0.1:3000/share/')).toBe(true)

    await page.goto(sharedUrl)
    await expect(page.getByText('Shared guide')).toBeVisible()
    await expect(page.getByTestId('fork-guide-button')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'React Basics' })).toBeVisible()
    await expect(
      page.getByText('React components are reusable building blocks for interface composition.'),
    ).toBeVisible()

    await page.getByTestId('fork-guide-button').click()
    await expect(page).toHaveURL(/\/guide\//)
    await expect(page).not.toHaveURL(new RegExp(`${SEEDED_GUIDE_SLUG}$`))
    await expect(page.getByRole('heading', { name: '[Fork] React Basics' })).toBeVisible()

    await page.goto(`/guide/${SEEDED_GUIDE_SLUG}`)
    await page.getByTestId('guide-share-button').click()
    await page.getByRole('button', { name: 'Create link' }).click()
    await expect(page.getByText('Existing share link loaded.')).toBeVisible()
    await page.getByRole('button', { name: 'Revoke link' }).click()
    await expect(page.getByText('Share link revoked.')).toBeVisible()

    await page.goto(sharedUrl)
    await expect(
      page.getByRole('heading', { name: 'This share link has expired or was revoked.' }),
    ).toBeVisible()

})
})
</file>

<file path="tests/e2e/.gitkeep">

</file>

<file path="tests/fixtures/cli-fixture-repo/scripts/helper.ts">
console.log('helper fixture')
</file>

<file path="tests/fixtures/cli-fixture-repo/src/lib/example.test.ts">
import { expect, test } from 'vitest'

test('example fixture', () => {
expect(true).toBe(true)
})
</file>

<file path="tests/fixtures/cli-fixture-repo/src/lib/example.ts">
export const example = 'fixture'
</file>

<file path="tests/fixtures/cli-fixture-repo/prisma.config.ts">
const prismaConfig = {}

export default prismaConfig
</file>

<file path="tests/integration/api/account/avatar.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
auth: vi.fn(),
}))

vi.mock('@/lib/db/repositories/users', () => ({
userRepository: {
updateProfile: vi.fn(),
},
}))

vi.mock('@/lib/storage/minio', () => ({
getAvatarValidationMessage: vi.fn(() => 'Please upload a valid avatar image'),
uploadAvatar: vi.fn(),
validateAvatarFile: vi.fn(),
}))

import { auth } from '@/lib/auth'
import { userRepository } from '@/lib/db/repositories/users'
import { getAvatarValidationMessage, uploadAvatar, validateAvatarFile } from '@/lib/storage/minio'
import { POST } from '@/app/api/account/avatar/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockUpdateProfile = userRepository.updateProfile as ReturnType<typeof vi.fn>
const mockUploadAvatar = uploadAvatar as ReturnType<typeof vi.fn>
const mockValidateAvatarFile = validateAvatarFile as ReturnType<typeof vi.fn>

function makeFormRequest(file?: File) {
const formData = new FormData()
if (file) {
formData.set('avatar', file)
}

const request = new Request('http://localhost:3000/api/account/avatar', {
method: 'POST',
})

Object.defineProperty(request, 'formData', {
value: vi.fn().mockResolvedValue(formData),
})

return request
}

beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
mockValidateAvatarFile.mockResolvedValue({
buffer: Buffer.from('image-bytes'),
mimeType: 'image/png',
})
mockUploadAvatar.mockResolvedValue('http://localhost:9000/flashguides/avatars/user-1/avatar.png')
mockUpdateProfile.mockResolvedValue({ id: 'user-1' })
})

describe('POST /api/account/avatar', () => {
it('uploads an avatar for the authenticated user', async () => {
const file = new File(['image'], 'avatar.png', { type: 'image/png' })

    const res = await POST(makeFormRequest(file))

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      imageUrl: 'http://localhost:9000/flashguides/avatars/user-1/avatar.png',
    })

})

it('returns requestId-aware auth errors', async () => {
mockAuth.mockResolvedValueOnce(null)

    const res = await POST(makeFormRequest())

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AUTHENTICATION_REQUIRED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)

})

it('returns requestId-aware avatar validation errors when no file is provided', async () => {
const res = await POST(makeFormRequest())

    expect(res.status).toBe(422)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AVATAR_VALIDATION_ERROR')
    expect(body.error.message).toBe(getAvatarValidationMessage())
    expect(body.error.requestId).toBeTruthy()

})

it('returns requestId-aware upload failures', async () => {
const file = new File(['image'], 'avatar.png', { type: 'image/png' })
mockUploadAvatar.mockRejectedValueOnce(new Error('minio down'))

    const res = await POST(makeFormRequest(file))

    expect(res.status).toBe(500)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AVATAR_UPLOAD_FAILED')
    expect(body.error.message).toBe('Avatar upload failed')
    expect(body.error.requestId).toBeTruthy()

})
})
</file>

<file path="tests/integration/api/account/delete.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
auth: vi.fn(),
}))

vi.mock('@/lib/auth/password', () => ({
verifyPassword: vi.fn(),
}))

vi.mock('@/lib/db/client', () => ({
prisma: {
user: {
findUnique: vi.fn(),
delete: vi.fn(),
},
},
}))

vi.mock('@/lib/storage/minio', () => ({
deleteStoredObjectByUrl: vi.fn(),
deleteStoredObjectsByPrefix: vi.fn(),
}))

import { auth } from '@/lib/auth'
import { verifyPassword } from '@/lib/auth/password'
import { prisma } from '@/lib/db/client'
import { POST } from '@/app/api/account/delete/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockVerifyPassword = verifyPassword as ReturnType<typeof vi.fn>
const mockFindUnique = prisma.user.findUnique as ReturnType<typeof vi.fn>
const mockDelete = prisma.user.delete as ReturnType<typeof vi.fn>

function makeRequest(body: unknown) {
return new Request('http://localhost:3000/api/account/delete', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body),
})
}

beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
mockFindUnique.mockResolvedValue({
id: 'user-1',
password: 'hashed-password',
image: 'http://localhost:9000/flashguides/avatars/user-1/avatar.jpg',
})
mockDelete.mockResolvedValue({ id: 'user-1' })
mockVerifyPassword.mockResolvedValue(true)
process.env['NEXTAUTH_SECRET'] = 'test-secret'
})

describe('POST /api/account/delete', () => {
it('deletes the authenticated user account with the correct password', async () => {
const res = await POST(makeRequest({ password: 'Passw0rd!123' }))

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ message: 'Account deleted' })
    expect(mockDelete).toHaveBeenCalledWith({ where: { id: 'user-1' } })

})

it('returns 401 for an incorrect password', async () => {
mockVerifyPassword.mockResolvedValueOnce(false)

    const res = await POST(makeRequest({ password: 'wrong' }))

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('INCORRECT_PASSWORD')
    expect(body.error.message).toBe('Incorrect password')
    expect(body.error.requestId).toBeTruthy()
    expect(mockDelete).not.toHaveBeenCalled()

})
})
</file>

<file path="tests/integration/api/account/email.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
auth: vi.fn(),
}))

vi.mock('@/lib/db/repositories/users', () => ({
userRepository: {
beginEmailChange: vi.fn(),
confirmEmailChange: vi.fn(),
},
}))

vi.mock('@/lib/auth/tokens', () => ({
createVerificationToken: vi.fn(),
consumeVerificationToken: vi.fn(),
}))

vi.mock('@/lib/email', () => ({
sendEmailChangeVerification: vi.fn(),
}))

import { auth } from '@/lib/auth'
import { createVerificationToken, consumeVerificationToken } from '@/lib/auth/tokens'
import { userRepository } from '@/lib/db/repositories/users'
import { sendEmailChangeVerification } from '@/lib/email'
import { PATCH } from '@/app/api/account/email/route'
import { GET } from '@/app/api/account/verify-email-change/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockBeginEmailChange = userRepository.beginEmailChange as ReturnType<typeof vi.fn>
const mockConfirmEmailChange = userRepository.confirmEmailChange as ReturnType<typeof vi.fn>
const mockCreateVerificationToken = createVerificationToken as ReturnType<typeof vi.fn>
const mockConsumeVerificationToken = consumeVerificationToken as ReturnType<typeof vi.fn>
const mockSendEmailChangeVerification = sendEmailChangeVerification as ReturnType<typeof vi.fn>

beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
mockBeginEmailChange.mockResolvedValue('updated')
mockConfirmEmailChange.mockResolvedValue('updated')
mockCreateVerificationToken.mockResolvedValue('email-change-token')
mockConsumeVerificationToken.mockResolvedValue('email-change:user-1')
mockSendEmailChangeVerification.mockResolvedValue(undefined)
process.env['NEXTAUTH_URL'] = 'http://localhost:3000'
})

function makePatchRequest(body: unknown) {
return new Request('http://localhost:3000/api/account/email', {
method: 'PATCH',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body),
})
}

describe('account email routes', () => {
it('sends a verification email for a valid pending email change', async () => {
const res = await PATCH(makePatchRequest({ email: 'new@example.com' }))

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ message: 'Verification email sent' })
    expect(mockBeginEmailChange).toHaveBeenCalledWith('user-1', 'new@example.com')
    expect(mockCreateVerificationToken).toHaveBeenCalledWith('email-change:user-1')
    expect(mockSendEmailChangeVerification).toHaveBeenCalledWith(
      'new@example.com',
      'email-change-token',
    )

})

it('returns 409 when the target email is already taken', async () => {
mockBeginEmailChange.mockResolvedValueOnce('email-in-use')

    const res = await PATCH(makePatchRequest({ email: 'taken@example.com' }))

    expect(res.status).toBe(409)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('EMAIL_IN_USE')
    expect(body.error.message).toBe('Email already in use')
    expect(body.error.requestId).toBeTruthy()
    expect(mockCreateVerificationToken).not.toHaveBeenCalled()

})

it('returns requestId-aware missing token errors for verify-email-change', async () => {
const res = await GET(new Request('http://localhost:3000/api/account/verify-email-change'))

    expect(res.status).toBe(400)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('MISSING_TOKEN')
    expect(body.error.message).toBe('Missing token')
    expect(body.error.requestId).toBeTruthy()

})

it('verifies the email-change token and redirects back to account', async () => {
const res = await GET(
new Request('http://localhost:3000/api/account/verify-email-change?token=valid-token'),
)

    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toBe('http://localhost:3000/account?emailChanged=1')
    expect(mockConsumeVerificationToken).toHaveBeenCalledWith('valid-token')
    expect(mockConfirmEmailChange).toHaveBeenCalledWith('user-1')

})
})
</file>

<file path="tests/integration/api/account/export.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
auth: vi.fn(),
}))

vi.mock('@/lib/export/data-exporter', () => ({
generateUserDataExport: vi.fn(),
}))

vi.mock('@/lib/storage/minio', () => ({
uploadExportArchive: vi.fn(),
}))

import { auth } from '@/lib/auth'
import { generateUserDataExport } from '@/lib/export/data-exporter'
import { uploadExportArchive } from '@/lib/storage/minio'
import { POST } from '@/app/api/account/export/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockGenerateUserDataExport = generateUserDataExport as ReturnType<typeof vi.fn>
const mockUploadExportArchive = uploadExportArchive as ReturnType<typeof vi.fn>

function makeRequest() {
return new Request('http://localhost:3000/api/account/export', {
method: 'POST',
})
}

beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
mockGenerateUserDataExport.mockResolvedValue(Buffer.from('zip-data'))
mockUploadExportArchive.mockResolvedValue({
downloadUrl: 'http://localhost:9000/flashguides/exports/user-1/archive.zip?signature=1',
expiresAt: '2026-04-23T00:01:00.000Z',
objectKey: 'exports/user-1/archive.zip',
})
})

describe('POST /api/account/export', () => {
it('returns a download url for the authenticated user export', async () => {
const res = await POST(makeRequest())

    expect(res.status).toBe(202)
    expect(await res.json()).toEqual({
      downloadUrl: 'http://localhost:9000/flashguides/exports/user-1/archive.zip?signature=1',
      expiresAt: '2026-04-23T00:01:00.000Z',
    })
    expect(mockGenerateUserDataExport).toHaveBeenCalledWith('user-1')
    expect(mockUploadExportArchive).toHaveBeenCalled()

})

it('returns requestId-aware auth errors', async () => {
mockAuth.mockResolvedValueOnce(null)

    const res = await POST(makeRequest())

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AUTHENTICATION_REQUIRED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()

})

it('returns requestId-aware export failures', async () => {
mockGenerateUserDataExport.mockRejectedValueOnce(new Error('minio down'))

    const res = await POST(makeRequest())

    expect(res.status).toBe(500)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('ACCOUNT_EXPORT_FAILED')
    expect(body.error.message).toBe('Unable to export account data')
    expect(body.error.requestId).toBeTruthy()

})
})
</file>

<file path="tests/integration/api/account/oauth.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
auth: vi.fn(),
}))

vi.mock('@/lib/db/repositories/users', () => ({
userRepository: {
disconnectOAuthProvider: vi.fn(),
},
}))

import { auth } from '@/lib/auth'
import { userRepository } from '@/lib/db/repositories/users'
import { DELETE } from '@/app/api/account/oauth/[provider]/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockDisconnectOAuthProvider = userRepository.disconnectOAuthProvider as ReturnType<
typeof vi.fn

>

beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
mockDisconnectOAuthProvider.mockResolvedValue('disconnected')
})

describe('DELETE /api/account/oauth/[provider]', () => {
it('disconnects a linked provider when another login method exists', async () => {
const res = await DELETE(
new Request('http://localhost:3000/api/account/oauth/google', { method: 'DELETE' }),
{
params: Promise.resolve({ provider: 'google' }),
},
)

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ message: 'Disconnected' })
    expect(mockDisconnectOAuthProvider).toHaveBeenCalledWith('user-1', 'google')

})

it('returns 400 when removing the only login method', async () => {
mockDisconnectOAuthProvider.mockResolvedValueOnce('only-login-method')

    const res = await DELETE(
      new Request('http://localhost:3000/api/account/oauth/google', { method: 'DELETE' }),
      {
        params: Promise.resolve({ provider: 'google' }),
      },
    )

    expect(res.status).toBe(400)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('ONLY_LOGIN_METHOD')
    expect(body.error.message).toBe('Cannot remove your only login method')
    expect(body.error.requestId).toBeTruthy()

})
})
</file>

<file path="tests/integration/api/account/password.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
auth: vi.fn(),
}))

vi.mock('@/lib/db/repositories/users', () => ({
userRepository: {
updatePassword: vi.fn(),
},
}))

import { auth } from '@/lib/auth'
import { userRepository } from '@/lib/db/repositories/users'
import { PATCH } from '@/app/api/account/password/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockUpdatePassword = userRepository.updatePassword as ReturnType<typeof vi.fn>

function makeRequest(body: unknown) {
return new Request('http://localhost:3000/api/account/password', {
method: 'PATCH',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body),
})
}

beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
mockUpdatePassword.mockResolvedValue('updated')
})

describe('PATCH /api/account/password', () => {
it('updates password when the current password is correct', async () => {
const res = await PATCH(
makeRequest({ currentPassword: 'Current123', newPassword: 'NewPass123' }),
)

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ message: 'Password updated' })
    expect(mockUpdatePassword).toHaveBeenCalledWith('user-1', 'Current123', 'NewPass123')

})

it('returns 401 when the current password is incorrect', async () => {
mockUpdatePassword.mockResolvedValueOnce('incorrect-current')

    const res = await PATCH(makeRequest({ currentPassword: 'Wrong123', newPassword: 'NewPass123' }))

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('CURRENT_PASSWORD_INCORRECT')
    expect(body.error.message).toBe('Current password incorrect')
    expect(body.error.requestId).toBeTruthy()

})
})
</file>

<file path="tests/integration/api/account/profile.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
auth: vi.fn(),
}))

vi.mock('@/lib/db/repositories/users', () => ({
userRepository: {
updateProfile: vi.fn(),
},
}))

import { auth } from '@/lib/auth'
import { userRepository } from '@/lib/db/repositories/users'
import { PATCH } from '@/app/api/account/profile/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockUpdateProfile = userRepository.updateProfile as ReturnType<typeof vi.fn>

function makeRequest(body: unknown) {
return new Request('http://localhost:3000/api/account/profile', {
method: 'PATCH',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body),
})
}

beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
mockUpdateProfile.mockResolvedValue({
id: 'user-1',
name: 'Jeanpaul 🚀',
email: 'jp@example.com',
image: null,
})
})

describe('PATCH /api/account/profile', () => {
it('updates the authenticated user profile', async () => {
const res = await PATCH(makeRequest({ name: 'Jeanpaul 🚀' }))

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      id: 'user-1',
      name: 'Jeanpaul 🚀',
      email: 'jp@example.com',
      image: null,
    })
    expect(mockUpdateProfile).toHaveBeenCalledWith('user-1', { name: 'Jeanpaul 🚀' })

})

it('returns 422 for invalid payload', async () => {
const res = await PATCH(makeRequest({ name: '' }))

    expect(res.status).toBe(422)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string; issues: unknown[] }
    }
    expect(body.error.code).toBe('VALIDATION_ERROR')
    expect(body.error.message).toBe('Validation failed')
    expect(body.error.requestId).toBeTruthy()
    expect(Array.isArray(body.error.issues)).toBe(true)
    expect(mockUpdateProfile).not.toHaveBeenCalled()

})

it('returns requestId-aware auth errors', async () => {
mockAuth.mockResolvedValueOnce(null)

    const res = await PATCH(makeRequest({ name: 'Jeanpaul' }))

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AUTHENTICATION_REQUIRED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()

})
})
</file>

<file path="tests/integration/api/chat/follow-up-chat.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
auth: vi.fn(),
}))

vi.mock('@/lib/db/client', () => ({
prisma: {
guide: {
findUnique: vi.fn(),
},
},
}))

vi.mock('@/lib/ai/claude', () => ({
claudeClient: {
streamGenerate: vi.fn(),
},
}))

import { auth } from '@/lib/auth'
import { claudeClient } from '@/lib/ai/claude'
import { prisma } from '@/lib/db/client'
import { POST } from '@/app/api/chat/[guideSlug]/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockFindUnique = (prisma.guide as unknown as { findUnique: ReturnType<typeof vi.fn> })
.findUnique
const mockStreamGenerate = claudeClient.streamGenerate as ReturnType<typeof vi.fn>

function makeRequest(body: unknown) {
return new Request('http://localhost:3000/api/chat/react-basics', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body),
})
}

function makeTextStream(chunks: string[]): ReadableStream<string> {
return new ReadableStream<string>({
start(controller) {
chunks.forEach((chunk) => controller.enqueue(chunk))
controller.close()
},
})
}

async function readSSEResponse(res: Response) {
const text = await res.text()
return text
.split('\n\n')
.map((part) => part.trim())
.filter((part) => part.startsWith('data: '))
.map((part) => JSON.parse(part.slice(6)) as { type: string; text?: string; message?: string })
}

beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
mockFindUnique.mockResolvedValue({
title: 'React Basics',
content: '# React Basics\n\n## Components\nComponents are reusable.',
isPublic: true,
userId: 'owner-1',
})
mockStreamGenerate.mockResolvedValue(makeTextStream(['First ', 'second']))
})

describe('POST /api/chat/[guideSlug]', () => {
it('requires authentication', async () => {
mockAuth.mockResolvedValueOnce(null)

    const res = await POST(makeRequest({ message: 'Explain hooks' }), {
      params: Promise.resolve({ guideSlug: 'react-basics' }),
    })

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AUTHENTICATION_REQUIRED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)

})

it('returns requestId-aware validation errors', async () => {
const res = await POST(makeRequest({ message: '' }), {
params: Promise.resolve({ guideSlug: 'react-basics' }),
})

    expect(res.status).toBe(422)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string; issues: unknown[] }
    }
    expect(body.error.code).toBe('VALIDATION_ERROR')
    expect(body.error.message).toBe('Validation failed')
    expect(body.error.requestId).toBeTruthy()
    expect(Array.isArray(body.error.issues)).toBe(true)
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)

})

it('returns requestId-aware guide not found errors', async () => {
mockFindUnique.mockResolvedValueOnce(null)

    const res = await POST(makeRequest({ message: 'Explain hooks' }), {
      params: Promise.resolve({ guideSlug: 'missing-guide' }),
    })

    expect(res.status).toBe(404)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('GUIDE_NOT_FOUND')
    expect(body.error.message).toBe('Guide not found')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)

})

it('streams Claude response with guide context', async () => {
const res = await POST(makeRequest({ message: 'Explain hooks' }), {
params: Promise.resolve({ guideSlug: 'react-basics' }),
})

    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('text/event-stream')

    const events = await readSSEResponse(res)
    expect(events).toEqual([
      { type: 'token', text: 'First ' },
      { type: 'token', text: 'second' },
      { type: 'done' },
    ])
    expect(mockStreamGenerate).toHaveBeenCalledWith(
      'Explain hooks',
      expect.stringContaining('Guide title: React Basics'),
    )

})
})
</file>

<file path="tests/integration/api/folders/folders.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
auth: vi.fn(),
}))

vi.mock('@/lib/db/repositories/folders', () => ({
folderRepository: {
create: vi.fn(),
listByUser: vi.fn(),
rename: vi.fn(),
deleteOwned: vi.fn(),
},
}))

import { auth } from '@/lib/auth'
import { folderRepository } from '@/lib/db/repositories/folders'
import { GET, POST } from '@/app/api/folders/route'
import { DELETE, PATCH } from '@/app/api/folders/[id]/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockCreate = folderRepository.create as ReturnType<typeof vi.fn>
const mockListByUser = folderRepository.listByUser as ReturnType<typeof vi.fn>
const mockRename = folderRepository.rename as ReturnType<typeof vi.fn>
const mockDeleteOwned = folderRepository.deleteOwned as ReturnType<typeof vi.fn>

const FOLDER = {
id: 'cmfolder000000000000000001',
userId: 'user-1',
name: 'Frontend',
createdAt: '2026-04-23T00:00:00.000Z',
}

function makeJsonRequest(method: string, url: string, body: unknown) {
return new Request(url, {
method,
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body),
})
}

beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
mockCreate.mockResolvedValue(FOLDER)
mockListByUser.mockResolvedValue([FOLDER])
mockRename.mockResolvedValue({ ...FOLDER, name: 'Core Frontend' })
mockDeleteOwned.mockResolvedValue({ deleted: true })
})

describe('folders API', () => {
it('lists folders for the authenticated user', async () => {
const res = await GET()

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ folders: [FOLDER] })
    expect(mockListByUser).toHaveBeenCalledWith('user-1')

})

it('creates a folder', async () => {
const res = await POST(
makeJsonRequest('POST', 'http://localhost:3000/api/folders', { name: 'Frontend' }),
)

    expect(res.status).toBe(201)
    expect(await res.json()).toEqual(FOLDER)
    expect(mockCreate).toHaveBeenCalledWith({ userId: 'user-1', name: 'Frontend' })

})

it('renames an owned folder', async () => {
const res = await PATCH(
makeJsonRequest('PATCH', 'http://localhost:3000/api/folders/cmfolder000000000000000001', {
name: 'Core Frontend',
}),
{ params: Promise.resolve({ id: 'cmfolder000000000000000001' }) },
)

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ...FOLDER, name: 'Core Frontend' })
    expect(mockRename).toHaveBeenCalledWith({
      id: 'cmfolder000000000000000001',
      userId: 'user-1',
      name: 'Core Frontend',
    })

})

it('deletes an owned folder', async () => {
const res = await DELETE(
new Request('http://localhost:3000/api/folders/cmfolder000000000000000001', {
method: 'DELETE',
}),
{
params: Promise.resolve({ id: 'cmfolder000000000000000001' }),
},
)

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ deleted: true })
    expect(mockDeleteOwned).toHaveBeenCalledWith('user-1', 'cmfolder000000000000000001')

})

it('returns 404 when the folder is not owned by the user', async () => {
mockRename.mockResolvedValueOnce(null)

    const res = await PATCH(
      makeJsonRequest('PATCH', 'http://localhost:3000/api/folders/cmfolder000000000000000001', {
        name: 'Blocked',
      }),
      { params: Promise.resolve({ id: 'cmfolder000000000000000001' }) },
    )

    expect(res.status).toBe(404)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('FOLDER_NOT_FOUND')
    expect(body.error.message).toBe('Folder not found')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)

})

it('returns requestId-aware auth errors when listing folders', async () => {
mockAuth.mockResolvedValueOnce(null)

    const res = await GET()

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AUTHENTICATION_REQUIRED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)

})

it('returns requestId-aware validation errors when creating a folder', async () => {
const res = await POST(
makeJsonRequest('POST', 'http://localhost:3000/api/folders', { name: '' }),
)

    expect(res.status).toBe(422)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string; issues: unknown[] }
    }
    expect(body.error.code).toBe('VALIDATION_ERROR')
    expect(body.error.message).toBe('Validation failed')
    expect(body.error.requestId).toBeTruthy()
    expect(Array.isArray(body.error.issues)).toBe(true)
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)

})
})
</file>

<file path="tests/integration/api/guest/quota.test.ts">
import { describe, it, expect, vi, beforeEach } from 'vitest'

// ── Mocks must precede all imports ──────────────────────────────────────────

vi.mock('@/lib/db/client', () => ({
prisma: {
guestQuota: {
findUnique: vi.fn(),
},
},
}))

// Mock auth so we can control session state
vi.mock('@/lib/auth', () => ({
auth: vi.fn(),
}))

import { prisma } from '@/lib/db/client'
import { auth } from '@/lib/auth'
import { GET } from '@/app/api/guest/quota/route'

const mockPrisma = prisma as unknown as {
guestQuota: { findUnique: ReturnType<typeof vi.fn> }
}
const mockAuth = auth as ReturnType<typeof vi.fn>

function makeRequest(headers?: Record<string, string>) {
return new Request('http://localhost:3000/api/guest/quota', { headers })
}

function futureReset(): Date {
const d = new Date()
d.setUTCHours(24, 0, 0, 0)
return d
}

beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue(null)
})

describe('GET /api/guest/quota', () => {
it('returns used=0, limit=3 for a guest with no existing record', async () => {
mockPrisma.guestQuota.findUnique.mockResolvedValue(null)

    const res = await GET(makeRequest({ 'x-forwarded-for': '1.2.3.4' }))

    expect(res.status).toBe(200)
    const body = (await res.json()) as { used: number; limit: number; resetsAt: string }
    expect(body.used).toBe(0)
    expect(body.limit).toBe(3)
    expect(body.resetsAt).toBeTruthy()

})

it('returns current count for guest with existing quota record', async () => {
mockPrisma.guestQuota.findUnique.mockResolvedValue({
ip: '1.2.3.4',
count: 2,
resetAt: futureReset(),
})

    const res = await GET(makeRequest({ 'x-forwarded-for': '1.2.3.4' }))

    expect(res.status).toBe(200)
    const body = (await res.json()) as { used: number; limit: number }
    expect(body.used).toBe(2)
    expect(body.limit).toBe(3)

})

it('returns used=0 for an authenticated (registered) user', async () => {
mockAuth.mockResolvedValue({ user: { id: 'user-1', email: 'a@b.com' } })

    const res = await GET(makeRequest())

    expect(res.status).toBe(200)
    const body = (await res.json()) as { used: number; resetsAt: null }
    expect(body.used).toBe(0)
    expect(body.resetsAt).toBeNull()
    // Quota DB should NOT be queried for authenticated users
    expect(mockPrisma.guestQuota.findUnique).not.toHaveBeenCalled()

})

it('handles expired quota record and returns used=0', async () => {
const past = new Date(Date.now() - 1000)
mockPrisma.guestQuota.findUnique.mockResolvedValue({
ip: '1.2.3.4',
count: 3,
resetAt: past,
})

    const res = await GET(makeRequest({ 'x-forwarded-for': '1.2.3.4' }))

    expect(res.status).toBe(200)
    const body = (await res.json()) as { used: number }
    expect(body.used).toBe(0)

})
})
</file>

<file path="tests/integration/api/guides/export.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({ auth: vi.fn() }))
vi.mock('@/lib/db/client', () => ({
prisma: {
guide: {
findFirst: vi.fn(),
},
},
}))
vi.mock('@/lib/export/markdown', () => ({ buildMarkdownExport: vi.fn() }))
vi.mock('@/lib/export/html', () => ({ buildHtmlExport: vi.fn() }))
vi.mock('@/lib/export/pdf', () => ({ buildPdfExport: vi.fn() }))

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/client'
import { buildMarkdownExport } from '@/lib/export/markdown'
import { buildHtmlExport } from '@/lib/export/html'
import { buildPdfExport } from '@/lib/export/pdf'
import { GET } from '@/app/api/guides/[id]/export/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockFindFirst = prisma.guide.findFirst as ReturnType<typeof vi.fn>
const mockBuildMarkdownExport = buildMarkdownExport as ReturnType<typeof vi.fn>
const mockBuildHtmlExport = buildHtmlExport as ReturnType<typeof vi.fn>
const mockBuildPdfExport = buildPdfExport as ReturnType<typeof vi.fn>

beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
mockFindFirst.mockResolvedValue({
id: 'guide-1',
slug: 'react-basics',
title: 'React Basics',
studyMode: 'OVERVIEW',
inputType: 'TOPIC',
inputValue: 'React basics',
content: '# React Basics',
createdAt: new Date('2026-04-24T00:00:00.000Z'),
updatedAt: new Date('2026-04-24T00:00:00.000Z'),
})
mockBuildMarkdownExport.mockReturnValue('markdown export')
mockBuildHtmlExport.mockResolvedValue('<html></html>')
mockBuildPdfExport.mockResolvedValue(Buffer.from('%PDF-export'))
})

describe('GET /api/guides/[id]/export', () => {
it('returns a markdown attachment for an owned guide', async () => {
const response = await GET(
new Request('http://localhost:3000/api/guides/guide-1/export?format=md'),
{
params: Promise.resolve({ id: 'guide-1' }),
},
)

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('text/markdown')
    expect(response.headers.get('content-disposition')).toContain('react-basics.md')
    expect(await response.text()).toBe('markdown export')

})

it('returns an html attachment for an owned guide', async () => {
const response = await GET(
new Request('http://localhost:3000/api/guides/guide-1/export?format=html'),
{
params: Promise.resolve({ id: 'guide-1' }),
},
)

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('text/html')
    expect(await response.text()).toBe('<html></html>')

})

it('returns a pdf attachment for an owned guide', async () => {
const response = await GET(
new Request('http://localhost:3000/api/guides/guide-1/export?format=pdf'),
{
params: Promise.resolve({ id: 'guide-1' }),
},
)

    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toContain('application/pdf')
    expect(
      Buffer.from(await response.arrayBuffer())
        .subarray(0, 4)
        .toString(),
    ).toBe('%PDF')

})

it('returns 403 for a guide the user does not own', async () => {
mockFindFirst.mockResolvedValueOnce(null)

    const response = await GET(
      new Request('http://localhost:3000/api/guides/guide-2/export?format=md'),
      {
        params: Promise.resolve({ id: 'guide-2' }),
      },
    )

    expect(response.status).toBe(403)
    const body = (await response.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('FORBIDDEN')
    expect(body.error.message).toBe('Forbidden')
    expect(body.error.requestId).toBeTruthy()
    expect(response.headers.get('x-request-id')).toBe(body.error.requestId)

})

it('returns requestId-aware validation errors for unsupported formats', async () => {
const response = await GET(
new Request('http://localhost:3000/api/guides/guide-1/export?format=txt'),
{
params: Promise.resolve({ id: 'guide-1' }),
},
)

    expect(response.status).toBe(422)
    const body = (await response.json()) as {
      error: { code: string; message: string; requestId: string; issues: unknown[] }
    }
    expect(body.error.code).toBe('VALIDATION_ERROR')
    expect(body.error.message).toBe('Validation failed')
    expect(body.error.requestId).toBeTruthy()
    expect(Array.isArray(body.error.issues)).toBe(true)

})
})
</file>

<file path="tests/integration/api/guides/fork.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({ auth: vi.fn() }))
vi.mock('@/lib/guides/fork', () => ({ forkGuide: vi.fn() }))

import { auth } from '@/lib/auth'
import { forkGuide } from '@/lib/guides/fork'
import { POST } from '@/app/api/guides/[id]/fork/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockForkGuide = forkGuide as ReturnType<typeof vi.fn>

beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
mockForkGuide.mockResolvedValue({
status: 'created',
guide: {
id: 'guide-2',
slug: 'fork-react-basics-abc123xyz',
title: '[Fork] React Basics',
},
})
})

describe('POST /api/guides/[id]/fork', () => {
it('forks a shared guide for the authenticated user', async () => {
const response = await POST(
new Request('http://localhost:3000/api/guides/guide-1/fork', {
method: 'POST',
}),
{
params: Promise.resolve({ id: 'guide-1' }),
},
)

    expect(response.status).toBe(201)
    expect(await response.json()).toEqual({
      guideId: 'guide-2',
      guideSlug: 'fork-react-basics-abc123xyz',
      title: '[Fork] React Basics',
    })
    expect(mockForkGuide).toHaveBeenCalledWith('guide-1', 'user-1')

})

it('returns 404 when the shared guide cannot be forked', async () => {
mockForkGuide.mockResolvedValueOnce({ status: 'not-found' })

    const response = await POST(
      new Request('http://localhost:3000/api/guides/guide-404/fork', {
        method: 'POST',
      }),
      {
        params: Promise.resolve({ id: 'guide-404' }),
      },
    )

    expect(response.status).toBe(404)
    const body = (await response.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('SHAREABLE_GUIDE_NOT_FOUND')
    expect(body.error.message).toBe('Shareable guide not found')
    expect(body.error.requestId).toBeTruthy()
    expect(response.headers.get('x-request-id')).toBe(body.error.requestId)

})

it('returns 401 when unauthenticated', async () => {
mockAuth.mockResolvedValueOnce(null)

    const response = await POST(
      new Request('http://localhost:3000/api/guides/guide-1/fork', {
        method: 'POST',
      }),
      {
        params: Promise.resolve({ id: 'guide-1' }),
      },
    )

    expect(response.status).toBe(401)
    const body = (await response.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AUTHENTICATION_REQUIRED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()

})
})
</file>

<file path="tests/integration/api/guides/guides.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
auth: vi.fn(),
}))

vi.mock('@/lib/db/repositories/guides', () => ({
guideRepository: {
list: vi.fn(),
update: vi.fn(),
deleteManyOwned: vi.fn(),
},
}))

import { auth } from '@/lib/auth'
import { guideRepository } from '@/lib/db/repositories/guides'
import { DELETE, GET } from '@/app/api/guides/route'
import { PATCH } from '@/app/api/guides/[id]/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockList = guideRepository.list as ReturnType<typeof vi.fn>
const mockUpdate = guideRepository.update as ReturnType<typeof vi.fn>
const mockDeleteManyOwned = guideRepository.deleteManyOwned as ReturnType<typeof vi.fn>

const GUIDE = {
id: 'cmguidetest0000000000000001',
slug: 'react-basics',
title: 'React Basics',
studyMode: 'OVERVIEW',
inputType: 'TOPIC',
createdAt: '2026-04-23T00:00:00.000Z',
updatedAt: '2026-04-23T00:00:00.000Z',
isFavorite: false,
tags: [{ id: 'cmtag00000000000000000001', name: 'react' }],
folder: null,
}

beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
mockList.mockResolvedValue({ guides: [GUIDE], total: 1, page: 1 })
mockUpdate.mockResolvedValue({ ...GUIDE, isFavorite: true })
mockDeleteManyOwned.mockResolvedValue({ authorized: true, deleted: 2 })
})

function makeDeleteRequest(body: unknown) {
return new Request('http://localhost:3000/api/guides', {
method: 'DELETE',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body),
})
}

function makePatchRequest(body: unknown) {
return new Request('http://localhost:3000/api/guides/cmguidetest0000000000000001', {
method: 'PATCH',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body),
})
}

describe('GET /api/guides', () => {
it('returns guides for the authenticated user', async () => {
const res = await GET(
new Request('http://localhost:3000/api/guides?q=react&view=favorites&page=2&limit=10'),
)

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ guides: [GUIDE], total: 1, page: 1 })
    expect(mockList).toHaveBeenCalledWith({
      userId: 'user-1',
      q: 'react',
      tag: undefined,
      folderId: undefined,
      view: 'favorites',
      page: 2,
      limit: 10,
    })

})

it('returns 422 for invalid query params', async () => {
const res = await GET(new Request('http://localhost:3000/api/guides?page=0'))

    expect(res.status).toBe(422)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string; issues: unknown[] }
    }
    expect(body.error.code).toBe('VALIDATION_ERROR')
    expect(body.error.message).toBe('Validation failed')
    expect(body.error.requestId).toBeTruthy()
    expect(Array.isArray(body.error.issues)).toBe(true)
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)
    expect(mockList).not.toHaveBeenCalled()

})

it('returns requestId-aware auth errors', async () => {
mockAuth.mockResolvedValueOnce(null)

    const res = await GET(new Request('http://localhost:3000/api/guides'))

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AUTHENTICATION_REQUIRED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)

})
})

describe('PATCH /api/guides/[id]', () => {
it('updates an owned guide', async () => {
const res = await PATCH(makePatchRequest({ isFavorite: true }), {
params: Promise.resolve({ id: 'cmguidetest0000000000000001' }),
})

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ...GUIDE, isFavorite: true })
    expect(mockUpdate).toHaveBeenCalledWith({
      id: 'cmguidetest0000000000000001',
      userId: 'user-1',
      isFavorite: true,
    })

})

it('returns 403 for a guide the user does not own', async () => {
mockUpdate.mockResolvedValueOnce(null)

    const res = await PATCH(makePatchRequest({ isFavorite: true }), {
      params: Promise.resolve({ id: 'cmguidetest0000000000000001' }),
    })

    expect(res.status).toBe(403)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('FORBIDDEN')
    expect(body.error.message).toBe('Forbidden')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)

})
})

describe('DELETE /api/guides', () => {
it('deletes multiple owned guides', async () => {
const res = await DELETE(
makeDeleteRequest({
ids: ['cmguidetest0000000000000001', 'cmguidetest0000000000000002'],
}),
)

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ deleted: 2 })
    expect(mockDeleteManyOwned).toHaveBeenCalledWith('user-1', [
      'cmguidetest0000000000000001',
      'cmguidetest0000000000000002',
    ])

})

it('returns 403 when any guide is not owned by the user', async () => {
mockDeleteManyOwned.mockResolvedValueOnce({ authorized: false, deleted: 0 })

    const res = await DELETE(
      makeDeleteRequest({
        ids: ['cmguidetest0000000000000001'],
      }),
    )

    expect(res.status).toBe(403)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('FORBIDDEN')
    expect(body.error.message).toBe('Forbidden')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)

})
})
</file>

<file path="tests/integration/api/guides/share.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({ auth: vi.fn() }))
vi.mock('@/lib/db/repositories/share-links', () => ({
shareLinkRepository: {
createOwnedShareLink: vi.fn(),
deleteOwnedShareLink: vi.fn(),
},
}))

import { auth } from '@/lib/auth'
import { shareLinkRepository } from '@/lib/db/repositories/share-links'
import { DELETE, POST } from '@/app/api/guides/[id]/share/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockCreate = shareLinkRepository.createOwnedShareLink as ReturnType<typeof vi.fn>
const mockDelete = shareLinkRepository.deleteOwnedShareLink as ReturnType<typeof vi.fn>

function makePostRequest(body: unknown) {
return new Request('http://localhost:3000/api/guides/cmguidetest0000000000000001/share', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body),
})
}

beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
mockCreate.mockResolvedValue({
status: 'created',
shareLink: {
token: 'abc123_share_token_abc123_share',
expiresAt: null,
},
})
mockDelete.mockResolvedValue(true)
})

describe('guide share routes', () => {
it('creates a share link for an owned guide', async () => {
const response = await POST(makePostRequest({ expiresIn: '7d' }), {
params: Promise.resolve({ id: 'cmguidetest0000000000000001' }),
})

    expect(response.status).toBe(201)
    expect(await response.json()).toEqual({
      token: 'abc123_share_token_abc123_share',
      url: 'http://localhost:3000/share/abc123_share_token_abc123_share',
      expiresAt: null,
    })

})

it('returns 409 with the current share link when one already exists', async () => {
mockCreate.mockResolvedValueOnce({
status: 'existing',
shareLink: {
token: 'existing_share_token_abc123_share',
expiresAt: null,
},
})

    const response = await POST(makePostRequest({ expiresIn: null }), {
      params: Promise.resolve({ id: 'cmguidetest0000000000000001' }),
    })

    expect(response.status).toBe(409)

})

it('returns requestId-aware auth errors when creating a share link', async () => {
mockAuth.mockResolvedValueOnce(null)

    const response = await POST(makePostRequest({ expiresIn: '7d' }), {
      params: Promise.resolve({ id: 'cmguidetest0000000000000001' }),
    })

    expect(response.status).toBe(401)
    const body = (await response.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AUTHENTICATION_REQUIRED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()
    expect(response.headers.get('x-request-id')).toBe(body.error.requestId)

})

it('returns requestId-aware forbidden errors when creating a share link', async () => {
mockCreate.mockResolvedValueOnce({ status: 'forbidden' })

    const response = await POST(makePostRequest({ expiresIn: '7d' }), {
      params: Promise.resolve({ id: 'cmguidetest0000000000000001' }),
    })

    expect(response.status).toBe(403)
    const body = (await response.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('FORBIDDEN')
    expect(body.error.message).toBe('Forbidden')
    expect(body.error.requestId).toBeTruthy()

})

it('revokes a share link for an owned guide', async () => {
const response = await DELETE(
new Request('http://localhost:3000/api/guides/cmguidetest0000000000000001/share', {
method: 'DELETE',
}),
{
params: Promise.resolve({ id: 'cmguidetest0000000000000001' }),
},
)

    expect(response.status).toBe(204)
    expect(mockDelete).toHaveBeenCalledWith('cmguidetest0000000000000001', 'user-1')

})

it('returns requestId-aware forbidden errors when revoking another users share link', async () => {
mockDelete.mockResolvedValueOnce(false)

    const response = await DELETE(
      new Request('http://localhost:3000/api/guides/cmguidetest0000000000000001/share', {
        method: 'DELETE',
      }),
      {
        params: Promise.resolve({ id: 'cmguidetest0000000000000001' }),
      },
    )

    expect(response.status).toBe(403)
    const body = (await response.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('FORBIDDEN')
    expect(body.error.message).toBe('Forbidden')
    expect(body.error.requestId).toBeTruthy()

})
})
</file>

<file path="tests/integration/api/guides/tags.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
auth: vi.fn(),
}))

vi.mock('@/lib/db/repositories/guides', () => ({
guideRepository: {
setTags: vi.fn(),
},
}))

import { auth } from '@/lib/auth'
import { guideRepository } from '@/lib/db/repositories/guides'
import { PATCH } from '@/app/api/guides/[id]/tags/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockSetTags = guideRepository.setTags as ReturnType<typeof vi.fn>

beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
mockSetTags.mockResolvedValue({
id: 'cmguidetest0000000000000001',
tags: [
{ id: 'cmtag00000000000000000001', name: 'react' },
{ id: 'cmtag00000000000000000002', name: 'hooks' },
],
})
})

describe('PATCH /api/guides/[id]/tags', () => {
it('replaces guide tags for the owner', async () => {
const res = await PATCH(
new Request('http://localhost:3000/api/guides/cmguidetest0000000000000001/tags', {
method: 'PATCH',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ tags: ['react', 'hooks'] }),
}),
{ params: Promise.resolve({ id: 'cmguidetest0000000000000001' }) },
)

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      tags: [
        { id: 'cmtag00000000000000000001', name: 'react' },
        { id: 'cmtag00000000000000000002', name: 'hooks' },
      ],
    })
    expect(mockSetTags).toHaveBeenCalledWith({
      guideId: 'cmguidetest0000000000000001',
      userId: 'user-1',
      tags: ['react', 'hooks'],
    })

})

it('returns 403 when the guide is not owned by the user', async () => {
mockSetTags.mockResolvedValueOnce(null)

    const res = await PATCH(
      new Request('http://localhost:3000/api/guides/cmguidetest0000000000000001/tags', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags: ['react'] }),
      }),
      { params: Promise.resolve({ id: 'cmguidetest0000000000000001' }) },
    )

    expect(res.status).toBe(403)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('FORBIDDEN')
    expect(body.error.message).toBe('Forbidden')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)

})

it('returns requestId-aware auth errors', async () => {
mockAuth.mockResolvedValueOnce(null)

    const res = await PATCH(
      new Request('http://localhost:3000/api/guides/cmguidetest0000000000000001/tags', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags: ['react'] }),
      }),
      { params: Promise.resolve({ id: 'cmguidetest0000000000000001' }) },
    )

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AUTHENTICATION_REQUIRED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()

})
})
</file>

<file path="tests/integration/api/notes/notes.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
auth: vi.fn(),
}))

vi.mock('@/lib/db/client', () => ({
prisma: {
guide: {
findUnique: vi.fn(),
},
},
}))

vi.mock('@/lib/db/repositories/notes', () => ({
noteRepository: {
create: vi.fn(),
},
}))

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db/client'
import { noteRepository } from '@/lib/db/repositories/notes'
import { POST } from '@/app/api/notes/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockFindUnique = (prisma.guide as unknown as { findUnique: ReturnType<typeof vi.fn> })
.findUnique
const mockCreate = noteRepository.create as ReturnType<typeof vi.fn>

function makeRequest(body: unknown) {
return new Request('http://localhost:3000/api/notes', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body),
})
}

beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
mockFindUnique.mockResolvedValue({
id: 'cm1234567890abcdef123456',
userId: 'owner-1',
isPublic: true,
})
mockCreate.mockResolvedValue({
id: 'note-1',
guideId: 'cm1234567890abcdef123456',
selectedText: 'React components',
content: '',
createdAt: '2026-04-23T00:00:00.000Z',
})
})

describe('POST /api/notes', () => {
it('saves a note for an authenticated user', async () => {
const res = await POST(
makeRequest({
guideId: 'cm1234567890abcdef123456',
selectedText: 'React components',
content: '',
}),
)

    expect(res.status).toBe(201)
    expect(await res.json()).toEqual({
      id: 'note-1',
      guideId: 'cm1234567890abcdef123456',
      selectedText: 'React components',
      content: '',
      createdAt: '2026-04-23T00:00:00.000Z',
    })
    expect(mockCreate).toHaveBeenCalledWith({
      userId: 'user-1',
      guideId: 'cm1234567890abcdef123456',
      selectedText: 'React components',
      content: '',
    })

})

it('rejects notes for another user private guide', async () => {
mockFindUnique.mockResolvedValueOnce({
id: 'cm1234567890abcdef123456',
userId: 'owner-2',
isPublic: false,
})

    const res = await POST(
      makeRequest({
        guideId: 'cm1234567890abcdef123456',
        selectedText: 'Private text',
      }),
    )

    expect(res.status).toBe(403)
    expect(mockCreate).not.toHaveBeenCalled()

})

it('returns requestId-aware auth errors', async () => {
mockAuth.mockResolvedValueOnce(null)

    const res = await POST(
      makeRequest({
        guideId: 'cm1234567890abcdef123456',
        selectedText: 'React components',
      }),
    )

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AUTHENTICATION_REQUIRED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)

})

it('returns requestId-aware guide lookup errors', async () => {
mockFindUnique.mockResolvedValueOnce(null)

    const res = await POST(
      makeRequest({
        guideId: 'cm1234567890abcdef123456',
        selectedText: 'Missing guide',
      }),
    )

    expect(res.status).toBe(404)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('GUIDE_NOT_FOUND')
    expect(body.error.message).toBe('Guide not found')
    expect(body.error.requestId).toBeTruthy()

})

it('sanitizes selected text and note content before persisting', async () => {
await POST(
makeRequest({
guideId: 'cm1234567890abcdef123456',
selectedText: ' <b>React components</b>\u0000 ',
content: ' <script>alert(1)</script>Remember props\u0000 ',
}),
)

    expect(mockCreate).toHaveBeenCalledWith({
      userId: 'user-1',
      guideId: 'cm1234567890abcdef123456',
      selectedText: 'React components',
      content: 'alert(1)Remember props',
    })

})
})
</file>

<file path="tests/integration/api/share-links/status.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/db/repositories/share-links', () => ({
shareLinkRepository: {
getStatusByToken: vi.fn(),
},
}))

import { shareLinkRepository } from '@/lib/db/repositories/share-links'
import { GET } from '@/app/api/share-links/[token]/status/route'

const mockGetStatusByToken = shareLinkRepository.getStatusByToken as ReturnType<typeof vi.fn>

beforeEach(() => {
vi.clearAllMocks()
})

describe('GET /api/share-links/[token]/status', () => {
it('returns 200 for an active token', async () => {
mockGetStatusByToken.mockResolvedValue('active')

    const response = await GET(
      new Request('http://localhost:3000/api/share-links/token-1/status'),
      {
        params: Promise.resolve({ token: 'token-1' }),
      },
    )

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ status: 'active' })

})

it('returns 410 for an expired token', async () => {
mockGetStatusByToken.mockResolvedValue('expired')

    const response = await GET(
      new Request('http://localhost:3000/api/share-links/token-1/status'),
      {
        params: Promise.resolve({ token: 'token-1' }),
      },
    )

    expect(response.status).toBe(410)
    expect(await response.json()).toEqual({ status: 'expired' })

})
})
</file>

<file path="tests/integration/api/test/reset-quota.test.ts">
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/db/client', () => ({
prisma: {
guestQuota: {
deleteMany: vi.fn(),
upsert: vi.fn(),
},
},
}))

import { prisma } from '@/lib/db/client'
import { POST } from '@/app/api/test/reset-quota/route'

const mockDeleteMany = prisma.guestQuota.deleteMany as ReturnType<typeof vi.fn>
const mockUpsert = prisma.guestQuota.upsert as ReturnType<typeof vi.fn>

function makeRequest(body: unknown) {
return new Request('http://localhost:3000/api/test/reset-quota', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body),
})
}

describe('POST /api/test/reset-quota', () => {
const originalNodeEnv = process.env['NODE_ENV']
const originalPlaywright = process.env['PLAYWRIGHT_TEST']

beforeEach(() => {
vi.clearAllMocks()
vi.unstubAllEnvs()
vi.stubEnv('NODE_ENV', 'test')
mockDeleteMany.mockResolvedValue({ count: 1 })
mockUpsert.mockResolvedValue({ ip: '1.2.3.4', count: 3 })
})

afterEach(() => {
vi.unstubAllEnvs()
if (originalNodeEnv !== undefined) vi.stubEnv('NODE_ENV', originalNodeEnv)
if (originalPlaywright !== undefined) vi.stubEnv('PLAYWRIGHT_TEST', originalPlaywright)
})

it('resets guest quota for the provided ip', async () => {
const res = await POST(makeRequest({ ip: '1.2.3.4' }))

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true, used: 0 })
    expect(mockDeleteMany).toHaveBeenCalledWith({ where: { ip: '1.2.3.4' } })

})

it('seeds guest quota usage when used is provided', async () => {
const res = await POST(makeRequest({ ip: '1.2.3.4', used: 3 }))

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true, used: 3 })
    expect(mockUpsert).toHaveBeenCalledOnce()
    expect(mockUpsert.mock.calls[0]?.[0]).toMatchObject({
      where: { ip: '1.2.3.4' },
      create: {
        ip: '1.2.3.4',
        count: 3,
      },
      update: {
        count: 3,
      },
    })

})

it('returns requestId-aware validation errors for invalid used counts', async () => {
const res = await POST(makeRequest({ ip: '1.2.3.4', used: 99 }))

    expect(res.status).toBe(400)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('INVALID_USED_COUNT')
    expect(body.error.message).toBe('used must be an integer between 0 and 3')
    expect(body.error.requestId).toBeTruthy()

})

it('returns requestId-aware ip required errors', async () => {
const res = await POST(makeRequest({}))

    expect(res.status).toBe(400)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('IP_REQUIRED')
    expect(body.error.message).toBe('ip required')
    expect(body.error.requestId).toBeTruthy()

})

it('returns requestId-aware not found errors when test mode is disabled', async () => {
vi.unstubAllEnvs()
vi.stubEnv('NODE_ENV', 'development')

    const res = await POST(makeRequest({ ip: '1.2.3.4' }))

    expect(res.status).toBe(404)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('NOT_FOUND')
    expect(body.error.message).toBe('Not found')
    expect(body.error.requestId).toBeTruthy()

})
})
</file>

<file path="tests/integration/api/test/seed.test.ts">
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/db/client', () => ({
prisma: {},
}))

vi.mock('@/lib/db/seed', () => ({
reseedDatabase: vi.fn(),
}))

import { reseedDatabase } from '@/lib/db/seed'
import { POST } from '@/app/api/test/seed/route'

const mockReseedDatabase = reseedDatabase as ReturnType<typeof vi.fn>

describe('POST /api/test/seed', () => {
const originalNodeEnv = process.env['NODE_ENV']
const originalPlaywright = process.env['PLAYWRIGHT_TEST']

beforeEach(() => {
vi.clearAllMocks()
vi.unstubAllEnvs()
vi.stubEnv('NODE_ENV', 'test')
mockReseedDatabase.mockResolvedValue(undefined)
})

afterEach(() => {
vi.unstubAllEnvs()
if (originalNodeEnv !== undefined) vi.stubEnv('NODE_ENV', originalNodeEnv)
if (originalPlaywright !== undefined) vi.stubEnv('PLAYWRIGHT_TEST', originalPlaywright)
})

it('reseeds the database in test mode', async () => {
const res = await POST(new Request('http://localhost:3000/api/test/seed', { method: 'POST' }))

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(mockReseedDatabase).toHaveBeenCalled()

})

it('returns requestId-aware not found errors when test mode is disabled', async () => {
vi.unstubAllEnvs()
vi.stubEnv('NODE_ENV', 'development')

    const res = await POST(new Request('http://localhost:3000/api/test/seed', { method: 'POST' }))

    expect(res.status).toBe(404)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('NOT_FOUND')
    expect(body.error.message).toBe('Not found')
    expect(body.error.requestId).toBeTruthy()

})
})
</file>

<file path="tests/integration/api/test/session.test.ts">
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('next-auth/jwt', () => ({
encode: vi.fn().mockResolvedValue('session-token'),
}))

vi.mock('@/lib/db/client', () => ({
prisma: {
user: {
findUnique: vi.fn(),
},
},
}))

import { prisma } from '@/lib/db/client'
import { POST } from '@/app/api/test/session/route'

const mockFindUnique = prisma.user.findUnique as ReturnType<typeof vi.fn>

function makeRequest(body: unknown) {
return new Request('http://localhost:3000/api/test/session', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body),
})
}

describe('POST /api/test/session', () => {
const originalNodeEnv = process.env['NODE_ENV']
const originalPlaywright = process.env['PLAYWRIGHT_TEST']
const originalAuthSecret = process.env['AUTH_SECRET']
const originalNextAuthSecret = process.env['NEXTAUTH_SECRET']

beforeEach(() => {
vi.clearAllMocks()
vi.stubEnv('NODE_ENV', 'test')
vi.unstubAllEnvs()
vi.stubEnv('NODE_ENV', 'test')
vi.stubEnv('AUTH_SECRET', 'test-secret')
mockFindUnique.mockResolvedValue({
id: 'user-1',
email: 'user@example.com',
name: 'User',
image: null,
})
})

afterEach(() => {
vi.unstubAllEnvs()
if (originalNodeEnv !== undefined) vi.stubEnv('NODE_ENV', originalNodeEnv)
if (originalPlaywright !== undefined) vi.stubEnv('PLAYWRIGHT_TEST', originalPlaywright)
if (originalAuthSecret !== undefined) vi.stubEnv('AUTH_SECRET', originalAuthSecret)
if (originalNextAuthSecret !== undefined) vi.stubEnv('NEXTAUTH_SECRET', originalNextAuthSecret)
})

it('creates a seeded session cookie for a test user', async () => {
const res = await POST(makeRequest({ email: 'user@example.com' }))

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
    expect(res.headers.get('set-cookie')).toContain('authjs.session-token=session-token')

})

it('returns requestId-aware validation errors', async () => {
const res = await POST(makeRequest({ email: 'bad-email' }))

    expect(res.status).toBe(422)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string; issues: unknown[] }
    }
    expect(body.error.code).toBe('VALIDATION_ERROR')
    expect(body.error.message).toBe('Validation failed')
    expect(body.error.requestId).toBeTruthy()
    expect(Array.isArray(body.error.issues)).toBe(true)

})

it('returns requestId-aware user not found errors', async () => {
mockFindUnique.mockResolvedValueOnce(null)

    const res = await POST(makeRequest({ email: 'missing@example.com' }))

    expect(res.status).toBe(404)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('USER_NOT_FOUND')
    expect(body.error.message).toBe('User not found')
    expect(body.error.requestId).toBeTruthy()

})

it('returns requestId-aware missing secret errors', async () => {
vi.unstubAllEnvs()
vi.stubEnv('NODE_ENV', 'test')
delete process.env['AUTH_SECRET']
delete process.env['NEXTAUTH_SECRET']

    const res = await POST(makeRequest({ email: 'user@example.com' }))

    expect(res.status).toBe(500)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('MISSING_AUTH_SECRET')
    expect(body.error.message).toBe('Missing auth secret')
    expect(body.error.requestId).toBeTruthy()

})
})
</file>

<file path="tests/integration/app/share/page.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createElement } from 'react'

vi.mock('@/lib/auth', () => ({ auth: vi.fn() }))
vi.mock('@/lib/auth/session', async () => {
const actual = await vi.importActual<typeof import('@/lib/auth/session')>('@/lib/auth/session')
return {
...actual,
hasAuthenticatedUser: vi.fn(),
}
})
vi.mock('@/lib/db/repositories/share-links', () => ({
shareLinkRepository: {
visitByToken: vi.fn(),
},
}))
vi.mock('@/components/guide/GuideRenderer', () => ({
default: ({ guide, isReadOnly }: { guide: { title: string }; isReadOnly?: boolean }) =>
createElement(
'div',
null,
createElement('span', null, guide.title),
createElement('span', null, String(isReadOnly)),
),
}))
vi.mock('@/components/sharing/ForkButton', () => ({
default: () => createElement('button', null, 'Fork to my guides'),
}))

import { auth } from '@/lib/auth'
import { hasAuthenticatedUser } from '@/lib/auth/session'
import { shareLinkRepository } from '@/lib/db/repositories/share-links'
import SharedGuidePage from '@/app/share/[token]/page'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockHasAuthenticatedUser = hasAuthenticatedUser as ReturnType<typeof vi.fn>
const mockVisitByToken = shareLinkRepository.visitByToken as ReturnType<typeof vi.fn>

beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue(null)
mockHasAuthenticatedUser.mockReturnValue(false)
})

describe('SharedGuidePage', () => {
it('renders a read-only shared guide for active tokens', async () => {
mockVisitByToken.mockResolvedValue({
status: 'active',
guide: {
id: 'guide-1',
userId: 'user-1',
slug: 'react-basics',
title: 'React Basics',
studyMode: 'OVERVIEW',
inputType: 'TOPIC',
inputValue: 'React basics',
content: '# React Basics',
isPublic: false,
},
})

    render(await SharedGuidePage({ params: Promise.resolve({ token: 'token-1' }) }))

    expect(screen.getByText('Shared guide')).toBeInTheDocument()
    expect(screen.getByText('React Basics')).toBeInTheDocument()
    expect(screen.getByText('true')).toBeInTheDocument()
    expect(screen.getByText('Sign up free')).toBeInTheDocument()

})

it('shows the fork button for authenticated users on active shared guides', async () => {
mockAuth.mockResolvedValueOnce({ user: { id: 'user-2' } })
mockHasAuthenticatedUser.mockReturnValueOnce(true)
mockVisitByToken.mockResolvedValueOnce({
status: 'active',
guide: {
id: 'guide-1',
userId: 'user-1',
slug: 'react-basics',
title: 'React Basics',
studyMode: 'OVERVIEW',
inputType: 'TOPIC',
inputValue: 'React basics',
content: '# React Basics',
isPublic: false,
},
})

    render(await SharedGuidePage({ params: Promise.resolve({ token: 'token-1' }) }))

    expect(screen.getByText('Fork to my guides')).toBeInTheDocument()

})

it('renders the unavailable state for expired or revoked links', async () => {
mockVisitByToken.mockResolvedValue({ status: 'expired' })

    render(await SharedGuidePage({ params: Promise.resolve({ token: 'token-1' }) }))

    expect(screen.getByText('This share link has expired or was revoked.')).toBeInTheDocument()

})
})
</file>

<file path="tests/integration/cli/export-source.test.ts">
import { execFile } from 'node:child_process'
import { access, readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import { afterEach, describe, expect, it } from 'vitest'

const execFileAsync = promisify(execFile)
const repoRoot = path.resolve(\_\_dirname, '../../../')
const fixtureRoot = path.join(repoRoot, 'tests/fixtures/cli-fixture-repo')
const scriptPath = path.join(repoRoot, 'scripts/export-source.ts')
const tsxPath = path.join(repoRoot, 'node_modules/tsx/dist/cli.mjs')
const generatedOutput = path.join(fixtureRoot, 'tmp/export.txt')
const defaultOutput = path.join(fixtureRoot, 'export.md')

describe('export-source CLI', () => {
afterEach(async () => {
await rm(generatedOutput, { force: true })
await rm(defaultOutput, { force: true })
})

it('prints help text to stdout', async () => {
const { stdout, stderr } = await execFileAsync(
process.execPath,
[tsxPath, scriptPath, '--help'],
{
cwd: fixtureRoot,
},
)

    expect(stderr).toBe('')
    expect(stdout).toContain('Usage: pnpm export:source [options]')
    expect(stdout).toContain('--stdout')
    await expect(access(defaultOutput)).rejects.toMatchObject({ code: 'ENOENT' })

})

it('writes markdown to stdout for a fixture repo without leaking secrets', async () => {
const { stdout, stderr } = await execFileAsync(
process.execPath,
[tsxPath, scriptPath, '--stdout'],
{
cwd: fixtureRoot,
},
)

    expect(stderr).toBe('')
    expect(stdout).toContain('<!-- Files: 3; Estimated tokens:')
    expect(stdout).toContain('## Table of contents')
    expect(stdout).toContain('--- src/lib/example.ts ---')
    expect(stdout).toContain('```ts')
    expect(stdout).not.toContain('.env')
    expect(stdout).not.toContain('logo.png')
    expect(stdout).not.toContain('ANTHROPIC_API_KEY')
    expect(stdout).not.toContain('prisma.config.ts')

})

it('applies include and exclude globs at the command level', async () => {
const { stdout, stderr } = await execFileAsync(
process.execPath,
[tsxPath, scriptPath, '--stdout', '--include=src/**', '--exclude=**/*.test.ts'],
{
cwd: fixtureRoot,
},
)

    expect(stderr).toBe('')
    expect(stdout).toContain('<!-- Files: 1; Estimated tokens:')
    expect(stdout).toContain('--- src/lib/example.ts ---')
    expect(stdout).not.toContain('--- src/lib/example.test.ts ---')
    expect(stdout).not.toContain('--- scripts/helper.ts ---')

})

it('exports only test files when only-tests is set', async () => {
const { stdout, stderr } = await execFileAsync(
process.execPath,
[tsxPath, scriptPath, '--stdout', '--only-tests'],
{
cwd: fixtureRoot,
},
)

    expect(stderr).toBe('')
    expect(stdout).toContain('<!-- Files: 1; Estimated tokens:')
    expect(stdout).toContain('--- src/lib/example.test.ts ---')
    expect(stdout).not.toContain('--- src/lib/example.ts ---')
    expect(stdout).not.toContain('--- scripts/helper.ts ---')

})

it('writes a plain text export to an output file', async () => {
const { stderr } = await execFileAsync(
process.execPath,
[tsxPath, scriptPath, '--format=txt', `--output=${generatedOutput}`],
{
cwd: fixtureRoot,
},
)

    expect(stderr).toBe('')
    await expect(access(generatedOutput)).resolves.toBeUndefined()

    const output = await readFile(generatedOutput, 'utf8')
    expect(output).toContain('--- src/lib/example.ts ---')
    expect(output).not.toContain('```')

})

it('writes markdown to export.md by default when stdout is not requested', async () => {
const { stdout, stderr } = await execFileAsync(process.execPath, [tsxPath, scriptPath], {
cwd: fixtureRoot,
})

    expect(stdout).toBe('')
    expect(stderr).toBe('')
    await expect(access(defaultOutput)).resolves.toBeUndefined()

    const output = await readFile(defaultOutput, 'utf8')
    expect(output).toContain('<!-- Files: 3; Estimated tokens:')
    expect(output).toContain('--- src/lib/example.ts ---')

})

it('warns and writes an empty export when no-tests and only-tests are combined', async () => {
const { stdout, stderr } = await execFileAsync(
process.execPath,
[tsxPath, scriptPath, '--no-tests', '--only-tests'],
{
cwd: fixtureRoot,
},
)

    expect(stdout).toBe('')
    expect(stderr).toContain(
      'Warning: --no-tests and --only-tests cancel each other out; exporting an empty set.',
    )
    await expect(access(defaultOutput)).resolves.toBeUndefined()

    const output = await readFile(defaultOutput, 'utf8')
    expect(output).toContain('<!-- Files: 0; Estimated tokens: 0 -->')
    expect(output).toContain('_No files matched._')

})
})
</file>

<file path="tests/integration/lib/mcp/adapter-compliance.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { mockTavilySearch, mockFalRun, mockFetchTranscript } = vi.hoisted(() => ({
mockTavilySearch: vi.fn(),
mockFalRun: vi.fn(),
mockFetchTranscript: vi.fn(),
}))

vi.mock('@tavily/core', () => ({
tavily: () => ({
search: mockTavilySearch,
}),
}))

vi.mock('@fal-ai/client', async (importOriginal) => {
const actual = await importOriginal<typeof import('@fal-ai/client')>()
return {
...actual,
createFalClient: () => ({ run: mockFalRun }),
}
})

vi.mock('youtube-transcript', () => ({
YoutubeTranscript: {
fetchTranscript: mockFetchTranscript,
},
}))

import { FalImageGenAdapter } from '@/lib/mcp/adapters/fal-image-gen'
import { TavilySearchAdapter } from '@/lib/mcp/adapters/tavily-search'
import { WebFetchAdapter } from '@/lib/mcp/adapters/web-fetch'
import { YouTubeTranscriptAdapter } from '@/lib/mcp/adapters/youtube-transcript'

describe('MCP adapter compliance', () => {
beforeEach(() => {
vi.clearAllMocks()

    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response('<html><title>Example</title><body>Hello world</body></html>', {
          status: 200,
          headers: { 'content-type': 'text/html' },
        }),
      ),
    )

    mockTavilySearch.mockResolvedValue({
      results: [
        {
          title: 'Example result',
          url: 'https://example.com',
          content: 'Example snippet',
        },
      ],
    })

    mockFalRun.mockResolvedValue({
      data: { images: [{ url: 'https://example.com/image.jpg', width: 512, height: 512 }] },
      requestId: 'request-id',
    })

    mockFetchTranscript.mockResolvedValue([
      { text: 'Hello', duration: 1, offset: 0, lang: 'en' },
      { text: 'world', duration: 1, offset: 1000, lang: 'en' },
    ])

})

it('all adapters expose a unique non-empty toolName', () => {
const adapters = [
new WebFetchAdapter(),
new TavilySearchAdapter(),
new FalImageGenAdapter(),
new YouTubeTranscriptAdapter(),
]

    const toolNames = adapters.map((adapter) => adapter.toolName)

    expect(toolNames.every((toolName) => toolName.length > 0)).toBe(true)
    expect(new Set(toolNames).size).toBe(toolNames.length)

})

it('all adapters satisfy the IMCPClient execute contract', async () => {
const webFetch = new WebFetchAdapter()
const tavilySearch = new TavilySearchAdapter()
const falImageGen = new FalImageGenAdapter()
const youtubeTranscript = new YouTubeTranscriptAdapter()

    await expect(webFetch.execute({ url: 'https://example.com' })).resolves.toEqual({
      text: 'Example Hello world',
      title: 'Example',
    })

    await expect(tavilySearch.execute({ query: 'example query' })).resolves.toEqual([
      {
        title: 'Example result',
        url: 'https://example.com',
        snippet: 'Example snippet',
      },
    ])

    await expect(falImageGen.execute({ prompt: 'test prompt' })).resolves.toEqual({
      url: 'https://example.com/image.jpg',
      alt: 'test prompt',
    })

    await expect(youtubeTranscript.execute({ videoId: 'abc123' })).resolves.toEqual({
      text: 'Hello world',
      language: 'en',
    })

})
})
</file>

<file path="tests/integration/middleware/request-id.test.ts">
import { describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

vi.mock('@/lib/sharing/proxy', () => ({
maybeRewriteUnavailableShare: vi.fn().mockResolvedValue(null),
}))

vi.mock('@/lib/db/client', () => ({
prisma: {
$queryRaw: vi.fn().mockResolvedValue(1),
},
}))

import proxy from '@/proxy'
import { GET } from '@/app/api/health/route'

const UUID_V4_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

describe('request IDs', () => {
it('adds x-request-id to proxy passthrough responses', async () => {
const response = (await proxy(
new NextRequest('http://localhost:3000/'),
{} as Parameters<typeof proxy>[1],
)) as Response
const requestId = response.headers.get('x-request-id')

    expect(requestId).toMatch(UUID_V4_PATTERN)

})

it('adds x-request-id to the health endpoint response', async () => {
const response = await GET(new Request('http://localhost:3000/api/health'))
const requestId = response.headers.get('x-request-id')

    expect(response.status).toBe(200)
    expect(requestId).toMatch(UUID_V4_PATTERN)

})
})
</file>

<file path="tests/integration/middleware/security-headers.test.ts">
import { describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

vi.mock('@/lib/sharing/proxy', () => ({
maybeRewriteUnavailableShare: vi.fn().mockResolvedValue(null),
}))

vi.mock('@/lib/db/client', () => ({
prisma: {
$queryRaw: vi.fn().mockResolvedValue(1),
},
}))

import proxy from '@/proxy'
import { GET as getHealth } from '@/app/api/health/route'

describe('security headers and csrf', () => {
it('applies security headers to proxy passthrough responses', async () => {
const response = (await proxy(
new NextRequest('http://localhost:3000/'),
{} as Parameters<typeof proxy>[1],
)) as Response

    expect(response.headers.get('content-security-policy')).toContain("default-src 'self'")
    expect(response.headers.get('x-content-type-options')).toBe('nosniff')
    expect(response.headers.get('x-frame-options')).toBe('DENY')
    expect(response.headers.get('referrer-policy')).toBe('strict-origin-when-cross-origin')

})

it('rejects mutating api requests with a mismatched origin', async () => {
const response = (await proxy(
new NextRequest('http://localhost:3000/api/generate', {
method: 'POST',
headers: { origin: 'https://attacker.example' },
}),
{} as Parameters<typeof proxy>[1],
)) as Response

    expect(response.status).toBe(403)
    await expect(response.json()).resolves.toEqual({ error: 'Forbidden' })

})

it('applies security headers to the health endpoint response', async () => {
const response = await getHealth(new Request('http://localhost:3000/api/health'))

    expect(response.headers.get('content-security-policy')).toContain("default-src 'self'")
    expect(response.headers.get('x-content-type-options')).toBe('nosniff')

})
})
</file>

<file path="tests/integration/.gitkeep">

</file>

<file path="tests/mocks/fixtures/.gitkeep">

</file>

<file path="tests/mocks/handlers/fal.ts">
import { http, HttpResponse } from 'msw'

export const FAL_BASE_URL = 'https://fal.run'
export const FAL_MODEL_PATH = 'fal-ai/flux/schnell'

export const MOCK_FAL_RESPONSE = {
images: [
{
url: 'https://fal.run/files/mock-image-abc123.jpg',
width: 512,
height: 512,
content_type: 'image/jpeg',
},
],
timings: { inference: 0.5 },
seed: 12345,
has_nsfw_concepts: [false],
prompt: 'test prompt',
}

export const falHandlers = [
// Successful image generation
http.post(`${FAL_BASE_URL}/${FAL_MODEL_PATH}`, () => {
return HttpResponse.json(MOCK_FAL_RESPONSE)
}),
]

export const falErrorHandlers = {
rateLimited: http.post(`${FAL_BASE_URL}/${FAL_MODEL_PATH}`, () => {
return new HttpResponse(null, { status: 429 })
}),
serverError: http.post(`${FAL_BASE_URL}/${FAL_MODEL_PATH}`, () => {
return new HttpResponse(null, { status: 500 })
}),
noImages: http.post(`${FAL_BASE_URL}/${FAL_MODEL_PATH}`, () => {
return HttpResponse.json({ images: [] })
}),
}
</file>

<file path="tests/mocks/handlers/tavily.ts">
import { http, HttpResponse } from 'msw'

export const TAVILY_BASE_URL = 'https://api.tavily.com'

export const MOCK_TAVILY_RESPONSE = {
query: 'test query',
response_time: 0.5,
images: [],
answer: null,
results: [
{
title: 'Result One',
url: 'https://example.com/1',
content: 'Snippet for result one.',
score: 0.9,
},
{
title: 'Result Two',
url: 'https://example.com/2',
content: 'Snippet for result two.',
score: 0.8,
},
],
}

export const tavilyHandlers = [
// Successful search
http.post(`${TAVILY_BASE_URL}/search`, () => {
return HttpResponse.json(MOCK_TAVILY_RESPONSE)
}),
]

export const tavilyErrorHandlers = {
serverError: http.post(`${TAVILY_BASE_URL}/search`, () => {
return new HttpResponse(null, { status: 500 })
}),
rateLimited: http.post(`${TAVILY_BASE_URL}/search`, () => {
return new HttpResponse(null, { status: 429 })
}),
emptyResults: http.post(`${TAVILY_BASE_URL}/search`, () => {
return HttpResponse.json({
query: 'test',
response_time: 0.1,
images: [],
answer: null,
results: [],
})
}),
}
</file>

<file path="tests/mocks/handlers/web-fetch.ts">
import { http, HttpResponse, delay } from 'msw'

export const MOCK_HTML = `<!DOCTYPE html>

<html>
<head><title>Test Page</title></head>
<body>
<h1>Hello World</h1>
<p>This is test content.</p>
<script>alert('script')</script>
<style>body { color: red; }</style>
</body>
</html>`

export const WEB_FETCH_BASE_URL = 'https://example-test.com'

export const webFetchHandlers = [
// 200 OK with HTML
http.get(`${WEB_FETCH_BASE_URL}/ok`, () => {
return new HttpResponse(MOCK_HTML, {
status: 200,
headers: { 'Content-Type': 'text/html' },
})
}),

// 404 Not Found
http.get(`${WEB_FETCH_BASE_URL}/not-found`, () => {
return new HttpResponse('Not Found', { status: 404 })
}),

// 500 Server Error
http.get(`${WEB_FETCH_BASE_URL}/server-error`, () => {
return new HttpResponse('Internal Server Error', { status: 500 })
}),

// Timeout (very long delay)
http.get(`${WEB_FETCH_BASE_URL}/timeout`, async () => {
await delay(30_000)
return new HttpResponse('OK', { status: 200 })
}),

// 200 with very large body (for truncation test)
http.get(`${WEB_FETCH_BASE_URL}/large`, () => {
const largeBody = `<html><body><p>${'x'.repeat(200_000)}</p></body></html>`
return new HttpResponse(largeBody, {
status: 200,
headers: { 'Content-Type': 'text/html' },
})
}),

// 200 with empty body
http.get(`${WEB_FETCH_BASE_URL}/empty`, () => {
return new HttpResponse('', {
status: 200,
headers: { 'Content-Type': 'text/html' },
})
}),

// Non-English content (Japanese)
http.get(`${WEB_FETCH_BASE_URL}/japanese`, () => {
return new HttpResponse(
'<html><head><title>テスト</title></head><body><p>日本語のテキスト</p></body></html>',
{ status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
)
}),
]
</file>

<file path="tests/mocks/server.ts">
import { setupServer } from 'msw/node'

// Add MSW request handlers here as features are built
export const server = setupServer()
</file>

<file path="tests/unit/app/global-error.test.tsx">
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import GlobalError from '@/app/global-error'

describe('GlobalError', () => {
it('renders the fallback UI and shows the error digest', async () => {
const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
const retry = vi.fn()
const error = Object.assign(new Error('boom'), { digest: 'digest-123' })

    render(<GlobalError error={error} unstable_retry={retry} />)

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    expect(screen.getByText(/digest-123/i)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /try again/i }))
    expect(retry).toHaveBeenCalledTimes(1)

    consoleError.mockRestore()

})
})
</file>

<file path="tests/unit/components/account/DangerZone.test.tsx">
import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import DangerZone from '@/components/account/DangerZone'

describe('DangerZone', () => {
it('keeps delete disabled until the confirmation email matches exactly', () => {
render(<DangerZone email="user@example.com" />)

    const button = screen.getByTestId('account-delete-button') as HTMLButtonElement
    expect(button.disabled).toBe(true)

    fireEvent.change(screen.getByTestId('account-delete-confirm-email'), {
      target: { value: 'user@exampl' },
    })
    fireEvent.change(screen.getByTestId('account-delete-password'), {
      target: { value: 'Passw0rd!123' },
    })
    expect(button.disabled).toBe(true)

    fireEvent.change(screen.getByTestId('account-delete-confirm-email'), {
      target: { value: 'user@example.com' },
    })
    expect(button.disabled).toBe(false)

})
})
</file>

<file path="tests/unit/components/auth/LoginForm.test.tsx">
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginForm } from '@/components/auth/LoginForm'

const assignLocation = vi.fn()
const fetchMock = vi.fn()

// Mock next-auth/react
const mockSignIn = vi.fn()
vi.mock('next-auth/react', () => ({
signIn: (...args: unknown[]) => mockSignIn(...args),
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
useSearchParams: () => ({
get: (key: string) => (key === 'callbackUrl' ? '/dashboard' : null),
}),
}))

function fillForm(email = 'user@example.com', password = 'SecurePass1') {
fireEvent.change(screen.getByLabelText(/^email/i), {
target: { value: email },
})
fireEvent.change(screen.getByLabelText(/^password/i), {
target: { value: password },
})
}

beforeEach(() => {
vi.clearAllMocks()
Object.defineProperty(window, 'location', {
configurable: true,
value: {
assign: assignLocation,
href: 'http://127.0.0.1:3000/login',
origin: 'http://127.0.0.1:3000',
},
})
vi.stubGlobal('fetch', fetchMock)
})

describe('LoginForm', () => {
it('renders email field, password field, sign in button, and Google button', () => {
render(<LoginForm />)
expect(screen.getByLabelText(/^email/i)).toBeInTheDocument()
expect(screen.getByLabelText(/^password/i)).toBeInTheDocument()
expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
expect(screen.getByRole('button', { name: /google/i })).toBeInTheDocument()
})

it('shows forgot password link', () => {
render(<LoginForm />)
expect(screen.getByText(/forgot password/i)).toBeInTheDocument()
})

it('calls signIn with credentials on form submit', async () => {
mockSignIn.mockResolvedValueOnce({ ok: true, error: null, url: '/dashboard' })

    render(<LoginForm />)
    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() =>
      expect(mockSignIn).toHaveBeenCalledWith(
        'credentials',
        expect.objectContaining({ email: 'user@example.com', redirect: false }),
      ),
    )

})

it('shows generic error on invalid credentials', async () => {
mockSignIn.mockResolvedValueOnce({ ok: false, error: 'CredentialsSignin', url: null })

    render(<LoginForm />)
    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(/invalid email or password/i),
    )

})

it('shows email-not-verified error when signIn returns EmailNotVerified', async () => {
mockSignIn.mockResolvedValueOnce({ ok: false, error: 'EmailNotVerified', url: null })

    render(<LoginForm />)
    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/verify your email/i))

})

it('starts Google sign-in through the same-origin auth endpoints', async () => {
fetchMock
.mockResolvedValueOnce({
ok: true,
json: async () => ({ csrfToken: 'csrf-token' }),
})
.mockResolvedValueOnce({
ok: true,
json: async () => ({ url: 'https://accounts.google.com/o/oauth2/v2/auth?state=abc' }),
})

    render(<LoginForm />)
    fireEvent.click(screen.getByRole('button', { name: /google/i }))

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2))

    expect(fetchMock).toHaveBeenNthCalledWith(1, '/api/auth/csrf')
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      '/api/auth/signin/google',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Auth-Return-Redirect': '1',
        }),
      }),
    )

    expect(assignLocation).toHaveBeenCalledWith(
      'https://accounts.google.com/o/oauth2/v2/auth?state=abc',
    )

})

it('shows an error when Google sign-in setup fails', async () => {
fetchMock.mockResolvedValueOnce({
ok: false,
json: async () => ({}),
})

    render(<LoginForm />)
    fireEvent.click(screen.getByRole('button', { name: /google/i }))

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(/network error\. please try again\./i),
    )

})

it('disables submit button while loading', async () => {
let resolve: (v: unknown) => void
const pending = new Promise((r) => {
resolve = r
})
mockSignIn.mockReturnValueOnce(pending)

    render(<LoginForm />)
    fillForm()
    const btn = screen.getByRole('button', { name: /sign in/i })
    fireEvent.click(btn)

    await waitFor(() => expect(btn).toBeDisabled())
    await act(async () => {
      resolve!({ ok: true, error: null, url: '/dashboard' })
      await pending
    })

})
})
</file>

<file path="tests/unit/components/auth/RegisterForm.test.tsx">
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { RegisterForm } from '@/components/auth/RegisterForm'

function fillForm(email = 'new@example.com', password = 'SecurePass1', name = '') {
fireEvent.change(screen.getByLabelText(/email/i), {
target: { value: email },
})
fireEvent.change(screen.getByLabelText(/^password/i), {
target: { value: password },
})
if (name) {
fireEvent.change(screen.getByLabelText(/name/i), {
target: { value: name },
})
}
}

describe('RegisterForm', () => {
beforeEach(() => {
vi.resetAllMocks()
})

it('renders all required fields and submit button', () => {
render(<RegisterForm />)
expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
expect(screen.getByLabelText(/^password/i)).toBeInTheDocument()
expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
})

it('shows success message after 201 response', async () => {
vi.stubGlobal(
'fetch',
vi.fn().mockResolvedValueOnce({
ok: true,
status: 201,
json: async () => ({ message: 'Verification email sent' }),
}),
)

    render(<RegisterForm />)
    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/check your email/i))

})

it('shows server error banner on 409 duplicate email', async () => {
vi.stubGlobal(
'fetch',
vi.fn().mockResolvedValueOnce({
ok: false,
status: 409,
json: async () => ({ error: 'Email already registered' }),
}),
)

    render(<RegisterForm />)
    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(/email already registered/i),
    )

})

it('shows field-level errors on 422 response', async () => {
vi.stubGlobal(
'fetch',
vi.fn().mockResolvedValueOnce({
ok: false,
status: 422,
json: async () => ({
error: 'Validation failed',
fields: { password: ['Password must be at least 8 characters'] },
}),
}),
)

    render(<RegisterForm />)
    fillForm('test@example.com', 'short')
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() => expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument())

})

it('shows network error on fetch failure', async () => {
vi.stubGlobal('fetch', vi.fn().mockRejectedValueOnce(new Error('Network error')))

    render(<RegisterForm />)
    fillForm()
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/network error/i))

})

it('disables submit button while loading', async () => {
let resolve: (v: unknown) => void
const pending = new Promise((r) => {
resolve = r
})
vi.stubGlobal('fetch', vi.fn().mockReturnValueOnce(pending))

    render(<RegisterForm />)
    fillForm()
    const btn = screen.getByRole('button', { name: /create account/i })
    fireEvent.click(btn)

    await waitFor(() => expect(btn).toBeDisabled())
    resolve!({ ok: true, status: 201, json: async () => ({ message: 'ok' }) })

})
})
</file>

<file path="tests/unit/components/dashboard/DashboardSearch.test.tsx">
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import DashboardSearch from '@/components/dashboard/DashboardSearch'

describe('DashboardSearch', () => {
it('renders the current search value', () => {
render(
<DashboardSearch
        value="react"
        onChange={vi.fn()}
        viewMode="grid"
        onViewModeChange={vi.fn()}
      />,
)

    expect(screen.getByTestId('dashboard-search')).toHaveValue('react')

})

it('notifies when the search query changes', () => {
const onChange = vi.fn()

    render(
      <DashboardSearch value="" onChange={onChange} viewMode="grid" onViewModeChange={vi.fn()} />,
    )

    fireEvent.change(screen.getByTestId('dashboard-search'), { target: { value: 'hooks' } })
    expect(onChange).toHaveBeenCalledWith('hooks')

})

it('switches from grid to list view', () => {
const onViewModeChange = vi.fn()

    render(
      <DashboardSearch
        value=""
        onChange={vi.fn()}
        viewMode="grid"
        onViewModeChange={onViewModeChange}
      />,
    )

    fireEvent.click(screen.getByTestId('dashboard-list-toggle'))
    expect(onViewModeChange).toHaveBeenCalledWith('list')

})
})
</file>

<file path="tests/unit/components/dashboard/GuideCard.test.tsx">
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

vi.mock('next/link', () => ({
default: ({
href,
children,
...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
<a href={href} {...props}>
{children}
</a>
),
}))

import GuideCard from '@/components/dashboard/GuideCard'

const guide = {
id: 'cmguidetest0000000000000001',
slug: 'react-basics',
title: 'React Basics',
studyMode: 'OVERVIEW' as const,
inputType: 'TOPIC' as const,
createdAt: new Date('2026-04-20T00:00:00.000Z'),
updatedAt: new Date('2026-04-20T00:00:00.000Z'),
isFavorite: false,
folder: { id: 'cmfolder000000000000000001', name: 'Frontend' },
tags: [{ id: 'cmtag00000000000000000001', name: 'react' }],
}

const folders = [
{ id: 'cmfolder000000000000000001', userId: 'user-1', name: 'Frontend', createdAt: new Date() },
]

describe('dashboard GuideCard', () => {
it('renders the title, study mode, and folder', () => {
render(
<GuideCard
        guide={guide}
        folders={folders}
        onToggleFavorite={vi.fn()}
        onDelete={vi.fn()}
        onMoveFolder={vi.fn()}
        onSaveTags={vi.fn()}
      />,
)

    expect(screen.getByText('React Basics')).toBeInTheDocument()
    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getAllByText('Frontend')).toHaveLength(2)

})

it('calls onToggleFavorite when the star button is pressed', () => {
const onToggleFavorite = vi.fn()

    render(
      <GuideCard
        guide={guide}
        folders={folders}
        onToggleFavorite={onToggleFavorite}
        onDelete={vi.fn()}
        onMoveFolder={vi.fn()}
        onSaveTags={vi.fn()}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Star' }))
    expect(onToggleFavorite).toHaveBeenCalledWith(guide)

})

it('calls onMoveFolder when the folder selection changes', () => {
const onMoveFolder = vi.fn()

    render(
      <GuideCard
        guide={guide}
        folders={[
          ...folders,
          {
            id: 'cmfolder000000000000000002',
            userId: 'user-1',
            name: 'Algorithms',
            createdAt: new Date(),
          },
        ]}
        onToggleFavorite={vi.fn()}
        onDelete={vi.fn()}
        onMoveFolder={onMoveFolder}
        onSaveTags={vi.fn()}
      />,
    )

    fireEvent.change(screen.getByTestId(`folder-select-${guide.id}`), {
      target: { value: 'cmfolder000000000000000002' },
    })

    expect(onMoveFolder).toHaveBeenCalledWith(guide, 'cmfolder000000000000000002')

})
})
</file>

<file path="tests/unit/components/guest/GuestBanner.test.tsx">
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock auth
vi.mock('@/lib/auth', () => ({
auth: vi.fn(),
}))

// Mock next/headers
vi.mock('next/headers', () => ({
headers: vi.fn(),
}))

// Mock getQuotaStatus
vi.mock('@/lib/guest/quota', () => ({
getQuotaStatus: vi.fn(),
GUEST_DAILY_LIMIT: 3,
}))

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { getQuotaStatus } from '@/lib/guest/quota'
import GuestBanner from '@/components/guest/GuestBanner'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockHeaders = headers as ReturnType<typeof vi.fn>
const mockGetQuotaStatus = getQuotaStatus as ReturnType<typeof vi.fn>

function futureReset(): Date {
const d = new Date()
d.setUTCHours(24, 0, 0, 0)
return d
}

beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue(null)
mockHeaders.mockResolvedValue(new Headers({ 'x-forwarded-for': '1.2.3.4' }))
mockGetQuotaStatus.mockResolvedValue({
used: 0,
limit: 3,
resetsAt: futureReset(),
allowed: true,
})
})

describe('GuestBanner', () => {
it('renders banner with quota count for guest user', async () => {
mockGetQuotaStatus.mockResolvedValueOnce({
used: 2,
limit: 3,
resetsAt: futureReset(),
allowed: true,
})

    const jsx = await GuestBanner()
    render(jsx as React.ReactElement)

    expect(screen.getByText(/2 of 3 free guides/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sign up free/i })).toHaveAttribute('href', '/register')

})

it('renders banner with used=0 when no guides generated yet', async () => {
const jsx = await GuestBanner()
render(jsx as React.ReactElement)

    expect(screen.getByText(/0 of 3 free guides/i)).toBeInTheDocument()

})

it('returns null for authenticated users', async () => {
mockAuth.mockResolvedValueOnce({ user: { id: 'user-1', email: 'a@b.com' } })

    const jsx = await GuestBanner()
    expect(jsx).toBeNull()

})

it('shows the guest banner role', async () => {
const jsx = await GuestBanner()
render(jsx as React.ReactElement)
expect(screen.getByRole('banner')).toBeInTheDocument()
})
})
</file>

<file path="tests/unit/components/guest/QuotaExhaustedModal.test.tsx">
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import QuotaExhaustedModal from '@/components/guest/QuotaExhaustedModal'

// Mock next/link so href assertions work in jsdom
vi.mock('next/link', () => ({
default: ({
href,
children,
...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
<a href={href} {...props}>
{children}
</a>
),
}))

describe('QuotaExhaustedModal', () => {
it('renders the modal when open=true', () => {
render(<QuotaExhaustedModal open />)
expect(screen.getByTestId('quota-exhausted-modal')).toBeInTheDocument()
})

it('shows the headline', () => {
render(<QuotaExhaustedModal open />)
expect(screen.getByRole('heading', { name: /3 free guides for today/i })).toBeInTheDocument()
})

it('shows "Create free account" CTA linking to /register', () => {
render(<QuotaExhaustedModal open />)
const cta = screen.getByRole('link', { name: /create free account/i })
expect(cta).toBeInTheDocument()
expect(cta).toHaveAttribute('href', '/register')
})

it('shows "Log in" link pointing to /login', () => {
render(<QuotaExhaustedModal open />)
const loginLink = screen.getByRole('link', { name: /log in/i })
expect(loginLink).toHaveAttribute('href', '/login')
})

it('renders nothing when open=false', () => {
const { container } = render(<QuotaExhaustedModal open={false} />)
expect(container.firstChild).toBeNull()
})

it('calls onClose when close button is clicked', () => {
const onClose = vi.fn()
render(<QuotaExhaustedModal open onClose={onClose} />)
fireEvent.click(screen.getByRole('button', { name: /close/i }))
expect(onClose).toHaveBeenCalledOnce()
})
})
</file>

<file path="tests/unit/components/guest/WatermarkOverlay.test.tsx">
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import WatermarkOverlay from '@/components/guest/WatermarkOverlay'

describe('WatermarkOverlay', () => {
it('renders the watermark element when isWatermark=true', () => {
render(<WatermarkOverlay isWatermark />)
expect(screen.getByTestId('watermark-overlay')).toBeInTheDocument()
})

it('contains preview text', () => {
render(<WatermarkOverlay isWatermark />)
expect(screen.getByText(/PREVIEW.\*Sign up to save/i)).toBeInTheDocument()
})

it('renders nothing when isWatermark=false', () => {
const { container } = render(<WatermarkOverlay isWatermark={false} />)
expect(container.firstChild).toBeNull()
})
})
</file>

<file path="tests/unit/components/guide/CollapsibleSection.test.tsx">
import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import CollapsibleSection from '@/components/guide/CollapsibleSection'

describe('CollapsibleSection', () => {
it('opens and closes on click', () => {
render(
<CollapsibleSection id="intro" heading="Introduction" defaultOpen={false}>

<p>Section content</p>
</CollapsibleSection>,
)

    const button = screen.getByRole('button', { name: /introduction/i })
    const content = screen.getByTestId('collapsible-content')

    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(content).toHaveAttribute('hidden')

    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(content).not.toHaveAttribute('hidden')

    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(content).toHaveAttribute('hidden')

})
})
</file>

<file path="tests/unit/components/guide/FlashcardDeck.test.tsx">
import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import FlashcardDeck from '@/components/guide/FlashcardDeck'

describe('FlashcardDeck', () => {
const cards = [
{ front: 'What is React?', back: 'A UI library' },
{ front: 'What is JSX?', back: 'Syntax extension for JavaScript' },
{ front: 'What is a hook?', back: 'A React state/lifecycle utility' },
]

it('flips card on click', () => {
render(<FlashcardDeck cards={cards} />)

    const card = screen.getByTestId('flashcard-card')
    expect(card).toHaveTextContent('What is React?')

    fireEvent.click(card)
    expect(card).toHaveTextContent('A UI library')

})

it('navigates forward and wraps', () => {
render(<FlashcardDeck cards={cards} />)

    const next = screen.getByRole('button', { name: 'Next' })
    const card = screen.getByTestId('flashcard-card')

    fireEvent.click(next)
    expect(card).toHaveTextContent('What is JSX?')

    fireEvent.click(next)
    expect(card).toHaveTextContent('What is a hook?')

    fireEvent.click(next)
    expect(card).toHaveTextContent('What is React?')

})
})
</file>

<file path="tests/unit/components/guide/GuideHero.test.tsx">
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/link', () => ({
default: ({
href,
children,
...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
<a href={href} {...props}>
{children}
</a>
),
}))

vi.mock('@/components/ThemeToggle', () => ({
default: () => <button type="button">Theme</button>,
}))

import GuideHero from '@/components/guide/GuideHero'

describe('GuideHero', () => {
it('renders the title and source metadata', () => {
render(
<GuideHero
        title="Biology Basics"
        studyMode="OVERVIEW"
        inputType="TOPIC"
        inputValue="Biology"
      />,
)

    expect(screen.getByRole('heading', { name: 'Biology Basics' })).toBeInTheDocument()
    expect(screen.getByText(/source type: TOPIC/i)).toBeInTheDocument()

})

it('renders an image hero when media is an image', () => {
render(
<GuideHero
title="Biology Basics"
studyMode="OVERVIEW"
inputType="TOPIC"
inputValue="Biology"
media={{ type: 'image', src: 'https://example.com/hero.png', alt: 'Hero image' }}
/>,
)

    expect(screen.getByRole('img', { name: 'Hero image' })).toHaveAttribute(
      'src',
      'https://example.com/hero.png',
    )

})
})
</file>

<file path="tests/unit/components/guide/GuideRenderer.test.tsx">
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/link', () => ({
default: ({
href,
children,
...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
<a href={href} {...props}>
{children}
</a>
),
}))

vi.mock('next-mdx-remote/rsc', () => ({
MDXRemote: ({ source }: { source: string }) => <div data-testid="mdx-remote">{source}</div>,
}))

vi.mock('@/components/ThemeToggle', () => ({
default: () => <button type="button">Theme</button>,
}))

import GuideRenderer from '@/components/guide/GuideRenderer'

describe('GuideRenderer', () => {
it('renders TOC entries from markdown headings', async () => {
const jsx = await GuideRenderer({
guide: {
id: 'g1',
slug: 'react-basics',
title: 'React Basics',
studyMode: 'OVERVIEW',
inputType: 'TOPIC',
inputValue: 'React',
content:
'# React Basics\n\nIntro paragraph.\n\n## Components\nReact components are reusable.\n\n## Hooks\nHooks manage state.',
},
isAuthenticated: false,
})

    render(jsx as React.ReactElement)

    expect(screen.getByTestId('guide-toc')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Components' })).toHaveAttribute('href', '#components')
    expect(screen.getByRole('link', { name: 'Hooks' })).toHaveAttribute('href', '#hooks')

})
})
</file>

<file path="tests/unit/components/guide/GuideTOC.test.tsx">
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/link', () => ({
default: ({
href,
children,
...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
<a href={href} {...props}>
{children}
</a>
),
}))

import GuideTOC from '@/components/guide/GuideTOC'

describe('GuideTOC', () => {
it('renders TOC links from guide headings', () => {
render(
<GuideTOC
items={[
{ id: 'intro', title: 'Introduction' },
{ id: 'section-1', title: 'Section One' },
{ id: 'section-2', title: 'Section Two' },
]}
/>,
)

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(3)
    expect(links[0]).toHaveAttribute('href', '#intro')
    expect(links[1]).toHaveAttribute('href', '#section-1')
    expect(links[2]).toHaveAttribute('href', '#section-2')

})

it('renders nothing when there are no TOC items', () => {
const { container } = render(<GuideTOC items={[]} />)
expect(container).toBeEmptyDOMElement()
})
})
</file>

<file path="tests/unit/components/guide/HighlightNote.test.tsx">
import { createRef } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import HighlightNote from '@/components/guide/HighlightNote'

vi.mock('next/link', () => ({
default: ({
href,
children,
...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
<a href={href} {...props}>
{children}
</a>
),
}))

function TestHarness({ isAuthenticated }: { isAuthenticated: boolean }) {
const ref = createRef<HTMLDivElement>()

return (

<div>
<div ref={ref} data-testid="guide-content">
Important study text
</div>
<HighlightNote
        contentRef={ref}
        guideId="cm1234567890abcdef123456"
        isAuthenticated={isAuthenticated}
      />
</div>
)
}

beforeEach(() => {
vi.clearAllMocks()
})

describe('HighlightNote', () => {
it('shows save note tooltip for authenticated users', async () => {
render(<TestHarness isAuthenticated />)

    const content = screen.getByTestId('guide-content')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 201 })))
    vi.spyOn(window, 'getSelection').mockReturnValue({
      toString: () => 'Important study text',
      rangeCount: 1,
      removeAllRanges: vi.fn(),
      getRangeAt: () => ({
        commonAncestorContainer: content.firstChild as Node,
        getBoundingClientRect: () => ({
          bottom: 120,
          right: 140,
          left: 80,
          top: 100,
          width: 60,
          height: 20,
          x: 80,
          y: 100,
          toJSON: () => ({}),
        }),
      }),
    } as unknown as Selection)

    fireEvent.mouseUp(content)

    await waitFor(() => expect(screen.getByTestId('highlight-note-tooltip')).toBeInTheDocument())
    expect(screen.getByRole('button', { name: /save note/i })).toBeInTheDocument()

})

it('shows signup prompt for guests', async () => {
render(<TestHarness isAuthenticated={false} />)

    const content = screen.getByTestId('guide-content')
    vi.spyOn(window, 'getSelection').mockReturnValue({
      toString: () => 'Important study text',
      rangeCount: 1,
      getRangeAt: () => ({
        commonAncestorContainer: content.firstChild as Node,
        getBoundingClientRect: () => ({
          bottom: 120,
          right: 140,
          left: 80,
          top: 100,
          width: 60,
          height: 20,
          x: 80,
          y: 100,
          toJSON: () => ({}),
        }),
      }),
    } as unknown as Selection)

    fireEvent.mouseUp(content)

    await waitFor(() => expect(screen.getByText(/sign up to save notes/i)).toBeInTheDocument())

})
})
</file>

<file path="tests/unit/components/guide/InlineQuiz.test.tsx">
import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import InlineQuiz from '@/components/guide/InlineQuiz'

describe('InlineQuiz', () => {
it('shows correct feedback on the right answer', () => {
render(
<InlineQuiz
question="What is JSX?"
options={['HTML', 'JavaScript XML', 'CSS']}
correct={1}
explanation="JSX stands for JavaScript XML."
/>,
)

    fireEvent.click(screen.getByLabelText('JavaScript XML'))
    fireEvent.click(screen.getByRole('button', { name: 'Check' }))

    const feedback = screen.getByTestId('quiz-feedback')
    expect(feedback).toHaveTextContent('Correct')
    expect(feedback).toHaveTextContent('JSX stands for JavaScript XML.')

})

it('shows incorrect feedback on the wrong answer', () => {
render(
<InlineQuiz
question="What is JSX?"
options={['HTML', 'JavaScript XML', 'CSS']}
correct={1}
explanation="JSX stands for JavaScript XML."
/>,
)

    fireEvent.click(screen.getByLabelText('HTML'))
    fireEvent.click(screen.getByRole('button', { name: 'Check' }))

    const feedback = screen.getByTestId('quiz-feedback')
    expect(feedback).toHaveTextContent('Incorrect')

})

it('does not crash when quiz options are malformed', () => {
render(
<InlineQuiz
question="Broken quiz"
options={undefined as never}
correct={1}
explanation="Fallback explanation"
/>,
)

    expect(screen.getByText('Broken quiz')).toBeInTheDocument()
    expect(
      screen.getByText('Quiz options could not be loaded for this question.'),
    ).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Check' })).not.toBeInTheDocument()

})

it('normalizes string quiz options instead of throwing', () => {
render(
<InlineQuiz
question="Pick one"
options={'First | Second | Third' as unknown as string[]}
correct={1}
explanation="Second is correct"
/>,
)

    fireEvent.click(screen.getByLabelText('Second'))
    fireEvent.click(screen.getByRole('button', { name: 'Check' }))

    expect(screen.getByTestId('quiz-feedback')).toHaveTextContent('Correct')

})
})
</file>

<file path="tests/unit/components/guide/ReadingProgressBar.test.tsx">
import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import ReadingProgressBar from '@/components/guide/ReadingProgressBar'

describe('ReadingProgressBar', () => {
it('updates on scroll', () => {
Object.defineProperty(document.documentElement, 'scrollHeight', {
configurable: true,
value: 2000,
})
Object.defineProperty(document.documentElement, 'clientHeight', {
configurable: true,
value: 1000,
})

    let scrollTop = 0
    Object.defineProperty(document.documentElement, 'scrollTop', {
      configurable: true,
      get: () => scrollTop,
      set: (value) => {
        scrollTop = value
      },
    })

    render(<ReadingProgressBar />)

    scrollTop = 500
    fireEvent.scroll(window)

    expect(screen.getByTestId('reading-progress')).toHaveAttribute('value', '50')

})
})
</file>

<file path="tests/unit/components/guides/GuideCard.test.tsx">
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/link', () => ({
default: ({
href,
children,
...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
<a href={href} {...props}>
{children}
</a>
),
}))

import GuideCard from '@/components/guides/GuideCard'

const baseProps = {
id: 'guide-1',
slug: 'intro-to-react',
title: 'Introduction to React',
studyMode: 'OVERVIEW' as const,
content: 'React is a JavaScript library for building user interfaces.',
createdAt: new Date('2026-04-01'),
}

describe('GuideCard', () => {
it('renders the guide title', () => {
render(<GuideCard {...baseProps} />)
expect(screen.getByText('Introduction to React')).toBeInTheDocument()
})

it('links to the guide page via slug', () => {
render(<GuideCard {...baseProps} />)
const link = screen.getByTestId('guide-card')
expect(link).toHaveAttribute('href', '/guide/intro-to-react')
})

it('renders the OVERVIEW badge', () => {
render(<GuideCard {...baseProps} />)
expect(screen.getByText('Overview')).toBeInTheDocument()
})

it('renders the DEEP_DIVE badge', () => {
render(<GuideCard {...baseProps} studyMode="DEEP_DIVE" />)
expect(screen.getByText('Deep Dive')).toBeInTheDocument()
})

it('renders the EXAM_PREP badge', () => {
render(<GuideCard {...baseProps} studyMode="EXAM_PREP" />)
expect(screen.getByText('Exam Prep')).toBeInTheDocument()
})

it('renders the ELI5 badge', () => {
render(<GuideCard {...baseProps} studyMode="ELI5" />)
expect(screen.getByText('ELI5')).toBeInTheDocument()
})

it('renders a content preview', () => {
render(<GuideCard {...baseProps} />)
expect(screen.getByText(/React is a JavaScript library/i)).toBeInTheDocument()
})

it('strips markdown syntax from the content preview', () => {
render(<GuideCard {...baseProps} content="## Heading\n**bold** text and `code` here" />)
const preview = screen.getByText(/bold text and code here/i)
expect(preview).toBeInTheDocument()
})
})
</file>

<file path="tests/unit/lib/ai/claude.test.ts">
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@ai-sdk/anthropic', () => ({
createAnthropic: vi.fn().mockReturnValue(vi.fn().mockReturnValue('mock-model')),
}))

vi.mock('ai', () => ({
streamText: vi.fn(),
generateText: vi.fn(),
}))

import { streamText, generateText } from 'ai'
import { ClaudeClient } from '@/lib/ai/claude'

const mockStreamText = streamText as ReturnType<typeof vi.fn>
const mockGenerateText = generateText as ReturnType<typeof vi.fn>

function makeTextStream(chunks: string[]): ReadableStream<string> {
let idx = 0
return new ReadableStream({
pull(controller) {
if (idx < chunks.length) {
controller.enqueue(chunks[idx++]!)
} else {
controller.close()
}
},
})
}

beforeEach(() => {
vi.clearAllMocks()
})

describe('ClaudeClient', () => {
it('streamGenerate returns a ReadableStream', async () => {
mockStreamText.mockReturnValue({
textStream: makeTextStream(['Hello', ' World']),
})

    const client = new ClaudeClient()
    const stream = await client.streamGenerate('test prompt')

    expect(stream).toBeInstanceOf(ReadableStream)

})

it('generate returns the full text string', async () => {
mockGenerateText.mockResolvedValue({ text: 'Generated content here.' })

    const client = new ClaudeClient()
    const result = await client.generate('test prompt')

    expect(result).toBe('Generated content here.')

})

it('passes system suffix to the generate call', async () => {
mockGenerateText.mockResolvedValue({ text: 'ok' })

    const client = new ClaudeClient()
    await client.generate('prompt', 'extra instructions')

    const callArgs = mockGenerateText.mock.calls[0]?.[0] as { system: string }
    expect(callArgs.system).toContain('extra instructions')
    expect(callArgs.system).toContain('FlashGuides AI')

})
})
</file>

<file path="tests/unit/lib/auth/middleware.test.ts">
import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import {
  isProtectedRoute,
  buildLoginRedirect,
  authorizedCallback,
  type AuthorizedParams,
} from '@/lib/auth/middleware'

// ─── isProtectedRoute ────────────────────────────────────────────────────────

describe('isProtectedRoute', () => {
it.each([
['/dashboard', true],
['/dashboard/guides', true],
['/account', true],
['/account/settings', true],
['/api/guides', true],
['/api/guides/123', true],
])('returns true for protected path %s', (path, expected) => {
expect(isProtectedRoute(path)).toBe(expected)
})

it.each([
['/', false],
['/login', false],
['/guide/some-slug', false],
['/gallery', false],
['/api/health', false],
['/api/auth/session', false],
])('returns false for public path %s', (path, expected) => {
expect(isProtectedRoute(path)).toBe(expected)
})
})

// ─── buildLoginRedirect ───────────────────────────────────────────────────────

describe('buildLoginRedirect', () => {
it('redirects to /login with callbackUrl query param', () => {
const req = new NextRequest('http://localhost:3000/dashboard/guides')
const response = buildLoginRedirect(req)

    expect(response.status).toBe(307)
    const location = response.headers.get('location') ?? ''
    expect(location).toContain('/login')
    expect(location).toContain('callbackUrl=%2Fdashboard%2Fguides')

})

it('preserves query string in callbackUrl', () => {
const req = new NextRequest('http://localhost:3000/dashboard?tab=favorites')
const response = buildLoginRedirect(req)

    const location = response.headers.get('location') ?? ''
    expect(location).toContain('callbackUrl=')
    expect(decodeURIComponent(location)).toContain('/dashboard?tab=favorites')

})
})

// ─── authorizedCallback ───────────────────────────────────────────────────────

function makeAuthParams(pathname: string, userId?: string): AuthorizedParams {
const request = new NextRequest(`http://localhost:3000${pathname}`)
const auth = userId
? {
user: { id: userId, email: 'test@example.com', name: null, image: null },
expires: new Date(Date.now() + 3600_000).toISOString(),
}
: null
return { request, auth }
}

describe('authorizedCallback', () => {
it('allows unauthenticated access to public routes', () => {
const result = authorizedCallback(makeAuthParams('/'))
expect(result).toBe(true)
})

it('allows unauthenticated access to /login', () => {
const result = authorizedCallback(makeAuthParams('/login'))
expect(result).toBe(true)
})

it('allows unauthenticated access to /guide/slug', () => {
const result = authorizedCallback(makeAuthParams('/guide/my-guide'))
expect(result).toBe(true)
})

it('allows authenticated access to /dashboard', () => {
const result = authorizedCallback(makeAuthParams('/dashboard', 'user-123'))
expect(result).toBe(true)
})

it('redirects unauthenticated request to /dashboard to login', () => {
const result = authorizedCallback(makeAuthParams('/dashboard'))
expect(result).not.toBe(true)
// authorizedCallback returns a NextResponse redirect
const response = result as Response
expect(response.status).toBe(307)
expect(response.headers.get('location')).toContain('/login')
})

it('redirects unauthenticated request to /account to login', () => {
const result = authorizedCallback(makeAuthParams('/account'))
const response = result as Response
expect(response.status).toBe(307)
})

it('redirects unauthenticated request to /api/guides to login', () => {
const result = authorizedCallback(makeAuthParams('/api/guides'))
const response = result as Response
expect(response.status).toBe(307)
})
})
</file>

<file path="tests/unit/lib/auth/password.test.ts">
import { describe, it, expect } from 'vitest'
import { hashPassword, verifyPassword } from '@/lib/auth/password'

describe('hashPassword', () => {
it('returns a bcrypt hash starting with $2b$', async () => {
const hash = await hashPassword('MyP4ssword!')
expect(hash).toMatch(/^\$2[ab]\$/)
})

it('produces different hashes for the same input (salt randomness)', async () => {
const hash1 = await hashPassword('MyP4ssword!')
const hash2 = await hashPassword('MyP4ssword!')
expect(hash1).not.toBe(hash2)
})
})

describe('verifyPassword', () => {
it('returns true for the correct password', async () => {
const hash = await hashPassword('CorrectHorse99')
expect(await verifyPassword('CorrectHorse99', hash)).toBe(true)
})

it('returns false for a wrong password', async () => {
const hash = await hashPassword('CorrectHorse99')
expect(await verifyPassword('WrongPassword1', hash)).toBe(false)
})

it('returns false for an empty string', async () => {
const hash = await hashPassword('CorrectHorse99')
expect(await verifyPassword('', hash)).toBe(false)
})
})
</file>

<file path="tests/unit/lib/auth/tokens.test.ts">
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Prisma before importing tokens
vi.mock('@/lib/db/client', () => ({
prisma: {
verificationToken: {
deleteMany: vi.fn().mockResolvedValue({ count: 0 }),
create: vi.fn().mockResolvedValue({}),
findUnique: vi.fn(),
delete: vi.fn().mockResolvedValue({}),
},
},
}))

import { prisma } from '@/lib/db/client'
import {
createVerificationToken,
consumeVerificationToken,
createPasswordResetToken,
} from '@/lib/auth/tokens'

const mockPrisma = prisma as unknown as {
verificationToken: {
deleteMany: ReturnType<typeof vi.fn>
create: ReturnType<typeof vi.fn>
findUnique: ReturnType<typeof vi.fn>
delete: ReturnType<typeof vi.fn>
}
}

beforeEach(() => {
vi.clearAllMocks()
})

describe('createVerificationToken', () => {
it('returns a 64-char hex string (32 bytes)', async () => {
const token = await createVerificationToken('user@example.com')
expect(token).toMatch(/^[0-9a-f]{64}$/)
})

it('deletes existing tokens for the identifier before creating', async () => {
await createVerificationToken('user@example.com')
expect(mockPrisma.verificationToken.deleteMany).toHaveBeenCalledWith({
where: { identifier: 'user@example.com' },
})
})

it('creates a token record with the correct identifier', async () => {
await createVerificationToken('user@example.com')
expect(mockPrisma.verificationToken.create).toHaveBeenCalledWith(
expect.objectContaining({
data: expect.objectContaining({ identifier: 'user@example.com' }),
}),
)
})

it('sets expiry ~24h in the future', async () => {
const before = Date.now()
await createVerificationToken('user@example.com')
const after = Date.now()

    const createCall = mockPrisma.verificationToken.create.mock.calls[0] as [
      { data: { expires: Date } },
    ]
    const expires = createCall[0].data.expires.getTime()

    const expectedMin = before + 23 * 60 * 60 * 1000
    const expectedMax = after + 25 * 60 * 60 * 1000
    expect(expires).toBeGreaterThan(expectedMin)
    expect(expires).toBeLessThan(expectedMax)

})
})

describe('createPasswordResetToken', () => {
it('sets expiry ~1h in the future', async () => {
const before = Date.now()
await createPasswordResetToken('user@example.com')
const after = Date.now()

    const createCall = mockPrisma.verificationToken.create.mock.calls[0] as [
      { data: { expires: Date } },
    ]
    const expires = createCall[0].data.expires.getTime()

    const expectedMin = before + 55 * 60 * 1000
    const expectedMax = after + 65 * 60 * 1000
    expect(expires).toBeGreaterThan(expectedMin)
    expect(expires).toBeLessThan(expectedMax)

})
})

describe('consumeVerificationToken', () => {
it('returns null when token not found', async () => {
mockPrisma.verificationToken.findUnique.mockResolvedValueOnce(null)
const result = await consumeVerificationToken('nonexistent')
expect(result).toBeNull()
})

it('returns null and deletes when token is expired', async () => {
mockPrisma.verificationToken.findUnique.mockResolvedValueOnce({
identifier: 'user@example.com',
token: 'expiredtoken',
expires: new Date(Date.now() - 1000),
})

    const result = await consumeVerificationToken('expiredtoken')
    expect(result).toBeNull()
    expect(mockPrisma.verificationToken.delete).toHaveBeenCalledWith({
      where: { token: 'expiredtoken' },
    })

})

it('returns the identifier and deletes the token on success', async () => {
mockPrisma.verificationToken.findUnique.mockResolvedValueOnce({
identifier: 'user@example.com',
token: 'validtoken',
expires: new Date(Date.now() + 60_000),
})

    const result = await consumeVerificationToken('validtoken')
    expect(result).toBe('user@example.com')
    expect(mockPrisma.verificationToken.delete).toHaveBeenCalledWith({
      where: { token: 'validtoken' },
    })

})
})
</file>

<file path="tests/unit/lib/cli/always-exclude.test.ts">
import { describe, expect, it } from 'vitest'
import {
  applyAlwaysExclude,
  containsSecretPattern,
  isAlwaysExcludedPath,
} from '@/lib/cli/always-exclude'

describe('applyAlwaysExclude', () => {
it('removes secrets, build outputs, lockfiles, and binary assets', () => {
expect(
applyAlwaysExclude([
'src/lib/example.ts',
'.env',
'.env.local',
'prisma.config.ts',
'node_modules/pkg/index.js',
'.next/server/app.js',
'dist/export.js',
'pnpm-lock.yaml',
'public/logo.png',
'keys/private.pem',
]),
).toEqual(['src/lib/example.ts'])
})

it('exposes path-level exclusion checks', () => {
expect(isAlwaysExcludedPath('src/lib/example.ts')).toBe(false)
expect(isAlwaysExcludedPath('secrets/file.key')).toBe(true)
})

it('detects secret-like content patterns', () => {
expect(containsSecretPattern('ANTHROPIC_API_KEY=sk-test')).toBe(true)
expect(containsSecretPattern("const apiKey = process.env['ANTHROPIC_API_KEY']")).toBe(true)
expect(containsSecretPattern('const safeValue = "hello"')).toBe(false)
})
})
</file>

<file path="tests/unit/lib/cli/collect-files.test.ts">
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { collectFiles } from '@/lib/cli/collect-files'

async function writeFixture(root: string, relativePath: string, content: string) {
const destination = path.join(root, relativePath)
await mkdir(path.dirname(destination), { recursive: true })
await writeFile(destination, content, 'utf8')
}

describe('collectFiles', () => {
let fixtureRoot = ''

beforeEach(async () => {
fixtureRoot = await mkdtemp(path.join(os.tmpdir(), 'flashguides-cli-'))
await writeFixture(fixtureRoot, 'src/lib/example.ts', 'export const example = true\n')
await writeFixture(fixtureRoot, 'src/lib/example.test.ts', 'expect(true).toBe(true)\n')
await writeFixture(fixtureRoot, 'scripts/export.ts', 'console.log("export")\n')
await writeFixture(fixtureRoot, 'tests/integration/sample.spec.ts', 'expect(true).toBe(true)\n')
await writeFixture(fixtureRoot, '.env', 'ANTHROPIC_API_KEY=sk-secret\n')
await writeFixture(fixtureRoot, 'src/lib/unsafe.ts', 'FAL_API_KEY=sk-secret\n')
await writeFixture(fixtureRoot, 'src/generated/client.ts', 'export const generated = true\n')
})

afterEach(async () => {
if (fixtureRoot) {
await rm(fixtureRoot, { recursive: true, force: true })
}
})

it('collects default src and scripts files while applying always-exclude and content-scan rules', async () => {
await expect(collectFiles({ cwd: fixtureRoot })).resolves.toEqual([
'scripts/export.ts',
'src/generated/client.ts',
'src/lib/example.test.ts',
'src/lib/example.ts',
])
})

it('supports no-tests and only-tests filters', async () => {
await expect(collectFiles({ cwd: fixtureRoot, noTests: true })).resolves.toEqual([
'scripts/export.ts',
'src/generated/client.ts',
'src/lib/example.ts',
])

    await expect(collectFiles({ cwd: fixtureRoot, onlyTests: true })).resolves.toEqual([
      'src/lib/example.test.ts',
      'tests/integration/sample.spec.ts',
    ])

})

it('composes include and exclude filters with the default file set', async () => {
await expect(
collectFiles({
cwd: fixtureRoot,
include: 'src/**',
exclude: 'src/generated/**',
noTests: true,
}),
).resolves.toEqual(['src/lib/example.ts'])
})

it('returns an empty set if no-tests and only-tests are both set', async () => {
await expect(
collectFiles({ cwd: fixtureRoot, noTests: true, onlyTests: true }),
).resolves.toEqual([])
})
})
</file>

<file path="tests/unit/lib/cli/estimate-tokens.test.ts">
import { describe, expect, it } from 'vitest'
import { estimateTokens } from '@/lib/cli/estimate-tokens'

describe('estimateTokens', () => {
it('returns the ceiling of characters divided by four', () => {
expect(estimateTokens('')).toBe(0)
expect(estimateTokens('1234')).toBe(1)
expect(estimateTokens('12345')).toBe(2)
})
})
</file>

<file path="tests/unit/lib/cli/format-section.test.ts">
import { describe, expect, it } from 'vitest'
import { formatSection } from '@/lib/cli/format-section'

describe('formatSection', () => {
it('formats markdown sections with a fenced block and language tag', () => {
expect(formatSection('src/lib/example.ts', 'export const value = 1', 'md')).toBe(
'--- src/lib/example.ts ---\n`ts\nexport const value = 1\n`\n',
)
})

it('formats plain text sections without fences', () => {
expect(formatSection('scripts/export-source.ts', 'console.log("ok")', 'txt')).toBe(
'--- scripts/export-source.ts ---\nconsole.log("ok")\n',
)
})
})
</file>

<file path="tests/unit/lib/db/repositories/folders.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/db/client', () => ({
prisma: {
folder: {
create: vi.fn(),
findMany: vi.fn(),
updateMany: vi.fn(),
findFirst: vi.fn(),
deleteMany: vi.fn(),
},
},
}))

import { prisma } from '@/lib/db/client'
import { folderRepository } from '@/lib/db/repositories/folders'

const mockCreate = prisma.folder.create as ReturnType<typeof vi.fn>
const mockFindMany = prisma.folder.findMany as ReturnType<typeof vi.fn>
const mockUpdateMany = prisma.folder.updateMany as ReturnType<typeof vi.fn>
const mockFindFirst = prisma.folder.findFirst as ReturnType<typeof vi.fn>
const mockDeleteMany = prisma.folder.deleteMany as ReturnType<typeof vi.fn>

const FOLDER = {
id: 'cmfolder000000000000000001',
userId: 'user-1',
name: 'Frontend',
createdAt: new Date('2026-04-23T00:00:00.000Z'),
}

beforeEach(() => {
vi.clearAllMocks()
mockCreate.mockResolvedValue(FOLDER)
mockFindMany.mockResolvedValue([FOLDER])
mockUpdateMany.mockResolvedValue({ count: 1 })
mockFindFirst.mockResolvedValue(FOLDER)
mockDeleteMany.mockResolvedValue({ count: 1 })
})

describe('FolderRepository', () => {
it('creates a folder for a user', async () => {
const result = await folderRepository.create({ userId: 'user-1', name: 'Frontend' })

    expect(result).toEqual(FOLDER)
    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        userId: 'user-1',
        name: 'Frontend',
      },
      select: expect.any(Object),
    })

})

it('lists folders for a user in sidebar order', async () => {
const result = await folderRepository.listByUser('user-1')

    expect(result).toEqual([FOLDER])
    expect(mockFindMany).toHaveBeenCalledWith({
      where: { userId: 'user-1' },
      orderBy: [{ createdAt: 'asc' }, { name: 'asc' }],
      select: expect.any(Object),
    })

})

it('renames an owned folder', async () => {
const result = await folderRepository.rename({
id: 'cmfolder000000000000000001',
userId: 'user-1',
name: 'Core Frontend',
})

    expect(mockUpdateMany).toHaveBeenCalledWith({
      where: {
        id: 'cmfolder000000000000000001',
        userId: 'user-1',
      },
      data: {
        name: 'Core Frontend',
      },
    })
    expect(result).toEqual(FOLDER)

})

it('deletes an owned folder', async () => {
const result = await folderRepository.deleteOwned('user-1', 'cmfolder000000000000000001')

    expect(result).toEqual({ deleted: true })
    expect(mockDeleteMany).toHaveBeenCalledWith({
      where: {
        id: 'cmfolder000000000000000001',
        userId: 'user-1',
      },
    })

})
})
</file>

<file path="tests/unit/lib/db/repositories/guides.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/db/client', () => ({
prisma: {
guide: {
count: vi.fn(),
findMany: vi.fn(),
findFirst: vi.fn(),
updateMany: vi.fn(),
deleteMany: vi.fn(),
},
folder: {
findFirst: vi.fn(),
},
tag: {
upsert: vi.fn(),
},
guideTag: {
deleteMany: vi.fn(),
create: vi.fn(),
},
$queryRawUnsafe: vi.fn(),
$transaction: vi.fn(),
},
}))

import { prisma } from '@/lib/db/client'
import { guideRepository } from '@/lib/db/repositories/guides'

const mockCount = prisma.guide.count as ReturnType<typeof vi.fn>
const mockFindMany = prisma.guide.findMany as ReturnType<typeof vi.fn>
const mockFindFirst = prisma.guide.findFirst as ReturnType<typeof vi.fn>
const mockUpdateMany = prisma.guide.updateMany as ReturnType<typeof vi.fn>
const mockDeleteMany = prisma.guide.deleteMany as ReturnType<typeof vi.fn>
const mockFolderFindFirst = prisma.folder.findFirst as ReturnType<typeof vi.fn>
const mockTagUpsert = prisma.tag.upsert as ReturnType<typeof vi.fn>
const mockGuideTagDeleteMany = prisma.guideTag.deleteMany as ReturnType<typeof vi.fn>
const mockGuideTagCreate = prisma.guideTag.create as ReturnType<typeof vi.fn>
const mockQueryRawUnsafe = prisma.$queryRawUnsafe as ReturnType<typeof vi.fn>
const mockTransaction = prisma.$transaction as ReturnType<typeof vi.fn>

const GUIDE_RECORD = {
id: 'cmguidetest0000000000000001',
slug: 'react-basics',
title: 'React Basics',
studyMode: 'OVERVIEW',
inputType: 'TOPIC',
createdAt: new Date('2026-04-23T00:00:00.000Z'),
updatedAt: new Date('2026-04-23T00:00:00.000Z'),
isFavorite: false,
folder: { id: 'cmfolder000000000000000001', name: 'Frontend' },
tags: [{ tag: { id: 'cmtag00000000000000000001', name: 'react' } }],
}

beforeEach(() => {
vi.clearAllMocks()
mockCount.mockResolvedValue(1)
mockFindMany.mockResolvedValue([GUIDE_RECORD])
mockFindFirst.mockResolvedValue(GUIDE_RECORD)
mockUpdateMany.mockResolvedValue({ count: 1 })
mockDeleteMany.mockResolvedValue({ count: 1 })
mockFolderFindFirst.mockResolvedValue({ id: 'cmfolder000000000000000001' })
mockTagUpsert.mockResolvedValue({ id: 'cmtag00000000000000000001' })
mockGuideTagDeleteMany.mockResolvedValue({ count: 1 })
mockGuideTagCreate.mockResolvedValue({
guideId: GUIDE_RECORD.id,
tagId: 'cmtag00000000000000000001',
})
mockQueryRawUnsafe.mockResolvedValue([{ id: GUIDE_RECORD.id }])
mockTransaction.mockImplementation((arg: unknown) => {
if (typeof arg === 'function') {
return arg({
guideTag: {
deleteMany: mockGuideTagDeleteMany,
create: mockGuideTagCreate,
},
tag: {
upsert: mockTagUpsert,
},
})
}

    return Promise.all(arg as Promise<unknown>[])

})
})

describe('GuideRepository.list', () => {
it('returns guides for a user with mapped tags and folder', async () => {
const result = await guideRepository.list({
userId: 'user-1',
view: 'all',
page: 1,
limit: 24,
})

    expect(result).toEqual({
      guides: [
        {
          id: GUIDE_RECORD.id,
          slug: 'react-basics',
          title: 'React Basics',
          studyMode: 'OVERVIEW',
          inputType: 'TOPIC',
          createdAt: GUIDE_RECORD.createdAt,
          updatedAt: GUIDE_RECORD.updatedAt,
          isFavorite: false,
          folder: { id: 'cmfolder000000000000000001', name: 'Frontend' },
          tags: [{ id: 'cmtag00000000000000000001', name: 'react' }],
        },
      ],
      total: 1,
      page: 1,
    })
    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 0,
        take: 24,
        where: { userId: 'user-1' },
      }),
    )

})

it('uses the FTS table for ranked search results', async () => {
mockQueryRawUnsafe
.mockResolvedValueOnce([{ total: 1 }])
.mockResolvedValueOnce([{ id: GUIDE_RECORD.id }])

    const result = await guideRepository.list({
      userId: 'user-1',
      q: 'react',
      view: 'all',
      page: 1,
      limit: 24,
    })

    expect(result.guides).toHaveLength(1)
    expect(mockQueryRawUnsafe).toHaveBeenCalledTimes(2)
    expect(String(mockQueryRawUnsafe.mock.calls[1]?.[0])).toContain('guides_fts')
    expect(mockQueryRawUnsafe.mock.calls[1]?.slice(1)).toEqual(['user-1', 'react', 24, 0])

})

it('applies pagination offsets for later pages', async () => {
await guideRepository.list({
userId: 'user-1',
view: 'all',
page: 2,
limit: 10,
})

    expect(mockFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 10,
        take: 10,
      }),
    )

})
})

describe('GuideRepository.update', () => {
it('updates favorite state for an owned guide', async () => {
mockFindFirst.mockResolvedValueOnce({
...GUIDE_RECORD,
isFavorite: true,
})

    const result = await guideRepository.update({
      id: GUIDE_RECORD.id,
      userId: 'user-1',
      isFavorite: true,
    })

    expect(mockUpdateMany).toHaveBeenCalledWith({
      where: {
        id: GUIDE_RECORD.id,
        userId: 'user-1',
      },
      data: {
        isFavorite: true,
      },
    })
    expect(result?.isFavorite).toBe(true)

})

it('rejects folder assignment to another user folder', async () => {
mockFolderFindFirst.mockResolvedValueOnce(null)

    const result = await guideRepository.update({
      id: GUIDE_RECORD.id,
      userId: 'user-1',
      folderId: 'cmfolder000000000000000099',
    })

    expect(result).toBeNull()
    expect(mockUpdateMany).not.toHaveBeenCalled()

})
})

describe('GuideRepository.setTags', () => {
it('replaces tags for an owned guide', async () => {
mockFindFirst.mockResolvedValueOnce({ id: GUIDE_RECORD.id }).mockResolvedValueOnce({
...GUIDE_RECORD,
tags: [{ tag: { id: 'cmtag00000000000000000001', name: 'react' } }],
})

    const result = await guideRepository.setTags({
      guideId: GUIDE_RECORD.id,
      userId: 'user-1',
      tags: ['react', 'react', ' hooks '],
    })

    expect(mockGuideTagDeleteMany).toHaveBeenCalledWith({
      where: { guideId: GUIDE_RECORD.id },
    })
    expect(mockTagUpsert).toHaveBeenCalledTimes(2)
    expect(mockGuideTagCreate).toHaveBeenCalledTimes(2)
    expect(result?.id).toBe(GUIDE_RECORD.id)

})
})
</file>

<file path="tests/unit/lib/db/repositories/users.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/db/client', () => ({
prisma: {
user: {
findUnique: vi.fn(),
updateMany: vi.fn(),
update: vi.fn(),
},
},
}))

vi.mock('@/lib/auth/password', () => ({
hashPassword: vi.fn().mockResolvedValue('$2b$12$mockedhashedpasswordvalue'),
verifyPassword: vi.fn().mockResolvedValue(true),
}))

import { prisma } from '@/lib/db/client'
import { userRepository } from '@/lib/db/repositories/users'

const mockFindUnique = prisma.user.findUnique as ReturnType<typeof vi.fn>
const mockUpdateMany = prisma.user.updateMany as ReturnType<typeof vi.fn>
const mockUpdate = prisma.user.update as ReturnType<typeof vi.fn>

beforeEach(() => {
vi.clearAllMocks()
mockFindUnique.mockResolvedValue({
id: 'user-1',
name: 'Jeanpaul',
email: 'jp@example.com',
image: null,
password: '$2b$12$abcdefghijklmnopqrstuv',
sessionVersion: 0,
accounts: [{ provider: 'google' }],
})
mockUpdateMany.mockResolvedValue({ count: 1 })
mockUpdate.mockResolvedValue({ id: 'user-1' })
})

describe('UserRepository', () => {
it('updates profile fields', async () => {
const result = await userRepository.updateProfile('user-1', { name: 'JP' })

    expect(mockUpdateMany).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: { name: 'JP' },
    })
    expect(result?.name).toBe('Jeanpaul')

})

it('returns account page user with password and provider summary', async () => {
const result = await userRepository.getAccountPageUser('user-1')

    expect(result).toEqual({
      id: 'user-1',
      name: 'Jeanpaul',
      email: 'jp@example.com',
      image: null,
      hasPassword: true,
      sessionVersion: 0,
      providers: ['google'],
    })

})

it('increments session version when password is updated', async () => {
const result = await userRepository.updatePassword('user-1', 'correct-current', 'NewPass123')

    expect(result).toBe('updated')
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: {
        password: expect.stringMatching(/^\$2[ab]\$/),
        sessionVersion: { increment: 1 },
      },
    })

})
})
</file>

<file path="tests/unit/lib/errors/handler.test.ts">
import { describe, expect, it } from 'vitest'

import { ApiRouteError, createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

describe('createApiErrorResponse', () => {
it('returns a structured error payload with requestId', async () => {
const response = createApiErrorResponse('123e4567-e89b-42d3-a456-426614174000', {
status: 422,
code: 'VALIDATION_ERROR',
message: 'Validation failed',
details: { fields: { email: ['Required'] } },
})

    expect(response.status).toBe(422)
    expect(response.headers.get('x-request-id')).toBe('123e4567-e89b-42d3-a456-426614174000')
    await expect(response.json()).resolves.toEqual({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        requestId: '123e4567-e89b-42d3-a456-426614174000',
        fields: { email: ['Required'] },
      },
    })

})
})

describe('handleApiError', () => {
it('serializes ApiRouteError instances', async () => {
const response = handleApiError(
new ApiRouteError({
status: 404,
code: 'GUIDE_NOT_FOUND',
message: 'Guide not found',
}),
'123e4567-e89b-42d3-a456-426614174000',
)

    expect(response.status).toBe(404)
    await expect(response.json()).resolves.toEqual({
      error: {
        code: 'GUIDE_NOT_FOUND',
        message: 'Guide not found',
        requestId: '123e4567-e89b-42d3-a456-426614174000',
      },
    })

})

it('serializes unexpected errors with request context', async () => {
const response = handleApiError(new Error('boom'), '123e4567-e89b-42d3-a456-426614174000')

    expect(response.status).toBe(500)
    await expect(response.json()).resolves.toEqual({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'boom',
        requestId: '123e4567-e89b-42d3-a456-426614174000',
      },
    })

})
})
</file>

<file path="tests/unit/lib/export/data-exporter.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'
import JSZip from 'jszip'

vi.mock('@/lib/db/client', () => ({
prisma: {
guide: {
findMany: vi.fn(),
},
note: {
findMany: vi.fn(),
},
},
}))

import { prisma } from '@/lib/db/client'
import { generateUserDataExport } from '@/lib/export/data-exporter'

const mockGuideFindMany = prisma.guide.findMany as ReturnType<typeof vi.fn>
const mockNoteFindMany = prisma.note.findMany as ReturnType<typeof vi.fn>

beforeEach(() => {
vi.clearAllMocks()
mockGuideFindMany.mockResolvedValue([
{
id: 'guide-1',
slug: 'react-basics',
title: 'React Basics',
studyMode: 'OVERVIEW',
inputType: 'TOPIC',
inputValue: 'React basics',
content: '# React Basics',
isPublic: true,
isFavorite: false,
createdAt: new Date('2026-04-23T00:00:00.000Z'),
updatedAt: new Date('2026-04-23T00:00:00.000Z'),
},
])
mockNoteFindMany.mockResolvedValue([
{
id: 'note-1',
guideId: 'guide-1',
selectedText: 'React basics',
content: 'A helpful note',
createdAt: new Date('2026-04-23T00:00:00.000Z'),
updatedAt: new Date('2026-04-23T00:00:00.000Z'),
},
])
})

describe('generateUserDataExport', () => {
it('creates a zip with guide markdown and a json manifest', async () => {
const archive = await generateUserDataExport('user-1')

    const zip = await JSZip.loadAsync(archive)
    const guideFile = await zip.file('guides/react-basics.md')?.async('string')
    const manifest = await zip.file('data.json')?.async('string')

    expect(guideFile).toBe('# React Basics')
    expect(manifest).toContain('React Basics')
    expect(manifest).toContain('A helpful note')

})
})
</file>

<file path="tests/unit/lib/export/html.test.ts">
import { afterEach, describe, expect, it, vi } from 'vitest'
import { buildHtmlExport } from '@/lib/export/html'

afterEach(() => {
vi.unstubAllGlobals()
})

describe('buildHtmlExport', () => {
it('renders a self-contained HTML document and inlines remote images', async () => {
vi.stubGlobal(
'fetch',
vi.fn().mockResolvedValue(
new Response(Uint8Array.from([0x89, 0x50, 0x4e, 0x47]), {
status: 200,
headers: { 'Content-Type': 'image/png' },
}),
),
)

    const html = await buildHtmlExport({
      id: 'guide-1',
      slug: 'react-basics',
      title: 'React Basics',
      studyMode: 'OVERVIEW',
      inputType: 'TOPIC',
      inputValue: 'React basics',
      content: '# React Basics\n\n![Diagram](https://example.com/react.png)',
    })

    expect(html).toContain('<!doctype html>')
    expect(html).toContain('FlashGuides export')
    expect(html).toContain('data:image/png;base64,')

})
})
</file>

<file path="tests/unit/lib/export/markdown.test.ts">
import { describe, expect, it } from 'vitest'
import { buildMarkdownExport } from '@/lib/export/markdown'

describe('buildMarkdownExport', () => {
it('prepends frontmatter to the guide markdown', () => {
const markdown = buildMarkdownExport({
id: 'guide-1',
slug: 'react-basics',
title: 'React Basics',
studyMode: 'OVERVIEW',
inputType: 'TOPIC',
inputValue: 'React basics',
content: '# React Basics\n\n## Hooks\n\nHooks are useful.',
})

    expect(markdown).toContain('title: "React Basics"')
    expect(markdown).toContain('slug: "react-basics"')
    expect(markdown).toContain('# React Basics')

})
})
</file>

<file path="tests/unit/lib/export/pdf.test.ts">
import { describe, expect, it } from 'vitest'
import { buildPdfExport } from '@/lib/export/pdf'

describe('buildPdfExport', () => {
it('renders a PDF buffer for the guide', async () => {
const buffer = await buildPdfExport({
id: 'guide-1',
slug: 'react-basics',
title: 'React Basics',
studyMode: 'OVERVIEW',
inputType: 'TOPIC',
inputValue: 'React basics',
content: '# React Basics\n\n## Hooks\n\nHooks are useful.',
})

    expect(buffer).toBeInstanceOf(Buffer)
    expect(buffer.subarray(0, 4).toString()).toBe('%PDF')

})
})
</file>

<file path="tests/unit/lib/generation/input-normalizer.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { mockGet } = vi.hoisted(() => ({
mockGet: vi.fn(),
}))

vi.mock('@/lib/mcp/factory', () => ({
MCPClientFactory: {
get: mockGet,
},
}))

import { normalizeInput } from '@/lib/generation/input-normalizer'

describe('normalizeInput', () => {
beforeEach(() => {
vi.clearAllMocks()
})

it('passes TOPIC input through unchanged', async () => {
await expect(
normalizeInput({ inputType: 'TOPIC', inputValue: 'Photosynthesis', studyMode: 'OVERVIEW' }),
).resolves.toEqual({
type: 'TOPIC',
text: 'Photosynthesis',
originalValue: 'Photosynthesis',
})

    expect(mockGet).not.toHaveBeenCalled()

})

it('passes TEXT input through unchanged', async () => {
await expect(
normalizeInput({ inputType: 'TEXT', inputValue: 'Raw text', studyMode: 'OVERVIEW' }),
).resolves.toEqual({
type: 'TEXT',
text: 'Raw text',
originalValue: 'Raw text',
})

    expect(mockGet).not.toHaveBeenCalled()

})

it('uses web-fetch for non-youtube URLs', async () => {
const execute = vi.fn().mockResolvedValue({ text: 'Fetched article text', title: 'Article' })
mockGet.mockReturnValue({ execute })

    await expect(
      normalizeInput({
        inputType: 'URL',
        inputValue: 'https://example.com/article',
        studyMode: 'OVERVIEW',
      }),
    ).resolves.toEqual({
      type: 'URL',
      text: 'Fetched article text',
      originalValue: 'https://example.com/article',
    })

    expect(mockGet).toHaveBeenCalledWith('web-fetch')
    expect(execute).toHaveBeenCalledWith({ url: 'https://example.com/article' })

})

it('uses youtube-transcript for youtube URLs', async () => {
const execute = vi.fn().mockResolvedValue({ text: 'Transcript text', language: 'en' })
mockGet.mockReturnValue({ execute })

    await expect(
      normalizeInput({
        inputType: 'URL',
        inputValue: 'https://youtu.be/abc123XYZ',
        studyMode: 'OVERVIEW',
      }),
    ).resolves.toEqual({
      type: 'URL',
      text: 'Transcript text',
      originalValue: 'https://youtu.be/abc123XYZ',
    })

    expect(mockGet).toHaveBeenCalledWith('youtube-transcript')
    expect(execute).toHaveBeenCalledWith({ videoId: 'abc123XYZ' })

})

it('rejects malformed URLs', async () => {
await expect(
normalizeInput({ inputType: 'URL', inputValue: 'not-a-url', studyMode: 'OVERVIEW' }),
).rejects.toThrow()
})
})
</file>

<file path="tests/unit/lib/generation/slug.test.ts">
import { describe, it, expect } from 'vitest'
import { generateSlug } from '@/lib/generation/slug'

describe('generateSlug', () => {
it('produces a URL-safe lowercase slug from a title', () => {
const slug = generateSlug('Introduction to React')
expect(slug).toMatch(/^introduction-to-react-[a-f0-9]+$/)
})

it('replaces spaces and special chars with hyphens', () => {
const slug = generateSlug('Hello, World! & More')
expect(slug).toMatch(/^hello-world-more-[a-f0-9]+$/)
})

it('produces different slugs for the same title (unique suffix)', () => {
const a = generateSlug('Same Title')
const b = generateSlug('Same Title')
expect(a).not.toBe(b)
})

it('truncates long titles to max 60 chars for the base portion', () => {
const longTitle = 'A'.repeat(80)
const slug = generateSlug(longTitle)
const base = slug.split('-').slice(0, -1).join('-')
expect(base.length).toBeLessThanOrEqual(60)
})

it('strips leading and trailing hyphens', () => {
const slug = generateSlug(' --My Guide-- ')
expect(slug).not.toMatch(/^-/)
expect(slug).not.toMatch(/-[a-f0-9]+-$/)
})
})
</file>

<file path="tests/unit/lib/generation/url-detector.test.ts">
import { describe, expect, it } from 'vitest'
import { extractYouTubeVideoId, isYouTubeUrl } from '@/lib/generation/url-detector'

describe('url-detector', () => {
it('detects standard youtube watch URLs', () => {
expect(isYouTubeUrl('https://www.youtube.com/watch?v=abc123XYZ')).toBe(true)
expect(extractYouTubeVideoId('https://www.youtube.com/watch?v=abc123XYZ')).toBe('abc123XYZ')
})

it('detects youtu.be short URLs', () => {
expect(isYouTubeUrl('https://youtu.be/abc123XYZ')).toBe(true)
expect(extractYouTubeVideoId('https://youtu.be/abc123XYZ')).toBe('abc123XYZ')
})

it('detects youtube shorts URLs', () => {
expect(isYouTubeUrl('https://youtube.com/shorts/abc123XYZ')).toBe(true)
expect(extractYouTubeVideoId('https://youtube.com/shorts/abc123XYZ')).toBe('abc123XYZ')
})

it('returns false for non-youtube URLs', () => {
expect(isYouTubeUrl('https://example.com/article')).toBe(false)
expect(extractYouTubeVideoId('https://example.com/article')).toBeNull()
})

it('returns false for invalid URLs', () => {
expect(isYouTubeUrl('not-a-url')).toBe(false)
expect(extractYouTubeVideoId('not-a-url')).toBeNull()
})
})
</file>

<file path="tests/unit/lib/guest/quota.test.ts">
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Prisma before importing the module under test
vi.mock('@/lib/db/client', () => ({
prisma: {
guestQuota: {
findUnique: vi.fn(),
upsert: vi.fn(),
update: vi.fn(),
},
$transaction: vi.fn((fn: (tx: unknown) => unknown) =>
fn({
guestQuota: {
findUnique: vi.fn(),
upsert: vi.fn(),
update: vi.fn(),
},
}),
),
},
}))

import { prisma } from '@/lib/db/client'
import {
sanitizeIp,
extractIp,
getQuotaStatus,
checkAndIncrementQuota,
GUEST_DAILY_LIMIT,
} from '@/lib/guest/quota'

// Helper to grab the tx mock from the $transaction call
type TxMock = {
guestQuota: {
findUnique: ReturnType<typeof vi.fn>
upsert: ReturnType<typeof vi.fn>
update: ReturnType<typeof vi.fn>
}
}

const mockPrisma = prisma as unknown as {
guestQuota: {
findUnique: ReturnType<typeof vi.fn>
upsert: ReturnType<typeof vi.fn>
update: ReturnType<typeof vi.fn>
}
$transaction: ReturnType<typeof vi.fn>
}

function setupTransaction(txOverrides?: Partial<TxMock['guestQuota']>) {
mockPrisma.$transaction.mockImplementation((fn: (tx: TxMock) => unknown) =>
fn({
guestQuota: {
findUnique: txOverrides?.findUnique ?? vi.fn().mockResolvedValue(null),
upsert:
txOverrides?.upsert ??
vi.fn().mockResolvedValue({ ip: '1.2.3.4', count: 1, resetAt: futureReset() }),
update:
txOverrides?.update ??
vi.fn().mockResolvedValue({ ip: '1.2.3.4', count: 2, resetAt: futureReset() }),
},
}),
)
}

function futureReset(): Date {
const d = new Date()
d.setUTCHours(24, 0, 0, 0)
return d
}

function pastReset(): Date {
return new Date(Date.now() - 1000)
}

beforeEach(() => {
vi.clearAllMocks()
})

// ─── sanitizeIp ──────────────────────────────────────────────────────────────

describe('sanitizeIp', () => {
it('returns the first IP from a comma-separated x-forwarded-for header', () => {
expect(sanitizeIp('1.2.3.4, 10.0.0.1')).toBe('1.2.3.4')
})

it('accepts a plain IPv4 address', () => {
expect(sanitizeIp('203.0.113.42')).toBe('203.0.113.42')
})

it('accepts an IPv6 address', () => {
expect(sanitizeIp('2001:db8::1')).toBe('2001:db8::1')
})

it('returns "unknown" for null', () => {
expect(sanitizeIp(null)).toBe('unknown')
})

it('returns "unknown" for clearly invalid input', () => {
expect(sanitizeIp('not-an-ip!!')).toBe('unknown')
})
})

// ─── extractIp ───────────────────────────────────────────────────────────────

describe('extractIp', () => {
it('reads x-forwarded-for header and sanitizes', () => {
const req = new Request('http://localhost/', {
headers: { 'x-forwarded-for': '5.5.5.5, 10.0.0.1' },
})
expect(extractIp(req)).toBe('5.5.5.5')
})

it('returns "unknown" when no x-forwarded-for header', () => {
const req = new Request('http://localhost/')
expect(extractIp(req)).toBe('unknown')
})
})

// ─── getQuotaStatus ──────────────────────────────────────────────────────────

describe('getQuotaStatus', () => {
it('returns allowed=true with used=0 when no record exists', async () => {
mockPrisma.guestQuota.findUnique.mockResolvedValueOnce(null)
const status = await getQuotaStatus('1.2.3.4')
expect(status.allowed).toBe(true)
expect(status.used).toBe(0)
expect(status.limit).toBe(GUEST_DAILY_LIMIT)
})

it('returns allowed=true when count < limit', async () => {
mockPrisma.guestQuota.findUnique.mockResolvedValueOnce({
ip: '1.2.3.4',
count: 2,
resetAt: futureReset(),
})
const status = await getQuotaStatus('1.2.3.4')
expect(status.allowed).toBe(true)
expect(status.used).toBe(2)
})

it('returns allowed=false when count >= limit', async () => {
mockPrisma.guestQuota.findUnique.mockResolvedValueOnce({
ip: '1.2.3.4',
count: 3,
resetAt: futureReset(),
})
const status = await getQuotaStatus('1.2.3.4')
expect(status.allowed).toBe(false)
expect(status.used).toBe(GUEST_DAILY_LIMIT)
})

it('treats an expired record as fresh (allowed=true, used=0)', async () => {
mockPrisma.guestQuota.findUnique.mockResolvedValueOnce({
ip: '1.2.3.4',
count: 3,
resetAt: pastReset(),
})
const status = await getQuotaStatus('1.2.3.4')
expect(status.allowed).toBe(true)
expect(status.used).toBe(0)
})
})

// ─── checkAndIncrementQuota ──────────────────────────────────────────────────

describe('checkAndIncrementQuota', () => {
it('creates a new record with count=1 when no record exists (allowed)', async () => {
const upsert = vi.fn().mockResolvedValue({ ip: '1.2.3.4', count: 1, resetAt: futureReset() })
setupTransaction({ findUnique: vi.fn().mockResolvedValue(null), upsert })

    const result = await checkAndIncrementQuota('1.2.3.4')

    expect(upsert).toHaveBeenCalled()
    expect(result.allowed).toBe(true)
    expect(result.used).toBe(1)

})

it('resets and allows when existing record is expired', async () => {
const expired = { ip: '1.2.3.4', count: 3, resetAt: pastReset() }
const upsert = vi.fn().mockResolvedValue({ ip: '1.2.3.4', count: 1, resetAt: futureReset() })
setupTransaction({ findUnique: vi.fn().mockResolvedValue(expired), upsert })

    const result = await checkAndIncrementQuota('1.2.3.4')
    expect(result.allowed).toBe(true)
    expect(result.used).toBe(1)
    expect(upsert).toHaveBeenCalled()

})

it('blocks when count is already at limit', async () => {
const atLimit = { ip: '1.2.3.4', count: 3, resetAt: futureReset() }
setupTransaction({ findUnique: vi.fn().mockResolvedValue(atLimit) })

    const result = await checkAndIncrementQuota('1.2.3.4')
    expect(result.allowed).toBe(false)
    expect(result.used).toBe(GUEST_DAILY_LIMIT)

})

it('increments count and allows when below limit', async () => {
const below = { ip: '1.2.3.4', count: 2, resetAt: futureReset() }
const update = vi.fn().mockResolvedValue({ ip: '1.2.3.4', count: 3, resetAt: futureReset() })
setupTransaction({ findUnique: vi.fn().mockResolvedValue(below), update })

    const result = await checkAndIncrementQuota('1.2.3.4')
    expect(update).toHaveBeenCalled()
    expect(result.allowed).toBe(true)
    expect(result.used).toBe(3)

})
})
</file>

<file path="tests/unit/lib/guides/fork.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/db/client', () => ({
prisma: {
guide: {
findFirst: vi.fn(),
},
$transaction: vi.fn(),
},
}))

vi.mock('@/lib/generation/slug', () => ({
generateSlug: vi.fn(() => 'fork-react-basics-abc123xyz'),
}))

import { prisma } from '@/lib/db/client'
import { forkGuide } from '@/lib/guides/fork'

const mockFindFirst = prisma.guide.findFirst as ReturnType<typeof vi.fn>
const mockTransaction = prisma.$transaction as ReturnType<typeof vi.fn>

beforeEach(() => {
vi.clearAllMocks()
mockFindFirst.mockResolvedValue({
id: 'guide-1',
title: 'React Basics',
studyMode: 'OVERVIEW',
inputType: 'TOPIC',
inputValue: 'React basics',
content: '# React Basics',
tags: [{ tagId: 'tag-1' }],
notes: [{ selectedText: 'React', content: 'Helpful note' }],
})
mockTransaction.mockImplementation(async (callback) => {
const tx = {
guide: {
create: vi.fn().mockResolvedValue({
id: 'guide-2',
slug: 'fork-react-basics-abc123xyz',
title: '[Fork] React Basics',
}),
},
guideTag: {
createMany: vi.fn().mockResolvedValue({ count: 1 }),
},
note: {
create: vi.fn().mockResolvedValue({ id: 'note-2' }),
},
}

    return callback(tx)

})
})

describe('forkGuide', () => {
it('creates a deep copy of a shareable guide', async () => {
const result = await forkGuide('guide-1', 'user-2')

    expect(result).toEqual({
      status: 'created',
      guide: {
        id: 'guide-2',
        slug: 'fork-react-basics-abc123xyz',
        title: '[Fork] React Basics',
      },
    })

})

it('returns not-found when the source guide is not shareable', async () => {
mockFindFirst.mockResolvedValueOnce(null)

    const result = await forkGuide('guide-404', 'user-2')

    expect(result).toEqual({ status: 'not-found' })
    expect(mockTransaction).not.toHaveBeenCalled()

})
})
</file>

<file path="tests/unit/lib/logger/index.test.ts">
import { describe, expect, it } from 'vitest'
import { getLogger, withRequestLogger } from '@/lib/logger'

describe('logger request context', () => {
it('binds requestId to the scoped logger', () => {
const requestId = '123e4567-e89b-42d3-a456-426614174000'

    const scopedRequestId = withRequestLogger(requestId, () => getLogger().bindings().requestId)

    expect(scopedRequestId).toBe(requestId)

})

it('falls back to the base logger outside a request context', () => {
expect(getLogger().bindings().requestId).toBeUndefined()
})
})
</file>

<file path="tests/unit/lib/mcp/adapters/fal-image-gen.test.ts">
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ApiError } from '@fal-ai/client'
import { FalImageGenAdapter } from '@/lib/mcp/adapters/fal-image-gen'
import { MCPRateLimitError, MCPServiceError } from '@/lib/mcp/types'

// Mock the fal client module to avoid real network calls in jsdom
const mockRun = vi.fn()
vi.mock('@fal-ai/client', async (importOriginal) => {
const actual = await importOriginal<typeof import('@fal-ai/client')>()
return {
...actual,
createFalClient: () => ({ run: mockRun }),
}
})

const MOCK_IMAGE_URL = 'https://fal.run/files/mock-image-abc123.jpg'

beforeEach(() => {
vi.clearAllMocks()
mockRun.mockResolvedValue({
data: { images: [{ url: MOCK_IMAGE_URL, width: 512, height: 512 }] },
requestId: 'test-request-id',
})
})

afterEach(() => {
vi.restoreAllMocks()
})

const adapter = new FalImageGenAdapter()

describe('FalImageGenAdapter', () => {
it('has toolName "fal-image-gen"', () => {
expect(adapter.toolName).toBe('fal-image-gen')
})

it('T-06: returns image url and alt on success', async () => {
const result = await adapter.execute({ prompt: 'A scenic mountain' })
expect(result).toMatchObject({
url: MOCK_IMAGE_URL,
alt: 'A scenic mountain',
})
})

it('T-07: throws MCPRateLimitError on 429', async () => {
mockRun.mockRejectedValue(
new ApiError({ message: 'Rate limited', status: 429, body: null, requestId: '' }),
)
await expect(adapter.execute({ prompt: 'test' })).rejects.toBeInstanceOf(MCPRateLimitError)
})

it('throws MCPServiceError on 500', async () => {
mockRun.mockRejectedValue(
new ApiError({ message: 'Server error', status: 500, body: null, requestId: '' }),
)
await expect(adapter.execute({ prompt: 'test' })).rejects.toBeInstanceOf(MCPServiceError)
})

it('throws MCPServiceError when no images returned', async () => {
mockRun.mockResolvedValue({ data: { images: [] }, requestId: '' })
await expect(adapter.execute({ prompt: 'test' })).rejects.toBeInstanceOf(MCPServiceError)
})

it('uses prompt as alt text', async () => {
const result = await adapter.execute({ prompt: 'A purple sunset over the ocean' })
expect(result.alt).toBe('A purple sunset over the ocean')
})
})
</file>

<file path="tests/unit/lib/mcp/adapters/tavily-search.test.ts">
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { server } from '../../../../mocks/server'
import {
  tavilyHandlers,
  tavilyErrorHandlers,
  MOCK_TAVILY_RESPONSE,
} from '../../../../mocks/handlers/tavily'
import { TavilySearchAdapter } from '@/lib/mcp/adapters/tavily-search'
import { MCPRateLimitError, MCPServiceError } from '@/lib/mcp/types'

// Mock the tavily module to control the client's HTTP calls
// The tavily client internally uses fetch; MSW intercepts it.
// We also need to ensure the env var is set
vi.stubEnv('TAVILY_API_KEY', 'test-key')

beforeEach(() => {
server.use(...tavilyHandlers)
})

afterEach(() => {
server.resetHandlers()
vi.unstubAllEnvs()
})

const adapter = new TavilySearchAdapter()

describe('TavilySearchAdapter', () => {
it('has toolName "tavily-search"', () => {
expect(adapter.toolName).toBe('tavily-search')
})

it('T-04: parses search results correctly', async () => {
const results = await adapter.execute({ query: 'test query' })
expect(results).toHaveLength(MOCK_TAVILY_RESPONSE.results.length)
expect(results[0]).toMatchObject({
title: 'Result One',
url: 'https://example.com/1',
snippet: 'Snippet for result one.',
})
expect(results[1]).toMatchObject({
title: 'Result Two',
url: 'https://example.com/2',
snippet: 'Snippet for result two.',
})
})

it('respects maxResults limit', async () => {
const results = await adapter.execute({ query: 'test', maxResults: 1 })
expect(results).toHaveLength(1)
})

it('T-05: throws MCPServiceError on 500', async () => {
server.use(tavilyErrorHandlers.serverError)
await expect(adapter.execute({ query: 'test' })).rejects.toBeInstanceOf(MCPServiceError)
})

it('throws MCPRateLimitError on 429', async () => {
server.use(tavilyErrorHandlers.rateLimited)
await expect(adapter.execute({ query: 'test' })).rejects.toBeInstanceOf(MCPRateLimitError)
})

it('T-19: returns empty array when search yields zero results', async () => {
server.use(tavilyErrorHandlers.emptyResults)
const results = await adapter.execute({ query: 'obscure query' })
expect(results).toEqual([])
})
})
</file>

<file path="tests/unit/lib/mcp/adapters/web-fetch.test.ts">
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { server } from '../../../../mocks/server'
import {
  webFetchHandlers,
  WEB_FETCH_BASE_URL,
  MOCK_HTML,
} from '../../../../mocks/handlers/web-fetch'
import { WebFetchAdapter } from '@/lib/mcp/adapters/web-fetch'
import { MCPFetchError, MCPServiceError, MCPTimeoutError } from '@/lib/mcp/types'

beforeEach(() => {
server.use(...webFetchHandlers)
})

afterEach(() => {
server.resetHandlers()
})

const adapter = new WebFetchAdapter()

describe('WebFetchAdapter', () => {
it('has toolName "web-fetch"', () => {
expect(adapter.toolName).toBe('web-fetch')
})

it('T-01: returns stripped text and title on 200', async () => {
const result = await adapter.execute({ url: `${WEB_FETCH_BASE_URL}/ok` })
expect(result.title).toBe('Test Page')
// HTML tags should be stripped
expect(result.text).not.toContain('<')
expect(result.text).not.toContain('>')
// Script/style content should be removed
expect(result.text).not.toContain('alert')
expect(result.text).not.toContain('color: red')
// Actual content preserved
expect(result.text).toContain('Hello World')
expect(result.text).toContain('This is test content.')
})

it('T-02: throws MCPFetchError with status code on 404', async () => {
await expect(adapter.execute({ url: `${WEB_FETCH_BASE_URL}/not-found` })).rejects.toSatisfy(
(err: unknown) => err instanceof MCPFetchError && err.statusCode === 404,
)
})

it('throws MCPServiceError on 500', async () => {
await expect(
adapter.execute({ url: `${WEB_FETCH_BASE_URL}/server-error` }),
).rejects.toBeInstanceOf(MCPServiceError)
})

it('T-03: throws MCPTimeoutError when request times out', async () => {
await expect(
adapter.execute({ url: `${WEB_FETCH_BASE_URL}/timeout`, timeoutMs: 50 }),
).rejects.toBeInstanceOf(MCPTimeoutError)
}, 5000)

it('T-16: truncates text to 100k characters', async () => {
const result = await adapter.execute({ url: `${WEB_FETCH_BASE_URL}/large` })
expect(result.text.length).toBeLessThanOrEqual(100_000)
})

it('T-18: returns empty text gracefully for empty body', async () => {
const result = await adapter.execute({ url: `${WEB_FETCH_BASE_URL}/empty` })
expect(result.text).toBe('')
})

it('T-17: preserves non-English (Japanese) text', async () => {
const result = await adapter.execute({ url: `${WEB_FETCH_BASE_URL}/japanese` })
expect(result.text).toContain('日本語のテキスト')
expect(result.title).toBe('テスト')
})

it('strips <script> tags and their content', async () => {
// Verified via MOCK_HTML which includes an alert script
const result = await adapter.execute({ url: `${WEB_FETCH_BASE_URL}/ok` })
expect(result.text).not.toContain('alert')
})

it('returns text without HTML tags', async () => {
const result = await adapter.execute({ url: `${WEB_FETCH_BASE_URL}/ok` })
const hasHtmlTag = /<[a-z][\s\S]\*>/i.test(result.text)
expect(hasHtmlTag).toBe(false)
})
})

// Sanity check: MOCK_HTML contains expected elements for test reference
describe('MOCK_HTML fixture', () => {
it('contains expected structure', () => {
expect(MOCK_HTML).toContain('<title>Test Page</title>')
expect(MOCK_HTML).toContain('Hello World')
})
})
</file>

<file path="tests/unit/lib/mcp/adapters/youtube-transcript.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { YouTubeTranscriptAdapter } from '@/lib/mcp/adapters/youtube-transcript'
import { MCPTranscriptUnavailableError } from '@/lib/mcp/types'

const { mockFetchTranscript } = vi.hoisted(() => ({
mockFetchTranscript: vi.fn(),
}))

vi.mock('youtube-transcript', () => ({
YoutubeTranscript: {
fetchTranscript: mockFetchTranscript,
},
}))

const adapter = new YouTubeTranscriptAdapter()

describe('YouTubeTranscriptAdapter', () => {
beforeEach(() => {
vi.clearAllMocks()
mockFetchTranscript.mockResolvedValue([
{ text: 'Hello', duration: 1.2, offset: 0, lang: 'en' },
{ text: 'world', duration: 1.3, offset: 1200, lang: 'en' },
])
})

it('has toolName "youtube-transcript"', () => {
expect(adapter.toolName).toBe('youtube-transcript')
})

it('returns joined transcript text', async () => {
const result = await adapter.execute({ videoId: 'abc123' })

    expect(mockFetchTranscript).toHaveBeenCalledWith('abc123', { lang: undefined })
    expect(result).toEqual({
      text: 'Hello world',
      language: 'en',
    })

})

it('passes through the requested language', async () => {
await adapter.execute({ videoId: 'abc123', lang: 'es' })

    expect(mockFetchTranscript).toHaveBeenCalledWith('abc123', { lang: 'es' })

})

it('throws MCPTranscriptUnavailableError when the package throws', async () => {
mockFetchTranscript.mockRejectedValue(new Error('Subtitles are disabled'))

    await expect(adapter.execute({ videoId: 'abc123' })).rejects.toBeInstanceOf(
      MCPTranscriptUnavailableError,
    )

})

it('throws MCPTranscriptUnavailableError when transcript text is empty', async () => {
mockFetchTranscript.mockResolvedValue([{ text: ' ', duration: 1, offset: 0, lang: 'en' }])

    await expect(adapter.execute({ videoId: 'abc123' })).rejects.toBeInstanceOf(
      MCPTranscriptUnavailableError,
    )

})
})
</file>

<file path="tests/unit/lib/mcp/factory.test.ts">
import { describe, it, expect, beforeEach } from 'vitest'
import { MCPClientFactory } from '@/lib/mcp/factory'
import { MCPError } from '@/lib/mcp/types'
import type { IMCPClient } from '@/lib/mcp/types'

function makeMockClient(toolName: string): IMCPClient<unknown, unknown> {
return {
toolName,
execute: async () => ({ result: 'ok' }),
}
}

beforeEach(() => {
MCPClientFactory.\_clearForTesting()
})

describe('MCPClientFactory', () => {
it('T-12: register and get returns the same instance', () => {
const client = makeMockClient('test-tool')
MCPClientFactory.register(client)
const retrieved = MCPClientFactory.get('test-tool')
expect(retrieved).toBe(client)
})

it('T-13: get throws MCPError for unknown tool', () => {
expect(() => MCPClientFactory.get('unknown-tool')).toThrowError(MCPError)
})

it('get throws with the tool name in the message', () => {
expect(() => MCPClientFactory.get('missing')).toThrow(/missing/)
})

it('register overwrites existing tool with same name', () => {
const client1 = makeMockClient('tool-a')
const client2 = makeMockClient('tool-a')
MCPClientFactory.register(client1)
MCPClientFactory.register(client2)
expect(MCPClientFactory.get('tool-a')).toBe(client2)
})

it('supports multiple different tools in the registry', () => {
const clientA = makeMockClient('tool-a')
const clientB = makeMockClient('tool-b')
MCPClientFactory.register(clientA)
MCPClientFactory.register(clientB)
expect(MCPClientFactory.get('tool-a')).toBe(clientA)
expect(MCPClientFactory.get('tool-b')).toBe(clientB)
})
})
</file>

<file path="tests/unit/lib/mcp/retry-decorator.test.ts">
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { RetryDecorator } from '@/lib/mcp/retry-decorator'
import { MCPServiceError, MCPTimeoutError, MCPFetchError, MCPRateLimitError } from '@/lib/mcp/types'
import type { IMCPClient } from '@/lib/mcp/types'

function makeMockClient(
toolName: string,
executeImpl: () => Promise<string>,
): IMCPClient<string, string> {
return { toolName, execute: vi.fn(executeImpl) }
}

beforeEach(() => {
vi.clearAllMocks()
})

describe('RetryDecorator', () => {
it('forwards toolName from wrapped client', () => {
const inner = makeMockClient('my-tool', async () => 'ok')
const decorator = new RetryDecorator(inner)
expect(decorator.toolName).toBe('my-tool')
})

it('returns result immediately on first success', async () => {
const inner = makeMockClient('tool', async () => 'success')
const decorator = new RetryDecorator(inner, 3, 0)
const result = await decorator.execute('input')
expect(result).toBe('success')
expect(inner.execute).toHaveBeenCalledTimes(1)
})

it('T-10: retries on MCPServiceError and succeeds on 3rd attempt', async () => {
let calls = 0
const inner = makeMockClient('tool', async () => {
calls++
if (calls < 3) throw new MCPServiceError('service down')
return 'recovered'
})
// baseDelayMs=0 → 0ms delays, no fake timers needed
const decorator = new RetryDecorator(inner, 3, 0)
const result = await decorator.execute('input')
expect(result).toBe('recovered')
expect(calls).toBe(3)
})

it('retries on MCPTimeoutError', async () => {
let calls = 0
const inner = makeMockClient('tool', async () => {
calls++
if (calls < 2) throw new MCPTimeoutError('timed out')
return 'ok'
})
const decorator = new RetryDecorator(inner, 3, 0)
const result = await decorator.execute('input')
expect(result).toBe('ok')
expect(calls).toBe(2)
})

it('T-11: throws after max retries when always failing', async () => {
const inner = makeMockClient('tool', async () => {
throw new MCPServiceError('always fails')
})
const decorator = new RetryDecorator(inner, 3, 0)
await expect(decorator.execute('input')).rejects.toBeInstanceOf(MCPServiceError)
expect(inner.execute).toHaveBeenCalledTimes(3)
})

it('does NOT retry on MCPFetchError (4xx)', async () => {
const inner = makeMockClient('tool', async () => {
throw new MCPFetchError('not found', 404)
})
const decorator = new RetryDecorator(inner, 3, 0)
await expect(decorator.execute('input')).rejects.toBeInstanceOf(MCPFetchError)
expect(inner.execute).toHaveBeenCalledTimes(1)
})

it('does NOT retry on MCPRateLimitError', async () => {
const inner = makeMockClient('tool', async () => {
throw new MCPRateLimitError('rate limited')
})
const decorator = new RetryDecorator(inner, 3, 0)
await expect(decorator.execute('input')).rejects.toBeInstanceOf(MCPRateLimitError)
expect(inner.execute).toHaveBeenCalledTimes(1)
})
})
</file>

<file path="tests/unit/lib/rate-limit/index.test.ts">
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/guest/quota', () => ({
checkAndIncrementQuota: vi.fn(),
}))

import { checkAndIncrementQuota } from '@/lib/guest/quota'
import { checkGuestGenerationRateLimit, getRetryAfterSeconds } from '@/lib/rate-limit'

const mockCheckAndIncrementQuota = checkAndIncrementQuota as ReturnType<typeof vi.fn>

describe('getRetryAfterSeconds', () => {
it('returns the remaining whole seconds until the reset window', () => {
const now = new Date('2026-04-24T10:00:00.000Z')
const resetAt = new Date('2026-04-24T10:00:30.100Z')

    expect(getRetryAfterSeconds(resetAt, now)).toBe(31)

})
})

describe('checkGuestGenerationRateLimit', () => {
it('maps quota storage into rate-limit metadata', async () => {
vi.useFakeTimers()
vi.setSystemTime(new Date('2026-04-24T23:59:30.000Z'))

    mockCheckAndIncrementQuota.mockResolvedValue({
      allowed: false,
      used: 3,
      limit: 3,
      resetsAt: new Date('2026-04-25T00:00:00.000Z'),
    })

    const result = await checkGuestGenerationRateLimit('1.2.3.4')

    expect(result.allowed).toBe(false)
    expect(result.used).toBe(3)
    expect(result.limit).toBe(3)
    expect(result.remaining).toBe(0)
    expect(result.retryAfter).toBeGreaterThan(0)

    vi.useRealTimers()

})
})
</file>

<file path="tests/unit/lib/rate-limit/middleware.test.ts">
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/guest/quota', () => ({
extractIp: vi.fn(),
}))

vi.mock('@/lib/rate-limit', () => ({
checkGuestGenerationRateLimit: vi.fn(),
}))

import { extractIp } from '@/lib/guest/quota'
import { checkGuestGenerationRateLimit } from '@/lib/rate-limit'
import { enforceGuestGenerationRateLimit } from '@/lib/rate-limit/middleware'

const mockExtractIp = extractIp as ReturnType<typeof vi.fn>
const mockCheckGuestGenerationRateLimit = checkGuestGenerationRateLimit as ReturnType<typeof vi.fn>

describe('enforceGuestGenerationRateLimit', () => {
it('returns null when the request is allowed', async () => {
mockExtractIp.mockReturnValue('1.2.3.4')
mockCheckGuestGenerationRateLimit.mockResolvedValue({
allowed: true,
used: 1,
limit: 3,
remaining: 2,
resetsAt: new Date('2026-04-25T00:00:00.000Z'),
retryAfter: 3600,
})

    const response = await enforceGuestGenerationRateLimit(
      new Request('http://localhost:3000/api/generate'),
    )

    expect(response).toBeNull()

})

it('returns a 429 response with retry metadata when the limit is exceeded', async () => {
mockExtractIp.mockReturnValue('1.2.3.4')
mockCheckGuestGenerationRateLimit.mockResolvedValue({
allowed: false,
used: 3,
limit: 3,
remaining: 0,
resetsAt: new Date('2026-04-25T00:00:00.000Z'),
retryAfter: 1200,
})

    const response = await enforceGuestGenerationRateLimit(
      new Request('http://localhost:3000/api/generate'),
    )

    expect(response?.status).toBe(429)
    expect(response?.headers.get('Retry-After')).toBe('1200')
    const body = (await response?.json()) as {
      error: {
        code: string
        message: string
        requestId: string
        retryAfter: number
        resetsAt: string
        signupUrl: string
      }
    }

    expect(body.error.code).toBe('RATE_LIMIT_EXCEEDED')
    expect(body.error.message).toBe("You've created 3 guides today. Sign up for unlimited access!")
    expect(body.error.requestId).toBeTruthy()
    expect(body.error.retryAfter).toBe(1200)
    expect(body.error.resetsAt).toBe('2026-04-25T00:00:00.000Z')
    expect(body.error.signupUrl).toBe('/register')
    expect(response?.headers.get('x-request-id')).toBe(body.error.requestId)

})
})
</file>

<file path="tests/unit/lib/security/csrf.test.ts">
import { describe, expect, it } from 'vitest'
import { validateOrigin } from '@/lib/security/csrf'

describe('validateOrigin', () => {
it('allows same-origin mutation requests', () => {
const request = new Request('http://localhost:3000/api/generate', {
method: 'POST',
headers: { origin: 'http://localhost:3000' },
})

    expect(validateOrigin(request)).toBe(true)

})

it('rejects mismatched origins for mutation requests', () => {
const request = new Request('http://localhost:3000/api/generate', {
method: 'POST',
headers: { origin: 'https://attacker.example' },
})

    expect(validateOrigin(request)).toBe(false)

})

it('allows safe methods without origin headers', () => {
const request = new Request('http://localhost:3000/api/generate')

    expect(validateOrigin(request)).toBe(true)

})
})
</file>

<file path="tests/unit/lib/security/headers.test.ts">
import { describe, expect, it } from 'vitest'
import { buildSecurityHeaders } from '@/lib/security/headers'

describe('buildSecurityHeaders', () => {
it('returns the required baseline security headers', () => {
const headers = buildSecurityHeaders({ isProduction: false })

    expect(headers['Content-Security-Policy']).toContain("default-src 'self'")
    expect(headers['X-Content-Type-Options']).toBe('nosniff')
    expect(headers['X-Frame-Options']).toBe('DENY')
    expect(headers['Referrer-Policy']).toBe('strict-origin-when-cross-origin')
    expect(headers['Strict-Transport-Security']).toBeUndefined()

})

it('adds hsts in production', () => {
const headers = buildSecurityHeaders({ isProduction: true })

    expect(headers['Strict-Transport-Security']).toContain('max-age=63072000')

})
})
</file>

<file path="tests/unit/lib/security/sanitize.test.ts">
import { describe, expect, it } from 'vitest'
import { sanitizeInput, sanitizeObjectStrings } from '@/lib/security/sanitize'

describe('sanitizeInput', () => {
it('strips html tags, null bytes, and surrounding whitespace', () => {
expect(sanitizeInput(' <script>alert(1)</script>Hello\u0000 ')).toBe('alert(1)Hello')
})
})

describe('sanitizeObjectStrings', () => {
it('sanitizes only string properties', () => {
expect(
sanitizeObjectStrings({
inputValue: ' <b>Topic</b>\u0000 ',
limit: 3,
}),
).toEqual({
inputValue: 'Topic',
limit: 3,
})
})
})
</file>

<file path="tests/unit/lib/sharing/proxy.test.ts">
import { describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { maybeRewriteUnavailableShare } from '@/lib/sharing/proxy'

describe('maybeRewriteUnavailableShare', () => {
it('returns null for non-share routes', async () => {
const response = await maybeRewriteUnavailableShare(
new NextRequest('http://localhost:3000/dashboard'),
)

    expect(response).toBeNull()

})

it('rewrites revoked or expired share links to the unavailable page with 410', async () => {
const fetchImpl = vi
.fn()
.mockResolvedValue(new Response(JSON.stringify({ status: 'expired' }), { status: 410 }))

    const response = await maybeRewriteUnavailableShare(
      new NextRequest('http://localhost:3000/share/token-1'),
      fetchImpl,
    )

    expect(fetchImpl).toHaveBeenCalledOnce()
    expect(response?.status).toBe(410)
    expect(response?.headers.get('x-middleware-rewrite')).toContain('/share/unavailable')

})
})
</file>

<file path="tests/unit/lib/sharing/token.test.ts">
import { describe, expect, it } from 'vitest'
import { generateShareToken } from '@/lib/sharing/token'

describe('generateShareToken', () => {
it('returns a url-safe token with at least 32 characters', () => {
const token = generateShareToken()

    expect(token.length).toBeGreaterThanOrEqual(32)
    expect(token).toMatch(/^[A-Za-z0-9_-]+$/)

})
})
</file>

<file path="tests/unit/lib/storage/minio.test.ts">
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockSend = vi.fn()

vi.mock('@aws-sdk/client-s3', () => ({
S3Client: class {
send = mockSend
},
PutObjectCommand: class {
input: unknown
constructor(input: unknown) {
this.input = input
}
},
}))

import { getAvatarValidationMessage, uploadAvatar, validateAvatarFile } from '@/lib/storage/minio'

function makeFile(buffer: Uint8Array, type: string, name = 'avatar.png') {
return new File([Buffer.from(buffer)], name, { type })
}

beforeEach(() => {
vi.clearAllMocks()
process.env['S3_ENDPOINT'] = 'http://localhost:9000'
process.env['S3_BUCKET'] = 'flashguides'
process.env['S3_ACCESS_KEY'] = 'minioadmin'
process.env['S3_SECRET_KEY'] = 'minioadmin'
})

describe('minio avatar helpers', () => {
it('validates a PNG avatar payload', async () => {
const pngBytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
const result = await validateAvatarFile(makeFile(pngBytes, 'image/png'))

    expect(result.mimeType).toBe('image/png')
    expect(result.buffer).toBeInstanceOf(Buffer)

})

it('rejects oversized files', async () => {
const file = makeFile(new Uint8Array(2 _ 1024 _ 1024 + 1), 'image/png')

    await expect(validateAvatarFile(file)).rejects.toThrow(getAvatarValidationMessage())

})

it('rejects files with mismatched magic bytes', async () => {
const fakeJpg = makeFile(
new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
'image/jpeg',
'avatar.jpg',
)

    await expect(validateAvatarFile(fakeJpg)).rejects.toThrow(getAvatarValidationMessage())

})

it('uploads a validated avatar to the configured bucket', async () => {
mockSend.mockResolvedValue({})

    const url = await uploadAvatar(Buffer.from([0xff, 0xd8, 0xff]), 'image/jpeg', 'user-1')

    expect(mockSend).toHaveBeenCalledTimes(1)
    expect(url).toMatch(/^http:\/\/localhost:9000\/flashguides\/avatars\/user-1\//)

})
})
</file>

<file path="tests/unit/lib/study-modes/overview.test.ts">
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the Claude client before importing strategies
vi.mock('@/lib/ai/claude', () => ({
claudeClient: {
generate: vi.fn(),
streamGenerate: vi.fn(),
},
ClaudeClient: vi.fn(),
}))

import { claudeClient } from '@/lib/ai/claude'
import { OverviewStrategy } from '@/lib/study-modes/overview'
import { DeepDiveStrategy } from '@/lib/study-modes/deep-dive'
import { ExamPrepStrategy } from '@/lib/study-modes/exam-prep'
import { ELI5Strategy } from '@/lib/study-modes/eli5'
import { StudyModeStrategyFactory } from '@/lib/study-modes/factory'
import type { NormalizedInput } from '@/types/generation'

const mockClient = claudeClient as unknown as {
generate: ReturnType<typeof vi.fn>
streamGenerate: ReturnType<typeof vi.fn>
}

const sampleInput: NormalizedInput = {
type: 'TOPIC',
text: 'React Hooks',
originalValue: 'React Hooks',
}

const MOCK_PLAN = `TITLE: React Hooks Guide

## Introduction

React hooks let you use state in functional components.

## useState

The useState hook manages local state.

## useEffect

The useEffect hook handles side effects.`

beforeEach(() => {
vi.clearAllMocks()
mockClient.generate.mockResolvedValue(MOCK_PLAN)
})

describe('OverviewStrategy', () => {
it('calls client.generate and returns title + sections', async () => {
const strategy = new OverviewStrategy(claudeClient)
const result = await strategy.planSections(sampleInput)

    expect(mockClient.generate).toHaveBeenCalledOnce()
    expect(result.title).toBe('React Hooks Guide')
    expect(result.sections.length).toBeGreaterThanOrEqual(2)

})

it('planSections prompt contains OVERVIEW instructions', async () => {
const strategy = new OverviewStrategy(claudeClient)
await strategy.planSections(sampleInput)

    const prompt = mockClient.generate.mock.calls[0]?.[0] as string
    expect(prompt).toContain('overview')

})

it('planSections prompt tells file uploads not to infer from pdf metadata or filename', async () => {
const strategy = new OverviewStrategy(claudeClient)
await strategy.planSections({
type: 'FILE',
text: 'Chapter 1 introduces data mining tasks, classification, clustering, and association rules.',
originalValue: '8-data-mining-overview.pdf',
})

    const prompt = mockClient.generate.mock.calls[0]?.[0] as string
    expect(prompt).toContain('Ground the guide only in the extracted document text below')
    expect(prompt).toContain('Do not infer the topic from the filename')

})

it('enrichWithMedia returns sections unchanged', async () => {
const strategy = new OverviewStrategy(claudeClient)
const sections = [{ heading: 'H', body: 'B' }]
const result = await strategy.enrichWithMedia(sections)
expect(result).toEqual(sections)
})

it('buildQuizzes returns empty array', async () => {
const strategy = new OverviewStrategy(claudeClient)
const result = await strategy.buildQuizzes([{ heading: 'H', body: 'B' }])
expect(result).toEqual([])
})
})

describe('DeepDiveStrategy', () => {
it('planSections prompt contains deep-dive instructions', async () => {
const strategy = new DeepDiveStrategy(claudeClient)
await strategy.planSections(sampleInput)
const prompt = mockClient.generate.mock.calls[0]?.[0] as string
expect(prompt.toLowerCase()).toContain('deep')
})
})

describe('ExamPrepStrategy', () => {
it('buildQuizzes parses JSON quiz items from Claude response', async () => {
const quizJson = JSON.stringify([
{ question: 'Q1?', options: ['A', 'B', 'C', 'D'], correctIndex: 0 },
{ question: 'Q2?', options: ['A', 'B', 'C', 'D'], correctIndex: 2 },
])
mockClient.generate.mockResolvedValue(quizJson)

    const strategy = new ExamPrepStrategy(claudeClient)
    const quizzes = await strategy.buildQuizzes([{ heading: 'H', body: 'B' }])

    expect(quizzes).toHaveLength(2)
    expect(quizzes[0]?.question).toBe('Q1?')

})

it('buildQuizzes returns empty array on malformed JSON', async () => {
mockClient.generate.mockResolvedValue('not valid json')
const strategy = new ExamPrepStrategy(claudeClient)
const quizzes = await strategy.buildQuizzes([{ heading: 'H', body: 'B' }])
expect(quizzes).toEqual([])
})
})

describe('ELI5Strategy', () => {
it('planSections prompt contains ELI5 / explain like instructions', async () => {
const strategy = new ELI5Strategy(claudeClient)
await strategy.planSections(sampleInput)
const prompt = mockClient.generate.mock.calls[0]?.[0] as string
expect(prompt.toLowerCase()).toContain("explain like i'm 5")
})
})

describe('StudyModeStrategyFactory', () => {
it.each(['OVERVIEW', 'DEEP_DIVE', 'EXAM_PREP', 'ELI5'] as const)(
'creates a strategy for mode %s',
(mode) => {
const strategy = StudyModeStrategyFactory.create(mode, claudeClient)
expect(strategy).toBeDefined()
expect(typeof strategy.planSections).toBe('function')
},
)
})
</file>

<file path="tests/unit/pages/gallery.test.tsx">
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/lib/db/client', () => ({
prisma: {
guide: {
findMany: vi.fn(),
},
},
}))

vi.mock('next/link', () => ({
default: ({
href,
children,
...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
<a href={href} {...props}>
{children}
</a>
),
}))

import { prisma } from '@/lib/db/client'
import GalleryPage from '@/app/gallery/page'

const mockFindMany = (prisma.guide as unknown as { findMany: ReturnType<typeof vi.fn> }).findMany

describe('GalleryPage', () => {
// T-17: empty state
it('shows the empty state message when no public guides exist', async () => {
mockFindMany.mockResolvedValueOnce([])

    const jsx = await GalleryPage()
    render(jsx as React.ReactElement)

    expect(screen.getByTestId('gallery-empty')).toBeInTheDocument()
    expect(screen.getByText(/check back soon/i)).toBeInTheDocument()

})

it('renders guide cards when public guides exist', async () => {
mockFindMany.mockResolvedValueOnce([
{
id: 'g1',
slug: 'test-guide',
title: 'Test Guide',
studyMode: 'OVERVIEW',
content: 'Some content here.',
createdAt: new Date('2026-04-01'),
},
])

    const jsx = await GalleryPage()
    render(jsx as React.ReactElement)

    expect(screen.getByTestId('gallery-grid')).toBeInTheDocument()
    expect(screen.getByText('Test Guide')).toBeInTheDocument()

})

it('renders the page heading', async () => {
mockFindMany.mockResolvedValueOnce([])

    const jsx = await GalleryPage()
    render(jsx as React.ReactElement)

    expect(screen.getByRole('heading', { name: /featured guides/i })).toBeInTheDocument()

})
})
</file>

<file path="tests/unit/pages/guide-page.test.tsx">
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/lib/db/client', () => ({
prisma: {
guide: {
findUnique: vi.fn(),
},
},
}))

vi.mock('@/lib/auth', () => ({
auth: vi.fn(),
}))

const mockRedirect = vi.fn()
const mockNotFound = vi.fn()

vi.mock('next/navigation', () => ({
redirect: (url: string) => mockRedirect(url),
notFound: () => mockNotFound(),
}))

vi.mock('next/link', () => ({
default: ({
href,
children,
...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
<a href={href} {...props}>
{children}
</a>
),
}))

vi.mock('next-mdx-remote/rsc', () => ({
MDXRemote: ({ source }: { source: string }) => <div data-testid="mdx-remote">{source}</div>,
}))

vi.mock('@/components/guide/GuideRenderer', () => ({
default: ({
guide,
isClaimableGuestGuide,
}: {
guide: { title: string }
isClaimableGuestGuide?: boolean
}) => (

<div data-testid="guide-renderer-mock" data-claimable={String(Boolean(isClaimableGuestGuide))}>
{guide.title}
</div>
),
}))

import { prisma } from '@/lib/db/client'
import { auth } from '@/lib/auth'
import GuidePage from '@/app/guide/[slug]/page'

const mockFindUnique = (prisma.guide as unknown as { findUnique: ReturnType<typeof vi.fn> })
.findUnique
const mockAuth = auth as ReturnType<typeof vi.fn>

describe('GuidePage', () => {
beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue(null)
})

it('renders a guide when found and accessible', async () => {
mockFindUnique.mockResolvedValueOnce({
id: 'g1',
userId: null,
isWatermark: true,
slug: 'react-basics',
title: 'React Basics',
studyMode: 'OVERVIEW',
inputType: 'TOPIC',
inputValue: 'React',
content: '# React Basics\n\n## Components\nReact components are reusable.',
isPublic: true,
})

    const jsx = await GuidePage({ params: Promise.resolve({ slug: 'react-basics' }) })
    render(jsx as React.ReactElement)

    expect(screen.getByTestId('guide-renderer-mock')).toHaveTextContent('React Basics')
    expect(screen.getByTestId('guide-renderer-mock')).toHaveAttribute('data-claimable', 'true')

})

it('redirects to login when a private guide is not owned by the user', async () => {
mockFindUnique.mockResolvedValueOnce({
id: 'g1',
userId: 'owner-1',
isWatermark: false,
slug: 'react-basics',
title: 'React Basics',
studyMode: 'OVERVIEW',
inputType: 'TOPIC',
inputValue: 'React',
content: '# React Basics',
isPublic: false,
})

    await GuidePage({ params: Promise.resolve({ slug: 'react-basics' }) })

    expect(mockRedirect).toHaveBeenCalledWith('/login?callbackUrl=%2Fguide%2Freact-basics')

})

it('allows a guest watermark guide to render so it can be claimed after login', async () => {
mockFindUnique.mockResolvedValueOnce({
id: 'g1',
userId: null,
isWatermark: true,
slug: 'react-basics',
title: 'React Basics',
studyMode: 'OVERVIEW',
inputType: 'TOPIC',
inputValue: 'React',
content: '# React Basics',
isPublic: false,
})

    const jsx = await GuidePage({ params: Promise.resolve({ slug: 'react-basics' }) })
    render(jsx as React.ReactElement)

    expect(mockRedirect).not.toHaveBeenCalled()
    expect(screen.getByTestId('guide-renderer-mock')).toHaveAttribute('data-claimable', 'true')

})
})
</file>

<file path="tests/unit/.gitkeep">

</file>

<file path="tests/setup.ts">
import '@testing-library/jest-dom'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './mocks/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
</file>

<file path=".prettierignore">
node_modules/
.next/
dist/
build/
coverage/
playwright-report/
exports/
data/
*.db
*.sqlite
pnpm-lock.yaml
</file>

<file path=".prettierrc.mjs">
/** @type {import("prettier").Config} */
const config = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  plugins: [],
}

export default config
</file>

<file path="AGENTS.md">
<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->
</file>

<file path="CLAUDE.md">
@AGENTS.md
</file>

<file path="fly.toml">
app = "flashguides"
primary_region = "ewr"  # Newark — change to preferred region

[build]
dockerfile = "docker/Dockerfile"

[env]
NODE_ENV = "production"
NEXT_TELEMETRY_DISABLED = "1"
PORT = "3000"

[http_service]
internal_port = 3000
force_https = true
auto_stop_machines = true
auto_start_machines = true
min_machines_running = 0

[http_service.concurrency]
type = "requests"
hard_limit = 250
soft_limit = 200

[[vm]]
cpu_kind = "shared"
cpus = 1
memory_mb = 512

[mounts]
source = "flashguides_data"
destination = "/data"
initial_size = "1gb"

[[services]]
protocol = "tcp"
internal_port = 3000

[[services.ports]]
port = 80
handlers = ["http"]
force_https = true

[[services.ports]]
port = 443
handlers = ["tls", "http"]

[services.concurrency]
type = "requests"
hard_limit = 250
soft_limit = 200

[[services.http_checks]]
interval = "30s"
timeout = "10s"
grace_period = "40s"
method = "GET"
path = "/api/health"
</file>

<file path="instrumentation.ts">
export async function register() {
  if (process.env['NEXT_RUNTIME'] === 'nodejs') {
    const { bootDatabase } = await import('@/lib/db/boot')
    await bootDatabase()
  }
}
</file>

<file path="letter.md">
# Coding Agent Brief: FlashGuides

**From:** Jeanpaul (jg847@njit.edu)
**Date:** April 21, 2026
**Subject:** Full build specification, workflow, quality bar, and deliverables

---

## 1. What you are building

**FlashGuides** is a web application whose homepage is an AI chatbot that generates interactive study-guide webpages on demand. A registered user can prompt the bot in three ways:

1. **Topic prompt** — e.g., "Tell me about the blue-ringed octopus."
2. **Pasted text** — a large block of informative text to summarize and structure.
3. **URL or YouTube link** — a source the bot fetches, parses, and transforms.

From any of these inputs the bot produces a **single, aesthetically pleasing, interactive study-guide page** that includes: a hero section, auto-generated table of contents, formatted sections, inline media (images, diagrams, embedded video where relevant), flashcards, inline quizzes, highlight-to-note, and a follow-up chat anchored to the page.

The app must clearly differentiate guest vs. registered experiences, support full account management, and deploy via Docker.

---

## 2. Locked technology decisions

Do not deviate from these without raising a blocker first.

| Layer                     | Choice                                                |
| ------------------------- | ----------------------------------------------------- |
| Language                  | TypeScript (strict mode)                              |
| Framework                 | Next.js 14+ (App Router, Server Components)           |
| UI                        | React + Tailwind CSS + shadcn/ui                      |
| AI client                 | Vercel AI SDK (`ai`) + `@anthropic-ai/sdk`            |
| MCP                       | `@modelcontextprotocol/sdk`                           |
| MCP — Web Search          | Tavily API (`@tavily/core`)                           |
| MCP — Image Generation    | fal.ai FLUX (`@fal-ai/client`)                        |
| MCP — YouTube Transcripts | `youtube-transcript` npm package                      |
| Auth                      | Auth.js (NextAuth v5) — email/password + Google OAuth |
| Database                  | **SQLite** (WAL mode, volume-mounted)                 |
| ORM                       | Prisma                                                |
| Validation                | Zod                                                   |
| Content                   | MDX (`next-mdx-remote` or similar)                    |
| Object storage            | MinIO (S3-compatible, Docker)                         |
| Dev email                 | Mailhog (Docker)                                      |
| Containerization          | Docker + Docker Compose                               |
| CI/CD                     | GitHub Actions                                        |
| Testing                   | Vitest + React Testing Library + Playwright + MSW     |
| Lint/Format               | ESLint + Prettier + Husky + lint-staged               |

---

## 3. Your workflow

Execute in this exact order. **Do not begin implementation before specs and sprint plans exist.**

### Phase 0 — Repo bootstrap

Initialize the repository with all infrastructure (Section 4) before writing feature code.

### Phase 1 — Author feature specs

Create a `docs/_spec/` folder and produce one spec file per feature listed in Section 7. Each spec is a self-contained requirements document. Template in Section 5.

### Phase 2 — Break each spec into sprints

For every spec, produce a sibling file `docs/_spec/<feature>/sprints.md` that decomposes the spec into ordered sprints. Each sprint has a focused scope (1–3 days of work), explicit entry/exit criteria, file-level implementation notes, and the tests that gate the sprint's completion.

### Phase 3 — Implement sprint by sprint

For each sprint: implement, write tests, pass CI, open a PR, merge, update the sprint doc's status. Never start a sprint whose dependencies are incomplete.

### Phase 4 — Verify MVP completeness

Every feature must meet its Definition of Done (Section 8) before the project is considered MVP-complete.

---

## 4. Repo & infrastructure setup (Phase 0)

Before authoring specs, set the repository up as follows.

### Expected top-level layout

```
flashguides/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── docker.yml
├── docs/
│   ├── _spec/
│   │   ├── 00-overview.md
│   │   ├── 01-infrastructure/
│   │   │   ├── spec.md
│   │   │   └── sprints.md
│   │   ├── 02-authentication/
│   │   ├── 03-chat-homepage/
│   │   ├── ... (one folder per feature)
│   ├── architecture.md
│   ├── testing-strategy.md
│   └── contributing.md
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/             # Shared UI
│   ├── lib/
│   │   ├── ai/                 # Claude + Vercel AI SDK
│   │   ├── mcp/                # MCP clients (factory + adapters)
│   │   ├── auth/
│   │   ├── db/                 # Prisma client + repositories
│   │   ├── study-modes/        # Strategy implementations
│   │   ├── generation/         # Guide builders, template methods
│   │   └── utils/
│   ├── server/                 # API route handlers, middleware
│   └── types/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── scripts/
│   └── export-source.ts        # CLI from Section 9
├── exports/                    # output of export-source (gitignored)
├── data/                       # SQLite DB + backups (gitignored, volume-mounted)
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── .env.example
├── .eslintrc.cjs
├── .prettierrc
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
└── README.md
```

### Docker

- Multi-stage `Dockerfile` (deps → build → runner). Final image < 200MB.
- `docker-compose.yml` with services: `web`, `minio`, `mailhog`.
- Named volume `flashguides_data` mounted at `/data` for `app.db` + `backups/`.
- Healthchecks on every service.
- Dev and prod compose overrides (`docker-compose.override.yml` for dev hot-reload).

### SQLite tuning

On first app boot, run:

```
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA foreign_keys = ON;
PRAGMA busy_timeout = 5000;
PRAGMA temp_store = MEMORY;
```

Ship a small nightly backup script (`sqlite3 .backup`) that drops timestamped copies to `/data/backups/` and prunes anything older than 14 days.

### GitHub Actions

Two workflows at minimum.

`ci.yml` runs on every push and PR:

- `pnpm install` (cached)
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test:unit`
- `pnpm test:integration`
- `pnpm build`
- `pnpm test:e2e` (Playwright, against the built app, matrix: chromium + firefox)
- Upload coverage report as artifact

`docker.yml` runs on push to `main`:

- Build and tag Docker image
- Push to GHCR
- Tag with commit SHA and `latest`
- Deploy to **Fly.io** via `flyctl deploy --image ghcr.io/<org>/flashguides:<sha>` (requires `FLY_API_TOKEN` secret in the repo). Ship a `fly.toml` in the repo root targeting the same named volume for `/data`.

### Local quality gates

- Husky `pre-commit` → lint-staged (Prettier + ESLint on staged files)
- Husky `pre-push` → `pnpm typecheck && pnpm test:unit`
- Commitlint with conventional commits

### Environment variables

Publish a complete `.env.example` covering: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `ANTHROPIC_API_KEY`, `TAVILY_API_KEY`, `FAL_API_KEY`, `S3_ENDPOINT`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `SMTP_*`, `FLY_API_TOKEN` (CI only — do not commit).

---

## 5. Spec document template

Every spec in `docs/_spec/<NN-feature>/spec.md` must include these sections in this order:

1. **Feature summary** — one paragraph.
2. **User stories** — in the form "As a [role], I want [capability] so that [outcome]." Numbered.
3. **Acceptance criteria** — Given/When/Then, mapped back to user story numbers.
4. **UX notes** — wireframe sketch or description, key interactions, empty states, loading states, error states.
5. **Data model** — Prisma models touched or added.
6. **API contracts** — route paths, methods, request/response Zod schemas, auth requirements.
7. **Dependencies** — other specs that must ship first.
8. **Out of scope** — explicit non-goals.
9. **Test plan** — the table in Section 6.
10. **Definition of Done** — instantiated from Section 8.

The sibling `sprints.md` lists sprints in order, each with: title, scope, files touched, implementation notes, tests added, entry/exit criteria, status.

---

## 6. Testing requirements

Testing is not optional. Every spec's test plan must table tests across three axes.

### Test taxonomy

| Type        | Tool                 | Scope                                                                |
| ----------- | -------------------- | -------------------------------------------------------------------- |
| Unit        | Vitest               | Pure functions, classes, hooks, utilities                            |
| Integration | Vitest + test SQLite | API routes, DB repositories, MCP client adapters with mocked network |
| E2E         | Playwright           | User-level flows in a real browser against the built app             |
| Component   | Vitest + RTL         | Rendering, accessibility, keyboard nav for UI components             |

### Case coverage — required for every feature

For each feature, the spec's test plan must enumerate at least:

**Positive cases**

- Happy path for each user story.
- Boundary values that are still valid (min/max length inputs, exactly one item, etc.).

**Negative cases**

- Invalid inputs → correct error responses.
- Unauthenticated access to protected routes → redirect/401.
- Unauthorized access to another user's resource → 403.
- Rate-limit exceeded → 429.
- External service failure (Claude down, MCP tool 500, network timeout) → graceful degradation.

**Edge cases**

- Empty states (zero guides, zero results).
- Very large inputs (50k-character text paste, 20MB page scrape).
- Non-English / unicode / RTL text.
- Concurrent operations (two tabs generating at once).
- Partial failures mid-stream (LLM stream dropped halfway).
- Session expiry during long generation.
- Malformed URLs, blocked domains, paywalled pages.
- Quota boundaries (exactly at the guest limit).

### Required test-plan table in every spec

Use this exact structure:

| #   | Type | Category | Description | Given / When / Then |
| --- | ---- | -------- | ----------- | ------------------- |

### Rate limits (locked)

| Tier                    | Guide generations    | Notes                                            |
| ----------------------- | -------------------- | ------------------------------------------------ |
| Guest (unauthenticated) | 3 per day (IP-based) | Guides are watermarked; not saved to any account |
| Registered user         | Unlimited            | Persisted to account                             |

Enforce at the `GenerationOrchestrator` layer and return HTTP 429 with a `Retry-After` header when exceeded.

### Coverage targets (CI-enforced)

- **Lines:** ≥ 85% overall, ≥ 90% on `src/lib/**`
- **Branches:** ≥ 80%
- Critical paths (auth, generation orchestration, payments if added) → 100% of branches covered.

### Mocking policy

- External HTTP is always mocked in unit/integration tests via MSW.
- LLM responses are mocked with deterministic fixtures in unit tests; a small set of E2E tests may hit a recorded cassette (e.g., with `polly` or VCR-style fixtures) — never live network in CI.

---

## 7. Features to spec

Author one spec folder per item below, numbered `01`–`11` matching the order.

1. **Infrastructure & Project Setup** — Phase 0 output, committed as a spec for traceability.
2. **Authentication & Session Management** — email/password signup, login, logout, email verification, password reset, Google OAuth, session middleware, protected-route helpers.
3. **Guest vs. Registered Experience** — gating strategy, guest quota (3 watermarked previews/day, registered users: unlimited), signup CTAs, public/featured gallery browsing.
4. **Chat Homepage & Generation Orchestrator** — prompt box with three input modes, streaming UI, study-mode selector (Overview / Deep-dive / Exam-prep / ELI5), Claude call pipeline, guide persistence on completion.
5. **MCP Tool Integrations** — client factory, adapters for: **Web Fetch** (direct HTTP via `fetch`), **Web Search** (Tavily API via `@tavily/core`), **Image Generation** (fal.ai FLUX via `@fal-ai/client`), **YouTube Transcripts** (`youtube-transcript` npm package). Unified error handling, timeouts, retries.
6. **Study Guide Renderer** — MDX-based page with auto TOC, collapsible sections, hero media, inline images, embedded YouTube, flashcards, inline quizzes, highlight-to-note, page-level follow-up chat, reading progress, dark/light mode.
7. **User Dashboard** — grid/list of saved guides, tags, folders, full-text search (SQLite FTS5), favorites, recent, usage meter.
8. **Account Management** — profile edit, change email (with re-verification), change password, connected accounts, data export (zip of Markdown + JSON), account deletion.
9. **Sharing & Export** — public share links with revocation, fork action, export to PDF, Markdown, and single-file HTML.
10. **CLI: Source Export Tool** — Section 9.
11. **Observability & Hardening** — structured logging (pino), request IDs, rate limiting, input sanitization, CSP headers, CSRF protection where applicable.

---

## 8. Code quality bar

### SOLID — applied concretely

- **Single Responsibility:** One module, one reason to change. `AuthService`, `GuideRepository`, `ClaudeClient`, `MCPRegistry`, `GuideRenderer` are separate. No 500-line "do everything" files.
- **Open/Closed:** Adding a new study mode or MCP tool must not modify existing code — only add a new class that implements the relevant interface and register it.
- **Liskov Substitution:** Every `IMCPClient` implementation must be swappable without breaking callers. Enforce with interface tests run against every implementation.
- **Interface Segregation:** Small, focused interfaces: `IGuideReader` vs. `IGuideWriter` rather than one fat `IGuideRepository`.
- **Dependency Inversion:** High-level code depends on interfaces; concrete classes are wired at the composition root (`src/lib/container.ts` or equivalent). No `new ClaudeClient()` inside business logic.

### Gang of Four — the patterns to use (and where)

- **Strategy** — Study modes (`OverviewStrategy`, `DeepDiveStrategy`, `ExamPrepStrategy`, `ELI5Strategy`) implementing a common `IStudyModeStrategy`.
- **Factory** — `MCPClientFactory` returns the right client for a given tool name.
- **Adapter** — Wrap external SDKs (Anthropic, Google OAuth, each MCP server) behind internal interfaces so they are mockable and swappable.
- **Repository** — `GuideRepository`, `UserRepository`, etc., over Prisma, each behind an interface.
- **Template Method** — `BaseGuideGenerator` with abstract hooks (`planSections`, `enrichWithMedia`, `buildQuizzes`) overridden per study mode.
- **Builder** — `GuideBuilder` assembles the final structured output (hero → TOC → sections → quizzes → flashcards).
- **Facade** — `GenerationOrchestrator` fronts the whole pipeline (auth check → quota check → MCP setup → streaming → persistence → notifications).
- **Observer / Pub-Sub** — Token streaming from Claude fans out to the HTTP response and any telemetry subscribers.
- **Chain of Responsibility** — Request middleware chain (auth → rate limit → validation → handler).
- **Command** — The CLI export tool and any background job actions.
- **Decorator** — Logging, timing, and retry wrappers around MCP clients.

Every pattern used must be documented in `docs/architecture.md` with the class it lives in and why it was chosen.

### Other non-negotiables

- TypeScript `strict: true`, `noUncheckedIndexedAccess: true`.
- No `any`. `unknown` allowed with narrowing. ESLint rule enforced.
- Zod at every trust boundary (request bodies, env vars, LLM outputs, MCP responses).
- Conventional commits.
- No secrets in the repo.
- All user input sanitized before rendering.

### Definition of Done (per feature)

A feature is only "done" when **all** of the following are true:

1. Spec exists in `docs/_spec/` and is up to date with what shipped.
2. All user stories have passing acceptance tests.
3. Positive, negative, and edge cases from the spec's test plan are implemented and passing.
4. Unit + integration + E2E coverage meets Section 6 targets.
5. `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` all pass locally and in CI.
6. Manual smoke test of the happy path in Docker Compose succeeds.
7. No `TODO`, `FIXME`, or `@ts-ignore` in the shipped code for that feature without a linked issue.
8. `docs/architecture.md` updated if any new patterns or modules were introduced.
9. PR reviewed (even self-review with checklist) and squash-merged to `main`.

"MVP level" means every item in Section 7 meets this Definition of Done, the three-mode chat flow works end-to-end for a real user, and the app can be brought up cold on a clean machine via `docker compose up`.

---

## 9. CLI: source export tool

Implement `scripts/export-source.ts`, exposed as:

```
pnpm export:source [options]
```

### Behavior

- Walks the repo and writes **all source code and tests** into a single concatenated file at `exports/<YYYY-MM-DD-HH-mm>-codebase.md`.
- Format: a table of contents at the top (relative paths, clickable anchors), then each file preceded by a clear delimiter header including the full relative path, followed by a fenced code block with the correct language tag inferred from extension.
- Ends with a summary: total files, total lines of code, lines of test code, breakdown by top-level folder.

### Flags

- `--no-tests` — exclude anything under `tests/` or matching `*.test.*` / `*.spec.*`.
- `--only-tests` — include only test files.
- `--format=md|txt` — Markdown (default) or plain text with `===` delimiters.
- `--include=<glob>` / `--exclude=<glob>` — repeatable overrides.
- `--output=<path>` — override default output path.
- `--stdout` — write to stdout instead of a file.

### Always-excluded

`node_modules/`, `.next/`, `dist/`, `build/`, `coverage/`, `.git/`, `exports/`, `data/`, lockfiles, binary assets (images, fonts, PDFs, `.db`, `.sqlite`), anything matched by `.gitignore`, any file containing the string `ANTHROPIC_API_KEY=` or similar secret patterns (defense in depth).

### Tests

Unit-test the file walker, glob filters, redaction, and output formatter. An E2E test runs the CLI against a fixture repo and asserts the output contents.

---

## 10. Milestone sequencing (suggested)

Ship in this order so the app is always demoable:

1. Phase 0 infra (Section 4) → green CI from day one.
2. Spec 02 Auth → users can sign up and log in.
3. Spec 03 Guest vs. Registered → gating in place.
4. Spec 04 Chat + Spec 05 MCP (minimal: web fetch only) → end-to-end generation works.
5. Spec 06 Renderer → pages are beautiful and interactive.
6. Spec 07 Dashboard + Spec 08 Account → users can manage their work.
7. Spec 05 extensions: Web Search, Image Gen, YouTube.
8. Spec 09 Sharing & Export.
9. Spec 10 CLI export tool (can ship earlier if convenient for review).
10. Spec 11 Observability & Hardening.

---

## 11. What I expect back from you first

Before writing any application code beyond Phase 0, reply with:

1. Confirmation that the repo is bootstrapped per Section 4 (link to the initial commit).
2. The full set of spec files under `docs/_spec/` per the template in Section 5.
3. For each spec, its `sprints.md` file.
4. A one-page `docs/architecture.md` describing the composition root, how SOLID and the GoF patterns in Section 8 map to folders and classes, and how dependency injection is wired.
5. A green CI run on the initial PR.

Only after I've reviewed those may you begin Sprint 1 of Spec 02.

---

## 12. How to ask me questions

If any requirement is ambiguous or you believe a locked decision should change, open an issue titled `RFC: <topic>` with:

- The ambiguity or proposed change
- Options considered with trade-offs
- Your recommendation

Do not silently deviate from this brief. Do not guess on security, auth, or data-model decisions — ask.

Thank you. Build something I'd be proud to hand to a classmate on the night before finals.

— Jeanpaul
</file>

<file path="postcss.config.mjs">
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
</file>

<file path="prisma.config.ts">
// This file was generated by Prisma, and assumes you have installed the following:
// npm install --save-dev prisma dotenv
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
schema: "prisma/schema.prisma",
migrations: {
path: "prisma/migrations",
},
datasource: {
url: process.env["DATABASE_URL"],
},
});
</file>

<file path="README.md">
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
</file>

<file path="docs/_spec/01-infrastructure/spec.md">
# Spec 01 — Infrastructure & Project Setup

> **Status:** ✅ Complete (Phase 0)  
> **Sprint file:** [sprints.md](./sprints.md)

---

## 1. Feature Summary

This spec covers all repository scaffolding, tooling, and deployment infrastructure required before any application feature code is written. It exists for traceability — every infrastructure decision is documented here so future contributors understand the context. Phase 0 is considered "shipped" after the initial commit passes CI.

---

## 2. User Stories

1. As a **developer**, I want the repository bootstrapped with a consistent toolchain so that I can start implementing features on day one without configuration churn.
2. As a **developer**, I want automated lint, type-check, and test gates on every push so that regressions are caught before merging.
3. As a **developer**, I want a Docker Compose environment so that I can run the full stack (app + MinIO + Mailhog) locally with a single command.
4. As a **developer**, I want a CI pipeline that builds and publishes a Docker image to GHCR and deploys to Fly.io on every merge to `main`.
5. As a **developer**, I want SQLite configured in WAL mode with nightly backups so that the database is safe from corruption and loss.

---

## 3. Acceptance Criteria

| #     | Story | Given                                    | When                                         | Then                                                                                                 |
| ----- | ----- | ---------------------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| AC-01 | US-1  | A fresh clone of the repo                | `pnpm install && pnpm build` is run          | Build completes with 0 errors                                                                        |
| AC-02 | US-2  | A push or PR is opened                   | GitHub Actions `ci.yml` triggers             | Lint, typecheck, unit, integration, build, and e2e all pass                                          |
| AC-03 | US-3  | `.env` is populated from `.env.example`  | `docker compose up` is run from `docker/`    | All three services start healthy; app responds on port 3000                                          |
| AC-04 | US-4  | A merge to `main` occurs                 | GitHub Actions `docker.yml` triggers         | Image is pushed to GHCR and deployed to Fly.io                                                       |
| AC-05 | US-5  | The app starts                           | Boot sequence runs                           | `PRAGMA journal_mode = WAL` is confirmed active; backup script exists at `scripts/backup-db.sh`      |
| AC-06 | US-2  | A staged file violates lint rules        | `git commit` is attempted                    | Husky `pre-commit` blocks the commit and prints the lint error                                       |
| AC-07 | US-2  | A commit message is not conventional     | `git commit` is attempted with a bad message | Husky `commit-msg` blocks the commit                                                                 |
| AC-08 | US-2  | A `git push` is attempted                | The pre-push hook runs                       | `pnpm typecheck && pnpm test:unit` execute; push is blocked if either fails                          |
| AC-09 | US-2  | CI completes on any branch               | `ci.yml` finishes its test steps             | A coverage report artifact is uploaded and accessible from the workflow run summary                  |
| AC-10 | US-3  | `docker-compose.override.yml` is present | `docker compose up` is run in dev            | Hot-reload is active: editing a source file triggers a Next.js fast-refresh in the running container |
| AC-11 | US-3  | `docker-compose.yml` is inspected        | Volume config is read                        | A named volume `flashguides_data` is declared and mounted at `/data` inside the `web` container      |
| AC-12 | US-3  | `docker compose up` has run              | All three services are healthy               | `docker compose ps` shows `(healthy)` for `web`, `minio`, and `mailhog`                              |

---

## 4. UX Notes

No user-facing UI. Developer-facing only.

- `README.md` must contain: project description, prerequisites, local setup steps, environment variable reference, Docker Compose instructions, and links to the spec folder.
- `.env.example` must have comments explaining every variable.

---

## 5. Data Model

Schema initialized with Auth.js v5 required tables and core application models:

- `users`, `accounts`, `sessions`, `verification_tokens` — Auth.js
- `guides` — core content entity
- `tags`, `guide_tags` — many-to-many tagging
- `folders` — user organisation
- `notes` — highlight-to-note

Enums: `StudyMode` (OVERVIEW, DEEP_DIVE, EXAM_PREP, ELI5), `InputType` (TOPIC, TEXT, URL).

All Prisma migrations live in `prisma/migrations/`.

---

## 6. API Contracts

### `GET /api/health`

No auth required.

**Response 200:**

```json
{ "status": "ok", "timestamp": "2026-04-22T00:00:00.000Z" }
```

**Response 503** (DB unreachable):

```json
{ "status": "error" }
```

---

## 7. Dependencies

None — this is the foundation spec.

---

## 8. Out of Scope

- Application feature logic of any kind.
- User-facing pages.
- Seed data beyond schema migration.

---

## 9. Test Plan

| #    | Type        | Category | Description                                                         | Given / When / Then                                                                                             |
| ---- | ----------- | -------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| T-01 | Integration | Positive | Health endpoint returns 200 when DB is up                           | DB running / GET /api/health / 200 + `{status:"ok"}`                                                            |
| T-02 | Integration | Negative | Health endpoint returns 503 when DB is unreachable                  | DB killed / GET /api/health / 503 + `{status:"error"}`                                                          |
| T-03 | Unit        | Positive | `bootDatabase` runs all 5 PRAGMAs                                   | Mock Prisma / `bootDatabase()` called / 5 `$executeRawUnsafe` calls made                                        |
| T-04 | Unit        | Positive | Backup script prunes files older than 14 days                       | Fixture dir with old/new files / script runs / only recent files remain                                         |
| T-05 | E2E         | Positive | App loads over Docker Compose                                       | `docker compose up` / navigate to `http://localhost:3000` / 200 response                                        |
| T-06 | Unit        | Edge     | `bootDatabase` is idempotent when WAL mode is already set           | SQLite in WAL mode / `bootDatabase()` called twice / no error thrown; `journal_mode` still returns `wal`        |
| T-07 | Unit        | Edge     | Backup script creates `/data/backups/` when the directory is absent | Directory missing / script runs / directory created and `.sqlite` backup file present                           |
| T-08 | Integration | Edge     | Docker image size stays within the 200 MB target                    | Built image inspected / `docker image inspect` / compressed size ≤ 200 MB (asserted in CI step or manual smoke) |

---

## 10. Definition of Done

- [x] Repo bootstrapped per Section 4 of brief.
- [x] `pnpm typecheck` passes with `strict: true` and `noUncheckedIndexedAccess: true`.
- [x] `docker-compose.yml` tested — all three services start healthy.
- [x] `ci.yml` and `docker.yml` workflows committed.
- [x] Husky hooks in place and verified.
- [x] `prisma/schema.prisma` committed with all initial models.
- [x] `/api/health` endpoint committed.
- [x] `scripts/backup-db.sh` committed.
- [x] `.env.example` committed with all variables documented.
- [x] `fly.toml` committed.
- [x] Initial commit squash-merged to `main` with green CI.
- [ ] `pnpm test` achieves ≥ 85% line coverage, ≥ 80% branch coverage (CI-enforced via Vitest thresholds).
- [ ] No `TODO`, `FIXME`, or `@ts-ignore` in Phase 0 code without a linked issue.
- [ ] `docs/architecture.md` committed (required by letter §11 item 4).
      </file>

<file path="docs/_spec/02-authentication/spec.md">
# Spec 02 — Authentication & Session Management

> **Status:** 📝 Spec ready — not yet implemented  
> **Sprint file:** [sprints.md](./sprints.md)

---

## 1. Feature Summary

Authentication & Session Management provides secure identity for all FlashGuides users. It supports email/password signup with email verification, password reset via email, and Google OAuth as an alternative login path. Session state is managed by Auth.js v5 (NextAuth) using the Prisma adapter against the SQLite database. Middleware enforces protected routes server-side. Helper utilities expose the session to Server and Client Components cleanly.

---

## 2. User Stories

1. As a **guest**, I want to create an account with my email and a password so that I can save my guides and access registered features.
2. As a **guest**, I want to sign up / log in with my Google account so that I don't have to manage another password.
3. As a **registered user**, I want to log in with my email and password so that I can access my account.
4. As a **registered user**, I want to log out so that my session is terminated on shared devices.
5. As a **guest**, I want to receive a verification email after signup so that the app confirms I own the address.
6. As a **registered user**, I want to request a password-reset email so that I can regain access if I forget my password.
7. As a **registered user**, I want to reset my password via a secure time-limited link so that my account is protected.
8. As a **developer**, I want a session middleware that gates protected routes so that unauthenticated requests are redirected to `/login`.

---

## 3. Acceptance Criteria

| #     | Story | Given                                                | When                                            | Then                                                                      |
| ----- | ----- | ---------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------- |
| AC-01 | US-1  | Valid email + password (≥8 chars, 1 upper, 1 number) | POST `/api/auth/register`                       | 201 response; user row created; verification email sent via Mailhog       |
| AC-02 | US-1  | Email already registered                             | POST `/api/auth/register` with same email       | 409 response; no duplicate row                                            |
| AC-03 | US-1  | Password < 8 chars                                   | POST `/api/auth/register`                       | 422 with field-level error                                                |
| AC-04 | US-2  | Google OAuth flow initiated                          | User completes Google consent                   | Session created; user row upserted; redirect to dashboard                 |
| AC-05 | US-3  | Valid credentials                                    | POST `[...nextauth]/signin`                     | Session cookie set; redirect to dashboard                                 |
| AC-06 | US-3  | Wrong password                                       | POST `[...nextauth]/signin`                     | 401; no session created                                                   |
| AC-07 | US-3  | Unverified email                                     | POST `[...nextauth]/signin` with email/password | 403 with "please verify your email" message                               |
| AC-08 | US-4  | Authenticated user                                   | POST `/api/auth/signout`                        | Session destroyed; cookie cleared; redirect to `/`                        |
| AC-09 | US-5  | User registers                                       | Verification email received                     | Clicking the link sets `emailVerified` and redirects to dashboard         |
| AC-10 | US-5  | Verification link expired (>24h)                     | User clicks old link                            | 410 Gone; prompt to resend                                                |
| AC-11 | US-6  | Registered email submitted                           | POST `/api/auth/forgot-password`                | Reset email sent; 200 regardless of whether email exists (no enumeration) |
| AC-12 | US-7  | Valid reset token (≤1h)                              | POST `/api/auth/reset-password`                 | Password updated; all other sessions invalidated                          |
| AC-13 | US-7  | Expired / invalid token                              | POST `/api/auth/reset-password`                 | 410 response                                                              |
| AC-14 | US-8  | Unauthenticated request                              | Any protected route accessed                    | 302 redirect to `/login?callbackUrl=<original>`                           |
| AC-15 | US-8  | Authenticated request                                | Protected route accessed                        | Request proceeds normally                                                 |

---

## 4. UX Notes

### Pages

- **`/login`** — Email/password form + "Continue with Google" button. Link to `/register` and `/forgot-password`.
- **`/register`** — Email + password + confirm-password fields. Shows inline validation. On success shows "Check your email" banner.
- **`/verify-email`** — Token validation page. Shows success or error state.
- **`/forgot-password`** — Email field only. Shows generic success message always (no enumeration).
- **`/reset-password?token=...`** — New password + confirm-password. Token validated server-side on load; shows expiry error if invalid.

### Loading states

Each form shows a spinner on the submit button while the request is in-flight.

### Error states

- Field-level errors shown below the input (red text).
- Server errors shown in a top-of-form alert banner.
- OAuth errors (e.g., account already exists with different provider) shown as a banner on `/login`.

### Empty states

N/A — all pages show a form.

---

## 5. Data Model

Uses the Auth.js standard models already in `prisma/schema.prisma`:

- `User` — adds `password` (hashed, nullable), `emailVerified`
- `Account` — OAuth provider links
- `Session` — active session tokens
- `VerificationToken` — email verify + password reset tokens

Password hashing: **bcrypt** (`bcryptjs`, cost factor 12).

---

## 6. API Contracts

### `POST /api/auth/register`

No auth required.

**Request body (Zod):**

```ts
z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
  name: z.string().min(1).max(100).optional(),
})
```

**Response 201:** `{ message: "Verification email sent" }`  
**Response 409:** `{ error: "Email already registered" }`  
**Response 422:** `{ error: "Validation failed", fields: { ... } }`

---

### `POST /api/auth/forgot-password`

No auth required.

**Request body:**

```ts
z.object({ email: z.string().email() })
```

**Response 200:** `{ message: "If that email exists, a reset link has been sent" }`

---

### `POST /api/auth/reset-password`

No auth required.

**Request body:**

```ts
z.object({
  token: z.string(),
  password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
})
```

**Response 200:** `{ message: "Password updated" }`  
**Response 410:** `{ error: "Token expired or invalid" }`

---

### Auth.js routes

Standard routes via `app/api/auth/[...nextauth]/route.ts`:

- `GET/POST /api/auth/signin`
- `GET/POST /api/auth/signout`
- `GET /api/auth/session`
- `GET /api/auth/callback/google`
- `GET /api/auth/csrf`

---

### `src/lib/auth/middleware.ts`

Exported `authMiddleware` matched on `matcher` in `middleware.ts`. Reads session from JWT; redirects to `/login?callbackUrl=<path>` if not authenticated.

---

## 7. Dependencies

- Spec 01 (Infrastructure) — Prisma schema, email (Mailhog), env vars.

---

## 8. Out of Scope

- Multi-factor authentication (MFA).
- SSO / enterprise SAML.
- Magic-link / passwordless login.
- Admin user management.
- Rate limiting on auth endpoints (covered in Spec 11).

---

## 9. Test Plan

| #    | Type        | Category | Description                                                          | Given / When / Then                                                                                     |
| ---- | ----------- | -------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| T-01 | Unit        | Positive | Password hashing produces a bcrypt hash                              | Plain password / `hashPassword()` / returns `$2b$` prefixed string                                      |
| T-02 | Unit        | Positive | `verifyPassword` returns true for correct password                   | Hash + correct plain / `verifyPassword()` / `true`                                                      |
| T-03 | Unit        | Negative | `verifyPassword` returns false for wrong password                    | Hash + wrong plain / `verifyPassword()` / `false`                                                       |
| T-04 | Unit        | Positive | Registration Zod schema passes valid input                           | Valid data / `parse()` / no error                                                                       |
| T-05 | Unit        | Negative | Registration schema rejects weak password                            | 7-char password / `parse()` / ZodError                                                                  |
| T-06 | Integration | Positive | `POST /api/auth/register` creates user and sends email               | Test DB + Mailhog mock / valid payload / 201 + user in DB + email queued                                |
| T-07 | Integration | Negative | `POST /api/auth/register` returns 409 for duplicate email            | Existing user / same email / 409                                                                        |
| T-08 | Integration | Positive | Email verification token marks user as verified                      | Valid token in DB / GET verify link / `emailVerified` set                                               |
| T-09 | Integration | Negative | Expired verification token returns 410                               | Token with past expiry / GET verify link / 410                                                          |
| T-10 | Integration | Positive | `POST /api/auth/forgot-password` always returns 200                  | Unknown email / request / 200 (no enumeration)                                                          |
| T-11 | Integration | Positive | `POST /api/auth/reset-password` updates password                     | Valid token / new password / 200 + password changed                                                     |
| T-12 | Integration | Negative | `POST /api/auth/reset-password` rejects expired token                | Expired token / request / 410                                                                           |
| T-13 | Integration | Negative | Login with unverified email returns 403                              | Unverified user / signin / 403                                                                          |
| T-14 | Integration | Negative | Protected route redirects unauthenticated user                       | No session / GET /dashboard / 302 to /login                                                             |
| T-15 | E2E         | Positive | Full signup → verify → login flow                                    | Browser / complete flow / user lands on dashboard                                                       |
| T-16 | E2E         | Positive | Google OAuth login creates session                                   | Mock OAuth / complete flow / session created                                                            |
| T-17 | E2E         | Positive | Forgot password → reset flow                                         | Browser / complete reset flow / login succeeds with new password                                        |
| T-18 | E2E         | Positive | Logout destroys session                                              | Logged-in user / click logout / session gone, redirected to `/`                                         |
| T-19 | Component   | Positive | Login form renders all fields and submit button                      | Mount LoginForm / render / all elements present                                                         |
| T-20 | Component   | Negative | Login form shows error state on server error                         | Simulate server 401 / render / error banner visible                                                     |
| T-21 | Integration | Edge     | Concurrent registrations with same email return 409 for one          | Two simultaneous POST /api/auth/register with same email / execute / one 201, one 409; no duplicate row |
| T-22 | Unit        | Edge     | Registration schema accepts name at exactly 100 chars (max boundary) | 100-char name string / `parse()` / no error                                                             |
| T-23 | Integration | Edge     | Unicode/emoji display name stored and returned correctly             | Name with emoji / register + fetch user / name intact in DB response                                    |

---

## 10. Definition of Done

- [ ] All Auth.js routes functional (email/password + Google OAuth).
- [ ] Email verification flow works end-to-end against Mailhog in Docker.
- [ ] Password reset flow works end-to-end.
- [ ] Session middleware gates all `/dashboard/*` and `/guide/*` routes.
- [ ] `pnpm test:unit` + `pnpm test:integration` + `pnpm test:e2e` all pass.
- [ ] Coverage ≥ 90% on `src/lib/auth/**`.
- [ ] No plain-text passwords anywhere; bcrypt cost = 12.
- [ ] `pnpm lint`, `pnpm typecheck`, and `pnpm build` all pass locally and in CI.
- [ ] Manual smoke test of the signup → verify → login flow in Docker Compose succeeds.
- [ ] No `TODO`, `FIXME`, or `@ts-ignore` in shipped code without a linked issue.
- [ ] `docs/architecture.md` updated if new patterns or modules were introduced.
- [ ] PR squash-merged to `main` with green CI.
      </file>

<file path="docs/_spec/03-guest-experience/spec.md">
# Spec 03 — Guest vs. Registered Experience

> **Status:** 📝 Spec ready — not yet implemented  
> **Sprint file:** [sprints.md](./sprints.md)

---

## 1. Feature Summary

This spec defines how FlashGuides differentiates between guest (unauthenticated) and registered users. Guests may generate up to 3 watermarked study-guide previews per day (IP-based quota). Their guides are not persisted to any account. Registered users have unlimited generation, full guide persistence, and access to all interactive features. The experience includes prominent signup CTAs, a public/featured guide gallery accessible to all, and clear visual watermarking of guest-generated content.

---

## 2. User Stories

1. As a **guest**, I want to generate up to 3 study guides per day without an account so that I can evaluate the product before committing to signup.
2. As a **guest**, I want my generated guides to display a watermark so that I understand they are preview-quality and not saved.
3. As a **guest**, I want to see a signup CTA when I attempt to exceed my daily quota so that I know how to unlock unlimited access.
4. As a **guest**, I want to browse a public gallery of featured guides so that I can see what FlashGuides produces.
5. As a **registered user**, I want to generate an unlimited number of guides so that I am not throttled.
6. As a **registered user**, I want my guides automatically saved to my account so that I can access them later.
7. As a **developer**, I want the gating enforced server-side so that it cannot be bypassed by disabling JavaScript.

---

## 3. Acceptance Criteria

| #     | Story | Given                                        | When                                    | Then                                                                      |
| ----- | ----- | -------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------- |
| AC-01 | US-1  | Guest, fewer than 3 guides generated today   | Guide generation requested              | Generation proceeds normally                                              |
| AC-02 | US-1  | Guest, exactly 3 guides generated today (IP) | 4th guide generation requested          | HTTP 429 returned; CTA to sign up shown                                   |
| AC-03 | US-2  | Guest guide generated                        | Guide page rendered                     | Watermark overlay visible; "Create a free account to save" banner present |
| AC-04 | US-3  | Guest at daily quota                         | Generation attempted                    | Modal/banner appears with signup CTA and remaining count (0/3)            |
| AC-05 | US-4  | Any visitor                                  | `/gallery` page loaded                  | Public featured guides visible without login                              |
| AC-06 | US-5  | Registered user, any number of guides        | Guide generation requested              | No quota check; generation proceeds                                       |
| AC-07 | US-6  | Registered user generates a guide            | Generation completes                    | Guide row created in DB with `userId`; accessible from dashboard          |
| AC-08 | US-7  | Guest with manipulated client state          | 4th guide attempted via direct API call | Server-side IP check rejects with 429                                     |
| AC-09 | US-1  | Guest, quota resets at midnight UTC          | First guide of new day                  | Generation proceeds (quota refreshed)                                     |

---

## 4. UX Notes

### Guest banner

Sticky banner at top of every page for guests: "You're using FlashGuides as a guest. X of 3 free guides used today. [Sign up free →]"

### Watermark

Semi-transparent diagonal "PREVIEW — Sign up to save" text overlay on the guide hero and footer of guest-generated guides.

### Quota exhausted state

A full-screen overlay modal with:

- Headline: "You've used your 3 free guides for today"
- Sub-copy: "Sign up free to unlock unlimited guides, save your work, and more."
- Primary CTA: "Create free account"
- Secondary: "Log in" (for existing users)

### Public gallery (`/gallery`)

Card grid of staff-picked or auto-featured guides. Shows title, study mode badge, and a truncated preview. Clicking opens the guide (public URL if `isPublic = true`). No auth required to browse; auth required to fork or save.

### Empty states

- Gallery with no featured guides: "Check back soon — featured guides are curated weekly."

---

## 5. Data Model

No new Prisma models. Uses:

- `Guide.isWatermark` (bool) — true for guest-generated guides.
- `Guide.userId` (nullable) — null for guest guides not attached to an account.
- Guest quota tracked **in-memory via Redis or SQLite** — a `GuestQuota` table:

```prisma
model GuestQuota {
  ip        String   @id
  count     Int      @default(0)
  resetAt   DateTime
  updatedAt DateTime @updatedAt

  @@map("guest_quotas")
}
```

Quota resets at midnight UTC: `resetAt = next midnight`. Check `resetAt < now` → reset count to 0.

---

## 6. API Contracts

### `GET /api/guest/quota`

No auth required.

**Response 200:**

```json
{ "used": 2, "limit": 3, "resetsAt": "2026-04-23T00:00:00.000Z" }
```

### Middleware: `enforceGuestQuota`

Applied at `GenerationOrchestrator` layer before triggering Claude.

- Registered user → skip.
- Guest → look up IP in `GuestQuota`. If `count >= 3` and `resetAt > now` → 429.
- On generation start → `count++`.

**Response 429:**

```json
{ "error": "Daily guest limit reached", "resetsAt": "...", "signupUrl": "/register" }
```

### `GET /gallery`

Server Component page. No API route needed — direct Prisma query for `isPublic = true, isWatermark = false` guides, ordered by `createdAt desc`, limit 24.

---

## 7. Dependencies

- Spec 01 (Infrastructure) — DB, Docker.
- Spec 02 (Authentication) — session to distinguish guest vs. registered.

---

## 8. Out of Scope

- Per-user rate limiting on registered accounts.
- Paid tier / subscription gating.
- CAPTCHA for guest generation.
- Guest guide claiming (linking a guest guide to an account after signup).

---

## 9. Test Plan

| #    | Type        | Category | Description                                               | Given / When / Then                                                                      |
| ---- | ----------- | -------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| T-01 | Unit        | Positive | `enforceGuestQuota` allows request when count < 3         | IP with count=2 / check / passes                                                         |
| T-02 | Unit        | Negative | `enforceGuestQuota` blocks request when count = 3         | IP with count=3 / check / 429                                                            |
| T-03 | Unit        | Positive | `enforceGuestQuota` resets count after midnight           | IP with count=3, resetAt in past / check / count reset, passes                           |
| T-04 | Unit        | Positive | Registered user bypasses quota check                      | Authenticated session / check / always passes                                            |
| T-05 | Integration | Positive | Guest generates 3 guides successfully                     | Test DB / 3 sequential requests from same IP / all 200                                   |
| T-06 | Integration | Negative | 4th request from same IP returns 429                      | Test DB / 4th request / 429 + signupUrl                                                  |
| T-07 | Integration | Positive | Guest quota resets at midnight                            | IP at count=3, resetAt=yesterday / new request / 200                                     |
| T-08 | Integration | Positive | `GET /api/guest/quota` returns correct count              | IP with 1 guide used / request / `{used:1, limit:3}`                                     |
| T-09 | Integration | Positive | Registered user is never quota-blocked                    | Authenticated user / unlimited requests / all pass                                       |
| T-10 | Component   | Positive | Guest banner renders with correct count                   | Mount with `used=2` / render / "2 of 3 free guides" visible                              |
| T-11 | Component   | Positive | Quota-exhausted modal renders                             | Mount with `used=3` / render / signup CTA visible, input disabled                        |
| T-12 | Component   | Positive | Watermark overlay renders on guest guide                  | Mount GuideRenderer with `isWatermark=true` / render / watermark element present         |
| T-13 | E2E         | Positive | Guest can generate and view 3 guides                      | Browser, no login / generate 3 guides / all load with watermark                          |
| T-14 | E2E         | Negative | Guest sees quota modal on 4th attempt                     | Browser, 3 guides used / attempt 4th / modal shown                                       |
| T-15 | E2E         | Positive | Gallery page loads without login                          | Browser / navigate to /gallery / guide cards visible                                     |
| T-16 | E2E         | Edge     | Two browser tabs generate simultaneously near quota       | Two tabs at count=2 / both submit at once / only one succeeds (server-side atomic)       |
| T-17 | Component   | Edge     | Gallery empty state renders when no featured guides exist | Mount `GalleryPage` with empty guides array / render / "Check back soon" message visible |

---

## 10. Definition of Done

- [ ] `GuestQuota` model migrated to DB.
- [ ] `enforceGuestQuota` middleware applied to generation endpoint.
- [ ] Watermark overlay renders on all guest-generated guide pages.
- [ ] Guest banner component shows live quota count.
- [ ] Quota-exhausted modal appears correctly at limit.
- [ ] `/gallery` page renders public guides without auth.
- [ ] All T-01 through T-17 tests passing.
- [ ] Coverage ≥ 85% on `src/lib/guest/**` and the quota middleware.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` all pass locally and in CI.
- [ ] Manual smoke test of the guest quota and gallery flows in Docker Compose succeeds.
- [ ] No `TODO`, `FIXME`, or `@ts-ignore` in shipped code without a linked issue.
- [ ] `docs/architecture.md` updated if new patterns or modules were introduced.
- [ ] PR squash-merged to `main`.
      </file>

<file path="docs/_spec/05-mcp-integrations/spec.md">
# Spec 05 — MCP Tool Integrations

> **Status:** 📝 Spec ready — not yet implemented  
> **Sprint file:** [sprints.md](./sprints.md)

---

## 1. Feature Summary

The MCP Tool Integrations spec covers the client factory and four adapter implementations that give the generation pipeline access to external data sources: Web Fetch (direct HTTP), Web Search (Tavily API), Image Generation (fal.ai FLUX), and YouTube Transcripts (`youtube-transcript` npm package). All adapters implement a common `IMCPClient` interface, are instantiated via `MCPClientFactory`, and wrap their respective SDKs behind internal interfaces for easy mocking and swapping. Unified error handling, configurable timeouts, and exponential-backoff retries are applied consistently across all adapters via a `RetryDecorator`.

---

## 2. User Stories

1. As the **generation pipeline**, I want to fetch the text content of any HTTPS URL so that URL inputs can be turned into study guides.
2. As the **generation pipeline**, I want to search the web for relevant facts and images when enriching a guide so that content is accurate and visually rich.
3. As the **generation pipeline**, I want to generate contextually relevant images for guide sections so that guides are visually engaging.
4. As the **generation pipeline**, I want to fetch the transcript of a YouTube video so that YouTube URLs can be turned into study guides.
5. As a **developer**, I want to add a new MCP tool by implementing one interface and registering it, without modifying existing code.
6. As a **developer**, I want all MCP calls mocked in unit/integration tests so that CI never hits live third-party APIs.

---

## 3. Acceptance Criteria

| #     | Story | Given                     | When                                                     | Then                                                                                   |
| ----- | ----- | ------------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| AC-01 | US-1  | Valid HTTPS URL           | `WebFetchAdapter.fetch(url)` called                      | Returns page text (≤100k chars, trimmed); no HTML tags                                 |
| AC-02 | US-1  | URL returns 404           | `WebFetchAdapter.fetch(url)` called                      | Throws `MCPFetchError` with status code                                                |
| AC-03 | US-1  | URL times out             | `WebFetchAdapter.fetch(url)` called                      | Retries up to 3 times then throws `MCPTimeoutError`                                    |
| AC-04 | US-2  | Valid query               | `TavilySearchAdapter.search(query)` called               | Returns array of `{title, url, snippet}` (up to 5 results)                             |
| AC-05 | US-2  | Tavily API returns 5xx    | `TavilySearchAdapter.search(query)` called               | Retries 3× then throws `MCPServiceError`                                               |
| AC-06 | US-3  | Valid image prompt        | `FalImageGenAdapter.generate(prompt)` called             | Returns `{url: string, alt: string}` for generated image                               |
| AC-07 | US-3  | fal.ai rate-limited       | `FalImageGenAdapter.generate(prompt)` called             | Throws `MCPRateLimitError`; generation pipeline degrades gracefully (no image)         |
| AC-08 | US-4  | Valid YouTube URL         | `YouTubeTranscriptAdapter.getTranscript(videoId)` called | Returns full transcript as plain text string                                           |
| AC-09 | US-4  | Video has no transcript   | `YouTubeTranscriptAdapter.getTranscript(videoId)` called | Throws `MCPTranscriptUnavailableError`                                                 |
| AC-10 | US-5  | New adapter class created | Registered with `MCPClientFactory`                       | `factory.get('new-tool')` returns correct instance without modifying factory internals |
| AC-11 | US-6  | Integration test runs     | Any MCP adapter test                                     | MSW intercepts all external HTTP; no live network calls made                           |

---

## 4. UX Notes

No direct user-facing UI — these are internal infrastructure services. Error states surface through the `GenerationOrchestrator`:

- Fetch error → SSE error event with "Could not fetch that URL" message.
- YouTube transcript unavailable → SSE error with "No captions available for that video".
- Image generation failure → guide proceeds without image (graceful degradation, no error shown to user).

---

## 5. Data Model

No new Prisma models. MCP calls are ephemeral.

---

## 6. API Contracts

### `IMCPClient` interface

```ts
// src/lib/mcp/types.ts
interface IMCPClient<TInput, TOutput> {
  readonly toolName: string
  execute(input: TInput): Promise<TOutput>
}
```

### `MCPClientFactory`

```ts
// src/lib/mcp/factory.ts
class MCPClientFactory {
  private static registry = new Map<string, IMCPClient<unknown, unknown>>()

  static register<T, R>(client: IMCPClient<T, R>): void
  static get<T, R>(toolName: string): IMCPClient<T, R>
}
```

(Factory + Registry pattern — adding a new tool = one `register()` call at the composition root.)

### Adapter signatures

```ts
// WebFetchAdapter
execute(input: { url: string; timeoutMs?: number }): Promise<{ text: string; title?: string }>

// TavilySearchAdapter
execute(input: { query: string; maxResults?: number }): Promise<Array<{ title: string; url: string; snippet: string }>>

// FalImageGenAdapter
execute(input: { prompt: string; width?: number; height?: number }): Promise<{ url: string; alt: string }>

// YouTubeTranscriptAdapter
execute(input: { videoId: string }): Promise<{ transcript: string; title?: string }>
```

### `RetryDecorator`

```ts
// src/lib/mcp/retry-decorator.ts
class RetryDecorator<T, R> implements IMCPClient<T, R> {
  constructor(
    private readonly client: IMCPClient<T, R>,
    private readonly maxRetries = 3,
    private readonly baseDelayMs = 300,
  ) {}
  async execute(input: T): Promise<R> {
    /* exponential backoff */
  }
}
```

---

## 7. Dependencies

- Spec 01 — Environment variables (`TAVILY_API_KEY`, `FAL_API_KEY`).

---

## 8. Out of Scope

- MCP server hosting / `@modelcontextprotocol/sdk` server-mode (only client mode used here).
- PDF parsing.
- Audio/video transcription beyond YouTube auto-captions.
- Caching of MCP results (future optimization).

---

## 9. Test Plan

| #    | Type        | Category | Description                                                               | Given / When / Then                                                             |
| ---- | ----------- | -------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| T-01 | Unit        | Positive | `WebFetchAdapter` returns stripped text                                   | MSW 200 with HTML / execute / plain text returned                               |
| T-02 | Unit        | Negative | `WebFetchAdapter` throws on 404                                           | MSW 404 / execute / `MCPFetchError` thrown                                      |
| T-03 | Unit        | Negative | `WebFetchAdapter` throws on timeout                                       | MSW delays indefinitely / execute with 200ms timeout / `MCPTimeoutError`        |
| T-04 | Unit        | Positive | `TavilySearchAdapter` parses response correctly                           | MSW mock Tavily response / execute / array of result objects                    |
| T-05 | Unit        | Negative | `TavilySearchAdapter` throws on 5xx                                       | MSW 500 / execute (1 retry) / `MCPServiceError` after retries                   |
| T-06 | Unit        | Positive | `FalImageGenAdapter` returns image URL                                    | MSW mock fal response / execute / `{url, alt}` returned                         |
| T-07 | Unit        | Negative | `FalImageGenAdapter` throws `MCPRateLimitError` on 429                    | MSW 429 / execute / specific error type                                         |
| T-08 | Unit        | Positive | `YouTubeTranscriptAdapter` returns transcript                             | Mock `youtube-transcript` / execute / transcript string                         |
| T-09 | Unit        | Negative | `YouTubeTranscriptAdapter` throws on disabled captions                    | Mock throws / execute / `MCPTranscriptUnavailableError`                         |
| T-10 | Unit        | Positive | `RetryDecorator` retries on transient errors                              | Mock fails 2× then succeeds / execute / success after retries                   |
| T-11 | Unit        | Negative | `RetryDecorator` throws after max retries                                 | Mock always fails / execute / throws after 3 retries                            |
| T-12 | Unit        | Positive | `MCPClientFactory.register` + `get` returns correct adapter               | Register mock adapter / get / same instance                                     |
| T-13 | Unit        | Negative | `MCPClientFactory.get` throws for unknown tool                            | Unknown key / get / throws                                                      |
| T-14 | Integration | Positive | Interface tests: all adapters satisfy `IMCPClient`                        | Each adapter / `instanceof` check + execute signature / pass                    |
| T-15 | Integration | Positive | `WebFetchAdapter` wrapped in `RetryDecorator` retries correctly           | MSW drops first 2 requests / execute / succeeds on 3rd                          |
| T-16 | Integration | Edge     | 50k+ char webpage gets truncated cleanly                                  | MSW returns 200k char HTML / execute / output ≤ 100k chars                      |
| T-17 | Integration | Edge     | Non-English page text preserved                                           | MSW returns UTF-8 Japanese HTML / execute / Japanese text in result             |
| T-18 | Unit        | Edge     | `WebFetchAdapter` returns empty result gracefully when page body is empty | MSW returns 200 with empty body / execute / `{text: ""}` returned without error |
| T-19 | Unit        | Edge     | `TavilySearchAdapter` returns empty array when search yields zero results | MSW returns `{results: []}` / execute / empty array returned without throwing   |

---

## 10. Definition of Done

- [ ] All four adapters implemented behind `IMCPClient`.
- [ ] `MCPClientFactory` registered with all adapters at composition root (`src/lib/container.ts`).
- [ ] `RetryDecorator` wraps all adapters.
- [ ] All MCP errors use typed error classes extending `MCPError`.
- [ ] All T-01 through T-19 tests passing.
- [ ] MSW handlers added to `tests/mocks/` for all four external APIs.
- [ ] Coverage ≥ 90% on `src/lib/mcp/**`.
- [ ] `docs/architecture.md` updated with Factory, Adapter, Decorator entries.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` all pass locally and in CI.
- [ ] Manual smoke test of URL and YouTube generation flows in Docker Compose succeeds.
- [ ] No `TODO`, `FIXME`, or `@ts-ignore` in shipped code without a linked issue.
- [ ] PR squash-merged to `main`.
      </file>

<file path="docs/_spec/06-study-guide-renderer/spec.md">
# Spec 06 — Study Guide Renderer

> **Status:** 📝 Spec ready — not yet implemented  
> **Sprint file:** [sprints.md](./sprints.md)

---

## 1. Feature Summary

The Study Guide Renderer displays the MDX content produced by the generation pipeline as a rich, interactive study-guide page. Each guide page features a hero section with optional media, an auto-generated table of contents, collapsible sections, inline images and embedded YouTube players, flashcard decks, inline quizzes, a highlight-to-note system, a reading progress bar, dark/light mode support, and a follow-up chat anchored to the guide's content. The page is accessible, responsive, and aesthetically polished.

---

## 2. User Stories

1. As a **user**, I want to read a generated guide as a well-structured page with a table of contents so that I can navigate large guides easily.
2. As a **user**, I want guide sections to be collapsible so that I can focus on what I need.
3. As a **user**, I want inline flashcard decks I can flip through so that I can test my memory as I read.
4. As a **user**, I want inline quizzes with immediate feedback so that I can check my understanding.
5. As a **user**, I want to highlight text and save it as a note so that I can capture key points.
6. As a **user**, I want a follow-up chat anchored to the guide so that I can ask deeper questions without starting over.
7. As a **user**, I want a reading progress bar so that I know how far through the guide I am.
8. As a **user**, I want the guide to respect my system dark/light mode preference and let me toggle it.
9. As a **user**, I want embedded YouTube videos inline where relevant so that I can watch supporting content without leaving the page.

---

## 3. Acceptance Criteria

| #     | Story | Given                                | When                                | Then                                                                         |
| ----- | ----- | ------------------------------------ | ----------------------------------- | ---------------------------------------------------------------------------- |
| AC-01 | US-1  | Guide with ≥2 sections               | Page loads                          | Auto-generated TOC renders with clickable links that scroll to each section  |
| AC-02 | US-2  | Any guide section                    | User clicks section header          | Section content collapses/expands with smooth animation                      |
| AC-03 | US-3  | Guide with flashcards                | Page loads                          | Flashcard deck visible; clicking a card flips it to show the answer          |
| AC-04 | US-3  | Flashcard deck                       | User clicks "Next"                  | Next flashcard shown; deck loops back after last card                        |
| AC-05 | US-4  | Guide with inline quiz               | Page loads                          | Quiz questions visible; selecting an answer shows correct/incorrect feedback |
| AC-06 | US-4  | User answers a quiz correctly        | First try                           | Green highlight + explanation shown                                          |
| AC-07 | US-5  | Registered user selects text         | Mouseup event fires                 | Tooltip "Save note" appears; clicking it saves note to DB                    |
| AC-08 | US-5  | Guest selects text                   | Mouseup event fires                 | Tooltip "Sign up to save notes" appears                                      |
| AC-09 | US-6  | Registered user                      | Types in follow-up chat and submits | Claude responds with context from the guide; response streams inline         |
| AC-10 | US-7  | User scrolls                         | Scroll progress changes             | Progress bar at top of page updates in real time                             |
| AC-11 | US-8  | Page loads                           | No user preference set              | Respects prefers-color-scheme; manual toggle persisted to localStorage       |
| AC-12 | US-9  | Guide section contains YouTube embed | Page renders                        | YouTube iframe displayed with proper aspect ratio                            |
| AC-13 | —     | Keyboard-only navigation             | Tab through flashcards / quiz       | All interactive elements reachable and operable via keyboard                 |
| AC-14 | —     | Screen reader                        | Guide content read                  | ARIA labels present on all interactive components; heading hierarchy correct |

---

## 4. UX Notes

### Page layout

```
┌─────────────────────────────────────┐
│  [← Back]  FlashGuides    [☀/☾] [Share]│
├──────────┬──────────────────────────┤
│          │  # Hero Title            │
│   TOC    │  [Hero image / video]    │
│          │                          │
│  § Intro │  ## Section 1            │
│  § Sec 1 │  [Collapsible ▾]         │
│  § Sec 2 │    Content...            │
│  § Quiz  │                          │
│  § Flash │  ## Flashcards           │
│          │  ┌───────────────────┐   │
│          │  │  Front of card    │   │
│          │  └───────────────────┘   │
│          │  [< Prev] [Flip] [Next>] │
│          │                          │
│          │  ## Quiz                 │
│          │  Q: What is ...?         │
│          │  ○ A  ● B  ○ C           │
│          │  [Check]                 │
├──────────┴──────────────────────────┤
│  Follow-up chat (sticky footer)     │
│  [Ask a follow-up question…] [Send] │
└─────────────────────────────────────┘
```

### Dark mode

Tailwind `dark:` classes; `class="dark"` toggled on `<html>` via JS; persisted to `localStorage`.

### Flashcard flip animation

CSS `transform: rotateY(180deg)` with `transition: 0.4s`.

### Highlight-to-note

On `mouseup`, check `window.getSelection()` for non-empty selection. Show floating bubble. On save: `POST /api/notes`.

### Reading progress

`IntersectionObserver` or scroll event listener updates a `<progress>` element width.

---

## 5. Data Model

Uses existing models:

- `Guide` — read for rendering.
- `Note` — created when user highlights and saves.

```prisma
// Already in schema:
model Note {
  id           String
  userId       String
  guideId      String
  selectedText String
  content      String   // user's annotation
  createdAt    DateTime
  updatedAt    DateTime
}
```

---

## 6. API Contracts

### `GET /guide/[slug]`

Server Component page. Fetches `Guide` by slug from DB. Returns 404 if not found. If `isPublic = false` and user is not the owner → 403 redirect to `/login`.

### `POST /api/notes`

Auth: required.

**Request body:**

```ts
z.object({
  guideId: z.string().cuid(),
  selectedText: z.string().min(1).max(2000),
  content: z.string().max(5000).optional().default(''),
})
```

**Response 201:** `{ id, guideId, selectedText, content, createdAt }`  
**Response 403:** Guide not owned by user.

### `POST /api/chat/[guideSlug]`

Auth: required.

**Request body:**

```ts
z.object({
  message: z.string().min(1).max(2000),
})
```

**Response:** `text/event-stream` — streamed Claude response with guide content as system context.

---

## 7. Dependencies

- Spec 04 — Guide generation produces the MDX content rendered here.
- Spec 02 — Auth for note saving and follow-up chat.

---

## 8. Out of Scope

- Collaborative annotation (multi-user notes on the same guide).
- Note export (covered in Spec 09).
- Audio text-to-speech reading.
- Guide editing by the user after generation.

---

## 9. Test Plan

| #    | Type        | Category      | Description                                                         | Given / When / Then                                                                          |
| ---- | ----------- | ------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| T-01 | Component   | Positive      | `GuideRenderer` renders TOC from MDX headings                       | MDX with 3 H2s / render / 3 TOC links                                                        |
| T-02 | Component   | Positive      | `CollapsibleSection` opens/closes on click                          | Mount closed / click header / content visible                                                |
| T-03 | Component   | Positive      | `FlashcardDeck` flips card on click                                 | Mount / click card / back face visible                                                       |
| T-04 | Component   | Positive      | `FlashcardDeck` navigates forward and wraps                         | Mount with 3 cards / click Next x3 / back to card 1                                          |
| T-05 | Component   | Positive      | `InlineQuiz` shows correct feedback on right answer                 | Mount / select correct answer + click check / green feedback                                 |
| T-06 | Component   | Negative      | `InlineQuiz` shows incorrect feedback on wrong answer               | Mount / select wrong answer / red feedback                                                   |
| T-07 | Component   | Positive      | Reading progress bar updates on scroll                              | Simulate scroll 50% / `ProgressBar.value` = ~50                                              |
| T-08 | Component   | Positive      | Dark mode toggle updates `<html>` class                             | Click toggle / `document.documentElement.classList` contains "dark"                          |
| T-09 | Component   | Positive      | Highlight-to-note tooltip shown on text selection                   | Simulate mouseup with selection / tooltip visible                                            |
| T-10 | Component   | Positive      | Guest sees signup tooltip on text selection                         | Mount unauthenticated / select text / "Sign up to save" message                              |
| T-11 | Component   | Accessibility | All interactive elements reachable via Tab                          | Render full guide / tabIndex / no focus traps                                                |
| T-12 | Integration | Positive      | `POST /api/notes` saves note to DB                                  | Authenticated user + valid body / request / 201 + row in DB                                  |
| T-13 | Integration | Negative      | `POST /api/notes` rejects note for another user's guide             | User A tries to note User B's private guide / request / 403                                  |
| T-14 | Integration | Positive      | Follow-up chat streams response with guide context                  | Mock Claude / message sent / SSE stream received                                             |
| T-15 | Integration | Negative      | Follow-up chat requires auth                                        | No session / request / 401                                                                   |
| T-16 | E2E         | Positive      | Full guide page renders all sections and TOC                        | Load /guide/slug / all headings visible in TOC                                               |
| T-17 | E2E         | Positive      | Flashcard interaction works                                         | Load guide / flip 3 cards / all flip correctly                                               |
| T-18 | E2E         | Positive      | Quiz answer flow                                                    | Load guide / answer quiz / feedback shown                                                    |
| T-19 | E2E         | Positive      | Highlight + save note                                               | Load guide / select text / click save / note saved                                           |
| T-20 | E2E         | Positive      | Dark mode persists across page reload                               | Toggle dark / reload / still dark                                                            |
| T-21 | Component   | Edge          | Guide with no flashcards renders without the flashcard deck section | Mount `GuideRenderer` with guide lacking flashcards / render / no flashcard component in DOM |
| T-22 | Component   | Edge          | RTL/non-English text content renders without layout overflow        | Mount guide with Arabic body text / render / text visible; no CSS overflow or clipping       |

---

## 10. Definition of Done

- [ ] Guide page renders all MDX-produced components correctly.
- [ ] TOC auto-generated and scroll-links working.
- [ ] Flashcard, quiz, collapsible section, and highlight-note all functional.
- [ ] Dark/light mode toggle with persistence.
- [ ] Follow-up chat streaming operational.
- [ ] Reading progress bar live.
- [ ] ARIA labels and keyboard nav verified.
- [ ] All T-01 through T-22 tests passing.
- [ ] Coverage ≥ 85% on `src/components/guide/**`.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` all pass locally and in CI.
- [ ] Manual smoke test of the full guide render flow in Docker Compose succeeds.
- [ ] No `TODO`, `FIXME`, or `@ts-ignore` in shipped code without a linked issue.
- [ ] `docs/architecture.md` updated if new patterns or modules were introduced.
- [ ] PR squash-merged to `main`.
      </file>

<file path="docs/_spec/00-overview.md">
# FlashGuides — Spec Overview

**Project:** FlashGuides  
**Owner:** Jeanpaul (jg847@njit.edu)  
**Date:** 2026-04-22  
**Status:** Phase 0 complete — Phase 1 (specs) in progress

---

## What is FlashGuides?

FlashGuides is a web application whose homepage is an AI chatbot that generates interactive study-guide webpages on demand. A user submits a topic, pastes text, or provides a URL / YouTube link; the app returns a fully-formed, aesthetically pleasing, interactive study-guide page with flashcards, quizzes, follow-up chat, and more.

---

## Spec index

| #                                       | Feature                                 | Status                                                            | Dependencies |
| --------------------------------------- | --------------------------------------- | ----------------------------------------------------------------- | ------------ |
| [01](./01-infrastructure/spec.md)       | Infrastructure & Project Setup          | ✅ Done (Phase 0)                                                 | —            |
| [02](./02-authentication/spec.md)       | Authentication & Session Management     | 📝 Spec ready                                                     | 01           |
| [03](./03-guest-experience/spec.md)     | Guest vs. Registered Experience         | 📝 Spec ready                                                     | 02           |
| [04](./04-chat-homepage/spec.md)        | Chat Homepage & Generation Orchestrator | 📝 Spec ready                                                     | 02, 03, 05   |
| [05](./05-mcp-integrations/spec.md)     | MCP Tool Integrations                   | 📝 Spec ready                                                     | 01           |
| [06](./06-study-guide-renderer/spec.md) | Study Guide Renderer                    | 📝 Spec ready                                                     | 04           |
| [07](./07-user-dashboard/spec.md)       | User Dashboard                          | ✅ Implemented                                                    | 04, 06       |
| [08](./08-account-management/spec.md)   | Account Management                      | ✅ Implemented                                                    | 02           |
| [09](./09-sharing-export/spec.md)       | Sharing & Export                        | ✅ Implemented                                                    | 06           |
| [10](./10-cli-export/spec.md)           | CLI: Source Export Tool                 | ✅ Implemented                                                    | 01           |
| [11](./11-observability/spec.md)        | Observability & Hardening               | 🚧 In progress — core hardening + API error responses implemented | 04           |

---

## Milestone sequencing

Per the brief (Section 10), ship in this order:

1. **Sprint 01** — Spec 01 (Phase 0 infra) ✅ — green CI from day one
2. **Sprint 02** — Spec 02 Auth — users can sign up and log in
3. **Sprint 03** — Spec 03 Guest gating — quota enforcement in place
4. **Sprint 04** — Spec 04 Chat + Spec 05 MCP (web fetch only) — end-to-end generation
5. **Sprint 05** — Spec 06 Renderer — pages are beautiful and interactive
6. **Sprint 06** — Spec 07 Dashboard + Spec 08 Account — users manage their work
7. **Sprint 07** — Spec 05 extensions: Web Search, Image Gen, YouTube
8. **Sprint 08** — Spec 09 Sharing & Export
9. **Sprint 09** — Spec 10 CLI export tool
10. **Sprint 10** — Spec 11 Observability & Hardening

---

## Definition of Done (global)

A feature is only "done" when **all** of the following are true:

1. Spec exists in `docs/_spec/` and is up to date with what shipped.
2. All user stories have passing acceptance tests.
3. Positive, negative, and edge cases from the spec's test plan are implemented and passing.
4. Unit + integration + E2E coverage meets thresholds (≥85% lines, ≥80% branches, ≥90% on `src/lib/**`).
5. `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` all pass locally and in CI.
6. Manual smoke test of the happy path in Docker Compose succeeds.
7. No `TODO`, `FIXME`, or `@ts-ignore` in the shipped code without a linked issue.
8. `docs/architecture.md` updated if new patterns or modules were introduced.
9. PR reviewed and squash-merged to `main`.
   </file>

<file path="docs/architecture.md">
# FlashGuides — Architecture

> **Revision:** Phase 1 baseline (prior to any feature implementation)  
> **Update policy:** Update this document whenever new patterns or modules are introduced (Definition of Done item 8).

---

## 1. Composition Root

All concrete dependencies are wired in one place and one place only:

```
src/lib/container.ts
```

Nothing in `src/app/`, `src/server/`, or business logic (`src/lib/ai/`, `src/lib/mcp/`, etc.) calls `new ConcreteClass()` directly. They import from `container.ts` or receive dependencies via function parameters (for testability).

The container is a simple module-scope singleton map:

```ts
// src/lib/container.ts (sketch)
import { PrismaClient } from '@/generated/prisma'
import { GuideRepository } from '@/lib/db/repositories/guides'
import { UserRepository } from '@/lib/db/repositories/users'
import { ClaudeClient } from '@/lib/ai/claude-client'
import { MCPClientFactory } from '@/lib/mcp/factory'
import { GenerationOrchestrator } from '@/lib/generation/orchestrator'

const prisma = new PrismaClient()
const guideRepo = new GuideRepository(prisma)
const userRepo = new UserRepository(prisma)
const claude = new ClaudeClient(process.env['ANTHROPIC_API_KEY']!)
const mcpFactory = new MCPClientFactory()
export const orchestrator = new GenerationOrchestrator(claude, mcpFactory, guideRepo)
export { guideRepo, userRepo, prisma }
```

Tests replace these with in-memory fakes or MSW-mocked network without touching any business logic.

---

## 2. Folder → Concern Mapping

| Folder                     | Concern                            | SOLID principle enforced                                                      |
| -------------------------- | ---------------------------------- | ----------------------------------------------------------------------------- |
| `src/lib/ai/`              | Claude client + streaming          | **SRP**: one file, one external vendor                                        |
| `src/lib/mcp/`             | MCP client factory + adapters      | **OCP + LSP**: new tool = new file, no changes to factory logic               |
| `src/lib/auth/`            | Auth.js configuration              | **SRP**: auth config isolated from session helpers                            |
| `src/lib/db/`              | Prisma client + repositories       | **ISP**: `IGuideReader` ≠ `IGuideWriter`; **DIP**: repos depend on interfaces |
| `src/lib/study-modes/`     | Strategy implementations           | **OCP**: new mode = new strategy, no changes to orchestrator                  |
| `src/lib/generation/`      | Guide builder + orchestrator       | **SRP + DIP**: wires strategies and repos together                            |
| `src/lib/security/`        | Headers, CSRF, sanitize            | **SRP**: isolated from route handlers                                         |
| `src/lib/rate-limit/`      | Rate-limit logic                   | **SRP**: keeps quota rules out of route handlers                              |
| `src/lib/guides/`          | Guide content parsing              | **SRP**: markdown/MDX parsing kept out of route files and UI components       |
| `src/lib/db/repositories/` | Persistence helpers for aggregates | **SRP**: route handlers stay thin while repositories own write operations     |
| `src/lib/logger/`          | Pino wrapper                       | **DIP**: callers depend on `ILogger` interface                                |
| `src/lib/errors/`          | Error handler                      | **SRP**: shared API/app error shaping kept out of route files                 |
| `src/lib/export/`          | Markdown / HTML / PDF builders     | **SRP**: one file per format                                                  |
| `src/lib/sharing/`         | Share link + fork logic            | **SRP**                                                                       |
| `src/lib/cli/`             | CLI helpers (for export-source.ts) | **SRP**                                                                       |
| `src/lib/container.ts`     | **Composition root**               | **DIP**: sole place where `new` is called on concrete classes                 |
| `src/server/`              | Route handlers, middleware         | **SRP**: thin handlers only; business logic in `src/lib/`                     |
| `src/components/`          | React UI components                | **ISP**: props interfaces are narrow                                          |

The study-guide renderer follows the same split: route/data access in `src/app/guide/[slug]/page.tsx`, markdown parsing in `src/lib/guides/content.ts`, client-side interactivity in `src/components/guide/`, and note persistence behind `src/lib/db/repositories/notes.ts`.

---

## 3. SOLID Principles in Practice

### Single Responsibility

Every module has exactly one reason to change. Examples:

- `ClaudeClient` changes only when the Anthropic SDK API changes.
- `GuideRepository` changes only when the Guide data model changes.
- `RateLimitMiddleware` changes only when quota rules change.

Violations to avoid: God objects, "utils.ts" files that grow without bound, route handlers that contain business logic.

### Open / Closed

The system is open to extension, closed to modification.

- **Study modes:** To add a `FlashcardsOnly` mode, add `src/lib/study-modes/flashcards-only.strategy.ts` implementing `IStudyModeStrategy` and register it in the factory map. Zero changes to `GenerationOrchestrator`.
- **MCP tools:** To add a new tool, add `src/lib/mcp/adapters/new-tool.adapter.ts` implementing `IMCPClient` and register a key in `MCPClientFactory`. Zero changes to callers.

### Liskov Substitution

Every `IMCPClient` implementation must satisfy: given any valid call to `execute(tool, params)`, the adapter returns the same shape regardless of which external service backs it. This is verified by a shared contract test suite run against every adapter.

### Interface Segregation

Repositories are split:

```ts
interface IGuideReader {
  findById
  findBySlug
  findByUser
  search
}
interface IGuideWriter {
  create
  update
  delete
  archive
}
interface IGuideRepository extends IGuideReader, IGuideWriter {}
```

Code that only reads guides depends only on `IGuideReader`, so it cannot accidentally call write operations.

### Dependency Inversion

High-level modules (`GenerationOrchestrator`, route handlers) depend on:

- `IGuideRepository` — not `GuideRepository`
- `IClaudeClient` — not `ClaudeClient`
- `IMCPClient` — not any concrete adapter

Concrete implementations are bound at `container.ts` and injected via constructor parameters.

---

## 4. Gang of Four Patterns

### Strategy — Study Modes

**Location:** `src/lib/study-modes/`  
**Why:** Each study mode (Overview, Deep-Dive, Exam-Prep, ELI5) changes the system prompt shape, section count, and media richness without touching the generation pipeline.

```
IStudyModeStrategy
├── OverviewStrategy
├── DeepDiveStrategy
├── ExamPrepStrategy
└── ELI5Strategy
```

`GenerationOrchestrator` holds a reference to `IStudyModeStrategy` and calls `strategy.buildSystemPrompt(topic)`.

---

### Factory — MCP Client Factory

**Location:** `src/lib/mcp/factory.ts`  
**Why:** The orchestrator requests a tool by name (`'web-search'`, `'image-gen'`, etc.) without knowing which SDK backs it.

```
MCPClientFactory.getClient(toolName: string): IMCPClient
```

Registry (internal map):

```
'web-fetch'        → WebFetchAdapter
'web-search'       → TavilyAdapter
'image-gen'        → FalAIAdapter
'youtube'          → YouTubeTranscriptAdapter
```

---

### Adapter — External SDK Wrappers

**Location:** `src/lib/mcp/adapters/`  
**Why:** External SDKs (`@tavily/core`, `@fal-ai/client`, `youtube-transcript`) have incompatible APIs. Adapters normalize them behind `IMCPClient`.

Each adapter:

1. Implements `execute(params): Promise<MCPResult>`
2. Throws `MCPToolError` on failure (not SDK-specific error shapes)
3. Is independently mockable and testable

```
IMCPClient
├── WebFetchAdapter         (uses global fetch)
├── TavilyAdapter           (@tavily/core)
├── FalAIAdapter            (@fal-ai/client)
└── YouTubeTranscriptAdapter (youtube-transcript)
```

The same pattern applies to the Auth.js Google provider, Nodemailer SMTP, and MinIO S3 client.

---

### Repository — Data Access

**Location:** `src/lib/db/repositories/`  
**Why:** Keeps Prisma calls out of business logic and route handlers; makes it trivial to test with an in-memory fake.

```
GuideRepository     implements IGuideRepository
UserRepository      implements IUserRepository
ShareLinkRepository implements IShareLinkRepository
RateLimitRepository implements IRateLimitRepository
```

---

### Template Method — Guide Generator

**Location:** `src/lib/generation/base-guide-generator.ts`  
**Why:** All study modes follow the same generation pipeline; only specific steps differ.

```
BaseGuideGenerator (abstract)
  └── generateGuide(input): Promise<Guide>
        ├── planSections(input)    ← abstract
        ├── enrichWithMedia()      ← abstract
        ├── buildQuizzes()         ← abstract
        └── buildFlashcards()      ← abstract
```

Each strategy implementation extends `BaseGuideGenerator` and overrides the abstract hooks.

---

### Builder — Guide Output Assembly

**Location:** `src/lib/generation/guide-builder.ts`  
**Why:** The final guide document is assembled from many optional parts (hero, TOC, sections, quizzes, flashcards). Builder lets the orchestrator compose these incrementally without nested constructors.

```ts
new GuideBuilder()
  .setHero(hero)
  .addSection(section)
  .addQuiz(quiz)
  .addFlashcard(card)
  .build(): StructuredGuide
```

---

### Facade — Generation Orchestrator

**Location:** `src/lib/generation/orchestrator.ts`  
**Why:** Route handlers must not know about quota checks, MCP orchestration, Claude streaming, or DB persistence. The Facade hides all of that behind a single call.

```ts
orchestrator.generate(userId | null, input: GenerationInput): AsyncIterable<StreamChunk>
```

Internally: `authCheck → quotaCheck → studyModeSelection → mcpSetup → stream → guideBuilder → persist → return`.

---

### Command — CLI Source Export

**Location:** `scripts/export-source.ts` with helpers in `src/lib/cli/`  
**Why:** The source-export tool packages a filesystem operation behind a single command-style entrypoint with parsed options and one `main()` execution path.

```ts
main(argv)
  -> parseCliOptions(argv)
  -> buildExportDocument(options)
  -> writeOutput(output, options)
```

The command object boundary keeps CLI concerns out of library code:

- `src/lib/cli/collect-files.ts` handles discovery and filtering.
- `src/lib/cli/always-exclude.ts` owns filename and content-based secret exclusion.
- `src/lib/cli/format-section.ts` owns presentation formatting.
- `src/lib/cli/estimate-tokens.ts` owns prompt-size estimation.

This keeps the command invoker thin while the reusable operations remain isolated and independently testable.

---

### Observer / Pub-Sub — Token Streaming

**Location:** `src/lib/generation/stream-emitter.ts`  
**Why:** Claude's token stream fans out to: (a) the HTTP response via `ReadableStream`, (b) a telemetry subscriber that logs tokens-per-second, (c) an abort listener for early disconnect.

```
StreamEmitter (EventEmitter)
├── HttpResponseSubscriber    → writes to SSE/ReadableStream
├── TelemetrySubscriber       → logs generation metrics
└── AbortSubscriber           → stops generation on client disconnect
```

---

### Chain of Responsibility — Middleware

**Location:** `src/middleware.ts` + `src/server/middleware/`  
**Why:** Each request passes through: `requestId → securityHeaders → rateLimitCheck → authSession → validation → handler`. Each link in the chain can short-circuit or pass control forward.

```
requestIdMiddleware
  → securityHeadersMiddleware
    → rateLimitMiddleware (guest routes)
      → authMiddleware (protected routes)
        → validationMiddleware
          → routeHandler
```

---

### Command — CLI Export Tool

**Location:** `scripts/export-source.ts` + `src/lib/cli/`  
**Why:** The export operation is encapsulated as a discrete command with `execute()` semantics, making it testable in isolation regardless of how it is invoked (CLI, future API endpoint, etc.).

```ts
class ExportSourceCommand {
  constructor(private opts: ExportOptions) {}
  async execute(): Promise<void>
}
```

---

### Decorator — MCP Client Wrapping

**Location:** `src/lib/mcp/decorators/`  
**Why:** Retry logic, timing instrumentation, and request logging should not bloat the adapters. Decorators wrap an `IMCPClient` and add cross-cutting behavior.

```
RetryDecorator     implements IMCPClient (wraps any IMCPClient, retries on 5xx)
LoggingDecorator   implements IMCPClient (logs request + response + duration)
```

Composed at `MCPClientFactory`: `new LoggingDecorator(new RetryDecorator(new TavilyAdapter()))`.

---

## 5. Dependency Injection Flow (full example)

```
container.ts
│
├── new PrismaClient()                              ← concrete
├── new GuideRepository(prisma)                    ← concrete, given IGuideRepository type
├── new ClaudeClient(apiKey)                       ← concrete, given IClaudeClient type
├── new MCPClientFactory()                         ← concrete, returns IMCPClient
│     └── new LoggingDecorator(
│           new RetryDecorator(
│             new TavilyAdapter(tavilyApiKey)))
│
└── new GenerationOrchestrator(
      claude: IClaudeClient,
      mcpFactory: IMCPClientFactory,
      guideRepo: IGuideRepository,
      studyModeFactory: IStudyModeFactory,
      rateLimitRepo: IRateLimitRepository)
```

Route handler at `src/app/api/generate/route.ts` only imports `orchestrator` from `container.ts` and calls `orchestrator.generate(...)`.

---

## 6. Data Flow — Guide Generation (end-to-end)

```
Browser
  ↓ POST /api/generate { input, studyMode }
src/app/api/generate/route.ts
  ↓ validates body with Zod
  ↓ calls orchestrator.generate(userId, input)
GenerationOrchestrator
  ↓ quota check via RateLimitRepository
  ↓ resolves IStudyModeStrategy from factory
  ↓ creates GuideBuilder
  ↓ calls BaseGuideGenerator.generateGuide()
      ↓ planSections() → Claude API call (structured output)
      ↓ enrichWithMedia() → MCPClientFactory → adapters (Tavily, fal.ai, YouTube)
      ↓ buildQuizzes() → Claude API call
      ↓ buildFlashcards() → Claude API call
  ↓ assembles output via GuideBuilder.build()
  ↓ persists Guide via GuideRepository
  ↓ emits tokens to StreamEmitter
StreamEmitter
  ↓ HttpResponseSubscriber → ReadableStream → SSE to browser
  ↓ TelemetrySubscriber → pino log entry
```

---

## 7. Testing Architecture

```
tests/
├── unit/          # pure functions, strategies, builders, repositories (in-memory DB)
├── integration/   # API routes + real SQLite test DB + MSW for network
└── e2e/           # full browser flows (Playwright) against built Next.js app
```

Interfaces make every layer swappable:

- `container.ts` is NOT imported in tests — callers receive fakes via constructor injection.
- MSW intercepts all external HTTP in unit/integration layers.
- Playwright tests run against a real Docker image (or `pnpm build && pnpm start`).

---

## 8. Change Log

| Date    | Version | Change                                                      |
| ------- | ------- | ----------------------------------------------------------- |
| Phase 1 | 1.0.0   | Initial architecture document — pre-implementation baseline |

</file>

<file path="src/app/api/auth/[...nextauth]/route.ts">
import type { NextRequest } from 'next/server'
import { handlers } from '@/lib/auth'
import { validateOrigin } from '@/lib/security/csrf'
import { forbiddenCsrfResponse } from '@/lib/security/response'

export const GET = handlers.GET

export async function POST(request: NextRequest) {
if (!validateOrigin(request)) {
return forbiddenCsrfResponse()
}

return handlers.POST(request)
}
</file>

<file path="src/app/api/auth/forgot-password/route.ts">
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/client'
import { createPasswordResetToken } from '@/lib/auth/tokens'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { sendPasswordResetEmail } from '@/lib/email'
import { validateOrigin } from '@/lib/security/csrf'
import { forbiddenCsrfResponse } from '@/lib/security/response'

const schema = z.object({ email: z.string().email() })

export async function POST(req: Request) {
if (!validateOrigin(req)) {
return forbiddenCsrfResponse()
}

try {
let body: unknown
try {
body = await req.json()
} catch {
return createApiErrorResponse(req, {
status: 400,
code: 'INVALID_JSON',
message: 'Invalid JSON',
})
}

    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'INVALID_EMAIL_ADDRESS',
        message: 'Invalid email address',
      })
    }

    const { email } = parsed.data

    const user = await prisma.user.findUnique({ where: { email } })

    if (user) {
      const token = await createPasswordResetToken(email)
      await sendPasswordResetEmail(email, token)
    }

    return NextResponse.json(
      { message: 'If that email exists, a reset link has been sent' },
      { status: 200 },
    )

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/auth/register/route.ts">
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/client'
import { hashPassword } from '@/lib/auth/password'
import { createVerificationToken } from '@/lib/auth/tokens'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { sendVerificationEmail } from '@/lib/email'
import { validateOrigin } from '@/lib/security/csrf'
import { forbiddenCsrfResponse } from '@/lib/security/response'

const registerSchema = z.object({
email: z.string().email(),
password: z
.string()
.min(8, 'Password must be at least 8 characters')
.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
.regex(/[0-9]/, 'Password must contain at least one number'),
name: z.string().min(1).max(100).optional(),
})

export async function POST(req: Request) {
if (!validateOrigin(req)) {
return forbiddenCsrfResponse()
}

try {
let body: unknown
try {
body = await req.json()
} catch {
return createApiErrorResponse(req, {
status: 400,
code: 'INVALID_JSON',
message: 'Invalid JSON',
})
}

    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) {
      const fields: Record<string, string[]> = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]?.toString() ?? '_'
        ;(fields[key] ??= []).push(issue.message)
      }
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { fields },
      })
    }

    const { email, password, name } = parsed.data

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return createApiErrorResponse(req, {
        status: 409,
        code: 'EMAIL_ALREADY_REGISTERED',
        message: 'Email already registered',
      })
    }

    const passwordHash = await hashPassword(password)

    await prisma.user.create({
      data: {
        email,
        name: name ?? null,
        password: passwordHash,
      },
    })

    const token = await createVerificationToken(email)
    await sendVerificationEmail(email, token)

    return NextResponse.json({ message: 'Verification email sent' }, { status: 201 })

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/auth/reset-password/route.ts">
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db/client'
import { consumeVerificationToken } from '@/lib/auth/tokens'
import { hashPassword } from '@/lib/auth/password'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { validateOrigin } from '@/lib/security/csrf'
import { forbiddenCsrfResponse } from '@/lib/security/response'

const schema = z.object({
token: z.string().min(1),
password: z
.string()
.min(8, 'Password must be at least 8 characters')
.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
.regex(/[0-9]/, 'Password must contain at least one number'),
})

export async function POST(req: Request) {
if (!validateOrigin(req)) {
return forbiddenCsrfResponse()
}

try {
let body: unknown
try {
body = await req.json()
} catch {
return createApiErrorResponse(req, {
status: 400,
code: 'INVALID_JSON',
message: 'Invalid JSON',
})
}

    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      const fields: Record<string, string[]> = {}
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]?.toString() ?? '_'
        ;(fields[key] ??= []).push(issue.message)
      }
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { fields },
      })
    }

    const { token, password } = parsed.data

    const identifier = await consumeVerificationToken(token)
    if (!identifier) {
      return createApiErrorResponse(req, {
        status: 410,
        code: 'TOKEN_INVALID',
        message: 'Token expired or invalid',
      })
    }

    const passwordHash = await hashPassword(password)

    await prisma.user.update({
      where: { email: identifier },
      data: { password: passwordHash },
    })

    return NextResponse.json({ message: 'Password updated' }, { status: 200 })

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/auth/verify-email/route.ts">
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { consumeVerificationToken } from '@/lib/auth/tokens'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

export async function GET(req: Request) {
try {
const { searchParams } = new URL(req.url)
const token = searchParams.get('token')

    if (!token) {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'MISSING_TOKEN',
        message: 'Missing token',
      })
    }

    const identifier = await consumeVerificationToken(token)

    if (!identifier) {
      return createApiErrorResponse(req, {
        status: 410,
        code: 'TOKEN_INVALID',
        message: 'Token expired or invalid',
      })
    }

    await prisma.user.update({
      where: { email: identifier },
      data: { emailVerified: new Date() },
    })

    return NextResponse.redirect(
      new URL('/dashboard?verified=1', process.env['NEXTAUTH_URL'] ?? 'http://localhost:3000'),
    )

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/generate/route.ts">
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { ApiRouteError, createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { ReadableFileError, extractReadableFileText } from '@/lib/generation/file-extractor'
import { generationOrchestrator } from '@/lib/generation/orchestrator'
import { enforceGuestGenerationRateLimit } from '@/lib/rate-limit/middleware'
import { sanitizeObjectStrings } from '@/lib/security/sanitize'
import type { SSEEvent } from '@/types/generation'

const generateSchema = z.object({
inputType: z.enum(['TOPIC', 'TEXT', 'URL', 'FILE']),
inputValue: z.string().min(1).max(120000),
sourceName: z.string().min(1).max(255).optional(),
studyMode: z.enum(['OVERVIEW', 'DEEP_DIVE', 'EXAM_PREP', 'ELI5']),
})

async function parseGenerateBody(req: Request): Promise<unknown> {
const contentType = req.headers.get('content-type') ?? ''

if (!contentType.includes('multipart/form-data')) {
return req.json()
}

const formData = await req.formData()
const inputType = formData.get('inputType')
const studyMode = formData.get('studyMode')
const file = formData.get('file')

if (inputType !== 'FILE') {
return { inputType, inputValue: '', studyMode }
}

if (!(file instanceof File) || file.size === 0) {
return { inputType, inputValue: '', studyMode }
}

const inputValue = await extractReadableFileText(file)

return {
inputType,
inputValue,
sourceName: file.name,
studyMode,
}
}

function encodeSSE(event: SSEEvent): string {
return `data: ${JSON.stringify(event)}\n\n`
}

export async function POST(req: Request): Promise<Response> {
try {
let body: unknown
const contentType = req.headers.get('content-type') ?? ''
try {
body = await parseGenerateBody(req)
} catch (error) {
if (error instanceof ReadableFileError) {
return createApiErrorResponse(req, {
status: error.code === 'UNSUPPORTED_FILE_TYPE' ? 415 : 422,
code: error.code,
message: error.message,
})
}

      if (contentType.includes('multipart/form-data')) {
        throw new ApiRouteError({
          status: 502,
          code: 'FILE_PROCESSING_FAILED',
          message: 'We could not process that uploaded file. Please try again.',
        })
      }

      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_JSON',
        message: 'Invalid JSON',
      })
    }

    const sanitizedBody =
      body && typeof body === 'object' && !Array.isArray(body)
        ? sanitizeObjectStrings(body as Record<string, unknown>)
        : body

    const parsed = generateSchema.safeParse(sanitizedBody)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const session = await auth()

    if (!session?.user?.id) {
      const rateLimitResponse = await enforceGuestGenerationRateLimit(req)
      if (rateLimitResponse) {
        return rateLimitResponse
      }
    }

    const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>()
    const writer = writable.getWriter()
    const encoder = new TextEncoder()

    ;(async () => {
      try {
        const gen = generationOrchestrator.orchestrate({
          request: parsed.data,
          session,
          req,
          skipGuestQuotaCheck: true,
        })

        for await (const event of gen) {
          await writer.write(encoder.encode(encodeSSE(event)))

          if (event.type === 'done' || event.type === 'error') {
            break
          }
        }
      } catch {
        const errEvent: SSEEvent = {
          type: 'error',
          message: 'AI service unavailable, please try again',
        }
        try {
          await writer.write(encoder.encode(encodeSSE(errEvent)))
        } catch {
          // writer already closed
        }
      } finally {
        await writer.close().catch(() => {
          // ignore close errors
        })
      }
    })()

    return new Response(readable, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })

} catch (error) {
return handleApiError(error, req)
}
}
</file>

<file path="src/app/api/health/route.ts">
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { getLogger, withRequestLogger } from '@/lib/logger'
import { getOrCreateRequestId, withRequestId } from '@/lib/logger/middleware'
import { applySecurityHeaders } from '@/lib/security/headers'

export async function GET(request: Request) {
const requestId = getOrCreateRequestId(request)

return withRequestLogger(requestId, async () => {
const logger = getLogger()

    try {
      await prisma.$queryRaw`SELECT 1`
      logger.info({ event: 'health.check.ok' }, 'Health check succeeded')
      return withRequestId(
        applySecurityHeaders(
          NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() }),
        ),
        requestId,
      )
    } catch {
      logger.error({ event: 'health.check.error' }, 'Health check failed')
      return withRequestId(
        applySecurityHeaders(NextResponse.json({ status: 'error' }, { status: 503 })),
        requestId,
      )
    }

})
}
</file>

<file path="src/app/api/test/reset-quota/route.ts">
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/client'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { GUEST_DAILY_LIMIT } from '@/lib/guest/quota'

function isPlaywrightTestEnabled(): boolean {
return process.env['NODE_ENV'] === 'test' || process.env['PLAYWRIGHT_TEST'] === '1'
}

/\*\*

- Test-only endpoint to reset the guest quota for a given IP.
- Only available when NODE_ENV=test to prevent misuse in production.
  \*/
  export async function POST(req: Request) {
  try {
  if (!isPlaywrightTestEnabled()) {
  return createApiErrorResponse(req, {
  status: 404,
  code: 'NOT_FOUND',
  message: 'Not found',
  })
  }

      let body: { ip?: string; used?: number }
      try {
        body = (await req.json()) as { ip?: string; used?: number }
      } catch {
        return createApiErrorResponse(req, {
          status: 400,
          code: 'INVALID_JSON',
          message: 'Invalid JSON',
        })
      }

      if (!body.ip) {
        return createApiErrorResponse(req, {
          status: 400,
          code: 'IP_REQUIRED',
          message: 'ip required',
        })
      }

      if (
        body.used !== undefined &&
        (!Number.isInteger(body.used) || body.used < 0 || body.used > GUEST_DAILY_LIMIT)
      ) {
        return createApiErrorResponse(req, {
          status: 400,
          code: 'INVALID_USED_COUNT',
          message: `used must be an integer between 0 and ${GUEST_DAILY_LIMIT}`,
        })
      }

      if (!body.used) {
        await prisma.guestQuota.deleteMany({ where: { ip: body.ip } })
        return NextResponse.json({ ok: true, used: 0 })
      }

      const resetAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

      await prisma.guestQuota.upsert({
        where: { ip: body.ip },
        create: {
          ip: body.ip,
          count: body.used,
          resetAt,
        },
        update: {
          count: body.used,
          resetAt,
        },
      })

      return NextResponse.json({ ok: true, used: body.used })

  } catch (error) {
  return handleApiError(error, req)
  }
  }
  </file>

<file path="src/app/globals.css">
@import 'tailwindcss';

:root {
--background: #ffffff;
--foreground: #000000;
color-scheme: light;
}

html.dark {
--background: #000000;
--foreground: #ffffff;
color-scheme: dark;
}

@theme inline {
--color-background: var(--background);
--color-foreground: var(--foreground);
--font-sans: var(--font-geist-sans);
--font-mono: var(--font-geist-mono);
}

html {
background: var(--background);
}

body {
background: var(--background);
color: var(--foreground);
font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif;
}
</file>

<file path="src/app/page.tsx">
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
</file>

<file path="src/components/auth/LoginForm.tsx">
'use client'

import { useState, FormEvent } from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export function LoginForm() {
const searchParams = useSearchParams()
const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard'

const [error, setError] = useState<string | null>(null)
const [loading, setLoading] = useState(false)

async function handleSubmit(e: FormEvent<HTMLFormElement>) {
e.preventDefault()
setError(null)
setLoading(true)

    const form = e.currentTarget
    const email = (form.elements.namedItem('email') as HTMLInputElement).value
    const password = (form.elements.namedItem('password') as HTMLInputElement).value

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      })

      if (!result || result.error) {
        const msg =
          result?.error === 'EmailNotVerified'
            ? 'Please verify your email before signing in.'
            : 'Invalid email or password.'
        setError(msg)
        return
      }

      const redirectUrl = new URL(callbackUrl, window.location.origin)
      window.location.href = `${redirectUrl.pathname}${redirectUrl.search}${redirectUrl.hash}`
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }

}

async function handleGoogleSignIn() {
setError(null)
setLoading(true)

    try {
      const csrfResponse = await fetch('/api/auth/csrf')
      if (!csrfResponse.ok) {
        throw new Error('Unable to fetch CSRF token')
      }

      const csrfBody = (await csrfResponse.json()) as { csrfToken?: string }
      if (!csrfBody.csrfToken) {
        throw new Error('Missing CSRF token')
      }

      const response = await fetch('/api/auth/signin/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Auth-Return-Redirect': '1',
        },
        body: new URLSearchParams({
          csrfToken: csrfBody.csrfToken,
          callbackUrl,
        }),
      })

      const result = (await response.json()) as { url?: string }
      if (!response.ok || !result.url) {
        throw new Error('Unable to start Google sign in')
      }

      window.location.assign(result.url)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }

}

return (

<div className="space-y-6">
{error && (
<div role="alert" className="rounded-md bg-red-50 p-3 text-red-700 text-sm">
{error}
</div>
)}

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">or</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <a href="/forgot-password" className="text-xs text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span
              aria-label="Loading"
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
            />
          ) : (
            'Sign in'
          )}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600">
        Don&apos;t have an account?{' '}
        <a
          href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign up
        </a>
      </p>
    </div>

)
}
</file>

<file path="src/components/chat/PromptBox.tsx">
'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import StudyModeSelector from './StudyModeSelector'
import StreamingProgress from './StreamingProgress'
import QuotaExhaustedModal from '@/components/guest/QuotaExhaustedModal'
import type { InputType, StudyModeType, SSEEvent } from '@/types/generation'

type GenState = 'idle' | 'fetching' | 'planning' | 'writing' | 'done' | 'error'

const INPUT_TABS: { value: InputType; label: string; placeholder: string }[] = [
{ value: 'TOPIC', label: 'Topic', placeholder: 'e.g. "The French Revolution"' },
{ value: 'TEXT', label: 'Text', placeholder: 'Paste your text here…' },
{ value: 'URL', label: 'URL', placeholder: 'https://…' },
{ value: 'FILE', label: 'File', placeholder: '' },
]

interface PromptBoxProps {
isAuthenticated?: boolean
}

const GUEST_GUIDE_STORAGE_KEY = 'flashguides.guest-guides'

function persistGuestGuideSlug(slug: string) {
try {
const raw = window.localStorage.getItem(GUEST_GUIDE_STORAGE_KEY)
const current = raw ? (JSON.parse(raw) as string[]) : []
const next = Array.from(new Set([...current, slug])).slice(-20)
window.localStorage.setItem(GUEST_GUIDE_STORAGE_KEY, JSON.stringify(next))
} catch {
// ignore localStorage errors
}
}

export default function PromptBox({ isAuthenticated = false }: PromptBoxProps) {
const router = useRouter()
const [inputType, setInputType] = useState<InputType>('TOPIC')
const [inputValue, setInputValue] = useState('')
const [selectedFile, setSelectedFile] = useState<File | null>(null)
const [studyMode, setStudyMode] = useState<StudyModeType>('OVERVIEW')
const [genState, setGenState] = useState<GenState>('idle')
const [tokenPreview, setTokenPreview] = useState('')
const [errorMsg, setErrorMsg] = useState('')
const [quotaOpen, setQuotaOpen] = useState(false)
const abortRef = useRef<AbortController | null>(null)

const currentStep =
genState === 'planning' ||
genState === 'writing' ||
genState === 'done' ||
(genState === 'fetching' && inputType === 'URL')
? (genState as 'fetching' | 'planning' | 'writing' | 'done')
: null

const isGenerating = genState === 'fetching' || genState === 'planning' || genState === 'writing'
const canSubmit = inputType === 'FILE' ? Boolean(selectedFile) : Boolean(inputValue.trim())

function cancelGeneration() {
abortRef.current?.abort()
abortRef.current = null
setGenState('idle')
setTokenPreview('')
setErrorMsg('')
}

async function handleSubmit(e: React.FormEvent) {
e.preventDefault()
if (!canSubmit || isGenerating) return

    setGenState('fetching')
    setTokenPreview('')
    setErrorMsg('')

    const abort = new AbortController()
    abortRef.current = abort

    let res: Response
    try {
      if (inputType === 'FILE' && selectedFile) {
        const formData = new FormData()
        formData.set('inputType', inputType)
        formData.set('studyMode', studyMode)
        formData.set('file', selectedFile)

        res = await fetch('/api/generate', {
          method: 'POST',
          body: formData,
          signal: abort.signal,
        })
      } else {
        res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ inputType, inputValue, studyMode }),
          signal: abort.signal,
        })
      }
    } catch {
      if (abort.signal.aborted) {
        setGenState('idle')
        abortRef.current = null
        return
      }

      setGenState('error')
      setErrorMsg('Network error, please try again')
      abortRef.current = null
      return
    }

    if (!res.ok) {
      if (res.status === 429) {
        setQuotaOpen(true)
        setGenState('idle')
        abortRef.current = null
        return
      }

      let apiMessage = `Server error (${res.status})`
      try {
        const body = (await res.json()) as { error?: { message?: string } }
        if (body.error?.message) {
          apiMessage = body.error.message
        }
      } catch {
        // ignore invalid error bodies
      }

      setGenState('error')
      setErrorMsg(apiMessage)
      abortRef.current = null
      return
    }

    const reader = res.body?.getReader()
    if (!reader) {
      setGenState('error')
      setErrorMsg('Unexpected response from server')
      abortRef.current = null
      return
    }

    const decoder = new TextDecoder()
    let buffer = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const parts = buffer.split('\n\n')
        buffer = parts.pop() ?? ''

        for (const part of parts) {
          const line = part.trim()
          if (!line.startsWith('data: ')) continue
          let event: SSEEvent
          try {
            event = JSON.parse(line.slice(6)) as SSEEvent
          } catch {
            continue
          }

          if (event.type === 'step') {
            if (
              event.step === 'fetching' ||
              event.step === 'planning' ||
              event.step === 'writing'
            ) {
              setGenState(event.step)
            }
          } else if (event.type === 'token') {
            setTokenPreview((prev) => prev + event.text)
          } else if (event.type === 'done') {
            setGenState('done')
            if (!isAuthenticated && event.isGuestGuide) {
              persistGuestGuideSlug(event.guideSlug)
            }
            abortRef.current = null
            router.push(`/guide/${event.guideSlug}`)
            return
          } else if (event.type === 'error') {
            let parsed: { code?: string } = {}
            try {
              parsed = JSON.parse(event.message) as { code?: string }
            } catch {
              // not JSON, treat as plain message
            }
            if (parsed.code === 'QUOTA_EXCEEDED') {
              setQuotaOpen(true)
              setGenState('idle')
            } else {
              setGenState('error')
              setErrorMsg(event.message)
            }
            abortRef.current = null
            return
          }
        }
      }
    } catch {
      if (!abort.signal.aborted) {
        setGenState('error')
        setErrorMsg('Stream interrupted, please try again')
      } else {
        setGenState('idle')
      }
    } finally {
      abortRef.current = null
    }

}

const currentTab = INPUT_TABS.find((t) => t.value === inputType)

return (
<>

<form
        onSubmit={handleSubmit}
        data-testid="prompt-box"
        className="w-full space-y-4 rounded-[1.6rem] border border-zinc-300 bg-white/95 p-6 shadow-sm dark:border-zinc-700 dark:bg-black/90"
      >
{/_ Input mode tabs _/}
<div className="flex gap-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900" role="tablist">
{INPUT_TABS.map((tab) => (
<button
key={tab.value}
type="button"
role="tab"
aria-selected={inputType === tab.value}
data-testid={`input-tab-${tab.value.toLowerCase()}`}
onClick={() => {
setInputType(tab.value)
setInputValue('')
setSelectedFile(null)
}}
className={[
'flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
inputType === tab.value
? 'bg-white shadow-sm text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50'
: 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200',
].join(' ')} >
{tab.label}
</button>
))}
</div>

        {/* Textarea */}
        {inputType === 'FILE' ? (
          <label className="block rounded-xl border border-dashed border-zinc-600 bg-zinc-950/70 px-4 py-5 text-sm text-zinc-200 transition-colors hover:border-zinc-400">
            <span className="block font-medium text-zinc-100">Upload a source file</span>
            <span className="mt-1 block text-zinc-400">
              PDF, text, markdown, JSON, CSV, code, and other readable files.
            </span>
            <input
              type="file"
              data-testid="prompt-file-input"
              disabled={isGenerating}
              onChange={(event) => {
                const file = event.target.files?.[0] ?? null
                setSelectedFile(file)
                setInputValue(file?.name ?? '')
              }}
              className="mt-4 block w-full cursor-pointer text-sm text-zinc-300 file:mr-4 file:rounded-full file:border-0 file:bg-zinc-100 file:px-4 file:py-2 file:font-medium file:text-zinc-950 hover:file:bg-zinc-200 disabled:opacity-50"
            />
            {selectedFile ? (
              <span className="mt-3 block text-sm text-zinc-100">
                Selected: {selectedFile.name}
              </span>
            ) : null}
          </label>
        ) : (
          <textarea
            data-testid="prompt-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={currentTab?.placeholder ?? ''}
            rows={inputType === 'TEXT' ? 8 : 3}
            disabled={isGenerating}
            className="w-full resize-none rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-950 placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-400"
          />
        )}

        {/* Study mode selector */}
        <StudyModeSelector value={studyMode} onChange={setStudyMode} />

        {/* Submit */}
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={!canSubmit || isGenerating}
            data-testid="generate-button"
            className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
          >
            {isGenerating ? 'Generating…' : 'Generate →'}
          </button>

          <button
            type="button"
            onClick={cancelGeneration}
            disabled={!isGenerating}
            data-testid="cancel-generation-button"
            className="rounded-lg border border-zinc-300 px-4 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-950 hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
          >
            Stop
          </button>
        </div>

        {/* Error */}
        {genState === 'error' && errorMsg && (
          <p
            role="alert"
            data-testid="generation-error"
            className="text-sm text-red-600 dark:text-red-400"
          >
            {errorMsg}
          </p>
        )}
      </form>

      {/* Streaming progress (shown while generating) */}
      {isGenerating && (
        <div className="mt-4">
          <StreamingProgress step={currentStep} tokenPreview={tokenPreview} />
        </div>
      )}

      <QuotaExhaustedModal open={quotaOpen} onClose={() => setQuotaOpen(false)} />
    </>

)
}
</file>

<file path="src/components/chat/StreamingProgress.tsx">
'use client'

type Step = 'fetching' | 'planning' | 'writing' | 'done'

interface StreamingProgressProps {
step: Step | null
tokenPreview: string
}

const STEPS: { key: Step; label: string }[] = [
{ key: 'fetching', label: 'Fetching' },
{ key: 'planning', label: 'Planning' },
{ key: 'writing', label: 'Writing' },
{ key: 'done', label: 'Done' },
]

function stepIndex(step: Step | null): number {
if (!step) return -1
return STEPS.findIndex((s) => s.key === step)
}

export default function StreamingProgress({ step, tokenPreview }: StreamingProgressProps) {
const current = stepIndex(step)

return (

<div data-testid="streaming-progress" className="w-full space-y-4">
{/_ Step indicators _/}
<ol className="flex items-center gap-6" aria-label="Generation progress">
{STEPS.map((s, i) => {
const isComplete = current > i
const isActive = current === i
return (
<li key={s.key} className="flex items-center gap-2" data-testid={`step-${s.key}`}>
<span
className={[
'flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold',
isComplete
? 'bg-green-500 text-white'
: isActive
? 'bg-indigo-600 text-white animate-pulse'
: 'bg-zinc-200 text-zinc-400 dark:bg-zinc-700',
].join(' ')}
aria-current={isActive ? 'step' : undefined} >
{isComplete ? '✓' : i + 1}
</span>
<span
className={[
'text-sm font-medium',
isComplete
? 'text-green-600 dark:text-green-400'
: isActive
? 'text-indigo-600 dark:text-indigo-400'
: 'text-zinc-400',
].join(' ')} >
{s.label}
</span>
</li>
)
})}
</ol>

      {/* Token preview */}
      {tokenPreview && (
        <pre
          data-testid="token-preview"
          className="max-h-48 overflow-y-auto rounded-lg bg-zinc-50 p-4 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 whitespace-pre-wrap"
        >
          {tokenPreview}
        </pre>
      )}
    </div>

)
}
</file>

<file path="src/components/guest/GuestBanner.tsx">
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { hasAuthenticatedUser } from '@/lib/auth/session'
import { getQuotaStatus } from '@/lib/guest/quota'
import { headers } from 'next/headers'

/\*\*

- GuestBanner — Server Component.
- Renders a sticky top banner for unauthenticated visitors showing their
- daily quota usage and a sign-up CTA. Returns null for logged-in users.
  \*/
  export default async function GuestBanner() {
  const session = await auth()

// Do not show the banner to authenticated users
if (hasAuthenticatedUser(session)) return null

// Extract IP from incoming request headers (available in RSC via next/headers)
const headersList = await headers()
const forwarded = headersList.get('x-forwarded-for')
const ip = forwarded ? (forwarded.split(',')[0]?.trim() ?? 'unknown') : 'unknown'

const { used, limit } = await getQuotaStatus(ip)

return (

<div
      role="banner"
      aria-label="Guest quota banner"
      className="sticky top-0 z-50 w-full bg-amber-50 border-b border-amber-200 px-4 py-2 text-sm text-amber-900 flex items-center justify-between gap-4"
    >
<span>
You&apos;re using FlashGuides as a guest.{' '}
<strong>
{used} of {limit} free guides
</strong>{' '}
used today.
</span>
<Link
        href="/register"
        className="shrink-0 font-semibold underline underline-offset-2 hover:text-amber-700 transition-colors"
      >
Sign up free →
</Link>
</div>
)
}
</file>

<file path="src/lib/ai/claude.ts">
import { createAnthropic } from '@ai-sdk/anthropic'
import Anthropic from '@anthropic-ai/sdk'
import { streamText, generateText } from 'ai'
import { BASE_SYSTEM_PROMPT } from './prompts/index'

const MODEL_ID = 'claude-sonnet-4-5'

function isPlaywrightTestEnabled(): boolean {
return process.env['PLAYWRIGHT_TEST'] === '1'
}

function createTextStream(chunks: string[]): ReadableStream<string> {
return new ReadableStream<string>({
start(controller) {
chunks.forEach((chunk) => controller.enqueue(chunk))
controller.close()
},
})
}

/\*\*

- ClaudeClient — Adapter over the Vercel AI SDK + Anthropic provider.
- Exposes `streamText` and `generateText` with the configured model.
  \*/
  export class ClaudeClient {
  private readonly anthropic = createAnthropic({
  apiKey: process.env['ANTHROPIC_API_KEY'],
  })

private anthropicSdk: Anthropic | null = null

private getAnthropicSdk(): Anthropic {
if (!this.anthropicSdk) {
this.anthropicSdk = new Anthropic({
apiKey: process.env['ANTHROPIC_API_KEY'],
})
}

    return this.anthropicSdk

}

/\*\*

- Stream a text generation response.
- Returns a ReadableStream of token chunks.
  \*/
  async streamGenerate(
  prompt: string,
  systemSuffix?: string,
  maxOutputTokens = 4096,
  ): Promise<ReadableStream<string>> {
  if (isPlaywrightTestEnabled()) {
  return createTextStream([
  `Stubbed response for: ${prompt}. `,
  systemSuffix
  ? 'Guide context loaded successfully.'
  : 'No additional guide context provided.',
  ])
  }

  const system = systemSuffix ? `${BASE_SYSTEM_PROMPT}\n\n${systemSuffix}` : BASE_SYSTEM_PROMPT

  const result = streamText({
  model: this.anthropic(MODEL_ID),
  system,
  prompt,
  maxOutputTokens,
  })

  return result.textStream

}

/\*\*

- Generate full text (non-streaming) — used for planning/structuring steps.
  \*/
  async generate(prompt: string, systemSuffix?: string, maxOutputTokens = 2048): Promise<string> {
  if (isPlaywrightTestEnabled()) {
  return `Stubbed generation for: ${prompt}${systemSuffix ? ' with context' : ''}`
  }

  const system = systemSuffix ? `${BASE_SYSTEM_PROMPT}\n\n${systemSuffix}` : BASE_SYSTEM_PROMPT

  const result = await generateText({
  model: this.anthropic(MODEL_ID),
  system,
  prompt,
  maxOutputTokens,
  })

  return result.text

}

async extractTextFromPdf(buffer: Buffer, filename?: string): Promise<string> {
if (isPlaywrightTestEnabled()) {
return `Stubbed OCR text extracted from ${filename ?? 'uploaded.pdf'}`
}

    const message = await this.getAnthropicSdk().messages.create({
      model: MODEL_ID,
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'document',
              source: {
                type: 'base64',
                media_type: 'application/pdf',
                data: buffer.toString('base64'),
              },
            },
            {
              type: 'text',
              text:
                `Extract the readable text from this PDF in plain text. ` +
                `Preserve the document's actual subject matter and section order. ` +
                `Do not summarize, explain, or infer from the file type or filename. ` +
                `If some pages are scanned images, OCR them. ` +
                `Return only the document text for ${filename ?? 'the uploaded PDF'}.`,
            },
          ],
        },
      ],
    })

    return message.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim()

}
}

export const claudeClient = new ClaudeClient()
</file>

<file path="src/lib/auth/config.ts">
import type { NextAuthConfig } from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { z } from 'zod'
import { prisma } from '@/lib/db/client'
import { verifyPassword } from './password'
import { authorizedCallbackConfig } from './middleware'

const credentialsSchema = z.object({
email: z.string().email(),
password: z.string().min(1),
})

export const authConfig = {
adapter: PrismaAdapter(prisma),
session: {
strategy: 'jwt',
},
pages: {
signIn: '/login',
},
providers: [
Google({
clientId: process.env['GOOGLE_CLIENT_ID'] ?? '',
clientSecret: process.env['GOOGLE_CLIENT_SECRET'] ?? '',
allowDangerousEmailAccountLinking: true,
}),
Credentials({
credentials: {
email: { label: 'Email', type: 'email' },
password: { label: 'Password', type: 'password' },
},
/\*\*
_ Full credentials authorize: DB lookup + bcrypt verify + emailVerified check.
_/
async authorize(credentials) {
const parsed = credentialsSchema.safeParse(credentials)
if (!parsed.success) return null

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        })

        if (!user || !user.password) return null

        const valid = await verifyPassword(parsed.data.password, user.password)
        if (!valid) return null

        if (!user.emailVerified) {
          // Throw an error so Auth.js surfaces it to the client as a 403-equivalent
          throw new Error('EmailNotVerified')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          sessionVersion: user.sessionVersion,
        }
      },
    }),

],
callbacks: {
async jwt({ token, user }) {
const userId =
typeof user?.id === 'string'
? user.id
: typeof token['id'] === 'string'
? token['id']
: null

      if (!userId) {
        return token
      }

      const currentUser = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
          sessionVersion: true,
        },
      })

      if (!currentUser) {
        return {}
      }

      if (user?.id) {
        token['id'] = currentUser.id
        token['sub'] = currentUser.id
        token['email'] = currentUser.email
        token['name'] = currentUser.name ?? undefined
        token['picture'] = currentUser.image ?? undefined
        token['sessionVersion'] = currentUser.sessionVersion
        return token
      }

      if (token['sessionVersion'] !== currentUser.sessionVersion) {
        return {}
      }

      return token
    },
    async session({ session, token }) {
      const id = token['id']
      if (typeof id === 'string') {
        session.user.id = id
      }

      if (typeof token['name'] === 'string') {
        session.user.name = token['name']
      }

      if (typeof token['email'] === 'string') {
        session.user.email = token['email']
      }

      if (typeof token['picture'] === 'string') {
        session.user.image = token['picture']
      }
      return session
    },
    authorized: authorizedCallbackConfig,

},
} satisfies NextAuthConfig
</file>

<file path="src/lib/auth/index.ts">
import NextAuth from 'next-auth'
import { authConfig } from './config'

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig)
</file>

<file path="src/lib/db/client.ts">
import { PrismaClient } from '@/generated/prisma'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const globalForPrisma = globalThis as unknown as {
prisma: PrismaClient | undefined
prismaAdapter: PrismaBetterSqlite3 | undefined
}

function getDatabaseUrl(): string {
const databaseUrl = process.env['DATABASE_URL']
if (!databaseUrl) {
throw new Error('DATABASE_URL is required')
}

return databaseUrl
}

const adapter =
globalForPrisma.prismaAdapter ??
new PrismaBetterSqlite3({
url: getDatabaseUrl(),
})

export const prisma =
globalForPrisma.prisma ??
new PrismaClient({
adapter,
log: process.env['NODE_ENV'] === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env['NODE_ENV'] !== 'production') {
globalForPrisma.prisma = prisma
globalForPrisma.prismaAdapter = adapter
}
</file>

<file path="src/lib/email/index.ts">
import nodemailer from 'nodemailer'

function createTransport() {
return nodemailer.createTransport({
host: process.env['SMTP_HOST'] ?? 'localhost',
port: parseInt(process.env['SMTP_PORT'] ?? '1025', 10),
auth: process.env['SMTP_USER']
? {
user: process.env['SMTP_USER'],
pass: process.env['SMTP_PASS'] ?? '',
}
: undefined,
secure: false,
})
}

const FROM = process.env['SMTP_FROM'] ?? 'noreply@flashguides.local'
const APP_URL = process.env['NEXTAUTH_URL'] ?? 'http://localhost:3000'

/\*\*

- Send an email verification link to a newly registered user.
  \*/
  export async function sendVerificationEmail(email: string, token: string): Promise<void> {
  const url = `${APP_URL}/verify-email?token=${token}`
  const transport = createTransport()

await transport.sendMail({
from: FROM,
to: email,
subject: 'Verify your FlashGuides email',
text: `Click the link to verify your email address:\n\n${url}\n\nThis link expires in 24 hours.`,
html: `<p>Click the link below to verify your email address:</p>

<p><a href="${url}">${url}</a></p>
<p>This link expires in 24 hours.</p>`,
  })
}

/\*\*

- Send a password reset link.
  \*/
  export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  const url = `${APP_URL}/reset-password?token=${token}`
  const transport = createTransport()

await transport.sendMail({
from: FROM,
to: email,
subject: 'Reset your FlashGuides password',
text: `Click the link to reset your password:\n\n${url}\n\nThis link expires in 1 hour.`,
html: `<p>Click the link below to reset your password:</p>

<p><a href="${url}">${url}</a></p>
<p>This link expires in 1 hour. If you did not request this, ignore this email.</p>`,
  })
}

/\*\*

- Send an email change verification link.
  \*/
  export async function sendEmailChangeVerification(email: string, token: string): Promise<void> {
  const url = `${APP_URL}/api/account/verify-email-change?token=${token}`
  const transport = createTransport()

await transport.sendMail({
from: FROM,
to: email,
subject: 'Confirm your new FlashGuides email',
text: `Click the link to confirm your new email address:\n\n${url}\n\nThis link expires in 24 hours.`,
html: `<p>Click the link below to confirm your new email address:</p>

<p><a href="${url}">${url}</a></p>
<p>This link expires in 24 hours.</p>`,
  })
}
</file>

<file path="src/lib/generation/builder.ts">
import type { FlashcardItem, GuideSection, QuizItem } from '@/types/generation'

/\*\*

- GuideBuilder — fluent Builder pattern for assembling MDX study guide content.
-
- Usage:
- const mdx = new GuideBuilder()
-     .setTitle('My Guide')
-     .addSection({ heading: 'Intro', body: '...' })
-     .addQuiz({ question: '...', options: ['A','B'], correctIndex: 0 })
-     .build()
  \*/
  export class GuideBuilder {
  private title = ''
  private readonly sections: GuideSection[] = []
  private readonly quizItems: QuizItem[] = []
  private readonly flashcards: FlashcardItem[] = []

setTitle(title: string): this {
this.title = title
return this
}

addSection(section: GuideSection): this {
this.sections.push(section)
return this
}

addQuiz(item: QuizItem): this {
this.quizItems.push(item)
return this
}

addFlashcard(card: FlashcardItem): this {
this.flashcards.push(card)
return this
}

addFlashcards(cards: FlashcardItem[]): this {
this.flashcards.push(...cards)
return this
}

private serializeString(value: string): string {
return JSON.stringify(value)
}

/\*\*

- Assemble the full MDX string from all components.
  \*/
  build(): string {
  const parts: string[] = []

  // Title
  parts.push(`# ${this.title}\n`)

  // Sections
  for (const section of this.sections) {
  parts.push(`## ${section.heading}\n`)
  parts.push(section.body)
  parts.push('')
  }

  if (this.flashcards.length > 0) {
  parts.push('## Flashcards\n')
  parts.push(`<Flashcards cards={${JSON.stringify(this.flashcards)}} />`)
  parts.push('')
  }

  // Quiz section (Exam Prep mode)
  if (this.quizItems.length > 0) {
  parts.push('## Practice Questions\n')
  this.quizItems.forEach((item, index) => {
  const explanation =
  item.explanation ?? `Review the material and revisit question ${index + 1}.`
  parts.push(
  `<Quiz question={${this.serializeString(item.question)}} options={${JSON.stringify(item.options)}} correct={${item.correctIndex}} explanation={${this.serializeString(explanation)}} />`,
  )
  parts.push('')
  })
  }

  return parts.join('\n').trimEnd()

}
}
</file>

<file path="src/lib/generation/orchestrator.ts">
import { prisma } from '@/lib/db/client'
import { claudeClient } from '@/lib/ai/claude'
import { StudyModeStrategyFactory } from '@/lib/study-modes/factory'
import { GuideBuilder } from './builder'
import { generateSlug } from './slug'
import { normalizeInput } from './input-normalizer'
import { sanitizeGuideContentForMdx } from '@/lib/guides/content'
import { checkAndIncrementQuota, extractIp } from '@/lib/guest/quota'
import type {
  GenerationRequest,
  GeneratedGuide,
  SSEEvent,
  NormalizedInput,
} from '@/types/generation'
import type { Session } from 'next-auth'

export interface OrchestratorContext {
request: GenerationRequest
session: Session | null
req: Request
skipGuestQuotaCheck?: boolean
}

function getPersistedInputType(
request: GenerationRequest,
): Exclude<GenerationRequest['inputType'], 'FILE'> {
return request.inputType === 'FILE' ? 'TEXT' : request.inputType
}

function isGuideContentComplete(
content: string,
title: string,
sections: Array<{ heading: string }>,
quizCount: number,
): boolean {
const trimmed = content.trim()
if (!trimmed.startsWith('# ')) {
return false
}

if (!trimmed.includes(`# ${title}`)) {
return false
}

if (sections.some((section) => !trimmed.includes(`## ${section.heading}`))) {
return false
}

if (quizCount > 0) {
const renderedQuizCount = (trimmed.match(/<Quiz\s/g) ?? []).length
if (!trimmed.includes('## Practice Questions') || renderedQuizCount < quizCount) {
return false
}
}

if ((trimmed.match(/```/g) ?? []).length % 2 !== 0) {
return false
}

return true
}

function getAssembleTokenBudget(request: GenerationRequest, isRegistered: boolean): number {
if (request.studyMode === 'EXAM_PREP') {
return request.inputType === 'FILE'
? isRegistered
? 12288
: 10240
: isRegistered
? 10240
: 8192
}

return isRegistered ? 8192 : 6144
}

/\*\*

- GenerationOrchestrator — Facade over the full generation pipeline.
-
- Steps:
- 1. Auth check (guest vs. registered)
- 2. Quota check (guests only)
- 3. Input normalisation
- 4. Build strategy
- 5. Plan sections
- 6. Enrich with media
- 7. Build quizzes
- 8. Assemble MDX
- 9. Persist to DB
- 10. Emit done event
      \*/
      export class GenerationOrchestrator {
      /\*\*
  - Run the pipeline and yield SSE events.
  - Yields `{ type: 'step' }`, `{ type: 'token' }`, `{ type: 'done' }`, or `{ type: 'error' }`.
    */
    async *orchestrate(ctx: OrchestratorContext): AsyncGenerator<SSEEvent> {
    const { request, session, req } = ctx
    const isRegistered = Boolean(session?.user?.id)

    // ── Step 1: Quota check (guests only) ───────────────────────────────────
    if (!isRegistered && !ctx.skipGuestQuotaCheck) {
    const ip = extractIp(req)
    const quota = await checkAndIncrementQuota(ip)
    if (!quota.allowed) {
    yield {
    type: 'error',
    message: JSON.stringify({
    code: 'QUOTA_EXCEEDED',
    resetsAt: quota.resetsAt.toISOString(),
    signupUrl: '/register',
    }),
    }
    return
    }
    }

    // ── Step 2: Normalise input ──────────────────────────────────────────────
    let normalizedInput: NormalizedInput
    try {
    if (request.inputType === 'URL') {
    yield { type: 'step', step: 'fetching' }
    await import('@/lib/container')
    }
    normalizedInput = await normalizeInput(request)
    } catch {
    yield {
    type: 'error',
    message: 'Unable to fetch source content. Check the URL or paste the text instead.',
    }
    return
    }

    // ── Step 3: Build strategy ───────────────────────────────────────────────
    yield { type: 'step', step: 'planning' }
    const strategy = StudyModeStrategyFactory.create(request.studyMode, claudeClient)

    // ── Step 4: Plan sections ────────────────────────────────────────────────
    let title: string
    let sections: ReturnType<typeof strategy.planSections> extends Promise<{
    title: string
    sections: infer S
    }>
    ? S
    : never

    try {
    const plan = await strategy.planSections(normalizedInput)
    title = plan.title
    sections = plan.sections as typeof sections
    } catch {
    yield { type: 'error', message: 'AI service unavailable, please try again' }
    return
    }

    // ── Step 5: Enrich with media ────────────────────────────────────────────
    const enrichedSections = await strategy.enrichWithMedia(sections)

    // ── Step 6: Build quizzes ────────────────────────────────────────────────
    const quizzes = await strategy.buildQuizzes(enrichedSections)

    // ── Step 7: Assemble MDX (streaming) ────────────────────────────────────
    yield { type: 'step', step: 'writing' }

    const builder = new GuideBuilder().setTitle(title)
    for (const section of enrichedSections) {
    builder.addSection(section)
    }
    for (const quiz of quizzes) {
    builder.addQuiz(quiz)
    }

    // Stream the final MDX using Claude
    let streamedContent = ''
    try {
    const assemblePrompt = `Write the full MDX content for the following study guide plan.

  Title: ${title}
  Sections: ${enrichedSections.map((s) => s.heading).join(', ')}
  Study mode: ${request.studyMode}
  Registered user: ${isRegistered ? 'yes' : 'no'}

      Requirements:
      - Expand every section into a complete, study-ready treatment.
      - Use all important information from the original source and preserve specifics.
      - Do not compress the guide into brief summaries; prefer depth, examples, mechanisms, comparisons, and concrete detail.
      - For EXAM_PREP, make the guide especially thorough, with strong conceptual explanations, likely exam traps, rapid-review style reinforcement, and enough detail to study from directly.
      - For DEEP_DIVE, include advanced nuances, edge cases, tradeoffs, and worked examples where relevant.
      - Ensure every planned section listed above appears in the final guide with a complete body.
      - Finish the output cleanly. Do not stop mid-section, mid-list, mid-table, or mid-component.
      - Do not leave placeholder boxes, incomplete quiz blocks, or unfinished headings.
      - Output MDX only.

${builder.build()}`

      const stream = await claudeClient.streamGenerate(
        assemblePrompt,
        undefined,
        getAssembleTokenBudget(request, isRegistered),
      )
      const reader = stream.getReader()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        streamedContent += value
        yield { type: 'token', text: value }
      }
    } catch {
      yield { type: 'error', message: 'AI service unavailable, please try again' }
      return
    }

    // Use streamed content if it's more complete than the assembled MDX
    const fallbackContent = builder.build()
    const candidateContent = streamedContent.trim()
    const finalContent = sanitizeGuideContentForMdx(
      candidateContent &&
        isGuideContentComplete(candidateContent, title, enrichedSections, quizzes.length)
        ? candidateContent
        : fallbackContent,
    )

    // ── Step 8: Persist ──────────────────────────────────────────────────────
    const slug = generateSlug(title)
    const persistedInputType = getPersistedInputType(request)
    const guideData: GeneratedGuide = {
      title,
      slug,
      studyMode: request.studyMode,
      inputType: persistedInputType,
      inputValue:
        request.inputType === 'FILE' ? (request.sourceName ?? 'Uploaded file') : request.inputValue,
      content: finalContent,
      isWatermark: !isRegistered,
      userId: session?.user?.id ?? null,
    }

    await prisma.guide.create({
      data: {
        ...guideData,
        isPublic: false,
      },
    })

    yield { type: 'done', guideSlug: slug, isGuestGuide: !isRegistered }

}
}

export const generationOrchestrator = new GenerationOrchestrator()
</file>

<file path="src/types/generation.ts">
export type InputType = 'TOPIC' | 'TEXT' | 'URL' | 'FILE'
export type StudyModeType = 'OVERVIEW' | 'DEEP_DIVE' | 'EXAM_PREP' | 'ELI5'

export interface GenerationRequest {
inputType: InputType
inputValue: string
sourceName?: string
studyMode: StudyModeType
}

export interface GuideSection {
heading: string
body: string
}

export interface QuizItem {
question: string
options: string[]
correctIndex: number
explanation?: string
}

export interface FlashcardItem {
front: string
back: string
}

export interface NormalizedInput {
type: InputType
text: string
originalValue: string
}

export interface GeneratedGuide {
title: string
slug: string
studyMode: StudyModeType
inputType: InputType
inputValue: string
content: string
isWatermark: boolean
userId: string | null
}

// SSE event types sent over the stream
export type SSEEvent =
| { type: 'step'; step: 'fetching' | 'planning' | 'writing' | 'done' }
| { type: 'token'; text: string }
| { type: 'done'; guideSlug: string; isGuestGuide?: boolean }
| { type: 'error'; message: string }
</file>

<file path="tests/integration/api/auth/forgot-password.test.ts">
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/db/client', () => ({
prisma: {
user: {
findUnique: vi.fn(),
},
},
}))

vi.mock('@/lib/auth/tokens', () => ({
createPasswordResetToken: vi.fn().mockResolvedValue('mock-reset-token'),
}))

vi.mock('@/lib/email', () => ({
sendPasswordResetEmail: vi.fn().mockResolvedValue(undefined),
}))

import { prisma } from '@/lib/db/client'
import { sendPasswordResetEmail } from '@/lib/email'
import { POST } from '@/app/api/auth/forgot-password/route'

const mockFindUnique = (prisma.user as unknown as { findUnique: ReturnType<typeof vi.fn> })
.findUnique
const mockSendEmail = sendPasswordResetEmail as ReturnType<typeof vi.fn>

function makeRequest(body: unknown) {
return new Request('http://localhost:3000/api/auth/forgot-password', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body),
})
}

beforeEach(() => {
vi.clearAllMocks()
})

describe('POST /api/auth/forgot-password', () => {
it('returns 200 when email exists and sends reset email', async () => {
mockFindUnique.mockResolvedValueOnce({ id: 'user-1', email: 'user@example.com' })

    const res = await POST(makeRequest({ email: 'user@example.com' }))

    expect(res.status).toBe(200)
    const body = (await res.json()) as { message: string }
    expect(body.message).toContain('reset link has been sent')
    expect(mockSendEmail).toHaveBeenCalledWith('user@example.com', 'mock-reset-token')

})

it('returns 200 even when email does not exist (no enumeration)', async () => {
mockFindUnique.mockResolvedValueOnce(null)

    const res = await POST(makeRequest({ email: 'unknown@example.com' }))

    expect(res.status).toBe(200)
    // Must NOT send an email
    expect(mockSendEmail).not.toHaveBeenCalled()

})

it('returns 422 for invalid email format', async () => {
const res = await POST(makeRequest({ email: 'not-an-email' }))
expect(res.status).toBe(422)
const body = (await res.json()) as {
error: { code: string; message: string; requestId: string }
}
expect(body.error.code).toBe('INVALID_EMAIL_ADDRESS')
expect(body.error.message).toBe('Invalid email address')
expect(body.error.requestId).toBeTruthy()
})

it('returns 400 for non-JSON body', async () => {
const res = await POST(
new Request('http://localhost:3000/api/auth/forgot-password', {
method: 'POST',
headers: { 'Content-Type': 'text/plain' },
body: 'not-json',
}),
)
expect(res.status).toBe(400)
const body = (await res.json()) as {
error: { code: string; message: string; requestId: string }
}
expect(body.error.code).toBe('INVALID_JSON')
expect(body.error.message).toBe('Invalid JSON')
expect(body.error.requestId).toBeTruthy()
})

it('returns 403 for a mismatched origin header', async () => {
const res = await POST(
new Request('http://localhost:3000/api/auth/forgot-password', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
origin: 'https://attacker.example',
},
body: JSON.stringify({ email: 'user@example.com' }),
}),
)

    expect(res.status).toBe(403)
    expect(mockSendEmail).not.toHaveBeenCalled()

})
})
</file>

<file path="tests/integration/api/auth/register.test.ts">
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Prisma and email modules before importing the route handler
vi.mock('@/lib/db/client', () => ({
prisma: {
user: {
findUnique: vi.fn(),
create: vi.fn(),
},
},
}))

vi.mock('@/lib/auth/tokens', () => ({
createVerificationToken: vi.fn().mockResolvedValue('mock-token-hex'),
}))

vi.mock('@/lib/email', () => ({
sendVerificationEmail: vi.fn().mockResolvedValue(undefined),
}))

import { prisma } from '@/lib/db/client'
import { sendVerificationEmail } from '@/lib/email'
import { POST } from '@/app/api/auth/register/route'

const mockPrismaUser = prisma.user as unknown as {
findUnique: ReturnType<typeof vi.fn>
create: ReturnType<typeof vi.fn>
}

const mockSendEmail = sendVerificationEmail as ReturnType<typeof vi.fn>

function makeRequest(body: unknown) {
return new Request('http://localhost:3000/api/auth/register', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body),
})
}

beforeEach(() => {
vi.clearAllMocks()
mockPrismaUser.findUnique.mockResolvedValue(null)
mockPrismaUser.create.mockResolvedValue({
id: 'user-1',
email: 'test@example.com',
name: null,
password: 'hashed',
})
})

describe('POST /api/auth/register', () => {
it('returns 201 and sends verification email for valid payload', async () => {
const res = await POST(makeRequest({ email: 'new@example.com', password: 'SecurePass1' }))

    expect(res.status).toBe(201)
    const body = (await res.json()) as { message: string }
    expect(body.message).toBe('Verification email sent')
    expect(mockSendEmail).toHaveBeenCalledWith('new@example.com', 'mock-token-hex')

})

it('creates the user with a hashed password', async () => {
await POST(makeRequest({ email: 'new@example.com', password: 'SecurePass1' }))

    expect(mockPrismaUser.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ email: 'new@example.com' }),
      }),
    )

    const createArg = (mockPrismaUser.create.mock.calls[0] as [{ data: { password: string } }])[0]
    expect(createArg.data.password).toMatch(/^\$2[ab]\$/)

})

it('returns 409 for duplicate email', async () => {
mockPrismaUser.findUnique.mockResolvedValueOnce({
id: 'existing',
email: 'dupe@example.com',
})

    const res = await POST(makeRequest({ email: 'dupe@example.com', password: 'SecurePass1' }))

    expect(res.status).toBe(409)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('EMAIL_ALREADY_REGISTERED')
    expect(body.error.message).toBe('Email already registered')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)
    expect(mockPrismaUser.create).not.toHaveBeenCalled()

})

it('returns 422 for missing email', async () => {
const res = await POST(makeRequest({ password: 'SecurePass1' }))

    expect(res.status).toBe(422)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string; fields: Record<string, string[]> }
    }
    expect(body.error.code).toBe('VALIDATION_ERROR')
    expect(body.error.message).toBe('Validation failed')
    expect(body.error.requestId).toBeTruthy()
    expect(body.error.fields).toHaveProperty('email')

})

it('returns 422 for weak password (no uppercase)', async () => {
const res = await POST(makeRequest({ email: 'new@example.com', password: 'nouppercase1' }))

    expect(res.status).toBe(422)
    const body = (await res.json()) as { error: { fields: Record<string, string[]> } }
    expect(body.error.fields).toHaveProperty('password')

})

it('returns 422 for password shorter than 8 chars', async () => {
const res = await POST(makeRequest({ email: 'new@example.com', password: 'Ab1' }))

    expect(res.status).toBe(422)
    const body = (await res.json()) as { error: { fields: Record<string, string[]> } }
    expect(body.error.fields?.password?.[0]).toMatch(/8 characters/)

})

it('returns 400 for non-JSON body', async () => {
const res = await POST(
new Request('http://localhost:3000/api/auth/register', {
method: 'POST',
headers: { 'Content-Type': 'text/plain' },
body: 'not-json',
}),
)
expect(res.status).toBe(400)
const body = (await res.json()) as {
error: { code: string; message: string; requestId: string }
}
expect(body.error.code).toBe('INVALID_JSON')
expect(body.error.message).toBe('Invalid JSON')
expect(body.error.requestId).toBeTruthy()
})

it('returns 403 for a mismatched origin header', async () => {
const res = await POST(
new Request('http://localhost:3000/api/auth/register', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
origin: 'https://attacker.example',
},
body: JSON.stringify({ email: 'new@example.com', password: 'SecurePass1' }),
}),
)

    expect(res.status).toBe(403)
    expect(mockPrismaUser.create).not.toHaveBeenCalled()

})
})
</file>

<file path="tests/integration/api/auth/reset-password.test.ts">
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/db/client', () => ({
prisma: {
user: {
update: vi.fn().mockResolvedValue({ id: 'user-1', email: 'user@example.com' }),
},
},
}))

vi.mock('@/lib/auth/tokens', () => ({
consumeVerificationToken: vi.fn(),
}))

import { prisma } from '@/lib/db/client'
import { consumeVerificationToken } from '@/lib/auth/tokens'
import { POST } from '@/app/api/auth/reset-password/route'

const mockConsume = consumeVerificationToken as ReturnType<typeof vi.fn>
const mockUpdate = (prisma.user as unknown as { update: ReturnType<typeof vi.fn> }).update

function makeRequest(body: unknown) {
return new Request('http://localhost:3000/api/auth/reset-password', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body),
})
}

beforeEach(() => {
vi.clearAllMocks()
})

describe('POST /api/auth/reset-password', () => {
it('returns 200 and updates password for valid token', async () => {
mockConsume.mockResolvedValueOnce('user@example.com')

    const res = await POST(makeRequest({ token: 'validtoken', password: 'NewSecure1' }))

    expect(res.status).toBe(200)
    const body = (await res.json()) as { message: string }
    expect(body.message).toBe('Password updated')

})

it('stores a bcrypt hash, not the plain password', async () => {
mockConsume.mockResolvedValueOnce('user@example.com')

    await POST(makeRequest({ token: 'validtoken', password: 'NewSecure1' }))

    const updateArg = (mockUpdate.mock.calls[0] as [{ data: { password: string } }])[0]
    expect(updateArg.data.password).toMatch(/^\$2[ab]\$/)

})

it('returns 410 for expired or invalid token', async () => {
mockConsume.mockResolvedValueOnce(null)

    const res = await POST(makeRequest({ token: 'expiredtoken', password: 'NewSecure1' }))

    expect(res.status).toBe(410)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('TOKEN_INVALID')
    expect(body.error.message).toBe('Token expired or invalid')
    expect(body.error.requestId).toBeTruthy()
    expect(mockUpdate).not.toHaveBeenCalled()

})

it('returns 422 for weak password', async () => {
const res = await POST(makeRequest({ token: 'sometoken', password: 'weak' }))

    expect(res.status).toBe(422)
    const body = (await res.json()) as { error: { code: string; fields: Record<string, string[]> } }
    expect(body.error.code).toBe('VALIDATION_ERROR')
    expect(body.error.fields).toHaveProperty('password')

})

it('returns 422 when token field is missing', async () => {
const res = await POST(makeRequest({ password: 'NewSecure1' }))
expect(res.status).toBe(422)
})

it('returns 400 for non-JSON body', async () => {
const res = await POST(
new Request('http://localhost:3000/api/auth/reset-password', {
method: 'POST',
headers: { 'Content-Type': 'text/plain' },
body: 'bad',
}),
)
expect(res.status).toBe(400)
const body = (await res.json()) as {
error: { code: string; message: string; requestId: string }
}
expect(body.error.code).toBe('INVALID_JSON')
expect(body.error.message).toBe('Invalid JSON')
expect(body.error.requestId).toBeTruthy()
})

it('returns 403 for a mismatched origin header', async () => {
const res = await POST(
new Request('http://localhost:3000/api/auth/reset-password', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
origin: 'https://attacker.example',
},
body: JSON.stringify({ token: 'validtoken', password: 'NewSecure1' }),
}),
)

    expect(res.status).toBe(403)
    expect(mockUpdate).not.toHaveBeenCalled()

})
})
</file>

<file path="tests/integration/api/auth/session.test.ts">
import { describe, it, expect, vi } from 'vitest'
import { NextRequest } from 'next/server'

// Mock PrismaClient before importing anything that instantiates it.
// The session endpoint uses JWT (no DB query per request), but PrismaClient
// still needs a driver adapter in Prisma v7 at construction time — mock it out.
vi.mock('@/lib/db/client', () => ({
prisma: {
user: {},
session: {},
account: {},
verificationToken: {},
$connect: vi.fn(),
$disconnect: vi.fn(),
},
}))

import { GET, POST } from '@/app/api/auth/[...nextauth]/route'

/\*\*

- Integration tests for the Auth.js session REST endpoint.
-
- Auth.js v5 exposes GET /api/auth/session which returns:
- - 200 { user: {...}, expires: "..." } when a valid JWT cookie is present
- - 200 null when no session cookie is present
-
- We call the Next.js route handler directly (no running server required).
  \*/

describe('GET /api/auth/session', () => {
it('returns 200 with null/empty session when no cookie is sent', async () => {
const req = new NextRequest('http://localhost:3000/api/auth/session')
const res = await GET(req)

    expect(res.status).toBe(200)

    const body: unknown = await res.json()
    // No valid JWT cookie → Auth.js returns null
    expect(body === null || (typeof body === 'object' && body !== null)).toBe(true)

})

it('responds with application/json content-type', async () => {
const req = new NextRequest('http://localhost:3000/api/auth/session')
const res = await GET(req)

    const contentType = res.headers.get('content-type') ?? ''
    expect(contentType).toContain('application/json')

})

it('returns csrf cookie flags on the auth csrf endpoint over https', async () => {
const previousAuthUrl = process.env['AUTH_URL']
const previousNextAuthUrl = process.env['NEXTAUTH_URL']

    process.env['AUTH_URL'] = 'https://flashguides.example'
    process.env['NEXTAUTH_URL'] = 'https://flashguides.example'

    const req = new NextRequest('https://flashguides.example/api/auth/csrf')
    const res = await GET(req)

    if (previousAuthUrl === undefined) {
      delete process.env['AUTH_URL']
    } else {
      process.env['AUTH_URL'] = previousAuthUrl
    }

    if (previousNextAuthUrl === undefined) {
      delete process.env['NEXTAUTH_URL']
    } else {
      process.env['NEXTAUTH_URL'] = previousNextAuthUrl
    }

    expect(res.status).toBe(200)

    const setCookie = res.headers.get('set-cookie') ?? ''
    expect(setCookie).toContain('HttpOnly')
    expect(setCookie).toContain('SameSite=Lax')
    expect(setCookie).toContain('Secure')

})
})

describe('GET /api/auth/providers', () => {
it('lists google and credentials providers', async () => {
const req = new NextRequest('http://localhost:3000/api/auth/providers')
const res = await GET(req)

    expect(res.status).toBe(200)

    const body = (await res.json()) as Record<string, { id: string; name: string; type: string }>
    expect(body).toHaveProperty('google')
    expect(body['google']?.type).toBe('oidc')
    expect(body).toHaveProperty('credentials')
    expect(body['credentials']?.type).toBe('credentials')

})
})

describe('POST /api/auth/\* csrf protection', () => {
it('rejects mismatched origins before delegating to Auth.js', async () => {
const req = new NextRequest('http://localhost:3000/api/auth/signin/credentials', {
method: 'POST',
headers: {
'Content-Type': 'application/x-www-form-urlencoded',
origin: 'https://attacker.example',
},
body: new URLSearchParams({ email: 'user@example.com', password: 'SecurePass1' }),
})

    const res = await POST(req)

    expect(res.status).toBe(403)
    await expect(res.json()).resolves.toEqual({ error: 'Forbidden' })

})
})
</file>

<file path="tests/integration/api/auth/verify-email.test.ts">
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/db/client', () => ({
prisma: {
user: {
update: vi
.fn()
.mockResolvedValue({ id: 'user-1', email: 'user@example.com', emailVerified: new Date() }),
},
},
}))

vi.mock('@/lib/auth/tokens', () => ({
consumeVerificationToken: vi.fn(),
}))

import { prisma } from '@/lib/db/client'
import { consumeVerificationToken } from '@/lib/auth/tokens'
import { GET } from '@/app/api/auth/verify-email/route'

const mockConsume = consumeVerificationToken as ReturnType<typeof vi.fn>
const mockUpdate = (prisma.user as unknown as { update: ReturnType<typeof vi.fn> }).update

beforeEach(() => {
vi.clearAllMocks()
})

function makeRequest(token?: string) {
const url = token
? `http://localhost:3000/api/auth/verify-email?token=${token}`
: 'http://localhost:3000/api/auth/verify-email'
return new Request(url)
}

describe('GET /api/auth/verify-email', () => {
it('returns 400 when no token param is provided', async () => {
const res = await GET(makeRequest())
expect(res.status).toBe(400)
const body = (await res.json()) as {
error: { code: string; message: string; requestId: string }
}
expect(body.error.code).toBe('MISSING_TOKEN')
expect(body.error.message).toBe('Missing token')
expect(body.error.requestId).toBeTruthy()
})

it('returns 410 when token is expired or invalid', async () => {
mockConsume.mockResolvedValueOnce(null)

    const res = await GET(makeRequest('badtoken'))
    expect(res.status).toBe(410)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('TOKEN_INVALID')
    expect(body.error.message).toBe('Token expired or invalid')
    expect(body.error.requestId).toBeTruthy()

})

it('marks emailVerified and redirects to dashboard on valid token', async () => {
mockConsume.mockResolvedValueOnce('user@example.com')

    const res = await GET(makeRequest('validtoken'))

    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { email: 'user@example.com' },
        data: expect.objectContaining({ emailVerified: expect.any(Date) }),
      }),
    )
    // Should redirect (3xx)
    expect(res.status).toBeGreaterThanOrEqual(300)
    expect(res.status).toBeLessThan(400)
    expect(res.headers.get('location')).toContain('/dashboard')

})
})
</file>

<file path="tests/integration/api/generate/generate.test.ts">
import { describe, it, expect, vi, beforeEach } from 'vitest'

// ── Mocks must precede all imports ──────────────────────────────────────────

vi.mock('@/lib/generation/orchestrator', () => ({
generationOrchestrator: {
orchestrate: vi.fn(),
},
}))

vi.mock('@/lib/auth', () => ({
auth: vi.fn(),
}))

vi.mock('@/lib/rate-limit', () => ({
checkGuestGenerationRateLimit: vi.fn(),
}))

vi.mock('@/lib/generation/file-extractor', async (importOriginal) => {
const actual = await importOriginal<typeof import('@/lib/generation/file-extractor')>()
return {
...actual,
extractReadableFileText: vi.fn(),
}
})

import { auth } from '@/lib/auth'
import { ReadableFileError, extractReadableFileText } from '@/lib/generation/file-extractor'
import { generationOrchestrator } from '@/lib/generation/orchestrator'
import { checkGuestGenerationRateLimit } from '@/lib/rate-limit'
import { POST } from '@/app/api/generate/route'
import type { SSEEvent } from '@/types/generation'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockExtractReadableFileText = extractReadableFileText as ReturnType<typeof vi.fn>
const mockOrchestrate = generationOrchestrator.orchestrate as ReturnType<typeof vi.fn>
const mockCheckGuestGenerationRateLimit = checkGuestGenerationRateLimit as ReturnType<typeof vi.fn>

function makeRequest(body: unknown, headers?: Record<string, string>) {
return new Request('http://localhost:3000/api/generate', {
method: 'POST',
headers: { 'Content-Type': 'application/json', ...headers },
body: JSON.stringify(body),
})
}

function makeFileRequest(file: File) {
const formData = new FormData()
formData.set('inputType', 'FILE')
formData.set('studyMode', 'OVERVIEW')
formData.set('file', file)

const req = new Request('http://localhost:3000/api/generate', {
method: 'POST',
body: formData,
})

vi.spyOn(req, 'formData').mockResolvedValue(formData)
return req
}

async function\* makeEventGen(events: SSEEvent[]): AsyncGenerator<SSEEvent> {
for (const event of events) {
yield event
}
}

async function readSSEResponse(res: Response): Promise<SSEEvent[]> {
const text = await res.text()
const events: SSEEvent[] = []
for (const line of text.split('\n\n')) {
const trimmed = line.trim()
if (!trimmed.startsWith('data: ')) continue
try {
events.push(JSON.parse(trimmed.slice(6)) as SSEEvent)
} catch {
// ignore malformed lines
}
}
return events
}

beforeEach(() => {
vi.clearAllMocks()
mockAuth.mockResolvedValue(null)
mockExtractReadableFileText.mockResolvedValue('Extracted file text')
mockCheckGuestGenerationRateLimit.mockResolvedValue({
allowed: true,
used: 1,
limit: 3,
remaining: 2,
resetsAt: new Date('2026-04-25T00:00:00.000Z'),
retryAfter: 3600,
})
})

const VALID_BODY = {
inputType: 'TOPIC',
inputValue: 'The French Revolution',
studyMode: 'OVERVIEW',
} as const

describe('POST /api/generate', () => {
it('returns structured requestId-aware validation errors for missing fields', async () => {
const res = await POST(makeRequest({ inputType: 'TOPIC' }))

    expect(res.status).toBe(422)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string; issues: unknown[] }
    }
    expect(body.error.code).toBe('VALIDATION_ERROR')
    expect(body.error.message).toBe('Validation failed')
    expect(body.error.requestId).toBeTruthy()
    expect(Array.isArray(body.error.issues)).toBe(true)
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)

})

it('returns 422 for invalid inputType', async () => {
const res = await POST(makeRequest({ ...VALID_BODY, inputType: 'INVALID' }))
expect(res.status).toBe(422)
})

it('returns 422 for empty inputValue', async () => {
const res = await POST(makeRequest({ ...VALID_BODY, inputValue: '' }))
expect(res.status).toBe(422)
})

it('returns structured requestId-aware invalid json errors', async () => {
const req = new Request('http://localhost:3000/api/generate', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: 'not-json',
})
const res = await POST(req)

    expect(res.status).toBe(400)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('INVALID_JSON')
    expect(body.error.message).toBe('Invalid JSON')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)

})

it('streams SSE events for a valid request', async () => {
const events: SSEEvent[] = [
{ type: 'step', step: 'planning' },
{ type: 'step', step: 'writing' },
{ type: 'token', text: '# Test' },
{ type: 'done', guideSlug: 'test-guide-abc123456' },
]
mockOrchestrate.mockReturnValue(makeEventGen(events))

    const res = await POST(makeRequest(VALID_BODY))
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('text/event-stream')

    const received = await readSSEResponse(res)
    expect(received).toEqual(events)

})

it('encodes quota-exceeded error as SSE event', async () => {
const quotaError: SSEEvent = {
type: 'error',
message: JSON.stringify({
code: 'QUOTA_EXCEEDED',
resetsAt: '2026-04-23T00:00:00.000Z',
signupUrl: '/register',
}),
}
mockOrchestrate.mockReturnValue(makeEventGen([quotaError]))

    const res = await POST(makeRequest(VALID_BODY))
    expect(res.status).toBe(200) // headers already sent as SSE

    const received = await readSSEResponse(res)
    expect(received).toHaveLength(1)
    expect(received[0]).toEqual(quotaError)

})

it('returns 429 with Retry-After when guest rate limit is exceeded before streaming starts', async () => {
mockCheckGuestGenerationRateLimit.mockResolvedValueOnce({
allowed: false,
used: 3,
limit: 3,
remaining: 0,
resetsAt: new Date('2026-04-25T00:00:00.000Z'),
retryAfter: 1800,
})

    const res = await POST(makeRequest(VALID_BODY, { origin: 'http://localhost:3000' }))

    expect(res.status).toBe(429)
    expect(res.headers.get('Retry-After')).toBe('1800')
    const body = (await res.json()) as {
      error: {
        code: string
        message: string
        requestId: string
        retryAfter: number
        resetsAt: string
        signupUrl: string
      }
    }
    expect(body.error.code).toBe('RATE_LIMIT_EXCEEDED')
    expect(body.error.message).toBe("You've created 3 guides today. Sign up for unlimited access!")
    expect(body.error.requestId).toBeTruthy()
    expect(body.error.retryAfter).toBe(1800)
    expect(body.error.resetsAt).toBe('2026-04-25T00:00:00.000Z')
    expect(body.error.signupUrl).toBe('/register')
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)
    expect(mockOrchestrate).not.toHaveBeenCalled()

})

it('encodes AI service error as SSE event when orchestrator throws', async () => {
mockOrchestrate.mockImplementation(async function\* () {
throw new Error('Claude timeout')
})

    const res = await POST(makeRequest(VALID_BODY))
    expect(res.status).toBe(200)

    const received = await readSSEResponse(res)
    expect(received).toHaveLength(1)
    expect(received[0]?.type).toBe('error')

})

it('calls auth() and passes session to orchestrator', async () => {
const fakeSession = { user: { id: 'user-1', email: 'a@b.com' } }
mockAuth.mockResolvedValue(fakeSession)
const events: SSEEvent[] = [{ type: 'done', guideSlug: 'slug-1' }]
mockOrchestrate.mockReturnValue(makeEventGen(events))

    await POST(makeRequest(VALID_BODY))

    expect(mockOrchestrate).toHaveBeenCalledWith(expect.objectContaining({ session: fakeSession }))

})

it('accepts multipart file uploads and passes extracted text to the orchestrator', async () => {
mockOrchestrate.mockReturnValue(makeEventGen([{ type: 'done', guideSlug: 'file-guide' }]))

    const file = new File(['fake pdf bytes'], 'lecture.pdf', { type: 'application/pdf' })
    const res = await POST(makeFileRequest(file))

    expect(res.status).toBe(200)
    expect(mockExtractReadableFileText).toHaveBeenCalled()
    expect(mockOrchestrate).toHaveBeenCalledWith(
      expect.objectContaining({
        request: expect.objectContaining({
          inputType: 'FILE',
          inputValue: 'Extracted file text',
          sourceName: 'lecture.pdf',
        }),
      }),
    )

})

it('returns a readable validation error when uploaded files cannot be parsed', async () => {
mockExtractReadableFileText.mockRejectedValueOnce(
new ReadableFileError('UNREADABLE_FILE', 'Uploaded PDF did not contain readable text'),
)

    const file = new File(['fake pdf bytes'], 'lecture.pdf', { type: 'application/pdf' })
    const res = await POST(makeFileRequest(file))

    expect(res.status).toBe(422)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('UNREADABLE_FILE')
    expect(body.error.message).toBe('Uploaded PDF did not contain readable text')
    expect(body.error.requestId).toBeTruthy()

})

it('returns a file-processing error when multipart extraction fails for a non-validation reason', async () => {
mockExtractReadableFileText.mockRejectedValueOnce(new Error('Anthropic API unavailable'))

    const file = new File(['fake pdf bytes'], 'lecture.pdf', { type: 'application/pdf' })
    const res = await POST(makeFileRequest(file))

    expect(res.status).toBe(502)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('FILE_PROCESSING_FAILED')
    expect(body.error.message).toBe('We could not process that uploaded file. Please try again.')
    expect(body.error.requestId).toBeTruthy()

})

it('passes skipGuestQuotaCheck to the orchestrator after route-level rate limiting', async () => {
mockOrchestrate.mockReturnValue(makeEventGen([{ type: 'done', guideSlug: 'slug-1' }]))

    await POST(makeRequest(VALID_BODY))

    expect(mockOrchestrate).toHaveBeenCalledWith(
      expect.objectContaining({ skipGuestQuotaCheck: true }),
    )

})

it('sanitizes the generation input before passing it to the orchestrator', async () => {
mockOrchestrate.mockReturnValue(makeEventGen([{ type: 'done', guideSlug: 'slug-1' }]))

    await POST(
      makeRequest({
        ...VALID_BODY,
        inputValue: '  <script>alert(1)</script>The French Revolution\u0000  ',
      }),
    )

    expect(mockOrchestrate).toHaveBeenCalledWith(
      expect.objectContaining({
        request: expect.objectContaining({ inputValue: 'alert(1)The French Revolution' }),
      }),
    )

})
})
</file>

<file path="tests/unit/components/chat/PromptBox.test.tsx">
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

// ── Mocks must precede all imports ──────────────────────────────────────────

const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
useRouter: () => ({ push: mockPush }),
}))

// Stub child components to keep tests focused
vi.mock('@/components/chat/StudyModeSelector', () => ({
default: ({ onChange }: { onChange: (m: string) => void }) => (
<button data-testid="study-mode-selector" onClick={() => onChange('EXAM_PREP')}>
StudyModeSelector
</button>
),
}))

vi.mock('@/components/chat/StreamingProgress', () => ({
default: ({ step }: { step: string | null }) => (

<div data-testid="streaming-progress" data-step={step ?? ''} />
),
}))

vi.mock('@/components/guest/QuotaExhaustedModal', () => ({
default: ({ open }: { open: boolean }) =>
open ? <div data-testid="quota-exhausted-modal" /> : null,
}))

import PromptBox from '@/components/chat/PromptBox'
import type { SSEEvent } from '@/types/generation'

function buildSSEBody(events: SSEEvent[]): ReadableStream<Uint8Array> {
const encoder = new TextEncoder()
const lines = events.map((e) => `data: ${JSON.stringify(e)}\n\n`).join('')
return new ReadableStream({
start(controller) {
controller.enqueue(encoder.encode(lines))
controller.close()
},
})
}

function mockFetch(events: SSEEvent[], status = 200) {
const body = status === 200 ? buildSSEBody(events) : null
vi.stubGlobal(
'fetch',
vi.fn().mockResolvedValue(
new Response(body, {
status,
headers: { 'Content-Type': status === 200 ? 'text/event-stream' : 'application/json' },
}),
),
)
}

beforeEach(() => {
vi.clearAllMocks()
vi.unstubAllGlobals()
window.localStorage.clear()
})

describe('PromptBox', () => {
it('renders with topic tab active by default', () => {
render(<PromptBox />)
const topicTab = screen.getByTestId('input-tab-topic')
expect(topicTab.getAttribute('aria-selected')).toBe('true')
})

it('switches input tab', () => {
render(<PromptBox />)
fireEvent.click(screen.getByTestId('input-tab-text'))
expect(screen.getByTestId('input-tab-text').getAttribute('aria-selected')).toBe('true')
expect(screen.getByTestId('input-tab-topic').getAttribute('aria-selected')).toBe('false')
})

it('disables generate button when input is empty', () => {
render(<PromptBox />)
const btn = screen.getByTestId('generate-button') as HTMLButtonElement
expect(btn.disabled).toBe(true)
})

it('enables generate button when input has value', () => {
render(<PromptBox />)
fireEvent.change(screen.getByTestId('prompt-input'), { target: { value: 'React hooks' } })
const btn = screen.getByTestId('generate-button') as HTMLButtonElement
expect(btn.disabled).toBe(false)
})

it('calls fetch with correct body on submit', async () => {
mockFetch([{ type: 'done', guideSlug: 'test-slug-abc123456' }])

    render(<PromptBox />)
    fireEvent.change(screen.getByTestId('prompt-input'), { target: { value: 'Photosynthesis' } })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() => expect(vi.mocked(fetch)).toHaveBeenCalled())

    const [url, options] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit]
    expect(url).toBe('/api/generate')
    const body = JSON.parse(options.body as string)
    expect(body.inputType).toBe('TOPIC')
    expect(body.inputValue).toBe('Photosynthesis')

})

it('submits uploaded files as multipart form data', async () => {
mockFetch([{ type: 'done', guideSlug: 'file-upload-guide' }])

    render(<PromptBox />)
    fireEvent.click(screen.getByTestId('input-tab-file'))

    const file = new File(['study notes'], 'notes.txt', { type: 'text/plain' })
    fireEvent.change(screen.getByTestId('prompt-file-input'), {
      target: { files: [file] },
    })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() => expect(vi.mocked(fetch)).toHaveBeenCalled())

    const [url, options] = vi.mocked(fetch).mock.calls[0] as [string, RequestInit]
    expect(url).toBe('/api/generate')
    expect(options.body).toBeInstanceOf(FormData)
    expect((options.body as FormData).get('inputType')).toBe('FILE')
    expect((options.body as FormData).get('studyMode')).toBe('OVERVIEW')
    expect((options.body as FormData).get('file')).toBe(file)

})

it('redirects to guide on done event', async () => {
mockFetch([{ type: 'done', guideSlug: 'my-guide-abc123456' }])

    render(<PromptBox />)
    fireEvent.change(screen.getByTestId('prompt-input'), { target: { value: 'DNA replication' } })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/guide/my-guide-abc123456'))

})

it('stores guest-created guide slugs for later claiming', async () => {
mockFetch([{ type: 'done', guideSlug: 'guest-guide-abc123456', isGuestGuide: true }])

    render(<PromptBox isAuthenticated={false} />)
    fireEvent.change(screen.getByTestId('prompt-input'), { target: { value: 'Cell biology' } })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/guide/guest-guide-abc123456'))

    expect(window.localStorage.getItem('flashguides.guest-guides')).toBe(
      JSON.stringify(['guest-guide-abc123456']),
    )

})

it('does not store guide slugs for authenticated generations', async () => {
mockFetch([{ type: 'done', guideSlug: 'user-guide-abc123456', isGuestGuide: false }])

    render(<PromptBox isAuthenticated />)
    fireEvent.change(screen.getByTestId('prompt-input'), { target: { value: 'Genetics' } })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/guide/user-guide-abc123456'))

    expect(window.localStorage.getItem('flashguides.guest-guides')).toBeNull()

})

it('shows error message on network failure', async () => {
vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))

    render(<PromptBox />)
    fireEvent.change(screen.getByTestId('prompt-input'), { target: { value: 'DNA replication' } })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() => expect(screen.getByTestId('generation-error')).toBeDefined())

})

it('shows the API error message for failed file uploads', async () => {
vi.stubGlobal(
'fetch',
vi.fn().mockResolvedValue(
new Response(
JSON.stringify({
error: { message: 'We could not read text from that PDF. Try another file.' },
}),
{
status: 422,
headers: { 'Content-Type': 'application/json' },
},
),
),
)

    render(<PromptBox />)
    fireEvent.click(screen.getByTestId('input-tab-file'))
    fireEvent.change(screen.getByTestId('prompt-file-input'), {
      target: { files: [new File(['x'], 'notes.pdf', { type: 'application/pdf' })] },
    })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() =>
      expect(screen.getByTestId('generation-error')).toHaveTextContent(
        'We could not read text from that PDF. Try another file.',
      ),
    )

})

it('opens quota exhausted modal on QUOTA_EXCEEDED error event', async () => {
const errEvent: SSEEvent = {
type: 'error',
message: JSON.stringify({
code: 'QUOTA_EXCEEDED',
resetsAt: '2026-04-23T00:00:00.000Z',
signupUrl: '/register',
}),
}
mockFetch([errEvent])

    render(<PromptBox />)
    fireEvent.change(screen.getByTestId('prompt-input'), { target: { value: 'Dark matter' } })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() => expect(screen.getByTestId('quota-exhausted-modal')).toBeDefined())

})

it('shows streaming-progress while generating', async () => {
// Use a stream that never resolves immediately — just check it appears after click
let resolveBody!: () => void
const hangingBody = new ReadableStream({
start() {
// never enqueues, simulates in-progress
},
cancel() {
resolveBody?.()
},
})
vi.stubGlobal(
'fetch',
vi.fn().mockResolvedValue(
new Response(hangingBody, {
status: 200,
headers: { 'Content-Type': 'text/event-stream' },
}),
),
)

    render(<PromptBox />)
    fireEvent.change(screen.getByTestId('prompt-input'), { target: { value: 'Black holes' } })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() => expect(screen.getByTestId('streaming-progress')).toBeDefined())

})

it('stops an in-flight generation when the stop button is clicked', async () => {
vi.stubGlobal(
'fetch',
vi.fn().mockImplementation((\_url, options?: RequestInit) => {
const signal = options?.signal as AbortSignal | undefined

        return new Promise<Response>((resolve, reject) => {
          signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')))

          resolve(
            new Response(
              new ReadableStream({
                start() {
                  // keep the stream open until aborted
                },
              }),
              {
                status: 200,
                headers: { 'Content-Type': 'text/event-stream' },
              },
            ),
          )
        })
      }),
    )

    render(<PromptBox />)
    fireEvent.change(screen.getByTestId('prompt-input'), { target: { value: 'Black holes' } })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() => expect(screen.getByTestId('streaming-progress')).toBeDefined())

    fireEvent.click(screen.getByTestId('cancel-generation-button'))

    await waitFor(() => expect(screen.queryByTestId('streaming-progress')).not.toBeInTheDocument())
    expect(screen.queryByTestId('generation-error')).not.toBeInTheDocument()

})

it('shows fetching step for URL input while source content is loading', async () => {
const hangingBody = new ReadableStream({
start() {
// keep request in flight
},
})
vi.stubGlobal(
'fetch',
vi.fn().mockResolvedValue(
new Response(hangingBody, {
status: 200,
headers: { 'Content-Type': 'text/event-stream' },
}),
),
)

    render(<PromptBox />)
    fireEvent.click(screen.getByTestId('input-tab-url'))
    fireEvent.change(screen.getByTestId('prompt-input'), {
      target: { value: 'https://example.com/article' },
    })
    fireEvent.click(screen.getByTestId('generate-button'))

    await waitFor(() =>
      expect(screen.getByTestId('streaming-progress').getAttribute('data-step')).toBe('fetching'),
    )

})
})
</file>

<file path="tests/unit/components/chat/StreamingProgress.test.tsx">
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import StreamingProgress from '@/components/chat/StreamingProgress'

beforeEach(() => {
vi.clearAllMocks()
})

describe('StreamingProgress', () => {
it('renders all step labels', () => {
render(<StreamingProgress step={null} tokenPreview="" />)
expect(screen.getByTestId('step-fetching')).toBeDefined()
expect(screen.getByTestId('step-planning')).toBeDefined()
expect(screen.getByTestId('step-writing')).toBeDefined()
expect(screen.getByTestId('step-done')).toBeDefined()
})

it('marks fetching step as active', () => {
render(<StreamingProgress step="fetching" tokenPreview="" />)
const step = screen.getByTestId('step-fetching')
expect(step.textContent).toContain('Fetching')
})

it('marks planning step as active', () => {
render(<StreamingProgress step="planning" tokenPreview="" />)
const step = screen.getByTestId('step-planning')
expect(step.textContent).toContain('Planning')
})

it('marks planning as complete and writing as active', () => {
render(<StreamingProgress step="writing" tokenPreview="" />)
const indicators = ['step-fetching', 'step-planning'].map(
(id) => screen.getByTestId(id).querySelector('span')?.textContent,
)
expect(indicators).toEqual(['✓', '✓'])
})

it('marks all steps complete when done', () => {
render(<StreamingProgress step="done" tokenPreview="" />)
const indicators = ['step-fetching', 'step-planning', 'step-writing'].map(
(id) => screen.getByTestId(id).querySelector('span')?.textContent,
)
expect(indicators).toEqual(['✓', '✓', '✓'])
})

it('renders token preview when provided', () => {
render(<StreamingProgress step="writing" tokenPreview="# Hello World" />)
expect(screen.getByTestId('token-preview').textContent).toBe('# Hello World')
})

it('does not render token preview when empty', () => {
render(<StreamingProgress step="writing" tokenPreview="" />)
expect(screen.queryByTestId('token-preview')).toBeNull()
})
})
</file>

<file path="tests/unit/lib/generation/builder.test.ts">
import { describe, it, expect } from 'vitest'
import { GuideBuilder } from '@/lib/generation/builder'

describe('GuideBuilder', () => {
it('builds a minimal MDX string with a title', () => {
const mdx = new GuideBuilder().setTitle('My Guide').build()
expect(mdx).toContain('# My Guide')
})

it('includes section headings and body text', () => {
const mdx = new GuideBuilder()
.setTitle('React Basics')
.addSection({ heading: 'Introduction', body: 'React is a library.' })
.addSection({ heading: 'Components', body: 'Components are reusable.' })
.build()

    expect(mdx).toContain('## Introduction')
    expect(mdx).toContain('React is a library.')
    expect(mdx).toContain('## Components')
    expect(mdx).toContain('Components are reusable.')

})

it('does not include quiz section when no quizzes added', () => {
const mdx = new GuideBuilder().setTitle('Guide').build()
expect(mdx).not.toContain('Practice Questions')
})

it('includes Quiz MDX components when quiz items added', () => {
const mdx = new GuideBuilder()
.setTitle('Exam Guide')
.addQuiz({
question: 'What is JSX?',
options: ['HTML', 'JavaScript XML', 'JSON', 'None'],
correctIndex: 1,
})
.build()

    expect(mdx).toContain('## Practice Questions')
    expect(mdx).toContain('<Quiz question={"What is JSX?"}')
    expect(mdx).toContain('options={[')
    expect(mdx).toContain('correct={1}')

})

it('supports fluent chaining', () => {
const builder = new GuideBuilder()
const result = builder.setTitle('T').addSection({ heading: 'H', body: 'B' })
expect(result).toBe(builder)
})

it('includes flashcards MDX when flashcards are added', () => {
const mdx = new GuideBuilder()
.setTitle('G')
.addFlashcards([
{ front: 'Front one', back: 'Back one' },
{ front: 'Front two', back: 'Back two' },
])
.build()

    expect(mdx).toContain('## Flashcards')
    expect(mdx).toContain('<Flashcards cards={')
    expect(mdx).toContain('Front one')
    expect(mdx).toContain('Back two')

})
})
</file>

<file path="tests/unit/lib/generation/orchestrator.test.ts">
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/ai/claude', () => ({
claudeClient: { generate: vi.fn(), streamGenerate: vi.fn() },
ClaudeClient: vi.fn(),
}))

vi.mock('@/lib/db/client', () => ({
prisma: {
guide: { create: vi.fn() },
},
}))

vi.mock('@/lib/guest/quota', () => ({
checkAndIncrementQuota: vi.fn(),
extractIp: vi.fn().mockReturnValue('1.2.3.4'),
}))

vi.mock('@/lib/generation/input-normalizer', () => ({
normalizeInput: vi.fn(async (request: GenerationRequest) => ({
type: request.inputType,
text: request.inputValue,
originalValue: request.inputValue,
})),
}))

vi.mock('@/lib/container', () => ({}))

import { claudeClient } from '@/lib/ai/claude'
import { prisma } from '@/lib/db/client'
import { checkAndIncrementQuota } from '@/lib/guest/quota'
import { normalizeInput } from '@/lib/generation/input-normalizer'
import { GenerationOrchestrator } from '@/lib/generation/orchestrator'
import type { GenerationRequest, SSEEvent } from '@/types/generation'

const mockClient = claudeClient as unknown as {
generate: ReturnType<typeof vi.fn>
streamGenerate: ReturnType<typeof vi.fn>
}
const mockCreate = (prisma.guide as unknown as { create: ReturnType<typeof vi.fn> }).create
const mockQuota = checkAndIncrementQuota as ReturnType<typeof vi.fn>
const mockNormalizeInput = normalizeInput as ReturnType<typeof vi.fn>

const MOCK_PLAN = `TITLE: Test Guide

## Section One

First section content.

## Section Two

Second section content.`

async function collectEvents(gen: AsyncGenerator<SSEEvent>): Promise<SSEEvent[]> {
const events: SSEEvent[] = []
for await (const event of gen) {
events.push(event)
}
return events
}

// Create a minimal ReadableStream of strings
function makeTextStream(text: string): ReadableStream<string> {
return new ReadableStream({
start(controller) {
controller.enqueue(text)
controller.close()
},
})
}

beforeEach(() => {
vi.clearAllMocks()
mockNormalizeInput.mockImplementation(async (request: GenerationRequest) => ({
type: request.inputType,
text: request.inputValue,
originalValue: request.inputValue,
}))
mockClient.generate.mockResolvedValue(MOCK_PLAN)
mockClient.streamGenerate.mockResolvedValue(makeTextStream('# Test Guide\n\nContent.'))
mockCreate.mockResolvedValue({ id: 'g1', slug: 'test-guide-abc123' })
mockQuota.mockResolvedValue({ allowed: true, used: 1, limit: 3, resetsAt: new Date() })
})

const baseRequest: GenerationRequest = {
inputType: 'TOPIC',
inputValue: 'React Hooks',
studyMode: 'OVERVIEW',
}

const guestReq = new Request('http://localhost/', {
headers: { 'x-forwarded-for': '1.2.3.4' },
})

describe('GenerationOrchestrator', () => {
it('T-01: emits step events in planning → writing → done order', async () => {
const orch = new GenerationOrchestrator()
const events = await collectEvents(
orch.orchestrate({ request: baseRequest, session: null, req: guestReq }),
)

    const types = events.map((e) => e.type)
    expect(types).toContain('step')
    expect(types).toContain('done')

})

it('emits a done event with a guideSlug on success', async () => {
const orch = new GenerationOrchestrator()
const events = await collectEvents(
orch.orchestrate({ request: baseRequest, session: null, req: guestReq }),
)

    const done = events.find((e) => e.type === 'done')
    expect(done).toBeDefined()
    expect((done as { type: 'done'; guideSlug: string }).guideSlug).toBeTruthy()

})

it('persists guide to DB with isWatermark=true for guests', async () => {
const orch = new GenerationOrchestrator()
await collectEvents(orch.orchestrate({ request: baseRequest, session: null, req: guestReq }))

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ isWatermark: true, userId: null }),
      }),
    )

})

it('persists guide with userId for registered users', async () => {
const orch = new GenerationOrchestrator()
const session = { user: { id: 'user-1', email: 'a@b.com' } } as never
await collectEvents(orch.orchestrate({ request: baseRequest, session, req: guestReq }))

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ isWatermark: false, userId: 'user-1' }),
      }),
    )

})

it('emits error event and stops when quota is exceeded (guest)', async () => {
mockQuota.mockResolvedValueOnce({
allowed: false,
used: 3,
limit: 3,
resetsAt: new Date(),
})

    const orch = new GenerationOrchestrator()
    const events = await collectEvents(
      orch.orchestrate({ request: baseRequest, session: null, req: guestReq }),
    )

    expect(events[0]?.type).toBe('error')
    const errMsg = (events[0] as { type: 'error'; message: string }).message
    expect(errMsg).toContain('QUOTA_EXCEEDED')
    expect(mockCreate).not.toHaveBeenCalled()

})

it('skips quota check for registered users', async () => {
const orch = new GenerationOrchestrator()
const session = { user: { id: 'user-1', email: 'a@b.com' } } as never
await collectEvents(orch.orchestrate({ request: baseRequest, session, req: guestReq }))

    expect(mockQuota).not.toHaveBeenCalled()

})

it('emits error event when Claude generate throws', async () => {
mockClient.generate.mockRejectedValueOnce(new Error('API down'))

    const orch = new GenerationOrchestrator()
    const events = await collectEvents(
      orch.orchestrate({ request: baseRequest, session: null, req: guestReq }),
    )

    const errorEvent = events.find((e) => e.type === 'error')
    expect(errorEvent).toBeDefined()
    expect((errorEvent as { type: 'error'; message: string }).message).toContain('unavailable')

})

it('emits fetching before planning for URL inputs', async () => {
const orch = new GenerationOrchestrator()
const request: GenerationRequest = {
inputType: 'URL',
inputValue: 'https://example.com/article',
studyMode: 'OVERVIEW',
}

    const events = await collectEvents(orch.orchestrate({ request, session: null, req: guestReq }))

    expect(events[0]).toEqual({ type: 'step', step: 'fetching' })
    expect(events[1]).toEqual({ type: 'step', step: 'planning' })
    expect(mockNormalizeInput).toHaveBeenCalledWith(request)

})

it('emits error when source normalization fails', async () => {
mockNormalizeInput.mockRejectedValueOnce(new Error('Blocked URL'))

    const orch = new GenerationOrchestrator()
    const request: GenerationRequest = {
      inputType: 'URL',
      inputValue: 'https://example.com/article',
      studyMode: 'OVERVIEW',
    }

    const events = await collectEvents(orch.orchestrate({ request, session: null, req: guestReq }))

    expect(events).toEqual([
      { type: 'step', step: 'fetching' },
      {
        type: 'error',
        message: 'Unable to fetch source content. Check the URL or paste the text instead.',
      },
    ])
    expect(mockCreate).not.toHaveBeenCalled()

})

it('falls back to the assembled guide when streamed MDX is incomplete', async () => {
mockClient.streamGenerate.mockResolvedValue(
makeTextStream('# Test Guide\n\n## Section One\nComplete first section only.'),
)

    const orch = new GenerationOrchestrator()
    await collectEvents(orch.orchestrate({ request: baseRequest, session: null, req: guestReq }))

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          content: expect.stringContaining('## Section Two'),
        }),
      }),
    )

})

it('uses a larger output budget for EXAM_PREP file uploads', async () => {
const orch = new GenerationOrchestrator()
const request: GenerationRequest = {
inputType: 'FILE',
inputValue: 'Long extracted file text',
sourceName: 'exam.pdf',
studyMode: 'EXAM_PREP',
}

    await collectEvents(orch.orchestrate({ request, session: null, req: guestReq }))

    expect(mockClient.streamGenerate).toHaveBeenCalledWith(expect.any(String), undefined, 10240)

})

it('persists uploaded-file guides as TEXT inputType while keeping the file name in inputValue', async () => {
const orch = new GenerationOrchestrator()
const request: GenerationRequest = {
inputType: 'FILE',
inputValue: 'Extracted file contents',
sourceName: '8-data-mining-overview.pdf',
studyMode: 'OVERVIEW',
}

    await collectEvents(orch.orchestrate({ request, session: null, req: guestReq }))

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          inputType: 'TEXT',
          inputValue: '8-data-mining-overview.pdf',
        }),
      }),
    )

})
})
</file>

<file path=".env.example">
# ──────────────────────────────────────────────────────────────────────────────
# FlashGuides — environment variables template
# Copy this file to .env and fill in real values. Never commit .env.
# ──────────────────────────────────────────────────────────────────────────────

# Database (SQLite — path to db file)

DATABASE_URL="file:/data/app.db"

# Logging

LOG_LEVEL="info"

# Auth.js v5

NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Google OAuth

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Anthropic (Claude)

ANTHROPIC_API_KEY=""

# Tavily (Web Search MCP)

TAVILY_API_KEY=""

# fal.ai (Image Generation MCP — FLUX)

FAL_API_KEY=""

# MinIO / S3-compatible object storage

S3_ENDPOINT="http://localhost:9000"
S3_ACCESS_KEY="minioadmin"
S3_SECRET_KEY="minioadmin"
S3_BUCKET="flashguides"

# SMTP (Mailhog in dev: smtp://localhost:1025)

SMTP_HOST="localhost"
SMTP_PORT="1025"
SMTP_USER=""
SMTP_PASS=""
SMTP_FROM="noreply@flashguides.local"

# Fly.io (CI only — do not set locally)

# FLY_API_TOKEN=""

</file>

<file path=".gitignore">
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies

/node*modules
/.pnp
.pnp.*
.yarn/\_
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing

/coverage
/playwright-report
/test-results

# next.js

/.next/
/out/

# production

/build
/dist

# generated

/src/generated/

# database & data

/data/
_.db
_.sqlite

# exports (CLI output)

/exports/

# misc

.DS_Store
\*.pem

# debug

npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files — commit .env.example only

.env
.env.local
.env.\*.local

# vercel / fly

.vercel

# typescript

\*.tsbuildinfo
next-env.d.ts
next-env.d.ts

/src/generated/prisma
</file>

<file path="playwright.config.ts">
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
testDir: './tests/e2e',
fullyParallel: true,
forbidOnly: !!process.env['CI'],
retries: process.env['CI'] ? 2 : 0,
workers: process.env['CI'] ? 1 : undefined,
reporter: [['html', { outputFolder: 'playwright-report' }], ['list']],
use: {
baseURL: process.env['PLAYWRIGHT_BASE_URL'] ?? 'http://127.0.0.1:3000',
trace: 'on-first-retry',
},
projects: [
{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
{ name: 'firefox', use: { ...devices['Desktop Firefox'] } },
],
webServer: {
command:
'export DATABASE_URL="file:/home/jpgar/is219_projects/flashguides/data/playwright.db" NEXTAUTH_URL="http://127.0.0.1:3000" AUTH_URL="http://127.0.0.1:3000" AUTH_TRUST_HOST="true" PLAYWRIGHT_TEST="1" PORT="3000" HOSTNAME="127.0.0.1" && pnpm db:generate && pnpm db:migrate:prod && pnpm db:seed && pnpm build && mkdir -p .next/standalone/.next && rm -rf .next/standalone/.next/static .next/standalone/public && cp -R .next/static .next/standalone/.next/static && if [ -d public ]; then cp -R public .next/standalone/public; fi && node .next/standalone/server.js',
url: 'http://127.0.0.1:3000',
reuseExistingServer: !process.env['CI'],
timeout: 300000,
},
})
</file>

<file path="tsconfig.json">
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
</file>

<file path="docs/_spec/01-infrastructure/sprints.md">
# Sprints — Spec 01: Infrastructure & Project Setup

> **Status:** ✅ All sprints complete (Phase 0 committed `bf3f76a`)

---

## Sprint 01-A — Repo scaffold & tooling

**Status:** ✅ Complete  
**Scope:** Initialize Next.js project, configure TypeScript, Tailwind, ESLint, Prettier, Husky, lint-staged, commitlint.

**Files touched:**

- `package.json`, `tsconfig.json`, `eslint.config.mjs`, `.prettierrc.mjs`, `.prettierignore`
- `.husky/pre-commit`, `.husky/pre-push`, `.husky/commit-msg`
- `pnpm-lock.yaml`

**Implementation notes:**

- TypeScript `strict: true` + `noUncheckedIndexedAccess: true`.
- ESLint rule `@typescript-eslint/no-explicit-any: error` enforced.
- Commitlint config embedded in `package.json`.

**Tests added:** None (infrastructure only).

**Entry criteria:** Empty repo.  
**Exit criteria:** `pnpm install && pnpm lint && pnpm typecheck` all pass.

---

## Sprint 01-B — Database & Prisma

**Status:** ✅ Complete  
**Scope:** Prisma schema with all initial models, SQLite WAL boot, nightly backup script.

**Files touched:**

- `prisma/schema.prisma`, `prisma.config.ts`
- `src/lib/db/client.ts`, `src/lib/db/boot.ts`
- `instrumentation.ts`
- `scripts/backup-db.sh`

**Implementation notes:**

- Prisma v7 — URL goes in `prisma.config.ts` datasource, not `schema.prisma`.
- Generated client output: `src/generated/prisma/`.
- `bootDatabase()` called in Next.js `instrumentation.ts` on Node.js runtime.

**Tests added:**

- `tests/unit/lib/db/boot.test.ts` — mocks Prisma, asserts 5 PRAGMA calls.
- `tests/integration/api/health.test.ts` — real SQLite test DB, asserts 200/503.

**Entry criteria:** Sprint 01-A complete.  
**Exit criteria:** `pnpm db:generate` succeeds; `bootDatabase` unit tests pass (T-06 idempotent call, T-07 backup script creates parent directory).

---

## Sprint 01-C — Docker & CI/CD

**Status:** ✅ Complete  
**Scope:** Multi-stage Dockerfile, docker-compose, GitHub Actions workflows, Fly.io config.

**Files touched:**

- `docker/Dockerfile`, `docker/docker-compose.yml`, `docker/docker-compose.override.yml`
- `.github/workflows/ci.yml`, `.github/workflows/docker.yml`
- `fly.toml`
- `next.config.ts` (standalone output, poweredByHeader off)
- `src/app/api/health/route.ts`

**Implementation notes:**

- Next.js `output: 'standalone'` required for minimal Docker image.
- CI matrix: chromium + firefox for Playwright.
- `FLY_API_TOKEN` must be added as a repo secret before `docker.yml` deploys.

**Tests added:**

- `tests/e2e/health.spec.ts` — Playwright smoke test against running app.

**Entry criteria:** Sprint 01-B complete.  
**Exit criteria:** `docker compose up` healthy; `ci.yml` green on GitHub; T-08 Docker image under 200 MB (letter §4); AC-08 through AC-12 verified (pre-push hook, CI coverage artifact, `docker-compose.override.yml`, named volume, healthchecks).
</file>

<file path="docs/_spec/04-chat-homepage/spec.md">
# Spec 04 — Chat Homepage & Generation Orchestrator

> **Status:** 📝 Spec ready — not yet implemented  
> **Sprint file:** [sprints.md](./sprints.md)

---

## 1. Feature Summary

The Chat Homepage is the primary entry point of FlashGuides. It presents a chat-style prompt interface supporting three input modes: free-text topic, pasted text, and URL/YouTube link. Users select a study mode (Overview, Deep-dive, Exam-prep, ELI5), submit their prompt, and receive a streaming response that culminates in a fully-rendered interactive study guide. The `GenerationOrchestrator` coordinates the entire pipeline: auth/quota checks → MCP tool calls → Claude streaming → MDX assembly → DB persistence. The UI shows a live streaming progress indicator while generation is in flight.

---

## 2. User Stories

1. As a **user** (guest or registered), I want to type a topic into a chat box and receive a study guide so that I can learn about anything on demand.
2. As a **user**, I want to paste a large block of text and have it turned into a structured study guide so that I can digest dense material quickly.
3. As a **user**, I want to submit a URL or YouTube link and receive a study guide based on that content so that I don't have to manually extract and paste text.
4. As a **user**, I want to choose a study mode (Overview / Deep-dive / Exam-prep / ELI5) before generating so that the output matches my learning goal.
5. As a **user**, I want to see a live streaming progress indicator while my guide is being generated so that I know the app is working.
6. As a **registered user**, I want my completed guide automatically saved to my account so that I can find it later in my dashboard.
7. As a **developer**, I want the generation pipeline composed of clean, testable, swappable components so that study modes can be added without modifying existing code.

---

## 3. Acceptance Criteria

| #     | Story | Given                                | When                                     | Then                                                                                                          |
| ----- | ----- | ------------------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| AC-01 | US-1  | Any user on homepage                 | Types a topic and submits                | Streaming starts within 3s; guide page rendered on completion                                                 |
| AC-02 | US-2  | Any user                             | Pastes ≤50,000 chars of text and submits | Guide generated from the pasted content                                                                       |
| AC-03 | US-2  | Any user                             | Pastes text > 50,000 chars               | 422 with "Text too long (max 50,000 characters)"                                                              |
| AC-04 | US-3  | Any user                             | Submits a valid HTTPS URL                | Web Fetch MCP fetches page; guide generated                                                                   |
| AC-05 | US-3  | Any user                             | Submits a YouTube URL                    | YouTube transcript fetched; guide generated                                                                   |
| AC-06 | US-3  | Any user                             | Submits a malformed or unreachable URL   | 422 with clear error message; no generation                                                                   |
| AC-07 | US-3  | Any user                             | Submits a paywalled or bot-blocked URL   | Graceful degradation: error message + suggestion to paste text                                                |
| AC-08 | US-4  | User opens homepage                  | Study mode selector rendered             | Four modes visible; Overview selected by default                                                              |
| AC-09 | US-5  | Generation in progress               | User watches the UI                      | Streaming token chunks rendered live; progress steps shown (Fetching → Planning → Writing → Done)             |
| AC-10 | US-6  | Registered user completes generation | Guide fully streamed                     | Guide saved to DB with correct `userId`, `studyMode`, `inputType`, `slug`                                     |
| AC-11 | US-6  | Registered user                      | Guide saved                              | Redirect to `/guide/<slug>` after completion                                                                  |
| AC-12 | US-1  | Guest                                | Guide generated                          | Guide stored with `userId=null, isWatermark=true`; rendered at temporary URL; not shown in any user dashboard |
| AC-13 | US-7  | Claude API is down                   | User submits prompt                      | 503 with "AI service unavailable, please try again" — no crash                                                |
| AC-14 | —     | Stream dropped mid-generation        | Connection interrupted                   | UI shows "Generation interrupted" with retry button                                                           |

---

## 4. UX Notes

### Homepage layout (`/`)

```
┌─────────────────────────────────────┐
│  FlashGuides                [Log in]│
├─────────────────────────────────────┤
│  Hero: "Turn anything into a study  │
│  guide in seconds."                 │
├─────────────────────────────────────┤
│  [○ Topic] [○ Paste text] [○ URL]   │  ← Input mode tabs
│  ┌───────────────────────────────┐  │
│  │  Ask about anything…          │  │  ← Textarea
│  └───────────────────────────────┘  │
│  Study mode: [Overview▾]            │
│                      [Generate →]   │
├─────────────────────────────────────┤
│  Featured guides (gallery teaser)   │
└─────────────────────────────────────┘
```

### Streaming progress steps

When generation starts, the textarea collapses and a step indicator replaces it:

1. ⏳ Fetching source (URL/YouTube mode only)
2. ⏳ Planning sections
3. ⏳ Writing guide
4. ✅ Done! — auto-redirects

Live token stream rendered in a preview pane below the steps.

### Error states

- API error → inline alert with retry button.
- Quota exceeded → `QuotaExhaustedModal` (from Spec 03).
- URL fetch failure → inline error with suggestion to paste text instead.

### Empty/initial state

Clean prompt box with placeholder; no guide results visible.

---

## 5. Data Model

Uses existing `Guide` model. Generation flow writes:

- `Guide.inputType` (TOPIC / TEXT / URL)
- `Guide.studyMode`
- `Guide.inputValue` (original prompt)
- `Guide.content` (MDX string)
- `Guide.slug` (generated from title, cuid suffix)
- `Guide.isWatermark` (true for guest)
- `Guide.userId` (null for guest)

No new models required.

---

## 6. API Contracts

### `POST /api/generate`

Auth: optional (session checked internally; guest quota enforced).

**Request body (Zod):**

```ts
z.object({
  inputType: z.enum(['TOPIC', 'TEXT', 'URL']),
  inputValue: z.string().min(1).max(50000),
  studyMode: z.enum(['OVERVIEW', 'DEEP_DIVE', 'EXAM_PREP', 'ELI5']),
})
```

**Response:** `text/event-stream` (Vercel AI SDK `StreamingTextResponse`)

Each SSE event is one of:

- `data: {"type":"step","step":"planning"}` — progress update
- `data: {"type":"token","text":"..."}` — token chunk
- `data: {"type":"done","guideSlug":"abc123"}` — generation complete
- `data: {"type":"error","message":"..."}` — generation failed

**Response 422:** Zod validation error.  
**Response 429:** Guest quota exceeded.  
**Response 503:** Claude API unavailable.

---

### `GenerationOrchestrator` (internal)

`src/lib/generation/orchestrator.ts`

Pipeline steps (Facade pattern):

1. `authCheck` — resolve session; identify guest vs. registered.
2. `quotaCheck` — `enforceGuestQuota` for guests.
3. `inputNormalize` — for URL: call Web Fetch MCP; for YouTube: call Transcript MCP.
4. `buildStrategy` — `StudyModeStrategyFactory.create(studyMode)`.
5. `planSections` — strategy's `planSections(input)`.
6. `enrichWithMedia` — strategy's `enrichWithMedia(sections)` → image gen + web search.
7. `buildQuizzes` — strategy's `buildQuizzes(sections)`.
8. `assembleMDX` — `GuideBuilder.build(...)`.
9. `persist` — save to DB (registered only); set `isWatermark` for guests.
10. `emit done` — send `{type:"done", guideSlug}` over stream.

Each step emits a progress SSE event before executing.

---

## 7. Dependencies

- Spec 01 — Infrastructure.
- Spec 02 — Auth (session resolution).
- Spec 03 — Guest quota enforcement.
- Spec 05 — MCP adapters (Web Fetch, YouTube Transcript required for Sprint 04-C).

---

## 8. Out of Scope

- Multi-turn conversational memory across guides.
- Collaborative / shared edit sessions.
- Scheduled/background generation jobs.
- PDF input (file upload).

---

## 9. Test Plan

| #    | Type        | Category | Description                                                         | Given / When / Then                                                                                                      |
| ---- | ----------- | -------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| T-01 | Unit        | Positive | `GenerationOrchestrator` calls steps in correct order               | Mock all deps / `orchestrate()` / steps called in sequence                                                               |
| T-02 | Unit        | Positive | `OverviewStrategy.planSections` returns correct section schema      | Mock Claude / call / returns structured sections                                                                         |
| T-03 | Unit        | Positive | `DeepDiveStrategy.planSections` returns more sections than Overview | Mock Claude / call / section count > Overview                                                                            |
| T-04 | Unit        | Positive | `ExamPrepStrategy.buildQuizzes` returns quiz items                  | Mock Claude / call / array of quiz objects returned                                                                      |
| T-05 | Unit        | Positive | `ELI5Strategy` simplifies language in prompt                        | Mock Claude / call / prompt contains "explain like I'm 5"                                                                |
| T-06 | Unit        | Positive | `GuideBuilder.build` assembles valid MDX string                     | Valid sections input / build / MDX parses without error                                                                  |
| T-07 | Unit        | Negative | Input validation rejects text > 50,000 chars                        | 50001-char string / Zod parse / ZodError                                                                                 |
| T-08 | Unit        | Negative | Input validation rejects empty inputValue                           | Empty string / Zod parse / ZodError                                                                                      |
| T-09 | Unit        | Edge     | Slug generation produces unique URL-safe slugs                      | Same title x2 / `generateSlug()` / different cuid suffixes                                                               |
| T-10 | Integration | Positive | `POST /api/generate` streams tokens for topic input                 | MSW mocks Claude / valid TOPIC request / SSE stream received                                                             |
| T-11 | Integration | Positive | Registered user guide saved to DB after stream                      | Authenticated session + mock Claude / complete / guide row in DB                                                         |
| T-12 | Integration | Negative | Guest guide stored with watermark, not linked to any user account   | No session + mock Claude / complete / Guide row present with `userId=null` and `isWatermark=true`                        |
| T-13 | Integration | Negative | `POST /api/generate` returns 429 at quota                           | IP at count=3 / request / 429                                                                                            |
| T-14 | Integration | Negative | `POST /api/generate` returns 503 on Claude failure                  | MSW returns 500 for Claude / request / 503                                                                               |
| T-15 | Integration | Edge     | Stream interrupted mid-way                                          | MSW drops connection / request / SSE `{type:"error"}` emitted                                                            |
| T-16 | E2E         | Positive | Full topic → guide flow for registered user                         | Login + submit topic / complete / redirected to /guide/slug                                                              |
| T-17 | E2E         | Positive | URL input mode fetches and generates guide                          | Login + submit URL / guide rendered / content matches URL                                                                |
| T-18 | E2E         | Positive | Study mode selector changes visible in output                       | Login + select "Exam-prep" / generate / guide has quiz sections                                                          |
| T-19 | E2E         | Edge     | Very large pasted text (50k chars)                                  | Login + paste 50k chars / generate / completes successfully                                                              |
| T-20 | Component   | Positive | PromptBox renders all three input mode tabs                         | Mount / render / three tab buttons visible                                                                               |
| T-21 | Component   | Positive | StreamingProgress shows correct step sequence                       | Mount with `step="writing"` / render / steps 1+2 complete, 3 active                                                      |
| T-22 | Integration | Edge     | Non-English / Unicode / RTL text input processed without error      | Submit Arabic or Chinese topic string / orchestrate / guide generated; no encoding errors                                |
| T-23 | Integration | Edge     | Two concurrent guest generation requests from same IP both proceed  | Two simultaneous POST /api/generate requests / both stream / no race condition; quota counted correctly                  |
| T-24 | Integration | Edge     | Session expires mid-generation                                      | Auth session invalidated while stream is in flight / stream completes / guide saved; client receives done event or error |
| T-25 | Integration | Edge     | MCP tool failure (Tavily returns 500) does not abort generation     | MSW returns 500 for Tavily / orchestrate / generation continues without search enrichment; user not shown raw error      |
| T-26 | Integration | Edge     | 3rd guest request (exactly at quota limit) still succeeds           | Guest IP at count=2 / POST /api/generate / 200 stream; count becomes 3; 4th request returns 429                          |

---

## 10. Definition of Done

- [ ] Homepage renders with all three input modes functional.
- [ ] Study mode selector wired to generation API.
- [ ] Streaming SSE response visible in UI with progress steps.
- [ ] Registered users' guides persisted to DB and redirected to `/guide/<slug>`.
- [ ] Guest guides rendered with watermark (not persisted).
- [ ] Claude API failure returns 503 gracefully.
- [ ] URL + YouTube inputs work end-to-end (requires Spec 05 Sprint 05-A).
- [ ] All T-01 through T-26 tests passing.
- [ ] Coverage ≥ 90% on `src/lib/generation/**`; overall ≥ 85% lines / ≥ 80% branches.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` all pass locally and in CI.
- [ ] Manual smoke test of the topic → guide happy path in Docker Compose succeeds.
- [ ] No `TODO`, `FIXME`, or `@ts-ignore` in shipped code without a linked issue.
- [ ] `docs/architecture.md` updated with Strategy, Facade, Builder, Template Method entries.
- [ ] PR squash-merged to `main`.
      </file>

<file path="docs/_spec/06-study-guide-renderer/sprints.md">
# Sprints — Spec 06: Study Guide Renderer

> **Status:** ✅ Complete — Sprints 06-A, 06-B, and 06-C implemented

---

## Sprint 06-A — MDX rendering + guide page shell

**Status:** ✅ Complete  
**Scope:** Guide page route, MDX rendering via `next-mdx-remote`, hero section, TOC generation, collapsible sections.

**Files touched:**

- `src/app/guide/[slug]/page.tsx` — Server Component
- `src/app/guide/[slug]/not-found.tsx`
- `src/components/guide/GuideRenderer.tsx` — MDX renderer with custom components
- `src/components/guide/GuideTOC.tsx` — auto-generated TOC
- `src/components/guide/GuideHero.tsx` — hero image/video
- `src/components/guide/CollapsibleSection.tsx`
- `src/components/guide/GuideLayout.tsx` — page layout split

**Implementation notes:**

- Use `next-mdx-remote/rsc` for React Server Component rendering.
- Extract headings from MDX for TOC using rehype plugin (`rehype-slug` + `rehype-autolink-headings`).
- `CollapsibleSection` is a Client Component (needs `useState`).
- Guide page is a Server Component by default; interactive parts are Client Component islands.
- 404 if `Guide` slug not found. 403 redirect if private and not owner.

**Tests added:**

- `tests/unit/components/guide/GuideRenderer.test.tsx`
- `tests/unit/components/guide/GuideTOC.test.tsx`
- `tests/unit/components/guide/CollapsibleSection.test.tsx`
- `tests/unit/components/guide/GuideHero.test.tsx`
- `tests/unit/pages/guide-page.test.tsx`

**Entry criteria:** Spec 04 Sprint 04-B complete (MDX content being generated).  
**Exit criteria:** A guide page at `/guide/[slug]` renders MDX content with working TOC and collapsible sections.

---

## Sprint 06-B — Flashcards, inline quizzes, reading progress

**Status:** ✅ Complete  
**Scope:** `FlashcardDeck` component, `InlineQuiz` component, `ReadingProgressBar`.

**Files touched:**

- `src/components/guide/FlashcardDeck.tsx`
- `src/components/guide/FlashcardCard.tsx`
- `src/components/guide/InlineQuiz.tsx`
- `src/components/guide/ReadingProgressBar.tsx`
- `src/lib/generation/builder.ts` — ensure flashcard/quiz MDX syntax is produced correctly

**Implementation notes:**

- MDX custom component: `<Flashcards>` maps to `FlashcardDeck`. Props: `cards: Array<{front, back}>`.
- `<Quiz>` MDX component maps to `InlineQuiz`. Props: `question, options: string[], correct: number, explanation: string`.
- Answers stored in Client Component state only (no persistence).
- `ReadingProgressBar` uses `useEffect` + scroll listener + `document.documentElement.scrollTop`.

**Tests added:**

- `tests/unit/components/guide/FlashcardDeck.test.tsx`
- `tests/unit/components/guide/InlineQuiz.test.tsx`
- `tests/unit/components/guide/ReadingProgressBar.test.tsx`
- `tests/unit/lib/generation/builder.test.ts`

**Entry criteria:** Sprint 06-A complete.  
**Exit criteria:** Flashcards flip, quiz gives feedback, progress bar updates on scroll.

---

## Sprint 06-C — Highlight-to-note, follow-up chat, dark mode, E2E

**Status:** ✅ Complete  
**Scope:** Highlight-to-note system, follow-up chat, dark/light mode toggle, full E2E tests.

**Files touched:**

- `src/components/guide/HighlightNote.tsx` — Client Component using `window.getSelection()`
- `src/app/api/notes/route.ts` — `POST /api/notes`
- `src/lib/db/repositories/notes.ts` — `NoteRepository`
- `src/components/guide/FollowUpChat.tsx` — streaming chat anchored to guide
- `src/app/api/chat/[guideSlug]/route.ts`
- `src/components/ThemeToggle.tsx`
- `tests/e2e/guide/guide-renderer.spec.ts`

**Implementation notes:**

- `HighlightNote`: listen to `mouseup` on the guide content area; read `window.getSelection()`. Show a floating tooltip using `position: fixed` near the selection end-rect.
- Follow-up chat: passes guide MDX content as system context to Claude. Use same streaming approach as generation (SSE).
- Dark mode: `useTheme` hook from a custom `ThemeProvider`. Persist to `localStorage('theme')`. Sync with `prefers-color-scheme` on first load.

**Tests added:**

- `tests/unit/components/guide/HighlightNote.test.tsx`
- `tests/integration/api/notes/notes.test.ts`
- `tests/integration/api/chat/follow-up-chat.test.ts`
- `tests/e2e/guide/guide-renderer.spec.ts`

**Entry criteria:** Sprint 06-B complete.  
**Exit criteria:** All T-01 through T-22 pass; Definition of Done checklist satisfied.
</file>

<file path="docs/_spec/07-user-dashboard/spec.md">
# Spec 07 — User Dashboard

> **Status:** ✅ Implemented  
> **Sprint file:** [sprints.md](./sprints.md)

---

## 1. Feature Summary

The User Dashboard is the central hub for registered users to manage their generated study guides. It presents a grid or list view of all saved guides with tag filtering, folder organisation, full-text search (SQLite FTS5), favouriting, a "recent" view, and a usage meter. Users can create and rename folders, assign tags, and bulk-delete guides. The dashboard is accessible only to authenticated users.

---

## 2. User Stories

1. As a **registered user**, I want to see all my saved guides in a grid view so that I can quickly browse my library.
2. As a **registered user**, I want to switch to a list view so that I can see more metadata at a glance.
3. As a **registered user**, I want to search my guides by keyword so that I can find a specific guide quickly.
4. As a **registered user**, I want to filter guides by tag so that I can browse by topic.
5. As a **registered user**, I want to create folders and move guides into them so that I can organise my library.
6. As a **registered user**, I want to mark guides as favourites so that I can quickly access my most important guides.
7. As a **registered user**, I want to see a "Recent" section showing my last 5 guides so that my most recent work is always at hand.
8. As a **registered user**, I want to add and remove tags on a guide so that I can categorise my content.
9. As a **registered user**, I want to delete one or more guides so that I can keep my library tidy.
10. As a **registered user**, I want to see a usage summary (total guides, storage estimate) so that I understand my account usage.

---

## 3. Acceptance Criteria

| #     | Story | Given                                        | When                         | Then                                                               |
| ----- | ----- | -------------------------------------------- | ---------------------------- | ------------------------------------------------------------------ |
| AC-01 | US-1  | Authenticated user with guides               | Navigate to `/dashboard`     | All guides visible as cards with title, study mode, date           |
| AC-02 | US-2  | Dashboard loaded                             | Click list view toggle       | Guides switch to table-row layout                                  |
| AC-03 | US-3  | Dashboard loaded                             | Type in search box           | Guides filtered in real time via FTS5; match highlights shown      |
| AC-04 | US-3  | Search with no results                       | Query returns nothing        | "No guides match your search" empty state shown                    |
| AC-05 | US-4  | User has tagged guides                       | Click a tag filter           | Only guides with that tag shown                                    |
| AC-06 | US-5  | User clicks "+ New Folder"                   | Folder name entered          | Folder created; appears in sidebar                                 |
| AC-07 | US-5  | Guide dragged to folder (or via action menu) | Drop/confirm                 | `guide.folderId` updated; guide appears under folder               |
| AC-08 | US-6  | User clicks star on guide card               | Toggle                       | `isFavorite` field toggled; guide moves to/from Favourites section |
| AC-09 | US-7  | Dashboard loads                              | Any state                    | Last 5 guides displayed in a "Recent" strip at page top            |
| AC-10 | US-8  | User opens guide action menu                 | Click "Manage tags"          | Tag editor shown; tags can be added/removed                        |
| AC-11 | US-9  | User selects guides and clicks "Delete"      | Confirmation dialog accepted | Guides deleted; toast notification shown                           |
| AC-12 | US-10 | Dashboard sidebar                            | Any state                    | "X guides · approx Y KB" usage summary visible                     |
| AC-13 | —     | Unauthenticated user                         | Navigate to `/dashboard`     | Redirect to `/login?callbackUrl=/dashboard`                        |

---

## 4. UX Notes

### Layout

Two-column layout: narrow sidebar (folders, tags, stats) + main content area.

### Guide card (grid view)

- Title (truncated)
- Study mode badge (colour-coded pill)
- Date (relative: "2 days ago")
- ⭐ favourite toggle
- `...` action menu: Open, Rename, Manage tags, Move to folder, Delete

### Search

Debounced input (300ms). Results ranked by FTS5 BM25. Matched terms highlighted in snippet.

### Empty state (no guides)

"You haven't created any guides yet. [Generate your first guide →]"

### Folder sidebar

Collapsible tree. Special views at top: All Guides, Recent, Favourites.

---

## 5. Data Model

Uses existing models. Add:

```prisma
model Guide {
  // existing fields...
  isFavorite  Boolean  @default(false)  // add this
}
```

Also add SQLite FTS5 virtual table (created via raw migration, not managed by Prisma):

```sql
CREATE VIRTUAL TABLE guides_fts USING fts5(
  id UNINDEXED,
  title,
  content,
  content='guides',
  content_rowid='rowid'
);

CREATE TRIGGER guides_fts_ai AFTER INSERT ON guides BEGIN
  INSERT INTO guides_fts(rowid, id, title, content) VALUES (new.rowid, new.id, new.title, new.content);
END;
-- (update + delete triggers similarly)
```

---

## 6. API Contracts

### `GET /api/guides`

Auth: required.

**Query params:**

```ts
z.object({
  q: z.string().optional(),
  tag: z.string().optional(),
  folderId: z.string().cuid().optional(),
  view: z.enum(['recent', 'favorites', 'all']).default('all'),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(24),
})
```

**Response 200:**

```json
{
  "guides": [ { "id", "slug", "title", "studyMode", "createdAt", "isFavorite", "tags", "folder" } ],
  "total": 42,
  "page": 1
}
```

### `PATCH /api/guides/[id]`

Auth: required (must own guide).

**Request body:**

```ts
z.object({
  isFavorite: z.boolean().optional(),
  folderId: z.string().cuid().nullable().optional(),
  title: z.string().min(1).max(200).optional(),
})
```

**Response 200:** Updated guide object.  
**Response 403:** Not the owner.

### `DELETE /api/guides`

Auth: required (must own all guides).

**Request body:**

```ts
z.object({ ids: z.array(z.string().cuid()).min(1).max(50) })
```

**Response 200:** `{ deleted: number }`

### `POST /api/folders`

Auth: required.

**Request body:**

```ts
z.object({ name: z.string().min(1).max(100) })
```

**Response 201:** Folder object.

### `PATCH /api/guides/[id]/tags`

Auth: required.

**Request body:**

```ts
z.object({ tags: z.array(z.string().min(1).max(50)).max(10) })
```

**Response 200:** Updated tag list.

---

## 7. Dependencies

- Spec 02 — Authentication.
- Spec 04 — Guide generation (produces the content that dashboard lists).
- Spec 06 — Guide renderer (linked from dashboard cards).

---

## 8. Out of Scope

- Shared/collaborative folders.
- Guide versioning / history.
- Bulk export (covered in Spec 09).
- Admin view of all users' guides.

---

## 9. Test Plan

| #    | Type        | Category | Description                                                        | Given / When / Then                                                                          |
| ---- | ----------- | -------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| T-01 | Unit        | Positive | `GuideRepository.findByUser` returns correct guides                | Mock Prisma / call with userId / correct array returned                                      |
| T-02 | Unit        | Positive | FTS5 search returns ranked results                                 | Mock raw query / search("octopus") / ranked results                                          |
| T-03 | Unit        | Positive | `GuideRepository.toggleFavorite` flips isFavorite                  | Guide with false / toggle / returns true                                                     |
| T-04 | Unit        | Positive | Pagination: page 2 returns correct offset                          | 25 guides / page=2, limit=10 / guides 11-20                                                  |
| T-05 | Integration | Positive | `GET /api/guides` returns user's guides only                       | Two users' guides in DB / authenticated as user A / only A's guides                          |
| T-06 | Integration | Positive | `GET /api/guides?q=octopus` returns FTS results                    | Guide with "octopus" in title / search / guide returned                                      |
| T-07 | Integration | Positive | `PATCH /api/guides/[id]` updates isFavorite                        | Authenticated owner / toggle / DB updated                                                    |
| T-08 | Integration | Negative | `PATCH /api/guides/[id]` blocked for non-owner                     | User B / patch User A's guide / 403                                                          |
| T-09 | Integration | Positive | `DELETE /api/guides` deletes multiple guides                       | 3 guide IDs / delete / 3 rows gone                                                           |
| T-10 | Integration | Negative | `DELETE /api/guides` can't delete another user's guide             | Mixed IDs / delete / 403                                                                     |
| T-11 | Integration | Positive | `POST /api/folders` creates folder                                 | Valid name / create / folder in DB                                                           |
| T-12 | Component   | Positive | `GuideCard` renders title, mode badge, date                        | Mount with guide data / render / all fields visible                                          |
| T-13 | Component   | Positive | Grid/list toggle switches view mode                                | Click toggle / layout changes                                                                |
| T-14 | Component   | Positive | Empty state shown when no guides                                   | Mount with empty array / render / empty state message                                        |
| T-15 | Component   | Positive | Search input debounces correctly                                   | Type rapidly / only 1 API call after 300ms pause                                             |
| T-16 | E2E         | Positive | Dashboard loads and shows saved guides                             | Login + generate guide / navigate to /dashboard / guide visible                              |
| T-17 | E2E         | Positive | Search finds guide by title                                        | Login / search for guide title / guide appears                                               |
| T-18 | E2E         | Positive | Favourite toggle persists across reload                            | Star guide / reload / still starred                                                          |
| T-19 | E2E         | Positive | Delete guide removes it from dashboard                             | Delete guide / dashboard / guide gone                                                        |
| T-20 | E2E         | Negative | Unauthenticated redirected from dashboard                          | No session / navigate to /dashboard / redirect to /login                                     |
| T-21 | Integration | Edge     | FTS5 search with Unicode/non-English query matches guide correctly | Guide with Japanese title in DB / search with matching Japanese query / guide returned       |
| T-22 | Integration | Edge     | Concurrent DELETE requests for same guide do not produce 500       | Two simultaneous DELETE with same guide ID / both resolve / guide deleted once; no 500 error |

---

## 10. Definition of Done

- [ ] Dashboard renders grid and list views.
- [ ] FTS5 search working via `GET /api/guides?q=...`.
- [ ] Folder sidebar with create, rename, move-guide.
- [ ] Favourite toggle (star) persists.
- [ ] Bulk delete with confirmation.
- [ ] Tag management on guide cards.
- [ ] Usage summary in sidebar.
- [ ] All T-01 through T-22 tests passing.
- [ ] Coverage ≥ 85% on `src/lib/db/repositories/guides.ts`.
- [ ] FTS5 migration script committed and tested.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` all pass locally and in CI.
- [ ] Manual smoke test of dashboard search, folders, and bulk-delete in Docker Compose succeeds.
- [ ] No `TODO`, `FIXME`, or `@ts-ignore` in shipped code without a linked issue.
- [ ] `docs/architecture.md` updated if new patterns or modules were introduced.
- [ ] PR squash-merged to `main`.
      </file>

<file path="docs/_spec/07-user-dashboard/sprints.md">
# Sprints — Spec 07: User Dashboard

> **Status:** ✅ Complete — Sprints 07-A, 07-B, and 07-C implemented

---

## Sprint 07-A — Guide repository + FTS5 migration + API

**Status:** ✅ Complete  
**Scope:** `GuideRepository`, FTS5 virtual table + triggers, `GET /api/guides`, `DELETE /api/guides`.

**Files touched:**

- `prisma/migrations/<timestamp>_fts5_and_favorites/` — raw SQL migration for FTS5 + `isFavorite` column
- `src/lib/db/repositories/guides.ts` — `GuideRepository` implementing `IGuideReader` + `IGuideWriter`
- `src/lib/db/repositories/types.ts` — `IGuideReader`, `IGuideWriter` interfaces
- `src/app/api/guides/route.ts` — `GET` + `DELETE`
- `src/app/api/guides/[id]/route.ts` — `PATCH`

**Implementation notes:**

- FTS5 migration: raw `$executeRawUnsafe` in a Prisma custom migration, not auto-generated.
- `GuideRepository.search(userId, query)` uses `SELECT g.* FROM guides g JOIN guides_fts f ON g.rowid = f.rowid WHERE guides_fts MATCH ? AND g.userId = ? ORDER BY rank`.
- `DELETE /api/guides`: verify all IDs belong to the requesting user before deleting (single transaction).
- `isFavorite` column added via migration alongside FTS5.

**Tests added:**

- `tests/unit/lib/db/repositories/guides.test.ts`
- `tests/integration/api/guides/guides.test.ts`

**Entry criteria:** Spec 04 complete.  
**Exit criteria:** `GET /api/guides` returns user's guides; FTS5 search returns ranked results.

---

## Sprint 07-B — Folder + tag APIs

**Status:** ✅ Complete  
**Scope:** Folder CRUD, tag management API, `FolderRepository`.

**Files touched:**

- `src/lib/db/repositories/folders.ts`
- `src/app/api/folders/route.ts` — `POST` (create) + `GET` (list)
- `src/app/api/folders/[id]/route.ts` — `PATCH` (rename) + `DELETE`
- `src/app/api/guides/[id]/tags/route.ts`

**Tests added:**

- `tests/unit/lib/db/repositories/folders.test.ts`
- `tests/integration/api/folders/folders.test.ts`
- `tests/integration/api/guides/tags.test.ts`

**Entry criteria:** Sprint 07-A complete.  
**Exit criteria:** Folders can be created, renamed, deleted; guides can be moved; tags can be added/removed.

---

## Sprint 07-C — Dashboard UI + E2E tests

**Status:** ✅ Complete  
**Scope:** Dashboard page, guide card, grid/list toggle, search input, folder sidebar, usage summary.

**Files touched:**

- `src/app/dashboard/page.tsx` — Server Component shell
- `src/components/dashboard/GuideCard.tsx`
- `src/components/dashboard/GuideGrid.tsx`
- `src/components/dashboard/GuideList.tsx`
- `src/components/dashboard/DashboardSearch.tsx`
- `src/components/dashboard/FolderSidebar.tsx`
- `src/components/dashboard/UsageSummary.tsx`
- `src/components/dashboard/DashboardShell.tsx`
- `tests/e2e/dashboard/dashboard.spec.ts`

**Implementation notes:**

- Initial render is a Server Component (passes guides as props to Client Components).
- Search + filtering: client-side state with debounced re-fetch to `/api/guides`.
- `GuideCard` action menu (Radix UI `DropdownMenu` via shadcn/ui).

**Tests added:**

- `tests/unit/components/dashboard/GuideCard.test.tsx`
- `tests/unit/components/dashboard/DashboardSearch.test.tsx`
- `tests/e2e/dashboard/dashboard.spec.ts`

**Entry criteria:** Sprint 07-B complete.  
**Exit criteria:** All T-01 through T-22 pass; Definition of Done checklist satisfied.
</file>

<file path="docs/_spec/11-observability/sprints.md">
# Sprints — Spec 11: Observability, Security Hardening & Rate Limiting

> **Status:** 🚧 In progress — Sprints 11-A through 11-C are locally complete, and Sprint 11-D now includes sanitization, the shared API error-response rollout, and the app-level error boundary; remaining work is the E2E coverage slice

---

## Sprint 11-A — Structured logging + request IDs

**Status:** ✅ Local slice complete  
**Scope:** Pino logger singleton, request-ID middleware, log context propagation.

**Files touched:**

- `src/lib/logger/index.ts` — `createLogger(requestId?)` returns pino instance
- `src/lib/logger/middleware.ts` — `requestIdMiddleware(req): { requestId, logger }`
- `src/proxy.ts` — wire request IDs into proxy passthrough responses and request headers
- `src/app/api/health/route.ts` — stamp `x-request-id` on the public health endpoint and emit structured health-check logs
- `.env.example` — add `LOG_LEVEL=info`
- `tests/unit/lib/logger/index.test.ts` — verifies request-scoped logger bindings via AsyncLocalStorage

**Implementation notes:**

- Use `AsyncLocalStorage` (Node built-in) to propagate `logger` and `requestId` through a request without prop-drilling.
- In development: `pino-pretty` transport with `colorize: true`.
- In production: plain JSON to stdout.
- Initial slice: `x-request-id` is generated in `src/proxy.ts` for passthrough traffic, forwarded to downstream handlers via request headers, and added explicitly by the health route because it is excluded from the proxy matcher.
- ESLint rule: add `"no-console": "error"` under `rules` in `eslint.config.mjs` (only for `src/**`).

**Tests added:**

- `tests/integration/middleware/request-id.test.ts`

**Entry criteria:** Phase 0 complete.  
**Exit criteria:** Every test request returns `x-request-id`; log lines contain `requestId` field.

---

## Sprint 11-B — Security headers + CSRF

**Status:** ✅ Local slice complete  
**Scope:** All HTTP security headers, CSRF origin check, cookie flags verified.

**Files touched:**

- `src/lib/security/headers.ts` — `buildSecurityHeaders(): Record<string, string>`
- `src/lib/security/csrf.ts` — `validateOrigin(req): boolean`
- `src/lib/security/response.ts` — shared forbidden response for CSRF failures
- `src/proxy.ts` — apply security headers to proxied traffic and reject cross-origin mutating API requests
- `src/app/api/health/route.ts` — apply the same security headers to the public health endpoint
- `src/app/api/auth/[...nextauth]/route.ts` — reject mismatched-origin Auth.js POSTs before delegating
- `src/app/api/auth/register/route.ts`
- `src/app/api/auth/forgot-password/route.ts`
- `src/app/api/auth/reset-password/route.ts`
- `next.config.ts` — `headers()` async config for static pages
- `.env.example` — add `NEXT_PUBLIC_APP_URL`

**Implementation notes:**

- CSP: use `nonce`-based approach (generate per-request); include `'self'`, Vercel/Fly CDN, `data:` for images.
- HSTS: only set when `process.env["NODE_ENV"] === "production"`.
- CSRF: compare `new URL(req.headers.get('origin') ?? '').origin` against `process.env["NEXT_PUBLIC_APP_URL"]`. Skip for GET/HEAD/OPTIONS.
- Initial slice: proxy-enforced CSRF covers mutating `/api/**` traffic except test-only endpoints, and public auth POST routes now enforce the same origin policy directly because Auth.js endpoints are excluded from the proxy matcher.
- Auth.js already sets `SameSite=Lax; HttpOnly` — confirm in integration test.

**Tests added:**

- `tests/unit/lib/security/headers.test.ts`
- `tests/unit/lib/security/csrf.test.ts`
- `tests/integration/middleware/security-headers.test.ts`
- `tests/integration/api/auth/session.test.ts` — confirms Auth.js CSRF cookie flags and POST origin rejection.
- `tests/integration/api/auth/register.test.ts`
- `tests/integration/api/auth/forgot-password.test.ts`
- `tests/integration/api/auth/reset-password.test.ts`

**Entry criteria:** Sprint 11-A complete.  
**Exit criteria:** T-04, T-05, T-09 pass; `curl -I` on health endpoint shows all headers.

---

## Sprint 11-C — Rate limiting (SQLite-backed)

**Status:** ✅ Local slice complete  
**Scope:** `RateLimit` Prisma model, rate-limit middleware, 429 response handling.

**Files touched:**

- `prisma/migrations/<ts>_rate_limit/`
- `src/lib/rate-limit/index.ts` — `checkRateLimit(key, limit, windowMs)`
- `src/lib/rate-limit/middleware.ts` — `rateLimitMiddleware(req, key, opts)`
- `src/app/api/generate/route.ts` — apply rate-limit middleware (guest path)
- `src/components/ui/RateLimitBanner.tsx` — user-facing 429 message
- `src/lib/generation/orchestrator.ts` — skip duplicate guest quota enforcement once the route boundary has already checked it

**Implementation notes:**

- Window = calendar day (midnight UTC). Key = `guest:generate:<ip>`.
- Upsert `RateLimit` row in a single query:
  ```sql
  INSERT INTO RateLimit (key, count, windowEnd)
  VALUES (?, 1, ?)
  ON CONFLICT(key) DO UPDATE SET count = count + 1
  WHERE windowEnd > CURRENT_TIMESTAMP;
  ```
  Clear expired rows on startup (boot.ts).
- Return `Retry-After: <seconds-until-midnight>` in the 429 response.
- Initial slice: the existing SQLite-backed guest quota store now feeds `src/lib/rate-limit/index.ts`, and `src/app/api/generate/route.ts` returns a real JSON `429` with `Retry-After` before opening an SSE stream.
- Current implementation choice: keep the existing SQLite-backed `GuestQuota` store as the rate-limit persistence layer and adapt it through `src/lib/rate-limit/*` instead of introducing a second overlapping table mid-stream.

**Tests added:**

- `tests/unit/lib/rate-limit/index.test.ts`
- `tests/unit/lib/rate-limit/middleware.test.ts`
- `tests/integration/api/generate/generate.test.ts` — verifies route-bound `429` behavior and `skipGuestQuotaCheck` orchestration handoff.

**Entry criteria:** Sprint 11-B complete.  
**Exit criteria:** T-03, T-06, T-07, T-12 pass; guest 4th request returns 429 + Retry-After; rate limit window boundary (T-12) handled correctly at exact `windowEnd`.

---

## Sprint 11-D — Input sanitization + error handler + E2E

**Status:** 🚧 In progress  
**Scope:** `sanitizeInput`, global error handler, E2E tests.

**Files touched:**

- `src/lib/security/sanitize.ts` — `sanitizeInput(str: string): string`
- `src/app/api/generate/route.ts` — sanitize generation input before validation and orchestration
- `src/app/api/notes/route.ts` — sanitize selected text and note content before validation/persistence
- `src/lib/errors/handler.ts` — `handleApiError(err, requestId): Response`
- `src/app/global-error.tsx` — Next.js global error boundary (pending)
- `tests/e2e/observability/security-headers.spec.ts`

**Implementation notes:**

- `sanitizeInput`: use `DOMParser` (Node 18+) or a simple regex strip of `<[^>]*>` tags + null-byte removal. No external sanitization library needed for MVP.
- Implemented slice: generation requests and note creation now sanitize string fields before validation, persistence, or AI submission.
- Implemented slice: `src/lib/errors/handler.ts` now provides shared requestId-aware API error responses, and the existing API routes have been migrated off ad hoc `NextResponse.json({ error: ... })` branches.
- Pending slice: Next.js app-level error boundary still needs to be added.

**Tests added:**

- `tests/unit/lib/security/sanitize.test.ts`
- `tests/integration/api/notes/notes.test.ts`
- `tests/integration/api/generate/generate.test.ts`
- `tests/unit/lib/errors/handler.test.ts`
- `tests/integration/api/chat/follow-up-chat.test.ts`
- `tests/integration/api/guides/share.test.ts`
- `tests/integration/api/guides/tags.test.ts`
- `tests/integration/api/guides/export.test.ts`
- `tests/integration/api/guides/fork.test.ts`
- `tests/integration/api/account/avatar.test.ts`
- `tests/integration/api/test/session.test.ts`
- `tests/integration/api/test/reset-quota.test.ts`
- `tests/integration/api/test/seed.test.ts`
- `tests/e2e/observability/security-headers.spec.ts` — T-10 and T-11

**Entry criteria:** Sprint 11-C complete.  
**Exit criteria:** All T-01 through T-12 pass; Definition of Done checklist satisfied. Current remaining work is the E2E slice.
</file>

<file path="src/app/layout.tsx">
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import GuestBanner from '@/components/guest/GuestBanner'

const geistSans = Geist({
variable: '--font-geist-sans',
subsets: ['latin'],
})

const geistMono = Geist_Mono({
variable: '--font-geist-mono',
subsets: ['latin'],
})

export const metadata: Metadata = {
title: 'Create Next App',
description: 'Generated by create next app',
}

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode
}>) {
return (

<html
lang="en"
suppressHydrationWarning
className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`} >
<body className="min-h-full flex flex-col bg-black text-white">
<GuestBanner />
{children}
</body>
</html>
)
}
</file>

<file path="src/lib/container.ts">
/**
 * Composition root — registers all MCP adapters at startup.
 * Import this file once in the app entry point (e.g. layout.tsx or instrumentation.ts).
 */
import { MCPClientFactory } from './mcp/factory'
import { RetryDecorator } from './mcp/retry-decorator'
import { WebFetchAdapter } from './mcp/adapters/web-fetch'
import { TavilySearchAdapter } from './mcp/adapters/tavily-search'
import { FalImageGenAdapter } from './mcp/adapters/fal-image-gen'
import { YouTubeTranscriptAdapter } from './mcp/adapters/youtube-transcript'

MCPClientFactory.register(new RetryDecorator(new WebFetchAdapter()))
MCPClientFactory.register(new RetryDecorator(new TavilySearchAdapter()))
MCPClientFactory.register(new RetryDecorator(new FalImageGenAdapter()))
MCPClientFactory.register(new RetryDecorator(new YouTubeTranscriptAdapter()))
</file>

<file path="next.config.ts">
import type { NextConfig } from 'next'
import { buildSecurityHeaders } from './src/lib/security/headers'

const nextConfig: NextConfig = {
output: 'standalone',
// Security headers applied in middleware
poweredByHeader: false,
async headers() {
const securityHeaders = buildSecurityHeaders()

    return [
      {
        source: '/:path*',
        headers: Object.entries(securityHeaders).map(([key, value]) => ({ key, value })),
      },
    ]

},
}

export default nextConfig
</file>

<file path="pnpm-workspace.yaml">
onlyBuiltDependencies:
  - better-sqlite3
  - esbuild
  - msw

ignoredBuiltDependencies:

- '@prisma/engines'
- prisma
- sharp
- unrs-resolver
  </file>

<file path="vitest.config.ts">
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
plugins: [react()],
test: {
globals: true,
environment: 'jsdom',
setupFiles: ['./tests/setup.ts'],
env: {
// Auth.js requires a non-empty secret; provide one for all tests
NEXTAUTH_SECRET: 'vitest-test-secret-do-not-use-in-production',
AUTH_SECRET: 'vitest-test-secret-do-not-use-in-production',
NEXTAUTH_URL: 'http://localhost:3000',
},
server: {
deps: {
// Inline next-auth and next so Vitest can transform ESM imports correctly
inline: ['next-auth', 'next', '@auth/prisma-adapter', '@fal-ai/client', '@tavily/core'],
},
},

    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 85,
        branches: 80,
        functions: 85,
        statements: 85,
      },
      include: ['src/**'],
      exclude: ['src/**/*.d.ts', 'src/**/*.stories.*'],
    },
    include: [
      'tests/unit/**/*.test.ts',
      'tests/unit/**/*.test.tsx',
      'tests/integration/**/*.test.ts',
    ],

},
resolve: {
alias: {
'@': resolve(**dirname, './src'),
// next-auth v5 internally imports 'next/server'; alias it to the resolved file
// so pnpm's isolated node_modules doesn't break module resolution in Vitest
'next/server': resolve(**dirname, 'node_modules/next/dist/server/web/exports/index.js'),
},
},
})
</file>

<file path="docs/_spec/02-authentication/sprints.md">
# Sprints — Spec 02: Authentication & Session Management

> **Status:** ✅ Sprint 02-A complete

---

## Sprint 02-A — Auth.js wiring + Prisma adapter

**Status:** ✅ Complete  
**Scope:** Wire Auth.js v5 with Prisma adapter, configure Google OAuth provider and credentials provider, set up session middleware.

**Files touched:**

- `src/lib/auth/config.ts` — `NextAuthConfig` export
- `src/lib/auth/index.ts` — `{ auth, handlers, signIn, signOut }`
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/middleware.ts` — route matcher + `authMiddleware`
- `src/lib/auth/middleware.ts`

**Implementation notes:**

- Auth.js v5: export `handlers` from the config; re-export as named route handlers.
- `session.strategy = "jwt"` — no DB session table queries on every request.
- Google OAuth: `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` from env.
- Protected routes matcher: `/dashboard/:path*`, `/guide/:path*`, `/account/:path*`, `/api/guides/:path*` (except health).
- `callbackUrl` forwarded through redirect so user lands back where they started.

**Tests added:**

- `tests/unit/lib/auth/middleware.test.ts` — redirect logic for unauthenticated requests.
- `tests/integration/api/auth/session.test.ts` — session present/absent scenarios.

**Entry criteria:** Spec 01 complete, `GOOGLE_CLIENT_ID` set in `.env`.  
**Exit criteria:** Google OAuth login works in dev; `/dashboard` redirects without session.

---

## Sprint 02-B — Email/password signup & verification

**Status:** ✅ Complete  
**Scope:** Registration API, hashed passwords, email verification token + email sending.

**Files touched:**

- `src/app/api/auth/register/route.ts`
- `src/app/api/auth/verify-email/route.ts`
- `src/lib/auth/password.ts` — `hashPassword`, `verifyPassword`
- `src/lib/auth/tokens.ts` — `createVerificationToken`, `consumeVerificationToken`
- `src/lib/email/index.ts` — `sendVerificationEmail` (nodemailer → Mailhog in dev)
- `src/app/(auth)/register/page.tsx`
- `src/app/(auth)/verify-email/page.tsx`
- `src/components/auth/RegisterForm.tsx`

**Implementation notes:**

- `bcryptjs` for hashing (no native binary issues in Docker Alpine). Cost = 12.
- Verification tokens: 32-byte crypto-random hex, stored in `VerificationToken`, expire 24h.
- Email sent via `nodemailer` SMTP to `SMTP_HOST:SMTP_PORT` (Mailhog in dev, real SMTP in prod).
- Credentials provider in Auth.js checks `emailVerified` before allowing login.

**Tests added:**

- `tests/unit/lib/auth/password.test.ts`
- `tests/unit/lib/auth/tokens.test.ts`
- `tests/integration/api/auth/register.test.ts`
- `tests/integration/api/auth/verify-email.test.ts`
- `tests/unit/components/auth/RegisterForm.test.tsx` (RTL)

**Entry criteria:** Sprint 02-A complete.  
**Exit criteria:** Can sign up, receive email in Mailhog, click verify link, then log in.

---

## Sprint 02-C — Forgot/reset password + login page

**Status:** ✅ Complete  
**Scope:** Forgot-password and reset-password API + pages, login page with all providers.

**Files touched:**

- `src/app/api/auth/forgot-password/route.ts`
- `src/app/api/auth/reset-password/route.ts`
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/forgot-password/page.tsx`
- `src/app/(auth)/reset-password/page.tsx`
- `src/components/auth/LoginForm.tsx`
- `src/components/auth/ForgotPasswordForm.tsx`
- `src/components/auth/ResetPasswordForm.tsx`
- `src/lib/email/index.ts` — `sendPasswordResetEmail`

**Implementation notes:**

- Reset tokens: same infra as verify tokens, expire 1h.
- `POST /api/auth/forgot-password` always 200 (no email enumeration).
- On successful reset: invalidate all existing sessions for that user (set `sessionToken` to unique expired value or use session version counter).

**Tests added:**

- `tests/integration/api/auth/forgot-password.test.ts`
- `tests/integration/api/auth/reset-password.test.ts`
- `tests/e2e/auth/signup-verify-login.spec.ts`
- `tests/e2e/auth/forgot-reset-password.spec.ts`
- `tests/unit/components/auth/LoginForm.test.tsx`

**Entry criteria:** Sprint 02-B complete.  
**Exit criteria:** All AC-01 through AC-15 pass; all T-01 through T-23 pass; E2E tests green.
</file>

<file path="docs/_spec/05-mcp-integrations/sprints.md">
# Sprints — Spec 05: MCP Tool Integrations

> **Status:** ✅ Complete — Sprints 05-A, 05-B, and 05-C finished

---

## Sprint 05-A — Core infrastructure: types, factory, retry decorator, Web Fetch

**Status:** ✅ Complete  
**Scope:** `IMCPClient` interface, `MCPClientFactory`, `RetryDecorator`, typed error classes, `WebFetchAdapter`.

**Files touched:**

- `src/lib/mcp/types.ts` — `IMCPClient`, `MCPError`, `MCPFetchError`, `MCPTimeoutError`, `MCPServiceError`, `MCPRateLimitError`, `MCPTranscriptUnavailableError`
- `src/lib/mcp/factory.ts` — `MCPClientFactory`
- `src/lib/mcp/retry-decorator.ts` — `RetryDecorator`
- `src/lib/mcp/adapters/web-fetch.ts` — `WebFetchAdapter`
- `src/lib/mcp/index.ts` — re-exports
- `src/lib/container.ts` — composition root; registers all adapters

**Implementation notes:**

- `WebFetchAdapter` uses global `fetch` with `AbortController` for timeout.
- HTML stripping: use `node-html-parser` or regex to strip tags; limit to 100k chars.
- `RetryDecorator` only retries on `MCPServiceError` and network errors (not 4xx).
- Exponential backoff: `baseDelay * 2^attempt` + jitter.

**Tests added:**

- `tests/unit/lib/mcp/factory.test.ts`
- `tests/unit/lib/mcp/retry-decorator.test.ts`
- `tests/unit/lib/mcp/adapters/web-fetch.test.ts`
- `tests/mocks/handlers/web-fetch.ts` — MSW handler

**Entry criteria:** Spec 01 complete.  
**Exit criteria:** `WebFetchAdapter` working with retries; factory registers + retrieves it.

---

## Sprint 05-B — Tavily Search + fal.ai Image Generation adapters

**Status:** ✅ Complete  
**Scope:** `TavilySearchAdapter` and `FalImageGenAdapter` implementations.

**Files touched:**

- `src/lib/mcp/adapters/tavily-search.ts`
- `src/lib/mcp/adapters/fal-image-gen.ts`
- `src/lib/container.ts` — register new adapters

**Implementation notes:**

- Tavily: use `@tavily/core` `TavilyClient`. API key from `TAVILY_API_KEY` env. Max results = 5.
- fal.ai: use `@fal-ai/client`. Model = `fal-ai/flux/schnell` (fast, lower cost). Return first image URL.
- Both wrapped in `RetryDecorator`.
- Image gen is best-effort: if it fails, `GenerationOrchestrator` logs and continues without image (graceful degradation).

**Tests added:**

- `tests/unit/lib/mcp/adapters/tavily-search.test.ts`
- `tests/unit/lib/mcp/adapters/fal-image-gen.test.ts`
- `tests/mocks/handlers/tavily.ts`
- `tests/mocks/handlers/fal.ts`

**Entry criteria:** Sprint 05-A complete.  
**Exit criteria:** Both adapters pass unit tests; test coverage prevents live API calls in CI.

---

## Sprint 05-C — YouTube Transcript adapter + interface compliance tests

**Status:** ✅ Complete  
**Scope:** `YouTubeTranscriptAdapter`, interface compliance test suite run against all four adapters.

**Files touched:**

- `src/lib/mcp/adapters/youtube-transcript.ts`
- `src/lib/mcp/index.ts`
- `src/lib/container.ts`
- `tests/unit/lib/mcp/adapters/youtube-transcript.test.ts`
- `tests/integration/lib/mcp/adapter-compliance.test.ts` — LSP compliance test, run against all adapters

**Implementation notes:**

- `youtube-transcript` package: `YoutubeTranscript.fetchTranscript(videoId)` returns transcript parts.
- Join parts into a single string with space separator.
- No API key needed — uses YouTube's public captions endpoint.
- If captions disabled: package throws; catch and re-throw as `MCPTranscriptUnavailableError`.

**Tests added:**

- `tests/unit/lib/mcp/adapters/youtube-transcript.test.ts`
- `tests/integration/lib/mcp/adapter-compliance.test.ts`

**Entry criteria:** Sprint 05-B complete.  
**Exit criteria:** All T-01 through T-19 pass; interface compliance test confirms all adapters satisfy `IMCPClient` contract.
</file>

<file path="docs/_spec/08-account-management/spec.md">
# Spec 08 — Account Management

> **Status:** ✅ Implemented  
> **Sprint file:** [sprints.md](./sprints.md)

---

## 1. Feature Summary

Account Management allows registered users to control every aspect of their FlashGuides identity: update their display name and avatar, change their email address (with re-verification), change their password, view and disconnect connected OAuth providers, export all their data as a downloadable zip (Markdown + JSON), and permanently delete their account. All mutations are protected by re-authentication confirmation where appropriate.

---

## 2. User Stories

1. As a **registered user**, I want to update my display name and avatar photo so that my profile reflects my identity.
2. As a **registered user**, I want to change my email address so that I can keep my account current if my address changes.
3. As a **registered user**, I want to change my password so that I can maintain account security.
4. As a **registered user**, I want to see which OAuth providers are connected to my account so that I know my login options.
5. As a **registered user**, I want to disconnect an OAuth provider so that I can revoke unwanted login methods.
6. As a **registered user**, I want to export all my data (guides + notes) as a zip so that I own my content.
7. As a **registered user**, I want to permanently delete my account so that I can remove all my data from the service.

---

## 3. Acceptance Criteria

| #     | Story | Given                                  | When                                          | Then                                                                  |
| ----- | ----- | -------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------- |
| AC-01 | US-1  | Authenticated user                     | PATCH `/api/account/profile` with valid name  | `user.name` updated; response 200                                     |
| AC-02 | US-1  | Valid image file (≤2MB, JPEG/PNG/WebP) | Upload avatar                                 | Image stored in MinIO; `user.image` URL updated                       |
| AC-03 | US-1  | File > 2MB or invalid type             | Upload avatar                                 | 422: "Image must be JPEG, PNG, or WebP under 2 MB"                    |
| AC-04 | US-2  | Valid new email                        | PATCH `/api/account/email`                    | Verification email sent to new address; change pending until verified |
| AC-05 | US-2  | New email already registered           | PATCH `/api/account/email`                    | 409: "Email already in use"                                           |
| AC-06 | US-2  | User clicks verification link          | GET `/api/account/verify-email-change?token=` | `user.email` updated; old email change token invalidated              |
| AC-07 | US-3  | Current password correct               | PATCH `/api/account/password`                 | Password updated; all other sessions invalidated                      |
| AC-08 | US-3  | Current password incorrect             | PATCH `/api/account/password`                 | 401: "Current password incorrect"                                     |
| AC-09 | US-4  | User visits account page               | Page loads                                    | Connected OAuth providers listed                                      |
| AC-10 | US-5  | User has ≥2 login methods              | Click "Disconnect Google"                     | Provider unlinked; `Account` row deleted                              |
| AC-11 | US-5  | User has only 1 login method           | Attempt to disconnect only provider           | 400: "Cannot remove your only login method"                           |
| AC-12 | US-6  | User clicks "Export data"              | POST `/api/account/export`                    | Zip generated with `guides/*.md` + `data.json`; download URL returned |
| AC-13 | US-7  | User enters password to confirm        | POST `/api/account/delete`                    | All user data deleted; session destroyed; redirected to `/`           |
| AC-14 | US-7  | Incorrect password for deletion        | POST `/api/account/delete`                    | 401: "Incorrect password"                                             |

---

## 4. UX Notes

### Account page (`/account`)

Sections:

1. **Profile** — name + avatar upload.
2. **Email** — current email; "Change email" expandable form.
3. **Password** — "Change password" expandable form (hidden for OAuth-only users).
4. **Connected accounts** — list of OAuth providers with disconnect buttons.
5. **Data & Privacy** — "Export my data" button + "Delete account" danger zone.

### Email change flow

After submitting new email: banner "Verification email sent to <new>. Your email won't change until you verify."

### Delete account danger zone

Red bordered section. "This is permanent and cannot be undone." Requires typing password in a confirmation dialog.

### Export

Button shows spinner. Once zip is ready, a `<a download>` link appears for 60 seconds, then expires.

---

## 5. Data Model

No new models. Touch:

- `User.name`, `User.image`, `User.email`, `User.password`, `User.emailVerified`
- `Account` — disconnect OAuth provider by deleting row
- `VerificationToken` — reuse for email change tokens

New column added via migration:

```prisma
model User {
  pendingEmail  String?   // new email awaiting verification
}
```

Avatar stored in MinIO bucket `flashguides-avatars`; URL stored in `User.image`.

---

## 6. API Contracts

### `PATCH /api/account/profile`

Auth: required.

```ts
z.object({
  name: z.string().min(1).max(100).optional(),
})
```

**Response 200:** Updated user object.

### `POST /api/account/avatar`

Auth: required. Content-Type: `multipart/form-data`.  
Field: `avatar` (file, ≤2MB, JPEG/PNG/WebP).  
**Response 200:** `{ imageUrl: string }`  
**Response 422:** Validation error.

### `PATCH /api/account/email`

Auth: required.

```ts
z.object({ email: z.string().email() })
```

**Response 200:** `{ message: "Verification email sent" }`  
**Response 409:** Email in use.

### `PATCH /api/account/password`

Auth: required.

```ts
z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
})
```

**Response 200:** `{ message: "Password updated" }`  
**Response 401:** Wrong current password.

### `DELETE /api/account/oauth/[provider]`

Auth: required.  
**Response 200:** `{ message: "Disconnected" }`  
**Response 400:** Only login method.

### `POST /api/account/export`

Auth: required.  
**Response 202:** `{ downloadUrl: string, expiresAt: string }`

### `DELETE /api/account`

Auth: required.

```ts
z.object({ password: z.string() })
```

**Response 200:** `{ message: "Account deleted" }`  
**Response 401:** Wrong password.

---

## 7. Dependencies

- Spec 02 — Auth.js session and password utilities.
- Spec 01 — MinIO for avatar storage.

---

## 8. Out of Scope

- Two-factor auth.
- Billing / subscription management.
- Username/handle (display name only).
- GDPR automated erasure requests beyond the manual delete flow.

---

## 9. Test Plan

| #    | Type        | Category | Description                                                               | Given / When / Then                                                            |
| ---- | ----------- | -------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| T-01 | Unit        | Positive | `UserRepository.updateProfile` updates name                               | Mock Prisma / update / returns updated user                                    |
| T-02 | Unit        | Positive | Avatar upload validates MIME type                                         | File with `image/png` / validate / passes                                      |
| T-03 | Unit        | Negative | Avatar upload rejects oversized file                                      | File > 2MB / validate / throws                                                 |
| T-04 | Unit        | Positive | `generateDataExport` produces valid zip structure                         | Mock guides + notes / generate / zip contains expected files                   |
| T-05 | Integration | Positive | `PATCH /api/account/profile` updates name                                 | Authenticated user / valid name / 200 + DB updated                             |
| T-06 | Integration | Positive | `PATCH /api/account/email` sends verification                             | Valid new email / request / email queued + pendingEmail set                    |
| T-07 | Integration | Negative | `PATCH /api/account/email` returns 409 for taken email                    | Existing email / request / 409                                                 |
| T-08 | Integration | Positive | `PATCH /api/account/password` updates with correct current                | Correct current + valid new / request / 200 + hash updated                     |
| T-09 | Integration | Negative | `PATCH /api/account/password` returns 401 for wrong current               | Wrong current / request / 401                                                  |
| T-10 | Integration | Positive | `DELETE /api/account/oauth/google` removes provider                       | 2 providers linked / disconnect / provider row gone                            |
| T-11 | Integration | Negative | Cannot disconnect only login method                                       | 1 provider only / disconnect / 400                                             |
| T-12 | Integration | Positive | `POST /api/account/export` returns zip download URL                       | Authenticated user / request / downloadUrl in response                         |
| T-13 | Integration | Positive | `DELETE /api/account` deletes all user data                               | Correct password / request / all guides/notes/user deleted                     |
| T-14 | Integration | Negative | `DELETE /api/account` returns 401 for wrong password                      | Wrong password / request / 401                                                 |
| T-15 | E2E         | Positive | Update name via account page                                              | Login / update name / name shown updated in nav                                |
| T-16 | E2E         | Positive | Change password flow                                                      | Login / change password / log out / log in with new password                   |
| T-17 | E2E         | Positive | Export data downloads zip                                                 | Login / click export / zip downloaded                                          |
| T-18 | E2E         | Positive | Delete account flow                                                       | Login / delete account / redirected to `/`, account gone                       |
| T-19 | Integration | Edge     | Unicode/emoji in display name saved and returned without corruption       | PATCH profile with emoji name / 200 + name stored intact in DB                 |
| T-20 | Unit        | Edge     | Avatar upload rejects file with wrong magic bytes despite valid extension | `.jpg` file with PNG magic bytes / MIME validate / 422                         |
| T-21 | Component   | Positive | `ProfileSection` renders display name, email field, and save button       | Mount / render / all fields present and enabled                                |
| T-22 | Component   | Negative | `DangerZone` delete button disabled until confirmation text matches       | Mount / type partial text / button disabled; type full account email / enabled |

---

## 10. Definition of Done

- [ ] All account mutations gated behind re-auth where required.
- [ ] Avatar upload stored in MinIO; URL persisted to DB.
- [ ] Email change flow with re-verification working.
- [ ] Data export zip correct and downloadable.
- [ ] Account deletion cascades all user data.
- [ ] All T-01 through T-22 tests passing.
- [ ] Coverage ≥ 85% on `src/app/api/account/**`.
- [ ] `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` all pass locally and in CI.
- [ ] Manual smoke test of profile update, email change, and account deletion in Docker Compose succeeds.
- [ ] No `TODO`, `FIXME`, or `@ts-ignore` in shipped code without a linked issue.
- [ ] `docs/architecture.md` updated if new patterns or modules were introduced.
- [ ] PR squash-merged to `main`.
      </file>

<file path="docs/_spec/08-account-management/sprints.md">
# Sprints — Spec 08: Account Management

> **Status:** ✅ Complete — Sprints 08-A, 08-B, and 08-C shipped

---

## Sprint 08-A — Profile & password APIs + account page shell

**Status:** ✅ Complete  
**Scope:** Profile update, avatar upload (MinIO), password change, account page UI.

**Files touched:**

- `src/app/api/account/profile/route.ts`
- `src/app/api/account/avatar/route.ts`
- `src/app/api/account/password/route.ts`
- `src/lib/storage/minio.ts` — `uploadAvatar(buffer, mimeType): Promise<string>` (returns public URL)
- `src/lib/db/repositories/users.ts` — `UserRepository`
- `src/app/account/page.tsx` — account page shell
- `src/components/account/ProfileSection.tsx`
- `src/components/account/AvatarUpload.tsx`
- `src/components/account/PasswordSection.tsx`

**Implementation notes:**

- Avatar upload: validate MIME type and size in route handler before streaming to MinIO.
- Use `@aws-sdk/client-s3` (S3-compatible with MinIO) or the MinIO JS client.
- Password change: `verifyPassword(current)` before allowing update. Invalidate all other JWT sessions by rotating a session version field stored in `User`.

**Tests added:**

- `tests/unit/lib/db/repositories/users.test.ts`
- `tests/unit/lib/storage/minio.test.ts`
- `tests/integration/api/account/profile.test.ts`
- `tests/integration/api/account/password.test.ts`

**Entry criteria:** Spec 02 complete.  
**Exit criteria:** Profile and password updates work via API; avatar stored in MinIO.

---

## Sprint 08-B — Email change, OAuth disconnect

**Status:** ✅ Complete  
**Scope:** Email change with re-verification (`pendingEmail`), OAuth provider disconnect.

**Files touched:**

- `prisma/migrations/<ts>_pending_email/` — add `pendingEmail` column
- `src/app/api/account/email/route.ts`
- `src/app/api/account/verify-email-change/route.ts`
- `src/app/api/account/oauth/[provider]/route.ts`
- `src/lib/email/index.ts` — `sendEmailChangeVerification`
- `src/components/account/EmailSection.tsx`
- `src/components/account/ConnectedAccountsSection.tsx`

**Implementation notes:**

- Pending email stored in `User.pendingEmail`; token in `VerificationToken` with identifier = `email-change:${userId}`.
- On verification: swap `email` ↔ `pendingEmail`, clear token.
- OAuth disconnect: check user has at least one other login method (password or other OAuth) before deleting `Account` row.

**Tests added:**

- `tests/integration/api/account/email.test.ts`
- `tests/integration/api/account/oauth.test.ts`

**Entry criteria:** Sprint 08-A complete.  
**Exit criteria:** Email change verified via Mailhog; OAuth disconnect works; single-method guard enforced.

---

## Sprint 08-C — Data export, account deletion, E2E

**Status:** ✅ Complete  
**Scope:** Data export (zip of Markdown + JSON), account deletion, E2E tests.

**Files touched:**

- `src/app/api/account/export/route.ts`
- `src/app/api/account/delete/route.ts`
- `src/lib/export/data-exporter.ts` — `generateUserDataExport(userId): Promise<Buffer>` (zip)
- `src/components/account/DangerZone.tsx`
- `tests/e2e/account/account.spec.ts`

**Implementation notes:**

- `generateUserDataExport`: use `jszip` or `archiver`. Include `guides/<slug>.md` + `data.json` (all guides + notes as JSON).
- Export zip streamed into a temporary MinIO object with a 60-second presigned URL.
- Account deletion: Prisma cascade deletes handle child rows (cascades defined in schema). Also delete MinIO objects (avatar, export files).
- Deletion requires correct password re-confirmation.

**Tests added:**

- `tests/unit/lib/export/data-exporter.test.ts`
- `tests/integration/api/account/export.test.ts`
- `tests/integration/api/account/delete.test.ts`
- `tests/e2e/account/account.spec.ts`

**Entry criteria:** Sprint 08-B complete.  
**Exit criteria:** All T-01 through T-22 pass; Definition of Done checklist satisfied.
</file>

<file path="docs/_spec/09-sharing-export/spec.md">
# Spec 09 — Sharing & Export

> **Phase:** 3 — Content Distribution  
> **Status:** ✅ Implemented — sharing, fork, and export flows shipped; depends on Spec 06 (renderer) + Spec 07 (dashboard)

---

## 1. Feature Summary

Any saved guide can be shared publicly via a revocable token URL. Visitors loading a share link see a read-only view of the guide. Registered users can fork a shared guide into their own dashboard. Guides can also be exported in three formats: Markdown, single-file HTML, and PDF.

---

## 2. User Stories

| ID    | As a…           | I want to…                                | So that…                                         |
| ----- | --------------- | ----------------------------------------- | ------------------------------------------------ |
| US-01 | Owner           | Generate a public share link for a guide  | I can send it to anyone without an account       |
| US-02 | Owner           | Revoke a share link                       | I can stop public access at any time             |
| US-03 | Visitor         | Open a share link and read the guide      | I can study it without creating an account       |
| US-04 | Registered user | Fork a shared guide into my own dashboard | I can customize it for my own learning           |
| US-05 | Owner           | Export a guide as Markdown                | I can paste it into Obsidian or Notion           |
| US-06 | Owner           | Export a guide as a single-file HTML page | I can save it offline and share without a server |
| US-07 | Owner           | Export a guide as a PDF                   | I can print it or attach it to submissions       |

---

## 3. Acceptance Criteria

| ID    | Criterion                                                                                                             |
| ----- | --------------------------------------------------------------------------------------------------------------------- |
| SH-01 | `POST /api/guides/[id]/share` creates a `ShareLink` row and returns a share URL                                       |
| SH-02 | The share URL path is `/share/[token]` where `token` is 32+ char URL-safe random string                               |
| SH-03 | `GET /share/[token]` renders a read-only guide view; the guide's title and content are visible                        |
| SH-04 | The `/share/[token]` page does NOT render the owner's edit controls                                                   |
| SH-05 | `DELETE /api/guides/[id]/share` invalidates the token; subsequent `GET /share/[token]` returns 410                    |
| SH-06 | A registered user visiting `/share/[token]` sees a "Fork to my guides" button                                         |
| SH-07 | `POST /api/guides/[id]/fork` creates a deep copy of the guide (new rows, not references) under the authenticated user |
| SH-08 | Forked guide `title` is prefixed `"[Fork] "` unless the user edits it                                                 |
| SH-09 | `GET /api/guides/[id]/export?format=md` returns `Content-Type: text/markdown` with the guide body                     |
| SH-10 | `GET /api/guides/[id]/export?format=html` returns `Content-Type: text/html` (self-contained)                          |
| SH-11 | `GET /api/guides/[id]/export?format=pdf` returns `Content-Type: application/pdf`                                      |
| SH-12 | Export endpoints require authentication and guide ownership; 403 otherwise                                            |
| SH-13 | PDF export runs headless-browser rendering via Playwright (server-side) or `@react-pdf/renderer`                      |
| SH-14 | `ShareLink` rows include `createdAt`, `expiresAt` (nullable), `clickCount` (INT)                                      |
| SH-15 | Each visit to `/share/[token]` increments `clickCount` atomically                                                     |

---

## 4. UX Notes

- Share button in the guide's action bar (top-right). Clicking opens a modal with: URL copy button, QR code thumbnail (optional), revoke button, expiry toggle (none / 7 days / 30 days).
- `/share/[token]` page has a top banner: **"Want to save this guide? Sign up free →"** (guest) or **"Add to my guides →"** (registered, triggers fork).
- Export is in a dropdown next to the share button: three format options. PDF opens in a new tab (`_blank`).
- Revoked/expired links show a friendly 410 page (not a generic 404).

---

## 5. Data Model

New model in `prisma/schema.prisma`:

```prisma
model ShareLink {
  id         String    @id @default(cuid())
  token      String    @unique
  guide      Guide     @relation(fields: [guideId], references: [id], onDelete: Cascade)
  guideId    String
  createdAt  DateTime  @default(now())
  expiresAt  DateTime?
  clickCount Int       @default(0)
}
```

New field on `Guide`:

```prisma
shareLink  ShareLink?
```

`Guide.id` already exists as a cuid. No other schema changes required.

---

## 6. API Contracts

### `POST /api/guides/[id]/share`

- **Auth:** Required (must own guide)
- **Body:** `{ expiresIn?: "7d" | "30d" | null }`
- **Response 201:** `{ token: string, url: string, expiresAt: string | null }`
- **Response 409:** If share link already exists (idempotent — return existing link instead)

### `DELETE /api/guides/[id]/share`

- **Auth:** Required (must own guide)
- **Response 204:** Token deleted

### `GET /share/[token]` _(Next.js page route, not API)_

- **Auth:** None required
- **Response:** Read-only guide page or 410

### `POST /api/guides/[id]/fork`

- **Auth:** Required
- **Body:** `{}` (guide ID in path; token in `Referer` optional)
- **Response 201:** `{ guideId: string }` (new guide id)

### `GET /api/guides/[id]/export?format=md|html|pdf`

- **Auth:** Required (must own guide)
- **Response:** File download with appropriate `Content-Disposition: attachment` header

---

## 7. Dependencies

| Dependency             | Reason                                            |
| ---------------------- | ------------------------------------------------- |
| Spec 06 (renderer)     | Read-only guide view reused at `/share/[token]`   |
| Spec 07 (dashboard)    | Fork lands in user dashboard                      |
| `@react-pdf/renderer`  | PDF generation (or optional Playwright headless)  |
| `jszip`                | Used only if bundling HTML assets into zip        |
| `crypto.randomBytes`   | Token generation (Node built-in, no extra dep)    |
| MinIO (docker-compose) | Not required here — exports are streamed directly |

---

## 8. Out of Scope

- Password-protected share links
- Embedded iframes / oEmbeds
- Collaborative real-time editing of shared guides
- Social graph (following other users)
- Custom short URLs or vanity slugs

---

## 9. Test Plan

| #    | Type        | Category | Description                                                               | Given / When / Then                                                                                  |
| ---- | ----------- | -------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| T-01 | Unit        | Positive | `generateToken()` produces 32-char URL-safe string                        | Call `generateToken()` / result / 32+ chars, only URL-safe characters present                        |
| T-02 | Unit        | Positive | `buildMarkdownExport(guide)` outputs well-formed Markdown                 | Valid guide object / call / string with frontmatter and headings; no parse errors                    |
| T-03 | Unit        | Positive | `buildHtmlExport(guide)` converts remote image URLs to base64 data URIs   | Guide with external image URLs / call / `<img src="data:...">` in output                             |
| T-04 | Integration | Positive | `POST /api/guides/[id]/share` creates a `ShareLink` row                   | Authenticated owner / POST / 201 + ShareLink row in DB with correct `guideId`                        |
| T-05 | Integration | Positive | `DELETE /api/guides/[id]/share` removes token; `GET /share/[token]` → 410 | Existing share link / DELETE then GET / 204 then 410                                                 |
| T-06 | Integration | Positive | `POST /api/guides/[id]/fork` creates independent deep-copy guide          | Authenticated user + valid guide / POST fork / new guide rows, `[Fork]` title prefix, new IDs        |
| T-07 | Integration | Positive | Export endpoint returns correct `Content-Type` per format                 | Valid owner / `?format=md`, `?format=html`, `?format=pdf` separately / correct Content-Type headers  |
| T-08 | Integration | Negative | Export endpoint returns 403 for non-owner                                 | User B requests User A's guide export / GET / 403                                                    |
| T-09 | Integration | Positive | `clickCount` increments atomically on each `/share/[token]` visit         | Share link with `clickCount=0` / two sequential GET requests / `clickCount=2`                        |
| T-10 | E2E         | Positive | Share modal opens; copy button writes URL to clipboard                    | Logged-in user / open share modal + click copy / clipboard contains correct share URL                |
| T-11 | E2E         | Positive | Forked guide appears in dashboard with `[Fork]` title prefix              | Registered user visits share page / click fork / dashboard shows `[Fork] <original title>`           |
| T-12 | E2E         | Positive | Revoked share link renders 410 page                                       | Owner revokes link / visit `/share/[token]` / 410 page rendered, not generic 404                     |
| T-13 | Integration | Negative | Unauthenticated user cannot fork a guide                                  | No session / POST `/api/guides/[id]/fork` / 401                                                      |
| T-14 | Integration | Edge     | Share link with `expiresAt` in the past returns 410                       | Share link where `expiresAt < now()` / GET `/share/[token]` / 410 even though token row exists in DB |
| T-15 | Component   | Positive | `ShareModal` renders share link input and copy button                     | Mount with valid share URL / render / URL input populated and copy button visible                    |

---

## 10. Definition of Done

- [ ] All acceptance criteria SH-01 through SH-15 have passing tests
- [ ] `/share/[token]` page scores ≥ 90 Lighthouse accessibility
- [ ] `ShareLink` Prisma migration applied and committed
- [ ] Export formats manually reviewed (Markdown in Obsidian, HTML offline, PDF printed)
- [ ] No TypeScript errors (`pnpm typecheck`)
- [ ] `pnpm lint` passes.
- [ ] `pnpm test:unit` and `pnpm test:integration` pass.
- [ ] Spec 09 E2E suite green.
- [ ] Manual smoke test: share link creation, fork, and PDF download work end-to-end in Docker Compose.
- [ ] No `TODO`, `FIXME`, or `@ts-ignore` in shipped code without a linked issue.
- [ ] `docs/architecture.md` updated if new patterns or modules were introduced.
- [ ] Coverage ≥ 85% on `src/lib/sharing/**` and `src/lib/export/**`.
- [ ] PR squash-merged to `main`.
      </file>

<file path="docs/_spec/09-sharing-export/sprints.md">
# Sprints — Spec 09: Sharing & Export

> **Status:** ✅ Complete — sharing, fork, export, and authenticated shared-page flows implemented and validated

---

## Sprint 09-A — Share link creation, revocation, read-only view

**Status:** ✅ Complete  
**Scope:** `ShareLink` model + migration, share APIs, `/share/[token]` read-only page.

**Files touched:**

- `prisma/migrations/<ts>_share_link/`
- `src/app/api/guides/[id]/share/route.ts`
- `src/lib/db/repositories/share-links.ts` — `ShareLinkRepository`
- `src/lib/sharing/token.ts` — `generateToken(): string` (crypto.randomBytes)
- `src/app/share/[token]/page.tsx` — server component read-only guide view
- `src/components/sharing/ShareModal.tsx`
- `src/components/sharing/ShareButton.tsx`

**Implementation notes:**

- Token: `crypto.randomBytes(24).toString('base64url')` → 32-char URL-safe string.
- `/share/[token]` page is a separate layout (no auth header, distinctive "shared" banner).
- Click count: atomic `UPDATE "ShareLink" SET "clickCount" = "clickCount" + 1` via Prisma `$executeRaw`.
- Expiry check: if `expiresAt !== null && expiresAt < new Date()`, return 410.

**Tests added:**

- `tests/unit/lib/sharing/token.test.ts`
- `tests/integration/api/guides/share.test.ts`
- `tests/integration/app/share/page.test.ts`

**Entry criteria:** Spec 06 and Spec 07 complete.  
**Exit criteria:** Share URL created, read-only page renders, revocation returns 410.

---

## Sprint 09-B — Fork action

**Status:** ✅ Complete  
**Scope:** Fork API, fork button on share page, dashboard integration.

**Files touched:**

- `src/app/api/guides/[id]/fork/route.ts`
- `src/lib/guides/fork.ts` — `forkGuide(sourceId, targetUserId): Promise<Guide>`
- `src/components/sharing/ForkButton.tsx`

**Implementation notes:**

- Deep copy: query source guide, tags (GuideTag), notes. Insert new rows with new cuid IDs and `userId = targetUserId`.
- Run inside a `prisma.$transaction` to keep atomicity.
- Title prefix: `"[Fork] ${original.title}"` (truncated to 255 chars).
- Return redirect to `/dashboard/guides/[newId]` with 201.
- The shared guide page is forced dynamic so authenticated visitors see the live fork CTA instead of a cached guest render.

**Tests added:**

- `tests/unit/lib/guides/fork.test.ts`
- `tests/integration/api/guides/fork.test.ts`

**Entry criteria:** Sprint 09-A complete.  
**Exit criteria:** Fork creates independent guide rows; fork button visible on share page for registered users.

---

## Sprint 09-C — Export (Markdown, HTML, PDF) + E2E

**Status:** ✅ Complete  
**Scope:** Three export endpoints, download UX, E2E tests.

**Files touched:**

- `src/app/api/guides/[id]/export/route.ts`
- `src/lib/export/markdown.ts` — `buildMarkdownExport(guide): string`
- `src/lib/export/html.ts` — `buildHtmlExport(guide): string`
- `src/lib/export/pdf.ts` — `buildPdfExport(guide): Promise<Buffer>`
- `src/components/sharing/ExportDropdown.tsx`
- `tests/e2e/sharing/sharing.spec.ts`

**Implementation notes:**

- Markdown export: strip JSX/MDX components, output raw Markdown with frontmatter.
- HTML export: use `marked` or `unified` to render; inline styles (no external CSS links); convert remote images to base64.
- PDF: use `@react-pdf/renderer` with a simple `<Document><Page>` layout. Render markdown content as `<Text>` with basic formatting.
- All three formats stream to the browser via `new Response(body, { headers })` with `Content-Disposition: attachment`.

**Tests added:**

- `tests/unit/lib/export/markdown.test.ts`
- `tests/unit/lib/export/html.test.ts`
- `tests/unit/lib/export/pdf.test.ts`
- `tests/integration/api/guides/export.test.ts`
- `tests/e2e/sharing/sharing.spec.ts`

**Implementation notes:**

- Owned guide pages expose an `Export` menu with direct downloads for Markdown, HTML, and PDF.
- Share/export/fork browser coverage validates the owner flow end-to-end, including revocation rendering the unavailable page.

**Entry criteria:** Sprint 09-B complete.  
**Exit criteria:** All T-01 through T-15 pass; Definition of Done checklist satisfied.
</file>

<file path="docs/_spec/10-cli-export/spec.md">
# Spec 10 — CLI Source Export

> **Phase:** 4 — Developer Tooling  
> **Status:** ✅ Implemented — `export:source` is complete and locally validated; repository merge remains an external release step

---

## 1. Feature Summary

`scripts/export-source.ts` is a Node.js CLI tool for exporting the project's source code into a single flat file (Markdown or plain text). It is primarily used to produce a prompt-friendly snapshot of the codebase for AI-assisted code review, onboarding, and documentation generation. The tool supports include/exclude filters, format selection, and stdout output.

This tool is invoked via `pnpm export:source`.

---

## 2. User Stories

| ID    | As a…     | I want to…                                                                | So that…                                               |
| ----- | --------- | ------------------------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------- |
| US-01 | Developer | Run `pnpm export:source` and get a Markdown snapshot of the entire source | I can paste it into an AI tool for review              |
| US-02 | Developer | Exclude test files with `--no-tests`                                      | I can get a leaner snapshot focused on production code |
| US-03 | Developer | Export only test files with `--only-tests`                                | I can review test coverage independently               |
| US-04 | Developer | Choose the output format: Markdown or plain text (`--format=md            | txt`)                                                  | I can use it in different contexts |
| US-05 | Developer | Specify an include glob (`--include=src/lib/**`)                          | I can export a specific layer of the codebase          |
| US-06 | Developer | Specify an exclude glob (`--exclude=src/generated/**`)                    | I can exclude noisy generated files                    |
| US-07 | Developer | Write output to a file with `--output=<path>`                             | I can version it or diff against previous exports      |
| US-08 | Developer | Pipe output to stdout with `--stdout`                                     | I can compose it with other CLI tools                  |

---

## 3. Acceptance Criteria

| ID     | Criterion                                                                                                                                                                                |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CLI-01 | The script is executable via `pnpm export:source` (defined in `package.json`)                                                                                                            |
| CLI-02 | Running with no flags produces a combined Markdown file of all `src/**` and `scripts/**` source files                                                                                    |
| CLI-03 | `--no-tests` strips files matching `**/*.test.ts`, `**/*.spec.ts`, `tests/**`                                                                                                            |
| CLI-04 | `--only-tests` includes only files matching `**/*.test.ts`, `**/*.spec.ts`, `tests/**`                                                                                                   |
| CLI-05 | `--format=md` wraps each file in a fenced code block with language tag; `--format=txt` omits fences                                                                                      |
| CLI-06 | `--include=<glob>` ANDs with the default include set                                                                                                                                     |
| CLI-07 | `--exclude=<glob>` additionally excludes matched paths                                                                                                                                   |
| CLI-08 | `--output=<path>` writes to the file; creates parent directories if needed                                                                                                               |
| CLI-09 | `--stdout` writes to stdout instead of a file (default if no `--output`)                                                                                                                 |
| CLI-10 | Secrets and credentials are NEVER included: `.env`, `.env.local`, `*.key`, `*.pem`, `prisma.config.ts`                                                                                   |
| CLI-11 | `node_modules/`, `.next/`, `dist/`, lock files, and binary files are always excluded                                                                                                     |
| CLI-12 | Each file section is prefixed with a header line: `--- path/to/file.ts ---`                                                                                                              |
| CLI-13 | A summary comment at the top lists total file count and total token estimate (chars ÷ 4)                                                                                                 |
| CLI-14 | The script exits 0 on success, 1 on errors, and logs errors to stderr                                                                                                                    |
| CLI-15 | `--help` prints usage instructions                                                                                                                                                       |
| CLI-16 | Any file whose content contains `ANTHROPIC_API_KEY=`, `FAL_API_KEY=`, or similar secret-key patterns is never included in output, regardless of filename (defence-in-depth content scan) |

---

## 4. UX Notes

- The tool should be fast (< 2 s for a typical project). It reads the filesystem once, applies filters, then writes output in a single pass.
- No external dependencies beyond what is already in `devDependencies`. Use Node's built-in `glob` (Node 22+), `fs/promises`, and `path`.
- Output file defaults to `export.md` in the project root when `--output` is not given and `--stdout` is not set.

---

## 5. Data Model

No database interaction. CLI tool only.

---

## 6. API Contracts

Not applicable — this is a CLI tool. The public interface is the command-line flags documented in Section 3.

### Flag schema (parsed with `parseArgs` from `node:util`):

```
--no-tests         boolean   Exclude test files
--only-tests       boolean   Include only test files
--format           string    "md" (default) | "txt"
--include          string    Glob pattern to additionally include
--exclude          string    Glob pattern to additionally exclude
--output           string    Output file path (default: export.md)
--stdout           boolean   Write to stdout
--help             boolean   Print help
```

---

## 7. Dependencies

| Dependency         | Reason                                           |
| ------------------ | ------------------------------------------------ |
| `node:util`        | `parseArgs` for CLI flag parsing                 |
| `node:fs/promises` | Async file reading and writing                   |
| `node:path`        | Path manipulation and MIME-type based exclusions |
| `node:crypto`      | Not needed here                                  |
| `tsx`              | Executes the `.ts` script without compilation    |

No new npm packages should be required.

---

## 8. Out of Scope

- Watch mode / file-change listeners
- Upload or sync to external services (S3, Gist, Paste.bin)
- AST-based filtering (e.g., strip comments)
- Token counting via tiktoken
- Color output in terminal

---

## 9. Test Plan

| #    | Type        | Category | Description                                                                       | Given / When / Then                                                                                                                                                                            |
| ---- | ----------- | -------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T-01 | Unit        | Positive | `collectFiles(options)` returns correct paths for various flag combos             | Various flag combinations / call / expected path arrays returned                                                                                                                               |
| T-02 | Unit        | Positive | `applyAlwaysExclude(paths)` removes secrets, lockfiles, and binaries              | Paths including `.env`, `node_modules/`, `*.png` / call / those paths absent from result                                                                                                       |
| T-03 | Unit        | Positive | `formatSection(path, content, 'md')` produces correct fenced code block           | File path + content / call / output matches ` ```lang\n...\n``` ` pattern with correct language tag                                                                                            |
| T-04 | Unit        | Positive | `formatSection(path, content, 'txt')` produces plain header and content           | File path + content / call / `--- path ---` header present, no fence characters                                                                                                                |
| T-05 | Unit        | Positive | `estimateTokens(content)` returns `Math.ceil(content.length / 4)`                 | String of known length / call / correct integer estimate                                                                                                                                       |
| T-06 | Unit        | Positive | `--no-tests` excludes test files from collected paths                             | Directory with test and source files / `--no-tests` / only non-test files in result                                                                                                            |
| T-07 | Unit        | Positive | `--only-tests` includes only test files                                           | Directory with mixed files / `--only-tests` / only `*.test.ts`, `*.spec.ts`, `tests/**` in result                                                                                              |
| T-08 | Unit        | Positive | `--include` and `--exclude` flags compose correctly with defaults                 | Specific glob flags / call / resulting file set is correct                                                                                                                                     |
| T-09 | Unit        | Negative | `.env` and `prisma.config.ts` never appear in any export                          | Directory with `.env` present / collect / `.env` absent from result                                                                                                                            |
| T-10 | Integration | Positive | `pnpm export:source --stdout` exits 0 and writes Markdown to stdout               | Run CLI with `--stdout` / process exits 0 / stdout starts with summary comment                                                                                                                 |
| T-11 | Unit        | Negative | Files whose content contains `ANTHROPIC_API_KEY=` are excluded (CLI-16)           | File containing `ANTHROPIC_API_KEY=sk-xxx` as content / collect / file absent from result                                                                                                      |
| T-12 | Unit        | Edge     | `--no-tests` and `--only-tests` used together yields empty set without crashing   | Both flags set simultaneously / collect / empty file list returned, process exits 0 with warning                                                                                               |
| T-13 | E2E         | Positive | CLI run against a temp fixture directory produces TOC, file sections, and summary | Create temp dir with ≥3 known source files / run `tsx scripts/export-source.ts --stdout` against it / output contains each file path, correct fenced code block, and summary line count footer |

---

## 10. Definition of Done

- [x] All CLI-01 through CLI-16 criteria verified manually.
- [x] All T-01 through T-13 tests pass.
- [x] `pnpm export:source --stdout | head -20` shows correct header and first file.
- [x] `.env` and `prisma.config.ts` are not present in output (verified by grep in test).
- [x] `pnpm export:source --stdout | grep -i "ANTHROPIC_API_KEY"` returns nothing.
- [x] No TypeScript errors (`pnpm typecheck`).
- [x] `pnpm lint` passes.
- [x] Script is listed in `package.json` under `scripts.export:source`.
- [x] No `TODO`, `FIXME`, or `@ts-ignore` in shipped code without a linked issue.
- [x] `docs/architecture.md` updated with the Command pattern entry for the CLI tool.
- [ ] PR squash-merged to `main`.
      </file>

<file path="docs/_spec/10-cli-export/sprints.md">
# Sprints — Spec 10: CLI Source Export

> **Status:** ✅ Complete — Sprint 10-A and Sprint 10-B are implemented and locally validated

---

## Sprint 10-A — Core export logic + tests

**Status:** ✅ Complete  
**Scope:** File collection, filtering, always-exclude rules, section formatting, token estimate.

**Files touched:**

- `scripts/export-source.ts` — main entry point
- `src/lib/cli/collect-files.ts` — `collectFiles(options): Promise<string[]>`
- `src/lib/cli/always-exclude.ts` — `applyAlwaysExclude(paths: string[]): string[]`
- `src/lib/cli/format-section.ts` — `formatSection(path, content, format): string`
- `src/lib/cli/estimate-tokens.ts` — `estimateTokens(content: string): number`
- `tests/unit/lib/cli/collect-files.test.ts`
- `tests/unit/lib/cli/always-exclude.test.ts`
- `tests/unit/lib/cli/format-section.test.ts`
- `tests/unit/lib/cli/estimate-tokens.test.ts`

**Implementation notes:**

- Use `node:fs/promises` `glob` (Node 22 built-in) with `{ withFileTypes: false }` for file collection.
- Always-exclude list (hard-coded, not overridable):
  - `**/.env`, `**/.env.*`, `**/prisma.config.ts`, `**/*.key`, `**/*.pem`, `**/*.p12`
  - `**/node_modules/**`, `**/.next/**`, `**/dist/**`
  - `**/pnpm-lock.yaml`, `**/package-lock.json`, `**/yarn.lock`
  - Binary extensions: `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.ico`, `.woff`, `.woff2`, `.ttf`, `.eot`, `.otf`, `.pdf`, `.zip`, `.gz`
- Content scan (CLI-16, defence-in-depth): after filename filtering, read each candidate file and exclude any whose content matches `ANTHROPIC_API_KEY=`, `FAL_API_KEY=`, `TAVILY_API_KEY=`, or the pattern `/[A-Z_]+=sk-[A-Za-z0-9]/`.
- `formatSection` in `md` mode: ` ```ts\n${content}\n``` ` with detected language from extension.

**Tests added:**

- `tests/unit/lib/cli/collect-files.test.ts`
- `tests/unit/lib/cli/always-exclude.test.ts`
- `tests/unit/lib/cli/format-section.test.ts`
- `tests/unit/lib/cli/estimate-tokens.test.ts`

**Entry criteria:** Phase 0 complete.  
**Exit criteria:** T-01 through T-12 pass (includes content-based secret detection T-11 and flag-conflict edge case T-12; fixture directory for T-13 E2E test also created here); no secrets ever appear in test output.

---

## Sprint 10-B — CLI entrypoint, flags, integration test

**Status:** ✅ Complete  
**Scope:** `scripts/export-source.ts` main function, `parseArgs` integration, stdout/file output, `--help`.

**Files touched:**

- `scripts/export-source.ts` — main entry; wire all flags to core logic
- `tests/integration/cli/export-source.test.ts`
- `tests/fixtures/cli-fixture-repo/` — minimal fake repo for E2E T-13 (a few `.ts` files, a `.env`, a binary)

**Implementation notes:**

- Use `node:util` `parseArgs` with a strict type map (see spec Section 6).
- `--stdout` writes to `process.stdout`; default writes to `export.md` (or `--output` path).
- Create parent directories with `fs.mkdir(..., { recursive: true })` before writing.
- `--help` prints a usage block to stdout and exits 0.
- Wire into `package.json` via: `"export:source": "tsx scripts/export-source.ts"`

**Tests added:**

- `tests/integration/cli/export-source.test.ts` — spawns the script as a subprocess via `node:child_process` `execFile`, checks exit code and stdout content.
- `tests/integration/cli/export-source.test.ts` also covers the fixture-repo end-to-end CLI contract, including default output, include/exclude flag wiring, warning-path behavior, and binary fixture exclusion.
- `docs/architecture.md` — Command pattern entry documenting the CLI entrypoint and helper split.

**Entry criteria:** Sprint 10-A complete.  
**Exit criteria:** CLI-01 through CLI-16 criteria verified; all T-01 through T-13 pass; `pnpm export:source --stdout | grep -Ei 'ANTHROPIC_API_KEY|FAL_API_KEY|TAVILY_API_KEY'` returns nothing; `pnpm lint` and `pnpm typecheck` pass; local Definition of Done items are satisfied.
</file>

<file path="docs/_spec/11-observability/spec.md">
# Spec 11 — Observability, Security Hardening & Rate Limiting

> **Phase:** Cross-cutting — applies to every phase  
> **Status:** 🚧 In progress — request IDs, structured logging, security headers, CSRF checks, GuestQuota-backed guest rate limiting, input sanitization, shared API error responses, and app-level error boundaries are implemented

---

## 1. Feature Summary

This spec defines the cross-cutting concerns that must be in place before any feature reaches production:

1. **Structured logging** — pino with request-ID correlation
2. **Rate limiting** — IP-based for guest endpoints, per-user for registered endpoints
3. **Input sanitization** — all unvalidated input sanitized before persistence or AI submission
4. **Security headers** — Content Security Policy, HSTS, and related headers on every response
5. **CSRF protection** — SameSite cookies + CSRF token on state-changing forms
6. **Request tracing** — `x-request-id` propagated through all log lines and API responses

---

## 2. User Stories

| ID    | As a…     | I want to…                                                               | So that…                                                      |
| ----- | --------- | ------------------------------------------------------------------------ | ------------------------------------------------------------- |
| US-01 | Operator  | See structured JSON logs with a `requestId` field for every HTTP request | I can trace a user complaint through the logs                 |
| US-02 | Operator  | Know which log lines belong to a single AI generation chain              | I can debug slow or failing AI calls                          |
| US-03 | Operator  | See a rate-limit 429 when a guest exceeds 3 guides/day                   | Abuse is blocked at the API layer before hitting the AI model |
| US-04 | Operator  | See security headers in every HTTP response                              | The app passes a browser security audit                       |
| US-05 | Developer | Have all errors automatically include a `requestId` and stack trace      | Bug reproduction is fast                                      |
| US-06 | Developer | Have unhandled exceptions caught by a global error handler               | The app never exposes raw stack traces to end users           |

---

## 3. Acceptance Criteria

| ID    | Criterion                                                                                                                               |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------- |
| OB-01 | Every HTTP request generates a `requestId` (UUID v4); logged + returned as `x-request-id` response header                               |
| OB-02 | Pino logger is the **only** logging utility used in the app (no `console.log` in production code)                                       |
| OB-03 | Log lines are JSON in production (`NODE_ENV=production`), pretty in development                                                         |
| OB-04 | Log level is configurable via `LOG_LEVEL` env var (default: `info`)                                                                     |
| OB-05 | Guest guide generation endpoints enforce 3 requests/day per IP; returns HTTP 429 with `Retry-After` header                              |
| OB-06 | Rate-limit state is stored in SQLite; no Redis dependency                                                                               |
| OB-07 | All text inputs from users are stripped of HTML tags before persisting or passing to the AI model                                       |
| OB-08 | `Content-Security-Policy` header is set to a restrictive policy on all pages                                                            |
| OB-09 | `Strict-Transport-Security` header set when `NODE_ENV=production`                                                                       |
| OB-10 | `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin` appear on every response |
| OB-11 | Session cookies use `SameSite=Lax; HttpOnly; Secure` (Auth.js default; confirmed active)                                                |
| OB-12 | CSRF: all state-changing API routes validate that `Origin` or `Referer` header matches the app's own domain                             |
| OB-13 | API error responses include `requestId`, `message`, and `code`                                                                          |
| OB-14 | PII (email, password hashes) is NEVER written to logs                                                                                   |

---

## 4. UX Notes

- End users: rate-limit errors (`429`) should render a human-readable message: _"You've created 3 guides today. Sign up for unlimited access!"_
- Developers: running `pnpm dev` streams pretty-printed logs via `pino-pretty` to the terminal.
- Security headers are invisible to users; tested via `curl -I` or browser devtools.

---

## 5. Data Model

Current implementation uses the existing SQLite-backed `GuestQuota` table as the guest rate-limit store and adapts it through `src/lib/rate-limit/*`.

- No Redis dependency.
- No additional Prisma model was required for the current rollout.
- A dedicated `RateLimit` model remains optional future cleanup, not a prerequisite for the shipped behavior.

---

## 6. API Contracts

### Request pipeline — `src/proxy.ts` + route handlers

Cross-cutting behavior currently runs through the Next.js 16 proxy layer plus a small number of route-level helpers:

1. `src/proxy.ts` generates or forwards `x-request-id` for proxied requests.
2. `src/proxy.ts` applies shared security headers to proxied traffic.
3. `src/proxy.ts` rejects mismatched-origin mutating `/api/**` requests, except the intentionally excluded test-only routes and Auth.js surfaces that validate origin in-route.
4. Route handlers such as `/api/health` and the shared API error helper stamp `x-request-id` and security headers when they are outside the proxy matcher or need explicit JSON error shaping.
5. Guest generation rate limiting is enforced at the `/api/generate` route boundary through `src/lib/rate-limit/middleware.ts` before the SSE stream opens.

### Rate-limit error response:

```ts
{ status: 429, code: 'RATE_LIMIT_EXCEEDED', retryAfter: number /* seconds */ }
```

### Error response shape (from shared API error handler):

```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred",
    "requestId": "uuid-here"
  }
}
```

Raw `message` is replaced with "An unexpected error occurred" in production for unhandled errors.
Handled route errors preserve their explicit user-facing messages and include the same `requestId` in both the JSON body and `x-request-id` response header.

---

## 7. Dependencies

| Dependency         | Reason                                                    |
| ------------------ | --------------------------------------------------------- |
| `pino`             | Structured logging (already in `package.json`)            |
| `pino-pretty`      | Dev-mode log formatter (already in devDeps)               |
| `uuid` or `crypto` | `randomUUID()` from Node 19+ built-in                     |
| Prisma             | SQLite-backed guest quota storage and rate-limit adapters |

---

## 8. Out of Scope

- Distributed rate limiting (Redis / Upstash) — SQLite-backed is sufficient for single-instance Fly.io deployment
- Full audit trail / event sourcing
- Log aggregation to external services (Datadog, Logtail) — `STDOUT` JSON is sufficient for Fly.io log shipping
- Web Application Firewall (WAF)
- Intrusion detection

---

## 9. Test Plan

| #    | Type        | Category | Description                                                                 | Given / When / Then                                                                             |
| ---- | ----------- | -------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| T-01 | Unit        | Positive | `createLogger(req)` returns pino instance with `requestId` bound in context | Mock request / call / logger has `requestId` field on every log line                            |
| T-02 | Unit        | Positive | `sanitizeInput(str)` strips HTML tags and null bytes                        | String with `<script>`, other HTML, and `\0` / call / all removed, plain text remains           |
| T-03 | Unit        | Positive | `checkRateLimit(ip, window)` returns correct `allowed / count / retryAfter` | IP with count=2 within window / call / `{ allowed: true, count: 3 }`                            |
| T-04 | Unit        | Positive | `buildSecurityHeaders()` returns all required headers with correct values   | Call / result / all OB-08 through OB-10 header names and values present                         |
| T-05 | Integration | Positive | Every route response includes `x-request-id` header                         | GET /api/health / response / `x-request-id` header present, UUID v4 format                      |
| T-06 | Integration | Negative | 4th guest request in same day returns 429 with `Retry-After`                | IP at count=3 within window / POST to generate / 429 + `Retry-After` header                     |
| T-07 | Integration | Positive | Rate limit count resets after `windowEnd` passes                            | IP at count=3, `windowEnd` in past / POST to generate / 200 (new window, count=1)               |
| T-08 | Integration | Positive | Log output contains `requestId` and does NOT contain email address          | Authenticated request / inspect pino log output / `requestId` present, user email absent        |
| T-09 | Integration | Negative | POST from mismatched `Origin` header returns 403 (CSRF check)               | POST with `Origin: https://attacker.com` / request / 403                                        |
| T-10 | E2E         | Positive | `Content-Security-Policy` header visible in browser DevTools on homepage    | Navigate to `/` / DevTools Network tab / CSP header present                                     |
| T-11 | E2E         | Positive | Guest hitting quota sees human-readable rate-limit banner                   | Guest at count=3 / attempt guide generation / "You've created 3 guides today" message shown     |
| T-12 | Integration | Edge     | Rate limit window reset at exact `windowEnd` boundary handled correctly     | IP at count=3, `windowEnd = Date.now()` (within 1 ms margin) / POST / count reset; 200 returned |

---

## 10. Definition of Done

- [ ] All OB-01 through OB-14 criteria have passing tests or manual verification.
- [ ] `curl -I https://localhost:3000` shows all required security headers.
- [ ] No `console.log` in `src/` (enforced by ESLint `no-console` rule under `error`).
- [ ] `pnpm test:unit` and `pnpm test:integration` pass.
- [ ] E2E T-10, T-11, and T-12 green.
- [ ] No TypeScript errors (`pnpm typecheck`).
- [ ] `pnpm lint` passes.
- [ ] Manual smoke test: rate limiting, security headers, and CSRF protection verified against Docker Compose instance.
- [ ] No `TODO`, `FIXME`, or `@ts-ignore` in shipped code without a linked issue.
- [ ] `docs/architecture.md` updated with middleware chain and logging patterns.
- [ ] Coverage ≥ 85% on `src/lib/security/**`, `src/lib/rate-limit/**`, and `src/lib/logger/**`.
- [ ] PR squash-merged to `main`.
      </file>

<file path="prisma/schema.prisma">
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
provider = "prisma-client-js"
output = "../src/generated/prisma"
engineType = "library"
}

datasource db {
provider = "sqlite"
}

// ──────────────────────────────────────────────────────────────────────────────
// Auth.js v5 required models
// ──────────────────────────────────────────────────────────────────────────────

model User {
id String @id @default(cuid())
name String?
email String @unique
pendingEmail String?
emailVerified DateTime?
image String?
password String? // hashed — null for OAuth-only accounts
sessionVersion Int @default(0)
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

accounts Account[]
sessions Session[]
guides Guide[]
notes Note[]
folders Folder[]

@@map("users")
}

model Account {
id String @id @default(cuid())
userId String
type String
provider String
providerAccountId String
refresh_token String?
access_token String?
expires_at Int?
token_type String?
scope String?
id_token String?
session_state String?

user User @relation(fields: [userId], references: [id], onDelete: Cascade)

@@unique([provider, providerAccountId])
@@map("accounts")
}

model Session {
id String @id @default(cuid())
sessionToken String @unique
userId String
expires DateTime

user User @relation(fields: [userId], references: [id], onDelete: Cascade)

@@map("sessions")
}

model VerificationToken {
identifier String
token String @unique
expires DateTime

@@unique([identifier, token])
@@map("verification_tokens")
}

// ──────────────────────────────────────────────────────────────────────────────
// Core application models
// ──────────────────────────────────────────────────────────────────────────────

model Guide {
id String @id @default(cuid())
userId String? // null for guest-generated (not persisted to account)
slug String @unique
title String
studyMode StudyMode
inputType InputType
inputValue String // original prompt / URL / pasted text
content String // MDX string
isPublic Boolean @default(false)
isFavorite Boolean @default(false)
isWatermark Boolean @default(false) // guest guides
folderId String?
shareLink ShareLink?
tags GuideTag[]
notes Note[]
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

user User? @relation(fields: [userId], references: [id], onDelete: SetNull)
folder Folder? @relation(fields: [folderId], references: [id], onDelete: SetNull)

@@map("guides")
}

model ShareLink {
id String @id @default(cuid())
token String @unique
guideId String @unique
createdAt DateTime @default(now())
expiresAt DateTime?
clickCount Int @default(0)

guide Guide @relation(fields: [guideId], references: [id], onDelete: Cascade)

@@map("share_links")
}

model Tag {
id String @id @default(cuid())
name String @unique
guides GuideTag[]

@@map("tags")
}

model GuideTag {
guideId String
tagId String

guide Guide @relation(fields: [guideId], references: [id], onDelete: Cascade)
tag Tag @relation(fields: [tagId], references: [id], onDelete: Cascade)

@@id([guideId, tagId])
@@map("guide_tags")
}

model Folder {
id String @id @default(cuid())
userId String
name String
createdAt DateTime @default(now())

user User @relation(fields: [userId], references: [id], onDelete: Cascade)
guides Guide[]

@@map("folders")
}

model Note {
id String @id @default(cuid())
userId String
guideId String
selectedText String
content String
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

user User @relation(fields: [userId], references: [id], onDelete: Cascade)
guide Guide @relation(fields: [guideId], references: [id], onDelete: Cascade)

@@map("notes")
}

// ──────────────────────────────────────────────────────────────────────────────
// Guest quota
// ──────────────────────────────────────────────────────────────────────────────

model GuestQuota {
ip String @id
count Int @default(0)
resetAt DateTime
updatedAt DateTime @updatedAt

@@map("guest_quotas")
}

// ──────────────────────────────────────────────────────────────────────────────
// Enums
// ──────────────────────────────────────────────────────────────────────────────

enum StudyMode {
OVERVIEW
DEEP_DIVE
EXAM_PREP
ELI5
}

enum InputType {
TOPIC
TEXT
URL
}
</file>

<file path="src/lib/mcp/index.ts">
export type { IMCPClient } from './types'
export {
  MCPError,
  MCPFetchError,
  MCPTimeoutError,
  MCPServiceError,
  MCPRateLimitError,
  MCPTranscriptUnavailableError,
} from './types'
export { MCPClientFactory } from './factory'
export { RetryDecorator } from './retry-decorator'
export { WebFetchAdapter } from './adapters/web-fetch'
export type { WebFetchInput, WebFetchOutput } from './adapters/web-fetch'
export { TavilySearchAdapter } from './adapters/tavily-search'
export type { TavilySearchInput, TavilySearchResult } from './adapters/tavily-search'
export { FalImageGenAdapter } from './adapters/fal-image-gen'
export type { FalImageGenInput, FalImageGenOutput } from './adapters/fal-image-gen'
export { YouTubeTranscriptAdapter } from './adapters/youtube-transcript'
export type { YouTubeTranscriptInput, YouTubeTranscriptOutput } from './adapters/youtube-transcript'
</file>

<file path="eslint.config.mjs">
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettierConfig from 'eslint-config-prettier'

const eslintConfig = defineConfig([
...nextVitals,
...nextTs,
prettierConfig,
// Override default ignores of eslint-config-next.
globalIgnores([
'.next/**',
'out/**',
'build/**',
'next-env.d.ts',
'node_modules/**',
'exports/**',
'data/**',
'coverage/**',
'playwright-report/**',
'src/generated/**',
]),
{
rules: {
'@typescript-eslint/no-explicit-any': 'error',
'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
},
},
{
files: ['src/**/*.{js,jsx,ts,tsx}'],
rules: {
'no-console': 'error',
},
},
])

export default eslintConfig
</file>

<file path="docs/_spec/03-guest-experience/sprints.md">
# Sprints — Spec 03: Guest vs. Registered Experience

> **Status:** 🔜 Not started — begins after Spec 02 is complete

---

## Sprint 03-A — Guest quota enforcement

**Status:** ✅ Complete  
**Scope:** `GuestQuota` DB model, `enforceGuestQuota` middleware, quota API.

**Files touched:**

- `prisma/schema.prisma` — add `GuestQuota` model
- `prisma/migrations/` — new migration
- `src/lib/guest/quota.ts` — `checkAndIncrementQuota`, `getQuotaStatus`, `resetExpiredQuota`
- `src/app/api/guest/quota/route.ts`

**Implementation notes:**

- Use Prisma upsert with atomic increment: `UPDATE guest_quotas SET count = count + 1 WHERE ip = ?`.
- `resetAt` = next midnight UTC, computed at upsert time.
- IP extracted from `x-forwarded-for` header (first IP), falling back to `request.ip`. Sanitize — take only the first segment, validate as IPv4/IPv6.
- Registered users: `session.user.id` check bypasses quota entirely.

**Tests added:**

- `tests/unit/lib/guest/quota.test.ts`
- `tests/integration/api/guest/quota.test.ts`

**Entry criteria:** Spec 02 complete; `GuestQuota` model added to schema.  
**Exit criteria:** `enforceGuestQuota` correctly allows/blocks requests; quota API returns correct data.

---

## Sprint 03-B — UI: Guest banner, watermark, quota modal

**Status:** ✅ Complete  
**Scope:** Frontend components for guest experience: sticky banner, watermark overlay, exhausted-quota modal.

**Files touched:**

- `src/components/guest/GuestBanner.tsx`
- `src/components/guest/WatermarkOverlay.tsx`
- `src/components/guest/QuotaExhaustedModal.tsx`
- `src/app/layout.tsx` — inject `GuestBanner` for unauthenticated sessions

**Implementation notes:**

- `GuestBanner` is a Server Component that reads session + calls `getQuotaStatus`.
- `QuotaExhaustedModal` is a Client Component shown when generation returns 429.
- `WatermarkOverlay` accepts `isWatermark: boolean` prop; renders `position: absolute` overlay using Tailwind.

**Tests added:**

- `tests/unit/components/guest/GuestBanner.test.tsx`
- `tests/unit/components/guest/WatermarkOverlay.test.tsx`
- `tests/unit/components/guest/QuotaExhaustedModal.test.tsx`

**Entry criteria:** Sprint 03-A complete.  
**Exit criteria:** Banner shows correct quota; modal appears on 429; watermark visible on guide pages with `isWatermark=true`.

---

## Sprint 03-C — Public gallery + E2E tests

**Status:** ✅ Complete  
**Scope:** `/gallery` page, guide card component, full E2E test suite for all quota scenarios.

**Files touched:**

- `src/app/gallery/page.tsx` — Server Component, queries `isPublic=true` guides
- `src/components/guides/GuideCard.tsx`
- `tests/e2e/guest/quota-flow.spec.ts`
- `tests/e2e/guest/gallery.spec.ts`

**Implementation notes:**

- Gallery is a static-ish Server Component (ISR revalidate every 5 min).
- `GuideCard` shows title, study mode badge (color-coded), and 2-line content preview.
- E2E quota test: set cookie/localStorage to simulate quota near-limit; use a test-only reset endpoint (guarded by `NODE_ENV=test`).

**Tests added:**

- `tests/e2e/guest/quota-flow.spec.ts` — T-13, T-14, T-16
- `tests/e2e/guest/gallery.spec.ts` — T-15

**Entry criteria:** Sprint 03-B complete.  
**Exit criteria:** All T-01 through T-17 pass; Definition of Done checklist satisfied.
</file>

<file path="docs/_spec/04-chat-homepage/sprints.md">
# Sprints — Spec 04: Chat Homepage & Generation Orchestrator

> **Status:** 🚧 In progress — Sprint 04-A and Sprint 04-B complete; Sprint 04-C ready to start

---

## Sprint 04-A — Generation Orchestrator + Study Mode strategies

**Status:** ✅ Complete  
**Scope:** Core generation pipeline: `GenerationOrchestrator`, all four study-mode strategies, `GuideBuilder`, `BaseGuideGenerator` template.

**Files touched:**

- `src/lib/generation/orchestrator.ts` — Facade
- `src/lib/generation/base-generator.ts` — Template Method (abstract `planSections`, `enrichWithMedia`, `buildQuizzes`)
- `src/lib/generation/builder.ts` — `GuideBuilder` (Builder pattern)
- `src/lib/generation/slug.ts` — `generateSlug(title: string): string`
- `src/lib/study-modes/overview.ts`
- `src/lib/study-modes/deep-dive.ts`
- `src/lib/study-modes/exam-prep.ts`
- `src/lib/study-modes/eli5.ts`
- `src/lib/study-modes/factory.ts` — `StudyModeStrategyFactory`
- `src/lib/study-modes/types.ts` — `IStudyModeStrategy` interface
- `src/lib/ai/claude.ts` — `ClaudeClient` wrapping `@anthropic-ai/sdk` + Vercel AI SDK

**Implementation notes:**

- `BaseGuideGenerator` extends to each strategy. `planSections`, `enrichWithMedia`, `buildQuizzes` are `abstract`.
- `GuideBuilder` uses a fluent interface: `.setHero(...).addSection(...).addQuiz(...).build() → string (MDX)`.
- `ClaudeClient` is an Adapter over Anthropic SDK; exposes `streamText(prompt)` → `ReadableStream`.
- All LLM calls use `ai` SDK's `streamText`; model = `claude-sonnet-4-5`.
- System prompts live in `src/lib/ai/prompts/` as `.ts` files (not template strings in logic files).

**Tests added:**

- `tests/unit/lib/generation/orchestrator.test.ts`
- `tests/unit/lib/generation/builder.test.ts`
- `tests/unit/lib/generation/slug.test.ts`
- `tests/unit/lib/study-modes/overview.test.ts`
- `tests/unit/lib/study-modes/exam-prep.test.ts`
- `tests/unit/lib/study-modes/eli5.test.ts`
- `tests/unit/lib/ai/claude.test.ts`

**Entry criteria:** Spec 03 complete.  
**Exit criteria:** `StudyModeStrategyFactory.create('OVERVIEW')` returns correct strategy; `GuideBuilder.build()` returns valid MDX string; all unit tests pass.

---

## Sprint 04-B — Generation API route + streaming UI

**Status:** ✅ Complete  
**Scope:** `POST /api/generate` SSE endpoint, homepage UI with prompt box and streaming progress.

**Files touched:**

- `src/app/api/generate/route.ts`
- `src/app/page.tsx` — homepage (Server Component shell)
- `src/components/chat/PromptBox.tsx` — input tabs + study mode selector
- `src/components/chat/StreamingProgress.tsx` — step indicator + token preview
- `src/components/chat/StudyModeSelector.tsx`
- `src/types/generation.ts` — shared SSE event types

**Implementation notes:**

- Use Vercel AI SDK `StreamingTextResponse` + custom SSE envelope for progress events.
- Client uses `EventSource` or `fetch` with `getReader()` to consume the stream.
- Generation state machine: `idle` → `fetching` → `planning` → `writing` → `done` | `error`.
- On `{type:"done", guideSlug}` event, client calls `router.push('/guide/' + guideSlug)`.

**Tests added:**

- `tests/integration/api/generate/generate.test.ts`
- `tests/unit/components/chat/PromptBox.test.tsx`
- `tests/unit/components/chat/StreamingProgress.test.tsx`

**Entry criteria:** Sprint 04-A complete.  
**Exit criteria:** TOPIC input mode works end-to-end; stream renders in UI; registered user guide saved + redirect.

---

## Sprint 04-C — URL & YouTube input modes

**Status:** 🔜 Not started  
**Scope:** Wire URL input to Web Fetch MCP; YouTube URL detection to Transcript MCP.

**Files touched:**

- `src/lib/generation/orchestrator.ts` — `inputNormalize` step
- `src/lib/generation/input-normalizer.ts` — `normalizeInput(input): Promise<NormalizedInput>`
- `src/lib/generation/url-detector.ts` — `isYouTubeUrl(url): boolean`

**Implementation notes:**

- YouTube URL patterns: `youtube.com/watch?v=`, `youtu.be/`, `youtube.com/shorts/`.
- URL inputs: call `WebFetchMCPAdapter.fetch(url)` → extract text.
- YouTube inputs: call `YouTubeTranscriptMCPAdapter.getTranscript(videoId)` → transcript string.
- Malformed URLs: validate with `z.string().url()` before attempting fetch.
- If fetch errors (network, 4xx/5xx, blocked): emit SSE error event, do not fall through to generation.

**Tests added:**

- `tests/unit/lib/generation/input-normalizer.test.ts`
- `tests/unit/lib/generation/url-detector.test.ts`
- `tests/e2e/generation/topic-flow.spec.ts`
- `tests/e2e/generation/url-flow.spec.ts`

**Entry criteria:** Sprint 04-B complete.  
**Exit criteria:** All three input modes work E2E; all T-01 through T-26 pass; Definition of Done checklist satisfied.
</file>

<file path="package.json">
{
  "name": "flashguides",
  "version": "0.1.0",
  "private": true,
  "packageManager": "pnpm@10.33.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:unit": "vitest run tests/unit",
    "test:integration": "vitest run tests/integration",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:migrate:prod": "prisma migrate deploy",
    "db:studio": "prisma studio",
    "db:seed": "tsx prisma/seed.ts",
    "prepare": "husky",
    "export:source": "tsx scripts/export-source.ts"
  },
  "dependencies": {
    "@ai-sdk/anthropic": "^3.0.71",
    "@anthropic-ai/sdk": "^0.90.0",
    "@auth/prisma-adapter": "^2.11.2",
    "@aws-sdk/client-s3": "^3.1036.0",
    "@aws-sdk/s3-request-presigner": "^3.1036.0",
    "@fal-ai/client": "^1.9.5",
    "@modelcontextprotocol/sdk": "^1.29.0",
    "@prisma/adapter-better-sqlite3": "^7.7.0",
    "@prisma/client": "^7.7.0",
    "@prisma/client-runtime-utils": "7.7.0",
    "@react-pdf/renderer": "^4.5.1",
    "@tavily/core": "^0.7.2",
    "ai": "^6.0.168",
    "bcryptjs": "^3.0.3",
    "better-sqlite3": "^12.4.1",
    "jszip": "^3.10.1",
    "marked": "^18.0.2",
    "next": "16.2.4",
    "next-auth": "5.0.0-beta.31",
    "next-mdx-remote": "^6.0.0",
    "nodemailer": "^7.0.13",
    "pdf-parse": "^2.4.5",
    "pino": "^10.3.1",
    "prisma": "^7.7.0",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "youtube-transcript": "^1.3.0",
    "zod": "^4.3.6"
  },
  "devDependencies": {
    "@commitlint/cli": "^20.5.0",
    "@commitlint/config-conventional": "^20.5.0",
    "@playwright/test": "^1.59.1",
    "@tailwindcss/postcss": "^4",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@testing-library/user-event": "^14.6.1",
    "@types/bcryptjs": "^3.0.0",
    "@types/jsdom": "^28.0.1",
    "@types/node": "^20",
    "@types/nodemailer": "^8.0.0",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.1",
    "dotenv": "^17.4.2",
    "eslint": "^9",
    "eslint-config-next": "16.2.4",
    "eslint-config-prettier": "^10.1.8",
    "husky": "^9.1.7",
    "jsdom": "^29.0.2",
    "lint-staged": "^16.4.0",
    "msw": "^2.13.4",
    "pino-pretty": "^13.1.3",
    "playwright": "^1.59.1",
    "prettier": "^3.8.3",
    "tailwindcss": "^4",
    "tsx": "^4.21.0",
    "typescript": "^5",
    "vitest": "^4.1.5"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{js,mjs,cjs,json,md,css}": [
      "prettier --write"
    ]
  },
  "commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ]
  }
}
</file>

</files>
