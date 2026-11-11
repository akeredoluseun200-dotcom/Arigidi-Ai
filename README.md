# KAIKAI — The Arigidi Experience

The Kaikai Foundation's living Arigidi Akoko language-learning platform.

**Public website:** https://kaikai-foundation-arigidi.vercel.app  
**Vercel project:** `kaikai-foundation-arigidi`  
**Latest deployed update:** November 11, 2026, Version 2.2.

## Published

- Original Version 2 learning pages, saved vocabulary and quizzes preserved.
- Upgraded mobile layouts, font sizes, typography and animations.
- Earthy evergreen, cream and clay colour scheme. No peach or pink accents.
- Source-grounded **Talk to KAIKAI** with search over **1,254 original-language scripture excerpts** (683 Quran, 571 New Testament) plus the existing 632-entry dictionary.
- Original Bible **2ND EDITION** and Quran in Vercel Blob public storage.
- Quran PDF, New Testament PDF and Old Testament DOC linked from the main Library page.

## Publication URLs

- Quran PDF: https://ctgc6eaiyducczq7.public.blob.vercel-storage.com/library/Arigidi-Quran.pdf
- Bible New Testament 2ND EDITION PDF: https://ctgc6eaiyducczq7.public.blob.vercel-storage.com/library/Arigidi-New-Testament-2ND-Edition.pdf
- Bible Old Testament 2ND EDITION source DOC: https://ctgc6eaiyducczq7.public.blob.vercel-storage.com/library/Arigidi-Old-Testament-2ND-Edition.doc

## Structure

`source/index.html.gz.b64`: versioned recovered source archive.  
`assets/brand-refresh.css`: large readable typography and refreshed design.  
`assets/site-enhancements.js`: homepage enhancements, original-image hook, and publication links.  
`content/library.json`: original publication links.  
`content/brand.json`: source-approved unchanged logo and home hero image URLs (currently unset).  
`content/scripture-index.01.b64` and `content/scripture-index.02.b64`: compressed annotated source excerpt index.  
`api/library-upload.js`: restricted public Blob client-upload handler.  
`scripts/build.mjs`: reproducible website build.

To build locally: `npm install && npm run build`. To recover the full uncompressed original page: `npm run restore-source`.

## Textual integrity

The scripture records are **source-matched excerpts**, not necessarily full verses, and are included for retrieval and cultural learning only. Verse interpretation or whole-sentence Arigidi translation still requires native-speaker review. The current tutor is a source-search assistant, not a free-form large-language-model service.

## Outstanding

- **Original image**: user provided it inline in chat, but the original bytes were not available as a standalone retrievable asset to the publishing tools. Upload through the secured Blob path and add the resulting HTTPS URL to `content/brand.json` to activate the unchanged logo and hero background.
- **Oral-history audio**: source files are identified, but still need an upload path compatible with their large MP3 format and publishing authorization.
- **Automated GitHub push-triggered deployment**: the existing Vercel project can be deployed from the GitHub source (verified). It is not yet an automatically connected Git project; GitHub pushes alone are not guaranteed to update production.
- **Generative chatbot**: requires a server-side model provider with rate limiting, citation-grounded retrieval and no invented translations.
