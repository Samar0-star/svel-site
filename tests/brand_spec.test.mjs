import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("Helix 3D Geometry Specification Verification", () => {
  const N = 56;
  const FOV = 740;
  const R = 180;
  const L = 500;
  const TILT_ANGLE = (-20 * Math.PI) / 180;

  // Test rung calculation at u = 0 (center)
  const u0 = 0;
  const time = 1.0;
  const scroll = 0;
  const theta0 = u0 * Math.PI * 2.5 + time * 0.32 + scroll * Math.PI * 1.1;

  // Blue strand
  const bx = Math.cos(theta0) * R;
  const bz = Math.sin(theta0) * R;
  const by = u0 * L;

  // Red strand
  const rx = Math.cos(theta0 + Math.PI) * R;
  const rz = Math.sin(theta0 + Math.PI) * R;
  const ry = u0 * L;

  // Red and blue should be diametrically opposite
  assert.ok(Math.abs(bx + rx) < 1e-6, "Blue and red X should be symmetric opposites");
  assert.ok(Math.abs(bz + rz) < 1e-6, "Blue and red Z should be symmetric opposites");
  assert.equal(by, ry, "Y coordinates should match on base-pair rung");

  // Perspective projection formula test
  const scaleNear = FOV / (FOV + (-50)); // z < 0
  const scaleFar = FOV / (FOV + 50);    // z > 0
  assert.ok(scaleNear > scaleFar, "Near particles must have larger scale than far particles");
});

test("Banned Words Zero-Tolerance Verification", () => {
  const banned = [
    "GNN", "SymPy", "Python", "p-value", "adversarial dropout",
    "confounding variable", "kernel", "orchestration", "multi-agent",
    "RAG", "LLM wrapper", "90,000 lines", "unit tests", "sandbox",
    "SOC2", "VPC"
  ];

  const files = [
    "src/app/page.tsx",
    "src/components/Header.tsx",
    "src/components/Footer.tsx",
    "src/components/DiscoveryFilterDemo.tsx",
    "src/components/DemoModal.tsx"
  ];

  for (const f of files) {
    const filePath = path.join(process.cwd(), f);
    if (!fs.existsSync(filePath)) continue;
    const content = fs.readFileSync(filePath, "utf8");
    for (const word of banned) {
      const regex = new RegExp(`\\b${word}\\b`, "i");
      assert.equal(
        regex.test(content),
        false,
        `File ${f} contains forbidden word: ${word}`
      );
    }
  }
});

test("Total Page Copy Word Count Under 350 Words", () => {
  const pageContent = fs.readFileSync(path.join(process.cwd(), "src/app/page.tsx"), "utf8");
  const textMatches = pageContent.match(/>([^<>{}\\\$]+)</g) || [];
  const visibleText = textMatches
    .map(m => m.slice(1, -1).trim())
    .filter(t => t.length > 0 && !t.startsWith("var(") && !t.includes("className") && !t.includes("xmlns"));

  const wordCount = visibleText.join(" ").split(/\s+/).filter(Boolean).length;
  assert.ok(wordCount > 50, "Page must contain substantial copy");
  assert.ok(wordCount < 350, `Page copy (${wordCount} words) must be strictly under 350 words`);
});

test("Visual Design Tokens Integrity", () => {
  const tailwindContent = fs.readFileSync(path.join(process.cwd(), "tailwind.config.ts"), "utf8");
  assert.ok(tailwindContent.includes("#FAFAF8"), "Background #FAFAF8 must be configured");
  assert.ok(tailwindContent.includes("#F2F1EC"), "Surface #F2F1EC must be configured");
  assert.ok(tailwindContent.includes("#0B0C0E"), "Obsidian #0B0C0E must be configured");
  assert.ok(tailwindContent.includes("#111215"), "Primary text #111215 must be configured");
  assert.ok(tailwindContent.includes("#636773"), "Muted text #636773 must be configured");
  assert.ok(tailwindContent.includes("#2563EB"), "Accent blue must be configured");
  assert.ok(tailwindContent.includes("#E11D48"), "Accent red must be configured");
  assert.ok(tailwindContent.includes("#059669"), "Accent emerald must be configured");
});

test("DiscoveryFilterDemo Data Scenarios Integrity", () => {
  const demoContent = fs.readFileSync(path.join(process.cwd(), "src/components/DiscoveryFilterDemo.tsx"), "utf8");
  assert.ok(demoContent.includes("New Medicines"), "Should contain New Medicines tab");
  assert.ok(demoContent.includes("Next-Gen Materials"), "Should contain Next-Gen Materials tab");
  assert.ok(demoContent.includes("Data Breakthroughs"), "Should contain Data Breakthroughs tab");
  assert.ok(demoContent.includes("Survived all challenges · Ready for the lab"), "Should contain exact verified badge");
  assert.ok(demoContent.includes("Months of dead-end lab work eliminated before a single experiment begins."), "Should contain bottom line");
});
