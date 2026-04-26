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
import HeroSearch from '@/components/HeroSearch';
import { getAllWorkflows } from '@/lib/workflows';
import { getAllComparisons } from '@/lib/comparisons';
import { getAllCombinations } from '@/lib/combinations';

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
  const workflows = getAllWorkflows();
  const comparisons = getAllComparisons();
  const combinations = getAllCombinations();

  const latestTools = [...allTools]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

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

      {/* Hero */}
      <section className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12">
          <p className="text-sm text-gray-500 tracking-wide mb-4">AIツール代替ディレクトリ</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight">
            AIツールの代わり、<br className="hidden sm:block" />
            見つかる。
          </h1>
          <p className="mt-4 text-base text-gray-500 max-w-xl leading-relaxed">
            ○○の代わりになるAIツールを日本語で比較・検索。コスト削減・機能向上・乗り換えに。
          </p>

          <div className="mt-8 max-w-xl">
            <HeroSearch tools={allTools} />
          </div>

          {/* Stats row */}
          <div className="mt-12 flex flex-wrap gap-x-12 gap-y-4">
            <div>
              <span className="text-3xl font-semibold text-gray-900 tabular-nums">{allTools.length}</span>
              <span className="text-sm text-gray-500 ml-2">登録ツール</span>
            </div>
            <div>
              <span className="text-3xl font-semibold text-gray-900 tabular-nums">{categories.length}</span>
              <span className="text-sm text-gray-500 ml-2">カテゴリ</span>
            </div>
            <div>
              <span className="text-3xl font-semibold text-gray-900 tabular-nums">{totalAlternatives}</span>
              <span className="text-sm text-gray-500 ml-2">代替候補</span>
            </div>
            <div>
              <span className="text-3xl font-semibold text-gray-900 tabular-nums">{workflows.length}</span>
              <span className="text-sm text-gray-500 ml-2">ワークフロー</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Alternatives */}
      <section className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-gray-400 mr-2">よく検索される:</span>
            {popularAlternatives.map((alt) => (
              <Link
                key={alt.slug}
                href={`/alternatives/${alt.slug}`}
                className="text-sm text-gray-600 hover:text-cyan-700 px-3 py-1.5 rounded-md border border-gray-200 hover:border-cyan-300 transition-colors"
              >
                {alt.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Workflows */}
      <section className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">workflows</p>
              <h2 className="text-2xl font-semibold text-gray-900">AIで、何がしたい？</h2>
              <p className="text-sm text-gray-500 mt-1">やりたいことから逆引き。必要なツール・手順・費用がわかる。</p>
            </div>
            <Link href="/workflows" className="hidden sm:inline-flex text-sm text-cyan-700 hover:text-cyan-900 font-medium transition-colors">
              すべて見る &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-md overflow-hidden">
            {workflows.slice(0, 6).map((wf) => (
              <Link
                key={wf.slug}
                href={`/workflows/${wf.slug}`}
                className="bg-white p-5 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-cyan-700 font-medium">{wf.category}</span>
                  <span className="text-xs text-gray-400">{wf.steps.length}ステップ</span>
                </div>
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-cyan-700 transition-colors mb-2">
                  {wf.title}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">{wf.description}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{wf.timeEstimate}</span>
                  <span>{wf.monthlyCostJPY}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 text-center sm:hidden">
            <Link href="/workflows" className="text-sm text-cyan-700 font-medium">すべてのワークフローを見る &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Comparisons */}
      <section className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">comparisons</p>
              <h2 className="text-2xl font-semibold text-gray-900">AIツール比較</h2>
              <p className="text-sm text-gray-500 mt-1">人気ツール同士を項目別に比較。どちらが自分に合うか一目でわかる。</p>
            </div>
            <Link href="/comparisons" className="hidden sm:inline-flex text-sm text-cyan-700 hover:text-cyan-900 font-medium transition-colors">
              すべて見る &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-md overflow-hidden">
            {comparisons.slice(0, 4).map((cmp) => (
              <Link
                key={cmp.slug}
                href={`/comparisons/${cmp.slug}`}
                className="bg-white p-5 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${cmp.toolASlug}.com&sz=32`}
                    alt={cmp.toolA}
                    className="w-5 h-5 rounded"
                    loading="lazy"
                  />
                  <span className="text-xs text-gray-400">vs</span>
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${cmp.toolBSlug}.com&sz=32`}
                    alt={cmp.toolB}
                    className="w-5 h-5 rounded"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-cyan-700 transition-colors">
                  {cmp.toolA} vs {cmp.toolB}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{cmp.category}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Combinations */}
      <section className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">combinations</p>
              <h2 className="text-2xl font-semibold text-gray-900">AIツール組み合わせ</h2>
              <p className="text-sm text-gray-500 mt-1">2つのツールを掛け合わせて最大効果を引き出すレシピ集。</p>
            </div>
            <Link href="/combinations" className="hidden sm:inline-flex text-sm text-cyan-700 hover:text-cyan-900 font-medium transition-colors">
              すべて見る &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-md overflow-hidden">
            {combinations.slice(0, 6).map((combo) => (
              <Link
                key={combo.slug}
                href={`/combinations/${combo.slug}`}
                className="bg-white p-5 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${combo.toolASlug + '.com'}&sz=32`}
                    alt={combo.toolA}
                    className="w-5 h-5 rounded"
                    loading="lazy"
                  />
                  <span className="text-xs text-gray-400">+</span>
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${combo.toolBSlug + '.com'}&sz=32`}
                    alt={combo.toolB}
                    className="w-5 h-5 rounded"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-cyan-700 transition-colors">
                  {combo.toolA} + {combo.toolB}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{combo.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="mb-8">
            <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">categories</p>
            <h2 className="text-2xl font-semibold text-gray-900">カテゴリから探す</h2>
            <p className="text-sm text-gray-500 mt-1">使いたい用途のカテゴリを選んで代替ツールを探しましょう</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* New Tools */}
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <div className="mb-8">
            <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">latest</p>
            <h2 className="text-2xl font-semibold text-gray-900">新着ツール</h2>
            <p className="text-sm text-gray-500 mt-1">最近追加されたAIツールをチェック</p>
          </div>
          <ToolGrid
            tools={latestTools}
            showAlternativeCounts
            alternativeCounts={alternativeCounts}
          />
        </div>
      </section>
    </>
  );
}
