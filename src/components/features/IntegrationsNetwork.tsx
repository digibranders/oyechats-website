'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  AnimatePresence,
  type MotionValue,
} from 'framer-motion';
import {
  siFramer,
  siNextdotjs,
  siReact,
  siShopify,
  siVuedotjs,
  siWebflow,
  siWordpress,
  type SimpleIcon,
} from 'simple-icons';
import Image from 'next/image';

/* ─────────────────────────────────────────────────────────────
   Client-only mount guard (SSR renders the lightweight placeholder;
   the animated scene mounts after hydration). Zero-arg helpers are
   defined at module scope so the store reference stays stable.
   ────────────────────────────────────────────────────────────── */
const subscribeNoop = () => () => {};
const getClientTrue = () => true;
const getServerFalse = () => false;

/* Focal centre of the composition. Icon positions are expressed as
   offsets from this point in scene-space percentages of the container. */
const FOCAL_X = 50;
const FOCAL_Y = 50;

/* ─────────────────────────────────────────────────────────────
   Integration definitions — organic composition (varied sizes,
   distances, rotations). Positions are offsets from FOCAL centre.
   ────────────────────────────────────────────────────────────── */
interface IntegrationNode {
  id: string;
  name: string;
  icon: SimpleIcon;
  tint: string;
  glow: string;
  x: number;             // % offset from focal centre X
  y: number;             // % offset from focal centre Y
  scale: number;         // baseline tile scale (depth cue)
  rotation: number;      // degrees, adds hand-placed feel
  driftX: number;        // px, target 4–8 range
  driftY: number;        // px, target 4–8 range
  driftDuration: number; // seconds, 5–8
  driftDelay: number;    // seconds, keeps motion desynchronised
  bend: number;          // +1 / -1 side to bend the beam
  size: 'sm' | 'md' | 'lg';
}

const INTEGRATIONS: IntegrationNode[] = [
  {
    id: 'nextjs', name: 'Next.js', icon: siNextdotjs, tint: '#FFFFFF', glow: 'rgba(255,255,255,0.45)',
    x: -18, y: -38, scale: 1.0, rotation: 0, driftX: 5, driftY: -7, driftDuration: 5.4, driftDelay: 0.0, bend: -1, size: 'md',
  },
  {
    id: 'react', name: 'React', icon: siReact, tint: '#61DAFB', glow: 'rgba(97,218,251,0.45)',
    x: 26, y: -40, scale: 1.15, rotation: 0, driftX: -6, driftY: 6, driftDuration: 6.6, driftDelay: 0.8, bend: 1, size: 'lg',
  },
  {
    id: 'shopify', name: 'Shopify', icon: siShopify, tint: '#95BF47', glow: 'rgba(149,191,71,0.45)',
    x: -40, y: -8, scale: 1.0, rotation: 0, driftX: -5, driftY: 7, driftDuration: 5.9, driftDelay: 1.4, bend: -1, size: 'md',
  },
  {
    id: 'vue', name: 'Vue.js', icon: siVuedotjs, tint: '#4FC08D', glow: 'rgba(79,192,141,0.45)',
    x: 40, y: -6, scale: 1.06, rotation: 0, driftX: 7, driftY: -5, driftDuration: 6.2, driftDelay: 0.4, bend: 1, size: 'md',
  },
  {
    id: 'webflow', name: 'Webflow', icon: siWebflow, tint: '#146EF5', glow: 'rgba(20,110,245,0.45)',
    x: -32, y: 28, scale: 1.02, rotation: 0, driftX: -7, driftY: -6, driftDuration: 7.4, driftDelay: 1.9, bend: -1, size: 'md',
  },
  {
    id: 'wordpress', name: 'WordPress', icon: siWordpress, tint: '#3858E9', glow: 'rgba(56,88,233,0.50)',
    x: 32, y: 30, scale: 1.05, rotation: 0, driftX: 6, driftY: 8, driftDuration: 7.0, driftDelay: 0.6, bend: 1, size: 'md',
  },
  {
    id: 'framer', name: 'Framer', icon: siFramer, tint: '#FFFFFF', glow: 'rgba(255,255,255,0.45)',
    x: -6, y: 42, scale: 1.02, rotation: 0, driftX: 4, driftY: -5, driftDuration: 5.6, driftDelay: 1.1, bend: 1, size: 'md',
  },
];

