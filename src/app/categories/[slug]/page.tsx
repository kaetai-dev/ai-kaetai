import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getCategoryBySlug, getToolsByCategory, getAllCategories, getAlternativesForTool } from '@/lib/data';
import { getCategoryIcon } from '@/lib/categoryIcons';
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

const HERO_STYLE = { background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 50%, #0891b2 100%)' };
const GRID_STYLE = {
  backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
  backgroundSize: '40px 40px',
};

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const categoryTools = getToolsByCategory(params.slug);
  const Icon = getCategoryIcon(category.icon);

  const alternativeCounts: Record<string, number> = {};
  categoryTools.forEach((tool) => {
    const alts = getAlternativesForTool(tool.slug);
    alternativeCounts[tool.slug] = alts.length;
  });

  const toolsWithAlts = categoryTools
    .map((tool) => ({ tool, count: alternativeCounts[tool.slug] || 0 }))
    .filter((t) => t.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);

  return (
    <>
      {/* Full-width gradient hero */}
      <section className="relative overflow-hidden" style={HERO_STYLE}>
        <div className="absolute inset-0 pointer-events-none opacity-10" style={GRID_STYLE} />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-blue-200/70 mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">ホーム</Link>
            <span>/</span>
            <span className="text-blue-200">カテゴリ</span>
            <span>/</span>
            <span className="text-white font-medium">{category.name}</span>
          </nav>

          <div className="flex items-center gap-5 animate-fadeInUp">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20">
              <Icon className="w-8 h-8 text-cyan-300" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                {category.name}
              </h1>
              <span className="inline-flex items-center rounded-full bg-white/10 text-cyan-200 text-sm font-medium px-3 py-0.5 mt-1 border border-white/20">
                {categoryTools.length}件のツール
              </span>
            </div>
          </div>

          <p className="mt-4 text-blue-100 text-lg leading-relaxed max-w-2xl animate-fadeInUp-delay-1">
            {category.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="animate-fadeInUp-delay-2">
          <CategoryToolsClient
            tools={categoryTools}
            alternativeCounts={alternativeCounts}
            categoryName={category.name}
          />
        </div>

        {toolsWithAlts.length > 0 && (
          <div className="mt-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 animate-fadeInUp-delay-3">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="block w-1 h-6 rounded-full bg-cyan-500 flex-shrink-0" />
              このカテゴリの代替候補
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {toolsWithAlts.map(({ tool, count }) => (
                <Link
                  key={tool.slug}
                  href={`/alternatives/${tool.slug}`}
                  className="flex items-center justify-between p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 border border-cyan-100 dark:border-cyan-900/30 transition-colors group"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {tool.name}の代替を探す
                  </span>
                  <span className="flex-shrink-0 inline-flex items-center gap-1 text-xs text-cyan-600 dark:text-cyan-400 font-medium">
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
    </>
  );
}
