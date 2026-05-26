import { MapPin, GraduationCap, Briefcase, Cpu } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const highlights = [
  {
    icon: MapPin,
    title: 'Location',
    value: 'Mumbai, Maharashtra, India',
  },
  {
    icon: GraduationCap,
    title: 'Focus',
    value: 'Computer Science & Finance',
  },
  {
    icon: Briefcase,
    title: 'Status',
    value: 'Open to Internships & Roles',
  },
  {
    icon: Cpu,
    title: 'Interests',
    value: 'Quant Finance, ML, Systems',
  },
];

export default function About() {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section id="about" ref={ref} className="bg-[#0c1220] py-32 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-sky-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          {/* Image side with animation */}
          <div
            className={`relative flex-shrink-0 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-sky-500 to-cyan-400 p-0.5 animate-pulse">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-2xl bg-[#0c1220]" />
            </div>

            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden ring-2 ring-sky-500/30 shadow-2xl shadow-sky-500/10">
              <img
                src="https://images.pexels.com/photos/4974914/pexels-photo-4974914.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Developer at work"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Stats card */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-sky-500 to-cyan-400 rounded-xl border border-sky-400/50 flex flex-col items-center justify-center shadow-lg shadow-sky-500/25 transform hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-2xl">21+</span>
              <span className="text-white text-xs font-medium">Projects</span>
            </div>
          </div>

          {/* Text side with animation */}
          <div
            className={`flex-1 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <p className="text-sky-400 text-sm font-semibold uppercase tracking-widest mb-3">About Me</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-snug">
              Developer, Analyst &<br />Quant Enthusiast
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-4">
              I'm an aspiring developer based in Mumbai with a passion for building at the intersection of
              technology and finance. I enjoy turning complex problems into elegant, working solutions —
              whether that's a low-latency trading engine in C++, an ML pipeline in Python, or a full-stack
              web application with Next.js.
            </p>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              My work spans quantitative finance, machine learning, data analytics, and full-stack
              development. I'm driven by curiosity and a desire to build things that actually matter.
            </p>

            {/* Highlights grid with staggered animation */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {highlights.map(({ icon: Icon, title, value }, idx) => (
                <div
                  key={title}
                  className={`flex items-start gap-3 bg-white/3 border border-white/8 rounded-xl p-4 transition-all duration-700 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${idx * 100}ms` : '0ms',
                  }}
                >
                  <div className="p-2 bg-sky-500/10 rounded-lg text-sky-400 flex-shrink-0 transform group-hover:scale-110 transition-transform">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs mb-0.5">{title}</p>
                    <p className="text-slate-200 text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex gap-4">
              <a
                href="https://github.com/kushalshah7"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white text-sm font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/30 transform hover:scale-105"
              >
                View GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/kushalr7"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 border border-white/15 hover:border-sky-500/50 text-slate-300 hover:text-white text-sm font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:bg-sky-500/10"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
