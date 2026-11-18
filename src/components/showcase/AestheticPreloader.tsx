"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { playTelemetryTick, playMechanicalClick } from "@/lib/sound";

interface AestheticPreloaderProps {
  onComplete?: () => void;
  brandTitle?: string;
  portraitSrc?: string;
}

/**
 * AESTHETIC TELEMETRY PRELOADER
 * Reverse-engineered from Photoyoshi (`.l-splash`) & Cappen (`preloader.js`).
 * Features colossal dual-layer split typography, bilateral viewfinder reticles,
 * 10ms high-speed numerical ticker, and architectural geometric clip-path framing.
 */
export const AestheticPreloader: React.FC<AestheticPreloaderProps> = ({
  onComplete,
  brandTitle = "REVWORKS",
  portraitSrc = "/rev.jpg",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleInRef = useRef<HTMLDivElement>(null);
  const titleOutRef = useRef<HTMLDivElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const bottomHudRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Initialize layers on mount: Layer 2 starts completely below the mask (+135%)
  useEffect(() => {
    if (titleOutRef.current) {
      gsap.set(titleOutRef.current.children, { yPercent: 135 });
    }
  }, []);

  // 1. High-Speed Numerical Ticker (Photoyoshi shuffleNumberCounter: +3 every 10ms)
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      if (current < 97) {
        current += 3;
        setCount(current);
        if (current % 12 === 0) {
          playTelemetryTick();
        }
      } else {
        clearInterval(interval);
        setCount(100);
        playMechanicalClick(1400);

        // 2. Play GSAP Exit Animation once loader reaches 100
        const tl = gsap.timeline({
          delay: 0.2,
          onComplete: () => {
            setIsDismissed(true);
            if (onCompleteRef.current) onCompleteRef.current();
          },
        });

        // Step A: Layer 1 slides UP completely out of view (-135% clears all tight leading overflow)
        if (titleInRef.current && titleOutRef.current) {
          tl.to(titleInRef.current.children, {
            yPercent: -135,
            duration: 0.55,
            ease: "power2.inOut",
            stagger: 0.02,
          });

          // Step B: Layer 2 rises from below with 0.1s delay relative to Layer 1
          tl.fromTo(
            titleOutRef.current.children,
            { yPercent: 135 },
            {
              yPercent: 0,
              duration: 0.55,
              ease: "power2.inOut",
              stagger: 0.02,
            },
            "<0.1"
          );
        }

        // Step C: Photo expands / lifts gently after typography settles
        if (photoWrapRef.current) {
          tl.to(
            photoWrapRef.current,
            {
              scale: 1.04,
              opacity: 0,
              duration: 0.55,
              ease: "power2.inOut",
            },
            "+=0.1",
          );
        }

        // Step D: Entire preloader dissolves into the site
        if (containerRef.current) {
          tl.to(
            containerRef.current,
            {
              opacity: 0,
              duration: 0.7,
              ease: "power2.inOut",
            },
            "-=0.25",
          );
        }
      }
    }, 10.101);

    return () => clearInterval(interval);
  }, []);

  if (isDismissed) return null;

  const characters = brandTitle.split("");

  return (
    <aside
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-[#ece8e1] text-[#1a1918] overflow-hidden flex flex-col justify-between p-6 md:p-12 select-none"
      style={{ willChange: "opacity" }}
      aria-label="Loading screen"
    >
      {/* Top Header: Colossal Split Typography */}
      <div className="w-full flex justify-center pt-2 md:pt-4 overflow-hidden">
        <h1 className="relative text-[16vw] md:text-[14vw] font-bold tracking-tight leading-[0.75] uppercase overflow-hidden">
          {/* Incoming Character Layer */}
          <div
            ref={titleInRef}
            className="flex items-center justify-center overflow-hidden"
          >
            {characters.map((char, i) => (
              <span
                key={`in-${i}`}
                className="inline-block transform-gpu transition-transform"
              >
                {char}
              </span>
            ))}
          </div>

          {/* Outgoing Mask Layer */}
          <div
            ref={titleOutRef}
            className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
          >
            {characters.map((char, i) => (
              <span key={`out-${i}`} className="inline-block transform-gpu">
                {char}
              </span>
            ))}
          </div>
        </h1>
      </div>

      {/* Middle Section: Centered Framed Portrait with Bilateral Reticles */}
      <div className="relative w-full flex items-center justify-between my-auto px-4 md:px-16">
        {/* Left Reticle Crosshair */}
        <div className="hidden md:flex flex-col items-center gap-2 text-[#736f68]">
          <span className="mono-hud text-[10px] tracking-widest">[SYS_01]</span>
          <div className="relative w-6 h-6 flex items-center justify-center">
            <span className="absolute w-full h-[1px] bg-[#1a1918]/30" />
            <span className="absolute h-full w-[1px] bg-[#1a1918]/30" />
          </div>
          <span className="mono-hud text-[9px] text-[#736f68]/70">CALIB</span>
        </div>

        {/* Centered Profile Picture */}
        <div
          ref={photoWrapRef}
          className="relative mx-auto w-[240px] md:w-[320px] aspect-[576/746] overflow-hidden border border-[#1a1918]/15 bg-[#e0dbd0] shadow-2xl"
          style={{ willChange: "transform, opacity" }}
        >
          <Image
            src={portraitSrc}
            alt="Rev Profile Focus"
            fill
            priority
            sizes="(max-width: 768px) 240px, 320px"
            className="object-cover grayscale contrast-110"
          />
          <div className="absolute inset-0 border border-white/20 pointer-events-none" />
        </div>

        {/* Right Reticle Crosshair */}
        <div className="hidden md:flex flex-col items-center gap-2 text-[#736f68]">
          <span className="mono-hud text-[10px] tracking-widest">[SYS_02]</span>
          <div className="relative w-6 h-6 flex items-center justify-center">
            <span className="absolute w-full h-[1px] bg-[#1a1918]/30" />
            <span className="absolute h-full w-[1px] bg-[#1a1918]/30" />
          </div>
          <span className="mono-hud text-[9px] text-[#736f68]/70">READY</span>
        </div>
      </div>

      {/* Bottom 3-Column HUD */}
      <div
        ref={bottomHudRef}
        className="w-full flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#1a1918]/15 pt-4 text-xs"
      >
        {/* Left Column: Katakana Technical Badge */}
        <div className="w-full md:w-1/3 text-left">
          <span className="mono-hud text-[10px] font-bold text-[#1a1918]/80 bg-[#1a1918]/5 px-2 py-1 rounded-sm border border-[#1a1918]/10">
            フルスタックエンジニア [•] REVWORKS
          </span>
        </div>

        {/* Center Column: Editorial Bio Statement */}
        <div className="w-full md:w-1/3 text-center">
          <p className="font-sans text-[11px] md:text-xs text-[#736f68] leading-relaxed">
            Rev — Senior Fullstack Architect &amp; Creative Technologist.
          </p>
        </div>

        {/* Right Column: 10ms High-Speed Telemetry Ticker */}
        <div className="w-full md:w-1/3 text-right">
          <span className="font-mono text-2xl md:text-3xl font-bold tracking-tighter text-[#1a1918]">
            {count.toString().padStart(3, "0")}
            <span className="text-xs text-[#736f68] ml-1 font-normal">%</span>
          </span>
        </div>
      </div>
    </aside>
  );
};
