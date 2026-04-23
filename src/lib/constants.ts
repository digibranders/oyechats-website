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
    description: 'Sub-second AI replies keep every conversation flowing naturally — 24/7, without any wait time.',
  },
  {
    icon: 'globe',
    title: 'Multi-Language',
    description: 'Communicate fluently in 50+ languages. Break barriers and reach every customer globally.',
  },
  {
    icon: 'code',
    title: 'Easy Integration',
    description: 'Drop Oye Chat into any website, CRM, or app in minutes with our lightweight embed snippet.',
  },
  {
    icon: 'pen',
    title: 'Custom Personality',
    description: 'Train Oye Chat on your brand voice, FAQs, and product docs for perfectly on-brand responses.',
  },
  {
    icon: 'lock',
    title: 'Enterprise Security',
    description: 'SOC 2 compliant, end-to-end encrypted, with RBAC and SSO support built in from day one.',
  },
  {
    icon: 'chart',
    title: 'Deep Analytics',
    description: 'Real-time dashboards, conversation heatmaps, and CSAT tracking to measure what matters.',
  },
] as const;

export const STATS = [
  { icon: '😊', target: 95, suffix: '%', label: 'Customer satisfaction rate' },
  { icon: '⚡', target: 3, suffix: 's', label: 'Average response time' },
  { icon: '📉', target: 78, suffix: '%', label: 'Reduction in support tickets' },
  { icon: '🌍', target: 50, suffix: '+', label: 'Languages supported' },
] as const;

export const MARQUEE_ITEMS = [
  '99.99% Uptime',
  '12ms Median Latency',
  'SOC 2 Type II',
  '50+ Languages',
  '+42% Conversion Lift',
  '5M+ Monthly Conversations',
  'GDPR Compliant',
  'White-Glove Onboarding',
  '24/7 Enterprise Support',
  'End-to-End Encrypted',
] as const;

export const CERTIFICATIONS = [
  'SOC 2 Type II',
  'GDPR Compliant',
  'ISO 27001',
  'End-to-End Encrypted',
  '99.99% SLA',
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
  { value: '12', unit: 'ms', label: 'Median latency' },
  { value: '+42', unit: '%', label: 'Avg. conversion lift' },
  { value: '5M', unit: '+', label: 'Monthly conversations' },
] as const;
