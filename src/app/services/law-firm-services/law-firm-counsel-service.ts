import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LawFirmCounsel } from '../../models/law-firm-models/law-firm-counsel/law-firm-counsel';
import { LawFirmCounselDto } from '../../models/law-firm-models/law-firm-counsel/dtos/law-firm-counsel-dto';
import { Observable } from 'rxjs';
import { PaginateRsult } from '../../models/paginate-result';
import { GetLawFirmCounselQuery } from '../../models/law-firm-models/law-firm-counsel/params/get-law-firm-counsel-query';
import { BaseService } from '../base/base-service';

@Injectable({
  providedIn: 'root'
})
export class LawFirmCounselService extends BaseService<LawFirmCounsel> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('LawFirmCounsel');
  }

  getPaging(query: GetLawFirmCounselQuery): Observable<PaginateRsult<LawFirmCounselDto>> {
    const params = this.httpParams(query);
    return this.httpClient.get<PaginateRsult<LawFirmCounselDto>>(this.url, { params });
  }
}