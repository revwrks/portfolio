import React from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const CURRENT_YEAR = 2026;

export function Footer() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <footer className="border-t border-zinc-850/80 bg-zinc-950 py-10 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono">
            <span className="text-base font-bold text-white tracking-tight">
              REVWORKS
            </span>
            <span className="text-xs text-zinc-500">// {personal.name}</span>
          </div>
          <p className="mt-1 text-xs text-zinc-400 max-w-md">
            Creative technology, high-throughput systems, and cinematic video direction.
          </p>
          <div className="mt-2.5 flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span>{personal.status}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors rounded-lg border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
            aria-label="GitHub @revwrks"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>@revwrks</span>
          </a>
          <a
            href={personal.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:text-pink-400 transition-colors rounded-lg border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
            aria-label="Instagram @itzrevv"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
            <span>@itzrevv</span>
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:text-blue-400 transition-colors rounded-lg border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
            aria-label="LinkedIn profile"
          >
            <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="min-h-[44px] min-w-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors rounded-lg border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
            aria-label="Send direct email"
          >
            <Mail className="w-3.5 h-3.5 text-zinc-400" />
            <span>Email</span>
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl mt-6 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 gap-3">
        <p>© {CURRENT_YEAR} REVWORKS. Engineered by Rev (Mahendra Pujo Prianto).</p>
        <p>Next.js 16 · React 19 · Tailwind v4 · Vercel Edge</p>
      </div>
    </footer>
  );
}
