"use client";

import React, { useRef, useState, useEffect } from "react";
import { Download, Eraser, Palette, RotateCcw, Sparkles } from "lucide-react";
import { playBrushTone, playUiClick } from "@/lib/audio";

export function CanvasScratchpad() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#3b82f6");
  const [brushSize, setBrushSize] = useState(3);
  const [hasDrawn, setHasDrawn] = useState(false);

  const colors = [
    { label: "Blue", value: "#3b82f6" },
    { label: "Cyan", value: "#06b6d4" },
    { label: "Emerald", value: "#10b981" },
    { label: "Amber", value: "#f59e0b" },
    { label: "White", value: "#fafafa" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill background
    ctx.fillStyle = "#121215";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Initial guide text
    ctx.font = "12px monospace";
    ctx.fillStyle = "#3f3f46";
    ctx.textAlign = "center";
    ctx.fillText("DIGI-ART ENGINE // Click & drag to sketch your mark", canvas.width / 2, canvas.height / 2);
  }, []);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!hasDrawn) {
      // Clear placeholder on first draw
      ctx.fillStyle = "#121215";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      setHasDrawn(true);
    }

    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);

    playBrushTone(480);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();

    // Occasional subtle synth harmonic
    if (Math.random() > 0.85) {
      const pitch = 300 + (x % 300);
      playBrushTone(pitch);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    playUiClick(400);
    ctx.fillStyle = "#121215";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);

    ctx.font = "12px monospace";
    ctx.fillStyle = "#3f3f46";
    ctx.textAlign = "center";
    ctx.fillText("DIGI-ART ENGINE // Click & drag to sketch your mark", canvas.width / 2, canvas.height / 2);
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    playUiClick(1200);

    const link = document.createElement("a");
    link.download = `revworks-doodle-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex flex-col h-full rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 sm:p-5">
      
      {/* Scratchpad Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE HTML5 CANVAS + WEB AUDIO SYNTH</span>
          </div>
          <h3 className="text-base font-bold text-white mt-0.5">
            Digi-Art Scratchpad Prototype
          </h3>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Colors */}
          <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
            {colors.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => {
                  setColor(c.value);
                  playUiClick(600);
                }}
                className={`w-5 h-5 rounded-full border transition-transform ${
                  color === c.value ? "scale-125 border-white" : "border-transparent opacity-80"
                }`}
                style={{ backgroundColor: c.value }}
                title={c.label}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={clearCanvas}
            className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white transition-colors"
            title="Clear Canvas"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={downloadCanvas}
            className="flex items-center gap-1 text-xs font-mono px-2.5 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors"
            title="Download Sketch"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* The Canvas Canvas */}
      <div className="flex-1 mt-3 relative rounded-lg overflow-hidden border border-zinc-800/80 bg-[#121215] flex items-center justify-center min-h-[320px]">
        <canvas
          ref={canvasRef}
          width={640}
          height={380}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full cursor-crosshair touch-none"
        />
      </div>

      {/* Footer Note */}
      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-zinc-500">
        <span>Powered by HTML5 Canvas Context2D + Web Audio API oscillators</span>
        <span className="text-blue-400">Zero audio assets used</span>
      </div>

    </div>
  );
}
