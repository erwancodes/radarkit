export type RadarSourceConfig = {
  name: string
  url: string
  topic: 'B1' | 'B2'
  scope: 'b1' | 'b2'
  kind: 'rss' | 'atom'
}

export const radarScopes = {
  b1: {
    name: 'B1 — Startups robotique & open source humanoïde',
    keywords: [
      'robot',
      'robotics',
      'humanoid',
      'humanoïde',
      'open source',
      'opensource',
      'lerobot',
      'robotis',
      'figure ai',
      'unitree',
      'industrial robot',
      'industrialisation',
      'industrialization',
    ],
    exclusions: ['military', 'militaire', 'weapon', 'weapons', 'warfare', 'toy robot', 'toy robots', 'pet robot'],
  },
  b2: {
    name: 'B2 — World Models IA pour la robotique',
    keywords: [
      'world model',
      'world models',
      'physical ai',
      'embodied ai',
      'simulation',
      'synthetic data',
      'données synthétiques',
      'reinforcement learning',
      'robot learning',
      'robot foundation model',
      'omniverse',
      'cosmos',
      'robotics',
      'robotique',
    ],
    exclusions: ['general-purpose llm', 'generalist llm', 'text-only chatbot', 'chatbot généraliste'],
  },
} as const

export const radarConfig = {
  siteUrl: process.env.PUBLIC_SITE_URL ?? 'http://localhost:3000',
  timezone: 'Europe/Paris',
  schedule: '0 5 * * *',
  sources: [
    {
      name: 'NVIDIA Robotics',
      url: 'https://nvidianews.nvidia.com/cats/robotics.xml',
      topic: 'B1',
      scope: 'b1',
      kind: 'rss',
    },
    {
      name: 'The Robot Report',
      url: 'https://www.therobotreport.com/feed/',
      topic: 'B1',
      scope: 'b1',
      kind: 'rss',
    },
    {
      name: 'ROS Discourse',
      url: 'https://discourse.ros.org/latest.rss',
      topic: 'B1',
      scope: 'b1',
      kind: 'rss',
    },
    {
      name: 'Google DeepMind',
      url: 'https://deepmind.google/blog/rss.xml',
      topic: 'B2',
      scope: 'b2',
      kind: 'rss',
    },
    {
      name: 'NVIDIA Developer',
      url: 'https://developer.nvidia.com/blog/feed/',
      topic: 'B2',
      scope: 'b2',
      kind: 'atom',
    },
    {
      name: 'Robotic Lifestyle — AI & ML',
      url: 'https://roboticlifestyle.com/api/rss/ai-ml',
      topic: 'B2',
      scope: 'b2',
      kind: 'rss',
    },
    {
      name: 'Robotic Lifestyle — Humanoïdes',
      url: 'https://roboticlifestyle.com/api/rss/humanoids',
      topic: 'B1',
      scope: 'b1',
      kind: 'rss',
    },
  ] satisfies RadarSourceConfig[],
  ai: {
    enabled: process.env.AI_ENABLED === 'true',
    model: process.env.AI_MODEL ?? '',
  },
} as const
