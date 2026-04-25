import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllCombinations, getCombinationBySlug } from '@/lib/combinations';
import { getAllTools } from '@/lib/data';
import { ChevronRight, CheckCircle, ExternalLink, ArrowDown } from 'lucide-react';

interface Props { params: { slug: string }; }

export async function generateStaticParams() {
  return getAllCombinations().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const combo = getCombinationBySlug(params.slug);
  if (combo == null) return {};
  return {
    title: combo.title + ' - AI Kaetai',
    description: combo.description,
    openGraph: { title: combo.title, description: combo.description, type: 'article' },
  };
}

function getFav(slug: string, tools: any[]): string | null {
  const t = tools.find((x: any) => x.slug === slug);
  if (t && t.officialUrl) {
    try { return 'https://www.google.com/s2/favicons?domain=' + new URL(t.officialUrl).hostname + '&sz=64'; }
    catch { return null; }
  }
  return null;
}

export default function CombinationDetailPage({ params }: Props) {
  const combo = getCombinationBySlug(params.slug);
  if (combo == null) notFound();
  const tools = getAllTools();
  const fA = getFav(combo.toolASlug, tools);
  const fB = getFav(combo.toolBSlug, tools);

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        <nav className="flex items-center gap-1.5 text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-700 transition">ホーム</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/combinations" className="hover:text-gray-700 transition">組み合わせ</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600">{combo.toolA} x {combo.toolB}</span>
        </nav>
      </div>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-6">
        <span className="text-xs font-medium bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full">{combo.category}</span>
        <div className="flex items-center gap-3 mt-4 mb-3">
          <div className="flex items-center gap-2">
            {fA && <img src={fA} alt={combo.toolA} className="w-7 h-7 rounded-lg" />}
            <span className="text-xl font-bold text-gray-900">{combo.toolA}</span>
          </div>
          <span className="text-xl font-bold text-purple-400">x</span>
          <div className="flex items-center gap-2">
            {fB && <img src={fB} alt={combo.toolB} className="w-7 h-7 rounded-lg" />}
            <span className="text-xl font-bold text-gray-900">{combo.toolB}</span>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-3">{combo.title}</h1>
        <p className="text-base text-gray-600 leading-relaxed mb-3">{combo.description}</p>
        <p className="text-sm text-gray-500">活用シーン: {combo.useCase}</p>
      </section>

      <hr className="max-w-4xl mx-auto border-gray-100" />

      {/* About */}
      {combo.longDescription && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">この組み合わせについて</h2>
          <p className="text-sm text-gray-600 leading-[1.8]">{combo.longDescription}</p>
        </section>
      )}

      {/* Steps */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-lg font-bold text-gray-900 mb-6">組み合わせワークフロー</h2>
        <div className="space-y-3">
          {combo.steps.map((step, i) => (
            <div key={step.step}>
              <div className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white hover:border-gray-300 transition">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold shrink-0">{step.step}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-base font-bold text-gray-900">{step.action}</h3>
                      <span className="text-xs font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full shrink-0">{step.tool}</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
              {i < combo.steps.length - 1 && (
                <div className="flex justify-center py-1.5">
                  <ArrowDown className="w-4 h-4 text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-purple-50 border border-purple-100 rounded-xl p-5">
          <h2 className="text-base font-bold text-gray-900 mb-4">この組み合わせのメリット</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {combo.benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-700">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Links */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">使用するツール</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[{ name: combo.toolA, slug: combo.toolASlug, fav: fA }, { name: combo.toolB, slug: combo.toolBSlug, fav: fB }].map((t) => (
            <Link key={t.slug} href={'/tools/' + t.slug} className="group flex items-center gap-3 border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition">
              {t.fav ? <img src={t.fav} alt={t.name} className="w-8 h-8 rounded-lg" /> : <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-400">{t.name.charAt(0)}</div>}
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-purple-600 transition">{t.name}</p>
                <p className="text-xs text-gray-500">詳細を見る</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-purple-400 transition" />
            </Link>
          ))}
        </div>
      </section>

      {/* Tags */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-12">
        <div className="flex flex-wrap gap-2">
          {combo.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">#{tag}</span>
          ))}
        </div>
      </section>
    </>
  );
}
