import { Injectable } from '@angular/core';
import { BaseService } from './base/base-service';
import { HttpClient } from '@angular/common/http';
import { DynamicList } from '../models/dynamic-list/dynamic-list';
import { Observable, of, tap } from 'rxjs';
import { PaginateRsult } from '../models/paginate-result';

@Injectable({
  providedIn: 'root'
})
export class DynamicListService extends BaseService<DynamicList> {

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('DynamicList');
    // Enable caching for DynamicList - it's reference/lookup data that rarely changes
    this.enableCache = true;
    this.cacheTTL = 30 * 60 * 1000; // 30 minutes for reference data
  }

  GetParents(id: number): Observable<DynamicList[]> {
    return this.httpClient.get<DynamicList[]>(this.url + "/GetParents/" + id);
  }


  GetAllByParentId(parentId: number, name: string = "", forceRefresh = false): Observable<DynamicList[]> {
    const cacheKey = `dynamic-list-${parentId}`;
    if (!forceRefresh) {
      const cachedData = this.cache.get<DynamicList[]>(cacheKey);
      if (cachedData) {
        return of(
          name
            ? cachedData.filter(x => x.name?.toLowerCase().includes(name.toLowerCase()))
            : cachedData
        );
      }
    }

    return this.getAllByParams({ parentId, name }).pipe(
      tap(data => this.cache.set(cacheKey, data))
    );
  }
}
