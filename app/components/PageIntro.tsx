import type { ReactNode } from "react";
import GradientField from "./GradientField";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export default function PageIntro({ eyebrow, title, children }: PageIntroProps) {
  return (
    <header className="page-intro">
      <GradientField />
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <div className="intro-copy">{children}</div>
    </header>
  );
}
