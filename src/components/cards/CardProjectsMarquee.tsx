"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Gamepad2, 
  Sparkles, 
  HeartPulse, 
  Navigation, 
  Film, 
  Radio 
} from "lucide-react";

interface ProjectIcon {
  name: string;
  category: string;
  gradient: string;
  icon: React.ElementType;
  borderColor: string;
}

const PROJECT_ICONS: ProjectIcon[] = [
  {
    name: "TopUp Store",
    category: "Fintech",
    gradient: "from-amber-500 via-orange-500 to-amber-700",
    borderColor: "border-amber-400/40",
    icon: Gamepad2,
  },
  {
    name: "Scentora",
    category: "Perfumery",
    gradient: "from-purple-500 via-violet-600 to-indigo-700",
    borderColor: "border-purple-400/40",
    icon: Sparkles,
  },
  {
    name: "Klinik Pratama",
    category: "Healthcare",
    gradient: "from-emerald-500 via-teal-600 to-emerald-800",
    borderColor: "border-emerald-400/40",
    icon: HeartPulse,
  },
  {
    name: "Vehicle Tracker",
    category: "Telematics",
    gradient: "from-cyan-500 via-blue-600 to-indigo-700",
    borderColor: "border-cyan-400/40",
    icon: Navigation,
  },
  {
    name: "Nusa Indah Media",
    category: "Creative Film",
    gradient: "from-yellow-500 via-amber-600 to-yellow-800",
    borderColor: "border-yellow-400/40",
    icon: Film,
  },
  {
    name: "GKJW Live Stream",
    category: "Broadcast",
    gradient: "from-rose-500 via-red-600 to-rose-800",
    borderColor: "border-rose-400/40",
    icon: Radio,
  },
];

// Tripled list for true seamless infinite loop
const MARQUEE_LIST = [...PROJECT_ICONS, ...PROJECT_ICONS, ...PROJECT_ICONS];

export function CardProjectsMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div 
      className="relative w-full overflow-hidden py-3 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Side gradient blur masks for luxury depth */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#161411] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#161411] to-transparent z-10 pointer-events-none" />

      {/* Infinite running track via motion/react 60fps transform */}
      <motion.div 
        className="flex gap-3 w-max"
        animate={{ x: isPaused ? undefined : ["0%", "-33.333%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 12,
            ease: "linear",
          },
        }}
      >
        {MARQUEE_LIST.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.name}-${idx}`}
              className="group/item relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl p-[1px] transition-transform duration-200 hover:scale-115 cursor-pointer shadow-lg shadow-black/50"
            >
              {/* Outer border glow */}
              <div
                className={`w-full h-full rounded-2xl bg-gradient-to-br ${item.gradient} p-0.5 border ${item.borderColor} flex flex-col items-center justify-center relative overflow-hidden`}
              >
                {/* Glossy top reflection */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-2xl pointer-events-none" />

                <Icon className="w-6 h-6 text-white drop-shadow-md relative z-10 transition-transform duration-200 group-hover/item:scale-110" />

                {/* Micro tooltip pill on hover */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-black/95 border border-[#d4af37]/40 text-[9px] font-mono text-[#f7f4ec] whitespace-nowrap opacity-0 group-hover/item:opacity-100 transition-opacity duration-150 pointer-events-none z-20 shadow-md">
                  {item.name}
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
