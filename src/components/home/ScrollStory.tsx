'use client';

import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CodeSnippet } from '@/components/shared/CodeSnippet';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { BANTScoreRing } from '@/components/shared/BANTScoreRing';
import { FileText, Palette, Rocket, Target, Mail } from 'lucide-react';

const stepIcons: Record<number, React.ReactNode> = {
  1: <FileText className="w-4 h-4" />,
  2: <Palette className="w-4 h-4" />,
  3: <Rocket className="w-4 h-4" />,
  4: <Target className="w-4 h-4" />,
};

const steps = [
  {
    id: 1,
    label: 'Connect',
    heading: 'Upload your knowledge base',
    description:
      'Drop in PDFs, Word docs, or paste a URL. OyeChats crawls up to 750 pages, chunks intelligently, and has your bot answering questions in minutes.',
    color: 'blue',
  },
  {
    id: 2,
    label: 'Customize',
    heading: 'Brand it as your own',
    description:
      'Set your bot name, logo, colors, and system prompt. Every user-facing string is customizable — or remove OyeChats branding entirely on Pro.',
    color: 'indigo',
  },
  {
    id: 3,
    label: 'Deploy',
    heading: 'One script tag, any platform',
    description:
      'Copy the embed snippet and drop it into WordPress, Shopify, Webflow, or any HTML page. Zero setup, zero style conflicts — live in under 10 minutes.',
    color: 'cyan',
  },
  {
    id: 4,
    label: 'Qualify',
    heading: 'Watch your pipeline grow',
    description:
      'Every conversation feeds your BANT model. When a visitor hits your qualification threshold, webhooks fire instantly and your CRM is updated.',
    color: 'emerald',
  },
];

const stepColors = {
  blue: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
  indigo: 'text-indigo-400 border-indigo-400/30 bg-indigo-400/10',
  cyan: 'text-cyan-400 border-cyan-400/30 bg-cyan-400/10',
  emerald: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
};

const activeStepColors = {
  blue: 'border-blue-400 bg-blue-400 text-white',
  indigo: 'border-indigo-400 bg-indigo-400 text-white',
  cyan: 'border-cyan-400 bg-cyan-400 text-white',
  emerald: 'border-emerald-400 bg-emerald-400 text-white',
};

const embedCode = `<!-- Add to your website's <head> -->
<script
  src="https://cdn.oyechats.com/oyechats-widget.js"
  data-bot-key="bot-xxxxxxxx"
  strategy="lazyOnload"
></script>`;

