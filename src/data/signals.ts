import type { Signal } from '../lib/types'

const markdownModules = import.meta.glob('../../content/news/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

const topicLabels: Record<string, string> = {
  B1: 'B1 — Startups robotique & open source humanoïde',
  B2: 'B2 — World Models IA pour la robotique',
}

export const signals = Object.entries(markdownModules)
  .map(([filePath, raw]) => parseSignal(raw, filePath))
  .filter((signal): signal is Signal => Boolean(signal))
  .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

export function getSignal(slug: string) {
  return signals.find((signal) => signal.slug === slug)
}

function parseSignal(raw: string, filePath: string): Signal | null {
  const match = raw.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/)
  if (!match) return null

  const metadata = parseFrontmatter(match[1])
  const body = match[2].replace(/\n*\[Read the original source\]\([^)]*\)\s*$/i, '').trim()
  const title = metadata.title
  const source = metadata.source
  const topicCode = metadata.topic
  const sourceUrl = metadata.sourceUrl
  const publishedAt = metadata.publishedAt
  if (!title || !source || !topicCode || !sourceUrl || !publishedAt) return null

  const paragraphs = body.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean)
  const slug = filePath.split('/').pop()?.replace(/\.md$/, '') ?? slugify(title)
  const topicSlug = topicCode.toLowerCase()
  const topic = topicLabels[topicCode] ?? topicCode
  const summary = paragraphs[0] ?? 'Signal collecté depuis le flux configuré.'
  const words = body.split(/\s+/).filter(Boolean).length

  return {
    slug,
    title,
    summary,
    body: paragraphs,
    source,
    sourceSlug: slugify(source),
    sourceUrl,
    topic,
    topicSlug,
    tags: parseTags(metadata.tags),
    publishedAt,
    publishedLabel: formatPublishedLabel(publishedAt),
    readingTime: `${Math.max(1, Math.ceil(words / 220))} min de lecture`,
    isSynthetic: false,
  }
}

function parseFrontmatter(frontmatter: string) {
  const values: Record<string, string> = {}
  for (const line of frontmatter.split('\n')) {
    const separator = line.indexOf(':')
    if (separator < 0) continue
    const key = line.slice(0, separator).trim()
    const value = line.slice(separator + 1).trim().replace(/^'(.*)'$/, '$1').replaceAll("''", "'")
    values[key] = value
  }
  return values
}

function parseTags(value: string | undefined) {
  if (!value) return []
  return [...value.matchAll(/'((?:''|[^'])*)'/g)].map((match) => match[1].replaceAll("''", "'"))
}

function formatPublishedLabel(value: string) {
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value))
}

function slugify(value: string) {
  return value.toLocaleLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
