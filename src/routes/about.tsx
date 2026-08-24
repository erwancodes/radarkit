import { ArrowUpRight, GitBranch, GithubLogo, Rss } from '@phosphor-icons/react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { RootShell } from './__root'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return <RootShell><div className="page-container page-section about-page">
    <div className="page-intro"><div><h1>A small radar for a noisy world.</h1><p>RadarKit is open source intelligence feed software for people who prefer their tools inspectable.</p></div><span className="page-count">Open source / Markdown-first</span></div>
    <div className="about-grid"><div className="about-copy"><p>RadarKit turns the sources you follow into a daily, searchable intelligence feed. It fetches, filters, stores, and reads — without a database, account, or required AI key.</p><p>Fork the repository, edit <code>radarkit.config.ts</code>, enable the Action, and the next signal is yours.</p><div className="about-actions"><a className="button button-primary" href="https://github.com/erwancodes/radarkit" target="_blank" rel="noreferrer"><GithubLogo size={18} /> View on GitHub</a><Link className="button button-secondary" to="/">Open today’s radar <ArrowUpRight size={17} /></Link></div></div><div className="workflow-diagram" aria-label="RadarKit workflow"><WorkflowStep label="Fetch" icon={<Rss size={18} />} note="sources" /><WorkflowStep label="Filter" icon={<GitBranch size={18} />} note="normalize" /><WorkflowStep label="Store" icon={<span className="workflow-mark">#</span>} note="Markdown" /><WorkflowStep label="Read" icon={<ArrowUpRight size={18} />} note="web" /></div></div>
    <div className="about-foot"><span>Built in the open. MIT licensed.</span><span>Canonical domain / radarkit.erwanx.com</span></div>
  </div></RootShell>
}

function WorkflowStep({ label, icon, note }: { label: string; icon: React.ReactNode; note: string }) {
  return <div className="workflow-step"><span className="workflow-icon">{icon}</span><strong>{label}</strong><small>{note}</small></div>
}
