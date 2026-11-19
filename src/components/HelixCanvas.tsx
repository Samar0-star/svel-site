"use client";

import React, { useEffect, useRef } from "react";

export function HelixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let prefersReducedMotion = false;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotion = mediaQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", handleMotionChange);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Geometry constants
    const N = 48; // Crisp, perfectly spaced base pairs
    const FOV = 760;
    const TILT_ANGLE = (-22 * Math.PI) / 180;
    const cosTilt = Math.cos(TILT_ANGLE);
    const sinTilt = Math.sin(TILT_ANGLE);

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetMouseX = nx * 0.28;
      targetMouseY = ny * 0.22;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let scrollProgress = 0;
    const handleScroll = () => {
      const h = window.innerHeight || 800;
      scrollProgress = Math.min(1.5, Math.max(0, window.scrollY / h));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const startTime = performance.now();

    function render(now: number) {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas || !ctx) return;

      if (!isVisible && !prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const elapsed = (now - startTime) * 0.001;
      const time = prefersReducedMotion ? 0.8 : elapsed;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = currentCanvas.clientWidth;
      const height = currentCanvas.clientHeight;

      if (currentCanvas.width !== width * dpr || currentCanvas.height !== height * dpr) {
        currentCanvas.width = width * dpr;
        currentCanvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      const centerX = width * 0.58;
      const centerY = height * 0.50;
      const R = Math.min(width * 0.24, 210);
      const L = height * 0.68;

      // Pulse mechanics (upward moving wave of truth)
      const pulsePeriod = 3.6;
      const cycle = time % pulsePeriod;
      const pulseU = (cycle / pulsePeriod) * 2.5 - 1.25;
      const survivingIndex = 28;

      const transformPoint = (x: number, y: number, z: number) => {
        // Tilt around Z axis
        const xTilt = x * cosTilt - y * sinTilt;
        const yTilt = x * sinTilt + y * cosTilt;
        const zTilt = z;

        // Mouse Parallax 3D Rotation
        const cosY = Math.cos(currentMouseX);
        const sinY = Math.sin(currentMouseX);
        const xRotY = xTilt * cosY + zTilt * sinY;
        const zRotY = -xTilt * sinY + zTilt * cosY;

        const cosX = Math.cos(currentMouseY);
        const sinX = Math.sin(currentMouseY);
        const yRotX = yTilt * cosX - zRotY * sinX;
        const zRotX = yTilt * sinX + zRotY * cosX;

        return { x: xRotY, y: yRotX, z: zRotX };
      };

      interface RungData {
        blue3D: { x: number; y: number; z: number };
        red3D: { x: number; y: number; z: number };
        blueProj: { x: number; y: number; scale: number };
        redProj: { x: number; y: number; scale: number };
        u: number;
        index: number;
        isSurviving: boolean;
        distToPulse: number;
        inPulse: boolean;
      }

      const rungs: RungData[] = [];

      for (let i = 0; i < N; i++) {
        const u = (i / (N - 1)) * 2 - 1;
        const theta =
          u * Math.PI * 2.4 + time * 0.35 + scrollProgress * Math.PI * 1.2;

        // Blue strand anchor
        const bx0 = Math.cos(theta) * R;
        const bz0 = Math.sin(theta) * R;
        const by0 = u * L;

        // Red strand anchor
        const rx0 = Math.cos(theta + Math.PI) * R;
        const rz0 = Math.sin(theta + Math.PI) * R;
        const ry0 = u * L;

        const ptB = transformPoint(bx0, by0, bz0);
        const ptR = transformPoint(rx0, ry0, rz0);

        const scaleB = FOV / (FOV + ptB.z);
        const scaleR = FOV / (FOV + ptR.z);

        const distPulse = Math.abs(pulseU - u);
        const inPulse = distPulse < 0.24;
        const isSurviving = i === survivingIndex;

        rungs.push({
          blue3D: ptB,
          red3D: ptR,
          blueProj: {
            x: centerX + ptB.x * scaleB,
            y: centerY + ptB.y * scaleB,
            scale: scaleB,
          },
          redProj: {
            x: centerX + ptR.x * scaleR,
            y: centerY + ptR.y * scaleR,
            scale: scaleR,
          },
          u,
          index: i,
          isSurviving,
          distToPulse: distPulse,
          inPulse,
        });
      }

      interface RenderPassItem {
        z: number;
        draw: () => void;
      }

      const drawQueue: RenderPassItem[] = [];

      // =========================================================================
      // 1. Thick Volumetric Ribbon Strands (Blue/Cyan/Emerald + Red/Rose/Amber)
      // =========================================================================
      for (let i = 0; i < N - 1; i++) {
        const r1 = rungs[i];
        const r2 = rungs[i + 1];

        // --- Strand A (Blue to Emerald gradient flow) ---
        const avgZB = (r1.blue3D.z + r2.blue3D.z) * 0.5;
        const scaleB = (r1.blueProj.scale + r2.blueProj.scale) * 0.5;
        drawQueue.push({
          z: avgZB,
          draw: () => {
            const isNear = avgZB <= 0;
            const alpha = isNear ? 0.95 : Math.max(0.2, 0.45 - avgZB / 500);
            const thickness = Math.max(3.5, 9.0 * scaleB);

            // Volumetric gradient between blue and green
            const grad = ctx.createLinearGradient(
              r1.blueProj.x,
              r1.blueProj.y,
              r2.blueProj.x,
              r2.blueProj.y
            );

            // RGB mixture: Blue -> Cyan -> Emerald
            const tColor = (r1.u + 1) * 0.5;
            if (tColor < 0.5) {
              grad.addColorStop(0, isDark ? "#38BDF8" : "#2563EB");
              grad.addColorStop(1, isDark ? "#06B6D4" : "#0284C7");
            } else {
              grad.addColorStop(0, isDark ? "#06B6D4" : "#0284C7");
              grad.addColorStop(1, isDark ? "#34D399" : "#059669");
            }

            // Outer soft glow
            ctx.beginPath();
            ctx.moveTo(r1.blueProj.x, r1.blueProj.y);
            ctx.lineTo(r2.blueProj.x, r2.blueProj.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = thickness * 2.0;
            ctx.lineCap = "round";
            ctx.globalAlpha = alpha * 0.28;
            ctx.stroke();

            // Main thick strand body
            ctx.beginPath();
            ctx.moveTo(r1.blueProj.x, r1.blueProj.y);
            ctx.lineTo(r2.blueProj.x, r2.blueProj.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = thickness;
            ctx.lineCap = "round";
            ctx.globalAlpha = alpha;
            ctx.stroke();

            // Inner specular light spine
            if (isNear) {
              ctx.beginPath();
              ctx.moveTo(r1.blueProj.x, r1.blueProj.y);
              ctx.lineTo(r2.blueProj.x, r2.blueProj.y);
              ctx.strokeStyle = "#FFFFFF";
              ctx.lineWidth = Math.max(1.2, thickness * 0.28);
              ctx.globalAlpha = alpha * 0.75;
              ctx.stroke();
            }
          },
        });

        // --- Strand B (Red to Coral/Amber gradient flow) ---
        const avgZR = (r1.red3D.z + r2.red3D.z) * 0.5;
        const scaleR = (r1.redProj.scale + r2.redProj.scale) * 0.5;
        drawQueue.push({
          z: avgZR,
          draw: () => {
            const isNear = avgZR <= 0;
            const alpha = isNear ? 0.95 : Math.max(0.2, 0.45 - avgZR / 500);
            const thickness = Math.max(3.5, 9.0 * scaleR);

            const grad = ctx.createLinearGradient(
              r1.redProj.x,
              r1.redProj.y,
              r2.redProj.x,
              r2.redProj.y
            );

            // RGB mixture: Crimson Red -> Rose -> Amber
            grad.addColorStop(0, isDark ? "#FB7185" : "#E11D48");
            grad.addColorStop(1, isDark ? "#F43F5E" : "#DC2626");

            // Outer soft glow
            ctx.beginPath();
            ctx.moveTo(r1.redProj.x, r1.redProj.y);
            ctx.lineTo(r2.redProj.x, r2.redProj.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = thickness * 2.0;
            ctx.lineCap = "round";
            ctx.globalAlpha = alpha * 0.28;
            ctx.stroke();

            // Main thick strand body
            ctx.beginPath();
            ctx.moveTo(r1.redProj.x, r1.redProj.y);
            ctx.lineTo(r2.redProj.x, r2.redProj.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = thickness;
            ctx.lineCap = "round";
            ctx.globalAlpha = alpha;
            ctx.stroke();

            // Inner specular light spine
            if (isNear) {
              ctx.beginPath();
              ctx.moveTo(r1.redProj.x, r1.redProj.y);
              ctx.lineTo(r2.redProj.x, r2.redProj.y);
              ctx.strokeStyle = "#FFFFFF";
              ctx.lineWidth = Math.max(1.2, thickness * 0.28);
              ctx.globalAlpha = alpha * 0.75;
              ctx.stroke();
            }
          },
        });
      }

      // =========================================================================
      // 2. Volumetric Base-Pair Rungs & 3D Shaded Spherical Joints
      // =========================================================================
      for (let i = 0; i < N; i++) {
        const rung = rungs[i];
        const avgZ = (rung.blue3D.z + rung.red3D.z) * 0.5;

        // Bridge Bar (Thick horizontal connecting rung)
        drawQueue.push({
          z: avgZ,
          draw: () => {
            const isNear = avgZ <= 0;
            let bridgeAlpha = isNear ? 0.65 : 0.25;
            let thickness = Math.max(2.2, 5.0 * ((rung.blueProj.scale + rung.redProj.scale) * 0.5));

            if (rung.inPulse) {
              if (rung.isSurviving) {
                bridgeAlpha = 1.0;
                thickness *= 1.6;
              } else {
                bridgeAlpha = 0.15;
              }
            }

            // Cross-strand gradient: Blue -> Emerald (Center) -> Red
            const rungGrad = ctx.createLinearGradient(
              rung.blueProj.x,
              rung.blueProj.y,
              rung.redProj.x,
              rung.redProj.y
            );
            rungGrad.addColorStop(0, isDark ? "#38BDF8" : "#2563EB");
            rungGrad.addColorStop(0.5, isDark ? "#34D399" : "#059669"); // Emerald center!
            rungGrad.addColorStop(1, isDark ? "#FB7185" : "#E11D48");

            // Soft glow
            ctx.beginPath();
            ctx.moveTo(rung.blueProj.x, rung.blueProj.y);
            ctx.lineTo(rung.redProj.x, rung.redProj.y);
            ctx.strokeStyle = rungGrad;
            ctx.lineWidth = thickness * 1.8;
            ctx.lineCap = "round";
            ctx.globalAlpha = bridgeAlpha * 0.35;
            ctx.stroke();

            // Main cylinder
            ctx.beginPath();
            ctx.moveTo(rung.blueProj.x, rung.blueProj.y);
            ctx.lineTo(rung.redProj.x, rung.redProj.y);
            ctx.strokeStyle = rungGrad;
            ctx.lineWidth = thickness;
            ctx.lineCap = "round";
            ctx.globalAlpha = bridgeAlpha;
            ctx.stroke();

            // Glowing central emerald bead at the midpoint
            const midX = (rung.blueProj.x + rung.redProj.x) * 0.5;
            const midY = (rung.blueProj.y + rung.redProj.y) * 0.5;
            const beadRadius = (rung.isSurviving && rung.inPulse ? 5.5 : 3.0) * ((rung.blueProj.scale + rung.redProj.scale) * 0.5);

            ctx.beginPath();
            ctx.arc(midX, midY, beadRadius * 1.8, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? "#34D399" : "#059669";
            ctx.globalAlpha = bridgeAlpha * 0.4;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(midX, midY, beadRadius, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? "#6EE7B7" : "#10B981";
            ctx.globalAlpha = bridgeAlpha;
            ctx.fill();
          },
        });

        // 3D Shaded Blue Joint Sphere
        drawQueue.push({
          z: rung.blue3D.z,
          draw: () => {
            const isNear = rung.blue3D.z <= 0;
            const alpha = isNear ? 0.98 : Math.max(0.3, 0.55 - rung.blue3D.z / 450);
            const radius = (rung.isSurviving && rung.inPulse ? 8.5 : 6.2) * rung.blueProj.scale;
            const cx = rung.blueProj.x;
            const cy = rung.blueProj.y;

            // Outer bloom glow
            ctx.beginPath();
            ctx.arc(cx, cy, radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? "#38BDF8" : "#2563EB";
            ctx.globalAlpha = alpha * 0.35;
            ctx.fill();

            // Radial 3D sphere gradient (specular glint at top-left)
            const radGrad = ctx.createRadialGradient(
              cx - radius * 0.35,
              cy - radius * 0.35,
              radius * 0.08,
              cx,
              cy,
              radius
            );
            radGrad.addColorStop(0, "#FFFFFF");
            radGrad.addColorStop(0.35, isDark ? "#60A5FA" : "#3B82F6");
            radGrad.addColorStop(0.85, isDark ? "#1D4ED8" : "#1E40AF");
            radGrad.addColorStop(1, isDark ? "#0F172A" : "#172554");

            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fillStyle = radGrad;
            ctx.globalAlpha = alpha;
            ctx.fill();
          },
        });

        // 3D Shaded Red Joint Sphere
        drawQueue.push({
          z: rung.red3D.z,
          draw: () => {
            const isNear = rung.red3D.z <= 0;
            const alpha = isNear ? 0.98 : Math.max(0.3, 0.55 - rung.red3D.z / 450);
            const radius = (rung.isSurviving && rung.inPulse ? 8.5 : 6.2) * rung.redProj.scale;
            const cx = rung.redProj.x;
            const cy = rung.redProj.y;

            // Outer bloom glow
            ctx.beginPath();
            ctx.arc(cx, cy, radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? "#FB7185" : "#E11D48";
            ctx.globalAlpha = alpha * 0.35;
            ctx.fill();

            // Radial 3D sphere gradient (specular glint at top-left)
            const radGrad = ctx.createRadialGradient(
              cx - radius * 0.35,
              cy - radius * 0.35,
              radius * 0.08,
              cx,
              cy,
              radius
            );
            radGrad.addColorStop(0, "#FFFFFF");
            radGrad.addColorStop(0.35, isDark ? "#FB7185" : "#F43F5E");
            radGrad.addColorStop(0.85, isDark ? "#BE123C" : "#9F1239");
            radGrad.addColorStop(1, isDark ? "#4C0519" : "#4C0519");

            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fillStyle = radGrad;
            ctx.globalAlpha = alpha;
            ctx.fill();
          },
        });

        // Expanding Energy Waves on Surviving Rung
        if (rung.isSurviving && rung.inPulse) {
          const tRipple = Math.min(1, 1 - rung.distToPulse / 0.24);
          const rRadius = tRipple * 64;
          drawQueue.push({
            z: Math.min(rung.blue3D.z, rung.red3D.z) - 10,
            draw: () => {
              const mx = (rung.blueProj.x + rung.redProj.x) * 0.5;
              const my = (rung.blueProj.y + rung.redProj.y) * 0.5;

              ctx.beginPath();
              ctx.arc(mx, my, rRadius, 0, Math.PI * 2);
              ctx.strokeStyle = isDark ? "#34D399" : "#059669";
              ctx.lineWidth = 1.8;
              ctx.globalAlpha = tRipple * 0.8;
              ctx.stroke();

              ctx.beginPath();
              ctx.arc(mx, my, rRadius * 0.6, 0, Math.PI * 2);
              ctx.strokeStyle = isDark ? "#60A5FA" : "#2563EB";
              ctx.lineWidth = 1.2;
              ctx.globalAlpha = tRipple * 0.5;
              ctx.stroke();
            },
          });
        }
      }

      // Sort back-to-front (Z-sort)
      drawQueue.sort((a, b) => b.z - a.z);

      // Render
      for (let k = 0; k < drawQueue.length; k++) {
        drawQueue[k].draw();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[580px] lg:min-h-[720px] pointer-events-none select-none overflow-visible"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
