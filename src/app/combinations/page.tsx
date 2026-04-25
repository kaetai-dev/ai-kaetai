import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllCombinations } from '@/lib/combinations';
import { getAllTools } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AIツール組み合わせガイド｜2つのツールで効率化 - AI Kaetai',
  description: 'Genspark x Notion、ChatGPT x ElevenLabsなど、2つのAIツールを組み合わせた実践的な活用法を紹介。',
};

function getFav(slug: string, tools: any[]): string | null {
  const t = tools.find((x: any) => x.slug === slug);
  if (t && t.officialUrl) {
    try { return 'https://www.google.com/s2/favicons?domain=' + new URL(t.officialUrl).hostname + '&sz=64'; }
    catch { return null; }
  }
  return null;
}

export default function CombinationsPage() {
  const combos = getAllCombinations();
  const tools = getAllTools();
  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">AIツール組み合わせ</h1>
        <p className="text-base text-gray-600">2つのAIツールを組み合わせて生産性を最大化しよう</p>
      </div>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {combos.map((c) => {
            const fA = getFav(c.toolASlug, tools);
            const fB = getFav(c.toolBSlug, tools);
            return (
              <Link key={c.slug} href={'/combinations/' + c.slug} className="group border border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-sm transition bg-white">
                <span className="text-xs font-medium text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">{c.category}</span>
                <div className="flex items-center gap-2 mt-3 mb-2">
                  <div className="flex items-center gap-1.5">
                    {fA && <img src={fA} alt="" className="w-5 h-5 rounded" />}
                    <span className="text-sm font-semibold text-gray-900">{c.toolA}</span>
                  </div>
                  <span className="text-sm font-bold text-purple-400">x</span>
                  <div className="flex items-center gap-1.5">
                    {fB && <img src={fB} alt="" className="w-5 h-5 rounded" />}
                    <span className="text-sm font-semibold text-gray-900">{c.toolB}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">{c.description}</p>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{c.steps.length}ステップ</span>
                  <span>{c.useCase}</span>
                  <ArrowRight className="w-3 h-3 ml-auto group-hover:text-purple-400 transition" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
