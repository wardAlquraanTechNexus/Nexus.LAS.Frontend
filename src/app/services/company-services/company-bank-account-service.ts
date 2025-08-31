import { Injectable } from '@angular/core';
import { CompanyBankAccount } from '../../models/company-models/company-bank-account/company-bank-account';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';
import { GetAllCompanyBankAccountParams } from '../../models/company-models/company-bank-account/params/get-company-bank-account';
import { CompanyBankAccountDto } from '../../models/company-models/company-bank-account/dtos/company-bank-account-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyBankAccountService extends BaseService<CompanyBankAccount>
{
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('CompanyBankAccount');
  }

    getAll(params: GetAllCompanyBankAccountParams): Observable<CompanyBankAccountDto[]> {
       return this.httpClient.get<CompanyBankAccountDto[]>(this.url +"/GetAllByQuery", { params: this.httpParams(params) });
     }
   
}
