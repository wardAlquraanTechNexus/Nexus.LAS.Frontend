import { Injectable } from '@angular/core';
import { FPC } from '../../models/fpc-models/fpc/fpc';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';
import { GetFPCParam } from '../../models/fpc-models/fpc/params/get-fpc-param';
import { FPCDto } from '../../models/fpc-models/fpc/dtos/fpc-dto';
import { Observable, shareReplay } from 'rxjs';
import { PaginateRsult } from '../../models/paginate-result';
import { ExportModel } from '../../models/export-to-excel-dto';
import { BulkChangePrivateCommand } from '../../models/person-models/bulk-change-private-command';
import { BulkChangeStatusCommand } from '../../models/person-models/bulk-change-status-command';
import { GetAllFPCParam } from '../../models/fpc-models/fpc/params/get-all-fpc-param';

@Injectable({
  providedIn: 'root'
})
export class FPCService extends BaseService<FPC> {
    private fpcsRequest$?: Observable<FPCDto[]>;
  
  constructor(http: HttpClient) {
    super(http);
    this.setPath('FPC');
  }
  getDtoById(id: number): Observable<FPCDto> {
    return this.httpClient.get<FPCDto>(this.url + "/" + id);
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

  exportToPdf(filter: any): Observable<ExportModel> {
    var params = this.httpParams(filter);
    return this.httpClient.get<ExportModel>(this.url + "/ExportToPdf", { params });
  }

  getAllFPCs(query: GetAllFPCParam): Observable<FPCDto[]> {
      if (!this.fpcsRequest$) {
        const params = this.httpParams(query);
        this.fpcsRequest$ = this.httpClient.get<FPCDto[]>(this.url + "/GetAllByQuery", {params})
          .pipe(
            shareReplay(1) 
          );
      }
      return this.fpcsRequest$;
    }

}