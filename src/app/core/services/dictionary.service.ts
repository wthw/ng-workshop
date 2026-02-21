import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DictionaryEntry, DictionaryFile } from '../../shared/models/dictionary.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private http = inject(HttpClient);
  private storage = inject(StorageService);

  private readonly DATA_VERSION_KEY = 'dict-data-version';

  private allEntries = signal<DictionaryEntry[]>([]);
  private searchQuery = signal<string>('');

  loading = signal<boolean>(false);

  // Computed signal for filtered results
  searchResults = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.allEntries();

    return this.allEntries().filter(entry =>
      entry.lemma.includes(query) ||
      entry.meaning.toLowerCase().includes(query) ||
      entry.transliteration?.toLowerCase().includes(query) ||
      entry.root?.includes(query)
    );
  });

  constructor() {
    this.init();
  }

  private initPromise: Promise<void> | null = null;

  public async init(): Promise<void> {
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      if (this.allEntries().length > 0) return;
      this.loading.set(true);
      try {
        await this.loadEntries();
      } catch (error) {
        console.error('Failed to initialize dictionary:', error);
      } finally {
        this.loading.set(false);
      }
    })();

    return this.initPromise;
  }

  private async loadEntries(): Promise<void> {
    try {
      // Online path: fetch the file, version field is the source of truth.
      const file = await this.fetchDictionary();
      const storedVersion = localStorage.getItem(this.DATA_VERSION_KEY);

      if (file.version !== storedVersion) {
        // Seed data changed — replace the IndexedDB cache.
        await this.storage.clear('dictionary');
        for (const entry of file.entries) {
          await this.storage.put(entry, 'dictionary');
        }
        localStorage.setItem(this.DATA_VERSION_KEY, file.version);
      }

      // Use fresh data from the fetch (avoids a redundant IndexedDB read).
      this.allEntries.set(file.entries);
    } catch {
      // Offline path: serve from IndexedDB cache.
      // After Phase 5 (service worker), the fetch above will be intercepted
      // and served from cache, so this branch will only fire on first load
      // with no network and no SW cache.
      const cached = await this.storage.getAll<DictionaryEntry>('dictionary');
      if (cached.length === 0) {
        console.error('Dictionary unavailable: offline with no cached data.');
      }
      this.allEntries.set(cached);
    }
  }

  private fetchDictionary(): Promise<DictionaryFile> {
    return new Promise((resolve, reject) => {
      this.http.get<DictionaryFile>('/data/dictionary.json').subscribe({
        next: (data) => resolve(data),
        error: (err) => {
          console.error('fetchDictionary failed:', err);
          reject(err);
        }
      });
    });
  }

  search(query: string) {
    this.searchQuery.set(query);
  }
}
