"use client";

import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, ShieldCheck, Award } from "lucide-react";

export function CardCredentialsBadges() {
  const floatTransition = (delay: number) => ({
    y: {
      duration: 2.4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut" as const,
      delay,
    },
  });

  return (
    <div className="relative w-full h-24 overflow-hidden flex items-center justify-center gap-3 px-2 pointer-events-none select-none">
      {/* Badge 1: Meta */}
      <motion.div
        animate={{ y: [-3, 3] }}
        transition={floatTransition(0)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-950/40 border border-blue-500/40 shadow-lg shadow-blue-500/10 text-blue-300 font-mono text-[11px]"
      >
        <span className="w-2 h-2 rounded-full bg-blue-400" />
        <span className="font-bold">Meta</span>
        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
      </motion.div>

      {/* Badge 2: Google (Center, Gold Highlight) */}
      <motion.div
        animate={{ y: [3, -4] }}
        transition={floatTransition(0.4)}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/50 shadow-xl shadow-[#d4af37]/15 text-[#f7f4ec] font-mono text-xs scale-105"
      >
        <Award className="w-4 h-4 text-[#d4af37]" />
        <span className="font-bold">Google UX</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
      </motion.div>

      {/* Badge 3: IBM */}
      <motion.div
        animate={{ y: [-2, 3] }}
        transition={floatTransition(0.8)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 shadow-lg shadow-indigo-500/10 text-indigo-300 font-mono text-[11px]"
      >
        <span className="w-2 h-2 rounded-full bg-indigo-400" />
        <span className="font-bold">IBM AI</span>
        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
      </motion.div>
    </div>
  );
}
