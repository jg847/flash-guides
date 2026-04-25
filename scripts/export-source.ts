import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { parseArgs } from 'node:util'
import { collectFiles } from '@/lib/cli/collect-files'
import { estimateTokens } from '@/lib/cli/estimate-tokens'
import { formatSection, type ExportFormat } from '@/lib/cli/format-section'

interface CliOptions {
  noTests: boolean
  onlyTests: boolean
  format: ExportFormat
  include?: string
  exclude?: string
  output?: string
  stdout: boolean
  help: boolean
}

const HELP_TEXT = `Usage: pnpm export:source [options]

Options:
  --no-tests        Exclude test files
  --only-tests      Export only test files
  --format          Output format: md (default) or txt
  --include         Additional include glob filter
  --exclude         Additional exclude glob filter
  --output          Output file path
  --stdout          Write export to stdout
  --help            Print this help text
`

process.stdout.on('error', (error: NodeJS.ErrnoException) => {
  if (error.code === 'EPIPE') {
    process.exit(0)
  }

  throw error
})

function parseCliOptions(argv: string[]): CliOptions {
  const { values } = parseArgs({
    args: argv,
    allowPositionals: false,
    options: {
      'no-tests': { type: 'boolean', default: false },
      'only-tests': { type: 'boolean', default: false },
      format: { type: 'string', default: 'md' },
      include: { type: 'string' },
      exclude: { type: 'string' },
      output: { type: 'string' },
      stdout: { type: 'boolean', default: false },
      help: { type: 'boolean', default: false },
    },
  })

  return {
    noTests: values['no-tests'],
    onlyTests: values['only-tests'],
    format: values.format === 'txt' ? 'txt' : 'md',
    include: values.include,
    exclude: values.exclude,
    output: values.output,
    stdout: values.stdout,
    help: values.help,
  }
}

function buildSummary(fileCount: number, tokenEstimate: number): string {
  return `<!-- Files: ${fileCount}; Estimated tokens: ${tokenEstimate} -->`
}

function buildToc(paths: string[], format: ExportFormat): string {
  if (paths.length === 0) {
    return format === 'md'
      ? '## Table of contents\n\n_No files matched._\n'
      : 'Table of contents\n\n(no files matched)\n'
  }

  if (format === 'txt') {
    return `Table of contents\n${paths.map((filePath) => `- ${filePath}`).join('\n')}\n`
  }

  return `## Table of contents\n${paths.map((filePath) => `- ${filePath}`).join('\n')}\n`
}

export async function buildExportDocument(
  options: CliOptions,
  cwd = process.cwd(),
): Promise<string> {
  const files = await collectFiles({
    cwd,
    include: options.include,
    exclude: options.exclude,
    noTests: options.noTests,
    onlyTests: options.onlyTests,
  })

  const sections: string[] = []
  for (const filePath of files) {
    const content = await readFile(path.join(cwd, filePath), 'utf8')
    sections.push(formatSection(filePath, content, options.format))
  }

  const combinedSections = sections.join('\n')
  const tokenEstimate = estimateTokens(combinedSections)

  return (
    [buildSummary(files.length, tokenEstimate), buildToc(files, options.format), combinedSections]
      .filter(Boolean)
      .join('\n\n')
      .trimEnd() + '\n'
  )
}

async function writeOutput(
  output: string,
  options: CliOptions,
  cwd = process.cwd(),
): Promise<void> {
  if (options.stdout) {
    process.stdout.write(output)
    return
  }

  const destination = path.resolve(cwd, options.output ?? 'export.md')
  await mkdir(path.dirname(destination), { recursive: true })
  await writeFile(destination, output, 'utf8')
}

export async function main(argv = process.argv.slice(2)): Promise<number> {
  const options = parseCliOptions(argv)

  if (options.help) {
    process.stdout.write(HELP_TEXT)
    return 0
  }

  if (options.noTests && options.onlyTests) {
    process.stderr.write(
      'Warning: --no-tests and --only-tests cancel each other out; exporting an empty set.\n',
    )
  }

  const output = await buildExportDocument(options)
  await writeOutput(output, options)
  return 0
}

main()
  .then((exitCode) => {
    process.exitCode = exitCode
  })
  .catch((error) => {
    const message = error instanceof Error ? error.message : String(error)
    process.stderr.write(`${message}\n`)
    process.exitCode = 1
  })
