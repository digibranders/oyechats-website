import { PricingTier, PricingFeature, CreditCost, TopupPack } from '@/types/pricing';
import { APP_LINKS } from '@/lib/constants';

/**
 * Tiers on the marketing site mirror the credit-based billing model wired up
 * in the FastAPI backend. Each plan grants a monthly credit allowance plus a
 * baseline number of operator seats; extra seats are a paid add-on. Top-up
 * packs (defined below) let customers buy more credits when they exceed the
 * monthly allowance.
 *
 * Source of truth on the server is ``pricing_config`` (super-admin tunable);
 * these constants must stay in sync with the seed values in the pricing
 * Alembic migration. Prices are in USD (the major currency unit).
 */
export const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Start exploring AI-powered chat',
    monthlyPrice: 0,
    annualPrice: 0,
    annualTotal: 0,
    accent: 'blue',
    credits: 200,
    includedSeats: 0,
    extraSeatPriceUsd: 0,
    liveChat: false,
    features: [
      '200 credits / month',
      '1 chatbot',
      'Basic widget customization',
      'Lead capture forms',
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
    annualPrice: 15,
    annualTotal: 180,
    accent: 'blue',
    credits: 2000,
    includedSeats: 1,
    extraSeatPriceUsd: 5,
    liveChat: true,
    features: [
      '3,000 credits / month',
      '1 chatbot included (subscribe again to add more)',
      '1 operator seat (+$5/mo each extra, up to 5 total)',
      'Live chat enabled',
      '14-day free trial',
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
    monthlyPrice: 49,
    annualPrice: 39,
    annualTotal: 468,
    badge: 'Most Popular',
    accent: 'blue-gradient',
    credits: 10000,
    includedSeats: 2,
    extraSeatPriceUsd: 5,
    liveChat: true,
    features: [
      '10,000 credits / month',
      '1 chatbot included (subscribe again to add more)',
      '2 operator seats included (+$5/mo each extra, up to 10 total)',
      'Live chat enabled',
      'BANT lead qualification scoring',
      'Behavioral tracking & UTM capture',
      'Webhooks (5 event types)',
    ],
    cta: 'Get started',
    ctaHref: APP_LINKS.registerStandard,
    featured: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Custom credits, dedicated support',
    monthlyPrice: null,
    annualPrice: null,
    annualTotal: null,
    accent: 'indigo',
    credits: null,
    includedSeats: null,
    extraSeatPriceUsd: 5,
    liveChat: true,
    features: [
      'Custom credit allocation',
      'Unlimited chatbots',
      'Unlimited operator seats',
      'BANT lead qualification scoring',
      'Dedicated account manager',
      'Custom SLA & uptime guarantee',
    ],
    cta: 'Contact sales',
    ctaHref: '/contact?intent=enterprise',
    featured: false,
  },
];

/** Currency symbol shown alongside numeric prices on the pricing page. */
export const PRICING_CURRENCY = 'USD';
export const PRICING_CURRENCY_SYMBOL = '$';

/**
 * What every kind of work costs in credits. Mirrors the ``credit_cost.*``
 * keys in ``pricing_config`` on the server. System emails (auth, operator
 * notifications) and live-chat operator messages are always free, visitors
 * never see "credits".
 */
export const creditCosts: CreditCost[] = [
  { action: '1 AI chat reply', credits: 1 },
  { action: '1 URL page crawl + ingest', credits: 5 },
  { action: '1 customer-facing email (lead alert / summary)', credits: 1 },
];

/**
 * Top-up packs in USD. Mirrors ``pricing_config.topup_packs`` server-side.
 * Bonus credits are applied on top of the base credits-per-dollar ratio so
 * larger packs are cheaper per credit.
 */
export const topupPacks: TopupPack[] = [
  { usd: 19, credits: 2_000, bonusPct: 0, perThousandUsd: 9.5 },
  { usd: 49, credits: 5_500, bonusPct: 10, perThousandUsd: 8.91 },
  {
    usd: 99,
    credits: 12_000,
    bonusPct: 20,
    badge: 'Best value',
    perThousandUsd: 8.25,
  },
  { usd: 239, credits: 32_500, bonusPct: 30, perThousandUsd: 7.35 },
];

