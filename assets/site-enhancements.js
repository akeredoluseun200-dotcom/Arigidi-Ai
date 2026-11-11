/* Accessible improvements for Kaikai language academy.
   The published words remain sourced from the existing dictionary. */
(()=>{const ready=()=>{const one=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];
 const heroPanel=one('#home .hero');const brandElement=one('.brand');
 fetch('/content/brand.json').then(r=>r.ok?r.json():{}).then(c=>{
  const allowed=u=>typeof u==='string'&&/^https:\/\//.test(u);
  if(allowed(c.logoUrl)&&brandElement){const img=document.createElement('img');img.src=c.logoUrl;img.alt=c.alt||'Kaikai Foundation original image';img.width=42;img.height=42;img.loading='eager';brandElement.classList.add('kaikai-brand-lockup');brandElement.prepend(img);}
  if(allowed(c.heroImageUrl)&&heroPanel){heroPanel.style.backgroundImage='linear-gradient(90deg,rgba(14,44,33,.91),rgba(14,44,33,.50)),url("'+c.heroImageUrl.replace(/[()"'\\]/g,'')+'")';heroPanel.style.backgroundSize='cover';heroPanel.style.backgroundPosition='center';}
 }).catch(()=>{});
 const brand=one('.brand');if(brand){brand.setAttribute('aria-label','Kaikai Foundation');brand.title='Kaikai Foundation · Arigidi Akoko';}
 const hero=one('#home .hero .inner');if(hero&&!one('.k-proof')){const p=document.createElement('p');p.className='k-proof';p.textContent='A community-built home for Arigidi Akoko words, stories and sacred writings. Preserve the language. Pass it forward.';hero.append(p);}
 const shelf=one('#library .libraryGrid');if(shelf){
  const intro=document.createElement('p');intro.className='k-proof';intro.innerHTML='<strong>From original manuscripts.</strong> The Bible is identified as the 2ND EDITION. The Quran is shown without an edition number. Where source pages remain under review, the language tutor identifies its limits.';
  shelf.parentNode.insertBefore(intro,shelf);
  fetch('/content/library.json').then(r=>r.ok?r.json():[]).then(items=>{
   if(!Array.isArray(items))return;
   const existing=[...shelf.querySelectorAll('article.book')];
   for(const card of existing){const soon=card.querySelector('.soon');if(soon)soon.remove();}
   for(const book of items){
    if(!book.url||!/^https:\/\//.test(book.url))continue;
    let card=existing.find(x=>book.category==='quran'?/quran/i.test(x.textContent):/bible/i.test(x.textContent));
    if(!card){card=document.createElement('article');card.className='book';const title=document.createElement('h3');title.textContent=book.title||'Publication';card.append(title);shelf.append(card);}
    let actions=card.querySelector('.library-actions');if(!actions){actions=document.createElement('div');actions.className='library-actions';card.append(actions);}
    const link=document.createElement('a');link.href=book.url;link.rel='noopener noreferrer';link.target='_blank';link.textContent=book.action||'Read original publication';link.setAttribute('aria-label','Open '+book.title+' in a new tab');actions.append(link);
   }
  }).catch(()=>{});
 }
 const years=document.querySelectorAll('.stat');years.forEach(x=>x.setAttribute('tabindex','0'));
 const nav=one('.navlinks');if(nav){nav.setAttribute('aria-label','Explore Kaikai');}
 const tools=one('#tutor .kt-head');if(tools){const note=document.createElement('p');note.style.cssText='font-size:14px;opacity:.9;margin:14px 0 0';note.textContent='Built from verified dictionary entries and carefully attributed scripture excerpts.';tools.append(note);}
};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();})();
