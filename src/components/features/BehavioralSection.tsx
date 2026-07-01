'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MousePointerClick, Clock, MessageCircle, Check, Target, Link2, Smartphone, type LucideIcon } from 'lucide-react';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';

const TIMELINE_EVENTS: { icon: LucideIcon; label: string; desc: string; time: string; type: string }[] = [
  { icon: Link2, label: 'Visitor arrived', desc: 'Traffic source captured: google / cpc', time: '0:00', type: 'signal' },
  { icon: MousePointerClick, label: 'Pages viewed', desc: 'Browsed Pricing and Features', time: '0:22', type: 'signal' },
  { icon: Clock, label: 'Return visitor', desc: '3rd visit in the last week', time: '0:40', type: 'signal' },
  { icon: MessageCircle, label: 'Conversation started', desc: 'Visitor opened the chat', time: '1:03', type: 'bot' },
  { icon: Check, label: 'Lead captured', desc: 'Email collected, visitor context attached to the lead', time: '1:18', type: 'success' },
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
            <SectionEyebrow className="mb-4" color="indigo">Visitor Context</SectionEyebrow>
            <SectionHeading gradient size="lg" className="mb-5">
              Context on every{' '}
              <span className="gradient-text-heading">visitor</span>
            </SectionHeading>
            <p className="text-white/50 leading-relaxed mb-8">
              OyeChats captures the context around every conversation, pages viewed, return
              visits, time on site, traffic source, and device, and attaches it to each lead,
              so your team and the BANT engine always know who they’re talking to.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: MousePointerClick, label: 'Pages viewed', color: 'text-amber-400' },
                { icon: Clock, label: 'Return visit detection', color: 'text-blue-400' },
                { icon: Clock, label: 'Time on site', color: 'text-violet-400' },
                { icon: Target, label: 'Traffic source', color: 'text-cyan-400' },
                { icon: Link2, label: 'UTM / referral capture', color: 'text-emerald-400' },
                { icon: Smartphone, label: 'Device & browser signals', color: 'text-indigo-400' },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-3 glass-1 rounded-xl p-3 border border-white/6">
                  <f.icon className={`h-4 w-4 shrink-0 ${f.color}`} />
                  <span className="text-xs text-white/65">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: timeline animation */}
          <div className="glass-2 rounded-3xl border border-white/10 p-6">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-5">Behavioral event log</p>
            <div className="space-y-3 min-h-[300px]">
              <AnimatePresence>
                {TIMELINE_EVENTS.slice(0, visible || TIMELINE_EVENTS.length).map((event) => (
                  <motion.div
                    key={event.label}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35 }}
                    className={`flex items-start gap-3 rounded-xl p-3 border ${TYPE_STYLES[event.type]}`}
                  >
                    <event.icon className="h-4 w-4 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold">{event.label}</p>
                        <span className="text-[11px] opacity-60 font-mono shrink-0">{event.time}</span>
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
