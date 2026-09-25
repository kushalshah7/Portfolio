"use client";

import { profile } from "@/data/profile";
import { useOrchestration } from "./orchestration";

export function Stack() {
  const { activate } = useOrchestration();
  return <section className="editorial-section stack-section" id="stack" aria-labelledby="stack-heading">
    <div className="section-grid section-grid--heading"><p className="section-index">05 / SYSTEM INVENTORY</p><div><h2 id="stack-heading">The right tools.<br/><span>Connected with intent.</span></h2></div></div>
    <div className="stack-index">{Object.entries(profile.stack).map(([group,items],index)=><article key={group}><span>0{index+1}</span><h3>{group}</h3><div className="stack-tools">{items.map(item=><button key={item} onMouseEnter={()=>activate({node:[1,2,3,6][index]})} onMouseLeave={()=>activate(null)} onFocus={()=>activate({node:[1,2,3,6][index]})} onBlur={()=>activate(null)} onClick={()=>activate({node:[1,2,3,6][index]})}>{item}</button>)}</div></article>)}</div>
  </section>;
}
