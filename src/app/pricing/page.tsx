import { PricingPageClient } from '@/components/pricing/PricingPageClient';
import { getPricingData } from '@/lib/pricingApi';

export default async function PricingPage() {
  const { tiers, featureRows, faq } = await getPricingData();

  return <PricingPageClient tiers={tiers} featureRows={featureRows} faq={faq} />;
}
