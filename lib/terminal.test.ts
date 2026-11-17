import { describe, expect, it } from "vitest";
import { complete, run } from "./terminal";

const root = { cwd: "~" };

describe("navigation", () => {
  it("cd opens pages and tracks cwd", () => {
    expect(run("cd zalopay", root)).toMatchObject({ navigate: "/zalopay", cwd: "zalopay" });
    expect(run("cd ~", { cwd: "zalopay" })).toMatchObject({ navigate: "/", cwd: "~" });
    expect(run("cd ..", { cwd: "zalopay" })).toMatchObject({ navigate: "/", cwd: "~" });
  });
  it("cd into a non-page folder only changes cwd", () => {
    const r = run("cd prompts", root);
    expect(r.cwd).toBe("prompts");
    expect(r.navigate).toBeUndefined();
  });
  it("rejects bad targets", () => {
    expect(run("cd nowhere", root).lines[0]).toMatch(/no such/);
    expect(run("cd zalopay/readme.txt", root).lines[0]).toMatch(/not a directory/);
    expect(run("sudo", root).lines[0]).toMatch(/not found/);
  });
});

describe("files", () => {
  it("ls and ls -l", () => {
    expect(run("ls", root).lines[0]).toContain("zalopay/");
    expect(run("ls -l", root).lines[1]).toMatch(/^drwx/);
    expect(run("ls", { cwd: "zalopay" }).lines[0]).toContain("readme.txt");
    expect(run("ls zalopay", root).lines[0]).toContain("principles.txt");
    expect(run("cat about/tools.txt", root).lines.join(" ")).toMatch(/Ghostty/);
    expect(run("cat jora/why.txt", root).lines[0]).toMatch(/^1\. /);
    expect(run("cat project-x/why.txt", root).lines.join(" ")).toMatch(/fellow first/);
    expect(run("cat zalopay/activities.txt", root).lines.join(" ")).toMatch(/linkedin\.com\/posts\/zalopay/);
  });
  it("cat resolves relative paths", () => {
    expect(run("cat zalopay/readme.txt", root).lines[0]).toMatch(/Zalopay/);
    expect(run("cat readme.txt", { cwd: "zalopay" }).lines[0]).toMatch(/Zalopay/);
    expect(run("cat nope.txt", root).lines[0]).toMatch(/no such file/);
  });
  it("grep is case-insensitive", () => {
    expect(run("grep MARKETS zalopay/readme.txt", root).lines[0]).toMatch(/11 markets/);
    expect(run("grep zzz zalopay/readme.txt", root).lines[0]).toMatch(/no lines match/);
  });
});

describe("experience", () => {
  it("prompt prints and copies", () => {
    const r = run("prompt root-cause", root);
    expect(r.copy).toMatch(/product analyst/);
    expect(run("prompt", root).lines.join("\n")).toMatch(/stress-test/);
  });
  it("demo streams a recorded session", () => {
    const r = run("demo", root);
    expect(r.stream?.lines.length).toBeGreaterThan(5);
    expect(r.stream?.lines.some((l) => l.startsWith("$ jora"))).toBe(true);
  });
  it("jora has usage and three streamed steps", () => {
    expect(run("jora", root).lines[0]).toMatch(/illustrative/);
    for (const step of ["scout", "run", "check"]) {
      expect(run(`jora ${step}`, root).stream?.lines.length).toBeGreaterThan(1);
    }
    expect(run("jora run --by device", root).stream?.lines[0]).toMatch(/by device/);
  });
  it("learn lists and shows lessons", () => {
    expect(run("learn", root).lines.length).toBe(6);
    expect(run("learn 2", root).lines[0]).toMatch(/lesson 2/);
    expect(run("learn 9", root).lines[0]).toMatch(/pick/);
  });
  it("opens external links", () => {
    expect(run("open partner", root).open).toMatch(/^mailto:anhn\.pjxvietnam@gmail\.com\?subject=/);
    expect(run("open zalopay", root).open).toBe("https://zalopay.vn/");
  });
});

describe("complete", () => {
  it("commands and paths", () => {
    expect(complete("he")).toBe("help");
    expect(complete("cd zal")).toBe("cd zalopay/");
    expect(complete("cat zalopay/read")).toBe("cat zalopay/readme.txt");
    expect(complete("prompt root")).toBe("prompt root-cause");
    expect(complete("c")).toBeNull();
  });
});
