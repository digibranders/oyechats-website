export interface Point {
  phi: number;
  theta: number;
  /** Deterministic random spawn offset for entry animation */
  spawnX: number;
  spawnY: number;
  spawnZ: number;
}

export interface Projected {
  px: number;
  py: number;
  wz: number;
  wy: number;
  n: number;
  /** Index of the original point — used for staggered entry */
  idx: number;
}

export interface Ripple {
  cx: number;
  cy: number;
  /** Frame counter since click */
  time: number;
  maxRadius: number;
}

export type QualityTier = 'high' | 'medium' | 'low';

export interface SphereConfig {
  baseR: number;
  deform: number;
  rows: number;
  cols: number;
  fov: number;
  tiltX: number;
  canvasW: number;
  canvasH: number;
}
