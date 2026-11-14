import React from "react";
import { ArrowUpRight, Award, ShieldCheck } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Certifications() {
  const { certifications } = PORTFOLIO_DATA;

  return (
    <section id="credentials" className="py-14 border-b border-zinc-850/80 bg-zinc-950/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1.5">
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>ACCREDITATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Verified Credentials
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-400">
            Issued by Meta, Google, IBM & HackerRank
          </p>
        </div>

        {/* Compact Credentials Grid (Saves ~350px vertical scroll!) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="flex flex-col justify-between rounded-lg border border-zinc-800/80 bg-zinc-900/30 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-900/60"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 text-xs font-mono">
                  <span className="text-zinc-400">{cert.issuer}</span>
                  <span className="text-zinc-500">{cert.issueDate}</span>
                </div>

                <h3 className="text-sm font-bold text-zinc-100 leading-snug line-clamp-2">
                  {cert.name}
                </h3>

                {cert.credentialId && (
                  <p className="mt-1.5 text-[11px] font-mono text-zinc-400">
                    ID: <span className="text-zinc-300">{cert.credentialId}</span>
                  </p>
                )}
              </div>

              <div className="mt-3 pt-2.5 border-t border-zinc-850 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{cert.skills[0]}</span>
                </div>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1 text-[11px] font-mono text-blue-400 hover:text-blue-300 py-1"
                  aria-label={`Verify credential for ${cert.name}`}
                >
                  <span>Verify</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
