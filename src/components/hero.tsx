"use client";

import { useRef } from "react";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import { useOrchestration } from "./orchestration";

const runtime = [["CONTEXT",0],["AGENTS",1],["TOOLS",2],["VERIFY",4],["SHIP",5]] as const;

export function Hero() {
  const { activate, paused, toggleMotion } = useOrchestration();
  const hero = useRef<HTMLElement>(null);
  const moveVisual = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || !hero.current) return;
    const box = hero.current.getBoundingClientRect();
    hero.current.style.setProperty("--pointer-x", `${((event.clientX - box.left) / box.width - .5) * 2}`);
    hero.current.style.setProperty("--pointer-y", `${((event.clientY - box.top) / box.height - .5) * 2}`);
  };
  return <section ref={hero} className="identity-hero" id="hero" aria-labelledby="hero-name" data-motion={paused ? "off" : "on"} onPointerMove={moveVisual}>
    <div className="hero-kicker"><span>PORTFOLIO / 2026</span><span className="availability"><i /> OPEN TO NEW OPPORTUNITIES</span></div>
    <div className="hero-layout">
      <div className="hero-identity">
        <p className="hello">HELLO, I’M</p>
        <h1 id="hero-name">Kushal<br />Shah<span>.</span></h1>
        <p className="identity-role">AI DEVELOPER <span>·</span> MUMBAI, INDIA</p>
      </div>
      <div className="hero-story">
        <span className="hero-label">01 / INTRODUCTION</span>
        <h2>Making complex ideas <em>work in the real world.</em></h2>
        <p className="identity-intro">I design and ship software across AI agents, data applications, and financial systems—with careful engineering behind every decision.</p>
        <div className="identity-actions"><a className="action-primary" href="#work">Explore my work <ArrowUpRight size={18}/></a><a className="text-action" href="#profile">About me <ArrowDown size={18}/></a></div>
      </div>
    </div>
    <div className="hero-bottom"><p>SCROLL TO EXPLORE <span>↓</span></p><p>SOFTWARE / AI / DATA / FINTECH</p></div>
    <div className="runtime-strip"><span className="runtime-label"><i/> THE WAY I BUILD</span><div className="runtime-stages">{runtime.map(([label,node]) => <button key={label} onPointerEnter={() => activate({node})} onPointerLeave={() => activate(null)} onFocus={() => activate({node})} onBlur={() => activate(null)} onClick={() => activate({node})}>{label}<span aria-hidden="true">→</span></button>)}</div><button className="motion-toggle" onClick={toggleMotion} aria-pressed={paused} aria-label={paused ? "Resume background motion" : "Pause background motion"}>{paused ? <Play size={14}/> : <Pause size={14}/>}<span>{paused ? "Motion off" : "Motion on"}</span></button></div>
  </section>;
}
