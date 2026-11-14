import React from "react";
import { ArrowUpRight, Award, CheckCircle2, ShieldCheck } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Certifications() {
  const { certifications } = PORTFOLIO_DATA;

  return (
    <section id="credentials" className="py-20 border-b border-zinc-850/80 bg-zinc-950/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />
            <span>Verified Industry Accreditations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Licenses & Professional Certifications
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400">
            Rigorous credentials evaluated by global tech leaders and standardized coding assessment platforms.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert) => (
            <article
              key={cert.id}
              className="flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/70"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300">
                      <Award className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block text-xs font-mono text-zinc-400">{cert.issuer}</span>
                      <span className="block text-xs text-zinc-400 font-mono">{cert.issueDate}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                    <span>Verified</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-zinc-100 leading-snug">
                  {cert.name}
                </h3>

                {cert.credentialId && (
                  <p className="mt-2 text-xs font-mono text-zinc-400">
                    ID: <span className="text-zinc-300 select-all">{cert.credentialId}</span>
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Validated competencies">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-[11px] font-mono rounded bg-zinc-800/60 text-zinc-400 border border-zinc-750"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/60">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-between w-full text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors py-2 focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  aria-label={`Verify credential for ${cert.name} on ${cert.issuer}`}
                >
                  <span>Verify Credential Online</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
