import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-lg">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">AI Kaetai</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              「○○の代わりになるAIツール」を日本語で比較・検索できるディレクトリサイト。
              あなたに合ったAIツールの代替を見つけましょう。
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">リンク</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/categories/writing"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  カテゴリ一覧
                </Link>
              </li>
              <li>
                <Link
                  href="/tools/cursor"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  新着ツール
                </Link>
              </li>
              <li>
                <Link
                  href="/alternatives/chatgpt"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  人気の代替ツール
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  免責事項
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular alternatives */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">よく検索される代替</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/alternatives/chatgpt"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  ChatGPTの代替
                </Link>
              </li>
              <li>
                <Link
                  href="/alternatives/midjourney"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Midjourneyの代替
                </Link>
              </li>
              <li>
                <Link
                  href="/alternatives/github-copilot"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  GitHub Copilotの代替
                </Link>
              </li>
              <li>
                <Link
                  href="/alternatives/suno"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Sunoの代替
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 space-y-3">
          <p className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
            ※ 当サイトはアフィリエイト広告を掲載しています。掲載されているリンクから商品・サービスを購入された場合、
            当サイトに報酬が発生することがありますが、コンテンツの内容には一切影響しません。
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © 2026 AI Kaetai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
