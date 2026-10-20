// Adopted introductory pages only. Full melting/boiling-point lessons remain unpublished.
const STATES_COMIC_PAGES = [
 ["state-change-triangle-01-v4.png","ひと目でわかる！ 物質の状態変化"],
 ["state-change-mass-volume-02.png","体積が変わっても、質量は同じ"]
];
const STATES_INTRO_QUESTION_SECTIONS = {"A-24":"changes","B-21":"changes","B-22":"changes","B-24":"mass-volume","B-25":"mass-volume"};
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
 </>;
}
function StatesTemperatureExplanation() {
 return <article className="metal-lesson density-lesson states-lesson">
  <section id="states-toc" className="lesson-toc"><h2>漫画の目次</h2><nav aria-label="状態変化の導入漫画の目次">{STATES_COMIC_PAGES.map(([,title],i)=><a key={title} href={"#states-page-"+(i+1)}>{title}</a>)}</nav></section>
  <div className="lesson-sections">{STATES_COMIC_PAGES.map(([file,title],i)=><section key={file} id={"states-page-"+(i+1)} className="lesson-section" aria-labelledby={"states-heading-"+(i+1)}>
   <h2 id={"states-heading-"+(i+1)} tabIndex={-1}><span className="reader-page-number">{i+1} / 2</span>{title}</h2>
   <a href={"assets/states-temperature/"+file} target="_blank" rel="noopener" aria-label={title+"の漫画を拡大（別タブ）"}><img className="density-comic states-comic" src={"assets/states-temperature/"+file} width="1024" height="1536" loading={i?"lazy":"eager"} decoding="async" alt={"状態変化の導入漫画："+title}/></a>
  </section>)}</div>
 </article>;
}
