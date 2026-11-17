import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Stats from "../components/Stats";
import GuidedTry, { type GuidedStep } from "../components/GuidedTry";
import { CONNECT, CONTACT, PROJECT_X_DESIGN, PROJECT_X_WHY } from "@/lib/content";

export const metadata: Metadata = {
  title: "Project X Vietnam",
  description:
    "Building the tech talents program at Project X Vietnam, a non-profit tech talent community.",
};

const STEPS: GuidedStep[] = [
  { key: "ls project-x", cmd: "ls project-x", title: "Look around", why: "Every folder on this site is a real directory. See what the program holds." },
  { key: "cat project-x/readme", cmd: "cat project-x/readme.txt", title: "Read it", why: "Print the file: what the program is and what it has reached." },
  { key: "grep", cmd: "grep mentors project-x/readme.txt", title: "Search it", why: "Pull out only the lines that matter. Same trick engineers use on logs." },
];

const INTRO = [
  "# explore the program with real shell commands.",
  "# three steps, in order. tap the highlighted one, or type it.",
];

const STATS = [
  { value: "6", label: "person growth team" },
  { value: "6,000+", label: "young tech talents reached (2025)" },
  { value: "85+", label: "mentors" },
  { value: "60+", label: "partner companies" },
];

const THEMES = [
  {
    title: "The program is the product",
    body: "The fellowship, the curriculum and the community are what people actually experience. Growth only matters if that experience is worth joining.",
  },
  {
    title: "Grow people, not just numbers",
    body: "I coach a small team to each own a channel, and spend as much time recruiting the next team as running this one.",
  },
  {
    title: "Instrument it early",
    body: "Look at the whole journey from first impression to application, and let the data argue with our instincts.",
  },
];

export default function ProjectXPage() {
  return (
    <>
      <p className="crumb">
        <Link href="/">← ~</Link>
      </p>
      <section className="intro">
        <p className="cmd">docker inspect project-x</p>
        <h1>Project X Vietnam</h1>
        <p className="lede">
          Where it started: Project X’s summer fellowship program, a
          non-profit that connects young tech talent with mentors and
          companies. I joined as a fellow in 2024 and now help build the tech
          talents program.
        </p>
      </section>

      <p className="other">
        <a href={CONNECT.partnerMail}>Partner with Project X Vietnam →</a>
      </p>

      <section>
        <p className="cmd">ls ./explore <span className="dim"># start here</span></p>
        <GuidedTry steps={STEPS} intro={INTRO} title="project-x — explore" label="Explore Project X" fieldId="cmd-pjx" fallback="ls project-x" />
      </section>

      <section>
        <p className="cmd">cat why.md</p>
        <ul className="learned">
          {PROJECT_X_WHY.map((w) => (
            <li key={w.title}>
              <h2>{w.title}</h2>
              <p>{w.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p className="cmd">cat what-i-learned.md</p>
        <ul className="learned">
          {THEMES.map((l) => (
            <li key={l.title}>
              <h2>{l.title}</h2>
              <p>{l.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <Stats items={STATS} />

      <section>
        <p className="cmd">ls ./design</p>
        <ul className="gallery">
          {PROJECT_X_DESIGN.map((img) => (
            <li key={img.src}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 700px) 100vw, 33vw"
              />
            </li>
          ))}
        </ul>
        <p className="other">
          <a href="https://projectxvietnam.org" target="_blank" rel="noreferrer">
            projectxvietnam.org ↗
          </a>
          <a href={CONTACT.githubOrg} target="_blank" rel="noreferrer">
            Project-X-Vietnam on GitHub ↗
          </a>
        </p>
      </section>

      <p className="next">
        next: <Link href="/about">cd about →</Link>
      </p>
    </>
  );
}
