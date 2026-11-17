import type { Metadata } from "next";
import Link from "next/link";
import GuidedTry, { type GuidedStep } from "../components/GuidedTry";
import { JORA_WHY, TOOLKITS } from "@/lib/content";

export const metadata: Metadata = {
  title: "jora",
  description: "Small tools I build for my own product work.",
};

const STEPS: GuidedStep[] = [
  { key: "jora scout", cmd: "jora scout", title: "Scout", why: "Find the right source before writing a single query." },
  { key: "jora run", cmd: "jora run --by device", title: "Run", why: "A read-only query. Nothing is exported, no credentials on screen." },
  { key: "jora check", cmd: "jora check", title: "Check", why: "Verify the result before a number is allowed into a document." },
];

const INTRO = [
  "# illustrative: no real data. three small steps, in order.",
  "# tap the highlighted command, or type it.",
];

export default function JoraPage() {
  return (
    <>
      <p className="crumb">
        <Link href="/">← ~</Link>
      </p>
      <section className="intro">
        <p className="cmd">docker inspect jora</p>
        <h1>jora</h1>
        <p className="lede">
          When the tool I need doesn’t exist, I build it. These are my own
          working tools for product analysis and recurring product workflows,
          kept private and described only in general terms.
        </p>
      </section>

      <section>
        <p className="cmd">jora --try</p>
        <GuidedTry steps={STEPS} intro={INTRO} title="jora — try it" label="Try jora" fieldId="cmd-jora" fallback="jora" />
      </section>

      <section>
        <p className="cmd">cat why.md</p>
        <ul className="learned">
          {JORA_WHY.map((w) => (
            <li key={w.title}>
              <h2>{w.title}</h2>
              <p>{w.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p className="cmd">cat guarantees.md <span className="dim"># what it promises</span></p>
        <ul className="learned">
          {TOOLKITS[0].notes.map((n) => (
            <li key={n}>
              <h2>{n}</h2>
            </li>
          ))}
        </ul>
        <p className="pos">Small promises, kept on purpose.</p>
      </section>

      <section>
        <p className="cmd">ls ./tools</p>
        <ul className="learned">
          {TOOLKITS.map((t) => (
            <li key={t.id}>
              <h2>
                {t.name} <span className="dim">· {t.kicker}</span>
              </h2>
              <p>{t.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <p className="next">
        next: <Link href="/about">cd about →</Link>
      </p>
    </>
  );
}
