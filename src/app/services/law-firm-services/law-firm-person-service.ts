import { Injectable } from '@angular/core';
import { LawFirmPerson } from '../../models/law-firm-models/law-firm-person/law-firm-person';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';
import { GetLawFirmPersonQuery } from '../../models/law-firm-models/law-firm-person/params/get-law-firm-person-query';
import { PaginateRsult } from '../../models/paginate-result';
import { LawFirmPersonDto } from '../../models/law-firm-models/law-firm-person/dtos/law-firm-person-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LawFirmPersonService extends BaseService<LawFirmPerson> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('LawFirmPerson');
  }

    getPaging(query: GetLawFirmPersonQuery): Observable<PaginateRsult<LawFirmPersonDto>> {
      const params = this.httpParams(query);
      return this.httpClient.get<PaginateRsult<LawFirmPersonDto>>(this.url, { params });
    }
}
