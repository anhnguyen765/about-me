# Surface / System — one-page portfolio

## Audit

Reused: the existing portrait (`public/ava.jpeg`), 14 gallery photographs, four
competition decks (`public/proposals`), four Project X design pieces
(`public/graphicdesign`), the Substack essay, and the verified contact links.
Removed: the five-route shell (`/work`, `/projects`, `/thinking`, `/about`,
`/gallery`) and the gradient-field components. Those routes redirect to anchors
on the one-pager.

## Direction

Surface: warm paper, Inter, oversized editorial type, generous air.
System: same paper, grid made visible, JetBrains Mono spec labels, diagrams and
hidden technical layers. One signal colour (`#c93408` on paper, `#ff5a2b` on
ink) is reserved for live state: prompt, cursor, active flows, wins, cat eyes.
A muted rust is used only for failure.

Type pairing: Inter (display + body), JetBrains Mono (terminal, metadata,
system labels). No third family.

## Landing

Full-viewport ink terminal, auto-typed boot script under six seconds, ASCII cat
breathing beside the prompt. Any key, click, wheel or scroll skips. The panel
FLIPs into the docked command palette. `sessionStorage` turns repeat visits
straight into the docked state. Reduced motion renders the final frame and
fades. No JS renders the full page and hides the terminal.

## Architecture

- `lib/content.ts`: typed source of truth for metrics, roles, case studies,
  builds, timeline, repos, recognition, contact.
- `lib/terminal/commands.ts`: pure command registry + `runCommand`.
  Side effects are declarative (`scroll`, `system`, `open`, `copy`, `stream`,
  `grep`, `cat-walk`) and executed by the React shell.
- `components/TerminalExperience.tsx`: boot, FLIP, dock, input, history,
  autocomplete, chips, effects.
- CSS variables drive Surface / System; `data-system` on `<html>` reveals the
  system layers without a re-render.
- Hero: hand-built canvas (transaction flows, reroutes, paw particles,
  cursor reactivity), pausing off-screen.
- Builds: jora and the PO toolkit lead, as internal systems with general
  capability and guardrails only. Public repositories are summarised in one
  paragraph with one profile link, never listed one by one.

## Content schema

```ts
type Metric = { value: string; label: string; note?: string };
type CaseStudy = {
  id: string;
  section: "payments" | "cross-border" | "growth";
  title: string;
  severity: "high" | "medium";
  owner: string;
  status: string;
  context: string;
  signal: string;
  rootCause: string;
  decision: string;
  outcome: string;
  system: string[];
  tags: string[];
};
type Build = { id: string; name: string; meta: string; privacy: "public" | "private"; summary: string; stack: string[]; };
type TimelineEntry = { date: string; scope: string; message: string };
type Repo = { name: string; language: string | null; updatedAt: string; url: string; fork: boolean };
```

## Footer checks

Placeholders, accessibility and performance results are tracked in
`docs/features/surface-system-checklist.md`.
