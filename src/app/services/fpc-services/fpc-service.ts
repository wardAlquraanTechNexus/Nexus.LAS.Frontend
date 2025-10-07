import { Injectable } from '@angular/core';
import { FPC } from '../../models/fpc-models/fpc/fpc';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';
import { GetFPCParam } from '../../models/fpc-models/fpc/params/get-fpc-param';
import { FPCDto } from '../../models/fpc-models/fpc/dtos/fpc-dto';
import { Observable } from 'rxjs';
import { PaginateRsult } from '../../models/paginate-result';
import { ExportModel } from '../../models/export-to-excel-dto';
import { BulkChangePrivateCommand } from '../../models/person-models/bulk-change-private-command';
import { BulkChangeStatusCommand } from '../../models/person-models/bulk-change-status-command';

@Injectable({
  providedIn: 'root'
})
export class FPCService extends BaseService<FPC> {
  constructor(http: HttpClient) {
    super(http);
    this.setPath('FPC');
  }

  getPaging(query: GetFPCParam): Observable<PaginateRsult<FPCDto>> {
    const params = this.httpParams(query);
    return this.httpClient.get<PaginateRsult<FPCDto>>(this.url, { params });
  }


  updateStatus(command: BulkChangeStatusCommand) {
    return this.httpClient.put<number>(this.url + "/BulkChangeStatus", command);
  }

  updatePrivate(command: BulkChangePrivateCommand) {
    return this.httpClient.put<number>(this.url + "/BulkChangePrivate", command);
  }

  exportToExcel(filter: any): Observable<ExportModel> {
    var params = this.httpParams(filter);
    return this.httpClient.get<ExportModel>(this.url + "/ExportToExcel", { params });
  }
}