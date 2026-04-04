import { Tool, Category, Alternative, ToolWithAlternatives } from '@/types';

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: '文章生成AI',
    slug: 'writing',
    description: 'ブログ記事、メール、コピーライティングなど文章を生成・改善するAIツール',
    icon: '✍️',
    toolCount: 7,
  },
  {
    id: 'cat-2',
    name: '画像生成AI',
    slug: 'image',
    description: 'テキストプロンプトから高品質な画像やアートを生成するAIツール',
    icon: '🎨',
    toolCount: 4,
  },
  {
    id: 'cat-3',
    name: '動画生成AI',
    slug: 'video',
    description: 'テキストや画像から動画コンテンツを生成・編集するAIツール',
    icon: '🎬',
    toolCount: 3,
  },
  {
    id: 'cat-4',
    name: 'コーディングAI',
    slug: 'coding',
    description: 'コード補完、バグ修正、ソフトウェア開発を支援するAIツール',
    icon: '💻',
    toolCount: 3,
  },
  {
    id: 'cat-5',
    name: '音声・音楽AI',
    slug: 'audio',
    description: '音楽生成、音声合成、ポッドキャスト制作を支援するAIツール',
    icon: '🎵',
    toolCount: 3,
  },
];

export const tools: Tool[] = [
  // 文章生成AI
  {
    id: 'tool-1',
    name: 'ChatGPT',
    slug: 'chatgpt',
    description:
      'OpenAIが開発した世界最大級の会話型AIです。文章生成、質問応答、コード記述、翻訳、要約など幅広いタスクに対応しています。GPT-4oモデルを搭載し、テキスト・画像・音声のマルチモーダル処理が可能です。ビジネス文書からクリエイティブライティングまで、あらゆる文章作成ニーズに応えます。',
    shortDescription: 'OpenAI製の世界最大級の会話型AI。文章生成から画像理解まで幅広く対応',
    category: '文章生成AI',
    categorySlug: 'writing',
    pricing: 'freemium',
    pricingDetail: '無料プランあり。ChatGPT Plus（月額$20）でGPT-4oフル利用可能',
    features: [
      'GPT-4oによる高精度な文章生成',
      '画像・音声・テキストのマルチモーダル対応',
      '100以上の言語に対応',
      'プラグイン・GPTs機能',
      'APIアクセス対応',
      'コード生成・デバッグ支援',
    ],
    officialUrl: 'https://chat.openai.com',
    affiliateUrl: 'https://chat.openai.com',
    imageUrl: '',
    tags: ['会話AI', '文章生成', 'GPT-4', 'OpenAI', 'マルチモーダル'],
    createdAt: '2022-11-30',
    rating: 4.8,
  },
  {
    id: 'tool-2',
    name: 'Claude',
    slug: 'claude',
    description:
      'Anthropicが開発した安全性重視の会話型AIです。長文コンテキスト（最大200Kトークン）の処理が得意で、複雑な文書分析、詳細なコーディング支援、倫理的で正確な回答を提供します。Claude 3.5 Sonnetは特にコーディングと分析タスクで高い評価を受けており、ビジネスや研究用途に最適です。',
    shortDescription: 'Anthropic製の安全性重視AI。長文処理と倫理的な回答が強み',
    category: '文章生成AI',
    categorySlug: 'writing',
    pricing: 'freemium',
    pricingDetail: '無料プランあり。Claude Pro（月額$20）でより高速・高精度に利用可能',
    features: [
      '最大200Kトークンの長文コンテキスト処理',
      '高い安全性と倫理的な回答',
      'コーディング・分析タスクに優秀',
      '日本語対応',
      'APIアクセス対応（Claude API）',
      'ファイルアップロードと分析機能',
    ],
    officialUrl: 'https://claude.ai',
    affiliateUrl: 'https://claude.ai',
    imageUrl: '',
    tags: ['会話AI', '文章生成', 'Anthropic', '安全AI', '長文処理'],
    createdAt: '2023-03-14',
    rating: 4.7,
  },
  {
    id: 'tool-3',
    name: 'Gemini',
    slug: 'gemini',
    description:
      'Googleが開発したマルチモーダルAIです。Google検索やGoogleワークスペースとの統合により、リアルタイムの情報検索と文章生成を組み合わせることができます。Gemini 1.5 ProはGoogle DriveやGmailと連携し、ビジネスプロセスの自動化に威力を発揮します。',
    shortDescription: 'Google製のマルチモーダルAI。Googleサービスとの深い統合が特徴',
    category: '文章生成AI',
    categorySlug: 'writing',
    pricing: 'freemium',
    pricingDetail: '無料プランあり。Gemini Advanced（Google One AI Premium、月額$19.99）で最上位モデル利用可能',
    features: [
      'Googleサービス（Drive、Gmail、Docs）との統合',
      'リアルタイム情報検索対応',
      'マルチモーダル（テキスト・画像・音声・動画）',
      '1Mトークンのコンテキストウィンドウ',
      'Google Workspaceとの連携',
      'コード実行・分析機能',
    ],
    officialUrl: 'https://gemini.google.com',
    affiliateUrl: 'https://gemini.google.com',
    imageUrl: '',
    tags: ['会話AI', 'Google', 'マルチモーダル', 'リアルタイム検索'],
    createdAt: '2023-12-06',
    rating: 4.5,
  },
  {
    id: 'tool-4',
    name: 'Jasper',
    slug: 'jasper',
    description:
      'マーケター・コンテンツクリエイター向けに特化したAI文章生成ツールです。SEO最適化されたブログ記事、広告コピー、SNS投稿、メールマーケティングなど、マーケティングコンテンツの大量生成に優れています。ブランドの「声」を学習し、一貫したトーンでコンテンツを量産できます。',
    shortDescription: 'マーケター特化のAIライター。SEO対策コンテンツの大量生成に最適',
    category: '文章生成AI',
    categorySlug: 'writing',
    pricing: 'paid',
    pricingDetail: 'Creatorプラン月額$39〜（年払いで月額$29〜）。無料トライアル7日間あり',
    features: [
      'マーケティングコンテンツに特化したテンプレート50種以上',
      'SEO最適化機能（Surfer SEO統合）',
      'ブランドボイス学習・維持機能',
      'チームコラボレーション機能',
      '30以上の言語対応',
      'ブログ記事・広告コピー・SNS投稿の自動生成',
    ],
    officialUrl: 'https://www.jasper.ai',
    affiliateUrl: 'https://www.jasper.ai/?fpr=ai-kaetai',
    imageUrl: '',
    tags: ['マーケティングAI', 'コピーライティング', 'SEO', 'コンテンツ生成'],
    createdAt: '2021-01-01',
    rating: 4.4,
  },
  {
    id: 'tool-5',
    name: 'Copy.ai',
    slug: 'copy-ai',
    description:
      'セールスコピーとマーケティング文章の生成に特化したAIツールです。プロダクト説明文、メールシーケンス、ランディングページのコピー、SNSキャプションなどを素早く生成できます。GTM（Go-to-Market）向けのワークフロー機能があり、営業・マーケチームの生産性を高めます。',
    shortDescription: 'セールスコピー特化のAI。営業・マーケチームの文章作成を効率化',
    category: '文章生成AI',
    categorySlug: 'writing',
    pricing: 'freemium',
    pricingDetail: '無料プランあり（月2,000ワード）。Proプラン月額$49〜',
    features: [
      'セールスコピー・広告文の自動生成',
      '90種以上のコンテンツテンプレート',
      'ブランドボイス設定機能',
      'GTM（Go-to-Market）ワークフロー',
      '25以上の言語対応',
      'チームワークスペース機能',
    ],
    officialUrl: 'https://www.copy.ai',
    affiliateUrl: 'https://www.copy.ai/?via=ai-kaetai',
    imageUrl: '',
    tags: ['コピーライティング', 'マーケティング', 'セールス', 'GTM'],
    createdAt: '2020-10-01',
    rating: 4.3,
  },
  {
    id: 'tool-6',
    name: 'Notion AI',
    slug: 'notion-ai',
    description:
      'ノート・ドキュメント管理ツールNotionに統合されたAI機能です。既存のNotionドキュメントを参照しながら文章の要約、改善、翻訳、新規作成ができます。会議メモの整理、プロジェクト計画書の作成、ブレインストーミングなど、ワークフローに自然に組み込めるのが特徴です。',
    shortDescription: 'Notion統合のAIアシスタント。ドキュメント管理と文章生成を一元化',
    category: '文章生成AI',
    categorySlug: 'writing',
    pricing: 'freemium',
    pricingDetail: 'NotionのPlusプラン（月額$10）にAI機能を月額$10で追加可能',
    features: [
      'Notionドキュメントとのシームレスな統合',
      'ドキュメントの要約・改善・翻訳',
      '会議メモの自動整理',
      'プロジェクト計画書の自動生成',
      'ナレッジベースからの質問応答',
      'チームコラボレーション対応',
    ],
    officialUrl: 'https://www.notion.so/product/ai',
    affiliateUrl: 'https://affiliate.notion.so/ai-kaetai',
    imageUrl: '',
    tags: ['ノートAI', 'ドキュメント管理', 'Notion', 'ワークフロー'],
    createdAt: '2023-02-22',
    rating: 4.3,
  },
  {
    id: 'tool-7',
    name: 'Perplexity',
    slug: 'perplexity',
    description:
      'AI搭載の検索エンジンで、質問に対して引用付きの詳細な回答を提供します。リアルタイムのウェブ情報を参照しながら、信頼性の高い回答を生成します。研究・情報収集・最新トレンドの把握に優れており、従来の検索エンジンとAIチャットの良いところを組み合わせたサービスです。',
    shortDescription: 'AI搭載の検索エンジン。引用付きで信頼性の高い回答を提供',
    category: '文章生成AI',
    categorySlug: 'writing',
    pricing: 'freemium',
    pricingDetail: '無料プランあり。Proプラン月額$20でより高精度な検索と回答が可能',
    features: [
      'リアルタイムウェブ検索との統合',
      '引用付きの信頼性の高い回答',
      '学術論文・専門情報の検索対応',
      '会話形式での深掘り質問対応',
      'ファイルアップロードと分析',
      'コレクション機能でリサーチ整理',
    ],
    officialUrl: 'https://www.perplexity.ai',
    affiliateUrl: 'https://www.perplexity.ai',
    imageUrl: '',
    tags: ['AI検索', 'リサーチ', '情報収集', 'リアルタイム検索'],
    createdAt: '2022-12-07',
    rating: 4.6,
  },

  // 画像生成AI
  {
    id: 'tool-8',
    name: 'Midjourney',
    slug: 'midjourney',
    description:
      'アーティスティックで高品質な画像生成AIとして世界的に有名なサービスです。Discordベースのインターフェースで使用し、独自の美しいスタイルと高い完成度で知られています。V6モデルでは現実的な人物描写やテキスト表現も大幅に改善され、プロのデザイナーや映像クリエイターにも愛用されています。',
    shortDescription: '世界最高峰の画像生成AI。アーティスティックな高品質画像を生成',
    category: '画像生成AI',
    categorySlug: 'image',
    pricing: 'paid',
    pricingDetail: 'Basicプラン月額$10〜。無料トライアルは終了（旧バージョンのみ無料体験可）',
    features: [
      '高品質でアーティスティックな画像生成',
      'V6による現実的な人物・風景描写',
      '多様なアートスタイルへの対応',
      'バリエーション生成とアップスケール',
      'アスペクト比・解像度のカスタマイズ',
      'コミュニティギャラリーとプロンプト参照',
    ],
    officialUrl: 'https://www.midjourney.com',
    affiliateUrl: 'https://www.midjourney.com',
    imageUrl: '',
    tags: ['画像生成', 'アート', 'デザイン', 'Discord'],
    createdAt: '2022-07-12',
    rating: 4.8,
  },
  {
    id: 'tool-9',
    name: 'Stable Diffusion',
    slug: 'stable-diffusion',
    description:
      'Stability AIが開発したオープンソースの画像生成AIです。ローカル環境での実行が可能で、完全に無料で使用できます。高度なカスタマイズ性が特徴で、LoRAやControlNetなどの拡張機能により特定スタイルの画像生成や構図制御が可能です。自分のPCで動かせるため、プライバシーも確保できます。',
    shortDescription: 'オープンソースの画像生成AI。無料でローカル実行可能、高カスタマイズ性',
    category: '画像生成AI',
    categorySlug: 'image',
    pricing: 'free',
    pricingDetail: '完全無料（オープンソース）。クラウドサービス版は一部有料',
    features: [
      'オープンソースで完全無料',
      'ローカル環境での実行に対応',
      'LoRA・ControlNetによる高度なカスタマイズ',
      '商用利用可能なモデルあり',
      '活発なコミュニティとモデル共有',
      'AUTOMATIC1111 WebUIでGUI操作が可能',
    ],
    officialUrl: 'https://stability.ai/stable-image',
    affiliateUrl: 'https://stability.ai/stable-image',
    imageUrl: '',
    tags: ['画像生成', 'オープンソース', '無料', 'ローカル実行', 'カスタマイズ'],
    createdAt: '2022-08-22',
    rating: 4.5,
  },
  {
    id: 'tool-10',
    name: 'DALL-E',
    slug: 'dall-e',
    description:
      'OpenAIが開発した画像生成AIです。ChatGPTやAPIを通じて利用でき、テキストの指示を正確に理解した画像生成が得意です。DALL-E 3ではテキストの画像内への埋め込みが改善され、より指示に忠実な画像を生成できるようになりました。ChatGPT Plusに含まれているため、追加料金なしで利用可能です。',
    shortDescription: 'OpenAI製の画像生成AI。テキスト指示の理解精度が高くChatGPTから利用可能',
    category: '画像生成AI',
    categorySlug: 'image',
    pricing: 'freemium',
    pricingDetail: 'ChatGPT Plus（月額$20）に含まれる。APIは画像1枚あたり$0.04〜',
    features: [
      'ChatGPTからシームレスに利用可能',
      'テキスト指示の高精度な解釈',
      '画像内へのテキスト生成対応',
      '既存画像の編集（Inpainting）',
      '複数サイズ・スタイルの対応',
      'API経由でのシステム統合',
    ],
    officialUrl: 'https://openai.com/dall-e-3',
    affiliateUrl: 'https://openai.com/dall-e-3',
    imageUrl: '',
    tags: ['画像生成', 'OpenAI', 'DALL-E 3', 'ChatGPT統合'],
    createdAt: '2023-10-04',
    rating: 4.4,
  },
  {
    id: 'tool-11',
    name: 'Adobe Firefly',
    slug: 'adobe-firefly',
    description:
      'Adobeが開発した商用安全な画像生成AIです。Adobeのクリエイティブクラウドと統合され、PhotoshopやIllustratorから直接利用できます。商用コンテンツのみで学習されているため、著作権リスクが低く、プロフェッショナルな制作現場での採用が進んでいます。Generative Fillによる高度な画像編集も可能です。',
    shortDescription: 'Adobe製の商用安全な画像生成AI。Photoshopとの統合で編集ワークフローに最適',
    category: '画像生成AI',
    categorySlug: 'image',
    pricing: 'freemium',
    pricingDetail: '月25クレジットまで無料。Adobe Creative Cloudプランに含まれる場合あり',
    features: [
      'Adobe Creative Cloud（Photoshop・Illustrator）との統合',
      '商用コンテンツのみで学習した安全なAI',
      'Generative Fillによる高度な画像編集',
      'テキストからベクター画像を生成',
      'Generative Recolorで配色の一括変更',
      '著作権保護に配慮した設計',
    ],
    officialUrl: 'https://firefly.adobe.com',
    affiliateUrl: 'https://firefly.adobe.com',
    imageUrl: '',
    tags: ['画像生成', 'Adobe', '商用安全', 'Photoshop', 'クリエイティブ'],
    createdAt: '2023-03-21',
    rating: 4.4,
  },

  // 動画生成AI
  {
    id: 'tool-12',
    name: 'Runway',
    slug: 'runway',
    description:
      'プロ映像クリエイター向けの動画生成AIプラットフォームです。Gen-3 AlphaモデルによりテキストやImageから高品質な動画を生成できます。モーションブラシ、カメラコントロール、背景削除などの高度な映像編集機能も備え、映画・CM・SNS動画制作のプロに選ばれています。',
    shortDescription: 'プロ向け動画生成AIプラットフォーム。Gen-3による高品質な動画生成',
    category: '動画生成AI',
    categorySlug: 'video',
    pricing: 'freemium',
    pricingDetail: '無料プランは月125クレジット。Standardプラン月額$15〜',
    features: [
      'Gen-3 Alphaによる高品質動画生成',
      'テキスト・画像から動画生成（Text-to-Video / Image-to-Video）',
      'モーションブラシとカメラコントロール',
      '背景削除・グリーンスクリーン処理',
      '映像のスタイル転送',
      '4K出力対応',
    ],
    officialUrl: 'https://runwayml.com',
    affiliateUrl: 'https://runwayml.com',
    imageUrl: '',
    tags: ['動画生成', 'AIビデオ', '映像編集', 'Gen-3', 'クリエイティブ'],
    createdAt: '2023-03-01',
    rating: 4.5,
  },
  {
    id: 'tool-13',
    name: 'Descript',
    slug: 'descript',
    description:
      'テキスト編集で音声・動画を編集できる革新的なAIツールです。文字起こしされたトランスクリプトを編集するだけで、音声・動画が自動編集されます。Overdub機能で声のクローンを作り、ポッドキャスト・YouTube動画の編集を大幅に効率化できます。リモートレコーディングにも対応しています。',
    shortDescription: 'テキスト編集で動画・音声を編集。ポッドキャストとYouTube制作に最適',
    category: '動画生成AI',
    categorySlug: 'video',
    pricing: 'freemium',
    pricingDetail: '無料プランあり（月1時間の文字起こし）。Creatorプラン月額$24〜',
    features: [
      'テキスト編集で動画・音声を編集',
      '自動文字起こし（95%以上の精度）',
      'Overdubによる音声クローニング',
      'アイコンタクト補正（AIによる目線修正）',
      'リモート録画・共同編集機能',
      '不要な「えー」「あの」の自動削除',
    ],
    officialUrl: 'https://www.descript.com',
    affiliateUrl: 'https://www.descript.com/?lmref=ai-kaetai',
    imageUrl: '',
    tags: ['動画編集', '音声編集', 'ポッドキャスト', '文字起こし', '音声クローン'],
    createdAt: '2019-10-01',
    rating: 4.6,
  },
  {
    id: 'tool-14',
    name: 'Pika',
    slug: 'pika',
    description:
      'テキストや画像から短い動画を生成するAIツールです。独自のモデルにより、アニメーション、映画的な動きのある動画を生成できます。既存の画像や動画に動きを加える「Animate」機能が特徴で、SNSコンテンツ制作やプロモーション動画の制作に活用されています。使いやすいWebインターフェースが好評です。',
    shortDescription: 'テキスト・画像から動画を生成。SNSコンテンツ制作に最適な使いやすいAI',
    category: '動画生成AI',
    categorySlug: 'video',
    pricing: 'freemium',
    pricingDetail: '無料プランは月150クレジット。Basicプラン月額$8〜',
    features: [
      'テキストから動画生成（Text-to-Video）',
      '画像から動画生成（Image-to-Video）',
      '既存動画への動き追加',
      'カメラアングル・モーションコントロール',
      'キャラクターの一貫性維持',
      '直感的なWebインターフェース',
    ],
    officialUrl: 'https://pika.art',
    affiliateUrl: 'https://pika.art',
    imageUrl: '',
    tags: ['動画生成', 'AIアニメーション', 'SNS動画', 'テキストから動画'],
    createdAt: '2023-11-27',
    rating: 4.3,
  },

  // コーディングAI
  {
    id: 'tool-15',
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    description:
      'GitHubとOpenAIが共同開発したAIペアプログラマーです。コードエディタ（VS Code、JetBrains等）に統合され、コメントや文脈からコードを自動補完・生成します。テスト生成、バグ修正の提案、コードの説明などにも対応しており、開発者の生産性を大幅に向上させます。企業向けのCopilot Enterpriseでは社内コードを学習させることも可能です。',
    shortDescription: 'GitHub・OpenAI製のAIペアプログラマー。VS Codeでコードを自動補完',
    category: 'コーディングAI',
    categorySlug: 'coding',
    pricing: 'paid',
    pricingDetail: '個人プラン月額$10。Businessプラン月額$19/ユーザー。60日間無料トライアルあり',
    features: [
      'VS Code・JetBrains等の主要IDEに対応',
      'コンテキストに基づいたコード補完・生成',
      'テストコードの自動生成',
      'コードの説明とレビュー機能',
      'セキュリティ脆弱性の検出',
      '企業向けコードの学習機能（Enterprise）',
    ],
    officialUrl: 'https://github.com/features/copilot',
    affiliateUrl: 'https://github.com/features/copilot',
    imageUrl: '',
    tags: ['コーディングAI', 'AI補完', 'VS Code', 'GitHub', 'プログラミング'],
    createdAt: '2021-10-29',
    rating: 4.7,
  },
  {
    id: 'tool-16',
    name: 'Cursor',
    slug: 'cursor',
    description:
      'AIを中心に設計されたコードエディタです。VS Codeをベースに、AIとの深い統合を実現しています。Cmd+Kでコードを自然言語で編集、Cmd+Lでチャットしながらコーディング、コードベース全体を理解したAIが高精度な補完を提供します。プロジェクト全体のコンテキストを理解したコード生成が特徴です。',
    shortDescription: 'AI統合のコードエディタ。VS Codeベースでプロジェクト全体を理解したAI補完',
    category: 'コーディングAI',
    categorySlug: 'coding',
    pricing: 'freemium',
    pricingDetail: '無料プランあり（月2,000回の補完）。Proプラン月額$20',
    features: [
      'コードベース全体を理解したAI補完',
      '自然言語でのコード編集（Cmd+K）',
      'AIとのチャット機能（Cmd+L）',
      'マルチファイル編集対応',
      'GPT-4・Claude 3.5等の最新モデルを選択可能',
      'VS Codeの拡張機能・設定を引き継ぎ可能',
    ],
    officialUrl: 'https://www.cursor.com',
    affiliateUrl: 'https://www.cursor.com',
    imageUrl: '',
    tags: ['コーディングAI', 'コードエディタ', 'VS Code', 'AI補完', 'プログラミング'],
    createdAt: '2023-03-14',
    rating: 4.8,
  },
  {
    id: 'tool-17',
    name: 'Tabnine',
    slug: 'tabnine',
    description:
      'プライバシーを重視した企業向けのAIコード補完ツールです。コードがクラウドに送信されないプライベートモードが利用可能で、オンプレミス展開にも対応しています。Java、Python、JavaScript、TypeScriptなど30以上の言語に対応しており、既存のIDEにプラグインとして統合できます。',
    shortDescription: 'プライバシー重視の企業向けAIコード補完。オンプレミス対応で社内コードを安全に扱える',
    category: 'コーディングAI',
    categorySlug: 'coding',
    pricing: 'freemium',
    pricingDetail: '無料プランあり。Proプラン月額$12。Enterpriseは要問い合わせ',
    features: [
      'プライベートモードでコードが外部に送信されない',
      'オンプレミス展開対応',
      '30以上のプログラミング言語対応',
      '主要IDEへのプラグイン統合',
      '社内コードベースの学習機能',
      'SOC 2 Type II準拠のセキュリティ',
    ],
    officialUrl: 'https://www.tabnine.com',
    affiliateUrl: 'https://www.tabnine.com',
    imageUrl: '',
    tags: ['コーディングAI', 'AI補完', 'プライバシー', '企業向け', 'オンプレミス'],
    createdAt: '2019-01-01',
    rating: 4.2,
  },

  // 音声・音楽AI
  {
    id: 'tool-18',
    name: 'Suno',
    slug: 'suno',
    description:
      'テキストから本格的な楽曲を生成するAIサービスです。ジャンル・スタイル・歌詞を指定するだけで、ボーカル付きの完全な楽曲を数秒で生成できます。ポップ、ロック、ジャズ、クラシック、ヒップホップなどあらゆる音楽ジャンルに対応しており、商用利用プランもあります。',
    shortDescription: 'テキストから本格的な楽曲を生成。ボーカル付きの完全な曲が数秒で完成',
    category: '音声・音楽AI',
    categorySlug: 'audio',
    pricing: 'freemium',
    pricingDetail: '無料プランは1日10クレジット（5曲）。Proプラン月額$10〜',
    features: [
      'テキストから完全な楽曲生成（ボーカル付き）',
      '歌詞の自動生成または指定',
      '多様な音楽ジャンルとスタイル対応',
      '楽曲の続き生成・リミックス機能',
      '商用利用プランあり',
      '直感的なWebインターフェース',
    ],
    officialUrl: 'https://suno.com',
    affiliateUrl: 'https://suno.com',
    imageUrl: '',
    tags: ['音楽生成', 'AI作曲', '楽曲生成', '音声AI', 'ボーカル'],
    createdAt: '2023-12-20',
    rating: 4.6,
  },
  {
    id: 'tool-19',
    name: 'ElevenLabs',
    slug: 'elevenlabs',
    description:
      '最高品質の音声合成・クローニングAIサービスです。わずか1分の音声サンプルから声のクローンを作成し、任意のテキストを読み上げさせることができます。感情表現、アクセント、話速などの細かい制御が可能で、オーディオブック、ポッドキャスト、動画ナレーション、ゲームキャラクターの音声制作に広く使われています。',
    shortDescription: '最高品質の音声合成・クローニングAI。1分のサンプルから声を再現',
    category: '音声・音楽AI',
    categorySlug: 'audio',
    pricing: 'freemium',
    pricingDetail: '無料プランは月10,000文字。Starterプラン月額$5〜',
    features: [
      '業界最高品質の音声合成',
      '1分の音声サンプルから声のクローン作成',
      '感情・抑揚・アクセントのコントロール',
      '29言語・数千の音声に対応',
      'リアルタイム音声変換',
      'APIによるシステム統合',
    ],
    officialUrl: 'https://elevenlabs.io',
    affiliateUrl: 'https://elevenlabs.io',
    imageUrl: '',
    tags: ['音声合成', '音声クローン', 'TTS', 'ナレーション', 'ポッドキャスト'],
    createdAt: '2022-01-01',
    rating: 4.8,
  },
  {
    id: 'tool-20',
    name: 'Udio',
    slug: 'udio',
    description:
      'Sunoと並ぶ人気の音楽生成AIサービスです。テキストプロンプトから高品質な楽曲を生成し、細かいスタイル制御が可能です。イントロ・ブリッジ・アウトロなど楽曲構成の細部を指定でき、複数のクリップを組み合わせて完全な楽曲を構成する機能が特徴です。音楽的な多様性とリアリズムが高い評価を受けています。',
    shortDescription: '高品質な音楽生成AI。楽曲構成の細部まで指定できる高い制御性が特徴',
    category: '音声・音楽AI',
    categorySlug: 'audio',
    pricing: 'freemium',
    pricingDetail: '無料プランは月1,200クレジット。Standardプラン月額$10〜',
    features: [
      'テキストから高品質な楽曲生成',
      '楽曲構成（イントロ・サビ・アウトロ等）の細かい指定',
      '複数クリップの組み合わせで完全な楽曲を構成',
      '高い音楽的多様性とリアリズム',
      'カスタムタグによるスタイル制御',
      '商用利用プランあり',
    ],
    officialUrl: 'https://www.udio.com',
    affiliateUrl: 'https://www.udio.com',
    imageUrl: '',
    tags: ['音楽生成', 'AI作曲', '楽曲生成', 'テキストから音楽'],
    createdAt: '2024-04-10',
    rating: 4.5,
  },
];

