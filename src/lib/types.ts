export type Topic = {
  slug: string
  name: string
  description: string
  count: number
  accent: string
}

export type Source = {
  slug: string
  name: string
  topic: string
  kind: 'RSS' | 'Atom'
  signalCount: number
  lastChecked: string
  url: string
  status: 'healthy' | 'watch'
}

export type Signal = {
  slug: string
  title: string
  summary: string
  body: string[]
  source: string
  sourceSlug: string
  sourceUrl: string
  topic: string
  topicSlug: string
  tags: string[]
  publishedAt: string
  publishedLabel: string
  readingTime: string
  relevanceScore: number
  isSynthetic: boolean
}
