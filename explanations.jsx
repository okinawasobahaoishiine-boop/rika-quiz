// Editable page content and code-native illustrations; no raster page images.
const METAL_LESSON_CHAPTERS = ["どう見分ける？", "① 金属光沢", "② 電気伝導性", "③ 熱伝導性", "④ 展性・⑤ 延性", "例外と磁石", "まとめ"];

function LessonDrawing({ label, children, tall = false }) {
  return <svg className="lesson-drawing" viewBox={`0 0 320 ${tall ? 230 : 190}`} role="img" aria-label={label}>{children}</svg>;
}
function LessonMaterialDefs({ id }) {
  return <defs>
    <linearGradient id={`${id}-steel`}><stop stopColor="#52616d"/><stop offset=".18" stopColor="#a8b6c0"/><stop offset=".36" stopColor="#f5fafc"/><stop offset=".49" stopColor="#b9c6cf"/><stop offset=".74" stopColor="#71838f"/><stop offset=".87" stopColor="#d7e1e7"/><stop offset="1" stopColor="#7b8e9c"/></linearGradient>
    <linearGradient id={`${id}-copper`}><stop stopColor="#83411f"/><stop offset=".18" stopColor="#bd7040"/><stop offset=".4" stopColor="#efbb85"/><stop offset=".48" stopColor="#fff0cb"/><stop offset=".58" stopColor="#d68a4d"/><stop offset=".86" stopColor="#a4562b"/><stop offset="1" stopColor="#dc9b65"/></linearGradient>
    <linearGradient id={`${id}-copper-cylinder`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#8d4721"/><stop offset=".25" stopColor="#edb27a"/><stop offset=".43" stopColor="#ffe2b9"/><stop offset=".65" stopColor="#bf7946"/><stop offset="1" stopColor="#7c3b1d"/></linearGradient>
    <linearGradient id={`${id}-dull`} x2="1" y2="1"><stop stopColor="#776351"/><stop offset=".5" stopColor="#a58d74"/><stop offset="1" stopColor="#817363"/></linearGradient>
    <linearGradient id={`${id}-glass`}><stop stopColor="#88afc0" stopOpacity=".55"/><stop offset=".08" stopColor="#fff" stopOpacity=".9"/><stop offset=".23" stopColor="#d9eef5" stopOpacity=".24"/><stop offset=".7" stopColor="#fff" stopOpacity=".08"/><stop offset=".94" stopColor="#b5d7e3" stopOpacity=".55"/><stop offset="1" stopColor="#779eaf" stopOpacity=".7"/></linearGradient>
    <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#ccecf7" stopOpacity=".8"/><stop offset="1" stopColor="#77b7cf" stopOpacity=".65"/></linearGradient>
    <linearGradient id={`${id}-battery`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#171f25"/><stop offset=".18" stopColor="#5a646c"/><stop offset=".32" stopColor="#27343d"/><stop offset=".8" stopColor="#0b1923"/><stop offset="1" stopColor="#53606a"/></linearGradient>
    <linearGradient id={`${id}-wood`}><stop stopColor="#75431f"/><stop offset=".4" stopColor="#c28b51"/><stop offset=".6" stopColor="#ddb27c"/><stop offset="1" stopColor="#8c592c"/></linearGradient>
    <linearGradient id={`${id}-plastic`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#f5f9df" stopOpacity=".8"/><stop offset=".55" stopColor="#bdcf83" stopOpacity=".55"/><stop offset="1" stopColor="#879f45" stopOpacity=".75"/></linearGradient>
    <linearGradient id={`${id}-red`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#efb4ab"/><stop offset=".16" stopColor="#c95245"/><stop offset=".72" stopColor="#9f372e"/><stop offset="1" stopColor="#dd8071"/></linearGradient>
    <linearGradient id={`${id}-blue`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#a4c4dc"/><stop offset=".2" stopColor="#477fa3"/><stop offset=".8" stopColor="#28536e"/><stop offset="1" stopColor="#719fb9"/></linearGradient>
    <radialGradient id={`${id}-bulb`} cx=".4" cy=".35"><stop stopColor="#fffef0"/><stop offset=".55" stopColor="#ffeb9a" stopOpacity=".9"/><stop offset="1" stopColor="#ecc45d" stopOpacity=".45"/></radialGradient>
    <radialGradient id={`${id}-glow`}><stop stopColor="#ffe895" stopOpacity=".75"/><stop offset="1" stopColor="#ffe895" stopOpacity="0"/></radialGradient>
    <radialGradient id={`${id}-sphere-steel`} cx=".3" cy=".25" r=".8"><stop stopColor="#f9fdff"/><stop offset=".3" stopColor="#cddbe4"/><stop offset=".7" stopColor="#9aafbc"/><stop offset="1" stopColor="#4f6878"/></radialGradient>
    <radialGradient id={`${id}-sphere-copper`} cx=".3" cy=".25" r=".8"><stop stopColor="#ffe3bd"/><stop offset=".4" stopColor="#dc9b62"/><stop offset="1" stopColor="#9c4e26"/></radialGradient>
    <pattern id={`${id}-brushed`} width="8" height="4" patternUnits="userSpaceOnUse"><path d="M0 1H8" stroke="#fff" strokeWidth=".4" opacity=".3"/><path d="M0 3H8" stroke="#422811" strokeWidth=".3" opacity=".14"/></pattern>
    <filter id={`${id}-shadow`} x="-30%" y="-30%" width="170%" height="180%"><feDropShadow dx="1" dy="3" stdDeviation="2.2" floodColor="#213c4b" floodOpacity=".2"/></filter>
    <linearGradient id={`${id}-reflection`} x1="0" y1="0" x2="1" y2=".65"><stop stopColor="#fff" stopOpacity="0"/><stop offset=".32" stopColor="#fff" stopOpacity="0"/><stop offset=".43" stopColor="#fff8e6" stopOpacity=".8"/><stop offset=".48" stopColor="#fff" stopOpacity=".95"/><stop offset=".57" stopColor="#fff" stopOpacity=".04"/><stop offset=".8" stopColor="#52311e" stopOpacity=".28"/><stop offset="1" stopColor="#fff" stopOpacity=".15"/></linearGradient>
    <filter id={`${id}-surface`} x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".72 .19" numOctaves="3" seed="14" result="grain"/><feColorMatrix in="grain" type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".12"/></feComponentTransfer><feComposite in2="SourceGraphic" operator="in" result="texture"/><feBlend in="SourceGraphic" in2="texture" mode="multiply"/></filter>
  </defs>;
}
function MaterialDrawing() {
  return <LessonDrawing label="鉄のくぎ・銅の板・アルミニウムの缶と、ガラスのコップ・プラスチックの定規">
    <LessonMaterialDefs id="samples"/>
    <ellipse cx="57" cy="86" rx="20" ry="4" fill="#7a8c95" opacity=".12"/><ellipse cx="160" cy="78" rx="31" ry="5" fill="#7a8c95" opacity=".12"/><ellipse cx="258" cy="84" rx="23" ry="5" fill="#7a8c95" opacity=".13"/>
    <g filter="url(#samples-shadow)"><path d="M49 38H58V77L53.5 86L49 77Z" fill="url(#samples-steel)" stroke="#758490" strokeWidth=".7"/><ellipse cx="53.5" cy="36" rx="15" ry="4.5" fill="url(#samples-steel)" stroke="#8797a2"/><path d="M43 35Q53 32 64 35" stroke="#fff" strokeWidth=".8" fill="none"/></g>
    <g filter="url(#samples-shadow)"><path d="M131 36L180 28L186 69L137 77Z" fill="url(#samples-copper)" stroke="#9c572d" strokeWidth=".7"/><path d="M137 77L186 69L186 73L137 81Z" fill="#914623"/><path d="M131 36L180 28L181 30L132 38Z" fill="#f8d0a0"/><path d="M131 36L180 28L186 69L137 77Z" fill="url(#samples-brushed)"/></g>
    <g filter="url(#samples-shadow)" stroke="#8a9da9" strokeWidth=".8"><rect x="240" y="30" width="37" height="50" rx="5" fill="url(#samples-steel)"/><ellipse cx="258.5" cy="80" rx="18" ry="4" fill="url(#samples-steel)"/><ellipse cx="258.5" cy="30" rx="18.5" ry="5.5" fill="#d9e3e9"/><ellipse cx="258.5" cy="30" rx="15" ry="3.8" fill="#b8c7d0"/><ellipse cx="259" cy="30" rx="6" ry="2" fill="#eef3f6"/><path d="M248 40V70" stroke="#fff" strokeWidth="1.5" opacity=".8"/></g>
    <g fontSize="14" fill="#173043" textAnchor="middle"><text x="53" y="101">鉄</text><text x="157" y="101">銅</text><text x="258" y="101">アルミニウム</text></g>
    <ellipse cx="101" cy="160" rx="24" ry="4" fill="#7a8c95" opacity=".1"/>
    <path d="M77 119L82 153Q101 165 120 153L125 119" fill="url(#samples-glass)" stroke="#89a8b7" strokeWidth="1"/><ellipse cx="101" cy="119" rx="24" ry="5" fill="url(#samples-glass)" stroke="#789aaa" strokeWidth="1.2"/><path d="M83 126L87 151M119 125L115 153" stroke="#fff" strokeWidth="2.5" opacity=".9"/><path d="M83 153Q101 161 119 153" fill="none" stroke="#97bbc9" strokeWidth="2"/>
    <g filter="url(#samples-shadow)"><path d="M177 130L264 125L267 145L180 151Z" fill="url(#samples-plastic)" stroke="#91a568" strokeWidth=".8"/><path d="M180 151L267 145V147L180 153Z" fill="#9eb279"/><path d="M178 131L264 126" stroke="#fff" strokeWidth="1.4"/></g>
    <path d="M188 130V138M200 129V142M212 128V136M224 128V140M236 127V135M248 127V139" stroke="#63823f" strokeWidth="1"/>
    <g fontSize="14" fill="#173043" textAnchor="middle"><text x="101" y="184">ガラス</text><text x="221" y="184">プラスチック</text></g>
  </LessonDrawing>;
}
function LusterDrawing() {
  return <LessonDrawing label="くすんだ金属の表面を磨くと、金属に特有の光沢が現れる比較図">
    <LessonMaterialDefs id="luster"/>
    <ellipse cx="73" cy="123" rx="54" ry="7" fill="#7a8c95" opacity=".12"/><ellipse cx="248" cy="123" rx="54" ry="7" fill="#7a8c95" opacity=".12"/>
    <g filter="url(#luster-shadow)"><path d="M20 50L112 42L125 107L32 119Z" fill="url(#luster-dull)" stroke="#796456" strokeWidth=".7"/><path d="M32 119L125 107V113L32 125Z" fill="#70503a"/><path d="M20 50L112 42L114 48L22 56Z" fill="#b09a80"/></g>
    <path d="M32 67L103 60M37 83L109 74M41 100L113 93" stroke="#c5b8a3" strokeWidth=".8" opacity=".55"/>
    <path d="M140 83H177M168 74L179 83L168 92" fill="none" stroke="#08766b" strokeWidth="4" strokeLinecap="round"/>
    <g filter="url(#luster-shadow)"><path d="M195 50L287 42L300 107L207 119Z" fill="url(#luster-copper)" stroke="#9d5c33" strokeWidth=".7"/><path d="M207 119L300 107V113L207 125Z" fill="#8d461f"/><path d="M195 50L287 42L289 46L197 54Z" fill="#f8d1a5"/><path d="M195 50L287 42L300 107L207 119Z" fill="url(#luster-brushed)"/></g>
    <path d="M207 118L299 106M197 51L286 43" stroke="#ffe7c4" strokeWidth="1.4" opacity=".9"/>
    <path d="M20 50L112 42L125 107L32 119Z" fill="url(#luster-dull)" filter="url(#luster-surface)" opacity=".65"/>
    <path d="M195 50L287 42L300 107L207 119Z" fill="url(#luster-reflection)"/>
    <path d="M202 62L289 53M205 77L292 68M210 100L297 89" stroke="#fff0d4" strokeWidth=".35" opacity=".65"/>
    <path d="M208 121L298 110" stroke="#562c18" strokeWidth=".6" opacity=".7"/>
    <g fontSize="16" fill="#173043" textAnchor="middle"><text x="72" y="155">磨く前</text><text x="248" y="155">磨いたあと</text></g>
    <text x="160" y="184" fontSize="14" fill="#526777" textAnchor="middle">同じ金属でも、表面の状態で見え方が違う</text>
  </LessonDrawing>;
}
function ConductivityDrawing({ metal }) {
  return <LessonDrawing label={`電池・試料・豆電球を直列につないだ回路。${metal ? "金属の銅では豆電球がつく" : "非金属のガラスでは豆電球がつかない"}`}>
    <LessonMaterialDefs id="circuit"/>
    {metal && <circle cx="266" cy="63" r="40" fill="url(#circuit-glow)"/>}
    <path d="M108 46H51Q32 46 32 67V118Q32 136 51 136H90" fill="none" stroke="#ab302b" strokeWidth="5" strokeLinecap="round"/>
    <path d="M108 45H51Q33 45 33 67V118Q33 135 51 135H90" fill="none" stroke="#ef8d7c" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M224 136H241Q252 136 252 125V96M280 96H286Q300 96 300 82V62Q300 46 284 46H206" fill="none" stroke="#26343d" strokeWidth="5" strokeLinecap="round"/>
    <path d="M225 135H241Q251 135 251 125V97M280 95H286Q299 95 299 82V62Q299 47 284 47H206" fill="none" stroke="#89939a" strokeWidth="1" strokeLinecap="round"/>
    <g filter="url(#circuit-shadow)"><rect x="112" y="26" width="90" height="40" rx="6" fill="url(#circuit-battery)" stroke="#465762" strokeWidth=".8"/><path d="M113 32Q113 26 119 26H136V66H119Q113 66 113 60Z" fill="url(#circuit-copper)"/><ellipse cx="109" cy="46" rx="3" ry="8" fill="url(#circuit-steel)"/><ellipse cx="204" cy="46" rx="2.5" ry="8" fill="url(#circuit-steel)"/><path d="M140 31H194" stroke="#d2dbe0" strokeWidth=".7" opacity=".6"/></g>
    <g fontSize="18" fill="#fff" textAnchor="middle"><text x="125" y="53" fill="#3e332a">＋</text><text x="185" y="53">−</text></g>
    <g filter="url(#circuit-shadow)"><path d="M90 127L221 124L225 140L92 145Z" fill={`url(#circuit-${metal ? "copper" : "glass"})`} stroke={metal ? "#aa693d" : "#94b2c0"} strokeWidth=".8"/><path d="M92 145L225 140V143L92 148Z" fill={metal ? "#934b25" : "#bdd3dc"}/><path d="M95 128L219 125" stroke="#fff" opacity=".7" strokeWidth="1.2"/></g>
    <g stroke="#738691" strokeWidth="1"><path d="M81 132L96 129L98 134L82 140Z" fill="url(#circuit-steel)"/><path d="M219 129L235 132L234 140L218 135Z" fill="url(#circuit-steel)"/></g><path d="M75 135L84 135" stroke="#b5302b" strokeWidth="8" strokeLinecap="round"/><path d="M234 135L242 135" stroke="#26343d" strokeWidth="8" strokeLinecap="round"/>
    <g filter="url(#circuit-shadow)"><ellipse cx="266" cy="100" rx="24" ry="8" fill="#c4bca8"/><path d="M242 94V100Q266 111 290 100V94Z" fill="#d9d2c2"/><ellipse cx="266" cy="94" rx="24" ry="7" fill="#f4eee1" stroke="#b7ad98" strokeWidth=".8"/></g>
    <path d="M266 40C242 40 240 63 252 77L256 85H276L280 77C293 63 290 40 266 40Z" fill={`url(#circuit-${metal ? "bulb" : "glass"})`} stroke={metal ? "#c39645" : "#9bb3bf"} strokeWidth="1"/>
    <path d="M255 46Q246 52 251 63" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".9"/>
    <path d="M252 96L258 82L259 68L262 61L265 68L268 61L271 68L274 82L280 96" fill="none" stroke={metal ? "#dd8b15" : "#677b86"} strokeWidth={metal ? 1.6 : 1.1}/>
    <rect x="256" y="81" width="20" height="12" rx="2" fill="url(#circuit-steel)" stroke="#8b998f" strokeWidth=".7"/><path d="M257 84H275M257 87H275M257 90H275" stroke="#697c87" strokeWidth=".8"/>
    <circle cx="252" cy="96" r="3.5" fill="url(#circuit-copper)" stroke="#926c35"/><circle cx="280" cy="96" r="3.5" fill="url(#circuit-copper)" stroke="#926c35"/>
    <g fontSize="14" fill="#173043" textAnchor="middle"><text x="157" y="93">乾電池</text><text x="157" y="174">{metal ? "試料：金属（銅）" : "試料：非金属（ガラス）"}</text></g>
  </LessonDrawing>;
}
function HeatDrawing() {
  return <LessonDrawing tall label="同じ温度の湯に棒を入れた模式図。金属では長く太い矢印が持ち手側まで伸び、非金属では短い矢印が下端付近にとどまる">
    <LessonMaterialDefs id="heat"/>
    <defs><marker id="lesson-metal-heat" markerWidth="3" markerHeight="3" refX="2.4" refY="1.5" orient="auto"><path d="M0 0L3 1.5L0 3Z" fill="#d44532"/></marker><marker id="lesson-nonmetal-heat" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto"><path d="M0 0L4 2L0 4Z" fill="#d68b23"/></marker></defs>
    {[0,150].map((offset,i)=><g key={offset} transform={`translate(${offset} 0)`}>
      <ellipse cx="84" cy="181" rx="51" ry="7" fill="#53798a" opacity=".12"/>
      <path d="M34 91V169Q84 189 134 169V91" fill="url(#heat-glass)" stroke="#8aabba" strokeWidth="1"/>
      <ellipse cx="84" cy="91" rx="50" ry="8" fill="#f5fbfe" fillOpacity=".35" stroke="#a7c4d0" strokeWidth="1"/>
      <path d="M37 122V167Q84 183 131 167V122Z" fill="url(#heat-water)"/>
      <ellipse cx="84" cy="122" rx="47" ry="7" fill="#d4eef7" fillOpacity=".65" stroke="#8bb7c8" strokeWidth=".8"/>
      <path d="M93 158L108 32" stroke={i===0 ? "#a5683c" : "#92adba"} strokeWidth="13" strokeLinecap="round"/>
      <path d="M93 158L108 32" stroke={`url(#heat-${i===0 ? "copper" : "glass"})`} strokeWidth="11.5" strokeLinecap="round"/>
      <path d="M90 155L105 34" stroke={i===0 ? "#ffe1b3" : "#fff"} strokeWidth="2.3" strokeLinecap="round" opacity=".75"/>
      <ellipse cx="108" cy="32" rx="6" ry="3" fill={i===0 ? "#d79964" : "#dbedf5"} stroke={i===0 ? "#a9663b" : "#a3bfcd"} strokeWidth=".7"/>
      <path d="M34 94V169Q84 189 134 169V94" fill="url(#heat-glass)" stroke="#9fbcc9" strokeWidth=".8"/>
      <path d="M41 103V161M128 104V164" stroke="#fff" strokeWidth="2.3" opacity=".85"/>
      <path d="M45 105L47 160M122 109L123 164" stroke="#fff" strokeWidth=".6" opacity=".7"/>
      <path d="M43 168Q84 181 125 168" fill="none" stroke="#6196aa" strokeWidth="1" opacity=".65"/>
      <path d="M50 173Q84 181 118 173" fill="none" stroke="#fff" strokeWidth="1.6" opacity=".85"/>
      <ellipse cx="84" cy="122" rx="43" ry="5.4" fill="none" stroke="#fff" strokeWidth=".7" opacity=".55"/>
      <path d="M37 112H48M37 132H48M37 152H48M37 122H43M37 142H43" stroke="#7c9aa8" strokeWidth=".8" opacity=".7"/>
      <ellipse cx="84" cy="91" rx="50" ry="8" fill="none" stroke="#789cab" strokeWidth="1.4"/>
      <path d="M37 93Q84 108 131 93M39 169Q84 183 129 169" fill="none" stroke="#e9f6fb" strokeWidth="2"/>
      <path d={i===0 ? "M116 152L129 48" : "M116 153L119 132"} stroke={i===0 ? "#d44532" : "#d68b23"} strokeWidth={i===0 ? 7 : 3} markerEnd={`url(#${i===0 ? "lesson-metal-heat" : "lesson-nonmetal-heat"})`}/>
      <g fontSize="14" fill="#173043" textAnchor="middle"><text x="84" y="18">持ち手側</text><text x="70" y="156">湯</text><text x="84" y="211">{i===0 ? "金属（銅）" : "非金属（ガラス）"}</text></g>
    </g>)}
  </LessonDrawing>;
}
function ShapeDrawing() {
  return <LessonDrawing tall label="展性はたたくと薄く広がる性質。延性は引っ張ると細い線に伸びる性質。金型を通して細い線にする模式図">
    <LessonMaterialDefs id="shape"/>
    <ellipse cx="60" cy="82" rx="36" ry="5" fill="#697d89" opacity=".12"/>
    <g filter="url(#shape-shadow)"><path d="M25 48L78 40L90 69L37 78Z" fill="url(#shape-copper)" stroke="#a66133" strokeWidth=".7"/><path d="M37 78L90 69V77L37 86Z" fill="#92502a"/><path d="M25 48L37 78V86L25 56Z" fill="#b57143"/></g>
    <g transform="rotate(-25 64 27)" filter="url(#shape-shadow)"><path d="M64 27L97 66" stroke="url(#shape-wood)" strokeWidth="9" strokeLinecap="round"/><rect x="43" y="15" width="42" height="21" rx="3" fill="url(#shape-steel)" stroke="#70828e" strokeWidth=".8"/><path d="M46 18H82" stroke="#fff" strokeWidth="1" opacity=".8"/></g>
    <path d="M111 60H150M140 50L151 60L140 70" stroke="#08766b" strokeWidth="4" fill="none"/>
    <g filter="url(#shape-shadow)"><path d="M180 55L285 46L296 55L191 65Z" fill="url(#shape-copper)" stroke="#ad7045" strokeWidth=".8"/><path d="M191 65L296 55V58L191 68Z" fill="#96512b"/><path d="M180 55L285 46" stroke="#ffe2b7" strokeWidth="1.3"/></g>
    <path d="M180 55L285 46L296 55L191 65Z" fill="url(#shape-reflection)"/>
    <path d="M193 56L216 53L225 57L248 51L272 53L285 49M206 61L225 57L242 60L263 54L286 56" fill="none" stroke="#ffe2c0" strokeWidth=".6" opacity=".7"/>
    <path d="M31 54L43 51L51 58L69 49L82 54M39 67L51 58L62 68L80 60" fill="none" stroke="#ffcc99" strokeWidth=".8" opacity=".6"/>
    <g fill="#173043" fontSize="14" textAnchor="middle"><text x="56" y="101">かたまり</text><text x="235" y="101">薄い板・箔</text></g>
    <path d="M25 118H295" stroke="#d9e4eb"/>
    <g filter="url(#shape-shadow)"><rect x="26" y="155" width="119" height="24" rx="3" fill="url(#shape-copper-cylinder)" stroke="#a36337" strokeWidth=".8"/><ellipse cx="26" cy="167" rx="4" ry="12" fill="#be8050"/>
    <path d="M132 143L158 139L165 187L139 193Z" fill="url(#shape-steel)" stroke="#798e9c" strokeWidth=".8"/><path d="M158 139L166 134L172 181L165 187Z" fill="#758a98"/><ellipse cx="147" cy="167" rx="12" ry="6" fill="#344b5a"/><rect x="147" y="164.5" width="143" height="5" rx="2.5" fill="url(#shape-copper-cylinder)"/><path d="M149 166H289" stroke="#f7c798" strokeWidth="1"/></g>
    <path d="M208 140H274M265 132L276 140L265 148" stroke="#08766b" strokeWidth="3" fill="none"/>
    <g fill="#173043" fontSize="14" textAnchor="middle"><text x="145" y="218">金型</text><text x="242" y="193">細い線</text><text x="237" y="127">引っ張る</text></g>
  </LessonDrawing>;
}
function MagnetDrawing() {
  return <LessonDrawing label="鉄・銅・アルミニウムに磁石を近づけた比較。この3つでは鉄が磁石につき、銅とアルミニウムはつかない">
    <LessonMaterialDefs id="magnet"/>
    {[0,100,200].map((offset,i)=><g key={i} transform={`translate(${offset} 0)`}>
      <g filter="url(#magnet-shadow)"><path d="M26 28L79 23L87 27L34 32Z" fill="#b4c3cd"/><rect x="26" y="28" width="29" height="32" rx="1.5" fill="url(#magnet-red)"/><rect x="55" y="28" width="29" height="32" rx="1.5" fill="url(#magnet-blue)"/><path d="M84 28L88 25V56L84 60Z" fill="#294c65"/><path d="M28 30H82" stroke="#fff" strokeWidth="1" opacity=".65"/></g>
      <g fill="#fff" fontSize="15" textAnchor="middle"><text x="40" y="50">N</text><text x="69" y="50">S</text></g>
      <g filter="url(#magnet-shadow)"><circle cx="55" cy={i===0 ? 73 : 110} r="13" fill={`url(#magnet-sphere-${i===1 ? "copper" : "steel"})`} stroke={i===1 ? "#a16b43" : "#8195a1"} strokeWidth=".7"/><path d={`M48 ${i===0 ? 66 : 103}Q52 ${i===0 ? 61 : 98} 59 ${i===0 ? 64 : 101}`} stroke="#fff" strokeWidth="1.5" opacity=".7" fill="none"/></g>
      <g fill="#173043" fontSize="13" textAnchor="middle"><text x="55" y="147">{["鉄","銅","アルミニウム"][i]}</text><text x="55" y="174">{i===0 ? "つく" : "つかない"}</text></g>
    </g>)}
  </LessonDrawing>;
}

const METAL_SECTION_IDS = ["metal-introduction", "metal-luster", "metal-electricity", "metal-heat", "metal-shaping", "metal-exceptions", "metal-summary"];
function scrollToLessonAnchor(event, id) {
  if (event && (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)) return;
  event?.preventDefault();
  const target = document.getElementById(id);
  if (!target) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.querySelector("h2")?.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
  window.history.replaceState(window.history.state, "", `#${id}`);
}
function MetalLessonSection({ id, title, children }) {
  return <section id={id} className="lesson-section" aria-labelledby={`${id}-heading`}>
    <h2 id={`${id}-heading`} tabIndex={-1}>{title}</h2>
    <div className="lesson-content">{children}</div>
    <a className="lesson-back-to-toc" href="#metal-toc" onClick={event=>scrollToLessonAnchor(event,"metal-toc")}>目次へ戻る ↑</a>
  </section>;
}
function MetalExplanation() {
  const [metal, setMetal] = React.useState(true);
  React.useEffect(()=>{
    const oldChapter = Math.floor(Math.min(6, Math.max(0, Number(new URLSearchParams(window.location.search).get("chapter")) || 0)));
    const id = window.location.hash.slice(1) || (oldChapter ? METAL_SECTION_IDS[oldChapter] : "");
    if (!id || ![...METAL_SECTION_IDS,"metal-toc"].includes(id)) return;
    const frame = requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({behavior:"instant",block:"start"}));
    return ()=>cancelAnimationFrame(frame);
  },[]);
  return <article className="metal-lesson">
    <header className="lesson-heading">
      <p className="eyebrow">中学1年・化学 ／ 身のまわりの物質</p>
      <h1>金属と非金属</h1>
      <p className="lesson-format">文章と簡単な図で読む解説</p>
    </header>
    <section id="metal-toc" className="lesson-toc" aria-labelledby="metal-toc-heading"><h2 id="metal-toc-heading" tabIndex={-1}>目次</h2><p>タップすると、その解説まで移動します。</p><nav aria-label="解説の目次">{METAL_LESSON_CHAPTERS.map((title,index)=><a key={title} href={`#${METAL_SECTION_IDS[index]}`} onClick={event=>scrollToLessonAnchor(event,METAL_SECTION_IDS[index])}>{title}</a>)}</nav></section>
    <div className="lesson-sections">
      <MetalLessonSection id="metal-introduction" title="どう見分ける？">
        <p className="lesson-lead">鉄・銅・アルミニウムは金属。ガラスやプラスチックは、非金属の材料の例です。</p>
        <figure><MaterialDrawing/><figcaption>色や見た目だけでなく、物質の性質を比べてみよう。</figcaption></figure>
        <div className="lesson-key"><strong>1つの特徴だけでは決めない。</strong><p>ガラスも光を反射します。磁石につかない金属もあります。いくつかの性質を組み合わせて判断しましょう。</p></div>
        <p>これから、金属光沢・電気伝導性・熱伝導性・展性・延性を、実験や身近な例で確認します。</p>
        <p className="lesson-note">ここでの「非金属」は金属以外の物質・材料を指します。ガラスやプラスチックは、非金属元素そのものの名前ではありません。</p>
      </MetalLessonSection>
      <MetalLessonSection id="metal-luster" title="① 金属光沢">
        <p className="lesson-lead">金属の表面を磨くと、金属に特有の光沢が現れます。これが<strong>金属光沢</strong>です。</p>
        <figure><LusterDrawing/><figcaption>くすんだ銅も、表面を磨くと特有の光沢が現れる。</figcaption></figure>
        <div className="lesson-key"><strong>金属光沢＝金属に特有の光沢</strong><p>銅は赤褐色、アルミニウムは銀白色。金属だから全部同じ色、というわけではありません。</p></div>
        <p>ガラスやプラスチックにも表面の反射はあります。「光っているから金属」とは決めず、ほかの性質も確かめます。</p>
      </MetalLessonSection>
      <MetalLessonSection id="metal-electricity" title="② 電気伝導性">
        <p className="lesson-lead">回路の途中に試料を入れ、<strong>豆電球がつくか</strong>を調べる実験です。</p>
        <div className="lesson-switch" role="group" aria-label="回路に入れる試料"><button type="button" aria-pressed={metal} onClick={()=>setMetal(true)}>金属（銅）</button><button type="button" aria-pressed={!metal} onClick={()=>setMetal(false)}>非金属（ガラス）</button></div>
        <figure><ConductivityDrawing metal={metal}/><figcaption aria-live="polite">{metal ? "銅は電気を通すので、電流が流れて豆電球がつく。" : "ガラスは電気を通しにくいので、豆電球がつかない。"}</figcaption></figure>
        <ol className="lesson-steps"><li>乾電池・豆電球・導線で、試料を入れる部分がある回路を作る。</li><li>2つのクリップの間に試料をはさむ。</li><li>試料だけを取り替え、豆電球の点灯を比べる。</li></ol>
        <div className="lesson-key"><strong>金属は電気伝導性が高い。</strong><p>電気を通しやすいため、銅やアルミニウムは電線などに使われます。電気の通しやすさを表す量を<strong>電気伝導率</strong>といいます。</p></div>
        <p className="lesson-note">この模式図の実験は「電気を通すか」を確かめるもの。伝導率の数値を測っているわけではありません。電池を導線だけで直接つなぐ短絡はしません。</p>
      </MetalLessonSection>
      <MetalLessonSection id="metal-heat" title="③ 熱伝導性">
        <p className="lesson-lead">金属は、温めた部分から離れた<strong>持ち手側まで熱が伝わりやすい</strong>物質です。</p>
        <figure><HeatDrawing/><figcaption>同じ温度の湯・同じ太さと長さの棒・同じ時間で比較した模式図。矢印は熱が伝わる様子を表す。</figcaption></figure>
        <div className="lesson-compare"><section><h3>金属</h3><p>長く太い矢印が持ち手側まで伸びる。<strong>熱伝導性が高い。</strong></p></section><section><h3>非金属（ガラス）</h3><p>矢印は下端付近に短くとどまる。金属より熱が伝わりにくい。</p></section></div>
        <div className="lesson-key"><strong>熱伝導率＝物質の熱の伝わりやすさを表す量</strong><p>熱いスープに入れた金属スプーンでは、スープにつかっていない持ち手も熱くなることがあります。</p></div>
        <p className="lesson-note">非金属に「全く熱が伝わらない」という意味ではありません。この図は銅とガラスの比較であり、非金属にも熱をよく伝えるものがあります。熱い棒を手で触って確かめないでください。</p>
      </MetalLessonSection>
      <MetalLessonSection id="metal-shaping" title="④ 展性・⑤ 延性">
        <p className="lesson-lead">金属は、力を加えると<strong>薄い板や細い線に加工できる</strong>という性質があります。</p>
        <figure><ShapeDrawing/><figcaption>上：たたいて薄い板にする。下：金型を通して引っ張り、細い線にする模式図。</figcaption></figure>
        <div className="lesson-compare"><section><h3>④ 展性</h3><p>たたくと<strong>薄く広がる</strong>性質。アルミニウム箔などに利用。</p></section><section><h3>⑤ 延性</h3><p>引っ張ると<strong>細く伸びる</strong>性質。銅線などに利用。</p></section></div>
        <div className="lesson-key"><strong>展性は「板」、延性は「線」。</strong><p>線を巻いた状態からほどくことではなく、材料そのものを細く加工できる性質です。</p></div>
      </MetalLessonSection>
      <MetalLessonSection id="metal-exceptions" title="例外と磁石">
        <p className="lesson-lead">「磁石につくか」だけでは、金属かどうかは決められません。</p>
        <figure><MagnetDrawing/><figcaption>鉄・銅・アルミニウムの3種類を比べると、磁石につくのは鉄。</figcaption></figure>
        <div className="lesson-key"><strong>銅やアルミニウムも金属。でも、磁石にはつかない。</strong><p>鉄のほかに、ニッケルやコバルトも磁石につきます。「金属は全部つく」「鉄だけがつく」のどちらも正確ではありません。</p></div>
        <section className="lesson-exception"><h3>黒鉛は非金属。でも電気を通す。</h3><p>電気を通すから必ず金属、ともいえません。例外もあるため、複数の性質を組み合わせて判断します。</p></section>
      </MetalLessonSection>
      <MetalLessonSection id="metal-summary" title="まとめ">
        <p className="lesson-lead">専門用語と、何ができる性質なのかをセットにしよう。</p>
        <dl className="lesson-summary">{[["① 金属光沢","磨くと、金属に特有の光沢が現れる。"],["② 電気伝導性","電気を通しやすい。電気伝導率が高い。"],["③ 熱伝導性","熱を伝えやすい。持ち手側まで熱が伝わりやすい。"],["④ 展性","たたくと、薄く広がる。"],["⑤ 延性","引っ張ると、細く伸びる。"]].map(([term,meaning])=><div key={term}><dt>{term}</dt><dd>{meaning}</dd></div>)}</dl>
        <div className="lesson-key"><strong>複数の性質で判断する。</strong><p>磁石につくのは一部の金属。非金属の黒鉛も電気を通します。1つの結果だけで決めないことが大切です。</p></div>
        <p>「金属の性質を1つ説明して」と聞かれたら、専門用語だけでなく、その意味や使われ方まで説明してみましょう。</p>
      </MetalLessonSection>
    </div>
    <p className="lesson-note">簡単な図解付きのページ版です。既存の漫画とは別に、文章・図の配置を調整できる形で制作しています。</p>
  </article>;
}
