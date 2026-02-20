# AGENTS.md

## Project: Biblical Hebrew Dictionary (Angular)

### Purpose

This project is a Progressive Web App (PWA) built with Angular for learning and working with Biblical Hebrew.

This is also a step to prepare me (human) to a 3.5 hour tomorrow's GDG workshop where the goal is to build "a frontend app that integrates AI using Google Agent Development Kit (ADK) + Angular", so choice of tech stack leans towards to a single vendor - Google.

Primary goals:

1. Offline-capable dictionary lookup
2. Custom on-screen Hebrew keyboard (ported from `oskb/`)
3. User dictionary stored locally
4. Optional cloud synchronization (Firebase)
5. Optional OCR for inscriptions and text fragments (Gemini API)

This project is designed to evolve incrementally during workshops and experiments, especially those involving AI features.

---

## Core Principles

### 1. Keep it simple

* Prefer simple, readable code over abstractions.
* Avoid introducing new libraries unless they solve a real problem.
* Do not optimize prematurely.
* **Styling:** Use Vanilla CSS exclusively. No Tailwind or complex UI libraries.

### 2. Offline-first

* All core features must work without a network connection.
* Local storage is the primary data source.
* Cloud sync is optional and secondary.

### 3. Web-first, PWA later

Development must follow this order:

1. Build a normal Angular web app.
2. Implement core logic and layout.
3. Add PWA support only after core features work.

Do **not** enable the service worker during early development.

---

## Tech Stack

### Frontend

* Angular (latest stable)
* Angular Signals (for state management and reactivity)
* Angular PWA support (`@angular/pwa`) — added later
* TypeScript

### Storage

* IndexedDB (using `idb` or `Dexie.js` wrapper)
* LocalStorage (only for very small data)

### Optional integrations

* Cloud sync: Firebase (Firestore/Auth)
* OCR: Gemini API (Multimodal OCR and analysis)

---

## Project Structure (intended)

```
src/
  app/
    core/
      services/
        dictionary.service.ts
        storage.service.ts
        sync.service.ts
        ocr.service.ts
    features/
      dictionary/
      keyboard/
      user-dictionary/
      grammar/
    shared/
      components/
      models/
      utils/
```

### Folder roles

#### `core/`

Singleton services and app-wide logic.

#### `features/`

Self-contained feature modules.

#### `shared/`

Reusable components, types, and helpers.

---

## Main Components

### Dictionary

Responsible for:

* Search input
* Result list
* Entry details
* **Data Source:** Initial data loaded from a provided JSON file.

### Keyboard

Custom on-screen Hebrew keyboard:

* **Implementation:** Logic and layout must be ported from `oskb/app.js` into a native Angular component.
* Reusable component.
* Emits characters to input fields.
* No direct data logic.

### User Dictionary

* Add/edit entries
* Stored locally
* Syncable later

---

## Core Services

### `DictionaryService`

Responsibilities:

* Load dictionary data (JSON/IndexedDB)
* Search entries
* Return results using Signals

### `StorageService`

Responsibilities:

* Abstract local storage
* Use IndexedDB internally (`idb` or `Dexie.js`)
* Provide simple API:

  * `get(key)`
  * `set(key, value)`
  * `remove(key)`

### `SyncService` (optional initially)

Responsibilities:

* Push local changes to Firebase
* Pull remote updates
* Resolve conflicts simply (last-write-wins)

### `OCRService` (future)

Responsibilities:

* Accept image input
* Send to Gemini API
* Return recognized text and analysis

---

## Data Model (initial)

### Dictionary Entry

```ts
interface DictionaryEntry {
  id: string;
  lemma: string;
  transliteration?: string;
  meaning: string;
}
```

### User Entry

```ts
interface UserEntry {
  id: string;
  text: string;
  notes?: string;
  updatedAt: number;
}
```

---

## Development Workflow

### Phase 0 — Web app only (no PWA)

Build and test the core app as a normal Angular web application.

Focus on:

1. Dictionary lookup (using provided JSON)
2. Custom keyboard (ported from `oskb`)
3. Local user dictionary
4. Basic layout for tablet use

During this phase:

* Do not add `@angular/pwa`
* Do not enable service workers
* Use `ng serve` for development

---

### Phase 1 — Add PWA support

After the core features work:

```
ng add @angular/pwa
ng build
```

Then:

* Test offline behavior
* Test installation on tablet
* Adjust caching if needed

---

### Phase 2 — Device-specific features

After PWA is working:

* Camera access for OCR (Gemini)
* Touch keyboard usability
* Sync behavior

---

## Development Commands

### Setup

```
npm install
```

### Start dev server

```
ng serve
```

### Add PWA support (later phase)

```
ng add @angular/pwa
```

### Build production version

```
ng build
```

---

## Coding Guidelines

### TypeScript

* Use strict typing.
* Avoid `any`.

### Reactivity

* Use **Angular Signals** for component state and service-to-component communication.

### Components

* Keep components small and focused.
* Move logic into services.

---

## AI Agent Guidelines

When an AI agent modifies this project:

### Must do

* Respect the project structure.
* Keep changes minimal and focused.
* Use native Signals for state.
* Port `oskb` logic rather than using it as an external dependency.
* Add comments when introducing non-obvious logic.

### Must not do

* Introduce complex state management libraries (like full NgRx Store) unless requested.
* Replace Angular defaults with alternative frameworks.
* Add large dependencies without clear justification.
* Enable PWA or service workers before Phase 1.

---

## Feature Roadmap

### Phase 0: Core web app

* Static dictionary data (JSON source)
* Search functionality
* Local storage (IndexedDB)
* Tablet-friendly layout (Vanilla CSS)

### Phase 1: PWA support

* Service worker
* Offline caching
* Installable app

### Phase 2: Custom keyboard

* Hebrew character layout **as defined in [`oskb/app.js`](oskb/app.js)**
* Port logic to native Angular component.
* It is **essential**, that custom 3-row layout strictly follows organization defined in `oskb`.
* Input integration

### Phase 3: User dictionary

* Add/edit entries
* Local persistence

### Phase 4: Cloud sync

* Firebase integration
* Manual sync button

### Phase 5: Grammar helper

* Verb forms
* Pattern lookup

### Phase 6: OCR

* Camera or image upload
* Gemini API text recognition and analysis

---

## Non-Goals (for now)

* Complex animations
* Real-time collaboration
* Multi-user accounts
* Native mobile app wrappers

---

## Definition of Done (per feature)

A feature is complete when:

1. It works offline (once PWA is enabled).
2. It has no console errors.
3. It uses Angular Signals for reactivity.
4. It is usable on a tablet screen.
5. Code is readable and typed.
