# KAIKAI — The Arigidi Experience

Official development repository for Kaikai Foundation's Arigidi Akoko learning platform.

**Live site:** https://kaikai-foundation-arigidi.vercel.app  
**Current release:** Version 2.1 (production READY, 11 November 2026)  
**Production Vercel project:** `kaikai-foundation-arigidi`

## Release status

The Version 2 site was recovered from the existing production deployment and upgraded in a preserved copy. The new production build was deployed using this GitHub repository at commit `8ba6e91ea8dbb3406ffbb3d016228fe19a8dcf51`.

Seven pages: Discover, Learn, Dictionary, Practice, Heritage, Library, **Talk to KAIKAI**.

- Existing dictionary, learning paths, progress and quizzes preserved.
- Replaced pink/peach accents with deep evergreen, cream, and warm earth tones; increased font size and added accessible animation.
- Added reference-grounded interactive tutor interface and initial scripture excerpts. Tutor currently matches words and verified source passages; it is **not yet a free-form generative chatbot**.
- Quran and Bible exemplar passages are in `content/scriptures.json`. Quran has no edition label; Bible is labeled 2ND EDITION.

## Build

```sh
npm run build
```

The full preserved site lives in `source/index.html.gz.b64` as an immutable compressed source artifact. The build decompresses the original site into `dist/index.html` and installs scripture data. To restore a human-readable copy for editing locally:

```sh
npm run restore-source
```

After editing `index.html`, recompress it with a reproducible gzip/base64 step before committing. This packaging ensures the recovered Version 2 source is preserved byte for byte.

## Pending items

- Publish rights-cleared original Bible/Quran PDFs to public file storage and wire download links. The original files have been recovered but **were not uploaded to the public website**.
- Original photograph and cultural audio have not been added to production.
- Expand verified and indexed scripture data; proofread all uncertain Arigidi text with fluent speakers.
- Build server-side generative RAG chat with citations, privacy and rate limits if a model provider is configured.
- The existing project can be manually deployed using GitHub `gitSource`. **Automatic Vercel Git push deployment has not been confirmed.**

## Language integrity

Original spelling, diacritics and publication attribution must be preserved. The site must never present invented Arigidi translations as verified. Check permissions before public redistribution of original books, photographs and audio.
