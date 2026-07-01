'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { IntegrationsHero } from '@/components/integrations/IntegrationsHero';
import { IntegrationFilter } from '@/components/integrations/IntegrationFilter';
import { IntegrationsGrid } from '@/components/integrations/IntegrationsGrid';
import { WebhookSetup } from '@/components/integrations/WebhookSetup';
import { HomeCTA } from '@/components/home/HomeCTA';
import { IntegrationFilterId } from '@/types/integration';

export default function IntegrationsPage() {
  const [filter, setFilter] = useState<IntegrationFilterId>('all');

  return (
    <>
      <Navbar />
      <main>
        <div className="bg-section-a"><IntegrationsHero /></div>
        <div className="bg-section-b">
          <IntegrationFilter active={filter} onChange={setFilter} />
          <IntegrationsGrid filter={filter} />
        </div>
        <div className="bg-section-a"><WebhookSetup /></div>
        <div className="bg-section-b"><HomeCTA /></div>
      </main>
      <Footer />
    </>
  );
}
