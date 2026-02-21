# STATUS.md

Current state of the project. Update as features are completed, plans change, issues found.

---

## Current Phase: 0-1 (Core web app, on-screen keyboad)

In progress. No PWA yet.

---

## Feature Roadmap

| Phase | Scope | Status |
| ----- | ----- | ------ |
| 0 | Static JSON dictionary, search, IndexedDB storage, tablet layout | in progress |
| 1 | Hebrew keyboard (ported from `oskb/app.js`, 3-row layout exact match) | in progress |
| 2 | User dictionary (add/edit, local persistence) | pending |
| 3 | Tutor and Exercises (using ADK) | pending |
| 4 | Grammar helper (verb forms, pattern lookup) | pending |
| 5 | Service worker, offline caching, installable PWA | pending |
| 6 | Firebase cloud sync (manual sync button) | pending |
| 7 | OCR (camera/upload + Gemini API) | pending |

---

## Dev Commands

```
npm install          # install dependencies
ng serve             # development server
ng build             # production build
ng add @angular/pwa  # Phase 5 only
```

---

## Known Issues / Notes

FIXED `this.dmq` keyboard button (Dagesh-or-Mapiq): removed `isVowel`/`isSpecial` classification logic — all keys (but Baskspace and Space) now share uniform styling.

FIXED `dictionary.service.ts`: version field now lives in `dictionary.json` (`{ "version": "...", "entries": [...] }`). On each load the app fetches the file, compares its `version` to `localStorage['dict-data-version']`, and re-seeds IndexedDB only when changed. Falls back to IndexedDB cache when offline. Bump `version` in the JSON whenever seed data changes — no TS change needed. After Phase 5 the service worker fetch will make the version check offline-capable with zero code changes.

*(Add decisions, blockers, and notes here as the project progresses.)*
