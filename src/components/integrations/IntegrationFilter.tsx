'use client';

import { cn } from '@/lib/utils';
import { IntegrationCategory } from '@/types/integration';

const CATEGORIES: { id: IntegrationCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'cms', label: 'CMS & Websites' },
  { id: 'messaging', label: 'Messaging' },
  { id: 'crm', label: 'CRM & Email' },
  { id: 'meetings', label: 'Meetings' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'automation', label: 'Automation' },
  { id: 'developer', label: 'Developer' },
];

interface IntegrationFilterProps {
  active: IntegrationCategory | 'all';
  onChange: (v: IntegrationCategory | 'all') => void;
}

export function IntegrationFilter({ active, onChange }: IntegrationFilterProps) {
  return (
    <div className="sticky top-[64px] z-30 bg-[#030D1F]/90 backdrop-blur-xl border-b border-white/8 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={cn(
                'flex-shrink-0 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer',
                active === id
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                  : 'text-white/50 hover:text-white/70 border border-transparent'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
