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
