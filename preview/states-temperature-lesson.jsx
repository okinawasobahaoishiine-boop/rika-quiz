// Adopted pages only: two introductory comics and the straight heating-curve revision.
const STATES_COMIC_PAGES = [
 ["state-change-triangle-01-v4.png","ひと目でわかる！ 物質の状態変化"],
 ["state-change-mass-volume-02.png","体積が変わっても、質量は同じ"],
 ["state-change-heating-curve-03-v2.png","水の状態変化と温度"]
];
const STATES_INTRO_QUESTION_SECTIONS = {"A-25":"melting","A-26":"boiling","B-29":"heating","A-24":"changes","B-21":"changes","B-22":"changes","B-24":"mass-volume","B-25":"mass-volume"};
function StatesTriangle() {
 return <figure className="states-figure">
  <svg className="states-diagram" viewBox="0 0 640 580" role="img" aria-labelledby="states-triangle-title states-triangle-desc">
   <title id="states-triangle-title">三角形で整理する6方向の状態変化</title>
   <desc id="states-triangle-desc">上が気体、左下が液体、右下が固体。赤は熱を受け取る融解・気化・昇華。青は熱を放出する凝固・凝縮・凝華。6本の矢印はそれぞれ独立しています。</desc>
   <defs>{[["heat","#c24343"],["cool","#226fc0"]].map(([id,color])=><marker key={id} id={"states-"+id+"-arrow"} markerUnits="userSpaceOnUse" markerWidth="22" markerHeight="22" refX="19" refY="11" orient="auto"><path d="M1 1L21 11L1 21Z" fill={color}/></marker>)}</defs>
   <g fill="#fff" stroke="#bdcdd4" strokeWidth="2"><rect x="238" y="12" width="164" height="92" rx="16"/><rect x="8" y="432" width="168" height="96" rx="16"/><rect x="464" y="432" width="168" height="96" rx="16"/></g>
   <g fill="#183440" fontSize="44" fontWeight="800" textAnchor="middle"><text x="320" y="73">気体</text><text x="92" y="495">液体</text><text x="548" y="495">固体</text></g>
   <g fill="none" strokeWidth="7" strokeLinecap="round">
    <path data-from="液体" data-to="気体" stroke="#c24343" markerEnd="url(#states-heat-arrow)" d="M130 405L285 125"/>
    <path data-from="気体" data-to="液体" stroke="#226fc0" markerEnd="url(#states-cool-arrow)" d="M245 125L90 405"/>
    <path data-from="固体" data-to="気体" stroke="#c24343" markerEnd="url(#states-heat-arrow)" d="M550 405L395 125"/>
    <path data-from="気体" data-to="固体" stroke="#226fc0" markerEnd="url(#states-cool-arrow)" d="M355 125L510 405"/>
    <path data-from="固体" data-to="液体" stroke="#c24343" markerEnd="url(#states-heat-arrow)" d="M455 455L185 455"/>
    <path data-from="液体" data-to="固体" stroke="#226fc0" markerEnd="url(#states-cool-arrow)" d="M185 505L455 505"/>
   </g>
   <g fontSize="40" fontWeight="750" textAnchor="middle" paintOrder="stroke" stroke="white" strokeWidth="9" strokeLinejoin="round">
    <text fill="#b93737" x="82" y="245">気化</text><text fill="#2264a8" x="230" y="340">凝縮</text>
    <text fill="#b93737" x="558" y="245">昇華</text><text fill="#2264a8" x="410" y="340">凝華</text>
    <text fill="#b93737" x="320" y="438">融解</text><text fill="#2264a8" x="320" y="555">凝固</text>
   </g>
  </svg>
  <figcaption><span className="states-heat">赤：熱を受け取る</span><span className="states-cool">青：熱を放出する</span></figcaption>
 </figure>;
}
function StatesKettleDiagram() {
 return <figure className="states-figure">
  <svg className="states-diagram states-small-diagram" viewBox="0 0 600 330" role="img" aria-labelledby="states-kettle-title">
   <title id="states-kettle-title">やかんの注ぎ口すぐの透明部分は見えない水蒸気。離れた白い部分は小さな水滴の湯気。</title>
   <g fill="#f4f6f7" stroke="#d1dadf" strokeWidth="2"><circle cx="110" cy="132" r="34"/><circle cx="158" cy="112" r="36"/><circle cx="186" cy="142" r="31"/><circle cx="140" cy="154" r="30"/></g>
   <rect x="235" y="120" width="72" height="65" rx="18" fill="none" stroke="#b6cbd3" strokeDasharray="7 7" strokeWidth="2"/>
   <g fill="#eff3f4" stroke="#7c929d" strokeWidth="4"><path d="M415 209L343 163L320 184L409 265Z"/><path d="M402 226Q403 172 472 172Q549 172 554 236L562 286Q474 319 395 286Z"/><path d="M427 172Q426 112 481 108Q540 107 541 179" fill="none" strokeWidth="15"/><ellipse cx="476" cy="177" rx="62" ry="13"/><ellipse cx="332" cy="174" rx="10" ry="16" fill="#fff" transform="rotate(40 332 174)"/></g>
   <g stroke="#526b78" strokeWidth="2" fill="none"><path data-label="invisible-steam" d="M333 77L281 152"/><path data-label="visible-mist" d="M130 247L143 146"/></g>
   <g fill="#183440" fontSize="36" fontWeight="700" textAnchor="middle"><text x="316" y="39">水蒸気</text><text x="316" y="77" fontSize="30">目に見えない</text><text x="133" y="293">湯気（水滴）</text></g>
  </svg>
  <figcaption>注ぎ口すぐの透明な部分と、離れた白い部分を比べよう。破線は、見えない位置を示す説明記号です。</figcaption>
 </figure>;
}
function StatesDryIceDiagram() {
 return <figure className="states-figure">
  <svg className="states-diagram states-small-diagram" viewBox="0 0 600 290" role="img" aria-labelledby="states-dry-ice-title">
   <title id="states-dry-ice-title">皿の周りの白い霧は水滴や氷の粒。破線の何も描いていない部分は、目に見えない二酸化炭素の気体を示す説明記号。</title>
   <ellipse cx="258" cy="241" rx="174" ry="25" fill="#f9fbfc" stroke="#afc2cd" strokeWidth="3"/>
   <path d="M210 175L249 156L285 180L244 202Z M210 175V218L244 239V202 M244 202L285 180V221L244 239" fill="#f0f3f4" stroke="#a7bbc4" strokeWidth="3"/>
   <g fill="#f4f6f7" stroke="#d6dfe3" strokeWidth="2"><circle cx="178" cy="148" r="34"/><circle cx="220" cy="129" r="39"/><circle cx="263" cy="149" r="38"/><circle cx="307" cy="174" r="29"/><circle cx="161" cy="189" r="28"/></g>
   <rect x="384" y="90" width="174" height="94" rx="30" fill="none" stroke="#a7beca" strokeDasharray="8 8" strokeWidth="2"/>
   <g stroke="#526b78" strokeWidth="2" fill="none"><path data-label="water-fog" d="M126 67L219 138"/><path data-label="invisible-carbon-dioxide" d="M460 67L475 130"/></g>
   <g fill="#183440" fontSize="36" fontWeight="700" textAnchor="middle"><text x="119" y="49">白い霧</text><text x="457" y="49">見えない気体</text></g>
  </svg>
  <figcaption>白い霧と、見えない二酸化炭素の気体は別。図の破線は説明記号で、気体の見た目ではありません。</figcaption>
 </figure>;
}

