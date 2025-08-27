import { Injectable } from '@angular/core';
import { CompanyPhone } from '../../models/company-models/company-phone/company-phone';
import { CompanyPhoneDto } from '../../models/company-models/company-phone/dtos/company-phone-dto';
import { GetCompanyPhoneQuery } from '../../models/company-models/company-phone/params/get-company-phone-query';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginateRsult } from '../../models/paginate-result';
import { BaseService } from '../base/base-service';

@Injectable({
  providedIn: 'root'
})
export class CompanyPhoneService extends BaseService<CompanyPhone>
{
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('CompanyPhone');
  }

    getAll(params: GetCompanyPhoneQuery): Observable<CompanyPhoneDto[]> {
       return this.httpClient.get<CompanyPhoneDto[]>(this.url+"/GetAllByQuery", { params: this.httpParams(params) });
     }
   
}
