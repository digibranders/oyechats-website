'use client';

import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  hue: number;
}

const BRAND_HUES = [190, 215, 255]; // Cyan, Sky Blue, Indigo

export function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, isActive: false });
  const pointsRef = useRef<Point[]>([]);
  const isHoveringRef = useRef(false);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    // 1. Check if device supports touch only or is mobile to prevent rendering trail
    const isTouchDevice = 
      typeof window !== 'undefined' && 
      (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
    
    if (isTouchDevice) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 2. Set canvas size with Device Pixel Ratio for sharp rendering
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 3. Track mouse coordinates
    const handlePointerMove = (e: PointerEvent) => {
      const mouse = mouseRef.current;
      mouse.lastX = mouse.isActive ? mouse.x : e.clientX;
      mouse.lastY = mouse.isActive ? mouse.y : e.clientY;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.isActive = true;

      // Add trail points
      const hueIndex = Math.floor(Math.random() * BRAND_HUES.length);
      const hue = BRAND_HUES[hueIndex];
      pointsRef.current.push({ x: mouse.x, y: mouse.y, hue });
      
      // Limit ribbon points length
      if (pointsRef.current.length > 20) {
        pointsRef.current.shift();
      }
    };

    const handlePointerLeave = () => {
      mouseRef.current.isActive = false;
    };

    // 4. Hover detection to expand trail glow on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('a') ||
          target.closest('button') ||
          target.closest('[role="button"]') ||
          target.closest('.btn-magnetic') ||
          target.closest('.card-hover') ||
          target.closest('.price-card-base'))
      ) {
        isHoveringRef.current = true;
      }
    };

    const handleMouseOut = () => {
      isHoveringRef.current = false;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    // 5. Animation loop
    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // --- Draw Ribbon Trail ---
      const points = pointsRef.current;
      if (points.length > 1) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Draw segments with fading width and opacity
        for (let i = 1; i < points.length; i++) {
          const p1 = points[i - 1];
          const p2 = points[i];
          const ratio = i / points.length; // Fades towards the tail (0)

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          // Configure glow
          ctx.shadowBlur = isHoveringRef.current ? 16 : 8;
          ctx.shadowColor = `hsl(${p2.hue}, 90%, 60%)`;

          ctx.lineWidth = ratio * (isHoveringRef.current ? 8 : 4);
          ctx.strokeStyle = `hsla(${p2.hue}, 90%, 65%, ${ratio * 0.35})`;
          ctx.stroke();
        }

        // Reset shadow properties for general drawing performance
        ctx.shadowBlur = 0;
      }



      // Slowly decay existing ribbon points when mouse is stationary
      if (!mouseRef.current.isActive && points.length > 0) {
        points.shift();
      } else if (points.length > 0 && Math.random() < 0.25) {
        // Randomly decay older points even if active to prevent trailing lines sticking
        points.shift();
      }

      animationFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    // Clean up event listeners & animation frame
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998, // Placed overlay just under very high z-index elements but above normal page items
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    />
  );
}
