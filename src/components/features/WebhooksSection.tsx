import { TerminalWidget } from '@/components/shared/TerminalWidget';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Meteors } from '@/components/magic/Meteors';

const EVENT_TYPES = [
  { name: 'lead.captured', color: 'text-blue-400' },
  { name: 'bant.tier_changed', color: 'text-amber-400' },
  { name: 'chat.operator_joined', color: 'text-violet-400' },
  { name: 'conversation.ended', color: 'text-cyan-400' },
  { name: 'bot.escalated', color: 'text-emerald-400' },
];

const FEATURES = [
  { icon: '🔄', title: 'Exponential retry', desc: 'Auto-retried up to 5× with backoff.' },
  { icon: '🔐', title: 'HMAC-SHA256 signing', desc: 'Every payload signed for verification.' },
  { icon: '📋', title: 'Delivery log', desc: 'Full attempt history in your dashboard.' },
  { icon: '🛠️', title: 'REST API + OpenAPI', desc: 'Programmatic control over everything.' },
];

export function WebhooksSection() {
  return (
    <section id="feature-webhooks" className="relative py-20 px-6 lg:px-8 overflow-hidden">
      <Meteors number={6} />

      <div className="mx-auto max-w-7xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: terminal + event types in a compact stack */}
          <div className="space-y-3">
            <TerminalWidget className="h-48" />

            <div className="glass-1 rounded-2xl border border-white/8 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-white/6 bg-white/[0.02]">
                <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">5 event types</p>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {EVENT_TYPES.map((evt) => (
                  <div key={evt.name} className="px-4 py-2.5">
                    <span className={`font-mono text-xs font-medium ${evt.color}`}>{evt.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: copy */}
          <div>
            <SectionEyebrow className="mb-4">Webhooks & API</SectionEyebrow>
            <SectionHeading gradient size="lg" className="mb-4">
              Real-time signals to{' '}
              <span className="gradient-text-heading">your entire stack</span>
            </SectionHeading>
            <p className="text-white/50 text-sm leading-relaxed mb-7">
              Every meaningful event in OyeChats fires a signed webhook to your endpoint.
              Connect to HubSpot, Zapier, Make, or your own backend — with exponential retries
              and a full delivery log.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {FEATURES.map((f) => (
                <div key={f.title} className="glass-1 rounded-xl p-4 border border-white/6">
                  <div className="text-xl mb-2">{f.icon}</div>
                  <p className="text-xs font-semibold text-white mb-1">{f.title}</p>
                  <p className="text-[11px] text-white/40 leading-snug">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
