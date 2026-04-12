'use client';

import { useEffect, useRef, useState } from 'react';

export function RevealSection({
  children,
  className = '',
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  'aria-label'?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`reveal-section ${isVisible ? 'visible' : ''} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
