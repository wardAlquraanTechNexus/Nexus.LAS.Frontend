import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { CompanyCapital } from '../../models/company-models/company-capital/company-capital';
import { HttpClient } from '@angular/common/http';
import { GetPagingCompanyCapital } from '../../models/company-models/company-capital/params/get-paging-company-capital';
import { CompanyCapitalDto } from '../../models/company-models/company-capital/dtos/company-capital-dto';
import { Observable } from 'rxjs';
import { PaginateRsult } from '../../models/paginate-result';

@Injectable({
  providedIn: 'root'
})
export class CompanyCapitalService extends BaseService<CompanyCapital>
{
    constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('CompanyCapital');
  }

    getPaging(params: GetPagingCompanyCapital): Observable<PaginateRsult<CompanyCapitalDto>> {
        return this.httpClient.get<PaginateRsult<CompanyCapitalDto>>(this.url , { params: this.httpParams(params) });
      }
}
