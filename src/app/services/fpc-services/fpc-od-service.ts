import { Injectable } from '@angular/core';
import { FPCOD } from '../../models/fpc-models/fpc-od/fpc-od';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';
import { GetFPCODParam } from '../../models/fpc-models/fpc-od/params/get-fpc-od';
import { FPCODDto } from '../../models/fpc-models/fpc-od/dtos/fpc-od-dto';
import { PaginateRsult } from '../../models/paginate-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FPCODService extends BaseService<FPCOD> {
  constructor(http: HttpClient) {
    super(http);
    this.setPath('FPCOD');
  }

   getPaging(query: GetFPCODParam): Observable<PaginateRsult<FPCODDto>> {
      const params = this.httpParams(query);
      return this.httpClient.get<PaginateRsult<FPCODDto>>(this.url, { params });
    }
}