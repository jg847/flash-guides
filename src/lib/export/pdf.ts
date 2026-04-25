import React from 'react'
import { Document, Page, StyleSheet, Text, View, renderToBuffer } from '@react-pdf/renderer'
import { parseGuideContent } from '@/lib/guides/content'
import type { GuideExportRecord } from './guide-types'

function stripMarkdown(value: string): string {
  return value
    .replace(/!\[[^\]]*\]\(([^)]+)\)/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)')
    .replace(/[`*_>#-]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 11,
    color: '#1f2937',
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    fontFamily: 'Helvetica-Bold',
  },
  meta: {
    fontSize: 10,
    color: '#475569',
    marginBottom: 18,
  },
  section: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 14,
    marginBottom: 6,
    fontFamily: 'Helvetica-Bold',
  },
  body: {
    lineHeight: 1.5,
  },
})

export async function buildPdfExport(guide: GuideExportRecord): Promise<Buffer> {
  const parsed = parseGuideContent(guide.content)

  return renderToBuffer(
    React.createElement(
      Document,
      null,
      React.createElement(
        Page,
        { size: 'LETTER', style: styles.page },
        React.createElement(Text, { style: styles.title }, guide.title),
        React.createElement(
          Text,
          { style: styles.meta },
          `${guide.studyMode} · ${guide.inputType} · ${guide.inputValue}`,
        ),
        parsed.intro
          ? React.createElement(
              View,
              { style: styles.section },
              React.createElement(Text, { style: styles.body }, stripMarkdown(parsed.intro)),
            )
          : null,
        ...parsed.sections.map((section) =>
          React.createElement(
            View,
            { key: section.id, style: styles.section },
            React.createElement(Text, { style: styles.heading }, section.heading),
            React.createElement(Text, { style: styles.body }, stripMarkdown(section.body)),
          ),
        ),
      ),
    ),
  )
}
