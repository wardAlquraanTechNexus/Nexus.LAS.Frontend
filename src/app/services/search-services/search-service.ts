import { Injectable } from '@angular/core';
import { GlobalSearchDTO } from '../../models/search-models/global-search-dto';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';
import { GlobalSearchQuery } from '../../models/search-models/global-search-param';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends BaseService<GlobalSearchDTO>{
    
  constructor(httpClient: HttpClient){
    super(httpClient);
    this.setPath('Search');
  }

  globalSearch(query: GlobalSearchQuery): Observable<GlobalSearchDTO[]> {
    let params =this.httpParams(query);
    return this.httpClient.get<GlobalSearchDTO[]>(`${this.url}/global`, { params });
  }

}