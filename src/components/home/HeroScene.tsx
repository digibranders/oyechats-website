'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FluidOrb({ mousePos }: { mousePos: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = t * 0.08 + mousePos.y * 0.3;
    meshRef.current.rotation.y = t * 0.12 + mousePos.x * 0.3;
    if (materialRef.current) {
      materialRef.current.distort = 0.25 + Math.sin(t * 0.5) * 0.08 + mousePos.x * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={2.2}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#1034A6"
          emissive="#2563EB"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.2}
          distort={0.25}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function AccentOrb({
  position,
  color,
  emissive,
  scale = 0.5,
}: {
  position: [number, number, number];
  color: string;
  emissive: string;
  scale?: number;
}) {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.2}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={0.6}
          roughness={0.05}
          metalness={0.3}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function Scene({ mousePos, isMobile }: { mousePos: { x: number; y: number }; isMobile: boolean }) {
  return (
    <>
      {/* Ambient & directional light */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#60A5FA" />
      <directionalLight position={[-5, -5, 3]} intensity={0.5} color="#6366F1" />
      <pointLight position={[0, 0, 4]} intensity={1.5} color="#2563EB" />

      {/* Main fluid orb */}
      <FluidOrb mousePos={mousePos} />

      {/* Accent orbs — skip on mobile to reduce GPU load */}
      {!isMobile && (
        <>
          <AccentOrb position={[-3.5, 2, -2]} color="#6366F1" emissive="#4F46E5" scale={0.35} />
          <AccentOrb position={[3.2, -1.5, -1.5]} color="#06B6D4" emissive="#0891B2" scale={0.28} />
          <AccentOrb position={[2.8, 2.5, -3]} color="#3B82F6" emissive="#2563EB" scale={0.2} />
        </>
      )}

      {/* Stars — reduced count on mobile */}
      <Stars
        radius={80}
        depth={50}
        count={isMobile ? 300 : 1200}
        factor={3}
        saturation={0.5}
        fade
        speed={0.5}
      />
    </>
  );
}

interface HeroSceneProps {
  mousePos: { x: number; y: number };
}

export function HeroScene({ mousePos }: HeroSceneProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
    >
      <Scene mousePos={mousePos} isMobile={isMobile} />
    </Canvas>
  );
}
