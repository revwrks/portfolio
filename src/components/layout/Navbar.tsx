"use client";

import React, { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Credentials", href: "#credentials" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <a
          href="#"
          className="group flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
          aria-label="Mahendra Pujo Prianto — Home"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
          <span className="font-mono text-sm sm:text-base font-bold tracking-tight text-zinc-100">
            mahendrapujo<span className="text-zinc-500">.dev</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="min-h-[44px] inline-flex items-center px-3.5 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors rounded-md hover:bg-zinc-800/50 focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com/mahendrapujo"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg border border-zinc-700 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-400" aria-hidden="true" />
          </a>
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
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-4 pt-3 pb-6 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] items-center px-4 py-3 rounded-lg text-base font-medium text-zinc-200 hover:bg-zinc-800 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="https://github.com/mahendrapujo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-zinc-800 px-4 py-3 text-base font-medium text-white border border-zinc-700"
            >
              <span>GitHub Profile</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
