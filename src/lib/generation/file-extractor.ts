import { execFile } from 'node:child_process'
import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { claudeClient } from '@/lib/ai/claude'

export class ReadableFileError extends Error {
  code: 'UNSUPPORTED_FILE_TYPE' | 'UNREADABLE_FILE'

  constructor(code: 'UNSUPPORTED_FILE_TYPE' | 'UNREADABLE_FILE', message: string) {
    super(message)
    this.name = 'ReadableFileError'
    this.code = code
  }
}

const TEXTUAL_MIME_TYPES = new Set([
  'application/json',
  'application/ld+json',
  'application/rtf',
  'application/sql',
  'application/xml',
  'application/x-httpd-php',
  'application/x-javascript',
  'application/x-sh',
  'application/x-yaml',
])

const TEXTUAL_EXTENSIONS = new Set([
  'csv',
  'html',
  'java',
  'js',
  'json',
  'log',
  'md',
  'pdf',
  'py',
  'rb',
  'rtf',
  'sql',
  'svg',
  'tex',
  'ts',
  'tsx',
  'txt',
  'xml',
  'yaml',
  'yml',
])

const MAX_EXTRACTED_CHARS = 120000
const MIN_FALLBACK_TEXT_LENGTH = 120
const MIN_FALLBACK_WORD_COUNT = 24
const MIN_FALLBACK_UNIQUE_WORDS = 14
const PDF_OCR_DOCUMENT_ERROR_PATTERN =
  /(pdf|document|page|pages|encrypted|password|malformed|corrupt|unsupported|invalid|too large|too many)/i
const PDF_NOISE_WORDS = new Set([
  'acroform',
  'catalog',
  'endobj',
  'filter',
  'font',
  'mediabox',
  'obj',
  'page',
  'pages',
  'pdf',
  'root',
  'startxref',
  'stream',
  'trailer',
  'type',
  'xref',
])

type PdfParseInstance = {
  getText(): Promise<{ text: string }>
  destroy(): Promise<void> | void
}

async function createPdfParser(buffer: Buffer): Promise<PdfParseInstance> {
  const { PDFParse } = await import('pdf-parse')
  return new PDFParse({ data: buffer }) as PdfParseInstance
}

async function extractPdfTextWithCli(buffer: Buffer, fileName: string): Promise<string> {
  const tempDir = await mkdtemp(path.join(tmpdir(), 'flashguides-pdf-'))
  const tempPdfPath = path.join(tempDir, fileName || 'upload.pdf')

  try {
    await writeFile(tempPdfPath, buffer)

    const pdfParseCliPath = path.join(
      process.cwd(),
      'node_modules',
      '.bin',
      process.platform === 'win32' ? 'pdf-parse.cmd' : 'pdf-parse',
    )
    const stdout = await new Promise<string>((resolve, reject) => {
      execFile(
        pdfParseCliPath,
        ['text', tempPdfPath, '--large'],
        { maxBuffer: 16 * 1024 * 1024 },
        (error, commandStdout) => {
          if (error) {
            reject(error)
            return
          }

          resolve(commandStdout)
        },
      )
    })

    return truncateText(stdout)
  } finally {
    await rm(tempDir, { recursive: true, force: true }).catch(() => {
      // ignore temp cleanup failures
    })
  }
}

function truncateText(text: string): string {
  return text
    .replace(/\u0000/g, '')
    .trim()
    .slice(0, MAX_EXTRACTED_CHARS)
}

function getExtension(name: string): string {
  const ext = name.split('.').pop()
  return ext ? ext.toLowerCase() : ''
}

