import { Injectable } from '@angular/core';
import { CompanyBoard } from '../../models/company-models/company-board/company-board';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';
import { GetCompanyBoardParams } from '../../models/company-models/company-board/params/get-company-board';
import { CompanyBoardDto } from '../../models/company-models/company-board/dtos/company-board-dto';
import { PaginateRsult } from '../../models/paginate-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyBoardService extends BaseService<CompanyBoard> {

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('CompanyBoard');
  }

  getPaging(params: GetCompanyBoardParams): Observable<PaginateRsult<CompanyBoardDto>> {
    return this.httpClient.get<PaginateRsult<CompanyBoardDto>>(this.url, { params: this.httpParams(params) });
  }
}
