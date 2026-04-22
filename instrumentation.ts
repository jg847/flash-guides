export async function register() {
  if (process.env['NEXT_RUNTIME'] === 'nodejs') {
    const { bootDatabase } = await import('@/lib/db/boot')
    await bootDatabase()
  }
}
