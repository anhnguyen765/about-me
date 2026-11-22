"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CONTACT } from "@/lib/content";
import { complete, promptLabel, run, WELCOME } from "@/lib/terminal";
import TermBar, { RunCat } from "./TermBar";
import { applyTheme } from "./theme";

type Entry = {
  perms: string;
  name: string;
  href: string;
  hint: string;
  external?: boolean;
};

const ENTRIES: Entry[] = [
  { perms: "drwxr-xr-x", name: "jora/", href: "/jora", hint: "my data CLI" },
  { perms: "drwxr-xr-x", name: "po-toolkit/", href: "/jora#po-toolkit", hint: "agent skills" },
  { perms: "drwxr-xr-x", name: "zalopay/", href: "/zalopay", hint: "payments, the technical one" },
  { perms: "drwxr-xr-x", name: "project-x/", href: "/project-x", hint: "tech talents program" },
    { perms: "drwxr-xr-x", name: "writing/", href: "/writing", hint: "essays, synced from Substack" },
  { perms: "lrwxr-xr-x", name: "substack", href: CONTACT.substack, hint: "the source ↗", external: true },
  { perms: "lrwxr-xr-x", name: "github", href: CONTACT.github, hint: "public repos ↗", external: true },
];

const DOCK_KEY = "anh.docked";
const CHIPS = ["help", "learn", "demo", "prompt", "jora", "theme"];
const idx = (i: number) => ({ "--i": i }) as React.CSSProperties;

