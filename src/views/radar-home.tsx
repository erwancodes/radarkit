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

  return <RootShell><div className="page-container home-page">
    <section className="hero-grid">
      <div className="hero-copy"><div className="live-label"><span className="status-dot is-live" /> Live radar / Monday, August 24</div><h1>The signal,<br /><em>before the noise.</em></h1><p>Your daily open-source intelligence radar. A quiet place to see what changed, trace it to a source, and keep the useful parts close.</p><div className="hero-actions"><a className="button button-primary" href="#signals">Latest radar <ArrowUpRight size={17} /></a><Link className="text-link" to="/about">How it works <ArrowUpRight size={16} /></Link></div></div>
      <RadarBench />
    </section>
    <SelectionRail />
    <section className="feed-section" id="signals"><div className="section-heading"><div><span className="section-rule" /><h2>12 signals detected today.</h2></div><div className="section-side-note">Updated 4 min ago<br />06 shown in demo rail</div></div><FilterBar value={filters} onChange={setFilters} /><div className="feed-layout"><div>{filteredSignals.length ? <SignalList signals={filteredSignals} /> : <div className="empty-state"><SlidersHorizontal size={22} /><h3>No signal on this cut.</h3><p>Try clearing a filter or searching for another source.</p></div>}</div><aside className="feed-aside"><div className="aside-heading"><span>Signal mix</span><Link to="/topics">See all <ArrowUpRight size={15} /></Link></div><div className="mix-list"><MixLine label="AI" value={4} total={6} /><MixLine label="Space" value={3} total={6} /><MixLine label="Dev" value={3} total={6} /><MixLine label="Robotics" value={2} total={6} /></div><div className="aside-divider" /><div className="aside-heading"><span>Sources awake</span><Broadcast size={16} /></div><div className="awake-list">{sources.slice(0, 3).map((source) => <div key={source.slug}><span className="status-dot is-live" /><span>{source.name}</span><small>{source.lastChecked}</small></div>)}</div><Link className="aside-cta" to="/sources">Inspect all sources <CaretRight size={16} /></Link></aside></div></section>
  </div></RootShell>
}

function RadarBench() {
  return <div className="radar-bench" aria-label="Radar activity overview"><div className="bench-top"><span>RADARKIT / 001</span><span className="bench-live"><span className="status-dot is-live" /> SCANNING</span></div><div className="bench-stage"><div className="bench-ring ring-one" /><div className="bench-ring ring-two" /><div className="bench-ring ring-three" /><div className="bench-cross cross-x" /><div className="bench-cross cross-y" /><div className="bench-sweep" /><div className="bench-point point-one" /><div className="bench-point point-two" /><div className="bench-point point-three" /><div className="bench-readout"><span>12</span><small>signals<br />detected</small></div></div><div className="bench-bottom"><span>05:00 CET / DAILY RUN</span><span>SCAN 86%</span></div></div>
}

function MixLine({ label, value, total }: { label: string; value: number; total: number }) {
  return <div className="mix-line"><span>{label}</span><div className="mix-track"><span style={{ width: `${(value / total) * 100}%` }} /></div><strong>{value}</strong></div>
}
