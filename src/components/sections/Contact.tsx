import React from "react";
import { ArrowUpRight, Mail, MapPin, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Contact() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/60 to-zinc-950 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-mono text-blue-400 mb-4">
              <Send className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Initiate Collaboration</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to engineer your next high-impact digital product?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
              Whether you need to architect resilient financial webhooks, construct an in-browser creative tool, or direct cinematic commercial media — let&apos;s build something exceptional.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${personal.email}`}
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Send Direct Email</span>
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-6 py-3.5 text-base font-semibold text-zinc-200 hover:border-zinc-500 hover:bg-zinc-700 transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
                <span>Connect on LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" aria-hidden="true" />
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-6 py-3.5 text-base font-semibold text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <GithubIcon className="w-4 h-4 text-zinc-400" />
                <span>GitHub Repositories</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs font-mono text-zinc-400">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
              <span>{personal.location} · Remote worldwide</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
