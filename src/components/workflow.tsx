"use client";

import { ArrowRight } from "lucide-react";
import { useOrchestration } from "./orchestration";

const steps = [
  { name: "CONTEXT", node: 0, title: "Understand before acting.", copy: "Give the system a clear problem, useful knowledge and a definition of done.", tools: "AGENTS.md · prompt.md · scoped knowledge · requirements" },
  { name: "PLAN", node: 1, title: "Make the next move deliberate.", copy: "Turn the brief into architecture, bounded tasks and decisions that can be reviewed.", tools: "architecture · constraints · tasks · acceptance criteria" },
  { name: "EXECUTE", node: 2, title: "Put the right tools to work.", copy: "Use agents to build in small, inspectable steps, with context carried between tools.", tools: "Codex · agents · MCP · APIs · GitHub · tools" },
  { name: "VERIFY", node: 4, title: "Trust comes from evidence.", copy: "Check the behavior, challenge the assumptions and review what the system actually produced.", tools: "tests · builds · data validation · human review" },
  { name: "SHIP", node: 5, title: "Finish with a working system.", copy: "Deliver usable software with the documentation and deployment needed to put it to work.", tools: "deployment · documentation · working product" },
] as const;

export function Workflow() {
  const { stage, setStage, activate } = useOrchestration();
  const choose = (index:number) => { setStage(index); activate({node:steps[index].node}); };
  return <section className="editorial-section workflow-section" id="process" aria-labelledby="workflow-heading">
    <div className="section-grid section-grid--heading"><p className="section-index">04 / AGENTIC WORKFLOW</p><div><h2 id="workflow-heading">From context<br/><span>to shipped system.</span></h2><p className="section-deck">One connected workflow. Human judgment at every boundary.</p></div></div>
    <div className="workflow-interface">
      <div className="workflow-tabs" role="tablist" aria-label="Agentic workflow stages" onMouseLeave={()=>activate(null)} onKeyDown={e=>{
        let next=stage;
        if(e.key==="ArrowRight"||e.key==="ArrowDown")next=(stage+1)%5;
        else if(e.key==="ArrowLeft"||e.key==="ArrowUp")next=(stage+4)%5;
        else if(e.key==="Home")next=0;
        else if(e.key==="End")next=4;
        else return;
        e.preventDefault(); choose(next); document.getElementById(`stage-${next}`)?.focus();
      }}>
        {steps.map((step,index)=><button id={`stage-${index}`} key={step.name} role="tab" aria-selected={stage===index} aria-controls="workflow-panel" tabIndex={stage===index?0:-1} className={stage===index?"is-active":""} onMouseEnter={()=>choose(index)} onClick={()=>choose(index)} onFocus={()=>choose(index)} onBlur={e=>{if(!e.currentTarget.parentElement?.contains(e.relatedTarget))activate(null);}}><span className="step-number">0{index+1}</span><i className="workflow-node"/><strong>{step.name}</strong><ArrowRight size={15}/></button>)}
      </div>
      <div id="workflow-panel" className="workflow-panel" role="tabpanel" aria-labelledby={`stage-${stage}`} tabIndex={0}>
        <span className="workflow-counter">0{stage+1}<small> / 05</small></span>
        <div key={stage} className="workflow-description"><h3>{steps[stage].title}</h3><p>{steps[stage].copy}</p><span>{steps[stage].tools}</span></div>
        <span className="workflow-note">SELECT A STAGE<br/>FOLLOW THE SIGNAL</span>
      </div>
    </div>
  </section>;
}
