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

FIXME `this.dmq` referencing keyboard button (Dagesh-or-Mapiq) - right-most in the middle row - has grey background, like special keys Backspace/Space. Should use same style as other letter keys.

FIXME `strong43.json` (loaded via dictionary.json symlink) shows 'Dictionary loaded: 10 entries'. Add `console.error` in `fetchDictionary` error-path (`dictionary.service.ts`)

*(Add decisions, blockers, and notes here as the project progresses.)*
