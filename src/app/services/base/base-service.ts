import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { PaginateRsult } from '../../models/paginate-result';


@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  url!: string;
  constructor(protected httpClient: HttpClient) {
  }

  protected setPath(path: string): void {
    this.url = environment.serverUrls.host + path;

  }

  getByParams(paramsObj?: { [param: string]: any }): Observable<PaginateRsult<T>> {
    let params = new HttpParams();
    if (paramsObj) {
      Object.keys(paramsObj).forEach(key => {
        const value = paramsObj[key];
        if (value !== null && value !== undefined) {
          params = params.set(key, value);
        }
      });
    }
    return this.httpClient.get<PaginateRsult<T>>(this.url, { params });

  }
  getById(id: number): Observable<T> {
    return this.httpClient.get<T>(this.url + "/" + id);
  }
  create(item: T): Observable<number> {
    return this.httpClient.post<number>(this.url, item);
  }
  update(item: T) {
    return this.httpClient.put<number>(this.url, item);
  }
  delete(id: number) {
    return this.httpClient.delete<number>(this.url + "/" + id);
  }

  httpParams(obj: any) {
    let params = new HttpParams();
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (value !== null && value !== undefined) {
        params = params.set(key, value);
      }
    });
    return params;
  }
}
