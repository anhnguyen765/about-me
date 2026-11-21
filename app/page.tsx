import Link from "next/link";
import { CONNECT, CONTACT, TOOLKITS } from "@/lib/content";
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
      <section className="intro hero">
        <p className="cmd">whoami</p>
        <h1>Anh Nguyen</h1>
        <p className="lede">
          <strong>Product is the thing I keep chasing.</strong>
        </p>
        <p>
          I started as
          an engineer, and every step since has been about the same question:
          what makes a product actually work for the people using it?
        </p>
        <p>
          Today that means product at Zalopay and building the tech talents
          program at Project X Vietnam — plus the tools I build for the work
          itself: <Link href="/jora">jora</Link> and a{" "}
          <Link href="/jora#po-toolkit">PO toolkit</Link>.
        </p>
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
                  {r.note}{" "}
                  <Link href={r.href}>details →</Link>{" · "}
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
        <p className="more">
          <Link href="/about">cat about.md → full background</Link>
        </p>
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

      <section aria-labelledby="other">
        <p className="cmd" id="other">
          ls ~/other
        </p>
        <p className="other">
          <Link href="/about">about ↗ </Link>
          <a href={`mailto:${CONTACT.email}`}>email ↗ </a>
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
