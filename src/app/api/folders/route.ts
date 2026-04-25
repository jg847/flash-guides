import { NextResponse } from 'next/server'
import { z } from 'zod'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { folderRepository } from '@/lib/db/repositories/folders'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'

const createFolderSchema = z.object({
  name: z.string().trim().min(1).max(100),
})

export async function GET() {
  const req = new Request('http://localhost/api/folders')

  try {
    const session = await auth()
    const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    const folders = await folderRepository.listByUser(sessionUserId)
    return NextResponse.json({ folders })
  } catch (error) {
    return handleApiError(error, req)
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    const sessionUserId = await getSessionUserId(session)

    if (!sessionUserId) {
      return createApiErrorResponse(req, {
        status: 401,
        code: 'AUTHENTICATION_REQUIRED',
        message: 'Authentication required',
      })
    }

    let body: unknown
    try {
      body = await req.json()
    } catch {
      return createApiErrorResponse(req, {
        status: 400,
        code: 'INVALID_JSON',
        message: 'Invalid JSON',
      })
    }

    const parsed = createFolderSchema.safeParse(body)
    if (!parsed.success) {
      return createApiErrorResponse(req, {
        status: 422,
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: { issues: parsed.error.issues },
      })
    }

    const folder = await folderRepository.create({
      userId: sessionUserId,
      name: parsed.data.name,
    })

    return NextResponse.json(folder, { status: 201 })
  } catch (error) {
    return handleApiError(error, req)
  }
}
