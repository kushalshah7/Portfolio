"use client";

import { ArrowDownRight, ArrowUpRight, Pause, Play } from "lucide-react";
import { profile } from "@/data/profile";
import { useOrchestration } from "./cinematic-environment";
import { GithubMark } from "./github-mark";

export function IdentityPanel() {
  const { paused, toggleMotion } = useOrchestration();
  return <aside className="identity-panel" aria-label="Kushal Shah profile">
    <div className="identity-panel__top">
      <a className="identity-panel__mark" href="#top" aria-label="Kushal Shah, back to top">KS<span>.</span></a>
      <a className="identity-panel__social" href={profile.github} target="_blank" rel="noreferrer" aria-label="Kushal Shah on GitHub"><GithubMark size={16}/></a>
    </div>
    <div className="identity-art" aria-hidden="true"><span>KS</span><i/><b>ENGINEERED<br/>WITH INTENT</b></div>
    <div className="identity-panel__content">
      <p className="status-line"><i/> AVAILABLE FOR 2027 OPPORTUNITIES</p>
      <p className="identity-panel__eyebrow">AI DEVELOPER / MUMBAI, INDIA</p>
      <h1>Kushal<br/>Shah<span>.</span></h1>
      <p className="identity-panel__role">Agentic AI <em>·</em> Software <em>·</em> Data <em>·</em> FinTech</p>
      <p className="identity-panel__intro">{profile.aboutHeading}</p>
      <div className="identity-panel__actions">
        <a className="round-action" href="#work" aria-label="Explore selected work"><ArrowDownRight size={19}/></a>
        <a className="pill-action" href="#contact">Let’s talk <ArrowUpRight size={16}/></a>
      </div>
    </div>
    <div className="identity-panel__footer"><span>KUSHAL / PORTFOLIO_2026</span><button onClick={toggleMotion} aria-pressed={paused} aria-label={paused ? "Resume ambient motion" : "Pause ambient motion"}>{paused ? <Play size={14}/> : <Pause size={14}/>}</button></div>
  </aside>;
}
