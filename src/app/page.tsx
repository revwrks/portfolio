"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BentoTheme } from "@/components/themes/BentoTheme";
import { EditorialTheme } from "@/components/themes/EditorialTheme";
import { SpatialTheme } from "@/components/themes/SpatialTheme";
import { ThemeSwitcher, ThemeKey } from "@/components/themes/ThemeSwitcher";

function PortfolioShowcase() {
  const searchParams = useSearchParams();
  const themeParam = searchParams.get("theme") as ThemeKey | null;

  // Default to Editorial (Theme 2) as requested by user, or URL param/localStorage
  const [theme, setTheme] = useState<ThemeKey>("editorial");

  useEffect(() => {
    if (themeParam && ["bento", "editorial", "spatial"].includes(themeParam)) {
      setTheme(themeParam);
    } else {
      const savedTheme = localStorage.getItem("rev_theme_choice") as ThemeKey | null;
      if (savedTheme && ["bento", "editorial", "spatial"].includes(savedTheme)) {
        setTheme(savedTheme);
      }
    }
  }, [themeParam]);

  const handleThemeChange = (newTheme: ThemeKey) => {
    setTheme(newTheme);
    try {
      localStorage.setItem("rev_theme_choice", newTheme);
      const url = new URL(window.location.href);
      url.searchParams.set("theme", newTheme);
      window.history.replaceState({}, "", url.toString());
    } catch {
      // Ignore in non-standard environments
    }
  };

  return (
    <>
      {theme === "bento" && <BentoTheme />}
      {theme === "editorial" && <EditorialTheme />}
      {theme === "spatial" && <SpatialTheme />}

      {/* Floating Interactive Theme Switcher */}
      <ThemeSwitcher currentTheme={theme} onThemeChange={handleThemeChange} />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090b] flex items-center justify-center font-mono text-xs text-zinc-500">Loading REVWORKS Studio...</div>}>
      <PortfolioShowcase />
    </Suspense>
  );
}
