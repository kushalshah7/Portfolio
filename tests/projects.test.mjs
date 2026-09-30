import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

// Compile the real pure TypeScript modules without requiring a Next server.
function load(path, fetch) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
  const compiled = { exports: {} };
  runInNewContext(outputText, {
    module: compiled, exports: compiled.exports, fetch, URL, AbortSignal, process: { env: {} },
    require: name => {
      assert.equal(name, "@/data/profile");
      return { profile: { githubUser: "test-user", github: "https://github.com/test-user" } };
    },
  });
  return compiled.exports;
}
const catalog = load("../src/lib/project-catalog.ts");
const project = (id, name, category = "Apps", date = "2026-09-01T00:00:00Z") => ({
  id, name, title: name, description: "A useful application", category,
  language: "TypeScript", topics: [], featured: false, pushedAt: date,
});
const repo = (id, extra = {}) => ({
  id, name: "web-app", description: "An app", html_url: "https://github.com/test-user/web-app",
  homepage: null, language: "TypeScript", topics: [], stargazers_count: 0,
  forks_count: 0, pushed_at: "2026-09-01T00:00:00Z", size: 20, fork: false, archived: false, ...extra,
});
const response = (body, headers = {}) => new Response(JSON.stringify(body), { headers });
const ids = value => Array.from(value, item => item.id);

test("featured projects use curation, with an explicit GitHub override", () => {
  const items = [
    project(1, "latest", "Apps", "2026-09-22T00:00:00Z"),
    project(2, "algo1"), project(3, "Lumen---AI-Photo-Editor"),
    project(4, "Duo-Levelling"), project(5, "AI-Audit-Analytics-IT-Controls"), project(6, "BBHA-BackTesting"),
  ];
  assert.deepEqual(ids(catalog.featuredProjects(items)), [4, 3, 2]);
  items[0].featured = true;
  assert.deepEqual(ids(catalog.featuredProjects(items)), [1, 4, 3]);
});

test("search combines words and category, retains featured entries, and sorts by push", () => {
  const items = [project(1, "old"), { ...project(2, "new", "Apps", "2026-09-22T00:00:00Z"), featured: true }, project(3, "finance", "FinTech")];
  assert.deepEqual(ids(catalog.filterProjects(items, "Apps", "  TYPESCRIPT useful ")), [2, 1]);
  assert.deepEqual(ids(catalog.filterProjects(items, "All", "")), [2, 3, 1]);
  assert.equal(catalog.filterProjects(items, "Apps", "no match").length, 0);
  assert.deepEqual(ids(items), [1, 2, 3], "input order is not mutated");
});

test("demo links reject executable, malformed and credential-bearing URLs", () => {
  for (const value of [null, "javascript:alert(1)", "//example.com", "not a URL", "https://user:password@example.com"]) assert.equal(catalog.safeHomepage(value), null);
  assert.equal(catalog.safeHomepage("https://example.com/demo"), "https://example.com/demo");
});

test("GitHub follows pagination, deduplicates and excludes hidden repositories", async () => {
  const calls = [];
  const api = load("../src/lib/github.ts", async (url, options) => {
    calls.push(url);
    assert.equal(options.next.revalidate, 600);
    assert.equal(options.headers.Authorization, undefined);
    return calls.length === 1
      ? response([repo(1), repo(2, { fork: true }), repo(3, { archived: true }), repo(4, { topics: ["portfolio-hide"] })], { link: '<https://api.github.com/page=2>; rel="next"', date: "Tue, 22 Sep 2026 10:00:00 GMT" })
      : response([repo(1), repo(5, { name: "new", pushed_at: "2026-09-21T00:00:00Z" })], { date: "Tue, 22 Sep 2026 10:01:00 GMT" });
  });
  const feed = await api.getGithubProjects();
  assert.equal(calls.length, 2);
  assert.match(calls[1], /page=2$/);
  assert.deepEqual(ids(feed.projects), [5, 1, -7]);
  const privateSpotlight = feed.projects.find(item => item.name === "algo1");
  assert.equal(privateSpotlight.title, "Intraday Research Lab");
  assert.equal(privateSpotlight.htmlUrl, "");
  assert.equal(privateSpotlight.private, true);
  assert.equal(feed.status, "github");
  assert.equal(feed.fetchedAt, "2026-09-22T10:00:00.000Z");
});

test("rate limits and network errors are explicitly labeled fallback", async () => {
  for (const fetch of [async () => new Response("", { status: 403 }), async () => { throw new Error("offline"); }]) {
    const feed = await load("../src/lib/github.ts", fetch).getGithubProjects();
    assert.equal(feed.status, "fallback");
    assert.equal(feed.fetchedAt, null);
    assert.ok(feed.projects.some(item => item.name === "AI-Audit-Analytics-IT-Controls"));
    assert.deepEqual(Array.from(catalog.featuredProjects(feed.projects), item => item.name), ["Duo-Levelling", "Lumen---AI-Photo-Editor", "algo1"]);
  }
});

test("failure on a later page never presents an incomplete collection as live", async () => {
  let count = 0;
  const feed = await load("../src/lib/github.ts", async () => ++count === 1
    ? response([repo(1)], { link: '<https://api.github.com/page=2>; rel="next"' })
    : new Response("", { status: 500 })).getGithubProjects();
  assert.equal(feed.status, "fallback");
});

test("an empty successful collection stays empty and does not fabricate freshness", async () => {
  const feed = await load("../src/lib/github.ts", async () => response([])).getGithubProjects();
  assert.equal(feed.status, "github");
  assert.equal(feed.projects.length, 0);
  assert.equal(feed.fetchedAt, null);
});

test("explicit categories win and a personal portfolio is not categorized as finance", () => {
  const { category } = load("../src/lib/github.ts");
  assert.equal(category(repo(1, { name: "Portfolio" })), "Apps");
  assert.equal(category(repo(2, { name: "AI-Audit-Analytics-IT-Controls" })), "Data & ML");
  assert.equal(category(repo(3, { name: "AI market data", topics: ["fintech"] })), "FinTech");
});