export const featureRows: PricingFeature[] = [
  // Usage
  {
    label: 'Monthly price',
    free: 'Free',
    starter: '$19 / month',
    standard: '$49 / month',
    enterprise: 'Custom',
    category: 'usage',
  },
  {
    label: 'Annual price (save ~20%)',
    free: '-',
    starter: '$15/mo ($180/yr)',
    standard: '$39/mo ($468/yr)',
    enterprise: 'Contact us',
    category: 'usage',
  },
  {
    label: 'Monthly credits',
    free: '200',
    starter: '2,000',
    standard: '10,000',
    enterprise: 'Custom',
    category: 'usage',
  },
  {
    label: 'Chatbots included',
    free: '1',
    starter: '1 (subscribe again to add more)',
    standard: '1 (subscribe again to add more)',
    enterprise: 'Unlimited under one subscription',
    category: 'usage',
  },
  {
    label: 'Operator seats included',
    free: '-',
    starter: '1',
    standard: '2',
    enterprise: 'Unlimited',
    category: 'usage',
  },
  {
    label: 'Extra operator seats',
    free: '-',
    starter: '$5/mo each (up to 5 total)',
    standard: '$5/mo each (up to 10 total)',
    enterprise: 'Custom',
    category: 'usage',
  },
  {
    label: 'Top-up packs available',
    free: false,
    starter: true,
    standard: true,
    enterprise: true,
    category: 'usage',
  },
  // Features
  {
    label: 'Live operator chat',
    free: false,
    starter: true,
    standard: true,
    enterprise: true,
    category: 'features',
  },
  {
    label: 'BANT lead qualification',
    free: false,
    starter: true,
    standard: true,
    enterprise: true,
    category: 'features',
  },
  {
    label: 'Webhooks',
    free: false,
    starter: false,
    standard: '5 event types',
    enterprise: 'All events',
    category: 'features',
  },
  {
    label: 'Dedicated account manager',
    free: false,
    starter: false,
    standard: false,
    enterprise: true,
    category: 'features',
  },
  // Security
  {
    label: 'Custom SLA & uptime',
    free: false,
    starter: false,
    standard: false,
    enterprise: true,
    category: 'security',
  },
];

export const pricingFAQ = [
  {
    q: "What's a credit?",
    a: 'Credits are how OyeChats meters work. Each AI chat reply uses 1 credit, each URL page we crawl + ingest uses 5 credits, and each customer-facing email (lead alerts, conversation summaries) uses 1 credit. System emails like password resets and operator notifications are always free.',
  },
  {
    q: 'How do I pay?',
    a: 'We use Razorpay for Indian customers, UPI, cards, NetBanking, and wallets are all supported. Stripe is available for international payments. You can switch payment methods any time from the Billing page.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes, Starter and Standard plans include a 14-day free trial with full access to all features. No credit card required.',
  },
  {
    q: 'What happens when I run out of credits?',
    a: 'Your bot pauses new conversations until your monthly credits reset, or you can buy a top-up pack any time from the Billing page. We never let costs run away, we hard-cap at zero, with a friendly message to visitors.',
  },
  {
    q: 'Do unused credits roll over?',
    a: 'Plan credits reset at the start of each billing cycle (use-it-or-lose-it). Top-up credits roll over for 12 months from purchase, oldest first, so larger packs always pay off if you keep using the product.',
  },
  {
    q: 'Can I add more operator seats?',
    a: 'Yes, extra seats are $5 / month each, and you can add or remove them with one click from the Billing page in your dashboard.',
  },
  {
    q: 'How do I run multiple chatbots on one account?',
    a: 'Each chatbot is its own subscription. From the dashboard, click "Add Bot" and pick a plan for that bot — credits, billing, and usage stay isolated per bot so a busy chatbot can never drain a quieter one. Enterprise accounts can run unlimited bots under a single master subscription.',
  },
  {
    q: 'Can I change plans at any time?',
    a: 'Absolutely. Upgrade, downgrade, or cancel any time from your dashboard. Downgrades take effect at the end of the billing cycle.',
  },
  {
    q: 'How does BANT scoring work?',
    a: 'OyeChats analyzes every conversation across Budget, Authority, Need, and Timeline, scoring each dimension and combining them into a composite 0-100 lead score. That score drives webhook notifications and lead-tier assignments.',
  },
  {
    q: 'Is annual billing charged upfront?',
    a: 'Yes, annual billing is charged as a single payment at the start of the year, giving you approximately 20% savings versus monthly.',
  },
  {
    q: 'Do you offer discounts for startups or non-profits?',
    a: `Yes, contact us at ${process.env.NEXT_PUBLIC_SALES_EMAIL ?? 'support@oyechats.com'} and we'll work out the right pricing.`,
  },
];
