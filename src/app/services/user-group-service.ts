import { Injectable } from '@angular/core';
import { UserGroup } from '../models/user-group/user-group';
import { BaseService } from './base/base-service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginateRsult } from '../models/paginate-result';
import { UserGroupDto } from '../models/user-group/user-group-dto/user-group-dto';
import { GetUserGroupDTOQuery } from '../models/user-group/user-group-dto/get-user-group-query';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService extends BaseService<UserGroup>
{
   constructor(httpClient: HttpClient){
    super(httpClient);
    this.setPath('UserGroup');
  }

    getUserGroupDTOs(query: GetUserGroupDTOQuery): Observable<PaginateRsult<UserGroupDto>> {
    let params = new HttpParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          params = params.set(key, value.join(','));
        } else {
          params = params.set(key, value.toString());
        }
      }
    });

    return this.httpClient.get<PaginateRsult<UserGroupDto>>(`${this.url}/GetUserGroups`, { params });
  }
}
