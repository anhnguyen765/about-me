import type { Metadata } from "next";
import Link from "next/link";
import GuidedTry, { type GuidedStep } from "../components/GuidedTry";
import { JORA_WHY, TOOLKITS } from "@/lib/content";

export const metadata: Metadata = {
  title: "jora & PO toolkit",
  description:
    "jora, my data CLI, and the PO toolkit, agent skills for recurring product work.",
};

const STEPS: GuidedStep[] = [
  { key: "jora scout", cmd: "jora scout", title: "Scout", why: "Find the right source before writing a query." },
  { key: "jora run", cmd: "jora run --by device", title: "Run", why: "A read-only query. Nothing exported, no credentials shown." },
  { key: "jora check", cmd: "jora check", title: "Check", why: "Verify the result before it reaches a document." },
];

const INTRO = [
  "# illustrative, no real data. three steps, in order.",
  "# tap the highlighted command, or type it.",
];

export default function JoraPage() {
  return (
    <>
      <p className="crumb">
        <Link href="/">← ~</Link>
      </p>
      <section className="intro">
        <p className="cmd">ls ~/tools</p>
        <h1>
          jora <span className="dim">&amp; PO toolkit</span>
        </h1>
        <p className="lede">
          jora is my data CLI. The PO toolkit is the set of agent skills around
          it. Both are private, so I describe them only in general terms.
        </p>
      </section>

      <section>
        <p className="cmd">jora --try</p>
        <GuidedTry steps={STEPS} intro={INTRO} title="jora — try it" label="Try jora" fieldId="cmd-jora" fallback="jora" />
      </section>

      <section id="po-toolkit" aria-labelledby="po-toolkit-title">
        <p className="cmd">cat po-toolkit/readme.txt</p>
        <h2 id="po-toolkit-title">
          {TOOLKITS[1].name}{" "}
          <span className="dim">· {TOOLKITS[1].kicker}</span>
        </h2>
        <p className="lede">{TOOLKITS[1].summary}</p>
        <p className="pos">{TOOLKITS[1].detail}</p>
        <ul className="chips tool-chips" aria-label="PO toolkit stack">
          {TOOLKITS[1].stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <ul className="tool-notes">
          {TOOLKITS[1].notes.map((note) => (
            <li key={note}>
              <span aria-hidden="true">✓</span> {note}
            </li>
          ))}
        </ul>
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
        <ul className="promises">
          {TOOLKITS[0].notes.map((n, i) => (
            <li key={n}>
              <span className="glyph" aria-hidden="true">{">"}</span>
              {n}
            </li>
          ))}
        </ul>
      </section>

      <p className="next">
        <Link href="/">cd ~</Link>
      </p>
    </>
  );
}
