'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface RotatingTextProps {
  /** Array of words to cycle through */
  words: string[];
  /**
   * Total display cycle per word in ms (enter + visible + exit).
   * Default: 2800ms
   */
  intervalMs?: number;
  /** Extra Tailwind / CSS classes applied to the animating word span */
  className?: string;
}

type Phase = 'in' | 'visible' | 'out';

/** Must match --animate-rotate-text-in duration */
const ENTER_MS = 450;
/** Must match --animate-rotate-text-out duration */
const EXIT_MS = 300;

/**
 * Cycles through an array of words with a blur-fade animation.
 * Pure CSS keyframes — no animation library required.
 *
 * Layout note: renders as a flex row that fills its parent line so the
 * sibling "Oye." line is always at a stable vertical position.
 */
export function RotatingText({
  words,
  intervalMs = 2800,
  className = '',
}: RotatingTextProps): React.JSX.Element {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('in');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const displayMs = Math.max(intervalMs - ENTER_MS - EXIT_MS, 500);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (words.length <= 1) return;

    switch (phase) {
      case 'in':
        timerRef.current = setTimeout(() => setPhase('visible'), ENTER_MS);
        break;
      case 'visible':
        timerRef.current = setTimeout(() => setPhase('out'), displayMs);
        break;
      case 'out':
        timerRef.current = setTimeout(() => {
          setIndex((prev) => (prev + 1) % words.length);
          setPhase('in');
        }, EXIT_MS);
        break;
    }

    return clearTimer;
  }, [phase, words.length, displayMs, clearTimer]);

  // Safety clean-up on unmount
  useEffect(() => () => clearTimer(), [clearTimer]);

  const animClass =
    phase === 'out' ? 'animate-rotate-text-out' : 'animate-rotate-text-in';

  return (
    // Stable-width container: all words overlap in a single grid cell
    // so the widest word sets the container width. "Oye." never shifts.
    <span
      className="inline-grid"
      style={{ gridTemplateColumns: '1fr', gridTemplateRows: '1fr' }}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Invisible width-setters — all occupy the same cell, widest wins */}
      {words.map((w) => (
        <span
          key={w}
          className="invisible select-none col-start-1 row-start-1 text-center"
          aria-hidden="true"
        >
          {w}
        </span>
      ))}

      {/* Visible animated word — same cell, centered */}
      <span
        key={`${index}-${phase === 'out' ? 'out' : 'in'}`}
        className={`col-start-1 row-start-1 text-center will-change-[opacity,transform,filter] ${animClass} ${className}`}
      >
        {words[index]}
      </span>
    </span>
  );
}
