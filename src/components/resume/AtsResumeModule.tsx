"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/sound";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export default function AtsResumeModule() {
  const [isOpen, setIsOpen] = useState(false);
  const { personal, skills, projects, experience, education, certifications } = PORTFOLIO_DATA;

  const handleOpen = () => {
    setIsOpen(true);
    sound.playClick();
  };

  const handleClose = () => {
    setIsOpen(false);
    sound.playClick();
  };

  const handlePrint = () => {
    sound.playClick();
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

  return (
    <>
      {/* Trigger Button in UI */}
      <button
        onClick={handleOpen}
        className="px-4 py-2 border border-hairline bg-surface-card hover:bg-foreground hover:text-background font-mono text-xs uppercase tracking-wider transition-all duration-200 shadow-brutalist flex items-center gap-2 group"
      >
        <span className="w-2 h-2 bg-accent rounded-full group-hover:bg-background transition-colors" />
        <span>ATS RESUME [HARVARD STANDARD]</span>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md overflow-y-auto"
        >
          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-white text-zinc-900 shadow-2xl border border-zinc-300 p-8 md:p-12 my-8 rounded-none"
          >
            {/* Modal Actions Header (Hidden when printed) */}
            <div className="print:hidden flex items-center justify-between pb-6 mb-8 border-b border-zinc-200 font-mono text-xs text-zinc-600">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 bg-emerald-600 rounded-full" />
                <span className="font-bold tracking-wider uppercase text-zinc-800">
                  ATS-COMPLIANT PLAIN RESUME // 1-COLUMN HARVARD STANDARD
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="px-4 py-1.5 bg-zinc-900 text-white font-mono text-xs uppercase tracking-wider hover:bg-zinc-700 transition-colors"
                >
                  PRINT / SAVE PDF
                </button>
                <button
                  onClick={handleClose}
                  className="px-3 py-1.5 border border-zinc-300 text-zinc-700 font-mono text-xs uppercase hover:bg-zinc-100 transition-colors"
                >
                  CLOSE [ESC]
                </button>
              </div>
            </div>

            {/* ATS Resume Content */}
            <div className="ats-resume font-sans text-zinc-900 leading-normal max-w-3xl mx-auto">
              {/* Header */}
              <div className="text-center pb-4 border-b border-zinc-900 mb-6">
                <h1 className="text-3xl font-serif font-bold tracking-tight text-zinc-900 uppercase">
                  {personal.name}
                </h1>
                <p className="text-xs font-mono font-semibold text-zinc-800 mt-1 uppercase tracking-widest">
                  {personal.role} &bull; {personal.brandName}
                </p>
                <p className="text-xs font-mono text-zinc-600 mt-1.5">
                  {personal.location} &bull; {personal.email} &bull; {personal.github} &bull; {personal.linkedin}
                </p>
              </div>

              {/* Professional Summary */}
              <div className="mb-6">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
                  Professional Summary
                </h2>
                <p className="text-sm text-zinc-800 leading-relaxed">
                  {personal.bio}
                </p>
              </div>

              {/* Core Competencies */}
              <div className="mb-6">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
                  Technical Skills &amp; Competencies
                </h2>
                <div className="space-y-1 text-xs font-mono text-zinc-800">
                  <div>&bull; <strong>Backend &amp; Architecture:</strong> {skills.backend.join(", ")}</div>
                  <div>&bull; <strong>Databases &amp; Ledgers:</strong> {skills.databases.join(", ")}</div>
                  <div>&bull; <strong>Frontend &amp; Graphics:</strong> {skills.frontend.join(", ")}</div>
                  <div>&bull; <strong>Creative &amp; Design:</strong> {skills.creativeDesign.join(", ")}</div>
                  <div>&bull; <strong>DevOps &amp; Infrastructure:</strong> {skills.devOpsAndTools.join(", ")}</div>
                </div>
              </div>

              {/* Professional Experience */}
              <div className="mb-6">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-3">
                  Professional Experience
                </h2>

                {experience.map((exp, idx) => (
                  <div key={idx} className="mb-4">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-bold text-zinc-900">
                        {exp.role} &bull; {exp.company}
                      </h3>
                      <span className="text-xs font-mono text-zinc-600">{exp.period}</span>
                    </div>
                    <p className="text-xs italic text-zinc-700 mb-1">{exp.location} &bull; {exp.type}</p>
                    <ul className="list-disc list-outside ml-4 text-xs text-zinc-800 space-y-1">
                      {exp.highlights.map((h, hIdx) => (
                        <li key={hIdx}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Featured Engineering Projects */}
              <div className="mb-6">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-3">
                  Selected Production Projects
                </h2>

                {projects.slice(0, 3).map((proj) => (
                  <div key={proj.id} className="mb-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-bold text-zinc-900">
                        {proj.title}
                      </h3>
                      <span className="text-xs font-mono text-zinc-600">{proj.techStack.slice(0, 4).join(", ")}</span>
                    </div>
                    <p className="text-xs text-zinc-700 mt-0.5">{proj.description}</p>
                    <p className="text-[11px] font-mono text-zinc-600 mt-0.5">
                      <strong>Key Invariants:</strong> {proj.metrics.join(" | ")}
                    </p>
                  </div>
                ))}
              </div>

              {/* Education & Certifications */}
              <div className="mb-4">
                <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-300 pb-1 mb-2">
                  Education &amp; Credentials
                </h2>
                <div className="space-y-2 text-xs text-zinc-800">
                  {education.map((edu, idx) => (
                    <div key={idx} className="flex justify-between items-baseline">
                      <span><strong>{edu.degree} in {edu.field}</strong> &bull; {edu.institution}</span>
                      <span className="font-mono text-zinc-600">{edu.period}</span>
                    </div>
                  ))}
                  <div>
                    <strong>Professional Certifications:</strong>{" "}
                    {certifications.map((c) => c.name).join(", ")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
