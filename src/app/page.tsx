"use client";

import React from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { HelixVisual } from "@/components/HelixVisual";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";

const EASING = [0.16, 1, 0.3, 1] as const;

export default function Home() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#0B0C0E] text-[#111215] dark:text-[#FAFAF8] flex flex-col selection:bg-blue-100 dark:selection:bg-blue-900/40 transition-colors duration-300">
      {/* Sticky Ultra-Clean Header with Dark Mode Toggle */}
      <Header onOpenContact={() => scrollToSection("contact")} />

      <main className="flex-1">
        {/* =========================================================================
            SECTION 1: HERO (Obsidian Contrast Band — Museum-Grade FutureHouse Impact)
        ========================================================================== */}
        <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-[#060709] text-white border-b border-hairline-dark">
          {/* Massive Towering DNA Helix spanning the entire right side */}
          <HelixVisual />

          <div className="max-w-6xl mx-auto px-6 w-full py-20 lg:py-28 relative z-10">
            {/* Left Column: Editorial Headline & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASING }}
              className="flex flex-col justify-center max-w-xl lg:max-w-2xl"
            >
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                <span className="font-mono text-[11px] tracking-eyebrow uppercase text-[#A1A5B0]">
                  AI FOR SCIENTIFIC DISCOVERY
                </span>
              </div>

              {/* H1 Headline */}
              <h1 className="text-[44px] sm:text-[58px] lg:text-[72px] leading-[1.04] tracking-tighter font-medium text-white mb-6">
                AI can generate a thousand ideas. We prove which one is{" "}
                <span className="font-serif italic font-normal text-[#38BDF8]">
                  real.
                </span>
              </h1>

              {/* Subheadline: Plain English, direct and punchy */}
              <p className="text-[18px] sm:text-[20px] leading-[1.6] text-[#A1A5B0] font-normal max-w-[48ch] mb-8">
                Science isn&apos;t slow because we lack ideas. It&apos;s slow
                because chasing wrong ones costs years and millions of dollars.
                ULTRON is an autonomous scientist that challenges its own
                ideas—until only the truth survives.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className="px-6 py-3 rounded-full bg-white text-[#111215] text-[14px] font-medium tracking-tight hover:bg-white/90 transition-all shadow-sm flex items-center gap-2 group"
                >
                  <span>Request Access</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("how-it-works")}
                  className="px-5 py-3 text-[14px] font-medium text-[#A1A5B0] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>How It Works</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: THE INSIGHT
        ========================================================================== */}
        <section className="py-24 sm:py-32 border-b border-hairline dark:border-white/10 bg-[#FAFAF8] dark:bg-[#0B0C0E] transition-colors">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="font-mono text-[11px] tracking-eyebrow uppercase text-ink-muted dark:text-white/50">
                  01 / THE PROBLEM
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-[34px] sm:text-[46px] leading-[1.12] tracking-tighter font-medium text-ink-primary dark:text-white mb-6">
                Today&apos;s AI guesses. Science can&apos;t afford{" "}
                <span className="font-serif italic font-normal">guesses.</span>
              </h2>

              {/* Strictly 2 Sentences */}
              <p className="text-[18px] sm:text-[20px] leading-[1.6] text-ink-muted dark:text-white/60 max-w-[48ch] mx-auto">
                Standard AI tools write convincing research reports—but nearly
                half of their conclusions break under real-world scrutiny. No
                lab or pharma company will bet millions of dollars on a
                chatbot&apos;s confidence.
              </p>
            </div>

            {/* Visual Contrast Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-16">
              {/* Card 1: Standard AI */}
              <div className="p-8 rounded-2xl bg-surface dark:bg-white/[0.04] border border-hairline dark:border-white/10 flex flex-col justify-between min-h-[200px]">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-ink-muted dark:text-white/40 block mb-2">
                    Standard AI
                  </span>
                  <h3 className="text-[17px] font-medium text-ink-primary dark:text-white">
                    Generates a plausible answer and stops.
                  </h3>
                </div>
                <div className="pt-6 flex items-center gap-3">
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-ink-muted/20 to-transparent" />
                  <span className="font-serif italic text-ink-muted/50 dark:text-white/30 text-xl">
                    ?
                  </span>
                </div>
              </div>

              {/* Card 2: ULTRON */}
              <div className="p-8 rounded-2xl bg-white dark:bg-white/[0.08] border border-hairline dark:border-white/15 shadow-sm flex flex-col justify-between min-h-[200px]">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#2563EB] dark:text-[#38BDF8] font-medium block mb-2">
                    ULTRON
                  </span>
                  <h3 className="text-[17px] font-medium text-ink-primary dark:text-white">
                    Generates ideas, tries to break every single one, and only
                    hands you what survives.
                  </h3>
                </div>
                <div className="pt-6 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                  <div className="h-[2px] flex-1 bg-gradient-to-r from-[#2563EB]/40 via-[#E11D48]/40 to-[#059669]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#059669] shadow-[0_0_8px_#059669]" />
                </div>
              </div>
            </div>

            {/* Real Laboratory Testing Imagery */}
            <div className="relative rounded-2xl overflow-hidden border border-hairline dark:border-white/10 bg-surface dark:bg-white/[0.02]">
              <div className="aspect-[21/9] sm:aspect-[2.6/1] relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85"
                  alt="Scientist conducting biological laboratory validation"
                  className="w-full h-full object-cover object-center grayscale contrast-125 dark:opacity-85"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white text-[12px]">
                  <span className="font-mono uppercase tracking-wider text-white/70">
                    Figure 01 · Pre-Synthesis Biological Validation
                  </span>
                  <span className="font-serif italic text-white/80 hidden sm:inline">
                    Benchwork begins only after all challenges are passed.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: HOW IT WORKS (Obsidian Band #0B0C0E — Pure Museum Editorial)
        ========================================================================== */}
        <section
          id="how-it-works"
          className="py-24 sm:py-32 bg-[#0B0C0E] text-white border-b border-hairline-dark relative overflow-hidden"
        >
          <div className="max-w-5xl mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center mb-16">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="font-mono text-[11px] tracking-eyebrow uppercase text-[#A1A5B0]">
                  02 / HOW IT WORKS
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-[34px] sm:text-[48px] leading-[1.1] tracking-tighter font-medium text-white mb-4">
                Two minds. One ruthless{" "}
                <span className="font-serif italic font-normal text-[#38BDF8]">
                  standard.
                </span>
              </h2>

              {/* 1 Sentence */}
              <p className="text-[17px] sm:text-[19px] text-[#A1A5B0] leading-relaxed">
                Every investigation runs two opposing engines: one built to
                discover, and one built to destroy weak ideas.
              </p>
            </div>

            {/* Clean Museum-Grade Architecture */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Opposing Mind 1: The Discovery Engine */}
              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
                    <span className="font-mono text-[11px] tracking-eyebrow uppercase text-[#60A5FA]">
                      THE DISCOVERY ENGINE
                    </span>
                  </div>
                  <h3 className="text-[20px] font-medium text-white mb-3">
                    Broad, Unconstrained Hypothesis Generation
                  </h3>
                  <p className="text-[#A1A5B0] text-[15px] leading-relaxed">
                    Explores uncharted chemical space, formulates novel therapeutic
                    leads, and uncovers high-potential scientific breakthroughs that
                    human teams take years to conceptualize.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between text-[12px] font-mono text-white/40">
                  <span>ROLE: PROPOSE CANDIDATES</span>
                  <span className="text-[#60A5FA]">1,000 IDEAS</span>
                </div>
              </div>

              {/* Opposing Mind 2: The Elimination Engine */}
              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
                    <span className="font-mono text-[11px] tracking-eyebrow uppercase text-[#F87171]">
                      THE ELIMINATION ENGINE
                    </span>
                  </div>
                  <h3 className="text-[20px] font-medium text-white mb-3">
                    Adversarial Stress-Testing
                  </h3>
                  <p className="text-[#A1A5B0] text-[15px] leading-relaxed">
                    Actively attempts to break every proposal against physical laws,
                    prior failed experiments, and real-world clinical constraints—eliminating
                    the 99% that would fail in the lab.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/5 mt-6 flex items-center justify-between text-[12px] font-mono text-white/40">
                  <span>ROLE: DESTROY WEAK HYPOTHESES</span>
                  <span className="text-[#F87171]">RUTHLESS FILTER</span>
                </div>
              </div>
            </div>

            {/* Verified Outcome Bar */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-white/[0.06] via-white/[0.08] to-white/[0.06] border border-[#059669]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#059669] shadow-[0_0_12px_#059669]" />
                <div>
                  <h4 className="text-white text-[16px] font-medium">
                    Verified Outcome
                  </h4>
                  <p className="text-[#A1A5B0] text-[13px]">
                    Only candidates that survive every challenge reach physical wet-lab synthesis.
                  </p>
                </div>
              </div>
              <span className="px-4 py-1.5 rounded-full bg-[#059669]/20 border border-[#059669]/40 text-[#34D399] font-mono text-[11px] uppercase tracking-wider shrink-0">
                1 Surviving Truth
              </span>
            </div>

            {/* Single Proof Quote */}
            <div className="text-center mt-12">
              <p className="text-[#A1A5B0] text-[15px] font-serif italic tracking-wide">
                &ldquo;Months of dead-end lab work eliminated before a single experiment begins.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: WHY THIS WINS (3 Editorial Statements)
        ========================================================================== */}
        <section
          id="why-now"
          className="py-24 sm:py-32 bg-[#FAFAF8] dark:bg-[#0B0C0E] border-b border-hairline dark:border-white/10 transition-colors"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="max-w-2xl mb-16">
              <span className="font-mono text-[11px] tracking-eyebrow uppercase text-ink-muted dark:text-white/50 block mb-4">
                03 / WHY NOW
              </span>
              <h2 className="text-[34px] sm:text-[46px] leading-[1.12] tracking-tighter font-medium text-ink-primary dark:text-white">
                As AI gets smarter, verification becomes the{" "}
                <span className="font-serif italic font-normal text-[#2563EB] dark:text-[#38BDF8]">
                  bottleneck.
                </span>
              </h2>
            </div>

            {/* 3 Statements Separated by 1px Hairlines */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-hairline dark:divide-white/10 mb-16">
              {/* Statement 1 */}
              <div className="py-8 md:py-0 md:pr-10">
                <h3 className="text-[19px] font-medium text-ink-primary dark:text-white mb-3">
                  Built to ride the wave.
                </h3>
                <p className="text-[16px] leading-[1.6] text-ink-muted dark:text-white/60">
                  Every new frontier AI model makes ULTRON faster and
                  cheaper—without ever replacing the need to prove an answer is
                  true.
                </p>
              </div>

              {/* Statement 2 */}
              <div className="py-8 md:py-0 md:px-10">
                <h3 className="text-[19px] font-medium text-ink-primary dark:text-white mb-3">
                  Months compressed to hours.
                </h3>
                <p className="text-[16px] leading-[1.6] text-ink-muted dark:text-white/60">
                  What takes a research team six months of trial and error,
                  ULTRON narrows down to the highest-conviction path in an
                  afternoon.
                </p>
              </div>

              {/* Statement 3 */}
              <div className="py-8 md:py-0 md:pl-10">
                <h3 className="text-[19px] font-medium text-ink-primary dark:text-white mb-3">
                  Built for real labs.
                </h3>
                <p className="text-[16px] leading-[1.6] text-ink-muted dark:text-white/60">
                  Designed from day one to protect proprietary data and hand
                  scientists clear, auditable breakthroughs they can actually
                  trust.
                </p>
              </div>
            </div>

            {/* Laboratory Imagery Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative rounded-2xl overflow-hidden border border-hairline dark:border-white/10 bg-surface dark:bg-white/[0.02] aspect-[16/9]">
                <img
                  src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1000&q=80"
                  alt="High-throughput automated laboratory assay testing"
                  className="w-full h-full object-cover grayscale contrast-125 dark:opacity-85"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 font-mono text-[11px] text-white/80 uppercase tracking-wider">
                  Automated High-Throughput Screening
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-hairline dark:border-white/10 bg-surface dark:bg-white/[0.02] aspect-[16/9]">
                <img
                  src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1000&q=80"
                  alt="Biomedical researcher inspecting cellular structures"
                  className="w-full h-full object-cover grayscale contrast-125 dark:opacity-85"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 font-mono text-[11px] text-white/80 uppercase tracking-wider">
                  Target Cellular Verification
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: MINIMALIST INVESTOR CTA & FOOTER
        ========================================================================== */}
        <Footer />
      </main>
    </div>
  );
}
