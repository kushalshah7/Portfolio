import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, ChevronDown } from 'lucide-react';

const ROLES = [
  'Aspiring Developer',
  'ML Engineer',
  'Quant Enthusiast',
  'Full-Stack Builder',
  'Data Analyst',
];

export default function Hero() {
  const roleRef = useRef<HTMLSpanElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    function type() {
      const word = ROLES[roleIdx];
      if (!deleting) {
        charIdx++;
        if (roleRef.current) roleRef.current.textContent = word.slice(0, charIdx);
        if (charIdx === word.length) {
          deleting = true;
          timeout = setTimeout(type, 1800);
          return;
        }
      } else {
        charIdx--;
        if (roleRef.current) roleRef.current.textContent = word.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % ROLES.length;
        }
      }
      timeout = setTimeout(type, deleting ? 60 : 100);
    }

    timeout = setTimeout(type, 600);
    return () => clearTimeout(timeout);
  }, [mounted]);

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!mounted) return null;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0f1e]"
    >
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/8 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/30 bg-sky-500/5 text-sky-400 text-sm mb-8 backdrop-blur-sm animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping inline-block" />
          Open to opportunities
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 leading-tight tracking-tight animate-fade-in-up delay-100">
          Kushal Shah
        </h1>

        {/* Role typewriter */}
        <div className="text-xl sm:text-2xl text-slate-400 mb-6 h-8 animate-fade-in-up delay-200">
          <span ref={roleRef} className="text-sky-400 font-medium" />
          <span className="text-sky-400 animate-pulse">|</span>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-300">
          Building at the intersection of <span className="text-white font-medium">finance</span>,{' '}
          <span className="text-white font-medium">machine learning</span>, and{' '}
          <span className="text-white font-medium">software engineering</span>. Based in Mumbai, India.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-400">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/40 active:scale-95 transform hover:scale-105"
          >
            View Projects
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 border border-white/20 hover:border-sky-500/50 text-slate-300 hover:text-white font-semibold rounded-full transition-all duration-300 active:scale-95 transform hover:scale-105 hover:bg-sky-500/10"
          >
            Get in Touch
          </button>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-5 mt-10 animate-fade-in-up delay-500">
          <a
            href="https://github.com/kushalshah7"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg transform hover:scale-110 duration-300"
            aria-label="GitHub"
          >
            <Github size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/kushalr7"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-sky-400 transition-colors p-2 hover:bg-white/5 rounded-lg transform hover:scale-110 duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin size={22} />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 hover:text-slate-300 transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </button>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }
      `}</style>
    </section>
  );
}
