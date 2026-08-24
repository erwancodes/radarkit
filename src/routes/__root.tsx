import type { ReactNode } from 'react'
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { AppFrame } from '../components/app-frame'
import '../styles/app.css'

const DIRECTION_CONTRACT = '<!-- THESIS: RadarKit transforme une veille robotique bornée en signaux lisibles, pas en tableau de bruit. OWN-WORLD: atelier graphite, papier, une marque corail et une géométrie de radar. STORY: le lecteur comprend le périmètre B1/B2, voit ce qui arrive, puis remonte à la source. FIRST VIEWPORT: titre robotique à gauche, instrument radar à droite, rail B1/B2 et état vide immédiatement dessous. FORM: cutting bench select rail, direction robotique, seed f559bebd. FINISH: un build non relu et non documenté reste inachevé ; cette version se termine avec la revue finale, le verdict et DESIGN.md. -->'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'RadarKit — veille robotique' },
      { name: 'description', content: 'Veille Git-native sur les startups humanoïdes, l’open source et les World Models pour la robotique.' },
      { property: 'og:title', content: 'RadarKit — veille robotique' },
      { property: 'og:description', content: 'Deux bornages, des flux RSS spécialisés et des signaux stockés en Markdown.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
    links: [{ rel: 'canonical', href: 'https://radarkit.erwanx.com/' }],
  }),
  component: RootComponent,
})

function RootComponent() {
  return <RootDocument><Outlet /></RootDocument>
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="fr" data-theme="light">
    <head><HeadContent /></head>
    <body>
      <template aria-hidden="true" dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
      {children}
      <Scripts />
    </body>
  </html>
}

export function RootShell({ children }: { children: ReactNode }) {
  return <AppFrame>{children}</AppFrame>
}
