"use client";

import React, { useState, useEffect } from "react";
import { 
  Check, 
  Copy, 
  ExternalLink, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  Terminal, 
  Briefcase, 
  Cpu, 
  X, 
  Layers 
} from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA, Project, Certification } from "@/data/portfolio";
import { ArchitectureInspector } from "@/components/console/ArchitectureInspector";
import { playUiClick } from "@/lib/audio";
import { useToast } from "@/components/ui/Toast";

export type EditorialColorTheme = "gold" | "emerald" | "sapphire" | "rose" | "platinum";

interface ColorPalette {
  id: EditorialColorTheme;
  name: string;
  dotColor: string;
  accentText: string;
  accentBg: string;
  accentBorder: string;
  accentBadgeBg: string;
  accentHoverBorder: string;
  selectionClass: string;
}

const COLOR_PALETTES: Record<EditorialColorTheme, ColorPalette> = {
  gold: {
    id: "gold",
    name: "Champagne Brass",
    dotColor: "#d4af37",
    accentText: "text-[#d4af37]",
    accentBg: "bg-[#d4af37]",
    accentBorder: "border-[#d4af37]/40",
    accentBadgeBg: "bg-[#d4af37]/10",
    accentHoverBorder: "hover:border-[#d4af37]/80",
    selectionClass: "selection:bg-[#d4af37]/30",
  },
  emerald: {
    id: "emerald",
    name: "Emerald Velvet",
    dotColor: "#10b981",
    accentText: "text-emerald-400",
    accentBg: "bg-emerald-500",
    accentBorder: "border-emerald-500/40",
    accentBadgeBg: "bg-emerald-500/10",
    accentHoverBorder: "hover:border-emerald-400",
    selectionClass: "selection:bg-emerald-500/30",
  },
  sapphire: {
    id: "sapphire",
    name: "Sapphire Ice",
    dotColor: "#38bdf8",
    accentText: "text-sky-400",
    accentBg: "bg-sky-500",
    accentBorder: "border-sky-500/40",
    accentBadgeBg: "bg-sky-500/10",
    accentHoverBorder: "hover:border-sky-400",
    selectionClass: "selection:bg-sky-500/30",
  },
  rose: {
    id: "rose",
    name: "Rose Terracotta",
    dotColor: "#fb7185",
    accentText: "text-rose-400",
    accentBg: "bg-rose-500",
    accentBorder: "border-rose-500/40",
    accentBadgeBg: "bg-rose-500/10",
    accentHoverBorder: "hover:border-rose-400",
    selectionClass: "selection:bg-rose-500/30",
  },
  platinum: {
    id: "platinum",
    name: "Titanium Platinum",
    dotColor: "#f4f4f5",
    accentText: "text-zinc-100",
    accentBg: "bg-white",
    accentBorder: "border-white/40",
    accentBadgeBg: "bg-white/10",
    accentHoverBorder: "hover:border-white",
    selectionClass: "selection:bg-white/20",
  },
};

type ActiveModal = "credentials" | "career" | "stack" | null;