function StatesHeatingGraph() {
 return <figure className="states-figure states-heating-figure">
  <svg className="states-heating-graph" viewBox="0 0 640 420" role="img" aria-labelledby="states-heat-title states-heat-desc">
   <title id="states-heat-title">純粋な水・約1気圧の加熱グラフ（模式図）</title>
   <desc id="states-heat-desc">横軸は加熱時間、縦軸は温度。A固体は上昇、B固体と液体は約0℃で水平、C液体は上昇、D液体と気体は約100℃で水平、E気体は再び上昇。一本の折れ線の5区間。</desc>
   <defs><marker id="states-axis-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#344b59"/></marker></defs>
   <path d="M92 350V28 M92 350H616" fill="none" stroke="#344b59" strokeWidth="3" markerEnd="url(#states-axis-arrow)"/>
   <g stroke="#a3b6c1" strokeDasharray="7 7"><path d="M92 250H610"/><path d="M92 100H610"/></g>
   <g fontSize="28" fill="#183440"><text x="5" y="27">温度</text><text x="5" y="59">（℃）</text><text x="7" y="260">約0</text><text x="0" y="110">約100</text><text x="430" y="399">加熱時間 →</text></g>
   <g fill="#e7f3fa"><rect x="180" y="233" width="110" height="34"/><rect x="410" y="83" width="100" height="34"/></g>
   <polyline data-heating-curve="A-B-C-D-E" points="92,330 180,250 290,250 410,100 510,100 598,35" fill="none" stroke="#dc354c" strokeWidth="6" strokeLinejoin="miter" strokeLinecap="butt"/>
   <g fontSize="32" fontWeight="800" fill="#183440" textAnchor="middle"><text x="127" y="278">A</text><text x="235" y="222">B</text><text x="340" y="156">C</text><text x="460" y="72">D</text><text x="559" y="35">E</text></g>
  </svg>
  <figcaption><strong>純粋な水・約1気圧の模式図</strong>。時間の長さや傾きは実測値ではありません。気体になった後の加熱も含めた図で、実験手順ではありません。</figcaption>
 </figure>;
}
function StatesPhaseIcon({phase}) {
 const liquid=["B","C","D"].includes(phase);
 return <svg className="states-phase-icon" viewBox="0 0 100 86" aria-hidden="true">
  {liquid&&<path d="M18 46H82V76H18Z" fill="#e0f4ff"/>}
  <path d="M16 12V78H84V12 M16 12H84" fill="none" stroke="#88aabd" strokeWidth="2" strokeDasharray={phase==="E"?"5 4":undefined}/>
  {["A","B"].includes(phase)&&<g fill="#e5f4ff" stroke="#729db3" strokeWidth="2"><path d={phase==="B"?"M29 30H51V57H29Z M53 33H74V58H53Z":"M26 47H48V73H26Z M52 44H75V73H52Z"}/></g>}
  {liquid&&<path d="M18 46H82" fill="none" stroke="#4babc9" strokeWidth="2"/>}
  {phase==="D"&&<g fill="white" stroke="#4babc9"><circle cx="38" cy="58" r="6"/><circle cx="63" cy="65" r="5"/><circle cx="54" cy="48" r="4"/></g>}
  {phase==="E"&&<text x="50" y="46" textAnchor="middle" fontSize="13" fill="#42667a">見えない</text>}
 </svg>;
}

