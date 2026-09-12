// Existing storage keys, identity and cloud schema are intentionally preserved.
const grades = ["全学年", "中1", "中2", "中3"],
  fields = ["全分野", "生物", "化学", "物理", "地学"],
  levels = ["A", "B"],
  recordGrades = ["中1", "中2", "中3"],
  analysisGrades = ["全学年", "中1", "中2", "中3"];
const gradeNotices = {
  中1: "中1への伝達事項はここに表示されます。",
  中2: "中2への伝達事項はここに表示されます。",
  中3: "中3への伝達事項はここに表示されます。",
};
const okuponHomeUrl = "https://okuponsoba.github.io/okupon-homepage/#apps",
  mathHomeUrl = "https://okuponsoba.github.io/math/";
const details = {
  中1生物: "植物・動物・細胞",
  中1記述対策: "説明問題を四択で練習",
  中1化学: "身のまわりの物質・気体・水溶液",
  中1物理: "光・音・力",
  中1地学: "火山・地震・地層",
  中2生物: "細胞・人体・神経",
  中2化学: "原子・分子・化学変化",
  中2物理: "電流・電力・磁界",
  中2地学: "天気・前線・気圧",
  中3生物: "遺伝・生態系・進化",
  中3化学: "イオン・酸アルカリ・電池",
  中3物理: "仕事・エネルギー",
  中3地学: "宇宙・太陽系・月",
};
const S = "scienceQuizRecords",
  N = "scienceQuizUserName",
  G = "scienceQuizUserGrade",
  P = "scienceQuizProfileSaved",
  T = "scienceQuizStreak",
  BT = "scienceQuizBestPerfectTimes",
  DID = "scienceQuizDeviceId",
  SCODE = "scienceQuizStudentCode";
const SB_URL = "https://kjlmgrnrhzfwcpuytxdm.supabase.co",
  SB_KEY = "sb_publishable_8vQ2_xzJyaIP96JedzK06w_HRBV6Es1";
const sb = window.supabase?.createClient
  ? window.supabase.createClient(SB_URL, SB_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
    })
  : null;
const sh = (a) => {
    const b = [...a];
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  },
  k = (q) => `${q.grade}-${q.field}-${q.level || "A"}-${q.no}`;
// Each question owns exactly three reviewed distractors. Only positions are random.
const smartWrongs = (q) => {
  const wrongs = q.wrongs;
  if (!Array.isArray(wrongs) || wrongs.length !== 3 || new Set([q.answer, ...wrongs]).size !== 4) {
    throw new Error('選択肢の設定を確認してください: ' + k(q));
  }
  return [...wrongs];
};
const mq = (q) => ({ ...q, choices: sh([q.answer, ...smartWrongs(q)]) });
const load = (key, d = []) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return d;
      const v = JSON.parse(raw);
      return v ?? d;
    } catch {
      return d;
    }
  },
  save = (key, v) => localStorage.setItem(key, JSON.stringify(v));
const randomId = () => {
  try {
    return crypto.randomUUID().replace(/-/g, "");
  } catch {
    return `${Date.now()}${Math.random().toString(36).slice(2)}`;
  }
};
const persistedId = (key) => {
  let value = localStorage.getItem(key);
  if (!value) {
    value = randomId();
    localStorage.setItem(key, value);
  }
  return value;
};
const studentCode = () => {
  let value = localStorage.getItem(SCODE);
  if (!value) {
    value = `RK${randomId().slice(0, 10).toUpperCase()}`;
    localStorage.setItem(SCODE, value);
  }
  return value;
};
const activityType = (t) =>
  t === "一問一答"
    ? "one_answer"
    : t === "記述対策"
      ? "descriptive"
      : t === "練習問題"
        ? "practice"
        : "daily";
const quizMode = (m) => (m === "練習モード" ? "practice" : "test");
const recordInfo = (r) => {
  const units = Array.isArray(r.unitScores) ? r.unitScores : [];
  const unitNames = units.map((x) => String(x.unit || "")).filter(Boolean);
  const unit = String(r.unit || unitNames.join(" / ") || "学習記録");
  const grade =
    recordGrades.find((g) => String(r.grade || unitNames[0] || "").startsWith(g)) || "中1";
  const field =
    fieldNames.find((f) => String(r.field || "") === f || unitNames.some((u) => u.includes(f))) ||
    "生物";
  return { grade, field, unit, units };
};
const cloudRecord = (r, userId) => {
  const info = recordInfo(r),
    date = /^\d{4}-\d{2}-\d{2}$/.test(String(r.date || ""))
      ? new Date(`${r.date}T12:00:00+09:00`).toISOString()
      : new Date(Number(r.id) || Date.now()).toISOString();
  return {
    client_record_id: `${persistedId(DID)}-${String(r.id)}`,
    student_id: userId,
    completed_at: date,
    activity_type: activityType(r.activityType),
    quiz_mode: quizMode(r.quizMode),
    grade: info.grade,
    field: info.field,
    unit: info.unit,
    total_count: Math.max(0, Number(r.total) || 0),
    correct_count: Math.max(0, Number(r.score) || 0),
    elapsed_seconds: Math.max(0, Number(r.timeSeconds) || 0),
    is_retry: Boolean(r.isRetry),
    unit_scores: info.units,
  };
};
const asArray = (v) => (Array.isArray(v) ? v : []),
  asStreak = (v) =>
    v && typeof v === "object"
      ? { lastDate: v.lastDate || "", current: Number(v.current) || 0, best: Number(v.best) || 0 }
      : { lastDate: "", current: 0, best: 0 };
