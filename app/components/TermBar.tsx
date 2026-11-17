"use client";

import { useEffect, useState } from "react";

// Two frames of a tiny running cat. Legs swap, tail flicks.
const FRAMES = [
  [" /\\_/\\  ", "~( ^.^ ) ", "  /|  |\\ "].join("\n"),
  [" /\\_/\\  ", "-( ^.^ ) ", "  \\|  |/ "].join("\n"),
];

export function RunCat({ className = "term-track" }: { className?: string }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), 170);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={className} aria-hidden="true">
      <pre className="runcat">{FRAMES[frame]}</pre>
    </span>
  );
}

export default function TermBar({
  title = "anh@portfolio — zsh",
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="term-bar">
      <b>{title}</b>
      <RunCat />
      <span className="term-actions">{children}</span>
    </header>
  );
}
