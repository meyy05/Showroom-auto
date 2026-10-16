import { Injectable, computed, signal } from '@angular/core';

const STORAGE_KEY = 'showroom-auto:favorites';

@Injectable({ providedIn: 'root' })
export class Favorites {
  readonly ids = signal<number[]>(this.load());
  readonly count = computed(() => this.ids().length);

  has(id: number): boolean {
    return this.ids().includes(id);
  }

  toggle(id: number): void {
    this.ids.update(ids => (ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ids()));
    } catch {
      /* storage unavailable: favorites stay in memory only */
    }
  }

  private load(): number[] {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      return Array.isArray(raw) ? raw.filter(n => typeof n === 'number') : [];
    } catch {
      return [];
    }
  }
}
