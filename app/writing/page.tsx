import Parser from "rss-parser";
import PageIntro from "../components/PageIntro";

export const metadata = { title: "Writing — Anh Nguyen" };

export default async function Writing() {
  const parser = new Parser();
  let posts: Array<{ title: string; link: string; date: string; snippet: string }> = [];
  try {
    const feed = await parser.parseURL("https://anhnguyen765.substack.com/feed");
    posts = feed.items.slice(0, 3).map((item) => ({
      title: item.title || "Untitled",
      link: item.link || "#",
      date: item.pubDate ? new Date(item.pubDate).toLocaleDateString("en-AU", { year: "numeric", month: "short", day: "numeric" }) : "Recent",
      snippet: item.contentSnippet ? `${item.contentSnippet.slice(0, 150)}${item.contentSnippet.length > 150 ? "…" : ""}` : "",
    }));
  } catch (error) { console.error("Failed to fetch RSS feed:", error); }

  return (
    <>
      <PageIntro eyebrow="Long-form writing" title="Writing helps me notice what I think.">
        <p>I write on Substack about product thinking, systems, technology, and the discipline of staying curious when the answer is not obvious.</p>
      </PageIntro>
      {posts.length > 0 ? <div className="writing-grid">{posts.map((post) => <a className="writing-card" key={post.link} href={post.link} target="_blank" rel="noreferrer"><span className="structural">{post.date}</span><h3>{post.title}</h3><p>{post.snippet}</p><span className="eyebrow">Read essay ↗</span></a>)}</div> : <p className="essay">The latest notes are being collected. <a className="text-link" href="https://substack.com/@anhnguyen765" target="_blank" rel="noreferrer">Visit my Substack ↗</a></p>}
      <p className="essay"><a className="button-link" href="https://substack.com/@anhnguyen765" target="_blank" rel="noreferrer">Explore all writing <span aria-hidden="true">↗</span></a></p>
    </>
  );
}
