import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { CompanyActivity } from '../../models/company-models/company-activity/company-activity';
import { HttpClient } from '@angular/common/http';
import { GetPagingCompanyActivityQuery } from '../../models/company-models/company-activity/params/get-paging-company-activity-params';
import { PaginateRsult } from '../../models/paginate-result';
import { CompanyActivityDto } from '../../models/company-models/company-activity/dtos/company-activity-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyActivityService extends BaseService<CompanyActivity>
{
    constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('CompanyActivity');
  }

    getPaging(params: GetPagingCompanyActivityQuery): Observable<PaginateRsult<CompanyActivityDto>> {
        return this.httpClient.get<PaginateRsult<CompanyActivityDto>>(this.url , { params: this.httpParams(params) });
      }


}
