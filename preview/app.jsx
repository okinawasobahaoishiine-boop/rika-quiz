function BackupCard() {
  return (
    <Box className="backup-card">
      <h2 className="text-lg font-bold">学習記録を手元に残す</h2>
      <p className="text-sm text-slate-600">
        この端末の名前・学習記録・連続学習・ベストタイムの控えを保存できます。
      </p>
      <Btn onClick={exportLearningBackup}>学習記録をバックアップ</Btn>
      <p className="text-xs text-slate-500">
        保存したファイルは大切に保管してください。復元や別端末への引き継ぎは先生に相談してください。
      </p>
    </Box>
  );
}

function SolveModeOptions({ solveMode, setSolveMode, compact = false }) {
  return (
    <div className={compact ? "inline-solve-mode" : ""}>
      <b>解き方</b>
      {compact && <p className="inline-assessment-note">テストモードは成績に反映されます。</p>}
      <div className="solve-mode-options" role="group" aria-label="解き方">
        {["練習モード", "テストモード"].map((mode) => (
          <Btn key={mode} kind={solveMode === mode ? "main" : ""} aria-pressed={solveMode === mode} onClick={() => setSolveMode(mode)}>
            {mode}
          </Btn>
        ))}
      </div>
      <p className={compact ? "inline-mode-help" : "mt-2 text-xs text-slate-500"}>
        {compact
          ? solveMode === "練習モード" ? "1問ずつ正誤と解説を確認します。" : "最後にまとめて正誤と結果を確認します。"
          : solveMode === "練習モード"
            ? "同じ選択肢を2回タップして回答。正解は1秒後に次へ（この1秒は時間に含みません）。間違いは解説を見てタップ。点数は最初に確定した回答で決まります。"
            : "同じ選択肢を2回タップして回答すると次へ。最後まで解いてからまとめて正誤と結果を表示します。"}
      </p>
    </div>
  );
}

function TestQuotaNotice({ quota }) {
  if (!quota?.eligible) return null;
  return <div className="test-quota-note" role="status">
    {quota.error ? <p>{quota.error}</p> : quota.resumable ? <><strong>開始済みのテストを再開します</strong><p>回数は追加されません。</p></> : <>
      <strong>テスト：本日あと{quota.remaining}回</strong>
      <p>{quota.blocked ? "本日2回受験済み。練習は利用できます。0時リセット。" : "開始時に消費。中断も1回。0時リセット。"}</p>
    </>}
  </div>;
}

