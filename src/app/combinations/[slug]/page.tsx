import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllCombinations, getCombinationBySlug } from '@/lib/combinations';
import { getAllTools } from '@/lib/data';
import { ChevronRight, CheckCircle, ExternalLink } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllCombinations().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const combo = getCombinationBySlug(params.slug);
  if (!combo) return {};
  return {
    title: combo.title + ' - AI Kaetai',
    description: combo.description,
    openGraph: { title: combo.title, description: combo.description, type: 'article' },
  };
}

function getFavicon(toolSlug: string, allTools: ReturnType<typeof getAllTools>): string | null {
  const tool = allTools.find(t => t.slug === toolSlug);
  if (tool && tool.officialUrl) {
    try { return 'https://www.google.com/s2/favicons?domain=' + new URL(tool.officialUrl).hostname + '&sz=64'; }
    catch { return null; }
  }
  return null;
}

export default function CombinationDetailPage({ params }: Props) {
  const combo = getCombinationBySlug(params.slug);
  if (!combo) notFound();
  const allTools = getAllTools();
  const favA = getFavicon(combo.toolASlug, allTools);
  const favB = getFavicon(combo.toolBSlug, allTools);

  return (
    <>
      <section className="relative overflow-hidden bg-[#0a0a0f]">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-16 relative z-10">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-10">
            <Link href="/" className="hover:text-gray-300 transition">ホーム</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/combinations" className="hover:text-gray-300 transition">組み合わせ</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-400">{combo.toolA} x {combo.toolB}</span>
          </nav>
          <span className="text-xs font-medium text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full">{combo.category}</span>
          <div className="flex items-center gap-4 mt-6 mb-5">
            <div className="flex items-center gap-2">
              {favA && <img src={favA} alt={combo.toolA} className="w-8 h-8 rounded-lg border border-white/10" />}
              <span className="text-xl font-bold text-white">{combo.toolA}</span>
            </div>
            <span className="text-2xl font-bold text-purple-400">x</span>
            <div className="flex items-center gap-2">
              {favB && <img src={favB} alt={combo.toolB} className="w-8 h-8 rounded-lg border border-white/10" />}
              <span className="text-xl font-bold text-white">{combo.toolB}</span>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">{combo.title}</h1>
          <p className="text-base text-gray-400 leading-relaxed max-w-3xl mb-6">{combo.description}</p>
          <p className="text-sm text-gray-500">活用シーン: {combo.useCase}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">組み合わせワークフロー</h2>
        <p className="text-sm text-gray-500 mb-10">この順番で進めるだけで完成します</p>
        <div className="space-y-0">
          {combo.steps.map((step, i) => (
            <div key={step.step} className="relative grid grid-cols-[56px_1fr] md:grid-cols-[80px_1fr] gap-0">
              <div className="flex flex-col items-center">
                <div className="relative z-10 w-11 h-11 md:w-12 md:h-12 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold shadow-lg ring-4 ring-white">{step.step}</div>
                {i < combo.steps.length - 1 && <div className="w-px flex-1 bg-gradient-to-b from-purple-300 to-purple-200 min-h-[24px]" />}
              </div>
              <div className="pb-6">
                <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 ml-2 md:ml-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{step.action}</h3>
                    <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">{step.tool}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">この組み合わせのメリット</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {combo.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3 bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-purple-100/50">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">使用するツール</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[{ name: combo.toolA, slug: combo.toolASlug, fav: favA }, { name: combo.toolB, slug: combo.toolBSlug, fav: favB }].map((t) => (
            <Link key={t.slug} href={'/tools/' + t.slug} className="group flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:border-purple-200 hover:shadow-md transition-all">
              {t.fav ? <img src={t.fav} alt={t.name} className="w-10 h-10 rounded-xl" /> : <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-400">{t.name.charAt(0)}</div>}
              <div className="flex-1">
                <p className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">{t.name}</p>
                <p className="text-xs text-gray-500">詳細を見る</p>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-purple-400 transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-16">
        <div className="flex flex-wrap gap-2">
          {combo.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full">#{'{'}tag{'}'}</span>
          ))}
        </div>
      </section>
    </>
  );
}
