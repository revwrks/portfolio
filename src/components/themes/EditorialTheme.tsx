"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  ArrowUpRight,
  Briefcase,
  Check,
  Copy,
  Cpu,
  ExternalLink,
  Layers,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Terminal,
  X,
  Code2,
  Database,
  Film,
  Send,
  MessageSquare,
} from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA, Project, Certification } from "@/data/portfolio";
import { ArchitectureInspector } from "@/components/console/ArchitectureInspector";
import { GoldenParticleCanvas } from "@/components/effects/GoldenParticleCanvas";
import { FluidCursorSpotlight } from "@/components/effects/FluidCursorSpotlight";
import { BackgroundAudioPlayer } from "@/components/audio/BackgroundAudioPlayer";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";
import { CipherScrambleText } from "@/components/effects/CipherScrambleText";
import { CardProjectsMarquee } from "@/components/cards/CardProjectsMarquee";
import { CardChatBubbles } from "@/components/cards/CardChatBubbles";
import { CardCredentialsBadges } from "@/components/cards/CardCredentialsBadges";
import { CardAudioWaveform } from "@/components/cards/CardAudioWaveform";
import { CardTerminalStream } from "@/components/cards/CardTerminalStream";
import { playUiClick } from "@/lib/audio";
import { useToast } from "@/components/ui/Toast";

type ActiveModal =
  | "works"
  | "credentials"
  | "career"
  | "stack"
  | "contact"
  | null;

// Animation Variants (inspired by Yoza's blur-to-focus stagger choreography)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const subContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.02,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface TiltCardProps {
  onClick: () => void;
  icon?: React.ElementType;
  title: string;
  description: string;
  actionText: string;
  visualSlot?: React.ReactNode;
  className?: string;
}

function EditorialTiltCard({
  onClick,
  icon: Icon,
  title,
  description,
  actionText,
  visualSlot,
  className = "",
}: TiltCardProps) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
  );
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale3d(1.015, 1.015, 1.015)`,
    );
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)",
    );
    setIsHovered(false);
  };

  return (
    <motion.button
      variants={itemVariants}
      ref={cardRef}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: isHovered
          ? "transform 0.08s ease-out"
          : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`group relative text-left p-6 sm:p-8 rounded-3xl border border-[#2e2921] bg-[#161411]/90 hover:border-[#d4af37]/80 hover:shadow-2xl hover:shadow-[#d4af37]/15 flex flex-col justify-between space-y-6 cursor-pointer overflow-hidden backdrop-blur-xl ${className}`}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(212, 175, 55, 0.22) 0%, transparent 65%)`,
        }}
      />

      {/* Shimmer Light Reflection Sweep on Hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden rounded-3xl">
        <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 group-hover:translate-x-[300%] transition-transform duration-1000" />
      </div>

      {/* Top Visual Animation Slot (Projects Marquee, Chat Bubbles, Badges, Waveform, Terminal) */}
      {visualSlot && (
        <div className="relative z-10 w-full mb-1">{visualSlot}</div>
      )}

      {/* Clean Minimal Title & Description */}
      <div className="relative z-10 space-y-2">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <Icon className="w-5 h-5 text-[#d4af37] flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
          )}
          <h3 className="text-2xl font-serif font-bold text-[#f7f4ec] group-hover:text-[#e8cb74] transition-colors duration-200">
            {title}
          </h3>
        </div>
        <p className="text-sm text-[#aba392] font-light leading-relaxed group-hover:text-[#c4beb1] transition-colors duration-200">
          {description}
        </p>
      </div>

      {/* Bottom Action Bar inside Card */}
      <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#d4af37] font-bold pt-3 border-t border-[#2e2921]/90 group-hover:border-[#d4af37]/40 transition-colors">
        <span className="group-hover:tracking-wider transition-all duration-200">
          {actionText}
        </span>
        <div className="w-8 h-8 rounded-full bg-[#d4af37]/10 flex items-center justify-center group-hover:bg-[#d4af37] group-hover:text-zinc-950 transition-all duration-200 shadow-sm">
          <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.button>
  );
}

