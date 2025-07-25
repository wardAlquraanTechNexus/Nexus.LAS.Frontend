import { Injectable } from '@angular/core';
import { PersonsIDDetail } from '../models/person-id-details/person-id-details';
import { BaseService } from './base/base-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonIdDetailService extends BaseService<PersonsIDDetail> 
{
  constructor(httpClient: HttpClient){
    super(httpClient);
    this.setPath('PersonIdDetails');
  }
}
