import { Injectable } from '@angular/core';
import { FPCODAction } from '../../models/fpc-models/fpc-od-action/fpc-od-action';
import { FPCODActionDto } from '../../models/fpc-models/fpc-od-action/dtos/fpc-od-action-dto';
import { GetFPCODActionParam } from '../../models/fpc-models/fpc-od-action/params/get-fpc-od-action-param';
import { PaginateRsult } from '../../models/paginate-result';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FpcOdActionService extends BaseService<FPCODAction> {
  constructor(http: HttpClient) {
    super(http);
    this.setPath('FPCODAction');
  }

   getPaging(query: GetFPCODActionParam): Observable<PaginateRsult<FPCODActionDto>> {
      const params = this.httpParams(query);
      return this.httpClient.get<PaginateRsult<FPCODActionDto>>(this.url, { params });
    }
}