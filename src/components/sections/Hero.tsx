import React from "react";
import { ArrowDown, ArrowUpRight, Terminal } from "lucide-react";
import { GithubIcon, InstagramIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Hero() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section className="relative pt-12 md:pt-20 pb-12 md:pb-16 border-b border-zinc-850/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Studio Identifier */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 rounded-md border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-mono text-blue-400">
            <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
            <span>REVWORKS LAB</span>
          </div>
          <span className="text-zinc-600 font-mono text-xs">•</span>
          <span className="text-xs font-mono text-zinc-400">
            Mahendra Pujo Prianto <span className="text-zinc-500">(Rev)</span>
          </span>
          <span className="text-zinc-600 font-mono text-xs hidden sm:inline">•</span>
          <div className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span>Available for engineering & production</span>
          </div>
        </div>

        {/* Studio Headline */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Engineering high-throughput systems, canvas engines, and{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              cinematic visual media.
            </span>
          </h1>
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-zinc-300 font-normal leading-relaxed max-w-3xl">
            {personal.bio}
          </p>
        </div>

        {/* Compact CTAs + Social Quick-Links */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <span>Explore Works</span>
            <ArrowDown className="w-4 h-4" aria-hidden="true" />
          </a>

          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-850 px-4 py-2.5 text-xs sm:text-sm font-medium text-zinc-200 hover:border-zinc-500 hover:bg-zinc-750 transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <GithubIcon className="w-4 h-4" />
            <span>@revwrks</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
          </a>

          <a
            href={personal.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 py-2.5 text-xs sm:text-sm font-medium text-zinc-300 hover:border-zinc-700 hover:text-pink-400 transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>@itzrevv</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
          </a>

          <a
            href={`mailto:${personal.email}`}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-3 py-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <span>{personal.email}</span>
          </a>
        </div>

        {/* Compact T-Shaped Matrix Bar (Saved ~150px vertical scroll!) */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 pt-6 border-t border-zinc-850/80 font-mono text-xs">
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="text-blue-400 font-bold">01/</span>
            <span>Fintech & Webhook Ledgers</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="text-cyan-400 font-bold">02/</span>
            <span>HTML5 Canvas & Web Audio</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="text-emerald-400 font-bold">03/</span>
            <span>Google-Certified UX Design</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="text-purple-400 font-bold">04/</span>
            <span>Cinematic Video Direction</span>
          </div>
        </div>

      </div>
    </section>
  );
}
