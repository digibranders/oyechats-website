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
  limits: {
    urlScanning: number | string;
    aiQueries: number | string;
    liveChat: string;
  };
  cta: string;
  ctaHref: string;
  featured: boolean;
}
