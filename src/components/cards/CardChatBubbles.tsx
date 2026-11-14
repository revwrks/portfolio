"use client";

import React from "react";
import { motion } from "motion/react";

export function CardChatBubbles() {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -4 },
  };

  const dotTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut" as const,
  };

  return (
    <div className="relative w-full h-24 overflow-hidden flex flex-col justify-center items-end gap-2 pr-1 pointer-events-none select-none">
      {/* Bubble 1: Champagne Brass / Warm Gold */}
      <motion.div
        initial={{ opacity: 0, x: 24, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 220, damping: 20 }}
        className="bg-gradient-to-r from-[#d4af37] to-[#e8cb74] text-zinc-950 rounded-2xl rounded-tr-xs px-3.5 py-2 shadow-lg shadow-[#d4af37]/20 flex items-center gap-1.5"
      >
        <motion.div
          className="w-1.5 h-1.5 bg-zinc-950/80 rounded-full"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...dotTransition, delay: 0 }}
        />
        <motion.div
          className="w-1.5 h-1.5 bg-zinc-950/80 rounded-full"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...dotTransition, delay: 0.15 }}
        />
        <motion.div
          className="w-1.5 h-1.5 bg-zinc-950/80 rounded-full"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...dotTransition, delay: 0.3 }}
        />
      </motion.div>

      {/* Bubble 2: Emerald Green (Indented to the left) */}
      <motion.div
        initial={{ opacity: 0, x: 24, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 220, damping: 20 }}
        className="bg-emerald-500/90 text-white rounded-2xl rounded-tr-xs px-3.5 py-2 shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 mr-4"
      >
        <motion.div
          className="w-1.5 h-1.5 bg-white/90 rounded-full"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...dotTransition, delay: 0 }}
        />
        <motion.div
          className="w-1.5 h-1.5 bg-white/90 rounded-full"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...dotTransition, delay: 0.15 }}
        />
        <motion.div
          className="w-1.5 h-1.5 bg-white/90 rounded-full"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...dotTransition, delay: 0.3 }}
        />
      </motion.div>

      {/* Bubble 3: Royal Blue / Accent */}
      <motion.div
        initial={{ opacity: 0, x: 24, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ delay: 1.3, type: "spring", stiffness: 220, damping: 20 }}
        className="bg-blue-600/90 text-white rounded-2xl rounded-tr-xs px-3.5 py-1.5 shadow-lg shadow-blue-500/20 flex items-center gap-1.5"
      >
        <motion.div
          className="w-1.5 h-1.5 bg-white/90 rounded-full"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...dotTransition, delay: 0 }}
        />
        <motion.div
          className="w-1.5 h-1.5 bg-white/90 rounded-full"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...dotTransition, delay: 0.15 }}
        />
        <motion.div
          className="w-1.5 h-1.5 bg-white/90 rounded-full"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...dotTransition, delay: 0.3 }}
        />
      </motion.div>
    </div>
  );
}
