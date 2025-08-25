import { Injectable } from '@angular/core';
import { CompanyLicense } from '../../models/company-models/company-license/company-license';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';
import { GetcompanyLicenseParams } from '../../models/company-models/company-license/params/get-company-license-params';
import { CompanyLicenseDto } from '../../models/company-models/company-license/dtos/company-license-dto';
import { PaginateRsult } from '../../models/paginate-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyLicenseService extends BaseService<CompanyLicense> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('CompanyLicense');
  }

    getPaging(params: GetcompanyLicenseParams): Observable<PaginateRsult<CompanyLicenseDto>> {
      return this.httpClient.get<PaginateRsult<CompanyLicenseDto>>(this.url + "/GetPaging", { params: this.httpParams(params) });
    }

}