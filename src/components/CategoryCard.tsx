import Link from 'next/link';
import { getCategoryIcon } from '@/lib/categoryIcons';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = getCategoryIcon(category.icon);

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-cyan-300 hover:scale-[1.02] transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-cyan-50 rounded-xl group-hover:bg-cyan-100 transition-colors">
          <Icon className="w-6 h-6 text-cyan-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-base font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">
              {category.name}
            </h3>
            <span className="flex-shrink-0 inline-flex items-center rounded-full bg-cyan-100 text-cyan-700 text-xs font-medium px-2.5 py-0.5">
              {category.toolCount}件
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm font-medium text-cyan-600 group-hover:gap-2 gap-1 transition-all">
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
