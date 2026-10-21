// Shared lesson UI. Existing comic assets and order remain owned by each lesson.
const LESSON_MEMORY = new Map();
let LESSON_RESTORE_PENDING = performance.getEntriesByType("navigation")[0]?.type==="reload";
const lessonRead = (store, key, fallback) => { try { return JSON.parse(store.getItem(scienceStorageKey(key))) || fallback; } catch { return fallback; } };
const lessonWrite = (store, key, value) => { try { store.setItem(scienceStorageKey(key), JSON.stringify(value)); return true; } catch { return false; } };
const LESSON_TOPICS = {
 "states-temperature": {title:"状態変化と温度",prefix:"states",pages:STATES_COMIC_PAGES,Summary:StatesTemperatureSummary,description:"状態変化・質量と体積・水の融点と沸点（漫画3ページ）。蒸発と沸騰の比較など、残りの内容は準備中です。",sections:[["changes","6方向の状態変化"],["sublimation","昇華・白い霧"],["steam","水蒸気と湯気"],["mass-volume","質量と体積"],["melting","融点"],["boiling","沸点"],["heating","加熱グラフと5つの状態"]]},
 density: {title:"密度", prefix:"density", pages:DENSITY_COMIC_PAGES, sections:[["meaning","密度・質量・重さ"],["calculate","密度の計算"],["measure","体積の測り方"],["float","浮く・沈む"],["gas","気体の密度"]]},
 "organic-inorganic": {title:"有機物と無機物",prefix:"organic",pages:ORGANIC_COMIC_PAGES,sections:[["classification","有機物と無機物"],["heating","砂糖の加熱"],["combustion","燃焼でできる物質"],["exceptions","分類の例外"],["mistakes","間違えやすいこと"]]},
 gases: {title:"気体の性質と集め方",prefix:"gases",pages:GASES_COMIC_PAGES,sections:[["compare","5種類を比較"],["oxygen","酸素"],["nitrogen","窒素"],["carbon-dioxide","二酸化炭素"],["hydrogen","水素"],["ammonia","アンモニア"],["collect","集め方の選び方"]]}
};
function LessonSummarySection({id,title,page,openComic,children,extra}) {
 return <section id={id} className="reader-summary-section" aria-labelledby={id+"-title"}>
  <h2 id={id+"-title"} tabIndex={-1}>{title}</h2>{children}
  {page && <button className="reader-comic-link" onClick={event=>openComic(page,id,title,event.currentTarget)}>この内容を漫画で見る → <small>{page}ページ</small></button>}{extra}
 </section>;
}
function LessonFlow({items,label}) {
 return <div className="reader-flow" role="group" aria-label={label}>{items.map((item,i)=><React.Fragment key={item}>{i>0&&<span aria-hidden="true">↓</span>}<div>{item}</div></React.Fragment>)}</div>;
}
function DensitySummary({openComic}) {
 const S=LessonSummarySection;
 return <>
 <S openComic={openComic} id="density-summary-meaning" title="密度・質量・重さ" page={4}>
  <p className="reader-key">密度は、一定の体積あたりの質量。同じ体積で比べると、質量が大きい物質ほど密度が大きい。</p>
  <div className="reader-equal-volume" role="img" aria-label="説明用の例。同じ1立方センチメートルでもAは2グラム、Bは6グラム。Bの密度が大きい"><div><span>1 cm³</span><strong>A：2 g</strong></div><div><span>1 cm³</span><strong>B：6 g</strong></div></div>
  <p className="reader-caption">図は説明用の仮想物質です。</p>
  <table><caption>質量と重さの違い</caption><thead><tr><th>量</th><th>意味・単位</th><th>地球から月へ</th></tr></thead><tbody><tr><th>質量</th><td>物体そのものの量<br/>g、kg</td><td>変わらない</td></tr><tr><th>重さ</th><td>物体にはたらく重力の大きさ<br/>N</td><td>小さくなる</td></tr></tbody></table>
  <button className="reader-text-link" onClick={e=>openComic(3,"density-summary-meaning","密度・質量・重さ",e.currentTarget)}>質量と重さの違いを漫画で見る → 3ページ</button>
 </S>
 <S openComic={openComic} id="density-summary-calculate" title="密度の計算" page={5}>
  <div className="reader-formula">密度 ＝ <span className="reader-fraction"><span>質量</span><span>体積</span></span></div>
  <p>質量をg、体積をcm³で表すと、密度の単位はg/cm³です。</p>
  <div className="reader-formula" aria-label="20グラムを10立方センチメートルで割ると、1立方センチメートルあたり2グラム">例：<span className="reader-fraction"><span>20 g</span><span>10 cm³</span></span> ＝ 2 g/cm³</div>
  <p>質量 ＝ 密度 × 体積<br/>体積 ＝ 質量 ÷ 密度</p>
 </S>
 <S openComic={openComic} id="density-summary-measure" title="体積の測り方" page={7}>
  <LessonFlow label="水の体積から物体の体積を求める" items={["入れる前の水：30 mL","物体を沈めた後：40 mL","増えた10 mL ＝ 物体の体積10 cm³"]}/>
  <p>水に溶けず、水を吸わない物体で調べます。水面の中央のいちばん低いところを、目と同じ高さで読みます。</p>
 </S>
 <S openComic={openComic} id="density-summary-float" title="浮く・沈む" page={8}>
  <table><caption>物体と液体の密度を比べる</caption><thead><tr><th>物体の密度</th><th>液体中での様子</th></tr></thead><tbody><tr><td>液体より小さい</td><td>浮く</td></tr><tr><td>液体より大きい</td><td>沈む</td></tr></tbody></table>
  <p>中が空洞でない物体を比べるときの基本です。氷は水より密度が小さいため、水に浮きます。</p>
 </S>
 <S openComic={openComic} id="density-summary-gas" title="気体の密度" page={9}><p className="reader-key">気体にも質量と体積があり、密度があります。</p><p>温度・圧力をそろえ、同じ体積の質量を比べます。気体の密度は温度・圧力で変わるため、比べる条件をそろえます。</p></S>
 </>;
}
function OrganicSummary({openComic}) {
 const S=LessonSummarySection;
 return <>
 <S openComic={openComic} id="organic-summary-classification" title="有機物と無機物" page={1}>
  <table><caption>意味と代表例</caption><thead><tr><th>有機物</th><th>無機物</th></tr></thead><tbody><tr><td>炭素を含む物質のうち、二酸化炭素など一部を除いたもの</td><td>有機物以外の物質</td></tr><tr><td>砂糖・デンプン・エタノールなど</td><td>食塩・水・鉄・二酸化炭素など</td></tr></tbody></table>
  <p className="reader-key">見た目が白い粉でも、同じ種類の物質とは限りません。</p>
 </S>
 <S openComic={openComic} id="organic-summary-heating" title="砂糖の加熱" page={2}>
  <LessonFlow label="砂糖を加熱したときの変化" items={["白い砂糖","加熱すると褐色に変化","さらに加熱すると黒く炭化"]}/>
  <p>砂糖は炭素を含むため、加熱を続けると黒い炭が残ります。加熱と燃焼の観察を分けて整理しましょう。</p>
 </S>
 <S openComic={openComic} id="organic-summary-combustion" title="燃焼でできる物質" page={3}>
  <LessonFlow label="砂糖の燃焼でできる物質" items={["砂糖が燃える","二酸化炭素と水ができる"]}/>
  <table><caption>生成物の確かめ方</caption><thead><tr><th>できた物質</th><th>観察できる変化</th></tr></thead><tbody><tr><th>二酸化炭素</th><td>石灰水に通すと白くにごる</td></tr><tr><th>水</th><td>乾いた冷たい容器の内側に水滴が付く</td></tr></tbody></table>
 </S>
 <S openComic={openComic} id="organic-summary-exceptions" title="分類の例外" page={4}><p className="reader-key">炭素を含んでいても、すべてが有機物ではありません。</p><table><caption>無機物として扱う例</caption><tbody><tr><th>二酸化炭素</th><td>炭素を含むが無機物</td></tr><tr><th>炭素そのもの</th><td>黒鉛などは無機物</td></tr></tbody></table></S>
 <S openComic={openComic} id="organic-summary-mistakes" title="間違えやすいこと" page={5}><table><caption>見分けるときの注意</caption><thead><tr><th>思い違い</th><th>正しくは</th></tr></thead><tbody><tr><td>燃えれば有機物</td><td>鉄も燃えるが無機物。燃えることだけでは決められない</td></tr><tr><td>炭素があれば必ず有機物</td><td>二酸化炭素や炭素そのものなどの例外がある</td></tr></tbody></table></S>
 </>;
}
const READER_GASES = [
 ["oxygen","酸素","空気より少し重い","溶けにくい","無臭","中性","水上置換法","ものが燃えるのを助ける。酸素そのものが燃えるわけではない。",1,2,"うすい過酸化水素水に二酸化マンガンを加えて発生させる。"],
 ["nitrogen","窒素","空気よりわずかに軽い","溶けにくい","無臭","中性","水上置換法","燃焼を助けず、ふだんは他の物質と反応しにくい。食品の酸化を防ぐために使われることがある。",3,4,null],
 ["carbon-dioxide","二酸化炭素","空気より重い","少し溶ける","無臭","酸性","下方置換法・水上置換法","石灰水に通すと、白くにごる。炭酸飲料にも含まれる。",5,6,"石灰石にうすい塩酸を加えて発生させる。"],
 ["hydrogen","水素","空気より非常に軽い","溶けにくい","無臭","中性","水上置換法","先生が少量で行う燃焼確認では「ポン！」と音を立てて燃える。燃えると水ができる。",7,8,"亜鉛にうすい塩酸を加えて発生させる。"],
 ["ammonia","アンモニア","空気より軽い","非常によく溶ける","刺激臭","アルカリ性","上方置換法","トイレの刺激臭のもとになることがある。噴水実験では、水に非常によく溶ける性質が現れる。",9,10,"塩化アンモニウムと水酸化カルシウムを混ぜて加熱し、発生させる。"]
];
function GasesSummary({openComic}) {
 return <>
 <LessonSummarySection id="gases-summary-compare" title="5種類を比較" openComic={openComic}>
 <p>すべて無色。空気との軽重は、同じ温度・圧力で比べます。</p>
 <table className="reader-gas-table"><caption>気体の主な違い</caption><thead><tr><th>気体</th><th>水への溶け方</th><th>水に溶けたときの液性</th></tr></thead><tbody>{READER_GASES.map(([id,name,,water,,liquid])=><tr key={id}><th><a href={"#gases-summary-"+id}>{name}</a></th><td>{water}</td><td>{liquid}</td></tr>)}</tbody></table>
 <p className="reader-caption">各気体の名前を押すと、詳しい性質と漫画への入口に移動します。</p>
 </LessonSummarySection>
 {READER_GASES.map(([id,name,weight,water,smell,liquid,collection,key,page,experiment,preparation])=><LessonSummarySection key={id} id={"gases-summary-"+id} title={name} page={page} openComic={openComic} extra={<button className="reader-text-link" onClick={e=>openComic(experiment,"gases-summary-"+id,name,e.currentTarget)}>実験を漫画で見る → {experiment}ページ</button>}>
  <p className="reader-key">{key}</p>
  <dl className="reader-properties">{[["見た目","無色"],["空気との軽重",weight],["水への溶けやすさ",water],["におい",smell],["水溶液の液性",liquid],["集め方",collection]].map(([term,value])=><div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
  {preparation&&<p><strong>実験室での作り方：</strong>{preparation}</p>}
 </LessonSummarySection>)}
 <LessonSummarySection id="gases-summary-collect" title="集め方の選び方" openComic={openComic}>
 <LessonFlow label="性質から集め方を選ぶ" items={["まず、水への溶けやすさを確認","水に溶けにくい → 水上置換法","水に溶けやすい → 空気との軽重も確認"]}/>
 <table><caption>空気と置き換えて集める方法</caption><thead><tr><th>空気との軽重</th><th>方法</th><th>このテーマの例</th></tr></thead><tbody><tr><td>空気より重い</td><td>下方置換法</td><td>二酸化炭素</td></tr><tr><td>空気より軽い</td><td>上方置換法</td><td>アンモニア</td></tr></tbody></table>
 <p>二酸化炭素は水に少し溶けますが、水上置換法でも集められます。</p>
 <button className="reader-comic-link" onClick={e=>openComic(6,"gases-summary-collect","集め方の選び方",e.currentTarget)}>二酸化炭素の集め方を漫画で見る →</button>
 <button className="reader-text-link" onClick={e=>openComic(10,"gases-summary-collect","集め方の選び方",e.currentTarget)}>アンモニアの実験を漫画で見る →</button>
 </LessonSummarySection>
 <p className="reader-safety">実験は先生の指示で行います。気体を直接吸い込んだり、直接においをかいだりしません。水素にむやみに火を近づけないでください。</p>
 </>;
}
function LessonReader({topic,children}) {
 const config=LESSON_TOPICS[topic], prefKey="scienceLessonViewV1:"+topic, sessionKey="scienceLessonPositionV1:"+topic;
 const resumePoints=React.useRef({});
 const root=React.useRef(null),bar=React.useRef(null),panels=React.useRef({}),positions=React.useRef({}),linkFocus=React.useRef(null);
 const [storageNotice,setStorageNotice]=React.useState(false);
 const [initial]=React.useState(()=>{
  const hash=decodeURIComponent(location.hash.slice(1));
  const direct=new URLSearchParams(location.search).get("explanation")===topic;
  const comic=direct&&new RegExp("^"+config.prefix+"-(page-\\d+|toc)$").test(hash);
  const summary=direct&&(hash===config.prefix+"-summary"||hash.startsWith(config.prefix+"-summary-"));
  const snapshot=lessonRead(sessionStorage,sessionKey,null);
  const reload=LESSON_RESTORE_PENDING;LESSON_RESTORE_PENDING=false;
  const restoring=reload&&snapshot?.hash===location.hash;
  const mode=restoring?snapshot.mode:comic?"comic":summary?"summary":lessonRead(localStorage,prefKey,"summary");
  positions.current=LESSON_MEMORY.get(topic)?.positions||snapshot?.positions||{};
  const explicit=(comic||summary)&&!(reload&&snapshot?.hash===location.hash);
  resumePoints.current={...positions.current};
  return {mode:mode==="comic"?"comic":"summary",target:explicit?(hash===config.prefix+"-summary"?config.prefix+"-summary-"+config.sections[0][0]:hash):null,reload:reload&&!explicit,returnTo:reload?snapshot?.returnTo:null};
 });
 const [view,setView]=React.useState({mode:initial.mode,target:initial.target,restore:initial.reload,returnTo:initial.returnTo||null,revision:0});
 const current=React.useRef(view);current.current=view;
 const capture=()=>{
  const panel=panels.current[current.current.mode];if(!panel)return null;
  const y=bar.current?.getBoundingClientRect().bottom||0;
  const sections=[...panel.querySelectorAll("section[id]")].filter(e=>e.getClientRects().length);
  const visible=sections.filter(e=>e.getBoundingClientRect().top<=y+5).pop()||sections[0];
  const point={y:window.scrollY,id:visible?.id,offset:visible?.getBoundingClientRect().top||0};
  positions.current[current.current.mode]=point;return point;
 };
 const persist=()=>{
  const state=current.current;
  LESSON_MEMORY.set(topic,{positions:positions.current});
  lessonWrite(sessionStorage,sessionKey,{mode:state.mode,positions:positions.current,returnTo:state.returnTo,hash:location.hash});
 };
 React.useEffect(()=>{
  let timer;
  const savePosition=()=>{clearTimeout(timer);timer=setTimeout(()=>{capture();persist();},120);};
  const saveNow=()=>{capture();persist();};
  window.addEventListener("scroll",savePosition,{passive:true});window.addEventListener("pagehide",saveNow);
  const pop=event=>{const state=event.state?.lessonReader;if(state?.topic===topic){if(state.positions)positions.current={...state.positions};setView(v=>({...state.view,revision:v.revision+1,restore:true}));}};
  window.addEventListener("popstate",pop);
  return ()=>{clearTimeout(timer);saveNow();window.removeEventListener("scroll",savePosition);window.removeEventListener("pagehide",saveNow);window.removeEventListener("popstate",pop);};
 },[]);
 React.useLayoutEffect(()=>{
  const frame=requestAnimationFrame(()=>{
   const panel=panels.current[view.mode];let target=view.target&&panel?.querySelector('[id="'+view.target+'"]');
   if(target){const top=target.getBoundingClientRect().top+scrollY-(bar.current?.offsetHeight||0)-16;window.scrollTo({top,behavior:"instant"});(target.querySelector("h2")||target).focus?.({preventScroll:true});}
   else if(view.restore&&positions.current[view.mode]){const p=positions.current[view.mode],anchor=p.id&&document.getElementById(p.id);window.scrollTo({top:anchor?anchor.getBoundingClientRect().top+scrollY-p.offset:p.y,behavior:"instant"});}
   else window.scrollTo({top:Math.max(0,root.current?.offsetTop-12||0),behavior:"instant"});
   if(view.mode==="summary"&&linkFocus.current){linkFocus.current.focus({preventScroll:true});linkFocus.current=null;}
   capture();persist();
  });
  return ()=>cancelAnimationFrame(frame);
 },[view.mode,view.revision]);
 const navigate=(next,{remember=false}={})=>{
  capture();persist();
  const previous={...current.current,target:null,restore:true};
  history.replaceState({...history.state,lessonReader:{topic,view:previous,positions:{...positions.current}}},"",location.pathname+location.search+(view.mode==="comic"?"#"+config.prefix+"-toc":"#"+config.prefix+"-summary"));
  const updated={...next,revision:current.current.revision+1};
  const hash=next.target||config.prefix+(next.mode==="comic"?"-toc":"-summary");
  history.pushState({...history.state,lessonReader:{topic,view:updated,positions:{...positions.current}}},"",location.pathname+location.search+"#"+hash);
  if(remember&&!lessonWrite(localStorage,prefKey,next.mode))setStorageNotice(true);
  setView(updated);
 };
 const select=mode=>{if(mode===view.mode)return;navigate({mode,target:null,restore:true,returnTo:mode==="summary"?null:view.returnTo},{remember:true});};
 const openComic=(page,id,title,button)=>{
  linkFocus.current=button;
  navigate({mode:"comic",target:config.prefix+"-page-"+page,restore:false,returnTo:{id,title}});
 };
 const backSummary=()=>navigate({mode:"summary",target:null,restore:true,returnTo:null});
 const Summary=config.Summary || (topic==="density"?DensitySummary:topic==="gases"?GasesSummary:OrganicSummary);
 const resume=resumePoints.current[view.mode];
 const jumpTo=id=>{
  const el=document.getElementById(id);if(!el)return;
  el.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"});
  (el.querySelector("h2")||el).focus?.({preventScroll:true});
  history.replaceState(history.state,"",location.pathname+location.search+"#"+id);
 };
 return <article ref={root} className={"lesson-reader reader-"+config.prefix}>
  <header className="reader-heading"><p>中学1年・化学 ／ 身のまわりの物質</p><h1>{config.title}</h1>{config.description&&<p className="reader-scope">{config.description}</p>}</header>
  <div ref={bar} className="reader-toolbar">
   <div className="reader-tabs" role="tablist" aria-label="解説の表示方法">{[["summary","まとめ"],["comic","漫画"]].map(([mode,label])=><button key={mode} id={config.prefix+"-tab-"+mode} type="button" role="tab" aria-selected={view.mode===mode} aria-controls={config.prefix+"-panel-"+mode} tabIndex={view.mode===mode?0:-1} onClick={()=>select(mode)} onKeyDown={event=>{if(["ArrowLeft","ArrowRight","Home","End"].includes(event.key)){event.preventDefault();const next=event.key==="Home"?"summary":event.key==="End"?"comic":mode==="summary"?"comic":"summary";select(next);document.getElementById(config.prefix+"-tab-"+next)?.focus({preventScroll:true});}}}>{label}</button>)}</div>
   {view.mode==="comic"&&view.returnTo&&<button className="reader-return" onClick={backSummary}>← まとめの「{view.returnTo.title}」に戻る</button>}
  </div>
  {storageNotice&&<p role="status">このブラウザーでは表示設定を保存できません。今回は切り替えて読むことができます。</p>}
  <div className="reader-tools">
   <label>項目へ移動 <select aria-label="項目へ移動" value="" onChange={event=>jumpTo(event.target.value)}><option value="">選んで移動</option>{(view.mode==="summary"?config.sections.map(([id,title])=>[config.prefix+"-summary-"+id,title]):config.pages.map(([,title],i)=>[config.prefix+"-page-"+(i+1),(i+1)+" / "+config.pages.length+" "+title])).map(([id,title])=><option key={id} value={id}>{title}</option>)}</select></label>
   {resume&&<button className="reader-text-link" onClick={()=>{positions.current[view.mode]=resume;setView(v=>({...v,target:null,restore:true,revision:v.revision+1}));}}>続きから読む</button>}
  </div>
  <div role="tabpanel" id={config.prefix+"-panel-summary"} aria-labelledby={config.prefix+"-tab-summary"} hidden={view.mode!=="summary"} ref={el=>panels.current.summary=el}><Summary openComic={openComic}/></div>
  <div role="tabpanel" id={config.prefix+"-panel-comic"} aria-labelledby={config.prefix+"-tab-comic"} hidden={view.mode!=="comic"} className="reader-comic-panel" ref={el=>panels.current.comic=el}>
   <p className="reader-comic-hint">全{config.pages.length}ページ。漫画は右から左に読みます。画像をタップすると別タブで拡大できます。</p>{children}
   <div className="reader-comic-end">{view.returnTo?<button className="reader-return" onClick={backSummary}>← まとめの「{view.returnTo.title}」に戻る</button>:<button className="reader-return" onClick={()=>select("summary")}>まとめを見る</button>}</div>
  </div>
 </article>;
}
