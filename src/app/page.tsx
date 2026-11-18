"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userMutedRef = useRef(false);

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

      // --- Section reveals: smooth scroll-scrubbed emergence to prevent premature reveals ---
      const sections = document.querySelectorAll(".scroll-reveal-section");
      sections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 92%",
              end: "top 65%",
              scrub: 0.8,
            },
          }
        );
      });

      // --- Negative Space: stagger the floating nodes in from edges ---
      const nsNodes = document.querySelectorAll("[data-ns-node]");
      if (nsNodes.length > 0) {
        gsap.fromTo(
          nsNodes,
          { opacity: 0, scale: 0.9, y: 25 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#negative-space",
              start: "top 85%",
              end: "top 50%",
              scrub: 0.8,
            },
          }
        );
      }

      // --- Negative Space: central title reveal ---
      const nsTitle = document.querySelector("[data-ns-title]");
      if (nsTitle) {
        gsap.fromTo(
          nsTitle,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#negative-space",
              start: "top 80%",
              end: "top 55%",
              scrub: 0.8,
            },
          }
        );
      }

      // --- Project Table: gentle progressive reveal WITHOUT clip-path (preserves hover portals) ---
      const tableRows = document.querySelectorAll("[data-project-row]");
      if (tableRows.length > 0) {
        gsap.fromTo(
          tableRows,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: "#projects-index",
              start: "top 85%",
              end: "top 55%",
              scrub: 0.8,
            },
          }
        );
      }

      // --- Capabilities Grid: stagger children in progressively ---
      const capCards = document.querySelectorAll("[data-cap-card]");
      if (capCards.length > 0) {
        gsap.fromTo(
          capCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#capabilities-grid",
              start: "top 85%",
              end: "top 55%",
              scrub: 0.8,
            },
          }
        );
      }

      // --- Sandbox: scale in from center smoothly ---
      const sandboxEl = document.getElementById("tactile-sandbox");
      if (sandboxEl) {
        gsap.fromTo(
          sandboxEl,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sandboxEl,
              start: "top 90%",
              end: "top 65%",
              scrub: 0.8,
            },
          }
        );
      }

      // --- Footer contact cards: scrubbed in smoothly ---
      const colophonCards = document.querySelectorAll("[data-colophon-card]");
      if (colophonCards.length > 0) {
        gsap.fromTo(
          colophonCards,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#colophon",
              start: "top 90%",
              end: "top 65%",
              scrub: 0.8,
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

  // Attempt Autoplay on Mount + User First Gesture Fallback (Compliance with browser autoplay policies)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startPlayback = () => {
      if (userMutedRef.current || !audioRef.current) return;
      audioRef.current.volume = 0.35;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setAudioActive(true);
            toggleSound(true);
          })
          .catch(() => {
            // Autoplay blocked by browser policy without gesture
          });
      }
    };

    // Try immediate autoplay on page load
    startPlayback();

    // Fallback: Trigger audio seamlessly on first click, touch, or drag
    const onFirstGesture = () => {
      startPlayback();
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
      window.removeEventListener("touchstart", onFirstGesture);
    };

    window.addEventListener("pointerdown", onFirstGesture, { once: true });
    window.addEventListener("keydown", onFirstGesture, { once: true });
    window.addEventListener("touchstart", onFirstGesture, { once: true });

    return () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
      window.removeEventListener("touchstart", onFirstGesture);
    };
  }, []);

  const handleAudioToggle = () => {
    if (!audioRef.current) return;
    if (audioActive) {
      userMutedRef.current = true;
      audioRef.current.pause();
      setAudioActive(false);
      toggleSound(false);
    } else {
      userMutedRef.current = false;
      audioRef.current.volume = 0.35;
      audioRef.current.play().catch(() => {});
      setAudioActive(true);
      toggleSound(true);
      sound.playClick();
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
      {/* Background Music Audio Element */}
      <audio ref={audioRef} src="/audio/bgm.mp3" preload="auto" loop className="hidden" />

      {/* Act 0: Photoyoshi Aesthetic Preloader */}
      {isPreloaderActive && (
        <AestheticPreloader onComplete={handlePreloaderComplete} />
      )}

      {/* Persistent Clean Brutalist Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-white/10 px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between text-xs font-mono transition-colors">
        {/* Brand & System Status */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <a
            href="#hero"
            onClick={() => sound.playClick()}
            className="font-bold tracking-wider uppercase text-white hover:opacity-80 transition-opacity flex items-center gap-2.5 text-xs sm:text-sm group"
          >
            <Image
              src="/REVWORKS-LOGO.png"
              alt="REVWORKS Emblem"
              width={20}
              height={20}
              className="w-5 h-5 object-contain group-hover:scale-110 transition-transform"
              priority
            />
            <span>{personal.brandName}</span>
          </a>
          <div className="hidden sm:flex items-center gap-2 text-zinc-400 text-[11px] border-l border-white/10 pl-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:block text-[11px] text-zinc-400 pr-2">
            <span>{currentTime || "JKT // WIB"}</span>
          </div>

          {/* Equalizer Audio Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 border border-white/10 text-[10px] sm:text-[11px] uppercase tracking-wider transition-colors ${
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
            <span className="hidden sm:inline">{audioActive ? "AUDIO: ON" : "AUDIO: OFF"}</span>
            <span className="sm:hidden">{audioActive ? "ON" : "OFF"}</span>
          </button>

          {/* ATS Resume Modal Launcher */}
          <AtsResumeModule variant="header" />
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

      {/* Act 7: Contact & Transmission CTA */}
      <footer id="colophon" className="w-full bg-[#09090b] border-t border-white/10 py-16 px-6 md:px-12 text-[#f4f4f5]">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Main CTA Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src="/REVWORKS-LOGO.png"
                  alt="REVWORKS Emblem"
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain"
                />
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                  INITIATE TRANSMISSION // CONTACT &amp; COLLABORATION
                </p>
              </div>
              <h2 className="font-heading text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                Let&apos;s Build Something Exceptional.
              </h2>
              <p className="font-sans text-sm md:text-base text-zinc-400 mt-2 max-w-xl">
                Open for high-impact software engineering roles, enterprise fintech platforms, and cinematic digital collaborations.
              </p>
            </div>
            <div className="flex flex-col items-start md:items-end font-mono text-xs text-zinc-400 gap-3">
              <p className="text-emerald-400 font-semibold uppercase tracking-wider border border-emerald-500/20 px-2.5 py-1 rounded bg-emerald-500/5">
                ● STATUS: OPEN FOR COLLABORATION
              </p>
              <p>{personal.brandName} &bull; {personal.location}</p>
            </div>
          </div>

          {/* 3 Contact CTA Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            {/* Card 1: Direct Email */}
            <a
              href={`mailto:${personal.email}`}
              onClick={() => sound.playClick()}
              data-colophon-card
              className="border border-white/10 p-6 bg-[#121215] flex flex-col justify-between gap-4 hover:border-emerald-400/50 hover:bg-white/[0.04] transition-all group"
            >
              <div className="flex flex-col gap-2">
                <span className="text-zinc-500 uppercase text-[10px] tracking-wider group-hover:text-emerald-400 transition-colors">
                  [01] DIRECT EMAIL
                </span>
                <h3 className="font-heading font-bold text-base uppercase text-white group-hover:text-emerald-400 transition-colors">
                  Send A Message
                </h3>
                <p className="text-zinc-400 leading-relaxed text-[11px]">
                  Fastest route for engineering contracts, architecture inquiries, or project briefs.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-emerald-400 font-bold">
                <span className="truncate max-w-[200px]">{personal.email}</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </a>

            {/* Card 2: LinkedIn Network */}
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              data-colophon-card
              className="border border-white/10 p-6 bg-[#121215] flex flex-col justify-between gap-4 hover:border-emerald-400/50 hover:bg-white/[0.04] transition-all group"
            >
              <div className="flex flex-col gap-2">
                <span className="text-zinc-500 uppercase text-[10px] tracking-wider group-hover:text-emerald-400 transition-colors">
                  [02] PROFESSIONAL NETWORK
                </span>
                <h3 className="font-heading font-bold text-base uppercase text-white group-hover:text-emerald-400 transition-colors">
                  LinkedIn Connection
                </h3>
                <p className="text-zinc-400 leading-relaxed text-[11px]">
                  Connect for executive career opportunities, verified endorsements, and formal communications.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-emerald-400 font-bold">
                <span>in/mahendra-pujo-p</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </a>

            {/* Card 3: Code & Media Repositories */}
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              data-colophon-card
              className="border border-white/10 p-6 bg-[#121215] flex flex-col justify-between gap-4 hover:border-emerald-400/50 hover:bg-white/[0.04] transition-all group"
            >
              <div className="flex flex-col gap-2">
                <span className="text-zinc-500 uppercase text-[10px] tracking-wider group-hover:text-emerald-400 transition-colors">
                  [03] REPOSITORIES &amp; CODE LABS
                </span>
                <h3 className="font-heading font-bold text-base uppercase text-white group-hover:text-emerald-400 transition-colors">
                  GitHub Imprint
                </h3>
                <p className="text-zinc-400 leading-relaxed text-[11px]">
                  Inspect production commits, open-source repositories, and experimental WebGL prototypes.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-emerald-400 font-bold">
                <span>github.com/revwrks</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </a>
          </div>

          {/* Primary Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-[#121215] border border-white/10 gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">
                READY TO SHIP PRODUCTION-GRADE VALUE
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <a
                href={`mailto:${personal.email}`}
                onClick={() => sound.playClick()}
                className="px-5 py-2.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-emerald-400 transition-colors shadow-brutalist text-center"
              >
                INITIATE CONTACT &rarr;
              </a>
              <AtsResumeModule variant="button" />
            </div>
          </div>

          {/* Bottom Copyright & Quick Links */}
          <div className="flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-zinc-500 border-t border-white/10 pt-6 gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/REVWORKS-LOGO.png"
                alt="REVWORKS Logo"
                width={18}
                height={18}
                className="w-4 h-4 object-contain opacity-60 hover:opacity-100 transition-opacity"
              />
              <span>&copy; 2026 {personal.brandName}. ALL RIGHTS RESERVED.</span>
              <span className="hidden sm:inline">&bull;</span>
              <span className="hidden sm:inline">PURE CODE &bull; ZERO TRACKERS.</span>
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
