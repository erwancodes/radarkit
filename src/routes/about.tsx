import { ArrowUpRight, GitBranch, GithubLogo, Rss } from '@phosphor-icons/react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { RootShell } from './__root'

export const Route = createFileRoute('/about')({ component: AboutPage })

function AboutPage() {
  return <RootShell><div className="page-container page-section about-page">
    <div className="page-intro"><div><h1>Un radar robotique, sans bruit.</h1><p>RadarKit transforme les deux bornages de ma veille en un flux inspectable, stocké dans Git.</p></div><span className="page-count">Open source / Markdown-first</span></div>
    <div className="about-grid"><div className="about-copy"><p>Le périmètre est volontairement court : startups et open source humanoïde d’un côté, World Models IA pour la robotique de l’autre. La robotique militaire, les jouets sans portée industrielle et les LLM généralistes restent hors champ.</p><p>Le radar récupère les flux, applique les mots-clés et exclusions, déduplique les liens, puis écrit un fichier Markdown par signal.</p><div className="about-actions"><a className="button button-primary" href="https://github.com/erwancodes/radarkit" target="_blank" rel="noreferrer"><GithubLogo size={18} /> Voir sur GitHub</a><Link className="button button-secondary" to="/">Ouvrir le radar <ArrowUpRight size={17} /></Link></div></div><div className="workflow-diagram" aria-label="Workflow RadarKit"><WorkflowStep label="Collecter" icon={<Rss size={18} />} note="flux RSS" /><WorkflowStep label="Filtrer" icon={<GitBranch size={18} />} note="B1 / B2" /><WorkflowStep label="Stocker" icon={<span className="workflow-mark">#</span>} note="Markdown" /><WorkflowStep label="Lire" icon={<ArrowUpRight size={18} />} note="web" /></div></div>
    <div className="about-foot"><span>Construit ouvertement. Licence MIT.</span><span>Domaine canonique / radarkit.erwanx.com</span></div>
  </div></RootShell>
}

function WorkflowStep({ label, icon, note }: { label: string; icon: React.ReactNode; note: string }) {
  return <div className="workflow-step"><span className="workflow-icon">{icon}</span><strong>{label}</strong><small>{note}</small></div>
}
