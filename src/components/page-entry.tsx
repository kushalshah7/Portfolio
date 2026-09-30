"use client";

import { useLayoutEffect } from "react";

export function PageEntry() {
  useLayoutEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (navigation?.type === "back_forward") return;
    if (location.hash === "#hero") history.replaceState(history.state, "", "#top");
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";
    const reset = () => {
      if (!location.hash || location.hash === "#top") window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    const onPageShow = (event: PageTransitionEvent) => { if (!event.persisted) reset(); };
    reset();
    const frame = requestAnimationFrame(reset);
    addEventListener("pageshow", onPageShow);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("pageshow", onPageShow);
      history.scrollRestoration = previous;
    };
  }, []);
  return null;
}
