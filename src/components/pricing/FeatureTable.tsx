'use client';
import { APP_LINKS } from '@/lib/constants';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { featureRows } from '@/lib/pricing';
import { Star } from 'lucide-react';

const CATEGORIES = [
  { id: 'usage', label: 'Pricing & Usage Limits' },
  { id: 'features', label: 'Features' },
  { id: 'security', label: 'Security & Enterprise' },
] as const;

const TIERS = [
  { id: 'free',       label: 'Free',       color: 'text-white/70',  highlight: false },
  { id: 'starter',    label: 'Starter',    color: 'text-blue-300',  highlight: false },
  { id: 'standard',   label: 'Standard',   color: 'text-blue-400',  highlight: true  },
  { id: 'enterprise', label: 'Enterprise', color: 'text-indigo-400', highlight: false },
];

const CTA_LINKS = [APP_LINKS.register, APP_LINKS.registerStarter, APP_LINKS.registerStandard, '/contact?intent=enterprise'];
const CTA_LABELS = ['Get started', 'Start free trial', 'Start free trial', 'Contact sales'];

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="text-emerald-400 fill-none stroke-current mx-auto" strokeWidth="3">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function Dash() {
  return <span className="text-white/45">—</span>;
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true)  return <Check />;
  if (value === false || value === '—') return <Dash />;
  return <span className="text-xs text-white/70 whitespace-nowrap">{value}</span>;
}

export function FeatureTable() {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  return (
    <section className="px-6 lg:px-8 pb-24">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-2xl font-semibold text-white text-center mb-10">
          Full feature comparison
        </h2>

        {/* Desktop table */}
        <div className="hidden md:block rounded-2xl border border-white/8 overflow-hidden">
          <table className="w-full border-collapse">
            <colgroup>
              <col style={{ width: '30%' }} />
              <col style={{ width: '17.5%' }} />
              <col style={{ width: '17.5%' }} />
              <col style={{ width: '17.5%' }} />
              <col style={{ width: '17.5%' }} />
            </colgroup>

            {/* Header */}
            <thead>
              <tr className="bg-white/[0.03] border-b border-white/8">
                <th className="px-5 py-4 text-left text-sm font-medium text-white/50">Feature</th>
                {TIERS.map((t) => (
                  <th
                    key={t.id}
                    className={cn('px-5 py-4 text-center', t.highlight && 'bg-blue-500/[0.05]')}
                  >
                    <span className={cn('text-sm font-semibold', t.color)}>{t.label}</span>
                    {t.highlight && (
                      <p className="text-[11px] text-blue-400/60 mt-0.5 flex items-center justify-center gap-1"><Star className="w-3 h-3 fill-current" /> Most Popular</p>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {CATEGORIES.map((cat) => {
                const rows = featureRows.filter((r) => r.category === cat.id);
                const isOpen = !collapsed.has(cat.id);
                return (
                  <>
                    {/* Category header row */}
                    <tr
                      key={`cat-${cat.id}`}
                      onClick={() => toggle(cat.id)}
                      className="bg-white/[0.02] border-b border-white/6 hover:bg-white/[0.04] transition-colors cursor-pointer"
                    >
                      <td colSpan={5} className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <svg
                            width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                            className={cn('text-white/50 transition-transform duration-200 shrink-0', isOpen ? 'rotate-90' : '')}
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                          <span className="text-xs font-semibold text-white/55 uppercase tracking-widest">{cat.label}</span>
                        </div>
                      </td>
                    </tr>

                    {/* Feature rows */}
                    {isOpen && rows.map((row, i) => (
                      <tr
                        key={row.label}
                        className={cn(
                          'border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors',
                          i === rows.length - 1 && 'border-b-0'
                        )}
                      >
                        <td className="px-5 py-3 text-sm text-white/60">{row.label}</td>
                        <td className="px-5 py-3 text-center"><Cell value={row.free} /></td>
                        <td className="px-5 py-3 text-center"><Cell value={row.starter} /></td>
                        <td className="px-5 py-3 text-center bg-blue-500/[0.02]"><Cell value={row.standard} /></td>
                        <td className="px-5 py-3 text-center"><Cell value={row.enterprise} /></td>
                      </tr>
                    ))}
                  </>
                );
              })}

              {/* CTA row */}
              <tr className="border-t border-white/8 bg-white/[0.01]">
                <td className="px-5 py-4" />
                {CTA_LINKS.map((href, i) => (
                  <td key={i} className={cn('px-4 py-4 text-center', i === 2 && 'bg-blue-500/[0.03]')}>
                    <a
                      href={href}
                      className={cn(
                        'text-xs underline underline-offset-2 transition-colors',
                        i === 2 ? 'text-blue-400 font-semibold hover:text-blue-300' : 'text-white/50 hover:text-white'
                      )}
                    >
                      {CTA_LABELS[i]}
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile: per-tier cards */}
        <div className="md:hidden space-y-3">
          {TIERS.map((tier) => {
            const isOpen = !collapsed.has(`m-${tier.id}`);
            return (
              <div key={tier.id} className="glass-1 rounded-2xl border border-white/8 overflow-hidden">
                <button
                  onClick={() => toggle(`m-${tier.id}`)}
                  className="w-full flex items-center justify-between px-5 py-4 cursor-pointer"
                >
                  <span className={cn('text-sm font-semibold', tier.color)}>{tier.label}</span>
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    className={cn('text-white/50 transition-transform duration-200', isOpen ? 'rotate-90' : '')}
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="border-t border-white/8">
                    {featureRows.map((row) => (
                      <div key={row.label} className="flex items-center justify-between px-5 py-2.5 border-t border-white/[0.04]">
                        <span className="text-xs text-white/55 pr-3">{row.label}</span>
                        <Cell value={row[tier.id as keyof typeof row] as string | boolean} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
