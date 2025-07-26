import { Injectable } from '@angular/core';
import { PersonsIDDetail } from '../models/person-id-details/person-id-details';
import { BaseService } from './base/base-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonIdDetailService extends BaseService<PersonsIDDetail> 
{
  constructor(httpClient: HttpClient){
    super(httpClient);
    this.setPath('PersonIdDetails');
  }

  careateByForm(formData: FormData): Observable<number> {
    return this.httpClient.post<number>(this.url , formData);

  }
}
