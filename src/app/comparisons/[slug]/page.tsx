import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllComparisons, getComparisonBySlug } from '@/lib/comparisons';
import { getAllTools } from '@/lib/data';
import { ChevronRight, ExternalLink, Trophy, Minus } from 'lucide-react';

interface Props { params: { slug: string }; }

export async function generateStaticParams() {
  return getAllComparisons().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cmp = getComparisonBySlug(params.slug);
  if (cmp == null) return {};
  return {
    title: cmp.title + ' - AI Kaetai',
    description: cmp.description,
    openGraph: { title: cmp.title, description: cmp.description, type: 'article' },
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

export default function ComparisonDetailPage({ params }: Props) {
  const cmp = getComparisonBySlug(params.slug);
  if (cmp == null) notFound();
  const tools = getAllTools();
  const fA = getFav(cmp.toolASlug, tools);
  const fB = getFav(cmp.toolBSlug, tools);
  const winsA = cmp.points.filter(p => p.winner === 'A').length;
  const winsB = cmp.points.filter(p => p.winner === 'B').length;
  const draws = cmp.points.length - winsA - winsB;

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        <nav className="flex items-center gap-1.5 text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-700 transition">ホーム</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/comparisons" className="hover:text-gray-700 transition">比較</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600">{cmp.toolA} vs {cmp.toolB}</span>
        </nav>
      </div>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-6">
        <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{cmp.category}</span>
        <div className="flex items-center gap-3 mt-4 mb-3">
          <div className="flex items-center gap-2">
            {fA && <img src={fA} alt={cmp.toolA} className="w-7 h-7 rounded-lg" />}
            <span className="text-xl font-bold text-gray-900">{cmp.toolA}</span>
          </div>
          <span className="text-xl font-bold text-gray-400">vs</span>
          <div className="flex items-center gap-2">
            {fB && <img src={fB} alt={cmp.toolB} className="w-7 h-7 rounded-lg" />}
            <span className="text-xl font-bold text-gray-900">{cmp.toolB}</span>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-3">{cmp.title}</h1>
        <p className="text-base text-gray-600 leading-relaxed mb-6">{cmp.description}</p>

        {/* Score summary */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">{winsA}</span>
            <span className="text-gray-600">{cmp.toolA}優勢</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">{winsB}</span>
            <span className="text-gray-600">{cmp.toolB}優勢</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold">{draws}</span>
            <span className="text-gray-600">引き分け</span>
          </div>
        </div>
      </section>

      {cmp.longDescription && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="border border-gray-200 rounded-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">この比較について</h2>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{cmp.longDescription}</p>
          </div>
        </section>
      )}

      <hr className="max-w-4xl mx-auto border-gray-100" />

      {/* Comparison Table */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-lg font-bold text-gray-900 mb-6">項目別比較</h2>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600 w-28">項目</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  <div className="flex items-center gap-1.5">{fA && <img src={fA} alt="" className="w-4 h-4 rounded" />}{cmp.toolA}</div>
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  <div className="flex items-center gap-1.5">{fB && <img src={fB} alt="" className="w-4 h-4 rounded" />}{cmp.toolB}</div>
                </th>
                <th className="text-center px-4 py-3 font-medium text-gray-600 w-24">判定</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cmp.points.map((pt, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-900">{pt.category}</td>
                  <td className={'px-4 py-3 text-gray-600' + (pt.winner === 'A' ? ' bg-emerald-50' : '')}>{pt.toolA}</td>
                  <td className={'px-4 py-3 text-gray-600' + (pt.winner === 'B' ? ' bg-blue-50' : '')}>{pt.toolB}</td>
                  <td className="px-4 py-3 text-center">
                    {pt.winner === 'A' && <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">{cmp.toolA}</span>}
                    {pt.winner === 'B' && <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">{cmp.toolB}</span>}
                    {pt.winner !== 'A' && pt.winner !== 'B' && <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">引分</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Verdict */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <h2 className="text-base font-bold text-gray-900 mb-2">結論</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{cmp.verdict}</p>
        </div>
      </section>

      {/* Strengths */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-emerald-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
              {fA && <img src={fA} alt="" className="w-4 h-4 rounded" />}{cmp.toolA}の強み
            </h3>
            <ul className="space-y-2">
              {cmp.toolAStrengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-emerald-500 mt-0.5 shrink-0 font-bold">+</span>{s}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-blue-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
              {fB && <img src={fB} alt="" className="w-4 h-4 rounded" />}{cmp.toolB}の強み
            </h3>
            <ul className="space-y-2">
              {cmp.toolBStrengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-blue-500 mt-0.5 shrink-0 font-bold">+</span>{s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tool Links */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">ツール詳細</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[{ name: cmp.toolA, slug: cmp.toolASlug, fav: fA }, { name: cmp.toolB, slug: cmp.toolBSlug, fav: fB }].map((t) => (
            <Link key={t.slug} href={'/tools/' + t.slug} className="group flex items-center gap-3 border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition">
              {t.fav ? <img src={t.fav} alt={t.name} className="w-8 h-8 rounded-lg" /> : <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-400">{t.name.charAt(0)}</div>}
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition">{t.name}</p>
                <p className="text-xs text-gray-500">詳細を見る</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition" />
            </Link>
          ))}
        </div>
      </section>

      {/* Tags */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-12">
        <div className="flex flex-wrap gap-2">
          {cmp.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">#{tag}</span>
          ))}
        </div>
      </section>
    </>
  );
}
