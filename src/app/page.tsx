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
const PricingPreview = dynamic(() => import('@/components/home/PricingPreview').then(m => ({ default: m.PricingPreview })));
const HomeCTA = dynamic(() => import('@/components/home/HomeCTA').then(m => ({ default: m.HomeCTA })));

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section data-surface="ink"><Hero /></section>
        <section data-surface="canvas"><FeatureBento /></section>
        <Suspense fallback={<div className="h-48" />}>
          <section data-surface="slate"><ScrollStory /></section>
          <section data-surface="mist"><LiveStats /></section>
          <section data-surface="canvas"><IntegrationsPreview /></section>
          <section data-surface="canvas"><PricingPreview /></section>
          <section data-surface="ink"><HomeCTA /></section>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
