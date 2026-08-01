import PageIntro from "../components/PageIntro";

export const metadata = { title: "Work — Anh Nguyen" };

const roles = [
  { period: "2025 — now", role: "Product Owner", company: "Zalopay", summary: "I build core and cross-border payment infrastructure — helping a Vietnamese wallet connect more naturally with the world while keeping everyday transactions reliable at scale.", points: ["Own and prioritise delivery across multiple engineering squads, balancing reliability with new capability.", "Investigate systemic failure patterns to improve payment success rates.", "Deliver cross-border payment integrations with Alipay+, Tenpay, and VietQR.", "Lead incident investigation and root-cause analysis from payment logs."] },
  { period: "2024 — now", role: "Head of Growth", company: "Project X Vietnam", summary: "My first deep exposure to product thinking, experimentation, and the pace of an early-stage organisation.", points: ["Led cross-functional teams to grow the Summer Fellowship Program beyond enrolment targets.", "Partnered with product teams on user insights, feature direction, and hands-on web work.", "Reframed the brand through a clearer narrative and a tech-forward visual system.", "Built media partnerships and an execution culture around high-quality growth experiments."] },
  { period: "2020 — now", role: "Mathematics Tutor", company: "Thrive Education & independent", summary: "I teach VCE Maths Methods and General Maths, helping students build intuition rather than memorise procedures.", points: ["Turn complex calculus and statistics into visual, digestible learning modules.", "Use feedback loops to identify where understanding breaks and adapt the explanation."] },
  { period: "2025", role: "Market Knowledge Systems Operator", company: "NAUCode", summary: "Maintained internal market intelligence systems, synthesising signals that supported product strategy and business decisions.", points: [] },
];

export default function Work() {
  return (
    <>
      <PageIntro eyebrow="Selected experience" title="Work shaped by systems, people, and the space between them.">
        <p>I&apos;m a product owner who enjoys translating complex operational realities into clear decisions, resilient systems, and better customer outcomes.</p>
      </PageIntro>
      <div className="experience-list">
        {roles.map((role) => (
          <article className="experience" key={`${role.role}-${role.company}`}>
            <p className="structural">{role.period}</p>
            <div>
              <h2>{role.role} <span>— {role.company}</span></h2>
              <p>{role.summary}</p>
              {role.points.length > 0 && <ul>{role.points.map((point) => <li key={point}>{point}</li>)}</ul>}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
