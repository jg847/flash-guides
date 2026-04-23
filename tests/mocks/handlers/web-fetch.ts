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
