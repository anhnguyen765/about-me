import PageIntro from "../components/PageIntro";

export const metadata = { title: "About — Anh Nguyen" };

export default function About() {
  return (
    <>
      <PageIntro eyebrow="A little context" title="I&apos;m drawn to the logic beneath the surface.">
        <p>My path runs from mathematics and teaching to product work — a through-line of making difficult things easier to understand.</p>
      </PageIntro>
      <section className="about-grid">
        <div className="prose">
          <p>I grew up in Vietnam until the age of 12, then moved to Australia for high school in Melbourne and university in Brisbane. I graduated with Distinction from <strong>Queensland University of Technology</strong>, studying Computer Science with a minor in Mathematics and Statistics.</p>
          <p>Computers and mathematics gave me an early love for structure and logic. Over time, that analytical foundation turned into product thinking: finding the real problem, working within constraints, and designing a path that makes sense to people.</p>
          <p>Project X Vietnam and the Heading For The Future Product Management competition were formative moments. Both taught me that strong solutions start with a precise understanding of users, systems, and trade-offs.</p>
          <p>Teaching has shaped me just as much. As a peer learning facilitator at QUT and a mathematics tutor, I learned that confusion often comes from a poorly framed problem — not a lack of ability. That lesson stays with me in every product conversation.</p>
        </div>
        <aside className="side-note">
          <p className="eyebrow">Recognition</p>
          <h3>A few markers along the way</h3>
          <ul>
            <li>Champion — Heading For The Future: Product Management, 2025</li>
            <li>2nd Runner-Up — Future Business Analyst, Season 5</li>
            <li>QUT Executive Dean&apos;s Commendation for Academic Excellence</li>
            <li>QUT International Merit Scholarship</li>
          </ul>
        </aside>
      </section>
      <section className="contact-block" aria-label="Contact Anh">
        <p className="eyebrow">Keep in touch</p>
        <a href="mailto:anh.nguyen762005@gmail.com">anh.nguyen762005@gmail.com <span aria-hidden="true">↗</span></a><br />
        <a href="https://linkedin.com/in/anh-nguyen76" target="_blank" rel="noreferrer">LinkedIn / anh-nguyen76 <span aria-hidden="true">↗</span></a>
      </section>
    </>
  );
}
