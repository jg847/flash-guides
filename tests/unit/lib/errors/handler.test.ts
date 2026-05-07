import { describe, expect, it } from 'vitest'

import { ApiRouteError, createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

describe('createApiErrorResponse', () => {
  it('returns a structured error payload with requestId', async () => {
    const response = createApiErrorResponse('123e4567-e89b-42d3-a456-426614174000', {
      status: 422,
      code: 'VALIDATION_ERROR',
      message: 'Validation failed',
      details: { fields: { email: ['Required'] } },
    })

    expect(response.status).toBe(422)
    expect(response.headers.get('x-request-id')).toBe('123e4567-e89b-42d3-a456-426614174000')
    await expect(response.json()).resolves.toEqual({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        requestId: '123e4567-e89b-42d3-a456-426614174000',
        fields: { email: ['Required'] },
      },
    })
  })
})

describe('handleApiError', () => {
  it('serializes ApiRouteError instances', async () => {
    const response = handleApiError(
      new ApiRouteError({
        status: 404,
        code: 'GUIDE_NOT_FOUND',
        message: 'Guide not found',
      }),
      '123e4567-e89b-42d3-a456-426614174000',
    )

    expect(response.status).toBe(404)
    await expect(response.json()).resolves.toEqual({
      error: {
        code: 'GUIDE_NOT_FOUND',
        message: 'Guide not found',
        requestId: '123e4567-e89b-42d3-a456-426614174000',
      },
    })
  })

  it('serializes unexpected errors with request context', async () => {
    const response = handleApiError(new Error('boom'), '123e4567-e89b-42d3-a456-426614174000')

    expect(response.status).toBe(500)
    await expect(response.json()).resolves.toEqual({
      error: {
        code: 'INTERNAL_ERROR',
        message: 'boom',
        requestId: '123e4567-e89b-42d3-a456-426614174000',
      },
    })
  })
})
