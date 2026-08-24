export type FeedItem = {
  title: string
  description: string
  link: string
  publishedAt: string
}

export type NormalizedSignal = FeedItem & {
  slug: string
  source: string
  topic: string
  tags: string[]
}

export type ScopeRule = {
  keywords: readonly string[]
  exclusions: readonly string[]
}

export function slugify(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 90)
}

export function normalizeItem(item: FeedItem, source: string, topic: string): NormalizedSignal | null {
  const title = cleanText(item.title)
  const link = cleanUrl(item.link)
  const sourceName = cleanText(source)
  if (!title || !link || !sourceName) return null
  const publishedAt = new Date(item.publishedAt)
  return {
    ...item,
    title,
    description: cleanText(item.description).slice(0, 500),
    link,
    publishedAt: Number.isNaN(publishedAt.getTime()) ? new Date().toISOString() : publishedAt.toISOString(),
    slug: slugify(title),
    source: sourceName,
    topic,
    tags: [slugify(topic)],
  }
}

export function matchesScope(signal: NormalizedSignal, scope: ScopeRule) {
  const haystack = `${signal.title} ${signal.description} ${signal.source}`.toLocaleLowerCase()
  const matchesKeyword = scope.keywords.some((keyword) => haystack.includes(keyword.toLocaleLowerCase()))
  const matchesExclusion = scope.exclusions.some((keyword) => haystack.includes(keyword.toLocaleLowerCase()))
  return matchesKeyword && !matchesExclusion
}

export function deduplicate(items: NormalizedSignal[]) {
  const seen = new Set<string>()
  return items.filter((item) => {
    const key = item.link.replace(/\/$/, '').toLowerCase()
    const titleKey = slugify(item.title)
    if (seen.has(key) || seen.has(titleKey)) return false
    seen.add(key)
    seen.add(titleKey)
    return true
  })
}

export function renderSignalMarkdown(signal: NormalizedSignal) {
  if (!signal.source.trim() || !isValidSourceUrl(signal.link)) {
    throw new Error(`Cannot render a Signal without a valid official source: ${signal.title}`)
  }
  return `---\ntitle: ${yamlQuote(signal.title)}\nsource: ${yamlQuote(signal.source)}\ntopic: ${yamlQuote(signal.topic)}\npublishedAt: ${signal.publishedAt}\nsourceUrl: ${yamlQuote(signal.link)}\ntags: [${signal.tags.map(yamlQuote).join(', ')}]\n---\n\n${signal.description}\n\n[Lire la source originale](${signal.link})\n`
}

export function isValidSourceUrl(value: string) {
  return Boolean(cleanUrl(value))
}

function cleanUrl(value: string) {
  try {
    const url = new URL(value.trim())
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : ''
  } catch {
    return ''
  }
}

function cleanText(value: string) {
  return decodeEntities(value.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
}

function decodeEntities(value: string) {
  return value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
}

function yamlQuote(value: string) {
  return `'${value.replaceAll("'", "''")}'`
}
