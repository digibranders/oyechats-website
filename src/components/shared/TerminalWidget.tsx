'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface TerminalEvent {
  type: string;
  status: number;
  latency: number;
  timestamp?: string;
}

const DEFAULT_EVENTS: TerminalEvent[] = [
  { type: 'lead_captured', status: 200, latency: 11, timestamp: '14:22:01' },
  { type: 'tier_transition', status: 200, latency: 8, timestamp: '14:22:03' },
  { type: 'handoff_requested', status: 200, latency: 14, timestamp: '14:23:18' },
  { type: 'meeting_booked', status: 200, latency: 9, timestamp: '14:24:05' },
  { type: 'chat_closed', status: 200, latency: 7, timestamp: '14:26:44' },
];

interface TerminalWidgetProps {
  events?: TerminalEvent[];
  autoPlay?: boolean;
  className?: string;
}

function statusColor(status: number) {
  if (status >= 200 && status < 300) return 'text-emerald-400';
  if (status >= 400 && status < 500) return 'text-amber-400';
  return 'text-red-400';
}

function eventColor(type: string) {
  const map: Record<string, string> = {
    tier_transition: 'text-violet-400',
    lead_captured: 'text-emerald-400',
    handoff_requested: 'text-cyan-400',
    chat_closed: 'text-blue-400',
    meeting_booked: 'text-amber-400',
  };
  return map[type] ?? 'text-blue-400';
}

export function TerminalWidget({ events = DEFAULT_EVENTS, autoPlay = true, className }: TerminalWidgetProps) {
  const counterRef = useRef(0);
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: false });
  const [visibleEvents, setVisibleEvents] = useState<(TerminalEvent & { uid: number })[]>(() =>
    // Use counterRef to assign initial uids so the interval never produces a colliding value
    events.map((e) => ({ ...e, uid: counterRef.current++ }))
  );

  useEffect(() => {
    if (!autoPlay || !inView) return;

    let eventIdx = 0;
    const interval = setInterval(() => {
      const next = events[eventIdx % events.length];
      counterRef.current += 1;
      setVisibleEvents((old) => [...old, { ...next, uid: counterRef.current }].slice(-5));
      eventIdx++;
    }, 1800);

    return () => clearInterval(interval);
  }, [autoPlay, inView, events]);

  return (
    <div ref={ref} className={cn('terminal-bg rounded-2xl p-4 font-mono text-xs overflow-hidden', className)}>
      <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-white/8">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
        <span className="ml-2 text-white/30 text-[10px]">oyechats — webhook stream</span>
      </div>

      <div className="space-y-1.5">
        {visibleEvents.map((event) => (
          <div key={event.uid} className="flex items-center gap-2 animate-slide-in-left">
            <span className="text-white/25 shrink-0 text-[10px]">{event.timestamp ?? '--:--:--'}</span>
            <span className="text-white/40 shrink-0">POST</span>
            <span className={cn('shrink-0', eventColor(event.type))}>/{event.type}</span>
            <span className={cn('shrink-0 font-semibold', statusColor(event.status))}>{event.status}</span>
            <span className="text-white/30 shrink-0">{event.latency}ms</span>
          </div>
        ))}
        <div className="flex items-center gap-1 mt-2">
          <span className="text-white/25">$</span>
          <span className="terminal-cursor text-cyan-400" />
        </div>
      </div>
    </div>
  );
}
