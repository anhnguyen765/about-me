export default function Home() {
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem", alignItems: "center", width: "100%" }}>
        <div style={{ flex: "1 1 400px" }}>
          <div className="blockquote" style={{ fontSize: "1rem", marginTop: "0", marginBottom: "2rem", borderLeftWidth: "4px" }}>
            <p style={{ color: "var(--color-accent)" }}>Keeping things clear, simple, and human.</p>
          </div>
          <h3>Hi, I'm Anh.</h3>
          <p style={{ marginTop: "1rem" }}>
            I’m a product thinker working at the intersection of payments, infrastructure, and human-centered problem-solving.
          </p>
          <ul>
            <li>Payments infrastructure</li>
            <li>System design</li>
            <li>Product strategy</li>
            <li>Human-centered problem solving</li>
          </ul>
          <p style={{ marginTop: "2rem" }}>
            I currently work as a <strong>Product Owner at Zalopay</strong>, building payment infrastructure and solving large-scale transactional problems.
          </p>
        </div>
        <div style={{ flex: "0 0 250px", display: "flex", justifyContent: "center", margin: "0 auto" }}>
          <img src="/ava.jpeg" alt="Profile" style={{ width: "100%", maxWidth: "250px", borderRadius: "20px" }} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignSelf: "center", justifySelf: "center" }}>
        <h2>Contact</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem"
        }}>
          <a href="mailto:anh.nguyen762005@gmail.com" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "1.5rem",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "8px",
            textDecoration: "none",
            color: "var(--color-primary)"
          }}>
            <p className="structural" style={{ marginBottom: "0.5rem", color: "var(--color-accent)" }}>EMAIL</p>
            <p>anh.nguyen762005@gmail.com</p>
          </a>

          <a href="https://linkedin.com/in/anh-nguyen76" target="_blank" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: "8px",
            padding: "1.5rem",
            textDecoration: "none",
            color: "var(--color-primary)"
          }}>
            <p className="structural" style={{ marginBottom: "0.5rem", color: "var(--color-accent)" }}>LINKEDIN</p>
            <p>anh-nguyen76</p>
          </a>
        </div>

      </div>
    </div>
  );
}
