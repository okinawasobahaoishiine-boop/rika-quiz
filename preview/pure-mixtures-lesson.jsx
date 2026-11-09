const PURE_MIXTURES_COMIC_PAGES = [["pure-substance-mixture-01.png","純粋な物質と混合物",1024,1536],["pure-air-oxygen-02.png","空気って、1種類の気体？",1199,1312]];
function PureMixturesExplanation() {
 return <article className="metal-lesson density-lesson">
  <section id="pure-mixtures-toc" className="lesson-toc"><h2>漫画の目次</h2><nav aria-label="純粋な物質と混合物の漫画の目次">{PURE_MIXTURES_COMIC_PAGES.map(([,heading],i)=><a key={heading} href={"#pure-mixtures-page-"+(i+1)}>{heading}</a>)}</nav></section>
  <div className="lesson-sections">{PURE_MIXTURES_COMIC_PAGES.map(([file,heading,width=1024,height=1536],i)=><section key={file} id={"pure-mixtures-page-"+(i+1)} className="lesson-section" aria-labelledby={"pure-mixtures-heading-"+(i+1)}>
   <h2 id={"pure-mixtures-heading-"+(i+1)} tabIndex={-1}><span className="reader-page-number">{i+1} / {PURE_MIXTURES_COMIC_PAGES.length}</span>{heading}</h2>
   <a href={"assets/pure-mixtures/"+file} target="_blank" rel="noopener" aria-label={heading+"の漫画を拡大（別タブ）"}><img className="density-comic pure-mixtures-comic" src={"assets/pure-mixtures/"+file} width={width} height={height} style={{aspectRatio:"auto "+width+" / "+height}} loading={i?"lazy":"eager"} decoding="async" alt={heading+"の漫画"}/></a>
  </section>)}</div>
 </article>;
}
