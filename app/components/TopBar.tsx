import Link from "next/link";
import ThemeButton from "./ThemeButton";

export default function TopBar() {
  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <Link href="/" className="prompt-path" aria-label="Back to the main page">
          anh@portfolio:<b>~</b> <span className="dim">← main page</span>
        </Link>
        <ThemeButton />
      </div>
    </header>
  );
}
