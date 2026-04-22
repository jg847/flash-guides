import { describe, it, expect } from 'vitest'
import { hashPassword, verifyPassword } from '@/lib/auth/password'

describe('hashPassword', () => {
  it('returns a bcrypt hash starting with $2b$', async () => {
    const hash = await hashPassword('MyP4ssword!')
    expect(hash).toMatch(/^\$2[ab]\$/)
  })

  it('produces different hashes for the same input (salt randomness)', async () => {
    const hash1 = await hashPassword('MyP4ssword!')
    const hash2 = await hashPassword('MyP4ssword!')
    expect(hash1).not.toBe(hash2)
  })
})

describe('verifyPassword', () => {
  it('returns true for the correct password', async () => {
    const hash = await hashPassword('CorrectHorse99')
    expect(await verifyPassword('CorrectHorse99', hash)).toBe(true)
  })

  it('returns false for a wrong password', async () => {
    const hash = await hashPassword('CorrectHorse99')
    expect(await verifyPassword('WrongPassword1', hash)).toBe(false)
  })

  it('returns false for an empty string', async () => {
    const hash = await hashPassword('CorrectHorse99')
    expect(await verifyPassword('', hash)).toBe(false)
  })
})
