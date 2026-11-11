import fs from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';

const root=process.cwd();
const archive=fs.readFileSync(path.join(root,'source/index.html.gz.b64'),'utf8').trim();
const html=zlib.gunzipSync(Buffer.from(archive,'base64')).toString('utf8').replace('<div class="brand">KAIKAI<span>FOUNDATION</span></div>','<a class="brand" href="#home" data-go="home" aria-label="Return to Discover">KAIKAI<span>FOUNDATION</span></a>');
if(!html.includes('id="dictionary"')||!html.includes('id="tutor"')||!html.includes('id="library"'))throw Error('Core learning pages missing');

const photo='https://ctgc6eaiyducczq7.public.blob.vercel-storage.com/library/Baba-Kaikai.jpeg';
const fonts='<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,400,20;9..144,600,20;9..144,700,20&family=Nunito+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">';
const branding='<link rel="icon" type="image/jpeg" href="'+photo+'"><meta property="og:image" content="'+photo+'"><meta name="theme-color" content="#172e37">';
let enhanced=html.replace(
 'Here are original-source passages connected to your question.',
 'These are short recorded excerpts. Read the original Bible or Kuran for the complete passage. We do not invent Arigidi translations.'
).replace('</head>',fonts+branding+'<link rel="stylesheet" href="/assets/brand-refresh.css"><link rel="stylesheet" href="/assets/v23.css"><link rel="stylesheet" href="/assets/v24-motion.css"><link rel="stylesheet" href="/assets/mobile-v25.css"></head>')
.replace('</body>','<script defer src="/assets/site-enhancements.js"></script><script defer src="/assets/motion.js"></script><script defer src="/assets/mobile-ui.js"></script></body>');

fs.mkdirSync('dist/content',{recursive:true});
fs.mkdirSync('dist/assets',{recursive:true});
fs.writeFileSync('dist/index.html',enhanced);
const readerHtml=fs.readFileSync('pages/reader.html','utf8').replace('</head>','<link rel="stylesheet" href="/assets/v24-motion.css"><link rel="stylesheet" href="/assets/mobile-v25.css"></head>');
fs.writeFileSync('dist/reader.html',readerHtml);
for(const name of ['brand-refresh.css','v23.css','site-enhancements.js','reader.css','reader.js','v24-motion.css','motion.js','mobile-v25.css','mobile-ui.js','mobile-pdf.js']){
 fs.copyFileSync('assets/'+name,'dist/assets/'+name);
}
for(const name of ['brand.json','library.json']){
 fs.copyFileSync('content/'+name,'dist/content/'+name);
}
const sources=['content/scripture-index.01.b64','content/scripture-index.02.b64'];
const data=zlib.gunzipSync(Buffer.from(sources.map(p=>fs.readFileSync(p,'utf8').trim()).join(''),'base64'));
const excerpts=JSON.parse(data.toString('utf8'));
if(!Array.isArray(excerpts)||excerpts.length<1200)throw Error('Scripture reference corpus incomplete');
fs.writeFileSync('dist/content/scriptures.json',JSON.stringify(excerpts));

const readerEncoded=fs.readFileSync('content/reader-index.z64','utf8').trim();
const reader=JSON.parse(zlib.inflateSync(Buffer.from(readerEncoded,'base64')).toString('utf8'));
if(reader.bible.length!==66||reader.quran.length!==114||reader.bible.reduce((n,b)=>n+b.chapters.length,0)!==1189){
 throw Error('Bible or Kuran table of contents mismatches the original Drive PDFs');
}
fs.writeFileSync('dist/content/reader-index.json',JSON.stringify(reader));
const quick=JSON.parse(zlib.inflateSync(Buffer.from(fs.readFileSync('content/quick-index.z64','utf8').trim(),'base64')).toString('utf8'));
if(quick.bible.length!==66||quick.quran.length!==114)throw Error('Incomplete quick-read document map');
fs.writeFileSync('dist/content/quick-index.json',JSON.stringify(quick));

fs.writeFileSync('dist/robots.txt','User-agent: *\nAllow: /\n');
console.log('KAIKAI production site built with '+excerpts.length+' indexed scripture excerpts');
console.log('Reader: 66 books, 1,189 Bible chapters, 114 surahs, 180 fast-loading PDFs');
