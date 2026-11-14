"use client";

import React, { useState } from "react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolio";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Layers, Terminal, Video } from "lucide-react";

export function FlagshipProjects() {
  const [activeCategory, setActiveCategory] = useState<"all" | "engineering" | "creative">("all");

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (activeCategory === "all") return true;
    return p.category === activeCategory;
  });

  return (
    <section id="projects" className="py-20 border-b border-zinc-850/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" aria-hidden="true" />
              <span>Production Work & Direction</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Flagship Engineering & Projects
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-2xl">
              Production architectures cherry-picked from real-world operations — from financial webhook ledgers and in-browser canvas engines to multi-camera concert direction.
            </p>
          </div>

          {/* Composable Category Filter Pills */}
          <div
            className="flex items-center gap-1.5 p-1 rounded-lg border border-zinc-800 bg-zinc-900/80 self-start md:self-auto"
            role="tablist"
            aria-label="Filter projects by category"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
              className={`min-h-[44px] inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md transition-colors ${
                activeCategory === "all"
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
              aria-selected={activeCategory === "engineering"}
              onClick={() => setActiveCategory("engineering")}
              className={`min-h-[44px] inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md transition-colors ${
                activeCategory === "engineering"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Engineering (4)</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === "creative"}
              onClick={() => setActiveCategory("creative")}
              className={`min-h-[44px] inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-md transition-colors ${
                activeCategory === "creative"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Video className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Creative (2)</span>
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((project: Project) => (
            <ProjectCard key={project.id}>
              <div>
                <ProjectCard.Header
                  title={project.title}
                  category={project.category}
                  tagline={project.tagline}
                />
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mt-2">
                  {project.description}
                </p>
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

      </div>
    </section>
  );
}
