import { beforeEach, describe, expect, it, vi } from 'vitest'

const { mockExecFile, mockGetText, mockDestroy, MockPDFParse, mockExtractTextFromPdf } = vi.hoisted(
  () => ({
    mockExecFile: vi.fn(),
    mockGetText: vi.fn(),
    mockDestroy: vi.fn(),
    mockExtractTextFromPdf: vi.fn(),
    MockPDFParse: class {
      constructor(_params: unknown) {}

      getText = mockGetText

      destroy = mockDestroy
    },
  }),
)

vi.mock('pdf-parse', () => ({
  PDFParse: MockPDFParse,
}))

vi.mock('node:child_process', () => ({
  execFile: mockExecFile,
  default: {
    execFile: mockExecFile,
  },
}))

vi.mock('@/lib/ai/claude', () => ({
  claudeClient: {
    extractTextFromPdf: mockExtractTextFromPdf,
  },
}))

import { ReadableFileError, extractReadableFileText } from '@/lib/generation/file-extractor'

describe('extractReadableFileText', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockExtractTextFromPdf.mockResolvedValue('')
    mockExecFile.mockImplementation(
      (
        _file: string,
        _args: string[],
        _options: { maxBuffer?: number },
        callback: (error: Error | null, stdout: string, stderr: string) => void,
      ) => {
        callback(null, '', '')
        return {} as never
      },
    )
  })

  it('extracts text from pdf files using PDFParse', async () => {
    mockGetText.mockResolvedValue({ text: '  PDF guide content  ' })

    const file = new File([new Uint8Array([37, 80, 68, 70])], 'notes.pdf', {
      type: 'application/pdf',
    })

    await expect(extractReadableFileText(file)).resolves.toBe('PDF guide content')

    expect(mockGetText).toHaveBeenCalled()
    expect(mockDestroy).toHaveBeenCalled()
  })

  it('falls back to printable text recovery when PDFParse fails on a text-bearing pdf', async () => {
    mockGetText.mockRejectedValueOnce(new Error('parser failed'))

    const file = new File(
      [
        '%PDF-1.7\n1 0 obj\n<< /Type /Catalog >>\nendobj\n' +
          '(Exam review packet for cellular respiration with ATP, glycolysis, Krebs cycle, electron transport chain, regulation details, enzyme checkpoints, fermentation comparison, oxidative phosphorylation, mitochondrial membrane gradients, and final assessment preparation with concept checks and terminology review.)',
      ],
      'fallback.pdf',
      { type: 'application/pdf' },
    )

    await expect(extractReadableFileText(file)).resolves.toContain('cellular respiration')
  })

  it('rejects metadata-like fallback text so pdf syntax does not become guide content', async () => {
    mockGetText.mockRejectedValueOnce(new Error('parser failed'))
    mockExtractTextFromPdf.mockResolvedValueOnce('')

    const file = new File(
      [
        '%PDF-1.7\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Count 8 /Kids [3 0 R] >>\nendobj\nstream\nPDF page object stream trailer root xref catalog pages mediaBox filter font object data repeated for parsing metadata only.\nendstream\nstartxref\n',
      ],
      'metadata-only.pdf',
      { type: 'application/pdf' },
    )

    await expect(extractReadableFileText(file)).rejects.toMatchObject<Partial<ReadableFileError>>({
      code: 'UNREADABLE_FILE',
    })
  })

  it('uses Anthropic OCR fallback when the pdf has no text layer but can still be read visually', async () => {
    mockGetText.mockRejectedValueOnce(new Error('parser failed'))
    mockExecFile.mockImplementationOnce(
      (
        _file: string,
        _args: string[],
        _options: { maxBuffer?: number },
        callback: (error: Error | null, stdout: string, stderr: string) => void,
      ) => {
        callback(null, '', '')
        return {} as never
      },
    )
    mockExtractTextFromPdf.mockResolvedValueOnce(
      'Data mining overview\nClassification, clustering, association rules, and predictive modeling.',
    )

    const file = new File([new Uint8Array([37, 80, 68, 70])], '8-data-mining-overview.pdf', {
      type: 'application/pdf',
    })

    await expect(extractReadableFileText(file)).resolves.toContain('Data mining overview')
    expect(mockExtractTextFromPdf).toHaveBeenCalled()
  })

  it('maps document-specific OCR failures back to an unreadable pdf error', async () => {
    mockGetText.mockRejectedValueOnce(new Error('parser failed'))
    mockExecFile.mockImplementationOnce(
      (
        _file: string,
        _args: string[],
        _options: { maxBuffer?: number },
        callback: (error: Error | null, stdout: string, stderr: string) => void,
      ) => {
        callback(null, '', '')
        return {} as never
      },
    )
    mockExtractTextFromPdf.mockRejectedValueOnce(
      new Error('Unsupported PDF document: too many pages to process'),
    )

    const file = new File([new Uint8Array([37, 80, 68, 70])], 'scanned-packet.pdf', {
      type: 'application/pdf',
    })

    await expect(extractReadableFileText(file)).rejects.toMatchObject<Partial<ReadableFileError>>({
      code: 'UNREADABLE_FILE',
      message:
        'We could not OCR that PDF. It may be encrypted, malformed, too large, or otherwise unsupported.',
    })
  })

  it('uses the pdf-parse cli fallback when the in-process parser fails in the route runtime', async () => {
    mockGetText.mockRejectedValueOnce(new Error('Setting up fake worker failed'))
    mockExecFile.mockImplementationOnce(
      (
        _file: string,
        _args: string[],
        _options: { maxBuffer?: number },
        callback: (error: Error | null, stdout: string, stderr: string) => void,
      ) => {
        callback(null, 'CLI extracted lecture text', '')
        return {} as never
      },
    )

    const file = new File([new Uint8Array([37, 80, 68, 70])], 'runtime-problem.pdf', {
      type: 'application/pdf',
    })

    await expect(extractReadableFileText(file)).resolves.toBe('CLI extracted lecture text')
    expect(mockExtractTextFromPdf).not.toHaveBeenCalled()
  })

  it('extracts text from text-like files without PDFParse', async () => {
    const file = new File(['Flash cards\nKey concepts'], 'study-notes.txt', { type: 'text/plain' })

    await expect(extractReadableFileText(file)).resolves.toBe('Flash cards\nKey concepts')

    expect(mockGetText).not.toHaveBeenCalled()
  })

  it('rejects unsupported binary files', async () => {
    const file = new File([new Uint8Array([1, 2, 3])], 'archive.bin', {
      type: 'application/octet-stream',
    })

    await expect(extractReadableFileText(file)).rejects.toMatchObject<Partial<ReadableFileError>>({
      code: 'UNSUPPORTED_FILE_TYPE',
    })
  })
})
