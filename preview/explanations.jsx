// Editable page content and code-native illustrations; no raster page images.
const METAL_LESSON_CHAPTERS = ["どう見分ける？", "① 金属光沢", "② 電気伝導性", "③ 熱伝導性", "④ 展性・⑤ 延性", "例外と磁石", "まとめ"];

function LessonDrawing({ label, children, tall = false }) {
  return <svg className="lesson-drawing" viewBox={`0 0 320 ${tall ? 230 : 190}`} role="img" aria-label={label}>{children}</svg>;
}
function MaterialDrawing() {
  return <LessonDrawing label="鉄のくぎ・銅の板・アルミニウムの缶と、ガラスのコップ・プラスチックの定規">
    <rect x="19" y="14" width="282" height="158" rx="18" fill="#f0f8fc" />
    <g strokeLinecap="round" stroke="#556b7b"><path d="M53 38V73" strokeWidth="9"/><path d="M40 36H66" strokeWidth="8"/><path d="M53 73L53 82" strokeWidth="3"/></g>
    <rect x="130" y="31" width="54" height="43" rx="4" fill="#ca773b" stroke="#95512b" strokeWidth="2"/><path d="M138 36L175 36" stroke="#ffe4c0" strokeWidth="3"/>
    <g fill="#c9d5df" stroke="#60778a" strokeWidth="2"><rect x="240" y="31" width="35" height="48" rx="7"/><ellipse cx="257.5" cy="33" rx="17.5" ry="5"/></g>
    <g fontSize="14" fill="#173043" textAnchor="middle"><text x="53" y="101">鉄</text><text x="157" y="101">銅</text><text x="258" y="101">アルミニウム</text></g>
    <path d="M77 119L82 151Q101 163 120 151L125 119" fill="#d9f1f7" stroke="#698fa0" strokeWidth="2"/><ellipse cx="101" cy="119" rx="24" ry="5" fill="#f8fdff" stroke="#698fa0" strokeWidth="2"/>
    <rect x="177" y="127" width="89" height="20" rx="3" fill="#cde6bc" stroke="#74965b" strokeWidth="2"/>
    <path d="M188 128V137M200 128V141M212 128V137M224 128V141M236 128V137M248 128V141" stroke="#74965b" strokeWidth="2"/>
    <g fontSize="14" fill="#173043" textAnchor="middle"><text x="101" y="184">ガラス</text><text x="221" y="184">プラスチック</text></g>
  </LessonDrawing>;
}
function LusterDrawing() {
  return <LessonDrawing label="くすんだ金属の表面を磨くと、金属に特有の光沢が現れる比較図">
    <defs><linearGradient id="lesson-copper-shine"><stop stopColor="#9c4c24"/><stop offset=".42" stopColor="#dc9353"/><stop offset=".52" stopColor="#fff0cb"/><stop offset=".63" stopColor="#d28b48"/><stop offset="1" stopColor="#a6582b"/></linearGradient></defs>
    <rect x="20" y="47" width="105" height="75" rx="10" fill="#9d806b" stroke="#7a6558" strokeWidth="2"/>
    <path d="M31 72L72 61M48 91L104 98M40 111L91 76" stroke="#b4a18e" strokeWidth="5" opacity=".6"/>
    <path d="M140 83H177M168 74L179 83L168 92" fill="none" stroke="#08766b" strokeWidth="4" strokeLinecap="round"/>
    <rect x="195" y="47" width="105" height="75" rx="10" fill="url(#lesson-copper-shine)" stroke="#95512b" strokeWidth="2"/>
    <path d="M267 28V47M257 37H277M289 114V134M279 124H299" stroke="#bf7516" strokeWidth="3"/>
    <g fontSize="16" fill="#173043" textAnchor="middle"><text x="72" y="155">磨く前</text><text x="248" y="155">磨いたあと</text></g>
    <text x="160" y="184" fontSize="14" fill="#526777" textAnchor="middle">同じ金属でも、表面の状態で見え方が違う</text>
  </LessonDrawing>;
}
function ConductivityDrawing({ metal }) {
  const wire = metal ? "#08766b" : "#526777";
  return <LessonDrawing label={`電池・試料・豆電球を直列につないだ回路。${metal ? "金属の銅では豆電球がつく" : "非金属のガラスでは豆電球がつかない"}`}>
    {metal && <circle cx="266" cy="63" r="31" fill="#fff0b5"/>}
    <path d="M108 46H32V136H90M224 136H252V96M280 96H300V46H206" fill="none" stroke={wire} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="112" y="26" width="90" height="40" rx="5" fill="#25495b"/><rect x="104" y="38" width="8" height="16" rx="2" fill="#caa357"/><rect x="202" y="38" width="4" height="16" fill="#91a3ad"/>
    <g fontSize="21" fill="#fff" textAnchor="middle"><text x="129" y="54">＋</text><text x="185" y="54">−</text></g>
    <rect x="90" y="126" width="134" height="20" rx="4" fill={metal ? "#d98c50" : "#e0f0f6"} stroke={metal ? "#95512b" : "#7a9aa9"} strokeWidth="2"/>
    <circle cx="90" cy="136" r="4" fill={wire}/><circle cx="224" cy="136" r="4" fill={wire}/>
    <rect x="245" y="85" width="42" height="20" rx="4" fill="#d9d3c4" stroke="#8c8475" strokeWidth="2"/>
    <circle cx="266" cy="63" r="22" fill={metal ? "#ffde70" : "#f1f6f8"} stroke={metal ? "#b87b00" : "#8a9ca7"} strokeWidth="2"/>
    <path d="M252 96V86L260 76L266 65L272 76L280 86V96" fill="none" stroke={metal ? "#aa6300" : "#6d7c85"} strokeWidth="2"/>
    <circle cx="252" cy="96" r="4" fill={wire}/><circle cx="280" cy="96" r="4" fill={wire}/>
    <g fontSize="14" fill="#173043" textAnchor="middle"><text x="157" y="93">乾電池</text><text x="157" y="174">{metal ? "試料：金属（銅）" : "試料：非金属（ガラス）"}</text></g>
  </LessonDrawing>;
}
function HeatDrawing() {
  return <LessonDrawing tall label="同じ温度の湯に棒を入れた模式図。金属では長く太い矢印が持ち手側まで伸び、非金属では短い矢印が下端付近にとどまる">
    <defs><marker id="lesson-metal-heat" markerWidth="3" markerHeight="3" refX="2.4" refY="1.5" orient="auto"><path d="M0 0L3 1.5L0 3Z" fill="#d44532"/></marker><marker id="lesson-nonmetal-heat" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto"><path d="M0 0L4 2L0 4Z" fill="#d68b23"/></marker></defs>
    {[0,150].map((offset,i)=><g key={offset} transform={`translate(${offset} 0)`}>
      <path d="M34 91V169Q84 189 134 169V91" fill="#f4fafc" stroke="#7894a3" strokeWidth="2"/>
      <path d="M37 122V167Q84 183 131 167V122Z" fill="#bde2f0"/>
      <ellipse cx="84" cy="122" rx="47" ry="7" fill="#d9f1f8" stroke="#82b4c5"/>
      <path d="M93 158L108 32" stroke={i===0 ? "#b16a3a" : "#9fb9c5"} strokeWidth="12" strokeLinecap="round"/>
      <path d="M91 155L106 34" stroke={i===0 ? "#e8b17b" : "#e8f3f6"} strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="84" cy="91" rx="50" ry="8" fill="none" stroke="#7894a3" strokeWidth="2"/>
      <path d={i===0 ? "M116 152L129 48" : "M116 153L119 132"} stroke={i===0 ? "#d44532" : "#d68b23"} strokeWidth={i===0 ? 7 : 3} markerEnd={`url(#${i===0 ? "lesson-metal-heat" : "lesson-nonmetal-heat"})`}/>
      <g fontSize="14" fill="#173043" textAnchor="middle"><text x="84" y="18">持ち手側</text><text x="70" y="156">湯</text><text x="84" y="211">{i===0 ? "金属（銅）" : "非金属（ガラス）"}</text></g>
    </g>)}
  </LessonDrawing>;
}
function ShapeDrawing() {
  return <LessonDrawing tall label="展性はたたくと薄く広がる性質。延性は引っ張ると細い線に伸びる性質。金型を通して細い線にする模式図">
    <rect x="25" y="38" width="63" height="38" rx="5" fill="#cc8149" stroke="#95512b" strokeWidth="2"/>
    <g transform="rotate(-25 64 27)"><path d="M64 27L97 60" stroke="#9b704c" strokeWidth="8"/><rect x="43" y="15" width="42" height="21" rx="3" fill="#697d89"/></g>
    <path d="M111 60H150M140 50L151 60L140 70" stroke="#08766b" strokeWidth="4" fill="none"/>
    <rect x="180" y="54" width="110" height="8" rx="2" fill="#d9935a" stroke="#95512b" strokeWidth="2"/>
    <g fill="#173043" fontSize="14" textAnchor="middle"><text x="56" y="101">かたまり</text><text x="235" y="101">薄い板・箔</text></g>
    <path d="M25 118H295" stroke="#d9e4eb"/>
    <rect x="26" y="155" width="106" height="24" fill="#cc8149" stroke="#95512b" strokeWidth="2"/>
    <rect x="132" y="143" width="26" height="50" rx="3" fill="#a9b9c3" stroke="#526777" strokeWidth="2"/>
    <path d="M157 167H290" stroke="#b66a38" strokeWidth="5"/>
    <path d="M208 140H274M265 132L276 140L265 148" stroke="#08766b" strokeWidth="3" fill="none"/>
    <g fill="#173043" fontSize="14" textAnchor="middle"><text x="145" y="218">金型</text><text x="242" y="193">細い線</text><text x="237" y="127">引っ張る</text></g>
  </LessonDrawing>;
}
function MagnetDrawing() {
  return <LessonDrawing label="鉄・銅・アルミニウムに磁石を近づけた比較。この3つでは鉄が磁石につき、銅とアルミニウムはつかない">
    {[0,100,200].map((offset,i)=><g key={i} transform={`translate(${offset} 0)`}>
      <rect x="26" y="28" width="29" height="32" rx="3" fill="#c95653"/><rect x="55" y="28" width="29" height="32" rx="3" fill="#45769a"/>
      <g fill="#fff" fontSize="15" textAnchor="middle"><text x="40" y="50">N</text><text x="69" y="50">S</text></g>
      <circle cx="55" cy={i===0 ? 73 : 110} r="13" fill={i===1 ? "#d9935a" : "#b6c4ce"} stroke="#526777" strokeWidth="2"/>
      <g fill="#173043" fontSize="13" textAnchor="middle"><text x="55" y="147">{["鉄","銅","アルミニウム"][i]}</text><text x="55" y="174">{i===0 ? "つく" : "つかない"}</text></g>
    </g>)}
  </LessonDrawing>;
}

