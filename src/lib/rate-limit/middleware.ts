import { extractIp } from '@/lib/guest/quota'
import { createApiErrorResponse } from '@/lib/errors/handler'
import { checkGuestGenerationRateLimit } from './index'

export async function enforceGuestGenerationRateLimit(request: Request): Promise<Response | null> {
  const rateLimit = await checkGuestGenerationRateLimit(extractIp(request))

  if (rateLimit.allowed) {
    return null
  }

  return createApiErrorResponse(request, {
    status: 429,
    code: 'RATE_LIMIT_EXCEEDED',
    message: "You've created 3 guides today. Sign up for unlimited access!",
    details: {
      retryAfter: rateLimit.retryAfter,
      resetsAt: rateLimit.resetsAt.toISOString(),
      signupUrl: '/register',
    },
    headers: {
      'Retry-After': String(rateLimit.retryAfter),
    },
  })
}
