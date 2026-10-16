// Preview learning policy. Change the policy here without rewriting saved history.
const QUIZ_SESSION_KEY = scienceStorageKey("scienceQuizSessionV1");
const ASSESSMENT_POLICY = "latest-completed-test-v1";
const ASSESSMENT_QUESTIONS = new Map();
for (const q of oneAnswerData()) {
  const unit = `${q.grade}${q.field}${q.level}`;
  if (!ASSESSMENT_QUESTIONS.has(unit)) ASSESSMENT_QUESTIONS.set(unit, []);
  ASSESSMENT_QUESTIONS.get(unit).push(q);
}
const chronologicalRecords = (records) => [...records].sort((a, b) => Number(b.id) - Number(a.id));
const historyKind = (r) => {
  if (r.isRetry || ["daily", "練習モード", "practice"].includes(r.activityType) || ["練習モード", "practice"].includes(r.quizMode)) return "practice";
  if (["テストモード", "test"].includes(r.quizMode)) return "test";
  return "unknown";
};
const assessmentReason = (r, unit) => {
  if (r.isRetry) return "間違えた問題の復習：評価対象外";
  if (r.activityType === "daily") return "今日の5問：評価対象外";
  if (historyKind(r) === "practice") return "練習：評価対象外";
  if (historyKind(r) !== "test") return "受験モード不明：評価対象外";
  if (!["一問一答", "one_answer"].includes(r.activityType)) return "一問一答A・B以外：評価対象外";
  if (r.completed !== true) return "完了情報のない過去記録：評価対象外";
  const slot = (r.unitScores || []).find(x => x.unit === unit);
  const expected = ASSESSMENT_QUESTIONS.get(unit) || [];
  if (!slot || !expected.length || slot.total !== expected.length || !Number.isFinite(slot.score) || slot.score < 0 || slot.score > slot.total) return "全問テストではない／出題範囲が異なる：評価対象外";
  if (Array.isArray(r.questionKeys) && !expected.every(q => r.questionKeys.includes(k(q)))) return "出題範囲が異なる：評価対象外";
  return "";
};
const unitAssessment = (records, unit) => {
  const record = chronologicalRecords(records).find(r => !assessmentReason(r, unit));
  const slot = record?.unitScores.find(x => x.unit === unit);
  return { unit, record, score: slot?.score || 0, total: slot?.total || 0, accuracy: slot ? slot.score / slot.total * 100 : 0 };
};
const displayAssessmentPercent = (value) => value >= 100 ? 100 : Math.min(99.9, Math.round(value * 10) / 10);
const assessmentStats = (records, grade) => fieldNames.map(field => {
  const targetGrades = grade === "全学年" ? recordGrades : [grade];
  const slots = targetGrades.flatMap(g => levels.map(level => unitAssessment(records, `${g}${field}${level}`)));
  const checked = slots.filter(s => s.record).length;
  const accuracy = slots.reduce((sum, s) => sum + s.accuracy, 0) / slots.length;
  return { field, slots, checked, accuracy: displayAssessmentPercent(accuracy), total: checked, score: 0,
    missing: slots.filter(s => !s.record).map(s => s.unit),
    improving: slots.filter(s => s.record && s.accuracy < 100).map(s => s.unit) };
});
function readQuizSession() {
  try {
    const s = JSON.parse(localStorage.getItem(QUIZ_SESSION_KEY) || "null");
    if (!s || s.version !== 1 || !["ready", "quiz", "result"].includes(s.screen) || s.owner !== localStorage.getItem(N) || localStorage.getItem(P) !== "1") return null;
    if (!Number.isFinite(s.sessionId) || !Number.isFinite(s.elapsedMs) || s.elapsedMs < 0 || !Array.isArray(s.qs) || !s.qs.length || !Number.isInteger(s.i) || s.i < 0 || s.i >= s.qs.length) return null;
    if (!["練習モード", "テストモード"].includes(s.solveMode) || !["一問一答", "記述対策", "練習問題"].includes(s.quizType)) return null;
    const pool = s.quizType === "練習問題" ? practiceData : data;
    if (s.qs.length > pool.length || new Set(s.qs.map(k)).size !== s.qs.length) return null;
    const canonical = new Map(pool.map(q => [k(q), q]));
    for (const q of s.qs) {
      const original = canonical.get(k(q));
      if (!original || q.question !== original.question || q.answer !== original.answer || !Array.isArray(q.choices) || q.choices.length !== 4 || new Set(q.choices).size !== 4 || q.choices.some(c => ![original.answer, ...original.wrongs].includes(c))) return null;
    }
    for (const answers of [s.ans, s.firstAnswers]) {
      if (!answers || typeof answers !== "object" || Array.isArray(answers)) return null;
      for (const [id, answer] of Object.entries(answers)) if (!s.qs.some(q => k(q) === id && q.choices.includes(answer))) return null;
    }
    if (s.selected && !s.qs[s.i].choices.includes(s.selected)) return null;
    if (s.screen === "result" && (!s.result || !Array.isArray(s.hist) || !Array.isArray(s.wrongs))) return null;
    return s;
  } catch { return null; }
}
const INITIAL_QUIZ_SESSION = readQuizSession();