function OneAnswerCatalog({
  grade,
  setGrade,
  field,
  setField,
  level,
  setLevel,
  solveMode,
  testQuota,
  setSolveMode,
  unitRecs,
  order,
  setOrder,
  begin,
}) {
  const selectedGrade = recordGrades.includes(grade) ? grade : "中1";
  const available = data.filter(
    (q) => q.grade === selectedGrade && q.field === field && q.level === level,
  );
  const count = (f, l) =>
    data.filter((q) => q.grade === selectedGrade && q.field === f && q.level === l).length;
  const pickerRef = React.useRef(null);
  React.useEffect(() => {
    if (!available.length) return;
    let settledFrame;
    const frame = requestAnimationFrame(() => { settledFrame = requestAnimationFrame(() => {
      const card = pickerRef.current?.querySelector(".subject-card.is-selected");
      const actions = card?.querySelector(".subject-actions");
      const start = card?.querySelector(".one-answer-start");
      if (!actions || !start) return;
      const top = actions.getBoundingClientRect().top;
      const end = start.getBoundingClientRect().bottom;
      const bottom = document.querySelector(".science-bottom-nav")?.getBoundingClientRect().top || innerHeight;
      if (end > bottom - 12) {
        window.scrollBy({ top: end - bottom + 12, behavior: "instant" });
      } else if (top < 12) {
        window.scrollBy({ top: Math.max(top - 12, end - bottom + 12), behavior: "instant" });
      }
    }); });
    return () => {cancelAnimationFrame(frame);if(settledFrame)cancelAnimationFrame(settledFrame);};
  }, [selectedGrade, field, level, solveMode]);
  return (
    <div className="unit-picker" ref={pickerRef}>
      <section>
        <h3>1. 学年を選ぶ</h3>
        <div className="grade-tabs" role="group" aria-label="学年">
          {recordGrades.map((g) => (
            <Btn
              key={g}
              kind={selectedGrade === g ? "main" : ""}
              aria-pressed={selectedGrade === g}
              onClick={() => {
                setGrade(g);
                setField("");
                setLevel("");
              }}
            >
              {g}
            </Btn>
          ))}
        </div>
      </section>
      <section>
        <h3>2. 分野と問題を選ぶ</h3>
        <p className="unit-picker-hint">A問題かB問題を選ぶと、その下に解き方とスタートが表示されます。</p>
        <div className="subject-grid">
          {fieldNames.map((f, index) => (
            <div key={f} className={`subject-card ${field === f ? "is-selected" : ""}`}>
              <div className="subject-heading">
                <span className="subject-icon" aria-hidden="true">
                  {["🌱", "🧪", "💡", "🌏"][index]}
                </span>
                <div>
                  <h4>{f}</h4>
                  <p>{det(`${selectedGrade}${f}`)}</p>
                </div>
              </div>
              <div className="subject-actions">
                {levels.map((l) => {
                  const n = count(f, l),
                    selected = field === f && level === l;
                  return (
                    <Btn
                      key={l}
                      disabled={!n}
                      kind={selected ? "main" : ""}
                      aria-pressed={selected}
                      onClick={() => {
                        setGrade(selectedGrade);
                        setField(f);
                        setLevel(l);
                      }}
                    >
                      {l}問題 <span className="question-count">{n}問</span>
                      {selected && <span className="sr-only"> 選択中</span>}
                    </Btn>
                  );
                })}
              </div>
              {field === f && available.length > 0 && (
                <section className="selection-summary inline-start-panel" aria-label="選んだ問題の解き方とスタート">
                  <header aria-live="polite">
                    <h3>{selectedGrade}・{field}・{level}問題</h3>
                    <p>{available.length}問に取り組みます</p>
                  </header>
                  <SolveModeOptions solveMode={solveMode} setSolveMode={setSolveMode} compact />
                  <TestQuotaNotice quota={testQuota} />
                  <details className="inline-order-options">
                    <summary>出題順：{order === "number" ? "問題番号順" : "ランダム"} <span>変更</span></summary>
                    <B items={["問題番号順", "ランダム"]} value={order === "number" ? "問題番号順" : "ランダム"} set={(value) => setOrder(value === "問題番号順" ? "number" : "random")} />
                  </details>
                  <Btn className="one-answer-start" onClick={begin} disabled={solveMode==="テストモード" && testQuota?.blocked} kind="main">{solveMode==="テストモード" && testQuota?.blocked ? "今日はこのテストを受験できません" : "この内容でスタート"}</Btn>
                  {unitRecs.length > 0 && (
                    <details className="inline-unit-records">
                      <summary>この単元の学習記録を見る</summary>
                      <Row records={unitRecs} />
                    </details>
                  )}
                </section>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

const { useEffect, useMemo, useState } = React;
function B({ items, value, set }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((x) => (
        <button
          key={x}
          onClick={() => set(x)}
          aria-pressed={value === x}
          className={`rounded-xl px-4 py-2 border font-bold ${value === x ? "bg-slate-900 text-white" : "bg-white"}`}
        >
          {x}
        </button>
      ))}
    </div>
  );
}
function Row({ records }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
      {records.map((r, i) => (
        <div
          key={r.id}
          className={`rounded-xl border px-2 py-2 text-center text-xs font-bold ${cls(r.accuracy)}`}
        >
          <div className="text-[11px] leading-tight opacity-80">
            {recordDate(r) || `${i + 1}回`}
          </div>
          <div className="mt-1">{lab(r.score, r.total)}</div>
          {typeof r.timeSeconds === "number" && (
            <div className="text-[10px] mt-1">{tm(r.timeSeconds)}</div>
          )}
        </div>
      ))}
    </div>
  );
}
function Notices({ grade }) {
  const items = grade === "全学年" ? recordGrades : grade ? [grade] : [];
  return (
    <Box>
      <b>伝達事項</b>
      <div className="space-y-2">
        {items.map((g) => (
          <div key={g} className="rounded-xl border bg-slate-50 p-3 text-left">
            <div className="text-xs font-bold text-slate-500">{g}</div>
            <div className="font-bold">{gradeNotices[g] || "伝達事項はありません。"}</div>
          </div>
        ))}
      </div>
    </Box>
  );
}
function Catalog({
  quizType,
  setQuizType,
  solveMode,
  testQuota,
  setSolveMode,
  grade,
  setGrade,
  field,
  setField,
  level,
  setLevel,
  descLevels,
  setDescLevels,
  unit,
  unitRecs,
  order,
  setOrder,
  begin,
}) {
  const count = (g, f, l) =>
    data.filter((q) => q.grade === g && q.field === f && q.level === l).length;
  const descGrade = grade || "中1",
    descFields = descriptiveFieldsFor(descGrade),
    descField = field && descFields.includes(field) ? field : "",
    descCats = descField ? descriptiveCategoriesFor(descGrade, descField) : [];
  const descCount = (c) =>
      data.filter((q) => q.grade === descGrade && q.field === descField && q.level === c).length,
    selectedDesc = data.filter(
      (q) => q.grade === descGrade && q.field === descField && descLevels.includes(q.level),
    ).length;
  const allDescOn = !!descCats.length && descCats.every((c) => descLevels.includes(c)),
    toggleDesc = (c) =>
      setDescLevels(
        descLevels.includes(c) ? descLevels.filter((x) => x !== c) : [...descLevels, c],
      ),
    toggleAllDesc = () => setDescLevels(allDescOn ? [] : [...descCats]);
  const practiceGrade = grade || "中1",
    practiceFields = practiceFieldsFor(practiceGrade),
    practiceField = field && practiceFields.includes(field) ? field : "",
    practiceCats = practiceField ? practiceCategoriesFor(practiceGrade, practiceField) : [];
  const practiceCount = (c) =>
      practiceData.filter(
        (q) => q.grade === practiceGrade && q.field === practiceField && q.level === c,
      ).length,
    selectedPractice = practiceData.filter(
      (q) => q.grade === practiceGrade && q.field === practiceField && q.level === level,
    ).length;
  const allPracticeOn = !!practiceCats.length && practiceCats.every((c) => c === level),
    togglePractice = (c) => setLevel(level === c ? "" : c),
    toggleAllPractice = () => setLevel(allPracticeOn ? "" : practiceCats[0] || "");
  return (
    <Box>
      <div id="questions" className="scroll-mt-4">
        <b>問題を選ぶ</b>
        <p className="text-xs text-slate-500">
          {quizType === "一問一答" ? "問題を選び、その下で解き方を決めて始めます。" : "問題タイプと解き方を選び、解く分野を決めてから始めます。"}
        </p>
      </div>
      <div>
        <b>問題タイプ</b>
        <div className="quiz-type-options grid grid-cols-3 gap-2 mt-2">
          <Btn
            kind={quizType === "一問一答" ? "main" : ""}
            onClick={() => {
              setQuizType("一問一答");
              setField("");
              setLevel("");
              setDescLevels([]);
            }}
          >
            一問一答
          </Btn>
          <Btn
            kind={quizType === "記述対策" ? "main" : ""}
            onClick={() => {
              setQuizType("記述対策");
              setField("");
              setLevel("");
              setDescLevels([]);
            }}
          >
            記述
          </Btn>
          <Btn
            kind={quizType === "練習問題" ? "main" : ""}
            onClick={() => {
              setQuizType("練習問題");
              setGrade("中1");
              setField("");
              setLevel("");
            }}
          >
            練習
          </Btn>
        </div>
      </div>
      {quizType !== "一問一答" && <SolveModeOptions solveMode={solveMode} setSolveMode={setSolveMode} />}
      {quizType === "一問一答" ? (
        <OneAnswerCatalog
          {...{
            grade,
            setGrade,
            field,
            setField,
            level,
            setLevel,
            solveMode,
            testQuota,
            setSolveMode,
            unitRecs,
            order,
            setOrder,
            begin,
          }}
        />
      ) : quizType === "記述対策" ? (
        <div className="rounded-2xl border border-amber-800/20 bg-white/70 p-3 text-left space-y-3 shadow-sm">
          <div>
            <div className="text-lg font-black text-amber-700">記述</div>
            <div className="text-xs text-slate-500">
              学年、主要4単元、小単元の順に選べます。小単元は複数選択できます。
            </div>
          </div>
          <div>
            <b>学年</b>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {descriptiveGrades.map((g) => (
                <Btn
                  key={g}
                  kind={descGrade === g ? "main" : ""}
                  onClick={() => {
                    setGrade(g);
                    setField("");
                    setLevel("");
                    setDescLevels([]);
                  }}
                >
                  {g}
                </Btn>
              ))}
            </div>
          </div>
          <div>
            <b>主要4単元</b>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              {descFields.map((f) => (
                <Btn
                  key={f}
                  kind={descField === f ? "main" : ""}
                  onClick={() => {
                    setField(f);
                    setDescLevels([]);
                  }}
                >
                  {f}
                </Btn>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={toggleAllDesc}
              disabled={!descField}
              className={`rounded-xl border px-3 py-3 text-left text-sm font-bold ${allDescOn ? "bg-gradient-to-br from-indigo-950 via-violet-950 to-amber-900 text-amber-50 border-amber-400/70" : "bg-white/95 border-amber-800/20"}`}
            >
              <div>全部</div>
              <div className="text-xs font-normal">
                {descField
                  ? data.filter((q) => q.grade === descGrade && q.field === descField).length
                  : 0}
                問
              </div>
            </button>
            {descCats.map((c) => {
              const on = descLevels.includes(c),
                n = descCount(c);
              return (
                <button
                  key={c}
                  onClick={() => toggleDesc(c)}
                  className={`rounded-xl border px-3 py-3 text-left text-sm font-bold ${on ? "bg-gradient-to-br from-indigo-950 via-violet-950 to-amber-900 text-amber-50 border-amber-400/70" : "bg-white/95 border-amber-800/20"}`}
                >
                  <div>{c}</div>
                  <div className="text-xs font-normal">{n}問</div>
                </button>
              );
            })}
          </div>
          <div className="choice-panel open">
            <div className="choice-panel-inner">
              <div className="choice-panel-surface rounded-2xl border border-amber-800/20 bg-amber-50/70 p-3 text-center space-y-3">
                <div>
                  <b>選択中：{selectedDesc}問</b>
                  <div className="text-xs text-slate-500">
                    {descField
                      ? descLevels.length
                        ? `${descField} / ${descLevels.join(" / ")}`
                        : `${descField}の小単元を選んでください`
                      : "主要4単元を選んでください"}
                  </div>
                </div>
                <div>
                  <b>出題順</b>
                  <div className="grid grid-cols-2 gap-2">
                    <Btn kind={order === "number" ? "main" : ""} onClick={() => setOrder("number")}>
                      問題番号順
                    </Btn>
                    <Btn kind={order === "random" ? "main" : ""} onClick={() => setOrder("random")}>
                      ランダム
                    </Btn>
                  </div>
                </div>
                <Btn onClick={begin} disabled={!selectedDesc} kind="main">
                  📘 スタート
                </Btn>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-amber-800/20 bg-white/70 p-3 text-left space-y-3 shadow-sm">
          <div>
            <div className="text-lg font-black text-amber-700">練習</div>
            <div className="text-xs text-slate-500">
              小単元ごとに、似た選択肢から考えて選ぶ問題です。
            </div>
          </div>
          <div>
            <b>学年</b>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {practiceGrades.map((g) => (
                <Btn
                  key={g}
                  kind={practiceGrade === g ? "main" : ""}
                  onClick={() => {
                    setGrade(g);
                    setField("");
                    setLevel("");
                  }}
                >
                  {g}
                </Btn>
              ))}
            </div>
          </div>
          <div>
            <b>主要4単元</b>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              {practiceFields.map((f) => (
                <Btn
                  key={f}
                  kind={practiceField === f ? "main" : ""}
                  onClick={() => {
                    setField(f);
                    setLevel("");
                  }}
                >
                  {f}
                </Btn>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              onClick={toggleAllPractice}
              disabled={!practiceField}
              className={`rounded-xl border px-3 py-3 text-left text-sm font-bold ${allPracticeOn ? "bg-gradient-to-br from-indigo-950 via-violet-950 to-amber-900 text-amber-50 border-amber-400/70" : "bg-white/95 border-amber-800/20"}`}
            >
              <div>最初の小単元を選ぶ</div>
              <div className="text-xs font-normal">
                {practiceCats[0] ? practiceCount(practiceCats[0]) : 0}問
              </div>
            </button>
            {practiceCats.map((c) => {
              const on = level === c,
                n = practiceCount(c);
              return (
                <button
                  key={c}
                  onClick={() => togglePractice(c)}
                  className={`rounded-xl border px-3 py-3 text-left text-sm font-bold ${on ? "bg-gradient-to-br from-indigo-950 via-violet-950 to-amber-900 text-amber-50 border-amber-400/70" : "bg-white/95 border-amber-800/20"}`}
                >
                  <div>{c}</div>
                  <div className="text-xs font-normal">{n}問</div>
                </button>
              );
            })}
          </div>
          <div className="choice-panel open">
            <div className="choice-panel-inner">
              <div className="choice-panel-surface rounded-2xl border border-amber-800/20 bg-amber-50/70 p-3 text-center space-y-3">
                <div>
                  <b>選択中：{selectedPractice}問</b>
                  <div className="text-xs text-slate-500">
                    {practiceField
                      ? level
                        ? `${practiceField} / ${level}`
                        : `${practiceField}の小単元を選んでください`
                      : "主要4単元を選んでください"}
                  </div>
                </div>
                <div>
                  <b>出題順</b>
                  <div className="grid grid-cols-2 gap-2">
                    <Btn kind={order === "number" ? "main" : ""} onClick={() => setOrder("number")}>
                      問題番号順
                    </Btn>
                    <Btn kind={order === "random" ? "main" : ""} onClick={() => setOrder("random")}>
                      ランダム
                    </Btn>
                  </div>
                </div>
                <Btn onClick={begin} disabled={!selectedPractice} kind="main">
                  📘 スタート
                </Btn>
              </div>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
}
function Radar({ items, grade }) {
  const size = 220,
    c = 110,
    r = 72,
    n = items.length || 1,
    pt = (v) =>
      items
        .map((x, i) => {
          const a = -Math.PI / 2 + (i * 2 * Math.PI) / n,
            d = r * v(x, i);
          return `${c + Math.cos(a) * d},${c + Math.sin(a) * d}`;
        })
        .join(" "),
    data = pt((x) => x.accuracy / 100),
    topic = (x) =>
      grade === "全学年"
        ? recordGrades.map((g) => `${g}: ${det(`${g}${x.field}`)}`).join(" / ")
        : det(`${grade}${x.field}`),
    best = [...items].filter((x) => x.total).sort((a, b) => b.accuracy - a.accuracy)[0],
    weak = [...items].filter((x) => x.total).sort((a, b) => a.accuracy - b.accuracy)[0];
  return (
    <Box>
      <div id="radar" className="scroll-mt-4">
        <b>得意・弱点分析</b>
        <div className="text-sm text-slate-600">暫定評価：各学年のA・Bを半々、全学年は6枠を均等に平均。各枠の最新の完了テストを使用します。</div>
        <p className="text-xs text-slate-500">未受験は計算上0％ですが、不正解ではありません。練習・今日の5問は履歴に残り、レーダーには入りません。</p>
      </div>
      <div className="mx-auto max-w-xs">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full" role="img" aria-label={`${grade}の分野別評価。学年とA・Bを均等集計。詳しい内訳は下に表示。`}>
          <polygon points={pt(() => 1)} fill="none" stroke="#cbd5e1" />
          <polygon points={pt(() => 0.75)} fill="none" stroke="#e2e8f0" />
          <polygon points={pt(() => 0.5)} fill="none" stroke="#e2e8f0" />
          <polygon points={pt(() => 0.25)} fill="none" stroke="#e2e8f0" />
          {items.map((x, i) => {
            const a = -Math.PI / 2 + (i * 2 * Math.PI) / n,
              ex = c + Math.cos(a) * r,
              ey = c + Math.sin(a) * r,
              lx = c + Math.cos(a) * (r + 22),
              ly = c + Math.sin(a) * (r + 22);
            return (
              <g key={x.field}>
                <line x1={c} y1={c} x2={ex} y2={ey} stroke="#e2e8f0" />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-slate-700 text-[12px] font-bold"
                >
                  {x.field}
                </text>
              </g>
            );
          })}
          <polygon points={data} fill="rgba(14,165,233,.22)" stroke="#0284c7" strokeWidth="3" />
          {items.map((x, i) => {
            const a = -Math.PI / 2 + (i * 2 * Math.PI) / n,
              d = (r * x.accuracy) / 100;
            return (
              <circle
                key={x.field}
                cx={c + Math.cos(a) * d}
                cy={c + Math.sin(a) * d}
                r="4"
                fill="#0284c7"
              />
            );
          })}
          <text x={c} y={c + 4} textAnchor="middle" className="fill-slate-400 text-[11px]">
            100%
          </text>
        </svg>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {items.map((x) => (
          <div
            key={x.field}
            className={`rounded-xl border p-2 text-center text-xs font-bold ${x.checked ? cls(x.accuracy) : "bg-slate-50 text-slate-600 border-slate-200"}`}
          >
            <div>{x.field}</div>
            <div className="text-[10px] font-normal text-slate-500">{topic(x)}</div>
            <div>{x.total ? `${x.accuracy}%` : "未実施"}</div>
            <div className="text-xs">受験済み {x.checked}/{x.slots.length}枠</div>
          </div>
        ))}
      </div>
      <div className="assessment-breakdowns">
        {items.map(x => (
          <details key={x.field} className="assessment-breakdown">
            <summary>{x.field}の内訳・100％になっていない理由</summary>
            <p>{x.missing.length ? `未受験：${x.missing.join("、")}` : "すべての枠で受験済みです。"}</p>
            {x.improving.length > 0 && <p>100％未満：{x.improving.join("、")}</p>}
            {!x.missing.length && !x.improving.length && <p>すべての枠で満点です！</p>}
            <ul>{x.slots.map(slot => (
              <li key={slot.unit}><b>{slot.unit}</b>：{slot.record ? `${displayAssessmentPercent(slot.accuracy)}％（${slot.score}/${slot.total}点・${recordDate(slot.record)}）` : "未受験（不正解とは別）"}</li>
            ))}</ul>
          </details>
        ))}
      </div>
      {best && weak && best.field !== weak.field ? (
        <div className="text-sm">
          <b>得意：</b>
          {best.field}（{best.accuracy}%） / <b>弱点：</b>
          {weak.field}（{weak.accuracy}%）
        </div>
      ) : (
        <p className="text-sm text-slate-500">{best ? `現在評価できる分野：${best.field}。未受験の分野は弱点とは別に表示します。` : "評価できるテストがたまると分析が表示されます。"}</p>
      )}
    </Box>
  );
}
function UnitLearningHistory({ unit, records }) {
  const all = chronologicalRecords(records).filter(r => (r.unitScores || []).some(x => x.unit === unit));
  const [kind, setKind] = useState(() => all.some(r => historyKind(r) === "test") ? "test" : all.some(r => historyKind(r) === "practice") ? "practice" : "unknown");
  const [limits, setLimits] = useState({});
  const rows = all.filter(r => historyKind(r) === kind);
  const limit = limits[kind] || 5;
  const assessment = unitAssessment(records, unit);
  const tests = all.filter(r => historyKind(r) === "test");
  const recent = tests[0]?.unitScores.find(x => x.unit === unit);
  const previous = tests[1]?.unitScores.find(x => x.unit === unit);
  return (
    <article className="learning-unit-summary">
      <h3>{unit}</h3>
      <p>レーダー：{assessment.record ? `${displayAssessmentPercent(assessment.accuracy)}％` : "未受験／評価できるテストなし"}</p>
      <p className="text-sm text-slate-600">{recent ? `${previous ? `前回${displayAssessmentPercent(previous.score / previous.total * 100)}％ → ` : ""}最新${displayAssessmentPercent(recent.score / recent.total * 100)}％` : "テスト履歴はまだありません。"}{all[0] ? ` ／ 最終学習 ${recordDate(all[0])}` : ""}</p>
      <details className="unit-history-details">
        <summary>履歴を見る（{all.length}件）</summary>
        <label className="history-kind-label">表示する履歴
          <select aria-label={`${unit}の履歴の種類`} value={kind} onChange={e => setKind(e.target.value)}>
            <option value="test">テスト</option><option value="practice">練習・今日の5問</option><option value="unknown">種別不明の過去記録</option>
          </select>
        </label>
        {!rows.length && <p>この種類の履歴はありません。</p>}
        <ol className="unit-history-list">{rows.slice(0, limit).map(r => {
          const slot = r.unitScores.find(x => x.unit === unit);
          const reason = assessmentReason(r, unit);
          const target = assessment.record && String(assessment.record.id) === String(r.id);
          return <li key={r.id}>
            <b>{recordDate(r)}　{slot.score}/{slot.total}点（{displayAssessmentPercent(slot.score / slot.total * 100)}％）</b>
            <span>{r.isRetry ? "間違えた問題の復習" : r.activityType === "daily" ? "今日の5問" : r.activityType || "種別不明"} ／ {r.quizMode || "モード不明"} ／ {tm(r.timeSeconds)}</span>
            <span className={target ? "assessment-target" : "text-slate-600"}>{target ? "レーダー評価対象：この枠の最新の完了テスト" : reason || "対象外：より新しい完了テストがあります"}</span>
          </li>;
        })}</ol>
        {rows.length > limit && <Btn onClick={() => setLimits(old => ({ ...old, [kind]: limit + 5 }))}>もっと見る（残り{rows.length - limit}件）</Btn>}
      </details>
    </article>
  );
}
function LearningHistory({ records, grade }) {
  const [otherLimit, setOtherLimit] = useState(5);
  const targetGrades = grade === "全学年" ? recordGrades : [grade];
  const recognized = unit => recordGrades.some(g => fieldNames.some(f => levels.some(l => unit === `${g}${f}${l}`)));
  const others = chronologicalRecords(records).filter(r => (!(r.unitScores || []).length || r.unitScores.some(x => !recognized(x.unit))) && (grade === "全学年" || r.grade === grade || (r.unitScores || []).some(x => String(x.unit).startsWith(grade))));
  return <section className="learning-history" aria-label="単元別の学習履歴">
    <h2 className="text-xl font-bold">単元別の学習記録</h2>
    <p className="text-sm text-slate-600">全件保存しています。各単元の「履歴を見る」で直近5件、「もっと見る」で過去分を表示します。</p>
    {targetGrades.map(g => <details key={g} className="history-grade" open={grade !== "全学年"}>
      <summary>{g}の学習記録（A・B別）</summary>
      <div className="learning-unit-grid">{uns(g).map(unit => <UnitLearningHistory key={unit} unit={unit} records={records} />)}</div>
    </details>)}
    <details className="history-grade">
      <summary>記述・その他／分類できない過去の履歴（{others.length}件）</summary>
      <ol className="unit-history-list">{others.slice(0, otherLimit).map(r => <li key={r.id}><b>{recordDate(r)}　{r.score}/{r.total}点</b><span>{r.unit || r.activityType || "分類不明"}／{r.quizMode || "モード不明"}</span><span>レーダー対象外：A・B別の完了テストとして確認できない記録です。</span></li>)}</ol>
      {others.length > otherLimit && <Btn onClick={() => setOtherLimit(otherLimit + 5)}>もっと見る</Btn>}
    </details>
  </section>;
}
function C({ children }) {
  return <div className="app-shell app-panel rounded-3xl p-5 sm:p-7 space-y-5">{children}</div>;
}
function Btn({ children, onClick, disabled, kind = "", className = "", ...props }) {
  const isStart = typeof children === "string" && children.includes("スタート");
  return (
    <button
      type="button"
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`app-btn rounded-xl px-4 py-3 font-bold border ${kind === "main" ? "button-primary" : "button-secondary"} ${disabled ? "opacity-40" : ""} ${isStart ? "start-cta" : ""} ${className}`}
    >
      {isStart && !children.includes("▶") ? "▶ " : ""}
      {children}
    </button>
  );
}

function ScienceText({ children }) {
  const parts = String(children ?? "").split(/(Ω|\d+(?:\.\d+)?N\b)/g);
  return parts.map((part, index) =>
    part === "Ω" ? (
      <span key={index} className="unit-ohm">Ω<span className="unit-reading">（オーム）</span></span>
    ) : /^\d+(?:\.\d+)?N$/.test(part) ? (
      <span key={index} className="unit-newton">{part}</span>
    ) : (
      <React.Fragment key={index}>{part}</React.Fragment>
    )
  );
}
function LinkBtn({ children, href, className = "" }) {
  return (
    <a
      href={href}
      className={`app-btn rounded-xl px-4 py-3 font-bold border border-amber-800/20 bg-white/90 text-center ${className}`}
    >
      {children}
    </a>
  );
}
function HomeLinks({ home }) {
  return (
    <div className="home-links grid grid-cols-3 gap-2">
      <LinkBtn href={okuponHomeUrl}>オクポンホーム</LinkBtn>
      <Btn onClick={home}>理科ホーム</Btn>
      <LinkBtn href={mathHomeUrl}>数学ホーム</LinkBtn>
    </div>
  );
}

function ReadyInfo({
  qs,
  quizType,
  solveMode,
  grade,
  field,
  level,
  descLevels,
  target,
  bestPerfect,
  dailyMode,
}) {
  const label = dailyMode
    ? "弱点優先・5問・練習モード"
    : quizType === "記述対策"
      ? `${grade || "中1"}・${field || "未選択"}・${descLevels.length}小単元`
      : quizType === "練習問題"
        ? `${grade || "中1"}・${field || "未選択"}・${level || "未選択"}`
        : `${grade}・${field}・${level}`;
  return (
    <Box className="ui-guide">
      <div>
        <div className="text-sm text-slate-500">準備完了</div>
        <div className="text-2xl font-black text-amber-900">
          {dailyMode
            ? "今日の5問"
            : quizType === "記述対策"
              ? "理科 記述"
              : quizType === "練習問題"
                ? "理科 練習"
                : "理科 一問一答"}
        </div>
        <div className="text-xs text-slate-500">{label}</div>
      </div>
      <div className="ready-grid">
        <div className="ready-stat">
          <span className="text-xs text-slate-500">問題数</span>
          <b>{qs.length}問</b>
        </div>
        <div className="ready-stat">
          <span className="text-xs text-slate-500">モード</span>
          <b>{solveMode}</b>
        </div>
        <div className="ready-stat">
          <span className="text-xs text-slate-500">目標時間</span>
          <b>{tm(target)}</b>
        </div>
        <div className="ready-stat">
          <span className="text-xs text-slate-500">全問正解ベスト</span>
          <b>{dailyMode ? "対象外" : bestPerfect ? tm(bestPerfect) : "まだなし"}</b>
        </div>
      </div>
    </Box>
  );
}

function HomeMiniRadar({ items }) {
  const size = 168,
    c = 84,
    r = 54,
    n = items.length || 1,
    point = (v) =>
      items
        .map((x, i) => {
          const a = -Math.PI / 2 + (i * 2 * Math.PI) / n,
            d = r * v(x, i);
          return `${c + Math.cos(a) * d},${c + Math.sin(a) * d}`;
        })
        .join(" "),
    data = point((x) => (x.total ? x.accuracy / 100 : 0));
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto mt-2 w-full max-w-[190px]">
      <polygon
        points={point(() => 1)}
        fill="rgba(255,255,255,.04)"
        stroke="rgba(255,255,255,.45)"
      />
      <polygon points={point(() => 0.75)} fill="none" stroke="rgba(255,255,255,.22)" />
      <polygon points={point(() => 0.5)} fill="none" stroke="rgba(255,255,255,.22)" />
      <polygon points={point(() => 0.25)} fill="none" stroke="rgba(255,255,255,.18)" />
      {items.map((x, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / n,
          ex = c + Math.cos(a) * r,
          ey = c + Math.sin(a) * r,
          lx = c + Math.cos(a) * (r + 18),
          ly = c + Math.sin(a) * (r + 18);
        return (
          <g key={x.field}>
            <line x1={c} y1={c} x2={ex} y2={ey} stroke="rgba(255,255,255,.24)" />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-amber-50 text-[10px] font-black"
            >
              {x.field}
            </text>
          </g>
        );
      })}
      <polygon points={data} fill="rgba(56,189,248,.32)" stroke="#7dd3fc" strokeWidth="3" />
      {items.map((x, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / n,
          d = r * (x.total ? x.accuracy / 100 : 0);
        return (
          <circle
            key={x.field}
            cx={c + Math.cos(a) * d}
            cy={c + Math.sin(a) * d}
            r="3.5"
            fill="#facc15"
          />
        );
      })}
      <text x={c} y={c + 4} textAnchor="middle" className="fill-amber-50/70 text-[10px] font-black">
        100%
      </text>
    </svg>
  );
}

function HomeMotivation({
  records,
  streak,
  userGrade,
  startDaily,
  setQuizType,
  setSolveMode,
  setGrade,
  setField,
  setLevel,
  setDescLevels,
  onSelectQuestions,
}) {
  const stats = assessmentStats(records, "全学年"),
    active = stats.filter((x) => x.total),
    weak = active.length ? [...active].sort((a, b) => a.accuracy - b.accuracy)[0] : null,
    best = active.length ? [...active].sort((a, b) => b.accuracy - a.accuracy)[0] : null,
    total = records.reduce((s, r) => s + (Number(r.total) || 0), 0),
    perfects = records.filter((r) => r.total && r.score === r.total).length,
    levelNo = 1 + Math.floor(total / 50),
    xp = total % 50,
    badges = [
      ...new Set(
        records.flatMap((r) =>
          (r.unitScores || []).filter((x) => x.total && x.score === x.total).map((x) => x.unit),
        ),
      ),
    ].slice(0, 8),
    questGrade = recordGrades.includes(userGrade) ? userGrade : "中1",
    questField = weak?.field || "生物",
    mission = weak ? `${questField}の問題を確認しよう` : "まずは好きな単元から進めよう";
  const startQuest = () => {
    setQuizType("一問一答");
    setSolveMode("練習モード");
    setGrade(questGrade);
    setField(questField);
    setLevel("A");
    setDescLevels([]);
    onSelectQuestions?.();
    setTimeout(
      () =>
        document
          .getElementById("questions")
          ?.scrollIntoView({ behavior: "smooth", block: "start" }),
      0,
    );
  };
  return (
    <Box className="motivation-card">
      <div className="mission-grid">
        <div className="space-y-3">
          <div>
            <div className="text-xs font-black muted">TODAY'S MISSION</div>
            <div className="text-2xl font-black">{mission}</div>
            <div className="text-sm muted">小さく始めると、ちゃんと続きます。</div>
          </div>
          <div className="quest-panel">
            <div className="text-xs font-black muted">今日の5問</div>
            <div className="text-lg font-black">弱点から5分だけ復習</div>
            <div className="text-xs muted">
              間違えやすい単元を優先して、足りない分はランダムで出します。
            </div>
            <button
              onClick={startDaily}
              className="mt-3 w-full rounded-xl border border-sky-200 bg-sky-200 px-4 py-3 font-black text-slate-950"
            >
              今日の5問を始める
            </button>
          </div>
          <div className="quest-panel">
            <div className="text-xs font-black muted">弱点クエスト</div>
            <div className="text-lg font-black">
              {questGrade}・{questField}・A問題
            </div>
            <div className="text-xs muted">
              {weak
                ? `最近の正答率 ${weak.accuracy}%。ここを上げるとレーダーが伸びます。`
                : "履歴がたまるとおすすめが自動で出ます。"}
            </div>
            <button
              onClick={startQuest}
              className="mt-3 w-full rounded-xl border border-amber-300/70 bg-amber-300 px-4 py-3 font-black text-slate-950"
            >
              おすすめを選択する
            </button>
          </div>
          <div>
            <div className="mb-1 flex justify-between text-xs font-black muted">
              <span>Lv.{levelNo} 学習EXP</span>
              <span>{xp}/50問</span>
            </div>
            <div className="xp-track">
              <div className="xp-fill" style={{ width: `${Math.max(6, (xp / 50) * 100)}%` }}></div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="quest-panel text-center">
            <div className="text-xs font-black muted">レーダー</div>
            <HomeMiniRadar items={stats} />
            {best && (
              <div className="mt-2 text-xs muted">
                得意 {best.field} / 弱点 {weak.field}
              </div>
            )}
          </div>
          <div>
            <div className="mb-2 text-xs font-black muted">満点バッジ</div>
            {badges.length ? (
              <div className="badge-row">
                {badges.map((u) => (
                  <div key={u} className="perfect-badge">
                    <div className="text-xl">◇</div>
                    <div>{u.replace(/^中[123]/, "")}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-white/10 p-3 text-sm muted">
                満点を取るとここにバッジが並びます。
              </div>
            )}
          </div>
          <div className="rounded-xl bg-white/10 p-3 text-xs muted">
            満点 {perfects}回 / 連続 {streak.current}日
          </div>
        </div>
      </div>
    </Box>
  );
}

const ScienceNavigation = React.createContext(null);

function syncLessonLocation(screen) {
  LESSON_RESTORE_PENDING=false;
  const topics={"states-explanation":"states-temperature","density-explanation":"density","organic-explanation":"organic-inorganic","gases-explanation":"gases","metal-explanation":"metal-nonmetal"};
  const url=new URL(location.href);
  if(topics[screen])url.searchParams.set("explanation",topics[screen]);else url.searchParams.delete("explanation");
  if(/^(#density-|#organic-|#gases-|#states-|#metal-)/.test(url.hash))url.hash="";
  history.replaceState({...history.state,lessonReader:null},"",url.pathname+url.search+url.hash);
}

function App() {
  const initialScreen = INITIAL_QUIZ_SESSION?.screen || ({"states-temperature":"states-explanation","metal-nonmetal":"metal-explanation",density:"density-explanation","organic-inorganic":"organic-explanation",gases:"gases-explanation"}[new URLSearchParams(window.location.search).get("explanation")] || "home");
  const [scr, updateScreen] = useState(initialScreen);
  const navigation = React.useRef({ current: initialScreen, trail: INITIAL_QUIZ_SESSION ? ["home", "questions"] : [] });
  const setScr = (next) => {
    const nav = navigation.current;
    if (next === nav.current) return;
    if (next === "home") nav.trail = [];
    else nav.trail.push(nav.current);
    nav.current = next;
    syncLessonLocation(next);
    updateScreen(next);
  };
  const allowLeave = () => navigation.current.current !== "quiz" || window.confirm(
    "学習を中断しますか？今回の途中の回答は保存されません。過去の学習記録は残ります。",
  );
  const goBack = () => {
    if (!allowLeave()) return;
    const nav = navigation.current;
    let previous;
    if (nav.current === "quiz" || nav.current === "ready") {
      previous = nav.trail.includes("questions") ? "questions" : "home";
      nav.trail = [];
    } else if (nav.current === "result") {
      previous = "home";
      nav.trail = [];
    } else previous = nav.trail.pop() || "home";
    nav.current = previous;
    syncLessonLocation(previous);
    updateScreen(previous);
  };
  const goHome = () => { if (allowLeave()) setScr("home"); };
  return (
    <ScienceNavigation.Provider value={{ scr, setScr, goBack, goHome, previousScreen:navigation.current.trail.at(-1) }}>
      <ScienceApp />
    </ScienceNavigation.Provider>
  );
}

function ScienceApp() {
  const { scr, setScr } = React.useContext(ScienceNavigation);
  const restored = INITIAL_QUIZ_SESSION;
  const savedName = () => localStorage.getItem(N) || "",
    savedGrade = () => localStorage.getItem(G) || "",
    savedProfile = () => localStorage.getItem(P) === "1" && !!savedName() && !!savedGrade();
  const [name, setName] = useState(savedName),
    [userGrade, setUserGrade] = useState(savedGrade),
    [profileSaved, setProfileSaved] = useState(savedProfile),
    [quizType, setQuizType] = useState(restored?.quizType || "一問一答"),
    [solveMode, setSolveMode] = useState(restored?.solveMode || "練習モード"),
    [descLevels, setDescLevels] = useState(restored?.descLevels || []),
    [grade, setGrade] = useState(() => restored?.grade || savedGrade() || "中1"),
    [field, setField] = useState(restored?.field || ""),
    [level, setLevel] = useState(restored?.level || ""),
    [qs, setQs] = useState(restored?.qs || []),
    [i, setI] = useState(restored?.i || 0),
    [ans, setAns] = useState(restored?.ans || {}),
    [selected, setSelected] = useState(restored?.selected || ""),
    firstAnswers = React.useRef(restored?.firstAnswers || {}),
    [hist, setHist] = useState(restored?.hist || []),
    [wrongs, setWrongs] = useState(restored?.wrongs || []),
    [records, setRecords] = useState([]),
    [bestTimes, setBestTimes] = useState({}),
    [rg, setRg] = useState("全学年"),
    [order, setOrder] = useState(restored?.order || "number"),
    [back, setBack] = useState(false),
    [sec, setSec] = useState(Math.floor((restored?.elapsedMs || 0) / 1000)),
    [finalSec, setFinalSec] = useState(restored?.finalSec || 0),
    [start, setStart] = useState(restored?.screen === "quiz" ? Date.now() : null),
    [streak, setStreak] = useState({ lastDate: "", current: 0, best: 0 }),
    [result, setResult] = useState(restored?.result || null),
    [reviewMode, setReviewMode] = useState(restored?.reviewMode || false),
    [dailyMode, setDailyMode] = useState(restored?.dailyMode || false),
    [cloudUser, setCloudUser] = useState(null),
    [cloud, setCloud] = useState({
      label: "クラウド保存を準備中",
      detail: "この端末の履歴もそのまま保存されます。",
    });
  const [storageWarning, setStorageWarning] = useState("");
  const [quotaRevision, setQuotaRevision] = useState(0);
  const [startingTest, setStartingTest] = useState(false);
  const [attemptMessage, setAttemptMessage] = useState("");
  const startingTestRef = React.useRef(false);
  const testAttemptId = React.useRef(typeof restored?.testAttemptId === "string" && restored.testAttemptId ? restored.testAttemptId : randomId());
  useEffect(() => {
    let timer;
    const refresh=()=>setQuotaRevision(v=>v+1);
    const storage=event=>{if([TEST_ATTEMPT_KEY,S,SCODE,N].includes(event.key)||event.key===null)refresh();};
    const schedule=()=>{
      const next=Date.parse(testAttemptDay()+"T00:00:00+09:00")+86400000;
      timer=setTimeout(()=>{refresh();schedule();},Math.max(30,next-Date.now()+30));
    };
    schedule();
    window.addEventListener("storage",storage);window.addEventListener("focus",refresh);document.addEventListener("visibilitychange",refresh);
    return ()=>{clearTimeout(timer);window.removeEventListener("storage",storage);window.removeEventListener("focus",refresh);document.removeEventListener("visibilitychange",refresh);};
  }, []);
  const elapsedMs = React.useRef(restored?.elapsedMs || 0);
  const tickAnchor = React.useRef(null);
  const sessionId = React.useRef(restored?.sessionId || Date.now());
  const correctRemaining = React.useRef(restored?.correctRemainingMs ?? 1000);
  const correctDeadline = React.useRef(null);
  const checkpoint = React.useRef(null);
  const clockRead = () => elapsedMs.current + (tickAnchor.current === null ? 0 : Math.max(0, performance.now() - tickAnchor.current));
  const flushClock = () => { elapsedMs.current = clockRead(); tickAnchor.current = null; return elapsedMs.current; };
  const resetAttempt = () => {
    flushClock(); elapsedMs.current = 0; correctRemaining.current = 1000; correctDeadline.current = null;
    sessionId.current = Date.now(); testAttemptId.current = randomId(); setAttemptMessage(""); setSelected("");
  };
  useEffect(() => {
    if (!["density-explanation","organic-explanation","gases-explanation","states-explanation"].includes(scr)) window.scrollTo({ top: 0, behavior: "instant" });
  }, [scr]);
  const syncProfile = async (user, displayName, schoolGrade) => {
    if (!sb || !user || !displayName || !schoolGrade) return;
    const { error } = await sb
      .from("student_profiles")
      .upsert({
        id: user.id,
        student_code: studentCode(),
        display_name: displayName.slice(0, 24),
        school_grade: schoolGrade,
      });
    if (error) throw error;
  };
  const syncRecords = async (user, list) => {
    if (!sb || !user || !list.length) return;
    const { error } = await sb.from("learning_records").upsert(
      list.map((r) => cloudRecord(r, user.id)),
      { onConflict: "client_record_id" },
    );
    if (error) throw error;
  };
  useEffect(() => {
    setRecords(asArray(load(S)));
    setBestTimes(load(BT, {}));
    setStreak(asStreak(load(T, { lastDate: "", current: 0, best: 0 })));
    setName(localStorage.getItem(N) || "");
    setUserGrade(localStorage.getItem(G) || "");
  }, []);
  useEffect(() => {
    let active = true;
    const connect = async () => {
      try {
        if (!sb) {
          if (active)
            setCloud({
              label: SCIENCE_IS_PREVIEW ? "テスト専用・この端末に保存中" : "この端末に保存中",
              detail: SCIENCE_IS_PREVIEW ? "本番の学習記録・先生用ページには送信されません。" : "クラウド保存の読み込みに失敗しました。",
            });
          return;
        }
        let {
          data: { session },
          error,
        } = await sb.auth.getSession();
        if (error) throw error;
        if (!session) {
          const signed = await sb.auth.signInAnonymously();
          if (signed.error) throw signed.error;
          session = signed.data.session;
        }
        const user = session?.user;
        if (!user) throw new Error("匿名ログインを開始できませんでした。");
        const localName = localStorage.getItem(N) || "",
          localGrade = localStorage.getItem(G) || "",
          localRecords = asArray(load(S));
        if (localName && localGrade) {
          await syncProfile(user, localName, localGrade);
          await syncRecords(user, localRecords);
        }
        if (active) {
          setCloudUser(user);
          setCloud({
            label: "クラウドに保存済み",
            detail: "学習記録を先生用ページと同期しました。",
          });
        }
      } catch (error) {
        console.warn("Cloud sync is unavailable.", error);
        if (active)
          setCloud({
            label: "この端末に保存中",
            detail: "通信できない時も履歴はこの端末に残ります。",
          });
      }
    };
    void connect();
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    if (!cloudUser || !profileSaved || !name || !userGrade) return;
    const sync = async () => {
      try {
        await syncProfile(cloudUser, name, userGrade);
        await syncRecords(cloudUser, records);
        setCloud({ label: "クラウドに保存済み", detail: "学習記録を先生用ページと同期しました。" });
      } catch (error) {
        console.warn("Cloud sync retry failed.", error);
        setCloud({
          label: "この端末に保存中",
          detail: "通信できない時も履歴はこの端末に残ります。",
        });
      }
    };
    const retry = () => {
      if (document.visibilityState === "visible") void sync();
    };
    void sync();
    const timer = setInterval(retry, 30000);
    window.addEventListener("online", retry);
    document.addEventListener("visibilitychange", retry);
    return () => {
      clearInterval(timer);
      window.removeEventListener("online", retry);
      document.removeEventListener("visibilitychange", retry);
    };
  }, [cloudUser, profileSaved, name, userGrade, records]);
  const filtered = useMemo(
      () =>
        quizType === "記述対策"
          ? data.filter(
              (q) =>
                q.grade === (grade || "中1") && q.field === field && descLevels.includes(q.level),
            )
          : quizType === "練習問題"
            ? practiceData.filter(
                (q) => q.grade === (grade || "中1") && q.field === field && q.level === level,
              )
            : data.filter(
                (q) =>
                  (grade === "全学年" || q.grade === grade) &&
                  (field === "全分野" || q.field === field) &&
                  q.level === level,
              ),
      [quizType, descLevels, grade, field, level],
    ),
    cur = qs[i],
    ck = cur ? k(cur) : "",
    picked = ans[ck] || "",
    correctFeedback = scr === "quiz" && solveMode === "練習モード" && picked && picked === cur?.answer,
    answered = qs.filter((q) => ans[k(q)]).length,
    target = qs.length * 10,
    unit =
      grade && field && level && grade !== "全学年" && field !== "全分野"
        ? `${grade}${field}${level}`
        : "",
    unitRecs = unit ? rec(records, unit) : [],
    bestKey = grade && field && level ? `${grade}-${field}-${level}` : "",
    bestPerfect = bestKey ? Number(bestTimes[bestKey]) || 0 : 0,
    fw = useMemo(
      () =>
        Array.from({ length: 20 }, (_, id) => ({
          id,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 50}%`,
          delay: `${id * 0.08}s`,
        })),
      [scr],
    );

  const testQuota = useMemo(() => testAttemptStatus(testAttemptUnit(quizType,grade,field,level),new Date(),null,scr==="ready"?testAttemptId.current:""), [quizType,grade,field,level,quotaRevision,records,name,scr]);

  useEffect(() => {
    if (scr !== "quiz" || !start || correctFeedback) return;
    tickAnchor.current = performance.now();
    const timer = setInterval(() => setSec(Math.floor(clockRead() / 1000)), 100);
    return () => { clearInterval(timer); flushClock(); };
  }, [scr, start, correctFeedback]);

  // Saving an elapsed duration, never a wall-clock start time, excludes reload downtime.
  checkpoint.current = () => {
    try {
      if (!["ready", "quiz", "result"].includes(scr) || !qs.length) {
        localStorage.removeItem(QUIZ_SESSION_KEY);
        return;
      }
      const remaining = correctDeadline.current === null ? correctRemaining.current : Math.max(0, correctDeadline.current - performance.now());
      save(QUIZ_SESSION_KEY, { version: 1, owner: savedName(), screen: scr, sessionId: sessionId.current,
        quizType, solveMode, descLevels, grade, field, level, qs, i, ans, selected, testAttemptId:testAttemptId.current, firstAnswers: firstAnswers.current,
        hist, wrongs, order, elapsedMs: clockRead(), finalSec, reviewMode, dailyMode, result,
        correctRemainingMs: remaining });
    } catch {
      setStorageWarning("途中経過を保存できません。リロードすると再開できない可能性があります。履歴は変更していません。");
    }
  };
  useEffect(() => { checkpoint.current?.(); }, [scr, qs, i, ans, selected, quizType, solveMode, result]);
  useEffect(() => {
    const persist = () => checkpoint.current?.();
    const timer = setInterval(persist, 250);
    window.addEventListener("pagehide", persist);
    document.addEventListener("visibilitychange", persist);
    return () => { clearInterval(timer); window.removeEventListener("pagehide", persist); document.removeEventListener("visibilitychange", persist); };
  }, []);

  const streakNext = () => {
    const today = dk();
    if (streak.lastDate === today) return streak;
    const c = streak.lastDate === add(today, -1) ? streak.current + 1 : 1;
    return { lastDate: today, current: c, best: Math.max(streak.best, c) };
  };
  const savePerfectBest = (score, time) => {
    if (
      reviewMode || quizType !== "一問一答" ||
      solveMode !== "テストモード" ||
      !bestKey ||
      score !== qs.length ||
      !qs.length
    )
      return;
    const old = Number(bestTimes[bestKey]) || 0;
    if (old && old <= time) return;
    const next = { ...bestTimes, [bestKey]: time };
    save(BT, next);
    setBestTimes(next);
  };
  const saveRes = (h, score, time) => {
    const r = {
        id: sessionId.current,
        date: dk(),
        userName: name.trim() || "名前なし",
        score,
        total: qs.length,
        accuracy: Math.round((score / qs.length) * 100),
        timeSeconds: time,
        unitScores: us(h),
        activityType: dailyMode ? "daily" : quizType,
        quizMode: solveMode,
        grade: dailyMode ? "" : grade,
        field: dailyMode ? "" : field,
        unit: dailyMode ? "今日の5問" : unit,
        isRetry: reviewMode,
        completed: true,
        assessmentVersion: ASSESSMENT_POLICY,
        questionKeys: h.map(k),
      },
      rs = mergeRecords(r, records),
      st = streakNext();
    save(S, rs);
    setRecords(rs);
    try {
      save(T, st);
      setStreak(st);
      savePerfectBest(score, time);
    } catch (error) {
      setStorageWarning(
        "結果は保存しましたが、連続学習やベストタイムの更新に失敗しました。履歴をバックアップしてください。",
      );
    }
    if (cloudUser) {
      setCloud({ label: "先生用ページへ保存中", detail: "学習記録をクラウドに送信しています。" });
      void syncRecords(cloudUser, [r])
        .then(() =>
          setCloud({
            label: "先生用ページへ保存済み",
            detail: "先生用ページには30秒以内に反映されます。",
          }),
        )
        .catch((error) => {
          console.warn("Cloud record sync failed.", error);
          setCloud({
            label: "この端末に保存中",
            detail: "クラウドへの同期は次回の接続時に再試行します。",
          });
        });
    }
  };
  const startQuiz = async () => {
    if (startingTestRef.current) return;
    startingTestRef.current=true;setStartingTest(true);setAttemptMessage("");
    try {
      const limitedUnit=solveMode==="テストモード"&&!reviewMode&&!dailyMode ? testAttemptUnit(quizType,grade,field,level) : "";
      if(limitedUnit) {
        const reserved=await reserveTestAttempt(limitedUnit,testAttemptId.current,sessionId.current);
        setQuotaRevision(v=>v+1);
        if(!reserved.ok){setAttemptMessage(reserved.message);return;}
      }
      elapsedMs.current=0;tickAnchor.current=null;
      setSelected("");setSec(0);setFinalSec(0);setStart(Date.now());setScr("quiz");
    } finally {startingTestRef.current=false;setStartingTest(false);}
  };

  const begin = () => {
    if (!filtered.length) {
      setScr("soon");
      return;
    }
    const ordered = order === "number" ? [...filtered].sort((a, b) => a.no - b.no) : sh(filtered);
    resetAttempt();
    setQs(ordered.map(mq));
    setI(0);
    setAns({});
    firstAnswers.current = {};
    setHist([]);
    setWrongs([]);
    setResult(null);
    setBack(false);
    setSec(0);
    setFinalSec(0);
    setStart(null);
    setReviewMode(false);
    setDailyMode(false);
    setScr("ready");
  };
  const startDaily = () => {
    const daily = dailyFive(records, userGrade);
    if (!daily.length) {
      setScr("soon");
      return;
    }
    resetAttempt();
    setQuizType("一問一答");
    setSolveMode("練習モード");
    setGrade(recordGrades.includes(userGrade) ? userGrade : "全学年");
    setField("今日の5問");
    setLevel("");
    setDescLevels([]);
    setQs(daily.map(mq));
    setI(0);
    setAns({});
    firstAnswers.current = {};
    setHist([]);
    setWrongs([]);
    setResult(null);
    setBack(false);
    setSec(0);
    setFinalSec(0);
    setStart(null);
    setReviewMode(false);
    setDailyMode(true);
    setScr("ready");
  };
  const finish = (a) => {
    const h = qs.map((q) => {
        const s = firstAnswers.current[k(q)] ?? a[k(q)];
        return { ...q, selected: s || "未回答", correct: s === q.answer };
      }),
      score = h.filter((x) => x.correct).length,
      time = Math.floor(flushClock() / 1000);
    setHist(h);
    setWrongs(h.filter((x) => !x.correct));
    setFinalSec(time);
    setStart(null);
    let saved = true,
      saveFailed = false;
    {
      try {
        saveRes(h, score, time);
      } catch (error) {
        saved = false;
        saveFailed = true;
        setStorageWarning(
          "この結果を端末に保存できませんでした。既存の履歴は変更していません。この画面を閉じずに再保存してください。",
        );
      }
    }
    setResult({ score, total: qs.length, praise: pr(score, qs.length), saved, saveFailed });
    setScr("result");
  };
  const choose = (c) => {
      if (picked) return;
      if (selected !== c) { setSelected(c); return; }
      setSelected("");
      if (solveMode === "練習モード" && c === cur.answer) {
        setSec(Math.floor(flushClock() / 1000));
        correctRemaining.current = 1000;
      }
      if (!Object.prototype.hasOwnProperty.call(firstAnswers.current, ck)) {
        firstAnswers.current[ck] = c;
      }
      const n = { ...ans, [ck]: c };
      setAns(n);
      if (solveMode === "練習モード") return;
      i + 1 < qs.length ? (setI(i + 1), setBack(false)) : finish(n);
    },
    next = () => {
      setSelected(""); correctRemaining.current = 1000; correctDeadline.current = null;
      return i + 1 < qs.length ? (setI(i + 1), setBack(false)) : finish(ans);
    },
    prev = () => {
      setBack(true);
      setI(Math.max(0, i - 1));
    },
    home = () => setScr("home");
  useEffect(() => {
    if (!correctFeedback) return;
    const remaining = Math.min(1000, Math.max(0, correctRemaining.current));
    correctDeadline.current = performance.now() + remaining;
    const timer = setTimeout(() => next(), remaining);
    return () => { clearTimeout(timer); correctRemaining.current = Math.max(0, (correctDeadline.current ?? performance.now()) - performance.now()); correctDeadline.current = null; };
  }, [scr, solveMode, i, picked]);
  const retryResultSave = () => {
    try {
      saveRes(hist, result.score, finalSec);
      setResult({ ...result, saved: true, saveFailed: false });
      setStorageWarning("");
    } catch (error) {
      setStorageWarning(
        "まだ保存できません。この画面を開いたまま、端末の空き容量や保存設定を確認してください。",
      );
    }
  };
  const register = () => {
      const n = name.trim();
      if (!n || !userGrade) return;
      localStorage.setItem(N, n);
      localStorage.setItem(G, userGrade);
      localStorage.setItem(P, "1");
      setName(n);
      setUserGrade(userGrade);
      setProfileSaved(true);
      setGrade(userGrade);
      if (cloudUser)
        void syncProfile(cloudUser, n, userGrade).catch((error) => {
          console.warn("Cloud profile sync failed.", error);
          setCloud({
            label: "この端末に保存中",
            detail: "プロフィールの同期は次回の接続時に再試行します。",
          });
        });
      setScr("home");
    },
    review = () => {
      const ordered = order === "number" ? [...wrongs].sort((a, b) => a.no - b.no) : sh(wrongs);
      resetAttempt();
      setQs(ordered.map(mq));
      setI(0);
      setAns({});
      firstAnswers.current = {};
      setHist([]);
      setWrongs([]);
      setResult(null);
      setBack(false);
      setSec(0);
      setFinalSec(0);
      setStart(null);
      setReviewMode(true);
      setDailyMode(dailyMode);
      setScr("ready");
    };

  if (scr === "profile" || (!profileSaved && !["explanations", "metal-explanation", "density-explanation", "organic-explanation", "gases-explanation", "states-explanation", "explanation-updates"].includes(scr)))
    return (
      <Main>
        <C>
          <div className="text-center space-y-2">
            <div className="text-5xl">🐱</div>
            <h1 className="text-3xl font-black">はじめに設定</h1>
            <p className="text-slate-500">名前と伝達事項を見る学年を登録してください。</p>
          </div>
          <div className="space-y-2">
            <label htmlFor="student-name" className="font-bold">
              表示名
            </label>
            <input
              id="student-name"
              autoComplete="nickname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength="24"
              placeholder="本名ではなくニックネームを入力"
              className="w-full rounded-2xl border px-4 py-3"
            />
          </div>
          <div>
            <b>伝達事項を見る学年</b>
            <B items={recordGrades} value={userGrade} set={setUserGrade} />
          </div>
          <Box>
            <b>学習記録の保存</b>
            <p className="text-sm font-bold text-sky-700">{cloud.label}</p>
            <p className="text-xs text-slate-500">{cloud.detail}</p>
          </Box>
          <Btn onClick={register} disabled={!name.trim() || !userGrade} kind="main">
            設定を保存
          </Btn>
          {profileSaved && (
            <>
              <BackupCard />
              <Btn onClick={home}>保存せずにホームへ戻る</Btn>
            </>
          )}
        </C>
      </Main>
    );
  if (scr === "states-explanation")
    return <Main><C><LessonReader topic="states-temperature"><StatesTemperatureExplanation /></LessonReader></C></Main>;
  if (scr === "gases-explanation")
    return <Main><C><LessonReader topic="gases"><GasesExplanation /></LessonReader></C></Main>;
  if (scr === "organic-explanation")
    return <Main><C><LessonReader topic="organic-inorganic"><OrganicExplanation /></LessonReader></C></Main>;
  if (scr === "density-explanation")
    return <Main><C><LessonReader topic="density"><DensityExplanation /></LessonReader></C></Main>;
  if (scr === "metal-explanation")
    return <Main><C><MetalExplanation /></C></Main>;
  if (scr === "explanations")
    return (
      <Main>
        <C>
          <header><p className="eyebrow">中学1年・化学</p><h1 className="text-2xl font-black">解説を読む</h1><p>文章と図で、物質の性質を理解しよう。</p></header>
          <button className="lesson-topic-entry" onClick={() => setScr("metal-explanation")}><span><strong>金属と非金属</strong><small>図解付きページ／金属光沢・電気・熱・展性と延性</small></span><span aria-hidden="true">→</span></button>
          <button className="lesson-topic-entry" onClick={() => setScr("density-explanation")}><span><strong>密度</strong><small>表と図のまとめ＋漫画9ページ／質量・体積・計算・浮沈</small></span><span aria-hidden="true">→</span></button>
          <button className="lesson-topic-entry" onClick={() => setScr("organic-explanation")}><span><strong>有機物と無機物</strong><small>表と図のまとめ＋漫画5ページ／加熱・燃焼・分類</small></span><span aria-hidden="true">→</span></button>
          <button className="lesson-topic-entry" onClick={() => setScr("states-explanation")}><span><strong>状態変化と温度</strong><small>導入のみ／状態変化の図・まとめ＋漫画2ページ（融点・沸点・温度グラフは準備中）</small></span><span aria-hidden="true">→</span></button>
          <button className="lesson-topic-entry" onClick={() => setScr("gases-explanation")}><span><strong>気体の性質と集め方</strong><small>表と図のまとめ＋漫画10ページ／5種類の特徴・実験・集め方</small></span><span aria-hidden="true">→</span></button>
          <p className="text-sm text-slate-600">ほかのテーマは順次制作します。</p>
        </C>
      </Main>
    );
  if (scr === "explanation-updates")
    return (
      <Main>
        <C>
          <header className="science-page-heading">
            <b>{scr === "explanation-updates" ? "解説の更新情報" : "解説を読む"}</b>
          </header>
          <div>
            <p className="eyebrow">中学1年・化学</p>
            <h1 className="text-2xl font-black">身のまわりの物質</h1>
            <p className="text-sm muted">公開中の解説と、制作中のテーマをこちらに掲載します。</p>
          </div>
          <section className="explanation-status-list" aria-label="解説の制作状況">
            <article>
              <h2>金属と非金属 <span className="explanation-state">{SCIENCE_IS_PREVIEW ? "図解ページ・テスト公開" : "図解ページ・公開中"}</span></h2>
              <p>7つの項目を文章と図で読むページ版を追加しました。</p>
              <Btn onClick={() => setScr("metal-explanation")}>ページ版の解説を読む</Btn>
            </article>
            <article>
              <h2>金属と非金属 <span className="explanation-state">漫画制作済み</span></h2>
              <p>金属光沢・電気伝導性・熱伝導性・展性・延性・例外を7ページで解説。</p>
              <p className="text-sm muted">10月15日更新／アプリでの公開準備中</p>
            </article>
            <article><h2>密度 <span className="explanation-state">{SCIENCE_IS_PREVIEW ? "漫画・テスト公開" : "漫画・公開中"}</span></h2><p>質量・体積から計算・浮沈・気体まで、全9ページ。</p><Btn onClick={() => setScr("density-explanation")}>密度の解説を読む</Btn></article>
            <article><h2>有機物と無機物 <span className="explanation-state">{SCIENCE_IS_PREVIEW ? "漫画・テスト公開" : "漫画・公開中"}</span></h2><p>白い粉の比較・砂糖の加熱と燃焼・分類と例外を全5ページで解説。</p><Btn onClick={() => setScr("organic-explanation")}>有機物と無機物の解説を読む</Btn></article>
            <article><h2>気体の性質と集め方 <span className="explanation-state">{SCIENCE_IS_PREVIEW ? "漫画・テスト公開" : "漫画・公開中"}</span></h2><p>酸素・窒素・二酸化炭素・水素・アンモニア。特徴と実験を全10ページで解説。</p><Btn onClick={() => setScr("gases-explanation")}>気体の解説を読む</Btn></article>
            <article><h2>状態変化と温度 <span className="explanation-state">導入2枚・テスト公開</span></h2><p>状態変化・白い湯気と霧・質量と体積の導入。融点・沸点・温度グラフは準備中です。</p><Btn onClick={() => setScr("states-explanation")}>状態変化の導入を読む</Btn></article>
            {["溶けるしくみ", "純粋な物質と混合物", "溶解度と再結晶", "混合物の分け方"].map((title) => (
              <article key={title}>
                <h2>{title} <span className="explanation-state is-planned">制作準備中</span></h2>
                <p className="text-sm muted">シナリオ初稿作成済み／漫画はこれから制作します。</p>
              </article>
            ))}
          </section>
        </C>
      </Main>
    );
  if (scr === "home" || scr === "questions")
    return (
      <Main>
        <C>
          <header className="student-header">
            <div>
              <span className="eyebrow">おくぽんの理科学習</span>
              <h1>{scr === "questions" ? "問題を選ぼう" : "理科ホーム"}</h1>
            </div>
            <Btn onClick={() => setScr("profile")}>設定</Btn>
          </header>
          {scr === "home" && <>
          <section className="welcome-panel large-home-welcome">
            <p className="eyebrow">
              {userGrade}・{name}さん
            </p>
            <h2>今日は、何から始める？</h2>
            <p>解いて確かめる。読んで理解する。</p>
            <div className="home-entry-grid">
              <button className="home-entry" onClick={() => setScr("questions")}>
                <span className="home-entry-icon" aria-hidden="true">✏️</span>
                <span><strong>問題を解く</strong><small>一問一答・記述対策など<br />練習モード／テストモード</small></span>
                <span aria-hidden="true">→</span>
              </button>
              <button className="home-entry home-entry-explanation" onClick={() => setScr("explanations")}>
                <span className="home-entry-icon" aria-hidden="true">📖</span>
                <span><strong>解説を読む</strong><small>密度・有機物・気体・状態変化の導入、金属の図解<br />文章と図で理解を深める</small></span>
                <span aria-hidden="true">→</span>
              </button>
              <button className="home-entry home-entry-records" onClick={() => setScr("records")}>
                <span className="home-entry-icon" aria-hidden="true">📊</span>
                <span><strong>学習記録を見る</strong><small>点数・得意と苦手・これまでのがんばり</small></span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
            <button className="daily-home-entry" onClick={startDaily}>
              <strong>今日の5問</strong><span>まずは短く、練習モードで →</span>
            </button>
            <div className="welcome-stats">
              <span>
                連続学習 <b>{streak.current}日</b>
              </span>
              <span>自分のペースで続けよう</span>
            </div>
          </section>
          <section className="home-explanation-updates" aria-labelledby="home-updates-heading">
            <div className="home-updates-heading"><h2 id="home-updates-heading">解説の更新情報</h2><button onClick={() => setScr("explanation-updates")}>一覧を見る →</button></div>
            <button className="home-update-item" onClick={() => setScr("states-explanation")}><strong>状態変化と温度 <span className="explanation-state">導入漫画2ページを追加</span></strong><span>10月20日・中1 化学／まとめの図・湯気と白い霧・質量と体積</span></button>
            <button className="home-update-item" onClick={() => setScr("gases-explanation")}><strong>気体の性質と集め方 <span className="explanation-state">漫画10ページを追加</span></strong><span>10月19日・中1 化学／アンモニア噴水・目次・拡大表示付き</span></button>
            <button className="home-update-item" onClick={() => setScr("organic-explanation")}><strong>有機物と無機物 <span className="explanation-state">漫画5ページを追加</span></strong><span>10月17日・中1 化学／結晶修正版・目次・拡大表示付き</span></button>
            <button className="home-update-item" onClick={() => setScr("density-explanation")}><strong>密度 <span className="explanation-state">漫画9ページを追加</span></strong><span>10月16日・中1 化学／目次・拡大表示付き</span></button>
            <button className="home-update-item" onClick={() => setScr("metal-explanation")}>
              <strong>金属と非金属 <span className="explanation-state">図解ページを追加</span></strong>
              <span>10月16日・中1 化学／文章と図のページ版を{SCIENCE_IS_PREVIEW ? "テスト公開" : "公開"}</span>
            </button>
          </section>
          </>}
          <div className="save-status" role="status">
            <span aria-hidden="true">●</span>
            <div>
              <b>{cloud.label}</b>
              <p>{cloud.detail}</p>
            </div>
          </div>
          {scr === "questions" && <Catalog
            quizType={quizType}
            setQuizType={setQuizType}
            solveMode={solveMode}
            testQuota={testQuota}
            setSolveMode={setSolveMode}
            grade={grade}
            setGrade={setGrade}
            field={field}
            setField={setField}
            level={level}
            setLevel={setLevel}
            descLevels={descLevels}
            setDescLevels={setDescLevels}
            unit={unit}
            unitRecs={unitRecs}
            order={order}
            setOrder={setOrder}
            begin={begin}
          />}
          <details className="home-details">
            <summary>得意・苦手とがんばりを見る</summary>
            <HomeMotivation
              onSelectQuestions={() => setScr("questions")}
              records={records}
              streak={streak}
              userGrade={userGrade}
              startDaily={startDaily}
              setQuizType={setQuizType}
              setSolveMode={setSolveMode}
              setGrade={setGrade}
              setField={setField}
              setLevel={setLevel}
              setDescLevels={setDescLevels}
            />
          </details>
          <details className="home-details" id="notices">
            <summary>先生からのお知らせ</summary>
            <Notices grade={userGrade} />
          </details>
          <HomeLinks home={home} />
        </C>
      </Main>
    );
  if (scr === "soon")
    return (
      <Main>
        <C>
          <div className="text-center space-y-4">
            <div className="text-5xl">🚧</div>
            <h1 className="text-3xl font-bold">Coming Soon</h1>
            <p>この学年・分野・問題タイプはまだ追加されていません。</p>
            <HomeLinks home={home} />
          </div>
        </C>
      </Main>
    );
  if (scr === "ready")
    return (
      <Main>
        <C>
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">準備画面</h1>
            <p className="text-sm text-slate-500">内容を確認して、スタートを押してください。</p>
            <ReadyInfo
              qs={qs}
              quizType={quizType}
              solveMode={solveMode}
              grade={grade}
              field={field}
              level={level}
              descLevels={descLevels}
              target={target}
              bestPerfect={bestPerfect}
              dailyMode={dailyMode}
            />
            {solveMode==="テストモード" && !reviewMode && !dailyMode && <TestQuotaNotice quota={testQuota} />}
            {attemptMessage && <p className="test-attempt-alert" role="alert">{attemptMessage}</p>}
            <div className="grid grid-cols-1 gap-3">
              <Btn
                disabled={startingTest || (solveMode==="テストモード" && !reviewMode && !dailyMode && testQuota.blocked)}
                onClick={startQuiz}
                kind="main"
              >
                スタート
              </Btn>
              <HomeLinks home={home} />
            </div>
          </div>
        </C>
      </Main>
    );
  if (scr === "quiz")
    return (
      <Main className="quiz-screen">
        <C>
          {storageWarning && <div className="storage-alert" role="alert">{storageWarning}</div>}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="quiz-title text-2xl font-black">
                {dailyMode
                  ? "今日の5問"
                  : quizType === "記述対策"
                    ? "理科 記述"
                    : quizType === "練習問題"
                      ? "理科 練習"
                      : "理科 一問一答"}
              </h1>
              <p className="quiz-sub text-slate-500">
                {dailyMode
                  ? "弱点優先・5問・練習モード"
                  : quizType === "記述対策"
                    ? `${grade || "中1"}・${field || "未選択"}・記述・${solveMode}・${descLevels.join(" / ")}`
                    : quizType === "練習問題"
                      ? `${grade || "中1"}・${field || "未選択"}・練習・${solveMode}・${level || "未選択"}`
                      : `${grade}・${field}・${level}問題・${solveMode}`}
              </p>
            </div>
            <Btn
              onClick={() => {
                if (
                  !confirm(
                    "学習を中断してホームに戻りますか？今回の途中の回答は保存されません。過去の学習記録は残ります。",
                  )
                )
                  return;
                setStart(null);
                home();
              }}
              className="quiz-home"
            >
              理科ホームへ
            </Btn>
          </div>
          {cur && (
            <>
              <div className="quiz-info flex justify-between text-sm">
                <div>
                  <span className="quiz-badge rounded-xl bg-slate-100 px-3 py-1">{cur.unit}</span>{" "}
                  <span className="quiz-badge rounded-xl border px-3 py-1">第{cur.no}問</span>
                </div>
                <div className="text-right">
                  <div>
                    進行 {i + 1}/{qs.length}
                  </div>
                  <div>
                    回答済み {answered}/{qs.length}
                  </div>
                  <b className={sec > target ? "text-red-600" : "text-sky-600"}>
                    {tm(sec)} / 目標 {tm(target)}
                  </b>
                  <div className="text-xs font-bold text-amber-700">
                    全問正解ベスト{" "}
                    {dailyMode ? "対象外" : bestPerfect ? tm(bestPerfect) : "まだなし"}
                  </div>
                </div>
              </div>
              <progress
                className="quiz-progress"
                aria-label="回答の進み具合"
                value={answered}
                max={qs.length}
              />
              <Box className="quiz-question">
                <p className="text-xl font-bold leading-relaxed"><ScienceText>{cur.question}</ScienceText></p>
              </Box>
              <div className={`quiz-choice-grid grid grid-cols-1 sm:grid-cols-2 gap-3 ${cur.choices.every((c) => c.length <= 18) ? "short-choices" : ""}`}>
                {cur.choices.map((c) => (
                  <Btn
                    key={c}
                    onClick={() => choose(c)}
                    disabled={!!picked}
                    kind={(picked || selected) === c ? "main" : ""}
                    className="quiz-choice"
                    aria-pressed={(picked || selected) === c}
                    aria-describedby="choice-instructions"
                  >
                    <span className="choice-marker" aria-hidden="true">
                      {["ア", "イ", "ウ", "エ"][cur.choices.indexOf(c)]}
                    </span>
                    <span><ScienceText>{c}</ScienceText></span>
                  </Btn>
                ))}
              </div>
              <p id="choice-instructions" className="choice-instructions" aria-live="polite">{selected ? "選択中です。同じ答えをもう一度タップすると回答します。別の答えで選び直せます。" : "1回目は選択、同じ答えをもう一度タップして回答。素早く押す必要はありません。"}</p>
              {solveMode === "練習モード" && picked && (
                picked === cur.answer ? (
                  <div className="test-correct" role="status" aria-label="正解。1秒後に次へ。表示中は時間を計測しません。"><span className="correct-symbol" aria-hidden="true">〇</span><span className="correct-caption">1秒後に次へ・表示中は計測停止</span></div>
                ) : (
                  <button type="button" className="test-feedback-overlay" onClick={next} autoFocus aria-label="不正解。画面をタップして次へ進む">
                    <div className="test-feedback-card">
                      <div className="text-2xl font-black"><span className="text-red-700" aria-hidden="true">× </span>確認。</div>
                      <div className="feedback-question">
                        <p className="feedback-question-label">問題</p>
                        <p><ScienceText>{cur.question}</ScienceText></p>
                      </div>
                      <p>あなたの答え：<ScienceText>{picked}</ScienceText></p>
                      <p>正しい答え：<b className="text-green-700"><ScienceText>{cur.answer}</ScienceText></b></p>
                      <p><ScienceText>{cur.explanation}</ScienceText></p>
                      <div className="font-bold text-sky-700">画面をタップして{i + 1 >= qs.length ? "結果を見る" : "次へ"}</div>
                    </div>
                  </button>
                )
              )}
            </>
          )}
        </C>
      </Main>
    );
  if (scr === "result") {
    const u = hist[0] ? `${hist[0].grade}${hist[0].field}${hist[0].level || "A"}` : unit,
      rs = rec(records, u);
    return (
      <Main>
        <C>
          <div className="space-y-3">
            <h1 className="text-2xl font-black">{dailyMode ? "今日の5問 結果" : "結果"}</h1>
            {!result?.saveFailed && <HomeLinks home={home} />}
          </div>
          {storageWarning && (
            <div className="storage-alert" role="alert">
              <p>{storageWarning}</p>
              {result?.saveFailed && <Btn onClick={retryResultSave}>この結果をもう一度保存</Btn>}
            </div>
          )}
          {result?.score === result?.total && result?.total > 0 && (
            <>
              <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
                {fw.map((p) => (
                  <div
                    key={p.id}
                    className="absolute text-4xl animate-bounce"
                    style={{ left: p.left, top: p.top, animationDelay: p.delay }}
                  >
                    🎆
                  </div>
                ))}
              </div>
              <Box>
                <div className="text-5xl">🎉🎆🎊</div>
                <div className="text-3xl font-black text-orange-600">さすが！おめでとう！</div>
                <div className="font-bold text-yellow-700">満点すごい！！完璧！！💮</div>
              </Box>
            </>
          )}
          <Box>
            <div className="text-4xl font-black">
              {result?.score ?? 0}/{result?.total ?? 0}
            </div>
            <div>正答率 {result?.total ? Math.round((result.score / result.total) * 100) : 0}%</div>
            <div className="text-xl font-bold text-orange-600">{result?.praise}</div>
            <b className={finalSec > target ? "text-red-600" : "text-sky-600"}>
              時間 {tm(finalSec)} / 目標 {tm(target)}
            </b>
            <div className="text-xs font-bold text-amber-700">
              全問正解ベスト {dailyMode ? "対象外" : bestPerfect ? tm(bestPerfect) : "まだなし"}
            </div>
            <div className="text-xs text-slate-500">
              {result?.saveFailed
                ? "この結果はまだ保存されていません"
                : result?.saved === false
                  ? "この結果はまだ保存されていません"
                  : "結果はこの端末に保存済み"}
            </div>
            {result?.saved !== false && (
              <div
                className={`mt-2 rounded-xl px-3 py-2 text-xs font-bold ${cloud.label.includes("端末") ? "bg-amber-50 text-amber-800" : "bg-sky-50 text-sky-800"}`}
              >
                <div>{cloud.label}</div>
                <div className="mt-1 font-normal">{cloud.detail}</div>
              </div>
            )}
          </Box>
          <Box>
            <b>{dailyMode ? "今回出た単元の記録" : `${u}の過去5回`}</b>
            <div className="text-xs text-slate-500">
              {dailyMode ? "今日の5問は各単元の履歴にも反映されます。" : det(u)}
            </div>
            {rs.length ? <Row records={rs.slice(0, 5)} /> : <p>まだ保存履歴はありません。</p>}
          </Box>
          <div className="space-y-3">
            <h2 className="text-lg font-bold">全問題の結果</h2>
            {hist.map((a, n) => (
              <div
                key={`${k(a)}-${n}`}
                className={`rounded-2xl p-4 border ${a.correct ? "bg-sky-50 border-sky-200" : "bg-red-50 border-red-200"}`}
              >
                <div className="text-sm text-slate-500">
                  第{a.no}問 {a.unit}
                </div>
                <b><ScienceText>{a.question}</ScienceText></b>
                <div>
                  選んだ答え：
                  <b className={a.correct ? "text-sky-700" : "text-red-700"}><ScienceText>{a.selected}</ScienceText></b>
                </div>
                <div>
                  正しい答え：<b className="text-green-700"><ScienceText>{a.answer}</ScienceText></b>
                </div>
                {!a.correct && <p className="text-sm"><ScienceText>{a.explanation}</ScienceText></p>}
                {a.grade === "中1" && a.field === "化学" && STATES_INTRO_QUESTION_SECTIONS[a.level+"-"+a.no] && <Btn onClick={() => {setScr("states-explanation");const url=new URL(location.href);url.hash="states-summary-"+STATES_INTRO_QUESTION_SECTIONS[a.level+"-"+a.no];history.replaceState(history.state,"",url.pathname+url.search+url.hash);}}>状態変化の導入解説で確かめる</Btn>}
                {a.grade === "中1" && a.field === "化学" && ((a.level === "A" && a.no >= 6 && a.no <= 13) || (a.level === "B" && a.no >= 6 && a.no <= 16)) && <Btn onClick={() => setScr("gases-explanation")}>気体の解説で確かめる</Btn>}
                {a.grade === "中1" && a.field === "化学" && a.level === "A" && a.no === 3 && <Btn onClick={() => setScr("density-explanation")}>密度の解説で確かめる</Btn>}
                {a.grade === "中1" && a.field === "化学" && ((a.level === "A" && [4,5].includes(a.no)) || (a.level === "B" && a.no === 1)) && <Btn onClick={() => setScr("organic-explanation")}>有機物と無機物の解説で確かめる</Btn>}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Btn onClick={dailyMode ? startDaily : begin} disabled={result?.saveFailed} kind="main">
              もう一度やる
            </Btn>
            <Btn onClick={review} disabled={result?.saveFailed || !wrongs.length}>
              間違えた問題だけ復習
            </Btn>
          </div>
        </C>
      </Main>
    );
  }
  if (scr === "records") {
    return (
      <Main>
        <C>
          <div className="space-y-3">
            <div>
              <h1 className="text-2xl font-black">保存履歴</h1>
              <p className="text-sm text-slate-500">
                履歴は全件保存。レーダーは学年・A/B別の最新完了テストを均等に評価する暫定仕様です。
              </p>
            </div>
            <HomeLinks home={home} />
          </div>
          <div>
            <b>表示する学年</b>
            <div className="grid grid-cols-4 gap-2">
              {analysisGrades.map((g) => (
                <Btn key={g} onClick={() => setRg(g)} kind={rg === g ? "main" : ""}>
                  {g}
                </Btn>
              ))}
            </div>
          </div>
          <Radar items={assessmentStats(records, rg)} grade={rg} />
          <LearningHistory key={rg} records={records} grade={rg} />
          <Box>
            <div className="text-sm text-slate-500">連続学習記録</div>
            <div className="text-2xl font-black">🔥 {streak.current}日目</div>
            <div className="text-xs text-slate-500">最長 {streak.best}日</div>
          </Box>
        </C>
      </Main>
    );
  }
  return null;
}
function Main({ children, className = "" }) {
  const navigation = React.useContext(ScienceNavigation);
  return (
    <>
      <div className={`science-main min-h-screen flex items-center justify-center p-4 sm:p-6 ${className}`}>
        <div className="science-page-content">
          {SCIENCE_IS_PREVIEW && <aside className="science-preview-banner" aria-label="テスト版のお知らせ"><strong>テスト版</strong><span>操作確認用／学習記録は本番と別保存</span></aside>}
          {children}
        </div>
      </div>
      <nav className="science-bottom-nav" aria-label="画面下の移動ボタン">
        {SCIENCE_IS_PREVIEW && <p className="science-preview-nav-label">テスト版・本番の記録には反映されません</p>}
        <div className="science-bottom-nav-inner">
          <Btn kind="main" onClick={navigation.goBack} disabled={navigation.scr === "home"}>{["density-explanation","organic-explanation","gases-explanation","states-explanation"].includes(navigation.scr) ? (navigation.previousScreen==="result"?"← 結果へ":navigation.previousScreen==="explanations"?"← 解説一覧へ":navigation.previousScreen==="explanation-updates"?"← 更新情報へ":"← ホームへ") : "← 戻る"}</Btn>
          <Btn onClick={navigation.goHome} disabled={navigation.scr === "home"}>理科ホーム</Btn>
        </div>
      </nav>
    </>
  );
}
function Box({ children, className = "" }) {
  return (
    <div className={`app-card rounded-2xl p-4 text-center space-y-2 ${className}`}>{children}</div>
  );
}

const root = document.getElementById("root");
if (ReactDOM.createRoot) {
  ReactDOM.createRoot(root).render(<App />);
} else {
  ReactDOM.render(<App />, root);
}
