import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { radarConfig, radarScopes, type RadarSourceConfig } from '../radarkit.config'
import { deduplicate, matchesScope, normalizeItem, renderSignalMarkdown, type FeedItem, type NormalizedSignal } from './core'

const isDryRun = process.argv.includes('--dry-run')
const isScheduled = process.argv.includes('--scheduled')
const isManual = process.argv.includes('--now')

if (isManual) console.log('[RadarKit] Manual run started.')

if (isScheduled && new Intl.DateTimeFormat('en-GB', { timeZone: radarConfig.timezone, hour: '2-digit', hour12: false }).format(new Date()) !== '05') {
  console.log(`[RadarKit] Skipping: not 05:00 in ${radarConfig.timezone}.`)
  process.exit(0)
}

const allItems: NormalizedSignal[] = []
let successful = 0
let failed = 0

for (const source of radarConfig.sources) {
  try {
    const xml = await fetchFeed(source)
    const feedItems = parseFeed(xml)
    const normalized = feedItems.map((item) => normalizeItem(item, source.name, source.topic)).filter((item): item is NonNullable<typeof item> => Boolean(item))
    const scoped = normalized.filter((item) => matchesScope(item, radarScopes[source.scope]))
    allItems.push(...scoped)
    successful += 1
    console.log(`✓ ${source.name} — ${scoped.length} items in ${source.topic} (${normalized.length - scoped.length} hors périmètre)`)
  } catch (error) {
    failed += 1
    console.error(`✗ ${source.name} — ${error instanceof Error ? error.message : 'unknown error'}`)
  }
}

const uniqueItems = deduplicate(allItems)
console.log(`\nSources checked: ${radarConfig.sources.length}`)
console.log(`Successful: ${successful}`)
console.log(`Failed: ${failed}`)
console.log(`New items: ${uniqueItems.length}`)
console.log(`Duplicates skipped: ${allItems.length - uniqueItems.length}`)

if (!isDryRun && uniqueItems.length > 0) {
  const outputDir = path.resolve('content/news')
  await mkdir(outputDir, { recursive: true })
  await Promise.all(uniqueItems.map(async (item) => writeFile(path.join(outputDir, `${item.slug}.md`), renderSignalMarkdown(item), 'utf8')))
  console.log(`\nWrote ${uniqueItems.length} Markdown Signals to ${outputDir}`)
} else if (isDryRun) {
  console.log('\nDry run: no files were written.')
} else {
  console.log('\nNo new Signals: no commit needed.')
}

async function fetchFeed(source: RadarSourceConfig) {
  const response = await fetch(source.url, { signal: AbortSignal.timeout(15_000), headers: { 'user-agent': 'RadarKit/0.1 (+https://radarkit.erwanx.com)' } })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.text()
}

function parseFeed(xml: string): FeedItem[] {
  const blocks = [...xml.matchAll(/<(?:item|entry)\b[^>]*>([\s\S]*?)<\/(?:item|entry)>/gi)].map((match) => match[1])
  return blocks.map((block) => ({
    title: readTag(block, 'title'),
    description: readTag(block, 'description') || readTag(block, 'summary') || readTag(block, 'content'),
    link: readTag(block, 'link') || readAtomLink(block),
    publishedAt: readTag(block, 'pubDate') || readTag(block, 'published') || readTag(block, 'updated'),
  })).filter((item) => item.title && item.link)
}

function readTag(block: string, tag: string) {
  return block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i'))?.[1]?.trim() ?? ''
}

function readAtomLink(block: string) {
  return block.match(/<link[^>]+href=["']([^"']+)["'][^>]*\/?>/i)?.[1] ?? ''
}
