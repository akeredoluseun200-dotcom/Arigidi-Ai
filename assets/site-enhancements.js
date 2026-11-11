/* Accessible improvements for Kaikai language academy.
   The published words remain sourced from the existing dictionary. */
(()=>{const ready=()=>{const one=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];
 const brand=one('.brand');if(brand){brand.setAttribute('aria-label','Kaikai Foundation');brand.title='Kaikai Foundation · Arigidi Akoko';}
 const hero=one('#home .hero .inner');if(hero&&!one('.k-proof')){const p=document.createElement('p');p.className='k-proof';p.textContent='A community-built home for Arigidi Akoko words, stories and sacred writings. Preserve the language. Pass it forward.';hero.append(p);}
 const shelf=one('#library .libraryGrid');if(shelf){
  const intro=document.createElement('p');intro.className='k-proof';intro.innerHTML='<strong>From original manuscripts.</strong> The Bible is identified as the 2ND EDITION. The Quran is shown without an edition number. Where source pages remain under review, the language tutor identifies its limits.';
  shelf.parentNode.insertBefore(intro,shelf);
  fetch('/content/library.json').then(r=>r.ok?r.json():[]).then(items=>{
   if(!Array.isArray(items))return;
   for(const book of items){
    if(!book.url)continue;
    const card=document.createElement('article');card.className='book';
    const title=document.createElement('h3');title.textContent=book.title||'Publication';
    const subtitle=document.createElement('p');subtitle.textContent=book.description||'Original-language manuscript';
    const actions=document.createElement('div');actions.className='library-actions';
    const link=document.createElement('a');link.href=book.url;link.rel='noopener noreferrer';link.target='_blank';link.textContent=book.action||'Read original publication';link.setAttribute('aria-label','Open '+title.textContent+' in a new tab');
    actions.append(link);card.append(title,subtitle,actions);shelf.append(card);
   }
  }).catch(()=>{});
 }
 const years=document.querySelectorAll('.stat');years.forEach(x=>x.setAttribute('tabindex','0'));
 const nav=one('.navlinks');if(nav){nav.setAttribute('aria-label','Explore Kaikai');}
 const tools=one('#tutor .kt-head');if(tools){const note=document.createElement('p');note.style.cssText='font-size:14px;opacity:.9;margin:14px 0 0';note.textContent='Built from verified dictionary entries and carefully attributed scripture excerpts.';tools.append(note);}
};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();})();
