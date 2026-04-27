import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllCategories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'AIツールカテゴリ一覧 | AI Kaetai',
  description: 'AIツールをカテゴリ別に探せます。文章生成、画像生成、動画生成、コーディング支援など13カテゴリ。',
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">カテゴリ一覧</h1>
        <p className="text-base text-gray-600">用途別にAIツールを探しましょう</p>
      </div>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group border border-gray-200 rounded-xl p-5 hover:border-cyan-300 hover:shadow-sm transition bg-white"
            >
              <h2 className="text-base font-bold text-gray-900 group-hover:text-cyan-700 transition mb-1">
                {cat.name}
              </h2>
              <p className="text-sm text-gray-500">{cat.toolCount}件のツール</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
