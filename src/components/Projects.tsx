import { useState, useRef, useEffect } from 'react';
import { Github, ExternalLink, Star, Code2, GitBranch } from 'lucide-react';
import { projects, categories } from '../data/projects';
import type { Project } from '../data/projects';

const categoryColors: Record<string, { gradient: string; border: string; icon: string }> = {
  finance: { gradient: 'from-emerald-600/20 to-teal-600/20', border: 'border-emerald-500/30', icon: 'text-emerald-400' },
  'data-analytics': { gradient: 'from-amber-600/20 to-orange-600/20', border: 'border-amber-500/30', icon: 'text-amber-400' },
  'machine-learning': { gradient: 'from-sky-600/20 to-cyan-600/20', border: 'border-sky-500/30', icon: 'text-sky-400' },
  'web-dev': { gradient: 'from-rose-600/20 to-pink-600/20', border: 'border-rose-500/30', icon: 'text-rose-400' },
  utility: { gradient: 'from-slate-600/20 to-slate-700/20', border: 'border-slate-500/30', icon: 'text-slate-400' },
};

const langGradients: Record<string, string> = {
  Python: 'from-blue-500 to-blue-600',
  TypeScript: 'from-cyan-500 to-sky-600',
  'C++': 'from-orange-500 to-red-600',
  JavaScript: 'from-yellow-500 to-amber-600',
  HTML: 'from-red-500 to-orange-600',
  'Jupyter Notebook': 'from-purple-500 to-indigo-600',
};

function ProjectCard({ project, index, isVisible }: { project: Project; index: number; isVisible: boolean }) {
  const catInfo = categoryColors[project.category] || categoryColors.utility;

  return (
    <div
      className={`transform transition-all duration-700 h-full ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{
        transitionDelay: isVisible ? `${index * 60}ms` : '0ms',
      }}
    >
      <div
        className={`group relative h-full bg-gradient-to-br ${catInfo.gradient} border ${catInfo.border} rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:border-sky-400/60 hover:shadow-2xl hover:shadow-sky-500/15 hover:-translate-y-2 flex flex-col overflow-hidden`}
      >
        {/* Animated gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 via-transparent to-cyan-500/0 group-hover:from-sky-500/5 group-hover:to-cyan-500/5 transition-all duration-300" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header section */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1">
              {project.featured && (
                <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 bg-gradient-to-r from-amber-500/30 to-orange-500/30 border border-amber-500/50 rounded-full backdrop-blur-sm">
                  <Star size={13} className="text-amber-400 fill-amber-400" />
                  <span className="text-amber-400 text-xs font-bold">Featured</span>
                </div>
              )}
              <h3 className="text-white font-bold text-lg leading-tight group-hover:text-sky-300 transition-colors line-clamp-2">
                {project.name}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 text-slate-400 hover:text-sky-300 bg-white/5 hover:bg-sky-500/20 rounded-lg transition-all duration-200 hover:scale-110"
                  aria-label="Live demo"
                >
                  <ExternalLink size={16} />
                </a>
              )}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200 hover:scale-110"
                aria-label="GitHub repo"
              >
                <Github size={16} />
              </a>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/60 text-slate-300 border border-slate-700/40 font-medium hover:border-slate-600/70 transition-colors">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2.5 py-1 text-xs rounded-lg text-slate-400 font-medium">+{project.tags.length - 3} more</span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-700/30">
            <div className="flex items-center gap-2">
              {project.language && (
                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-r ${langGradients[project.language] || 'from-slate-500 to-slate-600'} text-white text-xs font-semibold`}
                >
                  <Code2 size={12} />
                  {project.language}
                </div>
              )}
              {project.commits && (
                <div className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-700/40 text-slate-300 text-xs font-medium border border-slate-600/30">
                  <GitBranch size={12} />
                  {project.commits}
                </div>
              )}
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-lg border ${catInfo.border} ${catInfo.icon}`}>
              {categories.find(c => c.id === project.category)?.label ?? project.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const filtered = activeCategory === 'all' ? projects : projects.filter(p => p.category === activeCategory);

  const categoryProjectCount = (catId: string) => {
    if (catId === 'all') return projects.length;
    return projects.filter(p => p.category === catId).length;
  };

  return (
    <section id="projects" ref={sectionRef} className="bg-[#0c1220] py-32 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-sky-400 text-sm font-semibold uppercase tracking-widest mb-3">Portfolio</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Projects & Work</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full mx-auto mb-4" />
          <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            Featured projects across quantitative finance, machine learning, data analytics, and full-stack software development.
          </p>
        </div>

        {/* Category filter */}
        <div
          className={`flex flex-wrap justify-center gap-2 mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {categories.map((cat, idx) => {
            const count = categoryProjectCount(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 transform hover:scale-105 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/30'
                    : 'bg-slate-800/40 border border-slate-700/50 text-slate-300 hover:text-white hover:border-slate-600/70 hover:bg-slate-800/60'
                }`}
                style={{
                  transitionDelay: isVisible ? `${idx * 50}ms` : '0ms',
                }}
              >
                {cat.label}
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                    activeCategory === cat.id ? 'bg-white/20' : 'bg-slate-700/50'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered && filtered.length > 0 ? (
            filtered.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} isVisible={isVisible} />
            ))
          ) : (
            <div
              className={`col-span-full text-center py-20 transition-all duration-700 ${
                isVisible ? 'opacity-100' : 'opacity-50'
              }`}
            >
              <p className="text-slate-500 text-base">No projects in this category.</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
        >
          <a
            href="https://github.com/kushalshah7"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-sky-500/20 to-cyan-500/20 border border-sky-500/50 hover:border-sky-400/80 text-sky-300 hover:text-sky-200 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/20 hover:scale-105 hover:from-sky-500/30 hover:to-cyan-500/30"
          >
            <Github size={16} />
            Explore All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
