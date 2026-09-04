"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowDownRight, ArrowUpRight, CornerDownLeft, X } from "lucide-react";
import { profile } from "@/data/profile";
import { runCommand, type CommandResult } from "@/lib/commands";

const suggestions = [
  ["01", "Agentic AI projects", "agentic"],
  ["02", "FinTech systems", "fintech"],
  ["03", "Experience", "experience"],
  ["04", "GitHub", "github"],
  ["05", "Tech stack", "skills"],
] as const;

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<CommandResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", keyboard);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", keyboard);
    };
  }, [onClose]);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  function execute(value: string) {
    const response = runCommand(value);
    setResult(response);
    setQuery("");
    if (response.target === "github") window.open(profile.github, "_blank", "noopener,noreferrer");
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (query.trim()) execute(query.trim());
  }

  function followResult() {
    if (!result?.target || result.target === "github") return;
    const targetMap: Record<string, string> = { about: "profile", systems: "work", agentic: "process", stack: "stack" };
    document.getElementById(targetMap[result.target] ?? result.target)?.scrollIntoView({ behavior: "smooth" });
    onClose();
  }

  if (!open) return null;

  return (
    <div className="palette-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="command-palette" role="dialog" aria-modal="true" aria-labelledby="palette-title">
        <header className="palette-header"><span>KUSHAL_AI</span><span className="palette-status">ONLINE <i /></span><button onClick={onClose} aria-label="Close command palette"><X size={17} /></button></header>
        <div className="palette-intro"><p id="palette-title">Ask about my work</p><span>Navigate the portfolio through a focused command index.</span></div>
        <form className="palette-input" onSubmit={submit}>
          <span>&gt;</span><label className="sr-only" htmlFor="kushal-ai-input">Ask about Kushal&apos;s work</label><input ref={inputRef} id="kushal-ai-input" value={query} onChange={(event) => setQuery(event.target.value)} autoComplete="off" placeholder="Type a command or question" />
          <button aria-label="Submit command" disabled={!query.trim()}><CornerDownLeft size={16} /></button>
        </form>
        {result ? <div className="palette-result" aria-live="polite"><span>{result.title}</span><p>{result.body}</p>{result.target && result.target !== "github" && <button onClick={followResult}>Go to section <ArrowDownRight size={15} /></button>}{result.target === "github" && <a href={profile.github} target="_blank">Open GitHub <ArrowUpRight size={15} /></a>}</div> : <div className="palette-suggestions"><span>SUGGESTED</span>{suggestions.map(([number, label, command]) => <button key={number} onClick={() => execute(command)}><i>{number}</i><strong>{label}</strong><ArrowDownRight size={16} /></button>)}</div>}
        <footer><span><kbd>/</kbd> open</span><span><kbd>esc</kbd> close</span><span><kbd>↵</kbd> select</span></footer>
      </section>
    </div>
  );
}
