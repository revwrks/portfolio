"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX, Music, AlertCircle } from "lucide-react";
import { playUiClick } from "@/lib/audio";
import { useToast } from "@/components/ui/Toast";

export function BackgroundAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSynthMode, setIsSynthMode] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthNodesRef = useRef<{ ctx: AudioContext; gain: GainNode } | null>(null);
  const { showToast } = useToast();

  // Gentle ambient chord synth fallback when no MP3 is placed yet
  const startSynthDrone = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2); // Soft ambient volume

      // Warm ambient frequencies (Dmaj9 chord: D3, A3, F#4, C#5)
      const freqs = [146.83, 220.0, 369.99, 554.37];
      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const oscGain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800, ctx.currentTime);

        oscGain.gain.setValueAtTime(0.25, ctx.currentTime);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
      });

      masterGain.connect(ctx.destination);
      synthNodesRef.current = { ctx, gain: masterGain };
      setIsSynthMode(true);
    } catch {
      // AudioContext unavailable or restricted
    }
  }, []);

  const stopSynthDrone = useCallback(() => {
    if (synthNodesRef.current) {
      const { ctx, gain } = synthNodesRef.current;
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      setTimeout(() => {
        ctx.close();
        synthNodesRef.current = null;
        setIsSynthMode(false);
      }, 700);
    }
  }, []);

  const togglePlay = () => {
    playUiClick(700);

    if (isPlaying) {
      // Stop playback
      if (audioRef.current && !hasError && !isSynthMode) {
        audioRef.current.pause();
      }
      if (isSynthMode) {
        stopSynthDrone();
      }
      setIsPlaying(false);
    } else {
      // Start playback
      if (audioRef.current && !hasError) {
        audioRef.current.volume = 0.4;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasError(false);
          })
          .catch(() => {
            // File not found or failed, fallback to ambient synth
            setHasError(true);
            startSynthDrone();
            setIsPlaying(true);
            showToast("BGM file belum ada di public/audio/bgm.mp3. Memutar ambient synth pad ✨");
          });
      } else {
        // Fallback to ambient synth
        startSynthDrone();
        setIsPlaying(true);
        showToast("BGM file belum ada di public/audio/bgm.mp3. Memutar ambient synth pad ✨");
      }
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (synthNodesRef.current) {
        synthNodesRef.current.ctx.close();
      }
    };
  }, []);

  return (
    <>
      {/* Hidden HTML5 Audio Element pointing to public/audio/bgm.mp3 */}
      <audio
        ref={audioRef}
        src="/audio/bgm.mp3"
        loop
        preload="metadata"
        onError={() => setHasError(true)}
      />

      {/* Floating Audio Player Capsule in Bottom Right Corner */}
      <div 
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="hidden sm:flex absolute bottom-full right-0 mb-3 px-3.5 py-1.5 rounded-xl bg-[#161411]/95 border border-[#d4af37]/40 text-[#f7f4ec] font-mono text-[11px] whitespace-nowrap shadow-xl backdrop-blur-md items-center gap-2 pointer-events-none"
            >
              <Music className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>
                {isPlaying 
                  ? (isSynthMode ? "Ambient Synth Loop (Drop bgm.mp3 anytime)" : "Now Playing · Click to Pause")
                  : "Play Background Music"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={togglePlay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className={`flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border transition-all duration-300 shadow-2xl backdrop-blur-xl ${
            isPlaying
              ? "bg-[#161411]/95 border-[#d4af37] shadow-[#d4af37]/25 text-[#f7f4ec]"
              : "bg-[#161411]/80 border-[#2e2921] hover:border-[#d4af37]/60 text-[#aba392] hover:text-[#f7f4ec]"
          }`}
          aria-label={isPlaying ? "Pause background music" : "Play background music"}
        >
          {/* Animated 4-Bar Equalizer Waveform */}
          <div className="flex items-end gap-0.5 h-3.5 w-3.5">
            {[40, 90, 60, 100].map((height, i) => (
              <motion.span
                key={i}
                animate={
                  isPlaying
                    ? {
                        height: [`${height * 0.3}%`, `${height}%`, `${height * 0.4}%`],
                      }
                    : { height: "25%" }
                }
                transition={
                  isPlaying
                    ? {
                        duration: 0.6 + i * 0.12,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: i * 0.08,
                      }
                    : { duration: 0.3 }
                }
                className={`w-0.5 rounded-full transition-colors ${
                  isPlaying ? "bg-[#d4af37]" : "bg-[#7a7265]"
                }`}
              />
            ))}
          </div>

          {/* Label & Status */}
          <div className="flex items-center gap-1.5 font-mono text-xs">
            <span className="font-bold tracking-wider uppercase text-[10px]">
              {isPlaying ? (isSynthMode ? "AMBIENT" : "BGM") : "SOUND"}
            </span>
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isPlaying ? "bg-emerald-400 animate-pulse" : "bg-[#7a7265]"
              }`}
            />
          </div>

          {/* Volume Icon */}
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-[#d4af37]" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#7a7265]" />
          )}
        </motion.button>
      </div>
    </>
  );
}
