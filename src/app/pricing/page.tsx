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
        <PricingHero billing={billing} onToggle={setBilling} />
        <AnimatedSeparator />
        <PricingCards billing={billing} />
        <AnimatedSeparator />
        <FeatureTable />
        <AnimatedSeparator />
        <PricingFAQ />
      </main>
      <Footer />
    </>
  );
}
