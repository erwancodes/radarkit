import { describe, expect, it } from 'vitest'
import { deduplicate, matchesScope, normalizeItem, renderSignalMarkdown, slugify } from './core'

describe('RadarKit core', () => {
  it('creates stable, readable slugs', () => {
    expect(slugify('Écouter le signal — depuis la Lune')).toBe('ecouter-le-signal-depuis-la-lune')
  })

  it('drops unsafe or incomplete feed items during normalization', () => {
    expect(normalizeItem({ title: '', description: '', link: 'javascript:alert(1)', publishedAt: '' }, 'Test', 'AI')).toBeNull()
    expect(normalizeItem({ title: 'A signal', description: '<b>Useful</b>', link: 'https://example.com/signal', publishedAt: '2026-08-24' }, 'Test', 'AI')?.description).toBe('Useful')
  })

  it('deduplicates by URL and normalized title', () => {
    const first = normalizeItem({ title: 'Same title', description: '', link: 'https://example.com/a', publishedAt: '2026-08-24' }, 'A', 'AI')!
    const second = normalizeItem({ title: 'Same title', description: '', link: 'https://example.com/b', publishedAt: '2026-08-24' }, 'B', 'AI')!
    expect(deduplicate([first, second])).toHaveLength(1)
  })

  it('renders frontmatter and a source link', () => {
    const signal = normalizeItem({ title: 'A signal', description: 'Read this.', link: 'https://example.com/a', publishedAt: '2026-08-24' }, 'Test', 'AI')!
    const markdown = renderSignalMarkdown(signal)
    expect(markdown).toContain("title: 'A signal'")
    expect(markdown).toContain('[Lire la source originale](https://example.com/a)')
  })

  it('keeps only signals inside the selected robotics boundary', () => {
    const inScope = normalizeItem({ title: 'Open-source humanoid robot platform', description: 'A modular robot for industrial research.', link: 'https://example.com/robot', publishedAt: '2026-08-24' }, 'Robotics source', 'B1')!
    const excluded = normalizeItem({ title: 'A toy robot for home entertainment', description: 'A consumer gadget.', link: 'https://example.com/toy', publishedAt: '2026-08-24' }, 'Robotics source', 'B1')!
    const scope = { keywords: ['robot', 'humanoid', 'open source'], exclusions: ['toy robot', 'consumer'] }
    expect(matchesScope(inScope, scope)).toBe(true)
    expect(matchesScope(excluded, scope)).toBe(false)
  })
})
