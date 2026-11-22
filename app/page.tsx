import Image from "next/image";
import Link from "next/link";
import SkillChips from "./components/SkillChips";
import {
  CONNECT,
  CONTACT,
  GALLERY,
  RECOGNITION,
  SKILLS,
  SPEC_SHEET,
  TIMELINE,
  TOOLKITS,
  TOOLS_IN_USE,
} from "@/lib/content";
import { getPosts } from "@/lib/substack";

const CV = [
  {
    when: "Nov 2025 – now",
    what: "Product",
    where: "Zalopay",
    href: "/zalopay",
    note: "Payments at scale, cross-border included.",
    action: { label: "try the app ↗", href: CONNECT.zalopay, external: true },
  },
  {
    when: "Nov 2024 – now",
    what: "Building tech talents program",
    where: "Project X Vietnam",
    href: "/project-x",
    note: "Mentor, hire or co-build with the program.",
    action: { label: "partner with us →", href: CONNECT.partnerMail },
  },
];

const FACTS = ["education", "based", "languages", "data", "ai"];
const skillsFor = (key: string) => SKILLS.find((s) => s.key === key)?.items;
const timeline = TIMELINE.map((t) => `${t.date}  ${t.message}`);

const TOOLS = [
  {
    name: TOOLKITS[0].name,
    href: "/jora",
    line: "data CLI: checked analysis before the number lands",
    tag: "CLI",
  },
  {
    name: TOOLKITS[1].name,
    href: "/jora#po-toolkit",
    line: "agent skills for the recurring product work",
    tag: "skills",
  },
];

export default async function Home() {
  const latest = await getPosts(3);
  return (
    <>
      <section className="intro hero about-intro" id="about">
        <div>
          <p className="cmd">whoami</p>
          <h1>Anh Nguyen</h1>
          <p className="lede">
            <strong>Product is the thing I keep chasing.</strong>
          </p>
          <p>
            I started as an engineer. Every step since asks one question: what
            makes a product work for the people using it? When the tool I need
            doesn’t exist, I build it.
          </p>
          <p>
            Today: product at Zalopay, the tech talents program at Project X
            Vietnam, and my own tools, <Link href="/jora">jora</Link> and a{" "}
            <Link href="/jora#po-toolkit">PO toolkit</Link>.
          </p>
        </div>
        <figure className="editor">
          <div className="editor-tab">
            <span>ava.jpeg</span>
            <span className="editor-dot" aria-hidden="true" />
          </div>
          <Image
            className="avatar"
            src="/ava.jpeg"
            alt="Portrait of Anh Nguyen"
            width={160}
            height={200}
            priority
          />
          <figcaption className="editor-status">
            <span>160×200</span>
            <span>JPEG</span>
          </figcaption>
        </figure>
      </section>

      <section aria-labelledby="cv">
        <p className="cmd" id="cv">
          git log --oneline <span className="dim">  # experience</span>
        </p>
        <ol className="cv">
          {CV.map((r) => (
            <li key={r.what}>
              <span className="when">{r.when}</span>
              <span className="cv-main">
                <span>
                  <b>{r.what}</b> <span className="dim">@</span>{" "}
                  <Link href={r.href}>{r.where}</Link>
                </span>
                <span className="cv-note">
                  {r.note}{" · "}
                  <a
                    href={r.action.href}
                    {...("external" in r.action
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    {r.action.label}
                  </a>
                </span>
              </span>
              <span className="badges">
                <span className="badge badge--head">HEAD</span>
                <span className="badge badge--on">active</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="tools">
        <p className="cmd" id="tools">
          ls ~/tools <span className="dim">  # what I build for the work</span>
        </p>
        <ul className="apps">
          {TOOLS.map((t) => (
            <li key={t.name}>
              <Link href={t.href}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="app-mark" src="/mark.svg" alt="" width={32} height={32} />
                <span className="app-text">
                  <b>{t.name}</b>
                  <span className="dim">{t.line}</span>
                </span>
                <span className="app-tag">{t.tag}</span>
                <span className="app-go" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="apps-in-use">
        <p className="cmd" id="apps-in-use">
          ls ~/Applications <span className="dim">  # what I work in</span>
        </p>
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

      {latest.length > 0 && (
        <section aria-labelledby="writing">
          <p className="cmd" id="writing">
            ls -lt writing/ | head -3 <span className="dim">  # from substack</span>
          </p>
          <ul className="posts">
            {latest.map((p) => (
              <li key={p.href}>
                <a href={p.href} target="_blank" rel="noreferrer" className="post">
                  <time dateTime={p.date}>{p.date}</time>
                  <span className="post-title">{p.title}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="more">
            <Link href="/writing">cd writing → all posts</Link>
          </p>
        </section>
      )}


      <section aria-labelledby="env">
        <p className="cmd" id="env">env</p>
        <dl className="env">
          {SPEC_SHEET.filter((r) => FACTS.includes(r.key)).map((r) => (
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

      <section aria-labelledby="awards">
        <p className="cmd" id="awards">cat awards.txt</p>
        <ul className="awards-short">
          {RECOGNITION.map((r) => (
            <li key={r.title}>
              <span className="when">{r.year}</span>
              <span>
                {r.title}
                {r.links?.map((l) => (
                  <span key={l.href}>{" · "}
                  <a href={encodeURI(l.href)} target="_blank" rel="noreferrer">
                    {l.label}
                  </a> ↗ </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="photos">
        <p className="cmd" id="photos">ls ./photos</p>
        <ul className="strip" aria-label="Photo gallery, scroll sideways">
          {GALLERY.map((g) => (
            <li key={g.src}>
              <figure>
                <div className="strip-img">
                  <Image src={g.src} alt={g.alt} fill sizes="240px" />
                </div>
                <figcaption>{g.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="other">
        <p className="cmd" id="other">
          ls ~/other
        </p>
        <p className="other">
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <a href={CONTACT.substack} target="_blank" rel="noreferrer">
            substack ↗
          </a>
          <a href={CONTACT.github} target="_blank" rel="noreferrer">
            github ↗
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">
            linkedin ↗
          </a>
        </p>
      </section>
    </>
  );
}
