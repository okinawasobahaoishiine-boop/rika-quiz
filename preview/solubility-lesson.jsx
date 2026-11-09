// Adopted overview page only. The original seven-page scenario remains incomplete.
const SOLUBILITY_COMIC_PAGES = [["solubility-recrystallization-01.png","溶解度と再結晶"],["solubility-crystal-comparison-02.png","冷やすと、どちらも結晶が出やすい？",1226,1283],["solubility-recrystallization-50g-03.png","再結晶：水が50 gなら？",1241,1268]];
const SOLUBILITY_QUESTION_SECTIONS = {"A-21":"saturated","A-22":"definition","A-23":"recrystallization"};
function SolubilityResidueDiagram() {
 return <figure className="solubility-figure">
  <svg viewBox="0 0 640 350" role="img" aria-labelledby="solubility-residue-title solubility-residue-desc">
   <title id="solubility-residue-title">液体部分は飽和水溶液、底の固体は溶け残り</title>
   <desc id="solubility-residue-desc">20℃の水100グラムに硝酸カリウム40グラムを入れた模式図。液体には約32グラムが溶け、底に約8グラムの固体が残る。</desc>
   <path d="M42 68V288Q42 305 62 305H240Q260 305 260 288V68" fill="white" stroke="#7797ab" strokeWidth="3"/>
   <path d="M47 125H255V285Q255 299 238 299H64Q47 299 47 285Z" fill="#e8f5fc"/>
   <ellipse cx="151" cy="68" rx="109" ry="15" fill="white" stroke="#7797ab" strokeWidth="3"/>
   <path d="M47 125Q151 144 255 125" fill="none" stroke="#7bb2cd" strokeWidth="3"/>
   <g fill="#e0e5e8" stroke="#8697a1" strokeWidth="2">{[[78,281],[105,287],[132,279],[158,287],[185,280],[213,286]].map(([cx,cy],i)=><ellipse key={i} cx={cx} cy={cy} rx="12" ry="7"/>)}</g>
   <g stroke="#355363" strokeWidth="2" fill="none"><path data-region="liquid" d="M158 187L292 132"/><path data-region="solid" d="M158 282L292 261"/></g>
   <g fill="#183440" fontSize="28" fontWeight="700"><text x="302" y="112">液体部分</text><text x="302" y="153">飽和水溶液</text><text x="302" y="261">底の固体：溶け残り</text></g>
   <g fill="#355363" fontSize="25"><text x="302" y="193">約32 gが溶けている</text><text x="302" y="302">約8 g</text></g>
  </svg>
  <figcaption>20℃の水100 gに硝酸カリウム40 gを入れた例の模式図です。底の粒の数・大きさは実際の量を表しません。</figcaption>
 </figure>;
}
function SolubilityCurve() {
 return <figure className="solubility-figure">
  <svg className="solubility-curve" viewBox="0 0 640 460" role="img" aria-labelledby="solubility-curve-title solubility-curve-desc">
   <title id="solubility-curve-title">硝酸カリウムの溶解度曲線：20℃で約32 g、40℃で約64 g</title>
   <desc id="solubility-curve-desc">横軸は温度、縦軸は水100グラムに溶ける限界の質量。20℃から40℃の範囲を示した模式図で、実際に溶かした量とは区別する。</desc>
   <g fill="#183440" fontSize="32"><text x="8" y="28">水100 gに溶ける</text><text x="8" y="64">限界の質量（g）</text><text x="434" y="421">温度（℃）→</text></g>
   <g stroke="#dbe5eb" strokeWidth="1">{[0,20,40,60,80].map(n=><path key={n} d={"M110 "+(360-n*3.3)+"H592"}/>)}</g>
   <path d="M110 88V360H610 M103 98L110 86L117 98 M598 353L610 360L598 367" stroke="#355363" strokeWidth="3" fill="none"/>
   <g fill="#183440" fontSize="30" textAnchor="end">{[0,20,40,60,80].map(n=><text key={n} x="96" y={369-n*3.3}>{n}</text>)}</g>
   <g fill="#183440" fontSize="32" textAnchor="middle"><text x="110" y="394">0</text><text x="343" y="394">20</text><text x="576" y="394">40</text></g>
   <g className="solubility-guides" fill="none" stroke="#6f8a9b" strokeDasharray="6 6" strokeWidth="2"><path d="M110 254.4H343V360"/><path d="M110 148.8H576V360"/></g>
   <path data-solubility-curve="limit" d="M343 254.4Q460 218 576 148.8" fill="none" stroke="#247ba9" strokeWidth="5"/>
   <g fill="#247ba9" stroke="white" strokeWidth="2"><circle data-temperature="20" data-limit="32" cx="343" cy="254.4" r="8"/><circle data-temperature="40" data-limit="64" cx="576" cy="148.8" r="8"/></g>
   <g fill="#174768" fontSize="32" fontWeight="700"><text x="226" y="229">20℃：約32 g</text><text x="412" y="120">40℃：約64 g</text></g>
  </svg>
  <figcaption>硝酸カリウムの20〜40℃の範囲を示した模式図です。数値は概数。曲線は「溶ける限界」を表します。</figcaption>
 </figure>;
}
function SolubilitySummary({openComic}) {
 return <>
  <LessonSummarySection id="solubility-summary-definition" title="溶解度：水100 gに溶ける限界" page={1} openComic={openComic}>
   <p className="reader-key">溶解度は、ある温度で<strong>水100 gに溶ける物質の限界の質量</strong>です。</p>
   <p>このページの例はすべて<strong>水100 g</strong>を使います。水溶液100 gではありません。物質は硝酸カリウムで、数値は概数です。</p>
   <table className="solubility-limits-table"><caption>水100 gに溶ける硝酸カリウムの限界</caption><thead><tr><th>温度</th><th>溶解度</th></tr></thead><tbody><tr><th>20℃</th><td>約32 g</td></tr><tr><th>40℃</th><td>約64 g</td></tr></tbody></table>
  </LessonSummarySection>
  <LessonSummarySection id="solubility-summary-saturated" title="飽和水溶液と溶け残り" page={1} openComic={openComic}>
   <p>その温度で限界まで物質が溶け、これ以上溶けない水溶液を<strong>飽和水溶液</strong>といいます。</p>
   <p className="reader-key"><strong>液体部分が飽和水溶液</strong>、<strong>底の固体が溶け残り</strong>です。</p>
   <SolubilityResidueDiagram/>
   <table className="solubility-residue-table"><caption>例1：20℃の水100 gに40 gを入れる</caption><thead><tr><th>比べる量</th><th>硝酸カリウムの質量</th></tr></thead><tbody><tr><th>入れた量</th><td>40 g</td></tr><tr><th>溶ける量</th><td>約32 g</td></tr><tr><th>溶け残る量</th><td>約8 g</td></tr></tbody></table>
   <p className="reader-key">40 g − 約32 g ＝ 約8 g。溶け残りは、<strong>はじめから溶けなかった固体</strong>です。</p>
  </LessonSummarySection>
  <LessonSummarySection id="solubility-summary-curve" title="溶解度曲線の読み方" page={1} openComic={openComic}>
   <p>溶解度曲線は、温度によってどれだけ溶けるかを示すグラフです。<strong>横軸は温度、縦軸は水100 gに溶ける限界の質量</strong>です。</p>
   <SolubilityCurve/>
   <p className="reader-key">40℃の<strong>約64 gは溶ける限界</strong>です。次の再結晶の例で、実際に溶かす量は60 gです。</p>
  </LessonSummarySection>
  <LessonSummarySection id="solubility-summary-recrystallization" title="再結晶：一度溶かしたものを結晶へ" page={1} openComic={openComic}>
   <p>固体の物質を水に溶かし、再び結晶として取り出すことを<strong>再結晶</strong>といいます。</p>
   <p>例2では、40℃の<strong>水100 g</strong>に硝酸カリウム<strong>60 gを全部溶かし</strong>、20℃に冷やします。<strong>水は蒸発しない</strong>条件です。</p>
   <table className="solubility-crystals-table"><caption>例2：溶かした60 gを、冷却前後で比べる</caption><thead><tr><th>条件</th><th>溶けている量</th><th>出てくる結晶</th></tr></thead><tbody><tr><th>40℃</th><td>60 g</td><td>なし</td></tr><tr><th>20℃に冷却</th><td>約32 g</td><td>約28 g</td></tr></tbody></table>
   <p className="reader-key"><strong>60 g − 約32 g ＝ 約28 g</strong>が結晶になります。約32 gは溶けたままです。</p>
   <p>40℃での溶解度は約64 gですが、この例で実際に溶かした量は60 gです。</p>
   <table className="solubility-distinction-table"><caption>底にある固体のでき方を区別</caption><thead><tr><th>固体の種類</th><th>でき方</th></tr></thead><tbody><tr><th>溶け残り</th><td>はじめから溶けなかった</td></tr><tr><th>再結晶で出た結晶</th><td>一度溶けてから、冷却で出た</td></tr></tbody></table>
  </LessonSummarySection>
 </>;
}
function SolubilityExplanation() {
 return <article className="metal-lesson density-lesson">
  <section id="solubility-toc" className="lesson-toc"><h2>漫画の目次</h2><nav aria-label="溶解度と再結晶の漫画の目次">{SOLUBILITY_COMIC_PAGES.map(([,heading],i)=><a key={heading} href={"#solubility-page-"+(i+1)}>{heading}</a>)}</nav></section>
  <div className="lesson-sections">{SOLUBILITY_COMIC_PAGES.map(([file,heading,width=1024,height=1536],i)=><section key={file} id={"solubility-page-"+(i+1)} className="lesson-section" aria-labelledby={"solubility-heading-"+(i+1)}>
   <h2 id={"solubility-heading-"+(i+1)} tabIndex={-1}><span className="reader-page-number">{i+1} / {SOLUBILITY_COMIC_PAGES.length}</span>{heading}</h2>
   <a href={"assets/solubility/"+file} target="_blank" rel="noopener" aria-label={heading+"の漫画を拡大（別タブ）"}><img className="density-comic solubility-comic" src={"assets/solubility/"+file} width={width} height={height} style={{aspectRatio:"auto "+width+" / "+height}} loading={i?"lazy":"eager"} decoding="async" alt={heading+"の漫画"}/></a>
  </section>)}</div>
 </article>;
}
