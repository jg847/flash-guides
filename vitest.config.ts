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
      '@': resolve(__dirname, './src'),
      // next-auth v5 internally imports 'next/server'; alias it to the resolved file
      // so pnpm's isolated node_modules doesn't break module resolution in Vitest
      'next/server': resolve(__dirname, 'node_modules/next/dist/server/web/exports/index.js'),
    },
  },
})