function MetalExplanation() {
  const params = new URLSearchParams(window.location.search);
  const [chapter, setChapter] = React.useState(() => Math.floor(Math.min(6, Math.max(0, Number(params.get("chapter")) || 0))));
  const [metal, setMetal] = React.useState(true);
  const article = React.useRef(null);
  const move = (index) => { setChapter(index); setMetal(true); requestAnimationFrame(() => article.current?.scrollIntoView({block:"start",behavior:"auto"})); };
  return <article className="metal-lesson" ref={article}>
    <header className="lesson-heading">
      <p className="eyebrow">中学1年・化学 ／ 身のまわりの物質</p>
      {chapter===0 ? <><h1>金属と非金属</h1><h2>どう見分ける？</h2></> : <><p className="lesson-series">金属と非金属</p><h1>{METAL_LESSON_CHAPTERS[chapter]}</h1></>}
      <p className="lesson-format">文章と簡単な図で読む解説</p>
    </header>
    <details className="lesson-toc"><summary>読む項目を選ぶ</summary><nav aria-label="解説の目次">{METAL_LESSON_CHAPTERS.map((title,index)=><button key={title} type="button" aria-current={chapter===index?"step":undefined} onClick={()=>move(index)}>{title}</button>)}</nav></details>
    <div className="lesson-content" key={chapter}>
      {chapter===0 && <>
        <p className="lesson-lead">鉄・銅・アルミニウムは金属。ガラスやプラスチックは、非金属の材料の例です。</p>
        <figure><MaterialDrawing/><figcaption>色や見た目だけでなく、物質の性質を比べてみよう。</figcaption></figure>
        <div className="lesson-key"><strong>1つの特徴だけでは決めない。</strong><p>ガラスも光を反射します。磁石につかない金属もあります。いくつかの性質を組み合わせて判断しましょう。</p></div>
        <p>これから、金属光沢・電気伝導性・熱伝導性・展性・延性を、実験や身近な例で確認します。</p>
        <p className="lesson-note">ここでの「非金属」は金属以外の物質・材料を指します。ガラスやプラスチックは、非金属元素そのものの名前ではありません。</p>
      </>}
      {chapter===1 && <>
        <p className="lesson-lead">金属の表面を磨くと、金属に特有の光沢が現れます。これが<strong>金属光沢</strong>です。</p>
        <figure><LusterDrawing/><figcaption>くすんだ銅も、表面を磨くと特有の光沢が現れる。</figcaption></figure>
        <div className="lesson-key"><strong>金属光沢＝金属に特有の光沢</strong><p>銅は赤褐色、アルミニウムは銀白色。金属だから全部同じ色、というわけではありません。</p></div>
        <p>ガラスやプラスチックにも表面の反射はあります。「光っているから金属」とは決めず、ほかの性質も確かめます。</p>
      </>}
      {chapter===2 && <>
        <p className="lesson-lead">回路の途中に試料を入れ、<strong>豆電球がつくか</strong>を調べる実験です。</p>
        <div className="lesson-switch" role="group" aria-label="回路に入れる試料"><button type="button" aria-pressed={metal} onClick={()=>setMetal(true)}>金属（銅）</button><button type="button" aria-pressed={!metal} onClick={()=>setMetal(false)}>非金属（ガラス）</button></div>
        <figure><ConductivityDrawing metal={metal}/><figcaption aria-live="polite">{metal ? "銅は電気を通すので、電流が流れて豆電球がつく。" : "ガラスは電気を通しにくいので、豆電球がつかない。"}</figcaption></figure>
        <ol className="lesson-steps"><li>乾電池・豆電球・導線で、試料を入れる部分がある回路を作る。</li><li>2つのクリップの間に試料をはさむ。</li><li>試料だけを取り替え、豆電球の点灯を比べる。</li></ol>
        <div className="lesson-key"><strong>金属は電気伝導性が高い。</strong><p>電気を通しやすいため、銅やアルミニウムは電線などに使われます。電気の通しやすさを表す量を<strong>電気伝導率</strong>といいます。</p></div>
        <p className="lesson-note">この模式図の実験は「電気を通すか」を確かめるもの。伝導率の数値を測っているわけではありません。電池を導線だけで直接つなぐ短絡はしません。</p>
      </>}
      {chapter===3 && <>
        <p className="lesson-lead">金属は、温めた部分から離れた<strong>持ち手側まで熱が伝わりやすい</strong>物質です。</p>
        <figure><HeatDrawing/><figcaption>同じ温度の湯・同じ太さと長さの棒・同じ時間で比較した模式図。矢印は熱が伝わる様子を表す。</figcaption></figure>
        <div className="lesson-compare"><section><h2>金属</h2><p>長く太い矢印が持ち手側まで伸びる。<strong>熱伝導性が高い。</strong></p></section><section><h2>非金属（ガラス）</h2><p>矢印は下端付近に短くとどまる。金属より熱が伝わりにくい。</p></section></div>
        <div className="lesson-key"><strong>熱伝導率＝物質の熱の伝わりやすさを表す量</strong><p>熱いスープに入れた金属スプーンでは、スープにつかっていない持ち手も熱くなることがあります。</p></div>
        <p className="lesson-note">非金属に「全く熱が伝わらない」という意味ではありません。この図は銅とガラスの比較であり、非金属にも熱をよく伝えるものがあります。熱い棒を手で触って確かめないでください。</p>
      </>}
      {chapter===4 && <>
        <p className="lesson-lead">金属は、力を加えると<strong>薄い板や細い線に加工できる</strong>という性質があります。</p>
        <figure><ShapeDrawing/><figcaption>上：たたいて薄い板にする。下：金型を通して引っ張り、細い線にする模式図。</figcaption></figure>
        <div className="lesson-compare"><section><h2>④ 展性</h2><p>たたくと<strong>薄く広がる</strong>性質。アルミニウム箔などに利用。</p></section><section><h2>⑤ 延性</h2><p>引っ張ると<strong>細く伸びる</strong>性質。銅線などに利用。</p></section></div>
        <div className="lesson-key"><strong>展性は「板」、延性は「線」。</strong><p>線を巻いた状態からほどくことではなく、材料そのものを細く加工できる性質です。</p></div>
      </>}
      {chapter===5 && <>
        <p className="lesson-lead">「磁石につくか」だけでは、金属かどうかは決められません。</p>
        <figure><MagnetDrawing/><figcaption>鉄・銅・アルミニウムの3種類を比べると、磁石につくのは鉄。</figcaption></figure>
        <div className="lesson-key"><strong>銅やアルミニウムも金属。でも、磁石にはつかない。</strong><p>鉄のほかに、ニッケルやコバルトも磁石につきます。「金属は全部つく」「鉄だけがつく」のどちらも正確ではありません。</p></div>
        <section className="lesson-exception"><h2>黒鉛は非金属。でも電気を通す。</h2><p>電気を通すから必ず金属、ともいえません。例外もあるため、複数の性質を組み合わせて判断します。</p></section>
      </>}
      {chapter===6 && <>
        <p className="lesson-lead">専門用語と、何ができる性質なのかをセットにしよう。</p>
        <dl className="lesson-summary">{[["① 金属光沢","磨くと、金属に特有の光沢が現れる。"],["② 電気伝導性","電気を通しやすい。電気伝導率が高い。"],["③ 熱伝導性","熱を伝えやすい。持ち手側まで熱が伝わりやすい。"],["④ 展性","たたくと、薄く広がる。"],["⑤ 延性","引っ張ると、細く伸びる。"]].map(([term,meaning])=><div key={term}><dt>{term}</dt><dd>{meaning}</dd></div>)}</dl>
        <div className="lesson-key"><strong>複数の性質で判断する。</strong><p>磁石につくのは一部の金属。非金属の黒鉛も電気を通します。1つの結果だけで決めないことが大切です。</p></div>
        <p>「金属の性質を1つ説明して」と聞かれたら、専門用語だけでなく、その意味や使われ方まで説明してみましょう。</p>
      </>}
    </div>
    <nav className="lesson-page-actions" aria-label="解説の項目移動"><button type="button" disabled={chapter===0} onClick={()=>move(chapter-1)}>← 前の項目</button><button type="button" disabled={chapter===6} onClick={()=>move(chapter+1)}>次の項目 →</button></nav>
    <p className="lesson-note">簡単な図解付きのページ版です。既存の漫画とは別に、文章・図の配置を調整できる形で制作しています。</p>
  </article>;
}
