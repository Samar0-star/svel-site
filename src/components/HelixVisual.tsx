"use client";

import React from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function HelixVisual() {
  return (
    <div className="absolute inset-y-[-10%] right-[-10%] sm:right-[-5%] lg:right-[-2%] w-[110%] sm:w-[85%] lg:w-[65vw] max-w-[1300px] h-[120%] pointer-events-none select-none flex items-center justify-center overflow-visible z-0">
      {/* Subtle atmospheric ambient glow */}
      <div
        className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-[#2563EB]/25 via-[#059669]/15 to-[#E11D48]/20 blur-[120px] opacity-70 pointer-events-none"
        aria-hidden="true"
      />

      {/* Custom SVEL DNA Holographic Structure - 100% Transparent PNG */}
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={`${basePath}/svel-dna-hero.png`}
          alt="SVEL 3D Double Helix Molecular Verification"
          className="w-full h-full object-contain object-center scale-[1.3] lg:scale-[1.48] drop-shadow-[0_0_60px_rgba(37,99,235,0.35)] transition-transform duration-1000"
          loading="eager"
        />
      </div>
    </div>
  );
}
