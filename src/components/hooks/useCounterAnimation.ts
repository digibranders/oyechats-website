'use client';

import { useEffect, useRef, useState } from 'react';

export function useCounterAnimation(target: number, suffix: string) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(`0${suffix}`);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        let cur = 0;
        const step = target / 55;
        const tick = () => {
          cur = Math.min(cur + step, target);
          setDisplay(`${Math.round(cur)}${suffix}`);
          if (cur < target) requestAnimationFrame(tick);
        };
        tick();
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix]);

  return { ref, display };
}
