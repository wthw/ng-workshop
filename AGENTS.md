# AGENTS.md

## Project: Biblical Hebrew Dictionary (Angular)

### Purpose

This project is a Progressive Web App (PWA) built with Angular for learning and working with Biblical Hebrew.

Primary goals:

1. Offline-capable dictionary lookup
2. Custom on-screen Hebrew keyboard
3. User dictionary stored locally
4. Optional cloud synchronization
5. Optional OCR for inscriptions and text fragments

This project is designed to evolve incrementally during workshops and experiments, especially those involving AI features.

---

## Core Principles

### 1. Keep it simple

* Prefer simple, readable code over abstractions.
* Avoid introducing new libraries unless they solve a real problem.
* Do not optimize prematurely.

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
* Angular PWA support (`@angular/pwa`) — added later
* TypeScript

### Storage

* IndexedDB (preferred)
* LocalStorage (only for very small data)

### Optional integrations

* Cloud sync: simple REST API, Firebase, or Supabase
* OCR: external AI or vision API

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

### Keyboard

Custom on-screen Hebrew keyboard:

* Reusable component
* Emits characters to input fields
* No direct data logic

### User Dictionary

* Add/edit entries
* Stored locally
* Syncable later

---

## Core Services

### `DictionaryService`

Responsibilities:

* Load dictionary data
* Search entries
* Return results

### `StorageService`

Responsibilities:

* Abstract local storage
* Use IndexedDB internally
* Provide simple API:

  * `get(key)`
  * `set(key, value)`
  * `remove(key)`

### `SyncService` (optional initially)

Responsibilities:

* Push local changes
* Pull remote updates
* Resolve conflicts simply (last-write-wins)

### `OCRService` (future)

Responsibilities:

* Accept image input
* Send to OCR API
* Return recognized text

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

1. Dictionary lookup
2. Custom keyboard
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

This phase should require minimal changes to the app logic.

---

### Phase 2 — Device-specific features

After PWA is working:

* Camera access for OCR
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
* Avoid `any` unless absolutely necessary.

### Components

* Keep components small and focused.
* Move logic into services.

### Services

* One responsibility per service.
* Avoid tightly coupling services.

---

## AI Agent Guidelines

When an AI agent modifies this project:

### Must do

* Respect the project structure.
* Keep changes minimal and focused.
* Add comments when introducing non-obvious logic.
* Prefer extending existing services over creating new ones.

### Must not do

* Introduce complex state management libraries.
* Replace Angular defaults with alternative frameworks.
* Add large dependencies without clear justification.
* Change architecture without explicit instruction.
* Enable PWA or service workers before Phase 1.

---

## Feature Roadmap

### Phase 0: Core web app

* Static dictionary data
* Search functionality
* Local storage
* Tablet-friendly layout

### Phase 1: PWA support

* Service worker
* Offline caching
* Installable app

### Phase 2: Custom keyboard

* Hebrew character layout **as defined in [`oskb`](oskb/index.html)**
* It is **essential**, that custom 3-row layout strictly follows organisation defined in [`oskb`](oskb/app.js)
* check rendition when in doubt TODO link oskb/layout.png
* Input integration

### Phase 3: User dictionary

* Add/edit entries
* Local persistence

### Phase 4: Cloud sync

* Simple REST endpoint
* Manual sync button

### Phase 5: Grammar helper

* Verb forms
* Pattern lookup

### Phase 6: OCR

* Camera or image upload
* AI text recognition

---

## Non-Goals (for now)

* Complex animations
* Real-time collaboration
* Multi-user accounts
* Advanced offline conflict resolution
* Native mobile app wrappers

---

## Definition of Done (per feature)

A feature is complete when:

1. It works offline (once PWA is enabled).
2. It has no console errors.
3. It is usable on a tablet screen.
4. Code is readable and typed.
