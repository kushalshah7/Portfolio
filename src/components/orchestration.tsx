"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type Signal = { node: number; project?: string; x?: number; y?: number } | null;
type FieldState = { section: string; signal: Signal; stage: number; paused: boolean; anchors?: number[][] };
type FieldControls = { section: string; stage: number; paused: boolean; activate: (signal: Signal) => void; setStage: (stage: number) => void; toggleMotion: () => void };
const FieldContext = createContext<FieldControls | null>(null);
export function useOrchestration() {
  const value = useContext(FieldContext);
  if (!value) throw new Error("Orchestration controls require their provider");
  return value;
}
const labels = ["CONTEXT", "AGENT", "TOOLS", "DATA", "VERIFY", "SHIP", "MARKETS"];
const heroPositions = [[.67,.29],[.79,.43],[.9,.29],[.65,.61],[.88,.63],[.78,.77],[.96,.48]];
const edges = [[0,1],[1,2],[1,3],[2,4],[3,4],[4,5],[6,4],[0,3],[2,6]];

export function Orchestration({ children }: { children: ReactNode }) {
  const [section, setSection] = useState("hero");
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const state = useRef<FieldState>({ section: "hero", signal: null, stage: 0, paused: false });
  const canvas = useRef<HTMLCanvasElement>(null);
  const activate = (signal: Signal) => { state.current.signal = signal; };
  const changeStage = (value: number) => { state.current.stage = value; setStage(value); };
  const toggleMotion = () => setPaused(value => { state.current.paused = !value; return !value; });

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "off" : "on";
    return () => { delete document.documentElement.dataset.motion; };
  }, [paused]);

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
    let positions: { id: string; top: number; height: number }[] = [];
    let frame = 0;
    const measure = () => { positions = sections.map(el => ({ id: el.id, top: el.offsetTop, height: el.offsetHeight })); };
    const update = () => {
      frame = 0;
      const y = window.scrollY + window.innerHeight * .4;
      const current = positions.findLast(item => item.top <= y)?.id ?? "hero";
      if (current !== state.current.section) {
        state.current.section = current;
        state.current.signal = null;
        setSection(current);
      }
      const process = positions.find(item => item.id === "process");
      if (current === "process") {
        state.current.anchors = Array.from(document.querySelectorAll(".workflow-node")).map(el => {
          const rect = el.getBoundingClientRect();
          return [(rect.left + rect.width / 2) / innerWidth, (rect.top + rect.height / 2) / innerHeight];
        });
      }
      if (current === "process" && process && !state.current.signal) {
        const next = Math.max(0, Math.min(4, Math.floor((y - process.top) / process.height * 5)));
        if (next !== state.current.stage) { state.current.stage = next; setStage(next); }
      }
    };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(() => { measure(); scroll(); });
    sections.forEach(el => resize.observe(el));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle("in-view", entry.isIntersecting);
        if (entry.isIntersecting && entry.target.hasAttribute("data-keyword")) {
          state.current.signal = { node: Number((entry.target as HTMLElement).dataset.keyword) };
        }
      });
    }, { threshold: .35 });
    document.querySelectorAll(".experience-list article, [data-keyword], .section-index, .section-grid--heading, .featured-project, .profile-notes, .stack-index article").forEach(el => observer.observe(el));
    measure(); update();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => { resize.disconnect(); observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", scroll); document.documentElement.classList.remove("motion-ready"); };
  }, []);

  useEffect(() => {
    const element = canvas.current;
    const ctx = element?.getContext("2d", { alpha: true });
    if (!element || !ctx) return;
    element.dataset.ready = "true";
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = matchMedia("(pointer: coarse)");
    let width = innerWidth, height = innerHeight, raf = 0, time = 0, last = 0, lastScroll = scrollY;
    let pointerX = .8, pointerY = .5, velocity = 0, lastSignature = "";
    const nodes = heroPositions.map(([x,y]) => ({ x, y }));
    const resize = () => {
      width = innerWidth; height = innerHeight;
      const dpr = Math.min(devicePixelRatio || 1, width < 700 ? 1.25 : 1.5);
      element.width = Math.round(width * dpr); element.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); lastSignature = "";
    };
    const pointer = (e: PointerEvent) => { if (!coarse.matches) { pointerX = e.clientX / width; pointerY = e.clientY / height; } };
    const draw = (now: number) => {
      if (document.hidden) { raf = 0; return; }
      if (width < 700 && now - last < 32) { raf = requestAnimationFrame(draw); return; }
      const dt = Math.min((now - last) / 1000 || .016, .05); last = now;
      const { section: area, signal, stage: step, paused: stopped } = state.current;
      const still = motion.matches || stopped;
      const signature = JSON.stringify([area, signal, step, still, width, height, state.current.anchors]);
      if (still && signature === lastSignature) { raf = requestAnimationFrame(draw); return; }
      lastSignature = signature;
      if (!still) time += dt;
      velocity += (Math.min(Math.abs(scrollY - lastScroll) / 30, 2) - velocity) * .08;
      lastScroll = scrollY;
      ctx.clearRect(0, 0, width, height);
      const mobile = width < 700;
      const active = signal?.node ?? (area === "process" ? [0,1,2,4,5][step] : area === "contact" ? 5 : 1);
      nodes.forEach((node, i) => {
        let [x,y] = heroPositions[i];
        if (area === "work") { x = .64 + (i % 3) * .14; y = .24 + Math.floor(i / 3) * .25; }
        if (area === "profile" || area === "stack") { x = .65 + (i % 2) * .26; y = .2 + i * .085; }
        if (area === "process") { const order = [0,1,2,5,3,4,6]; x = .13 + order[i] * .145; y = i === 3 || i === 6 ? .83 : .58; }
        if (area === "experience") { x = .89 + (i % 2 ? .035 : -.035); y = .16 + i * .11; }
        if (area === "contact") { x = .79 + Math.cos(i * Math.PI / 3) * .13; y = .51 + Math.sin(i * Math.PI / 3) * .2; if (i === 5) { x = .79; y = .51; } }
        if (mobile && area !== "process") { x = .22 + (x - .6) * 1.6; y = .23 + y * .65; }
        if (mobile && area === "process") { x = .86; y = .18 + i * .095; }
        if (area === "process") {
          const anchor = state.current.anchors?.[[0,1,2,4,5].indexOf(i)];
          if (anchor) [x,y] = anchor;
        }
        if (signal?.project && i === active && signal.x != null && signal.y != null) { x = signal.x; y = Math.max(.15, Math.min(.9, signal.y)); }
        if (!still) {
          x += Math.sin(time * .23 + i * 2) * .006;
          y += Math.cos(time * .3 + i) * .008 * (1 + velocity);
          if (!coarse.matches && !mobile) { const dx = x - pointerX, dy = y - pointerY; const distance = Math.hypot(dx,dy); if (distance < .3 && distance > .01) { x += dx / distance * .014; y += dy / distance * .014; } }
        }
        const ease = still ? 1 : 1 - Math.exp(-dt * 3.4);
        node.x += (x - node.x) * ease; node.y += (y - node.y) * ease;
      });
      const alpha = area === "hero" ? 1 : area === "process" ? .7 : .42;
      ctx.lineWidth = 1;
      edges.forEach(([a,b], index) => {
        if (mobile && index > 5) return;
        const start = nodes[a], end = nodes[b];
        const sx = start.x * width, sy = start.y * height, ex = end.x * width, ey = end.y * height;
        const cp1x = sx + (ex - sx) * .55, cp2x = sx + (ex - sx) * .45;
        ctx.beginPath(); ctx.moveTo(sx,sy); ctx.bezierCurveTo(cp1x,sy,cp2x,ey,ex,ey);
        ctx.strokeStyle = `rgba(166,255,112,${(a === active || b === active ? .34 : .13) * alpha})`; ctx.stroke();
        if (!still) {
          const p = (time * (.11 + velocity * .025) + index * .19) % 1, q = 1-p;
          const px = q*q*q*sx + 3*q*q*p*cp1x + 3*q*p*p*cp2x + p*p*p*ex;
          const py = q*q*q*sy + 3*q*q*p*sy + 3*q*p*p*ey + p*p*p*ey;
          ctx.fillStyle = `rgba(193,255,161,${.8 * alpha})`; ctx.beginPath(); ctx.arc(px,py,1.8,0,Math.PI*2); ctx.fill();
        }
      });
      nodes.forEach((node,i) => {
        const x = node.x*width, y = node.y*height, lit = i === active;
        const count = mobile ? 1 : 3;
        for (let j=0; j<count; j++) {
          const angle = i * 1.7 + j * 2.1 + (still ? 0 : Math.sin(time*.12+i)*.12);
          const sx = x + Math.cos(angle)*(40+j*21), sy = y + Math.sin(angle)*(35+j*20);
          ctx.strokeStyle = `rgba(166,255,112,${.09*alpha})`; ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(sx,sy); ctx.stroke();
          ctx.fillStyle = `rgba(166,255,112,${.32*alpha})`; ctx.fillRect(sx-1,sy-1,2,2);
        }
        ctx.strokeStyle = `rgba(166,255,112,${(lit ? .65 : .25)*alpha})`;
        ctx.fillStyle = "#080d09"; ctx.beginPath(); ctx.arc(x,y,lit?9:5,0,Math.PI*2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = `rgba(190,255,148,${(lit?1:.6)*alpha})`; ctx.beginPath(); ctx.arc(x,y,lit?3:1.6,0,Math.PI*2); ctx.fill();
        if (lit) { ctx.strokeStyle = `rgba(166,255,112,${.14*alpha})`; ctx.beginPath(); ctx.arc(x,y,22+(still?0:Math.sin(time)*3),0,Math.PI*2); ctx.stroke(); }
        if (area !== "process" && (!mobile || lit)) {
          ctx.font = "10px Consolas, monospace"; ctx.textAlign = "center";
          const text = area === "process" && i === 1 ? "PLAN" : area === "process" && i === 2 ? "EXECUTE" : labels[i];
          ctx.fillStyle = `rgba(190,210,184,${(lit?.9:.6)*alpha})`; ctx.fillText(text,x,y+30);
        }
      });
      if (element.dataset.section !== area) element.dataset.section = area;
      if (element.dataset.active !== String(active)) element.dataset.active = String(active);
      if (element.dataset.motion !== (still ? "static" : "running")) element.dataset.motion = still ? "static" : "running";
      raf = requestAnimationFrame(draw);
    };
    const visibility = () => {
      if (element.parentElement) element.parentElement.dataset.documentHidden = String(document.hidden);
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
      else if (!raf) { last = performance.now(); raf = requestAnimationFrame(draw); }
    };
    const changed = () => { lastSignature = ""; };
    resize(); raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize); window.addEventListener("pointermove", pointer, { passive: true });
    document.addEventListener("visibilitychange", visibility); motion.addEventListener("change", changed);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize",resize); window.removeEventListener("pointermove",pointer); document.removeEventListener("visibilitychange",visibility); motion.removeEventListener("change",changed); };
  }, []);

  return <FieldContext.Provider value={{ section, stage, paused, activate, setStage: changeStage, toggleMotion }}>
    <div className={`orchestration-field field--${section}`} data-paused={paused} aria-hidden="true">
      <div className="ambient-light" /><div className="ambient-light ambient-light--secondary" />
      <svg className="field-fallback" viewBox="0 0 1000 800"><g fill="none" stroke="currentColor"><path d="M650 160C800 160 680 350 810 350S950 500 830 620M650 490C770 490 720 350 810 350L930 210M650 160V490L830 620"/><circle cx="810" cy="350" r="9"/><circle cx="650" cy="160" r="5"/><circle cx="650" cy="490" r="5"/><circle cx="830" cy="620" r="5"/><circle cx="930" cy="210" r="5"/></g></svg>
      <canvas ref={canvas} />
    </div>
    {children}
  </FieldContext.Provider>;
}
