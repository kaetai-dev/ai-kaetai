# AI-KAETAI.COM プロジェクト計画書

## コンセプト
「○○の代わりになるAIツール」を日本語（＋後に英語）で網羅的に比較・検索できるディレクトリサイト。
収益はアフィリエイトのみ。ユーザーとの金銭取引ゼロ、保守最小、トラブルほぼゼロの設計。

---

## 進捗状況

### フェーズ0：準備
- [x] ドメイン取得（ai-kaetai.com / Cloudflare / $10.46）
- [x] GitHubアカウント作成
- [x] Vercelアカウント作成（GitHub連携済み）
- [x] Supabaseアカウント作成（GitHub連携済み）
- [ ] Google Search Console 登録
- [ ] Google Analytics 登録

### フェーズ1：サイト構築（目標：3〜5日）
- [ ] PCでClaude Codeを使ってプロジェクト作成
- [ ] Next.js + Supabase + Tailwind CSSで構築
- [ ] 日本語化・デザイン調整
- [ ] Supabaseにデータベース設計（ツール情報テーブル）
- [ ] Vercelにデプロイ（公開）
- [ ] Cloudflareでai-kaetai.comをVercelに接続

### フェーズ2：初期データ投入（目標：4〜5日）
- [ ] AIツール100個のデータ収集（Claude API活用）
- [ ] 「○○の代替ツール」ページ自動生成（約200ページ）
- [ ] カテゴリページ作成（画像生成AI、文章生成AI、動画生成AI等）

### フェーズ3：アフィリエイト設定（目標：2日）
- [ ] A8.net 登録
- [ ] もしもアフィリエイト 登録
- [ ] PartnerStack 登録（Jasper 30%継続、Surfer SEO 25%継続 等）
- [ ] Impact 登録（Canva 最大36%、Grammarly $25/件、Notion 最大50% 等）
- [ ] 各ツールページにアフィリエイトリンク設置

### フェーズ4：公開・インデックス促進（目標：2日）
- [ ] Google Search Consoleにサイトマップ送信
- [ ] Reddit（r/artificial、r/AItools）に投稿
- [ ] Product Huntにサイト投稿
- [ ] X（Twitter）アカウント作成・初期投稿

### フェーズ5：自動運用体制構築（目標：1週間）
- [ ] N8NまたはMake.comでワークフロー構築
  - [ ] RSS監視 → 新AIツール自動検出
  - [ ] Claude API → 日本語概要自動生成
  - [ ] Supabase → 下書き自動保存
- [ ] リンク切れ自動チェック（月1回）
- [ ] Beehiivニュースレター開設（SEO以外の流入経路確保）

---

## 技術スタック（全て無料枠）

| サービス | 用途 | 無料枠 |
|---------|------|--------|
| Cloudflare | ドメイン・DNS | ドメイン年$10.46 |
| Vercel | ホスティング | 月100GB帯域 |
| Supabase | データベース | 500MB |
| GitHub | コード管理 | 無制限 |
| Claude Code | サイト構築・保守 | Pro契約済み |
| Google Search Console | SEO監視 | 無料 |
| Google Analytics | アクセス解析 | 無料 |
| N8N / Make.com | 自動化 | 無料枠あり |

---

## 収益モデル

アフィリエイトのみ（ユーザーとの金銭取引なし）

### 主要ASP
- A8.net（国内）
- もしもアフィリエイト（国内）
- PartnerStack（海外 / AI SaaS案件多数）
- Impact（海外 / Canva, Grammarly, Notion等）

### 報酬目安
| ツール | 報酬率 | 種別 |
|-------|--------|------|
| Jasper AI | 30% | 継続報酬 |
| Surfer SEO | 25% | 継続報酬 |
| Writesonic | 30% | 継続報酬 |
| Copy.ai | 20% | 継続報酬 |
| Notion | 最大50% | 初回 |
| Canva | 最大36% | 初回 |
| Grammarly | $25/件 | 単発 |
| Synthesia | 20% | 継続報酬 |
| Descript | 15% | 継続報酬 |

---

## 収益シミュレーション（保守的見積もり）

| 期間 | 月間PV | 月間収益（目安） |
|------|--------|-----------------|
| 1〜3ヶ月目 | 500〜3,000 | ¥0〜5,000 |
| 4〜6ヶ月目 | 5,000〜30,000 | ¥5,000〜50,000 |
| 7〜12ヶ月目 | 30,000〜100,000 | ¥50,000〜200,000 |
| 13ヶ月目〜 | 100,000超 | ¥200,000〜500,000 |

---

## リスクと対策

| リスク | 対策 |
|--------|------|
| SEOアルゴリズム変動 | Beehiivニュースレターで別流入経路確保 |
| アフィリエイト終了 | 常に10以上のASP案件を並行掲載 |
| AIツールギャラリーとの競合 | 「代替特化」で正面衝突回避 |
| ツール情報の陳腐化 | N8N + Claude APIで自動更新 |

---

## 初期投資

| 項目 | 費用 |
|------|------|
| ドメイン（ai-kaetai.com） | $10.46/年（≒¥1,500） |
| Claude Pro | $20/月（契約済み） |
| Claude API（初期データ生成） | ¥1,000〜3,000 |
| 合計 | 約¥2,500〜4,500 |

---

## 参考事例

- Piotr Kulpinski — OpenAlternative + Dirstarter。月$13,000。アフィリエイト＋スポンサー。
- Nat Eliason — AIエージェント Felix Craft。3週間で$74,938。
- Gil Hildebrand — Subscribr。年$1,000,000 ARR。先行販売で検証後に開発。

---

## 次のアクション
- [ ] PCからClaude Codeでサイト構築開始
