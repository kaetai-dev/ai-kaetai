import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  getAllTools,
  getToolBySlug,
  getAlternativesForTool,
  getAlternativesOf,
} from '@/lib/data';
import PricingBadge from '@/components/PricingBadge';
import ToolGrid from '@/components/ToolGrid';
import ToolFaviconIcon from '@/components/ToolFaviconIcon';
import { DollarSign, Zap, Globe, Star } from 'lucide-react';

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

  return {
    title: `${tool.name} - 詳細・評価・代替ツール`,
    description: `${tool.name}の詳細情報、機能、料金、代替AIツールをまとめました。${tool.shortDescription}`,
    openGraph: {
      title: `${tool.name} | AI Kaetai`,
      description: `${tool.name}の詳細情報と代替ツール一覧。${tool.shortDescription}`,
      type: 'article',
    },
  };
}

const HERO_STYLE = { background: 'linear-gradient(135deg, #0f172a 0%, #0c4a6e 50%, #0891b2 100%)' };
const GRID_STYLE = {
  backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
  backgroundSize: '40px 40px',
};

export default function ToolDetailPage({ params }: Props) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const alternatives = getAlternativesForTool(params.slug);
  const alternativeOf = getAlternativesOf(params.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.officialUrl,
    applicationCategory: 'AIApplication',
    offers: {
      '@type': 'Offer',
      price: tool.pricing === 'free' ? '0' : undefined,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: tool.rating
      ? { '@type': 'AggregateRating', ratingValue: tool.rating, bestRating: 5, worstRating: 1 }
      : undefined,
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
            <Link href={`/categories/${tool.categorySlug}`} className="hover:text-white transition-colors">
              {tool.category}
            </Link>
            <span>/</span>
            <span className="text-white font-medium">{tool.name}</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-start gap-6 animate-fadeInUp">
            {/* Favicon box */}
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/20">
              <ToolFaviconIcon officialUrl={tool.officialUrl} name={tool.name} imgClassName="w-12 h-12 object-contain rounded-lg" />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Link
                  href={`/categories/${tool.categorySlug}`}
                  className="inline-flex items-center rounded-full bg-white/10 text-cyan-200 text-sm font-medium px-3 py-1 border border-white/20 hover:bg-white/20 transition-colors"
                >
                  {tool.category}
                </Link>
                <PricingBadge pricing={tool.pricing} size="md" />
                {tool.rating && (
                  <div className="flex items-center gap-1 bg-white/10 rounded-full px-2.5 py-1 border border-white/20">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-semibold text-white">{tool.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-white">{tool.name}</h1>
              <p className="mt-3 text-lg text-blue-100 leading-relaxed max-w-2xl">
                {tool.shortDescription}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href={tool.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl border border-white/30 transition-all hover:-translate-y-0.5"
                >
                  <Globe className="w-4 h-4" />
                  公式サイトへ
                </a>
                <a
                  href={tool.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all shadow-lg hover:-translate-y-0.5 text-white"
                  style={{ background: 'linear-gradient(135deg, #0891b2, #0e7490)' }}
                >
                  詳細・購入はこちら
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-white/10 text-blue-200 text-xs font-medium px-2.5 py-1 border border-white/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 animate-fadeInUp">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="block w-1 h-6 rounded-full bg-cyan-500 flex-shrink-0" />
                {tool.name}とは
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {tool.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 animate-fadeInUp-delay-1">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <span className="block w-1 h-6 rounded-full bg-cyan-500 flex-shrink-0" />
                <Zap className="w-5 h-5 text-cyan-500" />
                主な機能
              </h2>
              <ul className="space-y-3">
                {tool.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Alternatives */}
            {alternatives.length > 0 && (
              <div className="animate-fadeInUp-delay-2">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <span className="block w-1 h-6 rounded-full bg-cyan-500 flex-shrink-0" />
                    {tool.name}の代替ツール
                  </h2>
                  <Link
                    href={`/alternatives/${tool.slug}`}
                    className="text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 flex items-center gap-1"
                  >
                    すべて見る
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                <ToolGrid tools={alternatives} />
              </div>
            )}

            {/* Alternative Of */}
            {alternativeOf.length > 0 && (
              <div className="animate-fadeInUp-delay-3">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                  <span className="block w-1 h-6 rounded-full bg-cyan-500 flex-shrink-0" />
                  {tool.name}が代替となるツール
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                  以下のツールの代替として{tool.name}が挙げられています
                </p>
                <ToolGrid tools={alternativeOf} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 animate-fadeInUp">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-cyan-500" />
                料金プラン
              </h3>
              <div className="space-y-3">
                <PricingBadge pricing={tool.pricing} size="md" />
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {tool.pricingDetail}
                </p>
              </div>
              <a
                href={tool.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-4 block w-full text-center text-white font-semibold px-4 py-2.5 rounded-lg transition-all text-sm hover:-translate-y-0.5 hover:shadow"
                style={{ background: 'linear-gradient(135deg, #0891b2, #0e7490)' }}
              >
                料金を確認する
              </a>
            </div>

            {/* Official site */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 animate-fadeInUp-delay-1">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-500" />
                公式情報
              </h3>
              <a
                href={tool.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="break-all">{tool.officialUrl}</span>
              </a>
            </div>

            {/* Disclosure */}
            <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-900/30 p-4 animate-fadeInUp-delay-2">
              <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
                ※ 「詳細・購入はこちら」はアフィリエイトリンクです。購入された場合、当サイトに報酬が発生することがありますが、掲載内容に影響はありません。
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
