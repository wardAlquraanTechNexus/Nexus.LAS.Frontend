import { Injectable } from '@angular/core';
import { GroupMenu } from '../models/group-menu/group-menu';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base/base-service';
import { SearchGroupMenuQuery } from '../models/group-menu/search-group-menu/search-group-menu-query';
import { PaginateRsult } from '../models/paginate-result';
import { Observable } from 'rxjs/internal/Observable';
import { SearchGroupMenuDTO } from '../models/group-menu/search-group-menu/search-group-menu-dto';
import { GetAllGroupMenuQuery } from '../models/group-menu/search-group-menu/get-all-group-menus';
import { UpsertCollectionOfMenusCommand } from '../models/group-menu/upsert-collection-of-group-menu';

@Injectable({
  providedIn: 'root'
})
export class GroupMenuService extends BaseService<GroupMenu> {
  constructor(override httpClient: HttpClient) {
    super(httpClient);
    this.setPath("GroupMenu");
  }

  searchGroupMenu(searchGroupMenu: SearchGroupMenuQuery): Observable<PaginateRsult<SearchGroupMenuDTO>> {
    let p = this.httpParams(searchGroupMenu);
    return this.httpClient.get<PaginateRsult<SearchGroupMenuDTO>>(this.url, { params: p });

  }

  getAllGroupMenu(searchGroupMenu: GetAllGroupMenuQuery): Observable<SearchGroupMenuDTO[]> {
    let p = this.httpParams(searchGroupMenu);
    return this.httpClient.get<SearchGroupMenuDTO[]>(this.url + "/GetAllGroupMenu", { params: p });

  }

  upsertCollectionOfMenus(query: UpsertCollectionOfMenusCommand): Observable<boolean> {
      return this.httpClient.put<boolean>(`${this.url}/UpsertCollectionOfGroupsMenus`, query);
    }

}
