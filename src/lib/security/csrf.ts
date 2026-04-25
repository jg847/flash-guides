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
