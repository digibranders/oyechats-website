'use client';

import { useEffect, useRef } from 'react';
import { noise } from './particle-math';

interface AntigravityParticlesProps {
  /** 0 = top of hero, 1 = hero fully scrolled out */
  scrollProgress?: number;
}

/* ── Per-particle mutable state ── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  opacity: number;
  noiseOffX: number;
  noiseOffY: number;
  /* ── capsule shape ── */
  w: number;         // narrow side (px, canvas coords)
  h: number;         // long side (px, canvas coords)
  angle: number;     // current rotation (radians)
  va: number;        // angular velocity (radians/frame)
  colorIdx: number;  // index into COLORS
}

/** Deterministic pseudo-random in [0, 1) seeded by index + salt */
function seeded(i: number, salt: number): number {
  return ((Math.sin(i * 127.1 + salt * 311.7) * 43758.5453) % 1 + 1) % 1;
}

/* ── Physics constants ── */
const ANTIGRAV       = 0.008;   // gentle upward drift
const RETURN_FORCE   = 0.003;   // spring back to base position
const DAMPING        = 0.96;    // velocity damping per frame
const NOISE_SCALE    = 0.12;    // perlin noise drift
// CURSOR_RADIUS and CURSOR_FORCE defined per-instance inside the effect
const CELEBRATE_FRAMES = 40;

/* ── OyeChats brand color palette ── */
const COLORS: { r: number; g: number; b: number }[] = [
  { r: 37,  g: 99,  b: 235 },  // blue-600   #2563EB  (primary CTA)
  { r: 96,  g: 165, b: 250 },  // blue-400   #60A5FA
  { r: 147, g: 197, b: 253 },  // blue-300   #93C5FD
  { r: 99,  g: 102, b: 241 },  // indigo-500 #6366F1
  { r: 129, g: 140, b: 248 },  // indigo-400 #818CF8
  { r: 6,   g: 182, b: 212 },  // cyan-500   #06B6D4
  { r: 34,  g: 211, b: 238 },  // cyan-400   #22D3EE
  { r: 139, g: 92,  b: 246 },  // violet-500 #8B5CF6
  { r: 167, g: 139, b: 250 },  // violet-400 #A78BFA
  { r: 16,  g: 185, b: 129 },  // emerald-500 #10B981
  { r: 251, g: 191, b: 36  },  // amber-400  #FBBF24
];

