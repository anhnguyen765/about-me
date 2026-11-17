# Surface / System — launch checklist

Status of the one-page rebuild: placeholders, accessibility and performance.

## 1. Placeholders

No placeholder is a link. Every one is visible as bracketed text or a short
inline note, so a reader can tell the difference between a verified number and a
gap.

| Placeholder | Where it appears | Blocking launch? |
| --- | --- | --- |
| `[CV PDF]` | Human / contact block; `open cv` terminal command | Yes, before publishing the CV link |
| `[BABYWHY PUBLIC ENDPOINT]` | BabyWhy build card; `babywhy` command | No, demo is explicitly labelled |
| `[FIELD PHOTO 01]`, `[FIELD PHOTO 02]` | Cross-border field notes | No, layout reserves the space |
| `[CAT NAME(S)]`, `[CAT PHOTO]` | `/cats` block | No |
| `[OLIU STACK]`, `[WHAT I’D DO DIFFERENTLY]` | OLIU build card, system view | No |
| `[LAST DEPLOY]` | Footer; `cat colophon.txt` | No, CI can replace it |
| `[LIGHTHOUSE SCORES — TO MEASURE]` | `cat colophon.txt` | No, pending a browser run |
| `[P90 LATENCY]`, `[REFUNDS BY FUNDING SOURCE]`, `[MONTH]`, `[STATUS]` | Payments operator report | No, report is labelled illustrative |
| `[FIX 01]`, `[FIX 02]`, `[A/B TEST PLAN]` | Onboarding funnel note | No |
| `[RANDOMISED TEST DESIGN]` | Removed with the old repo index | — |
| `[CAPSTONE ONE-LINER]`, `[VCESpesh]` | Removed with the old repo index | — |

Also intentional:

- BabyWhy live URL is a labelled placeholder; the terminal demo is scripted.
- Internal systems are described at the level of capability and guardrails. No
  private workflow names, repo structure, commit counts, screenshots or company
  data are exposed.
- Public repositories are summarised in one paragraph with one profile link.
  They are not listed repository by repository.
- jora and the PO toolkit lead the builds chapter; the public record sits at the
  bottom as context.

## 2. Accessibility

| Check | Result |
| --- | --- |
| Semantic landmarks | `header`, `nav`, `main`, `section` with `aria-labelledby`, `footer` |
| Skip path | `.skip-link` to `#main`, visible on focus |
| Heading order | One `h1` in the hero; chapter `h2` and card `h3` below |
| Terminal access | Command palette is a labelled region with a form input, `role="log"`, live region, chips and keyboard history |
| Keyboard paths | `/` and `⌘K` open the palette; `Esc` closes; `Tab` completes; `↑`/`↓` history; `S` toggles Surface / System; skip link first |
| Focus visibility | Global `:focus-visible` outline in signal colour |
| Screen-reader summary | `#terminal-summary` describes the intro and the palette without reading the boot animation |
| Reduced motion | Boot renders the final frame; FLIP is skipped; canvas draws one static frame; cat/canvas/diagram animations are disabled; smooth scroll becomes instant |
| No JavaScript | `<noscript>` hides boot, dock, toggle, cat and wipe; full page and anchors remain |
| Charts and diagrams | Every canvas is `aria-hidden`; the code textile has `role="img"` with title and description; interactive figures have text labels and `figcaption` |
| Colour contrast | Ink on paper and paper on ink meet AA for body text; muted tones are used for metadata only; signal is never the sole carrier of meaning |
| Touch targets | Buttons and links use padded controls; mobile nav is a native `details` element |
| Language | `lang="en"`; Vietnamese essay title is quoted content, not a page language switch |

Manual follow-ups before launch:

1. Run axe or Lighthouse accessibility in a real browser.
2. Check the boot screen with VoiceOver at 200% zoom.
3. Confirm the command palette does not trap focus after close.
4. Confirm the `S` shortcut does not fire while typing in any input.

## 3. Performance

| Check | Result |
| --- | --- |
| Rendering | `/` is statically prerendered; `/work`, `/projects`, `/thinking`, `/writing`, `/about`, `/gallery` are 308 redirects to anchors |
| Fonts | Inter + JetBrains Mono via `next/font` with `display: swap`; no third family |
| Hero canvas | Pauses when off-screen or the tab is hidden; one static frame under reduced motion; no layout shift from resize |
| Layout stability | Fixed header height token, reserved media boxes, explicit SVG viewBoxes, no late-injected banners |
| Terminal | Boot is CSS/JS only, no motion library; safety exit at 6.8s; repeat visits skip via CSS and `sessionStorage` |
| JavaScript | Root framework payload ≈ 123 KB gzip + 39 KB polyfill; route chunks split by Next |
| HTML | ≈ 40 KB gzip for the full one-pager |
| Build | `next build` compiled in 3.2s; 4 static routes generated |
| Budgets | LCP target < 2.0s, CLS ≈ 0, INP target < 200 ms |

Verification run:

```text
npm run typecheck   pass
npm run lint        pass
npm test            11 passed
npm run build       pass
```

LCP and field INP were **not measured in this headless environment**. The next
step is one Lighthouse mobile run against the Vercel preview and, if LCP exceeds
2.0s, subset the two Google font families or move the hero canvas behind an
intersection-triggered import. Record the scores in `cat colophon.txt` when they
exist.
