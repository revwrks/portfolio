"use client";

import React, { useState } from "react";
import { 
  ArrowUpRight, 
  Check, 
  Copy, 
  ExternalLink, 
  FileText, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  HeartHandshake 
} from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA, Project, Certification } from "@/data/portfolio";
import { ArchitectureInspector } from "@/components/console/ArchitectureInspector";
import { playUiClick } from "@/lib/audio";
import { useToast } from "@/components/ui/Toast";

export function EditorialTheme() {
  const { personal, projects, certifications, experience, volunteering, skills } = PORTFOLIO_DATA;
  const [selectedArchProject, setSelectedArchProject] = useState<string | null>(null);
  const [isHoveredAvatar, setIsHoveredAvatar] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "engineering" | "creative">("all");
  const { showToast } = useToast();

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true;
    return p.category === activeFilter;
  });

  const handleCopyEmail = () => {
    playUiClick(950);
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    showToast("Email copied to clipboard: mahendrapujo@gmail.com 📋");
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans selection:bg-[#d4af37]/30 selection:text-white pb-32">
      
      {/* Top Editorial Ribbon */}
      <header className="border-b border-zinc-800/80 bg-[#09090b]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="text-zinc-100 font-bold tracking-widest uppercase">REVWORKS</span>
            <span className="text-zinc-600">//</span>
            <span className="text-zinc-400 hidden sm:inline">The Editorial Portfolio</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-zinc-400 font-mono hidden md:inline">
              MALANG / BATU, EAST JAVA
            </span>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="text-xs text-zinc-200 hover:text-white border border-zinc-700/80 hover:border-zinc-500 rounded-full px-3 py-1 transition-colors flex items-center gap-1.5"
            >
              {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-400" />}
              <span>{copiedEmail ? "Copied" : "Copy Email"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Flow */}
      <main className="max-w-5xl mx-auto px-6 pt-14 sm:pt-20 space-y-24">
        
        {/* CHAPTER 01 // PROLOGUE & MANIFESTO */}
        <section aria-label="Prologue" className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Portrait & Credentials Overview */}
          <div className="md:col-span-4 space-y-6">
            <div 
              className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl cursor-pointer group"
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
                className="w-full aspect-[4/5] object-cover object-top transition-all duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-300">
                <span>{isHoveredAvatar ? "Pose: Rock" : "Pose: Focus"}</span>
                <span className="text-[10px] text-zinc-400">Hover to toggle</span>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs text-zinc-400 border-l-2 border-zinc-800 pl-4">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Identity</span>
                <span className="text-zinc-200 font-bold">{personal.name}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Roles</span>
                <span className="text-zinc-300">Head of Marketing · Fullstack Architect</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Base</span>
                <span className="text-zinc-300">Malang / Batu, East Java, ID</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiClick(600)}
                className="p-2 rounded-lg border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personal.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiClick(600)}
                className="p-2 rounded-lg border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiClick(600)}
                className="p-2 rounded-lg border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Editorial Headline & Manifesto */}
          <div className="md:col-span-8 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-mono tracking-widest text-[#d4af37] uppercase font-bold">
                // CHAPTER 01 · MANIFESTO
              </span>
              <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-[1.15] font-serif">
                Engineering high-throughput systems, creative software, and cinematic visual media.
              </h1>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
              <p>
                Operating under the <strong className="text-white font-semibold">REVWORKS</strong> imprint, I bridge the gap between technical rigor and creative direction. Over the past five years, my work has spanned asynchronous financial webhook engines, real-time in-browser synthesizer studios, and multi-camera live concert productions.
              </p>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Currently serving as <span className="text-zinc-200 font-medium">Head of Marketing at Nusa Indah Tropika</span> while concurrently directing multimedia and streaming operations for <span className="text-zinc-200 font-medium">GKJW (Gereja Kristen Jawi Wetan)</span> since August 2023.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-zinc-800/80 font-mono text-xs">
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-white block">5+</span>
                <span className="text-zinc-500 uppercase text-[10px]">Years Active</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-white block">4</span>
                <span className="text-zinc-500 uppercase text-[10px]">Production Engines</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-white block">7</span>
                <span className="text-zinc-500 uppercase text-[10px]">Verified Certs</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-emerald-400 block">100%</span>
                <span className="text-zinc-500 uppercase text-[10px]">On-Time Delivery</span>
              </div>
            </div>

            {/* Direct Contact Button */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`mailto:${personal.email}`}
                onClick={() => playUiClick(700)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-950 font-mono text-xs font-bold hover:bg-zinc-200 transition-all duration-150 hover:scale-[1.02]"
              >
                <Mail className="w-4 h-4 text-zinc-950" />
                <span>Initiate Conversation</span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 hover:border-zinc-500 font-mono text-xs text-zinc-300 hover:text-white transition-all duration-150"
              >
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>{copiedEmail ? "Email Copied!" : "Copy Email"}</span>
              </button>
            </div>
          </div>
        </section>

        {/* CHAPTER 02 // SELECTED WORKS CATALOG */}
        <section aria-label="Works Catalog" className="space-y-8 pt-10 border-t border-zinc-800/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono tracking-widest text-[#d4af37] uppercase font-bold">
                // CHAPTER 02 · WORKS CATALOG
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white">
                Selected Works & Systems
              </h2>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1 border border-zinc-800 p-1 rounded-full text-xs font-mono bg-zinc-900/60">
              <button
                type="button"
                onClick={() => {
                  playUiClick(500);
                  setActiveFilter("all");
                }}
                className={`px-4 py-1.5 rounded-full transition-colors ${
                  activeFilter === "all" ? "bg-white text-zinc-950 font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                All ({projects.length})
              </button>
              <button
                type="button"
                onClick={() => {
                  playUiClick(500);
                  setActiveFilter("engineering");
                }}
                className={`px-4 py-1.5 rounded-full transition-colors ${
                  activeFilter === "engineering" ? "bg-white text-zinc-950 font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                Engineering
              </button>
              <button
                type="button"
                onClick={() => {
                  playUiClick(500);
                  setActiveFilter("creative");
                }}
                className={`px-4 py-1.5 rounded-full transition-colors ${
                  activeFilter === "creative" ? "bg-white text-zinc-950 font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                Creative
              </button>
            </div>
          </div>

          {/* Editorial Project Rows */}
          <div className="divide-y divide-zinc-800/80 border-y border-zinc-800/80">
            {filteredProjects.map((project: Project, idx) => (
              <article 
                key={project.id}
                className="py-8 group transition-colors duration-200 hover:bg-zinc-900/30 px-4 -mx-4 rounded-xl flex flex-col md:flex-row md:items-start justify-between gap-6"
              >
                <div className="space-y-3 md:w-3/5">
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-[#d4af37] font-bold">0{idx + 1}</span>
                    <span className="text-zinc-600">//</span>
                    <span className="uppercase text-zinc-400 tracking-wider">{project.category}</span>
                    {project.featured && (
                      <span className="text-[10px] text-amber-400 font-mono px-2 py-0.2 rounded-full border border-amber-400/30 bg-amber-400/10">
                        Featured Case
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-serif text-white group-hover:text-amber-200 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-zinc-300 leading-relaxed font-light">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="text-[11px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:w-2/5 md:text-right space-y-4 flex flex-col md:items-end justify-between self-stretch">
                  <div className="space-y-1 text-xs font-mono text-zinc-400">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="text-zinc-300">
                        {m}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-4">
                    {project.id === "topup-store" && (
                      <button
                        type="button"
                        onClick={() => {
                          playUiClick(750);
                          setSelectedArchProject(project.id);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#d4af37] hover:text-amber-300 font-semibold border-b border-[#d4af37]/40 pb-0.5"
                      >
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Inspect Spec</span>
                      </button>
                    )}

                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playUiClick(600)}
                        className="inline-flex items-center gap-1 text-xs font-mono text-zinc-300 hover:text-white border border-zinc-700 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playUiClick(600)}
                        className="inline-flex items-center gap-1 text-xs font-mono text-zinc-300 hover:text-white border border-zinc-700 px-3 py-1.5 rounded-lg transition-colors"
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
        </section>

        {/* CHAPTER 03 // VERIFIED CREDENTIALS */}
        <section aria-label="Credentials" className="space-y-8 pt-10 border-t border-zinc-800/80">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-[#d4af37] uppercase font-bold">
              // CHAPTER 03 · PEDIGREE & PROOF
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white">
              Official Certifications & Verification
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert: Certification) => (
              <div 
                key={cert.id}
                className="p-5 rounded-2xl border border-zinc-800/90 bg-zinc-900/40 hover:border-zinc-700 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span className="text-white font-bold">{cert.issuer}</span>
                  <span>{cert.issueDate}</span>
                </div>
                <h3 className="text-base font-semibold text-zinc-200">{cert.name}</h3>
                {cert.credentialId && (
                  <span className="text-[11px] font-mono text-zinc-400 block">
                    ID: {cert.credentialId}
                  </span>
                )}
                <div className="pt-2">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playUiClick(600)}
                    className="inline-flex items-center gap-1 text-xs font-mono text-[#d4af37] hover:text-amber-200"
                  >
                    <span>View Official Credential</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CHAPTER 04 // LEADERSHIP & VOLUNTEERING */}
        <section aria-label="Career & Volunteering" className="space-y-8 pt-10 border-t border-zinc-800/80">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest text-[#d4af37] uppercase font-bold">
              // CHAPTER 04 · CAREER & COMMUNITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white">
              Professional Journey & Stewardship
            </h2>
          </div>

          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div key={idx} className="border-l-2 border-zinc-800 pl-6 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                  <h3 className="text-base font-bold text-white">{exp.role} · <span className="text-zinc-400">{exp.company}</span></h3>
                  <span className="text-zinc-400">{exp.period}</span>
                </div>
                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  {exp.highlights[0]}
                </p>
              </div>
            ))}

            {volunteering && volunteering.map((vol, idx) => (
              <div key={idx} className="border-l-2 border-emerald-500/50 pl-6 space-y-2 bg-emerald-950/10 p-4 rounded-r-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                  <h3 className="text-base font-bold text-emerald-400">{vol.role} · <span className="text-zinc-300">{vol.organization}</span></h3>
                  <span className="text-zinc-400">{vol.period}</span>
                </div>
                <p className="text-sm text-zinc-300 font-light leading-relaxed">
                  {vol.highlights[0]}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Colophon Footer */}
      <footer className="max-w-5xl mx-auto px-6 mt-32 pt-12 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400">
        <div>
          REVWORKS // DESIGNED & CRAFTED BY REV · 2026
        </div>
        <div className="flex items-center gap-4">
          <button 
            type="button" 
            onClick={handleCopyEmail}
            className="hover:text-white transition-colors"
          >
            {personal.email}
          </button>
          <span>·</span>
          <span>MALANG, INDONESIA</span>
        </div>
      </footer>

      {/* Spec Modal */}
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
