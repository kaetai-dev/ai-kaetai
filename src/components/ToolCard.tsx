import Link from 'next/link';
import { Tool } from '@/types';
import PricingBadge from './PricingBadge';

interface ToolCardProps {
  tool: Tool;
  showAlternativeCount?: boolean;
  alternativeCount?: number;
}

const gradientColors: Record<string, string> = {
  chatgpt: 'from-emerald-400 to-teal-600',
  claude: 'from-orange-400 to-amber-600',
  gemini: 'from-blue-400 to-indigo-600',
  midjourney: 'from-violet-400 to-purple-700',
  'stable-diffusion': 'from-pink-400 to-rose-600',
  'dall-e': 'from-cyan-400 to-sky-600',
  'github-copilot': 'from-gray-700 to-gray-900',
  cursor: 'from-indigo-400 to-violet-600',
  tabnine: 'from-blue-500 to-cyan-600',
  runway: 'from-red-400 to-pink-600',
  descript: 'from-green-400 to-emerald-600',
  pika: 'from-yellow-400 to-orange-500',
  suno: 'from-purple-400 to-fuchsia-600',
  elevenlabs: 'from-orange-400 to-red-600',
  udio: 'from-teal-400 to-cyan-600',
  jasper: 'from-rose-400 to-pink-600',
  'copy-ai': 'from-violet-400 to-indigo-600',
  'notion-ai': 'from-gray-400 to-slate-600',
  perplexity: 'from-sky-400 to-blue-600',
  'adobe-firefly': 'from-red-400 to-orange-600',
};

function ToolImagePlaceholder({ tool }: { tool: Tool }) {
  const gradient = gradientColors[tool.slug] || 'from-indigo-400 to-indigo-600';
  const initials = tool.name
    .split(/[\s.]+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} rounded-lg`}
    >
      <span className="text-2xl font-bold text-white select-none">{initials}</span>
    </div>
  );
}

export default function ToolCard({ tool, showAlternativeCount, alternativeCount }: ToolCardProps) {
  return (
    <div className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200">
      {/* Image */}
      <div className="h-32 w-full overflow-hidden">
        {tool.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={tool.imageUrl}
            alt={tool.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <ToolImagePlaceholder tool={tool} />
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-medium px-2 py-0.5">
            {tool.category}
          </span>
          <PricingBadge pricing={tool.pricing} />
          {showAlternativeCount && alternativeCount !== undefined && alternativeCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium px-2 py-0.5">
              代替 {alternativeCount}件
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
          {tool.name}
        </h3>

        {/* Short description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
          {tool.shortDescription}
        </p>

        {/* Rating */}
        {tool.rating && (
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(tool.rating!)
                    ? 'text-yellow-400'
                    : i < tool.rating!
                    ? 'text-yellow-300'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-gray-500 dark:text-gray-500 ml-1">{tool.rating.toFixed(1)}</span>
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/tools/${tool.slug}`}
          className="block w-full text-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-white dark:hover:text-white bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-600 dark:hover:bg-indigo-600 border border-indigo-200 dark:border-indigo-800 hover:border-indigo-600 rounded-lg py-2 transition-all duration-200"
        >
          詳細を見る
        </Link>
      </div>
    </div>
  );
}
