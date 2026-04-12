'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';

const TIMELINE_EVENTS = [
  { icon: '🖱️', label: 'Rage click detected', desc: 'User clicked pricing button 4× in 2 seconds', time: '0:12', type: 'signal' },
  { icon: '⏱️', label: 'Long dwell on pricing', desc: 'Visitor spent 45s on the Pro plan card', time: '0:45', type: 'signal' },
  { icon: '🧠', label: 'Frustration pattern recognized', desc: 'Behavioral model confidence: 87%', time: '1:02', type: 'ai' },
  { icon: '💬', label: 'Proactive message triggered', desc: '"Looks like you\'re comparing plans — can I help?"', time: '1:03', type: 'bot' },
  { icon: '✅', label: 'Lead captured', desc: 'Email collected, BANT score +12 pts', time: '1:18', type: 'success' },
];

const TYPE_STYLES: Record<string, string> = {
  signal: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  ai: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  bot: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  success: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
};

export function BehavioralSection() {
  const [step, setStep] = useState(0);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.2, triggerOnce: false });

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % (TIMELINE_EVENTS.length + 1));
    }, 1400);
    return () => clearInterval(interval);
  }, [inView]);

  const visible = step === 0 ? 0 : step;

  return (
    <section id="feature-behavioral" className="py-24 px-6 lg:px-8" ref={inViewRef}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <SectionEyebrow className="mb-4" color="indigo">Behavioral Tracking</SectionEyebrow>
            <SectionHeading gradient size="lg" className="mb-5">
              Reach out before{' '}
              <span className="gradient-text-heading">they leave</span>
            </SectionHeading>
            <p className="text-white/50 leading-relaxed mb-8">
              OyeChats monitors mouse behavior, scroll depth, dwell time, and interaction
              patterns in real-time. When the AI detects frustration, hesitation, or high
              intent — it proactively triggers the chat to convert at exactly the right moment.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🖱️', label: 'Rage click detection' },
                { icon: '📜', label: 'Scroll depth tracking' },
                { icon: '⏱️', label: 'Dwell time analysis' },
                { icon: '🎯', label: 'Exit intent detection' },
                { icon: '🔗', label: 'UTM / referral capture' },
                { icon: '📱', label: 'Device & browser signals' },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-3 glass-1 rounded-xl p-3 border border-white/6">
                  <span className="text-lg">{f.icon}</span>
                  <span className="text-xs text-white/65">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: timeline animation */}
          <div className="glass-2 rounded-3xl border border-white/10 p-6">
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-5">Behavioral event log</p>
            <div className="space-y-3 min-h-[300px]">
              <AnimatePresence>
                {TIMELINE_EVENTS.slice(0, visible || TIMELINE_EVENTS.length).map((event, i) => (
                  <motion.div
                    key={event.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35 }}
                    className={`flex items-start gap-3 rounded-xl p-3 border ${TYPE_STYLES[event.type]}`}
                  >
                    <span className="text-lg shrink-0">{event.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold">{event.label}</p>
                        <span className="text-[10px] opacity-60 font-mono shrink-0">{event.time}</span>
                      </div>
                      <p className="text-[11px] opacity-70 leading-snug mt-0.5">{event.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
