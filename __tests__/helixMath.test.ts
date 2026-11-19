import {
  deterministicRandom,
  calculateTheta,
  transform3DPoint,
  projectPoint,
  calculatePulse,
  generateSatellites,
} from "../src/lib/helixMath";

describe("Helix Math and Geometry Engine", () => {
  test("deterministicRandom produces repeatable outputs in [0, 1)", () => {
    const r1 = deterministicRandom(42);
    const r2 = deterministicRandom(42);
    const r3 = deterministicRandom(99);

    expect(r1).toBe(r2);
    expect(r1).toBeGreaterThanOrEqual(0);
    expect(r1).toBeLessThan(1);
    expect(r3).not.toBe(r1);
  });

  test("calculateTheta conforms exactly to the rotation specification", () => {
    const u = 0.5;
    const time = 2.0;
    const scrollProgress = 0.8;

    const expected =
      u * Math.PI * 2.5 + time * 0.32 + scrollProgress * Math.PI * 1.1;
    const actual = calculateTheta(u, time, scrollProgress);

    expect(actual).toBeCloseTo(expected, 8);
  });

  test("transform3DPoint applies -20deg tilt and mouse parallax correctly", () => {
    const tiltAngle = (-20 * Math.PI) / 180;
    const cosTilt = Math.cos(tiltAngle);
    const sinTilt = Math.sin(tiltAngle);

    // Test zero mouse parallax
    const pt = transform3DPoint(100, 0, 0, cosTilt, sinTilt, 0, 0);
    expect(pt.x).toBeCloseTo(100 * cosTilt, 5);
    expect(pt.y).toBeCloseTo(100 * sinTilt, 5);
    expect(pt.z).toBeCloseTo(0, 5);
  });

  test("projectPoint applies perspective projection with FOV 740", () => {
    const fov = 740;
    const centerX = 500;
    const centerY = 400;

    // Point on focal plane (z = 0)
    const p1 = projectPoint(100, 50, 0, fov, centerX, centerY);
    expect(p1.scale).toBe(1.0);
    expect(p1.screenX).toBe(600);
    expect(p1.screenY).toBe(450);

    // Far point (z = 740)
    const p2 = projectPoint(100, 50, 740, fov, centerX, centerY);
    expect(p2.scale).toBe(0.5);
    expect(p2.screenX).toBe(550);
    expect(p2.screenY).toBe(425);
  });

  test("calculatePulse executes an upward sweep over a 3.2s cycle", () => {
    const period = 3.2;

    // Start of cycle: bottom position (+1.2)
    const start = calculatePulse(0, period);
    expect(start.pulseU).toBeCloseTo(1.2, 5);

    // Mid cycle (1.6s): center position (0.0)
    const mid = calculatePulse(1.6, period);
    expect(mid.pulseU).toBeCloseTo(0.0, 5);

    // Near end of cycle (3.19s): top position (near -1.2)
    const end = calculatePulse(3.199, period);
    expect(end.pulseU).toBeLessThan(-1.18);
    expect(end.pulseU).toBeGreaterThanOrEqual(-1.2);

    // Verifies upward motion (start is bottom, end is top)
    expect(start.pulseU).toBeGreaterThan(mid.pulseU);
    expect(mid.pulseU).toBeGreaterThan(end.pulseU);
  });

  test("generateSatellites creates between 5 and 7 deterministic micro-dots per anchor", () => {
    for (let i = 0; i < 56; i++) {
      const blueSatellites = generateSatellites(i, 1);
      const redSatellites = generateSatellites(i, 5);

      expect(blueSatellites.length).toBeGreaterThanOrEqual(5);
      expect(blueSatellites.length).toBeLessThanOrEqual(7);

      expect(redSatellites.length).toBeGreaterThanOrEqual(5);
      expect(redSatellites.length).toBeLessThanOrEqual(7);

      for (const dot of blueSatellites) {
        expect(dot.radius).toBeGreaterThan(0.8);
        expect(dot.radius).toBeLessThan(2.5);
        expect(dot.alphaFactor).toBeGreaterThan(0);
        expect(dot.alphaFactor).toBeLessThanOrEqual(1);
      }
    }
  });
});
