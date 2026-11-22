import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT } from "@/lib/content";
import { getPosts } from "@/lib/substack";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays on product, tech and AI, synced from Substack.",
};

export default async function WritingPage() {
  const posts = await getPosts();

  return (
    <>
      <p className="crumb">
        <Link href="/">← ~</Link>
      </p>
      <section className="intro">
        <p className="cmd">curl -s anhnguyen765.substack.com/feed | head</p>
        <h1>Writing</h1>
        <p className="lede">
          Notes on product, tech, AI, and maybe myself. Pulled from my Substack,
          so new posts appear on their own.
        </p>
      </section>

      <section aria-labelledby="posts">
        <p className="cmd" id="posts">
          ls -lt writing/ <span className="dim"> # {posts.length} posts, newest first</span>
        </p>
        {posts.length === 0 ? (
          <p className="pos">
            Couldn’t reach Substack just now.{" "}
            <a href={CONTACT.substack} target="_blank" rel="noreferrer">
              Read it there ↗
            </a>
          </p>
        ) : (
          <ul className="posts">
            {posts.map((p) => (
              <li key={p.href}>
                <a href={p.href} target="_blank" rel="noreferrer" className="post">
                  <time dateTime={p.date}>{p.date}</time>
                  <span className="post-title">{p.title}</span>
                  {p.description && <span className="post-desc">{p.description}</span>}
                </a>
              </li>
            ))}
          </ul>
        )}
        <p className="more">
          <a href={CONTACT.substack} target="_blank" rel="noreferrer">
            open substack ↗
          </a>
        </p>
      </section>

      <p className="next">
        <Link href="/">cd ~</Link>
      </p>
    </>
  );
}
