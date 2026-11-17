"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import TermBar from "./TermBar";

export type Skill = { name: string; what: string; slug?: string; kw?: string[] };

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function grep(kws: string[], timeline: string[]) {
  const re = new RegExp(`(^|[^a-z0-9])(${kws.map((k) => esc(k.toLowerCase())).join("|")})([^a-z0-9]|$)`);
  return timeline.filter((l) => re.test(l.toLowerCase()));
}

function Mark({ skill }: { skill: Skill }) {
  if (skill.slug) {
    return <Image src={`/logos/${skill.slug}.svg`} alt="" width={18} height={18} unoptimized />;
  }
  const letters = skill.name.replace(/[^A-Za-z#]/g, "");
  const mono = letters.length <= 3 ? letters : letters.slice(0, 2);
  return (
    <span className={`skill-mono${mono.length === 3 ? " skill-mono--3" : ""}`} aria-hidden="true">
      {mono}
    </span>
  );
}

export default function SkillChips({
  items,
  timeline,
}: {
  items: Skill[];
  timeline: string[];
}) {
  const [active, setActive] = useState<number | null>(null);
  const [pos, setPos] = useState<{ left: number; top?: number; bottom?: number } | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const anchor = useRef<HTMLElement | null>(null);
  const panelId = useId();

  // The pop-up lives in a portal on <body>, so no section's stacking context can cover it.
  const place = useCallback(() => {
    const el = anchor.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const width = Math.min(460, window.innerWidth - 24);
    const left = Math.max(12, Math.min(r.left, window.innerWidth - width - 12));
    const below = window.innerHeight - r.bottom;
    setPos(
      below >= 260 || below >= r.top
        ? { left, top: r.bottom + 10 }
        : { left, bottom: window.innerHeight - r.top + 10 },
    );
  }, []);

  useLayoutEffect(() => {
    if (active === null) return;
    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [active, place]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!root.current?.contains(t) && !popRef.current?.contains(t)) setActive(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onDown);
    };
  }, [active]);

  const skill = active === null ? null : items[active];
  const hits = skill ? grep(skill.kw ?? [skill.name], timeline) : [];
  const word = skill ? (skill.kw?.[0] ?? skill.name).toLowerCase() : "";

  return (
    <div className="skills" ref={root}>
      <ul>
        {items.map((s, i) => (
          <li key={s.name}>
            <button
              type="button"
              className={`skill${active === i ? " is-on" : ""}`}
              onClick={(e) => {
                anchor.current = e.currentTarget;
                setActive(active === i ? null : i);
              }}
              aria-expanded={active === i}
              aria-controls={active === i ? panelId : undefined}
            >
              <Mark skill={s} />
              {s.name}
            </button>
          </li>
        ))}
      </ul>

      {skill && pos &&
        createPortal(
        <div
          ref={popRef}
          className="skill-pop"
          id={panelId}
          role="dialog"
          aria-label={`About ${skill.name}`}
          style={{ left: pos.left, top: pos.top, bottom: pos.bottom }}
        >
          <TermBar title={`whatis ${word}`}>
            <button type="button" onClick={() => setActive(null)} aria-label="Close" title="Close (Esc)">
              ✕
            </button>
          </TermBar>
          <div className="skill-body">
            <p className="tl tl-cmd"><span className="tl-prompt">~ $ </span>whatis {word}</p>
            <p className="tl">{skill.name} - {skill.what}</p>
            <p className="tl tl-cmd"><span className="tl-prompt">~ $ </span>grep -iw {word} timeline.log</p>
            {hits.length ? (
              hits.map((h) => <p key={h} className="tl tl-ok">{h}</p>)
            ) : (
              <p className="tl tl-note">(no matches in the timeline)</p>
            )}
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
