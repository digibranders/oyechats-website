'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const ROTATING_WORDS = ['Understands', 'Qualifies Leads', 'Closes Deals', 'Knows Your Docs'];

/**
 * RotatingWord — cycles through the headline marquee words used in the
 * "The AI That Actually …" hook. Lives in shared/ so both the homepage
 * Hero (top of page) and the HomeCTA (bottom of page) render the same
 * animated text with one source of truth — no copy-paste drift between
 * the two surfaces.
 *
 * Width is locked via ``min-width: min(14ch, 80vw)`` to prevent the H1
 * from reflowing on every word change (CLS fix). aria-live="polite" so
 * screen readers announce the swap without interrupting other content.
 */
export function RotatingWord() {
    const [current, setCurrent] = useState(0);
    const [animState, setAnimState] = useState<'in' | 'out'>('in');

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimState('out');
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % ROTATING_WORDS.length);
                setAnimState('in');
            }, 320);
        }, 2800);
        return () => clearInterval(interval);
    }, []);

    return (
        <span
            className="inline-block"
            style={{ minWidth: 'min(14ch, 80vw)' }}
            aria-live="polite"
            role="status"
        >
            <span
                className={cn(
                    'inline-block gradient-text-animated',
                    animState === 'in' ? 'animate-rotate-text-in' : 'animate-rotate-text-out',
                )}
            >
                {ROTATING_WORDS[current]}
            </span>
        </span>
    );
}
