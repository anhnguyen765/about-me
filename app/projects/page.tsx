export const metadata = {
  title: "Projects — Anh Nguyen",
};

export default function Projects() {
  return (
    <div>
      <h1>Personal Projects</h1>
      <p>
        Things I have built or contributed to. For each project, I focus on the problem, constraints, solution, and learnings.
      </p>

      <div style={{ marginTop: "3rem" }}>
        <h2>Product Exploration</h2>
        <p className="structural">PROJECT X VIETNAM</p>
        <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: "1rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>Live website: <a href="https://projectxvietnam.org" target="_blank" style={{ textDecoration: "underline", color: "var(--color-accent)" }}>projectxvietnam.org</a></li>
          <li style={{ marginBottom: "0.5rem" }}>Social Media (Facebook): <a href="https://www.facebook.com/techXVn" target="_blank" style={{ textDecoration: "underline", color: "var(--color-accent)" }}>facebook/techXVn</a></li>
          <li style={{ marginBottom: "0.5rem" }}>Social Media (LinkedIn): <a href="https://www.linkedin.com/company/project-x-vietnam" target="_blank" style={{ textDecoration: "underline", color: "var(--color-accent)" }}>linkedin/project-x-vietnam</a></li>
        </ul>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2>OLIU Charity Ordering Platform</h2>
        <p className="structural">WEBSITE DEVELOPER EXPERIMENT</p>
        <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: "1rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>Live platform: <a href="https://oliu-26.vercel.app" target="_blank" style={{ textDecoration: "underline", color: "var(--color-accent)" }}>oliu-26</a></li>
        </ul>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2>Dopameal</h2>
        <p className="structural">PRODUCT MANAGEMENT PROJECT from Breaking into Product Management Course</p>
        <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: "1rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>Live PRD: <a href="https://bpm-dopameal.vercel.app/" target="_blank" style={{ textDecoration: "underline", color: "var(--color-accent)" }}>bpm-dopameal</a></li>
        </ul>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <h2>Competitions & Case Studies</h2>
        <p className="structural">PROJECT X VIETNAM</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "1.5rem" }}>
          <a href="/proposals/Project X__Infina_Final Round_H4TFPM2025.pdf" target="_blank" style={{ fontWeight: 500, padding: "1.5rem", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px" }} >
            📄 Infina Final Round (H4TF:PM 2025)
          </a>
          <a href="/proposals/Project X__Weshare_Round 2_H4TFPM2025.pdf" target="_blank" style={{ fontWeight: 500, padding: "1.5rem", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px" }}>
            📄 Weshare Round 2 (H4TF:PM 2025)
          </a>
          <a href="/proposals/Simpồ_FinInnovate_Round2_FBAC2025.pdf" target="_blank" style={{ fontWeight: 500, padding: "1.5rem", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px" }}>
            📄 Simpồ FinInnovate Round 2 (FBAC 2025)
          </a>
          <a href="/proposals/Simpồ_FinInnovate_Round3_FBAC2025.pdf" target="_blank" style={{ fontWeight: 500, padding: "1.5rem", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px" }}>
            📄 Simpồ FinInnovate Round 3 (FBAC 2025)
          </a>
        </div>
      </div>

      <div style={{ marginTop: "4rem" }}>
        <h2>Graphic Design</h2>
        <p className="structural">PROJECT X VIETNAM</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "1.5rem" }}>
          <img src="/graphicdesign/pjx2025_ebpost.jpg" alt="EB Post" style={{ width: "100%", height: "auto", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.1)" }} />
          <img src="/graphicdesign/pjx2025_recruitment.jpg" alt="Recruitment" style={{ width: "100%", height: "auto", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.1)" }} />
          <img src="/graphicdesign/pjx2026_casetrainer.jpg" alt="Case Trainer" style={{ width: "100%", height: "auto", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.1)" }} />
          <a href="https://www.projectxvietnam.org" target="_blank"><img src="/graphicdesign/pjx_viewmore.png" alt="See more Design" style={{ width: "100%", height: "auto", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.1)" }} /></a>
        </div>
      </div>
    </div >
  );
}
