"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { GithubProject } from "@/lib/github";

function relativeDate(value: string) {
  const days = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 86_400_000));
  if (days === 0) return "Today";
  if (days < 30) return `${days}d ago`;
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(value));
}

const categories = ["All", "Agentic AI", "FinTech", "Data & ML", "Apps", "Other"] as const;

export function Projects({ projects, error }: { projects: GithubProject[]; error: boolean }) {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const featured = useMemo(() => {
    const explicit = projects.filter((project) => project.featured);
    return (explicit.length ? explicit : projects).slice(0, 4);
  }, [projects]);
  const remaining = useMemo(() => {
    const featuredIds = new Set(featured.map((project) => project.id));
    const pool = projects.filter((project) => !featuredIds.has(project.id));
    return category === "All" ? pool : pool.filter((project) => project.category === category);
  }, [category, featured, projects]);

  return (
    <section className="work-section" id="work">
      <div className="section-grid section-grid--heading">
        <p className="section-index">02 / SELECTED SYSTEMS</p>
        <div><h2>Selected<br />Systems</h2><p className="section-deck">Live work across intelligent software, data and markets.</p></div>
      </div>

      {error ? <div className="github-offline"><span>GITHUB FEED / UNAVAILABLE</span><p>The live project index could not be reached. The page will retry on revalidation.</p></div> : <div className="featured-work">
        {featured.map((project, index) => (
          <a className="featured-row" href={project.htmlUrl} target="_blank" rel="noreferrer" key={project.id}>
            <span className="featured-row__number">{String(index + 1).padStart(2, "0")}</span>
            <div className="featured-row__title"><h3>{project.title}</h3><p>{project.description ?? `GitHub project${project.language ? ` · ${project.language}` : ""}`}</p></div>
            <div className="featured-row__meta"><span>{project.category}</span>{project.language && <span>{project.language}</span>}<span>{relativeDate(project.pushedAt)}</span></div>
            <ArrowUpRight className="featured-row__arrow" />
            <div className="featured-row__reveal" aria-hidden="true"><i /><i /><i /><span>{project.name}</span></div>
          </a>
        ))}
      </div>}

      {!error && <div className="project-index">
        <div className="project-index__head"><div><span className="live-dot" /> LIVE FROM GITHUB</div><p>{projects.length} public systems · synced every 10 minutes</p><label>Filter<span className="sr-only"> projects by category</span><select value={category} onChange={(event) => setCategory(event.target.value as typeof category)}>{categories.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={14} /></label></div>
        <div className="project-table" role="table" aria-label="All GitHub projects">
          <div className="project-table__labels" role="row"><span>Project</span><span>Category</span><span>Language</span><span>Updated</span><span /></div>
          {remaining.map((project) => <a href={project.htmlUrl} target="_blank" rel="noreferrer" className="project-table__row" role="row" key={project.id}><strong>{project.title}</strong><span>{project.category}</span><span>{project.language ?? "—"}</span><span>{relativeDate(project.pushedAt)}</span><ArrowUpRight size={17} /></a>)}
        </div>
        {!remaining.length && <p className="project-index__empty">No additional projects in this category yet.</p>}
      </div>}
    </section>
  );
}
