"use client";

import React from "react";
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

// Tripled list for true seamless continuous loop
const MARQUEE_LIST = [...PROJECT_ICONS, ...PROJECT_ICONS, ...PROJECT_ICONS];

export function CardProjectsMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-3 select-none pointer-events-none">
      {/* Side gradient blur masks for luxury depth */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#161411] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#161411] to-transparent z-10 pointer-events-none" />

      {/* Unstoppable infinite running track via motion/react 60fps transform */}
      <motion.div 
        className="flex gap-3 w-max"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 14,
          ease: "linear",
        }}
      >
        {MARQUEE_LIST.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.name}-${idx}`}
              className="relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl p-[1px] shadow-lg shadow-black/50"
            >
              {/* Outer border glow & squircle */}
              <div
                className={`w-full h-full rounded-2xl bg-gradient-to-br ${item.gradient} p-0.5 border ${item.borderColor} flex items-center justify-center relative overflow-hidden`}
              >
                {/* Glossy top reflection */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-2xl pointer-events-none" />

                <Icon className="w-6 h-6 text-white drop-shadow-md relative z-10" />
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
