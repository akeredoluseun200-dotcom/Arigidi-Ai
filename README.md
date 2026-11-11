# KAIKAI — The Arigidi Experience

Official development repository for the Kaikai Foundation Arigidi Akoko language-learning platform.

**Production site:** https://kaikai-foundation-arigidi.vercel.app

## Current status

Version 2 is live on Vercel. The existing production website was originally deployed using direct file uploads, so **this repository is not yet linked to that deployment**. Do not replace production with this repository until its current `index.html` and assets have been safely imported and verified.

## Version 2.1 goals

- Add downloadable Arigidi Akoko Bible **2ND EDITION** and Quran (no edition label).
- Add a citation-grounded Arigidi language tutor with vocabulary, sentence practice, and verified references to the texts.
- Preserve native source spellings and diacritics; never present generated or guessed translations as verified.
- Restore the original Baba Kaikai photograph as the identity mark and home hero visual, with permission.
- Increase comfortable body font sizes; use welcoming humanist typography, restrained green/cream/earth palette, subtle accessible motion, **no pink**.
- Connect GitHub to the existing Vercel project only after making a verified source backup.

## Content policy

This is a cultural preservation project. Bible and Quran translations must come from verified editions and carry the exact edition/verse/surah reference. Mark unsupported Arigidi translations as needing native-speaker review. Respect source copyright and publication permissions. Do not send the full copyrighted text to a third-party AI API without authority.

## Planned structure

- `content/`: verified vocabulary and scripture evidence with provenance.
- `features/`: isolated tutor UI prototype, safe to integrate after existing source recovered.
- `public/`: permitted PDFs, approved photos, and audio files.

**Note:** No automatic production deployment is enabled from this repository yet.
