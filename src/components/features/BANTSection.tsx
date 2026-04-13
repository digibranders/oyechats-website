'use client';

import { BANTScoreRing } from '@/components/shared/BANTScoreRing';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { cn } from '@/lib/utils';

const CRITERIA = [
  { key: 'B', label: 'Budget', score: 85, desc: 'Signals budget fit from conversation context', color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' },
  { key: 'A', label: 'Authority', score: 72, desc: 'Detects decision-maker language patterns', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
  { key: 'N', label: 'Need', score: 91, desc: 'Identifies pain points and urgency signals', color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' },
  { key: 'T', label: 'Timeline', score: 68, desc: 'Extracts purchase timeline from responses', color: 'text-violet-400 bg-violet-400/10 border-violet-400/20' },
];

const TIMELINE = [
  { time: '0:12', event: 'Visitor asks about pricing', tier: null },
  { time: '0:45', event: 'Mentions "Q2 budget approval"', tier: 'Budget signal detected ↑' },
  { time: '1:20', event: '"We need to deploy for 50 agents"', tier: 'Need signal strong ↑' },
  { time: '2:05', event: '"I\'m the VP of Sales here"', tier: 'Authority confirmed ↑' },
  { time: '2:40', event: 'BANT score reaches 84 → Webhook fired', tier: 'Hot Lead 🔥' },
];

export function BANTSection() {
  return (
    <section id="feature-bant" className="py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: visual */}
          <div className="flex flex-col items-center gap-8">
            {/* Score ring */}
            <div className="glass-2 rounded-3xl p-8 border border-white/10 w-full flex flex-col items-center">
              <BANTScoreRing score={84} size={160} />
              <p className="mt-4 text-sm text-white/50">Composite BANT Score</p>
            </div>

            {/* Criteria pills */}
            <div className="grid grid-cols-2 gap-3 w-full">
              {CRITERIA.map((c) => (
                <div key={c.key} className={cn('rounded-xl p-4 border', c.color)}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider">{c.label}</span>
                    <span className="text-sm font-semibold">{c.score}</span>
                  </div>
                  <div className="h-1 rounded-full bg-current/20 overflow-hidden">
                    <div className="h-full rounded-full bg-current transition-all" style={{ width: `${c.score}%` }} />
                  </div>
                  <p className="text-[11px] opacity-70 mt-2 leading-tight">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: copy + timeline */}
          <div>
            <SectionEyebrow className="mb-4" color="indigo">BANT Scoring</SectionEyebrow>
            <SectionHeading gradient size="lg" className="mb-5">
              Qualify every lead{' '}
              <span className="gradient-text-heading">automatically</span>
            </SectionHeading>
            <p className="text-white/50 leading-relaxed mb-8">
              BANT (Budget, Authority, Need, Timeline) is the gold standard in B2B sales qualification.
              OyeChats analyzes every conversation in real-time and scores each dimension 0–100,
              triggering webhooks and CRM updates the moment a visitor becomes a hot lead.
            </p>

            {/* Timeline */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">Live conversation timeline</p>
              {TIMELINE.map((event, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[11px] text-white/45 font-mono mt-0.5 w-8 shrink-0">{event.time}</span>
                  <div className="flex-1">
                    <p className="text-sm text-white/65">{event.event}</p>
                    {event.tier && (
                      <span className={cn(
                        'inline-block text-[11px] font-medium mt-1 px-2 py-0.5 rounded-full border',
                        event.tier.includes('🔥')
                          ? 'text-amber-400 bg-amber-400/10 border-amber-400/25'
                          : 'text-blue-400 bg-blue-400/10 border-blue-400/20'
                      )}>
                        {event.tier}
                      </span>
                    )}
                  </div>
                  {/* Connector */}
                  {i < TIMELINE.length - 1 && (
                    <div className="absolute ml-[26px] mt-5 w-px h-5 bg-white/10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
