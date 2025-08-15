import { Injectable } from '@angular/core';
import { GroupMenu } from '../models/group-menu/group-menu';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base/base-service';
import { SearchGroupMenuQuery } from '../models/group-menu/search-group-menu/search-group-menu-query';
import { PaginateRsult } from '../models/paginate-result';
import { Observable } from 'rxjs/internal/Observable';
import { SearchGroupMenuDTO } from '../models/group-menu/search-group-menu/search-group-menu-dto';

@Injectable({
  providedIn: 'root'
})
export class GroupMenuService extends BaseService<GroupMenu> {
  constructor(override httpClient: HttpClient) {
    super(httpClient);
    this.setPath("GroupMenu");
  }

  searchGroup(searchGroupMenu: SearchGroupMenuQuery): Observable<PaginateRsult<SearchGroupMenuDTO>> {
    let p = this.httpParams(searchGroupMenu);
    return this.httpClient.get<PaginateRsult<SearchGroupMenuDTO>>(this.url, { params: p });

  }

}
