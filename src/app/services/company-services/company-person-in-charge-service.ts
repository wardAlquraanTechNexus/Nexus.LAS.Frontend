import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';
import { CompanyPersonInCharge } from '../../models/company-models/company-person-in-charge/company-person-in-charge';
import { GetPagingCompanyPersonInChargeQuery } from '../../models/company-models/company-person-in-charge/get-company-person-in-charge/get-company-person-in-charge-query';
import { CompanyPersonInChargeDto } from '../../models/company-models/company-person-in-charge/get-company-person-in-charge/get-company-person-in-charge-dto';
import { PaginateRsult } from '../../models/paginate-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyPersonInChargeService extends BaseService<CompanyPersonInCharge> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('CompanyPersonInCharge');
  }

    getPaging(params: GetPagingCompanyPersonInChargeQuery): Observable<PaginateRsult<CompanyPersonInChargeDto>> {
      return this.httpClient.get<PaginateRsult<CompanyPersonInChargeDto>>(this.url + "/GetPaging", { params: this.httpParams(params) });
    }

}
