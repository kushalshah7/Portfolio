import type { GithubProject, ProjectCategory } from "./github";

export const categories = ["All", "Agentic AI", "FinTech", "Data & ML", "Apps", "Other"] as const;
export type CategoryFilter = "All" | ProjectCategory;
export const curatedProjects = ["Duo-Levelling", "Lumen---AI-Photo-Editor", "algo1"];

export function featuredProjects(projects: GithubProject[]) {
  const rank = (name: string) => {
    const index = curatedProjects.indexOf(name);
    return index < 0 ? curatedProjects.length : index;
  };
  return [...projects].sort((a, b) =>
    Number(b.featured) - Number(a.featured) ||
    rank(a.name) - rank(b.name) ||
    Date.parse(b.pushedAt) - Date.parse(a.pushedAt)
  ).slice(0, 3);
}

export function filterProjects(projects: GithubProject[], category: CategoryFilter, query: string) {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return projects.filter(project => {
    const text = [project.name, project.title, project.description, project.language, project.category, ...project.topics].join(" ").toLocaleLowerCase();
    return (category === "All" || project.category === category) && words.every(word => text.includes(word));
  }).sort((a, b) => Date.parse(b.pushedAt) - Date.parse(a.pushedAt) || a.name.localeCompare(b.name));
}

export function safeHomepage(value: string | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}
