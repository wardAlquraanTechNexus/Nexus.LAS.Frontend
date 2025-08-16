import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemoryCacheService {
  private cache = new Map<string, any>();

  get<T>(key: string): T | null {
    return this.cache.has(key) ? this.cache.get(key) : null;
  }

  set<T>(key: string, value: T): void {
    this.cache.set(key, value);
  }

  remove(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}
