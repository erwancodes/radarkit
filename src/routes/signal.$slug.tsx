import { ArrowLeft, ArrowUpRight, Clock, GithubLogo, Hash } from '@phosphor-icons/react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { getSignal } from '../data/signals'
import { formatDate } from '../lib/format'
import { RootShell } from './__root'

export const Route = createFileRoute('/signal/$slug')({ component: SignalPage })

function SignalPage() {
  const { slug } = Route.useParams()
  const signal = getSignal(slug)
  if (!signal) return <RootShell><div className="page-container page-section"><h1>Signal introuvable.</h1><Link to="/">Retour au radar</Link></div></RootShell>
  return <RootShell><article className="page-container signal-page">
    <Link className="back-link" to="/"><ArrowLeft size={16} /> Retour au radar</Link>
    <div className="signal-detail-grid"><div><div className="detail-meta"><span className="topic-mark">{signal.topic}</span><span>{signal.source}</span><span>/</span><span>{formatDate(signal.publishedAt)}</span></div><h1>{signal.title}</h1><p className="detail-summary">{signal.summary}</p><div className="detail-tags">{signal.tags.map((tag) => <span key={tag}><Hash size={14} /> {tag}</span>)}</div></div><aside className="signal-aside"><div className="aside-score"><span>{signal.topicSlug.toUpperCase()}</span><small>bornage<br />robotique</small></div><div className="aside-line"><Clock size={16} /> {signal.readingTime}</div><div className="aside-line"><GithubLogo size={16} /> Stocké en Markdown</div></aside></div>
    <div className="detail-body"><div className="detail-prose">{signal.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="detail-source"><span>Source originale</span><a href={signal.sourceUrl} target="_blank" rel="noreferrer">Lire {signal.source} <ArrowUpRight size={16} /></a><small>RadarKit garde la provenance visible. Il ne remplace pas la source.</small></div></div>
  </article></RootShell>
}
