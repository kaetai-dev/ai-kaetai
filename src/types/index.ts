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

export interface WorkflowStep {
  step: number;
  action: string;
  tool: string;
  cost: string;
  description: string;
  nextHint?: string;
}

export interface WorkflowAlternative {
  original: string;
  alternative: string;
  note: string;
}

export interface Workflow {
  id: string;
  title: string;
  slug: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  timeEstimate: string;
  monthlyCost: string;
  monthlyCostJPY: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: WorkflowStep[];
  freeAlternatives: WorkflowAlternative[];
  tags: string[];
  relatedToolSlugs: string[];
}

export interface ToolCombination {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  toolA: string;
  toolASlug: string;
  toolB: string;
  toolBSlug: string;
  category: string;
  useCase: string;
  steps: {
    step: number;
    action: string;
    tool: string;
    description: string;
  }[];
  benefits: string[];
  tags: string[];
}

export interface ComparisonPoint {
  category: string;
  toolA: string;
  toolB: string;
  winner?: string;
}

export interface ToolComparison {
  id: string;
  slug: string;
  title: string;
  description: string;
  toolA: string;
  toolASlug: string;
  toolB: string;
  toolBSlug: string;
  category: string;
  points: ComparisonPoint[];
  verdict: string;
  toolAStrengths: string[];
  toolBStrengths: string[];
  tags: string[];
}