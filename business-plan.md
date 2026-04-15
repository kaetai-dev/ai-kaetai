# AI Kaetai 統合事業計画書
最終更新: 2026-04-15

## 1. 事業概要

**事業名**: AI Kaetai（AI買えたい）
**運営者**: seiyasukino
**ミッション**: AIツールの情報格差を解消する。日本語で信頼できるAIツール比較情報を提供し、最適なツール選びを支援する。
**ターゲット**: AIツールを探している日本語話者（個人クリエイター、フリーランス、中小企業、副業者）

## 2. 収益モデル

| 収益源 | 内容 | 優先度 |
|--------|------|--------|
| アフィリエイト | AIツール紹介報酬（メイン） | ★★★ |
| コンテンツ販売 | AI活用ガイド等（将来） | ★☆☆ |

## 3. チャネル構成

### チャネルA: Webサイト（収益の中心）
- **URL**: https://www.ai-kaetai.com
- **内容**: AIツール101件、10カテゴリ、代替ツール比較、219ページ
- **技術**: Next.js 14 + Supabase + Tailwind CSS / Vercel
- **収益**: アフィリエイトリンク経由の成果報酬
- **集客**: SEO（Google検索）、SNSからの流入

### チャネルB: X（Twitter）（集客エンジン）← NightClawから統合
- **アカウント**: @nightclaw_ai
- **現状**: フォロワー43名、平均インプレッション5-9
- **統合方針**: プロフィール・リンクをAI Kaetai向けに変更。AI活用テーマは共通のためアカウントをそのまま転用
- **投稿キュー**: 17件のAI活用ノウハウ投稿が準備済み（流用可能）
- **投稿戦略**: AI活用ノウハウ（7割）＋ AIツール紹介・サイト誘導（3割）

### チャネルC: 動画コンテンツ（将来）
- Instagram Reels / TikTok: AIツールのbefore-after比較動画
- ManyChat: DM自動返信でアフィリエイトリンク配布
- 音声: ElevenLabs / VOICEVOX でナレーション自動生成

## 4. 統合資産一覧

### NightClawから転用する資産
| 資産 | 用途 |
|------|------|
| @nightclaw_ai（Xアカウント） | AI Kaetaiの集客チャネル |
| 投稿キュー17件 | サイト誘導投稿と混ぜて運用 |
| GoatCounter | AI Kaetaiサイトにも追加設置 |
| Vertex AI残高 ¥46,955（期限2026/06/15） | コンテンツ自動生成に活用 |
| OpenClaw（Mac mini） | AI Kaetai運用の自動化基盤として転用検討 |

### 閉鎖・停止する資産
| 資産 | アクション |
|------|-----------|
| LP（nightclaw-ai.github.io/product.html） | 非公開化 |
| 商品「X半自動運用ガイド」（3,980円） | 販売停止 |
| Stripe決済 | 停止（AI Kaetaiで決済不要） |
| x-postジョブ | 既に無効化済み |

### 継続判断が必要な資産
| 資産 | 判断基準 |
|------|---------|
| OpenClaw本体 | AI Kaetai運用に使うなら継続。使わないならcron全停止しVertex AI課金停止 |
| 無料PDF（プロンプト10選） | AI Kaetaiのリード獲得に使えるなら残す。テーマが合わないなら削除 |
| SOUL.md / 運用ルール | OpenClawを継続する場合のみ必要 |

## 5. 現在の進捗

### 完了
- [x] Webサイト公開（101ツール、219ページ、10カテゴリ）
- [x] Googleインデックス済み（検索結果に表示確認）
- [x] Google Analytics設置（G-EE7ZD8HJZV）
- [x] Google Search Console登録・サイトマップ送信
- [x] アフィリエイトリンク4件設置（ElevenLabs, HeyGen, Synthesia, Genspark）
- [x] layout.tsx SSR修正（Impact metaタグ直接設置、localStorage try/catch）
- [x] カテゴリページSSR修正（サーバーコンポーネント化）
- [x] Cloudflareメール転送（admin@ai-kaetai.com → Gmail）
- [x] PayPal作成済み

### 進行中
- [ ] アフィリエイト承認待ち5件（Writesonic, Murf AI, Descript, Surfer SEO, Genspark追加）
- [ ] NightClaw → AI Kaetai統合作業

### 未着手
- [ ] Xアカウント統合（プロフィール変更・投稿再開）
- [ ] SEOバックリンク（Reddit, Product Hunt）
- [ ] ツール数拡大（101 → 200）
- [ ] 動画コンテンツ制作
- [ ] 自動化パイプライン構築

## 6. アフィリエイト状況

