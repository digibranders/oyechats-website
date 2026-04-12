/**
 * Pure math functions for the ParticleSphere.
 * No DOM, no React — can be used in a worker if needed.
 */

/** Perlin-like noise combining 3 octaves of sine waves */
export function noise(x: number, y: number, z: number, t: number): number {
  const n1 =
    Math.sin(x * 1.6 + t * 0.28) *
    Math.cos(y * 1.9 + t * 0.22) *
    Math.sin(z * 1.4 + t * 0.31);
  const n2 =
    Math.sin(x * 3.1 + t * 0.55) *
    Math.cos(z * 2.6 + t * 0.48) *
    Math.sin(y * 2.8 + t * 0.41) *
    0.48;
  const n3 =
    Math.sin(x * 5.8 + t * 0.9) *
    Math.cos(y * 5.2 + t * 0.82) *
    Math.sin(z * 4.9 + t * 0.95) *
    0.22;
  return n1 + n2 + n3;
}

/** Rotate around the Y axis */
export function rotY(x: number, y: number, z: number, a: number) {
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  return { x: x * cos - z * sin, y, z: x * sin + z * cos };
}

/** Rotate around the X axis */
export function rotX(x: number, y: number, z: number, a: number) {
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  return { x, y: y * cos - z * sin, z: y * sin + z * cos };
}

/**
 * Brand-aligned color palette.
 * Maps brightness (0–1) through 4 stages anchored to the Oye Chat brand tokens:
 *   bg #030D1F → CTA start #1a46c4 → primary #2563EB → blue-3 #60A5FA → blue-4 #93C5FD
 */
export function orbColor(brightness: number): { r: number; g: number; b: number } {
  let r: number, g: number, b: number;

  if (brightness < 0.28) {
    const t = brightness / 0.28;
    r = Math.round(60 + (130 - 60) * t);
    g = Math.round(10 + (30 - 10) * t);
    b = Math.round(140 + (220 - 140) * t);
  } else if (brightness < 0.55) {
    const t = (brightness - 0.28) / 0.27;
    r = Math.round(130 + (50 - 130) * t);
    g = Math.round(30 + (110 - 30) * t);
    b = Math.round(220 + (255 - 220) * t);
  } else if (brightness < 0.78) {
    const t = (brightness - 0.55) / 0.23;
    r = Math.round(50 + (20 - 50) * t);
    g = Math.round(110 + (210 - 110) * t);
    b = 255;
  } else {
    const t = (brightness - 0.78) / 0.22;
    r = Math.round(20 + (180 - 20) * t);
    g = Math.round(210 + (240 - 210) * t);
    b = 255;
  }

  return { r: Math.min(255, r), g: Math.min(255, g), b: Math.min(255, b) };
}
