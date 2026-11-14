"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolio";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Layers, Sparkles, Terminal, Video } from "lucide-react";

export function FlagshipProjects() {
  const [activeTab, setActiveTab] = useState<"featured" | "all" | "engineering" | "creative">("featured");

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (activeTab === "featured") return p.featured;
    if (activeTab === "all") return true;
    return p.category === activeTab;
  });

  return (
    <section id="projects" className="py-14 md:py-18 border-b border-zinc-850/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-wider mb-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" aria-hidden="true" />
              <span>REVWORKS PRODUCTION ARCHIVE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Selected Works & Systems
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 max-w-2xl">
              Production architectures cherry-picked from real-world operations — from financial webhook ledgers and in-browser canvas engines to multi-camera concert direction.
            </p>
          </div>

          {/* Composable Category Filter Pills */}
          <div
            className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg border border-zinc-800 bg-zinc-900/80 self-start md:self-auto"
            role="tablist"
            aria-label="Filter works by category"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "featured"}
              onClick={() => setActiveTab("featured")}
              className={`min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
                activeTab === "featured"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Featured</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "all"}
              onClick={() => setActiveTab("all")}
              className={`min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
                activeTab === "all"
                  ? "bg-zinc-800 text-white shadow-sm border border-zinc-700"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Layers className="w-3.5 h-3.5" aria-hidden="true" />
              <span>All ({PORTFOLIO_DATA.projects.length})</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "engineering"}
              onClick={() => setActiveTab("engineering")}
              className={`min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
                activeTab === "engineering"
                  ? "bg-zinc-800 text-white shadow-sm border border-zinc-700"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Engineering (4)</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "creative"}
              onClick={() => setActiveTab("creative")}
              className={`min-h-[44px] inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
                activeTab === "creative"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Video className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Creative (2)</span>
            </button>
          </div>
        </div>

        {/* Projects Grid (Compact & High Density) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {filteredProjects.map((project: Project) => (
            <ProjectCard key={project.id}>
              <div>
                <ProjectCard.Header
                  title={project.title}
                  category={project.category}
                  tagline={project.tagline}
                />
                <ProjectCard.Metrics metrics={project.metrics} />
                <ProjectCard.Highlights highlights={project.highlights} />
              </div>

              <div>
                <ProjectCard.Tags tags={project.techStack} />
                <ProjectCard.Actions links={project.links} title={project.title} />
              </div>
            </ProjectCard>
          ))}
        </div>

        {/* Quick Toggle Helper */}
        {activeTab === "featured" && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/60 text-xs font-mono text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors"
            >
              <span>Explore all {PORTFOLIO_DATA.projects.length} works in archive</span>
              <Layers className="w-3.5 h-3.5 text-blue-400" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
