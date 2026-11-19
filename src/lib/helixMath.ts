/**
 * Mathematical utilities for the 3D Double-Helix visualization.
 * All computations are pure, deterministic, and optimized for locked 60fps rendering.
 */

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface ProjectedPoint {
  screenX: number;
  screenY: number;
  scale: number;
}

export interface SatelliteConfig {
  dx: number;
  dy: number;
  dz: number;
  radius: number;
  alphaFactor: number;
}

/**
 * Deterministic pseudo-random number generator for stable particle seeds.
 */
export function deterministicRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Calculates the strand rotation angle theta based on height u, elapsed time, and scroll progress.
 */
export function calculateTheta(
  u: number,
  time: number,
  scrollProgress: number
): number {
  return u * Math.PI * 2.5 + time * 0.32 + scrollProgress * Math.PI * 1.1;
}

/**
 * Transforms a 3D coordinate through fixed editorial tilt and mouse parallax rotation.
 */
export function transform3DPoint(
  x: number,
  y: number,
  z: number,
  cosTilt: number,
  sinTilt: number,
  radX: number,
  radY: number
): Point3D {
  // Tilt in XY plane (-20deg)
  const xTilt = x * cosTilt - y * sinTilt;
  const yTilt = x * sinTilt + y * cosTilt;
  const zTilt = z;

  // Horizontal parallax rotation around Y axis
  const cosY = Math.cos(radY);
  const sinY = Math.sin(radY);
  const xRotY = xTilt * cosY + zTilt * sinY;
  const zRotY = -xTilt * sinY + zTilt * cosY;

  // Vertical parallax rotation around X axis
  const cosX = Math.cos(radX);
  const sinX = Math.sin(radX);
  const yRotX = yTilt * cosX - zRotY * sinX;
  const zRotX = yTilt * sinX + zRotY * cosX;

  return { x: xRotY, y: yRotX, z: zRotX };
}

/**
 * Projects a 3D point onto the 2D viewport plane using perspective FOV.
 */
export function projectPoint(
  x: number,
  y: number,
  z: number,
  fov: number,
  centerX: number,
  centerY: number
): ProjectedPoint {
  const safeZ = Math.max(-fov + 1, z);
  const scale = fov / (fov + safeZ);
  return {
    screenX: centerX + x * scale,
    screenY: centerY + y * scale,
    scale,
  };
}

/**
 * Computes the 3.2-second upward pulse state.
 * The pulse glides upward from bottom (+1.2) to top (-1.2).
 */
export function calculatePulse(
  time: number,
  pulsePeriod = 3.2
): { pulseU: number; pulseProgress: number } {
  const cycleTime = ((time % pulsePeriod) + pulsePeriod) % pulsePeriod;
  const pulseProgress = cycleTime / pulsePeriod;
  // Upward glide: begins at +1.2 (bottom) and rises to -1.2 (top)
  const pulseU = 1.2 - pulseProgress * 2.4;
  return { pulseU, pulseProgress };
}

/**
 * Generates precomputed deterministic satellites for a rung anchor.
 * count is between 5 and 7 dots.
 */
export function generateSatellites(
  rungIndex: number,
  strandSeedOffset: number
): SatelliteConfig[] {
  const count = 5 + Math.floor(deterministicRandom(rungIndex * 13 + strandSeedOffset) * 3);
  const list: SatelliteConfig[] = [];

  for (let s = 0; s < count; s++) {
    const seed = rungIndex * 100 + s * 7 + strandSeedOffset;
    const dist = 7 + deterministicRandom(seed) * 16;
    const angle = deterministicRandom(seed + 1) * Math.PI * 2;
    const elevation = (deterministicRandom(seed + 2) - 0.5) * 14;

    list.push({
      dx: Math.cos(angle) * dist,
      dy: elevation,
      dz: Math.sin(angle) * dist,
      radius: 0.9 + deterministicRandom(seed + 3) * 1.3,
      alphaFactor: 0.35 + deterministicRandom(seed + 4) * 0.45,
    });
  }

  return list;
}
