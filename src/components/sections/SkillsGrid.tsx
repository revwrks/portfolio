import React from "react";
import { Code2, Database, Layers, Palette, Terminal, Wrench } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function SkillsGrid() {
  const { skills } = PORTFOLIO_DATA;

  const categories = [
    {
      title: "Backend & Systems",
      icon: Terminal,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      items: skills.backend,
      description: "Robust API services, asynchronous queueing, and webhook ingestion architectures.",
    },
    {
      title: "Database Engineering",
      icon: Database,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      items: skills.databases,
      description: "Relational data modeling, mutation ledgers, indexing, and high-integrity storage.",
    },
    {
      title: "Frontend & Canvas",
      icon: Code2,
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
      items: skills.frontend,
      description: "Component-driven web applications, touch-screen canvas engines, and Web Audio API.",
    },
    {
      title: "UX & Visual Direction",
      icon: Palette,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      items: skills.creativeDesign,
      description: "Certified UX research, user interaction flow, stage blocking, and cinematography.",
    },
    {
      title: "Deployment & Tooling",
      icon: Wrench,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      items: skills.devOpsAndTools,
      description: "Vercel edge hosting, Netlify static workflows, Git version control, and Linux servers.",
    },
  ];

  return (
    <section id="skills" className="py-20 border-b border-zinc-850/80 bg-zinc-950/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
            <Layers className="w-4 h-4" aria-hidden="true" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Core Tooling & Competencies
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400">
            A comprehensive spectrum spanning low-level database management to client-side canvas engines and cinematic production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 flex flex-col justify-between transition-colors hover:border-zinc-700 hover:bg-zinc-900/60"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${cat.color}`}>
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-bold text-zinc-100">{cat.title}</h3>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/60">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 text-xs font-mono rounded bg-zinc-800/50 text-zinc-300 border border-zinc-700/60"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