export const alternatives: Alternative[] = [
  // ChatGPTの代替
  { id: 'alt-1', toolId: 'tool-1', alternativeToolId: 'tool-2' },   // Claude
  { id: 'alt-2', toolId: 'tool-1', alternativeToolId: 'tool-3' },   // Gemini
  { id: 'alt-3', toolId: 'tool-1', alternativeToolId: 'tool-7' },   // Perplexity
  { id: 'alt-4', toolId: 'tool-1', alternativeToolId: 'tool-4' },   // Jasper
  { id: 'alt-5', toolId: 'tool-1', alternativeToolId: 'tool-5' },   // Copy.ai

  // Claudeの代替
  { id: 'alt-6', toolId: 'tool-2', alternativeToolId: 'tool-1' },   // ChatGPT
  { id: 'alt-7', toolId: 'tool-2', alternativeToolId: 'tool-3' },   // Gemini
  { id: 'alt-8', toolId: 'tool-2', alternativeToolId: 'tool-7' },   // Perplexity

  // Geminiの代替
  { id: 'alt-9', toolId: 'tool-3', alternativeToolId: 'tool-1' },   // ChatGPT
  { id: 'alt-10', toolId: 'tool-3', alternativeToolId: 'tool-2' },  // Claude
  { id: 'alt-11', toolId: 'tool-3', alternativeToolId: 'tool-7' },  // Perplexity

  // Midjourneyの代替
  { id: 'alt-12', toolId: 'tool-8', alternativeToolId: 'tool-9' },  // Stable Diffusion
  { id: 'alt-13', toolId: 'tool-8', alternativeToolId: 'tool-10' }, // DALL-E
  { id: 'alt-14', toolId: 'tool-8', alternativeToolId: 'tool-11' }, // Adobe Firefly

  // Stable Diffusionの代替
  { id: 'alt-15', toolId: 'tool-9', alternativeToolId: 'tool-8' },  // Midjourney
  { id: 'alt-16', toolId: 'tool-9', alternativeToolId: 'tool-10' }, // DALL-E
  { id: 'alt-17', toolId: 'tool-9', alternativeToolId: 'tool-11' }, // Adobe Firefly

  // DALL-Eの代替
  { id: 'alt-18', toolId: 'tool-10', alternativeToolId: 'tool-8' }, // Midjourney
  { id: 'alt-19', toolId: 'tool-10', alternativeToolId: 'tool-9' }, // Stable Diffusion
  { id: 'alt-20', toolId: 'tool-10', alternativeToolId: 'tool-11' },// Adobe Firefly

  // GitHub Copilotの代替
  { id: 'alt-21', toolId: 'tool-15', alternativeToolId: 'tool-16' }, // Cursor
  { id: 'alt-22', toolId: 'tool-15', alternativeToolId: 'tool-17' }, // Tabnine

  // Cursorの代替
  { id: 'alt-23', toolId: 'tool-16', alternativeToolId: 'tool-15' }, // GitHub Copilot
  { id: 'alt-24', toolId: 'tool-16', alternativeToolId: 'tool-17' }, // Tabnine

  // Runwayの代替
  { id: 'alt-25', toolId: 'tool-12', alternativeToolId: 'tool-13' }, // Descript
  { id: 'alt-26', toolId: 'tool-12', alternativeToolId: 'tool-14' }, // Pika

  // Sunoの代替
  { id: 'alt-27', toolId: 'tool-18', alternativeToolId: 'tool-20' }, // Udio
  { id: 'alt-28', toolId: 'tool-18', alternativeToolId: 'tool-19' }, // ElevenLabs

  // ElevenLabsの代替
  { id: 'alt-29', toolId: 'tool-19', alternativeToolId: 'tool-18' }, // Suno
  { id: 'alt-30', toolId: 'tool-19', alternativeToolId: 'tool-20' }, // Udio

  // Jasperの代替
  { id: 'alt-31', toolId: 'tool-4', alternativeToolId: 'tool-5' },  // Copy.ai
  { id: 'alt-32', toolId: 'tool-4', alternativeToolId: 'tool-1' },  // ChatGPT
  { id: 'alt-33', toolId: 'tool-4', alternativeToolId: 'tool-6' },  // Notion AI

  // Perplexityの代替
  { id: 'alt-34', toolId: 'tool-7', alternativeToolId: 'tool-1' },  // ChatGPT
  { id: 'alt-35', toolId: 'tool-7', alternativeToolId: 'tool-2' },  // Claude
  { id: 'alt-36', toolId: 'tool-7', alternativeToolId: 'tool-3' },  // Gemini
];

