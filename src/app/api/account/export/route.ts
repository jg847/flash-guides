import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getSessionUserId } from '@/lib/auth/session'
import { createApiErrorResponse, handleApiError } from '@/lib/errors/handler'
import { generateUserDataExport } from '@/lib/export/data-exporter'
import { uploadExportArchive } from '@/lib/storage/minio'

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

    try {
      const archive = await generateUserDataExport(sessionUserId)
      const uploaded = await uploadExportArchive(archive, sessionUserId)

      return NextResponse.json(
        {
          downloadUrl: uploaded.downloadUrl,
          expiresAt: uploaded.expiresAt,
        },
        { status: 202 },
      )
    } catch {
      return createApiErrorResponse(req, {
        status: 500,
        code: 'ACCOUNT_EXPORT_FAILED',
        message: 'Unable to export account data',
      })
    }
  } catch (error) {
    return handleApiError(error, req)
  }
}
