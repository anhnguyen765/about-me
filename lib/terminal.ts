import { CONNECT, CONTACT, JORA_WHY, TOOLS_IN_USE, PROJECT_X_WHY, ZALOPAY_ACTIVITIES } from "./content";

const whyText = (w: { title: string; body: string }[]) =>
  w.map((x, i) => `${i + 1}. ${x.title}\n   ${x.body}`).join("\n\n");

/**
 * A tiny virtual file system so the site itself is something you can explore
 * with real shell commands: pwd, ls, cd, cat, grep, echo.
 * Pure functions only; side effects (navigate, open, copy, stream) are returned.
 */

const PROMPTS: Record<string, string> = {
  "root-cause.md": `You are a product analyst. A metric moved: <metric> went from <A> to <B> over <period>.
1. List 5 hypotheses, split into: data issue, mix shift, product change, external, noise.
2. For each, name the one query or cut that would confirm or kill it.
3. Rank by (likelihood x cost to check). Start with the cheapest.
Do not recommend a fix until one hypothesis survives.`,
  "stress-test.md": `Act as a skeptical staff PM. Here is my plan: <plan>.
Ask me the 5 questions most likely to change it, one at a time.
After my answers, name the weakest assumption and the smallest test that would settle it.`,
  "one-pager.md": `Turn these notes into a one-page product brief: <notes>.
Sections: problem, who is affected, evidence, non-goals, success metric (with a baseline),
the smallest version that could work, open questions.
Flag every claim that has no evidence behind it.`,
};

const FILES: Record<string, string> = {
  "about/tools.txt": TOOLS_IN_USE.map((t) => `${t.name.padEnd(8)} ${t.role}`).join("\n"),
  "about/readme.txt": `Anh Nguyen
Product person. Started as an engineer.
Product at Zalopay · tech talents program at Project X Vietnam.
Brisbane / Ho Chi Minh City.`,
  "zalopay/readme.txt": `Zalopay · product · Nov 2025 - now
Payments at scale: payment core, cross-border, growth.
5M+ transactions a day · 11 markets · 8+ funding sources
try it: open zalopay`,
  "zalopay/activities.txt": ZALOPAY_ACTIVITIES.map((a) => `${a.title}\n  ${a.href}`).join("\n"),
  "zalopay/principles.txt": `1. Reliability is the product.
2. Systems, not features.
3. Measure, then decide.`,
  "project-x/readme.txt": `Project X Vietnam · building the tech talents program · Nov 2024 - now
Started as a fellow in the summer fellowship program.
6,000+ tech talents reached (2025) · 85+ mentors · 60+ partner companies
partner with the program: open partner`,
  "writing/readme.txt": `Essays on product, tech and AI. Synced from Substack.
open the list: cd writing   ·   subscribe: open substack`,
  "jora/why.txt": whyText(JORA_WHY),
  "project-x/why.txt": whyText(PROJECT_X_WHY),
  "jora/readme.txt": `jora · my data CLI for product work
- find the source, run the read-only query, check the result
- computed answers reach the model, not raw tables
Private. Described only in general terms.`,
  "po-toolkit/readme.txt": `PO toolkit · agent skills for recurring product work
- discovery, prioritisation, requirements, analytics, go-live readiness
- structured inputs, reviewable drafts, approval before any shared write
Private. Described only in general terms.`,
  ...Object.fromEntries(
    Object.entries(PROMPTS).map(([k, v]) => [`prompts/${k}`, v]),
  ),
};

const DIRS = ["jora", "po-toolkit", "zalopay", "project-x", "writing", "about", "prompts"];
const PAGES: Record<string, string> = {
  about: "/about",
  jora: "/jora",
  "po-toolkit": "/jora#po-toolkit",
  "project-x": "/project-x",
  zalopay: "/zalopay",
  writing: "/writing",
};
const LINKS: Record<string, string> = {
  substack: CONTACT.substack,
  github: CONTACT.github,
};

