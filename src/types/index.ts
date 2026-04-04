export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  categorySlug: string;
  pricing: 'free' | 'freemium' | 'paid';
  pricingDetail: string;
  features: string[];
  officialUrl: string;
  affiliateUrl: string;
  imageUrl: string;
  tags: string[];
  createdAt: string;
  rating?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  toolCount: number;
}

export interface Alternative {
  id: string;
  toolId: string;
  alternativeToolId: string;
}

export interface ToolWithAlternatives extends Tool {
  alternatives: Tool[];
}
