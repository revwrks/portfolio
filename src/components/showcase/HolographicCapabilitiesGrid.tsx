"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { sound } from "@/lib/sound";
import { PORTFOLIO_DATA } from "@/data/portfolio";

interface Capability {
  index: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  status: string;
}

const CAPABILITIES: Capability[] = [
  {
    index: "01",
    title: "Backend Engines & Asynchronous Webhooks",
    category: "CORE BACKEND",
    description: "Architecting resilient asynchronous webhook receivers, idempotency validation gates, and low-latency transaction mutations.",
    stack: PORTFOLIO_DATA.skills.backend,
    metrics: [
      { label: "Webhook P99", value: "< 8ms" },
      { label: "Idempotency", value: "Zero Duplicates" },
      { label: "Job Processing", value: "Async Queued" },
    ],
    status: "PRODUCTION PROVEN",
  },
  {
    index: "02",
    title: "Databases & Double-Entry Ledgers",
    category: "DATA INTEGRITY",
    description: "Rigorous relational schema design, ACID financial ledger mutations, and high-performance indexing across large datasets.",
    stack: PORTFOLIO_DATA.skills.databases,
    metrics: [
      { label: "ACID Ledger", value: "Strict Double-Entry" },
      { label: "Consistency", value: "Row-Level Locks" },
      { label: "Schema Design", value: "Optimized Indices" },
    ],
    status: "TRANSACTION SAFE",
  },
  {
    index: "03",
    title: "Modern Frontend & Canvas Graphics",
    category: "CLIENT ARCHITECTURE",
    description: "Building responsive web interfaces, hardware-accelerated HTML5 canvas studios, and procedural Web Audio synthesizers.",
    stack: PORTFOLIO_DATA.skills.frontend,
    metrics: [
      { label: "Canvas FPS", value: "60 Locked" },
      { label: "Audio Latency", value: "0ms External" },
      { label: "Bundle Size", value: "Zero Bloat" },
    ],
    status: "INTERACTIVE NATIVE",
  },
  {
    index: "04",
    title: "Creative Direction & UX Systems",
    category: "DESIGN & MEDIA",
    description: "Bridging engineering rigor with certified human-centered UX design, cinematography, and commercial video direction.",
    stack: PORTFOLIO_DATA.skills.creativeDesign,
    metrics: [
      { label: "UX Certified", value: "Google Professional" },
      { label: "Media Showcase", value: "2-Hour Continuous" },
      { label: "Visual Fidelity", value: "Cinema Grade" },
    ],
    status: "CERTIFIED // LEAD",
  },
];

