import Link from "next/link";
import { CONNECT, CONTACT } from "@/lib/content";

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

const CONTAINERS = [
  {
    name: "zalopay",
    href: "/zalopay",
    image: "the technical one",
    status: "Up 1 year",
    title: "Payments at scale",
    blurb:
      "Where I learned how a product behaves when millions of people depend on it: payment core, cross-border, then growth.",
    tags: ["payments", "cross-border", "growth"],
  },
  {
    name: "project-x",
    href: "/project-x",
    image: "the fellowship one",
    status: "Up 2 years",
    title: "Building the tech talents program",
    blurb:
      "Started in Project X Vietnam’s summer fellowship program, and stayed to help build the program and the tech talents it grows.",
    tags: ["community", "growth", "fellowship"],
  },
];

export default function Home() {
  return (
    <>
      <section className="intro hero">
        <p className="cmd">whoami</p>
        <h1>Anh Nguyen</h1>
        <p className="lede">
          <strong>Product is the thing I keep chasing.</strong> I started as
          an engineer, and every step since has been about the same question:
          what makes a product actually work for the people using it?
        </p>
        <p className="pos">
          Today that means product at Zalopay and building the tech talents
          program at Project X Vietnam, plus a few tools I build for myself.
          Brisbane / Ho Chi Minh City.
        </p>
      </section>

      <section aria-labelledby="cv">
        <p className="cmd" id="cv">
          git log --oneline  # the chase
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

      <section aria-labelledby="ps">
        <p className="cmd" id="ps">
          docker ps <span className="dim">  # where I chase it</span>
        </p>
        <ul className="containers">
          {CONTAINERS.map((c) => (
            <li key={c.name}>
              <Link href={c.href} className="container">
                <div className="c-head">
                  <span className="c-name">{c.name}</span>
                  <span className="c-status">
                    <i aria-hidden="true" /> {c.status}
                  </span>
                  <span className="c-image">{c.image}</span>
                </div>
                <h2>{c.title}</h2>
                <p>{c.blurb}</p>
                <div className="c-foot">
                  <span className="chips">
                    {c.tags.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </span>
                  <span className="c-go">
                    cd {c.name} <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="side">
        <p className="cmd" id="side">
          docker ps --filter side-projects
        </p>
        <Link href="/jora" className="side">
          <span className="c-name">jora</span>
          <span>my own tools: a data CLI and agent skills for product work</span>
          <span className="c-go">cd jora →</span>
        </Link>
      </section>

      <section>
        <p className="cmd">ls ~/other</p>
        <p className="other">
          <a href={CONTACT.substack} target="_blank" rel="noreferrer">
            substack ↗
          </a>
          <Link href="/about">about</Link>
          <a href={CONTACT.github} target="_blank" rel="noreferrer">
            github ↗
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">
            linkedin ↗
          </a>
          <a href={`mailto:${CONTACT.email}`}>email</a>
        </p>
      </section>
    </>
  );
}
