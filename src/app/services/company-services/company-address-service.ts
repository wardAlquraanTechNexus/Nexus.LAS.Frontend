import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { CompanyAddress } from '../../models/company-models/company-address/company-address';
import { HttpClient } from '@angular/common/http';
import { GetCompanyAddressQuery } from '../../models/company-models/company-address/params/get-company-address-query';
import { CompanyAddressDto } from '../../models/company-models/company-address/dtos/company-address-dto';
import { PaginateRsult } from '../../models/paginate-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyAddressService extends BaseService<CompanyAddress>
{
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('CompanyAddress');
  }

    getAll(params: GetCompanyAddressQuery): Observable<CompanyAddressDto[]> {
       return this.httpClient.get<CompanyAddressDto[]>(this.url +"/GetAllByQuery", { params: this.httpParams(params) });
     }
   
}
