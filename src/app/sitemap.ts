import type { MetadataRoute } from 'next';

const BASE_URL = 'https://oyechats.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date('2026-04-11'), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/features`, lastModified: new Date('2026-04-11'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date('2026-04-11'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/integrations`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/customers`, lastModified: new Date('2026-03-15'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date('2026-03-01'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date('2026-04-11'), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/changelog`, lastModified: new Date('2026-04-11'), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/docs`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/security`, lastModified: new Date('2026-03-01'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date('2026-03-01'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/legal/privacy`, lastModified: new Date('2026-01-01'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/legal/terms`, lastModified: new Date('2026-01-01'), changeFrequency: 'yearly', priority: 0.3 },
    // Blog posts
    { url: `${BASE_URL}/blog/bant-scoring-ai-chatbot`, lastModified: new Date('2025-03-12'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog/rag-vs-fine-tuning`, lastModified: new Date('2025-03-05'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog/hybrid-search-explained`, lastModified: new Date('2025-02-26'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog/intercom-alternative`, lastModified: new Date('2025-02-18'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/blog/behavioral-tracking-lead-gen`, lastModified: new Date('2025-02-10'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/blog/webhook-best-practices`, lastModified: new Date('2025-02-03'), changeFrequency: 'monthly', priority: 0.6 },
  ];
}
