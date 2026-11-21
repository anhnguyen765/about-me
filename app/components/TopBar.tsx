"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeButton from "./ThemeButton";

const ITEMS = [
  { href: "/writing", label: "writing" },
  { href: "/about", label: "about" },
];

export default function TopBar() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  useEffect(() => setMenu(false), [pathname]);
  useEffect(() => {
    if (!menu) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [menu]);
  const dir = pathname === "/" ? "~" : `~${pathname}`;

  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <Link href="/" className="prompt-path" aria-label="Home">
          anh@portfolio:<b>{dir}</b>
        </Link>
        <nav id="primary-nav" aria-label="Primary" data-open={menu ? "1" : undefined}>
          {ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ThemeButton />
        <button
          type="button"
          className="burger"
          aria-label={menu ? "Close menu" : "Open menu"}
          aria-expanded={menu}
          aria-controls="primary-nav"
          onClick={() => setMenu((v) => !v)}
        >
          <span aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
