/**
 * KAIKAI reference-grounded tutor, v2.1
 * Standalone ES module. No guessed Arigidi translations and no third-party AI requests.
 *
 * Vocabulary:
 * [{id, arigidi, english, source:{type:"dictionary"|"bible"|"quran",reference,edition?,page?}, verified:true}]
 * Scriptures:
 * [{id, tradition:"bible"|"quran", reference, english, arigidi, edition?, verified:true}]
 *
 * Use only rights-cleared records approved for publication.
 */
const norm = s => String(s ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
const tok = s => new Set(norm(s).split(" ").filter(w => w.length > 2));
const esc = s => String(s ?? "").replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function rank(q, rows, texts) {
 const terms=tok(q); if (!terms.size) return [];
 return rows.filter(r=>r?.verified===true).map(r=>{
   const hay=norm(texts(r)), words=tok(hay);let points=0;
   for(const t of terms)if(words.has(t))points+=3;else if(hay.includes(t))points+=1;
   return {item:r,points};
 }).filter(x=>x.points>0).sort((a,b)=>b.points-a.points).slice(0,5).map(x=>x.item);
}
export function answerQuestion(question, {vocabulary=[],scriptures=[]}={}) {
 const q=String(question??"").trim().slice(0,500);
 if(!q)return {message:"Ask about a word, a sentence, or a passage.",evidence:[],kind:"help"};
 const scriptureOnly=/bible|verse|genesis|psalm|proverb|testament|quran|qur.an|surah|sura|ayah/i.test(q);
 const verses=rank(q, scriptures, r=>[r.reference,r.english,r.arigidi].join(" "))
  .filter(r=>!scriptureOnly || (/quran|qur.an|surah|sura|ayah/i.test(q)?r.tradition==="quran":/bible|verse|genesis|psalm|proverb|testament/i.test(q)?r.tradition==="bible":true));
 const words=rank(q,vocabulary,r=>[r.english,r.arigidi,r.source?.reference].join(" "));
 if(verses.length) return {kind:"references",message:"Here are verified source passages related to your question. Read each reference in context.",evidence:verses.map(r=>({label:r.reference,english:r.english,arigidi:r.arigidi,source:r.tradition,edition:r.tradition==="bible"?(r.edition||"2ND EDITION"):undefined}))};
 if(words.length)return {kind:"vocabulary",message:"These are verified dictionary matches. Try making a sentence with them; longer sentences need a fluent-speaker check.",evidence:words.map(r=>({label:r.english,arigidi:r.arigidi,source:r.source?.type,reference:r.source?.reference}))};
 return {kind:"unverified",message:"I don't have a verified Arigidi answer for that yet. Try searching a shorter English word, or ask for a passage already in the library. I won't invent a translation.",evidence:[]};
}
export function mountKaikaiTutor(container, data) {
 if(!container)throw new Error("Tutor container required");
 container.innerHTML=`<section class="kt" aria-labelledby="kt-title">
  <div class="kt-head"><p class="kt-eyebrow">KAIKAI LEARNING ACADEMY</p><h2 id="kt-title">Learn through conversation.</h2><p>Ask in English or Arigidi. Explore only verified words and book references.</p></div>
  <div class="kt-feed" role="log" aria-live="polite" aria-relevant="additions"><div class="kt-msg kt-bot">Welcome. Ask me about a word or a Bible or Quran passage.</div></div>
  <form class="kt-form"><label for="kt-question">Your question</label><div class="kt-controls"><input id="kt-question" maxlength="500" required placeholder="Ask a question or practise a sentence…" autocomplete="off"/><button type="submit">Send</button></div></form>
  <p class="kt-note">Verified references only. Educational guidance, not a replacement for native-speaker review.</p></section>`;
 const form=container.querySelector("form"),input=container.querySelector("input"),feed=container.querySelector(".kt-feed");
 form.addEventListener("submit",event=>{
  event.preventDefault(); const question=input.value.trim();if(!question)return;
  const user=document.createElement("div");user.className="kt-msg kt-user";user.textContent=question;feed.append(user);input.value="";
  const result=answerQuestion(question,data);
  const response=document.createElement("div");response.className="kt-msg kt-bot";
  let markup=`<p>${esc(result.message)}</p>`;
  for(const v of result.evidence) markup+=`<article class="kt-evidence"><strong>${esc(v.label)}</strong>${v.arigidi?`<p lang="aig">${esc(v.arigidi)}</p>`:""}${v.english?`<p>${esc(v.english)}</p>`:""}<small>${esc([v.source,v.edition,v.reference].filter(Boolean).join(" · "))}</small></article>`;
  response.innerHTML=markup;feed.append(response);feed.scrollTop=feed.scrollHeight;
 });
 return {destroy(){container.replaceChildren()}};
}
