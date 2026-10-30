// Adopted terminology comic only. Mass, concentration and melting comparison remain unpublished.
const DISSOLVING_COMIC_PAGES = [["dissolving-solute-solvent-solution-01.png","溶質・溶媒・溶液"]];
const DISSOLVING_QUESTION_SECTIONS = {"A-15":"solute","A-16":"solvent","A-17":"solution","A-18":"aqueous"};
function DissolvingParticles() {
 return <figure className="dissolving-figure">
  <svg viewBox="0 0 600 300" role="img" aria-labelledby="dissolving-particles-title dissolving-particles-desc">
   <title id="dissolving-particles-title">砂糖水の中の粒子の広がり（模式図）</title>
   <desc id="dissolving-particles-desc">青い丸は水、橙の丸は砂糖の粒子を表す説明記号。砂糖の粒子はなくならず、水全体に広がっています。粒子が肉眼で見えるわけではありません。</desc>
   <rect x="20" y="20" width="560" height="260" rx="20" fill="#f2faff" stroke="#88b5cc" strokeWidth="3"/>
   <g fill="#b7e5fa" stroke="#3f86b4" strokeWidth="2">{Array.from({length:32},(_,i)=><circle key={i} cx={55+(i%8)*70} cy={48+Math.floor(i/8)*65} r="10"/>)}</g>
   <g fill="#f5a34d" stroke="#995116" strokeWidth="2">{[[90,82],[305,85],[515,85],[165,212],[375,212],[515,215]].map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r="14"/>)}</g>
  </svg>
  <figcaption><span className="dissolving-legend-water">青：水の粒子</span> ／ <span className="dissolving-legend-sugar">橙：砂糖の粒子</span><br/>粒子の数・大きさ・間隔は実際と異なる模式図です。実際に粒子が目で見えるわけではありません。</figcaption>
 </figure>;
}
function DissolvingSummary({openComic}) {
 return <>
  <LessonSummarySection id="dissolving-summary-solute" title="溶質：溶けている物質" page={1} openComic={openComic}>
   <p className="reader-key">砂糖水では、砂糖が<strong>溶質</strong>です。</p>
   <table className="dissolving-terms-table"><caption>溶質・溶媒・溶液を砂糖水で整理</caption><thead><tr><th>用語</th><th>意味</th><th>砂糖水では</th></tr></thead><tbody>
    <tr><th>溶質</th><td>溶媒に溶けている物質</td><td>砂糖</td></tr>
    <tr><th>溶媒</th><td>溶質を溶かしている液体</td><td>水</td></tr>
    <tr><th>溶液</th><td>溶質が溶媒に溶けた液体全体</td><td>砂糖水</td></tr>
   </tbody></table>
  </LessonSummarySection>
  <LessonSummarySection id="dissolving-summary-solvent" title="溶媒：溶かしている液体" page={1} openComic={openComic}>
   <p className="reader-key">砂糖水では、砂糖を溶かしている水が<strong>溶媒</strong>です。</p>
   <p><strong>覚えるヒント：「溶かすばい！」</strong></p>
   <p>水のキャラクターと「溶かす液体」を結び付ける、この教材独自の覚え方です。</p>
  </LessonSummarySection>
  <LessonSummarySection id="dissolving-summary-solution" title="溶液：溶けた液体全体" page={1} openComic={openComic}>
   <p className="reader-key">溶質が溶媒に溶けた<strong>液体全体</strong>を溶液といいます。砂糖水では、砂糖水全体が溶液です。</p>
   <p>「砂糖だけ」「水だけ」ではなく、溶けた後の液体全体を指します。</p>
  </LessonSummarySection>
  <LessonSummarySection id="dissolving-summary-aqueous" title="溶媒が水なら水溶液" page={1} openComic={openComic}>
   <p className="reader-key">溶媒が<strong>水</strong>の溶液を、<strong>水溶液</strong>といいます。砂糖水も水溶液です。</p>
  </LessonSummarySection>
  <LessonSummarySection id="dissolving-summary-particles" title="砂糖は消えず、粒子として広がる" page={1} openComic={openComic}>
   <p className="reader-key">砂糖はなくなったのではなく、目に見えない粒子として<strong>水全体に広がっています。</strong></p>
   <DissolvingParticles/>
  </LessonSummarySection>
 </>;
}
function DissolvingExplanation() {
 return <article className="metal-lesson density-lesson dissolving-lesson">
  <section id="dissolving-toc" className="lesson-toc"><h2>漫画の目次</h2><nav aria-label="溶けるしくみの漫画の目次"><a href="#dissolving-page-1">溶質・溶媒・溶液</a></nav></section>
  <section id="dissolving-page-1" className="lesson-section" aria-labelledby="dissolving-heading-1">
   <h2 id="dissolving-heading-1" tabIndex={-1}><span className="reader-page-number">1 / 1</span>溶質・溶媒・溶液</h2>
   <a href="assets/dissolving/dissolving-solute-solvent-solution-01.png" target="_blank" rel="noopener" aria-label="溶質・溶媒・溶液の漫画を拡大（別タブ）"><img className="density-comic dissolving-comic" src="assets/dissolving/dissolving-solute-solvent-solution-01.png" width="1024" height="1536" loading="eager" decoding="async" alt="溶けるしくみの漫画：溶質・溶媒・溶液。砂糖・水・砂糖水全体と粒子の広がりを説明。"/></a>
  </section>
 </article>;
}
