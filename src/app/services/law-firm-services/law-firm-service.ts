import { Injectable } from '@angular/core';
import { LawFirm } from '../../models/law-firm-models/law-firm/law-firm';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';
import { GetLawFirmQuery } from '../../models/law-firm-models/law-firm/params/get-law-firm-query';
import { Observable, shareReplay } from 'rxjs';
import { LawFirmDTO } from '../../models/law-firm-models/law-firm/dtos/law-firm-dto';
import { PaginateRsult } from '../../models/paginate-result';
import { BulkChangeStatusCommand } from '../../models/person-models/bulk-change-status-command';
import { BulkChangePrivateCommand } from '../../models/person-models/bulk-change-private-command';
import { ExportModel } from '../../models/export-to-excel-dto';

@Injectable({
  providedIn: 'root'
})
export class LawFirmService extends BaseService<LawFirm> {

  private lawFirmsRequest$?: Observable<LawFirmDTO[]>;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('LawFirm');
  }


  getPaging(query: GetLawFirmQuery): Observable<PaginateRsult<LawFirmDTO>> {
    const params = this.httpParams(query);
    return this.httpClient.get<PaginateRsult<LawFirmDTO>>(this.url, { params });
  }

  getAllLawFirms(getAllLawFirmQuery: GetLawFirmQuery): Observable<LawFirmDTO[]> {
    if (!this.lawFirmsRequest$) {
      const params = this.httpParams(getAllLawFirmQuery);
      this.lawFirmsRequest$ = this.httpClient.get<LawFirmDTO[]>(this.url + "/GetAllByQuery", { params })
        .pipe(
          shareReplay(1)
        );
    }
    return this.lawFirmsRequest$;
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

  getDtoById(id: number): Observable<LawFirmDTO> {
    return this.httpClient.get<LawFirmDTO>(this.url + "/" + id);
  }

  exportToPdf(filter: any): Observable<ExportModel> {
    var params = this.httpParams(filter);
    return this.httpClient.get<ExportModel>(this.url + "/ExportToPdf", { params });
  }

}
