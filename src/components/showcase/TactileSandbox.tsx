"use client";

import React, { useRef } from "react";
import { motion } from "motion/react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { playElasticPop, playMechanicalClick } from "@/lib/sound";

interface TechBadge {
  id: string;
  name: string;
  category: string;
  level: string;
  borderColor: string;
}

const REAL_TECH_BADGES: TechBadge[] = [
  { id: "laravel", name: "Laravel & PHP", category: "Backend Engine", level: "Production", borderColor: "border-orange-500/40" },
  { id: "canvas", name: "HTML5 Canvas", category: "Graphics Studio", level: "Native", borderColor: "border-blue-500/40" },
  { id: "audio", name: "Web Audio API", category: "Acoustic DSP", level: "Procedural", borderColor: "border-purple-500/40" },
  { id: "nextjs", name: "Next.js 16 & React 19", category: "Fullstack", level: "Senior", borderColor: "border-foreground/30" },
  { id: "ts", name: "TypeScript", category: "Type System", level: "Strict", borderColor: "border-sky-500/40" },
  { id: "mysql", name: "MySQL & Ledgers", category: "Database", level: "ACID Safe", borderColor: "border-emerald-500/40" },
  { id: "webhooks", name: "Async Webhooks", category: "Fintech Pipe", level: "Sub-second", borderColor: "border-amber-500/40" },
  { id: "figma", name: "Figma & Google UX", category: "Design System", level: "Certified", borderColor: "border-fuchsia-500/40" },
  { id: "video", name: "Video Direction", category: "Cinematography", level: "Lead Op", borderColor: "border-rose-500/40" },
  { id: "tailwind", name: "Tailwind CSS v4", category: "Brutalist Tokens", level: "Architect", borderColor: "border-teal-500/40" },
  { id: "netlify", name: "Netlify & Vercel", category: "Cloud Edge", level: "Deployed", borderColor: "border-cyan-500/40" },
  { id: "docker", name: "Docker & Linux", category: "DevOps", level: "Infrastructure", borderColor: "border-indigo-500/40" },
];

/**
 * TACTILE SANDBOX & ENGINEERING EASTER EGGS
 * Reverse-engineered from Mat Voyce (`matvoyce.tv`).
 * Draggable physics chips using under-damped rubber spring physics (k=450, c=22, m=0.8).
 * Real tech stack from Revworks' production codebase.
 */
export const TactileSandbox: React.FC = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="tactile-sandbox"
      className="relative w-full bg-background text-foreground p-6 md:p-16 border-b border-hairline"
      aria-label="Revworks Tactile Sandbox"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-hairline gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-muted block mb-1">
            ACT 06 // INTERACTIVE PLAYGROUND
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tight text-foreground">
            Tactile Tech Stack Sandbox
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-muted border border-hairline px-3 py-1 bg-surface-card shadow-brutalist">
            DRAG &amp; TOSS BADGES [SPRING PHYSICS]
          </span>
        </div>
      </div>

      {/* Physics Sandbox Container */}
      <div
        ref={constraintsRef}
        className="max-w-7xl mx-auto relative w-full min-h-[380px] md:min-h-[440px] bg-surface-card border border-hairline p-6 md:p-10 overflow-hidden flex flex-wrap items-center justify-center gap-4 select-none shadow-brutalist"
      >
        {/* Subtle Background Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <span className="text-[14vw] font-black tracking-tighter uppercase font-mono">
            REVWORKS
          </span>
        </div>

        {/* 1px Hairline Guide Markings */}
        <div className="absolute top-4 left-4 font-mono text-[10px] text-muted pointer-events-none">
          PHYSICS: HARMONIC SPRING (k=450, c=22, m=0.8)
        </div>
        <div className="absolute bottom-4 right-4 font-mono text-[10px] text-muted pointer-events-none">
          BOUNDING CONSTRAINT: ELASTIC 0.25
        </div>

        {/* Draggable Tech Chips */}
        {REAL_TECH_BADGES.map((badge, idx) => (
          <motion.div
            key={badge.id}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.25}
            dragTransition={{ bounceStiffness: 450, bounceDamping: 22 }}
            whileHover={{
              scale: 1.15,
              rotate: idx % 2 === 0 ? 3.5 : -3.5,
              transition: { type: "spring", stiffness: 450, damping: 20 },
            }}
            whileTap={{
              scale: 0.94,
              rotate: 0,
              transition: { duration: 0.08 },
            }}
            onMouseEnter={() => playElasticPop(520)}
            onDragStart={() => playMechanicalClick(950)}
            className={`cursor-grab active:cursor-grabbing px-4 py-2.5 bg-background border ${badge.borderColor} shadow-brutalist flex items-center gap-2.5 transition-shadow hover:shadow-2xl z-10`}
          >
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-mono text-xs md:text-sm font-bold tracking-tight text-foreground">
              {badge.name}
            </span>
            <span className="font-mono text-[9px] text-muted border-l border-hairline pl-2 ml-1 uppercase">
              {badge.level}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
