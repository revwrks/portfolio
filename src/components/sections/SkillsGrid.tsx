import React from "react";
import { Code2, Database, Layers, Palette, Terminal, Wrench } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function SkillsGrid() {
  const { skills } = PORTFOLIO_DATA;

  const categories = [
    {
      title: "Backend & Systems",
      icon: Terminal,
      items: skills.backend,
      accent: "text-blue-400",
    },
    {
      title: "Databases & Storage",
      icon: Database,
      items: skills.databases,
      accent: "text-emerald-400",
    },
    {
      title: "Frontend & Canvas",
      icon: Code2,
      items: skills.frontend,
      accent: "text-cyan-400",
    },
    {
      title: "UX & Visual Direction",
      icon: Palette,
      items: skills.creativeDesign,
      accent: "text-purple-400",
    },
    {
      title: "Infra & Tooling",
      icon: Wrench,
      items: skills.devOpsAndTools,
      accent: "text-amber-400",
    },
  ];

  return (
    <section id="skills" className="py-14 border-b border-zinc-850/80 bg-zinc-950/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1.5">
              <Layers className="w-4 h-4" aria-hidden="true" />
              <span>TOOLING & STACK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Core Technical Competencies
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-400">
            Fullstack Architecture · Web Audio & Canvas · Video Direction
          </p>
        </div>

        {/* Compact Strip Matrix (Saves ~300px vertical scroll!) */}
        <div className="space-y-3">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-lg border border-zinc-800/80 bg-zinc-900/30 px-4 py-3 transition-colors hover:border-zinc-700"
              >
                <div className="flex items-center gap-2.5 min-w-[200px]">
                  <Icon className={`w-4 h-4 ${cat.accent}`} aria-hidden="true" />
                  <span className="text-xs font-mono font-bold text-zinc-200">
                    {cat.title}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 flex-1 md:justify-end">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 text-[11px] font-mono rounded bg-zinc-800/60 text-zinc-300 border border-zinc-750"
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
