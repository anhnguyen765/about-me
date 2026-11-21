import { describe, expect, it } from "vitest";
import { decodeEntities, parseFeed } from "./substack";

const item = (title: string, date: string, link = "https://x.substack.com/p/a") => `<item>
<title><![CDATA[${title}]]></title>
<description><![CDATA[V&#7873; AI &amp; me]]></description>
<link>${link}</link><pubDate>${date}</pubDate></item>`;

describe("parseFeed", () => {
  it("reads CDATA titles, decodes entities, formats dates, sorts newest first", () => {
    const xml = `<rss><channel><title>Anh</title>${item("Old", "Mon, 01 Jun 2026 10:00:00 GMT")}${item(
      "New",
      "Fri, 30 Oct 2026 16:56:14 GMT",
    )}</channel></rss>`;
    const posts = parseFeed(xml);
    expect(posts.map((p) => p.title)).toEqual(["New", "Old"]);
    expect(posts[0].date).toBe("2026-10-30");
    expect(posts[0].description).toBe("Về AI & me");
  });
  it("skips items without a title, https link or valid date", () => {
    expect(parseFeed(item("", "Fri, 30 Oct 2026 16:56:14 GMT"))).toEqual([]);
    expect(parseFeed(item("A", "not a date"))).toEqual([]);
    expect(parseFeed(item("A", "Fri, 30 Oct 2026 16:56:14 GMT", "javascript:alert(1)"))).toEqual([]);
  });
  it("returns [] for garbage", () => {
    expect(parseFeed("<html>nope</html>")).toEqual([]);
  });
});

describe("decodeEntities", () => {
  it("handles named, decimal and hex, leaves unknown alone", () => {
    expect(decodeEntities("&amp;&#8220;&#x1F600;&bogus;")).toBe("&“😀&bogus;");
  });
});
