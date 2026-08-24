import type { Topic } from '../lib/types'

export const topics: Topic[] = [
  {
    slug: 'ai',
    name: 'AI',
    description: 'Models, research, agents, and the tools around them.',
    count: 4,
    accent: 'signal',
  },
  {
    slug: 'robotics',
    name: 'Robotics',
    description: 'Machines moving from the lab into the physical world.',
    count: 2,
    accent: 'neutral',
  },
  {
    slug: 'space',
    name: 'Space',
    description: 'Missions, instruments, and the next edge of the map.',
    count: 3,
    accent: 'neutral',
  },
  {
    slug: 'astronomy',
    name: 'Astronomy',
    description: 'Signals from a sky that keeps getting more precise.',
    count: 1,
    accent: 'neutral',
  },
  {
    slug: 'dev',
    name: 'Dev',
    description: 'Open source, platforms, and the craft of shipping.',
    count: 3,
    accent: 'neutral',
  },
  {
    slug: 'science',
    name: 'Science',
    description: 'Findings worth keeping within reach.',
    count: 2,
    accent: 'neutral',
  },
]
