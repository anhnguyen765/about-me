import Parser from 'rss-parser';

export const metadata = {
  title: "Writing — Anh Nguyen",
};


export default async function Writing() {
  const parser = new Parser();
  let posts: Array<{ title: string; link: string; date: string; snippet: string }> = [];

  try {
    const feed = await parser.parseURL('https://anhnguyen765.substack.com/feed');
    posts = feed.items.slice(0, 3).map(item => {
      const dateObj = item.pubDate ? new Date(item.pubDate) : new Date();
      const dateStr = dateObj.toLocaleDateString('en-AU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      return {
        title: item.title || "Untitled",
        link: item.link || "#",
        date: dateStr,
        snippet: item.contentSnippet
          ? (item.contentSnippet.length > 150 ? item.contentSnippet.substring(0, 150) + '...' : item.contentSnippet)
          : ""
      };
    });
  } catch (error) {
    console.error("Failed to fetch RSS feed:", error);
  }

  return (
    <div>
      <h1>Writing</h1>
      <p>
        I write long-form ideas on Substack, focusing on product thinking, system reasoning, technology reflections, and problem-solving.
      </p>

      <div style={{ marginTop: "3rem" }}>
        <p className="structural" style={{ marginBottom: "1.5rem", color: "var(--color-accent)" }}>RECENT POSTS</p>

        {posts.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem"
          }}>
            {posts.map((post, i) => (
              <a
                key={i}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1.5rem",
                  border: "1px solid rgba(0,0,0,0.1)",
                  borderRadius: "8px",
                  textDecoration: "none",
                  color: "var(--color-primary)"
                }}
              >
                <div className="structural" style={{ fontSize: "0.75rem", marginBottom: "0.5rem", opacity: 0.7 }}>
                  {post.date}
                </div>
                <h3 style={{ marginTop: 0, marginBottom: "0.75rem", fontSize: "1.1rem" }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: "0.9rem", opacity: 0.8, margin: 0, flexGrow: 1 }}>
                  {post.snippet}
                </p>
              </a>
            ))}
          </div>
        ) : (
          <p style={{ opacity: 0.7, fontStyle: "italic" }}>Loading recent posts from Substack...</p>
        )}

        <div style={{ marginTop: "4rem", display: "flex", justifyContent: "center" }}>
          <a
            href="https://substack.com/@anhnguyen765"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              background: "var(--color-accent)",
              color: "#fff",
              fontWeight: 500,
              borderRadius: "4px",
              fontSize: "0.9rem"
            }}
          >
            Explore more to view my profile →
          </a>
        </div>
      </div>
    </div>
  );
}
