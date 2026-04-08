import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-kaetai.com';
const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-EE7ZD8HJZV';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AI Kaetai - AIツールの代替を日本語で探す',
    template: '%s | AI Kaetai',
  },
  description:
    'ChatGPT、Midjourney、GitHub Copilotなど人気AIツールの代替を日本語で比較・検索できるディレクトリ。あなたに合ったAIツールの代替を見つけましょう。',
  keywords: ['AIツール', '代替', 'AI比較', 'ChatGPT代替', '画像生成AI', '文章生成AI', '日本語'],
  authors: [{ name: 'AI Kaetai' }],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: siteUrl,
    siteName: 'AI Kaetai',
    title: 'AI Kaetai - AIツールの代替を日本語で探す',
    description:
      'ChatGPT、Midjourney、GitHub Copilotなど人気AIツールの代替を日本語で比較・検索できるディレクトリ。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Kaetai - AIツールの代替を日本語で探す',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Kaetai - AIツールの代替を日本語で探す',
    description: 'ChatGPT、Midjourneyなど人気AIツールの代替を日本語で比較・検索できるディレクトリ。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var stored = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored === 'dark' || (!stored && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />

        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
