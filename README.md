# Biblical Hebrew Dictionary (Bible-Hebrew)

## Current Phase: 0-1 (Core web app, on-screen keyboard)

### Setup
Run the following command to install the base dependencies:
```bash
npm install
```

---

## Project Overview
This project wants to be a Web App for learning and working with Biblical Hebrew,
focusing on an offline-first experience and being the utmost help of learners
at every step of their encounter with this ancient language.

Detailed project goals and tech stack are in [AGENTS.md](AGENTS.md);
implementation notes in [IMPLEMENTATION.md](IMPLEMENTATION.md);
roadmap and known issues in [STATUS.md](STATUS.md).

## Development Commands

- **Start Dev Server:** `ng serve`
- **Build:** `ng build`
- **Test:** `ng test`

## Updating the seed dictionary

[`public/data/dictionary.json`](public/data/dictionary.json) is a symlink pointing
to the active data file (e.g. `strong43.json`). Its format is:

```json
{
  "version": "2",
  "entries": [ ... ]
}
```

Whenever you change the content of the file (add/remove/edit entries, or retarget the symlink), **bump the `"version"` string**.
The app compares this against `localStorage['dict-data-version']` on every load and re-seeds IndexedDB automatically when they differ.
