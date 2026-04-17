import Link from 'next/link';
import { Tool } from '@/types';
import PricingBadge from './PricingBadge';
import ToolFaviconImage from './ToolFaviconImage';

interface ToolCardProps {
  tool: Tool;
  showAlternativeCount?: boolean;
  alternativeCount?: number;
}

export default function ToolCard({ tool, showAlternativeCount, alternativeCount }: ToolCardProps) {
  return (
    <div className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:border-cyan-400 dark:hover:border-cyan-600 transition-all duration-200">
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
          <ToolFaviconImage tool={tool} />
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
          className="block w-full text-center text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-white dark:hover:text-white bg-cyan-50 dark:bg-cyan-900/30 hover:bg-cyan-600 dark:hover:bg-cyan-600 border border-cyan-200 dark:border-cyan-800 hover:border-cyan-600 rounded-lg py-2 transition-all duration-200 hover:-translate-y-px hover:shadow"
        >
          詳細を見る
        </Link>
      </div>
    </div>
  );
}
