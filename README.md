# RadarKit

Open-source robotics intelligence radar.

RadarKit turns a focused robotics watchlist into a daily, searchable feed of Signals stored as Markdown in Git. The scope is intentionally narrow: no database, authentication, admin panel, or required AI key.

## Features

- RSS and Atom collection with per-source failure isolation
- Normalization, URL/title deduplication, safe Markdown generation
- Text-first reader with search, topic filters, source filters, archive, and RSS output
- Two explicit watch boundaries: humanoid robotics startups/open source and World Models for robotics
- Keyword and exclusion filtering before Markdown is written
- Optional AI boundary, disabled by default
- GitHub Actions schedule that respects `Europe/Paris` daylight saving time
- TanStack Start, React, TypeScript, Tailwind CSS, and Vercel-ready build

## Quick start

```bash
git clone https://github.com/erwancodes/radarkit
cd radarkit
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Configure your radar

1. Edit `radarkit.config.ts` to add or remove robotics RSS/Atom sources.
2. Keep the two boundary labels in `src/data/topics.ts` aligned with the watch brief.
3. Run `pnpm radar:dry-run` to fetch without writing files.
4. Run `pnpm radar:now` to generate Markdown in `content/news` immediately.
5. Enable `.github/workflows/daily-radar.yml` after forking.

The UI starts empty on purpose. The first real run writes Markdown into `content/news`, and the reader imports those files at build time.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the local reader |
| `pnpm build` | Build the TanStack Start app |
| `pnpm lint` | Run TypeScript checks |
| `pnpm test` | Run core pipeline tests |
| `pnpm radar:dry-run` | Fetch and report without writing |
| `pnpm radar:now` | Fetch and write Markdown Signals immediately |
| `pnpm radar` | Fetch and write Markdown Signals |

## Test locally

Start the reader in one terminal:

```bash
pnpm dev
```

Then, in a second terminal, test the collector without writing anything:

```bash
pnpm radar:dry-run
```

When the report looks correct, launch a real collection immediately:

```bash
pnpm radar:now
```

This writes only items matching B1 or B2 to `content/news`. Inspect the result with:

```powershell
Get-ChildItem content/news | Select-Object -First 10
```

`pnpm radar` remains available as the generic write command; `pnpm radar:now` makes the manual intent explicit.

## Optional AI

RadarKit works fully without AI. If you add an OpenRouter adapter later, keep it behind `AI_ENABLED=false` by default and only send source content needed for the requested summary or classification.

## Deploy

The app is prepared for Vercel. Set `PUBLIC_SITE_URL` to the deployment origin; the intended public domain is `https://radarkit.erwanx.com`.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the source and pipeline conventions.

## License

MIT.
