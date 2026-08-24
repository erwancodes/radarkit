# Contributing to RadarKit

## Local setup

```bash
pnpm install
pnpm dev
```

Before opening a pull request, run:

```bash
pnpm lint
pnpm test
pnpm build
pnpm validate:news
```

## Add a source

Add a source to `radarkit.config.ts` with a stable name, a public RSS or Atom URL, and a topic. Keep the source-specific parsing in `scripts/run-radar.ts` only when the feed format genuinely requires it.

## Add a feed type

Put normalization and safety logic in `scripts/core.ts`, cover it with a focused Vitest test, and keep the failure of one source isolated from the rest of the run.

Every Markdown Signal must include a non-empty `source` and a valid HTTP(S) `sourceUrl` pointing to the official article. The `validate:news` check is part of CI and the scheduled radar workflow.

## Pull requests

Keep changes narrow, explain the user-facing impact, and avoid introducing a database, auth layer, or required external AI service. UI changes should preserve keyboard focus, reduced motion, responsive behavior, and the Signal/Source/Topic vocabulary.
