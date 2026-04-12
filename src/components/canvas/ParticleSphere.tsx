'use client';

import { useEffect, useRef } from 'react';
import { noise, rotY, rotX, orbColor } from './particle-math';
import type { Point, Projected, Ripple, QualityTier } from './particle-types';

interface ParticleSphereProps {
  /** 0 = top of hero, 1 = hero fully scrolled out */
  scrollProgress?: number;
}

export function ParticleSphere({ scrollProgress = 0 }: ParticleSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(scrollProgress);

  // Keep scroll ref in sync without re-running the effect
  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const maybeCtx = canvas.getContext('2d');
    if (!maybeCtx) return;
    const ctx = maybeCtx; // narrowed to non-null for nested closures

    const W = canvas.width;
    const H = canvas.height;
    const CX = W / 2;
    const CY = H / 2;

    // ── Config ──
    const BASE_R = 195;
    const DEFORM = 88;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const ROWS = isMobile ? 30 : 58;
    const COLS = isMobile ? 36 : 72;
    const FOV = 560;
    const TILT_X = 0.28;

    // ── Generate points with deterministic spawn positions ──
    const pts: Point[] = [];
    for (let i = 0; i <= ROWS; i++) {
      for (let j = 0; j <= COLS; j++) {
        const phi = (Math.PI * i) / ROWS;
        const theta = (2 * Math.PI * j) / COLS;
        pts.push({
          phi,
          theta,
          spawnX: Math.sin(phi * 7.3 + theta * 2.1) * 380,
          spawnY: Math.cos(theta * 5.1 + phi * 3.3) * 380,
          spawnZ: Math.sin(phi * theta * 3.7 + phi * 1.9) * 380,
        });
      }
    }

    let angleY = 0;
    let animId: number;

    // ── Entry animation ──
    let entryProgress = 0;
    const ENTRY_SPEED = 0.045;

    // ── Cursor-interactive antigravity ──
    const MAX_TILT = 0.35;
    const LERP_SPEED = 0.025;
    const DAMPING = 0.92;
    let targetRotXVal = 0;
    let targetRotYVal = 0;
    let curRotXVal = 0;
    let curRotYVal = 0;
    let velRotXVal = 0;
    let velRotYVal = 0;

    // ── Magnetic cursor (canvas-space) ──
    const MAGNET_RADIUS = 80;
    let cursorCanvasX = -9999;
    let cursorCanvasY = -9999;
    let hasCursor = false;

    // ── Idle breathing ──
    let idleFrames = 0;
    let breathFactor = 0;
    const IDLE_THRESHOLD = 120; // frames before breathing kicks in

    // ── Click ripples ──
    const ripples: Ripple[] = [];
    const MAX_RIPPLES = 3;

    // ── Adaptive quality ──
    let qualityTier: QualityTier = 'high';
    const frameTimes: number[] = [];
    let lastFrameTime = performance.now();
    let tierFrameCount = 0;

    // ── Celebration / pulse events ──
    let celebrateFrames = 0;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let _pulseFromCenter = false;

    // ── Gyroscope (mobile) ──
    let hasMouseMoved = false;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let _gyroActive = false;

    // ── Connection lines spatial hash ──
    const CELL_SIZE = 32;
    const GRID_W = Math.ceil(W / CELL_SIZE);
    const GRID_H = Math.ceil(H / CELL_SIZE);
    const CONNECTION_DIST = 28;

    // ── Event listeners ──
    const heroSection = canvas.closest('section') || canvas.parentElement;

    const updateCursorCanvas = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      cursorCanvasX = ((clientX - rect.left) / rect.width) * W;
      cursorCanvasY = ((clientY - rect.top) / rect.height) * H;
      hasCursor = true;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!heroSection) return;
      hasMouseMoved = true;
      idleFrames = 0;
      const rect = heroSection.getBoundingClientRect();
      const offsetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const offsetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRotYVal = offsetX * MAX_TILT;
      targetRotXVal = -offsetY * MAX_TILT;
      updateCursorCanvas(e.clientX, e.clientY);
    };

    const onMouseLeave = () => {
      targetRotXVal = 0;
      targetRotYVal = 0;
      hasCursor = false;
      cursorCanvasX = -9999;
      cursorCanvasY = -9999;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!heroSection || !e.touches[0]) return;
      idleFrames = 0;
      const touch = e.touches[0];
      const rect = heroSection.getBoundingClientRect();
      const offsetX = ((touch.clientX - rect.left) / rect.width - 0.5) * 2;
      const offsetY = ((touch.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRotYVal = offsetX * MAX_TILT;
      targetRotXVal = -offsetY * MAX_TILT;
      updateCursorCanvas(touch.clientX, touch.clientY);
    };

    const onTouchEnd = () => {
      targetRotXVal = 0;
      targetRotYVal = 0;
      hasCursor = false;
      cursorCanvasX = -9999;
      cursorCanvasY = -9999;
    };

    const onClick = (e: MouseEvent) => {
      if (ripples.length >= MAX_RIPPLES) return;
      const rect = canvas.getBoundingClientRect();
      ripples.push({
        cx: ((e.clientX - rect.left) / rect.width) * W,
        cy: ((e.clientY - rect.top) / rect.height) * H,
        time: 0,
        maxRadius: 200,
      });
    };

    const onTouchStart = (e: TouchEvent) => {
      if (ripples.length >= MAX_RIPPLES || !e.touches[0]) return;
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      ripples.push({
        cx: ((touch.clientX - rect.left) / rect.width) * W,
        cy: ((touch.clientY - rect.top) / rect.height) * H,
        time: 0,
        maxRadius: 200,
      });
    };

    const onCelebrate = () => {
      celebrateFrames = 40;
    };
    const onPulse = () => {
      _pulseFromCenter = true;
      if (ripples.length < MAX_RIPPLES) {
        ripples.push({ cx: CX, cy: CY, time: 0, maxRadius: 250 });
      }
      _pulseFromCenter = false;
    };

    // ── Gyroscope setup ──
    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (hasMouseMoved || e.gamma === null || e.beta === null) return;
      _gyroActive = true;
      idleFrames = 0;
      // Low-pass filter
      const newRotY = (e.gamma / 90) * MAX_TILT;
      const newRotX = -((e.beta - 45) / 90) * MAX_TILT; // offset by 45 for natural phone hold
      targetRotYVal = targetRotYVal * 0.85 + newRotY * 0.15;
      targetRotXVal = targetRotXVal * 0.85 + newRotX * 0.15;
    };

    // Wire up listeners
    if (heroSection) {
      heroSection.addEventListener('mousemove', onMouseMove, { passive: true });
      heroSection.addEventListener('mouseleave', onMouseLeave);
      heroSection.addEventListener('touchmove', onTouchMove, { passive: true });
      heroSection.addEventListener('touchend', onTouchEnd);
    }
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('oye:celebrate', onCelebrate);
    window.addEventListener('oye:pulse', onPulse);

    // Gyroscope — request permission on iOS
    if ('DeviceOrientationEvent' in window && isMobile) {
      const DOE = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<string>;
      };
      if (typeof DOE.requestPermission === 'function') {
        DOE.requestPermission()
          .then((state: string) => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', onDeviceOrientation, {
                passive: true,
              });
            }
          })
          .catch(() => {
            /* permission denied — silently degrade */
          });
      } else {
        window.addEventListener('deviceorientation', onDeviceOrientation, {
          passive: true,
        });
      }
    }

    // ── Adaptive quality helpers ──
    function updateQuality() {
      const now = performance.now();
      const dt = now - lastFrameTime;
      lastFrameTime = now;
      frameTimes.push(dt);
      if (frameTimes.length > 30) frameTimes.shift();

      tierFrameCount++;
      if (tierFrameCount < 60) return;
      tierFrameCount = 0;

      const avg = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
      if (avg > 20 && qualityTier !== 'low') qualityTier = 'low';
      else if (avg > 12 && avg <= 20 && qualityTier === 'high') qualityTier = 'medium';
      else if (avg < 10 && qualityTier !== 'high') qualityTier = 'high';
    }

    function shouldSkipParticle(idx: number): boolean {
      if (qualityTier === 'low') return idx % 2 === 0;
      if (qualityTier === 'medium') return idx % 3 === 0;
      return false;
    }

    // ── Draw loop ──
    function draw() {
      updateQuality();

      const scroll = scrollRef.current;
      const t = performance.now() * 0.00038;

      // Entry progress (ease-out)
      if (entryProgress < 0.995) {
        entryProgress += (1 - entryProgress) * ENTRY_SPEED;
      } else {
        entryProgress = 1;
      }

      // Idle breathing
      idleFrames++;
      if (idleFrames > IDLE_THRESHOLD) {
        breathFactor += (1 - breathFactor) * 0.016;
      } else {
        breathFactor *= 0.95;
      }

      // Celebration deform boost
      let celebrateDeform = 0;
      let celebrateBright = 0;
      if (celebrateFrames > 0) {
        const cf = celebrateFrames / 40;
        celebrateDeform = DEFORM * 0.4 * cf;
        celebrateBright = 0.3 * cf;
        celebrateFrames--;
      }

      // Smooth spring interpolation
      velRotXVal += (targetRotXVal - curRotXVal) * LERP_SPEED;
      velRotYVal += (targetRotYVal - curRotYVal) * LERP_SPEED;
      velRotXVal *= DAMPING;
      velRotYVal *= DAMPING;
      curRotXVal += velRotXVal;
      curRotYVal += velRotYVal;

      // Scroll-driven modifiers
      const scrollScale = 1 - scroll * 0.15;
      const scrollAlpha = 1 - scroll * 0.5;
      const scrollRotSpeed = 0.0022 + scroll * 0.008;

      // Breathing modulation
      const breathR =
        BASE_R * scrollScale * (1 + Math.sin(t * 1.2) * 0.025 * breathFactor);
      const currentDeform = DEFORM + celebrateDeform;

      // Motion blur: conditionally use trail clear
      const angularVelocity = Math.abs(velRotXVal) + Math.abs(velRotYVal);
      const useTrail = angularVelocity > 0.005;

      if (useTrail) {
        // Fade existing content toward transparency (no colored fill = no visible rect)
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0,0,0,0.18)';
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
      } else {
        ctx.clearRect(0, 0, W, H);
      }

      // ── Project all particles ──
      const projected: Projected[] = [];
      for (let idx = 0; idx < pts.length; idx++) {
        if (shouldSkipParticle(idx)) continue;

        const p = pts[idx];
        const bx = Math.sin(p.phi) * Math.cos(p.theta);
        const by = Math.sin(p.phi) * Math.sin(p.theta);
        const bz = Math.cos(p.phi);

        // Noise with breathing ripple
        const noiseFreqMod = 1 + Math.sin(t * 0.8) * 0.02 * breathFactor;
        const n = noise(bx * noiseFreqMod, by * noiseFreqMod, bz * noiseFreqMod, t);
        const r = breathR + n * currentDeform;

        // Sphere position
        let sx = r * bx;
        let sy = r * by;
        let sz = r * bz;

        // Entry animation: interpolate from spawn position
        if (entryProgress < 1) {
          // Stagger: particles at different phi values enter at different rates
          const stagger = Math.max(
            0,
            Math.min(1, entryProgress * 1.5 - (p.phi / Math.PI) * 0.5),
          );
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - stagger, 3);
          sx = p.spawnX + (sx - p.spawnX) * eased;
          sy = p.spawnY + (sy - p.spawnY) * eased;
          sz = p.spawnZ + (sz - p.spawnZ) * eased;
        }

        // 3D rotation
        const ry = rotY(sx, sy, sz, angleY + curRotYVal);
        const rx = rotX(ry.x, ry.y, ry.z, TILT_X + curRotXVal);

        // Perspective projection
        const sc = FOV / (FOV + rx.z + 60);
        projected.push({
          px: CX + rx.x * sc,
          py: CY + rx.y * sc,
          wz: rx.z,
          wy: ry.y,
          n,
          idx,
        });
      }

      // Depth sort (painter's algorithm)
      projected.sort((a, b) => a.wz - b.wz);

      // ── Ripple updates ──
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].time++;
        if (ripples[i].time > 60) ripples.splice(i, 1);
      }

      // ── Connection lines (constellation) — desktop only, high quality ──
      if (!isMobile && qualityTier === 'high' && entryProgress > 0.9) {
        const grid: number[][] = new Array(GRID_W * GRID_H);
        for (let i = 0; i < grid.length; i++) grid[i] = [];

        // Bucket front-facing particles
        const frontParticles: number[] = [];
        for (let i = 0; i < projected.length; i++) {
          const pp = projected[i];
          const depth = (pp.wz + breathR + currentDeform) / (2 * (breathR + currentDeform));
          if (depth < 0.5) continue;
          frontParticles.push(i);
          const cx = Math.floor(pp.px / CELL_SIZE);
          const cy = Math.floor(pp.py / CELL_SIZE);
          if (cx >= 0 && cx < GRID_W && cy >= 0 && cy < GRID_H) {
            grid[cy * GRID_W + cx].push(i);
          }
        }

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.lineWidth = 0.5;

        for (const fi of frontParticles) {
          const pp = projected[fi];
          const cx = Math.floor(pp.px / CELL_SIZE);
          const cy = Math.floor(pp.py / CELL_SIZE);

          // Check 3x3 neighborhood
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const nx = cx + dx;
              const ny = cy + dy;
              if (nx < 0 || nx >= GRID_W || ny < 0 || ny >= GRID_H) continue;
              const cell = grid[ny * GRID_W + nx];
              for (const ni of cell) {
                if (ni <= fi) continue; // avoid duplicate lines
                const np = projected[ni];
                const ddx = pp.px - np.px;
                const ddy = pp.py - np.py;
                const dist = Math.sqrt(ddx * ddx + ddy * ddy);
                if (dist < CONNECTION_DIST) {
                  const alpha = (1 - dist / CONNECTION_DIST) * 0.07 * scrollAlpha;
                  if (alpha < 0.003) continue;
                  ctx.strokeStyle = `rgba(96,165,250,${alpha})`;
                  ctx.beginPath();
                  ctx.moveTo(pp.px, pp.py);
                  ctx.lineTo(np.px, np.py);
                  ctx.stroke();
                }
              }
            }
          }
        }
        ctx.restore();
      }

      // ── Soft ambient inner glow pass ──
      if (qualityTier !== 'low') {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        for (let i = 0; i < projected.length; i++) {
          const p = projected[i];
          const depth =
            (p.wz + breathR + currentDeform) / (2 * (breathR + currentDeform));
          if (depth < 0.15) continue;

          const normN = (p.n / 1.7 + 1) / 2;
          const yFac = 1 - (p.wy + breathR) / (2 * breathR);
          // Top-lighting simulation
          const topLight = Math.max(0, -p.wy / (breathR + currentDeform)) * 0.08;
          const bright =
            Math.min(1, normN * 0.55 + depth * 0.3 + (1 - yFac) * 0.15 + topLight + celebrateBright);
          const c = orbColor(bright);

          const haloR = (1.0 + normN * 2.4 + depth * 1.2) * 3.0;
          let alpha = depth * normN * 0.045 * scrollAlpha;
          if (entryProgress < 1) alpha *= Math.min(1, entryProgress * 1.5);
          if (alpha < 0.005) continue;

          const g = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, haloR);
          g.addColorStop(0, `rgba(${c.r},${c.g},${c.b},${alpha})`);
          g.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);
          ctx.beginPath();
          ctx.arc(p.px, p.py, haloR, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }
        ctx.restore();
      }

      // ── Core dots ──
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const depth =
          (p.wz + breathR + currentDeform) / (2 * (breathR + currentDeform));
        if (depth < 0.04) continue;

        const normN = (p.n / 1.7 + 1) / 2;
        const yFac = 1 - (p.wy + breathR) / (2 * breathR);
        const topLight = Math.max(0, -p.wy / (breathR + currentDeform)) * 0.08;
        const bright =
          Math.min(1, normN * 0.55 + depth * 0.3 + (1 - yFac) * 0.15 + topLight + celebrateBright);
        const c = orbColor(bright);

        // Small crisp particles matching original HTML
        let dotR = 0.6 + normN * 1.5 + depth * 1.0;
        let alpha = (0.18 + depth * 0.55 + normN * 0.27) * scrollAlpha;

        if (entryProgress < 1) {
          const stagger = Math.max(
            0,
            Math.min(1, entryProgress * 1.5 - (pts[p.idx]?.phi ?? 0) / Math.PI * 0.5),
          );
          alpha *= stagger;
        }

        // ── Magnetic cursor effect ──
        if (hasCursor) {
          const dx = p.px - cursorCanvasX;
          const dy = p.py - cursorCanvasY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAGNET_RADIUS && dist > 0.1) {
            const factor = 1 - dist / MAGNET_RADIUS;
            // Repulsion
            p.px += (dx / dist) * factor * 12;
            p.py += (dy / dist) * factor * 12;
            // Boost brightness and size
            dotR *= 1 + factor * 0.5;
            alpha = Math.min(1, alpha + factor * 0.3);
          }
        }

        // ── Ripple displacement ──
        for (const ripple of ripples) {
          const rdx = p.px - ripple.cx;
          const rdy = p.py - ripple.cy;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
          const waveRadius = ripple.time * 4;
          const waveDist = Math.abs(rdist - waveRadius);
          if (waveDist < 20 && rdist > 0.1) {
            const waveMag =
              Math.sin((1 - waveDist / 20) * Math.PI) * 10 * (1 - ripple.time / 60);
            p.px += (rdx / rdist) * waveMag;
            p.py += (rdy / rdist) * waveMag;
            // Flash on wavefront
            alpha = Math.min(1, alpha + 0.2 * (1 - ripple.time / 60));
            dotR *= 1.2;
          }
        }

        ctx.beginPath();
        ctx.arc(p.px, p.py, Math.max(0.3, dotR), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${Math.min(1, alpha)})`;
        ctx.fill();
      }

      angleY += scrollRotSpeed;
      animId = requestAnimationFrame(draw);
    }

    draw();

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(animId);
      if (heroSection) {
        heroSection.removeEventListener('mousemove', onMouseMove);
        heroSection.removeEventListener('mouseleave', onMouseLeave);
        heroSection.removeEventListener('touchmove', onTouchMove);
        heroSection.removeEventListener('touchend', onTouchEnd);
      }
      canvas.removeEventListener('click', onClick);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('oye:celebrate', onCelebrate);
      window.removeEventListener('oye:pulse', onPulse);
      window.removeEventListener('deviceorientation', onDeviceOrientation);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={640}
      height={640}
      className="block w-full h-full"
      role="img"
      aria-label="Animated 3D particle sphere visualization"
    />
  );
}
