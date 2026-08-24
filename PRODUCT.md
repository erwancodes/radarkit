# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: TanStack Start, React, TypeScript, Tailwind CSS, Markdown content, and GitHub Actions as specified in the project brief.

## Users

Developers, researchers, and technically curious readers who want to follow a focused set of information sources without maintaining a hosted database or a proprietary dashboard.

## Product Purpose

RadarKit turns configured information sources into a daily, searchable feed of Signals stored as Markdown files in Git. Success means a person can fork the repository, edit their sources and topics, run the radar, and read the resulting feed from a lightweight web interface.

## Positioning

RadarKit is a Git-native, Markdown-first intelligence radar: the repository and its generated files are the source of truth, not a SaaS account, CMS, or database.

## Operating Context

Users configure sources in repository files, run the collection pipeline locally or from GitHub Actions, review generated Markdown, and deploy the reader to a static-friendly host such as Vercel. The official instance is planned for radarkit.erwanx.com.

## Capabilities and Constraints

- Signals are normalized, deduplicated, categorized, and written as Markdown with frontmatter.
- The frontend reads Markdown content and supports home feed, Signal detail, Topics, topic detail, Sources, Archive, About, search, and lightweight filters.
- The MVP has no database, authentication, admin panel, payment system, or required AI provider.
- AI is an optional provider abstraction controlled by environment variables and must not be called when disabled.
- The core vocabulary is Signal, Topic, Source, and Radar; avoid collapsing every concept into article.
- The daily workflow should run at 05:00 Europe/Paris, support manual dispatch, tolerate individual feed failures, and avoid empty commits.
- External content must be validated and cleaned before it is persisted.

## Brand Commitments

The product name is RadarKit. The project is open source, developer-friendly, sober, slightly editorial, and intentionally avoids cyberpunk, neon-heavy gradients, excessive glassmorphism, and enterprise dashboard conventions.

## Evidence on Hand

The supplied project specification is the source of product truth. No production feed data, logo asset, testimonials, or external proof were supplied; illustrative Signals in the MVP must be treated as synthetic demonstration content.

## Product Principles

- Fork first: the path from repository to personal radar should be obvious.
- Read the signal: information hierarchy and source traceability matter more than decorative metrics.
- Git is the system: generated Markdown should stay inspectable, portable, and versioned.
- No lock-in: the no-AI, no-database baseline remains complete and useful.
- Small surface, strong signal: every control should help discover, filter, or understand information.

## Accessibility & Inclusion

Use semantic HTML, visible keyboard focus, sufficient contrast, labeled controls, responsive layouts, and a reduced-motion mode that preserves state changes and hierarchy.
