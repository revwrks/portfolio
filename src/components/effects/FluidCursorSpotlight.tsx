"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

export function FluidCursorSpotlight() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.4 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only activate on pointer-fine devices (mouse/trackpad), not touch screens
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = target.closest("button, a, [role='button'], input, textarea, .cursor-pointer, [tabindex='0']");
        setIsHoveringClickable(!!isClickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Outer ambient golden aura */}
      <motion.div
        className="fixed rounded-full pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHoveringClickable ? 84 : 36,
          height: isHoveringClickable ? 84 : 36,
          background: isHoveringClickable 
            ? "radial-gradient(circle, rgba(212, 175, 55, 0.18) 0%, rgba(212, 175, 55, 0.04) 55%, transparent 75%)" 
            : "radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 65%)",
          border: isHoveringClickable ? "1px solid rgba(212, 175, 55, 0.4)" : "1px solid rgba(212, 175, 55, 0.18)",
          boxShadow: isHoveringClickable ? "0 0 24px rgba(212, 175, 55, 0.18)" : "none",
          transition: "width 0.22s ease-out, height 0.22s ease-out, background 0.22s ease-out, border 0.22s ease-out, box-shadow 0.22s ease-out",
        }}
      />
    </div>
  );
}
