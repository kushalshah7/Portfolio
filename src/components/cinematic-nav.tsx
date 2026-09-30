"use client";

import { ArrowUpRight, BriefcaseBusiness, Clock3, House, Layers3, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { useOrchestration } from "./cinematic-environment";
import { GithubMark } from "./github-mark";

const links = [
  { label: "Home", target: "top", icon: House },
  { label: "Projects", target: "work", icon: BriefcaseBusiness },
  { label: "Experience", target: "experience", icon: Clock3 },
  { label: "Stack", target: "stack", icon: Layers3 },
  { label: "Contact", target: "contact", icon: Mail },
] as const;

export function Nav() {
  const { section } = useOrchestration();
  return <nav className="dock-nav" aria-label="Primary navigation"><ul>
    {links.map(({ label, target, icon: Icon }) => <li key={target}><a href={`#${target}`} aria-label={label} aria-current={section === (target === "top" ? "hero" : target) ? "location" : undefined}>
      <Icon size={16} strokeWidth={1.65} aria-hidden="true"/><span className="dock-tooltip" aria-hidden="true">{label}</span>
    </a></li>)}
    <li className="dock-nav__external"><a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub, opens in a new tab"><GithubMark size={16}/><span className="dock-tooltip" aria-hidden="true">GitHub <ArrowUpRight size={12}/></span></a></li>
  </ul></nav>;
}
