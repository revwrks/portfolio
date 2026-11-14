"use client";

import React from "react";
import { motion } from "motion/react";
import { Terminal } from "lucide-react";

export function CardTerminalStream() {
  return (
    <div className="relative w-full h-24 overflow-hidden rounded-2xl bg-black/40 border border-[#2e2921] p-3 font-mono text-[10px] text-[#aba392] flex flex-col justify-between pointer-events-none select-none">
      {/* Mini header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-1 text-[#7a7265]">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3 h-3 text-[#d4af37]" />
          <span className="text-[#f7f4ec] font-bold">engine.transact.ts</span>
        </div>
        <span className="text-emerald-400">ACID 200 OK</span>
      </div>

      {/* Code lines */}
      <div className="space-y-1 text-[10px] pt-1">
        <div className="text-zinc-400 flex items-center gap-2 truncate">
          <span className="text-[#7a7265] flex-shrink-0">01</span>
          <span className="truncate">const ledger = await db.queue.process(job);</span>
        </div>
        <div className="text-[#d4af37] flex items-center gap-2 truncate">
          <span className="text-[#7a7265] flex-shrink-0">02</span>
          <span className="truncate">return verifyWebhookSignature(payload);</span>
          <span className="w-1.5 h-3 bg-[#d4af37] animate-pulse flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
