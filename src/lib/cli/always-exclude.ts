import path from 'node:path'

const ALWAYS_EXCLUDED_LOCKFILES = new Set(['pnpm-lock.yaml', 'package-lock.json', 'yarn.lock'])
const ALWAYS_EXCLUDED_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.ico',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
  '.otf',
  '.pdf',
  '.zip',
  '.gz',
  '.key',
  '.pem',
  '.p12',
])
const ALWAYS_EXCLUDED_SEGMENTS = new Set(['node_modules', '.next', 'dist'])
const SECRET_PATTERNS = [
  /ANTHROPIC_API_KEY\s*=/i,
  /FAL_API_KEY\s*=/i,
  /TAVILY_API_KEY\s*=/i,
  /\bANTHROPIC_API_KEY\b/i,
  /\bFAL_API_KEY\b/i,
  /\bTAVILY_API_KEY\b/i,
  /\b[A-Z0-9_]+\s*=\s*sk-[A-Za-z0-9]/,
]

function normalizePath(filePath: string): string {
  return filePath.split(path.sep).join('/').replace(/^\.\//, '')
}

export function containsSecretPattern(content: string): boolean {
  return SECRET_PATTERNS.some((pattern) => pattern.test(content))
}

export function isAlwaysExcludedPath(filePath: string): boolean {
  const normalized = normalizePath(filePath)
  const basename = path.posix.basename(normalized)
  const extension = path.posix.extname(normalized).toLowerCase()
  const segments = normalized.split('/')

  if (basename === '.env' || basename.startsWith('.env.')) {
    return true
  }

  if (basename.startsWith('.')) {
    return true
  }

  if (basename === 'prisma.config.ts' || ALWAYS_EXCLUDED_LOCKFILES.has(basename)) {
    return true
  }

  if (ALWAYS_EXCLUDED_EXTENSIONS.has(extension)) {
    return true
  }

  return segments.some((segment) => ALWAYS_EXCLUDED_SEGMENTS.has(segment))
}

export function applyAlwaysExclude(paths: string[]): string[] {
  return paths.map(normalizePath).filter((filePath) => !isAlwaysExcludedPath(filePath))
}
