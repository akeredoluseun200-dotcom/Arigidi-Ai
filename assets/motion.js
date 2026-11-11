/* Kaikai 2.4 motion and scroll-driven storytelling */
(()=>{
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const selector='.pageHead,.section > .label,.section > h2,.section > .desc,.stats .stat,.cards .card,.feature,.heritageGrid .heritageCard,.libraryGrid .book,.library-teaser,.page.active .panel,.page.active .arena,.lessonGrid > *,.kt,.quote';
 const observer=!reduced&&'IntersectionObserver' in window?new IntersectionObserver(entries=>{
  for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('kaikai-inview');observer.unobserve(entry.target)}
 },{threshold:.08,rootMargin:'0px 0px -24px 0px'}):null;
 function prepare(scope=document){
  if(!observer)return;
  [...scope.querySelectorAll(selector)].forEach((el,i)=>{
   if(el.classList.contains('kaikai-reveal'))return;
   el.classList.add('kaikai-reveal');
   el.style.setProperty('--reveal-delay',((i%5)*65)+'ms');
   if(el.matches('.feature,.library-teaser'))el.classList.add('slide-left');
   if(el.matches('.quote'))el.classList.add('slide-right');
   observer.observe(el);
  });
 }
 function resetPage(page){
  if(!page.classList.contains('active'))return;
  prepare(page);
  // Re-run the entrance for an already visited page, without hiding content.
  if(!reduced){page.style.animation='none';void page.offsetWidth;page.style.animation='';}
 }
 function init(){
  prepare();
  const pages=[...document.querySelectorAll('.page')];
  if('MutationObserver' in window){
   const changed=new MutationObserver(records=>{
    for(const rec of records)if(rec.attributeName==='class'&&rec.target.classList.contains('active'))resetPage(rec.target);
   });
   pages.forEach(page=>changed.observe(page,{attributes:true,attributeFilter:['class']}));
  }
  if('MutationObserver' in window){
   const additions=new MutationObserver(()=>prepare(document.querySelector('.page.active')||document));
   pages.forEach(p=>additions.observe(p,{childList:true,subtree:true}));
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