const EXTERNAL = {
  partner: CONNECT.partnerMail,
  zalopay: CONNECT.zalopay,
  substack: CONTACT.substack,
  github: CONTACT.github,
  linkedin: CONTACT.linkedin,
  email: `mailto:${CONTACT.email}`,
} as const;

export type TerminalContext = { cwd: string };

export type TerminalResult = {
  lines: string[];
  navigate?: string;
  open?: string;
  copy?: string;
  /** Switch the site theme: light, dark, or follow the device. */
  theme?: "light" | "dark" | "auto";
  cwd?: string;
  /** Lines revealed one by one, like a recorded session. */
  stream?: { lines: string[]; delay: number };
};

export const COMMANDS = [
  "help", "ls", "cd", "pwd", "cat", "grep", "echo",
  "whoami", "open", "learn", "demo", "prompt", "jora", "theme", "clear",
];

export const promptLabel = (cwd: string) => (cwd === "~" ? "~" : `~/${cwd}`);

function resolve(cwd: string, arg: string): string {
  let base = cwd === "~" ? [] : cwd.split("/");
  let a = arg;
  if (a === "~" || a.startsWith("~/")) {
    base = [];
    a = a.slice(2);
  }
  for (const seg of a.split("/").filter(Boolean)) {
    if (seg === ".") continue;
    if (seg === "..") base.pop();
    else base.push(seg);
  }
  return base.join("/");
}

function entries(path: string): { name: string; kind: "d" | "-" | "l" }[] {
  if (path === "") {
    return [
      ...DIRS.map((d) => ({ name: `${d}/`, kind: "d" as const })),
      ...Object.keys(LINKS).map((l) => ({ name: l, kind: "l" as const })),
    ];
  }
  const prefix = `${path}/`;
  return Object.keys(FILES)
    .filter((f) => f.startsWith(prefix) && !f.slice(prefix.length).includes("/"))
    .map((f) => ({ name: f.slice(prefix.length), kind: "-" as const }));
}

const LESSONS: { title: string; body: string[] }[] = [
  {
    title: "where am I?",
    body: [
      "pwd        print where you are",
      "ls         list what's here",
      "ls -l      long format: d = folder, l = link, - = file",
      "",
      "try: ls -l",
    ],
  },
  {
    title: "move around",
    body: [
      "cd <folder>   move in (here it also opens that page)",
      "cd ..         go up one level",
      "cd ~          go home",
      "",
      "try: cd zalopay   then: ls",
    ],
  },
  {
    title: "read a file",
    body: [
      "cat <file>    print a file",
      "Paths are relative to where you are.",
      "",
      "try: cat zalopay/readme.txt",
    ],
  },
  {
    title: "search",
    body: [
      "grep <word> <file>   print the lines that match (case-insensitive here)",
      "",
      "try: grep markets zalopay/readme.txt",
    ],
  },
  {
    title: "your turn",
    body: [
      "These are the same commands engineers use every day.",
      "Next: prompt root-cause   prints a prompt you can paste into any AI assistant.",
      "Or: demo                  watch a short session.",
      "Or: jora                  try my data CLI.",
      "Or: cd po-toolkit         the agent skills around it.",
    ],
  },
];

const DEMO: string[] = [
  "# illustrative session: how I approach a product question (no real data)",
  '$ jora scout "why did checkout conversion dip last week?"',
  "✓ 3 candidate sources · picked checkout_funnel_daily",
  "$ jora run --source checkout_funnel_daily --by device",
  "✓ 12 rows in 4.2s",
  "$ jora check",
  "✓ row counts reconcile · no duplicate keys · date range complete",
  '$ echo "dip sits in one device class. look at the failure path, not the funnel."',
  "dip sits in one device class. look at the failure path, not the funnel.",
  "# that's it. no pitch. type 'learn' to try the commands yourself.",
];

const JORA_USAGE = [
  "jora: my local data CLI (illustrative, no real data)",
  '  jora scout "<question>"   find the right data source',
  "  jora run [--by <field>]   run the query, read-only",
  "  jora check                verify the result before it is used",
  "# try them in order. each step is small on purpose.",
];

