import { Aperture, ArrowRight, Dumbbell, FileCheck2, GitBranch, SlidersHorizontal } from "lucide-react";
import type { GithubProject } from "@/lib/github";

// Featured facts are taken from each project's public README/results in September 2026.
// Audit: docs/resume_bullets.md; Lumen: photo-ai/README.md and frontend/src/App.tsx;
// BBHA: results/oos_underlying_summary.md and results/option_backtest_summary.md.

function AuditVisual() {
  return <div className="project-visual audit-visual" aria-label="Audit Analytics control pipeline and synthetic results">
    <div className="project-visual__header"><span><FileCheck2 size={15}/> AUDIT / CONTROL ENGINE</span><span>EDUCATIONAL SIMULATION</span></div>
    <div className="audit-visual__heading"><small>TRACEABLE EVIDENCE</small><h4>From source records<br/>to reviewable findings.</h4></div>
    <div className="audit-visual__pipeline">
      <div><small>01 / INGEST</small><strong>82,000</strong><span>SYNTHETIC RECORDS</span></div>
      <ArrowRight size={16} aria-hidden="true"/>
      <div><small>02 / TEST</small><strong>06</strong><span>IT APPLICATION CONTROLS</span></div>
      <ArrowRight size={16} aria-hidden="true"/>
      <div><small>03 / REVIEW</small><strong>526</strong><span>HIGH / CRITICAL FLAGS</span></div>
    </div>
    <div className="audit-visual__register"><span>EXCEPTION REGISTER</span><strong>36,398 risk-scored exceptions</strong><div><i/><i/><i/><i/><i/><i/><i/><i/></div></div>
    <div className="project-visual__footer"><span>RECONCILIATION → CONTROLS → HUMAN REVIEW</span><span>CSV / EXCEL / PDF</span></div>
  </div>;
}

function LumenVisual() {
  return <div className="project-visual lumen-visual" aria-label="Lumen's local photo development workspace structure">
    <div className="project-visual__header"><span><Aperture size={15}/> LUMEN PHOTO AI</span><span>LOCAL PROCESSING</span></div>
    <div className="lumen-visual__workspace">
      <div className="lumen-visual__library"><small>LIBRARY</small><span>IMPORT</span><p>JPEG + RAW<br/>BATCH REVIEW<br/>EDIT HISTORY</p><i/><i/><i/></div>
      <div className="lumen-visual__viewer"><small>DEVELOP / BEFORE &amp; AFTER</small><div className="lumen-visual__aperture"><Aperture size={90} strokeWidth={.55}/><span>ORIGINAL</span><span>DEVELOPED</span></div><p>Natural development.<br/>Originals untouched.</p></div>
      <div className="lumen-visual__inspector"><small>INSPECTOR</small><div><span>EXPOSURE</span><i/></div><div><span>DETAIL</span><i/></div><div><span>COLOR</span><i/></div><div><span>NOISE</span><i/></div><strong><SlidersHorizontal size={15}/> BOUNDED RECIPE</strong></div>
    </div>
    <div className="project-visual__footer"><span>NATURAL / DETAIL / MOOD / ORIGINAL</span><span>REVIEW → JPEG EXPORT</span></div>
  </div>;
}

const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP"];
const monthlyPoints = [-326.70,286.35,-100.68,598.06,768.72,199.70,345.87,-130.27,-105.94];

function BacktestVisual() {
  return <div className="project-visual backtest-visual" aria-label="BBHA actual out-of-sample 2026 monthly NIFTY point results and feasibility gate">
    <div className="project-visual__header"><span><GitBranch size={15}/> BBHA / MARKET RESEARCH</span><span>TRUE OUT-OF-SAMPLE</span></div>
    <div className="backtest-visual__heading"><div><small>FROZEN STRATEGY / 2025—2026</small><h4>Execution reality<br/>changes the result.</h4></div><span className="backtest-visual__verdict">UNDERLYING GATE / PASSED</span></div>
    <div className="backtest-visual__chart"><div className="backtest-visual__axis"/>{monthlyPoints.map((value,index)=><div className="backtest-visual__month" key={months[index]}><i className={value >= 0 ? "is-positive" : "is-negative"} style={{height:`${Math.max(4,Math.abs(value)/768.72*41)}px`}} title={`${months[index]} 2026: ${value.toFixed(2)} NIFTY points`}/><span>{months[index]}</span></div>)}</div>
    <div className="backtest-visual__facts"><div><strong>297</strong><span>OOS TRADES</span></div><div><strong>1.338</strong><span>PROFIT FACTOR</span></div><div><strong>₹16K</strong><span>OPTIONS CAPITAL / INSUFFICIENT</span></div></div>
    <div className="project-visual__footer"><span>UNDERLYING PASSED → OPTIONS FEASIBILITY FAILED</span><span>HISTORICAL RESEARCH</span></div>
  </div>;
}

export function ProjectVisual({ project }: { project: GithubProject }) {
  if (project.name === "Duo-Levelling" || project.name === "algo1") {
    const fitness = project.name === "Duo-Levelling";
    const steps = fitness
      ? [["01 / TRAIN", "Log", "SETS · REPS · WEIGHT"], ["02 / GROW", "Track", "PROGRESS · STREAKS"], ["03 / CONNECT", "Share", "ATHLETES · ACTIVITY"]]
      : [["01 / INSPECT", "Validate", "MARKET CANDLES"], ["02 / DISCOVER", "Research", "CAUSAL FEATURES"], ["03 / EVALUATE", "Stress-test", "COSTS · WALK-FORWARD"]];
    return <div className="project-visual workflow-visual" aria-label={fitness ? "Duo Levelling workout and athlete workflow" : "Intraday Research Lab validation and backtesting workflow"}>
      <div className="project-visual__header"><span>{fitness ? <Dumbbell size={15}/> : <GitBranch size={15}/>} {fitness ? "DUO LEVELLING" : "INTRADAY RESEARCH LAB"}</span><span>{fitness ? "IN DEVELOPMENT" : "AWAITING MARKET DATA"}</span></div>
      <div className="workflow-visual__heading"><small>{fitness ? "CONSISTENCY, TOGETHER" : "EVIDENCE BEFORE STRATEGY"}</small><h4>{fitness ? <>Your training.<br/>Your progress. Your people.</> : <>Test the hypothesis.<br/>Inspect the evidence.</>}</h4></div>
      <div className="workflow-visual__steps">{steps.map(([label, title, detail]) => <div key={label}><small>{label}</small><strong>{title}</strong><span>{detail}</span></div>)}</div>
      <div className="project-visual__footer"><span>{fitness ? "WORKOUT TEMPLATES / ATHLETE PROFILES / SOCIAL FEED" : "DATA QUALITY / FROZEN RULES / EXECUTION REALISM"}</span><span>{fitness ? "TYPESCRIPT" : "PYTHON"}</span></div>
    </div>;
  }
  if (project.name === "AI-Audit-Analytics-IT-Controls") return <AuditVisual/>;
  if (project.name === "Lumen---AI-Photo-Editor") return <LumenVisual/>;
  if (project.name === "BBHA-BackTesting") return <BacktestVisual/>;
  return <div className="project-visual generic-visual" aria-label={`${project.title} source overview`}>
    <div className="project-visual__header"><span><GitBranch size={15}/> PUBLIC REPOSITORY</span><span>{project.category}</span></div>
    <h4>{project.title}</h4><p>{project.description || "Explore the repository's source and documentation."}</p>
    <div className="project-visual__footer"><span>{project.language || "SOURCE"}</span><span>GITHUB / CODE &amp; DOCUMENTATION</span></div>
  </div>;
}
