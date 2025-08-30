import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { CompanyContract } from '../../models/company-models/company-contract/company-contract';
import { HttpClient } from '@angular/common/http';
import { GetPagingCompanyContractQuery } from '../../models/company-models/company-contract/params/get-paging-company-contract';
import { CompanyContractDto } from '../../models/company-models/company-contract/dtos/company-contract-dto';
import { PaginateRsult } from '../../models/paginate-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyContractService extends BaseService<CompanyContract> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('CompanyContract');
  }

  getPaging(params: GetPagingCompanyContractQuery): Observable<PaginateRsult<CompanyContractDto>> {
    return this.httpClient.get<PaginateRsult<CompanyContractDto>>(this.url, { params: this.httpParams(params) });
  }

  careateByForm(formData: FormData): Observable<number> {
    return this.httpClient.post<number>(this.url, formData);

  }

  updateByForm(formData: FormData): Observable<boolean> {
    return this.httpClient.put<boolean>(this.url+"/UpdateByForm", formData);

  }

}