/* ─────────────────────────────────────────────────────────────
   Ambient noise fields (fixed, SSR-safe)
   ────────────────────────────────────────────────────────────── */

const DUST: Array<{ id: number; x: number; y: number; size: number; opacity: number; drift: number }> = [
  { id: 1, x: 8, y: 12, size: 1.2, opacity: 0.22, drift: 2.1 },
  { id: 2, x: 78, y: 8, size: 1.4, opacity: 0.30, drift: 3.4 },
  { id: 3, x: 22, y: 42, size: 1.0, opacity: 0.16, drift: 1.8 },
  { id: 4, x: 92, y: 30, size: 1.6, opacity: 0.34, drift: 4.2 },
  { id: 5, x: 44, y: 68, size: 1.1, opacity: 0.20, drift: 2.8 },
  { id: 6, x: 86, y: 62, size: 1.2, opacity: 0.26, drift: 3.1 },
  { id: 7, x: 14, y: 76, size: 1.3, opacity: 0.22, drift: 2.5 },
  { id: 8, x: 58, y: 82, size: 1.1, opacity: 0.18, drift: 2.9 },
  { id: 9, x: 52, y: 8, size: 1.3, opacity: 0.28, drift: 3.8 },
  { id: 10, x: 96, y: 20, size: 1.0, opacity: 0.16, drift: 2.0 },
  { id: 11, x: 70, y: 54, size: 1.4, opacity: 0.32, drift: 4.0 },
  { id: 12, x: 34, y: 58, size: 1.0, opacity: 0.20, drift: 2.3 },
  { id: 13, x: 64, y: 74, size: 1.2, opacity: 0.19, drift: 2.7 },
  { id: 14, x: 42, y: 34, size: 1.3, opacity: 0.26, drift: 3.5 },
  { id: 15, x: 94, y: 50, size: 1.1, opacity: 0.17, drift: 2.2 },
  { id: 16, x: 4, y: 60, size: 1.2, opacity: 0.22, drift: 2.6 },
  { id: 17, x: 36, y: 24, size: 0.9, opacity: 0.17, drift: 1.9 },
  { id: 18, x: 82, y: 88, size: 1.2, opacity: 0.22, drift: 2.4 },
];

/* Tiny fixed stars — always static, no drift, sub-pixel opacity. */
const STARS: Array<{ id: number; x: number; y: number; opacity: number }> = [
  { id: 1, x: 6, y: 22, opacity: 0.55 },
  { id: 2, x: 12, y: 8, opacity: 0.42 },
  { id: 3, x: 21, y: 30, opacity: 0.28 },
  { id: 4, x: 33, y: 6, opacity: 0.5 },
  { id: 5, x: 46, y: 20, opacity: 0.35 },
  { id: 6, x: 55, y: 4, opacity: 0.45 },
  { id: 7, x: 66, y: 24, opacity: 0.3 },
  { id: 8, x: 74, y: 6, opacity: 0.6 },
  { id: 9, x: 82, y: 40, opacity: 0.28 },
  { id: 10, x: 90, y: 10, opacity: 0.5 },
  { id: 11, x: 96, y: 68, opacity: 0.4 },
  { id: 12, x: 88, y: 86, opacity: 0.35 },
  { id: 13, x: 74, y: 96, opacity: 0.45 },
  { id: 14, x: 60, y: 92, opacity: 0.28 },
  { id: 15, x: 42, y: 96, opacity: 0.4 },
  { id: 16, x: 30, y: 88, opacity: 0.35 },
  { id: 17, x: 18, y: 96, opacity: 0.42 },
  { id: 18, x: 8, y: 76, opacity: 0.5 },
  { id: 19, x: 4, y: 44, opacity: 0.3 },
  { id: 20, x: 2, y: 6, opacity: 0.35 },
];

