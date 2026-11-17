import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SkillChips from "../components/SkillChips";
import { CONTACT, GALLERY, RECOGNITION, SKILLS, SPEC_SHEET, TIMELINE, TOOLS_IN_USE } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Background, skills, recognition and contact details.",
};

const FACTS = ["education", "based", "languages", "data", "ai"];
const skillsFor = (key: string) => SKILLS.find((s) => s.key === key)?.items;
const timeline = TIMELINE.map((t) => `${t.date}  ${t.message}`);

export default function AboutPage() {
  const rows = SPEC_SHEET.filter((r) => FACTS.includes(r.key));

  return (
    <>
      <p className="crumb">
        <Link href="/">← ~</Link>
      </p>
      <section className="intro about-intro">
        <div>
          <p className="cmd">cat about.md</p>
          <h1>About</h1>
          <p className="lede">
            Product person across payments and growth, based between Brisbane
            and Ho Chi Minh City. I like instruments that make a decision
            obvious, and I build them when they don’t exist. I write about it on Substack.
          </p>
        </div>
        <Image
          className="avatar"
          src="/ava.jpeg"
          alt="Portrait of Anh Nguyen"
          width={160}
          height={200}
        />
      </section>

      <section>
        <p className="cmd">env</p>
        <dl className="env">
          {rows.map((r) => (
            <div key={r.key}>
              <dt>{r.key.toUpperCase()}</dt>
              <dd>
                {skillsFor(r.key) ? (
                  <SkillChips items={[...skillsFor(r.key)!]} timeline={timeline} />
                ) : (
                  r.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <p className="cmd">cat awards.txt <span className="dim"># competition decks included</span></p>
        <ul className="awards">
          {RECOGNITION.map((r) => (
            <li key={r.title}>
              <span className="when">{r.year}</span>
              <div>
                <h2>{r.title}</h2>
                <p>{r.detail}</p>
                {r.links && (
                  <p className="decks">
                    {r.links.map((l) => (
                      <a
                        key={l.href}
                        href={encodeURI(l.href)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="deck-pdf">PDF</span>
                        {l.label}
                        {l.size && <span className="deck-size">{l.size}</span>}
                      </a>
                    ))}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p className="cmd">ls ~/Applications <span className="dim"># what I work in</span></p>
        <ul className="tools">
          {TOOLS_IN_USE.map((t) => (
            <li key={t.name}>
              <a href={t.href} target="_blank" rel="noreferrer">
                <Image src={t.src} alt="" width={56} height={56} />
                <span>
                  <b>{t.name}</b>
                  <span className="dim">{t.role}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p className="cmd">ls ./photos</p>
        <ul className="strip" aria-label="Photo gallery, scroll sideways">
          {GALLERY.map((g, i) => (
            <li key={g.src}>
              <figure>
                <div className="strip-img">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="240px"
                    priority={i < 2}
                  />
                </div>
                <figcaption>{g.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p className="cmd">contact --all</p>
        <p className="other">
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <a href={CONTACT.substack} target="_blank" rel="noreferrer">
            substack ↗
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">
            linkedin ↗
          </a>
          <a href={CONTACT.github} target="_blank" rel="noreferrer">
            github ↗
          </a>
        </p>
      </section>
    </>
  );
}
