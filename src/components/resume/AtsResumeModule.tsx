"use client";

import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { sound } from "@/lib/sound";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import {
  FileText,
  Printer,
  Copy,
  Check,
  Download,
  X,
  Code2,
  ExternalLink,
} from "lucide-react";

interface AtsResumeModuleProps {
  className?: string;
  variant?: "header" | "button";
}

export default function AtsResumeModule({
  className = "",
  variant = "header",
}: AtsResumeModuleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"document" | "raw">("document");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener("open-ats-resume", handleOpenEvent);
    return () => window.removeEventListener("open-ats-resume", handleOpenEvent);
  }, []);

  const { personal, skills, projects, experience, education, certifications } =
    PORTFOLIO_DATA;

  const handleOpen = () => {
    setIsOpen(true);
    try {
      sound.playClick();
    } catch {
      // safe fallback
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    try {
      sound.playClick();
    } catch {
      // safe fallback
    }
  };

  // Generate deterministic standard single-column plain text ATS resume
  const plainTextResume = useMemo(() => {
    const divider = "============================================================";
    const subDivider = "------------------------------------------------------------";

    return `${personal.name.toUpperCase()}
${personal.role.toUpperCase()} // ${personal.brandName}
Location: ${personal.location}
Email: ${personal.email}
LinkedIn: ${personal.linkedin}
GitHub: ${personal.github}
Portfolio: https://revworks.dev

${divider}
PROFESSIONAL SUMMARY
${divider}
${personal.bio}

${divider}
CORE TECHNICAL COMPETENCIES
${divider}
* Backend & Architecture: ${skills.backend.join(", ")}
* Databases & Ledgers:   ${skills.databases.join(", ")}
* Frontend & Graphics:   ${skills.frontend.join(", ")}
* Creative & UX Design:  ${skills.creativeDesign.join(", ")}
* DevOps & Tooling:      ${skills.devOpsAndTools.join(", ")}

${divider}
PROFESSIONAL EXPERIENCE
${divider}
${experience
  .map(
    (exp) => `${exp.role.toUpperCase()} | ${exp.company.toUpperCase()}
${exp.period} | ${exp.location} (${exp.type})
${subDivider}
${exp.highlights.map((h) => `* ${h}`).join("\n")}
Skills: ${exp.skills.join(", ")}
`
  )
  .join("\n")}
${divider}
SELECTED PRODUCTION PROJECTS
${divider}
${projects
  .map(
    (proj) => `${proj.title.toUpperCase()} [${proj.category.toUpperCase()}]
${proj.tagline}
Stack: ${proj.techStack.join(", ")}
Invariants: ${proj.metrics.join(" | ")}
* ${proj.description}
${proj.highlights.map((h) => `* ${h}`).join("\n")}
`
  )
  .join("\n")}
${divider}
EDUCATION & CREDENTIALS
${divider}
${education
  .map(
    (edu) => `* ${edu.degree} in ${edu.field}
  ${edu.institution} (${edu.period})`
  )
  .join("\n")}

PROFESSIONAL CERTIFICATIONS:
${certifications
  .map((cert) => `* ${cert.name} - Issued by ${cert.issuer} (${cert.issueDate})`)
  .join("\n")}
`;
  }, [personal, skills, experience, projects, education, certifications]);

  // Copy plain text to clipboard
  const handleCopyText = async () => {
    sound.playClick();
    try {
      await navigator.clipboard.writeText(plainTextResume);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = plainTextResume;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  // Download .TXT file
  const handleDownloadTxt = () => {
    sound.playClick();
    const blob = new Blob([plainTextResume], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Mahendra_Pujo_Prianto_ATS_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Print to PDF
  const handlePrint = () => {
    try {
      sound.playClick();
    } catch {}
    window.print();
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const modalJSX = (
    <div
      onClick={handleClose}
      className="ats-modal-backdrop fixed inset-0 z-[999999] flex items-start justify-center p-2 sm:p-4 md:p-8 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="ATS Resume Viewer"
    >
      {/* Modal Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="ats-resume-sheet relative w-full max-w-4xl bg-white text-zinc-900 shadow-2xl border border-zinc-200 p-4 sm:p-8 md:p-12 my-2 sm:my-6 rounded-none cursor-default"
      >
        {/* Modal Actions Header (Hidden when printed) */}
        <div className="print:hidden pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-zinc-200">
              {/* Row 1: Title & Close */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 bg-emerald-600 rounded-full" />
                  <span className="font-mono font-bold text-[11px] sm:text-xs tracking-wider uppercase text-zinc-800">
                    ATS-COMPLIANT RESUME // 1-COLUMN
                  </span>
                </div>
                <button
                  onClick={handleClose}
                  className="p-1.5 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors rounded"
                  title="Close [Esc]"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Row 2: Action Buttons (Responsive Grid/Flex) */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 font-mono text-[11px]">
                {/* View Switcher Tabs */}
                <div className="flex items-center border border-zinc-300 rounded overflow-hidden">
                  <button
                    onClick={() => {
                      setViewMode("document");
                      sound.playClick();
                    }}
                    className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors ${
                      viewMode === "document"
                        ? "bg-zinc-900 text-white font-bold"
                        : "bg-white text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>DOCUMENT VIEW</span>
                  </button>
                  <button
                    onClick={() => {
                      setViewMode("raw");
                      sound.playClick();
                    }}
                    className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors border-l border-zinc-300 ${
                      viewMode === "raw"
                        ? "bg-zinc-900 text-white font-bold"
                        : "bg-white text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>RAW ATS TEXT</span>
                  </button>
                </div>

                {/* Primary Export Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Copy Plain Text */}
                  <button
                    onClick={handleCopyText}
                    className={`px-3 py-1.5 flex items-center gap-1.5 border transition-all ${
                      copied
                        ? "bg-emerald-600 text-white border-emerald-600 font-bold"
                        : "border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100"
                    }`}
                    title="Copy plain text formatted for job application inputs"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-600" />
                        <span>COPY TEXT</span>
                      </>
                    )}
                  </button>

                  {/* Download .TXT */}
                  <button
                    onClick={handleDownloadTxt}
                    className="px-3 py-1.5 flex items-center gap-1.5 border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100 transition-colors"
                    title="Download .TXT resume"
                  >
                    <Download className="w-3.5 h-3.5 text-zinc-600" />
                    <span>DOWNLOAD .TXT</span>
                  </button>

                  {/* Print / Save PDF */}
                  <button
                    onClick={handlePrint}
                    className="px-3.5 py-1.5 flex items-center gap-1.5 bg-zinc-900 text-white hover:bg-zinc-700 transition-colors font-bold shadow-sm"
                    title="Print or save as PDF"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>PRINT / PDF</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Resume Content View */}
            {viewMode === "raw" ? (
              /* Raw Plain Text Mode */
              <div className="relative font-mono text-[11px] sm:text-xs text-zinc-800 bg-zinc-50 border border-zinc-300 p-4 sm:p-6 overflow-x-auto whitespace-pre leading-relaxed select-all">
                {plainTextResume}
              </div>
            ) : (
              /* Formatted Standard 1-Column ATS Document View */
              <div className="ats-resume font-sans text-zinc-900 leading-normal max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center pb-4 border-b-2 border-zinc-900 mb-6">
                  <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-zinc-900 uppercase">
                    {personal.name}
                  </h1>
                  <p className="text-xs sm:text-sm font-mono font-semibold text-zinc-800 mt-1 uppercase tracking-widest">
                    {personal.role} &bull; {personal.brandName}
                  </p>
                  <p className="text-[11px] sm:text-xs font-mono text-zinc-600 mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                    <span>{personal.location}</span>
                    <span>&bull;</span>
                    <a
                      href={`mailto:${personal.email}`}
                      className="text-zinc-900 underline hover:text-emerald-700"
                    >
                      {personal.email}
                    </a>
                    <span>&bull;</span>
                    <a
                      href={personal.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-900 underline hover:text-emerald-700 inline-flex items-center gap-0.5"
                    >
                      <span className="print:hidden">LinkedIn</span>
                      <span className="hidden print:inline">linkedin.com/in/mahendra-pujo-p</span>
                      <ExternalLink className="w-2.5 h-2.5 inline print:hidden" />
                    </a>
                    <span>&bull;</span>
                    <a
                      href={personal.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-900 underline hover:text-emerald-700 inline-flex items-center gap-0.5"
                    >
                      <span className="print:hidden">GitHub</span>
                      <span className="hidden print:inline">github.com/revwrks</span>
                      <ExternalLink className="w-2.5 h-2.5 inline print:hidden" />
                    </a>
                  </p>
                </div>

                {/* Professional Summary */}
                <section className="mb-6">
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
                    Professional Summary
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed font-sans">
                    {personal.bio}
                  </p>
                </section>

                {/* Core Competencies */}
                <section className="mb-6">
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
                    Technical Skills &amp; Core Competencies
                  </h2>
                  <div className="space-y-1.5 text-xs font-mono text-zinc-800">
                    <div>
                      &bull; <strong>Backend &amp; Architecture:</strong>{" "}
                      {skills.backend.join(", ")}
                    </div>
                    <div>
                      &bull; <strong>Databases &amp; Ledgers:</strong>{" "}
                      {skills.databases.join(", ")}
                    </div>
                    <div>
                      &bull; <strong>Frontend &amp; Graphics:</strong>{" "}
                      {skills.frontend.join(", ")}
                    </div>
                    <div>
                      &bull; <strong>Creative &amp; UX Design:</strong>{" "}
                      {skills.creativeDesign.join(", ")}
                    </div>
                    <div>
                      &bull; <strong>DevOps &amp; Infrastructure:</strong>{" "}
                      {skills.devOpsAndTools.join(", ")}
                    </div>
                  </div>
                </section>

                {/* Professional Experience */}
                <section className="mb-6">
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-3">
                    Professional Experience
                  </h2>

                  <div className="space-y-4">
                    {experience.map((exp, idx) => (
                      <div key={idx} className="break-inside-avoid">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5">
                          <h3 className="text-xs sm:text-sm font-bold text-zinc-900">
                            {exp.role} &bull; {exp.company}
                          </h3>
                          <span className="text-[11px] font-mono text-zinc-600">
                            {exp.period}
                          </span>
                        </div>
                        <p className="text-[11px] italic text-zinc-600 mb-1.5">
                          {exp.location} &bull; {exp.type}
                        </p>
                        <ul className="list-disc list-outside ml-4 text-xs text-zinc-800 space-y-1">
                          {exp.highlights.map((h, hIdx) => (
                            <li key={hIdx}>{h}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Featured Engineering Projects */}
                <section className="mb-6">
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-3">
                    Selected Production Projects
                  </h2>

                  <div className="space-y-3.5">
                    {projects.slice(0, 4).map((proj) => (
                      <div key={proj.id} className="break-inside-avoid">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5">
                          <h3 className="text-xs sm:text-sm font-bold text-zinc-900">
                            {proj.title}
                          </h3>
                          <span className="text-[11px] font-mono text-zinc-600">
                            {proj.techStack.slice(0, 4).join(", ")}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-700 mt-0.5 font-sans">
                          {proj.description}
                        </p>
                        <p className="text-[11px] font-mono text-emerald-800 mt-0.5">
                          <strong>Verified Invariants:</strong>{" "}
                          {proj.metrics.join(" | ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Education & Certifications */}
                <section className="mb-4 break-inside-avoid">
                  <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
                    Education &amp; Credentials
                  </h2>
                  <div className="space-y-2 text-xs text-zinc-800">
                    {education.map((edu, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-0.5"
                      >
                        <span>
                          <strong>
                            {edu.degree} in {edu.field}
                          </strong>{" "}
                          &bull; {edu.institution}
                        </span>
                        <span className="font-mono text-zinc-600 text-[11px]">
                          {edu.period}
                        </span>
                      </div>
                    ))}
                    <div className="pt-1">
                      <strong>Professional Certifications:</strong>{" "}
                      {certifications.map((c) => c.name).join(", ")}
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
  );

  return (
    <>
      {/* Trigger Button in UI */}
      {variant === "header" ? (
        <button
          onClick={handleOpen}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 border border-white/10 bg-white/5 hover:bg-white hover:text-black font-mono text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-200 text-zinc-300 ${className}`}
          title="Open ATS-Compliant Plain Resume"
          aria-label="Open ATS-Compliant Plain Resume"
        >
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          <span>
            <span className="hidden sm:inline">ATS </span>RESUME
          </span>
        </button>
      ) : (
        <button
          onClick={handleOpen}
          className={`px-4 sm:px-5 py-2 border border-white/20 bg-white/5 hover:bg-emerald-400 hover:text-black hover:border-emerald-400 text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${className}`}
        >
          <FileText className="w-3.5 h-3.5 text-emerald-400" />
          <span>ATS RESUME (PDF / TXT)</span>
        </button>
      )}

      {/* Render Modal into document.body via Portal to bypass any parent stacking contexts */}
      {mounted && isOpen && createPortal(modalJSX, document.body)}
    </>
  );
}
