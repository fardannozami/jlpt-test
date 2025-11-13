// N5 JLPT Practice Questions Database

export interface Option {
  id: string
  text: string
}

export interface Question {
  id: number
  section: "vocabulary" | "grammar" | "reading" | "listening"
  question: string
  options: Option[]
  correctAnswer: string
  explanation?: string
}

export const questions: Question[] = [
  // Vocabulary Section (15 questions)
  {
    id: 1,
    section: "vocabulary",
    question: "「朝」は何時ですか？",
    options: [
      { id: "a", text: "夜間中" },
      { id: "b", text: "夜明け" },
      { id: "c", text: "正午" },
      { id: "d", text: "夕方" },
    ],
    correctAnswer: "b",
    explanation: "「朝」は夜が明けて朝になることを意味します。",
  },
  {
    id: 2,
    section: "vocabulary",
    question: "病院は人が___に行く場所です。",
    options: [
      { id: "a", text: "病気を治す" },
      { id: "b", text: "健康を失う" },
      { id: "c", text: "仕事をする" },
      { id: "d", text: "遊ぶ" },
    ],
    correctAnswer: "a",
    explanation: "病院では医者が患者の病気を治すために働きます。",
  },
  {
    id: 3,
    section: "vocabulary",
    question: "「雨」の反対は何ですか？",
    options: [
      { id: "a", text: "曇り" },
      { id: "b", text: "風" },
      { id: "c", text: "晴れ" },
      { id: "d", text: "雪" },
    ],
    correctAnswer: "c",
    explanation: "「晴れ」は「雨」の反対です。",
  },
  {
    id: 4,
    section: "vocabulary",
    question: "この果物は___ですか？",
    options: [
      { id: "a", text: "りんご" },
      { id: "b", text: "みかん" },
      { id: "c", text: "スイカ" },
      { id: "d", text: "バナナ" },
    ],
    correctAnswer: "a",
    explanation: "赤い丸い果物はりんごです。",
  },
  {
    id: 5,
    section: "vocabulary",
    question: "私は毎日___を飲みます。",
    options: [
      { id: "a", text: "水" },
      { id: "b", text: "パン" },
      { id: "c", text: "本" },
      { id: "d", text: "カメラ" },
    ],
    correctAnswer: "a",
    explanation: "みんな毎日水を飲みます。",
  },
  {
    id: 6,
    section: "vocabulary",
    question: "図書館で本を___することができます。",
    options: [
      { id: "a", text: "読む" },
      { id: "b", text: "食べる" },
      { id: "c", text: "走る" },
      { id: "d", text: "泳ぐ" },
    ],
    correctAnswer: "a",
    explanation: "図書館では本を読むことができます。",
  },
  {
    id: 7,
    section: "vocabulary",
    question: "猫は___です。",
    options: [
      { id: "a", text: "魚" },
      { id: "b", text: "動物" },
      { id: "c", text: "ペット" },
      { id: "d", text: "すべて正しい" },
    ],
    correctAnswer: "d",
    explanation: "猫はすべてに当てはまります。",
  },
  {
    id: 8,
    section: "vocabulary",
    question: "誕生日は何月ですか？",
    options: [
      { id: "a", text: "1月" },
      { id: "b", text: "7月" },
      { id: "c", text: "12月" },
      { id: "d", text: "いつでもいい" },
    ],
    correctAnswer: "d",
    explanation: "誕生日は人によって違う月にあります。",
  },
  {
    id: 9,
    section: "vocabulary",
    question: "タクシーは___です。",
    options: [
      { id: "a", text: "のりもの" },
      { id: "b", text: "たべもの" },
      { id: "c", text: "なまもの" },
      { id: "d", text: "おもちゃ" },
    ],
    correctAnswer: "a",
    explanation: "タクシーは乗る乗り物です。",
  },
  {
    id: 10,
    section: "vocabulary",
    question: "新聞は毎日___に読みます。",
    options: [
      { id: "a", text: "朝" },
      { id: "b", text: "昼" },
      { id: "c", text: "夜" },
      { id: "d", text: "すべての時間" },
    ],
    correctAnswer: "a",
    explanation: "多くの人は朝新聞を読みます。",
  },
  {
    id: 11,
    section: "vocabulary",
    question: "コンピュータでメールを___。",
    options: [
      { id: "a", text: "食べます" },
      { id: "b", text: "送ります" },
      { id: "c", text: "きります" },
      { id: "d", text: "読みます" },
    ],
    correctAnswer: "b",
    explanation: "メールはコンピュータで送ります。",
  },
  {
    id: 12,
    section: "vocabulary",
    question: "鳥は___。",
    options: [
      { id: "a", text: "空を飛びます" },
      { id: "b", text: "水の中で生きます" },
      { id: "c", text: "ご飯を食べません" },
      { id: "d", text: "音を出しません" },
    ],
    correctAnswer: "a",
    explanation: "鳥は空を飛ぶことができます。",
  },
  {
    id: 13,
    section: "vocabulary",
    question: "トイレは___です。",
    options: [
      { id: "a", text: "寝る部屋" },
      { id: "b", text: "便所" },
      { id: "c", text: "台所" },
      { id: "d", text: "居間" },
    ],
    correctAnswer: "b",
    explanation: "トイレは別の言い方で便所です。",
  },
  {
    id: 14,
    section: "vocabulary",
    question: "デパートで___を買うことができます。",
    options: [
      { id: "a", text: "服" },
      { id: "b", text: "食べ物" },
      { id: "c", text: "すべて" },
      { id: "d", text: "本" },
    ],
    correctAnswer: "c",
    explanation: "デパートではいろいろなものが売っています。",
  },
  {
    id: 15,
    section: "vocabulary",
    question: "時計は何を___？",
    options: [
      { id: "a", text: "時間を" },
      { id: "b", text: "気温を" },
      { id: "c", text: "天気を" },
      { id: "d", text: "すべて" },
    ],
    correctAnswer: "a",
    explanation: "時計は時間を表します。",
  },

  // Grammar Section (15 questions)
  {
    id: 16,
    section: "grammar",
    question: "私は毎日___学校に行きます。",
    options: [
      { id: "a", text: "を" },
      { id: "b", text: "に" },
      { id: "c", text: "の" },
      { id: "d", text: "で" },
    ],
    correctAnswer: "b",
    explanation: "「学校に行く」という表現は「に」を使います。",
  },
  {
    id: 17,
    section: "grammar",
    question: "彼___は医者です。",
    options: [
      { id: "a", text: "を" },
      { id: "b", text: "に" },
      { id: "c", text: "は" },
      { id: "d", text: "で" },
    ],
    correctAnswer: "c",
    explanation: "主語には「は」を使います。",
  },
  {
    id: 18,
    section: "grammar",
    question: "ペンで紙___書きます。",
    options: [
      { id: "a", text: "に" },
      { id: "b", text: "を" },
      { id: "c", text: "で" },
      { id: "d", text: "から" },
    ],
    correctAnswer: "b",
    explanation: "直接対象を示すときは「を」を使います。",
  },
  {
    id: 19,
    section: "grammar",
    question: "私___友達___電話しました。",
    options: [
      { id: "a", text: "は、に" },
      { id: "b", text: "を、に" },
      { id: "c", text: "が、で" },
      { id: "d", text: "の、を" },
    ],
    correctAnswer: "a",
    explanation: "「～に電話する」という表現では「に」を使います。",
  },
  {
    id: 20,
    section: "grammar",
    question: "トマトは赤___。",
    options: [
      { id: "a", text: "ます" },
      { id: "b", text: "です" },
      { id: "c", text: "ある" },
      { id: "d", text: "なる" },
    ],
    correctAnswer: "b",
    explanation: "形容詞の後には「です」を使うことができます。",
  },
  {
    id: 21,
    section: "grammar",
    question: "毎朝、私は___起きます。",
    options: [
      { id: "a", text: "を" },
      { id: "b", text: "7時に" },
      { id: "c", text: "時間を" },
      { id: "d", text: "で" },
    ],
    correctAnswer: "b",
    explanation: "時間を示すときは「に」を使います。",
  },
  {
    id: 22,
    section: "grammar",
    question: "昨日は雨___。",
    options: [
      { id: "a", text: "ました" },
      { id: "b", text: "です" },
      { id: "c", text: "でした" },
      { id: "d", text: "があった" },
    ],
    correctAnswer: "c",
    explanation: "過去の「ある」は「ありました」、形容詞の過去は「でした」です。",
  },
  {
    id: 23,
    section: "grammar",
    question: "この本は面白く___。",
    options: [
      { id: "a", text: "ありません" },
      { id: "b", text: "ないです" },
      { id: "c", text: "ありません" },
      { id: "d", text: "いません" },
    ],
    correctAnswer: "a",
    explanation: "い形容詞の否定は「～くない」または「～くありません」です。",
  },
  {
    id: 24,
    section: "grammar",
    question: "あなたは何___好きですか？",
    options: [
      { id: "a", text: "が" },
      { id: "b", text: "を" },
      { id: "c", text: "に" },
      { id: "d", text: "で" },
    ],
    correctAnswer: "a",
    explanation: "「好き」「嫌い」のような感情は「が」を使います。",
  },
  {
    id: 25,
    section: "grammar",
    question: "彼は毎日1時間___ジョギングします。",
    options: [
      { id: "a", text: "を" },
      { id: "b", text: "に" },
      { id: "c", text: "で" },
      { id: "d", text: "から" },
    ],
    correctAnswer: "c",
    explanation: "期間や時間は「で」を使います。",
  },
  {
    id: 26,
    section: "grammar",
    question: "私は日本語___勉強しています。",
    options: [
      { id: "a", text: "を" },
      { id: "b", text: "が" },
      { id: "c", text: "で" },
      { id: "d", text: "に" },
    ],
    correctAnswer: "a",
    explanation: "動作や活動の直接対象には「を」を使います。",
  },
  {
    id: 27,
    section: "grammar",
    question: "日本___の首都は東京です。",
    options: [
      { id: "a", text: "は" },
      { id: "b", text: "の" },
      { id: "c", text: "を" },
      { id: "d", text: "に" },
    ],
    correctAnswer: "b",
    explanation: "所有や属性を示すときは「の」を使います。",
  },
  {
    id: 28,
    section: "grammar",
    question: "このテストは難しく___。",
    options: [
      { id: "a", text: "ない" },
      { id: "b", text: "ないです" },
      { id: "c", text: "くない" },
      { id: "d", text: "ます" },
    ],
    correctAnswer: "c",
    explanation: "い形容詞の否定形は「～くない」です。",
  },
  {
    id: 29,
    section: "grammar",
    question: "もし明日雨___、私は家にいます。",
    options: [
      { id: "a", text: "だったら" },
      { id: "b", text: "でしたら" },
      { id: "c", text: "なら" },
      { id: "d", text: "ば" },
    ],
    correctAnswer: "a",
    explanation: "仮定を示すときは「だったら」や「なら」が使えます。",
  },
  {
    id: 30,
    section: "grammar",
    question: "この花は青___。",
    options: [
      { id: "a", text: "です" },
      { id: "b", text: "である" },
      { id: "c", text: "ある" },
      { id: "d", text: "なります" },
    ],
    correctAnswer: "a",
    explanation: "形容詞の後には「です」を使います。",
  },

  // Reading Section (10 questions)
  {
    id: 31,
    section: "reading",
    question: "田中さんは毎日8時に家を出ます。駅まで15分です。田中さんは何時に駅に着きますか？",
    options: [
      { id: "a", text: "7時45分" },
      { id: "b", text: "8時15分" },
      { id: "c", text: "8時30分" },
      { id: "d", text: "9時" },
    ],
    correctAnswer: "b",
    explanation: "8時に出発して、15分かかるので、8時15分に駅に着きます。",
  },
  {
    id: 32,
    section: "reading",
    question:
      "図書館は月曜日から金曜日まで営業しています。土曜日と日曜日は閉まっています。今日は木曜日です。明日図書館に行くことができますか？",
    options: [
      { id: "a", text: "はい、できます" },
      { id: "b", text: "いいえ、できません" },
      { id: "c", text: "わかりません" },
      { id: "d", text: "不確定" },
    ],
    correctAnswer: "a",
    explanation: "明日は金曜日なので、図書館は営業しています。",
  },
  {
    id: 33,
    section: "reading",
    question: "りんごは1つ200円です。3つ買ったら、いくらですか？",
    options: [
      { id: "a", text: "200円" },
      { id: "b", text: "400円" },
      { id: "c", text: "600円" },
      { id: "d", text: "800円" },
    ],
    correctAnswer: "c",
    explanation: "200円 × 3つ = 600円です。",
  },
  {
    id: 34,
    section: "reading",
    question: "ビルは10階あります。田中さんは5階で働いています。田中さんは何階にいますか？",
    options: [
      { id: "a", text: "3階" },
      { id: "b", text: "5階" },
      { id: "c", text: "7階" },
      { id: "d", text: "10階" },
    ],
    correctAnswer: "b",
    explanation: "田中さんは5階で働いているので、5階にいます。",
  },
  {
    id: 35,
    section: "reading",
    question: "大学は9時に始まります。45分の授業があります。授業は何時に終わりますか？",
    options: [
      { id: "a", text: "9時45分" },
      { id: "b", text: "9時30分" },
      { id: "c", text: "10時" },
      { id: "d", text: "10時15分" },
    ],
    correctAnswer: "a",
    explanation: "9時に始まって、45分なので、9時45分に終わります。",
  },
  {
    id: 36,
    section: "reading",
    question: "スーパーは朝7時に開きます。夜11時に閉まります。スーパーは1日何時間営業していますか？",
    options: [
      { id: "a", text: "12時間" },
      { id: "b", text: "15時間" },
      { id: "c", text: "16時間" },
      { id: "d", text: "18時間" },
    ],
    correctAnswer: "c",
    explanation: "7時から23時までなので、16時間営業しています。",
  },
  {
    id: 37,
    section: "reading",
    question:
      "このレストランはパスタが得意です。ピザも作ります。でもラーメンは作りません。このレストランで食べることができないのは何ですか？",
    options: [
      { id: "a", text: "パスタ" },
      { id: "b", text: "ピザ" },
      { id: "c", text: "ラーメン" },
      { id: "d", text: "すべて" },
    ],
    correctAnswer: "c",
    explanation: "テキストに「ラーメンは作りません」と書いてあります。",
  },
  {
    id: 38,
    section: "reading",
    question:
      "山田さんは月曜日から金曜日まで仕事をします。土曜日は半日、日曜日は休みです。山田さんは週に何日働きますか？",
    options: [
      { id: "a", text: "5日" },
      { id: "b", text: "5.5日" },
      { id: "c", text: "6日" },
      { id: "d", text: "7日" },
    ],
    correctAnswer: "b",
    explanation: "月曜日から金曜日は5日、土曜日は半日なので、5.5日です。",
  },
  {
    id: 39,
    section: "reading",
    question:
      "ジョンは中国、インド、日本を旅行しました。3つの国で2週間ずつ滞在しました。ジョンは何週間旅行していますか？",
    options: [
      { id: "a", text: "2週間" },
      { id: "b", text: "4週間" },
      { id: "c", text: "6週間" },
      { id: "d", text: "8週間" },
    ],
    correctAnswer: "c",
    explanation: "3つの国 × 2週間 = 6週間です。",
  },
  {
    id: 40,
    section: "reading",
    question: "このスポーツクラブの料金：会費2000円、ジムの利用料500円。1ヶ月の合計料金はいくらですか？",
    options: [
      { id: "a", text: "500円" },
      { id: "b", text: "2000円" },
      { id: "c", text: "2500円" },
      { id: "d", text: "3000円" },
    ],
    correctAnswer: "c",
    explanation: "2000円 + 500円 = 2500円です。",
  },

  // Listening Section (10 questions)
  {
    id: 41,
    section: "listening",
    question: "これは何ですか？（音声: 毎朝コーヒーを飲みます）",
    options: [
      { id: "a", text: "お茶" },
      { id: "b", text: "コーヒー" },
      { id: "c", text: "ジュース" },
      { id: "d", text: "水" },
    ],
    correctAnswer: "b",
    explanation: "テキストに「コーヒーを飲みます」と書いてあります。",
  },
  {
    id: 42,
    section: "listening",
    question: "いつですか？（音声: 私は毎日の朝8時に起きます）",
    options: [
      { id: "a", text: "朝6時" },
      { id: "b", text: "朝7時" },
      { id: "c", text: "朝8時" },
      { id: "d", text: "朝9時" },
    ],
    correctAnswer: "c",
    explanation: "テキストに「朝8時に起きます」と書いてあります。",
  },
  {
    id: 43,
    section: "listening",
    question: "どこですか？（音声: 私は毎日図書館で勉強します）",
    options: [
      { id: "a", text: "カフェ" },
      { id: "b", text: "図書館" },
      { id: "c", text: "学校" },
      { id: "d", text: "家" },
    ],
    correctAnswer: "b",
    explanation: "テキストに「図書館で勉強します」と書いてあります。",
  },
  {
    id: 44,
    section: "listening",
    question: "誰ですか？（音声: 田中さんは先生です）",
    options: [
      { id: "a", text: "医者" },
      { id: "b", text: "先生" },
      { id: "c", text: "学生" },
      { id: "d", text: "ビジネスマン" },
    ],
    correctAnswer: "b",
    explanation: "テキストに「田中さんは先生です」と書いてあります。",
  },
  {
    id: 45,
    section: "listening",
    question: "いくつですか？（音声: 私は3個のみかんを持っています）",
    options: [
      { id: "a", text: "1個" },
      { id: "b", text: "2個" },
      { id: "c", text: "3個" },
      { id: "d", text: "4個" },
    ],
    correctAnswer: "c",
    explanation: "テキストに「3個のみかん」と書いてあります。",
  },
  {
    id: 46,
    section: "listening",
    question: "これは何色ですか？（音声: これは赤いペンです）",
    options: [
      { id: "a", text: "青" },
      { id: "b", text: "赤" },
      { id: "c", text: "黒" },
      { id: "d", text: "白" },
    ],
    correctAnswer: "b",
    explanation: "テキストに「赤いペン」と書いてあります。",
  },
  {
    id: 47,
    section: "listening",
    question: "これは何ですか？（音声: 私は毎日新聞を読みます）",
    options: [
      { id: "a", text: "本" },
      { id: "b", text: "雑誌" },
      { id: "c", text: "新聞" },
      { id: "d", text: "コミック" },
    ],
    correctAnswer: "c",
    explanation: "テキストに「新聞を読みます」と書いてあります。",
  },
  {
    id: 48,
    section: "listening",
    question: "どこに行きますか？（音声: 私は毎週日曜日に駅の近くにあるスーパーに行きます）",
    options: [
      { id: "a", text: "デパート" },
      { id: "b", text: "スーパー" },
      { id: "c", text: "コンビニ" },
      { id: "d", text: "図書館" },
    ],
    correctAnswer: "b",
    explanation: "テキストに「スーパーに行きます」と書いてあります。",
  },
  {
    id: 49,
    section: "listening",
    question: "いつですか？（音声: 私は毎月15日に給料をもらいます）",
    options: [
      { id: "a", text: "毎週" },
      { id: "b", text: "毎日" },
      { id: "c", text: "毎月" },
      { id: "d", text: "ときどき" },
    ],
    correctAnswer: "c",
    explanation: "テキストに「毎月15日」と書いてあります。",
  },
  {
    id: 50,
    section: "listening",
    question: "これはいくらですか？（音声: このシャツは5000円です）",
    options: [
      { id: "a", text: "1000円" },
      { id: "b", text: "3000円" },
      { id: "c", text: "5000円" },
      { id: "d", text: "8000円" },
    ],
    correctAnswer: "c",
    explanation: "テキストに「5000円」と書いてあります。",
  },
]

// Utility functions to shuffle questions and answer options
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function getShuffledQuestions(sectionFilter: string): Question[] {
  const filtered = questions.filter((q) => q.section === sectionFilter)
  return shuffleArray(filtered)
}

export function getShuffledOptions(question: Question): Option[] {
  return shuffleArray(question.options)
}
