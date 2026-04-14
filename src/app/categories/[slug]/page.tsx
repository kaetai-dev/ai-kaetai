import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCategoryBySlug, getToolsByCategory, getAllCategories, getAlternativesForTool } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import CategoryToolsClient from '@/components/CategoryToolsClient';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};
  return {
    title: `${category.name}のAIツール一覧 | AI Kaetai`,
    description: category.description,
  };
}

export function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const categoryTools = getToolsByCategory(params.slug);

  // Build alternative counts
  const alternativeCounts: Record<string, number> = {};
  categoryTools.forEach((tool) => {
    const alts = getAlternativesForTool(tool.slug);
    alternativeCounts[tool.slug] = alts.length;
  });

  // Popular alternatives within this category
  const toolsWithAlts = categoryTools
    .map((tool) => ({ tool, count: alternativeCounts[tool.slug] || 0 }))
    .filter((t) => t.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'ホーム', href: '/' },
          { label: 'カテゴリ' },
          { label: category.name },
        ]}
      />

      {/* Category Header */}
      <div className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 flex items-center justify-center text-4xl bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-indigo-100 dark:border-indigo-900/30">
            {category.icon}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              {category.name}
            </h1>
            <span className="inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium px-3 py-0.5 mt-1">
              {categoryTools.length}件のツール
            </span>
          </div>
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed max-w-2xl">
          {category.description}
        </p>
      </div>

      {/* Search + Tools (Client Component) */}
      <CategoryToolsClient
        tools={categoryTools}
        alternativeCounts={alternativeCounts}
        categoryName={category.name}
      />

      {/* Popular alternatives in category */}
      {toolsWithAlts.length > 0 && (
        <div className="mt-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            このカテゴリの代替候補
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {toolsWithAlts.map(({ tool, count }) => (
              <Link
                key={tool.slug}
                href={`/alternatives/${tool.slug}`}
                className="flex items-center justify-between p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 border border-indigo-100 dark:border-indigo-900/30 transition-colors group"
              >
                <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {tool.name}の代替を探す
                </span>
                <span className="flex-shrink-0 inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  {count}件
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