export function EditorialTheme() {
  const { personal, projects, certifications, experience, volunteering, skills, education } = PORTFOLIO_DATA;
  const [selectedArchProject, setSelectedArchProject] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [isHoveredAvatar, setIsHoveredAvatar] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"all" | "engineering" | "creative">("all");
  const [colorTheme, setColorTheme] = useState<EditorialColorTheme>("gold");
  const { showToast } = useToast();

  const palette = COLOR_PALETTES[colorTheme];

  useEffect(() => {
    const savedColor = localStorage.getItem("rev_editorial_color") as EditorialColorTheme | null;
    if (savedColor && COLOR_PALETTES[savedColor]) {
      setColorTheme(savedColor);
    }
  }, []);

  const handleColorChange = (themeKey: EditorialColorTheme) => {
    playUiClick(800);
    setColorTheme(themeKey);
    try {
      localStorage.setItem("rev_editorial_color", themeKey);
    } catch {
      // Ignore
    }
  };

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

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };
    if (activeModal) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModal]);

  return (
    <div className={`min-h-screen bg-[#09090b] text-[#fafafa] font-sans ${palette.selectionClass} selection:text-white pb-32`}>
      
      {/* Top Editorial Ribbon */}
      <header className="border-b border-zinc-800/80 bg-[#09090b]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Brand Identity: Cinzel Luxury Font */}
          <div className="flex items-center gap-3">
            <span className="font-cinzel tracking-[0.25em] text-sm sm:text-base font-black text-white">
              REVWORKS
            </span>
            <span className="text-zinc-600 font-serif">//</span>
            <span className="text-zinc-400 font-serif italic text-xs hidden sm:inline">
              The Editorial Archive
            </span>
          </div>

          {/* Color Switcher & Actions */}
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* 5-Color Theme Selector */}
            <div className="flex items-center gap-1.5 p-1 rounded-full border border-zinc-800 bg-zinc-900/60" title="Select Color Theme">
              {(Object.keys(COLOR_PALETTES) as EditorialColorTheme[]).map((themeKey) => {
                const item = COLOR_PALETTES[themeKey];
                const isSelected = colorTheme === themeKey;
                return (
                  <button
                    key={themeKey}
                    type="button"
                    onClick={() => handleColorChange(themeKey)}
                    className={`w-4 h-4 rounded-full transition-all duration-200 ${
                      isSelected ? "scale-125 ring-2 ring-white ring-offset-2 ring-offset-zinc-950" : "opacity-60 hover:opacity-100 hover:scale-110"
                    }`}
                    style={{ backgroundColor: item.dotColor }}
                    aria-label={`Switch to ${item.name} theme`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="text-xs font-mono text-zinc-300 hover:text-white border border-zinc-700/80 hover:border-zinc-500 rounded-full px-3.5 py-1.5 transition-colors flex items-center gap-1.5"
            >
              {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-400" />}
              <span className="hidden sm:inline">{copiedEmail ? "Copied" : "Copy Email"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Flow */}
      <main className="max-w-5xl mx-auto px-6 pt-14 sm:pt-20 space-y-20">
        
        {/* HERO & MANIFESTO */}
        <section aria-label="Prologue" className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Portrait */}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 pointer-events-none" />
            </div>

            <div className="space-y-3 font-mono text-xs text-zinc-400 border-l-2 border-zinc-800 pl-4">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Identity</span>
                <span className="text-zinc-200 font-bold">{personal.name} ({personal.alias})</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Roles</span>
                <span className="text-zinc-300">Head of Marketing · Fullstack Architect</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase">Base</span>
                <span className="text-zinc-300">{personal.location}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiClick(600)}
                className="p-2.5 rounded-xl border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personal.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiClick(600)}
                className="p-2.5 rounded-xl border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-pink-400 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playUiClick(600)}
                className="p-2.5 rounded-xl border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Editorial Headline & Actions */}
          <div className="md:col-span-8 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-[1.18] font-serif">
                Engineering high-throughput systems, creative software, and cinematic visual media.
              </h1>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-zinc-300 leading-relaxed font-light">
              <p>
                Operating under the <strong className="text-white font-semibold">REVWORKS</strong> imprint, I bridge technical rigor with creative direction. Over five years of shipping code spanning asynchronous financial webhook ledgers, real-time in-browser synthesizers, and live multi-camera broadcast direction.
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
                <span className={`text-2xl sm:text-3xl font-bold ${palette.accentText} block`}>7</span>
                <span className="text-zinc-500 uppercase text-[10px]">Verified Certs</span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-bold text-emerald-400 block">100%</span>
                <span className="text-zinc-500 uppercase text-[10px]">On-Time Delivery</span>
              </div>
            </div>

            {/* Direct Contact Button */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
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

            {/* MODAL ACTION BUTTONS (Credentials, Career, Stack) */}
            <div className="pt-4 border-t border-zinc-800/80">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block mb-3">
                // Explore Deep Dossiers:
              </span>
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => {
                    playUiClick(750);
                    setActiveModal("credentials");
                  }}
                  className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-full border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/90 text-zinc-200 ${palette.accentHoverBorder} transition-all duration-150 hover:scale-[1.02] shadow-sm`}
                >
                  <ShieldCheck className={`w-4 h-4 ${palette.accentText}`} />
                  <span>Verified Credentials ({certifications.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playUiClick(750);
                    setActiveModal("career");
                  }}
                  className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-full border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/90 text-zinc-200 ${palette.accentHoverBorder} transition-all duration-150 hover:scale-[1.02] shadow-sm`}
                >
                  <Briefcase className={`w-4 h-4 ${palette.accentText}`} />
                  <span>Career & Stewardship</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playUiClick(750);
                    setActiveModal("stack");
                  }}
                  className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-full border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/90 text-zinc-200 ${palette.accentHoverBorder} transition-all duration-150 hover:scale-[1.02] shadow-sm`}
                >
                  <Cpu className={`w-4 h-4 ${palette.accentText}`} />
                  <span>Technical Arsenal</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* SELECTED WORKS SECTION */}
        <section aria-label="Works Catalog" className="space-y-8 pt-10 border-t border-zinc-800/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl font-serif text-white">
                Selected Works & Systems
              </h2>
              <p className="text-xs font-mono text-zinc-500">
                Curated production deployments and commercial media direction
              </p>
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

          {/* Project Catalog List */}
          <div className="divide-y divide-zinc-800/80 border-y border-zinc-800/80">
            {filteredProjects.map((project: Project, idx) => (
              <article 
                key={project.id}
                className="py-8 group transition-colors duration-200 hover:bg-zinc-900/30 px-4 -mx-4 rounded-xl flex flex-col md:flex-row md:items-start justify-between gap-6"
              >
                <div className="space-y-3 md:w-3/5">
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className={`${palette.accentText} font-bold`}>0{idx + 1}</span>
                    <span className="text-zinc-600">//</span>
                    <span className="uppercase text-zinc-400 tracking-wider">{project.category}</span>
                    {project.featured && (
                      <span className={`text-[10px] ${palette.accentText} font-mono px-2 py-0.2 rounded-full border ${palette.accentBorder} ${palette.accentBadgeBg}`}>
                        Featured Case
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-serif text-white group-hover:text-zinc-200 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-zinc-300 leading-relaxed font-light">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="text-[11px] font-mono text-zinc-400 bg-zinc-900 px-2.5 py-0.5 rounded border border-zinc-800">
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
                        className={`inline-flex items-center gap-1.5 text-xs font-mono ${palette.accentText} hover:brightness-125 font-semibold border-b ${palette.accentBorder} pb-0.5 transition-all`}
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

      </main>

      {/* Colophon Footer */}
      <footer className="max-w-5xl mx-auto px-6 mt-32 pt-12 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
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
          <span>MALANG, EAST JAVA</span>
        </div>
      </footer>

      {/* ============================================================ */}
      {/* MODAL 1: VERIFIED CREDENTIALS */}
      {/* ============================================================ */}
      {activeModal === "credentials" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-zinc-700/80 bg-zinc-950 p-6 sm:p-8 shadow-2xl text-zinc-100 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className={`w-5 h-5 ${palette.accentText}`} />
                <h2 className="text-xl font-serif font-bold text-white">
                  Verified Pedigree & Certifications
                </h2>
              </div>
              <button
                type="button"
                onClick={() => { playUiClick(600); setActiveModal(null); }}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {certifications.map((cert: Certification) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-2xl border border-zinc-800/90 bg-zinc-900/50 space-y-2 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span className="text-white font-bold">{cert.issuer}</span>
                    <span>{cert.issueDate}</span>
                  </div>
                  <h3 className="text-base font-semibold text-zinc-100">{cert.name}</h3>
                  {cert.credentialId && (
                    <span className="text-xs font-mono text-zinc-400 block">
                      Credential ID: <code className="text-zinc-200 font-bold">{cert.credentialId}</code>
                    </span>
                  )}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/50">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-800 flex justify-end">
              <button
                type="button"
                onClick={() => { playUiClick(600); setActiveModal(null); }}
                className="px-5 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-bold text-white transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: CAREER & STEWARDSHIP */}
      {/* ============================================================ */}
      {activeModal === "career" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-zinc-700/80 bg-zinc-950 p-6 sm:p-8 shadow-2xl text-zinc-100 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Briefcase className={`w-5 h-5 ${palette.accentText}`} />
                <h2 className="text-xl font-serif font-bold text-white">
                  Professional Journey & Community Stewardship
                </h2>
              </div>
              <button
                type="button"
                onClick={() => { playUiClick(600); setActiveModal(null); }}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Experience */}
              <div className="space-y-4">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                  // Professional Positions
                </span>
                {experience.map((exp, idx) => (
                  <div key={idx} className="border-l-2 border-zinc-700 pl-4 space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                      <h3 className="text-base font-bold text-white">{exp.role} · <span className="text-zinc-300">{exp.company}</span></h3>
                      <span className="text-zinc-400">{exp.period}</span>
                    </div>
                    <div className="text-xs font-mono text-zinc-500">{exp.location} · {exp.type}</div>
                    <p className="text-sm text-zinc-300 font-light leading-relaxed pt-1">
                      {exp.highlights[0]}
                    </p>
                  </div>
                ))}
              </div>

              {/* Volunteering GKJW */}
              {volunteering && volunteering.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-zinc-800">
                  <span className={`text-[11px] font-mono ${palette.accentText} uppercase tracking-wider block font-bold`}>
                    // Community & Faith Stewardship
                  </span>
                  {volunteering.map((vol, idx) => (
                    <div key={idx} className="border-l-2 border-emerald-500/60 pl-4 space-y-1.5 bg-emerald-950/10 p-3.5 rounded-r-xl">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                        <h3 className="text-base font-bold text-emerald-400">{vol.role} · <span className="text-zinc-200">{vol.organization}</span></h3>
                        <span className="text-zinc-400">{vol.period}</span>
                      </div>
                      <div className="text-xs font-mono text-zinc-500">{vol.category}</div>
                      <p className="text-sm text-zinc-300 font-light leading-relaxed pt-1">
                        {vol.highlights[0]}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {education && education.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-zinc-800">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">
                    // Academic Foundation
                  </span>
                  {education.map((edu, idx) => (
                    <div key={idx} className="border-l-2 border-zinc-700 pl-4 space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                        <h3 className="text-base font-bold text-white">{edu.institution}</h3>
                        <span className="text-zinc-400">{edu.period}</span>
                      </div>
                      <p className="text-xs text-zinc-400 font-mono">
                        {edu.degree} · {edu.field}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-zinc-800 flex justify-end">
              <button
                type="button"
                onClick={() => { playUiClick(600); setActiveModal(null); }}
                className="px-5 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-bold text-white transition-colors"
              >
                Close Timeline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 3: TECHNICAL ARSENAL & MATRIX */}
      {/* ============================================================ */}
      {activeModal === "stack" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-zinc-700/80 bg-zinc-950 p-6 sm:p-8 shadow-2xl text-zinc-100 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Cpu className={`w-5 h-5 ${palette.accentText}`} />
                <h2 className="text-xl font-serif font-bold text-white">
                  Technical Arsenal & Architecture Matrix
                </h2>
              </div>
              <button
                type="button"
                onClick={() => { playUiClick(600); setActiveModal(null); }}
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 space-y-2">
                <h3 className={`text-xs font-mono font-bold uppercase tracking-wider ${palette.accentText}`}>
                  // Backend, APIs & Asynchronous Queues
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {skills.backend.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-800 border border-zinc-700/60 text-zinc-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 space-y-2">
                <h3 className={`text-xs font-mono font-bold uppercase tracking-wider ${palette.accentText}`}>
                  // Databases, Ledgers & Storage
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {skills.databases.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-800 border border-zinc-700/60 text-zinc-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 space-y-2">
                <h3 className={`text-xs font-mono font-bold uppercase tracking-wider ${palette.accentText}`}>
                  // Frontend, Canvas & Web Audio
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {skills.frontend.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-800 border border-zinc-700/60 text-zinc-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 space-y-2">
                <h3 className={`text-xs font-mono font-bold uppercase tracking-wider ${palette.accentText}`}>
                  // Creative Direction, UX & Media Production
                </h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {skills.creativeDesign.concat(skills.devOpsAndTools).map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-800 border border-zinc-700/60 text-zinc-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex justify-end">
              <button
                type="button"
                onClick={() => { playUiClick(600); setActiveModal(null); }}
                className="px-5 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-bold text-white transition-colors"
              >
                Close Arsenal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TopUp Store Architecture Inspector Modal */}
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
