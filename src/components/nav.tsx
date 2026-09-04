"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "@/data/profile";

const links = [
  ["About", "profile"],
  ["Work", "work"],
  ["Process", "process"],
  ["Experience", "experience"],
] as const;

export function Nav({ onAsk }: { onAsk: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
      <a className="site-mark" href="#top" aria-label="Kushal Shah, home">KS<span>.</span></a>
      <nav className={open ? "site-links site-links--open" : "site-links"} aria-label="Primary navigation">
        {links.map(([label, target]) => <a key={target} href={`#${target}`} onClick={() => setOpen(false)}>{label}</a>)}
        <button className="site-links__ask" onClick={() => { setOpen(false); onAsk(); }}>Ask Kushal_AI</button>
      </nav>
      <a className="site-github" href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a>
      <button className="site-menu" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </header>
  );
}
