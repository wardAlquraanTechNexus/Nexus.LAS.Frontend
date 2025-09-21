import { Injectable } from '@angular/core';
import { PropertyOwner } from '../../models/property-models/property-owner/property-owner';
import { BaseService } from '../base/base-service';
import { GetPropertyOwnerQuery } from '../../models/property-models/property-owner/params/get-property-owner-query';
import { PropertyOwnerDTO } from '../../models/property-models/property-owner/dtos/property-owner-dto';
import { PaginateRsult } from '../../models/paginate-result';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyOwnerService extends BaseService<PropertyOwner> {



  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('PropertyOwner');
  }

    getPaging(query: GetPropertyOwnerQuery): Observable<PaginateRsult<PropertyOwnerDTO>> {
      return this.httpClient.get<PaginateRsult<PropertyOwnerDTO>>(`${this.url}`, { params: this.httpParams(query) });
    }
 

}
