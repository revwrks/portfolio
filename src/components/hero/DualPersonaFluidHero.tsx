"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sound } from "@/lib/sound";
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
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const fluidGroupRef = useRef<SVGGElement>(null);

  const { personal } = PORTFOLIO_DATA;

  // Lando Norris Authentic Fluid Mask Reveal Engine (Navier-Stokes Style Viscous Advection, Zero Spring Bounce)
  useEffect(() => {
    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initial resting coordinates centered on portrait face
    const initialX = width * 0.5;
    const initialY = height * 0.44;

    const mouse = {
      x: initialX,
      y: initialY,
      vx: 0,
      vy: 0,
    };
    const head = {
      x: initialX,
      y: initialY,
    };

    // Responsive fluid droplet base radius (~160px on desktop, ~120px on mobile)
    const baseRadius = Math.min(
      Math.max(Math.min(width, height) * 0.18, 110),
      170,
    );

    // Trailing fluid droplets pool for continuous liquid wake
    interface TrailDroplet {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      decay: number;
    }
    const trail: TrailDroplet[] = [];
    const maxTrail = 24;

    let time = 0;

    const updateMouse = (clientX: number, clientY: number) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const vx = x - mouse.x;
      const vy = y - mouse.y;
      const speed = Math.hypot(vx, vy);

      mouse.vx = vx;
      mouse.vy = vy;
      mouse.x = x;
      mouse.y = y;

      // Emit trailing fluid droplets along cursor trajectory if moving
      if (speed > 2.5 && y > -100 && y < rect.height + 100) {
        trail.push({
          x,
          y,
          radius: Math.min(baseRadius * 0.85, 42 + speed * 1.5),
          alpha: 1.0,
          decay: 0.034 + Math.random() * 0.015,
        });
        if (trail.length > maxTrail) {
          trail.shift();
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      updateMouse(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateMouse(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    // 60/120fps Fluid Simulation Solver
    const render = () => {
      time += 0.02;

      // Viscous liquid inertia: fluid head drags smoothly behind pointer (no spring bounce!)
      const followInertia = 0.16;
      head.x += (mouse.x - head.x) * followInertia;
      head.y += (mouse.y - head.y) * followInertia;

      const vx = mouse.x - head.x;
      const vy = mouse.y - head.y;
      const speed = Math.hypot(vx, vy);
      const angle = (Math.atan2(vy, vx) * 180) / Math.PI;

      // Viscous droplet elongation along travel vector (volume conservation: stretches in length, thins in width)
      const stretch = Math.min(speed * 0.38, baseRadius * 0.62);
      const rx = baseRadius + stretch;
      const ry = Math.max(baseRadius * 0.65, baseRadius - stretch * 0.28);

      // Subtle living surface tension wave (gentle liquid breathing, zero bounce)
      const surfaceWave = Math.sin(time * 1.8) * (baseRadius * 0.02);
      const finalRx = rx + surfaceWave;
      const finalRy = ry - surfaceWave * 0.5;

      const group = fluidGroupRef.current;
      if (group) {
        let svg = "";

        // 1. Trailing fluid droplets (advection wake forming liquid stream via Gaussian blur)
        for (let i = trail.length - 1; i >= 0; i--) {
          const p = trail[i];
          p.radius *= 0.948;
          p.alpha -= p.decay;
          if (p.alpha <= 0.04 || p.radius < 5) {
            trail.splice(i, 1);
            continue;
          }
          svg += `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${p.radius.toFixed(1)}" fill="white" opacity="${p.alpha.toFixed(2)}" />`;
        }

        // 2. Main fluid head droplet (elongated teardrop along travel direction)
        svg += `<ellipse cx="${head.x.toFixed(1)}" cy="${head.y.toFixed(1)}" rx="${finalRx.toFixed(1)}" ry="${finalRy.toFixed(1)}" transform="rotate(${angle.toFixed(1)} ${head.x.toFixed(1)} ${head.y.toFixed(1)})" fill="white" />`;

        group.innerHTML = svg;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#09090b] text-[#f4f4f5] overflow-hidden select-none border-b border-white/10"
      aria-label="Revworks Dual-Persona Hero"
      id="hero"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none grid grid-cols-2 md:grid-cols-4 border-x border-white/5">
        <div className="border-r border-white/5 h-full" />
        <div className="border-r border-white/5 h-full hidden md:block" />
        <div className="border-r border-white/5 h-full hidden md:block" />
        <div className="h-full" />
      </div>

      {/* Layer 1: Executive Base Portrait with bottom soft blur fade */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="relative w-full max-w-[650px] aspect-[2/3] max-h-[85vh] filter grayscale contrast-110 opacity-90 transition-opacity"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 0%, black 72%, transparent 98%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 72%, transparent 98%)",
          }}
        >
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

      {/* Dynamic SVG Fluid Mask Definition (Lando Norris-Style Navier-Stokes Fluid Reveal) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        aria-hidden="true"
      >
        <defs>
          <filter
            id="lando-fluid-blur"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="24" />
          </filter>
          <mask id="lando-fluid-mask" maskUnits="userSpaceOnUse">
            <rect width="100%" height="100%" fill="black" />
            <g ref={fluidGroupRef} filter="url(#lando-fluid-blur)">
              <ellipse cx="50%" cy="44%" rx="150" ry="150" fill="white" />
            </g>
          </mask>
        </defs>
      </svg>

      {/* Layer 2: Revealed Persona (masked by dynamic Lando fluid mask) */}
      <div
        ref={revealLayerRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          mask: "url(#lando-fluid-mask)",
          WebkitMask: "url(#lando-fluid-mask)",
        }}
      >
        <div
          className="relative w-full max-w-[650px] aspect-[2/3] max-h-[85vh] filter contrast-125 saturate-120 opacity-95"
          style={{
            // Matches exact bottom soft blur fade of the base photo
            maskImage:
              "linear-gradient(to bottom, black 0%, black 72%, transparent 98%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 72%, transparent 98%)",
          }}
        >
          <Image
            src={personaImageSrc}
            alt="Rev - Creative Technologist Persona"
            fill
            sizes="(max-width: 768px) 100vw, 650px"
            className="object-contain object-bottom"
          />
        </div>
      </div>

      {/* Soft Bottom Progressive Blur & Gradient Fade into Background */}
      <div
        className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent pointer-events-none backdrop-blur-[2px] z-10"
        style={{
          maskImage: "linear-gradient(to top, black 25%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 25%, transparent 100%)",
        }}
      />

      {/* Hero Typography & HUD Container (Top row removed to avoid clash with fixed header) */}
      <div className="relative z-20 w-full min-h-screen flex flex-col justify-between p-6 md:p-12 pointer-events-none pt-20">
        {/* Top spacer to balance vertical centering */}
        <div aria-hidden="true" className="h-6" />

        {/* Center Editorial Title */}
        <div className="w-full my-auto flex flex-col items-center md:items-start text-center md:text-left">
          <span className="mono-hud text-xs md:text-sm text-zinc-400 tracking-[0.25em] mb-2">
            SENIOR FULLSTACK ENGINEER &amp; CREATIVE TECHNOLOGIST
          </span>
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.85] font-sans">
            REV
          </h1>
          <p className="mt-4 max-w-md text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
            Mahendra Pujo Prianto, Also known as Rev is a {personal.bio}
          </p>
        </div>

        {/* Bottom Interactive HUD & Scroll Prompt */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="mono-hud text-[11px] text-zinc-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded">
              &larr; DRAG MOUSE TO REVEAL
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="mono-hud text-[10px] text-zinc-400 tracking-widest animate-bounce">
              &darr; SCROLL TO EXPLORE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
