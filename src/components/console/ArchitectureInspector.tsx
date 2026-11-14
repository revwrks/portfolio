"use client";

import React, { useEffect } from "react";
import { CheckCircle2, Database, KeyRound, Lock, ShieldAlert, X, Zap } from "lucide-react";
import { playUiClick } from "@/lib/audio";

interface ArchitectureInspectorProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle: string;
}

export function ArchitectureInspector({
  isOpen,
  onClose,
  projectTitle,
}: ArchitectureInspectorProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="architecture-modal-title"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-700 bg-zinc-950 p-6 md:p-8 shadow-2xl shadow-blue-950/20 text-zinc-100">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
              <Zap className="w-3.5 h-3.5" />
              <span>SYSTEM ARCHITECTURE BLUEPRINT</span>
            </div>
            <h2 id="architecture-modal-title" className="text-xl md:text-2xl font-black text-white">
              {projectTitle} — System Engineering Spec
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              playUiClick(400);
              onClose();
            }}
            className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Close architecture drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Data Flow Diagram */}
        <div className="my-6">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-3 font-semibold">
            01 // Asynchronous Ingestion & Idempotent Execution Flow
          </span>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 font-mono text-xs overflow-x-auto">
            <div className="flex flex-col gap-2 min-w-[500px]">
              {/* Step 1 */}
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">INCOMING</span>
                <span className="text-zinc-200">Client / Gateway Webhook Dispatch</span>
                <span className="text-zinc-500 text-[11px] ml-auto">POST /api/webhooks/payment</span>
              </div>
              <div className="text-center text-zinc-600 font-bold">↓ (Verify HMAC Signature)</div>

              {/* Step 2 */}
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800">
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-bold">IDEMPOTENCY</span>
                <span className="text-zinc-200">WebhookLog table check (Hash signature validation)</span>
                <span className="text-emerald-400 text-[11px] ml-auto">Prevents Double-Crediting</span>
              </div>
              <div className="text-center text-zinc-600 font-bold">↓ (Begin DB Atomic Transaction)</div>

              {/* Step 3 */}
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">LEDGER</span>
                <span className="text-zinc-200">WalletMutation record appended (Double-entry balance proof)</span>
                <span className="text-zinc-500 text-[11px] ml-auto">Optimistic Locking</span>
              </div>
              <div className="text-center text-zinc-600 font-bold">↓ (Provision Digital Asset)</div>

              {/* Step 4 */}
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-blue-950/40 border border-blue-800/40">
                <span className="px-2 py-0.5 rounded bg-blue-500 text-white font-bold">KEY VAULT</span>
                <span className="text-blue-200 font-semibold">KeyVault slot reserved & encrypted credential dispatched</span>
                <span className="text-blue-300 text-[11px] ml-auto">Zero-Leak Inventory</span>
              </div>
            </div>
          </div>
        </div>

        {/* Structural Invariants */}
        <div className="my-6">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-3 font-semibold">
            02 // Critical Invariants & Security Safeguards
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl border border-zinc-800/80 bg-zinc-900/30">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
                <ShieldAlert className="w-4 h-4" />
                <span>Idempotency Lock</span>
              </div>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                Every incoming payment webhook checks existing transaction hashes. Duplicate payloads receive instant HTTP 200 without triggering multiple asset provisions.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-zinc-800/80 bg-zinc-900/30">
              <div className="flex items-center gap-2 text-blue-400 font-bold mb-1">
                <Database className="w-4 h-4" />
                <span>Double-Entry Mutation</span>
              </div>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                User balance is never mutated by a raw UPDATE statement. Balance is derived and audited against contiguous ledger rows in `wallet_mutations`.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-zinc-800/80 bg-zinc-900/30">
              <div className="flex items-center gap-2 text-purple-400 font-bold mb-1">
                <KeyRound className="w-4 h-4" />
                <span>Vault Encryption</span>
              </div>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                Serial keys and digital credentials in `key_vaults` are stored with AES-256 encryption. Decryption only happens in isolated worker execution.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-500">
            REVWORKS // Production Architectures
          </span>
          <button
            type="button"
            onClick={() => {
              playUiClick(400);
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-medium text-white transition-colors"
          >
            Close Blueprint
          </button>
        </div>

      </div>
    </div>
  );
}
