import{$t as e,I as t,It as n,J as r,M as i,Mt as a,T as o,W as s,Z as c,at as l,bt as u,en as d,it as f,tn as p}from"./engine-B65TxLfy.js";import{m}from"./material-facts-C2VpmU0J.js";import{A as h,I as g,N as _,O as v,P as y,S as b,T as x,b as S,j as C,m as w,x as T}from"./index-CClgDNg9.js";var E=[`PLA`,`PETG`,`ABS`,`ASA`,`PC`],ee=100;function D(c,w,D){let{db:M,scenario:N}=w,P=N.shortlist.map(e=>M.materials.find(t=>t.id===e)).filter(Boolean),F=w.baseline&&!N.shortlist.includes(w.baseline)?M.materials.find(e=>e.id===w.baseline):null,I=F?[...P,F]:P,L=e=>F&&e.id===F.id,R=new Map;for(let e of M.grades)!e.retired&&m(e)&&R.set(e.materialId,(R.get(e.materialId)??0)+1);let z=e=>R.get(e.id)??0;if(P.length===0||P.length===1&&!F){c.innerHTML=`<div class="empty">
      <h3>${P.length?`Add a second material, or compare against one you know`:`Shortlist materials to compare them`}</h3>
      <p>Use the star in the results table, or open any material and press <b>Shortlist</b>.
      ${P.length===1?`<strong>${S(P[0].name)}</strong> is shortlisted so far.`:``}</p>
      ${P.length===1?`<label class="baseline-pick">Compare it against
        <select data-baseline><option value="">choose a material</option>
        ${E.map(e=>M.materials.find(t=>t.name===e)).filter(e=>e&&e.id!==P[0].id).map(e=>`<option value="${S(e.id)}">${S(e.name)}</option>`).join(``)}</select></label>`:``}</div>`,c.querySelector(`[data-baseline]`)?.addEventListener(`change`,e=>D.setBaseline(e.target.value));return}let B=N.constraints.length>0,V=e=>w.selection.evaluations.find(t=>t.materialId===e.id),H=new Map(M.grades.map(e=>[e.id,e])),U=e=>B?(V(e)?.products??[]).filter(e=>e.verdict===`PASS`).map(e=>H.get(e.gradeId)).filter(Boolean):[],W=e=>{if(!B)return``;let t=V(e);if(!t)return``;let n=[...t.failed,...t.unresolved].map(e=>`${s(e.constraint)}: ${e.reason}`).join(`
`);return b(S(t.verdict),n||`Meets every requirement`,{cls:`chip chip-${t.verdict}`,head:`${e.name}: ${t.verdict}`})},G=w.ctx?.showEstimates,K=(e,t)=>{let n=e.headline[t];return!n?.known&&G&&n?.estimate?n.estimate:null},q=M.materials.filter(e=>!e.familyEntry),J=e=>{let t=[];for(let n of q){let r=n.headline[e];r?.known?t.push(r.value,r.interval?.lo,r.interval?.hi):G&&r?.estimate&&t.push(r.estimate.lo,r.estimate.hi,r.estimate.plausible?.lo,r.estimate.plausible?.hi)}let n=t.filter(Number.isFinite);return n.length?{lo:Math.min(...n),hi:Math.max(...n)}:null},Y=[],te=o.map(e=>{let t=I.map(t=>t.headline[e.key]),n=t.filter(e=>e?.known).map(e=>e.value),i=I.map(t=>K(t,e.key)).filter(Boolean),a=t.filter(e=>e&&!e.known&&e.related);if(!n.length&&!i.length&&!a.length)return`<div class="cmp-prop"><h4>${S(l(e.key).plain)} <span class="unit">${S(e.unit)}</span></h4>
        <div class="gap">Not published for any shortlisted material.</div></div>`;let o=N.constraints.filter(t=>t.kind===`numeric`&&t.property===e.key&&Number.isFinite(t.value)),c=J(e.key),d=[c?.lo,c?.hi,...n,...a.map(e=>e.related.best.value),...o.map(e=>e.value),...t.flatMap(e=>e?.known?[e.interval?.lo,e.interval?.hi]:[]),...i.flatMap(e=>[e.lo,e.hi,e.centre,e.plausible?.lo,e.plausible?.hi])].filter(Number.isFinite),f=!!c&&c.lo>0&&c.hi/c.lo>ee&&d.every(e=>e>0),p=f?Math.log10:e=>e,m=c?p(c.hi)-p(c.lo):0,g=e=>!c||p(e)>=p(c.lo)-m&&p(e)<=p(c.hi)+m,v=[...a.map(e=>e.related.best.value),...o.map(e=>e.value).filter(g),...t.flatMap(e=>e?.spread?[e.spread.min,e.spread.max]:[])],y=Math.min(c?.lo??1/0,...n,...v),E=Math.max(c?.hi??-1/0,...n,...v),D=c&&(y<c.lo||E>c.hi),O=o.some(e=>e.value<y||e.value>E),k=p(E)-p(y)||Math.abs(p(E))||1,A=e=>f&&!(e>0)?0:Math.max(0,Math.min(100,(p(e)-p(y))/k*100)),j=o.map(e=>`<span class="cmp-threshold${e.mandatory===!1?` tracked`:``}${e.value<y||e.value>E?` beyond`:``}" style="left:${A(e.value)}%"></span>`).join(``),M=I.map(t=>{let n=t.headline[e.key];return n?.known?[n.direction&&n.direction!==`not-applicable`?n.direction:null,n.specimenType?.startsWith(`Not published`)?`specimen not stated`:n.specimenType,n.loadStated===!1?`load not stated`:null].filter(Boolean).join(` · `):null}),P=new Set(M.filter(Boolean)).size>1;return f&&Y.push(u(l(e.key).plain)),`<div class="cmp-prop${f?` log-track`:``}">
      <h4 title="${S(l(e.key).technical)}">${S(l(e.key).plain)} <span class="unit">${S(e.unit)}</span>${o.length?`<span class="cmp-req">${o.map(e=>`<span class="cmp-req-item"><i class="cmp-req-mark${e.mandatory===!1?` tracked`:``}" aria-hidden="true"></i>${S(s(e))}${e.mandatory===!1?` (reported, not required)`:``}</span>`).join(` `)}</span>`:``}</h4>
      ${I.map(t=>{let n=t.headline[e.key],i=`${S(t.name)}${L(t)?` <span class="anchor-tag">baseline</span>`:``}`;if(!n?.known){let a=K(t,e.key);if(n?.notApplicable)return`<div class="cmp-bar${L(t)?` anchor`:``}"><span>${i}</span>
              <span>${b(`not applicable`,`Not applicable. ${n.notApplicable.reason}`,{cls:`missing`,head:`Not applicable`})}</span><span></span></div>`;if(n?.related&&!a){let e=n.related.best;return`<div class="cmp-bar cmp-related${L(t)?` anchor`:``}">
              <span>${i}</span>
              <span class="track">${j}<span class="related-tick" style="left:${A(e.value)}%"></span></span>
              <span class="val">${_(n,{products:z(t)})}</span></div>`}if(!a)return`<div class="cmp-bar${L(t)?` anchor`:``}"><span>${i}</span>
              <span>${b(S(h(n)),C(n),{cls:`missing`,head:h(n)})}</span><span></span></div>`;let o=A(a.lo),s=Math.max(A(a.hi)-o,1.5),c=a.plausible?`<span class="est-wide" style="left:${A(a.plausible.lo)}%;width:${Math.max(A(a.plausible.hi)-A(a.plausible.lo),1.5)}%"></span>`:``,l=r(a,T(a,{ownUnit:!0}),{productless:!w.ctx?.productsByMaterial?.get(t.id)?.length}),u=T(a);return`<div class="cmp-bar estimated${L(t)?` anchor`:``}" title="${S(l)}">
            <span>${i}</span>
            <span class="track">${c}<span class="est-span" style="left:${o}%;width:${s}%"></span><span class="est-centre" style="left:${A(a.centre)}%"></span>${j}</span>
            <span class="val">${b(`~${u.lo}–${u.hi}<span class="est-mark">†</span>`,l,{cls:`est est-${a.precision}`,head:`Estimate, not a measurement`,action:`estimate`,id:t.id})}</span></div>`}let a=n.spread&&n.spread.n>1?`<span class="bounds spread-bounds" title="${S(`Its ${n.spread.n} products range from ${x(n.spread.min)} to ${x(n.spread.max)}`)}" style="left:${A(n.spread.min)}%;width:${Math.max(A(n.spread.max)-A(n.spread.min),1)}%"></span>`:n.interval&&n.interval.lo!==n.interval.hi&&n.interval.lo!==null&&n.interval.hi!==null?`<span class="bounds" style="left:${A(n.interval.lo)}%;width:${A(n.interval.hi)-A(n.interval.lo)}%"></span>`:``;return`<div class="cmp-bar${L(t)?` anchor`:``}">
          <span>${i}</span>
          <span class="track">${f?`<span class="value-tick" style="left:${A(n.value)}%"></span>`:`<span class="fill" style="width:${A(n.value)}%"></span>`}${a}${j}</span>
          <span class="val">${_(n,{products:z(t)})}</span></div>`}).join(``)}
      <div class="cmp-bar cmp-axis">
        <span></span>
        <span class="cmp-scale${f?` log`:``}"><span>${S(x(y))}</span>${f?`<span class="cmp-scale-kind">log scale</span>`:``}<span>${S(x(E))}</span></span>
        <span class="cmp-scale-note">${O?`requirement past the end`:D?o.some(e=>e.value<c.lo||e.value>c.hi)?`widened to the requirement`:`widened to a value shown`:`all ${q.length} materials`}</span>
      </div>
      <div class="cmp-cond">${M.map((e,t)=>e?`${S(I[t].name)}: ${S(e)}`:``).filter(Boolean).join(` | `)}
        ${P?`<span class="differ"> — conditions differ across columns</span>`:``}</div>
    </div>`}).join(``),ne=I.some(e=>o.some(t=>!e.headline[t.key]?.known&&e.headline[t.key]?.related)),re=I.some(e=>o.some(t=>{let n=e.headline[t.key]?.interval;return e.headline[t.key]?.known&&n&&n.lo!==n.hi})),X=N.constraints.filter(e=>e.mandatory!==!1),ie=e=>{let t=e.filter(e=>e.kind===`gate`&&[`nozzle`,`bed`,`chamber`].includes(e.gate));return t.length<3?e.map(e=>S(s(e))):e.flatMap(e=>t.includes(e)?e===t[0]?[S(i)]:[]:[S(s(e))])},Z=N.constraints.filter(e=>e.mandatory===!1),ae=`<div class="cmp-context">
      <div><b>Requirements:</b> ${X.length?ie(X).join(`; `):`none set yet, so no result is shown`}${Z.length?`. <b>Reported, not required:</b> ${Z.map(e=>S(s(e))).join(`; `)}`:``}.</div>
      <div class="fine">${N.template?`Template: ${S(N.template)}. `:``}${t}: ${f(N.unknownPolicy)}${G?`; estimates and resin data on, which never pass a material and hide one only where resin data reports its polymer attacked or the material has no product on record`:``}.
        Release ${S(M.meta.release?.id??`unidentified`)}, data of ${S(M.meta.snapshot)}, build ${S(M.meta.build)}. A material's values span its products: check the exact
        product in its Products tab before you buy or print.</div>
    </div>`,Q=N.rankBy?a(N.rankBy):null,$=Q?n(w.rows,w.ctx,Q):null,oe=new Set(w.rows.map(e=>e.material.id)),se=e=>{if(!$)return``;let t=$.byMaterial.get(e.id);return t?` <span class="fine" title="${S(`${Q.designCase}: median of ${t.products} product${t.products===1?``:`s`}`)}">#${t.place}</span>`:` <span class="fine">${oe.has(e.id)?`not ranked`:`not in the results`}</span>`};c.innerHTML=`
    ${ae}
    <div style="display:flex;gap:10px;align-items:center;margin-bottom:16px;flex-wrap:wrap">
      <span class="fine">${P.length} shortlisted${B?`, each with its result against the requirements above`:``}:</span>
      ${P.map(e=>`<span class="pin">${S(e.name)} ${W(e)}${se(e)}</span>`).join(``)}
      ${F?`<span class="pin anchor">${S(F.name)} · baseline</span>`:``}
      <label class="baseline-pick" title="Adds a familiar material as a reference bar.">
        Compare against
        <select data-baseline>
          <option value="">no reference</option>
          ${E.map(e=>M.materials.find(t=>t.name===e)).filter(Boolean).map(e=>`<option value="${S(e.id)}" ${w.baseline===e.id?`selected`:``}>${S(e.name)}</option>`).join(``)}
        </select>
      </label>
      <div class="spacer" style="flex:1"></div>
      <button class="btn btn-sm" id="cmp-print">Print summary</button>
    </div>
    <p class="fine cmp-intro">Each track runs from the lowest to the highest of all ${q.length} materials${G?`, estimates included`:``},
      so a bar's length shows where a material sits among them.${Y.length?` Tracks spanning more than a hundredfold (${Y.join(` and `)}) use a log scale, where a tick marks the value.`:``}${N.constraints.some(e=>e.kind===`numeric`)?` An upright line is a requirement, dashed if it is reported, not required; a track widens to show one past the candidates, or marks it at its end.`:``}
      ${re?`The <b>|—|</b> marks are the range of the material's products, or a range or scatter the source reported. `:``}${ne?`A <b>*</b> is a published value that is not comparable, drawn as a tick; select it for why.`:``}</p>
    ${te}
    <h3 class="sec">H2C printability</h3>
    <p class="fine">For a material with passing products, each check uses those products' own settings. The line under it covers
      all of the material's products.</p>
    ${y(`<table class="grid"><thead><tr><th class="name">Material</th><th>Nozzle</th><th>Bed</th><th>Chamber</th><th>Hardened nozzle</th><th>Drying</th></tr></thead>
      <tbody>${I.map(t=>{let n=U(t),r=n.map(e=>p(t,e)),i=e=>n.length?`${A(r.map(t=>t[e]),e)}<div class="fine">all products: ${j(t.gates[e],e)}</div>`:j(t.gates[e],e),a=e=>n.length?[...new Set(r.map(e))].join(` / `):e(t.gates);return`<tr><td class="name">${S(t.name)}${n.length?`<span class="row-sub">${n.length} passing product${n.length===1?``:`s`}</span>`:``}</td>
        ${[`nozzle`,`bed`,`chamber`].map(e=>`<td>${i(e)}</td>`).join(``)}
        <td>${S(n.length?a(e=>k[e.abrasive]??`not recorded`):t.gates.abrasive===`requires-hardened`&&d(e(M.grades.filter(e=>e.materialId===t.id)))||(k[t.gates.abrasive]??`not recorded`))}</td><td>${S(a(e=>O[e.drying]??`no data`))}</td></tr>`}).join(``)}</tbody></table>`)}

    <h3 class="sec">Data on file</h3>
    ${y(`<table class="grid"><thead><tr><th class="name">Material</th><th>Key properties published</th><th>Estimated</th><th>Products</th><th>Measurements</th></tr></thead>
      <tbody>${I.map(e=>{let t=o.filter(t=>e.headline[t.key]?.known).length,n=o.filter(t=>K(e,t.key)).length;return`<tr><td class="name">${S(e.name)}</td>
          <td>${t} of ${o.length}</td>
          <td>${n?`<span class="est">${n}<span class="est-mark">\u2020</span></span>`:`—`}</td>
          <td>${e.gradeIds.length}</td>
          <td>${w.ctx.measurementsByMaterial.get(e.id)?.length??0}</td></tr>`}).join(``)}</tbody></table>`)}
    ${I.some(e=>o.some(t=>K(e,t.key)))?`<p class="fine">A \u2020 span is an estimate, not a measurement: the likely range (${Math.round((M.meta.estimateModel?.levels?.likely??.8)*100)}%),
         the plausible range behind it and a tick at its centre. It never passes a requirement; select it for what it rests on.</p>`:``}`,v(c),c.querySelector(`#cmp-print`)?.addEventListener(`click`,()=>window.print()),g(c,D),c.querySelector(`[data-baseline]`)?.addEventListener(`change`,e=>D.setBaseline(e.target.value))}var O={required:`published`,optional:`optional`,"not-needed":`not needed`},k={"requires-hardened":`required`,"no-special-concern":`not needed`,unknown:`no data`};function A(e,t){let n=e.filter(e=>e.verdict===`within`).length,r=n===e.length?`PASS`:e.some(e=>e.verdict===`exceeds`)?`FAIL`:`UNKNOWN`,i=e.map(e=>e.reason).filter(Boolean);return b(`${n} of ${e.length} within`,[...new Set(i)].join(`
`)||`No print settings on file`,{cls:`chip chip-${r}`,head:`${t.charAt(0).toUpperCase()}${t.slice(1)}: the passing products' own settings`})}var j=(e,t)=>{if(!e?.verdict)return``;let n=c(e.verdict);return e.reason?b(S(n.short),e.reason,{cls:`chip chip-${n.state}`,head:`${t.charAt(0).toUpperCase()}${t.slice(1)}, against the H2C: ${n.word.toLowerCase()}`}):w(n.state,n.short)};export{D as renderCompare};