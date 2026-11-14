"use client";

import React, { useEffect, useState } from "react";
import { Activity, Clock, Volume2, VolumeX, Wifi, Zap } from "lucide-react";
import { isSoundEnabled, playUiClick, toggleSound } from "@/lib/audio";

export function StudioTelemetry() {
  const [timeStr, setTimeStr] = useState<string>("");
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [latency] = useState<number>(18);

  useEffect(() => {
    setSoundOn(isSoundEnabled());

    const updateClock = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("id-ID", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }) + " WIB"
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) {
      playUiClick(1000);
    }
  };

  return (
    <div className="rounded-xl border border-zinc-800 bg-[#0e0e14] p-3.5 font-mono text-[11px] text-zinc-400 shadow-sm">
      <div className="flex items-center justify-between pb-2.5 border-b border-zinc-800 mb-2.5">
        <span className="text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 font-bold text-[10px]">
          <Activity className="w-3.5 h-3.5 text-lime-400" />
          <span>REVWORKS TELEMETRY</span>
        </span>
        <button
          type="button"
          onClick={handleSoundToggle}
          className={`px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 transition-all ${
            soundOn
              ? "bg-lime-400/10 text-lime-400 border border-lime-400/30 font-bold"
              : "bg-zinc-800/80 text-zinc-500 border border-zinc-700"
          }`}
          title={soundOn ? "Mute tactile UI clicks" : "Unmute tactile UI clicks"}
        >
          {soundOn ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
          <span>{soundOn ? "SFX: ON" : "SFX: OFF"}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 text-zinc-300">
        <div className="flex items-center gap-1.5">
          <Clock className="w-3 h-3 text-zinc-500 flex-shrink-0" />
          <span className="text-zinc-200">{timeStr || "17:38:00 WIB"}</span>
        </div>
        <div className="flex items-center gap-1.5 justify-end">
          <Wifi className="w-3 h-3 text-lime-400 flex-shrink-0" />
          <span>{latency}ms (Edge)</span>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-500">
        <span className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-blue-400" />
          <span>ASTファッション // ENGINE</span>
        </span>
        <span className="text-zinc-400 font-semibold">REACT 19.3</span>
      </div>
    </div>
  );
}
