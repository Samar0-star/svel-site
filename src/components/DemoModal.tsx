"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, RotateCcw, VolumeX, ShieldCheck, CheckCircle2 } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EASING = [0.16, 1, 0.3, 1] as const;

interface VerificationStage {
  id: number;
  label: string;
  sub: string;
  candidatesCount: string;
  status: string;
}

const STAGES: VerificationStage[] = [
  {
    id: 1,
    label: "Hypothesis Ingestion",
    sub: "Broad candidate proposals loaded across structural and biological targets.",
    candidatesCount: "1,000 Candidates",
    status: "Active",
  },
  {
    id: 2,
    label: "Opposing Challenge",
    sub: "Every premise attacked under severe counter-arguments and physical limits.",
    candidatesCount: "1,000 Challenged",
    status: "In Progress",
  },
  {
    id: 3,
    label: "Elimination & Sifting",
    sub: "999 unviable concepts fail rigor checks and are permanently discarded.",
    candidatesCount: "999 Discarded",
    status: "Filtered",
  },
  {
    id: 4,
    label: "Lab-Ready Truth",
    sub: "Single high-conviction candidate ready for synthesis with zero wasted spend.",
    candidatesCount: "1 Verified Lead",
    status: "Confirmed Real",
  },
];

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100
  const progressRef = useRef(progress);
  progressRef.current = progress;

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setProgress(0);
      setIsPlaying(true);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Simulated 90-sec playback (accelerated for interactive crispness: 18s total cycle = ~5x speed)
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0; // loop
        }
        return Math.min(prev + 0.8, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  const activeStageIndex = Math.min(
    Math.floor((progress / 100) * STAGES.length),
    STAGES.length - 1
  );
  const activeStage = STAGES[activeStageIndex];

  // Simulated seconds formatting: 00:00 to 01:30
  const totalSeconds = 90;
  const currentSeconds = Math.floor((progress / 100) * totalSeconds);
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSeek = (newProgress: number) => {
    setProgress(newProgress);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="SVEL 90-Second Verification Walkthrough"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASING }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.4, ease: EASING }}
            className="relative w-full max-w-3xl bg-[#0B0C0E] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                <span className="font-mono text-[11px] tracking-eyebrow uppercase text-[#A1A5B0]">
                  SVEL / 90-SEC VERIFICATION WALKTHROUGH
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded-full text-white/60 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-white/30"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Canvas / Walkthrough Stage Visualizer */}
            <div className="relative aspect-[16/9] w-full bg-gradient-to-b from-[#0F1115] to-[#0B0C0E] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
              {/* Radial Glow Highlight */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background:
                    activeStageIndex === 3
                      ? "radial-gradient(circle at 50% 40%, #059669 0%, transparent 70%)"
                      : "radial-gradient(circle at 50% 40%, #2563EB 0%, transparent 70%)",
                }}
              />

              {/* Stage Progress Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono tracking-wider bg-white/10 text-white/90">
                    STAGE 0{activeStage.id} OF 04
                  </span>
                  <span className="text-white/40 text-xs">·</span>
                  <span className="text-xs text-[#A1A5B0] font-mono">
                    {activeStage.candidatesCount}
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] text-white/70">
                  <VolumeX className="w-3 h-3 text-[#A1A5B0]" />
                  <span>SOUNDLESS SIMULATION</span>
                </div>
              </div>

              {/* Middle Dynamic Walkthrough Content */}
              <div className="relative z-10 my-auto py-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: EASING }}
                    className="max-w-xl mx-auto text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 bg-white/5 border border-white/10 text-white shadow-inner">
                      {activeStageIndex === 3 ? (
                        <CheckCircle2 className="w-6 h-6 text-[#059669]" />
                      ) : (
                        <ShieldCheck className="w-6 h-6 text-[#2563EB]" />
                      )}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-medium tracking-tight text-white mb-2">
                      {activeStage.label}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] text-[#A1A5B0] leading-relaxed max-w-md mx-auto">
                      {activeStage.sub}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* 4 Stage Stepper Pills */}
                <div className="mt-8 grid grid-cols-4 gap-2 max-w-lg mx-auto">
                  {STAGES.map((stage, idx) => {
                    const isPassed = idx < activeStageIndex;
                    const isCurrent = idx === activeStageIndex;
                    return (
                      <button
                        key={stage.id}
                        type="button"
                        onClick={() => handleSeek((idx / STAGES.length) * 100 + 2)}
                        className={`text-left p-2 rounded-lg border transition-all text-xs ${
                          isCurrent
                            ? "bg-white/10 border-white/30 text-white"
                            : isPassed
                            ? "bg-white/[0.04] border-white/10 text-white/70"
                            : "bg-transparent border-white/5 text-white/30"
                        }`}
                      >
                        <div className="font-mono text-[10px] opacity-70">
                          0{stage.id}
                        </div>
                        <div className="truncate font-medium mt-0.5">
                          {stage.label.split(" ")[0]}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Scrubber & Time */}
              <div className="relative z-10 w-full pt-2">
                {/* Scrubber Bar */}
                <div
                  className="w-full h-1.5 bg-white/10 rounded-full cursor-pointer relative overflow-hidden group"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const percent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                    handleSeek(percent);
                  }}
                >
                  <div
                    className="h-full bg-gradient-to-r from-[#2563EB] to-[#38BDF8] rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="px-6 py-3.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-white text-[#111215] flex items-center justify-center hover:bg-white/90 transition-transform active:scale-95 focus:outline-none"
                  aria-label={isPlaying ? "Pause walkthrough" : "Play walkthrough"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleSeek(0)}
                  className="p-1.5 rounded-full text-white/60 hover:text-white transition-colors"
                  aria-label="Restart walkthrough"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <span className="font-mono text-xs text-[#A1A5B0]">
                  {formatTime(currentSeconds)} / {formatTime(totalSeconds)}
                </span>
              </div>

              <div className="text-right">
                <span className="font-mono text-[11px] text-white/50 tracking-wider">
                  HIGH-CONVICTION VERIFICATION
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
