import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllCombinations } from '@/lib/combinations';
import { getAllTools } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AIツール組み合わせガイド｜2つのツールで10倍効率化 - AI Kaetai',
  description: '2つのAIツールを組み合わせて生産性を最大化。Genspark×Notion、ChatGPT×ElevenLabsなど、実践的な活用法を紹介。',
};

function getFavicon(toolSlug: string, allTools: ReturnType<typeof getAllTools>): string | null {
  const tool = allTools.find(t => t.slug === toolSlug);
  if (tool?.officialUrl) {
    try {
      const domain = new URL(tool.officialUrl).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch { return null; }
  }
  return null;
}

export default function CombinationsPage() {
  const combos = getAllCombinations();
  const allTools = getAllTools();

  return (
    <>
      <section className="relative overflow-hidden bg-[#0a0a0f]">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 relative z-10 text-center">
          <p className="text-sm text-purple-400 font-medium mb-4">TOOL COMBINATIONS</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
            AIツール × AIツール
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            2つのAIツールを組み合わせることで、1つでは実現できない強力なワークフローが生まれます。
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {combos.map((combo) => {
            const favA = getFavicon(combo.toolASlug, allTools);
            const favB = getFavicon(combo.toolBSlug, allTools);
            return (
              <Link key={combo.slug} href={`/combinations/${combo.slug}`} className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-purple-200 hover:shadow-lg transition-all duration-300">
                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">{combo.category}</span>

                <div className="flex items-center gap-3 mt-4 mb-3">
                  <div className="flex items-center gap-2">
                    {favA && <img src={favA} alt={combo.toolA} className="w-6 h-6 rounded" />}
                    <span className="font-semibold text-gray-900">{combo.toolA}</span>
                  </div>
                  <span className="text-purple-400 text-lg font-bold">×</span>
                  <div className="flex items-center gap-2">
                    {favB && <img src={favB} alt={combo.toolB} className="w-6 h-6 rounded" />}
                    <span className="font-semibold text-gray-900">{combo.toolB}</span>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">{combo.title}</h2>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{combo.description}</p>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{combo.steps.length}ステップ</span>
                  <span>·</span>
                  <span>{combo.useCase}</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
