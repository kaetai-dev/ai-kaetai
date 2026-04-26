import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-xs text-gray-400 tracking-widest uppercase mb-3">サイト</p>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">ホーム</Link></li>
              <li><Link href="/workflows" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">ワークフロー</Link></li>
              <li><Link href="/comparisons" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">ツール比較</Link></li>
              <li><Link href="/combinations" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">ツール組み合わせ</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs text-gray-400 tracking-widest uppercase mb-3">カテゴリ</p>
            <ul className="space-y-2">
              <li><Link href="/categories/chatbot" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">AIチャット</Link></li>
              <li><Link href="/categories/image" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">画像生成</Link></li>
              <li><Link href="/categories/video" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">動画生成</Link></li>
              <li><Link href="/categories/coding" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">コーディング支援</Link></li>
              <li><Link href="/categories/writing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">文章生成</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs text-gray-400 tracking-widest uppercase mb-3">人気の代替</p>
            <ul className="space-y-2">
              <li><Link href="/alternatives/chatgpt" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">ChatGPTの代替</Link></li>
              <li><Link href="/alternatives/midjourney" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Midjourneyの代替</Link></li>
              <li><Link href="/alternatives/github-copilot" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">GitHub Copilotの代替</Link></li>
              <li><Link href="/alternatives/suno" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Sunoの代替</Link></li>
              <li><Link href="/alternatives/elevenlabs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">ElevenLabsの代替</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs text-gray-400 tracking-widest uppercase mb-3">AI Kaetai</p>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              AIツールの代わりを日本語で比較・検索できるディレクトリ。
            </p>
            <ul className="space-y-2">
              <li><Link href="/disclaimer" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">免責事項</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 leading-relaxed">
            ※ 当サイトはアフィリエイト広告を掲載しています。掲載されているリンクから商品・サービスを購入された場合、当サイトに報酬が発生することがありますが、コンテンツの内容には一切影響しません。
          </p>
          <p className="text-xs text-gray-400 mt-3">
            &copy; 2026 AI Kaetai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
