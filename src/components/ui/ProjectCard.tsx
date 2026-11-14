import React from "react";
import { ExternalLink, Sparkles, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface ProjectCardProps {
  children: React.ReactNode;
  className?: string;
}

export function ProjectCard({ children, className = "" }: ProjectCardProps) {
  return (
    <article
      className={`group relative flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 md:p-6 backdrop-blur-sm transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/70 ${className}`}
    >
      {children}
    </article>
  );
}

export function ProjectCardHeader({
  title,
  category,
  tagline,
}: {
  title: string;
  category: "engineering" | "creative";
  tagline: string;
}) {
  return (
    <header className="mb-3">
      <div className="flex items-center justify-between gap-3 mb-2">
        <span
          className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-mono font-medium rounded border ${
            category === "engineering"
              ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
              : "border-purple-500/30 bg-purple-500/10 text-purple-400"
          }`}
        >
          {category === "engineering" ? (
            <Terminal className="w-3 h-3" aria-hidden="true" />
          ) : (
            <Sparkles className="w-3 h-3" aria-hidden="true" />
          )}
          {category === "engineering" ? "ENGINEERING" : "CREATIVE DIRECTION"}
        </span>
      </div>
      <h3 className="text-lg md:text-xl font-bold tracking-tight text-zinc-100 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="mt-1.5 text-xs md:text-sm text-zinc-300 leading-relaxed font-normal">
        {tagline}
      </p>
    </header>
  );
}

export function ProjectCardMetrics({ metrics }: { metrics: string[] }) {
  if (!metrics || metrics.length === 0) return null;
  return (
    <div className="my-3 flex flex-wrap gap-2 pt-2.5 border-t border-zinc-800/60">
      {metrics.map((metric, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 bg-zinc-950/70 rounded px-2.5 py-1 border border-zinc-800/60"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" aria-hidden="true" />
          <span>{metric}</span>
        </span>
      ))}
    </div>
  );
}

export function ProjectCardHighlights({ highlights }: { highlights: string[] }) {
  if (!highlights || highlights.length === 0) return null;
  return (
    <ul className="my-2.5 space-y-1.5 text-xs text-zinc-400 list-disc list-outside pl-4 leading-relaxed">
      {highlights.map((item, idx) => (
        <li key={idx} className="marker:text-zinc-600">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProjectCardTags({ tags }: { tags: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5 pt-3 border-t border-zinc-800/60" aria-label="Technologies used">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-block px-2 py-0.5 text-[11px] font-mono text-zinc-400 bg-zinc-800/50 rounded border border-zinc-700/50"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export function ProjectCardActions({
  links,
  title,
}: {
  links: { live?: string; github?: string; demo?: string };
  title: string;
}) {
  return (
    <footer className="mt-4 flex flex-wrap items-center gap-2.5 pt-3 border-t border-zinc-800/60">
      {links.live && (
        <a
          href={links.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:ring-2 focus-visible:ring-blue-400"
          aria-label={`View live deployment for ${title}`}
        >
          <span>Live Deployment</span>
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      )}
      {links.github && (
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/80 px-3.5 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-700/80 focus-visible:ring-2 focus-visible:ring-blue-400"
          aria-label={`View source code for ${title} on GitHub`}
        >
          <GithubIcon className="h-3.5 w-3.5" />
          <span>Source Code</span>
        </a>
      )}
    </footer>
  );
}

ProjectCard.Header = ProjectCardHeader;
ProjectCard.Metrics = ProjectCardMetrics;
ProjectCard.Highlights = ProjectCardHighlights;
ProjectCard.Tags = ProjectCardTags;
ProjectCard.Actions = ProjectCardActions;
