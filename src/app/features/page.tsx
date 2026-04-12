import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FeaturesHero } from '@/components/features/FeaturesHero';

export const metadata: Metadata = {
  title: 'Features',
  description: 'Explore OyeChats features: RAG pipeline, BANT sales qualification, live chat handoff, behavioral tracking, webhooks, and deep analytics — all in one platform.',
  alternates: { canonical: 'https://oyechats.com/features' },
  openGraph: { url: 'https://oyechats.com/features' },
};
import { FeatureCategoryNav } from '@/components/features/FeatureCategoryNav';
import { RAGPipelineSection } from '@/components/features/RAGPipelineSection';
import { BANTSection } from '@/components/features/BANTSection';
import { LiveChatSection } from '@/components/features/LiveChatSection';
import { AnalyticsSection } from '@/components/features/AnalyticsSection';
import { BehavioralSection } from '@/components/features/BehavioralSection';
import { WebhooksSection } from '@/components/features/WebhooksSection';
import { IntegrationsFeaturesSection } from '@/components/features/IntegrationsFeaturesSection';
import { HomeCTA } from '@/components/home/HomeCTA';
import { AnimatedSeparator } from '@/components/shared/AnimatedSeparator';

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main>
        <FeaturesHero />
        <AnimatedSeparator />
        <FeatureCategoryNav />
        <RAGPipelineSection />
        <AnimatedSeparator />
        <BANTSection />
        <AnimatedSeparator />
        <LiveChatSection />
        <AnimatedSeparator />
        <AnalyticsSection />
        <AnimatedSeparator />
        <BehavioralSection />
        <AnimatedSeparator />
        <WebhooksSection />
        <AnimatedSeparator />
        <IntegrationsFeaturesSection />
        <AnimatedSeparator />
        <HomeCTA />
      </main>
      <Footer />
    </>
  );
}
