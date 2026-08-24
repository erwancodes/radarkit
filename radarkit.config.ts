export type RadarSourceConfig = {
  name: string
  url: string
  topic: string
  kind: 'rss' | 'atom'
}

export const radarConfig = {
  siteUrl: process.env.PUBLIC_SITE_URL ?? 'http://localhost:3000',
  timezone: 'Europe/Paris',
  schedule: '0 5 * * *',
  sources: [
    {
      name: 'OpenAI',
      url: 'https://openai.com/news/rss.xml',
      topic: 'AI',
      kind: 'rss',
    },
    {
      name: 'NASA',
      url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss',
      topic: 'Space',
      kind: 'rss',
    },
    {
      name: 'GitHub Blog',
      url: 'https://github.blog/feed/',
      topic: 'Dev',
      kind: 'rss',
    },
  ] satisfies RadarSourceConfig[],
  ai: {
    enabled: process.env.AI_ENABLED === 'true',
    model: process.env.AI_MODEL ?? '',
  },
} as const
