import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllWorkflows } from '@/lib/workflows';
import { getAllTools } from '@/lib/data';
import { Clock, DollarSign, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AIワークフロー一覧｜やりたいことから逆引き - AI Kaetai',
  description: 'YouTubeの動画制作、ブログ自動化、SNS運用など、やりたいことから最適なAIツールの組み合わせを見つけよう。',
};

function getFav(toolName: string, allTools: any[]): string | null {
  const n = toolName.toLowerCase().replace(/\s+/g, '');
  const tool = allTools.find((t: any) => {
    const tn = t.name.toLowerCase().replace(/\s+/g, '');
    return tn === n || tn.includes(n) || n.includes(tn);
  });
  if (tool && tool.officialUrl) {
    try { return 'https://www.google.com/s2/favicons?domain=' + new URL(tool.officialUrl).hostname + '&sz=64'; }
    catch { return null; }
  }
  return null;
}

export default function WorkflowsPage() {
  const workflows = getAllWorkflows();
  const allTools = getAllTools();
  const categories = Array.from(new Set(workflows.map(w => w.category)));

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">AIワークフロー</h1>
        <p className="text-base text-gray-600">やりたいことから最適なAIツールの組み合わせを見つけよう</p>
      </div>

      {categories.map((cat) => (
        <section key={cat} className="max-w-5xl mx-auto px-4 sm:px-6 pb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-600 rounded-full" />{cat}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {workflows.filter(w => w.category === cat).map((wf) => {
              const toolFavs = wf.steps.slice(0, 3).map(s => getFav(s.tool, allTools)).filter(Boolean);
              return (
                <Link key={wf.slug} href={'/workflows/' + wf.slug} className="group border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition bg-white">
                  <div className="flex items-center gap-1.5 mb-3">
                    {toolFavs.map((f, i) => <img key={i} src={f as string} alt="" className="w-5 h-5 rounded" />)}
                    {wf.steps.length > 3 && <span className="text-xs text-gray-400">+{wf.steps.length - 3}</span>}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition mb-1.5 line-clamp-2">{wf.shortTitle}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{wf.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{wf.timeEstimate.split('（')[0]}</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" />{wf.monthlyCostJPY}</span>
                    <ArrowRight className="w-3 h-3 ml-auto group-hover:text-blue-400 transition" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </>
  );
}
