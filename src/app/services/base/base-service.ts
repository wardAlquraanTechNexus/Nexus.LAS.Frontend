import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable, of, tap } from 'rxjs';
import { PaginateRsult } from '../../models/paginate-result';
import { MemoryCacheService } from '../memory-cache-service';


@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  url!: string;
  protected cache = inject(MemoryCacheService);
  protected cacheTTL = 5 * 60 * 1000; // 5 minutes default, can be overridden in child services
  protected enableCache = false; // DISABLED by default - enable only for reference/static data services

  constructor(protected httpClient: HttpClient) {
  }

  protected setPath(path: string): void {
    this.url = environment.serverUrls.host + path;

  }

  /**
   * Get the cache key prefix for this service
   */
  protected getCachePrefix(): string {
    // Extract service name from URL (e.g., 'Person', 'Company')
    return this.url.split('/').pop() || 'base';
  }

  /**
   * Get all items with caching support
   * @param forceRefresh - Force refresh from server, bypassing cache
   * @param ttl - Custom time-to-live for this cache entry (optional)
   */
  getAllCached(forceRefresh = false, ttl?: number): Observable<T[]> {
    const cacheKey = `${this.getCachePrefix()}-all`;

    // Check cache first if not forcing refresh
    if (!forceRefresh && this.enableCache) {
      const cachedData = this.cache.get<T[]>(cacheKey);
      if (cachedData) {
        return of(cachedData);
      }
    }

    // Fetch from server and cache result
    return this.getAllByParams().pipe(
      tap(data => {
        if (this.enableCache) {
          this.cache.set(cacheKey, data, ttl ?? this.cacheTTL);
        }
      })
    );
  }

  /**
   * Get items by parameters with caching support
   * @param paramsObj - Query parameters
   * @param useCache - Whether to use cache for this request (default: true)
   * @param ttl - Custom time-to-live for this cache entry (optional)
   */
  getAllByParamsCached(
    paramsObj?: { [param: string]: any },
    useCache = true,
    ttl?: number
  ): Observable<T[]> {
    const cacheKey = `${this.getCachePrefix()}-params-${this.buildCacheKey(paramsObj)}`;

    // Check cache first if enabled
    if (useCache && this.enableCache) {
      const cachedData = this.cache.get<T[]>(cacheKey);
      if (cachedData) {
        return of(cachedData);
      }
    }

    // Fetch from server and cache result
    return this.getAllByParams(paramsObj).pipe(
      tap(data => {
        if (useCache && this.enableCache) {
          this.cache.set(cacheKey, data, ttl ?? this.cacheTTL);
        }
      })
    );
  }

  /**
   * Get single item by ID with caching support
   * @param id - Item ID
   * @param useCache - Whether to use cache for this request (default: true)
   * @param ttl - Custom time-to-live for this cache entry (optional)
   */
  getByIdCached(id: number, useCache = true, ttl?: number): Observable<T> {
    const cacheKey = `${this.getCachePrefix()}-id-${id}`;

    // Check cache first if enabled
    if (useCache && this.enableCache) {
      const cachedData = this.cache.get<T>(cacheKey);
      if (cachedData) {
        return of(cachedData);
      }
    }

    // Fetch from server and cache result
    return this.getById(id).pipe(
      tap(data => {
        if (useCache && this.enableCache) {
          this.cache.set(cacheKey, data, ttl ?? this.cacheTTL);
        }
      })
    );
  }

  getByParams(paramsObj?: { [param: string]: any }): Observable<PaginateRsult<T>> {
    return this.httpClient.get<PaginateRsult<T>>(this.url, { params: this.httpParams(paramsObj) });
  }

  getAllByParams(paramsObj?: { [param: string]: any }): Observable<T[]> {
    let params = new HttpParams();
    if (paramsObj) {
      Object.keys(paramsObj).forEach(key => {
        const value = paramsObj[key];
        if (value !== null && value !== undefined) {
          params = params.set(key, value);
        }
      });
    }
    return this.httpClient.get<T[]>(this.url + "/GetAllByQuery", { params });

  }

  getById(id: number): Observable<T> {
    return this.httpClient.get<T>(this.url + "/" + id);
  }

  create(item: T): Observable<number> {
    // Invalidate cache after creating new item
    this.invalidateCache();
    return this.httpClient.post<number>(this.url, item);
  }

  update(item: T) {
    // Invalidate cache after updating item
    this.invalidateCache();
    return this.httpClient.put<number>(this.url, item);
  }

  bulkUpsert(items: T[]): Observable<T[]> {
    // Invalidate cache after bulk operations
    this.invalidateCache();
    return this.httpClient.post<T[]>(this.url +"/BulkUpsertAsync", items);

  }

  delete(id: number) {
    // Invalidate cache after deleting item
    this.invalidateCache();
    return this.httpClient.delete<number>(this.url + "/" + id);
  }

  /**
   * Invalidate all cache entries for this service
   */
  protected invalidateCache(): void {
    if (this.enableCache) {
      this.cache.removePattern(`${this.getCachePrefix()}-*`);
    }
  }

  /**
   * Clear specific cache entry
   */
  protected clearCacheEntry(key: string): void {
    this.cache.remove(`${this.getCachePrefix()}-${key}`);
  }

  httpParams(obj: any) {
    let params = new HttpParams();
    if(obj){
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (value !== null && value !== undefined) {
          params = params.set(key, value);
        }
      });

    }
    return params;
  }

  /**
   * Build cache key from parameters object
   */
  private buildCacheKey(paramsObj?: { [param: string]: any }): string {
    return Object.entries(paramsObj ?? {})
      .filter(([_, value]) => value !== null && value !== undefined)
      .sort()
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');
  }
}
