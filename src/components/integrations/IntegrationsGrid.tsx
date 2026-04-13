'use client';

import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagicCard } from '@/components/magic/MagicCard';
import { cn } from '@/lib/utils';
import { integrations } from '@/lib/integrations';
import { IntegrationCategory } from '@/types/integration';

interface IntegrationsGridProps {
  filter: IntegrationCategory | 'all';
}

const CATEGORY_COLORS: Record<string, string> = {
  cms: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  messaging: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  crm: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  meetings: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  analytics: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  automation: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  developer: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
};

export function IntegrationsGrid({ filter }: IntegrationsGridProps) {
  const filtered = useMemo(() => (
    filter === 'all' ? integrations : integrations.filter((i) => i.category === filter)
  ), [filter]);

  return (
    <section className="px-6 lg:px-8 py-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((integration) => (
              <motion.div
                key={integration.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <MagicCard
                  className="glass-1 rounded-2xl p-5 border border-white/8 hover:border-white/15 transition-all group cursor-default h-full"
                  gradientColor="#2563EB"
                  gradientOpacity={0.15}
                >
                  <div className="flex flex-col items-center gap-3 text-center">
                    <span className="group-hover:scale-110 transition-transform duration-200">
                      {integration.icon}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white group-hover:text-white/90">{integration.name}</p>
                      <p className="text-[11px] text-white/45 mt-0.5">{integration.description}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                      <span className={cn(
                        'text-[11px] font-medium uppercase tracking-wide rounded-full border px-2 py-0.5',
                        CATEGORY_COLORS[integration.category]
                      )}>
                        {integration.category}
                      </span>
                      {!integration.available && (
                        <span className="text-[11px] font-medium text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-full px-2 py-0.5 uppercase tracking-wide">
                          Soon
                        </span>
                      )}
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-white/50 py-16">No integrations in this category yet.</p>
        )}
      </div>
    </section>
  );
}
