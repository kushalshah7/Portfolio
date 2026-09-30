// Editorial enrichment only. Repository membership, links and refreshes stay GitHub-driven.
// Sources: repository READMEs (Lumen: photo-ai/README.md) and Duo's current-state docs.
// algo1 is a manually curated overview; its source remains private.
// Featured project descriptions reviewed 2026-09-30; outcomes are not impact claims.
export type ProjectStory = { title: string; category: string; summary: string; kind: "image" | "market" | "triage" | "engine"; tools: string[]; status: string; problem: string; system: string; outcome: string; flow: string[] };
export const projectStories: Record<string, ProjectStory> = {
  "Duo-Levelling": {
    title: "Duo Levelling", category: "FITNESS / SOCIAL", kind: "engine", status: "APPLICATION / IN DEVELOPMENT",
    summary: "Build strength, track consistency and grow together. A social training space for calisthenics athletes.",
    tools: ["TypeScript", "Next.js", "Supabase"],
    problem: "Workout records, personal progress and training connections need a shared home that fits calisthenics.",
    system: "Workout logging and reusable templates connect to athlete profiles, session-based streaks, following and a feed-first dashboard.",
    outcome: "Log sets, reps and weight, reuse workout templates and follow other athletes. Duels are planned; authenticated deployment checks remain pending.",
    flow: ["Log a workout", "Track progress", "Connect with athletes"],
  },
  "algo1": {
    title: "Intraday Research Lab", category: "FINTECH / RESEARCH", kind: "market", status: "RESEARCH FRAMEWORK / AWAITING DATA",
    summary: "From market candles to testable hypotheses. Evidence-first intraday research with execution costs and validation built in.",
    tools: ["Python", "Pandas", "Parquet", "Backtesting"],
    problem: "Trading hypotheses need clean data, causal features and realistic execution assumptions before their results can be trusted.",
    system: "A staged pipeline inspects market data, builds causal features, discovers candidate setups and evaluates frozen rules with cost-aware backtests and walk-forward checks.",
    outcome: "A reproducible research framework with quality reports and experiment records. Actual market data is pending; no final strategy or live trading is claimed. Source code is private.",
    flow: ["Validate candles", "Research setups", "Stress-test execution"],
  },
  "AI-Audit-Analytics-IT-Controls": {
    title: "Audit Analytics", category: "DATA / ASSURANCE", kind: "triage", status: "EDUCATIONAL SIMULATION",
    summary: "From financial records to traceable evidence. A reproducible engine for audit analytics and IT controls testing.",
    tools: ["Python", "SQLite", "Scikit-learn", "Streamlit"],
    problem: "Related finance and technology datasets need consistent reconciliation, control testing and explainable exceptions.",
    system: "Synthetic ERP, ledger and access records pass through deterministic controls, reconciliation and Isolation Forest indicators into a scored exception register.",
    outcome: "A documented pipeline produces CSV evidence, an Excel register, PDF workpapers and a Streamlit investigation dashboard. All records and findings are synthetic; indicators require human review.",
    flow: ["Validate records", "Test controls", "Review evidence"],
  },
  "Lumen---AI-Photo-Editor": {
    title: "Lumen Photo AI", category: "INTELLIGENT SOFTWARE", kind: "image", status: "LOCAL APPLICATION",
    summary: "A non-destructive photo developer. Measured adjustments, full creative control, originals untouched.",
    tools: ["Python", "FastAPI", "OpenCV", "SQLite"],
    problem: "Photo enhancement needs to improve an image without losing the original or hiding how an edit was made.",
    system: "Image analysis produces a typed, bounded edit recipe. A rule-based advisor guides deterministic processing, with manual review and an isolated Darktable adapter for RAW development.",
    outcome: "Before/after review, batch import, accepted-edit history and JPEG export. The vision-model advisor is a future extension, not an active model.",
    flow: ["Analyze image", "Bounded recipe", "Review & export"],
  },
  "BBHA-BackTesting": {
    title: "BBHA Backtesting", category: "FINTECH / RESEARCH", kind: "market", status: "HISTORICAL RESEARCH",
    summary: "Testing a trading idea against execution reality — costs, liquidity and capital constraints included.",
    tools: ["Python", "Market data", "Backtesting"],
    problem: "A positive underlying backtest does not establish whether an options strategy can survive actual execution constraints.",
    system: "A frozen NIFTY intraday strategy is tested out of sample, then against historical options with execution costs, slippage and fixed-lot capital limits.",
    outcome: "The underlying passed its out-of-sample gate, but the ₹16,000 account could not sustain the options sequence. The research documents that feasibility gap rather than hiding it.",
    flow: ["Frozen strategy", "Historical fills", "Feasibility check"],
  },
  "ai-data-exception-triage": {
    title: "Exception Triage", category: "AI / INVESTMENT DATA", kind: "triage", status: "PROTOTYPE / BLUEPRINT",
    summary: "Turning investment data exceptions into explainable priorities and a clear path to human review.",
    tools: ["Python", "Pandas", "Scikit-learn", "SQL"],
    problem: "Missing references, stale prices and reconciliation breaks create repetitive manual triage for investment data teams.",
    system: "The documented workflow combines deterministic controls, classification, anomaly detection and fuzzy matching to recommend severity, ownership and next actions.",
    outcome: "A prototype and implementation blueprint with explainability and SME-review rules. Example dashboard metrics in the repository are illustrative, not measured operating results.",
    flow: ["Data exceptions", "Rules + ML", "Analyst review"],
  },
  "low-latency-Order-Matching-Engine": {
    title: "Order Matching Engine", category: "MARKET INFRASTRUCTURE", kind: "engine", status: "DEVELOPMENT PROTOTYPE",
    summary: "Exploring the machinery behind a market: orders, matching logic and an inspectable order book.",
    tools: ["C++", "Flask", "React"],
    problem: "Market infrastructure needs a clear model of how incoming orders interact with an existing book.",
    system: "A C++ matching engine sits alongside a React interface and Flask demo endpoints. The web demo maintains a small in-memory order book; the C++ engine is separately runnable.",
    outcome: "A development starting point for studying matching behavior. Continuous integration between the Flask order book and C++ engine is not yet implemented; no latency benchmark is claimed.",
    flow: ["Incoming orders", "Match engine", "Order book"],
  },
};
