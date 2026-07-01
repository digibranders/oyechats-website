'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PricingHero } from '@/components/pricing/PricingHero';
import { PricingCards } from '@/components/pricing/PricingCards';
import { FeatureTable } from '@/components/pricing/FeatureTable';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
import type { PricingTier, PricingFeature } from '@/types/pricing';

interface PricingPageClientProps {
  tiers: PricingTier[];
  featureRows: PricingFeature[];
  faq: { q: string; a: string }[];
}

export function PricingPageClient({ tiers, featureRows, faq }: PricingPageClientProps) {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <>
      <Navbar />
      <main>
        <div className="bg-section-a">
          <PricingHero billing={billing} onToggle={setBilling} />
        </div>
        <div className="bg-section-b">
          <PricingCards billing={billing} tiers={tiers} />
        </div>
        <div className="bg-section-a">
          <FeatureTable rows={featureRows} />
        </div>
        <div className="bg-section-b">
          <PricingFAQ faq={faq} />
        </div>
      </main>
      <Footer />
    </>
  );
}
