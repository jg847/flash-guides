import { describe, expect, it } from 'vitest'

import { parseGuideContent, sanitizeGuideContentForMdx } from '@/lib/guides/content'

describe('sanitizeGuideContentForMdx', () => {
  it('escapes numeric comparison operators that would be parsed as JSX', () => {
    const content = '| Venus | 96% CO2 | <0.001% O2 | >92 atm |'

    expect(sanitizeGuideContentForMdx(content)).toBe(
      '| Venus | 96% CO2 | &lt;0.001% O2 | &gt;92 atm |',
    )
  })

  it('does not escape MDX component tags', () => {
    const content =
      '<Quiz question={"Example"} options={["A", "B"]} correct={0} explanation={"Because."} />'

    expect(sanitizeGuideContentForMdx(content)).toBe(content)
  })
})

describe('parseGuideContent', () => {
  it('sanitizes section bodies before rendering', () => {
    const parsed = parseGuideContent(`# Example Guide

## Atmosphere Table

| Planet | Oxygen |
| --- | --- |
| Venus | <0.001% O2 |
| Earth | >20% O2 |`)

    expect(parsed.sections[0]?.body).toContain('&lt;0.001% O2')
    expect(parsed.sections[0]?.body).toContain('&gt;20% O2')
  })
})
