export type IntegrationCategory =
  | 'cms'
  | 'messaging'
  | 'crm'
  | 'meetings'
  | 'analytics'
  | 'automation'
  | 'developer';

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: IntegrationCategory;
  available: boolean;
  icon: string;
  color?: string;
  guideUrl?: string;
}
