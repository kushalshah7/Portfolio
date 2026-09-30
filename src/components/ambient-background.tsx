"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type Signal = { node: number; project?: string; x?: number; y?: number } | null;
type Controls = {
  section: string;
  stage: number;
  paused: boolean;
  activate: (signal: Signal) => void;
  setStage: (stage: number) => void;
  toggleMotion: () => void;
};

const FieldContext = createContext<Controls | null>(null);

export function useOrchestration() {
  const context = useContext(FieldContext);
  if (!context) throw new Error("Ambient controls require their provider");
  return context;
}

export function Orchestration({ children }: { children: ReactNode }) {
  const [section, setSection] = useState("hero");
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const signal = useRef<Signal>(null);
  const scrollPosition = useRef(0);
  const activate = (value: Signal) => { signal.current = value; };

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "off" : "on";
    return () => { delete document.documentElement.dataset.motion; };
  }, [paused]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
    const revealTargets = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    revealTargets.forEach(target => revealObserver.observe(target));

    let frame = 0;
    const update = () => {
      frame = 0;
      scrollPosition.current = window.scrollY;
      const line = innerHeight * 0.44;
      const current = sections.findLast(element => element.getBoundingClientRect().top <= line)?.id ?? "hero";
      setSection(previous => previous === current ? previous : current);
      if (current === "process" && !signal.current) {
        const rect = document.getElementById("process")?.getBoundingClientRect();
        if (rect) setStage(Math.max(0, Math.min(4, Math.floor((-rect.top + line) / Math.max(rect.height, 1) * 5))));
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext("2d", { alpha: false });
    if (!element || !context) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = matchMedia("(pointer: coarse)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let elapsed = 0;
    let previous = 0;
    let pointerX = 0.7;
    let pointerY = 0.45;
    let smoothX = pointerX;
    let smoothY = pointerY;

    const glow = (x: number, y: number, rx: number, ry: number, color: string, strength: number) => {
      context.save();
      context.translate(x * width, y * height);
      context.scale(rx * width, ry * height);
      const gradient = context.createRadialGradient(0, 0, 0, 0, 0, 1);
      gradient.addColorStop(0, `rgba(${color},${strength})`);
      gradient.addColorStop(0.38, `rgba(${color},${strength * 0.46})`);
      gradient.addColorStop(1, `rgba(${color},0)`);
      context.fillStyle = gradient;
      context.fillRect(-1, -1, 2, 2);
      context.restore();
    };
    const draw = (now: number) => {
      frame = 0;
      if (document.hidden) return;
      if (width < 700 && previous && now - previous < 32 && !paused && !reduced.matches) {
        frame = requestAnimationFrame(draw);
        return;
      }
      const still = paused || reduced.matches;
      const delta = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
      previous = now;
      if (!still) elapsed += delta;
      smoothX += (pointerX - smoothX) * 0.035;
      smoothY += (pointerY - smoothY) * 0.035;
      const t = elapsed;
      const drift = Math.sin(t * 0.071 + scrollPosition.current * 0.00018);
      context.globalCompositeOperation = "source-over";
      context.fillStyle = "#07090e";
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "screen";
      glow(0.68 + Math.sin(t * 0.037) * 0.15, 0.30 + Math.cos(t * 0.049) * 0.12, 0.55, 0.62, "19,49,91", 0.55);
      glow(0.18 + Math.cos(t * 0.043) * 0.14, 0.78 + drift * 0.10, 0.49, 0.46, "64,25,77", 0.35);
      glow(0.92 + Math.sin(t * 0.026 + 2) * 0.10, 0.77 + Math.sin(t * 0.047) * 0.09, 0.45, 0.38, "91,28,38", 0.28);
      glow(0.47 + Math.cos(t * 0.033 + 1.5) * 0.19, 0.48 + Math.sin(t * 0.029) * 0.13, 0.44, 0.46, "17,92,109", 0.19);
      if (!coarse.matches) glow(smoothX, smoothY, 0.28, 0.38, "39,105,124", 0.085);
      if (signal.current) glow(0.78, 0.48, 0.36, 0.48, signal.current.node >= 4 ? "119,48,49" : "39,119,129", 0.11);
      context.globalCompositeOperation = "source-over";
      const shade = context.createLinearGradient(0, 0, 0, height);
      shade.addColorStop(0, "rgba(4,6,10,.42)");
      shade.addColorStop(0.5, "rgba(4,6,10,.08)");
      shade.addColorStop(1, "rgba(4,6,10,.46)");
      context.fillStyle = shade;
      context.fillRect(0, 0, width, height);
      if (!still) frame = requestAnimationFrame(draw);
    };
    const requestDraw = () => { if (!frame) frame = requestAnimationFrame(draw); };
    const resize = () => {
      width = innerWidth;
      height = innerHeight;
      const scale = Math.min(devicePixelRatio || 1, width < 700 ? 0.7 : 0.9);
      element.width = Math.ceil(width * scale);
      element.height = Math.ceil(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      requestDraw();
    };
    const move = (event: PointerEvent) => {
      if (coarse.matches) return;
      pointerX = event.clientX / Math.max(width, 1);
      pointerY = event.clientY / Math.max(height, 1);
      if (paused || reduced.matches) requestDraw();
    };
    const visibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else { previous = 0; requestDraw(); }
    };
    resize();
    addEventListener("resize", resize);
    addEventListener("pointermove", move, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", requestDraw);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", move);
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", requestDraw);
    };
  }, [paused]);

  return <FieldContext.Provider value={{ section, stage, paused, activate, setStage, toggleMotion: () => setPaused(value => !value) }}>
    <canvas ref={canvas} className="environment-canvas" aria-hidden="true" />
    <div className="environment-grain" aria-hidden="true" />
    {children}
  </FieldContext.Provider>;
}
