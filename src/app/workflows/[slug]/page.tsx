import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllWorkflows, getWorkflowBySlug } from '@/lib/workflows';
import { getToolBySlug, getAllTools } from '@/lib/data';
import { Clock, DollarSign, Zap, ArrowRight, CheckCircle, ChevronRight, ExternalLink, ArrowDown } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const workflows = getAllWorkflows();
  return workflows.map((wf) => ({ slug: wf.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const wf = getWorkflowBySlug(params.slug);
  if (!wf) return {};
  return {
    title: `${wf.title}｜AIワークフロー - AI Kaetai`,
    description: `${wf.description} 初心者でも${wf.timeEstimate}で完成。月額${wf.monthlyCostJPY}から。`,
    openGraph: {
      title: `${wf.title} | AI Kaetai`,
      description: wf.description,
      type: 'article',
    },
  };
}


// Special favicon mappings for tools not in data.ts
const FAVICON_OVERRIDES: Record<string, string> = {
  'YouTube Studio': 'https://www.google.com/s2/favicons?domain=studio.youtube.com&sz=64',
  'YouTube': 'https://www.google.com/s2/favicons?domain=youtube.com&sz=64',
  'Buffer': 'https://www.google.com/s2/favicons?domain=buffer.com&sz=64',
  'WordPress': 'https://www.google.com/s2/favicons?domain=wordpress.com&sz=64',
  'Zoom': 'https://www.google.com/s2/favicons?domain=zoom.us&sz=64',
  'Google Meet': 'https://www.google.com/s2/favicons?domain=meet.google.com&sz=64',
};

// Helper: get favicon URL from tool name
function getToolFavicon(toolName: string, allTools: ReturnType<typeof getAllTools>): string | null {
  if (FAVICON_OVERRIDES[toolName]) return FAVICON_OVERRIDES[toolName];
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

// Helper: get tool slug from tool name
function getToolSlug(toolName: string, allTools: ReturnType<typeof getAllTools>): string | null {
  const n = toolName.toLowerCase().replace(/\s/g, '');
  const tool = allTools.find(t => {
    const tn = t.name.toLowerCase().replace(/\s/g, '');
    return tn === n || tn.includes(n) || n.includes(tn);
  });
  return tool?.slug || null;
}

export default function WorkflowDetailPage({ params }: Props) {
  const wf = getWorkflowBySlug(params.slug);
  if (!wf) notFound();

  const allTools = getAllTools();
  const relatedTools = wf.relatedToolSlugs
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: wf.title,
    description: wf.description,
    totalTime: wf.timeEstimate,
    step: wf.steps.map((s) => ({
      '@type': 'HowToStep',
      position: s.step,
      name: s.action,
      text: s.description,
      itemListElement: { '@type': 'HowToTool', name: s.tool },
    })),
  };

  const difficultyLabel = { beginner: '初心者向け', intermediate: '中級者向け', advanced: '上級者向け' };
  const difficultyColor = { beginner: 'text-emerald-400', intermediate: 'text-amber-400', advanced: 'text-rose-400' };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-[#0a0a0f]">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-600/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-16 relative z-10">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-10">
            <Link href="/" className="hover:text-gray-300 transition">ホーム</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/workflows" className="hover:text-gray-300 transition">ワークフロー</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400">{wf.shortTitle}</span>
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-medium text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full">{wf.category}</span>
            <span className={`text-xs font-medium ${difficultyColor[wf.difficulty]}`}>{difficultyLabel[wf.difficulty]}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold text-white leading-tight tracking-tight mb-5">{wf.title}</h1>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-3xl mb-10">{wf.description}</p>

          {/* Tool icons row */}
          <div className="flex items-center gap-2 mb-8">
            <span className="text-xs text-gray-500 mr-1">使用ツール:</span>
            <div className="flex -space-x-1.5">
              {wf.steps.map((step, i) => {
                const favicon = getToolFavicon(step.tool, allTools);
                return favicon ? (
                  <img key={i} src={favicon} alt={step.tool} title={step.tool} className="w-7 h-7 rounded-full border-2 border-[#0a0a0f] bg-white" />
                ) : (
                  <div key={i} title={step.tool} className="w-7 h-7 rounded-full border-2 border-[#0a0a0f] bg-gray-700 flex items-center justify-center text-[10px] font-bold text-gray-300">
                    {step.tool.charAt(0)}
                  </div>
                );
              })}
            </div>
            <span className="text-xs text-gray-500 ml-2">{wf.steps.length}ツール</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-2.5 backdrop-blur-sm">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-gray-200">{wf.timeEstimate}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-2.5 backdrop-blur-sm">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-gray-200">月額 {wf.monthlyCostJPY}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-2.5 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-gray-200">{wf.steps.length}ステップ</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ===== STEP TIMELINE ===== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">ステップ別の手順</h2>
        <p className="text-sm text-gray-500 mb-12">上から順に進めるだけで完成します</p>

        <div className="space-y-0">
          {wf.steps.map((step, i) => {
            const favicon = getToolFavicon(step.tool, allTools);
            const toolSlug = getToolSlug(step.tool, allTools);

            return (
              <div key={step.step}>
                {/* Step card */}
                <div className="relative grid grid-cols-[56px_1fr] md:grid-cols-[80px_1fr] gap-0">
                  {/* Timeline column */}
                  <div className="flex flex-col items-center">
                    <div className="relative z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-gray-900/20 ring-4 ring-white">
                      {step.step}
                    </div>
                    {(i < wf.steps.length - 1 || step.nextHint) && (
                      <div className="w-px flex-1 bg-gradient-to-b from-gray-300 to-gray-200 min-h-[24px]" />
                    )}
                  </div>

                  {/* Content card */}
                  <div className="pb-2">
                    <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 ml-2 md:ml-4">
                      {/* Card header */}
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 mb-1.5">{step.action}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            {favicon ? (
                              <img src={favicon} alt={step.tool} className="w-4 h-4 rounded-sm" />
                            ) : (
                              <div className="w-4 h-4 rounded-sm bg-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-500">{step.tool.charAt(0)}</div>
                            )}
                            <span className="font-medium text-gray-700">{step.tool}</span>
                          </div>
                        </div>
                        <span className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${
                          step.cost === '無料' || step.cost === '$0'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-indigo-50 text-indigo-700'
                        }`}>
                          {step.cost}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">{step.description}</p>

                      {/* Screenshot placeholder */}
                      <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mb-2">
                          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25c0 .828.672 1.5 1.5 1.5z" /></svg>
                        </div>
                        <p className="text-xs text-gray-400">スクリーンショット（準備中）</p>
                      </div>

                      {/* Tool link */}
                      {toolSlug && (
                        <Link href={`/tools/${toolSlug}`} className="inline-flex items-center gap-1.5 mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition">
                          {step.tool}の詳細を見る <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                {/* Connection hint between steps */}
                {step.nextHint && i < wf.steps.length - 1 && (
                  <div className="relative grid grid-cols-[56px_1fr] md:grid-cols-[80px_1fr] gap-0">
                    <div className="flex flex-col items-center">
                      <div className="w-px flex-1 bg-gradient-to-b from-gray-200 to-gray-300 min-h-[8px]" />
                      <div className="relative z-10 w-7 h-7 rounded-full bg-indigo-50 border-2 border-indigo-200 flex items-center justify-center">
                        <ArrowDown className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                      <div className="w-px flex-1 bg-gradient-to-b from-gray-300 to-gray-200 min-h-[8px]" />
                    </div>
                    <div className="flex items-center ml-2 md:ml-4 py-1">
                      <p className="text-xs text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg font-medium">
                        → {step.nextHint}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== FREE ALTERNATIVES ===== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <span className="text-lg">💡</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">完全無料でやる方法</h2>
              <p className="text-sm text-gray-500">有料ツールを使わなくても始められます</p>
            </div>
          </div>

          <div className="space-y-3">
            {wf.freeAlternatives.map((alt, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 border border-emerald-100/50">
                <div className="shrink-0 w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-gray-500 line-through">{alt.original}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="font-bold text-emerald-700">{alt.alternative}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{alt.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COST TABLE ===== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">料金まとめ</h2>
        <p className="text-sm text-gray-500 mb-8">このワークフローにかかる月額費用の内訳</p>

        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">ステップ</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">ツール</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">月額費用</th>
                </tr>
              </thead>
              <tbody>
                {wf.steps.map((step, i) => {
                  const favicon = getToolFavicon(step.tool, allTools);
                  return (
                    <tr key={step.step} className={`border-b border-gray-50 ${i % 2 === 1 ? 'bg-gray-50/50' : ''}`}>
                      <td className="px-6 py-4 text-sm text-gray-700">{step.action}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        <span className="inline-flex items-center gap-2">
                          {favicon ? (
                            <img src={favicon} alt={step.tool} className="w-4 h-4 rounded-sm" />
                          ) : (
                            <div className="w-4 h-4 rounded-sm bg-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-500">{step.tool.charAt(0)}</div>
                          )}
                          {step.tool}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-right">
                        <span className={`font-semibold ${
                          step.cost === '無料' || step.cost === '$0' ? 'text-emerald-600' : 'text-gray-900'
                        }`}>
                          {step.cost}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-gray-900">
                  <td className="px-6 py-4 text-sm font-bold text-white" colSpan={2}>月額合計</td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-lg font-bold text-white">{wf.monthlyCostJPY}</span>
                    <span className="text-xs text-gray-400 ml-1.5">({wf.monthlyCost})</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* ===== RELATED TOOLS ===== */}
      {relatedTools.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">使用するAIツール</h2>
          <p className="text-sm text-gray-500 mb-8">各ツールの詳細ページで機能・料金・代替ツールを確認できます</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {relatedTools.map((tool) => {
              if (!tool) return null;
              let faviconUrl: string | null = null;
              if (tool.officialUrl) {
                try {
                  const domain = new URL(tool.officialUrl).hostname;
                  faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
                } catch {}
              }
              return (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} className="group bg-white border border-gray-100 rounded-2xl p-5 hover:border-indigo-200 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 bg-gray-50 group-hover:bg-indigo-50 rounded-xl flex items-center justify-center mb-3 transition-colors overflow-hidden">
                    {faviconUrl ? (
                      <img src={faviconUrl} alt={tool.name} className="w-6 h-6" />
                    ) : (
                      <span className="text-lg font-bold text-gray-400 group-hover:text-indigo-500 transition-colors">{tool.name.charAt(0)}</span>
                    )}
                  </div>
                  <p className="font-semibold text-gray-900 text-sm mb-1">{tool.name}</p>
                  <p className="text-xs text-gray-500">{tool.category}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ===== TAGS ===== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        <div className="flex flex-wrap gap-2">
          {wf.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors cursor-default">
              #{tag}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
