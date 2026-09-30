"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { GithubProject } from "@/lib/github";
import type { ProjectStory } from "@/data/project-stories";
import { safeHomepage } from "@/lib/project-catalog";
import { GithubMark } from "./github-mark";
import { ProjectVisual } from "./project-visuals";
import { observeViewportBand } from "@/lib/viewport-observer";

type Props = {
  featured: GithubProject[];
  storyFor: (project: GithubProject) => ProjectStory;
  open: (project: GithubProject, button: HTMLButtonElement) => void;
};

function ProjectPanel({ project, index, total, story, open }: {
  project: GithubProject; index: number; total: number; story: ProjectStory;
  open: Props["open"];
}) {
  const homepage = safeHomepage(project.homepage);
  return <div className="project-panel__inner">
    <div className="project-panel__top"><span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span><span>{story.category}</span></div>
    <div className="project-panel__body">
      <p className="project-panel__status"><i/>{story.status}</p>
      <h3>{story.title}</h3>
      <p className="project-panel__summary">{story.summary}</p>
      <ul className="project-panel__tools" aria-label="Technologies">{story.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
      <div className="project-panel__outcome"><span>WHAT IT DOES</span><p>{story.outcome}</p></div>
    </div>
    <div className="project-panel__bottom">
      <button className="project-panel__explore" onClick={event => open(project, event.currentTarget)}>Explore project <ArrowRight size={17}/></button>
      <div>{project.htmlUrl ? <a href={project.htmlUrl} target="_blank" rel="noreferrer" aria-label={`${story.title} source on GitHub`}><GithubMark size={16}/><span>Source</span></a> : <span className="private-source">Private source</span>}{homepage && <a href={homepage} target="_blank" rel="noreferrer">Live site <ArrowUpRight size={15}/></a>}</div>
    </div>
  </div>;
}

export function FeaturedSequence({ featured, storyFor, open }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const stopPanelObserver = observeViewportBand([element], ([entry]) => {
      setVisible(entry.isIntersecting);
      document.documentElement.dataset.projectPanel = entry.isIntersecting ? "on" : "off";
    }, .25, .18);
    const scenes = Array.from(element.querySelectorAll<HTMLElement>(".featured-scene"));
    const stopSceneObserver = observeViewportBand(scenes, entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(scenes.indexOf(entry.target as HTMLElement));
      }
    }, .45, .45);
    return () => {
      stopPanelObserver();
      stopSceneObserver();
      delete document.documentElement.dataset.projectPanel;
    };
  }, [featured.length]);

  if (!featured.length) return <p className="project-empty">No featured projects are available right now.</p>;

  return <div className="featured-sequence" ref={root}>
    <div className="project-panel-desktop" data-visible={visible} inert={!visible} aria-label="Active project details">
      {featured.map((project, index) => <div className={`project-panel project-panel--${index}`} data-active={active === index} aria-hidden={active !== index} inert={active !== index} key={project.id}>
        <ProjectPanel project={project} index={index} total={featured.length} story={storyFor(project)} open={open}/>
      </div>)}
    </div>
    <div className="featured-sequence__scenes">
      {featured.map((project, index) => {
        const story = storyFor(project);
        return <article className="featured-scene" key={project.id} data-active={active === index}>
          <div className="featured-scene__image" data-reveal="image">
            <ProjectVisual project={project}/>
            <button className="featured-scene__open" onClick={event => open(project, event.currentTarget)} aria-label={`Explore ${story.title}`}><ArrowUpRight size={18}/></button>
          </div>
          <div className="featured-scene__footer"><span>{String(index + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}</span><div><strong>{story.title}</strong><p>{story.summary}</p></div><ArrowUpRight size={18} aria-hidden="true"/></div>
        </article>;
      })}
    </div>
  </div>;
}
