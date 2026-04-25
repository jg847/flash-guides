import path from 'node:path'

export type ExportFormat = 'md' | 'txt'

const LANGUAGE_BY_EXTENSION: Record<string, string> = {
  '.ts': 'ts',
  '.tsx': 'tsx',
  '.js': 'js',
  '.jsx': 'jsx',
  '.mjs': 'js',
  '.cjs': 'js',
  '.json': 'json',
  '.css': 'css',
  '.md': 'md',
  '.sh': 'bash',
  '.yml': 'yaml',
  '.yaml': 'yaml',
}

function normalizePath(filePath: string): string {
  return filePath.split(path.sep).join('/')
}

function ensureTrailingNewline(content: string): string {
  return content.endsWith('\n') ? content : `${content}\n`
}

function detectLanguage(filePath: string): string {
  return LANGUAGE_BY_EXTENSION[path.extname(filePath).toLowerCase()] ?? 'text'
}

export function formatSection(filePath: string, content: string, format: ExportFormat): string {
  const normalized = normalizePath(filePath)
  const header = `--- ${normalized} ---`
  const body = ensureTrailingNewline(content)

  if (format === 'txt') {
    return `${header}\n${body}`
  }

  const language = detectLanguage(normalized)
  return `${header}\n\`\`\`${language}\n${body}\`\`\`\n`
}
