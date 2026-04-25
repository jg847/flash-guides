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
