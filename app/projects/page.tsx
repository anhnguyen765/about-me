import Image from "next/image";
import PageIntro from "../components/PageIntro";

export const metadata = { title: "Projects — Anh Nguyen" };

const projects = [
  { tag: "01 / Growth, product & community", title: "Project X Vietnam", description: "A community and platform where I lead growth, product thinking, and a clearer creative identity — helping ambitious people find room to learn, build, and grow.", links: [["Live website", "https://projectxvietnam.org"], ["Facebook", "https://www.facebook.com/techXVn"], ["LinkedIn", "https://www.linkedin.com/company/project-x-vietnam"]] },
  { tag: "02 / Build experiment", title: "OLIU Charity Ordering Platform", description: "A lightweight web experiment for a charity ordering experience.", links: [["Visit the platform", "https://oliu-26.vercel.app"]] },
  { tag: "03 / Product management", title: "Dopameal", description: "A product management project exploring how an intentional meal-planning experience could work.", links: [["Read the PRD", "https://bpm-dopameal.vercel.app/"]] },
];

const cases = [
  ["Infina Final Round — H4TF:PM 2025", "/proposals/Project X__Infina_Final Round_H4TFPM2025.pdf"],
  ["Weshare Round 2 — H4TF:PM 2025", "/proposals/Project X__Weshare_Round 2_H4TFPM2025.pdf"],
  ["Simpồ FinInnovate — Round 2", "/proposals/Simpồ_FinInnovate_Round2_FBAC2025.pdf"],
  ["Simpồ FinInnovate — Round 3", "/proposals/Simpồ_FinInnovate_Round3_FBAC2025.pdf"],
];

export default function Projects() {
  return (
    <>
      <PageIntro eyebrow="Things made tangible" title="Projects are where questions get a shape.">
        <p>Some are product explorations, some are builds, and some are thinking made visible. Each starts with a problem worth understanding.</p>
      </PageIntro>
      <div className="project-list">
        {projects.map((project) => (
          <article className="project-row" key={project.title}>
            <span className="structural">{project.tag}</span>
            <div><h2>{project.title}</h2><p>{project.description}</p><div className="project-links">{project.links.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer">{label} ↗</a>)}</div></div>
          </article>
        ))}
      </div>
      <section className="project-row">
        <span className="structural">04 / Case work</span>
        <div><h2>Competitions & <span>case studies</span></h2><p>Selected work from product and business competitions.</p><div className="case-grid">{cases.map(([label, href]) => <a className="case-link" key={href} href={href} target="_blank"><span>{label}</span><span aria-hidden="true">↗</span></a>)}</div></div>
      </section>
      <section className="project-row">
        <span className="structural">05 / Visual work</span>
        <div><h2>Graphic <span>design</span></h2><p>A few visual pieces for Project X Vietnam.</p><div className="design-grid"><Image src="/graphicdesign/pjx2025_ebpost.jpg" alt="Project X EB Post design" width={2048} height={2048} sizes="(max-width: 720px) 100vw, 50vw" /><Image src="/graphicdesign/pjx2025_recruitment.jpg" alt="Project X recruitment design" width={2048} height={2048} sizes="(max-width: 720px) 100vw, 50vw" /><Image src="/graphicdesign/pjx2026_casetrainer.jpg" alt="Project X case trainer design" width={2048} height={2048} sizes="(max-width: 720px) 100vw, 50vw" /><a href="https://www.projectxvietnam.org" target="_blank" rel="noreferrer"><Image src="/graphicdesign/pjx_viewmore.png" alt="Explore more Project X design work" width={1080} height={1080} sizes="(max-width: 720px) 100vw, 50vw" /></a></div></div>
      </section>
    </>
  );
}
