import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

import { LawFirmExpertise } from '../../models/law-firm-models/law-firm-expertise/law-firm-expertise';
import { LawFirmExpertiseDto } from '../../models/law-firm-models/law-firm-expertise/dtos/law-firm-expertise-dto';
import { GetLawFirmExpertiseQuery } from '../../models/law-firm-models/law-firm-expertise/params/get-law-firm-expertise-query';
import { PaginateRsult } from '../../models/paginate-result';
import { BaseService } from '../base/base-service';
import { GetAllLawFirmExpertiseQuery } from '../../models/law-firm-models/law-firm-expertise/params/get-all-law-firm-expertise-query';

@Injectable({
  providedIn: 'root'
})
export class LawFirmExpertiseService extends BaseService<LawFirmExpertise> {

  private lawFirmExpertiseRequest$?: Observable<LawFirmExpertiseDto[]>;
  
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('LawFirmExpertise');
  }

  getPaging(query: GetLawFirmExpertiseQuery): Observable<PaginateRsult<LawFirmExpertiseDto>> {
    const params = this.httpParams(query);
    return this.httpClient.get<PaginateRsult<LawFirmExpertiseDto>>(this.url, { params });
  }

  getAllLawFirmExpertises(getAllLawFirmExpertiseQuery: GetAllLawFirmExpertiseQuery): Observable<LawFirmExpertiseDto[]> {
      if (!this.lawFirmExpertiseRequest$) {
        const params = this.httpParams(getAllLawFirmExpertiseQuery);
        this.lawFirmExpertiseRequest$ = this.httpClient.get<LawFirmExpertiseDto[]>(this.url + "/GetAllByQuery", { params })
          .pipe(
            shareReplay(1) // cache the latest value
          );
      }
      return this.lawFirmExpertiseRequest$;
    }
}