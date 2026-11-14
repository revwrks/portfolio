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
  HeartHandshake,
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
  const [isHoveredAvatar, setIsHoveredAvatar] = useState(false);

  const { personal, projects, certifications, experience, education, volunteering, skills } = PORTFOLIO_DATA;

  const filteredProjects = projects.filter((p) => {
    if (worksFilter === "all") return true;
    return p.category === worksFilter;
  });

  const navItems: { key: TabKey; num: string; label: string; icon: React.ElementType; count?: number | string; badge?: string }[] = [
    { key: "works", num: "01", label: "Selected Works", icon: Layers, count: projects.length },
    { key: "scratchpad", num: "02", label: "Canvas Scratchpad", icon: Pencil, badge: "LIVE" },
    { key: "credentials", num: "03", label: "Credentials", icon: ShieldCheck, count: certifications.length },
    { key: "experience", num: "04", label: "Career & Edu", icon: Briefcase, count: experience.length + (volunteering?.length || 0) },
    { key: "stack", num: "05", label: "Technical Matrix", icon: Terminal, count: 5 },
  ];

  const handleTabChange = (key: TabKey) => {
    playUiClick(800);
    setActiveTab(key);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#050507] text-[#fafafa] flex flex-col font-sans select-none lg:select-auto">
      
      {/* Background Architectural Grid Accent */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(#1e1e28_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Top Mobile Bar */}
      <header className="lg:hidden relative z-20 flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-[#09090e]/95 backdrop-blur-xl flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-zinc-700 flex-shrink-0 shadow-md">
            <img src={personal.avatar} alt="Rev" className="w-full h-full object-cover object-top" />
          </div>
          <div>
            <span className="font-mono text-sm font-black tracking-tight text-white block leading-none">
              REVWORKS<span className="text-lime-400">®</span>
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">// {personal.name}</span>
          </div>
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
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row overflow-hidden max-w-7xl mx-auto w-full lg:p-5 lg:gap-5">
        
        {/* LEFT PANE: Neo-Brutalist Studio Anchor (Astryx Y2K Theme) */}
        <aside className="lg:w-[38%] flex flex-col justify-between p-4 sm:p-5 lg:p-6 lg:rounded-xl border-b lg:border border-zinc-800/90 bg-[#0a0a0f] flex-shrink-0 overflow-y-auto custom-scrollbar shadow-2xl">
          <div>
            {/* Studio Header Stamp */}
            <div className="hidden lg:flex items-center justify-between mb-4 pb-3 border-b border-zinc-850">
              <div className="flex items-center gap-2 font-mono">
                <span className="text-base font-black tracking-tighter text-white">
                  REVWORKS<span className="text-lime-400">®</span>
                </span>
                <span className="text-[11px] text-zinc-500 font-semibold tracking-wider">
                  [CREATIVE TECH LAB]
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded border border-lime-400/30">
                ACTIVE // 2026
              </span>
            </div>

            {/* Viewfinder Framed Avatar + Personal Identity */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-zinc-700 bg-zinc-900 flex-shrink-0 group cursor-pointer shadow-md transition-all duration-200 hover:border-lime-400"
                onMouseEnter={() => {
                  setIsHoveredAvatar(true);
                  playUiClick(1200);
                }}
                onMouseLeave={() => setIsHoveredAvatar(false)}
                title="Hover for alternative pose!"
              >
                {/* Viewfinder Crosshair Ticks */}
                <span className="absolute top-1 left-1 text-[8px] font-mono text-zinc-500 leading-none z-10">+</span>
                <span className="absolute top-1 right-1 text-[8px] font-mono text-zinc-500 leading-none z-10">+</span>
                <span className="absolute bottom-1 left-1 text-[8px] font-mono text-zinc-500 leading-none z-10">+</span>
                <span className="absolute bottom-1 right-1 text-[8px] font-mono text-zinc-500 leading-none z-10">+</span>

                <img
                  src={isHoveredAvatar ? personal.avatarHover : personal.avatar}
                  alt={`${personal.name} avatar`}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div>
                <h1 className="text-lg sm:text-xl font-black tracking-tight text-white uppercase leading-tight font-mono">
                  {personal.name}
                </h1>
                <p className="text-xs font-mono font-semibold text-lime-400 mt-0.5 tracking-wide">
                  CREATIVE TECHNOLOGIST // REV
                </p>
                <p className="text-[11px] font-mono text-zinc-400 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  <span>{personal.location}</span>
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {personal.bio}
            </p>

            {/* Astryx Segmented Navigation (Industrial / Y2K Style) */}
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
                    className={`w-full min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-mono transition-all duration-150 active:scale-[0.98] ${
                      isActive
                        ? "bg-zinc-100 text-zinc-950 font-black shadow-md border-l-4 border-lime-500"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-850/80 hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold ${isActive ? "text-zinc-600" : "text-zinc-500"}`}>
                        {item.num}
                      </span>
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.label}</span>
                    </div>

                    {item.badge ? (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-lime-400/20 text-lime-400 border border-lime-400/40 font-bold animate-pulse">
                        {item.badge}
                      </span>
                    ) : item.count !== undefined ? (
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                          isActive
                            ? "bg-zinc-300 text-zinc-900"
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
          <div className="pt-4 border-t border-zinc-850 mt-4 space-y-3">
            {/* Feature 3: Studio Telemetry */}
            <StudioTelemetry />

            <div className="hidden lg:flex items-center gap-2">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiClick(600)}
                className="min-h-[44px] flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>@revwrks</span>
              </a>
              <a
                href={personal.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiClick(600)}
                className="min-h-[44px] flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 hover:border-zinc-700 text-xs font-mono text-zinc-300 hover:text-pink-400 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                <span>@itzrevv</span>
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiClick(600)}
                className="min-h-[44px] p-2.5 rounded-lg border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-blue-400 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
              </a>
            </div>
          </div>
        </aside>

        {/* RIGHT PANE: The Stage (Neo-Brutalist Studio Workstation) */}
        <main className="lg:w-[62%] flex-1 flex flex-col overflow-hidden lg:rounded-xl border border-zinc-800/90 bg-[#0a0a0f] shadow-2xl">
          
          {/* Stage Top Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-zinc-800 bg-[#0e0e14] flex-shrink-0">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-zinc-500 font-bold">STAGE //</span>
              <span className="text-lime-400 font-black uppercase tracking-wider">
                {activeTab}
              </span>
              <span className="text-zinc-600 hidden sm:inline">· WORKSPACE-01</span>
            </div>

            {/* Filter pills if in Works tab */}
            {activeTab === "works" && (
              <div className="flex items-center gap-1 p-0.5 rounded-lg border border-zinc-800 bg-zinc-900 text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => {
                    playUiClick(500);
                    setWorksFilter("all");
                  }}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    worksFilter === "all" ? "bg-zinc-100 text-zinc-950 font-bold" : "text-zinc-400 hover:text-zinc-200"
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
                    worksFilter === "engineering" ? "bg-blue-600 text-white font-bold" : "text-zinc-400 hover:text-zinc-200"
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
                    worksFilter === "creative" ? "bg-purple-600 text-white font-bold" : "text-zinc-400 hover:text-zinc-200"
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
                <Mail className="w-3.5 h-3.5 text-lime-400" />
                <span className="hidden sm:inline">Connect with Rev</span>
              </a>
            )}
          </div>

          {/* Stage Contained Scrollable Body with Fade-Slide Staging */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 focus:outline-none custom-scrollbar" tabIndex={0}>
            
            {/* STAGE CONTAINER WITH ELEGANT ENTER ANIMATION */}
            <div key={activeTab} className="animate-stage-enter">
              
              {/* VIEW 1: WORKS */}
              {activeTab === "works" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProjects.map((project: Project) => (
                    <article
                      key={project.id}
                      className="group flex flex-col justify-between rounded-xl border border-zinc-800 bg-[#0e0e14] p-4 sm:p-5 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-zinc-500 hover:bg-[#121218] hover:shadow-xl hover:shadow-black/50"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                              project.category === "engineering"
                                ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                                : "border-purple-500/30 bg-purple-500/10 text-purple-400"
                            }`}
                          >
                            {project.category.toUpperCase()}
                          </span>
                          {project.featured && (
                            <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded border border-lime-400/30">
                              <Sparkles className="w-3 h-3" />
                              <span>FLAGSHIP</span>
                            </span>
                          )}
                        </div>

                        <h2 className="text-base sm:text-lg font-black text-zinc-100 leading-snug group-hover:text-white transition-colors">
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
                              className="text-[10px] font-mono bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 text-zinc-400 group-hover:border-zinc-700 transition-colors"
                            >
                              • {m}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-2">
                        {/* Feature 4: Inspect Architecture trigger */}
                        {project.id === "topup-store" ? (
                          <button
                            type="button"
                            onClick={() => {
                              playUiClick(1000);
                              setSelectedArchProject(project.title);
                            }}
                            className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300 bg-cyan-950/40 border border-cyan-700/50 px-2.5 py-1.5 rounded-lg transition-all duration-150 hover:scale-[1.03] active:scale-[0.97]"
                          >
                            <Zap className="w-3.5 h-3.5" />
                            <span>Inspect Spec</span>
                          </button>
                        ) : (
                          <div className="flex flex-wrap gap-1">
                            {project.techStack.slice(0, 3).map((t) => (
                              <span 
                                key={t} 
                                className="text-[10px] font-mono text-zinc-400 hover:text-zinc-200 transition-colors"
                              >
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
                              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1 text-xs font-mono font-bold text-zinc-950 bg-lime-400 hover:bg-lime-300 px-3 py-1.5 rounded-lg transition-all duration-150 hover:scale-105 active:scale-95 shadow-sm"
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
                              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1 text-xs font-mono font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg border border-zinc-700 transition-all duration-150 hover:scale-105 active:scale-95"
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

              {/* VIEW 2: INTERACTIVE CANVAS SCRATCHPAD */}
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
                      className="group flex flex-col justify-between rounded-xl border border-zinc-800 bg-[#0e0e14] p-4 transition-all duration-200 ease-out hover:-translate-y-1 hover:border-zinc-500 hover:bg-[#121218]"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-1.5">
                          <span className="text-zinc-300 font-semibold">{cert.issuer}</span>
                          <span>{cert.issueDate}</span>
                        </div>
                        <h2 className="text-sm font-black text-zinc-100 leading-snug group-hover:text-lime-300 transition-colors font-mono">
                          {cert.name}
                        </h2>
                        {cert.credentialId && (
                          <p className="mt-1 text-[11px] font-mono text-zinc-400">
                            ID: <span className="text-zinc-300 select-all">{cert.credentialId}</span>
                          </p>
                        )}
                        <div className="mt-2.5 flex flex-wrap gap-1">
                          {cert.skills.map((s) => (
                            <span
                              key={s}
                              className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700 hover:scale-105 hover:bg-zinc-700 transition-transform"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-zinc-800 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-lime-400 font-bold flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          <span>VERIFIED</span>
                        </span>
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => playUiClick(700)}
                          className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-1 text-xs font-mono font-bold text-lime-400 hover:text-lime-300 py-1 transition-colors"
                        >
                          <span>Verify Credential</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* VIEW 4: EXPERIENCE, EDUCATION & VOLUNTEERING */}
              {activeTab === "experience" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider mb-3">
                      // Career Trajectory (5+ Years Production)
                    </h2>
                    <div className="space-y-3">
                      {experience.map((exp, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-zinc-800 bg-[#0e0e14] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                            <div>
                              <h3 className="text-sm font-bold text-zinc-100">{exp.role}</h3>
                              <p className="text-xs font-semibold text-blue-400 font-mono">{exp.company}</p>
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

                  {/* Volunteering & Community Work */}
                  <div className="pt-4 border-t border-zinc-850">
                    <h2 className="text-xs font-mono font-bold text-lime-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <HeartHandshake className="w-3.5 h-3.5" />
                      <span>Social Services & Community (GKJW)</span>
                    </h2>
                    <div className="space-y-3">
                      {volunteering?.map((vol, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-zinc-800 bg-[#0e0e14] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                            <div>
                              <h3 className="text-sm font-bold text-zinc-100">{vol.role}</h3>
                              <p className="text-xs font-semibold text-lime-400 font-mono">{vol.organization}</p>
                            </div>
                            <span className="text-xs font-mono text-zinc-500">{vol.period}</span>
                          </div>
                          <p className="text-[11px] font-mono text-zinc-400 mb-2">
                            Category: {vol.category}
                          </p>
                          <ul className="mt-2 space-y-1 text-xs text-zinc-300 list-disc list-outside pl-4 leading-relaxed">
                            {vol.highlights.map((h, i) => (
                              <li key={i}>{h}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Academic Foundation */}
                  <div className="pt-4 border-t border-zinc-850">
                    <h2 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Academic Foundation</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {education.map((edu, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg border border-zinc-800 bg-[#0e0e14] p-3.5 transition-all duration-200 hover:border-zinc-700"
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
                        className="rounded-xl border border-zinc-800 bg-[#0e0e14] p-4 transition-all duration-200 hover:border-zinc-700"
                      >
                        <div className="flex items-center gap-2 mb-2.5">
                          <Icon className={`w-4 h-4 ${s.color}`} />
                          <h2 className="text-xs font-mono font-bold text-zinc-200 uppercase">{s.title}</h2>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {s.items.map((item) => (
                            <span
                              key={item}
                              className="px-2 py-1 text-xs font-mono rounded bg-zinc-800 text-zinc-300 border border-zinc-700 transition-all duration-150 hover:scale-105 hover:bg-zinc-700 hover:border-zinc-500"
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

          </div>

          {/* Mobile Bottom Social Anchor */}
          <footer className="lg:hidden flex items-center justify-between px-4 py-2.5 border-t border-zinc-850 bg-[#0e0e14] text-xs font-mono text-zinc-400 flex-shrink-0">
            <span>REVWORKS® © 2026</span>
            <a href={`mailto:${personal.email}`} className="text-lime-400">
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
