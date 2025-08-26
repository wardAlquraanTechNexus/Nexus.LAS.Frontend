import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { CompaniesShareHolder } from '../../models/company-models/company-share-holder/company-share-holder';
import { HttpClient } from '@angular/common/http';
import { GetPagingCompanyShareHolderParams } from '../../models/company-models/company-share-holder/params/get-paging-company-shareholder-params';
import { Observable } from 'rxjs';
import { GetPagingCompanyActivityQuery } from '../../models/company-models/company-activity/params/get-paging-company-activity-params';
import { CompaniesShareHolderDto } from '../../models/company-models/company-share-holder/dtos/company-share-holder-dto';
import { PaginateRsult } from '../../models/paginate-result';

@Injectable({
  providedIn: 'root'
})
export class CompanyShareHolderService extends BaseService<CompaniesShareHolder>
{
    constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('CompanyShareHolder');
  }

    getPaging(params: GetPagingCompanyActivityQuery): Observable<PaginateRsult<CompaniesShareHolderDto>> {
       return this.httpClient.get<PaginateRsult<CompaniesShareHolderDto>>(this.url, { params: this.httpParams(params) });
     }
   
   

}
