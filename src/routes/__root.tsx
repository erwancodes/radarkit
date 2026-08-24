import type { ReactNode } from 'react'
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { AppFrame } from '../components/app-frame'
import '../styles/app.css'

const DIRECTION_CONTRACT = '<!-- THESIS: RadarKit reads like a cutting bench for signals, not a widget dashboard. OWN-WORLD: graphite, paper, one signal-coral tape mark, and punched rails. STORY: a reader sees what changed, traces it to a source, then follows the rail. FIRST VIEWPORT: title left, live rail right, feed immediately below. FORM: cutting bench select rail, assigned direction 4, seed f559bebd. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'RadarKit — your daily open-source intelligence radar' },
      { name: 'description', content: 'A Git-native, Markdown-first radar for the sources you follow.' },
      { property: 'og:title', content: 'RadarKit — your daily open-source intelligence radar' },
      { property: 'og:description', content: 'Fetch, filter, store, and read the signals worth keeping.' },
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
  return <html lang="en" data-theme="light">
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
