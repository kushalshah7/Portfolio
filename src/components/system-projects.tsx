"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Search, X, Clock3 } from "lucide-react";
import type { GithubFeed, GithubProject } from "@/lib/github";
import { profile } from "@/data/profile";
import { projectStories, type ProjectStory } from "@/data/project-stories";
import { categories, featuredProjects, filterProjects, safeHomepage, type CategoryFilter } from "@/lib/project-catalog";

const projectVisuals: Record<string, string> = {
  "AI-Audit-Analytics-IT-Controls": "/media/project-audit-green.webp",
  "Lumen---AI-Photo-Editor": "/media/project-lumen-green.webp",
  "BBHA-BackTesting": "/media/project-backtest-green.webp",
};

const dateLabel = (value: string) => new Intl.DateTimeFormat("en", {
  day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
}).format(new Date(value));

function storyFor(project: GithubProject): ProjectStory {
  return projectStories[project.name] ?? {
    title: project.title, category: project.category,
    summary: project.description || `Explore the source, setup and documentation for this ${project.language || "software"} project.`,
    kind: "engine", tools: [project.language, ...project.topics.filter(topic => !topic.startsWith("portfolio-"))].filter((item): item is string => Boolean(item)).slice(0, 4),
    status: "PUBLIC REPOSITORY",
    problem: project.description || "The repository documents this project's purpose and scope.",
    system: `Explore the ${project.language || "source"} implementation and project structure on GitHub.`,
    outcome: "See the repository for current functionality, setup instructions and development status.",
    flow: ["Read the overview", "Explore the code", "Run locally"],
  };
}

