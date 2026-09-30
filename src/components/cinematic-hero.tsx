import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

const stages = ["CONTEXT", "PLAN", "EXECUTE", "VERIFY", "SHIP"];

export function Hero() {
  return <section className="hero-section" id="hero" aria-labelledby="hero-heading">
    <div className="hero-section__top"><span>00 / INTRODUCTION</span><span>SOFTWARE, AI, DATA &amp; FINANCE</span></div>
    <div className="hero-section__body">
      <p className="eyebrow"><span className="eyebrow__spark"/> HELLO, I’M KUSHAL SHAH</p>
      <h2 id="hero-heading" className="hero-headline"><span className="reveal-line"><span>Complex ideas.</span></span><span className="reveal-line"><span>Working systems.</span></span><span className="reveal-line reveal-line--muted"><span>Built with intent.</span></span></h2>
      <p className="hero-lede">{profile.intro}</p>
      <div className="hero-links"><a className="pill-action pill-action--large" href="#work">Explore selected work <ArrowUpRight size={17}/></a><a className="quiet-link" href="#contact">Let’s connect <ArrowDown size={17}/></a></div>
      <div className="hero-about" data-reveal="up">
        <span>ABOUT / KUSHAL</span>
        <h3>{profile.aboutHeading}</h3>
        <div>{profile.aboutNotes.map(note=><p key={note}>{note}</p>)}</div>
      </div>
    </div>
    <div className="hero-system" aria-label="Engineering process">
      <div className="hero-system__heading"><span>SYSTEM / HOW I BUILD</span><span>HUMAN JUDGMENT AT EVERY BOUNDARY</span></div>
      <div className="hero-system__stages">{stages.map((stage, index) => <div key={stage}><small>0{index + 1}</small>{stage}{index < stages.length - 1 && <span aria-hidden="true"><ArrowRight size={14} strokeWidth={1.5}/></span>}</div>)}</div>
    </div>
    <p className="hero-scroll-cue">SCROLL TO EXPLORE <ArrowDown size={16} strokeWidth={1.5} aria-hidden="true"/></p>
  </section>;
}
