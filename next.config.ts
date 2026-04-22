import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  // Security headers applied in middleware
  poweredByHeader: false,
}

export default nextConfig
