import { notFound } from 'next/navigation'

export default function PlaywrightErrorPage() {
  if (process.env['PLAYWRIGHT_TEST'] !== '1') {
    notFound()
  }

  throw new Error('Playwright global error boundary test')
}
