export type IntegrationCategory =
  | 'cms'
  | 'website'
  | 'messaging'
  | 'crm'
  | 'meetings'
  | 'analytics'
  | 'automation'
  | 'developer';

/** Filter chip ids include category ids plus virtual groupings ('sites' = cms + website). */
export type IntegrationFilterId = IntegrationCategory | 'all' | 'sites';

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: IntegrationCategory;
  available: boolean;
  icon: React.ReactNode;
  color?: string;
  guideUrl?: string;
}
