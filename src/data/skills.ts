export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    icon: 'Code2',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'C++', level: 75 },
      { name: 'TypeScript', level: 70 },
      { name: 'JavaScript', level: 70 },
      { name: 'SQL', level: 65 },
      { name: 'HTML/CSS', level: 60 },
    ],
  },
  {
    title: 'Machine Learning & AI',
    icon: 'Brain',
    skills: [
      { name: 'Scikit-learn', level: 85 },
      { name: 'TensorFlow / Keras', level: 75 },
      { name: 'NLP', level: 70 },
      { name: 'Computer Vision', level: 70 },
      { name: 'Data Preprocessing', level: 85 },
    ],
  },
  {
    title: 'Data & Analytics',
    icon: 'BarChart3',
    skills: [
      { name: 'Pandas', level: 90 },
      { name: 'NumPy', level: 85 },
      { name: 'Matplotlib / Seaborn', level: 80 },
      { name: 'Jupyter Notebook', level: 85 },
      { name: 'Data Visualization', level: 80 },
    ],
  },
  {
    title: 'Finance & Quant',
    icon: 'TrendingUp',
    skills: [
      { name: 'Options Pricing', level: 75 },
      { name: 'Algorithmic Trading', level: 70 },
      { name: 'Backtesting', level: 75 },
      { name: 'Risk Analysis', level: 65 },
      { name: 'Market Microstructure', level: 65 },
    ],
  },
  {
    title: 'Web & Full-Stack',
    icon: 'Globe',
    skills: [
      { name: 'React', level: 70 },
      { name: 'Next.js', level: 65 },
      { name: 'Supabase', level: 65 },
      { name: 'REST APIs', level: 70 },
      { name: 'Tailwind CSS', level: 70 },
    ],
  },
  {
    title: 'Tools & Systems',
    icon: 'Settings',
    skills: [
      { name: 'Git / GitHub', level: 80 },
      { name: 'Docker', level: 55 },
      { name: 'Linux', level: 65 },
      { name: 'Google Colab', level: 80 },
      { name: 'VS Code', level: 90 },
    ],
  },
];
