import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Articles on RAG AI, BANT qualification, live chat strategy, and sales automation from the OyeChats team.',
  alternates: { canonical: 'https://oyechats.com/blog' },
  openGraph: { url: 'https://oyechats.com/blog' },
};
import { cn } from '@/lib/utils';

const CATEGORIES = ['All', 'Product', 'Sales', 'AI', 'Engineering', 'Guides'];

const POSTS = [
  {
    slug: 'bant-scoring-ai-chatbot',
    category: 'Sales',
    tag: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    title: 'How BANT Scoring Transforms AI Chat from a Cost Center to a Revenue Driver',
    excerpt: 'Most AI chatbots answer questions. OyeChats qualifies leads. Here\'s the technical breakdown of how BANT scoring works — and why it changes everything.',
    readTime: '8 min read',
    date: 'Mar 12, 2025',
  },
  {
    slug: 'rag-vs-fine-tuning',
    category: 'AI',
    tag: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
    title: 'RAG vs Fine-Tuning: Why We Chose Retrieval-Augmented Generation for OyeChats',
    excerpt: 'Fine-tuning is expensive, slow, and stale. RAG gives you fresh, accurate answers at a fraction of the cost. We explain the tradeoffs in depth.',
    readTime: '12 min read',
    date: 'Mar 5, 2025',
  },
  {
    slug: 'hybrid-search-explained',
    category: 'Engineering',
    tag: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    title: 'How Hybrid AI Search Makes OyeChats 40% More Accurate',
    excerpt: 'Combining semantic understanding with keyword precision means your bot always finds the right answer — even when the question is phrased unexpectedly.',
    readTime: '10 min read',
    date: 'Feb 26, 2025',
  },
  {
    slug: 'intercom-alternative',
    category: 'Product',
    tag: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    title: 'Why Teams Are Switching From Intercom to OyeChats in 2025',
    excerpt: 'Intercom costs $300+/month and doesn\'t do BANT scoring or RAG. We break down the real differences — feature by feature, price by price.',
    readTime: '6 min read',
    date: 'Feb 18, 2025',
  },
  {
    slug: 'behavioral-tracking-lead-gen',
    category: 'Sales',
    tag: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    title: 'Rage Clicks, Exit Intent, and the Psychology of Converting Frustrated Visitors',
    excerpt: 'Behavioral signals are the most underused conversion lever on your website. Here\'s how to turn frustration into leads.',
    readTime: '7 min read',
    date: 'Feb 10, 2025',
  },
  {
    slug: 'webhook-best-practices',
    category: 'Guides',
    tag: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    title: 'Webhook Best Practices: How to Handle OyeChats Events Reliably at Scale',
    excerpt: 'Idempotency keys, HMAC verification, retry handling, and dead-letter queues — everything you need to build a bulletproof webhook consumer.',
    readTime: '9 min read',
    date: 'Feb 3, 2025',
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-24 px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
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

            {/* Category filter */}
            <div className="flex items-center gap-2 flex-wrap justify-center mb-10">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium border transition-colors',
                    cat === 'All'
                      ? 'bg-blue-600/20 text-blue-300 border-blue-500/30'
                      : 'text-white/40 border-white/10 hover:text-white/70 hover:border-white/20'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Featured post */}
            <div className="glass-2 rounded-3xl border border-white/10 p-8 mb-8 group hover:border-white/15 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <span className={cn('text-[10px] font-semibold uppercase tracking-wide rounded-full border px-2.5 py-1', POSTS[0].tag)}>
                  {POSTS[0].category}
                </span>
                <span className="text-xs text-white/30">{POSTS[0].readTime}</span>
                <span className="text-xs text-white/30">{POSTS[0].date}</span>
              </div>
              <h2 className="font-display text-2xl font-semibold text-white mb-3 group-hover:text-white/90 transition-colors">
                {POSTS[0].title}
              </h2>
              <p className="text-white/50 leading-relaxed mb-5">{POSTS[0].excerpt}</p>
              <Link href={`/blog/${POSTS[0].slug}`} className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium flex items-center gap-1.5">
                Read article
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>

            {/* Post grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {POSTS.slice(1).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="glass-1 rounded-2xl border border-white/8 p-5 group hover:border-white/15 transition-all flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={cn('text-[9px] font-semibold uppercase tracking-wide rounded-full border px-2 py-0.5', post.tag)}>
                      {post.category}
                    </span>
                    <span className="text-[10px] text-white/30 ml-auto">{post.readTime}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-white/90 transition-colors mb-2 leading-snug flex-1">
                    {post.title}
                  </h3>
                  <p className="text-xs text-white/45 leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
                  <p className="text-[10px] text-white/25">{post.date}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
