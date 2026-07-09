import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SectionEyebrow } from '@/components/shared/SectionEyebrow';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { getSortedPosts, type BlogAccent } from '@/lib/blog-posts';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles on RAG, hybrid search, BANT qualification, live chat, and sales automation from the OyeChats team.',
  alternates: { canonical: 'https://oyechats.com/blog' },
  openGraph: { url: 'https://oyechats.com/blog' },
};

const ACCENT: Record<
  BlogAccent,
  { bg: string; ring: string; pill: string; text: string; dot: string }
> = {
  blue: {
    bg: 'from-blue-500/25 via-blue-500/5 to-transparent',
    ring: 'ring-blue-400/30',
    pill: 'bg-blue-400/10 text-blue-300 border-blue-400/20',
    text: 'text-blue-300',
    dot: 'bg-blue-400/70',
  },
  violet: {
    bg: 'from-violet-500/25 via-violet-500/5 to-transparent',
    ring: 'ring-violet-400/30',
    pill: 'bg-violet-400/10 text-violet-300 border-violet-400/20',
    text: 'text-violet-300',
    dot: 'bg-violet-400/70',
  },
  emerald: {
    bg: 'from-emerald-500/25 via-emerald-500/5 to-transparent',
    ring: 'ring-emerald-400/30',
    pill: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
    text: 'text-emerald-300',
    dot: 'bg-emerald-400/70',
  },
  amber: {
    bg: 'from-amber-500/25 via-amber-500/5 to-transparent',
    ring: 'ring-amber-400/30',
    pill: 'bg-amber-400/10 text-amber-300 border-amber-400/20',
    text: 'text-amber-300',
    dot: 'bg-amber-400/70',
  },
  rose: {
    bg: 'from-rose-500/25 via-rose-500/5 to-transparent',
    ring: 'ring-rose-400/30',
    pill: 'bg-rose-400/10 text-rose-300 border-rose-400/20',
    text: 'text-rose-300',
    dot: 'bg-rose-400/70',
  },
};

export default function BlogPage() {
  const posts = getSortedPosts();
  const [featured, ...rest] = posts;
  const fa = featured ? ACCENT[featured.accent] : null;

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-section-a pt-32 pb-16 px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-14">
              <SectionEyebrow className="mx-auto mb-4">Blog</SectionEyebrow>
              <SectionHeading gradient size="xl" center className="mb-4">
                Insights on AI,{' '}
                <span className="gradient-text-heading">sales, and chat</span>
              </SectionHeading>
              <p className="text-white/55 max-w-xl mx-auto">
                Product notes, engineering deep dives, and conversion strategies from the OyeChats team.
              </p>
            </div>

            {featured && fa && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group block glass-1 rounded-3xl border border-white/8 overflow-hidden transition-all hover:border-white/15 mb-14"
              >
                <div className={cn('h-1 w-full', fa.dot)} aria-hidden />
                <div className="flex flex-col md:flex-row">
                  {/* Left Column (Image) */}
                  <div className="relative w-full md:w-1/2 aspect-[16/10] md:aspect-auto md:min-h-[320px] border-b border-white/[0.06] md:border-b-0 md:border-r border-white/8 overflow-hidden">
                    <Image
                      src={featured.image}
                      alt={featured.title}
                      fill
                      sizes="(min-width: 1024px) 500px, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  {/* Right Column (Content) */}
                  <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
                    <div className="mb-4 flex items-center gap-3">
                      <span
                        className={cn(
                          'text-[11px] font-medium tracking-wide rounded-full border px-2.5 py-1',
                          fa.pill
                        )}
                      >
                        Featured
                      </span>
                      <span className={cn('text-xs font-medium', fa.text)}>
                        {featured.category}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white leading-snug mb-4 tracking-tight group-hover:text-white/95">
                      {featured.title}
                    </h2>
                    <p className="text-white/60 leading-relaxed mb-6 max-w-2xl text-sm sm:text-base line-clamp-3">
                      {featured.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-white/50">
                      <span>{featured.author.name}</span>
                      <span className="text-white/25">·</span>
                      <span>{featured.date}</span>
                      <span className="text-white/25">·</span>
                      <span>{featured.readMinutes} min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => {
                const a = ACCENT[post.accent];
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group glass-1 rounded-3xl border border-white/8 overflow-hidden transition-all hover:border-white/15 flex flex-col"
                  >
                    {/* Top Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/[0.06]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1024px) 330px, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <div className={cn('h-0.5 w-full', a.dot)} aria-hidden />
                    <div className="p-6 flex-1 flex flex-col">
                      <div className={cn('text-xs font-medium mb-2', a.text)}>{post.category}</div>
                      <h3 className="font-display text-lg font-semibold text-white mb-2 leading-snug tracking-tight group-hover:text-white/95">
                        {post.title}
                      </h3>
                      <p className="text-sm text-white/55 leading-relaxed line-clamp-3 mb-5">
                        {post.description}
                      </p>
                      <div className="mt-auto text-xs text-white/40">
                        {post.date} · {post.readMinutes} min read
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
