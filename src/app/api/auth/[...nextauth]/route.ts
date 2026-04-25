import type { NextRequest } from 'next/server'
import { handlers } from '@/lib/auth'
import { validateOrigin } from '@/lib/security/csrf'
import { forbiddenCsrfResponse } from '@/lib/security/response'

export const GET = handlers.GET

export async function POST(request: NextRequest) {
  if (!validateOrigin(request)) {
    return forbiddenCsrfResponse()
  }

  return handlers.POST(request)
}
