/* KAIKAI v2.6: approved original wordmark, not a redesigned logo. */
(()=>{
 const logo='/assets/kaikai-logo.png';
 const apply=()=>{
  document.querySelectorAll('.brand').forEach(brand=>{
   brand.classList.add('kaikai-brand-lockup');
   brand.setAttribute('aria-label','Kaikai Foundation — Discover Arigidi');
   brand.setAttribute('title','Kaikai Foundation');
   const image=document.createElement('img');
   image.src=logo;image.alt='Kaikai Foundation';image.width=320;image.height=107;
   image.decoding='async';image.loading='eager';
   brand.replaceChildren(image);
  });
  document.querySelectorAll('.site-header .identity').forEach(identity=>{
   const img=identity.querySelector('img');
   if(img){img.src=logo;img.alt='Kaikai Foundation';img.width=320;img.height=107;img.loading='eager';}
  });
  let favicon=document.querySelector('link[rel="icon"]');
  if(!favicon){favicon=document.createElement('link');favicon.rel='icon';document.head.append(favicon);}
  favicon.type='image/png';favicon.href=logo;
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
})();
