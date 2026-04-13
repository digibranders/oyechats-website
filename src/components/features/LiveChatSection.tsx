'use client';

import { useState, useEffect, useRef } from 'react'; // useRef needed for runningRef
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';

const CHAT_SEQUENCE = [
  { type: 'bot' as const, text: 'Hi! I\'m OyeBot. How can I help you today?', delay: 0 },
  { type: 'human' as const, text: 'I need to speak with someone about enterprise pricing', delay: 1200 },
  { type: 'bot' as const, text: 'Of course! I\'m connecting you with a sales specialist now.', delay: 2400 },
  { type: 'operator' as const, text: 'Hey! I\'m Sarah from the enterprise team. I\'d love to walk you through our options.', delay: 3800 },
  { type: 'human' as const, text: 'Perfect, we have 50 agents and need SSO + custom SLA', delay: 5200 },
  { type: 'operator' as const, text: 'Great fit for Enterprise! Let me pull up a custom quote for you.', delay: 6400 },
];

const FEATURES_LIST = [
  'Instant bot-to-human handoff with full context transfer',
  'Operator departments & routing rules',
  'Canned responses and internal notes',
  'Business hours config with auto-away',
  'Real-time typing indicators for visitors',
  'BANT score visible in operator dashboard',
  'Meeting booking via Calendly integration',
  'Email & Slack notifications for new chats',
];

export function LiveChatSection() {
  const [visible, setVisible] = useState(0);
  const { ref: sectionRef, inView } = useInView({ threshold: 0.2, triggerOnce: false });
  const runningRef = useRef(false);
  const isReset = visible === 0;

  useEffect(() => {
    if (!inView || runningRef.current) return;
    runningRef.current = true;

    const timers: ReturnType<typeof setTimeout>[] = [];
    CHAT_SEQUENCE.forEach((msg, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), msg.delay + 1000));
    });
    const resetDelay = CHAT_SEQUENCE[CHAT_SEQUENCE.length - 1].delay + 4000;
    timers.push(setTimeout(() => {
      setVisible(0);
      runningRef.current = false;
    }, resetDelay));

    return () => {
      timers.forEach(clearTimeout);
      runningRef.current = false;
    };
  }, [inView, isReset]);

  return (
    <section id="feature-livechat" className="py-24 px-6 lg:px-8" ref={sectionRef}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div>
            <SectionEyebrow className="mb-4" color="cyan">Live Chat</SectionEyebrow>
            <SectionHeading gradient size="lg" className="mb-5">
              AI that knows when to{' '}
              <span className="gradient-text-heading">hand it to a human</span>
            </SectionHeading>
            <p className="text-white/50 leading-relaxed mb-8">
              The best AI chat tools know their limits. When a visitor needs a human touch,
              OyeChats seamlessly transfers the conversation to your team — with full context,
              the entire history, and the BANT qualification score pre-loaded.
            </p>
            <ul className="space-y-3">
              {FEATURES_LIST.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white/65">
                  <svg width="14" height="14" viewBox="0 0 24 24" className="text-cyan-400 fill-none stroke-current shrink-0 mt-0.5" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Right: live chat simulation */}
          <div className="glass-2 rounded-3xl border border-white/10 overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8 bg-white/[0.02]">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">O</div>
              <div>
                <p className="text-sm font-semibold text-white">OyeChats Support</p>
                <p className="text-xs text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
                  Online
                </p>
              </div>
              <div className="ml-auto">
                <span className="text-[11px] bg-amber-400/15 text-amber-400 border border-amber-400/20 rounded-full px-2 py-1 font-medium">
                  BANT: 84
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="p-5 space-y-3 min-h-[300px]">
              <AnimatePresence>
                {CHAT_SEQUENCE.slice(0, visible).map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.type === 'human' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.type !== 'human' && (
                      <div className={`h-7 w-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0 mr-2 ${
                        msg.type === 'operator' ? 'bg-gradient-to-br from-violet-500 to-indigo-500' : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                      }`}>
                        {msg.type === 'operator' ? 'S' : 'AI'}
                      </div>
                    )}
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                      msg.type === 'human'
                        ? 'bg-blue-600 text-white'
                        : msg.type === 'operator'
                        ? 'bg-violet-600/20 border border-violet-500/20 text-white/80'
                        : 'bg-white/8 text-white/75'
                    }`}>
                      {msg.type === 'operator' && (
                        <p className="text-[11px] text-violet-400 font-medium mb-1 uppercase tracking-wide">Sarah · Enterprise Sales</p>
                      )}
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
