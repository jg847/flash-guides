import { describe, expect, it } from 'vitest'

import {
  applySectionEdit,
  getSectionBodyMarkdown,
  GuideSectionEditError,
} from '@/lib/guides/section-edits'

const GUIDE_MARKDOWN = `# Study Guide

Intro paragraph.

## Components

Components are reusable.

### Nested detail

Keep this with the section.

## Hooks

Hooks reuse logic.
`

describe('section-edits', () => {
  it('appends a new section at the end', () => {
    const updated = applySectionEdit(GUIDE_MARKDOWN, {
      op: 'append_section',
      heading: 'Lifecycle',
      body_markdown: 'Lifecycle methods track mount and update work.',
    })

    expect(updated).toContain('## Lifecycle')
    expect(updated.trim().endsWith('Lifecycle methods track mount and update work.')).toBe(true)
  })

  it('replaces a level-two section body and preserves nested content boundaries', () => {
    const updated = applySectionEdit(GUIDE_MARKDOWN, {
      op: 'replace_section',
      heading: 'Components',
      body_markdown: 'Updated component notes.',
    })

    expect(updated).toContain('## Components')
    expect(updated).toContain('Updated component notes.')
    expect(updated).not.toContain('### Nested detail')
    expect(updated).toContain('## Hooks')
  })

  it('inserts a section after another section', () => {
    const updated = applySectionEdit(GUIDE_MARKDOWN, {
      op: 'insert_section_after',
      heading: 'State',
      body_markdown: 'State tracks local values.',
      after_heading: 'Components',
    })

    expect(updated.indexOf('## State')).toBeGreaterThan(updated.indexOf('## Components'))
    expect(updated.indexOf('## Hooks')).toBeGreaterThan(updated.indexOf('## State'))
  })

  it('removes a section by heading', () => {
    const updated = applySectionEdit(GUIDE_MARKDOWN, {
      op: 'remove_section',
      heading: 'Hooks',
    })

    expect(updated).not.toContain('## Hooks')
  })

  it('returns the current body markdown for a section', () => {
    expect(getSectionBodyMarkdown(GUIDE_MARKDOWN, 'Components')).toContain(
      'Components are reusable.',
    )
  })

  it('throws a clear error when an after heading is missing', () => {
    expect(() =>
      applySectionEdit(GUIDE_MARKDOWN, {
        op: 'insert_section_after',
        heading: 'State',
        body_markdown: 'State tracks local values.',
        after_heading: 'Missing heading',
      }),
    ).toThrowError(GuideSectionEditError)
  })
})