### 設置済み（4件）
| ツール | プラットフォーム | コミッション | リンク |
|--------|----------------|-------------|--------|
| ElevenLabs | PartnerStack | 22% recurring 12ヶ月 | https://try.elevenlabs.io/gxgtkhgqtmlt |
| HeyGen | Rewardful | 35% × 3ヶ月 | https://www.heygen.com/?sid=rewardful&...&via=4a199a |
| Synthesia | Rewardful | 25% recurring 12ヶ月 | https://www.synthesia.io/?via=9a48c2 |
| Genspark | Impact.com | 20%（推定） | https://mainfuncpteltd.sjv.io/NGzKyK |

### 承認待ち（5件）
| ツール | プラットフォーム | ステータス |
|--------|----------------|-----------|
| Writesonic | 独自システム | Pending |
| Murf AI | PartnerStack | Pending |
| Descript | PartnerStack | Pending |
| Surfer SEO | PartnerStack | Applied |

### 報酬管理画面
| プラットフォーム | URL | 対象 |
|-----------------|-----|------|
| Rewardful | heygen.getrewardful.com / synthesia.getrewardful.com | HeyGen, Synthesia |
| PartnerStack | dash.partnerstack.com | ElevenLabs, Murf AI, Descript, Surfer SEO |
| Impact.com | app.impact.com | Genspark |
| Writesonic独自 | affiliates.writesonic.com | Writesonic |

## 7. 収益シミュレーション

| 期間 | PV目標 | 月間収益予測 | 主な施策 |
|------|--------|-------------|---------|
| 1-3ヶ月 | 500-3,000 | ¥0-5,000 | SEO定着、X投稿開始、Reddit投稿 |
| 4-6ヶ月 | 5,000-30,000 | ¥5,000-50,000 | ツール200件、動画開始、大手アフィ再申請 |
| 7-12ヶ月 | 30,000-100,000 | ¥50,000-200,000 | 自動化、メルマガ、スポンサー記事 |
| 13ヶ月+ | 100,000+ | ¥200,000-500,000 | 全チャネル最適化 |

## 8. 月間固定費

| 項目 | 費用 |
|------|------|
| ドメイン（ai-kaetai.com） | $10.46/年（約$0.87/月） |
| Claude Code Pro | $20/月 |
| Vercel / Supabase / Cloudflare | 無料 |
| X API（将来再開時） | $100/月（Basic） |
| **合計（現在）** | **約$21/月（約3,200円）** |

## 9. ロードマップ

### 今週（2026-04-15〜）
1. Xアカウント @nightclaw_ai のプロフィール・リンクをAI Kaetai向けに変更
2. 投稿キュー17件にAI Kaetaiサイトリンクを追加して手動投稿開始
3. 承認待ちアフィリエイトの結果確認
4. GoatCounterをai-kaetai.comに追加設置

### 今月（4月中）
5. Redditアカウント作成 → r/SideProject, r/AItools に投稿
6. NightClaw LP非公開化、Stripe停止
7. OpenClawの継続/停止を判断
8. 承認済みアフィリエイトリンクをサイトに追加

### 来月（5月）
9. ツール数を150件に拡大
10. Instagram Reels テスト動画1本制作
11. Vertex AI残高でコンテンツ自動生成テスト
12. Product Hunt登録

### 3ヶ月後（7月）
13. ツール200件達成
14. Grammarly / Jasper アフィリエイト再申請
15. Beehiivニュースレター開始
16. 自動化パイプライン（N8N/Make.com）構築

## 10. 運用ルール

- OpenClaw使用の事実は外部非公開（SOUL.md準拠）
- OpenClawの出力は必ず実在確認してから公開（架空データ報告の前科あり）
- X投稿は承認制を厳守（勝手な編集・削除の前科あり）
- Xでのいいね・フォロー・リプライは手動のみ（API経由は規約違反でロック経験あり）
- アフィリエイト免責表示はサイト全ページに掲載済み

## 11. 技術スタック

| 用途 | ツール |
|------|--------|
| サイト | Next.js 14 + Tailwind CSS |
| ホスティング | Vercel（自動デプロイ） |
| DB | Supabase |
| DNS・メール | Cloudflare |
| 開発 | Claude Code Pro |
| 自動化基盤 | OpenClaw on Mac mini |
| AIモデル | Vertex AI（gemini-3-flash-preview）残高¥46,955 |
| 分析 | Google Analytics + GoatCounter |
| リポジトリ | github.com/kaetai-dev/ai-kaetai |

## 12. リスクと対策

| リスク | 対策 |
|--------|------|
| トラフィックが伸びない | X・Reddit・動画の多チャネル展開 |
| アフィリエイト却下 | 小〜中規模ツール優先、トラフィック増後に大手再申請 |
| 競合サイトの存在 | 日本語特化＋代替ツール比較という独自切り口 |
| ツール情報の陳腐化 | 自動化パイプラインで定期更新 |
| OpenClawの暴走 | 報告専用に制限、承認制厳守、出力の実在確認必須 |
| Vertex AI残高期限（2026/06/15） | 6月までに集中活用 |
