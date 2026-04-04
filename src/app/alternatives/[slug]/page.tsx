import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllTools, getToolBySlug, getAlternativesForTool } from '@/lib/data';
import Breadcrumb from '@/components/Breadcrumb';
import PricingBadge from '@/components/PricingBadge';
import ToolGrid from '@/components/ToolGrid';

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: '代替ツール' },
            { label: tool.name },
          ]}
        />

        {/* Hero */}
        <div className="mt-6">
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-medium px-3 py-1.5 rounded-full mb-4">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            代替ツール比較
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            【{tool.name}の代替】
            <br className="sm:hidden" />
            おすすめAIツール{alternatives.length}選
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
            {tool.name}の代わりになるAIツールを厳選してまとめました。
            料金・機能・使いやすさを比較して最適な代替ツールを見つけましょう。
          </p>
        </div>

        {/* Original Tool Card */}
        <div className="mt-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                代替を探しているツール
              </p>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{tool.name}</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm max-w-xl leading-relaxed">
                {tool.shortDescription}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium px-2.5 py-1">
                  {tool.category}
                </span>
                <PricingBadge pricing={tool.pricing} />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {pricingLabels[tool.pricing]} ・ {tool.pricingDetail.split('。')[0]}
                </span>
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
                className="inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
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
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
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
        <div className="mt-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
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
