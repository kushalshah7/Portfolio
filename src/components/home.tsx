import { ArrowUpRight, ArrowUp } from "lucide-react";
import type { GithubFeed } from "@/lib/github";
import { profile } from "@/data/profile";
import { Nav } from "./cinematic-nav";
import { Projects } from "./system-projects";
import { Orchestration } from "./cinematic-environment";
import { Hero } from "./cinematic-hero";
import { IdentityPanel } from "./identity-panel";
import { Stack } from "./stack";

export function Home({ projects, status, fetchedAt }: GithubFeed) {
  const jsonLd = { "@context": "https://schema.org", "@type": "Person", name: profile.name, url: profile.siteUrl, telephone: "+917977289901", sameAs: [profile.github, profile.linkedin, profile.studio], jobTitle: "AI Developer", knowsAbout: ["Agentic AI", "Data Engineering", "FinTech", "Software Development"] };
  const contactLinks = [
    { label: "LinkedIn", href: profile.linkedin, external: true },
    { label: "+91 79772 89901", href: profile.phone, external: false },
    { label: "Helicoid Studio", href: profile.studio, external: true },
  ];
  return <Orchestration>
    <a className="skip-link" href="#top">Skip to content</a>
    <Nav />
    <IdentityPanel />
    <main id="top" tabIndex={-1}>
      <Hero />
      <Projects projects={projects} status={status} fetchedAt={fetchedAt}/>
      <section className="editorial-section experience-section" id="experience" aria-labelledby="experience-heading">
        <div className="section-grid section-grid--heading" data-reveal="up"><p className="section-index">02 / EXPERIENCE</p><div><h2 id="experience-heading">Technical depth.<br/><span>Real-world context.</span></h2></div></div>
        <div className="experience-list">{[...profile.experience,...profile.education].map(item=><article key={item.company} data-reveal="right"><time>{item.period}</time><i aria-hidden="true"/><div><p>{item.title}</p><h3>{item.company}</h3>{"details" in item && item.details && <><ul>{item.details.map(detail=><li key={detail}><ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true"/>{detail}</li>)}</ul><p className="experience-domains">TECHNICAL DISCOVERY / NETWORK &amp; SECURITY / AGENTIC TOOLS</p></>}</div></article>)}</div>
      </section>
      <Stack/>
      <section className="contact-section" id="contact" aria-labelledby="contact-heading">
        <div className="contact-inner"><p className="section-index">04 / LET’S CONNECT</p><h2 id="contact-heading">Tell me what<br/><span>you’re working on.</span></h2><div className="contact-bottom"><div className="contact-message"><p>Have something worth building?</p><p>For thoughtful work across agentic AI, software, data and fintech.</p><span className="availability"><i/> AVAILABLE FOR 2027 OPPORTUNITIES</span></div><div><a href={profile.github} target="_blank" rel="noreferrer">Find me on GitHub <ArrowUpRight size={18}/></a>{contactLinks.map(link=><a href={link.href} key={link.label} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined}>{link.label}<ArrowUpRight size={17}/></a>)}</div></div></div>
      </section>
    </main>
    <footer className="site-footer"><a href="#top" aria-label="Back to top">KS<span>.</span></a><p>Kushal Shah / Built with intent.</p><a className="back-top" href="#top">Back to top <ArrowUp size={14}/></a></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\\u003c")}}/>
  </Orchestration>;
}
