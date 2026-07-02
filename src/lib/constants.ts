// ─── App URLs ─────────────────────────────────────────────────────────────────
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.oyechats.com';

export const APP_LINKS = {
  register: `${APP_URL}/register`,
  registerStarter: `${APP_URL}/register?plan=starter`,
  registerStandard: `${APP_URL}/register?plan=standard`,
  login: `${APP_URL}/login`,
  home: APP_URL,
} as const;

export const FEATURE_CARDS = [
  {
    icon: 'clock',
    title: 'Real-Time Responses',
    description: 'Sub-second AI replies keep every conversation flowing naturally, 24/7, without any wait time.',
  },
  {
    icon: 'globe',
    title: 'Grounded Answers',
    description: 'Hybrid semantic + keyword search answers from your own docs with citations, never hallucinated.',
  },
  {
    icon: 'code',
    title: 'Easy Integration',
    description: 'Drop Oye Chat into any website or app in minutes with our lightweight embed snippet.',
  },
  {
    icon: 'pen',
    title: 'Custom Personality',
    description: 'Train Oye Chat on your brand voice, FAQs, and product docs for perfectly on-brand responses.',
  },
  {
    icon: 'lock',
    title: 'Built-In Security',
    description: 'Encrypted in transit, role-based access control, HMAC-signed webhooks, and prompt-injection guards on every conversation.',
  },
  {
    icon: 'chart',
    title: 'Deep Analytics',
    description: 'Live dashboards, a lead-qualification funnel, top-questions reports, and post-chat CSAT ratings to measure what matters.',
  },
] as const;

export const STATS = [
  { icon: '🎯', target: 100, suffix: '', label: 'BANT lead score (0–100)' },
  { icon: '📄', target: 5, suffix: '+', label: 'Source formats (PDF, DOCX, URLs)' },
  { icon: '⚡', target: 10, suffix: 'min', label: 'Average setup time' },
  { icon: '🔌', target: 5, suffix: '', label: 'Webhook event types' },
] as const;

export const MARQUEE_ITEMS = [
  'Hybrid RAG Search',
  'Citation-Grounded Answers',
  'BANT Lead Scoring',
  'Live Human Handoff',
  'Multi-Bot Ready',
  'Webhooks & REST API',
  'GDPR-Ready',
  'Encrypted in Transit',
  'Streaming Responses',
  'Prompt-Injection Guarded',
] as const;

export const CERTIFICATIONS = [
  'GDPR-Ready',
  'TLS in Transit',
  'HMAC-Signed Webhooks',
  'Role-Based Access Control',
  'Encrypted at Rest',
] as const;

export const HOW_IT_WORKS_STEPS = [
  {
    image: '/images/step-connect-data.webp',
    fallbackUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    alt: 'Connect your data',
    title: 'Connect your data',
    step: 'Step 01',
    category: 'Data & Knowledge',
  },
  {
    image: '/images/step-customize-voice.webp',
    fallbackUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80',
    alt: 'Customize the voice',
    title: 'Customize the voice',
    step: 'Step 02',
    category: 'Brand & Personality',
  },
  {
    image: '/images/step-embed-anywhere.webp',
    fallbackUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    alt: 'Embed anywhere',
    title: 'Embed anywhere',
    step: 'Step 03',
    category: 'Deployment',
  },
  {
    image: '/images/step-monitor-improve.webp',
    fallbackUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    alt: 'Monitor and improve',
    title: 'Monitor & improve',
    step: 'Step 04',
    category: 'Analytics',
  },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Changelog', href: '#' },
      { label: 'Integrations', href: '#' },
      { label: 'Roadmap', href: '#' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'SDK', href: '#' },
      { label: 'Webhooks', href: '#' },
      { label: 'Examples', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Customers', href: '#' },
      { label: 'Brand', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
] as const;

export const ENTERPRISE_SECONDARY_STATS = [
  { value: 'Hybrid', unit: '', label: 'RAG search' },
  { value: '5', unit: '', label: 'Webhook event types' },
  { value: '10', unit: 'min', label: 'Average setup time' },
] as const;
