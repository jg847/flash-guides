function normalizeCandidate(value: string | undefined): string | null {
  if (!value) {
    return null
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return null
  }

  const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`

  try {
    return new URL(normalized).origin
  } catch {
    return null
  }
}

export function getAppUrl(): string {
  return (
    normalizeCandidate(process.env['NEXT_PUBLIC_APP_URL']) ??
    normalizeCandidate(process.env['AUTH_URL']) ??
    normalizeCandidate(process.env['NEXTAUTH_URL']) ??
    normalizeCandidate(process.env['VERCEL_PROJECT_PRODUCTION_URL']) ??
    normalizeCandidate(process.env['VERCEL_URL']) ??
    'http://localhost:3000'
  )
}
