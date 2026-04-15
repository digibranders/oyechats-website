import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';

const BAR_DATA = [42, 68, 55, 80, 91, 74, 88];
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const MAX = 91;

const METRICS = [
  { label: 'Total conversations', value: '12,441', change: '+18%', up: true },
  { label: 'Leads captured', value: '3,892', change: '+31%', up: true },
  { label: 'Avg BANT score', value: '74', change: '+9pts', up: true },
  { label: 'Handoff rate', value: '22%', change: '-4%', up: false },
];

export function AnalyticsSection() {
  return (
    <section id="feature-analytics" className="py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: dashboard mockup */}
          <div className="glass-2 rounded-3xl border border-white/10 p-6 space-y-5">
            {/* Metrics row */}
            <div className="grid grid-cols-2 gap-3">
              {METRICS.map((m) => (
                <div key={m.label} className="glass-1 rounded-xl p-4 border border-white/8">
                  <p className="text-[11px] text-white/50 mb-1">{m.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-display font-bold text-white">{m.value}</span>
                    <span className={`text-[11px] font-medium ${m.up ? 'text-emerald-400' : 'text-red-400'}`}>
                      {m.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <div className="glass-1 rounded-xl p-4 border border-white/8">
              <p className="text-xs text-white/50 mb-4">Conversations this week</p>
              <div className="flex items-end gap-2 h-24">
                {BAR_DATA.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-sm bg-gradient-to-t from-blue-600 to-cyan-500 opacity-80 transition-all"
                      style={{ height: `${(val / MAX) * 80}px` }}
                    />
                    <span className="text-[11px] text-white/45">{DAYS[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BANT tier donut */}
            <div className="glass-1 rounded-xl p-4 border border-white/8">
              <p className="text-xs text-white/50 mb-3">Lead tier distribution</p>
              <div className="flex items-center gap-6">
                <svg width="70" height="70" viewBox="0 0 70 70">
                  <circle cx="35" cy="35" r="25" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                  <circle cx="35" cy="35" r="25" fill="none" stroke="#10B981" strokeWidth="10" strokeDasharray="47 110" strokeDashoffset="0" transform="rotate(-90 35 35)" />
                  <circle cx="35" cy="35" r="25" fill="none" stroke="#F59E0B" strokeWidth="10" strokeDasharray="33 110" strokeDashoffset="-47" transform="rotate(-90 35 35)" />
                  <circle cx="35" cy="35" r="25" fill="none" stroke="#EF4444" strokeWidth="10" strokeDasharray="30 110" strokeDashoffset="-80" transform="rotate(-90 35 35)" />
                  <text x="35" y="39" textAnchor="middle" className="text-[8px] fill-white font-bold" style={{ fontSize: 8, fill: 'white', fontFamily: 'inherit' }}>Leads</text>
                </svg>
                <div className="space-y-2">
                  {[
                    { label: 'Hot (70–100)', color: 'bg-emerald-400', pct: '30%' },
                    { label: 'Warm (40–69)', color: 'bg-amber-400', pct: '22%' },
                    { label: 'Cold (0–39)', color: 'bg-red-400', pct: '48%' },
                  ].map((t) => (
                    <div key={t.label} className="flex items-center gap-2 text-xs text-white/55">
                      <span className={`h-2 w-2 rounded-full ${t.color}`} />
                      {t.label}
                      <span className="ml-auto text-white/45">{t.pct}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: copy */}
          <div>
            <SectionEyebrow className="mb-4" color="emerald">Analytics</SectionEyebrow>
            <SectionHeading gradient size="lg" className="mb-5">
              Data that drives{' '}
              <span className="gradient-text-heading">better decisions</span>
            </SectionHeading>
            <p className="text-white/50 leading-relaxed mb-8">
              Every conversation generates signal. OyeChats turns that signal into
              actionable analytics — from visitor geo and device breakdowns to
              top-asked questions, BANT tier distributions, and UTM attribution reports.
            </p>
            <ul className="space-y-3">
              {[
                'Real-time conversation and lead metrics dashboard',
                'BANT tier distribution (Hot / Warm / Cold)',
                'Top questions report — know what your visitors ask most',
                'Visitor geo, device, and referral source breakdown',
                'UTM parameter capture for campaign attribution',
                'AI response observability dashboard (Enterprise)',
                'Chat history retention up to 90 days (Pro) or unlimited (Enterprise)',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white/65">
                  <svg width="14" height="14" viewBox="0 0 24 24" className="text-emerald-400 fill-none stroke-current shrink-0 mt-0.5" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
