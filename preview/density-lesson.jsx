const DENSITY_COMIC_PAGES = [
  ["density-introduction-02.png", "同じ大きさなのに、重さが違う！"],
  ["density-mass-introduction-02.png", "重さを比べる、その前に"],
  ["density-mass-weight-03.png", "月に行くと、軽くなる？"],
  ["density-definition-04.png", "同じ大きさで比べると？"],
  ["density-calculation-05.png", "1 cm³あたりにするには？"],
  ["density-calculation-01.png", "なぜ、質量を体積で割るの？"],
  ["density-measurement-01.png", "でこぼこの物体の体積は？"],
  ["density-floating-01.png", "浮く・沈むは、何で決まる？"],
  ["density-summary-01.png", "気体にも密度がある！"]
];
function DensityExplanation() {
  React.useEffect(()=>{
    const id = window.location.hash.slice(1);
    if (!/^density-(toc|page-[1-9])$/.test(id)) return;
    const frame=requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({behavior:"instant",block:"start"}));
    return ()=>cancelAnimationFrame(frame);
  },[]);
  return <article className="metal-lesson density-lesson">
    <header className="lesson-heading"><p className="eyebrow">中学1年・化学 ／ 身のまわりの物質</p><h1>密度</h1><p>漫画で学ぶ全9ページ。画像をタップすると、大きく表示できます。</p></header>
    <section id="density-toc" className="lesson-toc"><h2 tabIndex={-1}>目次</h2><nav aria-label="密度の目次">{DENSITY_COMIC_PAGES.map(([,title],i)=><a key={title} href={`#density-page-${i+1}`} onClick={event=>scrollToLessonAnchor(event,`density-page-${i+1}`)}>{title}</a>)}</nav></section>
    <div className="lesson-sections">{DENSITY_COMIC_PAGES.map(([file,title],i)=><section key={file} id={`density-page-${i+1}`} className="lesson-section" aria-labelledby={`density-heading-${i+1}`}>
      <h2 id={`density-heading-${i+1}`} tabIndex={-1}>{title}</h2>
      <a href={`assets/density/${file}`} target="_blank" rel="noopener" aria-label={`${title}の漫画を拡大（別タブ）`}><img className="density-comic" src={`assets/density/${file}`} alt={`密度の解説漫画：${title}`} loading={i ? "lazy" : "eager"} decoding="async" /></a>
      {i === 6 && <p className="lesson-note">水面の中央のいちばん低いところを、目を同じ高さにして読みます。試料の体積は40−30＝10 mL（10 cm³）。</p>}
      <a className="lesson-back-to-toc" href="#density-toc" onClick={event=>scrollToLessonAnchor(event,"density-toc")}>目次へ戻る ↑</a>
    </section>)}</div>
  </article>;
}
