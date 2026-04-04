import Link from 'next/link';
import type { Metadata } from 'next';
import {
  getAllTools,
  getAllCategories,
  getTotalAlternativesCount,
  getAlternativesForTool,
} from '@/lib/data';
import CategoryCard from '@/components/CategoryCard';
import ToolGrid from '@/components/ToolGrid';

export const metadata: Metadata = {
  title: 'AI Kaetai - AIツールの代替を日本語で探す',
  description:
    'ChatGPT、Midjourney、GitHub Copilotなど人気AIツールの代替を日本語で比較・検索できるディレクトリ。あなたに合ったAIツールの代替を見つけましょう。',
};

const popularAlternatives = [
  { slug: 'chatgpt', label: 'ChatGPTの代替' },
  { slug: 'midjourney', label: 'Midjourneyの代替' },
  { slug: 'github-copilot', label: 'GitHub Copilotの代替' },
  { slug: 'suno', label: 'Sunoの代替' },
  { slug: 'runway', label: 'Runwayの代替' },
  { slug: 'elevenlabs', label: 'ElevenLabsの代替' },
];

export default function HomePage() {
  const allTools = getAllTools();
  const categories = getAllCategories();
  const totalAlternatives = getTotalAlternativesCount();

  // Latest 6 tools (by createdAt desc)
  const latestTools = [...allTools]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  // Build alternative counts for display
  const alternativeCounts: Record<string, number> = {};
  allTools.forEach((tool) => {
    const alts = getAlternativesForTool(tool.slug);
    alternativeCounts[tool.slug] = alts.length;
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AI Kaetai',
    url: 'https://ai-kaetai.com',
    description:
      'ChatGPT、Midjourney、GitHub Copilotなど人気AIツールの代替を日本語で比較・検索できるディレクトリ',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://ai-kaetai.com/alternatives/{search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-indigo-950 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-60" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            日本語のAIツール代替ディレクトリ
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight">
            AIツールの代替を
            <br />
            <span className="text-indigo-600 dark:text-indigo-400">探すなら</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            ○○の代わりになるAIツールを日本語で比較・検索できるディレクトリ。
            <br className="hidden md:block" />
            コスト削減・機能向上・乗り換えに最適なAIを見つけましょう。
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="#categories"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              ツールを探す
            </Link>
            <Link
              href="/alternatives/chatgpt"
              className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white font-semibold px-8 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors"
            >
              人気の代替を見る
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {allTools.length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">登録ツール数</div>
            </div>
            <div className="border-x border-gray-200 dark:border-gray-700">
              <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {categories.length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">カテゴリ数</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {totalAlternatives}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">代替候補数</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              カテゴリから探す
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              使いたい用途のカテゴリを選んで代替ツールを探しましょう
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Popular Alternatives Section */}
      <section className="bg-indigo-50 dark:bg-indigo-950/30 border-y border-indigo-100 dark:border-indigo-900/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            よく検索される代替候補
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            ユーザーが特に関心を持つAIツールの代替をチェック
          </p>
          <div className="flex flex-wrap gap-3">
            {popularAlternatives.map((alt) => (
              <Link
                key={alt.slug}
                href={`/alternatives/${alt.slug}`}
                className="inline-flex items-center gap-1.5 bg-white dark:bg-gray-900 hover:bg-indigo-600 dark:hover:bg-indigo-600 text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-white text-sm font-medium px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-600 transition-all shadow-sm"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                {alt.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              新着ツール
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              最近追加されたAIツールをチェック
            </p>
          </div>
        </div>
        <ToolGrid
          tools={latestTools}
          showAlternativeCounts
          alternativeCounts={alternativeCounts}
        />
      </section>
    </>
  );
}
