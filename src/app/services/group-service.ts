import { Injectable } from '@angular/core';
import { Group } from '../models/group/group';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base/base-service';
import { PaginateRsult } from '../models/paginate-result';
import { Observable } from 'rxjs';
import { GroupDTO } from '../models/group/group-dto/group-dto';
import { GetGroupDTOQuery } from '../models/group/group-dto/get-group-dto';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends BaseService<Group> {
  constructor(override httpClient: HttpClient) {
    super(httpClient);
    this.setPath("Group");
  }

  getGroupsDto(query: GetGroupDTOQuery): Observable<PaginateRsult<GroupDTO>> {
    return this.httpClient.get<PaginateRsult<GroupDTO>>(this.url, { params: this.httpParams(query) });
  }
  searchGroup(paramsObj?: { [param: string]: any }): Observable<PaginateRsult<Group>> {
    let params = new HttpParams();
    if (paramsObj) {
      Object.keys(paramsObj).forEach(key => {
        const value = paramsObj[key];
        if (value !== null && value !== undefined) {
          params = params.set(key, value);
        }
      });
    }
    return this.httpClient.get<PaginateRsult<Group>>(this.url + "/SearchGroup", { params });

  }

  searchGroupByName(name: string): Observable<PaginateRsult<Group>> {

    let params = new HttpParams();
    params = params.set("groupName", name);
    return this.httpClient.get<PaginateRsult<Group>>(this.url + "/SearchGroup", { params });

  }
}
