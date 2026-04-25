import { NextResponse } from 'next/server'
import { applySecurityHeaders } from './headers'

export function forbiddenCsrfResponse() {
  return applySecurityHeaders(NextResponse.json({ error: 'Forbidden' }, { status: 403 }))
}