export function Projects({ projects, status, fetchedAt }: GithubFeed) {
  const [category, setCategory] = useState<CategoryFilter>("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<GithubProject | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLButtonElement | null>(null);
  const featured = useMemo(() => featuredProjects(projects), [projects]);
  const enriched = useMemo(() => projects.map(project => ({
    ...project,
    title: projectStories[project.name]?.title || project.title,
    description: projectStories[project.name]?.summary || project.description,
  })), [projects]);
  const results = useMemo(() => filterProjects(enriched, category, query), [enriched, category, query]);
  const open = (project: GithubProject, button: HTMLButtonElement) => {
    setSelected(project);
    returnFocus.current = button;
    dialog.current?.showModal();
  };
  const story = selected ? storyFor(selected) : null;

  return <section className="work-section" id="work" aria-labelledby="work-heading">
    <div className="section-grid section-grid--heading">
      <p className="section-index">01 / SELECTED WORK</p>
      <div><h2 id="work-heading">Selected work<span>.</span></h2>
        <p className="section-deck">Projects across AI, data, software and finance. Open a card to see the problem, approach and result.</p>
      </div>
    </div>

    {status === "fallback" && <div className="feed-notice" role="status">
      <span>SHOWING SAVED PROJECTS</span>
      <p>The live GitHub feed is unavailable. Showing saved highlights.</p>
      <a href={profile.github} target="_blank" rel="noreferrer">View current work on GitHub <ArrowUpRight size={16} /></a>
    </div>}

    <div className="featured-projects">
      {featured.map((project, index) => {
        const item = storyFor(project);
        const homepage = safeHomepage(project.homepage);
        return <article className="featured-project" key={project.id}>
          <div className="featured-project__top"><span>0{index + 1} / {item.category}</span><span className="project-status">{item.status}</span></div>
          <div className="featured-project__body">
            <div className="featured-project__visual"><Image src={projectVisuals[project.name] ?? "/media/ambient-city.webp"} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 65vw" /><span>PROJECT / 0{index + 1}</span><button onClick={event => open(project, event.currentTarget)} aria-label={`Explore ${item.title}`}><ArrowUpRight size={22} /></button></div>
            <div className="featured-project__copy">
              <h3><button onClick={event => open(project, event.currentTarget)}>{item.title}<ArrowUpRight size={26} /></button></h3>
              <p>{item.summary}</p>
              <ul className="project-tags" aria-label="Technologies">{item.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
              <div className="project-actions">
                <button onClick={event => open(project, event.currentTarget)}>Explore project <ArrowRight size={16} /></button>
                <a href={project.htmlUrl} target="_blank" rel="noreferrer" aria-label={`${item.title} source on GitHub`}>GitHub <ArrowUpRight size={14} /></a>
                {homepage && <a href={homepage} target="_blank" rel="noreferrer">Visit project <ArrowUpRight size={16} /></a>}
              </div>
            </div>
            <div className="project-evidence">
              <span className="evidence-label">WHAT’S INSIDE</span>
              <ol>{item.flow.map((step, i) => <li key={step}><span>0{i + 1}</span>{step}<ArrowRight size={16} aria-hidden="true" /></li>)}</ol>
              <p>{item.outcome}</p>
            </div>
          </div>
        </article>;
      })}
    </div>

    <div className="project-index">
      <div className="collection-heading">
        <div><p className="section-index">KEEP EXPLORING</p><h3>All projects<span>.</span></h3></div>
        <p>{status === "github" ? <>Public repositories · newest activity first<br />
          {fetchedAt ? <span>GitHub data from <time dateTime={fetchedAt}>{dateLabel(fetchedAt)}</time> · revalidates every 10 min</span> : <span>GitHub data · revalidates every 10 min</span>}
        </> : "Saved highlights · live activity unavailable"}</p>
      </div>
      <div className="project-controls">
        <label className="project-search"><Search size={18} aria-hidden="true" /><span className="sr-only">Search projects</span><input type="search" placeholder="Search projects, tools, ideas…" value={query} onChange={event => setQuery(event.target.value)} /></label>
        <label className="category-select"><span>Category</span><select value={category} onChange={event => setCategory(event.target.value as CategoryFilter)}>{categories.map(item => <option key={item}>{item}</option>)}</select></label>
      </div>
      <div className="collection-summary"><p role="status" aria-live="polite">{results.length} {results.length === 1 ? "project" : "projects"}{query || category !== "All" ? ` matching your filters · ${projects.length} total` : " to explore"}</p>{(query || category !== "All") && <button onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters <X size={14} /></button>}</div>
      <ul className="project-collection">
        {results.map(project => <li key={project.id}>
          <article className="repository-card">
            <div className="repository-card__top"><span>{project.category}</span><ArrowUpRight size={18} aria-hidden="true" /></div>
            <h4><a href={project.htmlUrl} target="_blank" rel="noreferrer">{project.title}<span className="sr-only"> on GitHub</span></a></h4>
            <p>{project.description || `A public ${project.language || "software"} repository. Explore its source and documentation on GitHub.`}</p>
            <div className="repository-card__meta"><span>{project.language || "Source"}</span>{status === "github" ? <time dateTime={project.pushedAt}><Clock3 size={12} aria-hidden="true" />{dateLabel(project.pushedAt)}</time> : <span>Saved highlight</span>}</div>
          </article>
        </li>)}
      </ul>
      {!results.length && <div className="project-empty"><h4>{projects.length ? "Nothing here just yet." : "No public projects to display."}</h4><p>{projects.length ? "Try another search or clear the filters to see all projects." : "Explore GitHub for the latest work."}</p><a className="text-action" href={profile.github} target="_blank" rel="noreferrer">Explore GitHub <ArrowUpRight size={16} /></a></div>}
    </div>

    <dialog className="system-dialog" ref={dialog} onClose={() => returnFocus.current?.focus()} onClick={event => { if (event.target === dialog.current) dialog.current?.close(); }} aria-labelledby="system-title">
      <div className="system-dialog__inner"><button className="dialog-close" autoFocus onClick={() => dialog.current?.close()} aria-label="Close project details"><X size={22} /></button>
        {selected && story && <>
          <p className="section-index">{story.status}</p><h2 id="system-title">{story.title}</h2><p className="dialog-summary">{story.summary}</p>
          <ol className="dossier-flow">{story.flow.map((step, i) => <li key={step}><span>0{i + 1}</span>{step}</li>)}</ol>
          <div className="story-sections">{[["The problem", story.problem], ["The approach", story.system], ["What it does", story.outcome]].map(([heading, copy]) => <section key={heading}><h3>{heading}</h3><p>{copy}</p></section>)}</div>
          <ul className="project-tags" aria-label="Technologies">{story.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
          <div className="project-actions"><a className="action-primary" href={selected.htmlUrl} target="_blank" rel="noreferrer">Explore source <ArrowUpRight size={17} /></a>{safeHomepage(selected.homepage) && <a className="text-action" href={safeHomepage(selected.homepage)!} target="_blank" rel="noreferrer">Visit project <ArrowUpRight size={17} /></a>}</div>
        </>}
      </div>
    </dialog>
  </section>;
}
