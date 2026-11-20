/* KAIKAI v2.7 — ensure motion observers work on phone, tablet and desktop. */
(()=>{
 const query='(prefers-reduced-motion: reduce)';
 const reduced=window.matchMedia(query);
 const selectors='.pageHead,.section > .label,.section > h2,.section > .desc,.stats .stat,.cards .card,.feature,.heritageGrid .heritageCard,.libraryGrid .book,.library-teaser,.page.active .panel,.page.active .arena,.lessonGrid > *,.kt,.quote,.reader-section .section-heading,.reading-shell,.reader-footnote,.intro-copy,.closing';
 let observer=null,activateObserver=null;
 const reveal=el=>{
   el.classList.add('kaikai-inview');
   el.classList.remove('kk27-observed');
 };
 function setUp(){
   if(reduced.matches){document.querySelectorAll('.kk27-observed').forEach(reveal);observer?.disconnect();observer=null;return;}
   if(!('IntersectionObserver' in window))return;
   observer?.disconnect();
   observer=new IntersectionObserver(entries=>{
     for(const entry of entries){
       if(entry.isIntersecting){reveal(entry.target);observer.unobserve(entry.target)}
     }
   },{threshold:0.035,rootMargin:'0px 0px 28px 0px'});
   scan();
 }
 function scan(){
   if(!observer||reduced.matches)return;
   const visible=document.querySelector('.page.active');
   const nodes=[...document.querySelectorAll(selectors)];
   nodes.forEach((el,i)=>{
     const page=el.closest('.page');
     if(page&&page!==visible)return;
     if(el.classList.contains('kaikai-inview'))return;
     // Don't hide what is already on screen: prevent mobile flickering.
     const rect=el.getBoundingClientRect();
     const onScreen=rect.top<window.innerHeight*.95&&rect.bottom>0;
     if(onScreen){reveal(el);return}
     el.classList.add('kaikai-reveal','kk27-observed');
     el.style.setProperty('--reveal-delay',((i%4)*55)+'ms');
     observer.observe(el);
   });
 }
 function init(){
   setUp();
   const pages=[...document.querySelectorAll('.page')];
   if('MutationObserver' in window){
     const pageObserver=new MutationObserver(()=>{
       // On SPA route changes, allow the new screen to enter then watch below-fold content.
       window.requestAnimationFrame(scan);
     });
     pages.forEach(p=>pageObserver.observe(p,{attributes:true,attributeFilter:['class'],childList:true,subtree:true}));
   }
   window.addEventListener('pageshow',scan,{passive:true});
   reduced.addEventListener?.('change',setUp);
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
