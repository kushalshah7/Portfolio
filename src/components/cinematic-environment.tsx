"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { observeViewportBand } from "@/lib/viewport-observer";
import { SignalBackground } from "./signal-background";

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
  const environment = useRef<HTMLDivElement>(null);
  const pointer = useRef<HTMLDivElement>(null);
  const signal = useRef<Signal>(null);
  const activate = useCallback((value: Signal) => {
    signal.current = value;
    if (environment.current) environment.current.dataset.signal = value ? "on" : "off";
  }, []);
  const toggleMotion = useCallback(() => setPaused(value => !value), []);
  const controls = useMemo(() => ({ section, stage, paused, activate, setStage, toggleMotion }), [section, stage, paused, activate, toggleMotion]);

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "off" : "on";
    return () => { delete document.documentElement.dataset.motion; };
  }, [paused]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
    const identity = document.querySelector<HTMLElement>(".identity-panel");
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

    const stopSectionObserver = observeViewportBand(identity ? [identity, ...sections] : sections, entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) setSection(entry.target.id || "hero");
      }
    }, .4, .55);
    return () => {
      revealObserver.disconnect();
      stopSectionObserver();
    };
  }, []);

  useEffect(() => {
    const element = pointer.current;
    if (!element || paused || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let x = 65;
    let y = 45;
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" || reducedMotion.matches || document.hidden) return;
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(() => {
        element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        frame = 0;
      });
    };
    addEventListener("pointermove", move, { passive: true });
    return () => { removeEventListener("pointermove", move); cancelAnimationFrame(frame); };
  }, [paused]);

  useEffect(() => {
    const update = () => { document.documentElement.dataset.visibility = document.hidden ? "hidden" : "visible"; };
    update();
    document.addEventListener("visibilitychange", update);
    return () => {
      document.removeEventListener("visibilitychange", update);
      delete document.documentElement.dataset.visibility;
    };
  }, []);

  return <FieldContext.Provider value={controls}>
    <div className="environment-shell" ref={environment} data-section={section} data-signal="off" aria-hidden="true">
      <SignalBackground/>
      <div className="environment-veil"/>
      <div className="environment-pointer" ref={pointer}/>
      <div className="environment-signal"/>
    </div>
    <div className="environment-grain" aria-hidden="true"/>
    {children}
  </FieldContext.Provider>;
}
