import Image from "next/image";
import Link from "next/link";
import GradientField from "./components/GradientField";

const strengths = ["Payments infrastructure", "Product strategy", "Systems thinking", "Making complexity clear"];

export default function Home() {
  return (
    <>
      <section className="home-hero home-hero--gradient" aria-labelledby="home-title">
        <GradientField variant="hero" />
        <div className="hero-content">
          <p className="eyebrow">Anh Nguyen / Product owner</p>
          <h1 id="home-title" className="hero-title">I build bridges between systems, people, and <em>possibility.</em></h1>
          <p className="hero-copy">I&apos;m a product owner working on the infrastructure that helps Vietnamese payments move further — while building communities and ideas that help people grow.</p>
          <div className="hero-links">
            <Link className="button-link" href="/work">Selected work <span aria-hidden="true">↗</span></Link>
            <a className="quiet-link" href="mailto:anh.nguyen762005@gmail.com">Start a conversation <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="strengths-section" aria-labelledby="strengths-title">
        <p id="strengths-title" className="eyebrow section-label">What I bring</p>
        <ul className="strength-list">{strengths.map((strength, index) => <li key={strength}><span className="structural">0{index + 1}</span>{strength}</li>)}</ul>
      </section>

      <section className="featured-work" aria-labelledby="featured-title">
        <div className="section-heading"><p className="eyebrow">Selected work</p><h2 id="featured-title">Two stories I&apos;m proud to be part of.</h2></div>
        <article className="feature-story">
          <p className="structural">01 / Zalopay / Cross-border payments</p>
          <div><h3>Bringing a Vietnamese wallet to the <span>world.</span></h3><p>Building the infrastructure and partnerships behind cross-border payments — where local trust meets global possibility.</p><Link className="text-link" href="/work">Read the work <span aria-hidden="true">↗</span></Link></div>
        </article>
        <article className="feature-story feature-story--projectx">
          <GradientField variant="feature" />
          <p className="structural">02 / Project X Vietnam</p>
          <div><h3>Helping curious people find a place to <span>grow.</span></h3><p>Leading growth, product thinking, and a clearer creative identity for a community building the next generation of problem solvers.</p><Link className="text-link" href="/projects">Explore Project X <span aria-hidden="true">↗</span></Link></div>
        </article>
      </section>

      <section className="philosophy-section" aria-labelledby="philosophy-title">
        <p className="eyebrow">A product philosophy</p>
        <h2 id="philosophy-title">The best systems make the right thing feel <em>natural.</em></h2>
        <p>I&apos;m interested in the details people do not see: the constraints, edge cases, and decisions that turn a complicated system into an experience people can trust.</p>
        <Link className="quiet-link" href="/thinking">Read my notes <span aria-hidden="true">↗</span></Link>
      </section>

      <section className="person-section" aria-labelledby="person-title">
        <div className="portrait-wrap"><Image className="portrait" src="/ava.jpeg" alt="Portrait of Anh Nguyen" width={720} height={900} sizes="(max-width: 720px) 100vw, 33vw" /><span className="portrait-note structural">Based in Vietnam · Thinking globally</span></div>
        <div><p className="eyebrow">Beyond the work</p><h2 id="person-title">A life that keeps the work <em>human.</em></h2><p>From mathematics and teaching to community building, I care about sharing ideas clearly and helping other people find their next step.</p><div className="person-links"><Link className="text-link" href="/about">More about me ↗</Link><Link className="text-link" href="/gallery">A few moments ↗</Link></div></div>
      </section>
    </>
  );
}
