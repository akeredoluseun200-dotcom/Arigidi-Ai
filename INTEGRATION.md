# Integrating the Arigidi tutor into Version 2

The files `features/tutor.js` and `features/tutor.css` are a self-contained, **reference-grounded prototype**, not yet deployed to production.

## 1. Preserve Version 2

Export the current deployed `src/index.html` and `src/robots.txt` from the Vercel source deployment **dpl_6WKG7QL465YLhTXNHEF976AyH7C1** into the root of this repository. Confirm the dictionary, learning academy, challenges, and saved words still work before making the GitHub repo the authoritative deployment source.

Do not point the existing Vercel production project at this repository while `index.html` is absent.

## 2. Include in the existing page

```html
<link rel="stylesheet" href="/features/tutor.css">
<div id="kaikai-tutor"></div>
<script type="module">
  import {mountKaikaiTutor} from "/features/tutor.js";
  const [vocabulary, scriptures] = await Promise.all([
    fetch("/content/vocabulary.json").then(r => r.json()),
    fetch("/content/scriptures.json").then(r => r.json())
  ]);
  mountKaikaiTutor(document.getElementById("kaikai-tutor"), {vocabulary, scriptures});
</script>
```

## 3. Populate verified reference records

Example of record **shape only** (placeholder fields are NOT real translations):

```json
{
  "id": "bible-genesis-1-1",
  "tradition": "bible",
  "reference": "Genesis 1:1",
  "english": "[verified English source wording]",
  "arigidi": "[exact Arigidi source wording]",
  "edition": "2ND EDITION",
  "verified": true
}
```

The Bible PDF currently available to the project is the source-recovered 2ND EDITION; identify any sections requiring proofreading and set verified=false until checked. Use the Quran reference structure `Surah X:Y`, without an edition label. Only set `verified:true` after confirming the record against its authentic source and publication permission.

## 4. Publish the approved PDFs and photograph

Place final authorized documents in `public/library/` and original Baba Kaikai photo in `public/images/`. Link the PDF downloads from the existing Library page, keeping the Bible label **2ND EDITION** and Quran without edition label. Use the *original* photo as the logo/home hero asset without redrawing his face; apply an overlay for legible foreground text rather than altering his portrait.

Original audio should be uploaded separately; the files are large and require verification of recording rights and hosting limits.

## 5. Chatbot roadmap

This prototype performs document search and cited replies. An actual generative conversation system requires a server-side language model, retrieval/indexing, usage limits and privacy controls. Keep model keys server-side. Never train a model on private or copyrighted material without appropriate permission. Every quotation and Arigidi assertion needs a source label and an uncertainty rule.

## Visual rules

Large readable text, warm Georgia/humanist sans combination, pine green + cream + earth-clay palette, subtle motion and `prefers-reduced-motion`, no pink, no robotic icons.
