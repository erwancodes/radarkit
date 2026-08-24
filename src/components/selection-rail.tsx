import { ArrowDownRight } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { topics } from '../data/topics'

export function SelectionRail({ active = 'all' }: { active?: string }) {
  return <div className="selection-rail" aria-label="Radar sections">
    <Link className={`rail-tab ${active === 'all' ? 'is-active' : ''}`} to="/">Latest<span>06</span></Link>
    {topics.slice(0, 5).map((topic) => <Link key={topic.slug} className={`rail-tab ${active === topic.slug ? 'is-active' : ''}`} to="/topics/$topic" params={{ topic: topic.slug }}>{topic.name}<span>{String(topic.count).padStart(2, '0')}</span></Link>)}
    <Link className="rail-tab rail-tab-muted" to="/archive">Archive<span><ArrowDownRight size={15} /></span></Link>
  </div>
}
