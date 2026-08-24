import { ArrowLeft, ArrowUpRight, Clock, GithubLogo, Hash } from '@phosphor-icons/react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { getSignal } from '../data/signals'
import { formatDate } from '../lib/format'
import { RootShell } from './__root'

export const Route = createFileRoute('/signal/$slug')({ component: SignalPage })

function SignalPage() {
  const { slug } = Route.useParams()
  const signal = getSignal(slug)
  if (!signal) return <RootShell><div className="page-container page-section"><h1>Signal not found.</h1><Link to="/">Back to the radar</Link></div></RootShell>
  return <RootShell><article className="page-container signal-page">
    <Link className="back-link" to="/"><ArrowLeft size={16} /> Back to today</Link>
    <div className="signal-detail-grid"><div><div className="detail-meta"><span className="topic-mark">{signal.topic}</span><span>{signal.source}</span><span>/</span><span>{formatDate(signal.publishedAt)}</span></div><h1>{signal.title}</h1><p className="detail-summary">{signal.summary}</p><div className="detail-tags">{signal.tags.map((tag) => <span key={tag}><Hash size={14} /> {tag}</span>)}</div></div><aside className="signal-aside"><div className="aside-score"><span>{signal.relevanceScore}</span><small>relevance<br />score</small></div><div className="aside-line"><Clock size={16} /> {signal.readingTime}</div><div className="aside-line"><GithubLogo size={16} /> Stored as Markdown</div></aside></div>
    <div className="detail-body"><div className="detail-prose">{signal.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="synthetic-note">Synthetic demo Signal — replace this content with generated Markdown from your own radar run.</div></div><div className="detail-source"><span>Original source</span><a href={signal.sourceUrl} target="_blank" rel="noreferrer">Read {signal.source} <ArrowUpRight size={16} /></a><small>RadarKit keeps the source in view. It does not replace it.</small></div></div>
  </article></RootShell>
}