const dk = (d = new Date()) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
  add = (s, n) => {
    const d = new Date(`${s}T00:00:00`);
    d.setDate(d.getDate() + n);
    return dk(d);
  };
const df = (s) => {
  if (!s) return "";
  const [y, m, d] = String(s).split("-");
  return y && m && d ? `${y}年${Number(m)}月${Number(d)}日` : s;
};
const recordDate = (r) =>
  df(r.date) || (Number(r.id) > 1000000000000 ? df(dk(new Date(Number(r.id)))) : "");
const tm = (s) =>
    `${Math.floor(Math.max(0, s || 0) / 60)}:${String(Math.floor(Math.max(0, s || 0) % 60)).padStart(2, "0")}`,
  cls = (p) =>
    p <= 50
      ? "bg-red-100 text-red-700 border-red-200"
      : p <= 70
        ? "bg-yellow-100 text-yellow-700 border-yellow-200"
        : p < 100
          ? "bg-sky-100 text-sky-700 border-sky-200"
          : "bg-yellow-300 text-yellow-900 border-yellow-400";
const lab = (s, t) => `${s}/${t}点${t && s === t ? " 💮" : ""}`,
  fieldNames = ["生物", "化学", "物理", "地学"],
  descriptiveGrades = ["中1", "中2", "中3"],
  descriptiveFieldsByGrade = {
    中1: ["生物"],
    中2: ["生物", "化学", "物理", "地学"],
    中3: ["生物", "化学", "物理", "地学"],
  },
  descriptiveCategoriesByGrade = {
    中1: { 生物: ["生物の観察", "花のつくり", "裸子植物と被子植物", "植物の分類", "動物の分類"] },
    中2: {
      生物: [
        "消化と吸収",
        "呼吸、血液とその循環",
        "動物の行動のしくみ",
        "だ液のはたらき",
        "光合成で出入りする物質",
        "呼吸",
        "生物と細胞",
        "光合成が行われる場所",
      ],
      化学: [
        "炭酸水素ナトリウムの分解",
        "酸化銀の分解",
        "水の電気分解",
        "鉄と硫黄の反応",
        "マグネシウムの燃焼",
        "酸化銅の炭素による還元",
      ],
      物理: ["電流と回路", "電流がつくる磁界", "発電機のしくみ", "直流と交流"],
      地学: [
        "空気中の水蒸気を調べる実験",
        "気圧、飽和水蒸気量と湿度",
        "前線",
        "大気の動きと日本の天気",
      ],
    },
    中3: {
      生物: ["細胞分裂と生物の成長", "生物の生殖", "自然のなかの生物", "自然環境の調査と保全"],
      化学: ["電池", "イオンへのなりやすさと電池", "いろいろな電池"],
      物理: ["力のはたらき方", "仕事と力学的エネルギー"],
      地学: ["太陽", "太陽の1日の動き", "星の1年の動き", "月と金星の見え方", "科学技術と人間"],
    },
  },
  practiceGrades = ["中1"],
  practiceFieldsByGrade = { 中1: ["生物"] },
  practiceCategoriesByGrade = {
    中1: {
      生物: [
        "身近な生物の観察",
        "花のつくり",
        "裸子植物と被子植物",
        "植物の分類",
        "シダ植物とコケ植物",
        "動物の分類",
      ],
    },
  },
  descriptiveFieldsFor = (g) => descriptiveFieldsByGrade[g] || [],
  descriptiveCategoriesFor = (g, f) =>
    (descriptiveCategoriesByGrade[g] && descriptiveCategoriesByGrade[g][f]) || [],
  practiceFieldsFor = (g) => practiceFieldsByGrade[g] || [],
  practiceCategoriesFor = (g, f) =>
    (practiceCategoriesByGrade[g] && practiceCategoriesByGrade[g][f]) || [],
  uns = (g) => fieldNames.flatMap((f) => [`${g}${f}A`, `${g}${f}B`]);
const det = (u) => details[String(u).replace(/[AB]$/, "")] || "";
const us = (h) =>
  Object.values(
    h.reduce((m, a) => {
      const u = `${a.grade}${a.field}${a.level || "A"}`;
      m[u] ??= { unit: u, score: 0, total: 0 };
      m[u].total++;
      if (a.correct) m[u].score++;
      return m;
    }, {}),
  );
