import { ArrowDownRight } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { signals } from '../data/signals'
import { topics } from '../data/topics'

export function SelectionRail({ active = 'all' }: { active?: string }) {
  return <div className="selection-rail" aria-label="Radar sections">
    <Link className={`rail-tab ${active === 'all' ? 'is-active' : ''}`} to="/">Radar<span>{String(signals.length).padStart(2, '0')}</span></Link>
    {topics.map((topic) => <Link key={topic.slug} className={`rail-tab ${active === topic.slug ? 'is-active' : ''}`} to="/topics/$topic" params={{ topic: topic.slug }}>{topic.shortName ?? topic.name}<span>{String(signals.filter((signal) => signal.topicSlug === topic.slug).length).padStart(2, '0')}</span></Link>)}
    <Link className="rail-tab rail-tab-muted" to="/archive">Archive<span><ArrowDownRight size={15} /></span></Link>
  </div>
}
