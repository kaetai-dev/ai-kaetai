import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: '免責事項・プライバシーポリシー',
  description:
    'AI Kaetaiの免責事項、アフィリエイト広告に関する開示、プライバシーポリシーについて説明しています。',
  robots: {
    index: true,
    follow: true,
  },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'ホーム', href: '/' }, { label: '免責事項' }]} />

      <div className="mt-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          免責事項・プライバシーポリシー
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          最終更新日：2026年4月
        </p>

        <div className="space-y-10 text-gray-700 dark:text-gray-300">
          {/* アフィリエイト広告 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-800">
              アフィリエイト広告について
            </h2>
            <p className="leading-relaxed mb-3">
              当サイト「AI Kaetai」（以下、当サイト）は、アフィリエイトプログラムに参加しています。
              当サイト内の一部リンクは、アフィリエイトリンクとなっており、当該リンクを経由して商品・
              サービスをご購入いただいた場合、当サイトに対して報酬が発生することがあります。
            </p>
            <p className="leading-relaxed mb-3">
              掲載しているアフィリエイトプログラムには以下が含まれます：
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed ml-4">
              <li>PartnerStack（Jasper、Writesonic、Copy.ai 等）</li>
              <li>Impact（Canva、Grammarly、Notion 等）</li>
              <li>A8.net（国内各社）</li>
              <li>もしもアフィリエイト（国内各社）</li>
              <li>各サービス独自のアフィリエイトプログラム</li>
            </ul>
            <p className="leading-relaxed mt-3">
              アフィリエイトリンクであることは、各リンク近傍または各ページに明示しています。
              アフィリエイト報酬の有無は、当サイトが掲載するコンテンツの内容・評価・推薦度に
              一切影響を与えません。
            </p>
          </section>

          {/* 情報の正確性 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-800">
              情報の正確性について
            </h2>
            <p className="leading-relaxed mb-3">
              当サイトに掲載している各AIツールの情報（料金、機能、サービス内容等）は、
              記事公開時点の情報に基づいています。AIツール市場は急速に変化しており、
              サービスの仕様・料金・提供状況は予告なく変更される場合があります。
            </p>
            <p className="leading-relaxed">
              最新の情報は必ず各ツールの公式ウェブサイトにてご確認ください。
              当サイトの情報の正確性・最新性について、当サイトは一切の保証をいたしかねます。
            </p>
          </section>

          {/* 外部リンク */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-800">
              外部リンクについて
            </h2>
            <p className="leading-relaxed">
              当サイトからリンクしている外部ウェブサイトのコンテンツ・運営については、
              当サイトは責任を負いかねます。外部サイトの利用規約・プライバシーポリシー等は、
              各サイトのものが適用されます。
            </p>
          </section>

          {/* 著作権 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-800">
              著作権について
            </h2>
            <p className="leading-relaxed mb-3">
              当サイトに掲載されているテキスト・画像・その他のコンテンツの著作権は、
              当サイト（AI Kaetai）に帰属します。無断転載・複製・改変を禁じます。
            </p>
            <p className="leading-relaxed">
              各AIツールのロゴ・名称・トレードマーク等は、それぞれの権利者に帰属します。
              当サイトはこれらの権利者と公式な提携関係にない場合があります。
            </p>
          </section>

          {/* プライバシーポリシー */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-800">
              プライバシーポリシー
            </h2>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mt-4 mb-2">
              収集する情報
            </h3>
            <p className="leading-relaxed mb-3">
              当サイトでは、Google Analytics（Googleアナリティクス）を利用してアクセス情報を収集しています。
              収集される情報にはIPアドレス、ブラウザ情報、ページ閲覧履歴等が含まれますが、
              個人を特定できる情報は収集していません。
            </p>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mt-4 mb-2">
              Cookieの使用
            </h3>
            <p className="leading-relaxed mb-3">
              当サイトでは、利便性向上（ダークモード設定の保存等）のためにCookieおよびローカルストレージを使用することがあります。
              ブラウザの設定からCookieを無効にすることができますが、一部機能が正常に動作しない場合があります。
            </p>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mt-4 mb-2">
              Google Analyticsについて
            </h3>
            <p className="leading-relaxed">
              Google Analyticsはデータの収集のためにCookieを使用しています。
              Google Analyticsによるデータ収集を無効にしたい場合は、
              Google アナリティクス オプトアウト アドオンをご利用ください。
              詳細はGoogleのプライバシーポリシーをご確認ください。
            </p>
          </section>

          {/* 免責事項 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-800">
              免責事項
            </h2>
            <p className="leading-relaxed mb-3">
              当サイトの情報を利用したことにより生じたいかなる損害（直接的・間接的損害を含む）について、
              当サイトは一切の責任を負いかねます。AIツールの選択・購入・利用は、
              利用者ご自身の判断と責任において行ってください。
            </p>
            <p className="leading-relaxed">
              当サイトは予告なくコンテンツの変更・追加・削除を行う場合があります。
              また、サービスの停止・終了を行う場合があります。
              これらにより生じたいかなる損害についても、当サイトは責任を負いかねます。
            </p>
          </section>

          {/* 運営者情報 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-gray-800">
              運営者情報
            </h2>
            <dl className="space-y-2 text-sm">
              <div className="flex gap-4">
                <dt className="w-28 flex-shrink-0 font-medium text-gray-900 dark:text-white">サイト名</dt>
                <dd>AI Kaetai（AIかえたい）</dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-28 flex-shrink-0 font-medium text-gray-900 dark:text-white">URL</dt>
                <dd>
                  <a
                    href="https://ai-kaetai.com"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    https://ai-kaetai.com
                  </a>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-28 flex-shrink-0 font-medium text-gray-900 dark:text-white">コンセプト</dt>
                <dd>AIツールの代替を日本語で比較・検索できるディレクトリ</dd>
              </div>
              <div className="flex gap-4">
                <dt className="w-28 flex-shrink-0 font-medium text-gray-900 dark:text-white">収益モデル</dt>
                <dd>アフィリエイト広告（ユーザーとの金銭取引なし）</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
