'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { IntegrationsHero } from '@/components/integrations/IntegrationsHero';
import { IntegrationFilter } from '@/components/integrations/IntegrationFilter';
import { IntegrationsGrid } from '@/components/integrations/IntegrationsGrid';
import { WebhookSetup } from '@/components/integrations/WebhookSetup';
import { HomeCTA } from '@/components/home/HomeCTA';
import { IntegrationCategory } from '@/types/integration';
import { AnimatedSeparator } from '@/components/shared/AnimatedSeparator';

export default function IntegrationsPage() {
  const [filter, setFilter] = useState<IntegrationCategory | 'all'>('all');

  return (
    <>
      <Navbar />
      <main>
        <IntegrationsHero />
        <AnimatedSeparator />
        <IntegrationFilter active={filter} onChange={setFilter} />
        <AnimatedSeparator />
        <IntegrationsGrid filter={filter} />
        <AnimatedSeparator />
        <WebhookSetup />
        <AnimatedSeparator />
        <HomeCTA />
      </main>
      <Footer />
    </>
  );
}
