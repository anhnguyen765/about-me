export const metadata = {
  title: "Work — Anh Nguyen",
};

export default function Work() {
  return (
    <div>
      <h1>Work</h1>
      <p>My professional journey, focusing on product and growth.</p>

      <div style={{ marginTop: "3rem" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <h2>Product Owner - <span style={{ color: "var(--color-accent)" }}>Zalopay</span></h2>
          <p className="structural">NOV 2025 – PRESENT</p>
          <p style={{ marginTop: "1rem" }}>
            Core Payments & Cross-border Payments. I own product delivery for core payment infrastructure responsible for orchestrating fund flows and transaction processing supporting millions of transactions per day.
          </p>
          <ul style={{ marginTop: "1rem" }}>
            <li>Manage and prioritise product backlog for multiple engineering squads, balancing system reliability with new features.</li>
            <li>Analyse and identify systemic failure patterns to improve payment success rate.</li>
            <li>Deliver and maintain cross-border payment integrations with Alipay+, Tenpay, and VietQR.</li>
            <li>Incident investigations and root-cause analysis using payment logs.</li>
          </ul>
        </div>

        <div>
          <h2>Head of Growth - <span style={{ color: "var(--color-accent)" }}>Project X Vietnam</span></h2>
          <p className="structural">NOV 2024 - PRESENT</p>
          <p style={{ marginTop: "1rem" }}>
            Early exposure to product thinking, marketing experimentation, and a startup environment. This is where I first developed my product mindset.
          </p>
          <ul style={{ marginTop: "1rem" }}>
            <li>Led cross-functional teams to scale the Summer Fellowship Program, leveraging data-driven experimentation to optimise the user acquisition funnel and exceed enrollment KPIs.</li>
            <li>Acted as a strategic consultant for Product teams, delivering user-driven insights that bridged the gap between user acquisition, feature sets, and hands-on website development.</li>
            <li>Spearheaded the end-to-end transformation of Project X’s visual and narrative brand strategy, translating core value propositions into high-conversion marketing assets and a sophisticated, "Tech-Forward" aesthetic.</li>
            <li>Secured and managed a high-impact media partnership with AIESEC branches in Vietnam, expanding institutional credibility and brand reach within the talent ecosystem.</li>
            <li>Established a high-performance culture focused on "KPI-crushing" execution, driving talent upskilling and intentionally onboarding next-gen organisers from top-tier academic and competitive backgrounds.</li>
          </ul>
        </div>

        <div>
          <h2>Mathematics Tutor - <span style={{ color: "var(--color-accent)" }}>Thrive Education & Self-Employed</span></h2>
          <p className="structural">2020 - PRESENT</p>
          <p>Specialised in VCE Maths Methods and General Maths.</p>
          <ul style={{ marginTop: "1rem" }}>
            <li>Standardised pedagogical frameworks by replacing rote memorisation with graph visualisations, improving student problem-solving speed and logical agility.</li>
            <li>Synthesised complex mathematical concepts (Calculus and Statistics) into digestible modules, leveraging a high-distinction academic foundation (90%+ average) to ensure student comprehension.</li>
            <li>Mentored high-achieving VCE students by translating personal examination success into actionable study frameworks, bridging the gap between theory and high-pressure performance.</li>
            <li>Optimised learning outcomes through data-driven feedback loops, identifying knowledge gaps to pivot teaching strategies and ensure mastery of first-principles.</li>
          </ul>
        </div>

        <div style={{ marginBottom: "2.5rem" }}>
          <h2>Market Knowledge Systems Operator - <span style={{ color: "var(--color-accent)" }}>NAUCode</span></h2>
          <p className="structural">SEP 2025 – NOV 2025</p>
          <p style={{ marginTop: "1rem" }}>
            Maintained internal market intelligence systems supporting product strategy and business decision-making. Aggregated and analysed market insights to identify emerging product opportunities.
          </p>
        </div>

      </div>
    </div >
  );
}
