# AGENTS.md

## Project: Biblical Hebrew Dictionary

A Progressive Web App for learning Biblical Hebrew. Built with Angular, targeting tablet use. Designed to evolve incrementally with AI features (Google ADK, Gemini).

**Primary goals:**
1. Offline-capable dictionary lookup (initial data: toy 43-entry JSON)
2. Custom on-screen Hebrew keyboard (ported from `oskb/`)
3. User dictionary stored locally
4. Optional cloud sync (Firebase)
5. Leraning and Study features (Grammar, Exercises, reading inscriptions with OCR/AI help)

---

## Core Principles

- **Simple:** Readable code over abstractions. No premature optimization. Vanilla CSS only — no Tailwind or UI libraries.
- **Offline-first:** All core features must work without network. Local storage is primary; cloud is secondary.
- **Web-first, PWA later:** Build and stabilize the web app before adding PWA support. Do not enable service workers before Phase 5 (see [STATUS.md](STATUS.md)).

---

## Tech Stack

- Angular (latest stable) with Angular Signals for state/reactivity
- TypeScript (strict mode, no `any`)
- IndexedDB via `idb` (see [IMPLEMENTATION.md](IMPLEMENTATION.md) for `idb` vs `Dexie.js` rationale)
- LocalStorage only for very small data
- Optional: Firebase (Firestore/Auth), Gemini API

---

> See [IMPLEMENTATION.md](IMPLEMENTATION.md) for project structure, data models, and service contracts.

---

> See [STATUS.md](STATUS.md) for the feature roadmap, current progress, and dev commands.

---

## AI Agent Guidelines

### Environment-specific: PATH for npm globals

This developer's environment does not have `<npm-prefix>/bin` in `PATH`.
After running `npm install -g <package>`, remind the human to run `add-npm-bin.sh`
to link the new binary into `~/.local/bin`.

### Must do
- Follow the project structure above.
- Keep changes minimal and focused.
- Use Angular Signals for all reactive state.
- Port `oskb/` keyboard logic natively — do not use it as an external dependency.
- The Hebrew keyboard 3-row layout **must strictly follow `oskb/app.js`**.
- Comment non-obvious logic.
- Note unfinished work or shortcomings in `STATUS.md` and commit messages. Architecture-level shortcomings notes go to `IMPLEMENTATION.md`

### Must not do
- Introduce NgRx Store or other complex state libraries (unless requested).
- Replace Angular with alternative frameworks.
- Add large dependencies without clear justification.
- Enable PWA or service workers before Phase 5.

---

## Definition of Done (per feature)

1. Has a real test (no mocks).
2. Produces no console errors.
3. Uses Angular Signals for reactivity.
4. Code is readable and strictly typed.
5. *(post-PWA)* Works offline.
6. *(post-PWA)* Usable on a tablet screen.
7. Problems/shortcomings noted in `IMPLEMENTATION.md` and commit messages.
