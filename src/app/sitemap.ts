import { MetadataRoute } from 'next';
import { getAllTools, getAllCategories } from '@/lib/data';
import { getAllWorkflows } from '@/lib/workflows';
import { getAllCombinations } from '@/lib/combinations';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-kaetai.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getAllTools();
  const categories = getAllCategories();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(tool.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const alternativePages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/alternatives/${tool.slug}`,
    lastModified: new Date(tool.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const workflows = getAllWorkflows();

  const workflowListPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/workflows`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  const workflowPages: MetadataRoute.Sitemap = workflows.map((wf) => ({
    url: `${baseUrl}/workflows/${wf.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const combos = getAllCombinations();

  const comboListPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/combinations`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  const comboPages: MetadataRoute.Sitemap = combos.map((c) => ({
    url: `${baseUrl}/combinations/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...workflowListPage, ...comboListPage, ...categoryPages, ...toolPages, ...alternativePages, ...workflowPages, ...comboPages];
}
