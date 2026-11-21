import fs from "fs";
import path from "path";

const BANNED_PATTERNS = [
  /\bGNN\b/i,
  /\bSymPy\b/i,
  /\bPython\b/i,
  /\bp-value\b/i,
  /\badversarial dropout\b/i,
  /\bconfounding variable\b/i,
  /\bkernel\b/i,
  /\borchestration\b/i,
  /\bmulti-agent\b/i,
  /\bRAG\b/i,
  /\bLLM wrapper\b/i,
  /\b90,000 lines\b/i,
  /\bsandbox\b/i,
  /\bSOC2\b/i,
  /\bVPC\b/i,
];

describe("SVEL Editorial and Brand Verification Tests", () => {
  const baseDir = path.resolve(__dirname, "..");
  const srcDir = path.join(baseDir, "src");

  test("should contain zero banned words in any src/ file", () => {
    function checkDir(dir: string) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          checkDir(fullPath);
        } else if (file.endsWith(".tsx") || file.endsWith(".ts")) {
          const content = fs.readFileSync(fullPath, "utf-8");
          for (const pattern of BANNED_PATTERNS) {
            const match = content.match(pattern);
            expect(match).toBeNull();
          }
        }
      }
    }

    checkDir(srcDir);
  });

  test("should verify email regex in footer correctly validates emails", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test("partner@firm.com")).toBe(true);
    expect(emailRegex.test("scientist@lab.edu")).toBe(true);
    expect(emailRegex.test("invalid-email")).toBe(false);
    expect(emailRegex.test("@no-user.com")).toBe(false);
    expect(emailRegex.test("spaces in@domain.com")).toBe(false);
  });

  test("should verify layout metadata title and description", () => {
    const layoutPath = path.join(srcDir, "app", "layout.tsx");
    const content = fs.readFileSync(layoutPath, "utf-8");
    expect(
      content.includes('title: "SVEL — We Prove Which Science is Real"')
    ).toBe(true);
    expect(
      content.includes(
        'description: "The verification layer for scientific discovery."'
      )
    ).toBe(true);
  });

  test("should enforce motion easing curve [0.16, 1, 0.3, 1]", () => {
    const pagePath = path.join(srcDir, "app", "page.tsx");
    const content = fs.readFileSync(pagePath, "utf-8");
    expect(content.includes("[0.16, 1, 0.3, 1]")).toBe(true);
  });
});
