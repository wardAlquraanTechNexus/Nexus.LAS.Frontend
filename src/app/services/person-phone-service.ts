import { Injectable } from '@angular/core';
import { PersonPhone } from '../models/menus/person-phone/person-phone';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base/base-service';

@Injectable({
  providedIn: 'root'
})
export class PersonPhoneService extends BaseService<PersonPhone> {
  constructor(httpClient: HttpClient){
    super(httpClient);
    this.setPath('PersonPhone');
  }
}
