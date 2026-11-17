"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/zalopay", label: "zalopay" },
  { href: "/project-x", label: "project-x" },
  { href: "/jora", label: "jora" },
  { href: "/about", label: "about" },
];

export default function TopBar() {
  const pathname = usePathname();
  const dir = pathname === "/" ? "~" : `~${pathname}`;

  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <Link href="/" className="prompt-path" aria-label="Home">
          anh@portfolio:<b>{dir}</b>
        </Link>
        <nav aria-label="Primary">
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
      </div>
    </header>
  );
}
