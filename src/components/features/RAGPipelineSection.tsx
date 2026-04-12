'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';

const PIPELINE_STEPS = [
  { icon: '📄', label: 'Upload Docs', desc: 'PDFs, Word files, URLs, or web crawl — any content you own', color: 'from-blue-600/20 to-blue-600/5' },
  { icon: '✂️', label: 'Chunk & Clean', desc: 'Smart sentence-aware splitting, deduplication, and metadata tagging', color: 'from-indigo-600/20 to-indigo-600/5' },
  { icon: '🧠', label: 'Embed', desc: 'Converts your content into semantic meaning the AI can reason over', color: 'from-violet-600/20 to-violet-600/5' },
  { icon: '🔍', label: 'Hybrid Search', desc: 'Semantic + keyword search working together — always finds the right answer', color: 'from-cyan-600/20 to-cyan-600/5' },
  { icon: '⚡', label: 'AI Generate', desc: 'Context-aware response generation with citation grounding', color: 'from-emerald-600/20 to-emerald-600/5' },
  { icon: '💬', label: 'Stream Reply', desc: 'Token-streamed response delivered in under 12ms median latency', color: 'from-amber-600/20 to-amber-600/5' },
];

export function RAGPipelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="feature-rag" className="py-24 px-6 lg:px-8" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <SectionEyebrow className="mb-4">RAG Pipeline</SectionEyebrow>
            <SectionHeading gradient size="lg" className="mb-5">
              Knowledge that actually{' '}
              <span className="gradient-text-heading">understands context</span>
            </SectionHeading>
            <p className="text-white/50 leading-relaxed mb-6">
              OyeChats doesn't just search your documents — it understands them. Hybrid AI search
              combines semantic understanding with keyword precision so visitors always get accurate,
              grounded answers — never hallucinated ones.
            </p>
            <ul className="space-y-3">
              {[
                'Supports PDFs, Word docs, plain text, URLs, and full website crawls',
                'Production-grade vector storage built for scale',
                'Custom AI instructions per bot with citation grounding',
                'Instant re-indexing when documents are updated',
                '50+ languages supported out of the box',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/65">
                  <svg width="14" height="14" viewBox="0 0 24 24" className="text-blue-400 fill-none stroke-current shrink-0 mt-0.5" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: pipeline diagram */}
          <div className="flex flex-col gap-3">
            {PIPELINE_STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                className={`relative flex items-center gap-4 rounded-xl bg-gradient-to-r ${step.color} border border-white/8 p-4`}
              >
                {/* Step number */}
                <div className="absolute -left-3 h-6 w-6 rounded-full bg-[#030D1F] border border-white/15 flex items-center justify-center text-[10px] font-bold text-white/50">
                  {i + 1}
                </div>
                <span className="text-2xl ml-2">{step.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{step.label}</p>
                  <p className="text-xs text-white/45">{step.desc}</p>
                </div>
                {/* Arrow connector */}
                {i < PIPELINE_STEPS.length - 1 && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                    <div className="w-px h-2 bg-white/15" />
                    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className="text-white/20">
                      <path d="M0 0L4 5L8 0" fill="currentColor" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
