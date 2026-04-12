'use client';
import { APP_LINKS } from '@/lib/constants';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { CTAButton } from '@/components/shared/CTAButton';
import { BANTScoreRing } from '@/components/shared/BANTScoreRing';
import { ChatBubble } from '@/components/shared/ChatBubble';
import { AnimatedGradientText } from '@/components/magic/AnimatedGradientText';
import dynamic from 'next/dynamic';
const AntigravityParticles = dynamic(
  () => import('@/components/canvas/AntigravityParticles').then(m => ({ default: m.AntigravityParticles })),
  { ssr: false }
);

const rotatingWords = ['Understands', 'Qualifies Leads', 'Closes Deals', 'Knows Your Docs'];

function RotatingWord() {
  const [current, setCurrent] = useState(0);
  const [animState, setAnimState] = useState<'in' | 'out'>('in');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimState('out');
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % rotatingWords.length);
        setAnimState('in');
      }, 320);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    // Fixed width prevents heading reflow on every word change (CLS fix)
    <span
      className="inline-block"
      style={{ minWidth: '14ch' }}
    >
      <span
        className={cn(
          'inline-block gradient-text-animated',
          animState === 'in' ? 'animate-rotate-text-in' : 'animate-rotate-text-out'
        )}
      >
        {rotatingWords[current]}
      </span>
    </span>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

// Social proof logos (placeholder text-based)
const socialProofItems = [
  { label: 'Shopify', color: '#96BF48' },
  { label: 'Webflow', color: '#4353FF' },
  { label: 'WordPress', color: '#21759B' },
  { label: 'Next.js', color: '#ffffff' },
  { label: 'HubSpot', color: '#FF7A59' },
];

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--color-bg-void)' }}
      aria-label="Hero section"
    >
      {/* Background glow */}
      <div className="hero-glow absolute inset-0 pointer-events-none" />

      {/* Grid pattern */}
      <div className="grid-bg absolute inset-0 opacity-40 pointer-events-none" />

      {/* Particle canvas — pure canvas, no React state updates on mouse move */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          <AntigravityParticles />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8 pt-32 pb-20 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-6"
        >
          <AnimatedGradientText>
            <span className="flex items-center gap-2 text-sm font-medium">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-livepulse"
                aria-hidden="true"
              />
              <span>RAG-First AI Sales Platform</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </span>
          </AnimatedGradientText>
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-semibold text-white leading-[1.06] tracking-[-0.04em] mb-6"
          style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)' }}
        >
          The AI That Actually
          <br />
          <RotatingWord />
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)' }}
        >
          RAG-powered chatbot with BANT sales intelligence. Hybrid vector + keyword search,
          live chat handoff, behavioral tracking, and webhooks — all in one platform.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <CTAButton
            href={APP_LINKS.register}
            variant="filled"
            size="lg"
            external
            showWavebar
            className="relative shadow-[0_0_40px_rgba(37,99,235,.35)]"
          >
            Start for free
          </CTAButton>
          <CTAButton
            href="/features"
            variant="ghost"
            size="lg"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
            </svg>
            See it in action
          </CTAButton>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-xs text-white/30 uppercase tracking-wider font-medium">
            Trusted by teams at
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {socialProofItems.map((item) => (
              <span
                key={item.label}
                className="text-sm font-semibold tracking-tight"
                style={{ color: `${item.color}88` }}
              >
                {item.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Hero product mockup — opacity-only fade prevents CLS from layout shift */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto w-full max-w-4xl px-6 lg:px-8 pb-24 animate-hero-float"
      >
        {/* Browser chrome wrapper */}
        <div className="glass-2 rounded-2xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,.6),0_0_0_1px_rgba(255,255,255,.1)]">
          {/* Browser bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-white/[.03]">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/60" />
              <div className="h-3 w-3 rounded-full bg-amber-500/60" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-white/6 rounded-lg px-3 py-1 text-xs text-white/30 text-center">
                app.yourcompany.com
              </div>
            </div>
          </div>

          {/* Product UI preview */}
          <div className="relative bg-[#040F20] p-6 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[300px]">
            {/* Left: chat widget */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl bg-blue-600 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4">
                      <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">OyeChat AI</p>
                    <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="h-1 w-1 rounded-full bg-emerald-400 animate-blink" />
                      Online
                    </p>
                  </div>
                </div>
                <span className="text-[10px] bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-full px-2 py-0.5 font-medium">
                  BANT: 84 pts
                </span>
              </div>

              <ChatBubble
                sender="bot"
                message="Hi! I'm here to help. I noticed you've been checking out our enterprise plan. Are you looking to scale your customer support team?"
                timestamp="2:31 PM"
              />
              <ChatBubble
                sender="human"
                message="Yes, we have about 50 support agents and 10k daily conversations."
                timestamp="2:32 PM"
              />
              <ChatBubble
                sender="bot"
                message="Perfect — with 50 agents and that volume, OyeChats Enterprise would save you roughly $24k/year vs your current stack. Want to schedule a demo this week?"
                timestamp="2:32 PM"
              />
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/6">
                <span className="text-[10px] text-cyan-400 flex items-center gap-1 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-2.5 py-1">
                  <span className="h-1 w-1 rounded-full bg-cyan-400 animate-blink" />
                  Transferring to Sarah (Senior AE)…
                </span>
              </div>
            </div>

            {/* Right: BANT panel */}
            <div className="space-y-4">
              <div className="glass-1 rounded-xl p-4">
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-3">Lead Intelligence</p>
                <div className="flex justify-center mb-3">
                  <BANTScoreRing score={84} size={100} animate={false} />
                </div>
                <div className="space-y-1.5">
                  {[
                    { label: 'Budget', value: '✓', color: 'text-emerald-400' },
                    { label: 'Authority', value: '✓', color: 'text-emerald-400' },
                    { label: 'Need', value: '✓', color: 'text-emerald-400' },
                    { label: 'Timeline', value: '~', color: 'text-amber-400' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-[11px] text-white/50">{item.label}</span>
                      <span className={`text-[11px] font-bold ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass-1 rounded-xl p-3">
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Visitor Intel</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-white/40">Sessions</span>
                    <span className="text-white/70">4 visits</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-white/40">Time on site</span>
                    <span className="text-white/70">12m 34s</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-white/40">UTM source</span>
                    <span className="text-blue-400">google / cpc</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Glow under mockup */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-20 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(37,99,235,.25) 0%, transparent 70%)',
            filter: 'blur(16px)',
          }}
        />
      </motion.div>

      {/* Bottom fade: blends Hero's void color into the main bg */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-20"
        style={{ background: 'linear-gradient(to bottom, transparent, #030D1F)' }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <span className="text-[10px] text-white/25 uppercase tracking-widest">Scroll</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-white/25 animate-scroll-chevron"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  );
}
