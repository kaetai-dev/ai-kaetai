import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllWorkflows, getWorkflowBySlug } from '@/lib/workflows';
import { getAllTools } from '@/lib/data';
import { ChevronRight, Clock, DollarSign, Zap, ArrowDown, ExternalLink } from 'lucide-react';

interface Props { params: { slug: string }; }

export async function generateStaticParams() {
  return getAllWorkflows().map((wf) => ({ slug: wf.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const wf = getWorkflowBySlug(params.slug);
  if (wf == null) return {};
  return {
    title: wf.title + ' - AI Kaetai',
    description: wf.description,
    openGraph: { title: wf.title, description: wf.description, type: 'article' },
  };
}

const FAVICON_OVERRIDES: Record<string, string> = {
  'YouTube Studio': 'https://www.google.com/s2/favicons?domain=studio.youtube.com&sz=64',
  'YouTube': 'https://www.google.com/s2/favicons?domain=youtube.com&sz=64',
  'Buffer': 'https://www.google.com/s2/favicons?domain=buffer.com&sz=64',
  'WordPress': 'https://www.google.com/s2/favicons?domain=wordpress.com&sz=64',
  'Zoom': 'https://www.google.com/s2/favicons?domain=zoom.us&sz=64',
  'Google Meet': 'https://www.google.com/s2/favicons?domain=meet.google.com&sz=64',
  'Audacity': 'https://www.google.com/s2/favicons?domain=audacityteam.org&sz=64',
  'AutoShorts.ai': 'https://www.google.com/s2/favicons?domain=autoshorts.ai&sz=64',
  'vidIQ': 'https://www.google.com/s2/favicons?domain=vidiq.com&sz=64',
  'CapCut': 'https://www.google.com/s2/favicons?domain=capcut.com&sz=64',
  'Pictory': 'https://www.google.com/s2/favicons?domain=pictory.ai&sz=64',
  'Vrew': 'https://www.google.com/s2/favicons?domain=vrew.ai&sz=64',
  'Gamma AI': 'https://www.google.com/s2/favicons?domain=gamma.app&sz=64',
  'Suno': 'https://www.google.com/s2/favicons?domain=suno.com&sz=64',
  'tl;dv': 'https://www.google.com/s2/favicons?domain=tldv.io&sz=64',
  'Mailchimp': 'https://www.google.com/s2/favicons?domain=mailchimp.com&sz=64',
  'ManyChat': 'https://www.google.com/s2/favicons?domain=manychat.com&sz=64',
  'Xmind AI': 'https://www.google.com/s2/favicons?domain=xmind.app&sz=64',
  'Webflow': 'https://www.google.com/s2/favicons?domain=webflow.com&sz=64',
  'Amazon KDP': 'https://www.google.com/s2/favicons?domain=kdp.amazon.com&sz=64',
  'DeepL': 'https://www.google.com/s2/favicons?domain=deepl.com&sz=64',
};

function getToolFavicon(toolName: string, allTools: any[]): string | null {
  if (FAVICON_OVERRIDES[toolName]) return FAVICON_OVERRIDES[toolName];
  const n = toolName.toLowerCase().replace(/\s+/g, '');
  const tool = allTools.find((t: any) => {
    const tn = t.name.toLowerCase().replace(/\s+/g, '');
    return tn === n || (tn.length > 3 && n.includes(tn)) || (n.length > 3 && tn.includes(n));
  });
  if (tool && tool.officialUrl) {
    try { return 'https://www.google.com/s2/favicons?domain=' + new URL(tool.officialUrl).hostname + '&sz=64'; }
    catch { return null; }
  }
  return null;
}

function getToolSlug(toolName: string, allTools: any[]): string | null {
  if (FAVICON_OVERRIDES[toolName]) return null;
  const n = toolName.toLowerCase().replace(/\s+/g, '');
  const tool = allTools.find((t: any) => {
    const tn = t.name.toLowerCase().replace(/\s+/g, '');
    return tn === n || tn.includes(n) || n.includes(tn);
  });
  return tool ? tool.slug : null;
}

export default function WorkflowDetailPage({ params }: Props) {
  const workflow = getWorkflowBySlug(params.slug);
  if (workflow == null) notFound();
  const allTools = getAllTools();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: workflow.title,
    description: workflow.description,
    step: workflow.steps.map((s) => ({
      '@type': 'HowToStep',
      name: s.action,
      text: s.description,
      itemListElement: { '@type': 'HowToTool', name: s.tool },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        <nav className="flex items-center gap-1.5 text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-700 transition">ホーム</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/workflows" className="hover:text-gray-700 transition">ワークフロー</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-600">{workflow.shortTitle}</span>
        </nav>
      </div>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">{workflow.category}</span>
          <span className="text-xs font-medium bg-green-50 text-green-700 px-2.5 py-1 rounded-full">{workflow.difficulty}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-3">{workflow.title}</h1>
        <p className="text-base text-gray-600 leading-relaxed mb-6">{workflow.description}</p>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>{workflow.timeEstimate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span>月額 {workflow.monthlyCostJPY}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Zap className="w-4 h-4 text-gray-400" />
            <span>{workflow.steps.length}ステップ</span>
          </div>
        </div>

        {/* Tool icons row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-500 mr-1">使用ツール:</span>
          {workflow.steps.map((s) => {
            const fav = getToolFavicon(s.tool, allTools);
            const slug = getToolSlug(s.tool, allTools);
            return fav ? (
              <div key={s.step} className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
                <img src={fav} alt={s.tool} className="w-4 h-4 rounded" />
                {slug ? (
                  <Link href={'/tools/' + slug} className="text-xs font-medium text-gray-700 hover:text-blue-600 transition">{s.tool}</Link>
                ) : (
                  <span className="text-xs font-medium text-gray-700">{s.tool}</span>
                )}
              </div>
            ) : (
              <span key={s.step} className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 font-medium text-gray-700">{s.tool}</span>
            );
          })}
        </div>
      </section>

      <hr className="max-w-4xl mx-auto border-gray-100" />

      {/* About */}
      {workflow.longDescription && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">このワークフローについて</h2>
          <p className="text-sm text-gray-600 leading-[1.8]">{workflow.longDescription}</p>
        </section>
      )}

      {/* Steps */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-lg font-bold text-gray-900 mb-6">ステップ別の手順</h2>
        <div className="space-y-3">
          {workflow.steps.map((step, i) => {
            const fav = getToolFavicon(step.tool, allTools);
            const slug = getToolSlug(step.tool, allTools);
            return (
              <div key={step.step}>
                <div className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white hover:border-gray-300 transition">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">{step.step}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="text-base font-bold text-gray-900">{step.action}</h3>
                        <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full shrink-0">{step.cost}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mb-2">
                        {fav && <img src={fav} alt={step.tool} className="w-4 h-4 rounded" />}
                        {slug ? (
                          <Link href={'/tools/' + slug} className="text-sm text-blue-600 hover:underline">{step.tool}</Link>
                        ) : (
                          <span className="text-sm text-gray-700">{step.tool}</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
                {step.nextHint && i < workflow.steps.length - 1 && (
                  <div className="flex items-center gap-2 py-2 pl-4">
                    <ArrowDown className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs text-blue-600">{step.nextHint}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Free Alternatives */}
      {workflow.freeAlternatives && workflow.freeAlternatives.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">無料で始める代替案</h2>
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">ツール</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">代替先</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 hidden sm:table-cell">制限事項</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {workflow.freeAlternatives.map((alt, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-gray-900">{alt.original}</td>
                    <td className="px-4 py-3 text-blue-600 font-medium">{alt.alternative}</td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{alt.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Cost Table */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">月額コストまとめ</h2>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">ステップ</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">ツール</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">月額</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {workflow.steps.map((s) => (
                <tr key={s.step} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-900">Step {s.step}</td>
                  <td className="px-4 py-3 text-gray-700">{s.tool}</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-900">{s.cost}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-blue-50">
              <tr>
                <td colSpan={2} className="px-4 py-3 font-bold text-gray-900">合計（目安）</td>
                <td className="px-4 py-3 text-right font-bold text-blue-700">{workflow.monthlyCostJPY}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* Tags */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-12">
        <div className="flex flex-wrap gap-2">
          {workflow.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">#{tag}</span>
          ))}
        </div>
      </section>
    </>
  );
}
