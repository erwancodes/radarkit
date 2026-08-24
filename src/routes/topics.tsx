import { ArrowUpRight } from '@phosphor-icons/react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { signals } from '../data/signals'
import { topics } from '../data/topics'
import { RootShell } from './__root'

export const Route = createFileRoute('/topics')({ component: TopicsPage })

function TopicsPage() {
  return <RootShell><div className="page-container page-section">
    <div className="page-intro"><div><h1>Les deux bornages.</h1><p>Un périmètre court pour suivre les acteurs et les modèles qui font avancer la robotique.</p></div><span className="page-count">02 bornages / {signals.length} signaux</span></div>
    <div className="topic-index">{topics.map((topic, index) => { const count = signals.filter((signal) => signal.topicSlug === topic.slug).length; return <Link key={topic.slug} className="topic-line" to="/topics/$topic" params={{ topic: topic.slug }}>
      <span className="line-index">{String(index + 1).padStart(2, '0')}</span><span className="topic-name">{topic.name}</span><span className="topic-description">{topic.description}</span><span className="topic-count">{String(count).padStart(2, '0')} signaux</span><ArrowUpRight size={18} />
    </Link>})}</div>
    <div className="page-tail"><span>Bornages définis dans <code>src/data/topics.ts</code></span><Link to="/about">Voir le périmètre complet <ArrowUpRight size={16} /></Link></div>
  </div></RootShell>
}
