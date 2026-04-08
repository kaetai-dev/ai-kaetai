# AI-KAETAI.COM プロジェクト計画
最終更新: 2026-04-08

## コンセプト
日本語・英語対応のAIツールディレクトリサイト。収益はアフィリエイトのみ。

## 進捗状況

### ✅ Phase 0: 準備（完了）
- ドメイン: ai-kaetai.com（Cloudflare, $10.46/年）
- GitHub: kaetai-dev/ai-kaetai
- Vercel: ai-kaetai.vercel.app → www.ai-kaetai.com
- Supabase: リンク済み
- Claude Code: インストール済み
- gh CLI: インストール・認証済み（SSH不要、HTTPS+gh auth方式）

### ✅ Phase 1: サイト構築・デプロイ（完了）
- Next.js 14 + Supabase + Tailwind CSS
- 27ファイル構成
- Vercelデプロイ成功
- Cloudflare DNS設定完了（A: @ → 216.198.79.1, CNAME: www → cname.vercel-dns.com）

### ✅ Phase 2: データ拡張（完了 2026-04-08）
- 5カテゴリ → 10カテゴリに拡張
- 20ツール → 100ツールに拡張
- src/lib/data.ts 全面書き換え（1977行追加・364行削除）
- getTotalAlternativesCount関数追加修正
- ビルド・デプロイ成功確認済み

### ⬜ Phase 3: アフィリエイト登録（未着手）
- A8.net、もしもアフィリエイト、PartnerStack、Impact
- 対象: Jasper 30%, Surfer SEO 25%, Writesonic 30%, Copy.ai 20%, Notion 50%, Canva 36%, Grammarly $25/件, Synthesia 20%, Descript 15%

### ⬜ Phase 4: SEO設定（未着手）
- Google Search Console登録
- Google Analytics設定
- バックリンク獲得（Reddit, Product Hunt, X）

### ⬜ Phase 5: 自動化（未着手）
- N8N/Make.com: RSSモニタリング → Claude要約 → Supabase保存
- 月次リンクチェック
- Beehiivニュースレター

## 10カテゴリ
1. 文章生成（ライティング） - writing
2. 画像生成 - image
3. 動画生成 - video
4. 音楽・音声生成 - audio
5. コーディング支援 - coding
6. チャットボット・会話AI - chatbot
7. SEO・マーケティング - seo-marketing
8. ビジネス・生産性 - business
9. デザイン・UI - design
10. データ分析・リサーチ - data-research

## 技術スタック
- ホスティング: Vercel（無料、100GB/月）
- DB: Supabase（無料、500MB）
- DNS: Cloudflare（$10.46/年）
- リポジトリ: GitHub kaetai-dev/ai-kaetai
- 開発: Claude Code（Pro $20/月）
- 分析: GSC/GA（無料）
- 自動化: N8N/Make.com（無料枠）

## アカウント情報
- GitHub: kaetai-dev（認証: gh CLI, HTTPS方式）
- Vercel: GitHubリンク済み、自動デプロイ有効
- Cloudflare: ai-kaetai.com管理
- ライブURL: https://www.ai-kaetai.com（https://ai-kaetai.com も有効）

## 収益シミュレーション（保守的）
- 1-3ヶ月: 500-3,000 PV → ¥0-5,000/月
- 4-6ヶ月: 5,000-30,000 PV → ¥5,000-50,000/月
- 7-12ヶ月: 30,000-100,000 PV → ¥50,000-200,000/月
- 13ヶ月+: 100,000+ PV → ¥200,000-500,000/月

## 初期投資
- ドメイン: $10.46/年（~¥1,500）
- Claude Pro: $20/月
- Claude API（データ生成）: ¥1,000-3,000
- 合計: ~¥2,500-4,500

## 次のアクション
1. Phase 3: アフィリエイトASP登録
2. Phase 4: GSC/GA設定
3. カテゴリページの充実・デザイン改善
