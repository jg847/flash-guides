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
