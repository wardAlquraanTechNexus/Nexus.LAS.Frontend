import { Injectable } from '@angular/core';
import { CompanyBoardMember } from '../../models/company-models/company-board-member/company-board-member';
import { CompanyBoardMemberDto } from '../../models/company-models/company-board-member/dtos/company-board-member-dto';
import { GetCompanyBoardMemberParams } from '../../models/company-models/company-board-member/params/get-company-board-member';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginateRsult } from '../../models/paginate-result';
import { BaseService } from '../base/base-service';

@Injectable({
  providedIn: 'root'
})
export class CompanyBoardMemberService extends BaseService<CompanyBoardMember> {

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('CompanyBoardMember');
  }

  getPaging(params: GetCompanyBoardMemberParams): Observable<PaginateRsult<CompanyBoardMemberDto>> {
    return this.httpClient.get<PaginateRsult<CompanyBoardMemberDto>>(this.url, { params: this.httpParams(params) });
  }
}
