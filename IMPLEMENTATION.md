# IMPLEMENTATION.md

Living document. Update as the project evolves. Note unfinished work, shortcomings, and decisions here.

---

## Project Structure

```
src/app/
  core/services/
    dictionary.service.ts
    storage.service.ts
    sync.service.ts        # optional initially
    ocr.service.ts         # future
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

- `core/` — singleton services and app-wide logic
- `features/` — self-contained feature modules
- `shared/` — reusable components, types, helpers

---

## Data Models

```ts
interface DictionaryEntry {
  id: string;
  lemma: string;
  transliteration?: string;
  meaning: string;
}

interface UserEntry {
  id: string;
  text: string;
  notes?: string;
  updatedAt: number;
}
```

---

## Services

### `DictionaryService`
- Load dictionary data (JSON → IndexedDB)
- Search entries, return results via Signals

### `StorageService`
- Abstract over IndexedDB
- API: `get(key)`, `set(key, value)`, `remove(key)`

**IndexedDB wrapper: `idb` vs `Dexie.js`**

**Currently using: `idb` v8.0.3**

| | `idb` | `Dexie.js` |
|---|---|---|
| Size | ~5 KB | ~80 KB |
| API style | Thin Promise wrapper over native IDB | High-level ORM-like API |
| Schema migrations | Manual | Declarative versioning |
| Querying | Basic (get/put/delete by key) | Rich (where, filter, orderBy) |
| Learning curve | Low if you know IDB | Low even without IDB knowledge |
| Best for | Simple key-value or small object stores | Complex queries, relational-ish data |

### `SyncService` *(optional initially)*
- Push local changes to Firebase, pull remote updates
- Conflict resolution: last-write-wins

### `OCRService` *(future)*
- Accept image input, call Gemini API, return recognized text

---

## Status & Notes

*(Record only **implementation** decisions here: architecture, data model, libraries, deployment options.)*

For deviations from plan, known issues, and incomplete work, see [STATUS.md](STATUS.md)

- **IndexedDB wrapper:** Chose `idb` over `Dexie.js` for its minimal footprint (~5 KB vs ~80 KB). Sufficient for current key-value storage needs. No migration trigger defined — reconsider if querying complexity grows.
- **`## Status & Notes` scope:** This section is for implementation-level decisions only. Bug tracking and progress go in `STATUS.md`.
