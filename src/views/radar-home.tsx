'use client'

import { ArrowUpRight, Broadcast, CaretRight, Lightning, SlidersHorizontal } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { FilterBar, type FilterState } from '../components/filter-bar'
import { SelectionRail } from '../components/selection-rail'
import { SignalList } from '../components/signal-list'
import { signals } from '../data/signals'
import { sources } from '../data/sources'
import { RootShell } from '../routes/__root'

export function RadarHome() {
  const [filters, setFilters] = useState<FilterState>({ query: '', topic: '', source: '' })
  const filteredSignals = useMemo(() => signals.filter((signal) => {
    const haystack = `${signal.title} ${signal.summary} ${signal.source} ${signal.topic} ${signal.tags.join(' ')}`.toLowerCase()
    return haystack.includes(filters.query.toLowerCase()) && (!filters.topic || signal.topicSlug === filters.topic) && (!filters.source || signal.sourceSlug === filters.source)
  }), [filters])

  const b1Count = signals.filter((signal) => signal.topicSlug === 'b1').length
  const b2Count = signals.filter((signal) => signal.topicSlug === 'b2').length

  return <RootShell><div className="page-container home-page">
    <section className="hero-grid">
      <div className="hero-copy"><div className="live-label"><span className="status-dot" /> Veille robotique / 2 bornages</div><h1>Robotique,<br /><em>sans bruit.</em></h1><p>Un radar ouvert pour suivre les startups humanoïdes, l’open source et les modèles d’IA qui apprennent le monde physique.</p><div className="hero-actions"><a className="button button-primary" href="#signals">Voir les signaux <ArrowUpRight size={17} /></a><Link className="text-link" to="/about">Voir le périmètre <ArrowUpRight size={16} /></Link></div></div>
      <RadarBench />
    </section>
    <SelectionRail />
    <section className="feed-section" id="signals"><div className="section-heading"><div><span className="section-rule" /><h2>{signals.length ? `${signals.length} signaux dans le radar.` : 'Radar prêt pour sa première collecte.'}</h2></div><div className="section-side-note">B1 + B2<br />{signals.length ? `${signals.length} signaux chargés` : 'Aucun fichier Markdown'}</div></div><FilterBar value={filters} onChange={setFilters} /><div className="feed-layout"><div>{filteredSignals.length ? <SignalList signals={filteredSignals} /> : <div className="empty-state"><SlidersHorizontal size={22} /><h3>{signals.length ? 'Aucun signal sur cette coupe.' : 'Le radar est vide, volontairement.'}</h3><p>{signals.length ? 'Essaie de retirer un filtre ou une recherche.' : 'Lance pnpm radar:now pour lancer la première collecte robotique.'}</p></div>}</div><aside className="feed-aside"><div className="aside-heading"><span>Répartition</span><Link to="/topics">Voir les bornages <ArrowUpRight size={15} /></Link></div><div className="mix-list"><MixLine label="B1" value={b1Count} total={Math.max(1, signals.length)} /><MixLine label="B2" value={b2Count} total={Math.max(1, signals.length)} /></div><div className="aside-divider" /><div className="aside-heading"><span>Sources configurées</span><Broadcast size={16} /></div><div className="awake-list">{sources.slice(0, 3).map((source) => <div key={source.slug}><span className={`status-dot ${source.status === 'healthy' ? 'is-live' : ''}`} /><span>{source.name}</span><small>{source.lastChecked}</small></div>)}</div><Link className="aside-cta" to="/sources">Inspecter les sources <CaretRight size={16} /></Link></aside></div></section>
  </div></RootShell>
}

function RadarBench() {
  return <div className="radar-bench" aria-label="Vue d’activité du radar"><div className="bench-top"><span>RADARKIT / ROBOTICS</span><span className="bench-live"><span className="status-dot" /> READY</span></div><div className="bench-stage"><div className="bench-ring ring-one" /><div className="bench-ring ring-two" /><div className="bench-ring ring-three" /><div className="bench-cross cross-x" /><div className="bench-cross cross-y" /><div className="bench-sweep" /><div className="bench-point point-one" /><div className="bench-point point-two" /><div className="bench-point point-three" /><div className="bench-readout"><span>{signals.length}</span><small>signaux<br />chargés</small></div></div><div className="bench-bottom"><span>05:00 CET / DAILY RUN</span><span>2 BORNAGES / {sources.length} FLUX</span></div></div>
}

function MixLine({ label, value, total }: { label: string; value: number; total: number }) {
  return <div className="mix-line"><span>{label}</span><div className="mix-track"><span style={{ width: `${(value / total) * 100}%` }} /></div><strong>{value}</strong></div>
}
