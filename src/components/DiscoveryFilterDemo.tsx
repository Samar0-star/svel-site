"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ShieldAlert, Sparkles } from "lucide-react";

type DomainKey = "medicines" | "materials" | "data";

interface Candidate {
  id: string;
  title: string;
  verdict: string;
  survived: boolean;
  note: string;
}

const DOMAINS: Record<
  DomainKey,
  { label: string; candidates: Candidate[] }
> = {
  medicines: {
    label: "New Medicines",
    candidates: [
      {
        id: "m1",
        title: "Immune cell activator for solid tumors",
        verdict: "Breaks on real data",
        survived: false,
        note: "Failed in living human cell tissue",
      },
      {
        id: "m2",
        title: "Targeted protein binder for viral entry",
        verdict: "Hidden molecular flaw",
        survived: false,
        note: "Toxic reaction with healthy proteins",
      },
      {
        id: "m3",
        title: "Cell-permeable carrier for brain delivery",
        verdict: "Fails physical limits",
        survived: false,
        note: "Cannot cross tissue barrier",
      },
      {
        id: "m4",
        title: "Selective inhibitor with zero off-target binding",
        verdict: "Survived all challenges",
        survived: true,
        note: "Zero adverse reactions across every stress test",
      },
    ],
  },
  materials: {
    label: "Next-Gen Materials",
    candidates: [
      {
        id: "mat1",
        title: "High-density solid electrolyte lattice",
        verdict: "Fails physical limits",
        survived: false,
        note: "Collapses under operating temperatures",
      },
      {
        id: "mat2",
        title: "Room-pressure conductive composite",
        verdict: "Thermal instability",
        survived: false,
        note: "Unstable above ambient temperature",
      },
      {
        id: "mat3",
        title: "Self-healing structural polymer",
        verdict: "Breaks on real data",
        survived: false,
        note: "Degrades rapidly after 40 cycles",
      },
      {
        id: "mat4",
        title: "Nanoporous catalyst that quadruples fuel yield",
        verdict: "Survived all challenges",
        survived: true,
        note: "Fully verified across 10,000 physical simulations",
      },
    ],
  },
  data: {
    label: "Data Breakthroughs",
    candidates: [
      {
        id: "d1",
        title: "Early warning signal for heart failure",
        verdict: "Hidden coincidence",
        survived: false,
        note: "Statistical illusion in patient records",
      },
      {
        id: "d2",
        title: "Target interaction found in clinic files",
        verdict: "Breaks on real data",
        survived: false,
        note: "Vanishes when external hospital data tested",
      },
      {
        id: "d3",
        title: "Diagnostic signature for autoimmune onset",
        verdict: "Distorted baseline bias",
        survived: false,
        note: "Collection artifact from cold storage",
      },
      {
        id: "d4",
        title: "Causal genetic driver proven in three clinical groups",
        verdict: "Survived all challenges",
        survived: true,
        note: "Independently verified in three global patient cohorts",
      },
    ],
  },
};

const EASING = [0.16, 1, 0.3, 1] as const;

export function DiscoveryFilterDemo() {
  const [activeTab, setActiveTab] = useState<DomainKey>("medicines");
  const currentDomain = DOMAINS[activeTab];

  return (
    <div className="w-full max-w-5xl mx-auto my-6">
      {/* Domain Switcher */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {(Object.keys(DOMAINS) as DomainKey[]).map((key) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-full text-[13px] tracking-tight transition-all duration-300 ${
                isActive
                  ? "bg-white text-[#111215] font-medium shadow-sm"
                  : "bg-white/[0.06] text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {DOMAINS[key].label}
            </button>
          );
        })}
      </div>

      {/* 3 Clean Stages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Stage 1: DISCOVER */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
              <span className="font-mono text-[10px] tracking-eyebrow uppercase text-white/50">
                STAGE 01 / DISCOVER
              </span>
            </div>
            <h3 className="text-white text-[16px] font-medium mb-1">
              Candidate Hypotheses
            </h3>
            <p className="text-white/50 text-[13px] leading-relaxed mb-6">
              Promising on paper, but completely unproven.
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: EASING }}
              className="space-y-2.5"
            >
              {currentDomain.candidates.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-white/[0.04] border border-white/5 text-[13px] text-white/80 leading-snug flex items-center gap-2.5"
                >
                  <span className="font-mono text-[10px] text-white/30 shrink-0">
                    0{idx + 1}
                  </span>
                  <span className="truncate">{item.title}</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stage 2: CHALLENGE */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse" />
              <span className="font-mono text-[10px] tracking-eyebrow uppercase text-white/50">
                STAGE 02 / CHALLENGE
              </span>
            </div>
            <h3 className="text-white text-[16px] font-medium mb-1">
              Ruthless Stress-Testing
            </h3>
            <p className="text-white/50 text-[13px] leading-relaxed mb-6">
              Tested against real-world biology and physical limits.
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + "-challenge"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASING }}
              className="space-y-2.5"
            >
              {currentDomain.candidates.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border text-[12px] flex items-center justify-between transition-all ${
                    item.survived
                      ? "bg-[#2563EB]/10 border-[#2563EB]/30 text-white font-medium"
                      : "bg-white/[0.02] border-white/5 text-white/35 line-through"
                  }`}
                >
                  <span className="truncate pr-2">{item.title}</span>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider shrink-0 px-2 py-0.5 rounded ${
                      item.survived
                        ? "bg-[#059669]/20 text-[#34D399]"
                        : "bg-[#E11D48]/15 text-[#F87171]"
                    }`}
                  >
                    {item.survived ? "Survives" : item.verdict}
                  </span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stage 3: VERIFIED */}
        <div className="rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-[#059669]/30 p-6 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#059669] shadow-[0_0_8px_#059669]" />
              <span className="font-mono text-[10px] tracking-eyebrow uppercase text-[#34D399]">
                STAGE 03 / VERIFIED TRUTH
              </span>
            </div>
            <h3 className="text-white text-[16px] font-medium mb-1">
              Ready for the Lab
            </h3>
            <p className="text-white/50 text-[13px] leading-relaxed mb-6">
              Only what survives every challenge is handed to scientists.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {(() => {
              const survivor = currentDomain.candidates.find((c) => c.survived);
              if (!survivor) return null;
              return (
                <motion.div
                  key={survivor.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: EASING }}
                  className="p-4 rounded-xl bg-white/[0.06] border border-white/10"
                >
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#059669]/20 border border-[#059669]/30 text-[#34D399] font-mono text-[10px] uppercase tracking-wider mb-2.5">
                    <Check className="w-3 h-3" />
                    <span>Ready for Laboratory Trial</span>
                  </div>
                  <h4 className="text-white font-medium text-[15px] leading-snug mb-2">
                    {survivor.title}
                  </h4>
                  <p className="text-white/60 text-[12px] leading-relaxed">
                    {survivor.note}. Verified before a single physical dollar is spent.
                  </p>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </div>

      {/* Single bottom proof line */}
      <div className="text-center mt-10">
        <p className="text-white/50 text-[14px] font-serif italic tracking-wide">
          &ldquo;Months of dead-end lab work eliminated before a single experiment begins.&rdquo;
        </p>
      </div>
    </div>
  );
}
