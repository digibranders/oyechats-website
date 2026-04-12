import { Marquee } from '@/components/magic/Marquee';
import { cn } from '@/lib/utils';

const row1Items = [
  { label: 'RAG Pipeline', icon: '🧠' },
  { label: 'BANT Scoring', icon: '🎯' },
  { label: 'Hybrid Search', icon: '🔍' },
  { label: 'Live Chat Handoff', icon: '💬' },
  { label: 'Behavioral Tracking', icon: '📊' },
  { label: 'Webhook Events', icon: '🔄' },
  { label: 'Operator Teams', icon: '👥' },
  { label: 'Lead Capture', icon: '📋' },
  { label: 'Web Crawling', icon: '🌐' },
  { label: 'LLM Observability', icon: '🔬' },
  { label: 'Meeting Booking', icon: '📅' },
  { label: 'Custom Prompts', icon: '✏️' },
];

const row2Items = [
  { label: '99.99% Uptime SLA', icon: '⬆️' },
  { label: '12ms Median Latency', icon: '⚡' },
  { label: 'SOC 2 Type II', icon: '🛡️' },
  { label: 'GDPR Ready', icon: '✅' },
  { label: '50+ Languages', icon: '🌍' },
  { label: 'Shadow DOM Isolation', icon: '🔒' },
  { label: 'Redis Queuing', icon: '⚙️' },
  { label: 'pgvector Search', icon: '🗄️' },
  { label: 'SSE Streaming', icon: '📡' },
  { label: 'Rate Limiting', icon: '🚦' },
  { label: 'OpenAI + Gemini', icon: '🤖' },
  { label: 'Backblaze B2', icon: '☁️' },
];

function MarqueeItem({ label, icon }: { label: string; icon: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-4 py-2 mx-2 whitespace-nowrap select-none">
      <span className="text-sm" aria-hidden="true">{icon}</span>
      <span className="text-xs font-medium text-white/60">{label}</span>
    </div>
  );
}

export function MarqueeStrip() {
  return (
    <section
      className="py-12 overflow-hidden marquee-mask"
      style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      aria-label="Platform capabilities"
    >
      {/* Row 1 — left to right */}
      <Marquee
        repeat={3}
        pauseOnHover
        className="mb-3"
        reverse={false}
      >
        {[...row1Items, ...row1Items].map((item, i) => (
          <MarqueeItem key={`r1-${i}`} {...item} />
        ))}
      </Marquee>

      {/* Row 2 — right to left */}
      <Marquee
        repeat={3}
        pauseOnHover
        reverse={true}
      >
        {[...row2Items, ...row2Items].map((item, i) => (
          <MarqueeItem key={`r2-${i}`} {...item} />
        ))}
      </Marquee>
    </section>
  );
}
