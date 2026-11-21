# Anh Nguyen — product portfolio

A terminal-first, light-theme portfolio. The home page opens with a small shell
you can use, then leads with the tools I build for product work: **jora** (a
checked data CLI) and the **PO toolkit** (agent skills for recurring product
work). Zalopay and Project X Vietnam follow.

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

## Pages

- `/` — terminal landing, tools, career, work, public record
- `/jora` — jora and the PO toolkit
- `/zalopay` — payments, cross-border, growth
- `/project-x` — the tech talents program
- `/about` — background, skills, recognition, contact

## Structure

- `lib/content.ts` — copy, metrics, case studies, toolkit descriptions,
  recognition, gallery and links.
- `lib/terminal.ts` — the virtual filesystem and pure command runner.
- `app/components/Terminal.tsx` — landing terminal and docked command bar.
- `app/components/GuidedTry.tsx` — the illustrative jora walkthrough.
- `app/globals.css` — the single stylesheet.

## Public repositories

They are summarised in one paragraph with one GitHub profile link. There is no
repository-by-repository index, and no private tooling names, repo structure,
commit counts or company data.