export function EditorialTheme() {
  const {
    personal,
    projects,
    certifications,
    experience,
    volunteering,
    skills,
    education,
  } = PORTFOLIO_DATA;
  const [selectedArchProject, setSelectedArchProject] = useState<string | null>(
    null,
  );
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [isHoveredAvatar, setIsHoveredAvatar] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [worksFilter, setWorksFilter] = useState<
    "all" | "engineering" | "creative"
  >("all");
  const { showToast } = useToast();

  const filteredProjects = projects.filter((p) => {
    if (worksFilter === "all") return true;
    return p.category === worksFilter;
  });

  const handleCopyEmail = () => {
    playUiClick(950);
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    showToast(`Email copied to clipboard: ${personal.email} 📋`);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
        setSelectedArchProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const marqueeItems = [
    "Laravel & PHP",
    "MySQL ACID Ledgers",
    "Asynchronous Webhooks",
    "React 19 & Next.js",
    "TypeScript",
    "HTML5 Canvas Studio",
    "Web Audio API",
    "Google Professional UX",
    "Multi-Cam Live Broadcast",
    "Video Direction",
    "Docker & Linux",
    "Idempotent Transaction Systems",
  ];

  return (
    <div className="relative min-h-screen bg-[#0d0c0a] text-[#f7f4ec] font-sans selection:bg-[#d4af37]/35 selection:text-white pb-32 overflow-x-hidden">
      {/* 1. Subtle SVG Fractal Noise Film Grain Texture (Inspired by Yoza) */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
        aria-hidden="true"
      />

      {/* 2. Golden Embers Particle Canvas in Background */}
      <GoldenParticleCanvas />

      {/* 3. Fluid Ambient Cursor Spotlight Ring */}
      <FluidCursorSpotlight />

      {/* 4. Luxury Floating Background Audio Player */}
      <BackgroundAudioPlayer />

      {/* Background Page Content Wrapper with Spatial Depth Scale on Modal Open */}
      <div
        style={{
          transform: activeModal
            ? "scale(0.975) translateY(-6px)"
            : "scale(1) translateY(0px)",
          filter: activeModal ? "blur(4px)" : "blur(0px)",
          opacity: activeModal ? 0.5 : 1,
          transition:
            "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
          transformOrigin: "center top",
        }}
        className="w-full will-change-transform"
      >
        {/* Top Editorial Ribbon with Blur-To-Focus Stagger */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={subContainerVariants}
          className="border-b border-[#2e2921]/90 bg-[#0d0c0a]/90 backdrop-blur-md sticky top-0 z-30"
        >
          <div className="max-w-5xl mx-auto px-6 h-18 flex items-center justify-between">
            {/* Brand Identity: Cinzel Luxury Display */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <span className="font-cinzel tracking-[0.25em] text-base sm:text-lg font-black text-white">
                REVWORKS
              </span>
              <span className="text-[#544837] font-serif">//</span>
              <span className="text-[#aba392] font-serif italic text-xs hidden sm:inline">
                Rev
              </span>
            </motion.div>

            {/* Quick Contact Actions */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-xs font-mono text-[#f7f4ec] hover:text-[#d4af37] border border-[#2e2921] hover:border-[#d4af37]/60 bg-[#161411]/80 rounded-full px-4 py-2 transition-all duration-150 flex items-center gap-1.5 cursor-pointer"
              >
                {copiedEmail ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                )}
                <span>{copiedEmail ? "Copied!" : "Copy Email"}</span>
              </button>

              <a
                href={`mailto:${personal.email}`}
                onClick={() => playUiClick(600)}
                className="text-xs font-mono font-bold text-zinc-950 bg-[#d4af37] hover:bg-[#e8cb74] rounded-full px-4 py-2 transition-all duration-150 hover:scale-[1.02] shadow-md shadow-[#d4af37]/10"
              >
                Connect
              </a>
            </motion.div>
          </div>
        </motion.header>

        {/* Main Content Flow with Staggered Blur-To-Focus Reveal */}
        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto px-6 pt-12 sm:pt-18 space-y-16 relative z-10"
        >
          {/* HERO SECTION: PORTRAIT & MANIFESTO */}
          <section
            aria-label="Prologue"
            className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start"
          >
            {/* Left Column: Pure Portrait & Dossier Stats */}
            <motion.div
              variants={subContainerVariants}
              className="md:col-span-4 space-y-6"
            >
              {/* Pure Pristine Portrait Frame with Smooth Dissolve & Ambient Hover Glow */}
              <motion.div variants={itemVariants}>
                <div
                  className="relative rounded-3xl overflow-hidden border border-[#2e2921] bg-[#161411] shadow-2xl cursor-pointer group transition-all duration-500 hover:border-[#d4af37]/80 hover:shadow-2xl hover:shadow-[#d4af37]/15 aspect-[4/5] w-full"
                  onMouseEnter={() => setIsHoveredAvatar(true)}
                  onMouseLeave={() => setIsHoveredAvatar(false)}
                  onClick={() => {
                    playUiClick(750);
                    setIsHoveredAvatar(!isHoveredAvatar);
                  }}
                >
                  {/* Primary Focused Director Portrait (rev3.JPG) */}
                  <img
                    src={personal.avatar}
                    alt={`${personal.name} - Director`}
                    className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 ${
                      isHoveredAvatar ? "opacity-0" : "opacity-100"
                    }`}
                  />

                  {/* Alternate Playful Winking Portrait (rev2.JPG) */}
                  <img
                    src={personal.avatarHover}
                    alt={`${personal.name} - Alternate Pose`}
                    className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 ${
                      isHoveredAvatar ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  {/* Luxury Film Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 pointer-events-none" />

                  {/* Shimmer Border Accent on Hover */}
                  <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-[#d4af37]/40 pointer-events-none transition-colors duration-500" />
                </div>
              </motion.div>

              {/* Quick Metadata Box */}
              <motion.div
                variants={itemVariants}
                className="space-y-3 font-mono text-xs text-[#aba392] border-l-2 border-[#2e2921] pl-4"
              >
                <div>
                  <span className="text-[#7a7265] block text-[10px] uppercase">
                    Identity
                  </span>
                  <span className="text-[#f7f4ec] font-bold">
                    {personal.name} ({personal.alias})
                  </span>
                </div>
                <div>
                  <span className="text-[#7a7265] block text-[10px] uppercase">
                    Roles
                  </span>
                  <span className="text-[#f7f4ec]">
                    Head of Marketing · Fullstack Architect
                  </span>
                </div>
                <div>
                  <span className="text-[#7a7265] block text-[10px] uppercase">
                    Base
                  </span>
                  <span className="text-[#f7f4ec]">{personal.location}</span>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 pt-1"
              >
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playUiClick(600)}
                  className="p-2.5 rounded-xl border border-[#2e2921] bg-[#161411]/60 hover:border-[#d4af37]/60 text-[#aba392] hover:text-white transition-all hover:scale-105"
                  aria-label="GitHub @revwrks"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={personal.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playUiClick(600)}
                  className="p-2.5 rounded-xl border border-[#2e2921] bg-[#161411]/60 hover:border-[#d4af37]/60 text-[#aba392] hover:text-pink-400 transition-all hover:scale-105"
                  aria-label="Instagram @itzrevv"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playUiClick(600)}
                  className="p-2.5 rounded-xl border border-[#2e2921] bg-[#161411]/60 hover:border-[#d4af37]/60 text-[#aba392] hover:text-blue-400 transition-all hover:scale-105"
                  aria-label="LinkedIn profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>

            {/* Right Column: Grand Manifesto & Core Metrics */}
            <motion.div
              variants={subContainerVariants}
              className="md:col-span-8 space-y-8"
            >
              <motion.div variants={itemVariants} className="space-y-4">
                <span className="text-[11px] font-mono tracking-widest text-[#d4af37] uppercase font-bold">
                  <CipherScrambleText text="// ARCHIVAL DOSSIER" />
                </span>
                <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-[#f7f4ec] leading-[1.18] font-serif">
                  Engineering high-throughput systems, creative software, and
                  cinematic visual media.
                </h1>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="space-y-4 text-base sm:text-lg text-[#aba392] leading-relaxed font-light"
              >
                <p>
                  Operating under the{" "}
                  <strong className="text-[#f7f4ec] font-semibold">
                    REVWORKS
                  </strong>{" "}
                  imprint, I bridge technical rigor with creative direction.
                  Over five years of shipping code spanning asynchronous
                  financial webhook ledgers, real-time in-browser synthesizers,
                  and live multi-camera broadcast direction.
                </p>
                <p className="text-sm sm:text-base text-[#7a7265] leading-relaxed">
                  Currently serving as{" "}
                  <span className="text-[#f7f4ec] font-medium">
                    Head of Marketing at Nusa Indah Tropika
                  </span>{" "}
                  while concurrently directing multimedia and streaming
                  operations for{" "}
                  <span className="text-[#f7f4ec] font-medium">GKJW</span> since
                  August 2023.
                </p>
              </motion.div>

              {/* Quick Metrics Bar with Animated Smooth Counter */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[#2e2921] font-mono text-xs"
              >
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-[#f7f4ec] block">
                    <AnimatedCounter value={5} suffix="+" />
                  </span>
                  <span className="text-[#7a7265] uppercase text-[10px]">
                    Years Active
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-[#f7f4ec] block">
                    <AnimatedCounter value={4} />
                  </span>
                  <span className="text-[#7a7265] uppercase text-[10px]">
                    Production Engines
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-[#d4af37] block">
                    <AnimatedCounter value={7} />
                  </span>
                  <span className="text-[#7a7265] uppercase text-[10px]">
                    Verified Certs
                  </span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-emerald-400 block">
                    <AnimatedCounter value={100} suffix="%" />
                  </span>
                  <span className="text-[#7a7265] uppercase text-[10px]">
                    On-Time Delivery
                  </span>
                </div>
              </motion.div>

              {/* Direct Contact Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap items-center gap-4 pt-1"
              >
                <a
                  href={`mailto:${personal.email}`}
                  onClick={() => playUiClick(700)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#d4af37] text-zinc-950 font-mono text-xs font-bold hover:bg-[#e8cb74] transition-all duration-150 hover:scale-[1.02] shadow-lg shadow-[#d4af37]/15"
                >
                  <Mail className="w-4 h-4 text-zinc-950" />
                  <span>Initiate Conversation</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#2e2921] hover:border-[#d4af37]/60 bg-[#161411]/80 font-mono text-xs text-[#f7f4ec] transition-all duration-150 hover:scale-[1.02]"
                >
                  <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{copiedEmail ? "Email Copied!" : "Copy Email"}</span>
                </button>
              </motion.div>
            </motion.div>
          </section>

          {/* GRAND 2x2+1 FEATURE BENTO (3D TILT WITH BESPOKE INTERNAL ANIMATIONS) */}
          <motion.section
            variants={subContainerVariants}
            aria-label="Dossiers Navigation"
            className="pt-6 border-t border-[#2e2921]"
          >
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between pb-6"
            >
              <div>
                <span className="text-xs font-mono tracking-widest text-[#d4af37] uppercase font-bold block mb-1">
                  <CipherScrambleText text="// ARCHIVAL VAULT" />
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#f7f4ec]">
                  Explore Deep Dossiers & Case Studies
                </h2>
              </div>
            </motion.div>

            <motion.div
              variants={subContainerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* TILE 1: SELECTED WORKS & SYSTEMS (PROJECTS APP MARQUEE) */}
              <EditorialTiltCard
                onClick={() => {
                  playUiClick(800);
                  setActiveModal("works");
                }}
                visualSlot={<CardProjectsMarquee />}
                icon={Layers}
                title="Selected Works & Systems"
                description="Production fintech transaction ledgers, digital key vaults, in-browser synthesizers & concert media."
                actionText="Open Portfolio Index"
              />

              {/* TILE 2: DIRECT INQUIRY & CONTACT (CHAT BUBBLE ANIMATION) */}
              <EditorialTiltCard
                onClick={() => {
                  playUiClick(800);
                  setActiveModal("contact");
                }}
                visualSlot={<CardChatBubbles />}
                icon={Send}
                title="Contact & Collaboration"
                description="Direct line for architectural contracts, technical advising, and multimedia creative direction."
                actionText="Initiate Transmission"
              />

              {/* TILE 3: VERIFIED CREDENTIALS (FLOATING BADGES) */}
              <EditorialTiltCard
                onClick={() => {
                  playUiClick(800);
                  setActiveModal("credentials");
                }}
                visualSlot={<CardCredentialsBadges />}
                icon={ShieldCheck}
                title="Verified Pedigree & Proof"
                description="Meta Database Engineer, Google Professional UX Design, IBM Python AI & HackerRank verified badges."
                actionText="View Verified Badges"
              />

              {/* TILE 4: CAREER & STEWARDSHIP (LIVE BROADCAST WAVEFORM) */}
              <EditorialTiltCard
                onClick={() => {
                  playUiClick(800);
                  setActiveModal("career");
                }}
                visualSlot={<CardAudioWaveform />}
                icon={Briefcase}
                title="Career & Stewardship"
                description="Head of Marketing at Nusa Indah Tropika & 3+ years directing multimedia operations at GKJW."
                actionText="Examine Track Record"
              />

              {/* TILE 5: TECHNICAL ARSENAL (TERMINAL STREAM, FULL WIDTH) */}
              <EditorialTiltCard
                className="md:col-span-2"
                onClick={() => {
                  playUiClick(800);
                  setActiveModal("stack");
                }}
                visualSlot={<CardTerminalStream />}
                icon={Cpu}
                title="Technical Arsenal"
                description="Backend idempotency, MySQL ACID ledgers, React 19, Tailwind, HTML5 Canvas & Web Audio API."
                actionText="Inspect Architecture Matrix"
              />
            </motion.div>
          </motion.section>

          {/* INFINITE TECH MARQUEE TAPE (SLICK RUNNING MARQUEE) */}
          <motion.section
            variants={itemVariants}
            aria-label="Core Competencies Ticker"
            className="pt-2"
          >
            <div className="rounded-2xl border border-[#2e2921] bg-[#161411]/60 py-3.5 px-4 overflow-hidden relative backdrop-blur-md">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0d0c0a] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0d0c0a] to-transparent z-10 pointer-events-none" />

              <div className="animate-marquee items-center gap-8 font-mono text-xs text-[#aba392]">
                {marqueeItems.concat(marqueeItems).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 whitespace-nowrap hover:text-[#d4af37] transition-colors cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/60" />
                    <span className="font-semibold tracking-wide">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        </motion.main>

        {/* Colophon Footer with Staggered Reveal */}
        <motion.footer
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={subContainerVariants}
          className="max-w-5xl mx-auto px-6 mt-32 pt-12 border-t border-[#2e2921] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#7a7265] relative z-10"
        >
          <motion.div variants={itemVariants}>
            REVWORKS // DESIGNED & CRAFTED BY REV · 2026
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            <button
              type="button"
              onClick={handleCopyEmail}
              className="hover:text-white transition-colors"
            >
              {personal.email}
            </button>
            <span>·</span>
            <span>MALANG, EAST JAVA</span>
          </motion.div>
        </motion.footer>
      </div>

      {/* ============================================================ */}
      {/* MODAL 1: SELECTED WORKS & SYSTEMS */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeModal === "works" && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#2e2921] bg-[#12100d] p-6 sm:p-8 shadow-2xl text-[#f7f4ec] space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2e2921]">
                <div className="flex items-center gap-3">
                  <Layers className="w-6 h-6 text-[#d4af37]" />
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-white">
                      Selected Works & Digital Systems
                    </h2>
                    <p className="text-xs font-mono text-[#aba392]">
                      Production applications and creative multimedia showcase
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Filter Pills */}
                  <div className="flex items-center gap-1 border border-[#2e2921] p-1 rounded-full text-xs font-mono bg-[#161411]">
                    <button
                      type="button"
                      onClick={() => {
                        playUiClick(500);
                        setWorksFilter("all");
                      }}
                      className={`px-3 py-1 rounded-full transition-colors ${
                        worksFilter === "all"
                          ? "bg-[#d4af37] text-zinc-950 font-bold"
                          : "text-[#aba392] hover:text-white"
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
                      className={`px-3 py-1 rounded-full transition-colors ${
                        worksFilter === "engineering"
                          ? "bg-[#d4af37] text-zinc-950 font-bold"
                          : "text-[#aba392] hover:text-white"
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
                      className={`px-3 py-1 rounded-full transition-colors ${
                        worksFilter === "creative"
                          ? "bg-[#d4af37] text-zinc-950 font-bold"
                          : "text-[#aba392] hover:text-white"
                      }`}
                    >
                      Creative
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      playUiClick(600);
                      setActiveModal(null);
                    }}
                    className="p-2 rounded-xl text-[#aba392] hover:text-white hover:bg-[#1f1b15] transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Works List */}
              <div className="divide-y divide-[#2e2921]">
                {filteredProjects.map((project: Project, idx) => (
                  <article
                    key={project.id}
                    className="py-6 flex flex-col md:flex-row md:items-start justify-between gap-6 group hover:bg-[#171410] px-4 -mx-4 rounded-2xl transition-colors"
                  >
                    <div className="space-y-2 md:w-3/5">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-[#d4af37] font-bold">
                          0{idx + 1}
                        </span>
                        <span className="text-[#7a7265]">//</span>
                        <span className="uppercase text-[#aba392]">
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="text-[10px] text-[#d4af37] px-2 py-0.2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 flex items-center gap-1 font-semibold">
                            <Sparkles className="w-3 h-3 text-[#d4af37]" />
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#e8cb74] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#aba392] leading-relaxed font-light">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono text-[#aba392] bg-[#161411] px-2.5 py-0.5 rounded border border-[#2e2921] hover:border-[#d4af37]/40 hover:text-white transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="md:w-2/5 md:text-right space-y-3 flex flex-col md:items-end justify-between self-stretch">
                      <div className="space-y-1 text-xs font-mono text-[#aba392]">
                        {project.metrics.map((m, i) => (
                          <div
                            key={i}
                            className="text-[#f7f4ec] flex items-center md:justify-end gap-1.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                            <span>{m}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        {project.id === "topup-store" && (
                          <button
                            type="button"
                            onClick={() => {
                              playUiClick(750);
                              setSelectedArchProject(project.id);
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#d4af37] hover:text-[#e8cb74] font-semibold border-b border-[#d4af37]/40 pb-0.5 transition-colors"
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
                            className="inline-flex items-center gap-1 text-xs font-mono text-[#aba392] hover:text-white border border-[#2e2921] hover:border-[#d4af37]/50 px-3 py-1.5 rounded-lg transition-colors bg-[#161411]"
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
                            className="inline-flex items-center gap-1 text-xs font-mono text-[#aba392] hover:text-white border border-[#2e2921] hover:border-[#d4af37]/50 px-3 py-1.5 rounded-lg transition-colors bg-[#161411]"
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

              <div className="pt-4 border-t border-[#2e2921] flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    playUiClick(600);
                    setActiveModal(null);
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#1e1b16] hover:bg-[#2e2921] text-xs font-mono font-bold text-white transition-colors"
                >
                  Close Works Index
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* MODAL 2: VERIFIED CREDENTIALS */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeModal === "credentials" && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-[#2e2921] bg-[#12100d] p-6 sm:p-8 shadow-2xl text-[#f7f4ec] space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#2e2921]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
                  <h2 className="text-xl font-serif font-bold text-white">
                    Verified Pedigree & Official Credentials
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playUiClick(600);
                    setActiveModal(null);
                  }}
                  className="p-2 rounded-xl text-[#aba392] hover:text-white hover:bg-[#1f1b15] transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {certifications.map((cert: Certification) => (
                  <div
                    key={cert.id}
                    className="p-4 rounded-2xl border border-[#2e2921] bg-[#161411]/80 space-y-2 hover:border-[#d4af37]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#aba392]">
                      <span className="text-white font-bold">
                        {cert.issuer}
                      </span>
                      <span>{cert.issueDate}</span>
                    </div>
                    <h3 className="text-base font-semibold text-[#f7f4ec]">
                      {cert.name}
                    </h3>
                    {cert.credentialId && (
                      <span className="text-xs font-mono text-[#aba392] block">
                        Credential ID:{" "}
                        <code className="text-[#d4af37] font-bold">
                          {cert.credentialId}
                        </code>
                      </span>
                    )}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e1b16] text-[#aba392] border border-[#2e2921]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#2e2921] flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    playUiClick(600);
                    setActiveModal(null);
                  }}
                  className="px-5 py-2 rounded-full bg-[#1e1b16] hover:bg-[#2e2921] text-xs font-mono font-bold text-white transition-colors"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* MODAL 3: CAREER & STEWARDSHIP */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeModal === "career" && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-[#2e2921] bg-[#12100d] p-6 sm:p-8 shadow-2xl text-[#f7f4ec] space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#2e2921]">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#d4af37]" />
                  <h2 className="text-xl font-serif font-bold text-white">
                    Professional Journey & Community Stewardship
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playUiClick(600);
                    setActiveModal(null);
                  }}
                  className="p-2 rounded-xl text-[#aba392] hover:text-white hover:bg-[#1f1b15] transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Experience */}
                <div className="space-y-4">
                  <span className="text-[11px] font-mono text-[#d4af37] uppercase tracking-wider block font-bold">
                    // Professional Positions
                  </span>
                  {experience.map((exp, idx) => (
                    <div
                      key={idx}
                      className="border-l-2 border-[#2e2921] pl-4 space-y-1.5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                        <h3 className="text-base font-bold text-white">
                          {exp.role} ·{" "}
                          <span className="text-[#d4af37]">{exp.company}</span>
                        </h3>
                        <span className="text-[#aba392]">{exp.period}</span>
                      </div>
                      <div className="text-xs font-mono text-[#7a7265]">
                        {exp.location} · {exp.type}
                      </div>
                      <p className="text-sm text-[#aba392] font-light leading-relaxed pt-1">
                        {exp.highlights[0]}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Volunteering GKJW */}
                {volunteering && volunteering.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-[#2e2921]">
                    <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">
                      // Community & Faith Stewardship
                    </span>
                    {volunteering.map((vol, idx) => (
                      <div
                        key={idx}
                        className="border-l-2 border-emerald-500/60 pl-4 space-y-1.5 bg-emerald-950/15 p-3.5 rounded-r-xl"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                          <h3 className="text-base font-bold text-emerald-400">
                            {vol.role} ·{" "}
                            <span className="text-[#f7f4ec]">
                              {vol.organization}
                            </span>
                          </h3>
                          <span className="text-[#aba392]">{vol.period}</span>
                        </div>
                        <div className="text-xs font-mono text-[#7a7265]">
                          {vol.category}
                        </div>
                        <p className="text-sm text-[#aba392] font-light leading-relaxed pt-1">
                          {vol.highlights[0]}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-[#2e2921]">
                    <span className="text-[11px] font-mono text-[#aba392] uppercase tracking-wider block font-bold">
                      // Academic Foundation
                    </span>
                    {education.map((edu, idx) => (
                      <div
                        key={idx}
                        className="border-l-2 border-[#2e2921] pl-4 space-y-1"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
                          <h3 className="text-base font-bold text-white">
                            {edu.institution}
                          </h3>
                          <span className="text-[#aba392]">{edu.period}</span>
                        </div>
                        <p className="text-xs text-[#aba392] font-mono">
                          {edu.degree} · {edu.field}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#2e2921] flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    playUiClick(600);
                    setActiveModal(null);
                  }}
                  className="px-5 py-2 rounded-full bg-[#1e1b16] hover:bg-[#2e2921] text-xs font-mono font-bold text-white transition-colors"
                >
                  Close Timeline
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* MODAL 4: TECHNICAL ARSENAL & MATRIX */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeModal === "stack" && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-[#2e2921] bg-[#12100d] p-6 sm:p-8 shadow-2xl text-[#f7f4ec] space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#2e2921]">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#d4af37]" />
                  <h2 className="text-xl font-serif font-bold text-white">
                    Technical Arsenal & Architecture Matrix
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playUiClick(600);
                    setActiveModal(null);
                  }}
                  className="p-2 rounded-xl text-[#aba392] hover:text-white hover:bg-[#1f1b15] transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl border border-[#2e2921] bg-[#161411]/80 space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#d4af37]">
                    // Backend, APIs & Asynchronous Queues
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {skills.backend.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#1e1b16] border border-[#2e2921] text-[#f7f4ec]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-[#2e2921] bg-[#161411]/80 space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#d4af37]">
                    // Databases, Ledgers & Storage
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {skills.databases.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#1e1b16] border border-[#2e2921] text-[#f7f4ec]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-[#2e2921] bg-[#161411]/80 space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#d4af37]">
                    // Frontend, Canvas & Web Audio
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {skills.frontend.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#1e1b16] border border-[#2e2921] text-[#f7f4ec]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-[#2e2921] bg-[#161411]/80 space-y-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#d4af37]">
                    // Creative Direction, UX & Media Production
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {skills.creativeDesign
                      .concat(skills.devOpsAndTools)
                      .map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#1e1b16] border border-[#2e2921] text-[#f7f4ec]"
                        >
                          {s}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2e2921] flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    playUiClick(600);
                    setActiveModal(null);
                  }}
                  className="px-5 py-2 rounded-full bg-[#1e1b16] hover:bg-[#2e2921] text-xs font-mono font-bold text-white transition-colors"
                >
                  Close Arsenal
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* ============================================================ */}
        {/* MODAL 5: DIRECT INQUIRY & CONTACT CHANNEL */}
        {/* ============================================================ */}
        {activeModal === "contact" && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-[#2e2921] bg-[#12100d] p-6 sm:p-8 shadow-2xl text-[#f7f4ec] space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#2e2921]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-white">
                      Direct Inquiries & Collaboration
                    </h2>
                    <p className="text-xs font-mono text-[#aba392]">
                      Architectural consultations, enterprise contracts &
                      creative direction
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playUiClick(600);
                    setActiveModal(null);
                  }}
                  className="p-2 rounded-xl bg-[#1e1b16] hover:bg-[#2e2921] text-[#aba392] hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Banner */}
              <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-mono font-bold text-emerald-300">
                    STATUS: ACCEPTING Q2 CONTRACTS
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#aba392]">
                  Malang / UTC+7
                </span>
              </div>

              {/* Primary Direct Action */}
              <div className="p-6 rounded-2xl border border-[#2e2921] bg-[#161411]/80 space-y-4">
                <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase font-bold block">
                  // OFFICIAL TRANSMISSION LINE
                </span>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl bg-[#1e1b16] border border-[#2e2921]">
                  <div className="flex items-center gap-3 px-2 font-mono text-sm text-[#f7f4ec]">
                    <Mail className="w-4 h-4 text-[#d4af37]" />
                    <span>{personal.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#2e2921] hover:bg-[#3d372c] text-xs font-mono font-semibold text-[#f7f4ec] transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Copy</span>
                    </button>
                    <a
                      href={`mailto:${personal.email}`}
                      onClick={() => playUiClick(700)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#d4af37] text-zinc-950 hover:bg-[#e8cb74] text-xs font-mono font-bold transition-all shadow-md shadow-[#d4af37]/20"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Mail</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Social Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playUiClick(600)}
                  className="p-4 rounded-2xl border border-[#2e2921] bg-[#161411]/80 hover:border-[#d4af37]/60 flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <GithubIcon className="w-5 h-5 text-[#aba392] group-hover:text-white" />
                    <div>
                      <span className="text-xs font-bold text-white block">
                        GitHub
                      </span>
                      <span className="text-[10px] font-mono text-[#7a7265]">
                        @revwrks
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#7a7265] group-hover:text-[#d4af37] transition-colors" />
                </a>

                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playUiClick(600)}
                  className="p-4 rounded-2xl border border-[#2e2921] bg-[#161411]/80 hover:border-[#d4af37]/60 flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <LinkedinIcon className="w-5 h-5 text-[#aba392] group-hover:text-blue-400" />
                    <div>
                      <span className="text-xs font-bold text-white block">
                        LinkedIn
                      </span>
                      <span className="text-[10px] font-mono text-[#7a7265]">
                        Professional
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#7a7265] group-hover:text-[#d4af37] transition-colors" />
                </a>

                <a
                  href={personal.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playUiClick(600)}
                  className="p-4 rounded-2xl border border-[#2e2921] bg-[#161411]/80 hover:border-[#d4af37]/60 flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <InstagramIcon className="w-5 h-5 text-[#aba392] group-hover:text-pink-400" />
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Instagram
                      </span>
                      <span className="text-[10px] font-mono text-[#7a7265]">
                        @itzrevv
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#7a7265] group-hover:text-[#d4af37] transition-colors" />
                </a>
              </div>

              <div className="pt-4 border-t border-[#2e2921] flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    playUiClick(600);
                    setActiveModal(null);
                  }}
                  className="px-5 py-2 rounded-full bg-[#1e1b16] hover:bg-[#2e2921] text-xs font-mono font-bold text-white transition-colors"
                >
                  Close Channel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
