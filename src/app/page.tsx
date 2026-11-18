"use client";

import React, { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AestheticPreloader } from "@/components/showcase/AestheticPreloader";
import { DualPersonaFluidHero } from "@/components/hero/DualPersonaFluidHero";
import { NegativeSpacePhilosophy } from "@/components/showcase/NegativeSpacePhilosophy";
import IsometricCardShowcase from "@/components/showcase/IsometricCardShowcase";
import { BrutalistProjectTable } from "@/components/showcase/BrutalistProjectTable";
import HolographicCapabilitiesGrid from "@/components/showcase/HolographicCapabilitiesGrid";
import { TactileSandbox } from "@/components/showcase/TactileSandbox";
import AtsResumeModule from "@/components/resume/AtsResumeModule";
import { sound, toggleSound, startAmbientDrone } from "@/lib/sound";
import { PORTFOLIO_DATA } from "@/data/portfolio";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);
  const [audioActive, setAudioActive] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const lenisRef = useRef<Lenis | null>(null);
  const mainRef = useRef<HTMLElement>(null);

  const { personal } = PORTFOLIO_DATA;

  // Initialize Lenis Smooth Scroll + GSAP ScrollTrigger coupling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Couple Lenis scroll events to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  // GSAP ScrollTrigger animations — mounted once after preloader completes
  useEffect(() => {
    if (isPreloaderActive) return;

    // Let DOM settle after preloader unmounts
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();

      // --- Hero parallax: image drifts up and fades as you scroll away ---
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        gsap.to(heroEl, {
          yPercent: -12,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: heroEl,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // --- Section reveals: each scroll-reveal-section fades + slides up ---
      const sections = document.querySelectorAll(".scroll-reveal-section");
      sections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 88%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // --- Negative Space: stagger the floating nodes in from edges ---
      const nsNodes = document.querySelectorAll("[data-ns-node]");
      if (nsNodes.length > 0) {
        gsap.fromTo(
          nsNodes,
          { opacity: 0, scale: 0.85, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#negative-space",
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // --- Negative Space: central title reveal ---
      const nsTitle = document.querySelector("[data-ns-title]");
      if (nsTitle) {
        gsap.fromTo(
          nsTitle,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: "#negative-space",
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // --- Project Table: stagger rows from left ---
      const tableRows = document.querySelectorAll("[data-project-row]");
      if (tableRows.length > 0) {
        gsap.fromTo(
          tableRows,
          { opacity: 0, x: -40, clipPath: "inset(0 100% 0 0)" },
          {
            opacity: 1,
            x: 0,
            clipPath: "inset(0 0% 0 0)",
            stagger: 0.08,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#projects-index",
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // --- Capabilities Grid: stagger children in ---
      const capCards = document.querySelectorAll("[data-cap-card]");
      if (capCards.length > 0) {
        gsap.fromTo(
          capCards,
          { opacity: 0, y: 50, rotateX: 8 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.06,
            duration: 0.65,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#capabilities-grid",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // --- Tactile Sandbox: scale in from center ---
      const sandboxEl = document.getElementById("tactile-sandbox");
      if (sandboxEl) {
        gsap.fromTo(
          sandboxEl,
          { opacity: 0, scale: 0.92 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sandboxEl,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // --- Footer colophon cards: stagger in ---
      const colophonCards = document.querySelectorAll("[data-colophon-card]");
      if (colophonCards.length > 0) {
        gsap.fromTo(
          colophonCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#colophon",
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isPreloaderActive]);

  // Live WIB Time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Jakarta",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(`${timeStr} WIB`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAudioToggle = () => {
    const nextState = toggleSound();
    setAudioActive(nextState);
    if (nextState) {
      sound.playClick();
      startAmbientDrone(0.015);
    }
  };

  const handlePreloaderComplete = () => {
    setIsPreloaderActive(false);
    sound.playClick();
  };

  return (
    <main
      ref={mainRef}
      className="relative min-h-screen bg-[#09090b] text-[#f4f4f5] antialiased selection:bg-white selection:text-black overflow-x-clip"
    >
      {/* Act 0: Photoyoshi Aesthetic Preloader */}
      {isPreloaderActive && (
        <AestheticPreloader onComplete={handlePreloaderComplete} />
      )}

      {/* Persistent Clean Brutalist Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#09090b]/85 backdrop-blur-md border-b border-white/10 px-6 py-3.5 flex items-center justify-between text-xs font-mono transition-colors">
        {/* Brand & System Status */}
        <div className="flex items-center gap-4">
          <a
            href="#hero"
            onClick={() => sound.playClick()}
            className="font-bold tracking-wider uppercase text-white hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-white inline-block" />
            <span>{personal.brandName} // 2026</span>
          </a>
          <div className="hidden sm:flex items-center gap-2 text-zinc-400 text-[11px] border-l border-white/10 pl-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SYS: OPTIMAL</span>
          </div>
        </div>

        {/* Anchor Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[11px] text-zinc-400 tracking-wide">
          <a
            href="#hero"
            onClick={() => sound.playTick()}
            className="hover:text-white transition-colors"
          >
            01/HERO
          </a>
          <a
            href="#negative-space"
            onClick={() => sound.playTick()}
            className="hover:text-white transition-colors"
          >
            02/VOID
          </a>
          <a
            href="#architecture-showcase"
            onClick={() => sound.playTick()}
            className="hover:text-white transition-colors"
          >
            03/CONVEYOR
          </a>
          <a
            href="#projects-index"
            onClick={() => sound.playTick()}
            className="hover:text-white transition-colors"
          >
            04/INDEX
          </a>
          <a
            href="#capabilities-grid"
            onClick={() => sound.playTick()}
            className="hover:text-white transition-colors"
          >
            05/CORE
          </a>
          <a
            href="#tactile-sandbox"
            onClick={() => sound.playTick()}
            className="hover:text-white transition-colors"
          >
            06/SANDBOX
          </a>
        </nav>

        {/* Controls: Audio Toggle, Telemetry Clock & ATS Resume */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-[11px] text-zinc-400 pr-2">
            <span>{currentTime || "JKT // WIB"}</span>
          </div>

          {/* Equalizer Audio Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center gap-2 px-3 py-1.5 border border-white/10 text-[11px] uppercase tracking-wider transition-colors ${
              audioActive
                ? "bg-white text-black border-white font-bold"
                : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
            }`}
            title="Toggle procedural Web Audio DSP ambient drone and tactile clicks"
          >
            <div className="flex items-end gap-0.5 h-3">
              <span
                className={`w-0.5 bg-current transition-all ${
                  audioActive ? "h-3 animate-pulse" : "h-1"
                }`}
              />
              <span
                className={`w-0.5 bg-current transition-all ${
                  audioActive ? "h-2 animate-bounce" : "h-1"
                }`}
              />
              <span
                className={`w-0.5 bg-current transition-all ${
                  audioActive ? "h-3.5 animate-pulse" : "h-1"
                }`}
              />
            </div>
            <span>{audioActive ? "AUDIO: ON" : "AUDIO: OFF"}</span>
          </button>

          {/* ATS Resume Modal Launcher */}
          <AtsResumeModule />
        </div>
      </header>

      {/* Act 1: Lando Norris Viscous Blob Dual Persona Hero */}
      <DualPersonaFluidHero />

      {/* Act 2: Getty Tracing Art 75%+ Extreme Negative Space Narrative */}
      <div className="scroll-reveal-section">
        <NegativeSpacePhilosophy />
      </div>

      {/* Act 3: Inkwell Tech 3D Isometric Card Conveyor */}
      <IsometricCardShowcase />

      {/* Act 4: Cappen 1px Hairline Tabular Index & 3D Portals */}
      <div className="scroll-reveal-section">
        <BrutalistProjectTable />
      </div>

      {/* Act 5: Phantom Land Holographic Capabilities Grid */}
      <div className="scroll-reveal-section">
        <HolographicCapabilitiesGrid />
      </div>

      {/* Act 6: Mat Voyce Tactile Physics Badges Sandbox */}
      <div className="scroll-reveal-section">
        <TactileSandbox />
      </div>

      {/* Act 7: Colophon & Footer */}
      <footer id="colophon" className="w-full bg-[#09090b] border-t border-white/10 py-16 px-6 md:px-12 text-[#f4f4f5]">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8 gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-zinc-500 mb-2">
                COLOPHON // PRODUCTION ARCHITECTURE
              </p>
              <h2 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                Crafted With Architectural Rigor.
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end font-mono text-xs text-zinc-400 gap-2">
              <p>{personal.brandName} &bull; {personal.location}</p>
              <p>REVWORKS DIGITAL LAB &bull; 60FPS LOCKED</p>
              <AtsResumeModule />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div data-colophon-card className="border border-white/10 p-5 bg-[#121215] flex flex-col gap-2.5">
              <span className="text-zinc-500 uppercase text-[10px] tracking-wider">
                [01] ARCHITECTURAL SPEC
              </span>
              <h3 className="font-heading font-bold text-sm uppercase text-white">
                Clean Brutalist Philosophy
              </h3>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                Strict 1px hairline boundary grids, 75%+ extreme negative space exclusion, monospace telemetry, and procedural zero-bloat audio DSP.
              </p>
            </div>

            <div data-colophon-card className="border border-white/10 p-5 bg-[#121215] flex flex-col gap-2.5">
              <span className="text-zinc-500 uppercase text-[10px] tracking-wider">
                [02] SYSTEM LINEAGE
              </span>
              <h3 className="font-heading font-bold text-sm uppercase text-white">
                8 Reverse-Engineered Archetypes
              </h3>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                Inkwell 3D conveyor, Photoyoshi preloader, Getty void, Cappen tabular index, Phantom Land depth map, Mat Voyce physics, Pantheon shutter, and Lando viscous mask.
              </p>
            </div>

            <div data-colophon-card className="border border-white/10 p-5 bg-[#121215] flex flex-col gap-2.5">
              <span className="text-zinc-500 uppercase text-[10px] tracking-wider">
                [03] RUNTIME STACK
              </span>
              <h3 className="font-heading font-bold text-sm uppercase text-white">
                Zero Runtime Bloat
              </h3>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                Next.js 16.4 &bull; React 19 &bull; Three.js &bull; GSAP 3.12 &bull; Lenis Smooth Scroll &bull; Web Audio API Synthesizer &bull; Tailwind CSS v4 &bull; TypeScript.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-zinc-500 border-t border-white/10 pt-6 gap-4">
            <div className="flex items-center gap-4">
              <span>&copy; 2026 {personal.brandName}. ALL RIGHTS RESERVED.</span>
              <span className="hidden sm:inline">&bull;</span>
              <span className="hidden sm:inline">NO COOKIES. NO TRACKERS. PURE CODE.</span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playTick()}
                className="hover:text-white transition-colors uppercase font-bold"
              >
                GITHUB
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playTick()}
                className="hover:text-white transition-colors uppercase font-bold"
              >
                LINKEDIN
              </a>
              <a
                href={`mailto:${personal.email}`}
                onClick={() => sound.playTick()}
                className="hover:text-white transition-colors uppercase font-bold"
              >
                CONTACT
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
