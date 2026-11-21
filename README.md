# SVEL — Web Platform (Source Repository)

> The public web interface and empirical visualizer for **SVEL** (Scientific Verification Engine Layer). Built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

- **Live Platform**: [https://samar0-star.github.io/svel-web/](https://samar0-star.github.io/svel-web/)
- **Core Engine Repository**: [https://github.com/Samar0-star/SVEL](https://github.com/Samar0-star/SVEL)
- **Deployment Repository**: [https://github.com/Samar0-star/svel-web](https://github.com/Samar0-star/svel-web)

---

## Architecture & Features

The SVEL web platform serves as the interactive frontend for the SVEL autonomous scientific discovery engine:

1. **Biophysical Interface & 3D Double Helix**: Interactive visualization of SARS-CoV-2 RBD-ACE2 contact geometries and electrostatic determinants.
2. **Deterministic Discovery Filter Demo**: Interactive client-side demonstration of SVEL's 12 reality kernels, hypothesis falsification cage, and data identifiability filters.
3. **The Morgue & Empirical Telemetry**: Real-time inspection of falsified hypotheses and surviving discoveries across biophysics, superconductor materials, and nuclear fusion.
4. **Autonomous Swarm Console**: Telemetry streaming from Scholar-Prosecutor agent cycles and cryptographic AST cleanroom logs.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, Static Export) + React 19
- **Type Safety**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS (Dark/Light responsive theme)
- **Testing**: Jest unit & integration test suites
- **Deployment**: GitHub Pages via `gh-pages` branch

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/Samar0-star/svel-site.git
cd svel-site

# Install dependencies
npm install

# Run unit tests
npm test

# Run development server
npm run dev

# Build static export for GitHub Pages
GITHUB_PAGES=true npm run build
```

---

## License

MIT © Samar Aldico / SVEL Autonomous Scientific Research
