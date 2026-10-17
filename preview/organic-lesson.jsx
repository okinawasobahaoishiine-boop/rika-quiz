const ORGANIC_COMIC_PAGES = [
  ["organic-introduction-01.png", "同じ白い粉なのに、何が違う？"],
  ["organic-heating-02.png", "砂糖を加熱すると、どうなる？"],
  ["organic-combustion-03.png", "砂糖が燃えると、何ができる？"],
  ["organic-exceptions-04.png", "炭素があれば、全部有機物？"],
  ["organic-summary-05.png", "燃えれば有機物、でいいの？"]
];
function OrganicExplanation() {
  React.useEffect(()=>{
    const id=window.location.hash.slice(1);
    if(!/^organic-(toc|page-[1-5])$/.test(id))return;
    const frame=requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({behavior:"instant",block:"start"}));
    return ()=>cancelAnimationFrame(frame);
  },[]);
  return <article className="metal-lesson density-lesson organic-lesson">
    <header className="lesson-heading"><p className="eyebrow">中学1年・化学 ／ 身のまわりの物質</p><h1>有機物と無機物</h1><p>漫画で学ぶ全5ページ。画像をタップすると、大きく表示できます。</p></header>
    <section id="organic-toc" className="lesson-toc"><h2 tabIndex={-1}>目次</h2><nav aria-label="有機物と無機物の目次">{ORGANIC_COMIC_PAGES.map(([,title],i)=><a key={title} href={`#organic-page-${i+1}`} onClick={event=>scrollToLessonAnchor(event,`organic-page-${i+1}`)}>{title}</a>)}</nav></section>
    <div className="lesson-sections">{ORGANIC_COMIC_PAGES.map(([file,title],i)=><section key={file} id={`organic-page-${i+1}`} className="lesson-section" aria-labelledby={`organic-heading-${i+1}`}>
      <h2 id={`organic-heading-${i+1}`} tabIndex={-1}>{title}</h2>
      <a href={`assets/organic/${file}`} target="_blank" rel="noopener" aria-label={`${title}の漫画を拡大（別タブ）`}><img className="density-comic organic-comic" src={`assets/organic/${file}`} width="1024" height="1536" alt={`有機物と無機物の解説漫画：${title}`} loading={i?"lazy":"eager"} decoding="async" /></a>
      <a className="lesson-back-to-toc" href="#organic-toc" onClick={event=>scrollToLessonAnchor(event,"organic-toc")}>目次へ戻る ↑</a>
    </section>)}</div>
  </article>;
}
