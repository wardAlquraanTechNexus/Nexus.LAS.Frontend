import { Injectable } from '@angular/core';
import { BaseService } from './base/base-service';
import { HttpClient } from '@angular/common/http';
import { DynamicList } from '../models/dynamic-list/dynamic-list';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicListService extends BaseService<DynamicList>{
    
  constructor(httpClient: HttpClient){
    super(httpClient);
    this.setPath('DynamicList');
  }

  GetParents(id: number): Observable<DynamicList[]> {
    return this.httpClient.get<DynamicList[]>(this.url + "/GetParents/" + id);
  }
}
