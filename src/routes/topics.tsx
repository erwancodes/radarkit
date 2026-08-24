import { ArrowUpRight } from '@phosphor-icons/react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { topics } from '../data/topics'
import { RootShell } from './__root'

export const Route = createFileRoute('/topics')({ component: TopicsPage })

function TopicsPage() {
  return <RootShell><div className="page-container page-section">
    <div className="page-intro"><div><h1>Topics with a pulse.</h1><p>Choose a lane and stay close to the signals moving through it.</p></div><span className="page-count">06 topics / 15 signals</span></div>
    <div className="topic-index">{topics.map((topic, index) => <Link key={topic.slug} className="topic-line" to="/topics/$topic" params={{ topic: topic.slug }}>
      <span className="line-index">{String(index + 1).padStart(2, '0')}</span><span className="topic-name">{topic.name}</span><span className="topic-description">{topic.description}</span><span className="topic-count">{String(topic.count).padStart(2, '0')} signals</span><ArrowUpRight size={18} />
    </Link>)}</div>
    <div className="page-tail"><span>Topics are configured in <code>data/topics.ts</code></span><Link to="/about">See how the radar works <ArrowUpRight size={16} /></Link></div>
  </div></RootShell>
}
