import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllTools, getToolBySlug, getAlternativesForTool } from '@/lib/data';
import PricingBadge from '@/components/PricingBadge';
import ToolGrid from '@/components/ToolGrid';
import ToolFaviconIcon from '@/components/ToolFaviconIcon';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};

  const alternatives = getAlternativesForTool(params.slug);

  return {
    title: `【${tool.name}の代替】おすすめAIツール${alternatives.length}選`,
    description: `${tool.name}の代わりになるAIツール${alternatives.length}選を徹底比較。料金・機能・使いやすさで${tool.name}に最適な代替を日本語で解説。`,
    openGraph: {
      title: `${tool.name}の代替ツール一覧 | AI Kaetai`,
      description: `${tool.name}の代わりになるAIツール${alternatives.length}選。${tool.shortDescription}`,
      type: 'article',
    },
  };
}

const pricingLabels = { free: '無料', freemium: 'フリーミアム', paid: '有料' };

const HERO_STYLE = { background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 50%, #0891b2 100%)' };
const GRID_STYLE = {
  backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
  backgroundSize: '40px 40px',
};

export default function AlternativesPage({ params }: Props) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const alternatives = getAlternativesForTool(params.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${tool.name}の代替ツール一覧`,
    description: `${tool.name}の代わりになるAIツール${alternatives.length}選`,
    numberOfItems: alternatives.length,
    itemListElement: alternatives.map((alt, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: alt.name,
      description: alt.shortDescription,
      url: `https://ai-kaetai.com/tools/${alt.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Full-width gradient hero */}
      <section className="relative overflow-hidden" style={HERO_STYLE}>
        <div className="absolute inset-0 pointer-events-none opacity-10" style={GRID_STYLE} />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-blue-200/70 mb-8 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">ホーム</Link>
            <span>/</span>
            <span className="text-blue-200">代替ツール</span>
            <span>/</span>
            <span className="text-white font-medium">{tool.name}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-start gap-6 animate-fadeInUp">
            {/* Favicon box */}
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20">
              <ToolFaviconIcon officialUrl={tool.officialUrl} name={tool.name} imgClassName="w-10 h-10 object-contain rounded-lg" />
            </div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/10 text-cyan-200 text-sm font-medium px-3 py-1.5 rounded-full mb-4 border border-white/20">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                代替ツール比較
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                【{tool.name}の代替】
                <br className="sm:hidden" />
                おすすめAIツール{alternatives.length}選
              </h1>
              <p className="mt-3 text-lg text-blue-100 max-w-2xl leading-relaxed">
                {tool.name}の代わりになるAIツールを厳選してまとめました。
                料金・機能・使いやすさを比較して最適な代替ツールを見つけましょう。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Original Tool Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 animate-fadeInUp">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="block w-1 h-6 rounded-full bg-cyan-500 flex-shrink-0" />
            代替を探しているツール
          </h2>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
                <ToolFaviconIcon officialUrl={tool.officialUrl} name={tool.name} imgClassName="w-8 h-8 object-contain rounded-lg" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{tool.name}</h3>
                <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm max-w-xl leading-relaxed">
                  {tool.shortDescription}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-xs font-medium px-2.5 py-1">
                    {tool.category}
                  </span>
                  <PricingBadge pricing={tool.pricing} />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {pricingLabels[tool.pricing]} ・ {tool.pricingDetail.split('。')[0]}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <Link
                href={`/tools/${tool.slug}`}
                className="inline-flex items-center justify-center gap-1.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
              >
                詳細を見る
              </Link>
              <a
                href={tool.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #0891b2, #0e7490)' }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                公式サイト
              </a>
            </div>
          </div>
        </div>

        {/* Alternatives Grid */}
        <div className="mt-10 animate-fadeInUp-delay-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="block w-1 h-8 rounded-full bg-cyan-500 flex-shrink-0" />
            {tool.name}の代替ツール一覧
          </h2>
          {alternatives.length > 0 ? (
            <ToolGrid tools={alternatives} />
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400">
                現在、{tool.name}の代替ツール情報を準備中です。
              </p>
            </div>
          )}
        </div>

        {/* SEO Text */}
        <div className="mt-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 animate-fadeInUp-delay-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="block w-1 h-6 rounded-full bg-cyan-500 flex-shrink-0" />
            {tool.name}の代替を探す理由
          </h2>
          <div className="prose prose-gray dark:prose-invert max-w-none text-sm leading-relaxed text-gray-700 dark:text-gray-300 space-y-3">
            <p>
              {tool.name}は{tool.category}の中でも人気の高いツールですが、料金プランや機能の制限、
              または特定のユースケースへの適合性によって、より適した代替ツールが存在する場合があります。
            </p>
            <p>
              上記でご紹介した{tool.name}の代替ツールは、それぞれ異なる強みを持っています。
              {tool.pricing === 'paid' && (
                <>無料プランやより安価な料金体系を提供しているツールもあるため、コスト削減を検討している場合にも最適な選択肢が見つかるでしょう。</>
              )}
              {tool.pricing === 'freemium' && (
                <>完全無料で利用できるオープンソースのツールから、より高度な機能を持つ有料ツールまで幅広くご紹介しています。</>
              )}
              {tool.pricing === 'free' && (
                <>無料ながらも高機能な{tool.name}ですが、さらに特定の用途に特化した代替ツールも存在します。</>
              )}
            </p>
            <p>
              各ツールの詳細ページでは、機能一覧・料金プラン・公式サイトへのリンクを確認できます。
              自分のニーズに最も合った{tool.name}の代替を見つけてください。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