export const WELCOME = [
  "# hi. this terminal is a small playground.",
  "# the site is a folder you can explore: try  ls  or  cat about/readme.txt",
  "# new to the shell? type  learn  ·  my own tools: type  jora  or  cd po-toolkit",
];

export function run(input: string, ctx: TerminalContext = { cwd: "~" }): TerminalResult {
  const [cmd = "", ...args] = input.trim().split(/\s+/);
  const flags = args.filter((a) => a.startsWith("-"));
  const rest = args.filter((a) => !a.startsWith("-"));

  switch (cmd.toLowerCase()) {
    case "":
      return { lines: [] };

    case "help":
      return {
        lines: [
          "learn [n]        5 short lessons on the shell",
          "demo             watch a short session",
          "prompt [name]    sample AI prompts (copies to clipboard)",
          "jora             try my data CLI (illustrative)",
          "po-toolkit       agent skills for product work (cd po-toolkit)",
          "ls [-l] [dir]    list · pwd  where am i",
          "cd <dir>         move (opens the page too) · cd ~  home",
          "cat <file>       print a file · grep <word> <file>",
          "open <name>      partner | zalopay | substack | github | linkedin | email",
          "theme [mode]     light | dark | auto (follow your device)",
          "whoami · echo · clear",
        ],
      };

    case "pwd":
      return { lines: [promptLabel(ctx.cwd)] };

    case "whoami":
      return { lines: ["anh nguyen: engineer-minded product person, chasing good products."] };

    case "echo":
      return { lines: [rest.join(" ")] };

    case "ls": {
      const path = resolve(ctx.cwd, rest[0] ?? ".");
      if (path !== "" && !DIRS.includes(path)) {
        return { lines: [`ls: ${rest[0]}: no such directory`] };
      }
      const list = entries(path);
      if (flags.includes("-l")) {
        return {
          lines: [
            `total ${list.length}`,
            ...list.map((e) => {
              const perms =
                e.kind === "d" ? "drwxr-xr-x" : e.kind === "l" ? "lrwxr-xr-x" : "-rw-r--r--";
              return `${perms}  ${e.name}`;
            }),
          ],
        };
      }
      return { lines: [list.map((e) => e.name).join("   ")] };
    }

    case "cd": {
      const arg = rest[0] ?? "~";
      const path = resolve(ctx.cwd, arg);
      if (path === "") return { lines: [], cwd: "~", navigate: "/" };
      if (DIRS.includes(path)) {
        return { lines: [], cwd: path, navigate: PAGES[path] };
      }
      if (path in FILES) return { lines: [`cd: ${arg}: not a directory`] };
      return { lines: [`cd: no such directory: ${arg}`] };
    }

    case "cat": {
      if (!rest[0]) return { lines: ["usage: cat <file>   (try: cat about/readme.txt)"] };
      const path = resolve(ctx.cwd, rest[0]);
      if (path in LINKS) return { lines: [LINKS[path]] };
      if (path in FILES) return { lines: FILES[path].split("\n") };
      return { lines: [`cat: ${rest[0]}: no such file`] };
    }

    case "grep": {
      const [word, file] = rest;
      if (!word || !file) return { lines: ["usage: grep <word> <file>"] };
      const path = resolve(ctx.cwd, file);
      if (!(path in FILES)) return { lines: [`grep: ${file}: no such file`] };
      const hits = FILES[path]
        .split("\n")
        .filter((l) => l.toLowerCase().includes(word.toLowerCase()));
      return { lines: hits.length ? hits : [`(no lines match "${word}")`] };
    }

    case "open": {
      const name = (rest[0] ?? "").toLowerCase();
      if (name in EXTERNAL) {
        return { lines: [`opening ${name}…`], open: EXTERNAL[name as keyof typeof EXTERNAL] };
      }
      return { lines: ["usage: open partner | zalopay | substack | github | linkedin | email"] };
    }

    case "learn": {
      const n = Number(rest[0]);
      if (!rest[0]) {
        return {
          lines: [
            "# five short lessons. each one ends with a command to try.",
            ...LESSONS.map((l, i) => `  learn ${i + 1}   ${l.title}`),
          ],
        };
      }
      const lesson = LESSONS[n - 1];
      if (!lesson) return { lines: ["learn: pick 1-5"] };
      return {
        lines: [
          `# lesson ${n}/${LESSONS.length}: ${lesson.title}`,
          ...lesson.body,
          ...(n < LESSONS.length ? ["", `# next: learn ${n + 1}`] : []),
        ],
      };
    }

    case "jora": {
      const sub = rest[0]?.toLowerCase();
      if (sub === "scout") {
        return {
          lines: [],
          stream: {
            lines: [
              "… reading the data catalogue",
              "✓ 3 candidate sources · picked checkout_funnel_daily",
              "# next: jora run",
            ],
            delay: 550,
          },
        };
      }
      if (sub === "run") {
        const by = args[args.indexOf("--by") + 1];
        return {
          lines: [],
          stream: {
            lines: [
              "… running a read-only query" + (args.includes("--by") && by ? ` by ${by}` : ""),
              "✓ 12 rows in 4.2s",
              "# next: jora check",
            ],
            delay: 550,
          },
        };
      }
      if (sub === "check") {
        return {
          lines: [],
          stream: {
            lines: [
              "… checking the result",
              "✓ row counts reconcile",
              "✓ no duplicate keys",
              "✓ date range complete",
              "# safe to use. credentials were never printed.",
            ],
            delay: 450,
          },
        };
      }
      return { lines: JORA_USAGE };
    }

    case "theme": {
      const mode = rest[0]?.toLowerCase();
      if (mode === "light" || mode === "dark") {
        return { lines: [`theme: ${mode}`], theme: mode };
      }
      if (mode === "auto" || mode === "system") {
        return { lines: ["theme: auto (follows your device)"], theme: "auto" };
      }
      if (!mode) return { lines: ["usage: theme light | dark | auto", "# the ◐ button in the top bar does the same"] };
      return { lines: [`theme: unknown mode "${rest[0]}". try: light | dark | auto`] };
    }

    case "demo":
      return { lines: [], stream: { lines: DEMO, delay: 650 } };

    case "prompt": {
      const name = rest[0]?.replace(/\.md$/, "");
      if (!name) {
        return {
          lines: [
            "# sample prompts for product work. paste them into any AI assistant.",
            ...Object.keys(PROMPTS).map((p) => `  prompt ${p.replace(".md", "")}`),
          ],
        };
      }
      const body = PROMPTS[`${name}.md`];
      if (!body) return { lines: [`prompt: unknown prompt "${name}". try: prompt`] };
      return { lines: [...body.split("\n"), "", "# copied to clipboard"], copy: body };
    }

    default:
      return { lines: [`${cmd}: command not found. try 'help'`] };
  }
}

