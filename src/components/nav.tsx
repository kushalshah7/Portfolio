"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";
import { useOrchestration } from "./orchestration";

const links = [["Projects","work"],["About","profile"],["Experience","experience"],["Process","process"],["Contact","contact"]] as const;
export function Nav() {
  const { section } = useOrchestration();
  const [open,setOpen] = useState(false);
  const [scrolled,setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(()=>{
    const update=()=>setScrolled(scrollY>32);
    window.addEventListener("scroll",update,{passive:true});
    const initial=requestAnimationFrame(update);
    return()=>{window.removeEventListener("scroll",update);cancelAnimationFrame(initial);};
  },[]);
  useEffect(()=>{
    if(!open)return;
    const key=(e:KeyboardEvent)=>{
      if(e.key==="Escape"){setOpen(false);toggle.current?.focus();}
      if(e.key==="Tab"){
        const elements=Array.from(header.current?.querySelectorAll<HTMLElement>("a,button")??[]).filter(el=>el.getClientRects().length>0);
        const first=elements[0],last=elements[elements.length-1];
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
        if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
      }
    };
    const outside=(e:PointerEvent)=>{if(!header.current?.contains(e.target as Node))setOpen(false);};
    const resized=()=>{if(innerWidth>900)setOpen(false);};
    window.addEventListener("keydown",key);window.addEventListener("pointerdown",outside);window.addEventListener("resize",resized);
    return()=>{window.removeEventListener("keydown",key);window.removeEventListener("pointerdown",outside);window.removeEventListener("resize",resized);};
  },[open]);
  const navigate=()=>setOpen(false);
  return <header ref={header} className={`site-nav ${scrolled||open?"site-nav--scrolled":""}`}>
    <a className="site-mark" href="#top" aria-label="Kushal Shah, home" onClick={navigate}>KS<span>.</span></a>
    <nav id="primary-nav" className={open?"site-links site-links--open":"site-links"} aria-label="Primary navigation">{links.map(([label,target])=><a href={`#${target}`} key={target} aria-current={section===target?"location":undefined} onClick={navigate}>{label}</a>)}<a className="mobile-contact" href={profile.github} target="_blank" rel="noreferrer" onClick={navigate}>GitHub <ArrowUpRight size={16}/></a></nav>
    <a className="site-github" href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15}/></a>
    <button ref={toggle} className="site-menu" aria-label={open?"Close navigation":"Open navigation"} aria-expanded={open} aria-controls="primary-nav" onClick={()=>{setOpen(!open);if(!open)requestAnimationFrame(()=>document.querySelector<HTMLElement>("#primary-nav a")?.focus());}}>{open?<X/>:<Menu/>}</button>
  </header>;
}
