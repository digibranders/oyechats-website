import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { FeatureBento } from '@/components/home/FeatureBento';

// Below-fold sections loaded after initial paint to reduce first-load JS
const ScrollStory = dynamic(() => import('@/components/home/ScrollStory').then(m => ({ default: m.ScrollStory })));
const LiveStats = dynamic(() => import('@/components/home/LiveStats').then(m => ({ default: m.LiveStats })));
const IntegrationsPreview = dynamic(() => import('@/components/home/IntegrationsPreview').then(m => ({ default: m.IntegrationsPreview })));
const Testimonials = dynamic(() => import('@/components/home/Testimonials').then(m => ({ default: m.Testimonials })));
const PricingPreview = dynamic(() => import('@/components/home/PricingPreview').then(m => ({ default: m.PricingPreview })));
const HomeCTA = dynamic(() => import('@/components/home/HomeCTA').then(m => ({ default: m.HomeCTA })));
const AnimatedSeparator = dynamic(() => import('@/components/shared/AnimatedSeparator').then(m => ({ default: m.AnimatedSeparator })));

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section data-surface="ink"><Hero /></section>
        <section data-surface="canvas"><FeatureBento /></section>
        <Suspense fallback={<div className="h-48" />}>
          <section data-surface="slate"><AnimatedSeparator /><ScrollStory /></section>
          <section data-surface="mist"><AnimatedSeparator /><LiveStats /></section>
          <section data-surface="canvas"><AnimatedSeparator /><IntegrationsPreview /></section>
          <section data-surface="ink"><AnimatedSeparator /><Testimonials /></section>
          <section data-surface="canvas"><AnimatedSeparator /><PricingPreview /></section>
          <section data-surface="ink"><HomeCTA /></section>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
