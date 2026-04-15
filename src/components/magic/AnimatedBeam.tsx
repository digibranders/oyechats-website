'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLElement | null>;
  fromRef: React.RefObject<HTMLElement | null>;
  toRef: React.RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
  className?: string;
}

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = 'rgba(255,255,255,0.1)',
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = '#60A5FA',
  gradientStopColor = '#6366F1',
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
  className,
}: AnimatedBeamProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current || !svgRef.current) return;

      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      const svgRect = svgRef.current.getBoundingClientRect();

      const startX = fromRect.left - svgRect.left + fromRect.width / 2 + startXOffset;
      const startY = fromRect.top - svgRect.top + fromRect.height / 2 + startYOffset;
      const endX = toRect.left - svgRect.left + toRect.width / 2 + endXOffset;
      const endY = toRect.top - svgRect.top + toRect.height / 2 + endYOffset;

      const controlY = startY - curvature;
      const d = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`;

      if (pathRef.current) {
        pathRef.current.setAttribute('d', d);
      }
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    return () => window.removeEventListener('resize', updatePath);
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

  const id = `beam-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      ref={svgRef}
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={`${id}-gradient`}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="40%" stopColor={gradientStartColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d=""
        ref={pathRef}
        fill="none"
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <motion.path
        d=""
        fill="none"
        stroke={`url(#${id}-gradient)`}
        strokeWidth={pathWidth}
        strokeLinecap="round"
        animate={{
          pathOffset: reverse ? [1, 0] : [0, 1],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: 'linear',
        }}
        ref={(el) => {
          if (el && pathRef.current) {
            el.setAttribute('d', pathRef.current.getAttribute('d') || '');
          }
        }}
      />
    </svg>
  );
}
