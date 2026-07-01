import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTAButton } from '@/components/shared/CTAButton';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles on RAG AI, BANT qualification, live chat strategy, and sales automation from the OyeChats team. Coming soon.',
  alternates: { canonical: 'https://oyechats.com/blog' },
  openGraph: { url: 'https://oyechats.com/blog' },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-section-a pt-32 pb-24 px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-14">
              <SectionEyebrow className="mx-auto mb-4">Blog</SectionEyebrow>
              <SectionHeading gradient size="xl" center className="mb-4">
                Insights on AI,{' '}
                <span className="gradient-text-heading">sales, and chat</span>
              </SectionHeading>
              <p className="text-white/50">
                Product updates, engineering deep-dives, and conversion strategies from the OyeChats team.
              </p>
            </div>

            {/* Empty state, no articles published yet */}
            <div className="glass-2 rounded-3xl border border-white/10 p-10 text-center">
              <h2 className="font-display text-2xl font-semibold text-white mb-3">
                Articles are on the way
              </h2>
              <p className="text-white/50 leading-relaxed max-w-md mx-auto mb-8">
                We&apos;re just getting started and haven&apos;t published any posts yet. In the
                meantime, explore what OyeChats does or read the docs to get set up.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <CTAButton href="/features" variant="filled" size="md">
                  Explore features
                </CTAButton>
                <CTAButton href="/docs" variant="ghost" size="md">
                  Read the docs
                </CTAButton>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
