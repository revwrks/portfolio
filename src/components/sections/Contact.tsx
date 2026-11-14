import React from "react";
import { ArrowUpRight, Mail, MapPin, Send } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Contact() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <section id="contact" className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900/50 to-zinc-950 p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 rounded-md border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-xs font-mono text-blue-400 mb-3">
              <Send className="w-3.5 h-3.5" aria-hidden="true" />
              <span>COLLABORATE WITH REVWORKS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Ready to engineer your next high-impact digital product?
            </h2>

            <p className="mt-3 text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              Whether you need to architect resilient financial webhooks, construct an in-browser canvas tool, or direct cinematic commercial media — let&apos;s build something exceptional.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${personal.email}`}
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>Send Direct Email</span>
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-850 px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-200 hover:border-zinc-500 hover:bg-zinc-750 transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <GithubIcon className="w-4 h-4 text-zinc-300" />
                <span>@revwrks</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </a>

              <a
                href={personal.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-300 hover:border-zinc-700 hover:text-pink-400 transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <InstagramIcon className="w-4 h-4 text-pink-400" />
                <span>@itzrevv</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/80 px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-300 hover:border-zinc-700 hover:text-blue-400 transition-colors focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </a>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-zinc-500">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
              <span>{personal.location} · Remote worldwide</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
