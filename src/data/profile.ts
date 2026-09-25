export const profile = {
  name: "Kushal Shah",
  role: "AI Developer · Agentic Systems · Data · FinTech",
  intro: "I design and ship data-driven applications, automation systems and fintech tools using agentic AI workflows, structured context and modern software engineering.",
  github: "https://github.com/kushalshah7",
  githubUser: "kushalshah7",
  email: "#contact", // Replace with a public mailto: address.
  linkedin: "https://www.linkedin.com/in/kushalr7/",
  phone: "tel:+917977289901",
  studio: "https://helicoid.studio/",
  resume: "#contact", // Replace with /resume.pdf when uploaded.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kushalr7.tech",
  experience: [{ period: "2026 — Present", company: "Invecto Technologies Pvt. Ltd.", title: "Presales Technical Intern", details: ["Translate requirements into technical architectures", "Shape enterprise networking and security solutions", "Build internal tools with agentic AI workflows", "Support discovery, technical proposals and BoQs"] }],
  education: [{ period: "Education", company: "Dwarkadas J. Sanghvi College of Engineering, Mumbai", title: "B.Tech — Information Technology" }],
  stack: {
    "Agentic Engineering": ["Codex", "Prompt Engineering", "Context Engineering", "MCP", "AI Agents", "GitHub"],
    "Development & Data": ["Python", "TypeScript", "React / Next.js", "SQL", "Pandas", "APIs", "Supabase"],
    "AI / ML": ["Scikit-learn", "TensorFlow / PyTorch", "LLM tooling", "Model evaluation"],
    "Finance / Analytics": ["Backtesting", "Quantitative analysis", "Market data", "Visualization"]
  }
} as const;
