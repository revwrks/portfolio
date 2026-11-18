"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { sound } from "@/lib/sound";

interface ArchitectureCardData {
  id: number;
  title: string;
  category: string;
  phase: string;
  gradient: [string, string];
  metric: string;
  summary: string;
}

const CARDS_DATA: ArchitectureCardData[] = [
  {
    id: 1,
    title: "Garuda TopUp Engine",
    category: "Fintech & SaaS",
    phase: "Asynchronous Webhooks",
    gradient: ["#1e293b", "#0f172a"],
    metric: "Sub-Second Webhooks",
    summary:
      "High-concurrency digital gaming & subscription vault with automated double-entry mutation ledgers and webhook idempotency.",
  },
  {
    id: 2,
    title: "Digi-Art Canvas Studio",
    category: "Creative Engineering",
    phase: "Canvas & Web Audio DSP",
    gradient: ["#312e81", "#1e1b4b"],
    metric: "0ms Audio Latency",
    summary:
      "In-browser touch-friendly illustration studio featuring procedural Web Audio synthesizer and Google Images API proxy.",
  },
  {
    id: 3,
    title: "Chorus Studio ERP",
    category: "Enterprise Software",
    phase: "Academic ERP & Batch PDF",
    gradient: ["#14532d", "#052e16"],
    metric: "-80% Admin Overhead",
    summary:
      "Comprehensive academy operations platform automating bulk PDF evaluation reports, backing track streaming, and audit trails.",
  },
  {
    id: 4,
    title: "Tamboer Gadget POS",
    category: "Systems Engineering",
    phase: "Retail POS & Hardware Stock",
    gradient: ["#7c2d12", "#431407"],
    metric: "Active Retail POS",
    summary:
      "Production point-of-sale platform managing real-time inventory deduction, technician hardware repair tracking, and margin analysis.",
  },
  {
    id: 5,
    title: "Chorus Concert 2026",
    category: "Cinematic Media",
    phase: "Multicam Video Direction",
    gradient: ["#581c87", "#3b0764"],
    metric: "2-Hour Continuous Show",
    summary:
      "Director and lead camera operator for a continuous 2-hour vocal showcase, executing stage blocking, lighting, and audio mastering.",
  },
  {
    id: 6,
    title: "Krida Dharma Choir Video",
    category: "Creative Production",
    phase: "Narrative Music Video",
    gradient: ["#831843", "#500724"],
    metric: "Award-Winning Choir",
    summary:
      "Directed and edited award-winning choral performance video, translating classical repertoire into narrative lighting and rhythm.",
  },
  {
    id: 7,
    title: "Wallet Mutation Ledger",
    category: "Distributed Systems",
    phase: "Double-Entry Balance Proof",
    gradient: ["#2d3748", "#171923"],
    metric: "Zero Balance Drift",
    summary:
      "Cryptographically verified transaction logging preventing race conditions and double-spending across concurrent payment webhooks.",
  },
  {
    id: 8,
    title: "Revworks Digital Lab",
    category: "Interactive 3D",
    phase: "Three.js & Audio DSP",
    gradient: ["#0f172a", "#020617"],
    metric: "60 FPS Locked",
    summary:
      "Reverse-engineered 8 brutalist archetypes with Three.js 3D isometric conveyor, shaders, and procedural audio synthesizer.",
  },
];

/**
 * Canvas-based high-res architectural card texture generator
 */