/* ─────────────────────────────────────────────────────────────
   Background dust particle
   ────────────────────────────────────────────────────────────── */
interface DustProps {
  pt: (typeof DUST)[number];
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

function DustMote({ pt, mouseX, mouseY }: DustProps) {
  // Background parallax: ~2 px (spec point 7).
  const px = useTransform(mouseX, (mx) => mx * pt.drift * 0.35);
  const py = useTransform(mouseY, (my) => my * pt.drift * 0.35);
  return (
    <motion.div
      style={{
        left: `${pt.x}%`,
        top: `${pt.y}%`,
        width: pt.size,
        height: pt.size,
        x: px,
        y: py,
      }}
      animate={{ opacity: [pt.opacity * 0.35, pt.opacity, pt.opacity * 0.35] }}
      transition={{ duration: 4.5 + pt.drift, repeat: Infinity, ease: 'easeInOut' }}
      className="pointer-events-none absolute rounded-full bg-white/70 shadow-[0_0_6px_rgba(200,210,255,0.6)]"
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   Orbit layer — holds the concentric guides and the ripple stream.
   Anchored at FOCAL_X/FOCAL_Y and offset by ~4 px of mouse parallax
   (spec point 7).
   ────────────────────────────────────────────────────────────── */
interface OrbitLayerProps {
  children: React.ReactNode;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  reduceMotion: boolean;
}

function OrbitLayer({ children, mouseX, mouseY, reduceMotion }: OrbitLayerProps) {
  const px = useTransform(mouseX, (mx) => (reduceMotion ? 0 : mx * 4));
  const py = useTransform(mouseY, (my) => (reduceMotion ? 0 : my * 4));
  const springX = useSpring(px, { stiffness: 55, damping: 22 });
  const springY = useSpring(py, { stiffness: 55, damping: 22 });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute z-10"
      style={{
        left: `${FOCAL_X}%`,
        top: `${FOCAL_Y}%`,
        x: springX,
        y: springY,
      }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">{children}</div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Floating integration tile
   ────────────────────────────────────────────────────────────── */
const TILE_SIZE: Record<IntegrationNode['size'], string> = {
  sm: 'w-11 h-11',
  md: 'w-12 h-12',
  lg: 'w-14 h-14',
};
const ICON_SIZE: Record<IntegrationNode['size'], string> = {
  sm: 'w-[18px] h-[18px]',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

interface TileProps {
  node: IntegrationNode;
  isActive: boolean;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  reduceMotion: boolean;
}

function IntegrationTile({
  node,
  isActive,
  isHovered,
  onHoverStart,
  onHoverEnd,
  reduceMotion,
}: TileProps) {
  // isHovered (or isActive) elevates the tile.
  const lit = isActive || isHovered;

  return (
    <div
      style={{
        left: `${FOCAL_X + node.x}%`,
        top: `${FOCAL_Y + node.y}%`,
        zIndex: lit ? 44 : 24,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 group animate-fade-in"
    >
      <div>
        {/* Fully static positioning — no mouse parallax, no idle drift.
            The only motion is the hover/activation glow inside. */}
        <div>
          <div>
          {/* Baseline transform: scale + rotation (hand-placed feel).
              Hover state pushes scale to 1.08 * base with a 250 ms transition
              (spec point 8). */}
          <motion.div
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            animate={
              isActive
                ? {
                    scale: node.scale * 1.13,
                    boxShadow: `0 0 26px ${node.glow}, 0 12px 26px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)`,
                    borderColor: 'rgba(255,255,255,0.24)',
                  }
                : isHovered
                ? {
                    scale: node.scale * 1.08,
                    boxShadow: `0 0 22px ${node.glow}, 0 10px 22px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.18)`,
                    borderColor: 'rgba(255,255,255,0.22)',
                  }
                : {
                    scale: node.scale,
                    boxShadow:
                      '0 8px 22px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
                    borderColor: 'rgba(255,255,255,0.08)',
                  }
            }
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ rotate: node.rotation }}
            className={`relative ${TILE_SIZE[node.size]} rounded-2xl border bg-[#0B1226]/85 backdrop-blur-md flex items-center justify-center cursor-pointer transition-colors hover:border-white/25`}
          >
            {/* Top-edge highlight */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-1 top-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/10 to-transparent"
            />

            {/* Brand icon — geometricPrecision keeps the paths crisp at
                small sizes; crispEdges would blur diagonal strokes. */}
            <svg
              viewBox="0 0 24 24"
              className={`relative ${ICON_SIZE[node.size]} transition-transform duration-300 group-hover:scale-110`}
              fill={node.tint === '#FFFFFF' ? '#F8FAFC' : node.tint}
              shapeRendering="geometricPrecision"
              aria-hidden
            >
              <path d={node.icon.path} />
            </svg>

            {/* Corner light dot — occasional twinkle. Times keyframe keeps
                it lit for ~70 % of the cycle then briefly flickers, so the
                effect is a rare glint rather than a strobing pulse. Delay
                per tile (from driftDelay) keeps the fleet unsynchronised. */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -top-0.5 -right-0.5 w-1 h-1 rounded-full bg-white/60 shadow-[0_0_6px_rgba(255,255,255,0.9)]"
              animate={
                reduceMotion ? { opacity: 1 } : { opacity: [1, 1, 0.25, 1, 1] }
              }
              transition={{
                duration: 7 + node.driftDelay * 0.6,
                delay: 3 + node.driftDelay,
                repeat: reduceMotion ? 0 : Infinity,
                ease: 'easeInOut',
                times: [0, 0.72, 0.77, 0.82, 1],
              }}
            />

            {/* Extra bloom while active or hovered */}
            {lit && (
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-3 rounded-3xl"
                style={{
                  background: `radial-gradient(circle, ${node.glow} 0%, transparent 65%)`,
                  filter: 'blur(6px)',
                  opacity: isActive ? 1 : 0.75,
                }}
              />
            )}
          </motion.div>
          </div>

          {/* Hover tooltip */}
          <div
            style={{ rotate: `${-node.rotation}deg` }}
            className="absolute -top-6 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-medium text-white/90 bg-[#020815]/95 border border-white/10 backdrop-blur-md shadow-2xl pointer-events-none whitespace-nowrap opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-50"
          >
            {node.name}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Connection beam — Linear/Vercel-grade line work.

   Design principles:
   – Monochromatic (violet-white on all lines). Brand-coloured beams
     read as garish; a unified palette reads as premium.
   – Nearly-straight curves. bendDist stays small so the beams look
     intentional rather than doodled.
   – One elegant highlight sweep per activation (no confetti of
     particles). The path is drawn icon→cube; the sweep starts at
     the cube end and slides out toward the icon.
   – Glow lives in a soft drop-shadow, not a wide blurred stroke.
   ────────────────────────────────────────────────────────────── */
interface BeamProps {
  node: IntegrationNode;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  isActive: boolean;
  isHovered: boolean;
  pulseKey: number;
}

function ConnectionBeam({ node, mouseX, mouseY, isActive, isHovered, pulseKey }: BeamProps) {
  const startX = FOCAL_X + node.x;
  const startY = FOCAL_Y + node.y;
  const endX = FOCAL_X;
  const endY = FOCAL_Y;

  const dx = endX - startX;
  const dy = endY - startY;
  const len = Math.max(0.001, Math.sqrt(dx * dx + dy * dy));
  const nx = -dy / len;
  const ny = dx / len;
  // Tighter curve — 8.5 → 5. Beams read as deliberate arcs, not squiggles.
  const bendDist = 5;

  const baseCx = (startX + endX) / 2 + nx * bendDist * node.bend;
  const baseCy = (startY + endY) / 2 + ny * bendDist * node.bend;

  const cx = useTransform(mouseX, (mx) => baseCx + mx * 1.6);
  const cy = useTransform(mouseY, (my) => baseCy + my * 1.6);

  const d = useMotionTemplate`M ${startX} ${startY} Q ${cx} ${cy} ${endX} ${endY}`;

  return (
    <>
      {/* Ambient base line — always visible, hair-thin. Hover brightens
          this specific line. */}
      <motion.path
        d={d}
        fill="none"
        stroke={
          isHovered ? 'rgba(224,231,255,0.42)' : 'rgba(196,205,255,0.09)'
        }
        strokeWidth={isHovered ? 0.3 : 0.16}
        strokeLinecap="round"
        style={{
          filter: isHovered
            ? 'drop-shadow(0 0 1.5px rgba(196,181,253,0.65))'
            : undefined,
          transition: 'stroke 250ms ease-out, stroke-width 250ms ease-out',
        }}
      />

      <AnimatePresence>
        {isActive && (
          <g key={`beam-${node.id}-${pulseKey}`}>
            {/* Idle→active brightening of the full arc — the whole line
                lights up gently while the sweep runs, then fades. Kept at
                a single crisp stroke width; the glow is entirely from the
                drop-shadow filter. */}
            <motion.path
              d={d}
              fill="none"
              stroke="url(#beam-glow)"
              strokeWidth={0.32}
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0.5] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              style={{ filter: 'drop-shadow(0 0 1.5px rgba(196,181,253,0.5))' }}
            />
            {/* Highlight sweep — a short, bright segment travels from the
                icon toward the cube. When it reaches the cube, the
                FloatingCentre flash fires (synced via cubeImpactKey). */}
            <motion.path
              d={d}
              fill="none"
              stroke="url(#beam-sweep)"
              strokeWidth={0.5}
              strokeLinecap="round"
              pathLength={0.14}
              initial={{ pathOffset: -0.14, opacity: 0 }}
              animate={{
                pathOffset: [-0.14, 1],
                opacity: [0, 1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.15,
                delay: 0.1,
                ease: [0.4, 0, 0.2, 1],
                times: [0, 0.1, 0.85, 1],
              }}
              style={{ filter: 'drop-shadow(0 0 2.5px rgba(224,231,255,0.85))' }}
            />
          </g>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   Floating centre — the OyeChats cube. Cube image is fully static:
   no drift, no rotation, no scale kicks, no mouse parallax. The
   only motion is a soft glow flash that fires when a beam sweep
   reaches the cube (keyed by impactKey from the parent).
   ────────────────────────────────────────────────────────────── */
interface FloatingCentreProps {
  impactKey: number;
}

function FloatingCentre({ impactKey }: FloatingCentreProps) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none"
      style={{ left: `${FOCAL_X}%`, top: `${FOCAL_Y}%` }}
    >
      <div className="relative w-[240px] h-[240px] md:w-[300px] md:h-[300px]">
        {/* Static ambient glow behind the cube. No animation — the cube
            reads as a fixed anchor for the whole scene. */}
        <div
          aria-hidden
          className="absolute -inset-20 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.55)_0%,rgba(59,130,246,0.28)_45%,transparent_75%)] blur-3xl opacity-90"
        />

        {/* Impact flash — fires when a beam sweep reaches the cube.
            A soft violet glow gently swells in over ~700 ms, holds
            briefly, then eases out over ~1.4 s. Slow enough to read as
            a warm breath, not a strobe. Keyed by impactKey so each new
            impact restarts the tween. The cube image itself never moves. */}
        <motion.div
          key={impactKey}
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.55, 0.55, 0] }}
          transition={{
            duration: 2.4,
            times: [0, 0.3, 0.45, 1],
            ease: 'easeInOut',
          }}
          className="absolute -inset-24 rounded-full bg-[radial-gradient(circle,rgba(196,181,253,0.75)_0%,rgba(139,92,246,0.35)_40%,transparent_72%)] blur-3xl"
        />

        {/* Static cube. New artwork has no light streams to hide, so
            the whole image renders — no top-mask cropping. */}
        <div
          className="relative w-full h-full"
          style={{
            filter:
              'drop-shadow(0 20px 40px rgba(0,0,0,0.5)) drop-shadow(0 0 22px rgba(139,92,246,0.35))',
          }}
        >
          <Image
            src="/int_cube.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 240px, 300px"
            className="object-contain select-none"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Bottom data streams — tiny glowing particles drifting sideways
   along three subtle curves near the floor of the scene. Replaces
   the older dotted-wave mesh. Reads as flowing AI data rather than
   ocean waves.
   ────────────────────────────────────────────────────────────── */
interface StreamParticle {
  id: number;
  cx: number;
  cy: number;
  r: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
  color: 'violet' | 'sky' | 'white';
}

const STREAM_PARTICLES: StreamParticle[] = [
  { id: 1, cx: 6, cy: 94, r: 0.55, opacity: 0.55, duration: 11, delay: 0.0, drift: 40, color: 'sky' },
  { id: 2, cx: 18, cy: 96, r: 0.45, opacity: 0.45, duration: 13, delay: 0.6, drift: 50, color: 'violet' },
  { id: 3, cx: 30, cy: 95, r: 0.6, opacity: 0.65, duration: 10, delay: 1.2, drift: 45, color: 'white' },
  { id: 4, cx: 42, cy: 97, r: 0.4, opacity: 0.4, duration: 14, delay: 0.3, drift: 55, color: 'violet' },
  { id: 5, cx: 54, cy: 94, r: 0.55, opacity: 0.55, duration: 12, delay: 1.8, drift: 42, color: 'sky' },
  { id: 6, cx: 66, cy: 96, r: 0.5, opacity: 0.5, duration: 11, delay: 0.9, drift: 48, color: 'white' },
  { id: 7, cx: 78, cy: 95, r: 0.45, opacity: 0.5, duration: 13, delay: 2.1, drift: 46, color: 'violet' },
  { id: 8, cx: 90, cy: 97, r: 0.55, opacity: 0.6, duration: 10, delay: 1.4, drift: 40, color: 'sky' },
  { id: 9, cx: 12, cy: 98, r: 0.4, opacity: 0.35, duration: 15, delay: 0.5, drift: 60, color: 'violet' },
  { id: 10, cx: 36, cy: 99, r: 0.5, opacity: 0.45, duration: 12, delay: 1.6, drift: 52, color: 'white' },
  { id: 11, cx: 62, cy: 98, r: 0.45, opacity: 0.4, duration: 14, delay: 0.2, drift: 58, color: 'sky' },
  { id: 12, cx: 84, cy: 99, r: 0.5, opacity: 0.5, duration: 11, delay: 2.4, drift: 44, color: 'violet' },
  { id: 13, cx: 24, cy: 93, r: 0.35, opacity: 0.35, duration: 16, delay: 0.8, drift: 62, color: 'white' },
  { id: 14, cx: 48, cy: 93, r: 0.4, opacity: 0.4, duration: 15, delay: 1.9, drift: 58, color: 'sky' },
  { id: 15, cx: 72, cy: 94, r: 0.35, opacity: 0.35, duration: 17, delay: 0.4, drift: 64, color: 'violet' },
];

const STREAM_COLORS: Record<StreamParticle['color'], string> = {
  violet: 'rgba(196,181,253,1)',
  sky: 'rgba(147,197,253,1)',
  white: 'rgba(226,232,240,1)',
};

function BottomDataStreams({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-44 w-full"
    >
      {STREAM_PARTICLES.map((p) => (
        <motion.circle
          key={p.id}
          cx={p.cx}
          cy={p.cy}
          r={p.r}
          fill={STREAM_COLORS[p.color]}
          style={{ filter: `drop-shadow(0 0 ${p.r * 3}px ${STREAM_COLORS[p.color]})` }}
          initial={{ opacity: 0 }}
          animate={
            reduceMotion
              ? { opacity: p.opacity * 0.6, x: 0 }
              : {
                  opacity: [0, p.opacity, p.opacity, 0],
                  x: [-p.drift * 0.4, p.drift * 0.6],
                }
          }
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: reduceMotion ? 0 : Infinity,
            ease: 'linear',
            times: [0, 0.15, 0.85, 1],
          }}
        />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Ambient background — soft central haze + the twinkling star
   field. Deliberately no full-bleed base gradient — the parent
   section's own background shows through, so this component never
   paints a visible container edge. Layer 1.
   ────────────────────────────────────────────────────────────── */
function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Central ambient haze — a very soft violet-blue bloom behind the
          cube. Wide radial gradient that fades to full transparent well
          before the container edge, so it never paints a visible box. */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '70%',
          height: '70%',
          background:
            'radial-gradient(circle, rgba(76,58,140,0.32) 0%, rgba(30,41,90,0.14) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Star field — small pinpricks with slow twinkle. */}
      {STARS.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: 1.5,
            height: 1.5,
            boxShadow: '0 0 3px rgba(220,225,255,0.8)',
          }}
          animate={{ opacity: [s.opacity * 0.4, s.opacity, s.opacity * 0.4] }}
          transition={{ duration: 3 + (s.id % 5), repeat: Infinity, ease: 'easeInOut', delay: (s.id % 4) * 0.4 }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main scene
   ────────────────────────────────────────────────────────────── */
export function IntegrationsNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [pulseKey, setPulseKey] = useState(0);
  const [cubeImpactKey, setCubeImpactKey] = useState(0);

  const mounted = useSyncExternalStore(subscribeNoop, getClientTrue, getServerFalse);

  // Spec point 10: honour prefers-reduced-motion. When set, we still show
  // the scene but drop continuous loops and the storytelling cycle.
  const reducedMotion = useReducedMotion();
  const reduceMotion = reducedMotion ?? false;

  const mouseXRaw = useMotionValue(0);
  const mouseYRaw = useMotionValue(0);
  const mouseX = useSpring(mouseXRaw, { stiffness: 70, damping: 22 });
  const mouseY = useSpring(mouseYRaw, { stiffness: 70, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseXRaw.set(x);
    mouseYRaw.set(y);
  };

  const handleMouseLeave = () => {
    mouseXRaw.set(0);
    mouseYRaw.set(0);
  };

  // Storytelling cycle — one integration at a time.
  // Sequence: activate → beam + particles → 1s later: logo pulse + ripple
  // → beam fades out → 1.6s gap → next.
  useEffect(() => {
    if (reduceMotion) return; // Skip entirely for reduced-motion users.
    let alive = true;
    let sequenceIdx = 3;
    let impactTimer: ReturnType<typeof setTimeout> | undefined;
    let fadeTimer: ReturnType<typeof setTimeout> | undefined;
    let nextTimer: ReturnType<typeof setTimeout> | undefined;

    const rotate = () => {
      if (!alive) return;
      const idx = sequenceIdx % INTEGRATIONS.length;
      // Non-linear step so the pattern doesn't look sequential.
      sequenceIdx += 3;

      setActiveIdx(idx);
      setPulseKey((k) => k + 1);

      impactTimer = setTimeout(() => {
        if (!alive) return;
        // Beam sweep reaches the cube — flash the cube.
        setCubeImpactKey((k) => k + 1);
      }, 1100);

      fadeTimer = setTimeout(() => {
        if (!alive) return;
        setActiveIdx(null);
      }, 2100);

      // 3.5–4s total cadence
      nextTimer = setTimeout(rotate, 3700);
    };

    const initial = setTimeout(rotate, 900);
    return () => {
      alive = false;
      clearTimeout(initial);
      if (impactTimer) clearTimeout(impactTimer);
      if (fadeTimer) clearTimeout(fadeTimer);
      if (nextTimer) clearTimeout(nextTimer);
    };
  }, [reduceMotion]);

  // Placeholder during SSR — matches nothing visible so hydration is clean.
  if (!mounted) {
    return <div className="w-full h-full" aria-hidden />;
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full select-none animate-fade-in"
    >
      {/* ── LAYER 1 — ambient background (edge-to-edge) */}
      <AmbientBackground />

      {/* Ambient dust */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {DUST.map((pt) => (
          <DustMote key={pt.id} pt={pt} mouseX={mouseX} mouseY={mouseY} />
        ))}
      </div>

      {/* ── LAYER 2 — SVG scene: rings, beams, ripples */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full z-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          {/* Unified beam palette — one violet-white gradient for every
              line. Consistency reads as premium; brand-coloured beams
              read as garish. */}
          <linearGradient id="beam-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(224,231,255,0)" />
            <stop offset="50%" stopColor="rgba(196,181,253,0.85)" />
            <stop offset="100%" stopColor="rgba(224,231,255,0)" />
          </linearGradient>
          <linearGradient id="beam-sweep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(224,231,255,0)" />
            <stop offset="45%" stopColor="rgba(224,231,255,1)" />
            <stop offset="55%" stopColor="rgba(196,181,253,1)" />
            <stop offset="100%" stopColor="rgba(196,181,253,0)" />
          </linearGradient>
        </defs>

        {/* Beams from each icon to the focal centre */}
        {INTEGRATIONS.map((node, idx) => (
          <ConnectionBeam
            key={node.id}
            node={node}
            mouseX={mouseX}
            mouseY={mouseY}
            isActive={activeIdx === idx}
            isHovered={hoveredIdx === idx}
            pulseKey={pulseKey}
          />
        ))}
      </svg>

      {/* Orbital guides & impact ripples — rendered as HTML so they stay
          perfectly round regardless of container aspect ratio.
          Wrapped in the OrbitLayer helper so we can attach ~4 px parallax
          without repeating the transform maths inline. */}
      <OrbitLayer mouseX={mouseX} mouseY={mouseY} reduceMotion={reduceMotion}>
        <motion.div
          className="absolute rounded-full border border-indigo-400/25"
          style={{
            width: 260,
            height: 260,
            left: -130,
            top: -130,
            borderStyle: 'dashed',
            borderWidth: 1,
          }}
          animate={reduceMotion ? { rotate: 0 } : { rotate: 360 }}
          transition={{
            duration: 34,
            repeat: reduceMotion ? 0 : Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className="absolute rounded-full border border-sky-300/18"
          style={{
            width: 380,
            height: 380,
            left: -190,
            top: -190,
            borderStyle: 'dashed',
            borderWidth: 1,
          }}
          animate={reduceMotion ? { rotate: 0 } : { rotate: -360 }}
          transition={{
            duration: 50,
            repeat: reduceMotion ? 0 : Infinity,
            ease: 'linear',
          }}
        />

      </OrbitLayer>

      {/* Bottom data streams — flowing particles, layer 1 in feel */}
      <BottomDataStreams reduceMotion={reduceMotion} />

      {/* ── LAYER 3 — integration tiles & the floating centre */}
      {INTEGRATIONS.map((node, idx) => (
        <IntegrationTile
          key={node.id}
          node={node}
          isActive={activeIdx === idx}
          isHovered={hoveredIdx === idx}
          onHoverStart={() => setHoveredIdx(idx)}
          onHoverEnd={() =>
            setHoveredIdx((cur) => (cur === idx ? null : cur))
          }
          reduceMotion={reduceMotion}
        />
      ))}

      <FloatingCentre impactKey={cubeImpactKey} />
    </div>
  );
}
