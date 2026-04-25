import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { applyAlwaysExclude, containsSecretPattern } from './always-exclude'

export interface CollectFilesOptions {
  cwd: string
  include?: string
  exclude?: string
  noTests?: boolean
  onlyTests?: boolean
}

const DEFAULT_ROOTS = ['src', 'scripts'] as const
const TEST_ROOT = 'tests'
const TEST_PATTERNS = ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx', 'tests/**']

function normalizePath(filePath: string): string {
  return filePath.split(path.sep).join('/')
}

function escapeRegex(value: string): string {
  return value.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
}

function globToRegExp(pattern: string): RegExp {
  const normalized = normalizePath(pattern)
  let result = '^'

  for (let index = 0; index < normalized.length; index += 1) {
    const char = normalized[index]
    if (!char) {
      continue
    }

    if (char === '*') {
      const next = normalized[index + 1]
      const afterNext = normalized[index + 2]

      if (next === '*') {
        if (afterNext === '/') {
          result += '(?:.*/)?'
          index += 2
        } else {
          result += '.*'
          index += 1
        }
      } else {
        result += '[^/]*'
      }

      continue
    }

    if (char === '?') {
      result += '[^/]'
      continue
    }

    result += escapeRegex(char)
  }

  result += '$'
  return new RegExp(result)
}

function matchesAny(filePath: string, patterns: string[]): boolean {
  return patterns.some((pattern) => globToRegExp(pattern).test(filePath))
}

function isTestFile(filePath: string): boolean {
  return matchesAny(filePath, TEST_PATTERNS)
}

async function walkDirectory(root: string, baseDir: string): Promise<string[]> {
  const entries = await readdir(root, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(root, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await walkDirectory(fullPath, baseDir)))
      continue
    }

    if (!entry.isFile()) {
      continue
    }

    files.push(normalizePath(path.relative(baseDir, fullPath)))
  }

  return files
}

export async function collectFiles(options: CollectFilesOptions): Promise<string[]> {
  if (options.noTests && options.onlyTests) {
    return []
  }

  const roots = new Set<string>(DEFAULT_ROOTS)
  if (options.onlyTests) {
    roots.add(TEST_ROOT)
  }

  const discovered: string[] = []
  for (const root of roots) {
    const absoluteRoot = path.join(options.cwd, root)
    try {
      discovered.push(...(await walkDirectory(absoluteRoot, options.cwd)))
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error
      }
    }
  }

  let candidates = applyAlwaysExclude(discovered)

  if (options.onlyTests) {
    candidates = candidates.filter((filePath) => isTestFile(filePath))
  } else if (options.noTests) {
    candidates = candidates.filter((filePath) => !isTestFile(filePath))
  }

  if (options.include) {
    const includePattern = options.include
    candidates = candidates.filter((filePath) => matchesAny(filePath, [includePattern]))
  }

  if (options.exclude) {
    const excludePattern = options.exclude
    candidates = candidates.filter((filePath) => !matchesAny(filePath, [excludePattern]))
  }

  const safeFiles: string[] = []
  for (const filePath of candidates) {
    const content = await readFile(path.join(options.cwd, filePath), 'utf8')
    if (!containsSecretPattern(content)) {
      safeFiles.push(filePath)
    }
  }

  return safeFiles.sort((left, right) => left.localeCompare(right))
}
