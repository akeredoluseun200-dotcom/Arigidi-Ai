/* KAIKAI 2026: heritage identity, publication access and reader navigation */
(()=>{
 const ready=()=>{
  const one=s=>document.querySelector(s);
  const originalPhoto='https://ctgc6eaiyducczq7.public.blob.vercel-storage.com/library/Baba-Kaikai.jpeg';
  const brand=one('.brand'),heroPanel=one('#home .hero');
  if(brand){
   brand.setAttribute('aria-label','Kaikai Foundation');
   brand.title='Kaikai Foundation · Arigidi Akoko';
   if(!brand.querySelector('img')){
    const img=document.createElement('img');img.src=originalPhoto;img.width=50;img.height=50;img.alt='Original portrait of Baba Kaikai';img.decoding='async';brand.classList.add('kaikai-brand-lockup');brand.prepend(img);
   }
  }
  if(heroPanel){
   heroPanel.style.backgroundImage='url("'+originalPhoto+'")';
   heroPanel.style.backgroundColor='#172e37';
   heroPanel.style.backgroundSize='auto 125%';
   heroPanel.style.backgroundRepeat='no-repeat';
   heroPanel.style.backgroundPosition='right center';
  }
  const nav=one('.navlinks');
  if(nav){
   nav.setAttribute('aria-label','Kaikai navigation');
   if(!nav.querySelector('.reader-nav-link')){
    const link=document.createElement('a');link.href='/reader.html';link.className='reader-nav-link';link.textContent='Read the books';nav.append(link);
   }
  }
  const actions=one('.hero-actions');
  if(actions&&!actions.querySelector('.kaikai-footer-cta')){
   const a=document.createElement('a');a.href='/reader.html';a.className='kaikai-footer-cta';a.textContent='Read the Bible & Kuran ↗';actions.append(a);
  }
  const shelf=one('#library .libraryGrid');
  if(shelf){
   const intro=document.createElement('p');intro.className='k-proof';
   intro.textContent='Original Foundation publications, preserved as issued. Navigate the 66 Bible books and 114 Kuran surahs without changing the source wording.';
   shelf.parentNode.insertBefore(intro,shelf);
   fetch('/content/library.json').then(r=>r.ok?r.json():[]).then(items=>{
    if(!Array.isArray(items))return;
    const existing=[...shelf.querySelectorAll('article.book')];
    for(const card of existing)card.querySelector('.soon')?.remove();
    for(const entry of items){
     if(!/^https:\/\//.test(entry.url||''))continue;
     let card=existing.find(c=>entry.category==='quran'?/quran|kuran/i.test(c.textContent):/bible/i.test(c.textContent));
     if(!card){card=document.createElement('article');card.className='book';shelf.append(card)}
     let h=card.querySelector('h3');if(!h){h=document.createElement('h3');card.prepend(h)}
     h.textContent=entry.category==='bible'?'The Holy Bible':'The Kuran';
     let para=card.querySelector('p');if(!para){para=document.createElement('p');card.append(para)}para.textContent=entry.description;
     let buttons=card.querySelector('.library-actions');if(!buttons){buttons=document.createElement('div');buttons.className='library-actions';card.append(buttons)}
     buttons.replaceChildren();
     const reader=document.createElement('a');reader.href='/reader.html?collection='+entry.category;reader.textContent='Explore in the reader ↗';buttons.append(reader);
     const file=document.createElement('a');file.href=entry.url;file.target='_blank';file.rel='noopener noreferrer';file.textContent='Open original PDF';buttons.append(file);
    }
   }).catch(()=>{});
  }
  const section=one('#home .section'),feature=one('#home .feature');
  if(section&&feature&&!one('.library-teaser')){
   const box=document.createElement('div');box.className='library-teaser';
   const left=document.createElement('div');left.className='library-teaser-content';
   const label=document.createElement('span');label.className='label';label.textContent='THE LIVING LIBRARY';
   const title=document.createElement('h3');title.textContent='A world of meaning, written in our language.';
   const p=document.createElement('p');p.textContent='Explore the complete Arigidi Bible and Kuran in a beautifully organized reader, with book, chapter and surah navigation.';
   const link=document.createElement('a');link.href='/reader.html';link.textContent='Open the digital library ↗';
   left.append(label,title,p,link);
   const right=document.createElement('div');right.className='library-teaser-numbers';
   for(const [num,word] of [['66','BIBLE BOOKS'],['114','KURAN SURAHS']]){
    const row=document.createElement('div'),n=document.createElement('strong'),w=document.createElement('span');n.textContent=num;w.textContent=word;row.append(n,w);right.append(row);
   }
   box.append(left,right);feature.parentNode.insertBefore(box,feature);
  }
  const tutorHead=one('#tutor .kt-head');
  if(tutorHead&&!tutorHead.querySelector('.kaikai-tutor-caution')){
   const note=document.createElement('p');note.className='kaikai-tutor-caution';
   note.textContent='Answers rely on recorded dictionary and scripture excerpts. Unverified whole-sentence translation requires fluent-speaker review.';
   tutorHead.append(note);
  }
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready);else ready();
})();