import { Injectable } from '@angular/core';
import { UserGroup } from '../models/user-group/user-group';
import { BaseService } from './base/base-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginateRsult } from '../models/paginate-result';
import { UserGroupDto } from '../models/user-group/user-group-dto/user-group-dto';
import { GetAllUserGroupDTOQuery, GetUserGroupDTOQuery } from '../models/user-group/user-group-dto/get-user-group-query';
import { Observable } from 'rxjs';
import { UpsertCollectionOfUsersCommand } from '../models/user-group/upsert-collection-of-users/upsert-collection-of-users';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService extends BaseService<UserGroup> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('UserGroup');
  }

  getUserGroupDTOs(query: GetUserGroupDTOQuery): Observable<PaginateRsult<UserGroupDto>> {
    return this.httpClient.get<PaginateRsult<UserGroupDto>>(`${this.url}/GetUserGroups`, { params: this.httpParams(query) });
  }
  getAllUserGroupDTOs(query: GetAllUserGroupDTOQuery): Observable<UserGroupDto[]> {
    let params = this.httpParams(query)
    return this.httpClient.get<UserGroupDto[]>(`${this.url}/GetAllUserGroups`, { params });
  }
   upsertCollectionOfUsers(query: UpsertCollectionOfUsersCommand): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.url}/UpsertCollectionOfUsers`, query);
  }
}
