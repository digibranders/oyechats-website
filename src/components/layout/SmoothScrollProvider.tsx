'use client';

import { createContext, useCallback, useEffect, useRef, useSyncExternalStore } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const LenisContext = createContext<Lenis | null>(null);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const subscribersRef = useRef(new Set<() => void>());

  const subscribe = useCallback((callback: () => void) => {
    subscribersRef.current.add(callback);
    return () => { subscribersRef.current.delete(callback); };
  }, []);

  const lenis = useSyncExternalStore(
    subscribe,
    () => lenisRef.current,
    () => null,
  );

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenisInstance.on('scroll', ScrollTrigger.update);

    // Store the ticker callback so we can remove it properly on cleanup
    const onTick = (time: number) => lenisInstance.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    lenisRef.current = lenisInstance;
    const subs = subscribersRef.current;
    subs.forEach((cb) => cb());

    return () => {
      lenisInstance.destroy();
      gsap.ticker.remove(onTick);
      lenisRef.current = null;
      subs.forEach((cb) => cb());
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
