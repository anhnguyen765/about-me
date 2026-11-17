# Anh Nguyen — one-page portfolio

A long-scroll, editorial portfolio with a terminal introduction and a
Surface / System view toggle. Built with Next.js 16, TypeScript and hand-built
canvas/SVG interactions.

## Run

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Structure

- `lib/content.ts` — the single source of truth for copy, metrics, case studies,
  the two internal systems (jora and the PO toolkit), recognition and links.
- `lib/terminal/` — the pure command registry, boot script and command tests.
- `app/components/sections/` — the eight chapters of the one-pager.
- `app/styles/` — global foundation, terminal, sections and the System layer.

Old routes (`/work`, `/projects`, `/thinking`, `/writing`, `/about`, `/gallery`)
redirect to anchors on the one-pager. Public repositories are summarised, not
listed; the internal systems lead the builds chapter.

## Placeholders

Unverified content is marked in square brackets in the UI. The tracked list lives
in `docs/features/surface-system-checklist.md`.
