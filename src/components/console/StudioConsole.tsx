"use client";

import React, { useState } from "react";
import { 
  ArrowUpRight, 
  Award, 
  Briefcase, 
  Code2, 
  Database, 
  ExternalLink, 
  GraduationCap, 
  Layers, 
  Mail, 
  MapPin, 
  Palette, 
  Pencil,
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  Wrench,
  Zap
} from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA, Project, Certification } from "@/data/portfolio";
import { StudioTelemetry } from "@/components/console/StudioTelemetry";
import { CanvasScratchpad } from "@/components/console/CanvasScratchpad";
import { ArchitectureInspector } from "@/components/console/ArchitectureInspector";
import { playUiClick } from "@/lib/audio";

type TabKey = "works" | "scratchpad" | "credentials" | "experience" | "stack";

export function StudioConsole() {
  const [activeTab, setActiveTab] = useState<TabKey>("works");
  const [worksFilter, setWorksFilter] = useState<"all" | "engineering" | "creative">("all");
  const [selectedArchProject, setSelectedArchProject] = useState<string | null>(null);

  const { personal, projects, certifications, experience, education, skills } = PORTFOLIO_DATA;

  const filteredProjects = projects.filter((p) => {
    if (worksFilter === "all") return true;
    return p.category === worksFilter;
  });

  const navItems: { key: TabKey; label: string; icon: React.ElementType; count?: number | string; badge?: string }[] = [
    { key: "works", label: "Selected Works", icon: Layers, count: projects.length },
    { key: "scratchpad", label: "Canvas Scratchpad", icon: Pencil, badge: "LIVE" },
    { key: "credentials", label: "Credentials", icon: ShieldCheck, count: certifications.length },
    { key: "experience", label: "Experience & Edu", icon: Briefcase, count: experience.length },
    { key: "stack", label: "Tech Stack", icon: Terminal, count: 5 },
  ];

  const handleTabChange = (key: TabKey) => {
    playUiClick(800);
    setActiveTab(key);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#09090b] text-[#fafafa] flex flex-col font-sans select-none lg:select-auto">
      
      {/* Top Mobile Bar */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-zinc-950 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="font-mono text-sm font-black tracking-tight text-white">REVWORKS</span>
          <span className="text-xs text-zinc-500 font-mono">// REV</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-white"
            aria-label="GitHub @revwrks"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={personal.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-pink-400"
            aria-label="Instagram @itzrevv"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Main Single-Viewport Stage Container */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-7xl mx-auto w-full lg:p-6 lg:gap-6">
        
        {/* LEFT PANE: Studio Anchor (Fixed on desktop, 38% width) */}
        <aside className="lg:w-[38%] flex flex-col justify-between p-4 sm:p-6 lg:p-7 lg:rounded-2xl lg:border lg:border-zinc-800/80 lg:bg-zinc-950/70 lg:backdrop-blur-md flex-shrink-0 border-b lg:border-b-0 border-zinc-850 overflow-y-auto">
          <div>
            {/* Studio Badge */}
            <div className="hidden lg:flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="font-mono text-base font-black tracking-tight text-white">
                  REVWORKS
                </span>
                <span className="text-xs font-mono text-zinc-500 font-semibold tracking-wider">
                  // LAB
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ● ACTIVE
              </span>
            </div>

            {/* Profile Intro */}
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight">
                {personal.name}
              </h1>
              <p className="text-xs sm:text-sm font-mono text-blue-400 mt-1">
                {personal.role} <span className="text-zinc-500">(@rev)</span>
              </p>
              <p className="mt-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                {personal.bio}
              </p>
            </div>

            {/* Studio Navigation (Interactive Tabs) */}
            <nav className="mt-5 space-y-1.5" role="tablist" aria-label="Studio Console Views">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleTabChange(item.key)}
                    className={`w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-mono transition-all ${
                      isActive
                        ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-900/20"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900/80 border border-transparent hover:border-zinc-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </div>

                    {item.badge ? (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold animate-pulse">
                        {item.badge}
                      </span>
                    ) : item.count !== undefined ? (
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-md ${
                          isActive
                            ? "bg-blue-700/60 text-blue-100"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {item.count}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Left Pane Lower Section: Telemetry + Socials */}
          <div className="pt-5 border-t border-zinc-850/80 mt-5 space-y-3">
            {/* Feature 3: Studio Telemetry */}
            <StudioTelemetry />

            <div className="hidden lg:flex items-center gap-2">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiClick(600)}
                className="min-h-[44px] flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>@revwrks</span>
              </a>
              <a
                href={personal.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiClick(600)}
                className="min-h-[44px] flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 hover:text-pink-400 transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                <span>@itzrevv</span>
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiClick(600)}
                className="min-h-[44px] p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
              </a>
            </div>
          </div>
        </aside>

        {/* RIGHT PANE: The Stage (62% width, contained scroll inside) */}
        <main className="lg:w-[62%] flex-1 flex flex-col overflow-hidden lg:rounded-2xl lg:border lg:border-zinc-800/80 lg:bg-zinc-950/40 lg:backdrop-blur-md">
          
          {/* Stage Top Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-zinc-800/80 bg-zinc-950/80 flex-shrink-0">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-zinc-500">STAGE //</span>
              <span className="text-zinc-200 font-bold uppercase tracking-wider">
                {activeTab}
              </span>
            </div>

            {/* Filter pills if in Works tab */}
            {activeTab === "works" && (
              <div className="flex items-center gap-1 p-0.5 rounded-md border border-zinc-800 bg-zinc-900/80 text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => {
                    playUiClick(500);
                    setWorksFilter("all");
                  }}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    worksFilter === "all" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  All ({projects.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playUiClick(500);
                    setWorksFilter("engineering");
                  }}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    worksFilter === "engineering" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Code
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playUiClick(500);
                    setWorksFilter("creative");
                  }}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    worksFilter === "creative" ? "bg-purple-600 text-white" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Media
                </button>
              </div>
            )}

            {/* Quick Email link on other tabs */}
            {activeTab !== "works" && (
              <a
                href={`mailto:${personal.email}`}
                onClick={() => playUiClick(700)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Connect with Rev</span>
              </a>
            )}
          </div>

          {/* Stage Contained Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 focus:outline-none" tabIndex={0}>
            
            {/* VIEW 1: WORKS */}
            {activeTab === "works" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProjects.map((project: Project) => (
                  <article
                    key={project.id}
                    className="flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 sm:p-5 transition-all hover:border-zinc-700 hover:bg-zinc-900/70"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                            project.category === "engineering"
                              ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                              : "border-purple-500/30 bg-purple-500/10 text-purple-400"
                          }`}
                        >
                          {project.category.toUpperCase()}
                        </span>
                        {project.featured && (
                          <span className="flex items-center gap-1 text-[10px] font-mono text-amber-400">
                            <Sparkles className="w-3 h-3" />
                            <span>FLAGSHIP</span>
                          </span>
                        )}
                      </div>

                      <h2 className="text-base sm:text-lg font-bold text-zinc-100 leading-snug">
                        {project.title}
                      </h2>
                      <p className="mt-1.5 text-xs text-zinc-300 leading-relaxed font-normal">
                        {project.tagline}
                      </p>

                      {/* Key Metric Highlights */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.metrics.map((m, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 text-zinc-400"
                          >
                            • {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800/60 flex flex-wrap items-center justify-between gap-2">
                      {/* Feature 4: Inspect Architecture trigger */}
                      {project.id === "topup-store" ? (
                        <button
                          type="button"
                          onClick={() => {
                            playUiClick(1000);
                            setSelectedArchProject(project.title);
                          }}
                          className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Inspect Spec</span>
                        </button>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {project.techStack.slice(0, 3).map((t) => (
                            <span key={t} className="text-[10px] font-mono text-zinc-400">
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playUiClick(700)}
                            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1 text-xs font-mono font-medium text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg transition-colors"
                          >
                            <span>Live</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playUiClick(700)}
                            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1 text-xs font-mono text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg border border-zinc-700 transition-colors"
                          >
                            <GithubIcon className="w-3 h-3" />
                            <span>Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* VIEW 2: INTERACTIVE CANVAS SCRATCHPAD (Feature 1) */}
            {activeTab === "scratchpad" && (
              <div className="h-full">
                <CanvasScratchpad />
              </div>
            )}

            {/* VIEW 3: CREDENTIALS */}
            {activeTab === "credentials" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {certifications.map((cert: Certification) => (
                  <article
                    key={cert.id}
                    className="flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 transition-colors hover:border-zinc-700 hover:bg-zinc-900/60"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1.5">
                        <span className="text-zinc-300 font-semibold">{cert.issuer}</span>
                        <span>{cert.issueDate}</span>
                      </div>
                      <h2 className="text-sm font-bold text-zinc-100 leading-snug">
                        {cert.name}
                      </h2>
                      {cert.credentialId && (
                        <p className="mt-1 text-[11px] font-mono text-zinc-400">
                          ID: <span className="text-zinc-300">{cert.credentialId}</span>
                        </p>
                      )}
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {cert.skills.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800/60 text-zinc-400 border border-zinc-750"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-zinc-850 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        <span>Verified</span>
                      </span>
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playUiClick(700)}
                        className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1 text-xs font-mono text-blue-400 hover:text-blue-300 py-1"
                      >
                        <span>Verify Credential</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* VIEW 4: EXPERIENCE & EDUCATION */}
            {activeTab === "experience" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-3">
                    // Career Trajectory (5+ Years)
                  </h2>
                  <div className="space-y-3">
                    {experience.map((exp, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-4 transition-colors hover:border-zinc-700"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <div>
                            <h3 className="text-sm font-bold text-zinc-100">{exp.role}</h3>
                            <p className="text-xs font-semibold text-blue-400">{exp.company}</p>
                          </div>
                          <span className="text-xs font-mono text-zinc-500">{exp.period}</span>
                        </div>
                        <ul className="mt-2 space-y-1 text-xs text-zinc-300 list-disc list-outside pl-4 leading-relaxed">
                          {exp.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-850">
                  <h2 className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Academic Foundation</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {education.map((edu, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-zinc-800/80 bg-zinc-900/30 p-3.5"
                      >
                        <span className="text-[11px] font-mono text-purple-400">{edu.period}</span>
                        <h3 className="text-xs font-bold text-zinc-100 mt-0.5">{edu.degree}</h3>
                        <p className="text-xs text-zinc-400">{edu.institution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 5: TECH STACK MATRIX */}
            {activeTab === "stack" && (
              <div className="space-y-3">
                {[
                  { title: "Backend Systems & APIs", items: skills.backend, icon: Terminal, color: "text-blue-400" },
                  { title: "Databases & Data Modeling", items: skills.databases, icon: Database, color: "text-emerald-400" },
                  { title: "Frontend & HTML5 Canvas", items: skills.frontend, icon: Code2, color: "text-cyan-400" },
                  { title: "UX Research & Video Direction", items: skills.creativeDesign, icon: Palette, color: "text-purple-400" },
                  { title: "DevOps, Infra & Environments", items: skills.devOpsAndTools, icon: Wrench, color: "text-amber-400" },
                ].map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-4 transition-colors hover:border-zinc-700"
                    >
                      <div className="flex items-center gap-2 mb-2.5">
                        <Icon className={`w-4 h-4 ${s.color}`} />
                        <h2 className="text-xs font-mono font-bold text-zinc-200">{s.title}</h2>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {s.items.map((item) => (
                          <span
                            key={item}
                            className="px-2 py-1 text-xs font-mono rounded bg-zinc-800/50 text-zinc-300 border border-zinc-750"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* Mobile Bottom Social Anchor */}
          <footer className="lg:hidden flex items-center justify-between px-4 py-2.5 border-t border-zinc-850 bg-zinc-950 text-xs font-mono text-zinc-400 flex-shrink-0">
            <span>REVWORKS © 2026</span>
            <a href={`mailto:${personal.email}`} className="text-blue-400">
              {personal.email}
            </a>
          </footer>

        </main>

      </div>

      {/* Feature 4: Interactive Architecture Drawer */}
      <ArchitectureInspector
        isOpen={!!selectedArchProject}
        onClose={() => setSelectedArchProject(null)}
        projectTitle={selectedArchProject || ""}
      />

    </div>
  );
}
