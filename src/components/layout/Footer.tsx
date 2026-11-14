import React from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const CURRENT_YEAR = 2026;

export function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-base font-bold text-zinc-100">
              {PORTFOLIO_DATA.personal.name}
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-400 max-w-md">
            {PORTFOLIO_DATA.personal.role} based in {PORTFOLIO_DATA.personal.location}.
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span>{PORTFOLIO_DATA.personal.status}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="min-h-[44px] min-w-[44px] inline-flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:text-white transition-colors rounded-lg border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
            aria-label="Send email"
          >
            <Mail className="w-4 h-4 text-zinc-400" aria-hidden="true" />
            <span>Email</span>
          </a>
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] inline-flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:text-white transition-colors rounded-lg border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
            aria-label="LinkedIn profile"
          >
            <LinkedinIcon className="w-4 h-4 text-blue-400" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />
          </a>
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] inline-flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:text-white transition-colors rounded-lg border border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
            aria-label="GitHub profile"
          >
            <GithubIcon className="w-4 h-4 text-zinc-300" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl mt-8 pt-8 border-t border-zinc-850/60 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
        <p>© {CURRENT_YEAR} Mahendra Pujo Prianto. Built with Next.js, React 19 & Tailwind CSS.</p>
        <p className="font-mono text-zinc-400">Deployed on Vercel Edge Network</p>
      </div>
    </footer>
  );
}
