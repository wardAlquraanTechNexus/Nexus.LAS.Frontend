import { Injectable } from '@angular/core';
import { CompanyAccountSignatory } from '../../models/company-models/company-account-signatory/company-account-signatory';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';
import { GetCompanyAccountSignatoryParams } from '../../models/company-models/company-account-signatory/params/get-company-account-signatory';
import { CompanyAccountSignatoryDto } from '../../models/company-models/company-account-signatory/dtos/company-account-signatory-dto';
import { Observable } from 'rxjs';
import { PaginateRsult } from '../../models/paginate-result';

@Injectable({
  providedIn: 'root'
})
export class CompanyAccountSignatoryService extends BaseService<CompanyAccountSignatory>
{
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('CompanyAccountSignatory');
  }

    getAll(params: GetCompanyAccountSignatoryParams): Observable<CompanyAccountSignatoryDto[]> {
       return this.httpClient.get<CompanyAccountSignatoryDto[]>(this.url +"/GetAllByQuery", { params: this.httpParams(params) });
     }

       getPaging(params: GetCompanyAccountSignatoryParams): Observable<PaginateRsult<CompanyAccountSignatoryDto>> {
       return this.httpClient.get<PaginateRsult<CompanyAccountSignatoryDto>>(this.url , { params: this.httpParams(params) });
     }
   
}
