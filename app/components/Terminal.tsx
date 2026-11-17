"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CONTACT } from "@/lib/content";
import { complete, promptLabel, run, WELCOME } from "@/lib/terminal";
import TermBar, { RunCat } from "./TermBar";

type Entry = {
  perms: string;
  name: string;
  href: string;
  hint: string;
  external?: boolean;
};

const ENTRIES: Entry[] = [
  { perms: "drwxr-xr-x", name: "zalopay/", href: "/zalopay", hint: "payments, the technical one" },
  { perms: "drwxr-xr-x", name: "project-x/", href: "/project-x", hint: "tech talents program" },
  { perms: "drwxr-xr-x", name: "jora/", href: "/jora", hint: "my own tools" },
  { perms: "drwxr-xr-x", name: "about/", href: "/about", hint: "background" },
  { perms: "lrwxr-xr-x", name: "substack", href: CONTACT.substack, hint: "writing ↗", external: true },
  { perms: "lrwxr-xr-x", name: "github", href: CONTACT.github, hint: "code ↗", external: true },
];

const DOCK_KEY = "anh.docked";
const CHIPS = ["help", "learn", "demo", "prompt", "jora"];
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
    if (showLanding) landingRef.current?.focus();
  }, [showLanding]);

  useEffect(() => {
    if (open) floatRef.current?.focus();
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
    if (!input) {
      if (showLanding) dock();
      return;
    }
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
      if (showLanding) dock();
      else setOpen(false);
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
                  <b>d</b> folder · <b>l</b> link. Click a row, or type{" "}
                  <b>cd zalopay</b>, <b>learn</b>, <b>demo</b> or <b>jora</b> and press Enter.
                </p>
                <PromptInput {...shared} inputRef={landingRef} id="cmd-landing" prompt="~" />
                <button type="button" className="lp-skip" onClick={dock}>
                  skip intro ↵
                </button>
              </div>
            </div>
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
