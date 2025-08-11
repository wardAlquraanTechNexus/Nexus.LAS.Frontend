import { Injectable } from '@angular/core';
import { BaseService } from './base/base-service';
import { User } from '../models/user/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UploadUserImageCommand } from '../models/user/upload-user-image/upload-user-image-command';
import { Observable } from 'rxjs';
import { UploadImageDto } from '../models/base/upload-image-dto';
import { PaginateRsult } from '../models/paginate-result';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {
  constructor(private http: HttpClient) {
    super(http);
    this.setPath("User");
  }

  uploadUserImage(command: UploadUserImageCommand): Observable<UploadImageDto> {
    let formData: FormData = new FormData();
    formData.append("username", command.username);
    formData.append("file", command.file);

    return this.httpClient.post<UploadImageDto>(this.url, formData);

  }

    searchUser(paramsObj?: { [param: string]: any }): Observable<PaginateRsult<User>> {
    let params = new HttpParams();
    if (paramsObj) {
      Object.keys(paramsObj).forEach(key => {
        const value = paramsObj[key];
        if (value !== null && value !== undefined) {
          params = params.set(key, value);
        }
      });
    }
    return this.httpClient.get<PaginateRsult<User>>(this.url + "/", { params });

  }
}
