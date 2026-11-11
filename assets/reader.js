(()=>{
'use strict';
const PDF={
  bible:'https://ctgc6eaiyducczq7.public.blob.vercel-storage.com/library/Arigidi-Bible-Complete-2ND-Edition.pdf',
  quran:'https://ctgc6eaiyducczq7.public.blob.vercel-storage.com/library/Arigidi-Kuran-Complete.pdf'
};
const $=s=>document.querySelector(s);
const els={bible:$('#tab-bible'),quran:$('#tab-quran'),search:$('#library-search'),count:$('#rail-count'),list:$('#book-list'),title:$('#selected-title'),description:$('#reading-description'),chapters:$('#chapter-list'),chapterTitle:$('#chapter-heading'),chapterCount:$('#chapter-count'),edition:$('#edition-label'),location:$('#reading-location'),frame:$('#reader-pdf'),full:$('#full-book-link'),prev:$('#prev-chapter'),next:$('#next-chapter'),zin:$('#zoom-in'),zout:$('#zoom-out'),zlabel:$('#zoom-value')};
const state={type:'bible',item:0,chapter:0,zoom:110,index:null};
let saved=null;
try{saved=JSON.parse(localStorage.getItem('kaikai-reader-progress-v1')||'null')}catch(_){}
const persist=()=>{try{localStorage.setItem('kaikai-reader-progress-v1',JSON.stringify({type:state.type,item:state.item,chapter:state.chapter,zoom:state.zoom}))}catch(_){}};
function setType(type){state.type=type;state.item=0;state.chapter=0;els.search.value='';render();}
function items(){return state.type==='bible'?state.index.bible:state.index.quran}
function getItem(){return items()[state.item]}
function chapterCount(){const x=getItem();return state.type==='bible'?(x.chapters||[]).length:1}
function pageFor(){const x=getItem();return state.type==='bible'?(x.chapters[state.chapter]||x.directory):(x.page||x.directory)}
function syncFrame(){
 const x=getItem();if(!x)return;
 const chapter=state.type==='bible'?state.chapter+1:null;
 const page=pageFor();
 els.title.textContent=state.type==='bible'?x.name:'Surah '+x.number+' · '+x.name;
 els.description.textContent=state.type==='bible'?'Bible, 2ND EDITION · Chapter '+chapter:'The Kuran · Surah '+x.number;
 els.edition.textContent=state.type==='bible'?'THE BIBLE · 2ND EDITION':'THE KURAN · ARIGIDI AKOKO';
 els.location.textContent=state.type==='bible'?x.name+' · Chapter '+chapter:'Surah '+x.number+' · '+x.name;
 els.full.href=PDF[state.type]+'#page='+page;
 els.frame.src=PDF[state.type]+'#page='+page+'&zoom='+state.zoom;
 els.zlabel.textContent=state.zoom+'%';
 const atStart=state.item===0&&state.chapter===0;
 const atEnd=state.item===items().length-1&&state.chapter===chapterCount()-1;
 els.prev.disabled=atStart;els.next.disabled=atEnd;
 persist();
}
function renderChapters(){
 const x=getItem();els.chapters.replaceChildren();
 els.chapterTitle.textContent=state.type==='bible'?'Choose a chapter':'Open Surah';
 els.chapterCount.textContent=state.type==='bible'?(x.chapters.length+' chapters'):'Original PDF edition';
 if(state.type==='quran'){
  const b=document.createElement('button');b.textContent='Read this surah';b.className='current';b.setAttribute('aria-current','page');els.chapters.append(b);return;
 }
 for(let i=0;i<x.chapters.length;i++){
  const b=document.createElement('button');b.type='button';b.textContent=String(i+1);
  if(i===state.chapter){b.classList.add('current');b.setAttribute('aria-current','page')}
  b.addEventListener('click',()=>{state.chapter=i;renderChapters();syncFrame()});
  els.chapters.append(b);
 }
 els.chapters.querySelector('.current')?.scrollIntoView({block:'nearest',inline:'nearest'});
}
function renderList(){
 const entries=items(),query=els.search.value.trim().toLowerCase();
 let matches=0;els.list.replaceChildren();
 entries.forEach((x,i)=>{
  const title=state.type==='bible'?x.name:x.number+'. '+x.name;
  if(!title.toLowerCase().includes(query))return;
  matches++;
  const b=document.createElement('button');
  b.type='button';b.className='book-button'+(i===state.item?' active':'');
  if(i===state.item)b.setAttribute('aria-current','true');
  b.setAttribute('role','listitem');
  const n=document.createElement('span');n.className='book-number';n.textContent=String(i+1).padStart(2,'0');
  const label=document.createElement('span');label.className='book-label';label.textContent=x.name;
  b.append(n,label);
  b.addEventListener('click',()=>{state.item=i;state.chapter=0;render();document.querySelector('#reading-space')?.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})});
  els.list.append(b);
 });
 els.count.textContent=matches+' '+(state.type==='bible'?'Bible books':'surahs')+' · Original edition';
 if(!matches){const p=document.createElement('p');p.style.padding='15px';p.textContent='No matching title in this collection.';els.list.append(p)}
}
function render(){
 if(!state.index)return;
 els.bible.classList.toggle('selected',state.type==='bible');els.quran.classList.toggle('selected',state.type==='quran');
 els.bible.setAttribute('aria-pressed',String(state.type==='bible'));els.quran.setAttribute('aria-pressed',String(state.type==='quran'));
 renderList();renderChapters();syncFrame();
}
function step(direction){
 let next=state.chapter+direction;
 if(state.type==='quran'){state.item+=direction;state.chapter=0}
 else if(next<0){state.item--;state.chapter=Math.max(0,chapterCount()-1)}
 else if(next>=chapterCount()){state.item++;state.chapter=0}
 else state.chapter=next;
 state.item=Math.max(0,Math.min(items().length-1,state.item));render();
}
els.bible.addEventListener('click',()=>setType('bible'));
els.quran.addEventListener('click',()=>setType('quran'));
els.search.addEventListener('input',()=>renderList());
els.prev.addEventListener('click',()=>step(-1));
els.next.addEventListener('click',()=>step(1));
els.zin.addEventListener('click',()=>{state.zoom=Math.min(170,state.zoom+10);syncFrame()});
els.zout.addEventListener('click',()=>{state.zoom=Math.max(70,state.zoom-10);syncFrame()});
fetch('/content/reader-index.json').then(r=>{if(!r.ok)throw new Error('Catalogue unavailable');return r.json()}).then(data=>{
 if(!Array.isArray(data.bible)||data.bible.length!==66||!Array.isArray(data.quran)||data.quran.length!==114)throw new Error('Incomplete scripture catalogue');
 state.index=data;
 if(saved&&['bible','quran'].includes(saved.type)){
  state.type=saved.type;
  state.item=Math.min(Math.max(Number(saved.item)||0,0),items().length-1);
  state.chapter=Math.min(Math.max(Number(saved.chapter)||0,0),chapterCount()-1);
  state.zoom=Math.min(Math.max(Number(saved.zoom)||110,70),170);
 }
 render();
}).catch(()=>{
 els.count.textContent='Catalogue temporarily unavailable';
 els.title.textContent='Open the original books';
 els.description.textContent='The interactive index did not load. Use the original PDF links below.';
 const p=document.createElement('p');p.style.padding='20px';p.textContent='Original documents remain available:';
 const links=document.createElement('div');
 for(const key of ['bible','quran']){const a=document.createElement('a');a.href=PDF[key];a.target='_blank';a.rel='noopener noreferrer';a.textContent=key==='bible'?'Bible 2ND EDITION':'Kuran';a.style.display='block';a.style.padding='10px';links.append(a)}
 els.list.replaceChildren(p,links);
 els.frame.src=PDF.bible;
});
})();