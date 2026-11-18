"use client";

import React, { useRef } from "react";
import { playMechanicalClick, playElasticPop } from "@/lib/sound";

interface CapabilityNode {
  id: string;
  tag: string;
  title: string;
  desc: string;
  metric: string;
  polarPos: { x: string; y: string };
}

const REAL_CAPABILITY_NODES: CapabilityNode[] = [
  {
    id: "fintech-engine",
    tag: "01 / FINTECH CORE",
    title: "KeyVault & Webhooks",
    desc: "Asynchronous webhook ingestion, idempotency locks, and zero-leak digital inventory provisioning.",
    metric: "Sub-Second P99",
    polarPos: { x: "12%", y: "18%" },
  },
  {
    id: "canvas-audio",
    tag: "02 / GRAPHICS & DSP",
    title: "HTML5 Canvas & Web Audio",
    desc: "In-browser illustration engine, custom brush pipelines, and procedural Web Audio synthesizers.",
    metric: "60 FPS Locked",
    polarPos: { x: "70%", y: "20%" },
  },
  {
    id: "erp-pdf",
    tag: "03 / OPERATIONS",
    title: "Academic ERP & Batch PDF",
    desc: "Bulk automated FPDF certificate compilation, centralized repertoire streaming, and role-based staff portals.",
    metric: "80% Time Saved",
    polarPos: { x: "14%", y: "70%" },
  },
  {
    id: "retail-pos",
    tag: "04 / RETAIL HARDWARE",
    title: "Retail POS & Stock Logic",
    desc: "Multi-variant device tracking, repair diagnostic logging, and automated daily sales margin summaries.",
    metric: "Live Production",
    polarPos: { x: "68%", y: "72%" },
  },
];

/**
 * NEGATIVE SPACE PHILOSOPHY VOID
 * Reverse-engineered from Getty Tracing Art (`getty.edu/tracingart`).
 * Preserves 75%+ extreme negative space around a dual-style serif central title,
 * with radial capability nodes and ghost bounding boxes providing spatial rhythm.
 */
export const NegativeSpacePhilosophy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id="negative-space"
      className="relative w-full min-h-screen bg-background text-foreground flex items-center justify-center p-6 md:p-16 overflow-hidden border-b border-hairline select-none"
      aria-label="Revworks Architectural Philosophy"
    >
      {/* Ghost Bounding Boxes for Rhythmic Spatial Anchoring */}
      <div className="absolute top-[10%] left-[30%] w-36 h-28 border border-hairline opacity-40 pointer-events-none rounded-none hidden lg:block" />
      <div className="absolute bottom-[14%] right-[26%] w-44 h-32 border border-hairline opacity-40 pointer-events-none rounded-none hidden lg:block" />
      <div className="absolute top-[42%] right-[10%] w-32 h-40 border border-hairline opacity-40 pointer-events-none rounded-none hidden lg:block" />
      <div className="absolute bottom-[38%] left-[8%] w-48 h-24 border border-hairline opacity-40 pointer-events-none rounded-none hidden lg:block" />

      {/* Central Typographic Anchor (Dual-Style Serif: Italic + Classical Roman) */}
      <div data-ns-title className="relative z-10 max-w-xl text-center pointer-events-none my-24">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted mb-4 block">
          CORE PHILOSOPHY / 02
        </span>
        <h2 className="text-4xl sm:text-6xl md:text-7xl leading-[1.05]">
          <span className="font-serif italic font-light text-muted block">
            the Craft
          </span>
          <span className="font-serif not-italic font-normal tracking-tight text-foreground block mt-1">
            of Revworks
          </span>
        </h2>
        <div className="w-16 h-[1px] bg-foreground/20 mx-auto my-6" />
        <p className="font-sans text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
          Mastering the discipline of radical subtraction. High performance does not require visual noise—it demands structural clarity, verified invariants, and uncompromising precision.
        </p>

        {/* Mobile Stacked Capabilities (Visible on mobile/tablet) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10 text-left pointer-events-auto md:hidden">
          {REAL_CAPABILITY_NODES.map((node) => (
            <div
              key={`mobile-${node.id}`}
              className="p-4 bg-[#121215] border border-white/10"
              onClick={() => playMechanicalClick(1100)}
            >
              <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-white/10">
                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                  {node.tag}
                </span>
                <span className="font-mono text-[9px] text-emerald-400 font-bold">
                  {node.metric}
                </span>
              </div>
              <h3 className="font-heading text-sm font-bold text-white">
                {node.title}
              </h3>
              <p className="font-sans text-[11px] text-zinc-400 mt-1 leading-snug">
                {node.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Radial Capability Nodes (Desktop) */}
      {REAL_CAPABILITY_NODES.map((node) => (
        <div
          key={node.id}
          data-ns-node
          className="absolute z-20 group hidden md:block max-w-[260px] p-4 bg-[#121215] border border-white/10 hover:border-emerald-400/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-default"
          style={{
            left: node.polarPos.x,
            top: node.polarPos.y,
          }}
          onMouseEnter={() => playElasticPop(580)}
          onClick={() => playMechanicalClick(1100)}
        >
          <div className="flex items-center justify-between mb-1 pb-1 border-b border-white/10">
            <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">
              {node.tag}
            </span>
            <span className="font-mono text-[9px] text-emerald-400 font-bold">
              {node.metric}
            </span>
          </div>
          <h3 className="font-heading text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
            {node.title}
          </h3>
          <p className="font-sans text-[11px] text-zinc-400 mt-1 leading-snug">
            {node.desc}
          </p>
        </div>
      ))}

      {/* Bottom Subtitle / Reticle Prompt */}
      <div className="absolute bottom-6 left-6 md:left-12 font-mono text-[10px] text-muted tracking-widest pointer-events-none">
        HOVER NODES TO INSPECT ARCHITECTURAL SPEC
      </div>
    </section>
  );
};
