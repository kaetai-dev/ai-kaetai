import Link from 'next/link';
import {
  PenTool, Palette, Video, Music, Code, MessageCircle,
  BarChart3, Briefcase, Layers, Database, LucideIcon,
} from 'lucide-react';
import { Category } from '@/types';

const iconMap: Record<string, LucideIcon> = {
  PenTool,
  Palette,
  Video,
  Music,
  Code,
  MessageCircle,
  BarChart3,
  Briefcase,
  Layers,
  Database,
};

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon] ?? Layers;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg hover:border-cyan-300 dark:hover:border-cyan-700 hover:scale-[1.02] transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-cyan-50 dark:bg-cyan-900/30 rounded-xl group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/50 transition-colors">
          <Icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
              {category.name}
            </h3>
            <span className="flex-shrink-0 inline-flex items-center rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-xs font-medium px-2.5 py-0.5">
              {category.toolCount}件
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm font-medium text-cyan-600 dark:text-cyan-400 group-hover:gap-2 gap-1 transition-all">
        <span>ツールを見る</span>
        <svg
          className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
