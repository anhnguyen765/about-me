import type { Metadata } from "next";
import Link from "next/link";
import Stats from "../components/Stats";
import { ZALOPAY_ACTIVITIES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Zalopay",
  description: "Payment Core, Cross-Border Payments and Growth at Zalopay.",
};

const STATS = [
  { value: "5M+", label: "transactions / day" },
  { value: "11", label: "markets" },
  { value: "8+", label: "funding sources" },
];

const ROLES = [
  {
    when: "Sep 2026 – now",
    title: "Product Strategist, Growth & Retention",
    note: "Working out which levers really move paying-user growth.",
  },
  {
    when: "Nov 2025 – Sep 2026",
    title: "Product Owner, Payment Core & Cross-Border",
    note: "The payment infrastructure behind local and cross-border payments.",
  },
];

const THEMES = [
  {
    title: "Reliability is the product",
    body: "At this scale, a slow or failed payment is the experience. A lot of the work is making the unglamorous paths trustworthy.",
  },
  {
    title: "Systems, not features",
    body: "Local wallets, global networks and risk checks all have to agree. I try to see the whole path before changing a part of it.",
  },
  {
    title: "Measure, then decide",
    body: "Growth is the same discipline: model the gap, then back the lever that can actually close it.",
  },
];

export default function ZalopayPage() {
  return (
    <>
      <p className="crumb">
        <Link href="/">← ~</Link>
      </p>
      <section className="intro">
        <p className="cmd">docker inspect zalopay</p>
        <h1>Zalopay</h1>
        <p className="lede">
          The technical chapter: a payments product used by millions, where
          small decisions in the system show up as real moments for real
          people.
        </p>
      </section>

      <p className="other">
        <a href="https://zalopay.vn/" target="_blank" rel="noreferrer">
          Try Zalopay: payments and cross-border ↗
        </a>
      </p>

      <Stats items={STATS} />

      <section>
        <p className="cmd">git log --roles</p>
        <ol className="roles">
          {ROLES.map((r) => (
            <li key={r.title}>
              <span className="when">{r.when}</span>
              <div>
                <h2>{r.title}</h2>
                <p>{r.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <p className="cmd">cat how-i-work.md</p>
        <ul className="learned">
          {THEMES.map((t) => (
            <li key={t.title}>
              <h2>{t.title}</h2>
              <p>{t.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p className="cmd">cat activities.log</p>
        <ul className="activities">
          {ZALOPAY_ACTIVITIES.map((a) => (
            <li key={a.href}>
              <span className="when">{a.tag}</span>
              <div>
                <h2>{a.title}</h2>
                {a.note && <p>{a.note}</p>}
                <a href={a.href} target="_blank" rel="noreferrer">
                  view on LinkedIn ↗
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <p className="next">
        next: <Link href="/project-x">cd project-x →</Link>
      </p>
    </>
  );
}