function createCardTexture(card: ArchitectureCardData): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const grad = ctx.createLinearGradient(0, 0, 768, 1024);
    grad.addColorStop(0, card.gradient[0]);
    grad.addColorStop(1, card.gradient[1]);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(0, 0, 768, 1024, 48);
    ctx.fill();

    // Architectural grid watermark overlay
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1.5;
    for (let x = 64; x < 768; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 48);
      ctx.lineTo(x, 976);
      ctx.stroke();
    }
    for (let y = 64; y < 1024; y += 64) {
      ctx.beginPath();
      ctx.moveTo(48, y);
      ctx.lineTo(720, y);
      ctx.stroke();
    }

    // Outer refined brutalist border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(4, 4, 760, 1016, 46);
    ctx.stroke();

    // Index number badge
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    ctx.font = "900 120px monospace";
    ctx.fillText(card.id < 10 ? `0${card.id}` : `${card.id}`, 64, 180);

    // Category / Discipline
    ctx.fillStyle = "rgba(236, 232, 225, 0.75)";
    ctx.font = "700 24px monospace";
    ctx.letterSpacing = "4px";
    ctx.fillText(card.category.toUpperCase(), 64, 250);

    // Divider line
    ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
    ctx.fillRect(64, 280, 180, 3);

    // Card Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 46px sans-serif";
    const words = card.title.split(" ");
    const line1 = words.slice(0, 2).join(" ");
    const line2 = words.slice(2).join(" ");
    ctx.fillText(line1, 64, 370);
    if (line2) ctx.fillText(line2, 64, 430);

    // Phase subtitle
    ctx.fillStyle = "rgba(236, 232, 225, 0.65)";
    ctx.font = "500 22px monospace";
    ctx.fillText(`PHASE // ${card.phase}`, 64, 520);

    // Summary text
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.font = "400 24px sans-serif";
    const summaryWords = card.summary.split(" ");
    let currentLine = "";
    let startY = 600;
    for (const w of summaryWords) {
      const testLine = currentLine ? `${currentLine} ${w}` : w;
      if (ctx.measureText(testLine).width > 620) {
        ctx.fillText(currentLine, 64, startY);
        startY += 38;
        currentLine = w;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) ctx.fillText(currentLine, 64, startY);

    // Bottom telemetry footer
    ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
    ctx.fillRect(48, 880, 672, 80);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(48, 880, 672, 80);

    ctx.fillStyle = "#ffffff";
    ctx.font = "700 22px monospace";
    ctx.fillText(`TELEMETRY: ${card.metric}`, 74, 930);

    // Corner reticles
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.strokeRect(48, 48, 16, 16);
    ctx.strokeRect(704, 960, 16, 16);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

export default function IsometricCardShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cardMeshesRef = useRef<THREE.Mesh[]>([]);

  // State for React UI
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  // Refs for 60fps render loop to avoid re-mounting Three.js
  const selectedCardIndexRef = useRef(0);
  const hoveredCardIndexRef = useRef<number | null>(null);
  const mouseRef = useRef(new THREE.Vector2(-1000, -1000));
  const raycasterRef = useRef(new THREE.Raycaster());

  // Synchronize refs with state
  useEffect(() => {
    selectedCardIndexRef.current = selectedCardIndex;
  }, [selectedCardIndex]);

  useEffect(() => {
    hoveredCardIndexRef.current = hoveredCardIndex;
  }, [hoveredCardIndex]);

  // Three.js Scene Setup (Mounts EXACTLY ONCE)
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Architectural isometric camera view: low FOV for axonometric rigor
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    const isMobile = width < 768;
    camera.position.set(0, 0, isMobile ? (width < 450 ? 16.5 : 14.0) : 10.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    rendererRef.current = renderer;

    // Atmospheric lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff5ea, 2.0);
    dirLight.position.set(8, 12, 10);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0x90b0d0, 1.2);
    backLight.position.set(-8, -6, -6);
    scene.add(backLight);

    // Create 16 Card Meshes
    const cardGeo = new THREE.PlaneGeometry(2.4, 3.2);
    const meshes: THREE.Mesh[] = [];

    CARDS_DATA.forEach((cardData, idx) => {
      const texture = createCardTexture(cardData);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.25,
        metalness: 0.1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      });

      const mesh = new THREE.Mesh(cardGeo, material);
      mesh.userData = { id: cardData.id, index: idx, title: cardData.title };
      scene.add(mesh);
      meshes.push(mesh);
    });

    cardMeshesRef.current = meshes;

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current)
        return;
      const w = containerRef.current.clientWidth;
      const h = window.innerHeight;
      cameraRef.current.aspect = w / h;
      const isMob = w < 768;
      cameraRef.current.position.z = isMob ? (w < 450 ? 16.5 : 14.0) : 10.5;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation & Physics Loop (Runs at 60fps)
    let animationFrameId: number;
    let targetProgress = 0;
    let currentProgress = 0;

    const renderLoop = () => {
      animationFrameId = requestAnimationFrame(renderLoop);

      // Smooth progress lerp
      currentProgress += (targetProgress - currentProgress) * 0.08;

      // Raycasting for interactive hover
      if (cameraRef.current && sceneRef.current) {
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
        const intersects = raycasterRef.current.intersectObjects(
          cardMeshesRef.current,
        );
        if (intersects.length > 0) {
          const topHit = intersects[0].object as THREE.Mesh;
          const hitIdx = topHit.userData.index;
          if (hitIdx !== undefined) {
            hoveredCardIndexRef.current = hitIdx;
            setHoveredCardIndex(hitIdx);
          }
        } else {
          if (hoveredCardIndexRef.current !== null) {
            hoveredCardIndexRef.current = null;
            setHoveredCardIndex(null);
          }
        }
      }

      // 6-stage Inkwell isometric fanning & gliding
      const p = currentProgress;
      const activeIdx = selectedCardIndexRef.current;
      const hovIdx = hoveredCardIndexRef.current;

      const tiltAmount = THREE.MathUtils.smoothstep(p, 0.12, 0.35);
      const fanAmount = THREE.MathUtils.smoothstep(p, 0.32, 0.75);
      const trackGliding = THREE.MathUtils.smoothstep(p, 0.65, 1.0);

      // Isometric rotation angles
      const targetRotX = THREE.MathUtils.lerp(0, 0.58, tiltAmount);
      const targetRotY = THREE.MathUtils.lerp(0, -0.74, tiltAmount);
      const targetRotZ = THREE.MathUtils.lerp(0, 0.38, tiltAmount);

      cardMeshesRef.current.forEach((mesh, idx) => {
        const isSelected = idx === activeIdx;
        const isHovered = idx === hovIdx;

        const stackZ = -idx * 0.035;

        // Fanned out diagonal displacement along vector (0.88, 0.44, -1.32)
        const fannedX = idx * 0.88;
        const fannedY = idx * 0.44;
        const fannedZ = -idx * 1.32;

        // Gliding offset so selected card stays centered in viewport
        const glideOffset = trackGliding * (activeIdx * 0.7);

        const currentX =
          (THREE.MathUtils.lerp(0, fannedX, fanAmount) - glideOffset) *
          tiltAmount;
        const currentY =
          (THREE.MathUtils.lerp(0, fannedY, fanAmount) - glideOffset * 0.5) *
          tiltAmount;
        const currentZ = THREE.MathUtils.lerp(stackZ, fannedZ, fanAmount);

        // Step 6: Interactive Selection Elevation (scaled by fanAmount so initial stack stays completely flush and straight)
        let elevationY = 0;
        let elevationZ = 0;
        let scaleTarget = 1.0;

        if (isSelected) {
          elevationY = 0.85 * fanAmount;
          elevationZ = 0.6 * fanAmount;
          scaleTarget = 1.0 + 0.06 * fanAmount;
        } else if (isHovered) {
          elevationY = 0.35 * fanAmount;
          elevationZ = 0.25 * fanAmount;
          scaleTarget = 1.0 + 0.02 * fanAmount;
        }

        mesh.position.x = currentX;
        mesh.position.y = currentY + elevationY;
        mesh.position.z = currentZ + elevationZ;

        // Keep rotation locked to isometric conveyor grid (no crooked angle on selected card)
        mesh.rotation.x = targetRotX;
        mesh.rotation.y = targetRotY;
        mesh.rotation.z = targetRotZ;

        mesh.scale.setScalar(scaleTarget);

        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.opacity = isSelected ? 1.0 : isHovered ? 0.95 : 0.82;
      });

      if (cameraRef.current) {
        cameraRef.current.position.x = THREE.MathUtils.lerp(
          0,
          -0.8,
          tiltAmount,
        );
        cameraRef.current.position.y = THREE.MathUtils.lerp(0, 0.4, tiltAmount);
      }

      renderer.render(scene, camera);
    };

    renderLoop();

    // Scroll Listener
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalDist = rect.height - windowHeight;
      if (totalDist > 0) {
        const scrolled = -rect.top;
        const rawProgress = Math.max(0, Math.min(1, scrolled / totalDist));
        targetProgress = rawProgress;
        setScrollProgress(rawProgress);

        // Auto-glide through cards during stage 5-6 scroll
        if (rawProgress > 0.65) {
          const activeIndex = Math.min(
            CARDS_DATA.length - 1,
            Math.floor(((rawProgress - 0.65) / 0.35) * (CARDS_DATA.length - 1)),
          );
          if (activeIndex !== selectedCardIndexRef.current) {
            selectedCardIndexRef.current = activeIndex;
            setSelectedCardIndex(activeIndex);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      renderer.dispose();
    };
  }, []);

  // Pointer Move for Raycasting
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    mouseRef.current.set(x, y);
  };

  // Card Click (Selection Elevation + Audio Feedback)
  const handleCanvasClick = () => {
    if (hoveredCardIndexRef.current !== null) {
      const idx = hoveredCardIndexRef.current;
      selectedCardIndexRef.current = idx;
      setSelectedCardIndex(idx);
      sound.playCardClick();
    }
  };

  const handleSelectCard = useCallback((idx: number) => {
    selectedCardIndexRef.current = idx;
    setSelectedCardIndex(idx);
    sound.playCardClick();
  }, []);

  const activeCard = CARDS_DATA[selectedCardIndex] || CARDS_DATA[0];

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[300vh] bg-[#09090b] text-[#f4f4f5]"
      id="architecture-showcase"
    >
      {/* Sticky Fullscreen 3D Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between p-3 sm:p-6 md:p-12 pointer-events-none">
        {/* Top Header Telemetry & Stage Indicators */}
        <div className="flex items-start justify-between w-full z-20 pointer-events-auto border-b border-white/10 pb-3 sm:pb-4">
          <div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-zinc-400">
                ACT 03 // PROJECT SHOWCASE
              </p>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl md:text-4xl font-extrabold uppercase mt-0.5 sm:mt-1 tracking-tight text-white">
              Production Projects
            </h2>
          </div>

          {/* Scrub Track & Stage Telemetry */}
          <div className="hidden md:flex flex-col items-end gap-1.5 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-4">
              <span>
                STEP:{" "}
                {scrollProgress < 0.2
                  ? "01/06 (FLAT DECK)"
                  : scrollProgress < 0.4
                    ? "02/06 (ISOMETRIC TILT)"
                    : scrollProgress < 0.7
                      ? "03-04/06 (FANNING TRACK)"
                      : "05-06/06 (ACTIVE SELECTION)"}
              </span>
              <span className="text-white font-bold">
                {(scrollProgress * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-48 h-1 bg-white/10 border border-white/10 overflow-hidden rounded-full">
              <div
                className="h-full bg-white transition-all duration-75"
                style={{ width: `${Math.max(4, scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Three.js WebGL Canvas */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
          <canvas
            ref={canvasRef}
            onPointerMove={handlePointerMove}
            onClick={handleCanvasClick}
            className="w-full h-full cursor-grab active:cursor-grabbing block"
          />
        </div>

        {/* Bottom Interactive HUD & Inkwell Pill Selector */}
        <div className="relative z-20 pointer-events-auto w-full max-w-4xl mx-auto flex flex-col items-center gap-2 sm:gap-3 text-center pb-1 sm:pb-2">
          {/* Main Selected Card Telemetry Display */}
          <div className="transition-all duration-300 transform">
            <p className="font-mono text-[9px] sm:text-[11px] uppercase tracking-widest text-emerald-400 mb-0.5">
              PAST PRODUCTION PROJECT // {activeCard.phase}
            </p>
            <h3 className="font-heading text-lg sm:text-2xl md:text-4xl font-black uppercase tracking-tight text-white line-clamp-1">
              {activeCard.title}
            </h3>
          </div>

          {/* Interactive Phase Selector Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3">
            <button
              onClick={() =>
                handleSelectCard(Math.max(0, selectedCardIndex - 1))
              }
              disabled={selectedCardIndex === 0}
              className="px-2.5 sm:px-3 py-1 rounded-full border border-white/20 font-mono text-[10px] sm:text-xs hover:border-white disabled:opacity-30 transition-colors text-white"
            >
              PREV
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 rounded-full border-2 border-white bg-[#121215] shadow-lg">
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white text-black font-mono text-[10px] sm:text-xs font-bold flex items-center justify-center">
                {activeCard.id}
              </span>
              <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">
                {activeCard.title}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 font-mono text-xs text-zinc-400">
              <span>METRIC:</span>
              <span className="text-white font-bold">{activeCard.metric}</span>
            </div>

            <button
              onClick={() =>
                handleSelectCard(
                  Math.min(CARDS_DATA.length - 1, selectedCardIndex + 1),
                )
              }
              disabled={selectedCardIndex === CARDS_DATA.length - 1}
              className="px-2.5 sm:px-3 py-1 rounded-full border border-white/20 font-mono text-[10px] sm:text-xs hover:border-white disabled:opacity-30 transition-colors text-white"
            >
              NEXT
            </button>
          </div>

          <p className="hidden sm:block font-mono text-xs text-zinc-400 max-w-xl leading-relaxed">
            {activeCard.summary}
          </p>

          {/* 1-16 carousel pill buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full pb-1 no-scrollbar px-2">
            {CARDS_DATA.map((c, i) => (
              <button
                key={c.id}
                onClick={() => handleSelectCard(i)}
                className={`w-6 h-6 rounded-full font-mono text-[10px] font-bold border transition-all ${
                  i === selectedCardIndex
                    ? "bg-white text-black border-white scale-110"
                    : "bg-[#121215] text-zinc-400 border-white/20 hover:border-white/60 hover:text-white"
                }`}
                title={c.title}
              >
                {c.id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