const oneAnswerData = () => data.filter((q) => q.level === "A" || q.level === "B");
const dailyFive = (records, userGrade) => {
  const pool = oneAnswerData(),
    grade = recordGrades.includes(userGrade) ? userGrade : "中1",
    used = new Set(),
    picked = [];
  const addFrom = (list) => {
    for (const q of sh(list)) {
      const id = k(q);
      if (!used.has(id)) {
        used.add(id);
        picked.push(q);
      }
      if (picked.length >= 5) break;
    }
  };
  const weakUnits = records
    .flatMap((r) => r.unitScores || [])
    .filter((x) => x.total)
    .map((x) => ({
      ...x,
      accuracy: Math.round(((Number(x.score) || 0) / (Number(x.total) || 1)) * 100),
    }))
    .sort((a, b) => a.accuracy - b.accuracy);
  weakUnits.forEach((x) =>
    addFrom(pool.filter((q) => `${q.grade}${q.field}${q.level || "A"}` === x.unit)),
  );
  addFrom(pool.filter((q) => q.grade === grade));
  addFrom(pool);
  return picked.slice(0, 5);
};
const gof = (r) => (r?.unitScores?.[0]?.unit || "中3").slice(0, 2),
  mg = (r, u) =>
    r.unitScores?.find((x) => x.unit === u) ||
    (u === "中3化学A" || u === "中3化学"
      ? { unit: u, score: r.score || 0, total: r.total || 0 }
      : null);
const rec = (rs, u) =>
  rs
    .map((r) => {
      const x = mg(r, u);
      return (
        x && {
          id: r.id,
          date: r.date,
          score: x.score,
          total: x.total,
          accuracy: Math.round((x.score / x.total) * 100),
          timeSeconds: r.timeSeconds,
        }
      );
    })
    .filter(Boolean)
    .slice(0, 10);
const inGrade = (r, g) => g === "全学年" || gof(r) === g,
  scoped = (rs, g, n) => rs.filter((r) => inGrade(r, g)).slice(0, n);
const fieldStats = (rs, g) =>
  fieldNames.map((field) => {
    const a = rs
        .flatMap((r) => r.unitScores || [])
        .filter(
          (x) =>
            String(x.unit).includes(field) &&
            (g === "全学年" || String(x.unit).startsWith(`${g}${field}`)),
        ),
      score = a.reduce((s, x) => s + (Number(x.score) || 0), 0),
      total = a.reduce((s, x) => s + (Number(x.total) || 0), 0);
    return { field, score, total, accuracy: total ? Math.round((score / total) * 100) : 0 };
  });
const greetings = [
  "今日も使ってくれてありがとう！",
  "今日の理科もいっしょにがんばろう。",
  "少しずつ進めれば大丈夫。",
  "ナイス、今日も来たね！",
  "一問ずつ積み上げていこう。",
  "できる問題を増やしていこう！",
  "今日の一歩はちゃんと力になるよ。",
  "まずは気楽に始めよう。",
];
const pr = (s, t) => {
  const p = t ? Math.round((s / t) * 100) : 0,
    a =
      p === 100
        ? ["さすが！おめでとう！💮", "完璧！！全部正解！🎆", "すごい！パーフェクト！✨"]
        : p >= 80
          ? ["おしい！かなりできてる！👏", "すごい！あと少しで満点！✨", "いい感じ！この調子！😊"]
          : p >= 50
            ? [
                "よく頑張った！復習すれば伸びる！📚",
                "半分以上できてる！あと一歩！🔥",
                "できる問題は増えてるぞ！😊",
              ]
            : [
                "大丈夫！ここから伸びる！💪",
                "まずは復習から！次はもっと取れる！📚",
                "焦らなくてOK！できるようになる！🔥",
              ];
  return a[Math.floor(Math.random() * a.length)];
};

// Read the latest records before adding a result: another tab may have saved meanwhile.
// Invalid existing data must never be silently replaced with an empty history.
function mergeRecords(record, memoryRecords) {
  const raw = localStorage.getItem(S);
  const stored = raw === null ? [] : JSON.parse(raw);
  if (
    !Array.isArray(stored) ||
    stored.some((item) => !item || typeof item !== "object" || item.id == null)
  ) {
    throw new Error("保存履歴の形式を確認できません。既存のデータは変更していません。");
  }
  const byId = new Map();
  for (const item of [...memoryRecords, ...stored, record]) byId.set(String(item.id), item);
  return [...byId.values()].sort((a, b) => Number(b.id) - Number(a.id));
}

// Only learning data is exported. Authentication sessions/tokens are excluded.
function exportLearningBackup() {
  try {
    const values = Object.fromEntries(
      [S, N, G, P, T, BT, DID, SCODE].map((key) => [key, localStorage.getItem(key)]),
    );
    const payload = {
      format: "rika-quiz-backup",
      version: 1,
      exportedAt: new Date().toISOString(),
      values,
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "rika-learning-backup-" + dk() + ".json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (error) {
    alert("バックアップを作成できませんでした。履歴は変更していません。");
  }
}
