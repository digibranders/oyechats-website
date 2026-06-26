'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PricingHero } from '@/components/pricing/PricingHero';
import { PricingCards } from '@/components/pricing/PricingCards';
import { FeatureTable } from '@/components/pricing/FeatureTable';
import { PricingFAQ } from '@/components/pricing/PricingFAQ';
import { AnimatedSeparator } from '@/components/shared/AnimatedSeparator';

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <>
      <Navbar />
      <main>
        <div className="bg-section-a">
          <PricingHero billing={billing} onToggle={setBilling} />
          <AnimatedSeparator />
        </div>
        <div className="bg-section-b">
          <PricingCards billing={billing} />
          <AnimatedSeparator />
        </div>
        <div className="bg-section-a">
          <FeatureTable />
          <AnimatedSeparator />
        </div>
        <div className="bg-section-b">
          <PricingFAQ />
        </div>
      </main>
      <Footer />
    </>
  );
}