function Listing({ pathname, onPick }: { pathname: string; onPick?: () => void }) {
  return (
    <>
      <p className="ls-total ls-row" style={idx(0)}>
        total {ENTRIES.length}
      </p>
      <ul>
        {ENTRIES.map((e, i) => (
          <li key={e.name} className="ls-row" style={idx(i + 1)}>
            <Link
              href={e.href}
              title={e.hint}
              aria-current={e.href === pathname ? "page" : undefined}
              onClick={e.external ? undefined : onPick}
              {...(e.external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              <span className="ls-perms">{e.perms}</span>
              <span className="ls-name">{e.name}</span>
              <span className="ls-hint-inline">{e.hint}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

type InputProps = {
  value: string;
  setValue: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  id: string;
  prompt: string;
  placeholder?: string;
};

function PromptInput({ value, setValue, onSubmit, onKeyDown, inputRef, id, prompt, placeholder }: InputProps) {
  return (
    <form onSubmit={onSubmit} className="cmd-form">
      <label htmlFor={id} className="cmd-prompt">
        {prompt} $
      </label>
      <input
        id={id}
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder ?? "cd zalopay"}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        aria-label="Terminal command"
      />
    </form>
  );
}

function lineClass(text: string) {
  if (text.startsWith("$ ")) return "tl tl-cmd";
  if (text.startsWith("#")) return "tl tl-note";
  if (text.startsWith("✓")) return "tl tl-ok";
  return "tl";
}

type Part = { t: string; b?: boolean };
const WHY: Part[][] = [
  [
    { t: "Why a terminal?", b: true },
    { t: " Most people only open one if they are developers. I think that wall is mostly habit, not difficulty." },
  ],
  [{ t: "I like sharing what I know, so I put it where you can try the terminal safely. Nothing you type can break anything." }],
];
const TYPE_MS = 18;
const TOTAL = WHY.flat().reduce((n, p) => n + p.t.length, 0);
let offset = 0;
const STARTS: number[][] = WHY.map((parts) =>
  parts.map((p) => {
    const at = offset;
    offset += p.t.length;
    return at;
  }),
);

/** Types the narrative out. The untyped rest stays in the layout (transparent), so nothing jumps. */
function TypedWhy({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (n >= TOTAL) onDone();
  }, [n, onDone]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(TOTAL);
      return;
    }
    const id = window.setInterval(() => {
      setN((v) => {
        if (v >= TOTAL) {
          window.clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, TYPE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      {WHY.map((parts, i) => (
        <p key={i}>
          {parts.map((part, j) => {
            const from = STARTS[i][j];
            const shown = Math.max(0, Math.min(part.t.length, n - from));
            const typing = n >= from && n < from + part.t.length;
            const Tag = part.b ? "b" : "span";
            return (
              <Tag key={j}>
                {part.t.slice(0, shown)}
                {typing && <span className="tw-caret" aria-hidden="true" />}
                <span className="tw-rest">{part.t.slice(shown)}</span>
              </Tag>
            );
          })}
        </p>
      ))}
    </>
  );
}

export default function Terminal() {
  const router = useRouter();
  const pathname = usePathname();
  const landingRef = useRef<HTMLInputElement>(null);
  const floatRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const history = useRef<string[]>([]);
  const cursor = useRef(-1);
  const timers = useRef<number[]>([]);

  const [docked, setDocked] = useState(false);
  const [ready, setReady] = useState(false);
  const [typed, setTyped] = useState(false);
  const finishTyping = useCallback(() => setTyped(true), []);
  const [leaving, setLeaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [big, setBig] = useState(false);
  const [value, setValue] = useState("");
  const [cwd, setCwd] = useState("~");
  const [log, setLog] = useState<string[]>([]);

  const showLanding = pathname === "/" && !docked;

  const dock = useCallback(() => {
    try {
      sessionStorage.setItem(DOCK_KEY, "1");
    } catch {}
    document.documentElement.dataset.docked = "1";
    setLeaving(true);
    window.setTimeout(() => setDocked(true), 350);
  }, []);

  const openTerminal = useCallback(() => {
    setOpen(true);
    setLog((l) => (l.length ? l : WELCOME));
  }, []);

  // Returning visitors skip the landing (an inline script already hid it).
  useEffect(() => {
    try {
      if (sessionStorage.getItem(DOCK_KEY) === "1") setDocked(true);
    } catch {}
  }, []);

  useEffect(() => {
    if (showLanding && ready) landingRef.current?.focus();
  }, [showLanding, ready]);

  useEffect(() => {
    if (open) floatRef.current?.focus();
  }, [open]);

  // Phones: pin the terminal to the visible area so the on-screen keyboard never covers it.
  useEffect(() => {
    if (!open) return;
    const vv = window.visualViewport;
    const root = document.documentElement;
    const sync = () => {
      root.style.setProperty("--vv-h", `${vv ? vv.height : window.innerHeight}px`);
      root.style.setProperty("--vv-top", `${vv ? vv.offsetTop : 0}px`);
    };
    sync();
    root.dataset.termOpen = "1";
    vv?.addEventListener("resize", sync);
    vv?.addEventListener("scroll", sync);
    return () => {
      vv?.removeEventListener("resize", sync);
      vv?.removeEventListener("scroll", sync);
      delete root.dataset.termOpen;
      root.style.removeProperty("--vv-h");
      root.style.removeProperty("--vv-top");
    };
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [log, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        if (showLanding) landingRef.current?.focus();
        else if (open) floatRef.current?.focus();
        else openTerminal();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showLanding, open, openTerminal]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function exec(input: string) {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    history.current.unshift(input);
    cursor.current = -1;

    if (input === "clear") return setLog([]);

    const result = run(input, { cwd });
    const echoed = [`$ ${input}`, ...result.lines];
    setLog((l) => [...l, ...echoed]);
    if (result.cwd) setCwd(result.cwd);
    if (result.theme) applyTheme(result.theme);
    if (result.navigate) router.push(result.navigate);
    if (result.open) window.open(result.open, "_blank", "noopener");
    if (result.copy) {
      try {
        navigator.clipboard?.writeText(result.copy);
      } catch {}
    }
    if (result.stream) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const { lines, delay } = result.stream;
      if (reduce) setLog((l) => [...l, ...lines]);
      else
        lines.forEach((line, i) => {
          timers.current.push(
            window.setTimeout(() => setLog((l) => [...l, line]), (i + 1) * delay),
          );
        });
    }
    return result;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const input = value.trim();
    setValue("");
    if (!input) return;
    const result = exec(input);
    if (showLanding) {
      dock();
      // Anything that isn't plain navigation continues in the floating terminal.
      if (result && !result.navigate) {
        setOpen(true);
        setLog((l) => (l.length ? l : WELCOME));
      }
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Tab") {
      e.preventDefault();
      const next = complete(value, cwd);
      if (next) setValue(next);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cursor.current + 1, history.current.length - 1);
      if (history.current[next]) {
        cursor.current = next;
        setValue(history.current[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      cursor.current = Math.max(cursor.current - 1, -1);
      setValue(cursor.current === -1 ? "" : history.current[cursor.current]);
    } else if (e.key === "Escape") {
      if (!showLanding) setOpen(false);
    }
  }

  const shared = { value, setValue, onSubmit: submit, onKeyDown };

  return (
    <>
      {showLanding && (
        <div
          className={`landing${leaving ? " is-leaving" : ""}`}
          role="dialog"
          aria-label="Welcome terminal"
        >
          <div className="lp-inner">
            <div className="lp-why">
              <TypedWhy onDone={finishTyping} />
              {!ready && (
                <button
                  type="button"
                  className={`lp-cta${typed ? " is-in" : ""}`}
                  onClick={() => setReady(true)}
                >
                  try now →
                </button>
              )}
            </div>
            {ready && (
              <>
                <p className="lp-id">
                  Anh Nguyen <span>product person</span>
                </p>
                <div className="lp-term">
                  <TermBar>
                    <span className="term-size">80×24</span>
                  </TermBar>
                  <p className="ls-cmd" aria-hidden="true">
                    <span className="ls-prompt">~ $</span>{" "}
                    <span className="ls-typed">ls -l</span>
                  </p>
                  <Listing pathname={pathname} onPick={dock} />
                  <div className="ls-hint">
                    <p className="ls-legend">
                      Type <b>cd ~</b> and press Enter to open the main page. Or
                      click a row.
                    </p>
                    <PromptInput
                      {...shared}
                      inputRef={landingRef}
                      id="cmd-landing"
                      prompt="~"
                      placeholder="cd ~"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {open ? (
        <section
          className={`float${big ? " float--big" : ""}`}
          role="dialog"
          aria-label="Terminal"
        >
          <TermBar>
            <button
              type="button"
              onClick={() => setBig((v) => !v)}
              aria-label={big ? "Shrink terminal" : "Expand terminal"}
              title={big ? "Shrink" : "Expand"}
            >
              {big ? "⤡" : "⤢"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close terminal"
              title="Close (Esc)"
            >
              ✕
            </button>
          </TermBar>
          <div className="float-log" ref={logRef} aria-live="polite">
            {log.map((text, i) => {
              const cmd = text.startsWith("$ ");
              return (
                <p key={i} className={lineClass(text)}>
                  {cmd && <span className="tl-prompt">{promptLabel(cwd)} $ </span>}
                  {cmd ? text.slice(2) : text}
                </p>
              );
            })}
          </div>
          <div className="float-chips" aria-label="Suggested commands">
            {CHIPS.map((c) => (
              <button key={c} type="button" onClick={() => exec(c)}>
                {c}
              </button>
            ))}
          </div>
          <PromptInput
            {...shared}
            inputRef={floatRef}
            id="cmd-float"
            prompt={promptLabel(cwd)}
            placeholder="type a command, or tap a chip"
          />
        </section>
      ) : (
        !showLanding && (
          <div className="float-dock">
            <RunCat className="dock-track" />
            <button type="button" className="float-pill" onClick={openTerminal}>
              <span className="float-caret" aria-hidden="true">▍</span>
              try the terminal
              <kbd aria-hidden="true">/</kbd>
            </button>
          </div>
        )
      )}
    </>
  );
}
