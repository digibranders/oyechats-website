import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CodeSnippet } from '@/components/shared/CodeSnippet';

const STEPS = [
  {
    step: 1,
    title: 'Configure your endpoint',
    desc: 'Add your webhook URL in the OyeChats dashboard under Settings → Webhooks. Select which event types to subscribe to.',
  },
  {
    step: 2,
    title: 'Verify the signature',
    desc: 'Each payload includes an X-OyeChats-Signature header. Verify it with your secret to ensure authenticity.',
  },
  {
    step: 3,
    title: 'Process the event',
    desc: 'Parse the JSON payload and route it to your CRM, Slack, or any downstream system. Return 200 within 10 seconds.',
  },
];

const WEBHOOK_PAYLOAD = `{
  "event": "tier_transition",
  "bot_id": 42,
  "timestamp": "2025-03-15T14:22:01Z",
  "data": {
    "session_id": "conv_9k2p1mxn",
    "previous_tier": "warm",
    "new_tier": "hot",
    "bant": {
      "budget": 85,
      "authority": 72,
      "need": 91,
      "timeline": 68,
      "composite": 84
    },
    "lead": { "email": "john@acme.com" },
    "utm": { "source": "google", "campaign": "enterprise-q1" }
  }
}`;

export function WebhookSetup() {
  return (
    <section className="py-24 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <SectionEyebrow className="mx-auto mb-4">Webhooks</SectionEyebrow>
          <SectionHeading gradient size="lg" center className="mb-4">
            Real-time data,{' '}
            <span className="gradient-text-heading">wherever you need it</span>
          </SectionHeading>
          <p className="text-white/50 max-w-xl mx-auto">
            5 event types. Signed payloads. Automatic retries. Full delivery logs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Steps */}
          <div className="space-y-6">
            {STEPS.map((s) => (
              <div key={s.step} className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-blue-400 shrink-0">
                  {s.step}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">{s.title}</p>
                  <p className="text-xs text-white/50 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}

            {/* Data flow diagram */}
            <div className="glass-1 rounded-2xl border border-white/8 p-5 mt-4">
              <p className="text-xs text-white/50 mb-4 uppercase tracking-widest font-semibold">Data flow</p>
              <div className="flex items-center gap-2 text-xs text-white/60">
                {['OyeChats', '→', 'HTTPS POST', '→', 'Your endpoint', '→', 'CRM / Slack / DB'].map((node, i) => (
                  <span key={i} className={node === '→' ? 'text-white/45' : 'px-2 py-1 glass-1 rounded-lg border border-white/6'}>
                    {node}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Payload */}
          <div>
            <p className="text-xs text-white/50 uppercase tracking-widest font-semibold mb-3">Example payload</p>
            <CodeSnippet code={WEBHOOK_PAYLOAD} language="json" />
          </div>
        </div>
      </div>
    </section>
  );
}
