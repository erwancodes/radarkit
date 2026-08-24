import { ArrowUpRight, Clock, Hash } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import type { Signal } from '../lib/types'

export function SignalList({ signals, compact = false }: { signals: Signal[]; compact?: boolean }) {
  return <div className={`signal-list ${compact ? 'is-compact' : ''}`}>
    {signals.map((signal, index) => <article key={signal.slug} className="signal-row" style={{ '--signal-index': index } as React.CSSProperties}>
      <div className="signal-index">{String(index + 1).padStart(2, '0')}</div>
      <div className="signal-main">
        <div className="signal-meta"><span className="topic-mark">{signal.topic}</span><span>{signal.source}</span><span className="meta-separator">/</span><span>{signal.publishedLabel}</span></div>
        <Link className="signal-title" to="/signal/$slug" params={{ slug: signal.slug }}>{signal.title}<ArrowUpRight size={17} /></Link>
        {!compact ? <p className="signal-summary">{signal.summary}</p> : null}
        <div className="signal-tags"><span><Clock size={14} /> {signal.readingTime}</span>{signal.tags.slice(0, 3).map((tag) => <span key={tag}><Hash size={13} /> {tag}</span>)}</div>
      </div>
      <div className="signal-score" aria-label={`Relevance score ${signal.relevanceScore} out of 100`}><span>{signal.relevanceScore}</span><small>score</small></div>
    </article>)}
  </div>
}
