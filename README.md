# KAIKAI — The Arigidi Experience

The Kaikai Foundation digital home for Arigidi Akoko language learning, Scripture and cultural preservation.

**Production:** https://kaikai-foundation-arigidi.vercel.app  
**Reading room:** https://kaikai-foundation-arigidi.vercel.app/reader.html  
**GitHub:** https://github.com/akeredoluseun200-dotcom/Arigidi-Ai  
**Vercel project:** `kaikai-foundation-arigidi`

## Version 2.4 — Faster scripture reading and animated experience

The new source materials are the user's authenticated Google Drive folder:
https://drive.google.com/drive/folders/1g75VvHxmHH2EFr9j59CVGHL9PUN--KIg

- **The Holy Bible, Arigidi Akoko, 2ND EDITION** — complete 2,186-page PDF, 66 books and 1,189 source-linked chapters.
- **Kuran Arigidi Akoko** — complete 1,649-page PDF, 114 surahs, with source-linked reading pages. No edition label.
- **Portrait of Baba Kaikai** — the exact original photo used for the site identity/favicon and homepage, recovered from the Foundation Bible PDF without regenerating it. Its SHA256 is `d294ef044377695595daef23520ae9ab94a78c9927e94219e44a92b2669753dd`.
- **Faster book access:** original manuscript pages are preserved in 66 smaller Bible-book PDFs and 114 smaller Kuran-surah PDFs (180 total), hosted in public Vercel Blob. Switching books no longer loads the full 18.7 MB Bible or 41 MB Kuran. The complete original files remain linked.
- **Motion and navigation:** swipe-up scroll reveals, slide-in page transitions, reduced-motion accessibility, mobile overflow fix, and the portrait/logo navigates to Discover.
- The reading room is a fully responsive PDF navigator with searchable Bible books and Quran surahs, chapter controls, previous/next, zoom, direct PDF access, and same-device reading progress.
- Complete PDF source files are hosted on the connected public Vercel Blob store. GitHub contains versioned code and publication URLs, not the large original books.
- Homepage refreshed with **Midnight Ink** (`#172e37`), **Pearl** (`#f7f5ef`) and **Coastal Sage** (`#9dbfb4`). No pink accents. Typography uses Fraunces and Nunito Sans, with subtle reduced-motion-compatible animations.
- Existing lessons, dictionary, saved vocabulary, challenges and reference-grounded tutor remain available.

### Original source publications

- Bible 2ND EDITION: https://ctgc6eaiyducczq7.public.blob.vercel-storage.com/library/Arigidi-Bible-Complete-2ND-Edition.pdf
- Kuran (no edition label): https://ctgc6eaiyducczq7.public.blob.vercel-storage.com/library/Arigidi-Kuran-Complete.pdf
- Original portrait: https://ctgc6eaiyducczq7.public.blob.vercel-storage.com/library/Baba-Kaikai.jpeg

### Project layout

- `source/index.html.gz.b64`: preserved original full Version 2 HTML source.
- `scripts/build.mjs`: deterministic build that validates book/chapter/surah counts.
- `pages/reader.html`, `assets/reader.js`, `assets/reader.css`: interactive source PDF reading room.
- `assets/v23.css`: new responsive visual design and typography.
- `assets/site-enhancements.js`: logo, hero portrait, navigation, source library links and homepage heritage feature.
- `content/quick-index.z64`: file-to-chapter mapping for all 180 lightweight original-page PDF readers.
- `assets/v24-motion.css` and `assets/motion.js`: swipe-up reveals, slide-in transitions and accessible animation controls.
- `content/reader-index.z64`: compressed TOC extracted from the actual Drive PDFs.
- `content/library.json` and `content/brand.json`: canonical content and brand assets.
- `content/scripture-index.01.b64`, `content/scripture-index.02.b64`: source excerpts for the older reference-search tutor.
- `api/library-upload.js`: administrator-authenticated Vercel Blob upload route.
- `.github/workflows/validate.yml`: build and integrity checks automatically on commits to `main` and pull requests.

### Local build

```bash
npm install
npm run build
```

To restore the preserved full page source in editable HTML: `npm run restore-source`. The build output is `dist/`.

### Scripture accuracy and limitations

The reader displays the complete original publications directly, so we do not reconstruct or fabricate Scripture. The tutor's source-excerpt index originates from earlier materials and is **not** an exhaustive searchable extraction of the new complete Drive PDFs. It is a reference-based learning assistant, not a free-form generative Arigidi model. Where written Arigidi needs confirmation, native-speaker review and the Foundation manuscript remain authoritative.

### Continuous delivery

GitHub checks run automatically on each push. Builds and deployments from the `main` branch have been validated through the Vercel project. **The existing Vercel project is not yet natively linked to this GitHub repository, so automatic production deployment from every push is not confirmed**. Do not claim Git-connected auto-deployment until Vercel project Git Settings show an active repository link.

### Future enhancements

Long-form audio history, native-speaker pronunciation and a server-side citation-grounded generative tutor can be added as separate audited features. Model services require appropriate hosting, usage limits, and source-rights controls.
