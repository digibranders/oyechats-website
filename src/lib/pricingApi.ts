import type { PricingTier, PricingFeature, CreditCost, TopupPack } from "@/types/pricing";
import {
  pricingTiers as fallbackTiers,
  featureRows as fallbackRows,
  pricingFAQ as fallbackFAQ,
  topupPacks as fallbackTopups,
  creditCosts as fallbackCosts,
} from "@/lib/pricing";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://api.oyechats.com";

interface CatalogPlan {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  monthly_price_usd_cents: number | null;
  annual_price_usd_cents: number | null;
  extra_seat_price_usd_cents: number | null;
  annual_discount_percent: number;
  credits_per_month: number;
  included_operator_seats: number;
  marketing: {
    tagline?: string;
    badge?: string;
    accent?: string;
    cta_label?: string;
    cta_href?: string;
    highlight_features?: string[];
    featured?: boolean;
  };
  sort_order: number;
}

/** The shape of pricingFAQ entries (inferred from src/lib/pricing.ts). */
type FaqEntry = (typeof fallbackFAQ)[number];

interface Catalog {
  currency: string;
  plans: CatalogPlan[];
  feature_matrix: PricingFeature[];
  faq: FaqEntry[];
  topup_packs: TopupPack[];
  credit_costs: CreditCost[];
}

export interface PricingData {
  tiers: PricingTier[];
  featureRows: PricingFeature[];
  faq: FaqEntry[];
  topupPacks: TopupPack[];
  creditCosts: CreditCost[];
}

const centsToUsd = (c: number | null | undefined): number | null =>
  c == null ? null : Math.round(c) / 100;

function mapPlan(p: CatalogPlan): PricingTier {
  const monthly = centsToUsd(p.monthly_price_usd_cents);
  const annualTotal = centsToUsd(p.annual_price_usd_cents);
  const isCustom = p.slug === "enterprise" || monthly == null;
  return {
    id: p.slug,
    name: p.name,
    tagline: p.marketing.tagline ?? p.description ?? "",
    monthlyPrice: isCustom ? null : monthly,
    annualPrice:
      isCustom || annualTotal == null
        ? null
        : Math.round((annualTotal / 12) * 100) / 100,
    annualTotal: isCustom ? null : annualTotal,
    badge: p.marketing.badge || undefined,
    accent: p.marketing.accent ?? "blue",
    credits: p.credits_per_month || (isCustom ? null : 0),
    includedSeats: isCustom ? null : p.included_operator_seats,
    extraSeatPriceUsd: centsToUsd(p.extra_seat_price_usd_cents) ?? 0,
    liveChat: false,
    features: p.marketing.highlight_features ?? [],
    cta: p.marketing.cta_label ?? (isCustom ? "Contact sales" : "Get started"),
    ctaHref: p.marketing.cta_href ?? "/register",
    featured: !!p.marketing.featured,
  };
}

/** Fetch the catalog (ISR-cached). Falls back to the static snapshot on any error. */
export async function getPricingData(): Promise<PricingData> {
  try {
    const res = await fetch(`${API_BASE}/public/pricing-catalog`, {
      next: { revalidate: 300, tags: ["pricing"] },
    });
    if (!res.ok) throw new Error(`catalog ${res.status}`);
    const data = (await res.json()) as Catalog;
    const tiers = [...data.plans]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(mapPlan);
    return {
      tiers: tiers.length ? tiers : fallbackTiers,
      featureRows: data.feature_matrix?.length ? data.feature_matrix : fallbackRows,
      faq: data.faq?.length ? data.faq : fallbackFAQ,
      topupPacks: data.topup_packs?.length ? data.topup_packs : fallbackTopups,
      creditCosts: data.credit_costs?.length ? data.credit_costs : fallbackCosts,
    };
  } catch {
    return {
      tiers: fallbackTiers,
      featureRows: fallbackRows,
      faq: fallbackFAQ,
      topupPacks: fallbackTopups,
      creditCosts: fallbackCosts,
    };
  }
}
