"use client";

import { useEffect, useState } from "react";
import { applyTheme, nextTheme, readTheme, THEME_EVENT, type Theme } from "./theme";

const ICON: Record<Theme, string> = { auto: "◐", light: "☀", dark: "☾" };

export default function ThemeButton() {
  const [theme, setTheme] = useState<Theme>("auto");

  useEffect(() => {
    setTheme(readTheme());
    const onChange = (e: Event) => setTheme((e as CustomEvent<Theme>).detail);
    window.addEventListener(THEME_EVENT, onChange);
    return () => window.removeEventListener(THEME_EVENT, onChange);
  }, []);

  return (
    <button
      type="button"
      className="theme-btn"
      onClick={() => applyTheme(nextTheme(theme))}
      aria-label={`Theme: ${theme}. Switch to ${nextTheme(theme)}`}
      title="auto follows your device"
    >
      <i aria-hidden="true">{ICON[theme]}</i>
      <span>{theme}</span>
    </button>
  );
}
