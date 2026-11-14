"use client";

import React from "react";
import { motion } from "motion/react";
import { Radio } from "lucide-react";

export function CardAudioWaveform() {
  const bars = [35, 65, 90, 45, 80, 55, 95, 40, 70, 85, 30, 75, 60, 90, 50, 80];

  return (
    <div className="relative w-full h-24 overflow-hidden flex flex-col justify-center px-4 pointer-events-none select-none">
      {/* Top Status Ticker */}
      <div className="flex items-center justify-between text-[10px] font-mono text-[#aba392] mb-3">
        <div className="flex items-center gap-1.5 text-rose-400">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span className="font-bold tracking-wider uppercase">GKJW LIVE · 1080P60</span>
        </div>
        <span className="text-[#7a7265]">5+ YRS STEWARDSHIP</span>
      </div>

      {/* Dynamic Animated Equalizer Bars */}
      <div className="flex items-end justify-between h-9 gap-1">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            animate={{
              height: [`${Math.max(15, height * 0.25)}%`, `${height}%`, `${Math.max(20, height * 0.4)}%`],
            }}
            transition={{
              duration: 0.8 + (i % 5) * 0.15,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: (i * 0.05),
            }}
            className="flex-1 rounded-full bg-gradient-to-t from-[#d4af37]/40 via-[#d4af37] to-[#f7f4ec]"
          />
        ))}
      </div>
    </div>
  );
}
