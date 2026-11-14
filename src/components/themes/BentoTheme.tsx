"use client";

import React, { useState } from "react";
import { 
  ArrowUpRight, 
  Award, 
  Briefcase, 
  Code2, 
  Copy, 
  ExternalLink, 
  FileText, 
  HeartHandshake, 
  Layers, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  Check 
} from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA, Project, Certification } from "@/data/portfolio";
import { ArchitectureInspector } from "@/components/console/ArchitectureInspector";
import { playUiClick } from "@/lib/audio";
import { useToast } from "@/components/ui/Toast";

export function BentoTheme() {
  const { personal, projects, certifications, experience, volunteering, skills } = PORTFOLIO_DATA;
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

  return (
    <div className="min-h-screen bg-[#0c0d12] text-[#f4f4f6] font-sans selection:bg-blue-600 selection:text-white pb-24">
      {/* Background Architectural Grid Accent */}
      <div 
        className="fixed inset-0 bg-[radial-gradient(#1e2233_1px,transparent_1px)] [background-size:28px_28px] opacity-35 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-6">
        
        {/* Top Header Bar */}
        <header className="flex items-center justify-between pb-6 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-black tracking-widest text-zinc-400 uppercase">
              REVWORKS<span className="text-blue-500">®</span> // STUDIO
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-xs font-mono text-zinc-400">Bento Edition</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Q2 Projects
            </span>
          </div>
        </header>

        {/* BENTO GRID: ROW 1 (Hero Profile Card + Quick Metrics) */}
        <section aria-label="Overview" className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Main Hero Card (8 Cols) */}
          <div className="lg:col-span-8 rounded-3xl border border-zinc-800/90 bg-[#131622]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between relative overflow-hidden group">
            {/* Subtle Gradient Glow inside card */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              {/* Interactive Viewfinder Avatar Frame */}
              <div
                className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-zinc-700/80 bg-zinc-900 flex-shrink-0 cursor-pointer shadow-xl transition-all duration-300 hover:border-blue-500 hover:scale-[1.02]"
                onMouseEnter={() => setIsHoveredAvatar(true)}
                onMouseLeave={() => setIsHoveredAvatar(false)}
                onClick={() => {
                  playUiClick(750);
                  setIsHoveredAvatar(!isHoveredAvatar);
                }}
              >
                <img
                  src={isHoveredAvatar ? personal.avatarHover : personal.avatar}
                  alt={personal.name}
                  className="w-full h-full object-cover object-top transition-all duration-300"
                />
                <div className="absolute bottom-1.5 left-1.5 bg-black/75 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-mono text-zinc-300 border border-white/10">
                  {isHoveredAvatar ? "⚡ POSE: ROCK" : "🎯 POSE: FOCUS"}
                </div>
              </div>

              {/* Bio & Intro */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    {personal.name}
                  </h1>
                  <span className="text-sm font-mono text-blue-400 font-bold">({personal.alias})</span>
                </div>

                <p className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed">
                  Head of Marketing, Fullstack Software Architect & Creative Technologist.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    Malang / Batu, East Java
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-400">5+ Yrs Production Experience</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Socials */}
            <div className="mt-6 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-600/20"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-white" />}
                  <span>{copiedEmail ? "Copied!" : "Copy Email"}</span>
                </button>

                <a
                  href={`mailto:${personal.email}`}
                  onClick={() => playUiClick(600)}
                  className="min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-700 bg-zinc-800/60 hover:bg-zinc-800 text-zinc-200 font-mono text-xs font-semibold transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Send Mail</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playUiClick(600)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-xl border border-zinc-700/80 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all duration-150 hover:scale-105"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personal.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playUiClick(600)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-xl border border-zinc-700/80 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-pink-400 transition-all duration-150 hover:scale-105"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playUiClick(600)}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 rounded-xl border border-zinc-700/80 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-blue-400 transition-all duration-150 hover:scale-105"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Metrics & Cert Badge Card (4 Cols) */}
          <div className="lg:col-span-4 rounded-3xl border border-zinc-800/90 bg-[#131622]/90 p-6 sm:p-7 backdrop-blur-xl shadow-2xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between font-mono text-xs text-zinc-400 mb-4 pb-2 border-b border-zinc-800/80">
                <span className="font-bold text-zinc-300">CORE SNAPSHOT</span>
                <span>// METRICS</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                  <span className="block text-2xl font-black text-white font-mono">5+</span>
                  <span className="text-[11px] text-zinc-400 font-medium">Years Shipping Code</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                  <span className="block text-2xl font-black text-blue-400 font-mono">4</span>
                  <span className="text-[11px] text-zinc-400 font-medium">Production Systems</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                  <span className="block text-2xl font-black text-emerald-400 font-mono">7</span>
                  <span className="text-[11px] text-zinc-400 font-medium">Verified Credentials</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800">
                  <span className="block text-2xl font-black text-purple-400 font-mono">3+</span>
                  <span className="text-[11px] text-zinc-400 font-medium">Yrs Volunteering</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-800/40">
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Verified Meta & Google Certified</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Meta Database Engineer (ID 7Z37S6CUNM2C) + Google Professional UX Designer.
              </p>
            </div>
          </div>
        </section>

        {/* BENTO GRID: ROW 2 (Selected Works Portfolio Section) */}
        <section aria-label="Selected Works" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-800/80">
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-400" />
                <span>Selected Works</span>
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                Production-grade applications and creative multimedia productions
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 p-1 rounded-xl border border-zinc-800 bg-zinc-900/90 text-xs font-mono">
              <button
                type="button"
                onClick={() => {
                  playUiClick(500);
                  setWorksFilter("all");
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  worksFilter === "all" ? "bg-zinc-100 text-zinc-950 font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                All Works ({projects.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  playUiClick(500);
                  setWorksFilter("engineering");
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  worksFilter === "engineering" ? "bg-blue-600 text-white font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                Engineering
              </button>
              <button
                type="button"
                onClick={() => {
                  playUiClick(500);
                  setWorksFilter("creative");
                }}
                className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  worksFilter === "creative" ? "bg-purple-600 text-white font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                Creative
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project: Project) => (
              <article
                key={project.id}
                className="group rounded-3xl border border-zinc-800/90 bg-[#131622]/90 p-6 flex flex-col justify-between backdrop-blur-xl shadow-xl transition-all duration-200 hover:-translate-y-1.5 hover:border-zinc-600 hover:shadow-2xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      project.category === "engineering" 
                        ? "border-blue-500/30 bg-blue-500/10 text-blue-400" 
                        : "border-purple-500/30 bg-purple-500/10 text-purple-400"
                    }`}>
                      {project.category}
                    </span>

                    {project.featured && (
                      <span className="text-[10px] font-mono text-amber-400 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Highlights Pill */}
                  <div className="space-y-1 pt-1">
                    {project.metrics.slice(0, 2).map((metric, i) => (
                      <div key={i} className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  {project.id === "topup-store" ? (
                    <button
                      type="button"
                      onClick={() => {
                        playUiClick(700);
                        setSelectedArchProject(project.id);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Inspect Spec</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-zinc-500">REVWORKS // ACTIVE</span>
                  )}

                  <div className="flex items-center gap-2">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playUiClick(700)}
                        className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playUiClick(700)}
                        className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* BENTO GRID: ROW 3 (Credentials + Experience Side by Side) */}
        <section aria-label="Credentials and Career" className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Credentials Card (6 Cols) */}
          <div className="lg:col-span-6 rounded-3xl border border-zinc-800/90 bg-[#131622]/90 p-6 sm:p-7 backdrop-blur-xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Credentials ({certifications.length})</span>
              </h2>
              <span className="text-xs font-mono text-zinc-400">All Verified</span>
            </div>

            <div className="space-y-3">
              {certifications.map((cert: Certification) => (
                <div
                  key={cert.id}
                  className="p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-zinc-700 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      <span className="text-white font-semibold">{cert.issuer}</span>
                      <span>·</span>
                      <span>{cert.issueDate}</span>
                    </div>
                    <h3 className="text-sm font-bold text-zinc-200">{cert.name}</h3>
                    {cert.credentialId && (
                      <span className="text-[10px] font-mono text-zinc-400 block pt-0.5">
                        ID: {cert.credentialId}
                      </span>
                    )}
                  </div>

                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playUiClick(600)}
                    className="inline-flex items-center gap-1 text-xs font-mono text-blue-400 hover:text-blue-300 font-semibold self-start sm:self-auto"
                  >
                    <span>Verify</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Experience & Volunteering Card (6 Cols) */}
          <div className="lg:col-span-6 rounded-3xl border border-zinc-800/90 bg-[#131622]/90 p-6 sm:p-7 backdrop-blur-xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span>Career & Volunteering</span>
              </h2>
              <span className="text-xs font-mono text-zinc-400">Track Record</span>
            </div>

            <div className="space-y-3">
              {/* Highlight Experience 1 */}
              {experience.slice(0, 2).map((exp, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800/90 space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-blue-400 font-bold">{exp.role}</span>
                    <span className="text-zinc-400">{exp.period}</span>
                  </div>
                  <div className="text-xs text-zinc-300 font-semibold">{exp.company} · {exp.location}</div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed pt-1">
                    {exp.highlights[0]}
                  </p>
                </div>
              ))}

              {/* Volunteering GKJW */}
              {volunteering && volunteering.length > 0 && (
                <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400 font-bold">{volunteering[0].role}</span>
                    <span className="text-zinc-400">{volunteering[0].period}</span>
                  </div>
                  <div className="text-xs text-zinc-200 font-semibold">{volunteering[0].organization}</div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed pt-1">
                    {volunteering[0].highlights[0]}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

      </div>

      {/* Architecture Inspector Modal for TopUp Store */}
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
