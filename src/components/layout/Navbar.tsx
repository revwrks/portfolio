"use client";

import React, { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Works", href: "#projects" },
    { label: "Credentials", href: "#credentials" },
    { label: "Experience", href: "#experience" },
    { label: "Stack", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        
        {/* Revworks Studio Brand */}
        <a
          href="#"
          className="group flex items-center gap-2.5 focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
          aria-label="REVWORKS by Rev — Home"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="text-base sm:text-lg font-black tracking-tight text-white">
              REVWORKS
            </span>
            <span className="text-xs text-zinc-500 font-semibold tracking-wider">
              // REV
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="min-h-[44px] inline-flex items-center px-3 py-2 text-xs font-mono font-medium text-zinc-300 hover:text-white transition-colors rounded-md hover:bg-zinc-800/50 focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {link.label}
            </a>
          ))}

          <div className="h-4 w-px bg-zinc-800 mx-2" aria-hidden="true" />

          {/* Social Icons Header */}
          <div className="flex items-center gap-1">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800/50"
              aria-label="GitHub profile @revwrks"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center p-2 text-zinc-400 hover:text-pink-400 transition-colors rounded-lg hover:bg-zinc-800/50"
              aria-label="Instagram profile @itzrevv"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center p-2 text-zinc-400 hover:text-blue-400 transition-colors rounded-lg hover:bg-zinc-800/50"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          </div>
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg p-2 text-zinc-300 hover:bg-zinc-800 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center px-4 py-2.5 rounded-lg text-sm font-mono text-zinc-200 hover:bg-zinc-800 hover:text-white"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-3 border-t border-zinc-850 flex items-center justify-around">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center gap-2 text-xs font-mono text-zinc-300 py-2 px-3"
            >
              <GithubIcon className="w-4 h-4" />
              <span>@revwrks</span>
            </a>
            <a
              href={PORTFOLIO_DATA.personal.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center gap-2 text-xs font-mono text-zinc-300 py-2 px-3"
            >
              <InstagramIcon className="w-4 h-4 text-pink-400" />
              <span>@itzrevv</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
