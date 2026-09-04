import { profile } from "@/data/profile";

export type ProjectCategory = "Agentic AI" | "FinTech" | "Data & ML" | "Apps" | "Other";
export type GithubProject = { id: number; name: string; title: string; description: string | null; htmlUrl: string; homepage: string | null; language: string | null; topics: string[]; stars: number; forks: number; pushedAt: string; size: number; category: ProjectCategory; featured: boolean };

type GithubRepo = { id:number; name:string; description:string|null; html_url:string; homepage:string|null; language:string|null; topics:string[]; stargazers_count:number; forks_count:number; pushed_at:string; size:number; fork:boolean; archived:boolean };

function titleCase(value: string) { return value.replace(/[-_]+/g, " ").replace(/\b\w/g, c => c.toUpperCase()); }
function category(repo: GithubRepo): ProjectCategory {
  const haystack = `${repo.name} ${repo.description ?? ""} ${repo.language ?? ""} ${repo.topics.join(" ")}`.toLowerCase();
  if (/agent|llm|gpt|ai-|artificial|mcp|copilot/.test(haystack)) return "Agentic AI";
  if (/fintech|finance|trading|market|stock|portfolio|backtest|quant/.test(haystack)) return "FinTech";
  if (/data|machine-learning|analytics|python|pandas|model|dashboard/.test(haystack)) return "Data & ML";
  if (/app|web|react|next|typescript|javascript|mobile|tool/.test(haystack)) return "Apps";
  return "Other";
}

export async function getGithubProjects(): Promise<{ projects: GithubProject[]; error: boolean }> {
  try {
    const headers: HeadersInit = { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const response = await fetch(`https://api.github.com/users/${profile.githubUser}/repos?type=owner&sort=pushed&direction=desc&per_page=100`, { headers, next: { revalidate: 600 } });
    if (!response.ok) throw new Error(`GitHub ${response.status}`);
    const repos = (await response.json()) as GithubRepo[];
    const visible = repos.filter(r => !r.fork && !r.archived && !r.topics.includes("portfolio-hide"));
    const hasExplicitFeatured = visible.some(r => r.topics.includes("portfolio-featured"));
    return { projects: visible.map((r, index) => ({ id:r.id, name:r.name, title:titleCase(r.name), description:r.description, htmlUrl:r.html_url, homepage:r.homepage || null, language:r.language, topics:r.topics, stars:r.stargazers_count, forks:r.forks_count, pushedAt:r.pushed_at, size:r.size, category:category(r), featured:r.topics.includes("portfolio-featured") || (!hasExplicitFeatured && index < 3 && Boolean(r.description) && r.size > 10) })), error:false };
  } catch { return { projects: [], error:true }; }
}
