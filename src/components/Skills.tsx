import { useEffect, useRef, useState } from 'react';
import { Code2, Brain, BarChart3, TrendingUp, Globe, Settings } from 'lucide-react';
import { skillCategories } from '../data/skills';

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Code2,
  Brain,
  BarChart3,
  TrendingUp,
  Globe,
  Settings,
};

function SkillBar({ name, level, animate }: { name: string; level: number; animate: boolean }) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-2">
        <span className="text-slate-300 text-xs font-semibold uppercase tracking-wider">{name}</span>
        <span className="text-sky-400 text-xs font-bold">{level}%</span>
      </div>
      <div className="h-1.5 bg-slate-700/40 rounded-full overflow-hidden border border-slate-700/20">
        <div
          className="h-full bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-500 rounded-full transition-all duration-1200 ease-out shadow-lg shadow-sky-500/30"
          style={{ width: animate ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
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
      { threshold: 0.15 }
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

  return (
    <section id="skills" ref={sectionRef} className="bg-[#0a0f1e] py-32 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-sky-400 text-sm font-semibold uppercase tracking-widest mb-3">Expertise</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Skills & Technologies</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full mx-auto mb-4" />
          <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            A comprehensive toolkit spanning systems programming, data science, quantitative finance, modern web development, and machine learning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories && skillCategories.length > 0 ? (
            skillCategories.map((category, idx) => {
              const Icon = iconMap[category.icon];

              return (
                <div
                  key={category.title}
                  className={`transform transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${idx * 80}ms` : '0ms',
                  }}
                >
                  <div className="relative group h-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500/50 via-cyan-500/50 to-blue-500/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur" />
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

                    <div className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/60 border border-slate-700/40 rounded-2xl p-7 backdrop-blur-xl transition-all duration-300 group-hover:border-sky-500/50 group-hover:shadow-xl group-hover:shadow-sky-500/20 group-hover:-translate-y-1 h-full">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-gradient-to-br from-sky-500/25 to-cyan-500/15 rounded-xl text-sky-400 transition-all duration-300 group-hover:from-sky-500/40 group-hover:to-cyan-500/30 group-hover:scale-110 group-hover:-rotate-6">
                          {Icon && <Icon size={22} />}
                        </div>
                        <h3 className="text-white font-bold text-base tracking-tight">{category.title}</h3>
                      </div>

                      <div className="flex flex-col gap-5">
                        {category.skills && category.skills.map(skill => (
                          <SkillBar key={skill.name} name={skill.name} level={skill.level} animate={isVisible} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center text-slate-500">Loading skills...</div>
          )}
        </div>
      </div>
    </section>
  );
}
