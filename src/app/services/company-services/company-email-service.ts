import { Injectable } from '@angular/core';
import { CompanyEmail } from '../../models/company-models/company-email/company-email';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';
import { GetCompanyEmailQuery } from '../../models/company-models/company-email/params/get-company-email-query';
import { CompanyEmailDto } from '../../models/company-models/company-email/dtos/company-email-dto';
import { PaginateRsult } from '../../models/paginate-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyEmailService extends BaseService<CompanyEmail>
{
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('CompanyEmail');
  }

    getAll(params: GetCompanyEmailQuery): Observable<CompanyEmailDto[]> {
       return this.httpClient.get<CompanyEmailDto[]>(this.url +"/GetAllByQuery", { params: this.httpParams(params) });
     }
   
}