export default function HolographicCapabilitiesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeCard, setActiveCard] = useState<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // Phantom Land Interactive Point Cloud Grid Geometry
    const gridCols = 36;
    const gridRows = 24;
    const numPoints = gridCols * gridRows;
    const positions = new Float32Array(numPoints * 3);
    const originals = new Float32Array(numPoints * 3);

    let pIdx = 0;
    for (let i = 0; i < gridCols; i++) {
      for (let j = 0; j < gridRows; j++) {
        const x = (i - gridCols / 2) * 1.0;
        const y = (j - gridRows / 2) * 1.0;
        const z = 0;

        positions[pIdx * 3] = x;
        positions[pIdx * 3 + 1] = y;
        positions[pIdx * 3 + 2] = z;

        originals[pIdx * 3] = x;
        originals[pIdx * 3 + 1] = y;
        originals[pIdx * 3 + 2] = z;

        pIdx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x888888,
      size: 0.14,
      transparent: true,
      opacity: 0.35,
    });

    const pointCloud = new THREE.Points(geometry, pointsMaterial);
    scene.add(pointCloud);

    // Subtle Wireframe Plane
    const wireGeo = new THREE.PlaneGeometry(36, 24, 36, 24);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x555555,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    wireMesh.position.z = -1;
    scene.add(wireMesh);

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const mX = mouseRef.current.x;
      const mY = mouseRef.current.y;

      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      for (let k = 0; k < numPoints; k++) {
        const ox = originals[k * 3];
        const oy = originals[k * 3 + 1];

        const cursorWorldX = mX * 14;
        const cursorWorldY = mY * 10;
        const dist = Math.hypot(ox - cursorWorldX, oy - cursorWorldY);

        const influence = Math.max(0, 1 - dist / 8.5);
        const wave = Math.sin(time * 1.5 + ox * 0.4 + oy * 0.3) * 0.4;

        posArr[k * 3] = ox + mX * influence * 1.5;
        posArr[k * 3 + 1] = oy + mY * influence * 1.5;
        posArr[k * 3 + 2] = influence * 4.2 + wave;
      }

      posAttr.needsUpdate = true;

      wireMesh.rotation.x = mY * 0.1;
      wireMesh.rotation.y = mX * 0.12;
      pointCloud.rotation.x = mY * 0.08;
      pointCloud.rotation.y = mX * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      wireGeo.dispose();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen py-24 px-6 md:px-12 bg-background border-t border-hairline overflow-hidden"
      id="capabilities-grid"
    >
      {/* WebGL Point Cloud Canvas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-hairline pb-6 gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                ACT 05 // SYSTEM CAPABILITIES
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 border border-hairline uppercase text-muted">
                HOLOGRAPHIC GRID
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-black uppercase tracking-tight text-foreground mt-2">
              Technical Core &amp; Engineering Breadth
            </h2>
          </div>

          <div className="font-mono text-xs text-muted flex items-center gap-6">
            <div>
              <span className="text-foreground font-bold">4 DOMAINS</span> SPECIFIED
            </div>
            <div>
              <span className="text-foreground font-bold">100% AUTHENTIC</span> REPO DATA
            </div>
          </div>
        </div>

        {/* 2x2 Architectural Hairline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-hairline bg-background/80 backdrop-blur-sm shadow-brutalist">
          {CAPABILITIES.map((cap, idx) => {
            const isActive = activeCard === idx;
            return (
              <div
                key={cap.index}
                data-cap-card
                onMouseEnter={() => {
                  setActiveCard(idx);
                  sound.playTick();
                }}
                className={`relative p-8 md:p-10 border-b md:border-b-0 ${
                  idx % 2 === 0 ? "md:border-r border-hairline" : ""
                } ${idx < 2 ? "md:border-b border-hairline" : ""} transition-all duration-300 group cursor-pointer ${
                  isActive ? "bg-surface-card/60" : "hover:bg-surface-hover/30"
                }`}
              >
                {/* Corner reticle markers */}
                <span className="absolute top-2 left-2 font-mono text-[10px] text-muted opacity-40 group-hover:opacity-100 transition-opacity">
                  +
                </span>
                <span className="absolute top-2 right-2 font-mono text-[10px] text-muted opacity-40 group-hover:opacity-100 transition-opacity">
                  +
                </span>

                {/* Top Telemetry Row */}
                <div className="flex items-center justify-between font-mono text-xs mb-6">
                  <span className="text-sm font-bold text-foreground">[{cap.index}]</span>
                  <span className="px-2.5 py-0.5 border border-hairline text-muted uppercase text-[10px] tracking-wider">
                    {cap.category}
                  </span>
                  <span className="text-[10px] font-mono text-muted group-hover:text-foreground transition-colors">
                    {cap.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-xl md:text-2xl font-bold uppercase tracking-tight text-foreground mb-4 group-hover:translate-x-1 transition-transform">
                  {cap.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs md:text-sm text-muted leading-relaxed mb-6">
                  {cap.description}
                </p>

                {/* Metrics Matrix */}
                <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-hairline my-6 font-mono text-xs">
                  {cap.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col">
                      <span className="text-[10px] uppercase text-muted tracking-wider">{m.label}</span>
                      <span className="font-bold text-foreground mt-0.5">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5">
                  {cap.stack.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 bg-surface-card border border-hairline font-mono text-[11px] text-foreground/80 group-hover:border-foreground/40 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Bottom Active Indicator Line */}
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-foreground transition-all duration-300 ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Grid Footer Telemetry & Sub-Bass Soundboard Trigger */}
        <div className="flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-muted border-t border-hairline pt-6 gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-foreground" />
            <span>DISPLACEMENT ALGORITHM: PHANTOM LAND GLSL UV WARPING</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => sound.playDrone(2.5)}
              className="px-3 py-1.5 border border-hairline hover:border-foreground hover:text-foreground transition-colors uppercase font-mono"
            >
              TRIGGER 55Hz SUB-BASS DRONE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
