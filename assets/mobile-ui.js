/* Kaikai mobile-first navigation: compact header, bottom routes and accessible menu. */
(()=>{
 const underPhone=window.matchMedia('(max-width:760px)');
 function init(){
  if(document.querySelector('.kaikai-mobile-nav'))return;
  const header=document.querySelector('header .nav');
  if(!header)return;
  const menu=document.createElement('div');menu.className='kaikai-mobile-menu';
  const trigger=document.createElement('button');trigger.type='button';trigger.className='kaikai-menu-toggle';trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls','kaikai-menu-panel');
  trigger.textContent='Menu';
  const panel=document.createElement('div');panel.id='kaikai-menu-panel';panel.className='kaikai-menu-panel';panel.hidden=true;
  const routes=[['Practice','practice'],['Heritage','heritage'],['Library','library'],['Talk to KAIKAI','tutor']];
  for(const [label,route] of routes){
   const b=document.createElement('button');b.type='button';b.textContent=label;
   b.addEventListener('click',()=>{navigate(route);closeMenu()});panel.append(b);
  }
  const reader=document.createElement('a');reader.href='/reader.html';reader.textContent='Read Bible & Kuran';panel.append(reader);
  menu.append(trigger,panel);header.append(menu);
  function closeMenu(){trigger.setAttribute('aria-expanded','false');panel.hidden=true}
  trigger.addEventListener('click',()=>{const opening=panel.hidden;panel.hidden=!opening;trigger.setAttribute('aria-expanded',String(opening))});
  document.addEventListener('click',e=>{if(!menu.contains(e.target))closeMenu()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});

  const bottom=document.createElement('nav');bottom.className='kaikai-mobile-nav';bottom.setAttribute('aria-label','Mobile quick navigation');
  const entries=[['Discover','home'],['Academy','learn'],['Words','dictionary'],['Read',null]];
  const nodes=[];
  for(const [label,route] of entries){
   const element=route?document.createElement('button'):document.createElement('a');
   element.textContent=label;element.className='kaikai-mobile-link'+(route==='home'?' current':'');
   if(route){element.type='button';element.dataset.mobileGo=route;element.addEventListener('click',()=>navigate(route))}
   else element.href='/reader.html';
   bottom.append(element);nodes.push(element);
  }
  document.body.append(bottom);
  function navigate(route){
   const native=document.querySelector('.navlinks [data-go="'+route+'"]');
   if(native)native.click();
   update();
  }
  function update(){
   const active=document.querySelector('.page.active')?.id;
   nodes.forEach((node,i)=>{
    const yes=entries[i][1]===active;
    node.classList.toggle('current',yes);
    if(yes)node.setAttribute('aria-current','page');else node.removeAttribute('aria-current');
   });
  }
  const pages=[...document.querySelectorAll('.page')];
  if('MutationObserver' in window){
   const observer=new MutationObserver(update);
   pages.forEach(page=>observer.observe(page,{attributes:true,attributeFilter:['class']}));
  }
  update();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
