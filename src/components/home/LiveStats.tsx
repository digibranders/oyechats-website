'use client';

import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { NumberTicker } from '@/components/magic/NumberTicker';
import { cn } from '@/lib/utils';
import { Lock, HardDrive, Bug, Microscope, Cloud, Mail } from 'lucide-react';

const stats = [
  { value: 12, suffix: 'ms', label: 'Median latency', color: 'text-blue-400', glow: 'rgba(96,165,250,0.22)', description: 'P99 API response time' },
  { value: 24, suffix: '/7', label: 'AI coverage', color: 'text-indigo-400', glow: 'rgba(129,140,248,0.22)', description: 'Visitors helped around the clock' },
  { value: 100, suffix: '%', label: 'Your data stays yours', color: 'text-cyan-400', glow: 'rgba(34,211,238,0.22)', description: 'Never used to train any AI model' },
  { value: 42, suffix: '%', label: 'Avg conversion lift', color: 'text-emerald-400', glow: 'rgba(52,211,153,0.22)', description: 'vs. old chat tools' },
  { value: 5, suffix: '+', label: 'Source formats', color: 'text-violet-400', glow: 'rgba(167,139,250,0.22)', description: 'PDFs, docs, and URLs all supported' },
  { value: 10, suffix: 'min', label: 'Average setup time', color: 'text-amber-400', glow: 'rgba(251,191,36,0.22)', description: 'From signup to live' },
];

export function LiveStats() {
  return (
    <section
      className="relative py-24 px-6 lg:px-8 overflow-hidden"
      aria-label="Platform statistics"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(37,99,235,.06) 0%, transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-7xl relative">
        {/* Top stat, large */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 mb-16 pb-16 border-b border-white/8">
          <div className="lg:w-1/2">
            <SectionEyebrow className="mb-4">Enterprise-Grade Infrastructure</SectionEyebrow>
            <div
              className="font-display font-semibold gradient-text-heading mb-4"
              style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', letterSpacing: '-0.02em', lineHeight: 1.05 }}
            >
              99.99<span className="text-blue-400">%</span>
            </div>
            <p className="text-xl font-semibold text-white/70 mb-2">Uptime SLA</p>
            <p className="text-sm text-white/50 max-w-md">
              Enterprise-grade infrastructure with redundancy, automatic backups, and
              real-time monitoring, so your chat widget is always online.
            </p>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            {[
              { label: 'Isolated cloud infrastructure', icon: Lock },
              { label: 'Auto-backups every 6 hours', icon: HardDrive },
              { label: 'Real-time error monitoring', icon: Bug },
              { label: 'AI response observability', icon: Microscope },
              { label: 'Geo-redundant file storage', icon: Cloud },
              { label: 'Transactional email delivery', icon: Mail },
            ].map((item) => (
              <div key={item.label}
                className="flex items-center gap-2.5 glass-1 rounded-xl p-3 border border-white/6">
                <item.icon className="h-4 w-4 text-white/50 shrink-0" />
                <span className="text-xs text-white/55">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="group" data-gsap>
              <div
                className="glass-1 rounded-2xl p-6 border border-white/6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_0_36px_var(--stat-glow)]"
                style={{ ['--stat-glow' as string]: stat.glow }}
              >
                <div className={cn('font-display font-semibold mb-1', stat.color)}
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.05 }}>
                  <NumberTicker value={stat.value} className={stat.color} />
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-sm font-medium text-white/70 mb-0.5">{stat.label}</p>
                <p className="text-xs text-white/45">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Live indicator */}
        <div className="flex justify-center mt-8">
          <div className="inline-flex items-center gap-2 text-xs text-white/45">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-livepulse" />
            Stats updated in real-time
          </div>
        </div>
      </div>
    </section>
  );
}
