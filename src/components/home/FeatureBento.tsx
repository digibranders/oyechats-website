'use client';

import { SpotlightCard } from '@/components/aceternity/SpotlightCard';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { BANTScoreRing } from '@/components/shared/BANTScoreRing';
import { ChatBubble } from '@/components/shared/ChatBubble';
import { TerminalWidget } from '@/components/shared/TerminalWidget';
import { cn } from '@/lib/utils';
import { FileText, Scissors, Hash, Search, Bot, MessageCircle } from 'lucide-react';

// RAG Pipeline SVG Animation
function RAGPipelineCell() {
  const stages: { icon: React.ReactNode; label: string; sublabel: string; color: string }[] = [
    { icon: <FileText className="w-5 h-5" style={{ color: '#60A5FA' }} />, label: 'Documents', sublabel: 'PDF · DOCX · TXT', color: '#60A5FA' },
    { icon: <Scissors className="w-5 h-5" style={{ color: '#6366F1' }} />, label: 'Chunking', sublabel: '512 tokens', color: '#6366F1' },
    { icon: <Hash className="w-5 h-5" style={{ color: '#8B5CF6' }} />, label: 'Embedding', sublabel: 'Semantic vectors', color: '#8B5CF6' },
    { icon: <Search className="w-5 h-5" style={{ color: '#06B6D4' }} />, label: 'Hybrid Search', sublabel: 'Vector + Keyword', color: '#06B6D4' },
    { icon: <Bot className="w-5 h-5" style={{ color: '#10B981' }} />, label: 'AI Answer', sublabel: 'Grounded response', color: '#10B981' },
    { icon: <MessageCircle className="w-5 h-5" style={{ color: '#34D399' }} />, label: 'Response', sublabel: 'Streaming SSE', color: '#34D399' },
  ];

  return (
    <SpotlightCard className="glass-2 rounded-2xl p-6 h-full" spotlightColor="rgba(37,99,235,0.1)">
      <div className="mb-4">
        <SectionEyebrow color="blue">RAG Pipeline</SectionEyebrow>
        <h3 className="font-display font-semibold text-white text-xl mt-3 mb-1">
          Document-Aware AI
        </h3>
        <p className="text-sm text-white/50">
          Hybrid AI search combines semantic understanding with keyword matching — so the right answer surfaces every time.
        </p>
      </div>

      {/* Pipeline stages */}
      <div className="flex items-center gap-1 flex-wrap mt-4">
        {stages.map((stage, i) => (
          <div key={stage.label} className="flex items-center gap-1">
            <div
              className="flex flex-col items-center gap-1 rounded-xl border border-white/8 bg-white/[.03] p-2.5 min-w-[60px] text-center hover:border-white/15 transition-colors group"
            >
              <span className="group-hover:scale-110 transition-transform duration-200">
                {stage.icon}
              </span>
              <span className="text-[11px] font-medium text-white/70 whitespace-nowrap">{stage.label}</span>
              <span className="text-[11px] text-white/45 whitespace-nowrap hidden sm:block">{stage.sublabel}</span>
            </div>
            {i < stages.length - 1 && (
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-white/20 shrink-0">
                <path d="M0 4H12M12 4L8 1M12 4L8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="flex gap-4 mt-4 pt-4 border-t border-white/8">
        {[
          { value: '12ms', label: 'P99 latency' },
          { value: '99%', label: 'Accuracy' },
          { value: 'Hybrid', label: 'Search mode' },
        ].map((stat) => (
          <div key={stat.label}>
            <p className="text-sm font-semibold text-blue-400">{stat.value}</p>
            <p className="text-[11px] text-white/45">{stat.label}</p>
          </div>
        ))}
      </div>
    </SpotlightCard>
  );
}

// BANT Score Cell
function BANTCell() {
  return (
    <SpotlightCard className="glass-2 rounded-2xl p-5 h-full" spotlightColor="rgba(139,92,246,0.12)">
      <SectionEyebrow color="indigo">BANT Intelligence</SectionEyebrow>
      <h3 className="font-display font-semibold text-white text-lg mt-3 mb-1">
        Automated Qualification
      </h3>
      <p className="text-xs text-white/45 mb-4">
        Real-time scoring across Budget, Authority, Need, Timeline.
      </p>
      <div className="flex justify-center mb-4">
        <BANTScoreRing score={84} size={120} animate />
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {[
          { label: 'Budget', score: 92, color: 'bg-emerald-500' },
          { label: 'Authority', score: 88, color: 'bg-emerald-500' },
          { label: 'Need', score: 95, color: 'bg-emerald-500' },
          { label: 'Timeline', score: 62, color: 'bg-amber-500' },
        ].map((item) => (
          <div key={item.label} className="rounded-lg bg-white/[.03] border border-white/8 p-2">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px] text-white/50 font-medium">{item.label}</span>
              <span className="text-[11px] font-bold text-white/80">{item.score}</span>
            </div>
            <div className="h-1 rounded-full bg-white/8 overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all duration-1000', item.color)}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </SpotlightCard>
  );
}

// Live Chat Cell
function LiveChatCell() {
  return (
    <SpotlightCard className="glass-2 rounded-2xl p-5 h-full" spotlightColor="rgba(6,182,212,0.1)">
      <SectionEyebrow color="cyan">Live Chat</SectionEyebrow>
      <h3 className="font-display font-semibold text-white text-lg mt-3 mb-3">
        Bot → Human Handoff
      </h3>
      <div className="space-y-2.5">
        <ChatBubble
          sender="bot"
          message="Great question! Let me connect you with a specialist."
        />
        <div className="flex items-center gap-2 my-2">
          <div className="h-px flex-1 bg-cyan-500/20" />
          <span className="text-[11px] text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-2 py-0.5">
            Transferring to Sarah
          </span>
          <div className="h-px flex-1 bg-cyan-500/20" />
        </div>
        <ChatBubble
          sender="operator"
          message="Hi! I'm Sarah, your Account Executive. I can see your BANT score — let's talk about the Enterprise plan."
        />
      </div>
      <div className="mt-3 pt-3 border-t border-white/8 flex items-center justify-between">
        <span className="text-[11px] text-white/45">WebSocket real-time</span>
        <span className="text-[11px] text-emerald-400">● Live</span>
      </div>
    </SpotlightCard>
  );
}

// Analytics Cell
function AnalyticsCell() {
  const bars = [42, 68, 55, 80, 63, 91, 74, 88, 70, 95, 82, 100];

  return (
    <SpotlightCard className="glass-2 rounded-2xl p-5 h-full" spotlightColor="rgba(16,185,129,0.08)">
      <SectionEyebrow color="emerald">Analytics</SectionEyebrow>
      <h3 className="font-display font-semibold text-white text-lg mt-3 mb-1">
        Deep Visitor Insights
      </h3>
      <p className="text-xs text-white/45 mb-4">Behavioral scoring, UTM tracking, session heatmaps.</p>

      {/* Mini bar chart */}
      <div className="flex items-end gap-1 h-16 mb-3">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm transition-all duration-700"
            style={{
              height: `${h}%`,
              background: `rgba(37,99,235,${0.3 + (h / 100) * 0.5})`,
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { value: '2,847', label: 'Sessions today', color: 'text-blue-400' },
          { value: '18.4%', label: 'Lead conversion', color: 'text-emerald-400' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg bg-white/[.03] border border-white/8 p-2.5">
            <p className={cn('text-base font-bold font-display', stat.color)}>{stat.value}</p>
            <p className="text-[11px] text-white/45 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>
    </SpotlightCard>
  );
}

// Webhooks Cell
const webhookEvents = [
  { type: 'tier_transition', status: 200, latency: 43 },
  { type: 'lead_captured', status: 200, latency: 28 },
  { type: 'handoff_requested', status: 200, latency: 61 },
  { type: 'meeting_booked', status: 200, latency: 35 },
  { type: 'chat_closed', status: 200, latency: 19 },
];

function WebhooksCell() {
  return (
    <SpotlightCard className="glass-2 rounded-2xl p-5 h-full" spotlightColor="rgba(99,102,241,0.1)">
      <SectionEyebrow color="indigo">Webhooks</SectionEyebrow>
      <h3 className="font-display font-semibold text-white text-lg mt-3 mb-1">
        Event-Driven Integrations
      </h3>
      <p className="text-xs text-white/45 mb-3">5 event types, retry logic, SSRF protection.</p>
      <TerminalWidget events={webhookEvents} autoPlay className="text-[11px] rounded-xl" />
    </SpotlightCard>
  );
}

export function FeatureBento() {
  return (
    <section className="py-24 px-6 lg:px-8" aria-label="Platform features">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12" data-gsap>
          <SectionEyebrow className="mx-auto mb-4">Platform Features</SectionEyebrow>
          <SectionHeading gradient size="lg" center>
            Everything you need to{' '}
            <span className="gradient-text-heading">convert pipeline</span>
          </SectionHeading>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto">
            From RAG-powered document understanding to automated BANT scoring — OyeChats handles the full journey from visitor to closed deal.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bento-responsive">
          {/* RAG — full width on lg */}
          <div className="lg:col-span-2 cursor-pointer" data-gsap>
            <RAGPipelineCell />
          </div>

          {/* BANT */}
          <div className="cursor-pointer" data-gsap>
            <BANTCell />
          </div>

          {/* Live Chat */}
          <div className="cursor-pointer" data-gsap>
            <LiveChatCell />
          </div>

          {/* Analytics */}
          <div className="cursor-pointer" data-gsap>
            <AnalyticsCell />
          </div>

          {/* Webhooks */}
          <div className="cursor-pointer" data-gsap>
            <WebhooksCell />
          </div>
        </div>
      </div>
    </section>
  );
}
