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

function OneAnswerCatalog({
  grade,
  setGrade,
  field,
  setField,
  level,
  setLevel,
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
  return (
    <div className="unit-picker">
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
            </div>
          ))}
        </div>
      </section>
      <section className="selection-summary" aria-live="polite">
        {available.length ? (
          <>
            <div>
              <h3>
                {selectedGrade}・{field}・{level}問題
              </h3>
              <p>{available.length}問に取り組みます</p>
            </div>
            <div className="order-options">
              <span>出題順</span>
              <B
                items={["問題番号順", "ランダム"]}
                value={order === "number" ? "問題番号順" : "ランダム"}
                set={(value) => setOrder(value === "問題番号順" ? "number" : "random")}
              />
            </div>
            <Btn onClick={begin} kind="main">
              この内容でスタート
            </Btn>
            {unitRecs.length > 0 && (
              <details>
                <summary>この単元の学習記録を見る</summary>
                <Row records={unitRecs} />
              </details>
            )}
          </>
        ) : (
          <p>上の「A問題」か「B問題」を選ぶと、ここから始められます。</p>
        )}
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
          問題タイプと解き方を選び、解く分野を決めてから始めます。
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
      <div>
        <b>解き方</b>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <Btn
            kind={solveMode === "練習モード" ? "main" : ""}
            onClick={() => setSolveMode("練習モード")}
          >
            練習モード
          </Btn>
          <Btn
            kind={solveMode === "テストモード" ? "main" : ""}
            onClick={() => setSolveMode("テストモード")}
          >
            テストモード
          </Btn>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          {solveMode === "練習モード"
            ? "答えた直後に正誤と解説を表示します。"
            : "最後まで解いてからまとめて採点します。"}
        </p>
      </div>
      {quizType === "一問一答" ? (
        <OneAnswerCatalog
          {...{
            grade,
            setGrade,
            field,
            setField,
            level,
            setLevel,
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
        <div className="text-xs text-slate-500">過去3回分のテストから分野別の正答率を表示</div>
      </div>
      <div className="mx-auto max-w-xs">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full">
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
            className={`rounded-xl border p-2 text-center text-xs font-bold ${cls(x.accuracy)}`}
          >
            <div>{x.field}</div>
            <div className="text-[10px] font-normal text-slate-500">{topic(x)}</div>
            <div>{x.total ? `${x.accuracy}%` : "未実施"}</div>
            <div className="text-[10px] opacity-70">
              {x.total ? lab(x.score, x.total) : "0/0点"}
            </div>
          </div>
        ))}
      </div>
      {best && weak ? (
        <div className="text-sm">
          <b>得意：</b>
          {best.field}（{best.accuracy}%） / <b>弱点：</b>
          {weak.field}（{weak.accuracy}%）
        </div>
      ) : (
        <p className="text-sm text-slate-500">履歴がたまると分析が表示されます。</p>
      )}
    </Box>
  );
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
}) {
  const radarRecords = scoped(records, "全学年", 3),
    stats = fieldStats(radarRecords, "全学年"),
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

function App() {
  const savedName = () => localStorage.getItem(N) || "",
    savedGrade = () => localStorage.getItem(G) || "",
    savedProfile = () => localStorage.getItem(P) === "1" && !!savedName() && !!savedGrade();
  const [scr, setScr] = useState("home"),
    [name, setName] = useState(savedName),
    [userGrade, setUserGrade] = useState(savedGrade),
    [profileSaved, setProfileSaved] = useState(savedProfile),
    [quizType, setQuizType] = useState("一問一答"),
    [solveMode, setSolveMode] = useState("練習モード"),
    [descLevels, setDescLevels] = useState([]),
    [grade, setGrade] = useState(() => savedGrade() || "中1"),
    [field, setField] = useState(""),
    [level, setLevel] = useState(""),
    [qs, setQs] = useState([]),
    [i, setI] = useState(0),
    [ans, setAns] = useState({}),
    [hist, setHist] = useState([]),
    [wrongs, setWrongs] = useState([]),
    [records, setRecords] = useState([]),
    [bestTimes, setBestTimes] = useState({}),
    [rg, setRg] = useState("全学年"),
    [order, setOrder] = useState("number"),
    [back, setBack] = useState(false),
    [sec, setSec] = useState(0),
    [finalSec, setFinalSec] = useState(0),
    [start, setStart] = useState(null),
    [streak, setStreak] = useState({ lastDate: "", current: 0, best: 0 }),
    [result, setResult] = useState(null),
    [reviewMode, setReviewMode] = useState(false),
    [dailyMode, setDailyMode] = useState(false),
    [cloudUser, setCloudUser] = useState(null),
    [cloud, setCloud] = useState({
      label: "クラウド保存を準備中",
      detail: "この端末の履歴もそのまま保存されます。",
    });
  const [storageWarning, setStorageWarning] = useState("");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
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
              label: "この端末に保存中",
              detail: "クラウド保存の読み込みに失敗しました。",
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
  useEffect(() => {
    if (scr !== "quiz" || !start) return;
    const t = setInterval(() => setSec(Math.floor((Date.now() - start) / 1000)), 250);
    return () => clearInterval(t);
  }, [scr, start]);
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

  const streakNext = () => {
    const today = dk();
    if (streak.lastDate === today) return streak;
    const c = streak.lastDate === add(today, -1) ? streak.current + 1 : 1;
    return { lastDate: today, current: c, best: Math.max(streak.best, c) };
  };
  const savePerfectBest = (score, time) => {
    if (
      quizType !== "一問一答" ||
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
        id: Date.now(),
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
        isRetry: false,
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
  const begin = () => {
    if (!filtered.length) {
      setScr("soon");
      return;
    }
    const ordered = order === "number" ? [...filtered].sort((a, b) => a.no - b.no) : sh(filtered);
    setQs(ordered.map(mq));
    setI(0);
    setAns({});
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
    setQuizType("一問一答");
    setSolveMode("練習モード");
    setGrade(recordGrades.includes(userGrade) ? userGrade : "全学年");
    setField("今日の5問");
    setLevel("");
    setDescLevels([]);
    setQs(daily.map(mq));
    setI(0);
    setAns({});
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
        const s = a[k(q)];
        return { ...q, selected: s || "未回答", correct: s === q.answer };
      }),
      score = h.filter((x) => x.correct).length,
      time = start ? Math.floor((Date.now() - start) / 1000) : sec;
    setHist(h);
    setWrongs(h.filter((x) => !x.correct));
    setFinalSec(time);
    setStart(null);
    let saved = !reviewMode,
      saveFailed = false;
    if (!reviewMode) {
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
      const n = { ...ans, [ck]: c };
      setAns(n);
      if (solveMode === "練習モード") {
        setBack(true);
        return;
      }
      i + 1 < qs.length ? (setI(i + 1), setBack(false)) : finish(n);
    },
    next = () => (i + 1 < qs.length ? (setI(i + 1), setBack(false)) : finish(ans)),
    prev = () => {
      setBack(true);
      setI(Math.max(0, i - 1));
    },
    home = () => setScr("home");
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
      setQs(ordered.map(mq));
      setI(0);
      setAns({});
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

  if (scr === "profile" || !profileSaved)
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
  if (scr === "home")
    return (
      <Main>
        <C>
          <header className="student-header">
            <div>
              <span className="eyebrow">おくぽんの理科学習</span>
              <h1>理科 一問一答</h1>
            </div>
            <Btn onClick={() => setScr("profile")}>設定</Btn>
          </header>
          <section className="welcome-panel">
            <p className="eyebrow">
              {userGrade}・{name}さん
            </p>
            <h2>今日も、一問ずつ。</h2>
            <p>覚えるときは練習モード。力を試すときはテストモード。</p>
            <div className="quick-actions">
              <Btn onClick={startDaily} kind="main">
                今日の5問を始める
              </Btn>
              <a className="secondary-link" href="#questions">
                単元を選んで始める ↓
              </a>
            </div>
            <div className="welcome-stats">
              <span>
                連続学習 <b>{streak.current}日</b>
              </span>
              <button onClick={() => setScr("records")}>学習記録を見る →</button>
            </div>
          </section>
          <div className="save-status" role="status">
            <span aria-hidden="true">●</span>
            <div>
              <b>{cloud.label}</b>
              <p>{cloud.detail}</p>
            </div>
          </div>
          <Catalog
            quizType={quizType}
            setQuizType={setQuizType}
            solveMode={solveMode}
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
          />
          <details className="home-details">
            <summary>得意・苦手とがんばりを見る</summary>
            <HomeMotivation
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
            <div className="grid grid-cols-1 gap-3">
              <Btn
                onClick={() => {
                  setSec(0);
                  setFinalSec(0);
                  setStart(Date.now());
                  setScr("quiz");
                }}
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
      <Main>
        <C>
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
              <div className="quiz-choice-grid grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cur.choices.map((c) => (
                  <Btn
                    key={c}
                    onClick={() => choose(c)}
                    kind={picked === c ? "main" : ""}
                    className="quiz-choice"
                    aria-pressed={picked === c}
                  >
                    <span className="choice-marker" aria-hidden="true">
                      {["ア", "イ", "ウ", "エ"][cur.choices.indexOf(c)]}
                    </span>
                    <span><ScienceText>{c}</ScienceText></span>
                  </Btn>
                ))}
              </div>
              {solveMode === "練習モード" && picked && (
                <Box className="answer-feedback">
                  <div
                    className={`text-2xl font-black ${picked === cur.answer ? "text-sky-700" : "text-red-700"}`}
                  >
                    {picked === cur.answer ? "正解！" : "ここを確認しよう"}
                  </div>
                  <div className="text-sm">
                    正しい答え：<b className="text-green-700"><ScienceText>{cur.answer}</ScienceText></b>
                  </div>
                  <p className="text-sm text-slate-700"><ScienceText>{cur.explanation}</ScienceText></p>
                </Box>
              )}
              <div className="quiz-nav grid grid-cols-2 gap-3">
                <Btn onClick={prev} disabled={i === 0}>
                  前に戻る
                </Btn>
                {(back || !picked || i + 1 >= qs.length) && (
                  <Btn onClick={next} disabled={!picked} kind="main">
                    {i + 1 >= qs.length ? "採点する" : "次に進む"}
                  </Btn>
                )}
              </div>
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
                  ? "復習モードのため保存履歴には反映されません"
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
            {rs.length ? <Row records={rs} /> : <p>まだ保存履歴はありません。</p>}
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
    const latest = scoped(records, rg, 10),
      radarRecords = scoped(records, rg, 3);
    return (
      <Main>
        <C>
          <div className="space-y-3">
            <div>
              <h1 className="text-2xl font-black">保存履歴</h1>
              <p className="text-sm text-slate-500">
                レーダーは直近3回、履歴は直近10回を表示。以前の記録も保存されています。
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
          <Radar items={fieldStats(radarRecords, rg)} grade={rg} />
          {!latest.length ? (
            <Box>この範囲の保存履歴はありません。</Box>
          ) : (
            <div className="space-y-3">
              <Box>
                <b>合計</b>
                <Row records={latest} />
              </Box>
              {rg !== "全学年" &&
                uns(rg).map((u) => (
                  <Box key={u}>
                    <b>{u}</b>
                    <div className="text-xs text-slate-500">{det(u)}</div>
                    <div className="grid grid-cols-5 gap-1">
                      {latest.map((r) => {
                        const x = mg(r, u);
                        return x ? (
                          <div
                            key={`${r.id}-${u}`}
                            className={`rounded-xl border px-1 py-2 text-center text-xs font-bold ${cls(Math.round((x.score / x.total) * 100))}`}
                          >
                            {lab(x.score, x.total)}
                          </div>
                        ) : (
                          <div
                            key={`${r.id}-${u}`}
                            className="rounded-xl border px-1 py-2 text-center text-xs text-slate-300"
                          >
                            —
                          </div>
                        );
                      })}
                    </div>
                  </Box>
                ))}
            </div>
          )}
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
function Main({ children }) {
  return <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">{children}</div>;
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
