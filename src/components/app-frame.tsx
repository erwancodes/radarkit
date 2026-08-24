'use client'

import { ArrowUpRight, Broadcast, GithubLogo, MagnifyingGlass, Moon, Sun } from '@phosphor-icons/react'
import { Link, useRouterState } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { signals } from '../data/signals'

type Theme = 'light' | 'dark' | 'system'

const navItems = [
  { label: 'Radar', to: '/' as const },
  { label: 'Bornages', to: '/topics' as const },
  { label: 'Sources', to: '/sources' as const },
  { label: 'Périmètre', to: '/about' as const },
]

export function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const [theme, setTheme] = useState<Theme>('system')
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('radarkit-theme') as Theme | null
    if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
      setTheme(storedTheme)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    root.dataset.theme = isDark ? 'dark' : 'light'
    window.localStorage.setItem('radarkit-theme', theme)
  }, [theme])

  const nextTheme = useMemo(() => (theme === 'dark' ? 'light' : 'dark'), [theme])

  return (
    <div className="site-shell">
      <header className="topbar">
        <Link className="brand" to="/" aria-label="Accueil RadarKit">
          <span className="brand-mark"><Broadcast weight="bold" size={20} /></span>
          <span>RadarKit</span>
        </Link>
        <nav className="topbar-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isActive = item.to === '/' ? pathname === '/' : pathname.startsWith(item.to)
            return <Link key={item.label} className={`nav-link ${isActive ? 'is-active' : ''}`} to={item.to}>{item.label}</Link>
          })}
        </nav>
        <div className="topbar-actions">
          <button className="icon-button" type="button" aria-label="Rechercher un signal" onClick={() => setSearchOpen(true)}>
            <MagnifyingGlass size={19} />
          </button>
          <a className="icon-button" href="https://github.com/erwancodes/radarkit" target="_blank" rel="noreferrer" aria-label="Ouvrir RadarKit sur GitHub">
            <GithubLogo size={19} />
          </a>
          <button className="icon-button theme-button" type="button" aria-label={`Passer au thème ${nextTheme}`} onClick={() => setTheme(nextTheme)}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div><span className="footer-signal" /> RadarKit / construit ouvertement</div>
        <div className="footer-links"><Link to="/archive">Archive</Link><a href="/feed.xml">RSS</a><Link to="/about">Périmètre</Link></div>
      </footer>
      {searchOpen ? <SearchOverlay onClose={() => setSearchOpen(false)} /> : null}
    </div>
  )
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const results = signals.filter((signal) => `${signal.title} ${signal.summary} ${signal.source} ${signal.topic} ${signal.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())).slice(0, 5)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Rechercher dans le radar">
    <button className="search-backdrop" type="button" aria-label="Fermer la recherche" onClick={onClose} />
    <div className="search-panel">
      <div className="search-heading"><span>Rechercher dans le radar</span><kbd>ESC</kbd></div>
      <div className="search-input-wrap"><MagnifyingGlass size={20} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex. humanoïde, simulation, NVIDIA" /></div>
      <div className="search-results">
        {results.map((signal) => <Link key={signal.slug} to="/signal/$slug" params={{ slug: signal.slug }} onClick={onClose} className="search-result">
          <span className="result-topic">{signal.topic}</span><span className="result-title">{signal.title}</span><span className="result-arrow"><ArrowUpRight size={16} /></span>
        </Link>)}
        {query && results.length === 0 ? <p className="search-empty">Aucun signal ne correspond à cette recherche.</p> : null}
        {!query ? <p className="search-hint">Titres, descriptions, sources, bornages et tags.</p> : null}
      </div>
    </div>
  </div>
}
