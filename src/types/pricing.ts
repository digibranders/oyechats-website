export interface PricingFeature {
  label: string;
  free: string | boolean;
  starter: string | boolean;
  standard: string | boolean;
  enterprise: string | boolean;
  category: 'usage' | 'features' | 'security' | 'support';
}

export interface PricingTier {
  id: 'free' | 'starter' | 'standard' | 'enterprise';
  name: string;
  tagline: string;
  monthlyPrice: number | null; // null = custom
  annualPrice: number | null;
  annualTotal?: number | null; // billed-per-year amount shown in UI
  badge?: string;
  accent: string;
  features: string[];
  /**
   * Credit-based plan attributes. ``null`` for Enterprise (custom). Numeric
   * fields use the ``Monthly credits`` and ``Operator seats included``
   * concepts wired up across api / admin / widget.
   */
  credits: number | null;
  includedSeats: number | null;
  extraSeatPriceUsd: number; // per additional seat / month
  liveChat: boolean;
  cta: string;
  ctaHref: string;
  featured: boolean;
}

export interface CreditCost {
  action: string;
  credits: number;
}

export interface TopupPack {
  usd: number;
  credits: number;
  bonusPct: number;
  badge?: string;
  /** Effective price per 1,000 credits, computed for display. */
  perThousandUsd: number;
}