// 全ツールを取得
export function getAllTools(): Tool[] {
  return tools;
}

// スラッグでツールを取得
export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

// カテゴリスラッグでツールを取得
export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter((tool) => tool.categorySlug === categorySlug);
}

// 全カテゴリを取得
export function getAllCategories(): Category[] {
  return categories;
}

// スラッグでカテゴリを取得
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

// あるツールの代替ツールを取得
export function getAlternativesForTool(toolSlug: string): Tool[] {
  const tool = getToolBySlug(toolSlug);
  if (!tool) return [];

  const altIds = alternatives
    .filter((alt) => alt.toolId === tool.id)
    .map((alt) => alt.alternativeToolId);

  return tools.filter((t) => altIds.includes(t.id));
}

// このツールが代替とみなされているツールの一覧を取得
export function getAlternativesOf(toolSlug: string): Tool[] {
  const tool = getToolBySlug(toolSlug);
  if (!tool) return [];

  const originalIds = alternatives
    .filter((alt) => alt.alternativeToolId === tool.id)
    .map((alt) => alt.toolId);

  return tools.filter((t) => originalIds.includes(t.id));
}

// ToolWithAlternativesを取得
export function getToolWithAlternatives(toolSlug: string): ToolWithAlternatives | undefined {
  const tool = getToolBySlug(toolSlug);
  if (!tool) return undefined;

  const toolAlternatives = getAlternativesForTool(toolSlug);
  return { ...tool, alternatives: toolAlternatives };
}

// 総代替候補数を計算
export function getTotalAlternativesCount(): number {
  return alternatives.length;
}
