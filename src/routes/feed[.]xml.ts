import { createFileRoute } from '@tanstack/react-router'
import { signals } from '../data/signals'

export const Route = createFileRoute('/feed.xml')({
  server: {
    handlers: {
      GET: () => new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>RadarKit</title><link>https://radarkit.erwanx.com</link><description>Open-source intelligence radar</description>${signals.map((signal) => `<item><title><![CDATA[${signal.title}]]></title><link>https://radarkit.erwanx.com/signal/${signal.slug}</link><pubDate>${new Date(signal.publishedAt).toUTCString()}</pubDate><description><![CDATA[${signal.summary}]]></description></item>`).join('')}</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } }),
    },
  },
})
