export const metadata = {
  title: "About — Anh Nguyen",
};

export default function About() {
  return (
    <div>
      <h1>About</h1>

      <p>
        I grew up in Vietnam until the age of 12 before moving to Australia, attending high school in Melbourne and university in Brisbane.
      </p>

      <p>
        I graduated with Distinction from the <strong>Queensland University of Technology</strong> with a Bachelor of Information Technology (Computer Science), minoring in Mathematics and Statistics.
      </p>

      <p>
        I have interacted with computers since the age of 2 and developed an early fascination with mathematics. Math was not only a subject but a <strong>way of thinking about structure and logic.</strong>
      </p>

      <p>
        This analytical foundation later evolved into product thinking. Two key moments shaped this transition:
      </p>

      <ol>
        <li>Working at Project X Vietnam</li>
        <li>Participating in the H4TF Product Management competition (Champion, 2025)</li>
      </ol>

      <p>
        Both experiences emphasised the importance of identifying real problems, designing solutions under constraints, and thinking systematically about users and systems.
      </p>

      <div style={{ marginTop: "3rem" }}>
        <h2>Education & Teaching</h2>
        <p>
          I have experience as a Peers Learning Facilitator for the STIMulate Program at QUT, supporting students in Statistics, Calculus, Algebra, and coding fundamentals. Explaining complex concepts taught me how people actually learn and how clarity changes understanding. This deeply influences my product communication style today.
        </p>

        <p>
          I spent several years tutoring high school mathematics for students preparing for the Victorian Certificate of Education (VCE) and other curriculums in Australia. Teaching math taught me that most struggles come not from difficult concepts, but from poorly framed problems. My role was to identify where understanding broke down and redesign explanations so the logic became intuitive. That mindset carries directly into product management: diagnosing the real problem, simplifying complexity, and designing solutions that make the right path clear for users.
        </p>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2>Awards & Recognition</h2>
        <ul style={{ paddingLeft: "1.25rem" }}>
          <li>Champion – Heading For The Future: Product Management 2025 (AIESEC Vietnam)</li>
          <li>2nd Runner-Up – Future Business Analyst Season 5 (RMIT Business & Finance Club)</li>
          <li>QUT Executive Dean’s Commendation for Academic Excellence</li>
          <li>QUT International Merit Scholarship</li>
        </ul>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2>Contact</h2>
        <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: "1rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>
            Email: <a href="mailto:anh.nguyen762005@gmail.com" style={{ color: "var(--color-accent)" }}>anh.nguyen762005@gmail.com</a>
          </li>
          <li>
            LinkedIn: <a href="https://linkedin.com/in/anh-nguyen76" target="_blank" style={{ color: "var(--color-accent)" }}>linkedin.com/in/anh-nguyen76</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
