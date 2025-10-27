import { Injectable } from '@angular/core';
import { GroupMenu } from '../models/group-menu/group-menu';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base/base-service';
import { PaginateRsult } from '../models/paginate-result';
import { Observable } from 'rxjs/internal/Observable';
import { UpsertCollectionOfMenusCommand } from '../models/group-menu/upsert-collection-of-group-menu';
import { SearchGroupMenuQuery } from '../models/group-menu/params/search-group-menu-query';
import { GroupMenuDTO } from '../models/group-menu/dtos/group-menu-dto';
import { GetAllGroupMenuQuery } from '../models/group-menu/params/get-all-group-menus';
import { GetAllMenusByGroupQuery } from '../models/group-menu/params/get-all-menus-by-group-query';

@Injectable({
  providedIn: 'root'
})
export class GroupMenuService extends BaseService<GroupMenu> {
  constructor(override httpClient: HttpClient) {
    super(httpClient);
    this.setPath("GroupMenu");
  }

  searchGroupMenu(searchGroupMenu: SearchGroupMenuQuery): Observable<PaginateRsult<GroupMenuDTO>> {
    let p = this.httpParams(searchGroupMenu);
    return this.httpClient.get<PaginateRsult<GroupMenuDTO>>(this.url, { params: p });

  }

  getAllGroupMenu(searchGroupMenu: GetAllGroupMenuQuery): Observable<GroupMenuDTO[]> {
    let p = this.httpParams(searchGroupMenu);
    return this.httpClient.get<GroupMenuDTO[]>(this.url + "/GetAllGroupMenu", { params: p });

  }

  upsertCollectionOfMenus(query: UpsertCollectionOfMenusCommand): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.url}/UpsertCollectionOfGroupsMenus`, query);
  }


  getAllMenusByGroup(query:GetAllMenusByGroupQuery) : Observable<PaginateRsult<GroupMenuDTO>> {
    let p = this.httpParams(query);
    return this.httpClient.get<PaginateRsult<GroupMenuDTO>>(this.url + "/GetAllMenusByGroup", { params: p });

  }

}
