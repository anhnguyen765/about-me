export type Theme = "auto" | "light" | "dark";

export const THEME_KEY = "anh.theme";
export const THEME_EVENT = "anh-theme";
export const THEMES: Theme[] = ["auto", "light", "dark"];

export function readTheme(): Theme {
  try {
    const t = localStorage.getItem(THEME_KEY);
    if (t === "light" || t === "dark") return t;
  } catch {}
  return "auto";
}

/** "auto" removes the override, so the device setting (prefers-color-scheme) decides. */
export function applyTheme(t: Theme) {
  const root = document.documentElement;
  if (t === "auto") delete root.dataset.theme;
  else root.dataset.theme = t;
  try {
    if (t === "auto") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, t);
  } catch {}
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: t }));
}

export const nextTheme = (t: Theme): Theme => THEMES[(THEMES.indexOf(t) + 1) % THEMES.length];
