import { describe, expect, it } from 'vitest'
import { getLogger, withRequestLogger } from '@/lib/logger'

describe('logger request context', () => {
  it('binds requestId to the scoped logger', () => {
    const requestId = '123e4567-e89b-42d3-a456-426614174000'

    const scopedRequestId = withRequestLogger(requestId, () => getLogger().bindings().requestId)

    expect(scopedRequestId).toBe(requestId)
  })

  it('falls back to the base logger outside a request context', () => {
    expect(getLogger().bindings().requestId).toBeUndefined()
  })
})
