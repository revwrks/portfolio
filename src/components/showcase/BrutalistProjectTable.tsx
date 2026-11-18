"use client";

import React, { useState, useRef } from "react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolio";
import { playMechanicalClick, playElasticPop } from "@/lib/sound";
import { ArrowUpRight } from "lucide-react";

/**
 * BRUTALIST PROJECT TABLE & 3D HOVER PORTALS
 * Reverse-engineered from Cappen (`cappen.com`) `work__list` & `case-card`.
 * Features 1px hairline geometric tabular borders, monospace taxonomy tags,
 * and 3D perspective hover cards tracking mouse offset coordinates.
 */
export const BrutalistProjectTable: React.FC = () => {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const rowRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const projects = PORTFOLIO_DATA.projects;

  const handleRowClick = (project: Project) => {
    playMechanicalClick(1300);
    // Toggle expanded project specs drawer
    setExpandedProjectId((prev) => (prev === project.id ? null : project.id));
  };

  const handleMouseMove = (e: React.MouseEvent, id: string) => {
    const el = rowRefs.current[id];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Normalized offset from row center [-1 to 1]
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setMousePos({ x, y });
  };

  return (
    <section
      id="projects-index"
      className="relative w-full bg-[#09090b] text-[#f4f4f5] p-6 md:p-16 border-b border-white/10"
      aria-label="Revworks Project Index"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-4">
        <div>
          <span className="mono-hud text-xs text-zinc-500 tracking-[0.25em] mb-2 block">
            FEATURED ENGINEERING / 03
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight uppercase font-sans">
            Project Index
          </h2>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
          <span>TOTAL: {projects.length} PROJECTS</span>
          <span className="text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded bg-emerald-500/5">
            ALL SYSTEMS VERIFIED
          </span>
        </div>
      </div>

      {/* Tabular Header (Desktop) */}
      <div className="hidden lg:grid grid-cols-12 gap-4 pb-3 border-b border-white/10 mono-hud text-[10px] text-zinc-500">
        <span className="col-span-1">[ID]</span>
        <span className="col-span-4">[PROJECT TITLE &amp; SPEC]</span>
        <span className="col-span-3">[CORE CAPABILITIES]</span>
        <span className="col-span-3">[VERIFIED METRIC]</span>
        <span className="col-span-1 text-right">[LINK]</span>
      </div>

      {/* Project Rows */}
      <div className="divide-y divide-white/10 border-b border-white/10">
        {projects.map((project: Project, idx: number) => {
          const isHovered = hoveredProjectId === project.id;
          const displayIdx = (idx + 1).toString().padStart(2, "0");
          const primaryLink = project.links?.live || project.links?.github;

          return (
            <div
              key={project.id}
              ref={(el) => {
                rowRefs.current[project.id] = el;
              }}
              onMouseEnter={() => {
                setHoveredProjectId(project.id);
                playElasticPop(650);
              }}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
              onClick={() => handleRowClick(project)}
              data-project-row
              className={`group relative py-6 lg:py-8 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center transition-colors hover:bg-white/[0.02] cursor-pointer ${
                isHovered ? "z-50" : "z-10"
              }`}
            >
              {/* Col 1: Numerical ID */}
              <div className="col-span-1 font-mono text-xs text-zinc-500 group-hover:text-emerald-400 transition-colors flex items-center justify-between lg:block">
                <span>/{displayIdx}</span>
                <span className="text-[10px] text-zinc-500 uppercase font-mono lg:hidden">
                  {expandedProjectId === project.id ? "[COLLAPSE]" : "[DETAILS]"}
                </span>
              </div>

              {/* Col 2: Project Title & Tagline */}
              <div className="col-span-4">
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors font-sans tracking-tight">
                  {project.title}
                </h3>
                <p className="text-xs md:text-sm text-zinc-400 mt-1 line-clamp-1 font-sans">
                  {project.tagline}
                </p>
              </div>

              {/* Col 3: Monospace Stack Pills */}
              <div className="col-span-3 flex flex-wrap gap-1.5">
                {project.techStack.slice(0, 3).map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="mono-hud text-[9px] text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Col 4: Verified Metric Highlight */}
              <div className="col-span-3 font-mono text-xs text-zinc-300">
                {project.metrics?.[0] ? (
                  <span className="text-emerald-400 font-semibold">
                    {project.metrics[0]}
                  </span>
                ) : (
                  <span className="text-zinc-500">—</span>
                )}
              </div>

              {/* Col 5: Circular Magnetic Arrow Icon / Action Link */}
              <div className="col-span-1 flex justify-end">
                {primaryLink ? (
                  <a
                    href={primaryLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      playMechanicalClick(1400);
                    }}
                    title={`Open ${project.links?.live ? "Live Demo" : "Source Code"}: ${primaryLink}`}
                    aria-label={`Open ${project.title} external link`}
                    className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-emerald-400 group-hover:bg-emerald-500/10 hover:!bg-emerald-400 hover:!border-emerald-400 hover:scale-110 transition-all duration-300 group-hover:rotate-45"
                  >
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 hover:!text-black transition-colors" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowClick(project);
                    }}
                    title="Toggle Project Specification Details"
                    aria-label={`Toggle details for ${project.title}`}
                    className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-emerald-400 group-hover:bg-emerald-500/10 hover:!border-emerald-400 hover:!bg-emerald-500/20 transition-all duration-300 ${
                      expandedProjectId === project.id ? "rotate-90 border-emerald-400 bg-emerald-500/10" : "group-hover:rotate-45"
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                  </button>
                )}
              </div>

              {/* Expanded Project Detail Drawer (Shows on click/tap on desktop & mobile) */}
              {expandedProjectId === project.id && (
                <div
                  className="col-span-1 lg:col-span-12 mt-2 p-5 bg-[#121215] border border-emerald-500/40 rounded-sm shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-white/10 gap-2">
                    <div className="flex items-center gap-3">
                      <span className="mono-hud text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
                        [{project.category.toUpperCase()} SPECIFICATION]
                      </span>
                      {project.metrics?.[0] && (
                        <span className="mono-hud text-[10px] text-zinc-400">
                          INVARIANT: {project.metrics[0]}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">
                      ID: {project.id}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-300 leading-relaxed font-sans max-w-4xl">
                    {project.description}
                  </p>

                  {project.highlights && project.highlights.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-white/5">
                      <span className="mono-hud text-[10px] text-zinc-400 uppercase block mb-2">
                        Key Architectural Highlights:
                      </span>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono text-zinc-300">
                        {project.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold">▹</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-5 pt-3 border-t border-white/10 flex flex-wrap items-center gap-3">
                    {project.links?.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => playMechanicalClick(1400)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-emerald-500/10 border border-emerald-500/40 text-xs font-mono text-emerald-400 hover:bg-emerald-400 hover:text-black transition-colors"
                      >
                        <span>VISIT LIVE DEMO</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => playMechanicalClick(1400)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-white/5 border border-white/15 text-xs font-mono text-zinc-300 hover:border-emerald-400 hover:text-white transition-colors"
                      >
                        <span>SOURCE CODE (GITHUB)</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {!project.links?.live && !project.links?.github && (
                      <span className="text-xs font-mono text-zinc-500 italic">
                        Proprietary commercial production — repository access restricted.
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setExpandedProjectId(null)}
                      className="ml-auto text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      [CLOSE DETAILS]
                    </button>
                  </div>
                </div>
              )}

              {/* Floating 3D Kinetic Hover Portal (Cappen Perspective Tilt, floating cleanly above row without obstructing data) */}
              {isHovered && (
                <div
                  className="hidden lg:block absolute z-[100] pointer-events-none transition-transform duration-150 ease-out"
                  style={{
                    right: "8%",
                    bottom: "calc(100% + 10px)",
                    transform: `perspective(1000px) rotateX(${
                      mousePos.y * -10
                    }deg) rotateY(${mousePos.x * 10}deg) translateZ(40px)`,
                  }}
                >
                  <div className="w-80 p-4 bg-[#141417]/95 border border-emerald-500/60 rounded shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-md">
                    <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
                      <span className="mono-hud text-[9px] text-emerald-400 font-bold">
                        [PREVIEW PORTAL]
                      </span>
                      <span className="mono-hud text-[9px] text-zinc-400 uppercase">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                      {project.description}
                    </p>
                    {project.highlights?.[0] && (
                      <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-emerald-400/90 font-mono">
                        KEY: {project.highlights[0]}
                      </div>
                    )}
                    <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-zinc-500">
                      <span>{primaryLink ? "CLICK [↗] TO OPEN LINK" : "CLICK ROW FOR FULL SPEC"}</span>
                      <span className="text-emerald-400">ACTIVE</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
