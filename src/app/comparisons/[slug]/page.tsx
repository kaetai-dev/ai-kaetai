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

function WinBadge({ winner, toolA, toolB }: { winner?: string; toolA: string; toolB: string }) {
  if (winner === 'A') return <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1"><Trophy className="w-3 h-3" />{toolA}</span>;
  if (winner === 'B') return <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full flex items-center gap-1"><Trophy className="w-3 h-3" />{toolB}</span>;
  return <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full flex items-center gap-1"><Minus className="w-3 h-3" />引き分け</span>;
}

export default function ComparisonDetailPage({ params }: Props) {
  const cmp = getComparisonBySlug(params.slug);
  if (cmp == null) notFound();
  const tools = getAllTools();
  const fA = getFav(cmp.toolASlug, tools);
  const fB = getFav(cmp.toolBSlug, tools);
  const winsA = cmp.points.filter(p => p.winner === 'A').length;
  const winsB = cmp.points.filter(p => p.winner === 'B').length;

  return (
    <>
      <section className="relative overflow-hidden bg-[#0a0a0f]">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-16 relative z-10">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-10">
            <Link href="/" className="hover:text-gray-300 transition">ホーム</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/comparisons" className="hover:text-gray-300 transition">比較</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400">{cmp.toolA} vs {cmp.toolB}</span>
          </nav>
          <span className="text-xs font-medium text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">{cmp.category}</span>
          <div className="flex items-center gap-4 mt-6 mb-5">
            <div className="flex items-center gap-2">
              {fA && <img src={fA} alt={cmp.toolA} className="w-8 h-8 rounded-lg border border-white/10" />}
              <span className="text-xl font-bold text-white">{cmp.toolA}</span>
            </div>
            <span className="text-2xl font-bold text-blue-400">vs</span>
            <div className="flex items-center gap-2">
              {fB && <img src={fB} alt={cmp.toolB} className="w-8 h-8 rounded-lg border border-white/10" />}
              <span className="text-xl font-bold text-white">{cmp.toolB}</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">{cmp.title}</h1>
          <p className="text-base text-gray-400 leading-relaxed max-w-3xl mb-8">{cmp.description}</p>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-emerald-400">{winsA}</p>
              <p className="text-xs text-gray-500 mt-1">{cmp.toolA}優勢</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">{winsB}</p>
              <p className="text-xs text-gray-500 mt-1">{cmp.toolB}優勢</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-400">{cmp.points.length - winsA - winsB}</p>
              <p className="text-xs text-gray-500 mt-1">引き分け</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">項目別比較</h2>
        <div className="space-y-4">
          {cmp.points.map((pt, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-900">{pt.category}</h3>
                <WinBadge winner={pt.winner} toolA={cmp.toolA} toolB={cmp.toolB} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={'rounded-xl p-4 ' + (pt.winner === 'A' ? 'bg-emerald-50 border border-emerald-200' : 'bg-gray-50 border border-gray-100')}>
                  <p className="text-xs font-medium text-gray-500 mb-1">{cmp.toolA}</p>
                  <p className="text-sm text-gray-700">{pt.toolA}</p>
                </div>
                <div className={'rounded-xl p-4 ' + (pt.winner === 'B' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 border border-gray-100')}>
                  <p className="text-xs font-medium text-gray-500 mb-1">{cmp.toolB}</p>
                  <p className="text-sm text-gray-700">{pt.toolB}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">結論</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{cmp.verdict}</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              {fA && <img src={fA} alt={cmp.toolA} className="w-5 h-5 rounded" />}{cmp.toolA}の強み
            </h3>
            <div className="space-y-2">
              {cmp.toolAStrengths.map((s, i) => (
                <div key={i} className="flex items-start gap-2 bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                  <span className="text-emerald-500 mt-0.5 shrink-0">+</span>
                  <p className="text-sm text-gray-700">{s}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              {fB && <img src={fB} alt={cmp.toolB} className="w-5 h-5 rounded" />}{cmp.toolB}の強み
            </h3>
            <div className="space-y-2">
              {cmp.toolBStrengths.map((s, i) => (
                <div key={i} className="flex items-start gap-2 bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <span className="text-blue-500 mt-0.5 shrink-0">+</span>
                  <p className="text-sm text-gray-700">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">ツール詳細</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[{ name: cmp.toolA, slug: cmp.toolASlug, fav: fA }, { name: cmp.toolB, slug: cmp.toolBSlug, fav: fB }].map((t) => (
            <Link key={t.slug} href={'/tools/' + t.slug} className="group flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:border-blue-200 hover:shadow-md transition-all duration-300">
              {t.fav ? <img src={t.fav} alt={t.name} className="w-10 h-10 rounded-xl" /> : <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-400">{t.name.charAt(0)}</div>}
              <div className="flex-1">
                <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{t.name}</p>
                <p className="text-xs text-gray-500">詳細を見る</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        <div className="flex flex-wrap gap-2">
          {cmp.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full">#{tag}</span>
          ))}
        </div>
      </section>
    </>
  );
}
