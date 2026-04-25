import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllComparisons } from '@/lib/comparisons';
import { getAllTools } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AIツール比較｜人気ツールを徹底比較 - AI Kaetai',
  description: 'ChatGPT vs Claude、Genspark vs Perplexityなど、人気AIツールを項目別に徹底比較。あなたに最適なツールが見つかります。',
};

function getFav(slug: string, tools: any[]): string | null {
  const t = tools.find((x: any) => x.slug === slug);
  if (t && t.officialUrl) {
    try { return 'https://www.google.com/s2/favicons?domain=' + new URL(t.officialUrl).hostname + '&sz=64'; }
    catch { return null; }
  }
  return null;
}

export default function ComparisonsPage() {
  const comps = getAllComparisons();
  const tools = getAllTools();
  return (
    <>
      <section className="relative overflow-hidden bg-[#0a0a0f]">
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 relative z-10 text-center">
          <p className="text-sm text-blue-400 font-medium mb-4">TOOL COMPARISONS</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-5">AIツール徹底比較</h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">人気AIツールを項目別に比較。あなたの用途に合った最適なツールを見つけましょう。</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {comps.map((c) => {
            const fA = getFav(c.toolASlug, tools);
            const fB = getFav(c.toolBSlug, tools);
            return (
              <Link key={c.slug} href={'/comparisons/' + c.slug} className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{c.category}</span>
                <div className="flex items-center gap-3 mt-4 mb-3">
                  <div className="flex items-center gap-2">
                    {fA && <img src={fA} alt={c.toolA} className="w-6 h-6 rounded" />}
                    <span className="font-semibold text-gray-900">{c.toolA}</span>
                  </div>
                  <span className="text-blue-400 text-lg font-bold">vs</span>
                  <div className="flex items-center gap-2">
                    {fB && <img src={fB} alt={c.toolB} className="w-6 h-6 rounded" />}
                    <span className="font-semibold text-gray-900">{c.toolB}</span>
                  </div>
                </div>
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{c.title}</h2>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{c.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{c.points.length}項目で比較</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
