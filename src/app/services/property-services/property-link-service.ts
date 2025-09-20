import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { PropertyLink } from '../../models/property-models/property-link/property-link';
import { GetPropertyLinkQuery } from '../../models/property-models/property-link/params/get-property-link-query';
import { PaginateRsult } from '../../models/paginate-result';
import { PropertyLinkDTO } from '../../models/property-models/property-link/dtos/property-link-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyLinkService extends BaseService<PropertyLink> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('PropertyLink');
  }

  getPaging(query: GetPropertyLinkQuery): Observable<PaginateRsult<PropertyLinkDTO>> {
    return this.httpClient.get<PaginateRsult<PropertyLinkDTO>>(`${this.url}`, { params: this.httpParams(query) });
  }
  
}
