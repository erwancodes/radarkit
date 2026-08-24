import { ArrowUpRight, CaretRight } from '@phosphor-icons/react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { RootShell } from './__root'

export const Route = createFileRoute('/archive')({ component: ArchivePage })

function ArchivePage() {
  return <RootShell><div className="page-container page-section">
    <div className="page-intro"><div><h1>Archive, by date.</h1><p>The rail gets more useful when yesterday stays within reach.</p></div><span className="page-count">Markdown history / Git-native</span></div>
    <div className="archive-stack">
      <ArchiveYear year="2026" months={[['August', '15 signals', true], ['July', '42 signals', false], ['June', '38 signals', false]]} />
      <ArchiveYear year="2025" months={[['December', '27 signals', false], ['November', '31 signals', false]]} />
    </div>
    <div className="page-tail"><span>Archives are generated from <code>content/news</code></span><Link to="/about">How RadarKit stores Signals <ArrowUpRight size={16} /></Link></div>
  </div></RootShell>
}

function ArchiveYear({ year, months }: { year: string; months: [string, string, boolean][] }) {
  return <section className="archive-year"><div className="archive-year-label">{year}</div><div className="archive-months">{months.map(([month, count, active]) => <Link key={month} className={`archive-month ${active ? 'is-active' : ''}`} to="/" search={{ archive: `${year}-${month.toLowerCase()}` }}><span>{month}</span><small>{count}</small><CaretRight size={17} /></Link>)}</div></section>
}
