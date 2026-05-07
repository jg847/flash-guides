import { beforeEach, describe, expect, it, vi } from 'vitest'

const findUnique = vi.fn()
const count = vi.fn()

vi.mock('@/generated/prisma', () => {
  class PrismaClient {
    user = {
      findUnique,
    }

    guide = {
      count,
    }

    constructor(_options?: unknown) {}
  }

  return { PrismaClient }
})

vi.mock('@prisma/adapter-libsql', () => ({
  PrismaLibSql: class PrismaLibSql {},
}))

describe('prisma deferred client', () => {
  beforeEach(() => {
    vi.resetModules()
    findUnique.mockReset().mockResolvedValue({ id: 'user-1' })
    count.mockReset().mockResolvedValue(7)

    process.env['DATABASE_URL'] = 'https://example-db.invalid'
    process.env['DATABASE_AUTH_TOKEN'] = 'token'

    Reflect.deleteProperty(globalThis as object, 'prisma')
    Reflect.deleteProperty(globalThis as object, 'prismaAdapter')
  })

  it('supports nested delegate method access', async () => {
    const { prisma } = await import('@/lib/db/client')

    await expect(prisma.user.findUnique({ where: { id: 'user-1' } })).resolves.toEqual({
      id: 'user-1',
    })
    await expect(prisma.guide.count()).resolves.toBe(7)

    expect(findUnique).toHaveBeenCalledWith({ where: { id: 'user-1' } })
    expect(count).toHaveBeenCalledWith()
  })
})
