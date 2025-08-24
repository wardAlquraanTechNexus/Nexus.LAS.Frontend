import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';
import { PersonPhone } from '../../models/person-models/person-phone/person-phone';

@Injectable({
  providedIn: 'root'
})
export class PersonPhoneService extends BaseService<PersonPhone> {
  constructor(httpClient: HttpClient){
    super(httpClient);
    this.setPath('PersonPhone');
  }
}
