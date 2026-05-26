export interface Project {
  id: string;
  name: string;
  description: string;
  language: string | null;
  category: 'finance' | 'data-analytics' | 'machine-learning' | 'web-dev' | 'systems' | 'utility';
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
  commits?: number;
}

export const projects: Project[] = [
  // Finance & Trading
  {
    id: 'low-latency-ome',
    name: 'Low Latency Order Matching Engine',
    description: 'Ultra-low latency order matching engine with React frontend, Flask backend, and C++ core for high-performance trading.',
    language: 'C++',
    category: 'finance',
    tags: ['C++', 'React', 'Flask', 'Trading', 'Low Latency', 'Finance'],
    githubUrl: 'https://github.com/kushalshah7/low-latency-Order-Matching-Engine',
    featured: true,
    commits: 3,
  },
  {
    id: 'frustrader',
    name: 'FrusTrader',
    description: 'Live intraday trading signals with ML-powered automation using real-time market data.',
    language: 'Python',
    category: 'finance',
    tags: ['Trading', 'ML', 'Real-time', 'Automation', 'Finance', 'Signals'],
    githubUrl: 'https://github.com/kushalshah7/frustrader',
    featured: true,
    commits: 3,
  },
  {
    id: 'monte-carlo',
    name: 'Monte Carlo Option Pricing',
    description: 'Quantitative finance model implementing Monte Carlo simulation for pricing financial derivatives.',
    language: null,
    category: 'finance',
    tags: ['Quant Finance', 'Options Pricing', 'Monte Carlo', 'Derivatives'],
    githubUrl: 'https://github.com/kushalshah7/MonteCarlo-Option_Pricing',
  },
  {
    id: 'ml-backtester',
    name: 'ML Trading Strategy Backtester',
    description: 'Framework for backtesting and validating machine learning-based trading strategies on historical data.',
    language: null,
    category: 'finance',
    tags: ['Backtesting', 'Trading Strategy', 'ML', 'Quantitative'],
    githubUrl: 'https://github.com/kushalshah7/Machine-Learning-Based-Trading-Strategy-Backtester',
  },
  {
    id: 'automated-comps',
    name: 'Automated Private Company Comps Engine',
    description: 'Automated engine for valuation multiples analysis and comparable company analysis for private equity.',
    language: null,
    category: 'finance',
    tags: ['Valuation', 'Private Equity', 'Automation', 'Finance'],
    githubUrl: 'https://github.com/kushalshah7/Automated-Private-Company-Comps-Engine',
  },
  {
    id: 'credit-risk',
    name: 'Credit Risk Scoring Model',
    description: 'Machine learning model for credit risk assessment and portfolio valuation scoring.',
    language: null,
    category: 'finance',
    tags: ['Credit Risk', 'Risk Assessment', 'ML', 'Portfolio'],
    githubUrl: 'https://github.com/kushalshah7/Credit-Risk-Scoring-Model-for-Portfolio-Valuations',
  },

  // Data Analytics & Investment Operations
  {
    id: 'investment-data-health',
    name: 'Investment Data Health Dashboard',
    description: 'Polished investment data health dashboard with KPIs, RAG thresholds, lineage controls, and Streamlit/Plotly implementation.',
    language: 'Python',
    category: 'data-analytics',
    tags: ['Investment Ops', 'Data Quality', 'Dashboard', 'Streamlit', 'Analytics'],
    githubUrl: 'https://github.com/kushalshah7/investment-data-health-dashboard',
  },
  {
    id: 'ai-data-triage',
    name: 'AI Data Exception Triage',
    description: 'AI-assisted investment data exception triage with classification, anomaly detection, smart matching, and governance.',
    language: 'Python',
    category: 'data-analytics',
    tags: ['AI', 'Data Management', 'ML', 'Investment Ops', 'Governance'],
    githubUrl: 'https://github.com/kushalshah7/ai-data-exception-triage',
  },
  {
    id: 'hr-analytics',
    name: 'HR Workforce Analytics',
    description: 'End-to-end HR analytics project analyzing employee attrition, workforce performance, and departmental hiring trends.',
    language: 'Python',
    category: 'data-analytics',
    tags: ['HR Analytics', 'Data Analysis', 'Streamlit', 'Excel Reporting', 'Python'],
    githubUrl: 'https://github.com/kushalshah7/hr-workforce-analytics',
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain Performance Analysis',
    description: 'End-to-end analytics project simulating supply chain operations with SQL reporting and interactive Streamlit dashboard.',
    language: 'Python',
    category: 'data-analytics',
    tags: ['Supply Chain', 'Analytics', 'SQL', 'Streamlit', 'Data Pipeline'],
    githubUrl: 'https://github.com/kushalshah7/supply-chain-performance-analysis',
  },
  {
    id: 'retail-analytics',
    name: 'Retail Sales Analytics Dashboard',
    description: 'End-to-end retail analytics with sales analysis, customer segmentation, retention trends, and Power BI-ready outputs.',
    language: 'Python',
    category: 'data-analytics',
    tags: ['Retail Analytics', 'Dashboard', 'SQL', 'Streamlit', 'Power BI'],
    githubUrl: 'https://github.com/kushalshah7/retail-sales-analytics-dashboard',
  },

  // Machine Learning & AI
  {
    id: 'duo-levelling',
    name: 'Duo Levelling',
    description: 'Full-stack Strava-lite calisthenics app with Next.js, TypeScript, and Supabase for workout tracking and athlete profiles.',
    language: 'TypeScript',
    category: 'machine-learning',
    tags: ['Full-Stack', 'Next.js', 'Supabase', 'TypeScript', 'React', 'Web App'],
    githubUrl: 'https://github.com/kushalshah7/Duo-Levelling',
    featured: true,
  },
  {
    id: 'email-classifier',
    name: 'Email Classifier with GPT-4o',
    description: 'NLP pipeline using TF-IDF and Logistic Regression to classify emails and generate context-aware responses via GPT-4o.',
    language: 'Python',
    category: 'machine-learning',
    tags: ['NLP', 'ML', 'GPT-4o', 'Flask', 'Email Processing'],
    githubUrl: 'https://github.com/kushalshah7/email-classifier',
  },
  {
    id: 'image-bg-remover',
    name: 'AI Image Background Remover',
    description: 'AI-powered image background removal tool using FastAPI backend and Streamlit frontend with rembg integration.',
    language: 'Python',
    category: 'machine-learning',
    tags: ['Computer Vision', 'FastAPI', 'Streamlit', 'AI', 'Image Processing'],
    githubUrl: 'https://github.com/kushalshah7/image-bg-remover',
    commits: 7,
  },
  {
    id: 'spinach-disease',
    name: 'Spinach Disease Detection',
    description: 'Deep learning model for detecting and classifying diseases in spinach plants using computer vision.',
    language: 'Python',
    category: 'machine-learning',
    tags: ['Deep Learning', 'Computer Vision', 'Agriculture', 'ML', 'Classification'],
    githubUrl: 'https://github.com/kushalshah7/Spinach-Disease-Detection',
    commits: 2,
  },
  {
    id: 'ipcv',
    name: 'IPCV — Image Processing & Computer Vision',
    description: 'Computer vision project with detection, OCR, speed analysis, and tracking modules for visual analysis.',
    language: 'Python',
    category: 'machine-learning',
    tags: ['Computer Vision', 'Detection', 'OCR', 'Tracking', 'Python'],
    githubUrl: 'https://github.com/kushalshah7/IPCV',
  },
  {
    id: 'gamma-telescope',
    name: 'Gamma Telescope ML Classification',
    description: 'First ML implementation classifying gamma-ray telescope signals from hadron background using supervised learning.',
    language: 'Python',
    category: 'machine-learning',
    tags: ['Machine Learning', 'Classification', 'Physics', 'Scikit-learn', 'Google Colab'],
    githubUrl: 'https://github.com/kushalshah7/Gamma-Telescope',
    commits: 4,
  },

  // Web Development
  {
    id: 'task-manager',
    name: 'Task Manager Web App',
    description: 'Task management web application built with Express.js and Firebase for real-time data synchronization.',
    language: 'JavaScript',
    category: 'web-dev',
    tags: ['JavaScript', 'Firebase', 'Node.js', 'Web App', 'Task Management'],
    githubUrl: 'https://github.com/kushalshah7/task-manager',
  },
  {
    id: 'rimor-tours',
    name: 'RimorTours',
    description: 'React-based tourism application showcasing travel destinations and packages with modern UI.',
    language: 'JavaScript',
    category: 'web-dev',
    tags: ['React', 'Web App', 'Tourism', 'JavaScript'],
    githubUrl: 'https://github.com/kushalshah7/RimorTours',
    commits: 2,
  },
  {
    id: 'myresume',
    name: 'Personal Resume Website',
    description: 'Personal resume/portfolio website built with HTML and CSS for professional presentation.',
    language: 'HTML',
    category: 'web-dev',
    tags: ['HTML', 'CSS', 'Portfolio', 'Resume'],
    githubUrl: 'https://github.com/kushalshah7/myresume',
  },

  // Utilities & Learning
  {
    id: 'ds-assignment',
    name: 'Data Science Assignment',
    description: 'Data science project assignments and explorations using Jupyter notebooks and Python analysis.',
    language: 'Python',
    category: 'utility',
    tags: ['Data Science', 'Python', 'Jupyter', 'Analysis'],
    githubUrl: 'https://github.com/kushalshah7/DS-Assignment',
    commits: 2,
  },
  {
    id: 'echo-vitals',
    name: 'Echo Vitals',
    description: 'Health and vitals monitoring system for tracking and analyzing health metrics.',
    language: null,
    category: 'utility',
    tags: ['Health Tech', 'Monitoring', 'Data Tracking'],
    githubUrl: 'https://github.com/kushalshah7/Echo-Vitals',
  },
];

export const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'finance', label: 'Finance & Trading' },
  { id: 'data-analytics', label: 'Data Analytics' },
  { id: 'machine-learning', label: 'ML & Computer Vision' },
  { id: 'web-dev', label: 'Web Development' },
  { id: 'utility', label: 'Other' },
] as const;
