'use client';

/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

interface AntigravityParticlesProps {
  scrollProgress?: number;
}

/* ── Vibrant multi-color palette (Google Antigravity-inspired) ── */
const PALETTE_HEX = [
  '#4285F4', // blue
  '#60A5FA', // blue-light
  '#EA4335', // red/coral
  '#FBBC04', // yellow
  '#34A853', // green
  '#A855F7', // purple
  '#EC4899', // pink/rose
  '#06B6D4', // teal
];

/* ── Inner Three.js scene ── */
const AntigravityInner = () => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMouseMoveTime = useRef(0);
  const virtualMouse = useRef({ x: 0, y: 0 });

  const count = 300;
  const magnetRadius = 6;
  const baseRingRadius = 7;
  const waveSpeed = 0.4;
  const waveAmplitude = 1;
  const particleSize = 0.8;
  const lerpSpeed = 0.05;
  const depthFactor = 1;
  const pulseSpeed = 3;
  const fieldStrength = 10;
  const rotationSpeed = 0;
  const particleVariance = 1;

  const colorsApplied = useRef(false);

  const particles = useMemo(() => {
    const temp = [];
    const width = viewport.width || 100;
    const height = viewport.height || 100;

    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = (Math.random() - 0.5) * width;
      const y = (Math.random() - 0.5) * height;
      const z = (Math.random() - 0.5) * 20;
      const randomRadiusOffset = (Math.random() - 0.5) * 2;

      temp.push({
        t, speed,
        mx: x, my: y, mz: z,
        cx: x, cy: y, cz: z,
        randomRadiusOffset,
      });
    }
    return temp;
  }, [count, viewport.width, viewport.height]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Apply per-instance colors once (first frame)
    if (!colorsApplied.current) {
      const c = new THREE.Color();
      for (let i = 0; i < count; i++) {
        c.set(PALETTE_HEX[i % PALETTE_HEX.length]);
        mesh.setColorAt(i, c);
      }
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      colorsApplied.current = true;
    }

    const { viewport: v, pointer: m } = state;
    const elapsed = state.clock.getElapsedTime();

    const mouseDist = Math.sqrt(
      (m.x - lastMousePos.current.x) ** 2 +
      (m.y - lastMousePos.current.y) ** 2,
    );

    if (mouseDist > 0.001) {
      lastMouseMoveTime.current = Date.now();
      lastMousePos.current = { x: m.x, y: m.y };
    }

    let destX = (m.x * v.width) / 2;
    let destY = (m.y * v.height) / 2;

    if (Date.now() - lastMouseMoveTime.current > 2000) {
      destX = Math.sin(elapsed * 0.5) * (v.width / 4);
      destY = Math.cos(elapsed * 1.0) * (v.height / 4);
    }

    // Responsive cursor tracking
    const smoothFactor = 0.08;
    virtualMouse.current.x += (destX - virtualMouse.current.x) * smoothFactor;
    virtualMouse.current.y += (destY - virtualMouse.current.y) * smoothFactor;

    const targetX = virtualMouse.current.x;
    const targetY = virtualMouse.current.y;
    const globalRotation = elapsed * rotationSpeed;

    // Breathing ring radius
    const ringRadius = baseRingRadius + Math.sin(elapsed * (Math.PI / 3)) * 1.5;

    particles.forEach((particle, i) => {
      const { mx, my, mz, cz, randomRadiusOffset } = particle;
      const t = (particle.t += particle.speed / 2);

      const projectionFactor = 1 - cz / 50;
      const projectedTargetX = targetX * projectionFactor;
      const projectedTargetY = targetY * projectionFactor;

      const dx = mx - projectedTargetX;
      const dy = my - projectedTargetY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const targetPos = { x: mx, y: my, z: mz * depthFactor };

      if (dist < magnetRadius) {
        const angle = Math.atan2(dy, dx) + globalRotation;
        const wave = Math.sin(t * waveSpeed + angle) * (0.5 * waveAmplitude);
        const deviation = randomRadiusOffset * (5 / (fieldStrength + 0.1));
        const currentRingRadius = ringRadius + wave + deviation;

        targetPos.x = projectedTargetX + currentRingRadius * Math.cos(angle);
        targetPos.y = projectedTargetY + currentRingRadius * Math.sin(angle);
        targetPos.z = mz * depthFactor + Math.sin(t) * waveAmplitude * depthFactor;
      }

      particle.cx += (targetPos.x - particle.cx) * lerpSpeed;
      particle.cy += (targetPos.y - particle.cy) * lerpSpeed;
      particle.cz += (targetPos.z - particle.cz) * lerpSpeed;

      dummy.position.set(particle.cx, particle.cy, particle.cz);
      dummy.lookAt(projectedTargetX, projectedTargetY, particle.cz);
      dummy.rotateX(Math.PI / 2);

      const currentDistToMouse = Math.sqrt(
        (particle.cx - projectedTargetX) ** 2 +
        (particle.cy - projectedTargetY) ** 2,
      );

      const distFromRing = Math.abs(currentDistToMouse - ringRadius);
      let scaleFactor = Math.max(0, Math.min(1, 1 - distFromRing / 10));

      const finalScale =
        scaleFactor *
        (0.8 + Math.sin(t * pulseSpeed) * 0.2 * particleVariance) *
        particleSize;
      dummy.scale.set(finalScale, finalScale, finalScale);

      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.12, 12, 12]} />
      <meshBasicMaterial color="#ffffff" toneMapped={false} />
    </instancedMesh>
  );
};

export function AntigravityParticles({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scrollProgress = 0,
}: AntigravityParticlesProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>(
    undefined,
  );

  useEffect(() => {
    // Use the parent section as the event source so the canvas
    // can track mouse even though its wrapper has pointer-events: none
    const section = containerRef.current?.closest('section');
    if (section instanceof HTMLElement) {
      setEventSource(section);
    }
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 50], fov: 35 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        eventSource={eventSource}
        eventPrefix="client"
      >
        <AntigravityInner />
      </Canvas>
    </div>
  );
}
