import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllWorkflows } from '@/lib/workflows';
import { getAllTools } from '@/lib/data';
import { Clock, DollarSign, ChevronRight, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AIワークフロー一覧｜やりたいことから探す - AI Kaetai',
  description: '初心者でもすぐ始められるAIワークフローを目的別に紹介。YouTube動画作成、ブログ自動化、画像生成など、ステップごとに必要なツールと費用がわかります。',
  openGraph: {
    title: 'AIワークフロー一覧｜やりたいことから探す - AI Kaetai',
    description: '初心者向けAIワークフローを目的別に紹介。',
    type: 'website',
  },
};

function getToolFavicon(toolName: string, allTools: ReturnType<typeof getAllTools>): string | null {
  const OVERRIDES: Record<string, string> = {
    'YouTube Studio': 'https://www.google.com/s2/favicons?domain=studio.youtube.com&sz=64',
    'YouTube': 'https://www.google.com/s2/favicons?domain=youtube.com&sz=64',
    'Buffer': 'https://www.google.com/s2/favicons?domain=buffer.com&sz=64',
    'WordPress': 'https://www.google.com/s2/favicons?domain=wordpress.com&sz=64',
    'Zoom': 'https://www.google.com/s2/favicons?domain=zoom.us&sz=64',
    'Google Meet': 'https://www.google.com/s2/favicons?domain=meet.google.com&sz=64',
  };
  if (OVERRIDES[toolName]) return OVERRIDES[toolName];
  const n = toolName.toLowerCase().replace(/\s/g, '');
  const tool = allTools.find(t => {
    const tn = t.name.toLowerCase().replace(/\s/g, '');
    return tn === n || tn.includes(n) || n.includes(tn);
  });
  if (tool?.officialUrl) {
    try {
      const domain = new URL(tool.officialUrl).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch { return null; }
  }
  return null;
}

const CATEGORY_ICONS: Record<string, string> = {
  '動画': '🎬',
  'SNS運用': '📱',
  'ブログ・ライティング': '✍️',
  '画像・デザイン': '🎨',
  '音声・音楽': '🎙️',
  'ビジネス効率化': '⚡',
};

export default function WorkflowsPage() {
  const workflows = getAllWorkflows();
  const allTools = getAllTools();

  const categories = Array.from(new Set(workflows.map(w => w.category)));

  const difficultyLabel = { beginner: '初心者向け', intermediate: '中級者向け', advanced: '上級者向け' };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-[#0a0a0f]">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 relative z-10 text-center">
          <p className="text-sm text-indigo-400 font-medium mb-4">AI WORKFLOWS</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-5">
            AIで、何がしたい？
          </h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            やりたいことを選ぶだけ。必要なAIツール・手順・費用がすべてわかる、初心者向けワークフローガイド。
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <a
                key={cat}
                href={`#${cat}`}
                className="inline-flex items-center gap-1.5 text-sm text-gray-300 bg-white/[0.06] border border-white/[0.08] px-4 py-2 rounded-full hover:bg-white/[0.12] hover:text-white transition"
              >
                <span>{CATEGORY_ICONS[cat] || '📂'}</span>
                <span>{cat}</span>
                <span className="text-xs text-gray-500 ml-1">({workflows.filter(w => w.category === cat).length})</span>
              </a>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ===== WORKFLOW CARDS BY CATEGORY ===== */}
      {categories.map(cat => {
        const catWorkflows = workflows.filter(w => w.category === cat);

        return (
          <section key={cat} id={cat} className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
            {/* Category header */}
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl">{CATEGORY_ICONS[cat] || '📂'}</span>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{cat}</h2>
                <p className="text-sm text-gray-500">{catWorkflows.length}件のワークフロー</p>
              </div>
            </div>

            {/* Bento grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
              {catWorkflows.map((wf, i) => {
                // First card in each category is large (spans 2 cols on lg)
                const isLarge = i === 0 && catWorkflows.length > 1;

                return (
                  <Link
                    key={wf.slug}
                    href={`/workflows/${wf.slug}`}
                    className={`group relative bg-white border border-gray-100 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 flex flex-col ${
                      isLarge ? 'lg:col-span-2 lg:row-span-2' : ''
                    }`}
                  >
                    {/* Top row: category + difficulty */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                        {wf.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {difficultyLabel[wf.difficulty]}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2 ${
                      isLarge ? 'text-xl lg:text-2xl' : 'text-lg'
                    }`}>
                      {wf.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-gray-500 leading-relaxed mb-5 flex-1 ${
                      isLarge ? 'text-sm lg:text-base' : 'text-sm line-clamp-2'
                    }`}>
                      {wf.description}
                    </p>

                    {/* Tool favicons */}
                    <div className="flex items-center gap-1.5 mb-4">
                      {wf.steps.slice(0, isLarge ? 6 : 4).map((step, si) => {
                        const favicon = getToolFavicon(step.tool, allTools);
                        return favicon ? (
                          <img key={si} src={favicon} alt={step.tool} title={step.tool} className="w-5 h-5 rounded-full border border-gray-200 bg-white" />
                        ) : (
                          <div key={si} title={step.tool} className="w-5 h-5 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-400">
                            {step.tool.charAt(0)}
                          </div>
                        );
                      })}
                      {wf.steps.length > (isLarge ? 6 : 4) && (
                        <span className="text-xs text-gray-400">+{wf.steps.length - (isLarge ? 6 : 4)}</span>
                      )}
                    </div>

                    {/* Stats row */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        {wf.timeEstimate}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                        {wf.monthlyCostJPY}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Zap className="w-3.5 h-3.5 text-gray-400" />
                        {wf.steps.length}ステップ
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* ===== COMING SOON ===== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-8 sm:p-12 text-center">
          <p className="text-3xl mb-4">🚀</p>
          <h2 className="text-xl font-bold text-gray-900 mb-3">さらに20件のワークフローを準備中</h2>
          <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
            X(Twitter)自動投稿、SNSクロスポスト、AI画像販売、有料記事作成など、もっと多くのワークフローを順次公開予定です。
          </p>
        </div>
      </section>
    </>
  );
}
