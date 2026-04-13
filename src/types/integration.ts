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
  icon: React.ReactNode;
  color?: string;
  guideUrl?: string;
}
