/*
MIT License

Copyright (c) 2025 MBTI診断アプリ

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// 定数定義
const TOTAL_QUESTIONS = 60;
const QUESTIONS_PER_DIMENSION = 15;
const LOCAL_STORAGE_KEY = 'mbti_diagnosis_result';

// 質問データ（4指標×15問 = 60問）
const questions = [
    // E（外向性）vs I（内向性）の質問 15問
    {
        dimension: 'EI',
        question: '新しい人と出会うとき、どちらの方が自然ですか？',
        optionA: { text: '積極的に話しかけ、すぐに打ち解ける', score: 'E' },
        optionB: { text: '相手から話しかけられるのを待つ', score: 'I' }
    },
    {
        dimension: 'EI',
        question: 'パーティーや集まりでは、どのような状態になりますか？',
        optionA: { text: 'エネルギーが高まり、活気づく', score: 'E' },
        optionB: { text: '疲れやすく、静かな場所を求める', score: 'I' }
    },
    {
        dimension: 'EI',
        question: 'アイデアを考えるとき、どちらの方法を好みますか？',
        optionA: { text: '他の人と話しながら考える', score: 'E' },
        optionB: { text: '一人で静かに考える', score: 'I' }
    },
    {
        dimension: 'EI',
        question: '休日の過ごし方として、どちらが理想的ですか？',
        optionA: { text: '友人と外出して活動的に過ごす', score: 'E' },
        optionB: { text: '家で読書や趣味を楽しむ', score: 'I' }
    },
    {
        dimension: 'EI',
        question: '仕事環境として、どちらが好ましいですか？',
        optionA: { text: 'オープンな空間で同僚と交流', score: 'E' },
        optionB: { text: '個人の作業スペースで集中', score: 'I' }
    },
    {
        dimension: 'EI',
        question: 'ストレス解消方法として、どちらを選びますか？',
        optionA: { text: '友人とカラオケや食事', score: 'E' },
        optionB: { text: '一人で音楽を聴いたり映画鑑賞', score: 'I' }
    },
    {
        dimension: 'EI',
        question: '会議やグループディスカッションでは？',
        optionA: { text: '思いついたことをすぐに発言する', score: 'E' },
        optionB: { text: 'よく考えてから発言する', score: 'I' }
    },
    {
        dimension: 'EI',
        question: '電話での会話について、どう感じますか？',
        optionA: { text: '楽しく、長時間話せる', score: 'E' },
        optionB: { text: '必要最小限に済ませたい', score: 'I' }
    },
    {
        dimension: 'EI',
        question: '新しい環境に入るとき、どのような行動を取りますか？',
        optionA: { text: '積極的に周りの人に声をかける', score: 'E' },
        optionB: { text: 'しばらく様子を見てから行動する', score: 'I' }
    },
    {
        dimension: 'EI',
        question: '友人関係において、どちらを重視しますか？',
        optionA: { text: '広く浅い関係を多く持つ', score: 'E' },
        optionB: { text: '深い関係を少数持つ', score: 'I' }
    },
    {
        dimension: 'EI',
        question: '学習方法として、どちらが効果的ですか？',
        optionA: { text: 'グループ学習や討論', score: 'E' },
        optionB: { text: '個人学習や独習', score: 'I' }
    },
    {
        dimension: 'EI',
        question: '意思決定をするとき、どのようなプロセスを取りますか？',
        optionA: { text: '他の人と相談しながら決める', score: 'E' },
        optionB: { text: '自分でじっくり考えて決める', score: 'I' }
    },
    {
        dimension: 'EI',
        question: '注目される場面では、どう感じますか？',
        optionA: { text: '楽しく、エネルギーが湧く', score: 'E' },
        optionB: { text: '居心地が悪く、早く終わってほしい', score: 'I' }
    },
    {
        dimension: 'EI',
        question: '週末の予定について、どちらが理想的ですか？',
        optionA: { text: '予定をたくさん入れて忙しく過ごす', score: 'E' },
        optionB: { text: '何も予定を入れず、ゆったり過ごす', score: 'I' }
    },
    {
        dimension: 'EI',
        question: 'エネルギーの充電方法として、どちらが効果的ですか？',
        optionA: { text: '人と一緒に活動する', score: 'E' },
        optionB: { text: '一人の時間を持つ', score: 'I' }
    },

    // S（感覚）vs N（直観）の質問 15問
    {
        dimension: 'SN',
        question: '情報を処理するとき、どちらに重点を置きますか？',
        optionA: { text: '具体的な事実やデータ', score: 'S' },
        optionB: { text: '可能性やパターン', score: 'N' }
    },
    {
        dimension: 'SN',
        question: '新しいプロジェクトを始めるとき、どこから取り組みますか？',
        optionA: { text: '詳細な計画と具体的な手順', score: 'S' },
        optionB: { text: '全体のビジョンと可能性', score: 'N' }
    },
    {
        dimension: 'SN',
        question: '学習において、どちらの方法が理解しやすいですか？',
        optionA: { text: '実例と体験を通じた学習', score: 'S' },
        optionB: { text: '理論と概念の理解', score: 'N' }
    },
    {
        dimension: 'SN',
        question: '問題解決において、どちらのアプローチを取りますか？',
        optionA: { text: '実績のある方法を段階的に適用', score: 'S' },
        optionB: { text: '新しいアイデアや革新的な方法', score: 'N' }
    },
    {
        dimension: 'SN',
        question: '会話の内容として、どちらに興味を持ちますか？',
        optionA: { text: '日常的な出来事や現実的な話題', score: 'S' },
        optionB: { text: '将来の可能性や抽象的なアイデア', score: 'N' }
    },
    {
        dimension: 'SN',
        question: '記憶において、どちらがより印象に残りますか？',
        optionA: { text: '具体的な詳細や事実', score: 'S' },
        optionB: { text: '全体的な印象や意味', score: 'N' }
    },
    {
        dimension: 'SN',
        question: '指示や説明を受けるとき、どちらを好みますか？',
        optionA: { text: 'ステップバイステップの詳細な説明', score: 'S' },
        optionB: { text: '概要と目的の説明', score: 'N' }
    },
    {
        dimension: 'SN',
        question: '時間の使い方において、どちらを重視しますか？',
        optionA: { text: '現在に集中し、今できることをする', score: 'S' },
        optionB: { text: '将来の計画と可能性を考える', score: 'N' }
    },
    {
        dimension: 'SN',
        question: '創作活動において、どちらに魅力を感じますか？',
        optionA: { text: '技術的な完成度と実用性', score: 'S' },
        optionB: { text: 'オリジナリティと独創性', score: 'N' }
    },
    {
        dimension: 'SN',
        question: '変化に対して、どのような態度を取りますか？',
        optionA: { text: '慎重に検証し、必要性を確認する', score: 'S' },
        optionB: { text: '新しい可能性として歓迎する', score: 'N' }
    },
    {
        dimension: 'SN',
        question: '読書において、どちらのジャンルを好みますか？',
        optionA: { text: '実用書や歴史書などの事実に基づく本', score: 'S' },
        optionB: { text: 'SF小説や哲学書などの想像力を使う本', score: 'N' }
    },
    {
        dimension: 'SN',
        question: '仕事において、どちらのタスクが得意ですか？',
        optionA: { text: '決まった手順での確実な作業', score: 'S' },
        optionB: { text: '新しいアイデアの発想や企画', score: 'N' }
    },
    {
        dimension: 'SN',
        question: '旅行の計画において、どちらを重視しますか？',
        optionA: { text: '詳細なスケジュールと確実な予約', score: 'S' },
        optionB: { text: '自由度の高いプランと偶然の出会い', score: 'N' }
    },
    {
        dimension: 'SN',
        question: '芸術作品を鑑賞するとき、どこに注目しますか？',
        optionA: { text: '技法や色彩などの具体的な要素', score: 'S' },
        optionB: { text: 'メッセージや象徴的な意味', score: 'N' }
    },
    {
        dimension: 'SN',
        question: '新しい技術やツールに対して、どう接しますか？',
        optionA: { text: '実用性と信頼性を重視して選択', score: 'S' },
        optionB: { text: '革新性と将来性を重視して選択', score: 'N' }
    },

    // T（思考）vs F（感情）の質問 15問
    {
        dimension: 'TF',
        question: '意思決定をするとき、何を最も重視しますか？',
        optionA: { text: '論理的な分析と客観的な判断', score: 'T' },
        optionB: { text: '人への影響と感情的な配慮', score: 'F' }
    },
    {
        dimension: 'TF',
        question: '批判や指摘をするとき、どのような態度を取りますか？',
        optionA: { text: '事実に基づいて率直に指摘する', score: 'T' },
        optionB: { text: '相手の気持ちを考慮して優しく伝える', score: 'F' }
    },
    {
        dimension: 'TF',
        question: '職場での評価基準として、何を重視しますか？',
        optionA: { text: '能力と成果の客観的な評価', score: 'T' },
        optionB: { text: '努力と協調性を含めた総合的な評価', score: 'F' }
    },
    {
        dimension: 'TF',
        question: '友人が悩みを相談してきたとき、どう対応しますか？',
        optionA: { text: '問題の分析と解決策を提案する', score: 'T' },
        optionB: { text: '共感し、感情的なサポートを提供する', score: 'F' }
    },
    {
        dimension: 'TF',
        question: '映画や小説を評価するとき、何を重視しますか？',
        optionA: { text: 'ストーリーの論理性と構成の巧妙さ', score: 'T' },
        optionB: { text: '感動的な要素と登場人物への共感', score: 'F' }
    },
    {
        dimension: 'TF',
        question: 'チームワークにおいて、どちらの役割を果たしやすいですか？',
        optionA: { text: '効率性を追求し、課題を整理する', score: 'T' },
        optionB: { text: 'メンバー間の調和を保ち、モチベーションを上げる', score: 'F' }
    },
    {
        dimension: 'TF',
        question: '議論や討論において、どのような立場を取りますか？',
        optionA: { text: '論理的な根拠に基づいて主張する', score: 'T' },
        optionB: { text: '全員が納得できる妥協点を探す', score: 'F' }
    },
    {
        dimension: 'TF',
        question: '規則やルールについて、どう考えますか？',
        optionA: { text: '合理性があれば厳格に適用すべき', score: 'T' },
        optionB: { text: '状況や個人の事情を考慮すべき', score: 'F' }
    },
    {
        dimension: 'TF',
        question: '自分の意見を述べるとき、どちらを重視しますか？',
        optionA: { text: '正確性と論理的な一貫性', score: 'T' },
        optionB: { text: '相手への配慮と関係性の維持', score: 'F' }
    },
    {
        dimension: 'TF',
        question: '成功の定義として、どちらにより価値を感じますか？',
        optionA: { text: '目標達成と効率的な成果', score: 'T' },
        optionB: { text: '人とのつながりと相互の成長', score: 'F' }
    },
    {
        dimension: 'TF',
        question: '購入決定をするとき、何を最も重視しますか？',
        optionA: { text: 'コストパフォーマンスと機能性', score: 'T' },
        optionB: { text: 'ブランドの価値観と感情的な満足', score: 'F' }
    },
    {
        dimension: 'TF',
        question: '失敗や間違いに対して、どう対処しますか？',
        optionA: { text: '原因を分析し、システムの改善を図る', score: 'T' },
        optionB: { text: '関係者への配慮と感情的なケアを優先する', score: 'F' }
    },
    {
        dimension: 'TF',
        question: 'プレゼンテーションにおいて、何を重視しますか？',
        optionA: { text: 'データと論理的な構成', score: 'T' },
        optionB: { text: '聴衆との共感と感情的な訴求', score: 'F' }
    },
    {
        dimension: 'TF',
        question: '組織の運営において、どちらを優先しますか？',
        optionA: { text: '効率性と成果の最大化', score: 'T' },
        optionB: { text: 'メンバーの満足と職場環境', score: 'F' }
    },
    {
        dimension: 'TF',
        question: '価値判断の基準として、どちらを重視しますか？',
        optionA: { text: '普遍的な原則と公正性', score: 'T' },
        optionB: { text: '個人の価値観と人間性', score: 'F' }
    },

    // J（判断）vs P（知覚）の質問 15問
    {
        dimension: 'JP',
        question: '日常生活において、どちらのスタイルを好みますか？',
        optionA: { text: '決まったスケジュールと計画的な行動', score: 'J' },
        optionB: { text: '柔軟性と自由度の高い行動', score: 'P' }
    },
    {
        dimension: 'JP',
        question: 'プロジェクトの進め方として、どちらを選びますか？',
        optionA: { text: '早めに完成させ、余裕を持って提出', score: 'J' },
        optionB: { text: 'ギリギリまで改善を続け、締切前に仕上げる', score: 'P' }
    },
    {
        dimension: 'JP',
        question: '部屋や作業環境について、どちらが理想的ですか？',
        optionA: { text: '整理整頓された、物の場所が決まっている', score: 'J' },
        optionB: { text: '必要な物がすぐ手に取れる、創造的な散らかり', score: 'P' }
    },
    {
        dimension: 'JP',
        question: '意思決定において、どちらのプロセスを好みますか？',
        optionA: { text: '迅速に決断し、それに従って行動する', score: 'J' },
        optionB: { text: '多くの選択肢を検討し、状況に応じて変更する', score: 'P' }
    },
    {
        dimension: 'JP',
        question: '買い物において、どちらの方法を取りますか？',
        optionA: { text: '事前にリストを作成し、計画的に購入', score: 'J' },
        optionB: { text: '店で見て回りながら、直感で必要な物を選ぶ', score: 'P' }
    },
    {
        dimension: 'JP',
        question: '休暇の過ごし方として、どちらが魅力的ですか？',
        optionA: { text: '詳細な旅行計画と予約済みの安心感', score: 'J' },
        optionB: { text: '行き当たりばったりの自由な旅', score: 'P' }
    },
    {
        dimension: 'JP',
        question: '仕事の優先順位について、どう管理しますか？',
        optionA: { text: 'To-doリストを作成し、順番に処理する', score: 'J' },
        optionB: { text: 'その時の気分や状況に応じて柔軟に選択する', score: 'P' }
    },
    {
        dimension: 'JP',
        question: '変更や中断に対して、どう反応しますか？',
        optionA: { text: 'ストレスを感じ、元の計画に戻そうとする', score: 'J' },
        optionB: { text: '新しい可能性として受け入れ、適応する', score: 'P' }
    },
    {
        dimension: 'JP',
        question: '会議や約束の時間について、どう考えますか？',
        optionA: { text: '時間厳守は基本的なマナー', score: 'J' },
        optionB: { text: '状況に応じて多少の変更は仕方ない', score: 'P' }
    },
    {
        dimension: 'JP',
        question: '新しい情報に接したとき、どう処理しますか？',
        optionA: { text: 'すぐに整理し、カテゴリーに分けて保存', score: 'J' },
        optionB: { text: 'とりあえず保存し、必要な時に探す', score: 'P' }
    },
    {
        dimension: 'JP',
        question: 'ストレス解消において、どちらが効果的ですか？',
        optionA: { text: '計画的な休息と規則正しい生活', score: 'J' },
        optionB: { text: '気分転換と自由な時間の過ごし方', score: 'P' }
    },
    {
        dimension: 'JP',
        question: '学習方法として、どちらが効率的ですか？',
        optionA: { text: '学習計画を立て、定期的に復習する', score: 'J' },
        optionB: { text: '興味のある分野から始め、関連分野に広げる', score: 'P' }
    },
    {
        dimension: 'JP',
        question: '問題解決において、どちらのアプローチを取りますか？',
        optionA: { text: '段階的に分析し、体系的に解決する', score: 'J' },
        optionB: { text: '様々な角度から試行錯誤し、創造的に解決する', score: 'P' }
    },
    {
        dimension: 'JP',
        question: '目標設定について、どう考えますか？',
        optionA: { text: '明確で具体的な目標と達成期限が必要', score: 'J' },
        optionB: { text: '大まかな方向性があれば、過程で調整可能', score: 'P' }
    },
    {
        dimension: 'JP',
        question: '創作活動において、どちらのスタイルを好みますか？',
        optionA: { text: '構想を練ってから、計画的に制作する', score: 'J' },
        optionB: { text: '制作しながらアイデアを発展させる', score: 'P' }
    }
];

// MBTIタイプの詳細情報
const mbtiTypes = {
    'ENTJ': {
        title: '指揮官',
        subtitle: '天性のリーダー',
        description: 'あなたは生まれながらのリーダーです。大きな目標を掲げ、効率的にチームを導くことに喜びを感じます。「不可能」という言葉を信じず、常に革新と改善を追求します。困難な状況でも冷静に判断し、最適な解決策を見つけ出す能力は群を抜いています。',
        personality: 'カフェで友人を待つとき、あなたは既に次のプロジェクトの企画書をスマホで確認しているかもしれません。無駄な時間を嫌い、常に生産性を意識していますが、その分、チームメンバーからの信頼は絶大です。',
        strengths: ['天性のリーダーシップと統率力', '複雑な問題を体系的に解決する能力', '目標達成への並外れた推進力', '効率性と成果を重視する実践的思考', '長期的なビジョンを描く戦略性'],
        weaknesses: ['他人の感情的ニーズを見落としがち', '完璧主義が過度になることがある', '批判や失敗を個人的に受け取りやすい', '細かい作業や単調な業務に苦手意識', '急いで決断しすぎる傾向'],
        careers: ['CEO・経営者', 'プロジェクトマネージャー', '起業家', '戦略コンサルタント', '投資銀行家', '政治家'],
        famous: ['スティーブ・ジョブズ', 'ナポレオン・ボナパルト', 'マーガレット・サッチャー'],
        compatibility: {
            best: ['INFP', 'INTP', 'ENFP'],
            good: ['INTJ', 'ENFJ', 'ENTP'],
            challenging: ['ISFP', 'ISFJ', 'ESFJ']
        },
        growth: [
            '他者の感情や意見により積極的に耳を傾ける',
            '完璧を求めすぎず、80%の完成度で進める練習',
            '定期的な休息とリラックス時間を意図的に作る',
            'チームメンバーの個人的な成長にも関心を向ける'
        ],
        actionPlan: [
            '今週中に部下や同僚1人と1対1の対話時間を設ける',
            '次のプロジェクトで意図的に他者の意見を取り入れる場面を作る',
            '毎日15分の瞑想や散歩でマインドフルネスを実践する'
        ]
    },
    'ENTP': {
        title: '討論者',
        subtitle: 'アイデアの宝庫',
        description: 'あなたの頭の中は常に新しいアイデアで溢れています。議論を通じて思考を深め、可能性を追求することに情熱を注ぎます。型にはまることを嫌い、常に新しい視点や革新的な解決策を見つけ出します。',
        personality: '会話の中で「でも、もしこうだったら？」と質問することが多いかもしれません。一つの話題から連想して、気づくと全く違う話をしていることも。その柔軟な思考力で、周りの人に新しい視点を提供します。',
        strengths: ['革新的なアイデアと創造性', '優れたコミュニケーション能力', '変化への高い適応力', '多角的な視点での問題解決', '人を魅了するプレゼンテーション力'],
        weaknesses: ['ルーチンワークへの苦手意識', '最後まで完成させることの困難さ', '細かい作業や詳細への注意不足', '計画性の不足', '一つのことに集中し続けることの難しさ'],
        careers: ['マーケティング担当者', 'コンサルタント', '起業家', 'ジャーナリスト', '広告クリエイター', '研究開発職'],
        famous: ['ウォルト・ディズニー', 'マーク・トウェイン', 'ロバート・ダウニー・Jr'],
        compatibility: {
            best: ['INFJ', 'INTJ', 'ENFJ'],
            good: ['ENTP', 'ENFP', 'ENTJ'],
            challenging: ['ISTJ', 'ISFJ', 'ESTJ']
        },
        growth: [
            '一つのプロジェクトを最後まで完成させる習慣をつける',
            '詳細や実行計画により注意を払う',
            '他者の感情により敏感になる練習をする',
            '定期的なルーチンの中にも価値を見出す'
        ],
        actionPlan: [
            '今取り組んでいるプロジェクトの完成予定日を設定する',
            '毎日のTo-Doリストを作成し、小さなタスクから実行する',
            '週1回、詳細な計画を立てる時間を設ける'
        ]
    },
    'ENFJ': {
        title: '主人公',
        subtitle: '人々のインスピレーター',
        description: 'あなたは人々の潜在能力を見抜き、それを引き出すことに喜びを感じます。他者の成長を支援し、チーム全体をより良い方向に導くことが得意です。深い共感力と洞察力で、人々の心に寄り添います。',
        personality: '友人の相談に乗るとき、あなたは単に話を聞くだけでなく、その人の本当の可能性を見つけ出そうとします。時には相手が気づいていない才能や強みを指摘し、背中を押してあげることも多いでしょう。',
        strengths: ['深い共感力と理解力', '人を導き成長させる能力', '優れたコミュニケーションスキル', 'チーム全体を統合する力', '他者のモチベーションを高める才能'],
        weaknesses: ['自分のニーズを後回しにしがち', '批判や対立に敏感すぎる', '他人に過度な期待をかけてしまう', '完璧主義的になりやすい', 'ネガティブな感情を抑え込みがち'],
        careers: ['教師・講師', 'カウンセラー', 'HR担当者', 'コーチ', 'NGO職員', '心理学者'],
        famous: ['オプラ・ウィンフリー', 'バラク・オバマ', 'マーティン・ルーサー・キング・Jr'],
        compatibility: {
            best: ['INFP', 'ISFP', 'ENTP'],
            good: ['ENFP', 'INFJ', 'ENTJ'],
            challenging: ['ISTP', 'ESTP', 'ESTJ']
        },
        growth: [
            '自分のニーズと感情を大切にする習慣をつける',
            '完璧でなくても良しとする心の余裕を持つ',
            '他者への期待値を現実的なレベルに調整する',
            '時には「ノー」と言う勇気を持つ'
        ],
        actionPlan: [
            '毎日10分間、自分の感情を振り返る時間を作る',
            '今週、自分のために何か特別なことを1つ実行する',
            '断ることに対する練習を小さなことから始める'
        ]
    },
    'ENFP': {
        title: '運動家',
        strengths: ['創造性と熱意に満ちている', '人とのつながりを大切にする', '新しいアイデアを生み出す'],
        weaknesses: ['集中力を維持するのが困難', '詳細や手順を軽視しがち', '批判に敏感'],
        careers: ['クリエイティブディレクター', 'ジャーナリスト', 'セラピスト']
    },
    'ESTJ': {
        title: '幹部',
        strengths: ['組織化と管理能力に優れる', '責任感が強い', '実用的な解決策を提供'],
        weaknesses: ['変化に対して抵抗感がある', '他人の感情を軽視しがち', '型にはまりすぎる'],
        careers: ['プロジェクトマネージャー', '管理職', '公務員']
    },
    'ESTP': {
        title: '起業家',
        strengths: ['実行力と行動力がある', '現実的な問題解決能力', '人とのつながりを築くのが得意'],
        weaknesses: ['長期計画が苦手', '理論的な学習を避けがち', '衝動的になりがち'],
        careers: ['営業職', 'イベントプランナー', 'スポーツインストラクター']
    },
    'ESFJ': {
        title: '領事',
        strengths: ['協調性とサポート力に優れる', '責任感が強い', '人の気持ちを理解できる'],
        weaknesses: ['批判に敏感', '変化を嫌う傾向', '自分のニーズを後回しにしがち'],
        careers: ['看護師', '教師', '人事担当者']
    },
    'ESFP': {
        title: 'エンターテイナー',
        strengths: ['人を楽しませる能力', '柔軟性と適応力', '実用的なスキルを持つ'],
        weaknesses: ['長期計画が苦手', '批判に敏感', '構造化された環境が苦手'],
        careers: ['俳優・パフォーマー', 'イベントコーディネーター', 'セールス担当']
    },
    'INTJ': {
        title: '建築家',
        strengths: ['戦略的思考力', '独立性と決断力', '革新的なアイデアを生み出す'],
        weaknesses: ['社交的でない傾向', '完璧主義すぎる', '他人の感情を軽視しがち'],
        careers: ['研究者', 'システムアナリスト', '戦略コンサルタント']
    },
    'INTP': {
        title: '論理学者',
        strengths: ['論理的分析力に優れる', '創造性と柔軟性', '独立して作業する能力'],
        weaknesses: ['実践的な作業が苦手', '感情的な配慮に欠ける', '締切を守るのが困難'],
        careers: ['研究者', 'ソフトウェアエンジニア', '大学教授']
    },
    'INFJ': {
        title: '提唱者',
        strengths: ['深い洞察力', '創造性と理想主義', '人を理解し支援する能力'],
        weaknesses: ['完璧主義すぎる', '批判に敏感', '現実的な制約を軽視しがち'],
        careers: ['カウンセラー', '作家', 'NGO職員']
    },
    'INFP': {
        title: '仲介者',
        subtitle: '理想を追求する夢想家',
        description: 'あなたは豊かな内面世界を持つ理想主義者です。深い価値観と創造性を持ち、世界をより美しく意味のある場所にしたいと願っています。真正性を大切にし、自分らしく生きることを追求します。',
        personality: '一人で過ごす時間に、想像力を膨らませて物語を紡ぎ出します。表面的な会話より、人生の意味や夢について語り合うことを好み、心から信頼できる少数の人と深い絆を築きます。',
        strengths: ['豊かな創造性と想像力', '深い共感力と理解力', '強い価値観と誠実さ', '独自の視点と独創性', '他者の可能性を見出す力'],
        weaknesses: ['現実的な対処の困難', '批判への極度の敏感さ', '決断の困難', '自己批判的すぎる', '対立を避けすぎる'],
        careers: ['作家・ライター', 'グラフィックデザイナー', 'セラピスト', 'ソーシャルワーカー', '音楽家', '図書館司書'],
        famous: ['ジョニー・デップ', 'オードリー・ヘプバーン', 'トールキン'],
        compatibility: {
            best: ['ENFJ', 'ENTJ', 'INTJ'],
            good: ['INFJ', 'ENFP', 'ISFP'],
            challenging: ['ESTJ', 'ESTP', 'ISTJ']
        },
        growth: [
            '理想と現実のバランスを取る練習',
            '批判を個人攻撃ではなく成長の機会と捉える',
            '小さな決断を素早く行う習慣をつける',
            '自分の価値を認め、自己肯定感を高める'
        ],
        actionPlan: [
            '今週、1つの創作活動を完成させる',
            '批判を受けたとき、良い点も3つ見つける',
            '毎日1つ、5分以内で決断する練習をする'
        ]
    },
    'ISTJ': {
        title: '管理者',
        strengths: ['責任感と信頼性', '組織化と効率性', '伝統と安定を重視'],
        weaknesses: ['変化への適応が困難', '創造性を軽視しがち', '他人の感情に鈍感'],
        careers: ['会計士', '管理職', '法務担当者']
    },
    'ISTP': {
        title: '巨匠',
        strengths: ['実用的な問題解決能力', '技術的なスキル', '冷静な判断力'],
        weaknesses: ['感情表現が苦手', '長期計画を避けがち', 'チームワークが得意でない'],
        careers: ['エンジニア', '技術者', 'フリーランス']
    },
    'ISFJ': {
        title: '擁護者',
        strengths: ['思いやりとサポート力', '責任感が強い', '詳細に注意を払う'],
        weaknesses: ['自己主張が苦手', '変化を嫌う', '過度に他人を気遣う'],
        careers: ['看護師', '教師', 'ソーシャルワーカー']
    },
    'ISFP': {
        title: '冒険家',
        strengths: ['芸術的センス', '柔軟性と適応力', '人の気持ちを理解できる'],
        weaknesses: ['競争的な環境が苦手', '長期計画が困難', '自己宣伝が苦手'],
        careers: ['アーティスト', 'デザイナー', '動物看護師']
    }
};

// アプリケーションの状態管理
let currentQuestionIndex = 0;
let answers = [];
let currentChart = null;

// DOM要素の取得
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionA = document.getElementById('option-a');
const optionB = document.getElementById('option-b');
const progressBar = document.getElementById('progress-bar');
const currentQuestionElement = document.getElementById('current-question');
const shareTwitterBtn = document.getElementById('share-twitter');
const shareCopyBtn = document.getElementById('share-copy');

// イベントリスナーの設定
document.addEventListener('DOMContentLoaded', initializeApp);
startBtn.addEventListener('click', startDiagnosis);
restartBtn.addEventListener('click', restartDiagnosis);
optionA.addEventListener('click', () => selectAnswer('A'));
optionB.addEventListener('click', () => selectAnswer('B'));
shareTwitterBtn.addEventListener('click', shareOnTwitter);
shareCopyBtn.addEventListener('click', copyToClipboard);

// アプリケーションの初期化
function initializeApp() {
    // ローカルストレージから前回の結果を読み込み
    const savedResult = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedResult) {
        const result = JSON.parse(savedResult);
        showResult(result);
    } else {
        showStartScreen();
    }
}

// スタート画面を表示
function showStartScreen() {
    startScreen.classList.remove('hidden');
    questionScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    resetProgress();
}

// 診断開始
function startDiagnosis() {
    currentQuestionIndex = 0;
    answers = [];
    showQuestionScreen();
    displayQuestion();
}

// 質問画面を表示
function showQuestionScreen() {
    startScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');
}

// 質問を表示
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    optionA.textContent = question.optionA.text;
    optionB.textContent = question.optionB.text;
    
    // ボタンの選択状態をリセット
    optionA.classList.remove('selected');
    optionB.classList.remove('selected');
    
    // プログレスバーを更新
    updateProgress();
    
    // アクセシビリティ：質問の読み上げ用にaria-labelを更新
    questionText.setAttribute('aria-label', `質問${currentQuestionIndex + 1}: ${question.question}`);
}

// 回答を選択
function selectAnswer(choice) {
    const question = questions[currentQuestionIndex];
    const selectedOption = choice === 'A' ? question.optionA : question.optionB;
    
    answers.push({
        dimension: question.dimension,
        score: selectedOption.score
    });
    
    // ボタンの選択状態を更新
    if (choice === 'A') {
        optionA.classList.add('selected');
        optionB.classList.remove('selected');
    } else {
        optionB.classList.add('selected');
        optionA.classList.remove('selected');
    }
    
    // 少し遅延してから次の質問に進む
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < TOTAL_QUESTIONS) {
            displayQuestion();
        } else {
            calculateAndShowResult();
        }
    }, 500);
}

// プログレスバーを更新
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100;
    progressBar.style.width = `${progress}%`;
    currentQuestionElement.textContent = currentQuestionIndex + 1;
}

// プログレスバーをリセット
function resetProgress() {
    progressBar.style.width = '0%';
    currentQuestionElement.textContent = '1';
}

// 結果を計算して表示
function calculateAndShowResult() {
    const scores = calculateScores();
    const mbtiType = determineMBTIType(scores);
    const result = {
        type: mbtiType,
        scores: scores,
        timestamp: new Date().toISOString()
    };
    
    // ローカルストレージに保存
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(result));
    
    showResult(result);
}

// スコアを計算
function calculateScores() {
    const scores = {
        E: 0, I: 0,
        S: 0, N: 0,
        T: 0, F: 0,
        J: 0, P: 0
    };
    
    answers.forEach(answer => {
        scores[answer.score]++;
    });
    
    return scores;
}

// MBTIタイプを決定
function determineMBTIType(scores) {
    const ei = scores.E > scores.I ? 'E' : 'I';
    const sn = scores.S > scores.N ? 'S' : 'N';
    const tf = scores.T > scores.F ? 'T' : 'F';
    const jp = scores.J > scores.P ? 'J' : 'P';
    
    return ei + sn + tf + jp;
}

// 結果を表示
function showResult(result) {
    startScreen.classList.add('hidden');
    questionScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    const typeInfo = mbtiTypes[result.type];
    
    // 結果タイプと説明を表示
    document.getElementById('result-type').textContent = result.type;
    document.getElementById('result-title').textContent = typeInfo.title;
    
    // 新しいコンテンツを表示（存在する場合のみ）
    if (typeInfo.subtitle) {
        document.getElementById('result-subtitle').textContent = typeInfo.subtitle;
    }
    if (typeInfo.description) {
        document.getElementById('result-description').textContent = typeInfo.description;
    }
    if (typeInfo.personality) {
        document.getElementById('result-personality').textContent = typeInfo.personality;
    }
    
    // 強み・弱み・適職を表示
    displayList('strengths-list', typeInfo.strengths);
    displayList('weaknesses-list', typeInfo.weaknesses);
    displayList('careers-list', typeInfo.careers);
    
    // 有名人リストを表示
    if (typeInfo.famous) {
        displayFamousList('famous-list', typeInfo.famous);
    }
    
    // 相性分析を表示
    if (typeInfo.compatibility) {
        displayCompatibility(typeInfo.compatibility);
    }
    
    // 成長プランを表示
    if (typeInfo.growth) {
        displayList('growth-list', typeInfo.growth);
    }
    if (typeInfo.actionPlan) {
        displayList('action-plan-list', typeInfo.actionPlan);
    }
    
    // グラフを描画
    drawPersonalityChart(result.scores);
}

// リストを表示
function displayList(elementId, items) {
    const list = document.getElementById(elementId);
    list.innerHTML = '';
    
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
}

// 有名人リストを表示
function displayFamousList(elementId, famousPeople) {
    const list = document.getElementById(elementId);
    list.innerHTML = '';
    
    famousPeople.forEach(person => {
        const span = document.createElement('span');
        span.textContent = person;
        span.className = 'bg-purple-200 px-3 py-1 rounded-full text-sm font-medium';
        list.appendChild(span);
    });
}

// 相性分析を表示
function displayCompatibility(compatibility) {
    // 最高の相性
    const bestContainer = document.getElementById('compatibility-best');
    bestContainer.innerHTML = '';
    compatibility.best.forEach(type => {
        const span = document.createElement('span');
        span.textContent = type;
        span.className = 'bg-green-200 px-2 py-1 rounded text-sm font-medium cursor-pointer hover:bg-green-300 transition-colors';
        span.title = `${type}タイプとの相性詳細を見る`;
        bestContainer.appendChild(span);
    });
    
    // 良好な相性
    const goodContainer = document.getElementById('compatibility-good');
    goodContainer.innerHTML = '';
    compatibility.good.forEach(type => {
        const span = document.createElement('span');
        span.textContent = type;
        span.className = 'bg-blue-200 px-2 py-1 rounded text-sm font-medium cursor-pointer hover:bg-blue-300 transition-colors';
        span.title = `${type}タイプとの相性詳細を見る`;
        goodContainer.appendChild(span);
    });
    
    // 刺激的な相性
    const challengingContainer = document.getElementById('compatibility-challenging');
    challengingContainer.innerHTML = '';
    compatibility.challenging.forEach(type => {
        const span = document.createElement('span');
        span.textContent = type;
        span.className = 'bg-yellow-200 px-2 py-1 rounded text-sm font-medium cursor-pointer hover:bg-yellow-300 transition-colors';
        span.title = `${type}タイプとの相性詳細を見る`;
        challengingContainer.appendChild(span);
    });
}

// 性格指標のグラフを描画
function drawPersonalityChart(scores) {
    const ctx = document.getElementById('personality-chart').getContext('2d');
    
    // 既存のチャートを破棄
    if (currentChart) {
        currentChart.destroy();
    }
    
    // 各指標の割合を計算
    const ePercent = (scores.E / (scores.E + scores.I)) * 100;
    const sPercent = (scores.S / (scores.S + scores.N)) * 100;
    const tPercent = (scores.T / (scores.T + scores.F)) * 100;
    const jPercent = (scores.J / (scores.J + scores.P)) * 100;
    
    currentChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['外向性 vs 内向性', '感覚 vs 直感', '思考 vs 感情', '判断 vs 知覚'],
            datasets: [{
                label: '指標の傾向 (%)',
                data: [
                    ePercent > 50 ? ePercent : 100 - ePercent,
                    sPercent > 50 ? sPercent : 100 - sPercent,
                    tPercent > 50 ? tPercent : 100 - tPercent,
                    jPercent > 50 ? jPercent : 100 - jPercent
                ],
                backgroundColor: [
                    ePercent > 50 ? '#10b981' : '#6366f1',
                    sPercent > 50 ? '#10b981' : '#6366f1',
                    tPercent > 50 ? '#10b981' : '#6366f1',
                    jPercent > 50 ? '#10b981' : '#6366f1'
                ],
                borderColor: [
                    ePercent > 50 ? '#059669' : '#4f46e5',
                    sPercent > 50 ? '#059669' : '#4f46e5',
                    tPercent > 50 ? '#059669' : '#4f46e5',
                    jPercent > 50 ? '#059669' : '#4f46e5'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const index = context.dataIndex;
                            const labels = [
                                ePercent > 50 ? `外向性: ${ePercent.toFixed(1)}%` : `内向性: ${(100 - ePercent).toFixed(1)}%`,
                                sPercent > 50 ? `感覚: ${sPercent.toFixed(1)}%` : `直感: ${(100 - sPercent).toFixed(1)}%`,
                                tPercent > 50 ? `思考: ${tPercent.toFixed(1)}%` : `感情: ${(100 - tPercent).toFixed(1)}%`,
                                jPercent > 50 ? `判断: ${jPercent.toFixed(1)}%` : `知覚: ${(100 - jPercent).toFixed(1)}%`
                            ];
                            return labels[index];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

// Twitterでシェア
function shareOnTwitter() {
    const savedResult = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedResult) {
        const result = JSON.parse(savedResult);
        const typeInfo = mbtiTypes[result.type];
        const text = `私のMBTI診断結果は${result.type}（${typeInfo.title}）でした！あなたも診断してみませんか？`;
        const url = encodeURIComponent(window.location.href);
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
        window.open(tweetUrl, '_blank');
    }
}

// URLをクリップボードにコピー
function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        // コピー成功の視覚的フィードバック
        const button = document.getElementById('share-copy');
        const originalText = button.textContent;
        button.textContent = 'コピーしました！';
        button.classList.add('bg-green-600');
        button.classList.remove('bg-slate-600');
        
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('bg-green-600');
            button.classList.add('bg-slate-600');
        }, 2000);
    }).catch(() => {
        // フォールバック：古いブラウザ対応
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        alert('URLをクリップボードにコピーしました！');
    });
}

// 診断を再開始
function restartDiagnosis() {
    // 前回の結果をクリア（オプション）
    // localStorage.removeItem(LOCAL_STORAGE_KEY);
    
    currentQuestionIndex = 0;
    answers = [];
    showStartScreen();
}

// キーボードナビゲーション対応
document.addEventListener('keydown', (event) => {
    if (questionScreen.classList.contains('hidden')) return;
    
    // 1キーまたはAキーで選択肢A
    if (event.key === '1' || event.key.toLowerCase() === 'a') {
        selectAnswer('A');
    }
    // 2キーまたはBキーで選択肢B
    else if (event.key === '2' || event.key.toLowerCase() === 'b') {
        selectAnswer('B');
    }
});

// ESLint推奨設定の例
/* eslint-env browser */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

// Google AdSense実装時の参考コード
/*
Google AdSense実装手順:

1. Google AdSenseアカウントを取得し、サイトを追加
2. 以下のコードを各プレースホルダーに置き換え:

AD_SLOT_1 (320x100 / top of page):
<ins class="adsbygoogle"
     style="display:inline-block;width:320px;height:100px"
     data-ad-client="ca-pub-XXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

AD_SLOT_2 (responsive / mid-content):
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

AD_SLOT_3 (300x250 / results page):
<ins class="adsbygoogle"
     style="display:inline-block;width:300px;height:250px"
     data-ad-client="ca-pub-XXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

3. HTMLの<head>セクションに以下を追加:
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
     crossorigin="anonymous"></script>
*/