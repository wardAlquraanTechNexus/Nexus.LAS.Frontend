import { Injectable } from '@angular/core';
import { BaseService } from './base/base-service';
import { Company } from '../models/company/company';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetCompanyDto } from '../models/company/get-company-query/get-company-dto';
import { Observable } from 'rxjs';
import GetCompanyQuery from '../models/company/get-company-query/get-company-dto-command';
import { PaginateRsult } from '../models/paginate-result';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseService<Company>
{
  constructor(httpClient: HttpClient){
    super(httpClient);
    this.setPath('Company');
  }

  getCompanies(query: GetCompanyQuery): Observable<PaginateRsult<GetCompanyDto>> {
    let params = new HttpParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          params = params.set(key, value.join(','));
        } else {
          params = params.set(key, value.toString());
        }
      }
    });

    return this.httpClient.get<PaginateRsult<GetCompanyDto>>(`${this.url}/GetCompanies`, { params });
  }
}
