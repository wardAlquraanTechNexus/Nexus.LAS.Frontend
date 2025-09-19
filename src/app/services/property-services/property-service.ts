import { Injectable } from '@angular/core';
import { Property } from '../../models/property-models/property/property';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService extends BaseService<Property> {

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('Property');
  }

}
