/* KAIKAI mobile reader: original PDF pages, rendered one page at a time.
   Falls back to the original quick-read PDF if PDF.js is unavailable. */
const root=document.getElementById('mobile-pdf-viewer');
const canvas=document.getElementById('mobile-pdf-canvas');
const message=document.getElementById('mobile-pdf-message');
const prev=document.getElementById('mobile-pdf-prev');
const next=document.getElementById('mobile-pdf-next');
const count=document.getElementById('mobile-pdf-count');
const locationText=document.getElementById('mobile-pdf-location');
const mobile=window.matchMedia('(max-width: 760px)');
let pdfjs=null, pdf=null, docURL='',pageNo=1,zoom=110,requestVersion=0,renderTask=null,rendering=false;
const cache=new Map();
function status(text){message.textContent=text;message.hidden=!text;}
function active(){return mobile.matches;}
function updateControls(){
 count.textContent=pdf?'Page '+pageNo+' of '+pdf.numPages:'Loading page';
 prev.disabled=!pdf||pageNo===1;
 next.disabled=!pdf||pageNo>=pdf.numPages;
 locationText.textContent=pdf?'PAGE '+pageNo+' / '+pdf.numPages:'ORIGINAL PAGE';
}
async function library(){
 if(pdfjs)return pdfjs;
 const imported=await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.mjs');
 imported.GlobalWorkerOptions.workerSrc='https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.mjs';
 pdfjs=imported;return imported;
}
async function getPDF(url){
 if(cache.has(url)){const found=cache.get(url);cache.delete(url);cache.set(url,found);return found;}
 const engine=await library();
 const result=await engine.getDocument({url,withCredentials:false,enableXfa:false}).promise;
 cache.set(url,result);
 if(cache.size>3){const oldest=cache.keys().next().value;if(oldest!==url){const stale=cache.get(oldest);cache.delete(oldest);stale.destroy().catch(()=>{});}}
 return result;
}
async function paint(){
 if(!active()||!pdf||rendering)return;
 rendering=true;
 const version=++requestVersion;
 status('Rendering the original page…');
 try{
  if(renderTask){try{renderTask.cancel()}catch(_){}renderTask=null;}
  const page=await pdf.getPage(pageNo);
  if(version!==requestVersion){rendering=false;return;}
  const base=page.getViewport({scale:1});
  const contentWidth=Math.max(240,Math.min(canvas.parentElement.clientWidth-16,950));
  const scale=(contentWidth/base.width)*(zoom/110);
  const viewport=page.getViewport({scale});
  const pixelRatio=Math.min(window.devicePixelRatio||1,2);
  canvas.width=Math.floor(viewport.width*pixelRatio);
  canvas.height=Math.floor(viewport.height*pixelRatio);
  canvas.style.width=Math.floor(viewport.width)+'px';
  canvas.style.height=Math.floor(viewport.height)+'px';
  const ctx=canvas.getContext('2d',{alpha:false});
  ctx.setTransform(1,0,0,1,0,0);
  ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);
  renderTask=page.render({canvasContext:ctx,viewport,transform:pixelRatio!==1?[pixelRatio,0,0,pixelRatio,0,0]:null});
  await renderTask.promise;
  if(version===requestVersion){status('');canvas.classList.add('is-visible');root.classList.remove('is-loading');}
 }catch(e){
  if(e?.name!=='RenderingCancelledException'){
   status('The page could not be rendered. Use Open full PDF above.');
   console.warn('Kaikai mobile PDF fallback:',e);
  }
 }finally{renderTask=null;rendering=false;updateControls();}
}
async function show(detail){
 if(!active())return;
 root.hidden=false;
 const url=detail.url?.split('#')[0];
 if(!url)return;
 zoom=detail.zoom||110;
 const isNew=url!==docURL;docURL=url;
 pageNo=Math.max(1,Number(detail.page)||1);
 root.classList.add('is-loading');canvas.classList.remove('is-visible');
 status(isNew?'Opening a lightweight publication…':'Turning to your page…');
 if(isNew){pdf=null;updateControls();}
 try{
  const selected=await getPDF(url);
  if(docURL!==url)return;
  pdf=selected;pageNo=Math.max(1,Math.min(pageNo,pdf.numPages));
  updateControls();await paint();
 }catch(err){
  console.warn('Kaikai mobile PDF unavailable:',err);
  status('This device cannot display the page here. Tap Open full PDF above.');
  const frame=document.getElementById('reader-pdf');
  if(frame){frame.src=detail.fullURL||detail.url;}
 }
}
function changePage(delta){
 if(!pdf)return;
 const target=Math.min(pdf.numPages,Math.max(1,pageNo+delta));
 if(target===pageNo)return;
 pageNo=target;canvas.classList.remove('is-visible');root.classList.add('is-loading');
 paint();
 root.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});
}
prev.addEventListener('click',()=>changePage(-1));
next.addEventListener('click',()=>changePage(1));
let touchX=0,touchY=0;
canvas.parentElement.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;touchX=e.touches[0].clientX;touchY=e.touches[0].clientY;},{passive:true});
canvas.parentElement.addEventListener('touchend',e=>{if(!touchX||e.changedTouches.length!==1)return;const dx=e.changedTouches[0].clientX-touchX,dy=e.changedTouches[0].clientY-touchY;touchX=0;touchY=0;if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.4)changePage(dx<0?1:-1);},{passive:true});
window.addEventListener('kaikai:readerchange',e=>show(e.detail));
window.addEventListener('resize',()=>{if(mobile.matches&&pdf&&!rendering)paint();});
mobile.addEventListener?.('change',e=>{
 if(!e.matches){root.hidden=true;pdf=null;docURL='';}
 else if(window.__kaikaiReaderCurrent)show(window.__kaikaiReaderCurrent);
});
if(active()&&window.__kaikaiReaderCurrent)show(window.__kaikaiReaderCurrent);
