import { createFileRoute } from '@tanstack/react-router'
import { signals } from '../../data/signals'

export const Route = createFileRoute('/api/signals.json')({
  server: {
    handlers: {
      GET: () => Response.json({ generatedAt: new Date().toISOString(), signals }),
    },
  },
})
