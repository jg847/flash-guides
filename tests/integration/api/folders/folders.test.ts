import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('@/lib/db/repositories/folders', () => ({
  folderRepository: {
    create: vi.fn(),
    listByUser: vi.fn(),
    rename: vi.fn(),
    deleteOwned: vi.fn(),
  },
}))

import { auth } from '@/lib/auth'
import { folderRepository } from '@/lib/db/repositories/folders'
import { GET, POST } from '@/app/api/folders/route'
import { DELETE, PATCH } from '@/app/api/folders/[id]/route'

const mockAuth = auth as ReturnType<typeof vi.fn>
const mockCreate = folderRepository.create as ReturnType<typeof vi.fn>
const mockListByUser = folderRepository.listByUser as ReturnType<typeof vi.fn>
const mockRename = folderRepository.rename as ReturnType<typeof vi.fn>
const mockDeleteOwned = folderRepository.deleteOwned as ReturnType<typeof vi.fn>

const FOLDER = {
  id: 'cmfolder000000000000000001',
  userId: 'user-1',
  name: 'Frontend',
  createdAt: '2026-04-23T00:00:00.000Z',
}

function makeJsonRequest(method: string, url: string, body: unknown) {
  return new Request(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeEach(() => {
  vi.clearAllMocks()
  mockAuth.mockResolvedValue({ user: { id: 'user-1' } })
  mockCreate.mockResolvedValue(FOLDER)
  mockListByUser.mockResolvedValue([FOLDER])
  mockRename.mockResolvedValue({ ...FOLDER, name: 'Core Frontend' })
  mockDeleteOwned.mockResolvedValue({ deleted: true })
})

describe('folders API', () => {
  it('lists folders for the authenticated user', async () => {
    const res = await GET()

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ folders: [FOLDER] })
    expect(mockListByUser).toHaveBeenCalledWith('user-1')
  })

  it('creates a folder', async () => {
    const res = await POST(
      makeJsonRequest('POST', 'http://localhost:3000/api/folders', { name: 'Frontend' }),
    )

    expect(res.status).toBe(201)
    expect(await res.json()).toEqual(FOLDER)
    expect(mockCreate).toHaveBeenCalledWith({ userId: 'user-1', name: 'Frontend' })
  })

  it('renames an owned folder', async () => {
    const res = await PATCH(
      makeJsonRequest('PATCH', 'http://localhost:3000/api/folders/cmfolder000000000000000001', {
        name: 'Core Frontend',
      }),
      { params: Promise.resolve({ id: 'cmfolder000000000000000001' }) },
    )

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ...FOLDER, name: 'Core Frontend' })
    expect(mockRename).toHaveBeenCalledWith({
      id: 'cmfolder000000000000000001',
      userId: 'user-1',
      name: 'Core Frontend',
    })
  })

  it('deletes an owned folder', async () => {
    const res = await DELETE(
      new Request('http://localhost:3000/api/folders/cmfolder000000000000000001', {
        method: 'DELETE',
      }),
      {
        params: Promise.resolve({ id: 'cmfolder000000000000000001' }),
      },
    )

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ deleted: true })
    expect(mockDeleteOwned).toHaveBeenCalledWith('user-1', 'cmfolder000000000000000001')
  })

  it('returns 404 when the folder is not owned by the user', async () => {
    mockRename.mockResolvedValueOnce(null)

    const res = await PATCH(
      makeJsonRequest('PATCH', 'http://localhost:3000/api/folders/cmfolder000000000000000001', {
        name: 'Blocked',
      }),
      { params: Promise.resolve({ id: 'cmfolder000000000000000001' }) },
    )

    expect(res.status).toBe(404)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('FOLDER_NOT_FOUND')
    expect(body.error.message).toBe('Folder not found')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)
  })

  it('returns requestId-aware auth errors when listing folders', async () => {
    mockAuth.mockResolvedValueOnce(null)

    const res = await GET()

    expect(res.status).toBe(401)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string }
    }
    expect(body.error.code).toBe('AUTHENTICATION_REQUIRED')
    expect(body.error.message).toBe('Authentication required')
    expect(body.error.requestId).toBeTruthy()
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)
  })

  it('returns requestId-aware validation errors when creating a folder', async () => {
    const res = await POST(
      makeJsonRequest('POST', 'http://localhost:3000/api/folders', { name: '' }),
    )

    expect(res.status).toBe(422)
    const body = (await res.json()) as {
      error: { code: string; message: string; requestId: string; issues: unknown[] }
    }
    expect(body.error.code).toBe('VALIDATION_ERROR')
    expect(body.error.message).toBe('Validation failed')
    expect(body.error.requestId).toBeTruthy()
    expect(Array.isArray(body.error.issues)).toBe(true)
    expect(res.headers.get('x-request-id')).toBe(body.error.requestId)
  })
})
