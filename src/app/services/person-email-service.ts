import { Injectable } from '@angular/core';
import { BaseService } from './base/base-service';
import { PersonEmail } from '../models/person-email/person-email';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonEmailService extends BaseService<PersonEmail>{
  constructor(httpClient: HttpClient){
    super(httpClient);
    this.setPath('PersonEmail');
  }
}