function extractFallbackPdfText(buffer: Buffer): string {
  const decoded = new TextDecoder('latin1').decode(buffer)
  const matches =
    decoded.match(/\((?:\\.|[^()\\])+\)|[A-Za-z0-9][A-Za-z0-9 ,.;:'"!?()%+\-\/]{24,}/g) ?? []

  const cleaned = matches
    .map((segment) =>
      segment
        .replace(/^\(|\)$/g, '')
        .replace(/\\([()\\])/g, '$1')
        .replace(/\\r|\\n|\\t/g, ' ')
        .replace(/\s+/g, ' ')
        .trim(),
    )
    .filter(
      (segment) =>
        segment.length >= 24 &&
        /[A-Za-z]{4}/.test(segment) &&
        !segment.startsWith('%PDF') &&
        !segment.includes(' endobj') &&
        !segment.includes(' stream') &&
        !segment.includes(' obj') &&
        !segment.includes('xref') &&
        !segment.includes('/Type /') &&
        !segment.includes('/Filter /'),
    )

  return truncateText(Array.from(new Set(cleaned)).join('\n'))
}

function isHighConfidenceFallbackText(text: string): boolean {
  const words = (text.toLowerCase().match(/[a-z]{3,}/g) ?? []).filter(Boolean)
  const uniqueWords = new Set(words)
  const noiseCount = words.filter((word) => PDF_NOISE_WORDS.has(word)).length

  if (text.length < MIN_FALLBACK_TEXT_LENGTH) {
    return false
  }

  if (words.length < MIN_FALLBACK_WORD_COUNT || uniqueWords.size < MIN_FALLBACK_UNIQUE_WORDS) {
    return false
  }

  if (noiseCount > Math.max(2, Math.floor(words.length * 0.06))) {
    return false
  }

  return true
}

function isTextLikeFile(file: File): boolean {
  if (file.type.startsWith('text/')) {
    return true
  }

  const extension = getExtension(file.name)
  return TEXTUAL_MIME_TYPES.has(file.type) || TEXTUAL_EXTENSIONS.has(extension)
}

function getReadableOcrPdfError(error: unknown): ReadableFileError | null {
  const status =
    typeof error === 'object' && error !== null && 'status' in error
      ? (error as { status?: unknown }).status
      : undefined
  const message = error instanceof Error ? error.message : ''

  if (status === 400 || status === 413 || status === 422) {
    return new ReadableFileError(
      'UNREADABLE_FILE',
      'We could not OCR that PDF. It may be encrypted, malformed, too large, or otherwise unsupported.',
    )
  }

  if (message && PDF_OCR_DOCUMENT_ERROR_PATTERN.test(message)) {
    return new ReadableFileError(
      'UNREADABLE_FILE',
      'We could not OCR that PDF. It may be encrypted, malformed, too large, or otherwise unsupported.',
    )
  }

  return null
}

export async function extractReadableFileText(file: File): Promise<string> {
  const extension = getExtension(file.name)

  if (file.type === 'application/pdf' || extension === 'pdf') {
    let parser: PdfParseInstance | null = null
    const buffer = Buffer.from(await file.arrayBuffer())

    try {
      parser = await createPdfParser(buffer)
      const data = await parser.getText()
      const text = truncateText(data.text)

      if (!text) {
        throw new ReadableFileError('UNREADABLE_FILE', 'Uploaded PDF did not contain readable text')
      }

      return text
    } catch (error) {
      if (error instanceof ReadableFileError) {
        throw error
      }

      const cliText = await extractPdfTextWithCli(buffer, file.name).catch(() => '')
      if (cliText) {
        return cliText
      }

      const fallbackText = extractFallbackPdfText(buffer)
      if (isHighConfidenceFallbackText(fallbackText)) {
        return fallbackText
      }

      try {
        const ocrText = truncateText(await claudeClient.extractTextFromPdf(buffer, file.name))
        if (ocrText) {
          return ocrText
        }
      } catch (ocrError) {
        const readableOcrError = getReadableOcrPdfError(ocrError)
        if (readableOcrError) {
          throw readableOcrError
        }

        throw ocrError
      }

      throw new ReadableFileError(
        'UNREADABLE_FILE',
        'We could not read text from that PDF. Try another PDF or upload a text-based export instead.',
      )
    } finally {
      if (parser) {
        await Promise.resolve(parser.destroy()).catch(() => {
          // ignore cleanup failures
        })
      }
    }
  }

  if (isTextLikeFile(file)) {
    const text = truncateText(await file.text())

    if (!text) {
      throw new ReadableFileError('UNREADABLE_FILE', 'Uploaded file did not contain readable text')
    }

    return text
  }

  throw new ReadableFileError(
    'UNSUPPORTED_FILE_TYPE',
    'Unsupported file type. Upload a PDF or a readable text-based file.',
  )
}
