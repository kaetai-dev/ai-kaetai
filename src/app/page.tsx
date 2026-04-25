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

      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 50%, #0891b2 100%)' }}
      >
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Glow blobs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-800/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-cyan-200 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-white/20">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            日本語のAIツール代替ディレクトリ
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
            AIツールの代替を
            <br />
            <span className="text-cyan-400">探すなら</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            ○○の代わりになるAIツールを日本語で比較・検索できるディレクトリ。
            <br className="hidden md:block" />
            コスト削減・機能向上・乗り換えに最適なAIを見つけましょう。
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="#categories"
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg hover:-translate-y-0.5 hover:shadow-cyan-500/30 text-white"
              style={{ background: 'linear-gradient(135deg, #0891b2, #0e7490)' }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              ツールを探す
            </Link>
            <Link
              href="/alternatives/chatgpt"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl border border-white/30 transition-all hover:-translate-y-0.5"
            >
              人気の代替を見る
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-white tabular-nums">
                {allTools.length}
              </div>
              <div className="text-xs text-cyan-300 mt-1 font-medium">登録ツール数</div>
            </div>
            <div className="text-center border-x border-white/20">
              <div className="text-3xl md:text-4xl font-extrabold text-white tabular-nums">
                {categories.length}
              </div>
              <div className="text-xs text-cyan-300 mt-1 font-medium">カテゴリ数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold text-white tabular-nums">
                {totalAlternatives}
              </div>
              <div className="text-xs text-cyan-300 mt-1 font-medium">代替候補数</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Search Bar */}
      <section className="bg-gray-50 py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroSearch tools={allTools} />
        </div>
      </section>


      {/* Workflow Section */}
      <section className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm text-indigo-600 font-medium mb-1">WORKFLOWS</p>
            <h2 className="text-2xl font-bold text-gray-900">AIで、何がしたい？</h2>
            <p className="text-sm text-gray-500 mt-1">やりたいことから逆引き。必要なツール・手順・費用がわかる。</p>
          </div>
          <Link href="/workflows" className="hidden sm:inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition">
            すべて見る
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflows.slice(0, 6).map((wf, i) => (
            <Link
              key={wf.slug}
              href={`/workflows/${wf.slug}`}
              className={`group relative bg-white border border-gray-100 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 ${
                i === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">{wf.category}</span>
                <span className="text-xs text-gray-400">{wf.steps.length}ステップ</span>
              </div>
              <h3 className={`font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2 ${i === 0 ? 'text-xl' : 'text-base'}`}>
                {wf.title}
              </h3>
              <p className={`text-gray-500 leading-relaxed mb-4 ${i === 0 ? 'text-sm' : 'text-xs line-clamp-2'}`}>
                {wf.description}
              </p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>⏱ {wf.timeEstimate}</span>
                <span>💰 {wf.monthlyCostJPY}</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/workflows" className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            すべてのワークフローを見る →
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="block w-1 h-8 rounded-full bg-cyan-500 flex-shrink-0" />
              カテゴリから探す
            </h2>
            <p className="text-gray-600 mt-1 ml-4">
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
      <section className="bg-gray-50 border-y border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <span className="block w-1 h-8 rounded-full bg-cyan-500 flex-shrink-0" />
            よく検索される代替候補
          </h2>
          <p className="text-gray-600 mb-6 ml-4">
            ユーザーが特に関心を持つAIツールの代替をチェック
          </p>
          <div className="flex flex-wrap gap-3">
            {popularAlternatives.map((alt) => (
              <Link
                key={alt.slug}
                href={`/alternatives/${alt.slug}`}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-cyan-600 text-gray-700 hover:text-white text-sm font-medium px-4 py-2 rounded-full border border-gray-200 hover:border-cyan-600 transition-all shadow-sm hover:-translate-y-0.5 hover:shadow"
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
      <section className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
              <span className="block w-1 h-8 rounded-full bg-cyan-500 flex-shrink-0" />
              新着ツール
            </h2>
            <p className="text-gray-600 mt-1 ml-4">
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
