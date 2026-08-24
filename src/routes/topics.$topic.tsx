import { ArrowLeft, ArrowUpRight } from '@phosphor-icons/react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { signals } from '../data/signals'
import { topics } from '../data/topics'
import { SignalList } from '../components/signal-list'
import { RootShell } from './__root'

export const Route = createFileRoute('/topics/$topic')({ component: TopicPage })

function TopicPage() {
  const { topic: slug } = Route.useParams()
  const topic = topics.find((item) => item.slug === slug)
  const topicSignals = signals.filter((signal) => signal.topicSlug === slug)
  if (!topic) return <RootShell><div className="page-container page-section"><h1>Bornage introuvable.</h1><Link to="/topics">Retour aux bornages</Link></div></RootShell>
  return <RootShell><div className="page-container page-section">
    <Link className="back-link" to="/topics"><ArrowLeft size={16} /> Tous les bornages</Link>
    <div className="page-intro topic-page-intro"><div><h1>{topic.name}</h1><p>{topic.description}</p></div><span className="page-count">{String(topicSignals.length).padStart(2, '0')} signaux</span></div>
    <div className="topic-toolbar"><span>Triés du plus récent au plus ancien</span><Link to="/sources">Filtrer par source <ArrowUpRight size={15} /></Link></div>
    <SignalList signals={topicSignals} />
  </div></RootShell>
}
