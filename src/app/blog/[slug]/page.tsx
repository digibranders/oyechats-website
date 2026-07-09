import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { CTAButton } from '@/components/shared/CTAButton';
import {
  BLOG_POSTS,
  getPostBySlug,
  getSortedPosts,
  type BlogAccent,
  type BlogBlock,
  type BlogPost,
} from '@/lib/blog-posts';
import { cn } from '@/lib/utils';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return { title: 'Not found' };
  }
  const url = `https://oyechats.com/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.dateISO,
      authors: [post.author.name],
      tags: post.tags,
      images: [{ url: '/og-image.png', alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['/og-image.png'],
    },
  };
}

const ACCENT: Record<
  BlogAccent,
  { bg: string; ring: string; pill: string; text: string; glow: string; dot: string }
> = {
  blue: {
    bg: 'from-blue-500/25 via-blue-500/5 to-transparent',
    ring: 'ring-blue-400/30',
    pill: 'bg-blue-400/10 text-blue-300 border-blue-400/20',
    text: 'text-blue-300',
    glow: 'shadow-[0_0_60px_-10px_rgba(59,130,246,0.35)]',
    dot: 'bg-blue-400',
  },
  violet: {
    bg: 'from-violet-500/25 via-violet-500/5 to-transparent',
    ring: 'ring-violet-400/30',
    pill: 'bg-violet-400/10 text-violet-300 border-violet-400/20',
    text: 'text-violet-300',
    glow: 'shadow-[0_0_60px_-10px_rgba(139,92,246,0.35)]',
    dot: 'bg-violet-400',
  },
  emerald: {
    bg: 'from-emerald-500/25 via-emerald-500/5 to-transparent',
    ring: 'ring-emerald-400/30',
    pill: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
    text: 'text-emerald-300',
    glow: 'shadow-[0_0_60px_-10px_rgba(52,211,153,0.35)]',
    dot: 'bg-emerald-400',
  },
  amber: {
    bg: 'from-amber-500/25 via-amber-500/5 to-transparent',
    ring: 'ring-amber-400/30',
    pill: 'bg-amber-400/10 text-amber-300 border-amber-400/20',
    text: 'text-amber-300',
    glow: 'shadow-[0_0_60px_-10px_rgba(251,191,36,0.35)]',
    dot: 'bg-amber-400',
  },
  rose: {
    bg: 'from-rose-500/25 via-rose-500/5 to-transparent',
    ring: 'ring-rose-400/30',
    pill: 'bg-rose-400/10 text-rose-300 border-rose-400/20',
    text: 'text-rose-300',
    glow: 'shadow-[0_0_60px_-10px_rgba(244,63,94,0.35)]',
    dot: 'bg-rose-400',
  },
};

function renderBlock(block: BlogBlock, index: number): React.ReactNode {
  switch (block.type) {
    case 'h2':
      return (
        <h2
          key={index}
          className="font-display text-2xl sm:text-3xl font-semibold text-white mt-12 mb-4 tracking-tight"
        >
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3
          key={index}
          className="font-display text-lg sm:text-xl font-semibold text-white mt-8 mb-3 tracking-tight"
        >
          {block.text}
        </h3>
      );
    case 'p':
      return (
        <p key={index} className="text-white/70 leading-relaxed text-[16px] sm:text-[17px] mb-5">
          {block.text}
        </p>
      );
    case 'ul':
      return (
        <ul key={index} className="mb-6 space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-white/70 leading-relaxed text-[16px]">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40 shrink-0" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol key={index} className="mb-6 space-y-2.5 list-decimal list-outside pl-6 marker:text-white/40">
          {block.items.map((item, i) => (
            <li key={i} className="text-white/70 leading-relaxed text-[16px] pl-1">
              {item}
            </li>
          ))}
        </ol>
      );
    case 'quote':
      return (
        <blockquote
          key={index}
          className="my-8 border-l-2 border-white/25 pl-5 italic text-white/80 text-[17px] leading-relaxed"
        >
          {block.text}
          {block.cite ? <div className="mt-2 not-italic text-sm text-white/45">{block.cite}</div> : null}
        </blockquote>
      );
    case 'code':
      return (
        <pre
          key={index}
          className="my-6 overflow-x-auto rounded-2xl border border-white/10 bg-black/50 p-4 text-[13px] leading-relaxed text-white/85"
        >
          <code>{block.text}</code>
        </pre>
      );
    default:
      return null;
  }
}

function relatedPosts(current: BlogPost, count = 2): BlogPost[] {
  return getSortedPosts()
    .filter((p) => p.slug !== current.slug)
    .slice(0, count);
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const a = ACCENT[post.accent];
  const related = relatedPosts(post);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.dateISO,
    author: { '@type': 'Organization', name: 'OyeChats' },
    publisher: {
      '@type': 'Organization',
      name: 'OyeChats',
      logo: { '@type': 'ImageObject', url: 'https://oyechats.com/icon.png' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://oyechats.com/blog/${post.slug}`,
    },
    image: 'https://oyechats.com/og-image.png',
  };

  return (
    <>
      <Navbar />
      <main>
        <article>
          <header className="bg-section-a pt-32 pb-14 px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 flex items-center gap-2 text-sm">
                <Link href="/blog" className="text-white/50 hover:text-white transition-colors">
                  Blog
                </Link>
                <span className="text-white/25">/</span>
                <span className={cn('font-medium', a.text)}>{post.category}</span>
              </div>

              <SectionHeading gradient size="xl" className="mb-6">
                {post.title}
              </SectionHeading>

              <p className="text-white/60 text-lg leading-relaxed mb-8">{post.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-semibold border',
                      'bg-white/5 border-white/10 text-white/85'
                    )}
                  >
                    {post.author.initials}
                  </div>
                  <div>
                    <div className="text-white/80 font-medium">{post.author.name}</div>
                    <div className="text-white/40 text-xs">{post.author.role}</div>
                  </div>
                </div>
                <span className="h-4 w-px bg-white/15" aria-hidden />
                <span className="text-white/50">{post.date}</span>
                <span className="h-4 w-px bg-white/15" aria-hidden />
                <span className="text-white/50">{post.readMinutes} min read</span>
              </div>
            </div>
          </header>

          {/* Post cover image */}
          <div className="mx-auto max-w-3xl px-6 lg:px-8 mb-10">
            <div className={cn(
              "relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]",
              a.glow
            )}>
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>

          <section className="px-6 lg:px-8 pb-24 pt-4">
            <div className="mx-auto max-w-3xl">
              <div className="prose-invert">
                {post.content.map((block, i) => renderBlock(block, i))}
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium tracking-wide rounded-full border px-2.5 py-1 bg-white/5 text-white/60 border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-section-b px-6 lg:px-8 py-20 border-t border-white/[.06]">
            <div className="mx-auto max-w-3xl text-center">
              <SectionEyebrow className="mx-auto mb-4">Try OyeChats</SectionEyebrow>
              <SectionHeading gradient size="lg" center className="mb-4">
                Put an AI chatbot on your site in{' '}
                <span className="gradient-text-heading">under five minutes</span>
              </SectionHeading>
              <p className="text-white/55 max-w-xl mx-auto mb-8">
                Upload your docs, drop in one script tag, and let visitors get answers grounded in your own content.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <CTAButton href="/pricing" variant="filled" size="md">
                  See pricing
                </CTAButton>
                <CTAButton href="/docs" variant="ghost" size="md">
                  Read the docs
                </CTAButton>
              </div>
            </div>
          </section>

          {related.length > 0 && (
            <section className="bg-section-a px-6 lg:px-8 py-20 border-t border-white/[.06]">
              <div className="mx-auto max-w-5xl">
                <div className="mb-10 flex items-end justify-between">
                  <div>
                    <SectionEyebrow className="mb-3">Keep reading</SectionEyebrow>
                    <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                      More from the OyeChats blog
                    </h2>
                  </div>
                  <Link
                    href="/blog"
                    className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white transition-colors"
                  >
                    All posts
                    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden>
                      <path
                        d="M4 10h12M11 5l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {related.map((r) => {
                    const ra = ACCENT[r.accent];
                    return (
                      <Link
                        key={r.slug}
                        href={`/blog/${r.slug}`}
                        className="group glass-1 rounded-3xl border border-white/8 overflow-hidden transition-all hover:border-white/15 flex flex-col"
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/[0.06]">
                          <Image
                            src={r.image}
                            alt={r.title}
                            fill
                            sizes="(min-width: 640px) 380px, 100vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        <div className={cn('h-0.5 w-full', ra.dot)} aria-hidden />
                        <div className="p-6 flex-1 flex flex-col">
                          <div className={cn('text-xs font-medium mb-2', ra.text)}>{r.category}</div>
                          <h3 className="font-display text-lg font-semibold text-white mb-2 leading-snug group-hover:text-white/95">
                            {r.title}
                          </h3>
                          <p className="text-sm text-white/55 leading-relaxed line-clamp-2 mb-4">
                            {r.description}
                          </p>
                          <div className="mt-auto text-xs text-white/40">
                            {r.date} · {r.readMinutes} min read
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
