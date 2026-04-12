import { PricingTier, PricingFeature } from '@/types/pricing';
import { APP_LINKS } from '@/lib/constants';

export const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Start exploring AI-powered chat',
    monthlyPrice: 0,
    annualPrice: 0,
    annualTotal: 0,
    accent: 'blue',
    limits: {
      urlScanning: 50,
      aiQueries: 250,
      liveChat: '—',
    },
    features: [
      '50 URL scans / month',
      '250 AI queries / month',
      'Basic widget customization',
      'Lead capture forms',
      'Community support',
    ],
    cta: 'Get started',
    ctaHref: APP_LINKS.register,
    featured: false,
  },
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For growing teams with live chat needs',
    monthlyPrice: 19,
    annualPrice: 13,
    annualTotal: 159,
    accent: 'blue',
    limits: {
      urlScanning: 250,
      aiQueries: 1000,
      liveChat: '500 msg',
    },
    features: [
      '250 URL scans / month',
      '1,000 AI queries / month',
      '500 live operator messages / month',
      '250 chat summaries by email / month',
      '250 email notifications / month',
      'Priority email support',
    ],
    cta: 'Start free trial',
    ctaHref: APP_LINKS.registerStarter,
    featured: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    tagline: 'Full AI + BANT sales intelligence',
    monthlyPrice: 34,
    annualPrice: 24,
    annualTotal: 285,
    badge: 'Most Popular',
    accent: 'blue-gradient',
    limits: {
      urlScanning: 750,
      aiQueries: 3000,
      liveChat: '1,500 msg',
    },
    features: [
      '750 URL scans / month',
      '3,000 AI queries / month',
      '1,500 live operator messages / month',
      '750 chat summaries by email / month',
      '750 email notifications / month',
      'BANT lead qualification scoring',
      'Behavioral tracking & UTM capture',
      'Webhooks (5 event types)',
      'Advanced analytics dashboard',
    ],
    cta: 'Start free trial',
    ctaHref: APP_LINKS.registerStandard,
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Unlimited scale, dedicated support',
    monthlyPrice: null,
    annualPrice: null,
    annualTotal: null,
    accent: 'indigo',
    limits: {
      urlScanning: 'Unlimited',
      aiQueries: 'Unlimited',
      liveChat: 'Unlimited',
    },
    features: [
      'Unlimited URL scans',
      'Unlimited AI queries',
      'Unlimited live operator messages',
      'Unlimited chat summaries by email',
      'Unlimited email notifications',
      'BANT lead qualification scoring',
      'Dedicated account manager',
      'Custom SLA & uptime guarantee',
      'SSO & advanced security',
    ],
    cta: 'Contact sales',
    ctaHref: '/contact?intent=enterprise',
    featured: false,
  },
];

export const featureRows: PricingFeature[] = [
  // Usage
  { label: 'Monthly price', free: 'Free', starter: '$19 / operator', standard: '$34 / operator', enterprise: 'Custom', category: 'usage' },
  { label: 'Annual price (save 30%)', free: '—', starter: '$13/mo ($159/yr)', standard: '$24/mo ($285/yr)', enterprise: 'Contact us', category: 'usage' },
  { label: 'URL scanning', free: '50', starter: '250', standard: '750', enterprise: 'Unlimited', category: 'usage' },
  { label: 'AI queries', free: '250', starter: '1,000', standard: '3,000', enterprise: 'Unlimited', category: 'usage' },
  { label: 'Live operator chat (messages)', free: false, starter: '500 msg', standard: '1,500 msg', enterprise: 'Unlimited', category: 'usage' },
  // Features
  { label: 'Chat summaries by email', free: false, starter: '250/mo', standard: '750/mo', enterprise: 'Unlimited', category: 'features' },
  { label: 'Email message notifications', free: false, starter: '250/mo', standard: '750/mo', enterprise: 'Unlimited', category: 'features' },
  { label: 'BANT lead qualification', free: false, starter: false, standard: true, enterprise: true, category: 'features' },
  { label: 'Dedicated account manager', free: false, starter: false, standard: false, enterprise: true, category: 'features' },
  // Security
  { label: 'Custom SLA & uptime', free: false, starter: false, standard: false, enterprise: true, category: 'security' },
  { label: 'SSO & advanced security', free: false, starter: false, standard: false, enterprise: true, category: 'security' },
];

export const pricingFAQ = [
  {
    q: 'Is there a free trial?',
    a: 'Yes — Starter and Standard plans include a 14-day free trial with full access to all features. No credit card required.',
  },
  {
    q: 'What does "per operator" mean?',
    a: 'Pricing is per operator seat (a person who handles live chats). You can add as many operators as you need and will be billed per seat.',
  },
  {
    q: 'Can I change plans at any time?',
    a: 'Absolutely. Upgrade, downgrade, or cancel any time from your account settings. Downgrades take effect at the end of the billing cycle.',
  },
  {
    q: 'What happens when I exceed my limits?',
    a: "We'll notify you at 80% usage. You can upgrade or purchase additional credits. Your bot continues working — we never cut you off without warning.",
  },
  {
    q: 'How does BANT scoring work?',
    a: 'OyeChats analyzes every conversation across Budget, Authority, Need, and Timeline — scoring each 0–100. The composite score drives webhook notifications and lead tier assignments.',
  },
  {
    q: 'Is annual billing charged upfront?',
    a: 'Yes — annual billing is charged as a single payment at the start of the year, giving you approximately 30% savings versus monthly.',
  },
  {
    q: 'Do you offer discounts for startups or non-profits?',
    a: `Yes — contact us at ${process.env.NEXT_PUBLIC_SALES_EMAIL ?? 'sales@oyechats.com'} and we'll work out the right pricing.`,
  },
];
