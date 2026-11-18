"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { playShutterWhoosh } from "@/lib/sound";

interface ShutterPageTransitionProps {
  isTransitioning?: boolean;
  onTransitionComplete?: () => void;
  brandText?: string;
}

/**
 * 7-BAR CINEMATIC SHUTTER PAGE TRANSITION
 * Reverse-engineered directly from Pantheon Media Group (`layout-ae05fae713302377.js`).
 * Expands 7 horizontal bars outward from the screen center on exit,
 * and collapses them toward the outer margins on entrance.
 */
export const ShutterPageTransition: React.FC<ShutterPageTransitionProps> = ({
  isTransitioning = false,
  onTransitionComplete,
  brandText = "REVWORKS",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  const runShutterWipe = useCallback(() => {
    setIsActive(true);
    playShutterWhoosh();

    const tl = gsap.timeline({
      onComplete: () => {
        setIsActive(false);
        if (onTransitionComplete) onTransitionComplete();
      },
    });

    const validRows = rowsRef.current.filter(Boolean) as HTMLDivElement[];

    // 1. Shutter Close: Expand bars from center row outwards
    tl.set(containerRef.current, { pointerEvents: "all", autoAlpha: 1 });
    tl.fromTo(
      validRows,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.55,
        ease: "power2.inOut",
        stagger: {
          amount: 0.3,
          from: "center",
        },
      }
    );

    // 2. Center Brand Monogram Pop
    if (logoRef.current) {
      tl.fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.7)" },
        "-=0.25"
      );
      tl.to(
        logoRef.current,
        { scale: 1.05, opacity: 0, duration: 0.25, ease: "power2.in" },
        "+=0.2"
      );
    }

    // 3. Shutter Open: Collapse bars toward outer margins
    tl.to(
      validRows,
      {
        scaleX: 0,
        duration: 0.55,
        ease: "power2.inOut",
        stagger: {
          amount: 0.3,
          from: "edges",
        },
      },
      "-=0.1"
    );

    tl.set(containerRef.current, { pointerEvents: "none", autoAlpha: 0 });
  }, [onTransitionComplete]);

  useEffect(() => {
    if (isTransitioning) {
      runShutterWipe();
    }
  }, [isTransitioning, runShutterWipe]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[9999] pointer-events-none overflow-hidden ${
        isActive ? "visible" : "invisible opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* 7 Horizontal Shutter Bars */}
      <div className="w-full h-full flex flex-col justify-between">
        {Array.from({ length: 7 }).map((_, idx) => (
          <div
            key={idx}
            ref={(el) => {
              rowsRef.current[idx] = el;
            }}
            className="w-full bg-[#18181b] border-y border-[rgba(255,255,255,0.06)]"
            style={{
              height: "14.35vh",
              transform: "scaleX(0)",
              transformOrigin: "50% 50%",
              willChange: "transform",
            }}
          />
        ))}
      </div>

      {/* Center Logo Brand Reveal */}
      <div
        ref={logoRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none opacity-0"
      >
        <span className="mono-hud text-xs text-emerald-400 tracking-[0.3em] mb-1">
          [ SYSTEM ROUTE SWITCH ]
        </span>
        <h2 className="text-3xl font-bold tracking-[0.25em] text-white uppercase font-sans">
          {brandText}
        </h2>
        <div className="w-12 h-[1px] bg-white/30 mt-3" />
      </div>
    </div>
  );
};
