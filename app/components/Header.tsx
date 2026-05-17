"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Work", href: "/work" },
    { name: "Projects", href: "/projects" },
    { name: "Thinking", href: "/thinking" },
    { name: "Writing", href: "/writing" },
    { name: "Gallery", href: "/gallery" },
  ];

  return (
    <header>
      <nav className="structural">
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
