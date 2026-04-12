import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { FeatureBento } from '@/components/home/FeatureBento';
import { ScrollStory } from '@/components/home/ScrollStory';
import { LiveStats } from '@/components/home/LiveStats';
import { IntegrationsPreview } from '@/components/home/IntegrationsPreview';
import { Testimonials } from '@/components/home/Testimonials';
import { PricingPreview } from '@/components/home/PricingPreview';
import { HomeCTA } from '@/components/home/HomeCTA';
import { AnimatedSeparator } from '@/components/shared/AnimatedSeparator';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeatureBento />
        <AnimatedSeparator />
        <ScrollStory />
        <AnimatedSeparator />
        <LiveStats />
        <AnimatedSeparator />
        <IntegrationsPreview />
        <AnimatedSeparator />
        <Testimonials />
        <AnimatedSeparator />
        <PricingPreview />
        <HomeCTA />
      </main>
      <Footer />
    </>
  );
}
