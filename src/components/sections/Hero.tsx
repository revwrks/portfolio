import React from "react";
import { ArrowDown, ArrowUpRight, Code, Database, Palette, Video } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Hero() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section className="relative pt-16 md:pt-28 pb-16 md:pb-24 border-b border-zinc-850/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-1.5 text-xs font-mono text-zinc-300 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <span>{personal.location} · {personal.status}</span>
        </div>

        {/* Main Title / Value Proposition */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Engineering resilient backend systems, interactive web engines, and{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              cinematic visual media.
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-zinc-300 font-normal leading-relaxed max-w-3xl">
            {personal.bio}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <span>Explore Flagship Projects</span>
            <ArrowDown className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-850/80 px-5 py-3 text-sm font-semibold text-zinc-200 hover:border-zinc-500 hover:bg-zinc-750 transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <span>Connect on LinkedIn</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-400" aria-hidden="true" />
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <span>{personal.email}</span>
          </a>
        </div>

        {/* Core Pillars / T-Shaped Matrix */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-10 border-t border-zinc-800/60">
          <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
              <Database className="w-4 h-4" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-sm text-zinc-200">Database & Backend</h3>
            <p className="mt-1 text-xs text-zinc-400 leading-normal">
              Relational schemas, webhook ingestion, wallet ledgers, and API design.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
              <Code className="w-4 h-4" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-sm text-zinc-200">Interactive Canvas & Web</h3>
            <p className="mt-1 text-xs text-zinc-400 leading-normal">
              HTML5 Canvas drawing engines, Web Audio API synthesis, and clean Next.js/Laravel apps.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
              <Palette className="w-4 h-4" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-sm text-zinc-200">Certified UX Design</h3>
            <p className="mt-1 text-xs text-zinc-400 leading-normal">
              Google-certified UX research, user journey mapping, and conversion-focused design systems.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
              <Video className="w-4 h-4" aria-hidden="true" />
            </div>
            <h3 className="font-semibold text-sm text-zinc-200">Cinematic Direction</h3>
            <p className="mt-1 text-xs text-zinc-400 leading-normal">
              Director for multi-track concert showcases, music videos, and commercial brand video.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
