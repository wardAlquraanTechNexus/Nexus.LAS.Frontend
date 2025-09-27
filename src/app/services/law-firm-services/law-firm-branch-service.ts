import { Injectable } from '@angular/core';
import { LawFirmBranch } from '../../models/law-firm-models/law-firm-branch/law-firm-branch';
import { LawFirmBranchDto } from '../../models/law-firm-models/law-firm-branch/dtos/law-firm-branch-dto';
import { PaginateRsult } from '../../models/paginate-result';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetLawFirmBranchQuery } from '../../models/law-firm-models/law-firm-branch/params/get-law-firm-branch-query';
import { BaseService } from '../base/base-service';

@Injectable({
  providedIn: 'root'
})
export class LawFirmBranchService extends BaseService<LawFirmBranch> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('LawFirmBranch');
  }

    getPaging(query: GetLawFirmBranchQuery): Observable<PaginateRsult<LawFirmBranchDto>> {
      const params = this.httpParams(query);
      return this.httpClient.get<PaginateRsult<LawFirmBranchDto>>(this.url, { params });
    }
}