function StepVisual({ step }: { step: typeof steps[0] }) {
  if (step.id === 1) {
    // File upload visual
    return (
      <div className="glass-2 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-white">Knowledge Base</p>
          <span className="text-xs text-emerald-400 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-blink" />
            Processing
          </span>
        </div>
        {[
          { name: 'product-docs.pdf', pages: 47, status: 'complete', chunks: 340 },
          { name: 'pricing-guide.docx', pages: 12, status: 'complete', chunks: 89 },
          { name: 'faq-2024.txt', pages: 1, status: 'indexing', chunks: 34 },
          { name: 'support-kb.pdf', pages: 120, status: 'queued', chunks: 0 },
        ].map((file) => (
          <div key={file.name} className="flex items-center gap-3 glass-1 rounded-xl p-3">
            <FileText className="w-5 h-5 text-blue-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white/80 truncate">{file.name}</p>
              <p className="text-[11px] text-white/45">{file.pages} pages</p>
            </div>
            <div className="text-right">
              <span className={cn(
                'text-[11px] font-medium rounded-full px-2 py-0.5',
                file.status === 'complete' ? 'text-emerald-400 bg-emerald-400/10' :
                file.status === 'indexing' ? 'text-amber-400 bg-amber-400/10 animate-pulse' :
                'text-white/45 bg-white/5'
              )}>
                {file.status === 'complete' ? `${file.chunks} chunks` : file.status}
              </span>
            </div>
          </div>
        ))}
        <div className="pt-2 border-t border-white/8 flex items-center justify-between">
          <span className="text-xs text-white/50">Total indexed</span>
          <span className="text-sm font-bold text-blue-400 font-display">12,450 chunks</span>
        </div>
      </div>
    );
  }

  if (step.id === 2) {
    // Widget customization visual
    return (
      <div className="glass-2 rounded-2xl p-6 space-y-4">
        <p className="text-sm font-semibold text-white mb-4">Widget Customization</p>
        {/* Color preview */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,.4)]" />
          <div>
            <p className="text-xs text-white/60">Primary color</p>
            <p className="text-xs font-mono text-blue-400">#2563EB</p>
          </div>
        </div>
        {/* Bot name */}
        <div className="glass-1 rounded-xl px-4 py-3 border border-white/10">
          <p className="text-[11px] text-white/50 mb-1">Bot name</p>
          <p className="text-sm font-medium text-white">Aria from Acme Corp</p>
        </div>
        {/* Welcome message */}
        <div className="glass-1 rounded-xl px-4 py-3 border border-white/10">
          <p className="text-[11px] text-white/50 mb-1">Welcome message</p>
          <p className="text-sm text-white/70">Hi! I&apos;m Aria. How can I help you today? 👋</p>
        </div>
        {/* Preview chip */}
        <div className="flex items-center gap-2 pt-2">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">A</div>
          <div className="glass-1 rounded-2xl rounded-bl-sm px-3 py-2 text-xs text-white/70">
            Hi! I&apos;m Aria. How can I help?
          </div>
        </div>
      </div>
    );
  }

  if (step.id === 3) {
    // Embed code visual
    return (
      <div className="space-y-3">
        <CodeSnippet
          code={embedCode}
          language="html"
          filename="index.html"
        />
        <div className="flex flex-wrap gap-2">
          {['WordPress', 'Shopify', 'Webflow', 'Next.js', 'Slack', 'Teams'].map((platform) => (
            <span key={platform}
              className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white/60 hover:text-white hover:bg-white/8 transition-colors">
              {platform}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (step.id === 4) {
    // BANT qualification visual
    return (
      <div className="glass-2 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-white">Live Pipeline</p>
          <span className="text-xs text-emerald-400 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-livepulse" />
            Real-time
          </span>
        </div>
        <div className="flex items-center gap-4">
          <BANTScoreRing score={84} size={80} animate />
          <div className="space-y-1.5">
            <p className="text-sm font-semibold text-white">Marcus Chen</p>
            <p className="text-xs text-white/45">Finvault · VP Engineering</p>
            <div className="flex gap-1.5">
              <span className="text-[11px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 rounded-full px-2 py-0.5">Sales Ready</span>
            </div>
          </div>
        </div>
        {/* Webhook fired */}
        <div className="glass-1 rounded-xl p-3 border border-emerald-500/20">
          <p className="text-[11px] text-emerald-400 font-medium mb-1">✓ Webhook fired</p>
          <p className="text-[11px] font-mono text-white/50">POST /tier_transition → 200 OK 43ms</p>
        </div>
        {/* CRM notification */}
        <div className="glass-1 rounded-xl p-3 border border-blue-500/20">
          <p className="text-[11px] text-blue-400 font-medium mb-1 flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email sent to team</p>
          <p className="text-[11px] text-white/50">New Sales-Ready lead: Marcus Chen (Finvault)</p>
        </div>
      </div>
    );
  }

  return null;
}

export function ScrollStory() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Simple scroll-based step switching using IntersectionObserver on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (-rect.top) / (rect.height - window.innerHeight)));
      const stepIndex = Math.min(steps.length - 1, Math.floor(progress * steps.length));
      setActiveStep(stepIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 lg:px-8 relative"
      aria-label="How it works"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16" data-gsap>
          <SectionEyebrow className="mx-auto mb-4">How It Works</SectionEyebrow>
          <SectionHeading gradient size="lg" center>
            From docs to{' '}
            <span className="gradient-text-heading">closed deals</span>
            {' '}in 4 steps
          </SectionHeading>
          <p className="mt-4 text-white/50 max-w-xl mx-auto">
            Set up in under 10 minutes. Most teams go live the same day.
          </p>
        </div>

        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Steps */}
          <div className="space-y-4">
            {steps.map((step, i) => {
              const isActive = i === activeStep;
              const colorClass = stepColors[step.color as keyof typeof stepColors];
              const activeClass = activeStepColors[step.color as keyof typeof activeStepColors];

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(i)}
                  className={cn(
                    'w-full text-left rounded-2xl border p-5 transition-all duration-400 cursor-pointer',
                    isActive
                      ? 'border-white/15 bg-white/[.05] shadow-lg'
                      : 'border-white/6 bg-white/[.02] hover:bg-white/[.04]'
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-all duration-300',
                        isActive ? activeClass : colorClass
                      )}
                    >
                      {isActive ? stepIcons[step.id] : step.id}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn('text-xs font-semibold uppercase tracking-wider',
                          isActive ? 'text-white/60' : 'text-white/45')}>
                          Step {step.id}
                        </span>
                      </div>
                      <p className={cn('font-display font-semibold text-base transition-colors',
                        isActive ? 'text-white' : 'text-white/60')}>
                        {step.heading}
                      </p>
                      {isActive && (
                        <p className="text-sm text-white/50 mt-1.5 leading-relaxed">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Visual */}
          <div className="lg:sticky lg:top-24">
            <StepVisual step={steps[activeStep]} />
          </div>
        </div>
      </div>
    </section>
  );
}
