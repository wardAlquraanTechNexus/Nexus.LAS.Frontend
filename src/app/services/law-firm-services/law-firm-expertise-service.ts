import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LawFirmExpertise } from '../../models/law-firm-models/law-firm-expertise/law-firm-expertise';
import { LawFirmExpertiseDto } from '../../models/law-firm-models/law-firm-expertise/dtos/law-firm-expertise-dto';
import { GetLawFirmExpertiseQuery } from '../../models/law-firm-models/law-firm-expertise/params/get-law-firm-expertise-query';
import { PaginateRsult } from '../../models/paginate-result';
import { BaseService } from '../base/base-service';

@Injectable({
  providedIn: 'root'
})
export class LawFirmExpertiseService extends BaseService<LawFirmExpertise> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('LawFirmExpertise');
  }

  getPaging(query: GetLawFirmExpertiseQuery): Observable<PaginateRsult<LawFirmExpertiseDto>> {
    const params = this.httpParams(query);
    return this.httpClient.get<PaginateRsult<LawFirmExpertiseDto>>(this.url, { params });
  }
}