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
