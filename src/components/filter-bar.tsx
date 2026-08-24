import { Funnel, MagnifyingGlass, X } from '@phosphor-icons/react'
import { topics } from '../data/topics'
import { sources } from '../data/sources'

export type FilterState = { query: string; topic: string; source: string }

export function FilterBar({ value, onChange }: { value: FilterState; onChange: (value: FilterState) => void }) {
  const hasFilters = Boolean(value.query || value.topic || value.source)
  return <div className="filter-bar" role="search">
    <label className="search-field"><MagnifyingGlass size={18} /><span className="sr-only">Rechercher un signal</span><input value={value.query} onChange={(event) => onChange({ ...value, query: event.target.value })} placeholder="Rechercher dans le radar" /></label>
    <div className="filter-select"><Funnel size={16} /><label className="sr-only" htmlFor="topic-filter">Filtrer par bornage</label><select id="topic-filter" value={value.topic} onChange={(event) => onChange({ ...value, topic: event.target.value })}><option value="">Tous les bornages</option>{topics.map((topic) => <option key={topic.slug} value={topic.slug}>{topic.name}</option>)}</select></div>
    <div className="filter-select filter-source"><label className="sr-only" htmlFor="source-filter">Filtrer par source</label><select id="source-filter" value={value.source} onChange={(event) => onChange({ ...value, source: event.target.value })}><option value="">Toutes les sources</option>{sources.map((source) => <option key={source.slug} value={source.slug}>{source.name}</option>)}</select></div>
    {hasFilters ? <button className="clear-filters" type="button" onClick={() => onChange({ query: '', topic: '', source: '' })}><X size={15} /> Effacer</button> : null}
  </div>
}
