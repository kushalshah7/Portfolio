"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { GithubProject } from "@/lib/github";
import { profile } from "@/data/profile";
import { Nav } from "./nav";
import { Projects } from "./projects";
import { CommandPalette } from "./command-palette";

const processSteps = [
  { name: "CONTEXT", text: "AGENTS.md · prompt.md · structured project knowledge" },
  { name: "PLAN", text: "scope · constraints · acceptance criteria · architecture" },
  { name: "EXECUTE", text: "Codex · specialized agents · APIs · tools · MCP" },
  { name: "VERIFY", text: "tests · build checks · data validation · human review" },
  { name: "SHIP", text: "working application · deployment · documentation" },
] as const;

export function Home({ projects, error }: { projects: GithubProject[]; error: boolean }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const open = () => setPaletteOpen(true);
    const keyboard = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const typing = target.tagName === "INPUT" || target.tagName === "TEXTAREA";
      if ((event.key === "/" && !typing) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k")) {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("open-kushal-ai", open);
    window.addEventListener("keydown", keyboard);
    return () => {
      window.removeEventListener("open-kushal-ai", open);
      window.removeEventListener("keydown", keyboard);
    };
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: profile.siteUrl,
    sameAs: [profile.github],
    jobTitle: "AI Developer",
    knowsAbout: ["Agentic AI", "Data Engineering", "FinTech", "Software Development"],
  };

  return (
    <>
      <Nav onAsk={() => setPaletteOpen(true)} />
      <main id="top">
        <section className="cinematic-hero">
          <div className="hero-film" aria-hidden="true">
            <video autoPlay muted loop playsInline poster="/media/hero-poster.webp"><source src="/media/hero-bg.webm" type="video/webm" /><source src="/media/hero-bg.mp4" type="video/mp4" /></video>
            <div className="hero-film__network"><i /><i /><i /><i /><i /><i /></div>
          </div>
          <div className="hero-frame">
            <div className="hero-kicker"><span>KUSHAL SHAH / 2026</span><span className="hero-availability"><i /> AVAILABLE FOR 2027 OPPORTUNITIES</span></div>
            <div className="hero-title-wrap">
              <h1>Building intelligent systems<br /><span>across AI, data &amp; markets.</span></h1>
            </div>
            <div className="hero-footer">
              <p>{profile.role}</p>
              <div className="hero-actions"><a href="#work">Explore work <ArrowDown size={15} /></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a></div>
              <button className="ask-trigger" onClick={() => setPaletteOpen(true)}><span>ASK KUSHAL_AI</span><ArrowDownRight size={18} /><kbd>/</kbd></button>
            </div>
          </div>
          <a className="hero-scroll" href="#profile" aria-label="Scroll to profile"><span>SCROLL</span><i /></a>
        </section>

        <section className="editorial-section profile-section" id="profile">
          <div className="section-grid">
            <p className="section-index">01 / PROFILE</p>
            <div className="profile-copy">
              <h2>I work at the intersection of software, intelligent systems and financial technology.</h2>
              <div className="profile-notes"><p>I use AI-assisted engineering to move from a precise problem definition to working software—without giving up architecture, testing or review.</p><p>My work spans agentic workflows, data and ML applications, market systems, APIs and enterprise technical discovery.</p></div>
            </div>
          </div>
        </section>

        <Projects projects={projects} error={error} />

        <section className="editorial-section process-section" id="process">
          <div className="section-grid section-grid--heading"><p className="section-index">03 / HOW I BUILD</p><div><h2>Agentic by workflow,<br /><span>engineered with discipline.</span></h2><p className="section-deck">AI changes the execution loop. The engineering standard stays.</p></div></div>
          <div className="process-interface">
            <div className="process-line" aria-hidden="true"><i style={{ left: `${activeStep * 25}%` }} /></div>
            <div className="process-tabs" role="tablist" aria-label="Agentic workflow">
              {processSteps.map((step, index) => <button key={step.name} className={activeStep === index ? "is-active" : ""} onMouseEnter={() => setActiveStep(index)} onFocus={() => setActiveStep(index)} onClick={() => setActiveStep(index)} role="tab" aria-selected={activeStep === index}><span>0{index + 1}</span>{step.name}</button>)}
            </div>
            <div className="process-detail" role="tabpanel"><span>{processSteps[activeStep].name}</span><p>{processSteps[activeStep].text}</p></div>
          </div>
        </section>

        <section className="editorial-section experience-section" id="experience">
          <div className="section-grid section-grid--heading"><p className="section-index">04 / EXPERIENCE</p><div><h2>Technical depth,<br /><span>commercial context.</span></h2></div></div>
          <div className="experience-list">
            {[...profile.experience, ...profile.education].map((item) => <article key={item.company}><time>{item.period}</time><i /><div><p>{item.title}</p><h3>{item.company}</h3>{"details" in item && item.details && <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>}</div></article>)}
          </div>
        </section>

        <section className="editorial-section stack-section" id="stack">
          <div className="section-grid section-grid--heading"><p className="section-index">TOOLS / INDEX</p><div><h2>A focused toolchain<br /><span>for shipping systems.</span></h2></div></div>
          <div className="stack-index">{Object.entries(profile.stack).map(([group, items], index) => <article key={group}><span>0{index + 1}</span><h3>{group}</h3><p>{items.join(" / ")}</p></article>)}</div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-inner"><p className="section-index">05 / CONTACT</p><h2>Have something<br />worth building?</h2><div className="contact-bottom"><p>For thoughtful work across agentic AI, data, software and fintech.</p><div><a href={profile.email}>Email <ArrowUpRight size={17} /></a><a href={profile.linkedin}>LinkedIn <ArrowUpRight size={17} /></a><a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={17} /></a><a href={profile.resume}>Resume <ArrowUpRight size={17} /></a></div></div></div>
        </section>
      </main>
      <footer className="site-footer"><a href="#top">KS<span>.</span></a><p>Kushal Shah / AI · Data · FinTech</p><small>© {new Date().getFullYear()}</small></footer>
      {paletteOpen && <CommandPalette open onClose={() => setPaletteOpen(false)} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
