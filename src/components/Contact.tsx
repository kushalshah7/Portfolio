import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const { ref, isVisible } = useScrollAnimation(0.2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = form;
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:kushalshah7@example.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" ref={ref} className="bg-[#0a0f1e] py-32 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-sky-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-sky-400 text-sm font-semibold uppercase tracking-widest mb-3">Get In Touch</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Let's Connect</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full mx-auto mb-4" />
          <p className="text-slate-400 max-w-lg mx-auto text-base leading-relaxed">
            Whether it's a project, internship, full-time role, or just to say hello — I'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact info */}
          <div
            className={`flex flex-col gap-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <h3 className="text-white font-bold text-lg mb-2">Find Me Online</h3>

            {[
              {
                icon: Github,
                title: 'GitHub',
                subtitle: 'github.com/kushalshah7',
                url: 'https://github.com/kushalshah7',
                color: 'hover:border-white/30',
              },
              {
                icon: Linkedin,
                title: 'LinkedIn',
                subtitle: 'linkedin.com/in/kushalr7',
                url: 'https://www.linkedin.com/in/kushalr7',
                color: 'hover:border-sky-500/40',
              },
              {
                icon: Mail,
                title: 'Email',
                subtitle: 'Drop me a message',
                url: 'mailto:kushalshah7@example.com',
                color: 'hover:border-sky-500/40',
              },
            ].map(({ icon: Icon, title, subtitle, url, color }, idx) => (
              <a
                key={title}
                href={url}
                target={url.startsWith('mailto') ? undefined : '_blank'}
                rel={url.startsWith('mailto') ? undefined : 'noreferrer'}
                className={`flex items-center gap-4 p-4 rounded-xl bg-white/3 border border-white/8 transition-all duration-300 group hover:bg-white/5 ${color} transform hover:scale-105 hover:shadow-lg hover:shadow-sky-500/10`}
                style={{
                  transitionDelay: isVisible ? `${idx * 100}ms` : '0ms',
                }}
              >
                <div className="p-3 bg-white/5 rounded-xl text-sky-400 group-hover:bg-sky-500/20 transition-all duration-300 transform group-hover:scale-110">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{title}</p>
                  <p className="text-slate-400 text-xs">{subtitle}</p>
                </div>
              </a>
            ))}

            <div className="bg-gradient-to-br from-sky-500/15 to-cyan-500/10 border border-sky-500/30 rounded-2xl p-6 mt-4">
              <p className="text-sky-300 font-semibold text-sm mb-2">Currently Available</p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Open to internships, freelance projects, and full-time roles in software engineering, data science, or quantitative finance.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className={`bg-white/3 border border-white/8 rounded-2xl p-8 flex flex-col gap-5 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <h3 className="text-white font-bold text-lg mb-2">Send a Message</h3>

            <div className="group">
              <label className="block text-slate-400 text-xs mb-2 font-semibold">Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Your name"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/8 transition-all duration-300"
              />
            </div>

            <div className="group">
              <label className="block text-slate-400 text-xs mb-2 font-semibold">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="your@email.com"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/8 transition-all duration-300"
              />
            </div>

            <div className="group flex-1">
              <label className="block text-slate-400 text-xs mb-2 font-semibold">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Tell me about the opportunity or project..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-sky-500/50 focus:bg-white/8 transition-all duration-300 resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/30 active:scale-95 transform hover:scale-105"
            >
              {sent ? (
                'Opening email client...'
              ) : (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
