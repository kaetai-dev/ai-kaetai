# AI-KAETAI.COM プロジェクト計画書
## 最終更新: 2026-04-04

---

## コンセプト
「○○の代わりになるAIツール」を日本語＋英語で比較・検索できるディレクトリサイト。
収益はアフィリエイトのみ。ユーザーとの金銭取引ゼロ、保守最小、トラブルほぼゼロ。

---

## 進捗状況

### フェーズ0：準備 ✅ 完了
- [x] ドメイン取得 (ai-kaetai.com, Cloudflare, $10.46/年)
- [x] GitHub アカウント作成 (kaetai-dev)
- [x] Vercel アカウント作成 (GitHub連携済み)
- [x] Supabase アカウント作成 (GitHub連携済み)
- [x] Claude Code インストール済み

### フェーズ1：サイト構築 ✅ 完了
- [x] Claude Code で Next.js + Supabase + Tailwind CSS プロジェクト生成（27ファイル）
- [x] GitHub リポジトリ作成・push (kaetai-dev/ai-kaetai)
- [x] Vercel デプロイ完了
- [x] Cloudflare DNS設定 (A: 216.198.79.1, CNAME: www → cname.vercel-dns.com)
- [x] https://www.ai-kaetai.com でアクセス確認済み
- [ ] ai-kaetai.com (www無し) のDNS伝播待ち（数分〜数時間で自動解決）

### フェーズ2：初期データ投入（次回作業）
- [ ] AIツール100個をClaude APIで収集・日本語説明文生成
- [ ] 約200ページ自動生成（ツール個別 + 代替一覧）
- [ ] カテゴリページ作成（画像生成、文章生成、動画生成、音楽生成、コーディング等）

### フェーズ3：アフィリエイト設定
- [ ] A8.net 登録
- [ ] もしもアフィリエイト 登録
- [ ] PartnerStack 登録 (Jasper 30%継続, Surfer SEO 25%継続)
- [ ] Impact 登録 (Canva 最大36%, Grammarly $25/件, Notion 最大50%)
- [ ] 各ツールページにアフィリエイトリンク配置

### フェーズ4：公開・インデックス促進
- [ ] Google Search Console 登録・サイトマップ送信
- [ ] Google Analytics 登録
- [ ] Reddit / Product Hunt / X 投稿でバックリンク取得

### フェーズ5：自動運用体制構築
- [ ] N8N/Make.com で RSS監視 → Claude要約 → Supabase自動保存
- [ ] 月1回リンク切れチェック自動化
- [ ] Beehiiv ニュースレター開始

---

## 技術スタック（全て無料枠）
| サービス | 用途 | 費用 |
|---|---|---|
| Cloudflare | ドメイン・DNS | $10.46/年 |
| Vercel | ホスティング | 無料（100GB/月） |
| Supabase | データベース | 無料（500MB） |
| GitHub | コード管理 | 無料 |
| Claude Code | サイト構築・保守 | Pro契約済み |
| GSC / GA | SEO・解析 | 無料 |
| N8N / Make.com | 自動化 | 無料枠あり |

---

## 収益モデル
アフィリエイトのみ。主要ASP: A8.net, もしも, PartnerStack, Impact
- Jasper AI 30% 継続報酬
- Surfer SEO 25% 継続報酬
- Writesonic 30% 継続報酬
- Copy.ai 20% 継続報酬
- Notion 最大50% 初回
- Canva 最大36% 初回
- Grammarly $25/件
- Synthesia 20% 継続報酬
- Descript 15% 継続報酬

---

## 収益シミュレーション（保守的）
| 期間 | 月間PV | 月間収益目安 |
|---|---|---|
| 1-3ヶ月 | 500-3,000 | 0-5,000円 |
| 4-6ヶ月 | 5,000-30,000 | 5,000-50,000円 |
| 7-12ヶ月 | 30,000-100,000 | 50,000-200,000円 |
| 13ヶ月以降 | 100,000以上 | 200,000-500,000円 |

---

## サイト構成（現在）
- トップページ: /
- ツール詳細: /tools/[slug]（20件）
- 代替ツール一覧: /alternatives/[slug]（20件）
- カテゴリ: /categories/[slug]（5件）
- 免責事項: /disclaimer
- サイトマップ: /sitemap.xml
- robots.txt: /robots.txt

---

## アカウント情報
- GitHub: kaetai-dev (リポジトリ: kaetai-dev/ai-kaetai)
- Vercel: GitHub連携 (プロジェクト: ai-kaetai)
- Supabase: GitHub連携
- Cloudflare: ai-kaetai.com
- 本番URL: https://www.ai-kaetai.com (https://ai-kaetai.com はDNS伝播中)

---

## リスク・対策
- SEO変動 → Beehiivニュースレターで別流入確保
- アフィリエイト終了 → 10件以上のASPを同時掲載
- 競合 → 「代替特化」戦略で差別化
- 情報陳腐化 → N8N + Claude API自動更新

---

## 初期投資
| 項目 | 費用 |
|---|---|
| ドメイン (ai-kaetai.com) | $10.46/年（約1,500円） |
| Claude Pro | $20/月（契約済み） |
| Claude API（初期データ生成） | 1,000-3,000円 |
| 合計 | 約2,500-4,500円 |

---

## 参考事例
- Piotr Kulpinski — OpenAlternative + Dirstarter。月$13,000
- Nat Eliason — AIエージェント Felix Craft。3週間で$74,938
- Gil Hildebrand — Subscribr。年$1,000,000 ARR

---

## 次回やること
1. ai-kaetai.com のDNS伝播確認
2. フェーズ2: Claude CodeでAIツール100個のデータ収集・投入
3. カテゴリページの充実
4. Google Search Console / Analytics 登録
