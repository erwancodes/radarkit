import { ArrowUpRight, Check, CircleDashed, WarningCircle } from '@phosphor-icons/react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { signals } from '../data/signals'
import { sources } from '../data/sources'
import { RootShell } from './__root'

export const Route = createFileRoute('/sources')({ component: SourcesPage })

function SourcesPage() {
  return <RootShell><div className="page-container page-section">
    <div className="page-intro"><div><h1>Les sources du radar.</h1><p>Chaque signal gardera une ligne directe vers le flux qui l’a publié.</p></div><span className="page-count">{sources.length.toString().padStart(2, '0')} flux spécialisés</span></div>
    <div className="source-list">{sources.map((source, index) => { const count = signals.filter((signal) => signal.sourceSlug === source.slug).length; return <div className="source-row" key={source.slug}>
      <span className="line-index">{String(index + 1).padStart(2, '0')}</span><div className="source-name"><strong>{source.name}</strong><span>{source.kind} / {source.topic}</span></div><div className="source-health">{source.status === 'healthy' ? <Check size={15} /> : source.status === 'idle' ? <CircleDashed size={15} /> : <WarningCircle size={15} />}<span>{source.status === 'healthy' ? 'Actif' : source.status === 'idle' ? 'Prêt' : 'À surveiller'}</span></div><div className="source-count"><strong>{count}</strong><span>signaux</span></div><div className="source-checked"><span>Dernier passage</span><strong>{source.lastChecked}</strong></div><a className="row-action" href={source.url} target="_blank" rel="noreferrer" aria-label={`Ouvrir ${source.name}`}><ArrowUpRight size={18} /></a>
    </div>})}</div>
    <div className="source-note"><div><span className="status-dot" /> Fetch → filtre → déduplication</div><Link to="/about">Voir le workflow <ArrowUpRight size={15} /></Link></div>
  </div></RootShell>
}
