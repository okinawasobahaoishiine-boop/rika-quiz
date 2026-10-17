const ORGANIC_COMIC_PAGES = [
  ["organic-introduction-01.png", "同じ白い粉なのに、何が違う？"],
  ["organic-heating-02.png", "砂糖を加熱すると、どうなる？"],
  ["organic-combustion-03.png", "砂糖が燃えると、何ができる？"],
  ["organic-exceptions-04.png", "炭素があれば、全部有機物？"],
  ["organic-summary-05.png", "燃えれば有機物、でいいの？"]
];
function OrganicStudySummary() {
  const observer=React.useRef(null);
  const frame=React.useRef(null);
  React.useEffect(()=>()=>{
    observer.current?.disconnect();
    if(frame.current!==null)cancelAnimationFrame(frame.current);
  },[]);
  const fitSummary=event=>{
    const iframe=event.currentTarget;
    const body=iframe.contentDocument?.body;
    if(!body)return;
    body.classList.add("embedded");
    const measure=()=>{
      const height=Math.ceil(body.getBoundingClientRect().height)+2;
      if(height>0 && Math.abs((parseFloat(iframe.style.height)||0)-height)>1)iframe.style.height=`${height}px`;
    };
    measure();
    observer.current?.disconnect();
    observer.current=new ResizeObserver(()=>{
      if(frame.current!==null)cancelAnimationFrame(frame.current);
      frame.current=requestAnimationFrame(measure);
    });
    observer.current.observe(body);
  };
  return <section id="organic-summary" className="lesson-section" aria-labelledby="organic-summary-heading">
    <h2 id="organic-summary-heading" tabIndex={-1}>まとめ｜表と図で整理しよう</h2>
    <iframe src="organic-study.html?v=20261017-summary" title="有機物と無機物のまとめ：比較表と図解" loading="lazy" sandbox="allow-same-origin" onLoad={fitSummary} style={{display:"block",width:"100%",height:"700px",border:0}} />
    <p className="lesson-note"><a href="organic-study.html">まとめを別ページで開く →</a></p>
    <a className="lesson-back-to-toc" href="#organic-toc" onClick={event=>scrollToLessonAnchor(event,"organic-toc")}>目次へ戻る ↑</a>
  </section>;
}
function OrganicExplanation() {
  React.useEffect(()=>{
    const id=window.location.hash.slice(1);
    if(!/^organic-(toc|summary|page-[1-5])$/.test(id))return;
    const frame=requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({behavior:"instant",block:"start"}));
    return ()=>cancelAnimationFrame(frame);
  },[]);
  return <article className="metal-lesson density-lesson organic-lesson">
    <header className="lesson-heading"><p className="eyebrow">中学1年・化学 ／ 身のまわりの物質</p><h1>有機物と無機物</h1><p>漫画全5ページ＋表と図のまとめ。画像をタップすると、大きく表示できます。</p></header>
    <section id="organic-toc" className="lesson-toc"><h2 tabIndex={-1}>目次</h2><nav aria-label="有機物と無機物の目次">{ORGANIC_COMIC_PAGES.map(([,title],i)=><a key={title} href={`#organic-page-${i+1}`} onClick={event=>scrollToLessonAnchor(event,`organic-page-${i+1}`)}>{title}</a>)}<a href="#organic-summary" onClick={event=>scrollToLessonAnchor(event,"organic-summary")}>まとめ｜表と図で整理しよう</a></nav></section>
    <div className="lesson-sections">{ORGANIC_COMIC_PAGES.map(([file,title],i)=><section key={file} id={`organic-page-${i+1}`} className="lesson-section" aria-labelledby={`organic-heading-${i+1}`}>
      <h2 id={`organic-heading-${i+1}`} tabIndex={-1}>{title}</h2>
      <a href={`assets/organic/${file}`} target="_blank" rel="noopener" aria-label={`${title}の漫画を拡大（別タブ）`}><img className="density-comic organic-comic" src={`assets/organic/${file}`} width="1024" height="1536" alt={`有機物と無機物の解説漫画：${title}`} loading={i?"lazy":"eager"} decoding="async" /></a>
      <a className="lesson-back-to-toc" href="#organic-toc" onClick={event=>scrollToLessonAnchor(event,"organic-toc")}>目次へ戻る ↑</a>
    </section>)}<OrganicStudySummary /></div>
  </article>;
}
