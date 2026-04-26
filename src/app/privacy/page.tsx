import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー - AI Kaetai',
  description: 'AI Kaetaiのプライバシーポリシーについて',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">プライバシーポリシー</h1>
      
      <div className="prose prose-sm prose-gray max-w-none space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">広告について</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            当サイトでは、Google AdSenseによる広告配信を行っております。Google AdSenseでは、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。Cookieを使用することにより、GoogleはユーザーがそのサイトやGoogle広告ネットワークのサイトにアクセスした際の情報に基づき、適切な広告を表示します。
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            ユーザーは、Googleの広告設定ページ（https://adssettings.google.com）でパーソナライズ広告を無効にすることができます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">アクセス解析について</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            当サイトでは、Googleが提供するアクセス解析ツールを利用しています。このツールはCookieを使用してデータを収集しますが、個人を特定する情報は含まれません。データ収集はCookieを無効にすることで拒否できます。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">アフィリエイトについて</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            当サイトはアフィリエイト広告を掲載しています。掲載されているリンクから商品・サービスを購入された場合、当サイトに報酬が発生することがありますが、コンテンツの内容には一切影響しません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">免責事項</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            当サイトに掲載されている情報の正確性には万全を期しておりますが、その内容を保証するものではありません。当サイトの利用により生じたいかなる損害についても、当サイトは一切の責任を負いかねますのでご了承ください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">著作権について</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            当サイトに掲載されている文章・画像等の著作権は、当サイトまたは各権利者に帰属します。無断転載・複製はご遠慮ください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">お問い合わせ</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            当サイトに関するお問い合わせは、サイト内のお問い合わせフォームよりご連絡ください。
          </p>
        </section>

        <p className="text-xs text-gray-400 mt-8">制定日: 2026年4月26日</p>
      </div>
    </div>
  );
}
