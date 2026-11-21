import { CONTACT } from "./content";

export type Post = {
  title: string;
  description: string;
  href: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
};

const FEED = `${CONTACT.substack}/feed`;

/** Re-fetch the feed at most once per half hour. New posts show up without a redeploy. */
export const REVALIDATE_SECONDS = 1800;

const NAMED: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

export function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : m;
    }
    return NAMED[e.toLowerCase()] ?? m;
  });
}

function tag(block: string, name: string): string {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  if (!m) return "";
  const cdata = m[1].match(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/);
  return cdata ? cdata[1] : decodeEntities(m[1]);
}

/** Pure RSS parser, so it can be tested without the network. */
export function parseFeed(xml: string): Post[] {
  const posts: Post[] = [];
  for (const m of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const block = m[1];
    const title = decodeEntities(tag(block, "title")).trim();
    const href = tag(block, "link").trim();
    const time = Date.parse(tag(block, "pubDate"));
    if (!title || !href.startsWith("https://") || Number.isNaN(time)) continue;
    posts.push({
      title,
      href,
      description: decodeEntities(tag(block, "description")).trim(),
      date: new Date(time).toISOString().slice(0, 10),
    });
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

/** Latest posts from Substack. Returns [] if the feed is unreachable, so pages never break. */
export async function getPosts(limit?: number): Promise<Post[]> {
  try {
    const res = await fetch(FEED, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) return [];
    const posts = parseFeed(await res.text());
    return limit ? posts.slice(0, limit) : posts;
  } catch {
    return [];
  }
}
