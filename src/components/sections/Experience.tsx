import React from "react";
import { Briefcase, Calendar, GraduationCap, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Experience() {
  const { experience, education } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-20 border-b border-zinc-850/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Work Experience (Span 2 columns) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
              <Briefcase className="w-4 h-4" aria-hidden="true" />
              <span>Career Trajectory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-8">
              Work & Engineering Experience
            </h2>

            <div className="space-y-8">
              {experience.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6 md:p-7 transition-colors hover:border-zinc-700"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100">{item.role}</h3>
                      <p className="text-sm font-semibold text-blue-400">{item.company}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{item.period}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{item.location}</span>
                      </span>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm text-zinc-300 list-disc list-outside pl-4 leading-relaxed">
                    {item.highlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="marker:text-zinc-500">
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/50">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-xs font-mono rounded bg-zinc-800/40 text-zinc-400 border border-zinc-750"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Academic Foundation (1 column) */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider mb-2">
              <GraduationCap className="w-4 h-4" aria-hidden="true" />
              <span>Academic Foundation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-8">
              Education
            </h2>

            <div className="space-y-6">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6 transition-colors hover:border-zinc-700"
                >
                  <span className="text-xs font-mono text-purple-400 font-semibold">{edu.period}</span>
                  <h3 className="text-base font-bold text-zinc-100 mt-1">{edu.degree}</h3>
                  <p className="text-sm font-medium text-zinc-300 mt-0.5">{edu.institution}</p>
                  <p className="text-xs text-zinc-400 mt-2">{edu.field}</p>
                  {edu.location && (
                    <p className="text-xs font-mono text-zinc-400 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" aria-hidden="true" />
                      <span>{edu.location}</span>
                    </p>
                  )}
                </div>
              ))}

              <div className="p-5 rounded-xl border border-zinc-800/60 bg-blue-950/10 text-xs text-zinc-400 leading-relaxed">
                <span className="font-semibold text-zinc-200 block mb-1">Continuous Specialization</span>
                Combined 8 years of formal computer engineering education with ongoing industry certifications across Meta, Google, and HackerRank.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
