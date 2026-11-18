"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sound, playElasticPop } from "@/lib/sound";
import { PORTFOLIO_DATA } from "@/data/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DualPersonaFluidHeroProps {
  baseImageSrc?: string;
  personaImageSrc?: string;
}

/**
 * DUAL-PERSONA FLUID BLOB HERO SECTION
 * Restored to original beloved cinematic makeover design (Step 757):
 * - Colossal centered REV typography with natural portrait integration
 * - Pixel-aligned rev3 (base) and rev2 (alternate persona)
 * - 12-vertex spring viscous liquid blob overlay tracking mouse velocity
 * - High-performance CSS variable-driven radial mask reveal following cursor coordinates
 */
export const DualPersonaFluidHero: React.FC<DualPersonaFluidHeroProps> = ({
  baseImageSrc = "/hero/rev-base-rev3.png",
  personaImageSrc = "/hero/rev-reveal-rev2.png",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [blobMode, setBlobMode] = useState<"executive" | "architect">("executive");

  const { personal } = PORTFOLIO_DATA;

  // 12-Vertex Spring Viscous Liquid Blob Simulation (Exact Step 757 Physics)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse Physics & Velocity Tracker
    const mouse = {
      x: width * 0.5,
      y: height * 0.45,
      vx: 0,
      vy: 0,
      prevX: width * 0.5,
      prevY: height * 0.45,
    };
    const blobCenter = { x: width * 0.5, y: height * 0.45 };
    const baseRadius = Math.min(width, height) * 0.18; // ~180-220px radius

    // 12 Spring-Damped Radial Vertices for Organic Liquid Deformation
    const numPoints = 12;
    const points = Array.from({ length: numPoints }, (_, i) => {
      const angle = (i / numPoints) * Math.PI * 2;
      return {
        angle,
        radius: baseRadius,
        targetRadius: baseRadius,
        velocity: 0,
        x: 0,
        y: 0,
      };
    });

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;

      mouse.vx = newX - mouse.prevX;
      mouse.vy = newY - mouse.prevY;
      mouse.prevX = mouse.x = newX;
      mouse.prevY = mouse.y = newY;

      // Update CSS variables on container for 60fps hardware-accelerated mask reveal
      if (containerRef.current) {
        const pctX = ((newX / width) * 100).toFixed(2);
        const pctY = ((newY / height) * 100).toFixed(2);
        containerRef.current.style.setProperty("--mouse-x", `${pctX}%`);
        containerRef.current.style.setProperty("--mouse-y", `${pctY}%`);
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    // Render & Fluid Spring Solver Loop
    const render = () => {
      // Lerp blob center toward mouse with inertia
      blobCenter.x += (mouse.x - blobCenter.x) * 0.12;
      blobCenter.y += (mouse.y - blobCenter.y) * 0.12;

      // Mouse velocity magnitude
      const speed = Math.hypot(mouse.vx, mouse.vy);
      const moveAngle = Math.atan2(mouse.vy, mouse.vx);

      // Damp velocity
      mouse.vx *= 0.88;
      mouse.vy *= 0.88;

      ctx.clearRect(0, 0, width, height);

      // Solve spring oscillation for each vertex
      const k = 0.18; // Spring stiffness
      const damping = 0.82; // Spring damping

      for (let i = 0; i < numPoints; i++) {
        const p = points[i];
        // Calculate dynamic deformation along mouse movement vector
        const angleDiff = Math.abs(p.angle - moveAngle);
        const elongation = Math.cos(angleDiff) * Math.min(speed * 3.5, baseRadius * 0.6);

        p.targetRadius = baseRadius + (speed > 1 ? elongation : 0);

        // Harmonic oscillator: F = -k*(r - target) - damping*v
        const force = -k * (p.radius - p.targetRadius);
        p.velocity = (p.velocity + force) * damping;
        p.radius += p.velocity;

        p.x = blobCenter.x + Math.cos(p.angle) * p.radius;
        p.y = blobCenter.y + Math.sin(p.angle) * p.radius;
      }

      // Draw Smooth Spline through points
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(
        (points[0].x + points[numPoints - 1].x) / 2,
        (points[0].y + points[numPoints - 1].y) / 2
      );

      for (let i = 0; i < numPoints; i++) {
        const next = points[(i + 1) % numPoints];
        const midX = (points[i].x + next.x) / 2;
        const midY = (points[i].y + next.y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
      }
      ctx.closePath();

      // Mask Fill
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#09090b] text-[#f4f4f5] overflow-hidden select-none border-b border-white/10"
      aria-label="Revworks Dual-Persona Hero"
      id="hero"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "45%",
        } as React.CSSProperties
      }
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-2 md:grid-cols-4 border-x border-white/5">
        <div className="border-r border-white/5 h-full" />
        <div className="border-r border-white/5 h-full hidden md:block" />
        <div className="border-r border-white/5 h-full hidden md:block" />
        <div className="h-full" />
      </div>

      {/* Layer 1: Executive Base Portrait (rev3, aligned) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-[650px] aspect-[2/3] max-h-[85vh] filter grayscale contrast-110 opacity-90 transition-opacity">
          <Image
            src={baseImageSrc}
            alt="Rev - Executive Software Architect"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 650px"
            className="object-contain object-bottom"
          />
        </div>
      </div>

      {/* Layer 2: Revealed Persona (rev2, pixel-aligned with rev3) */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-[mask-position] duration-75 ease-out"
        style={{
          maskImage: "radial-gradient(circle at var(--mouse-x) var(--mouse-y), black 160px, transparent 260px)",
          WebkitMaskImage: "radial-gradient(circle at var(--mouse-x) var(--mouse-y), black 160px, transparent 260px)",
        }}
      >
        <div className="relative w-full max-w-[650px] aspect-[2/3] max-h-[85vh] filter contrast-125 saturate-120 opacity-95">
          <Image
            src={personaImageSrc}
            alt="Rev - Creative Technologist Persona"
            fill
            sizes="(max-width: 768px) 100vw, 650px"
            className="object-contain object-bottom"
          />
        </div>
      </div>

      {/* Fluid Blob Canvas (Interactive Viscous Mask Overlay) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto mix-blend-overlay opacity-30 cursor-crosshair"
      />

      {/* Hero Typography & Monospace Telemetry HUD */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-between p-6 md:p-12 pointer-events-none">
        {/* Top Header Row */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="mono-hud text-[11px] text-white/80 tracking-widest font-mono">
              [{personal.brandName} ARCHITECTURE]
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span className="mono-hud text-[10px] text-zinc-400">LATENCY: 14MS</span>
            <span className="mono-hud text-[10px] text-zinc-400">FPS: 120</span>
            <span className="mono-hud text-[10px] text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded bg-emerald-500/5">
              AVAILABLE Q2/Q3
            </span>
          </div>
        </div>

        {/* Center Editorial Title */}
        <div className="w-full my-auto flex flex-col items-center md:items-start text-center md:text-left">
          <span className="mono-hud text-xs md:text-sm text-zinc-400 tracking-[0.25em] mb-2">
            SENIOR FULLSTACK ENGINEER &amp; CREATIVE TECHNOLOGIST
          </span>
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.85] font-sans">
            REV
          </h1>
          <p className="mt-4 max-w-md text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
            {personal.bio}
          </p>
        </div>

        {/* Bottom Interactive HUD & Scroll Prompt */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => {
                playElasticPop(550);
                setBlobMode(blobMode === "executive" ? "architect" : "executive");
              }}
              className="mono-hud text-[11px] text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded transition-all hover:scale-105 active:scale-95"
            >
              MODE: {blobMode.toUpperCase()} [SWITCH]
            </button>
            <span className="mono-hud text-[10px] text-zinc-500 hidden sm:inline">
              &larr; DRAG MOUSE TO REVEAL VISOR
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="mono-hud text-[10px] text-zinc-400 tracking-widest animate-bounce">
              &darr; SCROLL TO EXPLORE ARCHITECTURE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