function StatesTemperatureSummary({openComic}) {
 return <>
  <LessonSummarySection id="states-summary-changes" title="三角形で状態変化を整理" page={1} openComic={openComic}>
   <p className="reader-key">状態が変わっても、別の物質になるわけではありません。</p>
   <StatesTriangle/>
   <table><caption>6方向の変化の名前</caption><thead><tr><th>変化</th><th>名前</th></tr></thead><tbody>{[
    ["固体 → 液体","融解"],["液体 → 固体","凝固"],["液体 → 気体","気化（蒸発・沸騰）"],["気体 → 液体","凝縮（液化）"],["固体 → 気体","昇華"],["気体 → 固体","凝華"]
   ].map(([change,name])=><tr key={change}><td>{change}</td><td>{name}</td></tr>)}</tbody></table>
   <p>赤い矢印は熱を受け取る方向、青い矢印は熱を放出する方向です。</p>
  </LessonSummarySection>
  <LessonSummarySection id="states-summary-sublimation" title="昇華とドライアイスの白い霧" page={1} openComic={openComic}>
   <p>ドライアイスは<strong>固体の二酸化炭素</strong>です。液体を通らず、二酸化炭素の気体になる変化を<strong>昇華</strong>といいます。</p>
   <StatesDryIceDiagram/>
   <p className="reader-key">ドライアイスの周囲の白い霧は、周囲の水蒸気が冷えてできた<strong>水滴や氷の粒</strong>です。<strong>二酸化炭素の気体そのものではありません。</strong></p>
   <p>気体から直接固体になる変化は<strong>凝華</strong>。両方向を「昇華」と呼ぶ場合もあるため、教科書や問題の表現にも注意しましょう。</p>
  </LessonSummarySection>
  <LessonSummarySection id="states-summary-steam" title="水蒸気と白い湯気の違い" page={1} openComic={openComic}>
   <StatesKettleDiagram/>
   <table><caption>やかんの近くで見分けよう</caption><thead><tr><th>名前</th><th>状態・見た目</th></tr></thead><tbody><tr><th>水蒸気</th><td>気体。目に見えない。</td></tr><tr><th>白い湯気</th><td>小さな水滴。液体。</td></tr></tbody></table>
   <p className="reader-key">水蒸気そのものは目に見えません。白く見える湯気は、小さな水滴です。</p>
  </LessonSummarySection>
  <LessonSummarySection id="states-summary-mass-volume" title="質量は同じ、体積は変わる" page={2} openComic={openComic}>
   <table><caption>ふたをした容器の氷を、室温でとかした例</caption><thead><tr><th>比べること</th><th>とける前</th><th>とけた後</th></tr></thead><tbody><tr><th>水の状態</th><td>氷（固体）</td><td>水（液体）</td></tr><tr><th>水の体積</th><td>大きい</td><td>小さい</td></tr><tr><th>容器込みの質量</th><td>150.0 g</td><td>150.0 g</td></tr></tbody></table>
   <p className="reader-caption">150.0 gは容器込みの説明用の数値です。ふたを閉じたまま、室温で氷をとかす場面です。</p>
   <p className="reader-key">物質が外へ出入りしなければ、状態変化で<strong>質量は変わりません。</strong>体積は変わります。</p>
   <p>氷が水になると、体積は小さくなります。逆に、水が凍って氷になると体積は大きくなります。すべての物質が水と同じ変わり方をするわけではありません。</p>
  </LessonSummarySection>

  <LessonSummarySection id="states-summary-melting" title="融点：固体が液体になる温度" page={3} openComic={openComic}>
   <p className="reader-key">融点は、固体が液体になる温度。純粋な水では約1気圧で<strong>約0℃</strong>です。</p>
   <p>グラフのBでは氷が融けている途中で、<strong>固体＋液体（氷と水）</strong>が共存します。加熱しても、融解している間は温度が一定です。</p>
  </LessonSummarySection>
  <LessonSummarySection id="states-summary-boiling" title="沸点：液体が沸騰して気体になる温度" page={3} openComic={openComic}>
   <p className="reader-key">沸点は、液体が沸騰して気体になる温度。純粋な水では約1気圧で<strong>約100℃</strong>です。</p>
   <p>グラフのDでは沸騰している途中で、<strong>液体＋気体（水と水蒸気）</strong>が共存します。泡の中は水蒸気です。加熱しても、沸騰している間は温度が一定です。</p>
  </LessonSummarySection>
  <LessonSummarySection id="states-summary-heating" title="一本の加熱グラフで5つの状態を読む" page={3} openComic={openComic}>
   <StatesHeatingGraph/>
   <table className="states-phase-table"><caption>グラフA〜Eと、対応する5つの状態</caption><thead><tr><th>区間</th><th>物質の状態</th><th>水の例</th></tr></thead><tbody>{[
    ["A","融点より低い","固体","氷"],
    ["B","融点で融解中","固体＋液体","氷と水（約0℃）"],
    ["C","融点と沸点の間","液体","水"],
    ["D","沸点で沸騰中","液体＋気体","水と水蒸気（約100℃）"],
    ["E","全部が気体になり、さらに加熱","気体","水蒸気"]
   ].map(([phase,range,state,example])=><tr key={phase} data-phase={phase}><th>{phase}<br/><small>{range}</small></th><td><StatesPhaseIcon phase={phase}/>{state}</td><td>{example}</td></tr>)}</tbody></table>
   <p className="reader-caption">Bの氷は水に浮いています。Dの泡は水蒸気。Eの破線は、目に見えない水蒸気を表す説明記号です。</p>
   <p className="reader-key">純粋な物質は、一定の圧力で状態変化している間、温度が一定です。融点・沸点に達した瞬間に、全部が次の状態になるわけではありません。</p>
   <p>変化の途中には2つの状態が共存します。温度だけで、それぞれの状態の割合は決まりません。</p>
   <p>同じ物質・同じ圧力なら、質量や体積が変わっても融点・沸点は変わりません。混合物や圧力の異なる場合は、同じ条件で考えないようにしましょう。</p>
  </LessonSummarySection>
 </>;
}
function StatesTemperatureExplanation() {
 return <article className="metal-lesson density-lesson states-lesson">
  <section id="states-toc" className="lesson-toc"><h2>漫画の目次</h2><nav aria-label="状態変化と温度の漫画の目次">{STATES_COMIC_PAGES.map(([,title],i)=><a key={title} href={"#states-page-"+(i+1)}>{title}</a>)}</nav></section>
  <div className="lesson-sections">{STATES_COMIC_PAGES.map(([file,title],i)=><section key={file} id={"states-page-"+(i+1)} className="lesson-section" aria-labelledby={"states-heading-"+(i+1)}>
   <h2 id={"states-heading-"+(i+1)} tabIndex={-1}><span className="reader-page-number">{i+1} / {STATES_COMIC_PAGES.length}</span>{title}</h2>
   <a href={"assets/states-temperature/"+file} target="_blank" rel="noopener" aria-label={title+"の漫画を拡大（別タブ）"}><img className="density-comic states-comic" src={"assets/states-temperature/"+file} width="1024" height="1536" loading={i?"lazy":"eager"} decoding="async" alt={"状態変化と温度の漫画："+title}/></a>
  </section>)}</div>
 </article>;
}
