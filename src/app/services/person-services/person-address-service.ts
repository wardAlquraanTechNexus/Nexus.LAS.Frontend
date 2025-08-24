import { Injectable } from '@angular/core';
import { PersonAddress } from '../../models/person-models/person-address/person-address';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';

@Injectable({
  providedIn: 'root'
})
export class PersonAddressService extends BaseService<PersonAddress>{
  constructor(httpClient: HttpClient){
    super(httpClient);
    this.setPath('PersonAddress');
  }
}

