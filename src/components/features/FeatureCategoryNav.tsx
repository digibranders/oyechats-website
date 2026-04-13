'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { id: 'rag', label: 'RAG Pipeline' },
  { id: 'bant', label: 'BANT Scoring' },
  { id: 'livechat', label: 'Live Chat' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'behavioral', label: 'Behavioral Tracking' },
  { id: 'webhooks', label: 'Webhooks' },
  { id: 'integrations', label: 'Integrations' },
];

export function FeatureCategoryNav() {
  const [active, setActive] = useState('rag');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id.replace('feature-', ''));
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    CATEGORIES.forEach(({ id }) => {
      const el = document.getElementById(`feature-${id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(`feature-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  return (
    <div className="sticky top-[64px] z-30 bg-[#030D1F]/90 backdrop-blur-xl border-b border-white/8 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div ref={scrollRef} className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={cn(
                'relative flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-none cursor-pointer',
                active === id ? 'text-white' : 'text-white/50 hover:text-white/70'
              )}
            >
              {label}
              {active === id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 to-cyan-400 shimmer-bar rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
