"use client";

import React, { useEffect } from "react";
import { playUiClick } from "@/lib/audio";
import { LayoutGrid, BookOpen, Layers } from "lucide-react";

export type ThemeKey = "bento" | "editorial" | "spatial";

interface ThemeSwitcherProps {
  currentTheme: ThemeKey;
  onThemeChange: (theme: ThemeKey) => void;
}

export function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "1") {
        playUiClick(700);
        onThemeChange("bento");
      } else if (e.key === "2") {
        playUiClick(700);
        onThemeChange("editorial");
      } else if (e.key === "3") {
        playUiClick(700);
        onThemeChange("spatial");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onThemeChange]);

  const themes: { key: ThemeKey; num: string; label: string; icon: React.ElementType }[] = [
    { key: "bento", num: "1", label: "Stone Bento", icon: LayoutGrid },
    { key: "editorial", num: "2", label: "Luxe Editorial", icon: BookOpen },
    { key: "spatial", num: "3", label: "Spatial Glass", icon: Layers },
  ];

  return (
    <nav
      aria-label="Theme comparison switcher"
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-1 p-1.5 rounded-full border border-zinc-700/80 bg-zinc-950/85 backdrop-blur-2xl shadow-2xl font-mono text-xs text-zinc-300"
    >
      <span className="hidden sm:inline-block px-2 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
        Theme Mode:
      </span>
      {themes.map((t) => {
        const Icon = t.icon;
        const isActive = currentTheme === t.key;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => {
              playUiClick(isActive ? 600 : 850);
              onThemeChange(t.key);
            }}
            className={`min-h-[38px] flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
              isActive
                ? "bg-zinc-100 text-zinc-950 shadow-md font-bold scale-[1.03]"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/80"
            }`}
            title={`Switch to ${t.label} (Press ${t.num})`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{t.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
              isActive ? "bg-zinc-300 text-zinc-900" : "bg-zinc-800 text-zinc-400"
            }`}>
              {t.num}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
