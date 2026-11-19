"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Loader2 } from "lucide-react";

const EASING = [0.16, 1, 0.3, 1] as const;
const TARGET_EMAIL = "aimlsamarr@gmail.com";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      // 1. Send via local API route (which logs lead and forwards to aimlsamarr@gmail.com)
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });

      // 2. Client-side direct fallback dispatch to ensure delivery
      fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          _subject: `New ULTRON Demo Request from ${cleanEmail}`,
          message: `Investor / Visitor Demo Request: ${cleanEmail}`,
        }),
      }).catch(() => {});

      setIsSubmitted(true);
      setTimeout(() => {
        setEmail("");
        setIsSubmitted(false);
      }, 4500);
    } catch (err) {
      console.error(err);
      setIsSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer
      id="contact"
      className="py-24 sm:py-32 bg-[#0B0C0E] text-white border-t border-hairline-dark relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Headline */}
        <h2 className="text-[36px] sm:text-[52px] leading-[1.08] tracking-tighter font-medium text-white mb-4">
          The future of science isn&apos;t more noise. It&apos;s{" "}
          <span className="font-serif italic font-normal text-[#38BDF8]">
            certainty.
          </span>
        </h2>

        {/* Subtext */}
        <p className="text-[17px] sm:text-[20px] text-[#A1A5B0] leading-relaxed mb-10 max-w-lg mx-auto">
          We&apos;re building the verification layer for scientific discovery.
        </p>

        {/* Clean Email Capture Input with Micro-Animation */}
        <div className="max-w-md mx-auto mb-16">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center p-1.5 rounded-full bg-white/[0.06] border border-white/15 focus-within:border-white/40 transition-colors shadow-lg"
          >
            <input
              type="email"
              value={email}
              disabled={isSubmitted || isLoading}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage("");
              }}
              placeholder="partner@firm.com"
              aria-label="Email address for demo request"
              required
              className="flex-1 bg-transparent px-4 py-2 text-[14px] text-white placeholder-white/40 focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSubmitted || isLoading}
              className="px-5 py-2.5 rounded-full bg-white text-[#111215] text-[13px] font-medium hover:bg-white/90 active:scale-98 transition-all flex items-center gap-1.5 shrink-0 shadow-sm disabled:cursor-default"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <Loader2 className="w-4 h-4 animate-spin text-ink-primary" />
                    <span>Sending</span>
                  </motion.div>
                ) : isSubmitted ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2, ease: EASING }}
                    className="flex items-center gap-1.5 text-[#059669]"
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span className="text-ink-primary font-semibold">Sent to Team</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="request"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-1"
                  >
                    <span>Request Demo</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>

          {errorMessage && (
            <p className="mt-2 text-[12px] text-[#F87171]">{errorMessage}</p>
          )}
        </div>

        {/* Footer Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#A1A5B0]">
          {/* Left: ULTRON */}
          <div className="flex items-center gap-2.5">
            <span className="text-white font-medium tracking-tight">ULTRON</span>
            <span className="text-white/20">·</span>
            <span className="text-white/60">The Scientific Verification Layer</span>
          </div>

          {/* Right: GitHub · Contact */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Samar0-star/ULTRON"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span className="text-white/20">·</span>
            <a
              href={`mailto:${TARGET_EMAIL}`}
              className="hover:text-white transition-colors"
            >
              {TARGET_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
