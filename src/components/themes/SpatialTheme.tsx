"use client";

import React, { useState } from "react";
import { 
  ArrowUpRight, 
  Award, 
  Briefcase, 
  Check, 
  Copy, 
  ExternalLink, 
  Layers, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  FolderGit2, 
  Cpu 
} from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA, Project, Certification } from "@/data/portfolio";
import { ArchitectureInspector } from "@/components/console/ArchitectureInspector";
import { playUiClick } from "@/lib/audio";
import { useToast } from "@/components/ui/Toast";

type SpatialTab = "works" | "credentials" | "experience" | "stack";

export function SpatialTheme() {
  const { personal, projects, certifications, experience, volunteering, skills } = PORTFOLIO_DATA;
  const [activeTab, setActiveTab] = useState<SpatialTab>("works");
  const [worksFilter, setWorksFilter] = useState<"all" | "engineering" | "creative">("all");
  const [selectedArchProject, setSelectedArchProject] = useState<string | null>(null);
  const [isHoveredAvatar, setIsHoveredAvatar] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { showToast } = useToast();

  const filteredProjects = projects.filter((p) => {
    if (worksFilter === "all") return true;
    return p.category === worksFilter;
  });

  const handleCopyEmail = () => {
    playUiClick(950);
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    showToast("Email copied to clipboard: mahendrapujo@gmail.com 📋");
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const dockItems: { key: SpatialTab; label: string; icon: React.ElementType; badge?: string | number }[] = [
    { key: "works", label: "Works", icon: FolderGit2, badge: projects.length },
    { key: "credentials", label: "Certs", icon: ShieldCheck, badge: certifications.length },
    { key: "experience", label: "Journey", icon: Briefcase, badge: experience.length },
    { key: "stack", label: "Stack", icon: Cpu },
  ];

  return (
    <div className="relative min-h-screen bg-[#050508] text-[#fafafa] font-sans selection:bg-emerald-500/30 selection:text-white pb-36 overflow-x-hidden">
      
      {/* Dynamic Ambient Aurora Glow in Background */}
      <div className="fixed top-1/4 -left-48 w-96 h-96 bg-indigo-600/15 rounded-full blur-[128px] pointer-events-none" />
      <div className="fixed bottom-1/3 -right-48 w-96 h-96 bg-emerald-600/15 rounded-full blur-[128px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        
        {/* Floating Top Navigation Pill */}
        <header className="rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-2xl p-4 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-3">
            {/* Viewfinder Avatar */}
            <div 
              className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 cursor-pointer shadow-md transition-transform hover:scale-105"
              onMouseEnter={() => setIsHoveredAvatar(true)}
              onMouseLeave={() => setIsHoveredAvatar(false)}
              onClick={() => {
                playUiClick(700);
                setIsHoveredAvatar(!isHoveredAvatar);
              }}
            >
              <img
                src={isHoveredAvatar ? personal.avatarHover : personal.avatar}
                alt={personal.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">{personal.name}</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold px-2 py-0.2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  REVWORKS
                </span>
              </div>
              <span className="text-xs text-zinc-400 font-mono block">
                Head of Marketing · Fullstack Architect
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="px-3.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-200 hover:text-white transition-all duration-150 flex items-center gap-1.5"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
              <span className="hidden sm:inline">{copiedEmail ? "Copied" : "Copy Email"}</span>
            </button>

            <a
              href={`mailto:${personal.email}`}
              onClick={() => playUiClick(600)}
              className="px-3.5 py-1.5 rounded-xl bg-white text-zinc-950 font-mono text-xs font-bold hover:bg-zinc-200 transition-all duration-150"
            >
              Connect
            </a>
          </div>
        </header>

        {/* Central Spatial Stage */}
        <main className="rounded-3xl border border-white/10 bg-zinc-900/40 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] min-h-[600px] flex flex-col justify-between">
          
          <div>
            {/* Stage Tab Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="text-emerald-400 font-bold">SPATIAL //</span>
                  <span className="uppercase tracking-wider text-white font-bold">{activeTab}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {activeTab === "works" && "Curated Projects & Systems"}
                  {activeTab === "credentials" && "Verified Proof & Certifications"}
                  {activeTab === "experience" && "Leadership & Professional Timeline"}
                  {activeTab === "stack" && "Technical Architecture Arsenal"}
                </h1>
              </div>

              {activeTab === "works" && (
                <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/10 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => {
                      playUiClick(500);
                      setWorksFilter("all");
                    }}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      worksFilter === "all" ? "bg-white text-zinc-950 font-bold" : "text-zinc-400 hover:text-white"
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
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      worksFilter === "engineering" ? "bg-emerald-600 text-white font-bold" : "text-zinc-400 hover:text-white"
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
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      worksFilter === "creative" ? "bg-purple-600 text-white font-bold" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Media
                  </button>
                </div>
              )}
            </div>

            {/* TAB 1: WORKS */}
            {activeTab === "works" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 animate-stage-enter">
                {filteredProjects.map((project: Project) => (
                  <article
                    key={project.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-200 flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className={`px-2.5 py-0.5 rounded-full border ${
                          project.category === "engineering"
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : "bg-purple-500/10 border-purple-500/20 text-purple-400"
                        }`}>
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="text-amber-400 flex items-center gap-1 font-semibold text-[11px]">
                            <Sparkles className="w-3 h-3" />
                            Featured
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {project.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="space-y-1 font-mono text-[11px] text-zinc-400 pt-1">
                        {project.metrics.map((m, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>{m}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/40 border border-white/10 text-zinc-400">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      {project.id === "topup-store" ? (
                        <button
                          type="button"
                          onClick={() => {
                            playUiClick(750);
                            setSelectedArchProject(project.id);
                          }}
                          className="text-xs font-mono text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5"
                        >
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Inspect Spec</span>
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono text-zinc-500">REVWORKS // ACTIVE</span>
                      )}

                      <div className="flex items-center gap-2">
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playUiClick(600)}
                            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-200 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playUiClick(600)}
                            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-zinc-200 transition-colors"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* TAB 2: CREDENTIALS */}
            {activeTab === "credentials" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 animate-stage-enter">
                {certifications.map((cert: Certification) => (
                  <div 
                    key={cert.id}
                    className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                      <span className="text-white font-bold">{cert.issuer}</span>
                      <span>{cert.issueDate}</span>
                    </div>
                    <h2 className="text-base font-bold text-white">{cert.name}</h2>
                    {cert.credentialId && (
                      <span className="text-xs font-mono text-zinc-400 block">
                        Credential ID: {cert.credentialId}
                      </span>
                    )}
                    <div className="pt-2">
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playUiClick(600)}
                        className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-emerald-300 font-semibold"
                      >
                        <span>Verify Credential</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: EXPERIENCE & VOLUNTEERING */}
            {activeTab === "experience" && (
              <div className="space-y-4 pt-6 animate-stage-enter">
                {experience.map((exp, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-1">
                      <h2 className="text-base font-bold text-white">{exp.role} · <span className="text-zinc-400">{exp.company}</span></h2>
                      <span className="text-zinc-400">{exp.period}</span>
                    </div>
                    <div className="text-xs font-mono text-zinc-400">{exp.location} · {exp.type}</div>
                    <p className="text-sm text-zinc-300 leading-relaxed pt-1">
                      {exp.highlights[0]}
                    </p>
                  </div>
                ))}

                {volunteering && volunteering.map((vol, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-1">
                      <h2 className="text-base font-bold text-emerald-400">{vol.role} · <span className="text-zinc-200">{vol.organization}</span></h2>
                      <span className="text-zinc-400">{vol.period}</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed pt-1">
                      {vol.highlights[0]}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 4: TECHNICAL MATRIX */}
            {activeTab === "stack" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6 animate-stage-enter">
                <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] space-y-3">
                  <h2 className="text-sm font-bold font-mono text-emerald-400 uppercase tracking-wider">
                    // Backend & Architecture
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.backend.concat(skills.databases).map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-black/40 border border-white/10 text-zinc-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] space-y-3">
                  <h2 className="text-sm font-bold font-mono text-blue-400 uppercase tracking-wider">
                    // Frontend & Canvas
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.frontend.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-black/40 border border-white/10 text-zinc-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] space-y-3">
                  <h2 className="text-sm font-bold font-mono text-purple-400 uppercase tracking-wider">
                    // Creative & Multimedia
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.creativeDesign.concat(skills.devOpsAndTools).map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-black/40 border border-white/10 text-zinc-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Social Bar at bottom of stage */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
            <div>
              <span>REVWORKS © 2026 // CRAFTED WITH ASTRYX SPATIAL</span>
            </div>
            <div className="flex items-center gap-3">
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a>
              <span>·</span>
              <a href={personal.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">Instagram</a>
              <span>·</span>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">LinkedIn</a>
            </div>
          </div>
        </main>
      </div>

      {/* FLOATING macOS DOCK NAVIGATION */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <nav
          aria-label="Spatial Stage Navigation"
          className="flex items-center gap-1.5 p-2 rounded-2xl border border-white/15 bg-zinc-950/70 backdrop-blur-2xl shadow-2xl"
        >
          {dockItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  playUiClick(800);
                  setActiveTab(item.key);
                }}
                className={`min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-white text-zinc-950 font-bold shadow-lg scale-105"
                    : "text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? "bg-zinc-200 text-zinc-900" : "bg-white/10 text-zinc-400"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Architecture Spec Modal */}
      {selectedArchProject && (
        <ArchitectureInspector
          isOpen={true}
          projectTitle="TopUp Store & KeyVault Engine"
          onClose={() => setSelectedArchProject(null)}
        />
      )}
    </div>
  );
}
