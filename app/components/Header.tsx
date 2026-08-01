"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Work", href: "/work" },
    { name: "Projects", href: "/projects" },
    { name: "Notes", href: "/thinking" },
    { name: "About", href: "/about" },
  ];

  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Anh Nguyen — home">
        Anh <span>Nguyen</span>
      </Link>
      <nav aria-label="Main navigation">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={pathname === link.href ? "active" : ""}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
