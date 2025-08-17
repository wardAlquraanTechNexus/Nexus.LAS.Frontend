import { Injectable } from '@angular/core';
import { BaseService } from './base/base-service';
import { User } from '../models/user/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UploadUserImageCommand } from '../models/user/upload-user-image/upload-user-image-command';
import { Observable } from 'rxjs';
import { UploadImageDto } from '../models/base/upload-image-dto';
import { PaginateRsult } from '../models/paginate-result';
import { UserDto } from '../models/user/get-user-dto/user-dto';

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

  searchUserByName(username: string): Observable<PaginateRsult<User>> {
    let params = new HttpParams();
    params = params.set("username", username);
    return this.httpClient.get<PaginateRsult<User>>(this.url + "/", { params });
  }

  searchUser(paramsObj?: { [param: string]: any }): Observable<PaginateRsult<UserDto>> {
    let params = this.httpParams(paramsObj)
    return this.httpClient.get<PaginateRsult<UserDto>>(this.url + "/SearchUser", { params });
  }
}
