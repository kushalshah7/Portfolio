export type CommandResult = { title: string; body: string; target?: string };
const commands: Record<string, CommandResult> = {
  about:{title:"PROFILE",body:"AI developer building practical systems across software, data and markets.",target:"about"},
  projects:{title:"SYSTEMS INDEX",body:"Loading public repositories from GitHub — filtered, categorized and ranked live.",target:"systems"},
  agentic:{title:"AGENTIC WORKFLOW",body:"Context → Plan → Agents → Tools → Verify → Ship.",target:"agentic"},
  fintech:{title:"FINTECH MODE",body:"Exploring market data, backtesting and quantitative software systems.",target:"systems"},
  data:{title:"DATA MODE",body:"Python, analytics, ML workflows and decision-ready interfaces.",target:"stack"},
  experience:{title:"EXPERIENCE",body:"Presales engineering, solution architecture and agentic internal tooling.",target:"experience"},
  skills:{title:"TOOLCHAIN",body:"Codex, TypeScript, Python, Next.js, SQL, ML and modern APIs.",target:"stack"},
  github:{title:"GITHUB LINK",body:"Opening github.com/kushalshah7",target:"github"},
  contact:{title:"CONTACT CHANNEL",body:"Ready to build something useful.",target:"contact"},
  help:{title:"AVAILABLE COMMANDS",body:"about · projects · agentic · fintech · data · experience · skills · github · contact · help · clear"},
  clear:{title:"CONSOLE CLEARED",body:"What would you like to explore?"}
};
export function runCommand(input:string): CommandResult { const key=input.trim().toLowerCase(); return commands[key] ?? {title:"COMMAND NOT FOUND",body:`“${input}” is not indexed. Type “help” to see available commands.`}; }