export function AntigravityParticles({
  scrollProgress = 0,
}: AntigravityParticlesProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(scrollProgress);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const maybeCtx = canvas.getContext('2d');
    if (!maybeCtx) return;
    const ctx = maybeCtx;

    /* ── Canvas sizing (retina-aware) ── */
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;

    function resize(): void {
      if (!parent || !canvas) return;
      const rect = parent.getBoundingClientRect();
      W = Math.round(rect.width * dpr);
      H = Math.round(rect.height * dpr);
      canvas.width = W;
      canvas.height = H;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    /* ── Detect mobile ── */
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 70 : 150;

    /* ── Initialise particles (radial distribution from center) ── */
    const particles: Particle[] = [];

    function initParticles(): void {
      particles.length = 0;
      // Clamp to visible viewport so particles don't spawn below the fold
      const viewportH = Math.min(H, window.innerHeight * dpr);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Random scatter across the full visible viewport — Antigravity look
        const bx = seeded(i, 1) * W;
        const by = seeded(i, 2) * viewportH;

        // 3-tier size distribution (large capsule / medium capsule / tiny dot)
        const tier = seeded(i, 8);
        let w: number;
        if (tier > 0.75) {
          w = (2 + seeded(i, 3)) * dpr;             // tiny dot
        } else if (tier > 0.35) {
          w = (2.5 + seeded(i, 3) * 1.5) * dpr;    // medium
        } else {
          w = (3 + seeded(i, 3) * 2) * dpr;         // large
        }
        const h = w * (2.5 + seeded(i, 9) * 2);    // length = 2.5–4.5× width

        particles.push({
          x: bx, y: by,
          vx: 0, vy: 0,
          baseX: bx, baseY: by,
          opacity: 0.55 + seeded(i, 4) * 0.4,
          noiseOffX: seeded(i, 5) * 100,
          noiseOffY: seeded(i, 6) * 100,
          w, h,
          angle:    seeded(i, 10) * Math.PI * 2,
          va:       (seeded(i, 11) - 0.5) * 0.02,
          colorIdx: Math.floor(seeded(i, 7) * COLORS.length),
        });
      }
    }

    initParticles();

    /* ── DPR-aware cursor radius: 160 CSS px expressed in canvas px ── */
    const CURSOR_RADIUS = 160 * dpr;
    const CURSOR_FORCE  = 6.0;   // strong scatter on approach

    /* ── Cursor state ── */
    let cursorX = -9999;
    let cursorY = -9999;
    let hasCursor = false;

    const updateCursor = (clientX: number, clientY: number): void => {
      const rect = canvas.getBoundingClientRect();
      cursorX = ((clientX - rect.left) / rect.width)  * W;
      cursorY = ((clientY - rect.top)  / rect.height) * H;
      hasCursor = true;
    };

    // Attach to window so mouse events fire regardless of which child
    // element the cursor is over (buttons, text, etc.)
    const onMouseMove  = (e: MouseEvent): void => updateCursor(e.clientX, e.clientY);
    const onMouseLeave = (): void => { hasCursor = false; cursorX = -9999; cursorY = -9999; };
    const onTouchMove  = (e: TouchEvent): void => {
      if (!e.touches[0]) return;
      updateCursor(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = (): void => { hasCursor = false; cursorX = -9999; cursorY = -9999; };

    /* ── Celebration burst ── */
    let celebrateCounter = 0;
    const onCelebrate = (): void => { celebrateCounter = CELEBRATE_FRAMES; };

    /* ── Wire listeners ── */
    window.addEventListener('mousemove',  onMouseMove,  { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchmove',  onTouchMove,  { passive: true });
    window.addEventListener('touchend',   onTouchEnd);
    window.addEventListener('oye:celebrate', onCelebrate);

    /* ── Entry animation ── */
    let entryProgress = 0;
    const ENTRY_SPEED = 0.03;

    /* ── Reinitialise base positions on resize ── */
    let prevW = W;
    let prevH = H;

    /* ── Draw loop ── */
    let animId: number;

    function draw(): void {
      const t      = performance.now() * 0.0004;
      const scroll = scrollRef.current;
      const scrollAlpha = Math.max(0, 1 - scroll * 0.6);

      if (scrollAlpha <= 0 || document.hidden) {
        animId = requestAnimationFrame(draw);
        return;
      }

      // Re-seed base positions if canvas was resized significantly
      if (Math.abs(W - prevW) > 20 || Math.abs(H - prevH) > 20) {
        initParticles();
        prevW = W;
        prevH = H;
      }

      // Entry easing
      if (entryProgress < 0.995) {
        entryProgress += (1 - entryProgress) * ENTRY_SPEED;
      } else {
        entryProgress = 1;
      }

      // Celebrate decay
      let celebrateMag = 0;
      if (celebrateCounter > 0) {
        celebrateMag = celebrateCounter / CELEBRATE_FRAMES;
        celebrateCounter--;
      }

      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Perlin noise drift
        const nx = noise(p.noiseOffX, 0, 0, t) * NOISE_SCALE;
        const ny = noise(0, p.noiseOffY, 0, t) * NOISE_SCALE;
        p.vx += nx;
        p.vy += ny;

        // Gentle upward drift (anti-gravity)
        p.vy -= ANTIGRAV;

        // Spring return to base position (keeps particles scattered, not drifting away)
        p.vx += (p.baseX - p.x) * RETURN_FORCE;
        p.vy += (p.baseY - p.y) * RETURN_FORCE;

        // Cursor repulsion
        if (hasCursor) {
          const dx   = p.x - cursorX;
          const dy   = p.y - cursorY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_RADIUS && dist > 0.1) {
            const factor = 1 - dist / CURSOR_RADIUS;
            p.vx += (dx / dist) * factor * CURSOR_FORCE;
            p.vy += (dy / dist) * factor * CURSOR_FORCE;
            // Spin when repulsed
            p.va += (dx / dist) * factor * 0.05;
          }
        }

        // Celebration outward burst
        if (celebrateMag > 0) {
          const dx   = p.x - W / 2;
          const dy   = p.y - H / 2;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          p.vx += (dx / dist) * celebrateMag * 2.5;
          p.vy += (dy / dist) * celebrateMag * 2.5;
          p.va += celebrateMag * 0.1;
        }

        // Velocity + angular damping
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.va *= 0.97;

        // Update position and angle
        p.x     += p.vx;
        p.y     += p.vy;
        p.angle += p.va;

        // Boundary wrapping — reset velocity to prevent rocket/fountain effect
        const pad = p.h; // use long side as padding so capsule fully exits
        if (p.y < -pad)    { p.y = H + pad * 0.5; p.vy = 0; }
        if (p.y > H + pad) { p.y = -pad * 0.5;    p.vy = 0; }
        if (p.x < -pad)    { p.x = W + pad * 0.5; p.vx = 0; }
        if (p.x > W + pad) { p.x = -pad * 0.5;    p.vx = 0; }

        // Compute alpha
        let alpha = p.opacity * scrollAlpha;
        if (entryProgress < 1) {
          const stagger = Math.max(0, Math.min(1, entryProgress * 2 - (i / particles.length) * 0.8));
          alpha *= stagger;
        }
        if (alpha < 0.01) continue;

        // Draw rounded capsule
        const c      = COLORS[p.colorIdx];
        const radius = p.w / 2; // fully rounded short ends = capsule shape

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${Math.min(1, alpha)})`;
        ctx.beginPath();
        // roundRect(x, y, width, height, radii)
        ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, radius);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    }

    draw();

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove',  onTouchMove);
      window.removeEventListener('touchend',   onTouchEnd);
      window.removeEventListener('oye:celebrate', onCelebrate);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block w-full h-full"
      role="img"
      aria-label="Floating particle animation"
    />
  );
}
