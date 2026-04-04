import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  getAllTools,
  getToolBySlug,
  getAlternativesForTool,
  getAlternativesOf,
} from '@/lib/data';
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

const gradientColors: Record<string, string> = {
  chatgpt: 'from-emerald-400 to-teal-600',
  claude: 'from-orange-400 to-amber-600',
  gemini: 'from-blue-400 to-indigo-600',
  midjourney: 'from-violet-400 to-purple-700',
  'stable-diffusion': 'from-pink-400 to-rose-600',
  'dall-e': 'from-cyan-400 to-sky-600',
  'github-copilot': 'from-gray-700 to-gray-900',
  cursor: 'from-indigo-400 to-violet-600',
  tabnine: 'from-blue-500 to-cyan-600',
  runway: 'from-red-400 to-pink-600',
  descript: 'from-green-400 to-emerald-600',
  pika: 'from-yellow-400 to-orange-500',
  suno: 'from-purple-400 to-fuchsia-600',
  elevenlabs: 'from-orange-400 to-red-600',
  udio: 'from-teal-400 to-cyan-600',
  jasper: 'from-rose-400 to-pink-600',
  'copy-ai': 'from-violet-400 to-indigo-600',
  'notion-ai': 'from-gray-400 to-slate-600',
  perplexity: 'from-sky-400 to-blue-600',
  'adobe-firefly': 'from-red-400 to-orange-600',
};

export default function ToolDetailPage({ params }: Props) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const alternatives = getAlternativesForTool(params.slug);
  const alternativeOf = getAlternativesOf(params.slug);

  const gradient = gradientColors[tool.slug] || 'from-indigo-400 to-indigo-600';
  const initials = tool.name
    .split(/[\s.]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

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
      ? {
          '@type': 'AggregateRating',
          ratingValue: tool.rating,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
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
            { label: tool.category, href: `/categories/${tool.categorySlug}` },
            { label: tool.name },
          ]}
        />

        {/* Hero */}
        <div className="mt-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className={`h-48 md:h-64 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <div className="text-6xl md:text-8xl font-extrabold text-white/90 select-none">
              {initials}
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <Link
                href={`/categories/${tool.categorySlug}`}
                className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium px-3 py-1 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
              >
                {tool.category}
              </Link>
              <PricingBadge pricing={tool.pricing} size="md" />
              {tool.rating && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {tool.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              {tool.name}
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {tool.shortDescription}
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={tool.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                公式サイトへ
              </a>
              <a
                href={tool.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                詳細・購入はこちら
              </a>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium px-2.5 py-1"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {tool.name}とは
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {tool.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">主な機能</h2>
              <ul className="space-y-3">
                {tool.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Alternatives */}
            {alternatives.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {tool.name}の代替ツール
                  </h2>
                  <Link
                    href={`/alternatives/${tool.slug}`}
                    className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1"
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
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
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
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">料金プラン</h3>
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
                className="mt-4 block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm"
              >
                料金を確認する
              </a>
            </div>

            {/* Official site */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">公式情報</h3>
              <a
                href={tool.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="break-all">{tool.officialUrl}</span>
              </a>
            </div>

            {/* Disclosure */}
            <div className="bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-200 dark:border-amber-900/30 p-4">
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
