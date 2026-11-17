import Link from "next/link";

export default function NotFound() {
  return (
    <section className="intro">
      <p className="cmd">cd: no such container</p>
      <h1>404</h1>
      <p className="lede">
        That route doesn’t exist. <Link href="/">Back to ~</Link>
      </p>
    </section>
  );
}
