import{x as e}from"./engine-B65TxLfy.js";import{i as t,r as n}from"./lens-support-DrNwUurC.js";import{O as r,P as i,b as a}from"./index-2C_xwlEd.js";var o={"Evidence recorded":`ok`,Resolved:`ok`,"Partially resolved":`partial`,"Reviewed with limitations":`partial`,"Limited comparability":`partial`,Gap:`gap`,Conflict:`bad`,Quarantined:`bad`},s={ok:`✓`,partial:`◐`,gap:`–`,bad:`✕`,none:``},c={ok:`Data on file`,partial:`Limited or partial`,gap:`Gap: nothing on file`,bad:`Conflict or held back`,none:`Not assessed`},l={Identity:`Identity`,"H2C status":`H2C`,"Print setup":`Printing`,Mechanical:`Mechanical`,Thermal:`Thermal`,"Moisture / environmental":`Environment`,"Post-processing / application":`Application`,"Canadian price":`CA price`},u=`Sparse properties`,d=n.filter(e=>e!==u),f=e=>e.records.find(t=>t.status===e.status)??e.records[0];function p(e,n,i){let{rows:u,db:p}=n;if(!u.length){e.innerHTML=`<div class="empty"><h3>No candidates to show coverage for</h3>
      <p>Relax a constraint, or show more states from the bar at the bottom.</p></div>`;return}let m=u.map(e=>e.material),_=t(m,p.coverage,d),v=_.length,y=d.map((e,t)=>{let n={ok:0,partial:0,gap:0,bad:0,none:0};for(let e of _){let r=o[e.cells[t].status];n[r??`none`]++}return{domain:e,...n}}),b=e=>e.cells.filter(e=>o[e.status]===`ok`).length;e.innerHTML=`
    <p class="lens-intro">What data is on file for the ${v} candidate${v===1?``:`s`} on screen, and where the gaps are.
      It never changes a result. "On file" means data exists, not that it settles your question. Select a cell to read it.</p>

    <div class="cov-summary">
      ${y.map(e=>`
        <div class="cov-card">
          <div class="cov-card-title">${a(l[e.domain]??e.domain)}</div>
          <div class="cov-meter" title="${e.ok} recorded, ${e.partial} limited, ${e.gap} gaps, ${e.bad} conflicts">
            ${e.ok?`<span class="seg ok" style="flex:${e.ok}"></span>`:``}
            ${e.partial?`<span class="seg partial" style="flex:${e.partial}"></span>`:``}
            ${e.gap?`<span class="seg gap" style="flex:${e.gap}"></span>`:``}
            ${e.bad?`<span class="seg bad" style="flex:${e.bad}"></span>`:``}
            ${e.none?`<span class="seg none" style="flex:${e.none}"></span>`:``}
          </div>
          <div class="cov-card-n">${e.ok} of ${v} recorded</div>
        </div>`).join(``)}
    </div>

    <div class="cov-legend">
      ${Object.entries(c).map(([e,t])=>`<span class="cov-key"><i class="sw ${e}">${s[e]}</i>${a(t)}</span>`).join(``)}
    </div>

    <div class="cov-scroll">
      <table class="cov2">
        <thead><tr>
          <th class="mat">Material</th>
          ${d.map(e=>`<th title="${a(e)}">${a(l[e]??e)}</th>`).join(``)}
          <th class="score">Recorded</th>
        </tr></thead>
        <tbody>
          ${_.map(e=>`<tr>
            <td class="mat"><button class="linkish" data-open="${a(e.materialId)}">${a(e.name)}</button></td>
            ${e.cells.map((t,n)=>{let r=o[t.status]??`none`,i=f(t)?.finding??``;return`<td><button class="cov-cell ${r}" data-open="${a(e.materialId)}" data-domain="${a(d[n])}"
                title="${a(`${e.name} — ${d[n]}: ${t.status??`no record`}${i?`. `+i.slice(0,260):``}`)}"
                aria-label="${a(`${d[n]}: ${c[r]??`no record`}`)}">${s[r]??``}</button></td>`}).join(``)}
            <td class="score">${b(e)}/${d.length}</td>
          </tr>`).join(``)}
        </tbody>
      </table>
    </div>
    ${h(m,p)}
    ${g(m,p,n.ctx)}`,r(e),e.querySelectorAll(`[data-open]`).forEach(e=>e.addEventListener(`click`,()=>i.openMaterial(e.dataset.open,e.dataset.openTab||(e.dataset.domain?`Coverage`:`Overview`))))}var m=(e,t,n,r)=>`<button class="link-btn" data-open="${a(e)}" data-domain="${a(n)}"${r?` data-open-tab="${a(r)}"`:``}>${a(t)}</button>`;function h(e,t){let n=new Set([...d,u]),r=new Set(e.map(e=>e.id)),i=new Map;for(let e of t.coverage)r.has(e.materialId)&&!n.has(e.domain)&&o[e.status]===`bad`&&(i.has(e.materialId)||i.set(e.materialId,[]),i.get(e.materialId).push(`${e.domain.toLowerCase()}${e.status===`Quarantined`?` (value held back)`:``}`));if(!i.size)return``;let s=new Map(e.map(e=>[e.id,e.name]));return`<div class="cov-notes">
      <h3 class="sec"><span class="sw bad" aria-hidden="true">✕</span> Conflicts outside these columns</h3>
      <p class="fine">Sources that disagree, or a value held back, in an area the grid has no column for. Select a material to
        read the record in its Sources tab, under Known gaps.</p>
      <ul class="cov-list">${[...i].map(([e,t])=>`<li>${m(e,s.get(e),`Coverage`)}: ${a(t.join(`; `))}</li>`).join(``)}</ul>
    </div>`}function g(n,r,o){let s=r.meta.sparseProperties??[];if(!s.length)return``;let c=new Map(t(n,r.coverage,[u]).map(e=>[e.materialId,e.cells[0]?.status])),l=n.filter(e=>[`Gap`,`Evidence recorded`].includes(c.get(e.id))),d=new Map(s.map(e=>[e,[]]));for(let e of l){let t=new Set((o?.measurementsByMaterial?.get(e.id)??[]).filter(e=>(e.numeric||e.qualitative)&&!e.quarantined).map(e=>e.property));for(let n of s)t.has(n)&&d.get(n).push(e)}let f=new Set(e(`thermal`)),p=(e,t)=>e.length?e.slice(0,6).map(e=>m(e.id,e.name,u,f.has(t)?`Thermal`:`Mechanical`)).join(`, `)+(e.length>6?`, and ${e.length-6} more`:``):`<span class="missing">none</span>`;return`<div class="cov-notes">
      <h3 class="sec">Rarely published properties</h3>
      <p class="fine">Almost no filament data sheet gives these, so they are not columns above. For each, the candidates on
        screen whose products publish it; every other candidate has a gap there.</p>
      ${i(`<table class="grid cov-sparse-table"><thead><tr><th>Property</th><th class="num">Published for</th><th>Candidates</th></tr></thead>
        <tbody>${s.map(e=>`<tr><td>${a(e)}</td><td class="num">${d.get(e).length} of ${l.length}</td><td>${p(d.get(e),e)}</td></tr>`).join(``)}</tbody>
      </table>`)}
    </div>`}export{p as renderCoverage};