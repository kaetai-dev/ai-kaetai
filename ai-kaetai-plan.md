# AI Kaetai プロジェクト計画書
最終更新: 2026-04-11

## コンセプト
- 日英バイリンガルAIツールディレクトリサイト
- 収益モデル: アフィリエイト専業

## 完了済み

### Phase 0 – 環境構築 ✅
- ドメイン: ai-kaetai.com (Cloudflare $10.46/yr)
- GitHub: kaetai-dev/ai-kaetai
- Vercel: GitHub連携、自動デプロイ
- Supabase: 無料プラン
- Claude Code + gh CLI認証済み

### Phase 1 – サイト構築・デプロイ ✅
- Next.js 14 + Supabase + Tailwind CSS
- 27ファイル構成
- DNS: A @ → 216.198.79.1, CNAME www → cname.vercel-dns.com
- 公開: https://www.ai-kaetai.com

### Phase 2 – コンテンツ拡張 ✅
- カテゴリ: 5→10 (writing, image, video, audio, coding, chatbot, seo-marketing, business, design, data-research)
- ツール: 20→100
- src/lib/data.ts 全面書き換え (+1977行, -364行)
- getTotalAlternativesCount 関数追加
- ビルド・デプロイ成功

### Phase 4 – SEO設定 (一部完了) ✅
- Google Search Console: 登録完了、サイトマップ送信済み
- Google Analytics: G-EE7ZD8HJZV 設置・デプロイ済み

### Phase 3 – アフィリエイト登録 (進行中)
#### 登録済みアカウント
- A8.net: 登録済み
- もしもアフィリエイト: 登録済み
- Impact.com: アカウント作成済み (マーケットプレイス拒否、ブランド直接応募は可能、プロフィール未完成)
- PartnerStack: アカウント作成済み
- PayPal: アカウント作成済み (報酬受取用)

#### アフィリエイト申請状況
| ツール | プラットフォーム | 状況 | コミッション | リンク管理 |
|---|---|---|---|---|
| Writesonic | 独自 | Pending | 30% recurring | affiliates.writesonic.com |
| HeyGen | Rewardful | 登録完了 | 35% x 3ヶ月 | heygen.getrewardful.com |
| Synthesia | Rewardful | 登録完了 | 25% recurring 12ヶ月 | synthesia.getrewardful.com |
| ElevenLabs | PartnerStack | 登録完了 | 22% recurring 12ヶ月 | ElevenLabsアプリ内 |
| Murf AI | PartnerStack | 申請処理待ち | 20% recurring 24ヶ月 | dash.partnerstack.com |
| Descript | PartnerStack | 申請済み | 15% recurring | dash.partnerstack.com |
| Grammarly | Impact.com | 拒否 (トラフィック不足) | - | - |
| Notion | - | 募集停止中 | - | - |
| Copy.ai | - | プログラム消滅 | - | - |
| Canva | Canvassador | 締切済み (2026/4/1) | - | - |
| Cursor | - | プログラムなし | - | - |

#### 発行済みアフィリエイトリンク
- ElevenLabs: https://try.elevenlabs.io/gxgtkhgqtmlt

#### 報酬管理画面
1. Rewardful → HeyGen, Synthesia
2. PartnerStack → ElevenLabs, Murf AI, Descript
3. Writesonic独自 → Writesonic
4. Impact.com → (今後Jasper, Grammarly再申請用)

### その他設定済み
- Cloudflareメール転送: admin@ai-kaetai.com → Gmail
- Impact.com サイト検証: insertAdjacentHTMLで実装 (クローラー問題あり、要修正)

## 未着手

### Phase 3 残タスク
1. Impact.comプロフィール完成 → Jasper応募
2. Surfer SEO申請 (PartnerStack経由)
3. Pictory再申請 (確認メール未着)
4. InVideo再申請 (登録ボタン不具合)
5. Runway申請 (affiliates.runwayml.com)
6. 承認済みリンクをdata.tsに設置
7. Grammarly再申請 (トラフィック増加後)

### Phase 4 残タスク
- SEOバックリンク: Reddit, Product Hunt, X投稿

### Phase 5 – 自動化 (未着手)
- N8N/Make.com RSS → Claude要約 → Supabase
- 月次リンクチェック
- Beehiivニュースレター

## 技術スタック
- Vercel (無料, 100GB/月)
- Supabase (無料, 500MB)
- Cloudflare DNS
- GitHub: kaetai-dev/ai-kaetai
- Claude Code Pro $20/月
- Next.js 14 + Tailwind CSS

## 収益シミュレーション
| 期間 | PV | 月収 |
|---|---|---|
| 1-3ヶ月 | 500-3,000 | ¥0-5,000 |
| 4-6ヶ月 | 5,000-30,000 | ¥5,000-50,000 |
| 7-12ヶ月 | 30,000-100,000 | ¥50,000-200,000 |
| 13ヶ月+ | 100,000+ | ¥200,000-500,000 |

## 次のアクション
1. 承認待ちアフィリエイトの確認
2. Impact.comプロフィール完成
3. 承認済みリンクをサイトに設置
4. SEOバックリンク開始