/** Tab completion for the command name and for path-like arguments. */
export function complete(input: string, cwd = "~"): string | null {
  const parts = input.split(/\s+/);
  const last = parts[parts.length - 1];
  let pool: string[] = [];

  if (parts.length === 1) pool = COMMANDS;
  else if (parts[0] === "open") pool = Object.keys(EXTERNAL);
  else if (parts[0] === "theme") pool = ["light", "dark", "auto"];
  else if (parts[0] === "prompt") pool = Object.keys(PROMPTS).map((p) => p.replace(".md", ""));
  else if (["cd", "ls", "cat", "grep"].includes(parts[0])) {
    const slash = last.lastIndexOf("/");
    const dirPart = slash >= 0 ? last.slice(0, slash + 1) : "";
    const dirPath = resolve(cwd, dirPart || ".");
    const base = last.slice(slash + 1).toLowerCase();
    const names = entries(dirPath).map((e) => e.name);
    const hits = names.filter((n) => n.toLowerCase().startsWith(base));
    if (hits.length !== 1) return null;
    return [...parts.slice(0, -1), dirPart + hits[0]].join(" ");
  }

  const hits = pool.filter((p) => p.startsWith(last.toLowerCase()));
  if (hits.length !== 1) return null;
  return [...parts.slice(0, -1), hits[0]].join(" ");
}
