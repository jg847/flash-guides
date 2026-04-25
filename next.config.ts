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
