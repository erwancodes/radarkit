import { ArrowUpRight, CaretRight } from '@phosphor-icons/react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { signals } from '../data/signals'
import { RootShell } from './__root'

export const Route = createFileRoute('/archive')({ component: ArchivePage })

function ArchivePage() {
  const archive = buildArchive()
  return <RootShell><div className="page-container page-section">
    <div className="page-intro"><div><h1>L’archive, par date.</h1><p>Le radar deviendra plus utile quand les signaux d’hier resteront à portée.</p></div><span className="page-count">Historique Markdown / Git</span></div>
    {archive.length ? <div className="archive-stack">{archive.map((year) => <ArchiveYear key={year.year} year={year.year} months={year.months} />)}</div> : <div className="empty-state archive-empty"><h3>L’archive attend le premier run.</h3><p>Les mois apparaîtront ici dès que le radar aura écrit ses premiers fichiers.</p></div>}
    <div className="page-tail"><span>Archives générées depuis <code>content/news</code></span><Link to="/about">Comment RadarKit stocke les signaux <ArrowUpRight size={16} /></Link></div>
  </div></RootShell>
}

function ArchiveYear({ year, months }: { year: string; months: [string, string, boolean][] }) {
  return <section className="archive-year"><div className="archive-year-label">{year}</div><div className="archive-months">{months.map(([month, count, active]) => <Link key={month} className={`archive-month ${active ? 'is-active' : ''}`} to="/" search={{ archive: `${year}-${month.toLowerCase()}` }}><span>{month}</span><small>{count}</small><CaretRight size={17} /></Link>)}</div></section>
}

function buildArchive() {
  const grouped = new Map<string, Map<string, number>>()
  for (const signal of signals) {
    const date = new Date(signal.publishedAt)
    const year = String(date.getFullYear())
    const month = new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(date)
    if (!grouped.has(year)) grouped.set(year, new Map())
    const months = grouped.get(year)!
    months.set(month, (months.get(month) ?? 0) + 1)
  }
  return [...grouped.entries()].sort(([a], [b]) => b.localeCompare(a)).map(([year, months]) => ({
    year,
    months: [...months.entries()].map(([month, count], index) => [month, `${count} signal${count > 1 ? 's' : ''}`, index === 0] as [string, string, boolean]),
  }))
}
