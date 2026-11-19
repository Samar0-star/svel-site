import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF8",
        surface: "#F2F1EC",
        obsidian: "#0B0C0E",
        "ink-primary": "#111215",
        "ink-muted": "#636773",
        hairline: "rgba(17, 18, 21, 0.08)",
        "hairline-dark": "rgba(255, 255, 255, 0.12)",
        "accent-blue": "#2563EB",
        "accent-red": "#E11D48",
        "accent-emerald": "#059669",
      },
      fontFamily: {
        serif: ["var(--font-instrument-serif)", "Instrument Serif", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.035em",
        eyebrow: "0.14em",
      },
    },
  },
  plugins: [],
};
export default config;
