import { ArrowUpRight, Check, WarningCircle } from '@phosphor-icons/react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { sources } from '../data/sources'
import { RootShell } from './__root'

export const Route = createFileRoute('/sources')({ component: SourcesPage })

function SourcesPage() {
  return <RootShell><div className="page-container page-section">
    <div className="page-intro"><div><h1>Sources on the rail.</h1><p>Every Signal keeps a line back to the place it came from.</p></div><span className="page-count">05 monitored sources</span></div>
    <div className="source-list">{sources.map((source, index) => <div className="source-row" key={source.slug}>
      <span className="line-index">{String(index + 1).padStart(2, '0')}</span><div className="source-name"><strong>{source.name}</strong><span>{source.kind} / {source.topic}</span></div><div className="source-health">{source.status === 'healthy' ? <Check size={15} /> : <WarningCircle size={15} />}<span>{source.status === 'healthy' ? 'Healthy' : 'Watch'}</span></div><div className="source-count"><strong>{source.signalCount}</strong><span>signals</span></div><div className="source-checked"><span>Last checked</span><strong>{source.lastChecked}</strong></div><a className="row-action" href={source.url} target="_blank" rel="noreferrer" aria-label={`Open ${source.name}`}><ArrowUpRight size={18} /></a>
    </div>)}</div>
    <div className="source-note"><div><span className="status-dot is-live" /> Fetch → normalize → deduplicate</div><Link to="/about">Read the core workflow <ArrowUpRight size={15} /></Link></div>
  </div></RootShell>
}
