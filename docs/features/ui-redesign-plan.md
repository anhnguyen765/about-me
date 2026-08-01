# UI Redesign Plan: Editorial Personal Presence

## Direction

Create a text-led personal portfolio that feels like an editorial profile rather than a corporate résumé or generic SaaS site. The reference establishes the visual energy: an airy neutral canvas, confident serif type, crisp black text, and large blurred gradient forms. We will translate that idea into an original system rather than reproduce the reference artwork or layout.

## Audience and first impression

- **Primary:** recruiters and hiring managers assessing product capability.
- **Secondary:** communities and organisations seeking a thoughtful guest speaker or collaborator.
- **First impression:** “An interesting human with sharp product thinking.”

## Language standard

- Use **Australian English** in all navigation, page headings, interface labels, project summaries, dates, and contact copy.
- Prefer forms such as *organisation*, *optimise*, *behaviour*, and *colour*.
- Preserve Vietnamese essays and quotations in their original language; identify them clearly as Vietnamese writing where useful.

## Visual system

### Typography

- Oversized editorial serif for hero statements and section titles.
- Clean sans-serif for body copy and role/project details.
- Compact monospaced labels for dates, navigation, and categories.

### Colour and gradient language

- Soft off-white or very light cool-grey page background.
- Near-black text for clarity, with a subtle blue action accent.
- Original gradient objects made from layered CSS radial gradients using `#17CAFA` and `#0E56FA`, diffused into pale cool-grey and lavender-blue edges.
- Apply heavy blur and low opacity; gradients should sit behind content, never reduce reading contrast.

### Layout

- Compact top navigation with no promotional banner and no SaaS-style calls to action.
- A two-column hero on desktop: text as the protagonist, portrait or one gradient object as the counterweight.
- Short, high-signal homepage sections rather than a long all-content scroll.
- Reusable chapter rows linking to Work, Projects, Thinking, and Life/Gallery.

## Information hierarchy

1. **Hero:** a poetic product philosophy, current role, and a gradient-led visual field. The portrait appears later as a human counterpoint, not in the first viewport.
2. **Core strengths:** payments infrastructure, product strategy, systems thinking, and making complexity clear.
3. **Standout work:** Cross-border Payments at Zalopay (bringing a Vietnamese wallet to the world) and Project X Vietnam, each with a result or defining constraint—not a full job-history dump.
4. **Product philosophy:** a short original statement, supported by one writing excerpt.
5. **Life and presence:** selected gallery moments, teaching, awards, and a subtle conversational contact line rather than a dedicated speaker-sales call to action.

## Phases

### Phase 1: Set the system (Size: S)

**Goal:** Establish the visual rules before restyling individual pages.

- [x] Define colour tokens, gradient recipes, type scale, spacing, and responsive breakpoints in `app/globals.css`.
- [x] Update `app/layout.tsx`, `app/components/Header.tsx`, and `app/components/Footer.tsx` for the new compact shell.
- [x] Build a reusable `GradientField` component with a decorative, `aria-hidden` treatment.

**Dependency:** None.

### Phase 2: Rebuild the homepage (Size: M)

**Goal:** Give visitors the complete personal/product signal without a long scroll.

- [x] Rewrite `app/page.tsx` with the five-part information hierarchy.
- [x] Include one original cool-blue gradient field in the hero, plus one restrained supporting variation.
- [x] Make the two key paths explicit: **selected work** and a subtle **contact** line.

**Dependency:** Phase 1.

### Phase 3: Curate the proof pages (Size: M)

**Goal:** Make Work and Projects feel like selected evidence, not a résumé database.

- [x] Lead `app/work/page.tsx` with Cross-border Payments at Zalopay: the story of bringing a Vietnamese wallet to the world.
- [x] Lead `app/projects/page.tsx` with Project X Vietnam, then supporting case-study links.
- [x] Use gradients only as section punctuation; keep project imagery real and meaningful.

**Dependency:** Phases 1–2.

### Phase 4: Make the personal chapters feel intentional (Size: M)

**Goal:** Balance professional credibility with the human story.

- [x] Refine `app/about/page.tsx` around the maths → teaching → product narrative.
- [x] Align `app/thinking/page.tsx` and `app/writing/page.tsx` as a single intellectual presence.
- [x] Restyle `app/gallery/page.tsx` as a deliberate visual interlude rather than a media wall.

**Dependency:** Phase 1.

### Phase 5: Quality pass (Size: S)

**Goal:** Ensure the distinctive style remains usable and recruiter-friendly.

- [ ] Test at 375px, 768px, and 1280px.
- [ ] Check heading wrapping, gradient contrast, keyboard navigation, and reduced-motion behaviour.
- [ ] Remove any section that repeats the same story or makes the homepage feel long.

**Dependency:** Phases 2–4.

## Guardrails

- No generic feature cards, dashboard motifs, logo strips, or fake client/social-proof blocks.
- No more than two prominent gradient fields per page; all should use the cool-blue palette.
- No gradient behind dense text or body copy.
- Keep the homepage to five concise sections after the hero.
- Use only real work, personal imagery, and claims that Anh can stand behind.
