import { profile } from "@/data/profile";

export type ProjectCategory = "Agentic AI" | "FinTech" | "Data & ML" | "Apps" | "Other";
export type GithubProject = { id: number; name: string; title: string; description: string | null; htmlUrl: string; homepage: string | null; language: string | null; topics: string[]; stars: number; forks: number; pushedAt: string; size: number; category: ProjectCategory; featured: boolean; private?: boolean };
export type GithubFeed = { projects: GithubProject[]; status: "github" | "fallback"; fetchedAt: string | null };

type GithubRepo = { id:number; name:string; description:string|null; html_url:string; homepage:string|null; language:string|null; topics:string[]; stargazers_count:number; forks_count:number; pushed_at:string; size:number; fork:boolean; archived:boolean };

// A manually curated portfolio summary; private source code is never fetched or linked.
const intradayLab: GithubProject = { id: -7, name: "algo1", title: "Intraday Research Lab", description: "An evidence-first framework for Indian equity strategy research, data validation and cost-aware backtesting.", htmlUrl: "", homepage: null, language: "Python", topics: ["fintech"], stars: 0, forks: 0, pushedAt: "1970-01-01T00:00:00Z", size: 0, category: "FinTech", featured: false, private: true };

const fallbackProjects: GithubProject[] = [
  { id: -6, name: "Duo-Levelling", title: "Duo Levelling", description: "A calisthenics app for workout logging, athlete profiles, progress and a social activity feed.", htmlUrl: `${profile.github}/Duo-Levelling`, homepage: null, language: "TypeScript", topics: ["web-app"], stars: 0, forks: 0, pushedAt: "2026-05-28T09:51:57Z", size: 1, category: "Apps", featured: false },
  intradayLab,
  { id: -5, name: "AI-Audit-Analytics-IT-Controls", title: "Audit Analytics", description: "A reproducible audit analytics and IT controls simulation with traceable evidence and human review.", htmlUrl: `${profile.github}/AI-Audit-Analytics-IT-Controls`, homepage: null, language: "Python", topics: ["data"], stars: 0, forks: 0, pushedAt: "2026-09-21T10:46:55Z", size: 1, category: "Data & ML", featured: false },
  { id: -1, name: "Lumen---AI-Photo-Editor", title: "Lumen Photo AI", description: "A non-destructive photo developer with measured adjustments, full creative control and untouched originals.", htmlUrl: `${profile.github}/Lumen---AI-Photo-Editor`, homepage: null, language: "Python", topics: ["ai-photo-editor"], stars: 0, forks: 0, pushedAt: "2026-08-31T07:26:06Z", size: 1, category: "Agentic AI", featured: false },
  { id: -2, name: "BBHA-BackTesting", title: "BBHA Backtesting", description: "A trading-strategy study that includes execution costs, liquidity and capital constraints.", htmlUrl: `${profile.github}/BBHA-BackTesting`, homepage: null, language: "Python", topics: ["backtesting"], stars: 0, forks: 0, pushedAt: "2026-09-02T12:28:01Z", size: 1, category: "FinTech", featured: false },
  { id: -3, name: "ai-data-exception-triage", title: "Exception Triage", description: "Explainable prioritization and human review for investment-data exceptions.", htmlUrl: `${profile.github}/ai-data-exception-triage`, homepage: null, language: "Python", topics: ["ai", "data"], stars: 0, forks: 0, pushedAt: "2026-05-19T20:23:55Z", size: 1, category: "Data & ML", featured: false },
  { id: -4, name: "low-latency-Order-Matching-Engine", title: "Order Matching Engine", description: "An inspectable development prototype for orders, matching logic and an order book.", htmlUrl: `${profile.github}/low-latency-Order-Matching-Engine`, homepage: null, language: "C++", topics: ["fintech"], stars: 0, forks: 0, pushedAt: "2026-05-02T09:47:28Z", size: 1, category: "FinTech", featured: false },
];

function titleCase(value: string) { return value.replace(/[-_]+/g, " ").replace(/\b\w/g, c => c.toUpperCase()); }
export function category(repo: GithubRepo): ProjectCategory {
  const haystack = `${repo.name} ${repo.description ?? ""} ${repo.language ?? ""} ${repo.topics.join(" ")}`.toLowerCase();
  const explicit: Partial<Record<string, ProjectCategory>> = { "agentic-ai": "Agentic AI", fintech: "FinTech", data: "Data & ML", "machine-learning": "Data & ML", "web-app": "Apps", "developer-tools": "Apps", automation: "Apps" };
  for (const topic of repo.topics) if (explicit[topic]) return explicit[topic]!;
  if (/audit|analytics|data|machine-learning|pandas|dashboard/.test(haystack)) return "Data & ML";
  if (/fintech|finance|trading|market|stock|backtest|quant|option.pricing|credit.risk/.test(haystack)) return "FinTech";
  if (/agent|llm|gpt|ai-|artificial|mcp|copilot/.test(haystack)) return "Agentic AI";
  if (/app|web|react|next|typescript|javascript|mobile|tool/.test(haystack)) return "Apps";
  return "Other";
}

export async function getGithubProjects(): Promise<GithubFeed> {
  try {
    const headers: HeadersInit = { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const repos: GithubRepo[] = [];
    let fetchedAt: string | null = null;
    let page = 1;
    // Each page is cached server-side. Never return an incomplete collection.
    while (true) {
      const response = await fetch(`https://api.github.com/users/${profile.githubUser}/repos?type=owner&sort=pushed&direction=desc&per_page=100&page=${page}`, { headers, next: { revalidate: 600 }, signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error(`GitHub ${response.status}`);
      const batch = (await response.json()) as GithubRepo[];
      if (!Array.isArray(batch)) throw new Error("Invalid GitHub response");
      const responseDate = response.headers.get("date");
      if (responseDate && Number.isFinite(Date.parse(responseDate))) {
        const timestamp = new Date(responseDate).toISOString();
        if (!fetchedAt || timestamp < fetchedAt) fetchedAt = timestamp;
      }
      repos.push(...batch);
      if (!response.headers.get("link")?.includes('rel="next"')) break;
      page += 1;
      if (page > 100) throw new Error("GitHub pagination limit exceeded");
    }
    const visible = repos.filter(r => !r.fork && !r.archived && !r.topics.includes("portfolio-hide"));
    const unique = [...new Map(visible.map(repo => [repo.id, repo])).values()];
    unique.sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at));
    const projects: GithubProject[] = unique.map(r => ({ id:r.id, name:r.name, title:titleCase(r.name), description:r.description, htmlUrl:r.html_url, homepage:r.homepage || null, language:r.language, topics:r.topics, stars:r.stargazers_count, forks:r.forks_count, pushedAt:r.pushed_at, size:r.size, category:category(r), featured:r.topics.includes("portfolio-featured") }));
    // Keep an empty successful feed empty; add the requested private spotlight to a populated feed.
    if (projects.length && !projects.some(project => project.name === intradayLab.name)) projects.push(intradayLab);
    return { projects, status: "github", fetchedAt };
  } catch {
    return { projects: fallbackProjects, status: "fallback", fetchedAt: null };
  }
}
