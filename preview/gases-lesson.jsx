const GASES_COMIC_PAGES = [
  ["oxygen-properties-01.png","酸素｜6つの特徴と身近なイメージ"],
  ["oxygen-experiment-02.png","酸素｜作り方・集め方・燃焼"],
  ["nitrogen-properties-01.png","窒素｜6つの特徴と食品の保存"],
  ["nitrogen-experiment-02.png","窒素｜酸素との燃え方の違い"],
  ["carbon-dioxide-properties-01.png","二酸化炭素｜6つの特徴と炭酸飲料"],
  ["carbon-dioxide-experiment-02.png","二酸化炭素｜作り方・石灰水・集め方"],
  ["hydrogen-properties-01.png","水素｜6つの特徴と音を立てて燃える実験"],
  ["hydrogen-experiment-02.png","水素｜作り方・集め方・燃えると水ができる"],
  ["ammonia-properties-01.png","アンモニア｜6つの特徴と刺激臭"],
  ["ammonia-experiment-02.png","アンモニア｜作り方と噴水のひみつ"]
];
function GasesExplanation() {
  React.useEffect(()=>{
    const id=window.location.hash.slice(1);
    if(!/^gases-(toc|page-([1-9]|10))$/.test(id))return;
    const frame=requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({behavior:"instant",block:"start"}));
    return ()=>cancelAnimationFrame(frame);
  },[]);
  return <article className="metal-lesson density-lesson gases-lesson">
    <header className="lesson-heading"><p className="eyebrow">中学1年・化学 ／ 身のまわりの物質</p><h1>気体の性質と集め方</h1><p>酸素・窒素・二酸化炭素・水素・アンモニアを各2ページ、全10ページの漫画で解説。画像は右から左に読み、タップすると拡大できます。</p></header>
    <section id="gases-toc" className="lesson-toc"><h2 tabIndex={-1}>目次</h2><nav aria-label="気体の性質と集め方の目次">{GASES_COMIC_PAGES.map(([,title],i)=><a key={title} href={`#gases-page-${i+1}`} onClick={event=>scrollToLessonAnchor(event,`gases-page-${i+1}`)}>{title}</a>)}</nav></section>
    <div className="lesson-sections">{GASES_COMIC_PAGES.map(([file,title],i)=><section key={file} id={`gases-page-${i+1}`} className="lesson-section" aria-labelledby={`gases-heading-${i+1}`}>
      <h2 id={`gases-heading-${i+1}`} tabIndex={-1}>{title}</h2>
      <a href={`assets/gases/${file}`} target="_blank" rel="noopener" aria-label={`${title}の漫画を拡大（別タブ）`}><img className="density-comic gases-comic" src={`assets/gases/${file}`} width="1024" height="1536" alt={`気体の解説漫画：${title}`} loading={i?"lazy":"eager"} decoding="async" /></a>
      <a className="lesson-back-to-toc" href="#gases-toc" onClick={event=>scrollToLessonAnchor(event,"gases-toc")}>目次へ戻る ↑</a>
    </section>)}</div>
    <p className="lesson-note">実験は先生の指示で行い、気体を直接吸い込んだり、においをかいだりしないでください。</p>
  </article>;
}
