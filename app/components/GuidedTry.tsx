"use client";

import { useEffect, useRef, useState } from "react";
import { run } from "@/lib/terminal";
import TermBar from "./TermBar";

export type GuidedStep = {
  /** A command counts as this step when it starts with `key`. */
  key: string;
  /** What the chip types. */
  cmd: string;
  title: string;
  why: string;
};

const lineClass = (t: string) =>
  t.startsWith("$ ") ? "tl tl-cmd" : t.startsWith("#") ? "tl tl-note" : t.startsWith("✓") ? "tl tl-ok" : "tl";

export default function GuidedTry({
  steps: STEPS,
  intro: INTRO,
  title = "try it",
  label = "Try it",
  fieldId = "cmd-guided",
  fallback = "help",
}: {
  steps: GuidedStep[];
  intro: string[];
  title?: string;
  label?: string;
  fieldId?: string;
  fallback?: string;
}) {
  const [log, setLog] = useState<string[]>(INTRO);
  const [value, setValue] = useState("");
  const [done, setDone] = useState<string[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [log]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const next = STEPS.find((s) => !done.includes(s.key));

  function exec(input: string) {
    const cmd = input.trim();
    if (!cmd) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];

    if (cmd === "clear") return setLog(INTRO);
    const result = run(cmd, { cwd: "~" });
    setLog((l) => [...l, `$ ${cmd}`, ...result.lines]);

    const step = STEPS.find((s) => cmd.startsWith(s.key));
    if (step) setDone((d) => (d.includes(step.key) ? d : [...d, step.key]));

    if (result.stream) {
      const { lines, delay } = result.stream;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setLog((l) => [...l, ...lines]);
      } else {
        lines.forEach((line, i) =>
          timers.current.push(
            window.setTimeout(() => setLog((l) => [...l, line]), (i + 1) * delay),
          ),
        );
      }
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    exec(value);
    setValue("");
  }

  return (
    <div className="jora-try">
      <ol className="jora-steps" aria-label="Steps">
        {STEPS.map((s, i) => {
          const isDone = done.includes(s.key);
          const active = next?.key === s.key;
          return (
            <li key={s.key} className={isDone ? "is-done" : active ? "is-next" : ""}>
              <span className="jora-n" aria-hidden="true">
                {isDone ? "✓" : i + 1}
              </span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.why}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="inline-term" role="group" aria-label={label}>
        <TermBar title={`${title}`}>
          <button type="button" onClick={() => { setLog(INTRO); setDone([]); }} aria-label="Reset demo" title="Reset">
            ↺
          </button>
        </TermBar>
        <div className="float-log" ref={logRef} aria-live="polite">
          {log.map((text, i) => {
            const cmd = text.startsWith("$ ");
            return (
              <p key={i} className={lineClass(text)}>
                {cmd && <span className="tl-prompt">~ $ </span>}
                {cmd ? text.slice(2) : text}
              </p>
            );
          })}
        </div>
        <div className="float-chips" aria-label="Suggested commands">
          {STEPS.map((s) => (
            <button
              key={s.key}
              type="button"
              className={next?.key === s.key ? "is-next" : ""}
              onClick={() => exec(s.cmd)}
            >
              {s.cmd}
            </button>
          ))}
        </div>
        <form onSubmit={submit} className="cmd-form">
          <label htmlFor={fieldId} className="cmd-prompt">~ $</label>
          <input
            id={fieldId}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={next ? next.cmd : fallback}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label={`${label} command`}
          />
        </form>
      </div>
    </div>
  );
}
