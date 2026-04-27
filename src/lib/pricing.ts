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
 * these constants must stay in sync with the seed values in the
 * ``d2e3f4a5b6c7_inr_pricing`` Alembic migration. Prices are in INR rupees
 * (the major currency unit) since OyeChats ships India-first via Razorpay.
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
    credits: 500,
    includedSeats: 1,
    extraSeatPriceUsd: 1199,
    liveChat: false,
    features: [
      '500 credits / month',
      '1 chatbot',
      '1 operator seat',
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
    monthlyPrice: 1499,
    annualPrice: 1259,
    annualTotal: 12590,
    accent: 'blue',
    credits: 2000,
    includedSeats: 1,
    extraSeatPriceUsd: 1199,
    liveChat: true,
    features: [
      '2,000 credits / month',
      'Up to 3 chatbots',
      '1 operator seat (+₹1,199/mo each extra)',
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
    monthlyPrice: 4499,
    annualPrice: 3779,
    annualTotal: 37790,
    badge: 'Most Popular',
    accent: 'blue-gradient',
    credits: 10000,
    includedSeats: 2,
    extraSeatPriceUsd: 1199,
    liveChat: true,
    features: [
      '10,000 credits / month',
      'Unlimited chatbots',
      '2 operator seats included (+₹1,199/mo each extra)',
      'Live chat enabled',
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
    tagline: 'Custom credits, dedicated support',
    monthlyPrice: null,
    annualPrice: null,
    annualTotal: null,
    accent: 'indigo',
    credits: null,
    includedSeats: null,
    extraSeatPriceUsd: 1199,
    liveChat: true,
    features: [
      'Custom credit allocation',
      'Unlimited operator seats',
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

/** Currency symbol shown alongside numeric prices on the pricing page. */
export const PRICING_CURRENCY = 'INR';
export const PRICING_CURRENCY_SYMBOL = '₹';

/**
 * What every kind of work costs in credits. Mirrors the ``credit_cost.*``
 * keys in ``pricing_config`` on the server. System emails (auth, operator
 * notifications) and live-chat operator messages are always free — visitors
 * never see "credits".
 */
export const creditCosts: CreditCost[] = [
  { action: '1 AI chat reply', credits: 1 },
  { action: '1 URL page crawl + ingest', credits: 3 },
  { action: '1 customer-facing email (lead alert / summary)', credits: 1 },
];

/**
 * Top-up packs in INR. Mirrors ``pricing_config.topup_packs`` server-side.
 * Bonus credits are applied on top of the base credits-per-rupee ratio so
 * larger packs are cheaper per credit.
 */
export const topupPacks: TopupPack[] = [
  { usd: 1599, credits: 2_000, bonusPct: 0, perThousandUsd: 800 },
  { usd: 3999, credits: 5_500, bonusPct: 10, perThousandUsd: 727 },
  {
    usd: 7999,
    credits: 12_000,
    bonusPct: 20,
    badge: 'Best value',
    perThousandUsd: 667,
  },
  { usd: 19999, credits: 32_500, bonusPct: 30, perThousandUsd: 615 },
];

export const featureRows: PricingFeature[] = [
  // Usage
  {
    label: 'Monthly price',
    free: 'Free',
    starter: '₹1,499 / month',
    standard: '₹4,499 / month',
    enterprise: 'Custom',
    category: 'usage',
  },
  {
    label: 'Annual price (save ~30%)',
    free: '—',
    starter: '₹1,259/mo (₹12,590/yr)',
    standard: '₹3,779/mo (₹37,790/yr)',
    enterprise: 'Contact us',
    category: 'usage',
  },
  {
    label: 'Monthly credits',
    free: '500',
    starter: '2,000',
    standard: '10,000',
    enterprise: 'Custom',
    category: 'usage',
  },
  {
    label: 'Operator seats included',
    free: '1',
    starter: '1',
    standard: '2',
    enterprise: 'Unlimited',
    category: 'usage',
  },
  {
    label: 'Extra operator seats',
    free: '—',
    starter: '₹1,199/mo each',
    standard: '₹1,199/mo each',
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
    starter: false,
    standard: true,
    enterprise: true,
    category: 'features',
  },
  {
    label: 'Webhooks',
    free: false,
    starter: '5 event types',
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
  {
    label: 'SSO & advanced security',
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
    a: 'Credits are how OyeChats meters work. Each AI chat reply uses 1 credit, each URL page we crawl + ingest uses 3 credits, and each customer-facing email (lead alerts, conversation summaries) uses 1 credit. System emails like password resets and operator notifications are always free.',
  },
  {
    q: 'How do I pay?',
    a: 'We use Razorpay for Indian customers — UPI, cards, NetBanking, and wallets are all supported. Stripe is available for international payments. You can switch payment methods any time from the Billing page.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes — Starter and Standard plans include a 14-day free trial with full access to all features. No credit card required.',
  },
  {
    q: 'What happens when I run out of credits?',
    a: 'Your bot pauses new conversations until your monthly credits reset, or you can buy a top-up pack any time from the Billing page. We never let costs run away — we hard-cap at zero, with a friendly message to visitors.',
  },
  {
    q: 'Do unused credits roll over?',
    a: 'Plan credits reset at the start of each billing cycle (use-it-or-lose-it). Top-up credits roll over for 12 months from purchase, oldest first — so larger packs always pay off if you keep using the product.',
  },
  {
    q: 'Can I add more operator seats?',
    a: 'Yes — extra seats are ₹1,199 / month each, and you can add or remove them with one click from the Billing page in your dashboard.',
  },
  {
    q: 'Can I change plans at any time?',
    a: 'Absolutely. Upgrade, downgrade, or cancel any time from your dashboard. Downgrades take effect at the end of the billing cycle.',
  },
  {
    q: 'How does BANT scoring work?',
    a: 'OyeChats analyzes every conversation across Budget, Authority, Need, and Timeline — scoring each 0–100. The composite score drives webhook notifications and lead-tier assignments.',
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
